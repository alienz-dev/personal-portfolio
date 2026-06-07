import { config } from "@/lib/config";
import exampleContent from "./content.example.json";

// Try to load local content override (gitignored, not in repo).
// Falls back to example content if not present.
let localContent: typeof exampleContent | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  localContent = require("./content.local.json") as typeof exampleContent;
} catch {
  // content.local.json doesn't exist — use example
}

const data = localContent ?? exampleContent;

// ─── Site (from env vars + content) ──────────────────────────────────────────

export const site = {
  name: config.fullName,
  displayName: config.displayName,
  title: config.title,
  domain: config.domain,
  email: config.email,
  github: config.github,
  githubOrg: config.githubOrg,
  linkedin: config.linkedin,
  keywords: config.keywords,
} as const;

export const now = {
  heading: "Now",
  description: config.nowDescription,
} as const;

// ─── Content (from JSON) ─────────────────────────────────────────────────────

export const highlights = data.highlights as readonly {
  readonly metric: string;
  readonly description: string;
}[];

export interface CaseStudy {
  title: string;
  tagline: string;
  situation: string;
  decision: string;
  outcome: string;
  metric: string;
  tech: readonly string[];
  github?: string;
  status: "live" | "coming-soon";
}

export const caseStudies: readonly CaseStudy[] = data.caseStudies.map((cs) => ({
  ...cs,
  github: cs.github ?? (config.githubOrg ? `https://github.com/${config.githubOrg}/${cs.title}` : undefined),
  status: cs.status as "live" | "coming-soon",
}));

export const experience = data.experience as readonly {
  readonly company: string;
  readonly title: string;
  readonly location: string;
  readonly period: string;
  readonly type: string;
  readonly bullets: readonly string[];
  readonly recentWork?: readonly string[];
  readonly awards?: readonly string[];
}[];

export const education = data.education as readonly {
  readonly degree: string;
  readonly school: string;
  readonly year: string;
}[];

export const contact = {
  email: config.email,
  github: config.github,
  linkedin: config.linkedin,
  cta: data.contact.cta,
} as const;
