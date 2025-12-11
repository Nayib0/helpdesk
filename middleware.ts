import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface JWTPayload {
  id: string;
  role: "client" | "agent";
  email: string;
  iat?: number;
  exp?: number;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.pathname;

  if (!token && (url.startsWith("/agent") || url.startsWith("/client"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token) return NextResponse.next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    const role = decoded.role;

    if (url.startsWith("/agent") && role !== "agent") {
      return NextResponse.redirect(new URL("/client", req.url));
    }

    if (url.startsWith("/client") && role !== "client") {
      return NextResponse.redirect(new URL("/agent", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/agent/:path*", "/client/:path*"],
};
