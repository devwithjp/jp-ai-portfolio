"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { uniProjects } from "@/lib/uni";

// Keeps the long tail of /projects collapsed behind one button. Opens itself
// when the URL already points into it (?type= or a section #hash) so deep links
// from the home page and the skills explorer still land, and when a link on this
// page (a featured card) points at a hidden section.
const SECTIONS = ["pedestal", "built", "casework", "products", "builds", "lab", ...uniProjects.map((u) => u.slug)];

const scrollTo = (hash: string) =>
  requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView()));

export function ShowAll({ total, children }: { total: number; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const deep = SECTIONS.includes(hash) || new URLSearchParams(window.location.search).has("type");
    if (!deep) return;
    const id = requestAnimationFrame(() => {
      setOpen(true);
      scrollTo(hash);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Same-page links use pushState, which fires no hashchange, so catch the click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      const hash = url.hash.slice(1);
      if (url.pathname !== window.location.pathname || !SECTIONS.includes(hash)) return;
      setOpen(true);
      scrollTo(hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (open) return <>{children}</>;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={false}
        className="group flex w-full items-center justify-between gap-4 rounded-[var(--radius)] border border-line bg-surface px-6 py-5 text-left transition-colors hover:border-accent/50"
      >
        <span>
          <span className="font-display block text-xl font-semibold tracking-tight">Show all projects</span>
          <span className="mt-1 block text-sm text-muted">
            {total} pieces of work: university projects, case studies, AI products, side builds, and the Lab. Filter by
            product, AI, web, mobile, hardware, or research.
          </span>
        </span>
        <span className="font-mono text-sm text-link transition-transform group-hover:translate-y-0.5" aria-hidden>
          ↓
        </span>
      </button>
    </div>
  );
}
