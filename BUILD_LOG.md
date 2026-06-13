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
