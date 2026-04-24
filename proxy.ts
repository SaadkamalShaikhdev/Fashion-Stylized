import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(request: NextRequest) {
    const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET 
    });

    const { pathname } = request.nextUrl;

    // auth pages — redirect to home if already logged in
    const authPages = ["/signIn", "/signUp", "/verify-email", "/forgot-password", "/reset-password"];
    if (authPages.includes(pathname) && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // protected pages — redirect to login if not logged in
    const protectedPages = ["/profile", "/orders", "/checkout", "/admin"];
    if (protectedPages.some(page => pathname.startsWith(page)) && !token) {
        return NextResponse.redirect(new URL("/signIn", request.url));
    }

    // admin pages — redirect to home if not admin
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/signIn",
        "/signUp", 
        "/verify-email",
        "/forgot-password",
        "/reset-password",
        "/profile/:path*",
        "/orders/:path*",
        "/checkout/:path*",
        "/admin/:path*",
    ],
}