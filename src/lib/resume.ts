import type { ResumeEntry } from "./types";

// Real history from JP's resume + LinkedIn. Voice: plain, declarative, no em dashes.
export const resumeSummary =
  "AI Product Manager with an engineer's hands. I spent 2+ years building fullstack products for millions of users, then moved toward deciding what to build. Now doing a Master's in AI at UNSW and building AI products end to end.";

// Reverse-chronological. Tight bullets, real metrics.
export const experience: ResumeEntry[] = [
  {
    period: "May 2025 – Jan 2026",
    title: "Product Manager",
    org: "Rekro · Sydney",
    points: [
      "Took a 0→1 product from discovery to a production launch, owning the roadmap end to end.",
      "Drove discovery into PRDs, Figma flows, and an OKR-aligned roadmap; prioritised the backlog toward the MVP.",
      "Led a six-person engineering team, ran Agile sprints in Linear, and owned final PR review and prod merges. Cut cycle time ~20%.",
      "Ran competitor tear-downs and lean experiments (smoke, concierge) to de-risk bets before building.",
    ],
  },
  {
    period: "Jun 2025 – Aug 2025",
    title: "Founder Fellow",
    org: "Startmate Student Founder Bootcamp",
    points: [
      "Full-scholarship fellow. A two-week sprint from idea and team formation to MVP, customer interviews, and investor-style pitching with 1:1 coaching.",
    ],
  },
  {
    period: "Oct 2024 – Present",
    title: "Swim Teacher",
    org: "In The Deep Swim School · Sydney",
    points: [
      "Teach children aged 3 to 10. Keep classes safe and structured. An ongoing lesson in patience, communication, and earning trust.",
    ],
  },
  {
    period: "Jan 2025 – Feb 2025",
    title: "Software Engineer Intern",
    org: "Rekro · Sydney",
    points: [
      "Built 0→1 site components in Next.js and Convex; partnered with the CTO on the near-term roadmap and developer workflows.",
    ],
  },
  {
    period: "Apr 2023 – Jul 2023",
    title: "Full Stack Engineer",
    org: "Blue Sky Analytics · India",
    points: [
      "Built React/Gatsby UIs and Node/Sequelize REST APIs for an API-first geospatial climate-data product.",
      "Used MapLibre and D3 to make satellite datasets usable in client workflows.",
    ],
  },
  {
    period: "Jan 2021 – Mar 2022",
    title: "Senior Software Engineer (SDE1)",
    org: "Bewakoof.com · India",
    points: [
      "Shipped the listing, product-detail, and homepage journeys used by 50M+ recurring users.",
      "Led frontend for gift-card redemption; supported a festive spike that lifted revenue 65%.",
      "Cut JS bundle 20% and raised Lighthouse Performance 15% via code-splitting, memoization, and route-level lazy loading.",
      "Led Localization (Shopping in Hindi). Won 'Fastest Rookie to Rockstar'.",
    ],
  },
  {
    period: "Mar 2022 – Jan 2024",
    title: "Freelance Consultant",
    org: "EdTech / Moodle",
    points: [
      "Automated enrolment, credentialing, and reporting with Moodle plugins, themes, and APIs. +30% engagement, -40% grading time.",
      "Led tech strategy and mentored a team of 5 interns; +25% efficiency with JIRA.",
    ],
  },
  {
    period: "May 2018 – Jul 2018",
    title: "AI Intern",
    org: "The Inkers · India",
    points: [
      "Trained a DenseNet to 79% on CIFAR-10; prototyped behavior cloning for steering-angle prediction; explored Winograd convolutions with skip connections.",
    ],
  },
];

export const education: ResumeEntry[] = [
  {
    period: "2024 – Present",
    title: "Master of IT, AI & Data Science",
    org: "UNSW · Sydney",
    points: ["AI, deep learning, big data, NLP, and AI product design."],
  },
  {
    period: "",
    title: "B.Tech, Computer Science",
    org: "M.S. Ramaiah University of Applied Sciences · Bangalore",
    points: [],
  },
  {
    period: "2020",
    title: "UX Design + Front-End Developer Nanodegrees",
    org: "Udacity",
    points: [],
  },
];

export const certifications: string[] = [
  "Reforge: Product Management Foundations (the PM-craft program taught by senior product leaders)",
  "Machine Learning, Andrew Ng (Coursera)",
  "UNSW Peter Farrell Cup 2025, Startup Pitch (Semi-Finalist)",
  "Leadership Foundations (UNSW) + Strategic Thinking (AGSM)",
  "Swim Australia Teacher · CPR/AED/First Aid",
  "SSI Rescue Scuba Diver",
];

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Product",
    items: ["Discovery", "User interviews", "PRDs", "Figma flows", "OKRs / backlog", "Competitor analysis", "Experiment design (smoke / concierge)", "Stakeholder comms"],
  },
  {
    label: "AI / Engineering",
    items: ["React", "Next.js", "Node.js", "TypeScript", "LLMs", "RAG", "Prompt engineering", "REST APIs", "MapLibre / D3", "Webpack"],
  },
  {
    label: "Data / Process",
    items: ["Metrics instrumentation", "Agile (Linear)", "Performance audits", "Hypothesis testing", "Spreadsheet analysis"],
  },
];

// Resume bullets pulled from the portfolio projects, ready to paste into a CV.
export const resumeBulletsAiEngineer: string[] = [
  "Built and shipped four hosted AI apps (Next.js + TypeScript, Vercel) across evaluation, RAG, multimodal, and agents, each mock-first so the demos run with zero API keys.",
  "Built an LLM evaluation harness: deterministic checks plus an LLM judge with per-run cost and latency, surfaced as a ship/hold release gate.",
  "Built a RAG pipeline (chunk to embed to cluster to retrieve to generate) over user feedback with pgvector and a 2-plus-citation grounding rule.",
  "Built a human-in-the-loop agent with a manual tool-calling loop, approval gates, and an append-only audit trail.",
];

export const resumeBulletsAiPm: string[] = [
  "Wrote the PRD, metric framework, and experiment plan for each of four AI products.",
  "Reframed model evaluation as a measured release gate, turning a vibes call into a defensible one.",
  "Designed evidence-first and trust-by-design AI UX (citations, confidence, approval queues, audit) where the guardrail metric protects the user.",
  "Scoped MVPs with explicit in/out calls and a credible path from MVP to V2.",
];
