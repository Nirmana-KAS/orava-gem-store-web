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
    const envBaseUrl = process.env.NEXTAUTH_URL;
    const requestOrigin = req.nextUrl.origin;
    const baseUrl =
      envBaseUrl && envBaseUrl.startsWith("http") ? envBaseUrl : requestOrigin;
    const signInUrl = new URL("/signin", baseUrl);
    signInUrl.searchParams.set("callbackUrl", `${requestOrigin}${pathname}`);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
