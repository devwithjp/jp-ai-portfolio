// Filter tabs on /projects. Each piece of work carries the kinds of work it shows,
// so a recruiter can narrow the page to the lens they're hiring for.

export type ProjectType = "product" | "ai" | "web" | "mobile" | "hardware" | "research";

export const projectTypes: { id: ProjectType; label: string }[] = [
  { id: "product", label: "Product" },
  { id: "ai", label: "AI engineering" },
  { id: "web", label: "Web & full-stack" },
  { id: "mobile", label: "Mobile" },
  { id: "hardware", label: "Hardware & IoT" },
  { id: "research", label: "Research" },
];

// Groups where every item is the same kind of work.
export const groupTypes = {
  pedestal: ["product", "ai", "mobile"],
  casework: ["product"],
  products: ["ai", "web"],
  lab: ["ai", "research"],
} satisfies Record<string, ProjectType[]>;

// Uni projects and side builds differ card to card, so each is typed on its own.
export const itemTypes: Record<string, ProjectType[]> = {
  "smartcare-imu": ["ai", "web"],
  gitit: ["product", "web", "ai"],
  "health-aware-recipes": ["ai", "research"],
  "germination-chamber": ["hardware", "ai"],
  "pitchscore-ai": ["ai", "web"],
  poolside: ["web"],
};

/** Every type any of these items carries, for wrapping a whole section. */
export const typesOf = (slugs: string[]) => [...new Set(slugs.flatMap((s) => itemTypes[s]))];

// Side builds that live outside the main case-study set.
export const pitchscore = {
  title: "PitchScore AI",
  pitch:
    "Practise a spoken pitch in the browser. Record it, upload it privately, get it transcribed, and get a structured scorecard from a hosted open-weight model.",
  stack: ["Next.js", "Supabase", "Whisper STT", "Groq / Ollama", "Zod", "Vitest"],
  url: "https://github.com/devwithjp/pitchscore-ai",
};
