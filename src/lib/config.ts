// Personal data — read from environment variables, never committed to repo.
// Set these in .env.local (dev) or Vercel environment variables (production).

export const config = {
  // Personal info
  fullName: process.env.NEXT_PUBLIC_FULL_NAME ?? "Your Name",
  displayName: process.env.NEXT_PUBLIC_DISPLAY_NAME ?? "You",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@example.com",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? "",
  github: process.env.NEXT_PUBLIC_GITHUB ?? "",
  githubOrg: process.env.NEXT_PUBLIC_GITHUB_ORG ?? "",
  domain: process.env.NEXT_PUBLIC_DOMAIN ?? "example.com",

  // Positioning
  title:
    process.env.NEXT_PUBLIC_TITLE ??
    "Building tools that make AI actually work for developers",
  keywords: (
    process.env.NEXT_PUBLIC_KEYWORDS ?? "TypeScript,Node.js,AI Agents"
  ).split(","),

  // Now section
  nowDescription:
    process.env.NEXT_PUBLIC_NOW_DESCRIPTION ??
    "Building a knowledge management system to power business in the agentic era.",
} as const;
