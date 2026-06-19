import type { BlogPost } from "./types";

// Writing, tech and life. Voice: plain, declarative, one idea per paragraph.
// Lines starting with "- " render as list items.
export const posts: BlogPost[] = [
  {
    slug: "mock-first",
    title: "Build the demo before you have the keys",
    date: "2026-06-13",
    category: "tech",
    summary: "A demo that needs a live API key is a demo that will eventually break in front of the wrong person.",
    tags: ["engineering", "product"],
    body: [
      "Nobody clicking your project link in six months is going to paste in an API key. If the demo calls a live model on load, the first thing they see is an error, or a bill you forgot to cap.",
      "So I build mock-first. Every app has a runner with two implementations behind one interface.",
      "- No key set: return synthetic but realistic output with a bit of fake latency. No keys, no database, no cost.",
      "- Key set: the same interface swaps in the real model.",
      "Three things fall out of this. The hosted demo always works. CI is free and deterministic, because it never depends on a paid call. And the real integration stays a clean, swappable boundary instead of getting smeared through the code.",
      "The cost is that you have to design the output contract first and treat the model as one way of satisfying it. That's just good engineering, so it isn't really a cost.",
    ],
  },
  {
    slug: "llm-judge-chaperone",
    title: "An LLM judge needs a chaperone",
    date: "2026-06-13",
    category: "tech",
    summary: "Asking a model 'is this good?' and trusting the answer is how you ship noise. Pair it with checks it can't fake.",
    tags: ["engineering", "evals"],
    body: [
      "When I built an eval tool, the tempting move was to ask a model whether an output was good and believe it. That's noisy and it costs money on every call.",
      "So the cheap, deterministic checks run first, schema, must-include, must-exclude, regex. They're free and they catch the obvious failures before any model sees them.",
      "Only what's left goes to an LLM judge, scored against an explicit rubric with a confidence label. When the judge and the checks disagree, I surface it instead of hiding it.",
      "The framing matters as much as the scoring. The output isn't a number, it's a decision: ship or hold. 'Block this release' is more useful than '3.7 out of 5.'",
    ],
  },
  {
    slug: "trust-is-the-product",
    title: "For agents, the safety is the product",
    date: "2026-06-13",
    category: "tech",
    summary: "Approval gates, audit trails, and rollback aren't friction on top of an agent. For most buyers they're the thing being bought.",
    tags: ["product", "agents", "safety"],
    body: [
      "I started building an agent that does workflows. It quickly became an agent you can trust to do workflows, which is a different product.",
      "The interesting surface turned out to be the scaffolding. Nothing runs until a human approves it. Every proposal, approval, and action gets written to an append-only log. The tools are mocks with a dry-run default, so you can prove the safety model with zero blast radius.",
      "When I demo it, people don't poke at the model. They poke at the audit trail and the permissions. That tells you what they're actually buying.",
    ],
  },
  {
    slug: "confidence-before-skill",
    title: "Confidence comes before skill, not after",
    date: "2026-06-10",
    category: "life",
    summary: "Teaching kids to swim taught me the order is backwards from what most people assume.",
    tags: ["water", "teaching", "learning"],
    body: [
      "People assume comfort is a reward for competence. You get good at something, and then you relax. In the water it's the other way round.",
      "I've watched technically strong swimmers freeze the moment they couldn't see the bottom. And I've watched nervous five-year-olds, once they felt safe, learn to dive in a single afternoon.",
      "The fear isn't a small thing you push through on the way to the skill. It's the thing in the way of the skill. Remove it first and the learning gets fast.",
      "This is true well outside the pool. People don't perform their way into confidence. They get comfortable, and then they perform.",
    ],
  },
  {
    slug: "stayed-for-building",
    title: "I started with code, I stayed for building",
    date: "2026-06-08",
    category: "life",
    summary: "Engineering was the door, not the room.",
    tags: ["product", "career"],
    body: [
      "I learned to code because it was the shortest path to making things. For a while I thought that meant I wanted to be an engineer.",
      "Then I worked on a product used by tens of millions of people and saw how little of its success came from the engineering. It came from understanding people, what they wanted, what they'd trust, what was worth building at all.",
      "I don't think that makes engineering less important. It makes it a tool. The interesting question was never 'can I build this?' It was 'is this worth building, and for whom?'",
      "That's the question I like now. It's why I moved toward product. Same love of making things; better question.",
    ],
  },
  {
    slug: "comfort-before-performance",
    title: "Guiding people through fear, not forcing them",
    date: "2026-06-05",
    category: "life",
    summary: "What teaching swimming taught me about leading people.",
    tags: ["teaching", "leadership", "water"],
    body: [
      "You cannot rush someone through fear. Push a frightened kid off the edge and you don't get a swimmer, you get a kid who's now also afraid of you.",
      "What works is slower and quieter. Small steps. Letting them set the pace and meeting them just past it. Being calm so they can borrow some of it.",
      "I've come to think that's most of what good leadership is too. Not motivating people past their limits, building enough trust that the limits move on their own.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
