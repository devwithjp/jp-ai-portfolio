import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/blog";
import { Section, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Notes",
  description: "Learning notes on building AI products — engineering and product.",
};

export default function BlogPage() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Learning notes"
        title="Notes on building AI products"
        intro="Short write-ups that double as interview talking points — the patterns and trade-offs behind the projects."
      />
      <div className="mt-10 space-y-4">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group block rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/50"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-muted">{p.date}</span>
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                  {t}
                </span>
              ))}
            </div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight group-hover:text-link">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{p.summary}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
