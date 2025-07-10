import {NextRequest} from "next/server";
import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcrypt";
const prismaClient = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { name, password } = await req.json();

        const user = await prismaClient.user.findUnique({
            where: { name },
        });

        if (!user) {
            return new Response(JSON.stringify({ status: 400, message: "User Not Found" }), {
                status: 400,
            });
        }

        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return new Response(JSON.stringify({ status: 401, message: "Invalid Password" }), {
                status: 401,
            });
        }

        return new Response(JSON.stringify({ status: 200, message: "Login Success" }), {
            status: 200,
        });
    } catch (err: any) {
        console.error("Login Error:", err); // 打印实际报错
        return new Response(JSON.stringify({ status: 500, message: "Internal Server Error" }), {
            status: 500,
        });
    }
}