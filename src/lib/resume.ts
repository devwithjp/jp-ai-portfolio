import type { ResumeEntry } from "./types";

// Real history from JP's resume + LinkedIn. Voice: plain, declarative, no em dashes.
export const resumeSummary =
  "AI Product Manager with an engineer's hands. I spent 2+ years building fullstack products for millions of users, then moved toward deciding what to build. I finished a Master's in AI at UNSW and now work as an AI Product Manager at Enluma Health.";

// Reverse-chronological. Tight bullets, real metrics.
export const experience: ResumeEntry[] = [
  {
    id: "enluma",
    period: "2026 - Present", // TODO(JP): add start month
    title: "AI Product Manager",
    org: "Enluma Health · Australia",
    link: "https://enluma.health",
    points: [
      // TODO(JP): replace with what you own and have shipped.
      "AI Product Manager on Consult+, an AI pre-consultation intake tool for specialist practices. Patients tell their history by voice or text at home; clinicians get a structured summary before the consult.",
    ],
  },
  {
    id: "pedestal",
    period: "Jun 2026 - Present",
    title: "Co-founder", // TODO(JP): confirm title + start date
    org: "Pedestal · pedestaltech.dev",
    link: "https://pedestaltech.dev",
    points: [
      "Building an AI communication coach for high-stakes rooms: record, get feedback on words, voice, and presence, drill one weakness, compare two takes.",
      "Built the Flutter app for iOS and Android end to end: 14 scenarios, 34 drills, the full practice loop verified on both platforms.",
      "Supabase backend with six edge functions and RLS on every table; raw video never leaves the phone.",
      "Coach quality lab with deterministic metrics, DSPy few-shot compilation, and DeepEval rubrics behind a live quality gate.",
      "Ran user interviews, set positioning, pricing, and the waitlist launch, and pitched Pedestal at the UNSW Peter Farrell Cup 2026.",
    ],
  },
  {
    id: "rekro-pm",
    period: "May 2025 - Jan 2026",
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
    id: "startmate",
    period: "Jun 2025 - Aug 2025",
    title: "Founder Fellow",
    org: "Startmate Student Founder Bootcamp",
    points: [
      "Full-scholarship fellow. A two-week sprint from idea and team formation to MVP, customer interviews, and investor-style pitching with 1:1 coaching.",
    ],
  },
  {
    id: "swim-teacher",
    period: "Oct 2024 - Present",
    title: "Swim Teacher",
    org: "In The Deep Swim School · Sydney",
    points: [
      "Teach children aged 3 to 10. Keep classes safe and structured. An ongoing lesson in patience, communication, and earning trust.",
    ],
  },
  {
    id: "rekro-intern",
    period: "Jan 2025 - Feb 2025",
    title: "Software Engineer Intern",
    org: "Rekro · Sydney",
    points: [
      "Built 0→1 site components in Next.js and Convex; partnered with the CTO on the near-term roadmap and developer workflows.",
    ],
  },
  {
    id: "blue-sky",
    period: "Apr 2023 - Jul 2023",
    title: "Full Stack Engineer",
    org: "Blue Sky Analytics · India",
    points: [
      "Built React/Gatsby UIs and Node/Sequelize REST APIs for an API-first geospatial climate-data product.",
      "Used MapLibre and D3 to make satellite datasets usable in client workflows.",
    ],
  },
  {
    id: "bewakoof",
    period: "Jan 2021 - Mar 2022",
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
    id: "freelance-moodle",
    period: "Mar 2022 - Jan 2024",
    title: "Freelance Consultant",
    org: "EdTech / Moodle",
    points: [
      "Automated enrolment, credentialing, and reporting with Moodle plugins, themes, and APIs. +30% engagement, -40% grading time.",
      "Led tech strategy and mentored a team of 5 interns; +25% efficiency with JIRA.",
    ],
  },
  {
    id: "inkers",
    period: "May 2018 - Jul 2018",
    title: "AI Intern",
    org: "The Inkers · India",
    points: [
      "Trained a DenseNet to 79% on CIFAR-10; prototyped behavior cloning for steering-angle prediction; explored Winograd convolutions with skip connections.",
    ],
  },
];

