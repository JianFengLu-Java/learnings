import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const isAuth = !!req.nextauth.token;

        // 已登录，访问登录页或注册页，跳转到 dashboard
        if (isAuth && (pathname === "/" || pathname === "/register")) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        // 未登录，访问 dashboard，跳转到 /
        if (!isAuth && pathname.startsWith("/dashboard")) {
            const loginUrl = new URL("/", req.url); // 重定向到登录页（/）
            loginUrl.searchParams.set("callback", pathname);
            loginUrl.searchParams.set("reason", "auth");
            return NextResponse.redirect(loginUrl);
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: () => true, // 我们手动控制跳转
        },
    }
);

// ✅ 重要：匹配所有需要判断登录状态的路由
export const config = {
    matcher: ["/", "/register", "/dashboard",'/dashboard/:path*'],
};