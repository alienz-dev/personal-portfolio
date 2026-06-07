# mingli.world

> Building tools that make AI actually work for developers.

Personal portfolio site — showcases developer tooling, autonomous research systems, and AI-powered workflow automation.

**Live → [mingli.world](https://mingli.world)**

[![CI](https://github.com/alienz-dev/personal-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/alienz-dev/personal-portfolio/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)

## Featured Projects

| Project | What It Does | Status |
|---------|-------------|--------|
| [dev-kit](https://github.com/alienz-dev/dev-kit) | AI-native development toolkit — methodology as code | ✅ Open source |
| [auto-research](https://github.com/alienz-dev/auto-research) | Autonomous overnight research engine — idea seeds to papers | ✅ Open source |
| browser-cli | 3-layer browser automation — CDP, accessibility trees, AppleScript | 🔜 Coming soon |

## Tech Stack

| Technology | Why |
|-----------|-----|
| [Next.js 15](https://nextjs.org/) | App Router, Turbopack, server components |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first, fast iteration |
| [TypeScript 5.7](https://www.typescriptlang.org/) | Strict mode, type safety |
| [Vercel](https://vercel.com/) | Zero-config deployment, edge CDN |

## Configuration

Two-layer config — **personal data** (env vars) and **content** (JSON). Neither is committed.

### 1. Personal Data (environment variables)

```bash
cp .env.example .env.local
# Edit .env.local with your name, email, LinkedIn, etc.
```

For Vercel: set the same variables in **Project Settings → Environment Variables**.

See [`.env.example`](.env.example) for all available options.

### 2. Portfolio Content (JSON)

```bash
cp src/data/content.example.json src/data/content.local.json
# Edit content.local.json with your projects, experience, education, etc.
```

`content.local.json` is gitignored — your personal content never enters the repo.

See [`content.example.json`](src/data/content.example.json) for the full schema.

## Development

```bash
# Clone
git clone https://github.com/alienz-dev/personal-portfolio.git
cd personal-portfolio

# Install
npm install

# Configure (see above)
cp .env.example .env.local
cp src/data/content.example.json src/data/content.local.json

# Dev server
npm run dev          # → http://localhost:3000

# Build
npm run build        # production build

# Verify
npm run typecheck    # type checking
npm test             # tests
```

## Project Structure

```
src/
  app/
    layout.tsx       # Root layout (fonts, metadata, theme)
    page.tsx         # Main page — all sections
    globals.css      # Tailwind + custom properties
  data/
    content.ts       # Portfolio content (TypeScript modules)
  lib/
    config.ts        # Environment variable config (personal data)
specs/
  SPEC-001.md        # Feature specification (SDD)
.pipeline/
  state.json         # Pipeline state (FSM)
  transitions.json   # Gate transitions
.claude/
  agents/            # Agent definitions (13 roles)
  rules/             # Safety, code style, testing
  skills/            # Grill, SDD, orient, researcher
  hooks/             # Pre-commit gates
```

## Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| Single-page design | Recruiters scan, don't browse — reduce friction |
| Content in TypeScript | Type-safe, version-controlled, no CMS dependency |
| Dark mode default | Reads as "technical" to target audience |
| Bento grid layout | Trending 2025-2026, modular card layout |
| Minimal animation | Fade-in on scroll only — fast load, no distractions |

## Design System

| Token | Value |
|-------|-------|
| Background | `#0a0a0a` (dark) / `#ffffff` (light) |
| Accent | `#3b82f6` (blue) |
| Text | `#e5e5e5` (dark) / `#171717` (light) |
| Font (body) | Inter |
| Font (code) | JetBrains Mono |

## License

[MIT](LICENSE)
