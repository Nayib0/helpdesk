import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("auth-session")?.value;

  if (!cookie) {
    if (req.nextUrl.pathname.startsWith("/client") ||
        req.nextUrl.pathname.startsWith("/agent")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  const parsed = JSON.parse(cookie).user;
  if (!parsed) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = parsed.role;

  if (req.nextUrl.pathname.startsWith("/client") && role !== "client") {
    return NextResponse.redirect(new URL("/agent", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/agent") && role !== "agent") {
    return NextResponse.redirect(new URL("/client", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL(`/${role}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/client/:path*", "/agent/:path*", "/login"],
};
