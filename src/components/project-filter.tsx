"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { projectTypes, type ProjectType } from "@/lib/project-types";

// Tabs that narrow /projects by kind of work. Sections stay server-rendered;
// each one is wrapped in <FilterGroup> and simply hides when it doesn't match.
// The active tab lives in ?type= so a filtered view can be shared.

type Active = ProjectType | "all";
const Ctx = createContext<Active>("all");

export function ProjectFilter({ counts, children }: { counts: Record<Active, number>; children: ReactNode }) {
  const [active, setActive] = useState<Active>("all");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabs: { id: Active; label: string }[] = [{ id: "all", label: "All" }, ...projectTypes];

  // Read ?type= before the mirror effect below rewrites the URL. Kept in a ref so
  // StrictMode's second effect pass doesn't read the already-rewritten URL.
  const initialType = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (initialType.current === undefined) initialType.current = new URLSearchParams(window.location.search).get("type");
    const t = initialType.current;
    const id = requestAnimationFrame(() => {
      if (t && tabs.some((x) => x.id === t)) setActive(t as Active);
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (active === "all") p.delete("type");
    else p.set("type", active);
    const qs = p.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [active]);

  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActive(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <Ctx.Provider value={active}>
      <div className="sticky top-[61px] z-30 border-b border-line/70 bg-bg/95">
        <div
          role="tablist"
          aria-label="Filter projects by kind of work"
          className="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto px-5 py-3 sm:px-8"
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              tabIndex={active === t.id ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`inline-flex h-9 flex-none items-center gap-2 rounded-full px-4 text-sm transition-colors ${
                active === t.id
                  ? "bg-accent text-accent-fg"
                  : "border border-line text-muted hover:border-accent/50 hover:text-fg"
              }`}
            >
              {t.label}
              <span className="font-mono text-[11px] opacity-70">{counts[t.id]}</span>
            </button>
          ))}
        </div>
      </div>
      {children}
    </Ctx.Provider>
  );
}

export function FilterGroup({ types, children }: { types: readonly ProjectType[]; children: ReactNode }) {
  const active = useContext(Ctx);
  if (active !== "all" && !types.includes(active)) return null;
  return <>{children}</>;
}
