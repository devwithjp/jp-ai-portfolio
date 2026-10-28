"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import {
  areas,
  kindLabel,
  skills,
  sources,
  sourceById,
  skillSlug,
  skillsForSource,
  type Skill,
  type Source,
  type SourceKind,
} from "@/lib/skill-graph";
import { SkillIcon } from "./skill-icon";

// The /skills explorer. Search, four groupings, and a detail panel that shows
// every place a skill was used. Selection lives in the URL (?skill=&view=) so a
// skill can be linked directly. Read on mount, not via useSearchParams, so the
// full skill list still prerenders into the HTML.

type View = "tech" | "work" | "project" | "learning";

const views: { id: View; label: string; kinds?: SourceKind[] }[] = [
  { id: "tech", label: "By technology" },
  { id: "work", label: "By work", kinds: ["work"] },
  { id: "project", label: "By project", kinds: ["project", "casework", "lab"] },
  { id: "learning", label: "Education & courses", kinds: ["education", "course"] },
];

const kindOrder: SourceKind[] = ["work", "project", "casework", "lab", "education", "course"];
const bySlug = new Map(skills.map((s) => [skillSlug(s.name), s]));
const areaLabel = new Map(areas.map((a) => [a.id, a.label]));

const matches = (s: Skill, q: string) => {
  if (!q) return true;
  const hay = `${s.name} ${areaLabel.get(s.area)} ${s.note ?? ""}`.toLowerCase();
  // Each word must start a word in the skill, so "rag" finds RAG, not "storage".
  return q.split(/\s+/).every((w) => new RegExp(`(^|[^a-z0-9])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(hay));
};

export function SkillExplorer() {
  const [view, setView] = useState<View>("tech");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const lastChip = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Restore ?skill=&view= after hydration (callback, not a synchronous effect setState).
  // Params are read now, before the mirror effect below rewrites the URL.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const id = requestAnimationFrame(() => {
      const v = p.get("view") as View | null;
      if (v && views.some((x) => x.id === v)) setView(v);
      const s = p.get("skill");
      if (s && bySlug.has(s)) setSelected(s);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Mirror state back into the URL without a navigation.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (view === "tech") p.delete("view");
    else p.set("view", view);
    if (selected) p.set("skill", selected);
    else p.delete("skill");
    const qs = p.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  }, [view, selected]);

  const q = query.trim().toLowerCase();
  const skill = selected ? bySlug.get(selected) ?? null : null;

  const open = (s: Skill, el: HTMLElement) => {
    lastChip.current = el;
    const slug = skillSlug(s.name);
    setSelected((cur) => (cur === slug ? null : slug));
  };
  const close = () => {
    setSelected(null);
    lastChip.current?.focus();
  };

  const onTabKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + views.length) % views.length;
    setView(views[next].id);
    tabRefs.current[next]?.focus();
  };

  const chip = (s: Skill) => (
    <SkillChip
      key={s.name}
      skill={s}
      active={selected === skillSlug(s.name)}
      onClick={(el) => open(s, el)}
    />
  );

  const activeView = views.find((v) => v.id === view)!;

  let body: ReactNode;
  let empty = false;
  if (view === "tech") {
    const groups = areas
      .map((a) => ({ ...a, items: skills.filter((s) => s.area === a.id && matches(s, q)) }))
      .filter((g) => g.items.length);
    empty = !groups.length;
    body = (
      <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {groups.map((g, i) => (
          <section
            key={g.id}
            aria-label={g.label}
            className="skill-in surface mb-4 break-inside-avoid p-5"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="kicker kicker-accent">{g.label}</h2>
              <span className="font-mono text-[11px] text-muted">{g.items.length}</span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <li key={s.name}>{chip(s)}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    );
  } else {
    const cards = sources
      .filter((src) => activeView.kinds!.includes(src.kind))
      .map((src) => ({ src, items: skillsForSource(src.id).filter((s) => matches(s, q)) }))
      .filter((c) => c.items.length);
    empty = !cards.length;
    body = (
      <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {cards.map(({ src, items }, i) => {
          const has = skill ? skill.usedIn.includes(src.id) : null;
          return (
            <article
              key={src.id}
              className={`skill-in surface mb-4 break-inside-avoid p-5 transition-[opacity,border-color] duration-300 ${
                has === false ? "opacity-40" : has ? "!border-accent/50" : ""
              }`}
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  {view === "project" ? (
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {kindLabel[src.kind]}
                    </div>
                  ) : null}
                  <h2 className="font-display text-lg font-medium leading-snug tracking-tight">{src.title}</h2>
                  <div className="mt-0.5 text-sm text-link">{src.org}</div>
                  {src.period ? <div className="mt-1 font-mono text-[11px] text-muted">{src.period}</div> : null}
                </div>
                <SourceLink src={src} className="flex-none font-mono text-xs text-muted hover:text-fg">
                  Open →
                </SourceLink>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <li key={s.name}>{chip(s)}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="sticky top-[61px] z-30 -mx-5 border-b border-line/70 bg-bg/95 px-5 py-3 sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block lg:w-80">
            <span className="sr-only">Look up a skill</span>
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
              <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Look up a skill: RAG, PyTorch, PRDs…"
              className="h-10 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm text-fg placeholder:text-muted focus:border-accent/60 focus:outline-none"
            />
          </label>
          <div role="tablist" aria-label="Group the skills" className="-mx-1 flex gap-1 overflow-x-auto px-1">
            {views.map((v, i) => (
              <button
                key={v.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={view === v.id}
                tabIndex={view === v.id ? 0 : -1}
                onClick={() => setView(v.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`h-9 flex-none rounded-full px-4 text-sm transition-colors ${
                  view === v.id
                    ? "bg-accent text-accent-fg"
                    : "border border-line text-muted hover:border-accent/50 hover:text-fg"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8" role="tabpanel" aria-label={activeView.label}>
        {empty ? (
          <div className="surface p-10 text-center text-muted">
            Nothing matches &ldquo;{query}&rdquo;.{" "}
            <button type="button" onClick={() => setQuery("")} className="text-link hover:text-fg">
              Clear search
            </button>
          </div>
        ) : (
          body
        )}
      </div>

      {skill ? <SkillPanel skill={skill} onClose={close} onPick={(s) => setSelected(skillSlug(s.name))} /> : null}
    </div>
  );
}

function SkillChip({ skill, active, onClick }: { skill: Skill; active: boolean; onClick: (el: HTMLElement) => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={(e) => onClick(e.currentTarget)}
      className={`skill-chip inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] leading-none transition-colors ${
        active
          ? "border-accent bg-accent/10 text-fg"
          : "border-line text-muted hover:border-accent/50 hover:text-fg"
      }`}
    >
      <SkillIcon name={skill.icon} />
      <span>{skill.name}</span>
      <span className="font-mono text-[10px] opacity-60">{skill.usedIn.length}</span>
    </button>
  );
}

function SourceLink({ src, className, children }: { src: Source; className?: string; children: ReactNode }) {
  if (src.external) {
    return (
      <a href={src.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={src.href} className={className}>
      {children}
    </Link>
  );
}

function SkillPanel({ skill, onClose, onPick }: { skill: Skill; onClose: () => void; onPick: (s: Skill) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Focus moves into the panel whenever the skill changes; Esc closes it.
  useEffect(() => {
    closeRef.current?.focus();
  }, [skill]);
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const groups = useMemo(() => {
    const used = skill.usedIn.map((id) => sourceById.get(id)!);
    return kindOrder
      .map((k) => ({ kind: k, items: used.filter((s) => s.kind === k) }))
      .filter((g) => g.items.length);
  }, [skill]);

  // Skills that share the most places with this one.
  const related = useMemo(() => {
    const mine = new Set(skill.usedIn);
    return skills
      .filter((s) => s !== skill)
      .map((s) => ({ s, n: s.usedIn.filter((id) => mine.has(id)).length }))
      .filter((r) => r.n > 0)
      .sort((a, b) => b.n - a.n || a.s.name.localeCompare(b.s.name))
      .slice(0, 8)
      .map((r) => r.s);
  }, [skill]);

  return (
    <div className="fixed inset-0 z-[60]">
      <button type="button" aria-label="Close" tabIndex={-1} onClick={onClose} className="absolute inset-0 h-full w-full cursor-default bg-bg/60" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-panel-title"
        data-lenis-prevent
        className="skill-panel absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-[var(--radius)] border border-line bg-surface p-6 shadow-[var(--shadow-lg)] sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[420px] sm:rounded-none sm:border-y-0 sm:border-r-0 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="kicker kicker-accent">{areaLabel.get(skill.area)}</div>
            <h2 id="skill-panel-title" className="font-display mt-3 flex items-center gap-2.5 text-3xl font-semibold tracking-tight">
              <SkillIcon name={skill.icon} size={22} />
              {skill.name}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line text-muted hover:border-accent/50 hover:text-fg"
          >
            ✕
          </button>
        </div>
        {skill.note ? <p className="mt-4 leading-relaxed text-muted">{skill.note}</p> : null}

        <div className="mt-8 flex items-center gap-3">
          <span className="tick" aria-hidden />
          <span className="kicker">
            Used in {skill.usedIn.length} {skill.usedIn.length === 1 ? "place" : "places"}
          </span>
        </div>
        <div className="mt-5 space-y-6">
          {groups.map((g) => (
            <div key={g.kind}>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{kindLabel[g.kind]}</div>
              <ul className="mt-2 space-y-2">
                {g.items.map((src) => (
                  <li key={src.id}>
                    <SourceLink
                      src={src}
                      className="group block rounded-xl border border-line bg-bg/40 px-4 py-3 transition-colors hover:border-accent/50"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-medium text-fg">{src.title}</span>
                        <span className="text-muted transition-transform group-hover:translate-x-0.5" aria-hidden>
                          {src.external ? "↗" : "→"}
                        </span>
                      </div>
                      <div className="mt-0.5 flex flex-wrap gap-x-2 text-sm text-muted">
                        {src.org ? <span>{src.org}</span> : null}
                        {src.period ? <span className="font-mono text-xs leading-5">{src.period}</span> : null}
                      </div>
                    </SourceLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {related.length ? (
          <div className="mt-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Often alongside</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {related.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => onPick(s)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[13px] leading-none text-muted transition-colors hover:border-accent/50 hover:text-fg"
                >
                  <SkillIcon name={s.icon} />
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
