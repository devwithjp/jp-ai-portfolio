# BUILD_LOG — jp-ai-portfolio

Running log of completed steps, decisions, blockers, and next actions.

## 2026-06-13

### Completed
- Scaffolded Next.js 16 (App Router) + TypeScript + Tailwind v4 via create-next-app.
- Established the design system in `globals.css`: dark-default brand theme + `.light` toggle, semantic CSS-var tokens (`bg-bg`, `surface`, `elevated`, `line`, `fg`, `muted`, `accent` acid-lime, `link`), grid texture + accent glow utilities. Geist Sans/Mono.
- Built the content spine in `src/lib`: `types`, `site`, `projects` (4 projects with full tabbed case studies, architecture, metric frameworks, resume bullets), `skills` (two tracks → skill→evidence maps), `resume`, `blog` (3 learning notes).
- Built the shared component kit in `src/components`: `ui` primitives (Container/Section/Card/CTA/Tag/StatusBadge/Prose), `nav` (+footer), `theme-toggle`, `project-card`, `metric-panel`, `architecture-diagram` (CSS pipeline), `screenshot-gallery` (framed placeholders — no fabricated screenshots), `skill-evidence-map`, `case-study-tabs` (Product/Engineering/Demo/Metrics/Learnings).
- Built all pages: `/`, `/projects`, `/projects/[slug]`, `/skills/[track]`, `/about`, `/resume`, `/blog`, `/blog/[slug]`, `/contact`. 18 routes, all static/SSG.
- Added README, `.env.example` (no required secrets), GitHub Actions CI (lint + tsc + build), `next.config.ts` turbopack root pin.

### Decisions
- **Content as typed data, not MDX/CMS.** The tabbed case-study format (Product/Engineering/Demo/Metrics/Learnings) maps cleanly to structured data; avoids an MDX toolchain. Blog bodies use a markdown-lite renderer (`Prose`) where `- ` lines become list items.
- **Screenshots are intentional framed placeholders** captioned with what each capture will show — no fabricated images. Swapped for real captures after each app deploys.
- **Metrics are presented as frameworks (definitions), not fabricated numbers** — honest per the operating rules.
- Theme toggle reads initial state lazily (no setState-in-effect) to satisfy the React 19 / Next 16 lint rule; icon span uses `suppressHydrationWarning`.

### Status
- `npm run lint` clean; `npm run build` passes (18/18 routes prerendered).

### Next actions
- `git init` + initial commit (local; GitHub push deferred until `gh auth login`).
- Build AgentEval Studio as the reference app (golden core: schema types, mock-runner, api helpers, analytics, app UI primitives), then mirror the shared scaffold into `_golden/` here.
- After all apps deploy: capture screenshots, fill live URLs + real GitHub links, replace resume placeholders with real roles.

### Human-only / blocked
- `gh` not authenticated → GitHub repo creation + push pending JP login.
- Vercel deploy pending JP approval.

## 2026-06-19 — Milestone 5 (final integration)

### Completed
- All 5 repos built + verified: lint clean, `tsc --noEmit` clean, `next build` passing. Each app's engine verified end-to-end via its API.
- Added integration docs: `FINAL_PORTFOLIO_COMPLETION_REPORT.md` (full status + go-live steps + resume bullets + interview readiness), `2_MINUTE_DEMO.md`, `5_MINUTE_DEMO.md`, `RECRUITER_WALKTHROUGH.md`, `SCREENSHOT_PLAN.md`.
- Created `public/screenshots/<slug>/` folders (placeholders until post-deploy capture).

### Pending (human-only)
- `gh auth login` → then `gh repo create <repo> --private --source=. --push` for all 5.
- Vercel import per repo (no env vars needed for mock mode).
- After deploy: fill `liveUrl`/`githubUrl` in `src/lib/projects.ts` + each app `src/lib/site.ts`; capture screenshots; replace resume placeholders in `src/lib/resume.ts` with real roles.
