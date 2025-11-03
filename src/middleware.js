import { NextResponse } from 'next/server';

export function middleware(req) {
    const path = req.nextUrl.pathname;

    const isPublicPath = ["/", "/auth/login", "/auth/signup"].includes(path);

    const token = req.cookies.get("accessToken")?.value || "";
    
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/main", req.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    "/",                 
    "/auth/login",       
    "/auth/signup",
    "/main",
    "/creator-studio",      
    "/profile/:path*",   
    "/main/:path*",      
    "/creator-studio/:path*" 
  ],
};
