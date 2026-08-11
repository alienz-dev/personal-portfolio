import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { allowedIps, clientIp, expectedToken, safeEqual } from "@/lib/jobs-auth";

const LOGIN_API = "/jobs/login/api";

async function isAuthed(request: NextRequest): Promise<boolean> {
  const ip = clientIp(request.headers);
  if (ip && allowedIps().has(ip)) return true;

  // No configured credentials means no way in — see src/lib/jobs-auth.ts.
  const expected = await expectedToken();
  if (!expected) return false;

  const cookie = request.cookies.get("auth_token")?.value;
  return !!cookie && safeEqual(cookie, expected);
}

function isJobsSubdomain(hostname: string): boolean {
  return hostname.startsWith("jobs.");
}

export async function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // ── Subdomain mode: jobs.mingli.world ──────────────────────────────
  if (isJobsSubdomain(hostname)) {
    // Rewrite root to /jobs so the dashboard works at the apex
    if (pathname === "/") {
      if (!await isAuthed(request)) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      const url = request.nextUrl.clone();
      url.pathname = "/jobs";
      return NextResponse.rewrite(url);
    }

    // /login → /jobs/login (or redirect to home if already authed)
    if (pathname === "/login" || pathname === "/login/") {
      if (await isAuthed(request)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.rewrite(new URL("/jobs/login", request.url));
    }

    // The endpoint the login form posts to has to stay reachable while
    // signed out, or signing in is impossible.
    if (pathname === LOGIN_API) return NextResponse.next();

    // Protect /jobs routes
    if (pathname.startsWith("/jobs")) {
      if (!await isAuthed(request)) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next();
    }

    // Allow API routes, static assets
    return NextResponse.next();
  }

  // ── Path mode: mingli.world/jobs ──────────────────────────────────

  // Allow the login page and the endpoint it posts to.
  //
  // The matcher covers everything under /jobs, and the guard below only
  // exempted the page — so the form's POST to /jobs/login/api was answered
  // with a redirect to the login page. fetch follows it, the redirect returns
  // 200 HTML, and the client read that as a successful sign-in while no
  // cookie had been set. Signing in by password could not work at all; the IP
  // allowlist was the only way in.
  if (pathname === LOGIN_API) return NextResponse.next();

  if (pathname === "/jobs/login") {
    if (await isAuthed(request)) {
      return NextResponse.redirect(new URL("/jobs", request.url));
    }
    return NextResponse.next();
  }

  // Protect /jobs routes
  if (pathname.startsWith("/jobs")) {
    if (!await isAuthed(request)) {
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
