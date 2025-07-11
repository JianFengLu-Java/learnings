import {NextRequest, NextResponse} from "next/server";

export default function middleware(req:NextRequest){
    console.log('middleware 执行：'+req.nextUrl.pathname);
    return NextResponse.next();//放行
}

export const config = {
    matcher:['/register']
}