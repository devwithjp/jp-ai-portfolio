// Shared content types for the portfolio. Content lives as typed data (not a CMS)
// so the tabbed case-study format maps cleanly to structured sections.

export type Metric = {
  label: string;
  value: string;
  kind: "north" | "activation" | "retention" | "quality" | "guardrail";
  note?: string;
};

export type CaseStudySection = {
  heading: string;
  body: string[]; // paragraphs
  bullets?: string[];
};

export type ArchitectureStep = {
  label: string;
  detail: string;
};

export type Screenshot = {
  src: string; // path under /public/screenshots/<slug>/
  caption: string;
};

export type RoleSignal = "AI Engineering" | "AI Product Management";

export type Project = {
  slug: string;
  title: string;
  pitch: string;
  category: string;
  status: "live" | "mock-demo" | "planned";
  roleSignals: RoleSignal[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  icp: string;
  features: string[];
  architecture: ArchitectureStep[];
  metrics: Metric[];
  // Tabbed case study
  engineering: CaseStudySection[];
  product: CaseStudySection[];
  learnings: string[];
  interviewTalkingPoints: string[];
  screenshots: Screenshot[];
  aiEngineerBullets: string[];
  aiPmBullets: string[];
};

export type SkillEvidence = {
  skill: string;
  description: string;
  projects: string[]; // project slugs
};

export type SkillTrack = {
  track: "ai-engineering" | "ai-product-management";
  title: string;
  claim: string;
  keywords: string[];
  skills: SkillEvidence[];
};

export type ResumeEntry = {
  period: string;
  title: string;
  org?: string;
  points: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  body: string[]; // paragraphs (markdown-lite: lines starting with "- " render as list items)
};
