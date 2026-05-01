import { NextRequest, NextResponse } from "next/server";

const protectedPrefixes = [
  "/dashboard",
  "/builders",
  "/projects",
  "/logs",
  "/questions",
  "/feedback",
  "/knowledge",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("builderclub_session")?.value;

  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (protectedPrefixes.some((prefix) => pathname.startsWith(prefix)) && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/builders/:path*",
    "/projects/:path*",
    "/logs/:path*",
    "/questions/:path*",
    "/feedback/:path*",
    "/knowledge/:path*",
  ],
};
