import { pedestal } from "./pedestal";
import { getUni } from "./uni";

// The three pieces shown first, on the home page and at the top of /projects.
// Real work leads: the venture, the capstone, and a product shipped solo.
// Everything else on /projects sits behind "Show all projects".

export type Featured = {
  title: string;
  kicker: string;
  blurb: string;
  meta: string;
  href: string;
  external?: boolean;
  cta: string;
  shot: string;
  /** "contain" for diagrams that must not be cropped. */
  fit?: "cover" | "contain";
};

const smartcare = getUni("smartcare-imu");
const gitit = getUni("gitit");

export const featured: Featured[] = [
  {
    title: pedestal.name,
    kicker: "My venture",
    blurb: "An AI communication coach for high-stakes rooms. Mobile app, backend, and coach, built end to end.",
    meta: "iOS + Android · Flutter · Supabase",
    href: pedestal.url,
    external: true,
    cta: "Visit pedestaltech.dev",
    shot: pedestal.shot,
  },
  {
    title: "SmartCare",
    kicker: "Capstone · team of six",
    blurb:
      "Early, explainable warnings when an older adult's mobility declines. Wearable data in, activity classified, a personal baseline tracked, a risk alert out.",
    meta: "Macro-F1 0.774 on held-out subjects · React · FastAPI · PyTorch",
    href: `/projects#${smartcare.slug}`,
    cta: "Read the write-up",
    shot: smartcare.shot,
    fit: smartcare.fit,
  },
  {
    title: "gitit",
    kicker: "Personal product",
    blurb:
      "Reddit for repos and agent skills. Describe a problem, get ranked repos, skills or MCP servers with the reasons people voted, and install from your editor.",
    meta: "54x faster ingestion · Next.js · pgvector · MCP",
    href: `/projects#${gitit.slug}`,
    cta: "Read the write-up",
    shot: gitit.shot,
    fit: gitit.fit,
  },
];
