import type { BlogPost } from "./types";

// Learning notes that double as interview talking points. Lines starting with "- "
// render as list items.
export const posts: BlogPost[] = [
  {
    slug: "why-mock-first-ai-demos",
    title: "Why I build every AI demo mock-first",
    date: "2026-06-13",
    summary:
      "A portfolio demo that needs a live API key is a demo that breaks. Here's the pattern I use so every project works with zero credentials.",
    tags: ["engineering", "product", "deployment"],
    body: [
      "A recruiter clicking your project link six months from now will not paste in an API key. If the demo calls a live model on load, the first thing they experience is an error — or worse, a bill you forgot to cap.",
      "So I build mock-first: every AI app has a runner with two implementations behind one interface.",
      "- Mock mode (default): when no API key is set, the runner returns synthetic-but-realistic output with simulated latency. No keys, no database, no cost.",
      "- Real mode: the same interface swaps in the live model adapter once a key is provided.",
      "This has three payoffs. The hosted demo always works. CI never depends on a paid call, so it's free and deterministic. And the real integration is a clean, swappable boundary instead of something smeared through the codebase.",
      "The cost is discipline: you have to design the output contract first and treat the model as one implementation of it. That's good engineering anyway.",
    ],
  },
  {
    slug: "llm-as-judge-needs-guardrails",
    title: "LLM-as-judge is only trustworthy with deterministic guardrails",
    date: "2026-06-13",
    summary:
      "An LLM judge is noisy on its own. Pairing it with deterministic checks, rubrics, and confidence labels is what makes an eval defensible.",
    tags: ["engineering", "evals"],
    body: [
      "When I built AgentEval Studio, the temptation was to ask a model 'is this output good?' and trust the answer. That's noisy and expensive.",
      "Instead, deterministic checks run first — schema validation, must-include / must-exclude, regex. They're free, fast, and catch the obvious failures before any model call.",
      "Only what's left goes to an LLM-as-judge, scored against an explicit rubric with worked examples and a confidence label. Disagreement is surfaced, not hidden.",
      "The product framing matters too: the output is a release-gate recommendation, not a wall of scores. 'Block this release' is more actionable than '3.7/5'.",
    ],
  },
  {
    slug: "trust-is-the-product-for-agents",
    title: "For agents, trust is the product",
    date: "2026-06-13",
    summary:
      "Approval gates, audit trails, and rollback aren't friction on top of an agent — for most buyers they are the thing being bought.",
    tags: ["product", "agents", "safety"],
    body: [
      "WorkflowPilot started as 'an agent that does workflows' and quickly became 'an agent you can trust to do workflows'. The interesting product surface is the safety scaffolding.",
      "- A human approval queue: nothing executes until a person approves the plan.",
      "- An append-only audit trail: every proposal, approval, execution, and failure is recorded.",
      "- Mock tools and a dry-run default: you can prove the safety model with zero real-world blast radius.",
      "The guardrail metric — unauthorized tool attempts — has a target of zero. When I demo it, the audit trail and safety settings are what people actually evaluate.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
