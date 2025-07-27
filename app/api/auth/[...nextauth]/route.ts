import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "../../../generated/prisma";
import bcrypt from "bcrypt";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
const prismaClient = new PrismaClient();

const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "name", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {

                const user = await prismaClient.user.findUnique(
                    {
                        where:{name:credentials.name}
                    }
                )

                if (!user) {
                    throw new Error('用户名不存在')
                }

                const hashedPassword = await bcrypt.compare(credentials.password,user.password)

                if (!hashedPassword) {
                    throw new Error('密码不正确')
                }

                return {
                    name:user.name,
                    email:user.email
                }
            }
        })

    ],
    session:{
        strategy:'jwt'
    }
    ,
    pages:{
        signIn:'/'
    }
    ,
    secret: process.env.NEXTAUTH_SECRET
})

export {handler as GET,handler as POST};