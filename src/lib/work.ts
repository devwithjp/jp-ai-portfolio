import { caseStudies, caseworkUrl } from "./casework";
import { projects } from "./projects";
import { uniProjects } from "./uni";

// The homepage "Selected work" index. Merges the five playable case studies and
// the four hosted products into one authored list, each row previewing its real
// screenshot on hover. Derived from the source data so nothing drifts.

export type WorkItem = {
  n: string;
  title: string;
  blurb: string;
  meta: string;
  tags: string[];
  href: string;
  shot: string;
  cta: string;
};

export type WorkGroup = {
  label: string;
  caption: string;
  items: WorkItem[];
};

const pad = (n: number) => String(n).padStart(2, "0");
const firstSentence = (s: string) => {
  const i = s.indexOf(". ");
  return i === -1 ? s : s.slice(0, i + 1);
};

const PRODUCT_SHOT: Record<string, string> = {
  "agenteval-studio": "/shots/product-agenteval.png",
  "signaldesk-ai": "/shots/product-signaldesk.png",
  "screensense-qa": "/shots/product-screensense.png",
  "workflowpilot-safe-agents": "/shots/product-workflow.png",
};

const products = projects.filter((p) => PRODUCT_SHOT[p.slug]);

// Real, team-built or personally shipped work leads. Poolside is a side build, so it sits last.
const uniItem = (slug: string, n: number, cta: string): WorkItem => {
  const u = uniProjects.find((x) => x.slug === slug)!;
  return {
    n: pad(n),
    title: u.title,
    blurb: firstSentence(u.blurb),
    meta: u.kind.split(" · ").slice(0, 2).join(" · "),
    tags: u.stack.slice(0, 3),
    href: `/projects#${u.slug}`,
    shot: u.shot,
    cta,
  };
};
const LEAD = ["smartcare-imu", "gitit", "health-aware-recipes", "germination-chamber"];

export const workGroups: WorkGroup[] = [
  {
    label: "Built with a team, evaluated honestly",
    caption: "Coursework and personal products with real data, real results, and the limits stated.",
    items: LEAD.map((slug, i) => uniItem(slug, i + 1, "Read the write-up")),
  },
  {
    label: "Playable case studies",
    caption: "Five AI PM skills, five real products, five decisions you make instead of read about.",
    items: caseStudies.map((c, i) => ({
      n: pad(LEAD.length + i + 1),
      title: c.title,
      blurb: c.hook,
      meta: c.company,
      tags: [c.skill],
      href: `${caseworkUrl}/${c.slug}`,
      shot: c.shot ?? "",
      cta: "Play it",
    })),
  },
  {
    label: "Products, built end to end",
    caption: "Working demos in mock mode, each with an engineering case study and a product case study.",
    items: products.map((p, i) => ({
      n: pad(LEAD.length + caseStudies.length + i + 1),
      title: p.title,
      blurb: firstSentence(p.pitch),
      meta: p.category.split(" / ")[0],
      tags: p.roleSignals,
      href: `/projects/${p.slug}`,
      shot: PRODUCT_SHOT[p.slug],
      cta: "Open case study",
    })),
  },
  {
    label: "Side build",
    caption: "Built for myself, because I swim.",
    items: [uniItem("poolside", LEAD.length + caseStudies.length + products.length + 1, "Read the write-up")],
  },
];

export const allWork = workGroups.flatMap((g) => g.items);
