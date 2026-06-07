# personal-portfolio

Personal portfolio website — showcases AI engineering and software development work for Senior Software Developer / AI Engineer roles. Next.js 15 App Router + Tailwind CSS 4 + TypeScript.

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Typecheck: `npm run typecheck`
- Test all: `npm test`
- Test single: `npx vitest run tests/<path>`

## Workflow (SDD — Spec-Driven Development)

Features are built through a 3-phase lifecycle. **Do not skip phases.**

### Phase 1: Design (interactive — user makes decisions)
```
/grill <topic>       → Design interview (Q&A, explores design space)
/ba-validate <spec>  → Validate spec quality
/approve <spec>      → Approve spec for implementation
```

### Phase 2: Implement (automatic — walk away)
```
/sdd <feature>       → Full pipeline: plan → test → code → review → retro
```

### Phase 3: Review (human — evaluate results)
- Play with the feature, file issues if changes needed
- Run /sdd again for fixes, /grill for design changes

See @AGENTS.md for agent roles and coder workflow.

## Rules
@.claude/rules/safety.md
@.claude/rules/code-style.md
@.claude/rules/testing.md

## Agents
Custom agents in .claude/agents/:
- Main session: Supervisor/Planner, Sprint-Manager (/trio), Researcher (/researcher)
- Design: BA, Architect, Explorer, Research-Critic, UI-Designer, Data-Analyst
- Implement: Coder, Test-Manager, Tester
- Review: Reviewer-Lite, Reviewer

## Boundaries
- src/ and tests/ — writable
- specs/, .pipeline/ — read-only for agents
- Never pool:forks in vitest, never raw tsc --noEmit
