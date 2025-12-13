import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const userCookie = req.cookies.get("user");
  const pathname = req.nextUrl.pathname;

  if (!userCookie && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (userCookie && pathname === "/login") {
    try {
      const user = JSON.parse(userCookie.value);
      return NextResponse.redirect(new URL(`/${user.role}`, req.url));
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (
    userCookie &&
    (pathname.startsWith("/agent") || pathname.startsWith("/client"))
  ) {
    try {
      const user = JSON.parse(userCookie.value);
      const requiredRole = pathname.startsWith("/agent") ? "agent" : "client";

      if (user.role !== requiredRole) {
        return NextResponse.redirect(new URL(`/${user.role}`, req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/agent/:path*", "/client/:path*"],
};
