import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth(async (req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isAdmin = session?.user?.role === "ADMIN";

  if (pathname.startsWith("/admin")) {
    if (!session?.user) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/profile") && !session?.user) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (
    (pathname.startsWith("/signin") || pathname.startsWith("/signup")) &&
    session?.user
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/api/admin") && !isAdmin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const response = NextResponse.next();

  if (
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    !pathname.includes(".")
  ) {
    const country = req.headers.get("x-vercel-ip-country") ?? "";
    const userAgent = req.headers.get("user-agent") ?? "";
    const url = new URL("/api/analytics/pageview", req.url);
    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname, country, userAgent }),
    }).catch((error: unknown) => {
      console.error("Pageview tracking failed:", error);
    });
  }

  return response;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
