// Personal data — read from environment variables, never committed to repo.
// Set these in .env.local (dev) or Vercel environment variables (production).

/**
 * Fall back when a variable is missing *or* blank.
 *
 * `??` only catches undefined, and a blank value is the common failure here:
 * `vercel pull` writes `NEXT_PUBLIC_DOMAIN=""` for encrypted variables it
 * cannot read back, which turned `metadataBase` into `new URL("https://")`
 * and failed the production build with a bare `Invalid URL`. Treating blank
 * as unset keeps a missing variable a cosmetic default rather than a crash.
 *
 * The `process.env.X` member expression must stay literal at the call site —
 * Next.js inlines it at build time and cannot follow a dynamic lookup.
 */
function env(value: string | undefined, fallback: string): string {
  const trimmed = (value ?? "").trim();
  return trimmed || fallback;
}

export const config = {
  // Personal info
  fullName: env(process.env.NEXT_PUBLIC_FULL_NAME, "Your Name"),
  displayName: env(process.env.NEXT_PUBLIC_DISPLAY_NAME, "You"),
  email: env(process.env.NEXT_PUBLIC_EMAIL, "hello@example.com"),
  linkedin: env(process.env.NEXT_PUBLIC_LINKEDIN, ""),
  github: env(process.env.NEXT_PUBLIC_GITHUB, ""),
  githubOrg: env(process.env.NEXT_PUBLIC_GITHUB_ORG, ""),
  domain: env(process.env.NEXT_PUBLIC_DOMAIN, "example.com"),

  // Positioning
  title: env(
    process.env.NEXT_PUBLIC_TITLE,
    "Building tools that make AI actually work for developers",
  ),
  keywords: env(
    process.env.NEXT_PUBLIC_KEYWORDS,
    "TypeScript,Node.js,AI Agents",
  ).split(","),

  // Now section
  nowDescription: env(
    process.env.NEXT_PUBLIC_NOW_DESCRIPTION,
    "Building a knowledge management system to power business in the agentic era.",
  ),
} as const;
