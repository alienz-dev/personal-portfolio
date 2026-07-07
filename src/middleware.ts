import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple token: base64 of "ming:ping" -> bWluZzpwaW5n
const VALID_TOKEN = "bWluZzpwaW5n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page itself
  if (pathname === "/jobs/login") {
    // If already authenticated, redirect to /jobs
    const token = request.cookies.get("auth_token")?.value;
    if (token === VALID_TOKEN) {
      return NextResponse.redirect(new URL("/jobs", request.url));
    }
    return NextResponse.next();
  }

  // Protect /jobs routes
  if (pathname.startsWith("/jobs")) {
    const token = request.cookies.get("auth_token")?.value;
    if (token !== VALID_TOKEN) {
      const loginUrl = new URL("/jobs/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/jobs/:path*"],
};
