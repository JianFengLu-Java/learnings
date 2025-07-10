import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

export async function POST(req: { json: () => PromiseLike<{ name: any; email: any; password:any}> | { name: any; email: any; password:any; }; }){
    const {name,email,password} = await req.json();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt );

    try{
        const newUser = await prisma.user.create({
            data: {name,email,password:hashedPassword}
        })
        return new Response(JSON.stringify(newUser),{status: 200});
    }catch(e){
        return new Response(JSON.stringify(e),{status: 400});
    }
}

