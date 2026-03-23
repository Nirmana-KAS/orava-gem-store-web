import { NextRequest, NextResponse } from "next/server";

function hasSessionCookie(req: NextRequest): boolean {
  return Boolean(
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value,
  );
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/profile");

  if (isProtectedRoute && !hasSessionCookie(req)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
