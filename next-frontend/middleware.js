import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Middleware is running!");
  const token = request.cookies.get("token");
  console.log(token, "token");
  const { pathname } = request.nextUrl;

  // List of public paths that don't require authentication
  const publicPaths = ["/login", "/signup"];

  // Redirect to login if no token and trying to access a protected route
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Yes, this is correct. It redirects authenticated users away from login/signup pages to /dashboard.
  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
