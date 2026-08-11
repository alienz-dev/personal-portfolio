import { NextResponse } from "next/server";
import { expectedToken, safeEqual } from "@/lib/jobs-auth";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const { username, password } = (body ?? {}) as Record<string, unknown>;

    const validUser = process.env.JOBS_USERNAME;
    const validPass = process.env.JOBS_PASSWORD;
    const token = await expectedToken();

    // Unconfigured is a deployment fault, not a failed login — say so rather
    // than letting it read as a wrong password nobody can ever get right.
    if (!validUser || !validPass || !token) {
      return NextResponse.json(
        { error: "Dashboard login is not configured" },
        { status: 503 },
      );
    }

    const ok =
      typeof username === "string" &&
      typeof password === "string" &&
      safeEqual(username, validUser) &&
      safeEqual(password, validPass);

    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 365 * 24 * 60 * 60, // 1 year
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
