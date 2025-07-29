// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "../../../generated/prisma"; // 也可以改成 "@/generated/prisma"
import bcrypt from "bcrypt";

const prismaClient = new PrismaClient();

// 把配置提取出来，命名为 authOptions 并导出
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "name", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                const user = await prismaClient.user.findUnique({
                    where: { name: credentials.name },
                });

                if (!user) {
                    throw new Error("用户名不存在");
                }

                const valid = await bcrypt.compare(credentials.password, user.password);
                if (!valid) {
                    throw new Error("密码不正确");
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id as string;
            }
            return session;
        },
    }
};

// ✅ 使用 authOptions 创建 handler
const handler = NextAuth(authOptions);

// ✅ 导出 handler 和 authOptions
export { handler as GET, handler as POST };