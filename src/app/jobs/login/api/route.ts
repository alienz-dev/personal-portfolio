import { NextResponse } from "next/server";

const VALID_USERNAME = "ming";
const VALID_PASSWORD = "ping";
const TOKEN = "bWluZzpwaW5n";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const response = NextResponse.json({ ok: true });

      // Set long-lasting cookie: 1 year, httpOnly, sameSite lax
      response.cookies.set("auth_token", TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
