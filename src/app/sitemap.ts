import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { projects } from "@/lib/projects";
import { caseStudies, caseworkUrl } from "@/lib/casework";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/skills", "/skills/ai-engineering", "/skills/ai-product-management", "/projects/lab", "/water", "/lens", "/writing", "/about", "/resume", "/contact"];
  const top = routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.8,
  }));
  const projectPages = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const caseworkPages = [
    { url: `${SITE_URL}${caseworkUrl}`, changeFrequency: "monthly" as const, priority: 0.9 },
    ...caseStudies.map((c) => ({
      url: `${SITE_URL}${caseworkUrl}/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
  return [...top, ...caseworkPages, ...projectPages];
}
