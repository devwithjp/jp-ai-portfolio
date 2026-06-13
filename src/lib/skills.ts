import type { SkillTrack } from "./types";

export const skillTracks: Record<string, SkillTrack> = {
  "ai-engineering": {
    track: "ai-engineering",
    title: "AI Engineering",
    claim: "I can ship production-style AI systems, not just notebooks.",
    keywords: [
      "LLM", "RAG", "agents", "tool calling", "evals", "embeddings",
      "vector search", "observability", "deployment", "cost", "security", "full-stack AI",
    ],
    skills: [
      { skill: "Hosted LLM products", description: "Full-stack, deployed AI apps — not demos in a notebook.", projects: ["agenteval-studio", "signaldesk-ai", "screensense-qa", "workflowpilot-safe-agents"] },
      { skill: "RAG & source-grounded output", description: "Ingest, chunk, embed, retrieve, and generate with citations.", projects: ["signaldesk-ai"] },
      { skill: "Agentic workflows & tool calling", description: "Planner + manual tool-calling loop with human approval.", projects: ["workflowpilot-safe-agents"] },
      { skill: "LLM evals & regression testing", description: "Deterministic checks + LLM-as-judge, scorecards, release gates.", projects: ["agenteval-studio"] },
      { skill: "Observability: latency & cost", description: "Per-run latency and token-cost tracking on every call.", projects: ["agenteval-studio", "signaldesk-ai"] },
      { skill: "Multimodal reasoning", description: "Vision critique of UI screenshots with structured output.", projects: ["screensense-qa"] },
      { skill: "Embeddings & vector search", description: "pgvector similarity search; deterministic mock vectors.", projects: ["signaldesk-ai"] },
      { skill: "Secure secret handling", description: "No secrets in code; .env.example everywhere; mock-first.", projects: ["agenteval-studio", "signaldesk-ai", "screensense-qa", "workflowpilot-safe-agents"] },
      { skill: "Structured output contracts", description: "Strict JSON schemas validated before render and test.", projects: ["screensense-qa", "agenteval-studio"] },
      { skill: "Full-stack TypeScript / Next.js", description: "App Router, API routes, Tailwind, Vercel deployment.", projects: ["agenteval-studio", "signaldesk-ai", "screensense-qa", "workflowpilot-safe-agents"] },
    ],
  },
  "ai-product-management": {
    track: "ai-product-management",
    title: "AI Product Management",
    claim:
      "I can define, measure, and launch AI products because I understand both product strategy and AI implementation constraints.",
    keywords: [
      "PRD", "ICP", "roadmap", "activation", "retention", "experimentation",
      "AI UX", "trust", "safety", "model quality", "launch readiness", "GTM",
    ],
    skills: [
      { skill: "PRD writing", description: "Problem, ICP, scope, metrics, guardrails — one per project.", projects: ["agenteval-studio", "signaldesk-ai", "screensense-qa", "workflowpilot-safe-agents"] },
      { skill: "User-problem discovery", description: "Sharp problem statements grounded in a real user job.", projects: ["signaldesk-ai", "screensense-qa"] },
      { skill: "ICP & persona definition", description: "Named target segment and the job they're hiring the product for.", projects: ["agenteval-studio", "signaldesk-ai", "screensense-qa", "workflowpilot-safe-agents"] },
      { skill: "MVP scoping", description: "Explicit in/out decisions that keep the build shippable.", projects: ["agenteval-studio", "signaldesk-ai", "screensense-qa", "workflowpilot-safe-agents"] },
      { skill: "Metrics & guardrails", description: "North star, activation, retention, quality, and guardrail per product.", projects: ["agenteval-studio", "signaldesk-ai", "screensense-qa", "workflowpilot-safe-agents"] },
      { skill: "Experiment design", description: "Hypotheses and success criteria tied to the north star.", projects: ["agenteval-studio", "signaldesk-ai"] },
      { skill: "AI UX & trust design", description: "Confidence labels, citations, approval gates, audit trails.", projects: ["signaldesk-ai", "screensense-qa", "workflowpilot-safe-agents"] },
      { skill: "Trade-off narrative", description: "Clear reasoning on what was simplified and why.", projects: ["agenteval-studio", "signaldesk-ai", "screensense-qa", "workflowpilot-safe-agents"] },
      { skill: "Roadmapping & prioritisation", description: "Opportunity scoring and a credible MVP → V2 path.", projects: ["signaldesk-ai", "workflowpilot-safe-agents"] },
      { skill: "Launch & GTM thinking", description: "How early users are reached and what 'ready' means.", projects: ["agenteval-studio", "signaldesk-ai"] },
    ],
  },
};
