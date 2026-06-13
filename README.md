# JP — AI Engineer + AI Product Manager Portfolio

The portfolio site for **Jyothiprakash S (JP)**, an AI Product Engineer. It presents four hosted AI products — each with a working demo, an engineering case study, and a product case study — to support applications for both **AI Engineer** and **AI Product Manager** roles.

> One-line pitch: *I define, build, evaluate, and ship AI products — and prove it with hosted demos.*

## Live demo

- **Portfolio:** _(deploying to Vercel — URL added at launch)_

## The four projects

| Project | Signal | Demo |
|---|---|---|
| AgentEval Studio | LLM evaluation / LLMOps | mock-first |
| SignalDesk AI | RAG + product strategy | mock-first |
| ScreenSense QA | Multimodal UX review | mock-first |
| WorkflowPilot Safe Agents | Tool-calling agents + safety | mock-first |

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS-first design tokens, dark-default theme with a light toggle)
- **Geist** Sans + Mono
- Content as typed data (`src/lib`) — no CMS
- Deployed on **Vercel**; CI via **GitHub Actions**

## Architecture

- `src/app` — App Router pages (home, projects, project detail, skills tracks, about, resume, blog, contact).
- `src/components` — shared UI kit (`ProjectCard`, `CaseStudyTabs`, `MetricPanel`, `SkillEvidenceMap`, `ArchitectureDiagram`, `ScreenshotGallery`, nav/footer, theme toggle).
- `src/lib` — content spine: `site`, `projects` (full case studies + metrics), `skills`, `resume`, `blog`.
- Design system in `src/app/globals.css` via Tailwind v4 `@theme` and semantic CSS-variable tokens (`bg-bg`, `text-fg`, `text-muted`, `border-line`, `bg-accent`, …).

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

No environment variables are required — the portfolio is fully static.

## Environment variables

None required. Optional analytics IDs only (see `.env.example`):

- `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` — optional product analytics.

No secrets are committed; `.env.local` is git-ignored.

## Deployment

1. Push to GitHub.
2. Import into Vercel (framework preset: Next.js).
3. (Optional) add the PostHog env vars.
4. Deploy and verify all routes + project links.

## AI engineering skills demonstrated

Full-stack TypeScript/Next.js delivery, RAG, agents + tool calling, LLM evals, multimodal reasoning, embeddings/vector search, observability (cost/latency), structured-output contracts, secure secret handling, mock-first deployment. See `/skills/ai-engineering`.

## AI PM skills demonstrated

PRD writing, user-problem discovery, ICP/persona definition, MVP scoping, metric frameworks + guardrails, experiment design, AI UX & trust design, roadmapping, trade-off narrative, GTM. See `/skills/ai-product-management`.
