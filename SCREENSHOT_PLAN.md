# Screenshot Plan

Capture these after each app is deployed, save as PNG under `public/screenshots/<slug>/`,
then the portfolio's `ScreenshotGallery` can swap from framed placeholders to real images.

We do **not** ship fabricated screenshots — placeholders are clearly labelled until real
captures exist.

## Per project (3 each, matching `src/lib/projects.ts`)

**agenteval-studio/**
- `dashboard.png` — suite dashboard with sample suites
- `run.png` — running an eval across variants
- `report.png` — quality/cost/latency scorecard + release gate

**signaldesk-ai/**
- `import.png` — import feedback CSV / paste
- `clusters.png` — themes/clusters with evidence
- `prd.png` — generated PRD with citations

**screensense-qa/**
- `upload.png` — upload + rubric picker
- `findings.png` — UX + accessibility findings by severity
- `report.png` — suggested fixes + before/after summary

**workflowpilot-safe-agents/**
- `plan.png` — agent-proposed tool-call plan
- `approval.png` — human approval queue
- `audit.png` — execution log + audit trail

## How to capture
1. Run each app (deployed URL or `npm run dev`) in mock mode.
2. Use a consistent viewport (e.g. 1440×900), dark theme.
3. Export PNG, optimise, drop into the matching folder using the exact filenames above.
4. In `screenshot-gallery.tsx`, switch the placeholder block to `<img src={s.src} ... />`.
