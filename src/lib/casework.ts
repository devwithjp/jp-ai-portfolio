// The five playable AI PM case studies (the Casework app, mounted at /live/casework).
// One per core AI PM skill, each grounded in a real consumer product.

export type CaseStudy = {
  slug: string;
  title: string;
  skill: string;
  company: string;
  hook: string;
  twist: string;
  minutes: number;
  /** Portfolio screenshot, captured from the live app. */
  shot?: string;
};

export const caseworkUrl = "/live/casework";

export const caseStudies: CaseStudy[] = [
  {
    slug: "canva-prd",
    title: "A PRD that runs",
    skill: "AI PRDs",
    company: "Canva",
    hook: "Brand Voice Guardrails for Magic Write teams.",
    twist:
      "Every requirement carries a live acceptance check. Flip an assumption off and watch the requirements it was holding up go to at-risk.",
    minutes: 4,
    shot: "/shots/casework-canva.png",
  },
  {
    slug: "duolingo-judge",
    title: "Judge the judge",
    skill: "AI evals",
    company: "Duolingo",
    hook: "Calibrating an LLM judge for AI conversation practice.",
    twist:
      "You grade six transcripts before the judge does. The gap between your scores and its scores is the actual product decision.",
    minutes: 5,
    shot: "/shots/casework-duolingo.png",
  },
  {
    slug: "spotify-dj-launch",
    title: "Green light",
    skill: "AI launch plans",
    company: "Spotify",
    hook: "Rolling out AI DJ to five new markets.",
    twist:
      "A six-week launch simulator. Expand, hold, restrict, or roll back while cost overruns and safety incidents land on your desk.",
    minutes: 5,
    shot: "/shots/casework-spotify.png",
  },
  {
    slug: "airbnb-redteam",
    title: "Red lines",
    skill: "AI risk & safety",
    company: "Airbnb",
    hook: "A safety case for an AI trip concierge.",
    twist:
      "Eight real attack patterns against two system prompts. Every failure files itself into a NIST-mapped risk register.",
    minutes: 4,
    shot: "/shots/casework-airbnb.png",
  },
  {
    slug: "netflix-metrics",
    title: "The metric detective",
    skill: "AI product metrics",
    company: "Netflix",
    hook: "An A/B readout that looks better than it is.",
    twist:
      "Topline says ship. Three planted problems say otherwise. Find them in the segments before you make the call.",
    minutes: 5,
    shot: "/shots/casework-netflix.png",
  },
];
