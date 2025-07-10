import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json() as {
            name: string;
            email: string;
            password: string;
        };

        if (!name || !email || !password) {
            return new Response(JSON.stringify({
                message: "账号不能为空！",
                code:401,
            }), {
                status: 200,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return new Response(JSON.stringify({data:newUser,code:200}), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (e) {
        console.error("Register error:", e);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
}