import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const token = req.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];

  const url = new URL(req.url);

  // Protect dashboard route
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Define which paths the middleware applies to
export const config = {
  matcher: ["/dashboard/:path*"],
};
