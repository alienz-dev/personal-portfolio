/**
 * Authentication for the jobs dashboard.
 *
 * This used to be three string literals in source: username "ming", password
 * "ping", and a cookie value that was base64 of the pair. The repository is
 * public, so anyone who read middleware.ts could set the cookie by hand and
 * skip the login form. The credentials now come from the environment, and the
 * cookie carries a SHA-256 digest of them — it cannot be reversed into the
 * password, and changing the password invalidates every session issued under
 * the old one.
 *
 * If either variable is unset, nobody gets in. A missing secret must never be
 * read as "no authentication required".
 *
 * Note for deploys: Next inlines process.env into the Edge bundle at build
 * time, so these must be present wherever `vercel build` runs — for this
 * project that is .env.local on the machine that builds, not only the Vercel
 * dashboard.
 */

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}

/** The cookie value a signed-in browser should be carrying, or null if unconfigured. */
export async function expectedToken(): Promise<string | null> {
  const username = process.env.JOBS_USERNAME;
  const password = process.env.JOBS_PASSWORD;
  if (!username || !password) return null;
  return sha256Hex(`${username}:${password}`);
}

/** Compare without leaking the answer through how long it took. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * The client address as attested by the platform.
 *
 * x-forwarded-for is partly caller-controlled — Vercel appends the real
 * address to whatever arrived — and the previous check scanned every entry in
 * that chain against the allowlist. Sending the allowlisted address in the
 * header was therefore enough to be treated as coming from it, with the
 * allowlisted address itself printed in the public source. x-real-ip is set
 * by the proxy, so it is the only value worth trusting here; the last entry of
 * the chain is the fallback for the same reason.
 */
export function clientIp(headers: Headers): string | null {
  const real = headers.get("x-real-ip");
  if (real?.trim()) return real.trim();
  const chain = headers.get("x-forwarded-for");
  if (!chain) return null;
  const parts = chain.split(",").map((s) => s.trim()).filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : null;
}

/** Addresses that skip the login form, e.g. a home connection. */
export function allowedIps(): Set<string> {
  return new Set(
    (process.env.JOBS_ALLOWED_IPS ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );
}