export const education: ResumeEntry[] = [
  {
    id: "unsw",
    period: "2024 - 2026",
    title: "Master of IT, AI & Data Science",
    org: "UNSW · Sydney",
    points: ["Graduated 2026. Seventeen subjects across AI and machine learning, data, computer science, and product, design and delivery."],
    // From the transcript (T2 2024 to 2026). Topics follow the UNSW course outlines.
    courses: [
      { code: "COMP9814", title: "Extended Artificial Intelligence", group: "AI & machine learning", topics: ["Search and problem solving", "Logic and knowledge representation", "Reasoning under uncertainty", "Autonomous agents", "Machine learning", "Vision and language processing", "Python"] },
      { code: "COMP9444", title: "Neural Networks and Deep Learning", group: "AI & machine learning", topics: ["Backpropagation and optimisation", "Generalisation and regularisation", "Convolutional networks", "Recurrent networks and LSTMs", "Word vectors", "Deep reinforcement learning: TD, Q-learning, policy learning", "Autoencoders, adversarial training, generative models", "PyTorch"] },
      { code: "COMP9517", title: "Computer Vision", group: "AI & machine learning", topics: ["Image processing", "Feature detection and matching", "Pattern recognition", "Image segmentation", "Motion and tracking", "Deep learning for vision", "A team vision project in Python"] },
      { code: "COMP6713", title: "Natural Language Processing", group: "AI & machine learning", topics: ["Text processing and classification", "Language models", "Word embeddings", "Transformers and LLMs", "NLP evaluation", "Interpretability research project"] },
      { code: "COMP9727", title: "Recommender Systems", group: "AI & machine learning", topics: ["Memory-based collaborative filtering", "Model-based CF and matrix factorisation", "Learning to rank", "Content-based recommenders", "Group and sequential recommenders", "Deep learning recommenders", "Reinforcement learning for recommendation"] },
      { code: "COMP9313", title: "Big Data Management", group: "Data", topics: ["Hadoop MapReduce", "HDFS and YARN", "Apache Spark", "Mining data streams", "Finding similar items at scale", "Graph data management", "NoSQL: HBase and Hive"] },
      { code: "COMP9311", title: "Database Systems", group: "Data", topics: ["ER modelling", "Relational model and algebra", "SQL and PostgreSQL", "Stored procedures and triggers", "Normalisation", "Transactions and concurrency", "Indexing and query processing"] },
      { code: "COMP9024", title: "Data Structures and Algorithms", group: "Computer science", topics: ["Abstract data types", "Linked lists, trees, and hash tables", "Graph algorithms: search, shortest paths, spanning trees", "Sorting and searching", "Complexity analysis", "C programming"] },
      { code: "COMP9021", title: "Principles of Programming", group: "Computer science", topics: ["Python", "Data structures in Python", "Recursion", "Object-oriented programming", "Algorithmic problem solving"] },
      { code: "COMP9020", title: "Foundations of Computer Science", group: "Computer science", topics: ["Logic and proofs", "Sets, relations, and functions", "Induction and recursion", "Graph theory", "Combinatorics and probability", "Asymptotic analysis"] },
      { code: "COMP9331", title: "Computer Networks and Applications", group: "Computer science", topics: ["HTTP, DNS, and the application layer", "TCP and UDP", "Congestion and flow control", "IP and routing", "Link layer and wireless", "Socket programming"] },
      { code: "COMP6733", title: "Internet of Things Design Studio", group: "Computer science", topics: ["IoT system architecture", "Bluetooth Low Energy, 802.15.4, 6LoWPAN, LPWAN", "CoAP and cloud services on AWS", "Localisation and time synchronisation", "Sensor filtering and data fusion", "Light-weight ML at the edge and activity recognition", "IoT security", "Arduino and MicroPython, team build"] },
      { code: "COMP9511", title: "Human Computer Interaction", group: "Product, design & delivery", topics: ["User-centred design", "Requirements and user research", "Prototyping", "Usability evaluation and heuristics", "Accessibility and internationalisation", "Cognition and models of interaction"] },
      { code: "COMP9900", title: "Information Technology Project", group: "Product, design & delivery", topics: ["Capstone team software project", "Agile and Scrum", "Jira, Git, and GitHub", "Requirements to delivery", "Team evaluation and reporting"] },
      { code: "GSOE9820", title: "Engineering Project Management", group: "Product, design & delivery", topics: ["Project selection and strategy", "Scope, scheduling, and budgets", "Risk management", "Monitoring and control", "Leading project teams", "A project management plan"] },
      { code: "GSOE9210", title: "Engineering Decision Structures", group: "Product, design & delivery", topics: ["Decisions under risk and uncertainty", "Bayesian reasoning", "Game theory", "Sequential decision making", "Social choice"] },
      { code: "GSOE9010", title: "Engineering Postgraduate Research Skills", group: "Product, design & delivery", topics: ["Literature review", "Research methods", "Technical writing", "Presenting research"] },
    ],
  },
  {
    id: "msruas",
    period: "",
    title: "B.Tech, Computer Science",
    org: "M.S. Ramaiah University of Applied Sciences · Bangalore",
    points: [],
  },
  {
    id: "udacity",
    period: "2020",
    title: "UX Design + Front-End Developer Nanodegrees",
    org: "Udacity",
    points: [],
  },
];

