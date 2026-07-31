import { caseStudies, caseworkUrl } from "./casework";
import { projects } from "./projects";

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

export const workGroups: WorkGroup[] = [
  {
    label: "Playable case studies",
    caption: "Five AI PM skills, five real products, five decisions you make instead of read about.",
    items: caseStudies.map((c, i) => ({
      n: pad(i + 1),
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
    caption: "Working demos, each with an engineering case study and a product case study.",
    items: products.map((p, i) => ({
      n: pad(caseStudies.length + i + 1),
      title: p.title,
      blurb: firstSentence(p.pitch),
      meta: p.category.split(" / ")[0],
      tags: p.roleSignals,
      href: `/projects/${p.slug}`,
      shot: PRODUCT_SHOT[p.slug],
      cta: "Open case study",
    })),
  },
];

export const allWork = workGroups.flatMap((g) => g.items);
