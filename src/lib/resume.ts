import type { ResumeEntry } from "./types";

// Real roles from JP's story. Dates are placeholders ("20XX"), fill in exact ones.
export const resumeSummary =
  "I build AI products end to end, and I care most about whether they're worth building. Engineer turned product person; equally at home in a codebase, a PRD, and a room full of users.";

export const experience: ResumeEntry[] = [
  {
    period: "20XX",
    title: "Product Manager Intern",
    org: "0→1 startup · Sydney",
    points: [
      "Ran discovery to spec on an early-stage product, user interviews, problem framing, scoping, and the metrics to judge it by.",
      "The internship that made the pivot obvious: I like deciding what to build at least as much as building it.",
    ],
  },
  {
    period: "20XX – 20XX",
    title: "Frontend Engineer",
    org: "Bewakoof (consumer ecommerce, ~50M users)",
    points: [
      "Built and shipped UI for a consumer product at real scale.",
      "Learned the lesson I keep relearning: products win on user empathy, design, and positioning, not engineering alone.",
    ],
  },
  {
    period: "Pre-grad",
    title: "Founder (attempted)",
    org: "Logistics startup, “Uber for trucks”",
    points: [
      "Built and pitched a logistics platform for small and mid-size factories.",
      "Applied to Y Combinator; reached the top 10% of rejected applications. An early, useful taste of thinking past the code.",
    ],
  },
  {
    period: "Ongoing",
    title: "Swim Teacher",
    org: "In The Deep Swim School · Sydney",
    points: [
      "Teach children aged 3–10 with a confidence-before-skill method.",
      "An ongoing lesson in patience, calm, and earning trust, skills I use well beyond the pool.",
    ],
  },
];

export const education: ResumeEntry[] = [
  {
    period: "20XX – 20XX",
    title: "Master of Artificial Intelligence",
    org: "UNSW · Sydney",
    points: ["Plus founder programs and pitch competitions in the UNSW startup ecosystem."],
  },
  {
    period: "20XX – 20XX",
    title: "B.E. Computer Science",
    org: "India",
    points: [],
  },
];

// Resume bullets pulled from the portfolio projects, ready to paste into a CV.
export const resumeBulletsAiEngineer: string[] = [
  "Built and shipped four hosted AI apps (Next.js + TypeScript, Vercel) across evaluation, RAG, multimodal, and agents, each mock-first, so the demos run with zero API keys.",
  "Built an LLM evaluation harness: deterministic checks plus an LLM judge with per-run cost and latency, surfaced as a ship/hold release gate.",
  "Built a RAG pipeline (chunk → embed → cluster → retrieve → generate) over user feedback with pgvector and a ≥2-citation grounding rule.",
  "Built a human-in-the-loop agent with a manual tool-calling loop, approval gates, and an append-only audit trail.",
];

export const resumeBulletsAiPm: string[] = [
  "Wrote the PRD, metric framework, and experiment plan for each of four AI products.",
  "Reframed model evaluation as a measured release gate, turning a vibes call into a defensible one.",
  "Designed evidence-first and trust-by-design AI UX (citations, confidence, approval queues, audit) where the guardrail metric protects the user.",
  "Scoped MVPs with explicit in/out calls and a credible path from MVP to V2.",
];