// Reforge Product Foundations: detailed so it reads as something learned, not a line item.
export const reforge = {
  name: "Reforge · Product Foundations",
  completed: "Dec 2025",
  blurb:
    "Reforge runs the programs that senior product leaders at companies like Meta, Stripe, and HubSpot use to level up. Product Foundations walks the full feature lifecycle, opportunity to launch, the way strong product teams actually run it.",
  learned: [
    {
      h: "Feature opportunity validation",
      d: "Score an opportunity on user value, business value, and strategic fit before building. Size the upside with a funnel model and pitch it to leadership.",
    },
    {
      h: "Feature design",
      d: "Run focused brainstorming against desirability, feasibility, and viability to land on the right solution, not just the first one.",
    },
    {
      h: "Feature development",
      d: "Map stakeholders, set milestones, and manage risk through the sprint with defensive and offensive plays. Know the PM's job at each step.",
    },
    {
      h: "Feature launch & operation",
      d: "Coordinate the launch, define how performance is measured, and run post-launch communication so the work actually lands.",
    },
  ],
  certHref: "/reforge-product-foundations.pdf",
};

export const certifications: string[] = [
  "Reforge · Product Foundations (full feature lifecycle: opportunity, design, development, launch)",
  "Machine Learning, Andrew Ng (Coursera)",
  "UNSW Peter Farrell Cup 2026, pitched Pedestal",
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
    label: "Interpretability / research",
    items: ["Mechanistic interpretability", "Activation probing", "TransformerLens", "Causal interventions (activation patching)", "Representation geometry (PCA, mass-mean)", "PyTorch", "scikit-learn"],
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
  "Interpretability research (UNSW team project): probed the residual stream of five language models with TransformerLens to detect input corruption the output hid; 0.96+ linear-probe accuracy, confirmed causal with activation patching.",
];

export const resumeBulletsAiPm: string[] = [
  "Wrote the PRD, metric framework, and experiment plan for each of four AI products.",
  "Reframed model evaluation as a measured release gate, turning a vibes call into a defensible one.",
  "Designed evidence-first and trust-by-design AI UX (citations, confidence, approval queues, audit) where the guardrail metric protects the user.",
  "Scoped MVPs with explicit in/out calls and a credible path from MVP to V2.",
];
