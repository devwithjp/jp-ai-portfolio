import type { ResumeEntry } from "./types";

// Portfolio-centric resume. The "Experience" entries are placeholders for JP to
// replace with real roles; the "Selected projects" come straight from real, built work.
export const resumeSummary =
  "AI Product Engineer who builds, evaluates, and ships AI products end-to-end — RAG, agents, evaluation harnesses, and multimodal UX — and pairs every build with PM artifacts: PRDs, metrics, roadmaps, and experiment plans.";

export const experience: ResumeEntry[] = [
  {
    period: "20XX – Present",
    title: "[Your most recent role]",
    org: "[Company]",
    points: [
      "[Replace with a real achievement — quantify impact where possible.]",
      "[Replace with a real achievement.]",
    ],
  },
  {
    period: "20XX – 20XX",
    title: "[Earlier role]",
    org: "[Company]",
    points: ["[Replace with a real achievement.]"],
  },
];

export const education: ResumeEntry[] = [
  {
    period: "20XX – 20XX",
    title: "[Degree]",
    org: "[Institution]",
    points: [],
  },
];

// Resume bullets pulled from the portfolio projects, ready to paste into a CV.
export const resumeBulletsAiEngineer: string[] = [
  "Built four hosted AI apps (Next.js + TypeScript, deployed on Vercel) spanning evaluation, RAG, multimodal, and agents — each mock-first so demos run with zero API keys.",
  "Implemented an LLM evaluation harness combining deterministic checks with an LLM-as-judge and per-run cost/latency tracking, surfaced as a release gate.",
  "Built a RAG pipeline (chunk → embed → cluster → retrieve → generate) over user feedback with pgvector and a ≥2-citation grounding guardrail.",
  "Built a human-in-the-loop agent with a manual tool-calling loop, approval gates, and an append-only audit trail.",
];

export const resumeBulletsAiPm: string[] = [
  "Authored PRDs, metric frameworks (north star / activation / retention / quality / guardrail), and experiment plans for four AI products.",
  "Reframed model evaluation as a measured release gate, replacing a vibes-based ship decision with a defensible one.",
  "Designed evidence-first and trust-by-design AI UX (citations, confidence labels, approval queues, audit trails) where the guardrail metric protects user trust.",
  "Scoped MVPs with explicit in/out decisions and a credible MVP → V2 roadmap for each product.",
];
