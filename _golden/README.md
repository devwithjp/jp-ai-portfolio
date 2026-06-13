# `_golden` — shared scaffold (source of truth)

These files are the **golden source** for code shared across the five repos
(portfolio + four AI apps). Because the apps live in separate repos, this folder
prevents the design system and primitives from drifting.

## What's here
- `styles/globals.css` — the design system (Tailwind v4 tokens, dark-default theme).
- `components/ui.tsx` — shared UI primitives (Container, Section, Card, CTA, Tag, Prose, …).
- `components/theme-toggle.tsx` — light/dark toggle.
- `lib/analytics.ts` — the analytics event contract + logger.
- `next.config.ts` — Turbopack root pin.

## How to sync into an app
When these change, copy them forward into each app repo:

```
cp _golden/styles/globals.css        <app>/src/app/globals.css
cp _golden/components/ui.tsx         <app>/src/components/ui.tsx
cp _golden/components/theme-toggle.tsx <app>/src/components/theme-toggle.tsx
cp _golden/lib/analytics.ts          <app>/src/lib/analytics.ts
cp _golden/next.config.ts            <app>/next.config.ts
```

Each app's `BUILD_LOG.md` notes the last sync. App-specific code (eval runner,
RAG pipeline, agent loop, etc.) is **not** shared — only the cross-cutting
scaffold lives here.
