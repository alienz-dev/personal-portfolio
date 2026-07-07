import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple token: base64 of "ming:ping" -> bWluZzpwaW5n
const VALID_TOKEN = "bWluZzpwaW5n";

// Whitelisted IPs — skip auth for these addresses
const WHITELISTED_IPS = new Set([
  "115.70.50.123",  // home
]);

function isWhitelisted(request: NextRequest): boolean {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can be "client, proxy1, proxy2"
    const ips = forwarded.split(",").map((ip) => ip.trim());
    return ips.some((ip) => WHITELISTED_IPS.has(ip));
  }
  return false;
}

function hasValidAuth(request: NextRequest): boolean {
  return request.cookies.get("auth_token")?.value === VALID_TOKEN;
}

function isAuthed(request: NextRequest): boolean {
  return isWhitelisted(request) || hasValidAuth(request);
}

function isJobsSubdomain(hostname: string): boolean {
  return hostname.startsWith("jobs.");
}

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // ── Subdomain mode: jobs.mingli.world ──────────────────────────────
  if (isJobsSubdomain(hostname)) {
    // Rewrite root to /jobs so the dashboard works at the apex
    if (pathname === "/") {
      if (!isAuthed(request)) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      const url = request.nextUrl.clone();
      url.pathname = "/jobs";
      return NextResponse.rewrite(url);
    }

    // /login → /jobs/login (or redirect to home if already authed)
    if (pathname === "/login" || pathname === "/login/") {
      if (isAuthed(request)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.rewrite(new URL("/jobs/login", request.url));
    }

    // Protect /jobs routes
    if (pathname.startsWith("/jobs")) {
      if (!isAuthed(request)) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next();
    }

    // Allow API routes, static assets
    return NextResponse.next();
  }

  // ── Path mode: mingli.world/jobs ──────────────────────────────────

  // Allow the login page itself
  if (pathname === "/jobs/login") {
    if (isAuthed(request)) {
      return NextResponse.redirect(new URL("/jobs", request.url));
    }
    return NextResponse.next();
  }

  // Protect /jobs routes
  if (pathname.startsWith("/jobs")) {
    if (!isAuthed(request)) {
      const loginUrl = new URL("/jobs/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/jobs/:path*", "/login", "/", "/((?!_next|api|favicon|books|_vercel).*)"],
};
