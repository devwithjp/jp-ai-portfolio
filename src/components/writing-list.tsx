"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPost, PostCategory } from "@/lib/types";
import { Reveal } from "./reveal";

type Filter = "all" | PostCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "tech", label: "Tech" },
  { id: "life", label: "Life" },
];

export function WritingList({ posts }: { posts: BlogPost[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = posts.filter((p) => filter === "all" || p.category === filter);
  const count = (f: Filter) => (f === "all" ? posts.length : posts.filter((p) => p.category === f).length);

  return (
    <div>
      <div className="flex flex-wrap gap-1 rounded-full border border-line bg-surface p-1">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.id ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"
            }`}
          >
            {f.label} <span className="font-mono text-xs opacity-70">{count(f.id)}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {shown.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 70}>
            <Link
              href={`/writing/${p.slug}`}
              className="group block rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                  {p.category}
                </span>
                <span className="font-mono text-xs text-muted">{p.date}</span>
                {p.tags.map((t) => (
                  <span key={t} className="font-mono text-[11px] text-muted/70">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="font-display mt-3 text-xl font-medium tracking-tight group-hover:text-link">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.summary}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
