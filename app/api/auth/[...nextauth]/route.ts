import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "../../../generated/prisma";
import bcrypt from "bcrypt";
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
                    return null;
                }

                const hashedPassword = await bcrypt.compare(credentials.password,user.password)

                if (!hashedPassword) {
                    return null;
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