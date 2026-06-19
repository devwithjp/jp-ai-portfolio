import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "agenteval-studio",
    title: "AgentEval Studio",
    pitch:
      "An evaluation and observability workbench that compares AI prompt / RAG / agent variants on quality, cost, latency, and failure modes — and recommends a release gate.",
    category: "Evaluation / LLMOps",
    status: "mock-demo",
    roleSignals: ["AI Engineering", "AI Product Management"],
    stack: ["Next.js", "TypeScript", "Anthropic API", "LLM-as-judge", "Supabase (optional)", "Vercel"],
    githubUrl: "https://github.com/",
    icp: "Small AI product teams and solo builders shipping LLM features without enterprise-grade eval tooling.",
    features: [
      "Create eval suites from test cases",
      "Register prompt / model variants",
      "Run batch evals (deterministic checks + LLM-as-judge)",
      "Score on relevance, faithfulness, safety, latency, and cost",
      "Compare experiments side by side",
      "Release-gate recommendation + exportable report",
    ],
    architecture: [
      { label: "Prompt / version registry", detail: "Register variants under test with metadata." },
      { label: "Test dataset", detail: "10–25 curated cases per suite, versioned." },
      { label: "Evaluator runners", detail: "Deterministic checks (schema, regex, must-include) run first." },
      { label: "LLM-as-judge", detail: "claude-haiku-4-5 scores each output against a rubric." },
      { label: "Scorecards", detail: "Per-dimension quality, cost, and latency aggregates." },
      { label: "Release gate", detail: "Pass/block recommendation against a configurable threshold." },
    ],
    metrics: [
      { label: "Suites passing release threshold", value: "north", kind: "north", note: "% of eval suites clearing the configured gate." },
      { label: "First eval run completed", value: "activation", kind: "activation" },
      { label: "Weekly repeated eval runs", value: "retention", kind: "retention" },
      { label: "Judge agreement & pass rate", value: "quality", kind: "quality" },
      { label: "Unsafe / hallucinated output rate", value: "guardrail", kind: "guardrail" },
    ],
    engineering: [
      {
        heading: "Problem",
        body: [
          "Teams ship impressive AI demos but cannot tell whether the system is reliable, improving, or regressing after a prompt or model change. There is no cheap, repeatable way to gate a release on measured quality.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "A Next.js app with API-route handlers — no separate backend was needed. Eval runs persist to a minimal projects/runs/feedback schema (Supabase in real mode, in-memory fixtures in mock mode).",
        ],
        bullets: [
          "Deterministic checks (schema validation, must-include/exclude, regex) run before any model call — they are free and catch the obvious failures.",
          "LLM-as-judge (claude-haiku-4-5) scores the remainder against an explicit rubric with confidence labels.",
          "Every run records latency and an estimated token cost so quality is never evaluated in isolation.",
        ],
      },
      {
        heading: "Reliability & trade-offs",
        body: [
          "Judge noise is the central risk, so the design pairs the judge with deterministic checks, rubrics, worked examples, and confidence labels, and surfaces disagreement rather than hiding it.",
          "Mock mode ships first: with no API key the runner returns synthetic-but-realistic scores, so the demo works for anyone and CI never depends on a paid call.",
        ],
      },
    ],
    product: [
      {
        heading: "Product problem",
        body: [
          "AI PMs and eng leads need a defensible answer to 'is this good enough to ship?' Today that decision is vibes-based. AgentEval turns it into a measured, repeatable gate.",
        ],
      },
      {
        heading: "ICP & MVP scope",
        body: [
          "ICP: a small AI product team or solo builder deploying LLM features. In scope for MVP: suite creation, batch eval, scorecards, comparison, and a release-gate recommendation. Out of scope: org RBAC, dataset labelling workflows, and live production tracing.",
        ],
      },
      {
        heading: "Metrics & experiments",
        body: [
          "North star is the share of eval suites that clear the release threshold. A natural first experiment: does showing a release-gate recommendation (vs raw scores) increase the rate at which users actually act on a failing eval?",
        ],
      },
    ],
    learnings: [
      "Deterministic checks remove most of the LLM-judge's workload and cost — run them first.",
      "A release-gate recommendation is more actionable than a wall of scores.",
      "Mock-first means the demo never breaks and CI stays free.",
    ],
    interviewTalkingPoints: [
      "Why LLM-as-judge needs deterministic guardrails and confidence labels to be trustworthy.",
      "How I'd validate judge quality against human spot-checks.",
      "Framing eval pass-rate as a release gate rather than a vanity metric.",
    ],
    screenshots: [
      { src: "/screenshots/agenteval-studio/dashboard.png", caption: "Suite dashboard with recent runs" },
      { src: "/screenshots/agenteval-studio/run.png", caption: "Running an eval across variants" },
      { src: "/screenshots/agenteval-studio/report.png", caption: "Quality / cost / latency scorecard + release gate" },
    ],
    aiEngineerBullets: [
      "Built an LLM evaluation harness combining deterministic checks with an LLM-as-judge (Claude Haiku) and per-run cost/latency tracking.",
      "Designed a mock-first runner so the hosted demo works with zero API keys and CI never depends on a paid model call.",
    ],
    aiPmBullets: [
      "Defined ICP, MVP scope, and a release-gate metric framework (north star, activation, retention, quality, guardrail) for an LLM eval product.",
      "Reframed model evaluation as a shippable release gate, turning a vibes-based decision into a measured one.",
    ],
  },

  {
    slug: "signaldesk-ai",
    title: "SignalDesk AI",
    pitch:
      "An AI product-intelligence workspace that ingests user feedback, clusters pain points, finds evidence, and generates PRDs, roadmap bets, and experiment plans — every claim cited.",
    category: "RAG / Product Strategy",
    status: "mock-demo",
    roleSignals: ["AI Engineering", "AI Product Management"],
    stack: ["Next.js", "TypeScript", "Anthropic API", "OpenAI embeddings", "Supabase pgvector", "Vercel"],
    githubUrl: "https://github.com/",
    icp: "Early-stage SaaS teams and founders with 50–500 feedback items from CSVs, app reviews, or notes.",
    features: [
      "Upload feedback CSV or paste notes",
      "Embed + semantically cluster themes",
      "Evidence-backed insights with citations",
      "Generate a PRD from validated opportunities",
      "Generate roadmap + experiment plans",
      "Track product-metric assumptions",
    ],
    architecture: [
      { label: "Ingest", detail: "CSV / pasted notes, validated and normalized." },
      { label: "Chunk + embed", detail: "OpenAI text-embedding-3-small (real) or deterministic local vectors (mock)." },
      { label: "Cluster", detail: "Group feedback into themes; score opportunity size + confidence." },
      { label: "Retrieve", detail: "pgvector similarity search fetches top evidence snippets." },
      { label: "Generate (RAG)", detail: "claude-opus-4-8 drafts PRD / roadmap / experiments grounded in citations." },
      { label: "Verify", detail: "Guardrail requires ≥2 evidence links per recommendation." },
    ],
    metrics: [
      { label: "Validated opportunities → PRDs", value: "north", kind: "north" },
      { label: "First import + cluster view", value: "activation", kind: "activation" },
      { label: "Repeat imports / PRD updates", value: "retention", kind: "retention" },
      { label: "% recommendations with evidence links", value: "quality", kind: "quality" },
      { label: "Unsupported recommendation rate", value: "guardrail", kind: "guardrail" },
    ],
    engineering: [
      {
        heading: "Problem",
        body: [
          "Product teams drown in scattered qualitative feedback and struggle to convert it into prioritised, evidence-backed product decisions. Generic LLM summaries hallucinate and cite nothing.",
        ],
      },
      {
        heading: "RAG architecture",
        body: [
          "A classic retrieval-augmented pipeline: ingest → chunk → embed → cluster → retrieve → generate, with every generated recommendation grounded in retrieved source snippets.",
        ],
        bullets: [
          "Embeddings: OpenAI text-embedding-3-small in real mode; deterministic local vectors in mock mode so the demo needs no key.",
          "Vector search via Supabase pgvector; clusters carry an opportunity score from size + confidence + novelty.",
          "Generation uses claude-opus-4-8 with structured JSON output and a hard guardrail: no recommendation ships without ≥2 evidence links.",
        ],
      },
      {
        heading: "Trade-offs",
        body: [
          "The embeddings dependency is the one place Claude can't cover end-to-end (no first-party embeddings API), so real mode adds OpenAI for vectors only. Mock mode removes even that, keeping the demo fully self-contained.",
        ],
      },
    ],
    product: [
      {
        heading: "Product problem",
        body: [
          "PMs need to move from a pile of feedback to a defensible roadmap. SignalDesk makes the evidence trail first-class: every opportunity, PRD line, and experiment links back to real user quotes.",
        ],
      },
      {
        heading: "ICP & MVP scope",
        body: [
          "ICP: early-stage SaaS / founder with 50–500 feedback items. MVP: import, cluster, ask-over-feedback, and one-click PRD + roadmap + experiment generation with citations. Out of scope: integrations with live ticketing tools and multi-user review workflows.",
        ],
      },
      {
        heading: "Metrics & guardrails",
        body: [
          "North star: validated opportunities converted into PRDs. The key guardrail — unsupported recommendation rate — directly protects trust, which is the whole value proposition of an evidence-first tool.",
        ],
      },
    ],
    learnings: [
      "Citations are the product, not a nicety — they convert a generic summary into a defensible decision.",
      "Anthropic has no embeddings API, so RAG needs a second provider (or a mock) for vectors.",
      "Minimum cluster sizes and confidence labels keep insights from going generic.",
    ],
    interviewTalkingPoints: [
      "How I enforce grounding (≥2 citations) to prevent unsupported recommendations.",
      "Why I split providers: Claude for generation, OpenAI for embeddings.",
      "Turning qualitative feedback into a quantified opportunity score.",
    ],
    screenshots: [
      { src: "/screenshots/signaldesk-ai/import.png", caption: "Import feedback CSV or paste notes" },
      { src: "/screenshots/signaldesk-ai/clusters.png", caption: "Themes / clusters with evidence" },
      { src: "/screenshots/signaldesk-ai/prd.png", caption: "Generated PRD with citations" },
    ],
    aiEngineerBullets: [
      "Built a RAG pipeline (ingest → chunk → embed → cluster → retrieve → generate) over user feedback with pgvector and source-grounded generation.",
      "Enforced a citation guardrail (≥2 evidence links per recommendation) to eliminate unsupported AI claims.",
    ],
    aiPmBullets: [
      "Designed a research-to-roadmap workflow that converts raw feedback into cited PRDs, roadmap bets, and experiment plans.",
      "Defined an evidence-first metric framework where the core guardrail (unsupported recommendation rate) protects user trust.",
    ],
  },

  {
    slug: "screensense-qa",
    title: "ScreenSense QA",
    pitch:
      "A multimodal UX/product QA tool that reviews UI screenshots for accessibility, friction, copy clarity, and visual hierarchy — and returns prioritised, severity-scored recommendations.",
    category: "Multimodal / Product UX",
    status: "mock-demo",
    roleSignals: ["AI Engineering", "AI Product Management"],
    stack: ["Next.js", "TypeScript", "Claude vision (claude-opus-4-8)", "Structured output", "Vercel"],
    githubUrl: "https://github.com/",
    icp: "Solo builders and small teams reviewing landing pages, dashboards, onboarding, and forms before shipping.",
    features: [
      "Upload a screenshot",
      "Choose a rubric: accessibility, PM, conversion, trust",
      "Multimodal critique with severity scoring",
      "UX issues ranked by severity",
      "Suggested fixes + before/after summary",
      "Exportable issue backlog",
    ],
    architecture: [
      { label: "Upload", detail: "Browser image upload; never stored without consent." },
      { label: "Preprocess", detail: "Normalize and validate the image into the pipeline schema." },
      { label: "Multimodal critique", detail: "claude-opus-4-8 vision analyses the screenshot against a rubric." },
      { label: "Rubric scoring", detail: "Structured JSON: summary, findings[], recommendations[], risks[], confidence." },
      { label: "Severity ranking", detail: "Findings ordered by impact so the worst issues surface first." },
      { label: "Report", detail: "Annotated issue list + prioritised recommendations, exportable." },
    ],
    metrics: [
      { label: "Actionable UX issues per review", value: "north", kind: "north" },
      { label: "First screenshot review completed", value: "activation", kind: "activation" },
      { label: "Repeat review after redesign", value: "retention", kind: "retention" },
      { label: "User accepts issue as useful", value: "quality", kind: "quality" },
      { label: "False / unsupported design claims", value: "guardrail", kind: "guardrail" },
    ],
    engineering: [
      {
        heading: "Problem",
        body: [
          "Small teams ship interfaces without design review, accessibility checks, or PM-grade critique. They need fast, structured feedback before launch — not a generic 'looks good'.",
        ],
      },
      {
        heading: "Multimodal pipeline",
        body: [
          "A single-call vision pipeline: upload → preprocess → multimodal critique → rubric scoring → severity-ranked report. No tool-calling needed; the model returns a strict JSON contract.",
        ],
        bullets: [
          "Structured output: summary, findings[], recommendations[], risks[], confidence — validated before render.",
          "Mock mode serves pre-computed critiques from fixtures, so the demo works with no key and CI is deterministic.",
          "Real mode uses claude-opus-4-8 vision behind the same interface, gated on an API key.",
        ],
      },
      {
        heading: "Trade-offs",
        body: [
          "Pixel-accurate bounding boxes are deferred; the MVP ships issue cards ranked by severity, which is the 80/20 of value and avoids the hardest part of visual grounding.",
        ],
      },
    ],
    product: [
      {
        heading: "Product problem",
        body: [
          "Who has the problem: founders and small teams without a designer. ScreenSense gives them a credible heuristic review in seconds, framed as a prioritised backlog rather than a critique essay.",
        ],
      },
      {
        heading: "ICP & MVP scope",
        body: [
          "ICP: solo builder / small SaaS reviewing key screens. MVP: upload, rubric choice, severity-ranked findings, suggested fixes, export. Out of scope: bounding-box annotation and Figma integration.",
        ],
      },
      {
        heading: "Metrics & guardrails",
        body: [
          "North star: actionable issues found per review. The guardrail — false/unsupported design claims — keeps the tool honest; a confidence field on every finding makes uncertainty visible.",
        ],
      },
    ],
    learnings: [
      "Severity-ranked issue cards beat a wall of prose for a busy builder.",
      "A strict JSON output contract makes multimodal output safe to render and test.",
      "Confidence labels turn 'AI critique' into something a PM can triage.",
    ],
    interviewTalkingPoints: [
      "Designing a strict structured-output contract for a vision model.",
      "Why I deferred bounding boxes and what I'd add next.",
      "How severity + confidence make AI critique triageable.",
    ],
    screenshots: [
      { src: "/screenshots/screensense-qa/upload.png", caption: "Upload a screenshot + choose rubric" },
      { src: "/screenshots/screensense-qa/findings.png", caption: "UX + accessibility findings by severity" },
      { src: "/screenshots/screensense-qa/report.png", caption: "Suggested fixes + before/after summary" },
    ],
    aiEngineerBullets: [
      "Built a multimodal QA pipeline using Claude vision with a strict structured-output contract (findings, recommendations, risks, confidence).",
      "Shipped mock-first with fixture critiques so the demo and CI run without a vision API key.",
    ],
    aiPmBullets: [
      "Framed AI design critique as a prioritised, severity-scored backlog rather than an essay, making it triageable by PMs.",
      "Defined a quality/guardrail metric pair (issue usefulness vs unsupported design claims) for a multimodal product.",
    ],
  },

  {
    slug: "workflowpilot-safe-agents",
    title: "WorkflowPilot Safe Agents",
    pitch:
      "A safe-agent demo that turns a business goal into a proposed multi-step workflow, runs only human-approved tool calls, and records every action in an audit trail.",
    category: "Agents / Trust & Safety",
    status: "mock-demo",
    roleSignals: ["AI Engineering", "AI Product Management"],
    stack: ["Next.js", "TypeScript", "Claude tool-use", "Human-in-the-loop", "Audit logging", "Vercel"],
    githubUrl: "https://github.com/",
    icp: "Ops/AI PMs and small teams automating low-risk workflows: drafting emails, creating tickets, summarising notes.",
    features: [
      "Create a workflow goal",
      "Agent proposes a tool-call plan",
      "Human approval queue (approve / reject / edit)",
      "Execute mock tools first (dry-run by default)",
      "Full audit trail of proposed → approved → executed",
      "Failure / rollback report + safety settings",
    ],
    architecture: [
      { label: "Goal", detail: "User states a plain-language objective." },
      { label: "Planner", detail: "claude-opus-4-8 proposes ordered steps with tool, args, reasoning." },
      { label: "Approval queue", detail: "No tool runs until a human approves — the core safety gate." },
      { label: "Execution", detail: "Approved steps run against mock tools (send_email_mock, create_ticket_mock, …)." },
      { label: "Audit log", detail: "Every proposal, approval, execution, and failure is recorded." },
      { label: "Recovery", detail: "Failure report + rollback suggestions; policy violations are never auto-retried." },
    ],
    metrics: [
      { label: "Approved workflows completed without rework", value: "north", kind: "north" },
      { label: "First dry-run plan approved", value: "activation", kind: "activation" },
      { label: "Repeat workflow-template use", value: "retention", kind: "retention" },
      { label: "Steps completed with no policy violation", value: "quality", kind: "quality" },
      { label: "Unauthorized tool / action attempts", value: "guardrail", kind: "guardrail", note: "Target: 0." },
    ],
    engineering: [
      {
        heading: "Problem",
        body: [
          "Agents are powerful but risky. Before teams trust automation they need approval gates, observability, permissions, and clear failure recovery. WorkflowPilot makes trust the default, not an afterthought.",
        ],
      },
      {
        heading: "Safe-agent architecture",
        body: [
          "A planner proposes a tool-call plan; nothing executes until a human approves. Tools are mock by default (dry-run), and every state transition is written to an append-only audit log.",
        ],
        bullets: [
          "Human approval queue is the load-bearing safety mechanism — the manual agentic loop intercepts every tool call.",
          "Mock tools (send_email_mock, create_ticket_mock, summarise_doc_mock, update_crm_mock) return realistic results without touching anything real.",
          "Permissions model + safety settings define what may run; policy violations are surfaced as errors, never auto-retried.",
        ],
      },
      {
        heading: "Trade-offs",
        body: [
          "No real Gmail / Slack / Jira integration ships in the demo by design — autonomy is the risk, so the MVP proves the safety scaffolding (approval, audit, rollback) against mock tools first.",
        ],
      },
    ],
    product: [
      {
        heading: "Product problem",
        body: [
          "Ops and AI PMs want the leverage of agents without the blast radius. The product's job is to make automation trustworthy: every action is previewed, approved, logged, and reversible.",
        ],
      },
      {
        heading: "ICP & MVP scope",
        body: [
          "ICP: a small team automating low-risk workflows. MVP: goal → plan → approval → mock execution → audit. Out of scope (until explicitly approved): real external integrations and unattended execution.",
        ],
      },
      {
        heading: "Trust by design",
        body: [
          "The guardrail metric — unauthorized tool/action attempts — has a target of zero. Trust isn't a feature here; it's the product. The safety settings and audit trail are the things a buyer actually evaluates.",
        ],
      },
    ],
    learnings: [
      "Human-in-the-loop approval is the feature, not friction — it's what makes agents shippable.",
      "An append-only audit trail is what turns 'an agent did something' into accountability.",
      "Mock tools + dry-run default let you demo agent safety without any real blast radius.",
    ],
    interviewTalkingPoints: [
      "Why I used a manual agentic loop (not an auto tool-runner) to intercept every call for approval.",
      "How the audit log + permissions model establish trust.",
      "What it takes to safely connect a real tool — and why the demo doesn't.",
    ],
    screenshots: [
      { src: "/screenshots/workflowpilot-safe-agents/plan.png", caption: "Agent-proposed tool-call plan" },
      { src: "/screenshots/workflowpilot-safe-agents/approval.png", caption: "Human approval queue" },
      { src: "/screenshots/workflowpilot-safe-agents/audit.png", caption: "Execution log + audit trail" },
    ],
    aiEngineerBullets: [
      "Built a human-in-the-loop agent with a manual tool-calling loop that gates every action behind explicit approval and an append-only audit log.",
      "Implemented a permissions model and mock-tool sandbox so agent safety can be demoed with zero real-world blast radius.",
    ],
    aiPmBullets: [
      "Designed a trust-by-design agent product where approval gates, audit trails, and rollback are the core value, not add-ons.",
      "Set a zero-tolerance guardrail (unauthorized tool attempts) and framed safety settings as the primary buyer-evaluated surface.",
    ],
  },
];

// Each app is mounted under this same domain at /live/<subpath> (Vercel multi-zones),
// and its source lives at github.com/devwithjp/jp-<slug>. Derived so the links stay
// consistent in one place.
const SUBPATH: Record<string, string> = {
  "agenteval-studio": "agenteval",
  "signaldesk-ai": "signaldesk",
  "screensense-qa": "screensense",
  "workflowpilot-safe-agents": "workflow",
};

for (const p of projects) {
  const sub = SUBPATH[p.slug];
  if (sub) p.liveUrl = `/live/${sub}`;
  p.githubUrl = `https://github.com/devwithjp/jp-${p.slug}`;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
