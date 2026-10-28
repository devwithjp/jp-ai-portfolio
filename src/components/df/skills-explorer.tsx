"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { areas, kindLabel, skills, sources, type Skill, type Source, type SourceKind } from "@/lib/skill-graph";
import { reduced, tabIndicator } from "./motion";
import { SkillLogo } from "./skills-logo";

gsap.registerPlugin(ScrollTrigger, Flip);

// No em or en dashes in visible text.
const clean = (s: unknown) => String(s ?? "").replace(/\s*[–—]\s*/g, ", ");
const areaLabel = new Map(areas.map((x) => [x.id, x.label]));
const srcById = new Map(sources.map((s) => [s.id, s]));
const slug = (n: string) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const bySlug = new Map(skills.map((s) => [slug(s.name), s]));
const KIND_ORDER: SourceKind[] = ["work", "project", "casework", "lab", "education", "course"];

type ViewId = "tech" | "work" | "project" | "learning";
const VIEWS: { id: ViewId; label: string; kinds?: SourceKind[] }[] = [
  { id: "tech", label: "By technology" },
  { id: "work", label: "By work", kinds: ["work"] },
  { id: "project", label: "By project", kinds: ["project", "casework", "lab"] },
  { id: "learning", label: "Education & courses", kinds: ["education", "course"] },
];
const forSource = (id: string) => skills.filter((s) => s.usedIn.includes(id));
const matches = (s: Skill, q: string) => {
  if (!q) return true;
  const hay = `${s.name} ${areaLabel.get(s.area)} ${s.note ?? ""}`.toLowerCase();
  return q.split(/\s+/).every((w) => new RegExp(`(^|[^a-z0-9])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(hay));
};

function SrcLink({ href, external, className, children }: { href: string; external?: boolean; className?: string; children: ReactNode }) {
  if (external || /^(https?:|mailto:)/.test(href)) return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
  if (href.startsWith("/live/") || href.endsWith(".pdf")) return <a href={href} className={className}>{children}</a>;
  return <Link href={href} className={className}>{children}</Link>;
}

export function SkillsExplorer() {
  const [view, setView] = useState<ViewId>("tech");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<string | null>(null);
  const [shown, setShown] = useState<string | null>(null); // panel content, outlives sel during the fade-out
  const bodyRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const flipRef = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const lastChip = useRef<string>("");
  const moveInd = useRef<() => void>(() => {});
  const builtOnce = useRef(false);
  const focusPanel = useRef(false);
  const scrollPanel = useRef(false);
  const selRef = useRef<string | null>(null);

  useEffect(() => { selRef.current = sel; }, [sel]);

  const captureFlip = () => {
    flipRef.current = !reduced() ? Flip.getState(".sk-chip") : null;
  };

  const select = useCallback((sl: string | null, opts: { scroll?: boolean; focus?: boolean } = {}) => {
    setSel(sl);
    selRef.current = sl;
    try { history.replaceState(null, "", sl ? "#skill-" + sl : location.pathname + location.search); } catch { /* ignore */ }
    if (sl) {
      focusPanel.current = !!opts.focus;
      scrollPanel.current = !!opts.scroll && matchMedia("(max-width: 900px)").matches;
      setShown(sl);
    } else {
      const p = panelRef.current;
      if (p && !p.hidden && !reduced()) {
        gsap.to(p, { opacity: 0, x: 16, duration: 0.2, onComplete: () => { setShown(null); gsap.set(p, { clearProps: "all" }); } });
      } else setShown(null);
    }
  }, []);

  const closePanel = useCallback(() => {
    select(null);
    const t = bodyRef.current?.querySelector<HTMLElement>(`.sk-chip[data-s="${CSS.escape(lastChip.current)}"]`);
    t?.focus();
  }, [select]);

  // Tab indicator.
  useEffect(() => {
    const t = tabsRef.current;
    if (!t) return;
    const ind = tabIndicator(t);
    moveInd.current = ind.move;
    return ind.cleanup;
  }, []);
  useEffect(() => { moveInd.current(); }, [view]);

  // Restore #skill-<slug> and follow hash changes.
  useEffect(() => {
    const read = () => {
      const m = location.hash.match(/^#skill-(.+)$/);
      return m && bySlug.has(m[1]) ? m[1] : null;
    };
    let tm = 0;
    const raf = requestAnimationFrame(() => {
      const s = read();
      if (s) {
        setSel(s); setShown(s);
        tm = window.setTimeout(() => document.getElementById("explorer")?.scrollIntoView({ block: "start" }), 60);
      }
    });
    const onHash = () => { const sl = read(); if (sl !== selRef.current) select(sl); };
    window.addEventListener("hashchange", onHash);
    return () => { cancelAnimationFrame(raf); clearTimeout(tm); window.removeEventListener("hashchange", onHash); };
  }, [select]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && selRef.current) closePanel(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closePanel]);

  // Re-flow the chips after a view/search change.
  useLayoutEffect(() => {
    const fs = flipRef.current;
    if (!fs) return;
    Flip.from(fs, {
      duration: 0.5, ease: "power3.out", scale: false, nested: false,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.004 }),
      onLeave: () => {},
    });
  }, [view, q]);

  // Scroll-spy for the area index, and the staggered chip entrance per group.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const reduce = reduced();
    const first = !builtOnce.current;
    builtOnce.current = true;
    const flipped = !!flipRef.current;
    flipRef.current = null;
    const ctx = gsap.context(() => {
      const idx = body.querySelector<HTMLElement>(".sk-index");
      if (idx) {
        const links = [...idx.querySelectorAll<HTMLElement>("a")];
        body.querySelectorAll<HTMLElement>(".sk-group[data-area]").forEach((g) => ScrollTrigger.create({
          trigger: g, start: "top 45%", end: "bottom 45%",
          onToggle: (st) => {
            if (!st.isActive) return;
            links.forEach((l) => { const on = l.dataset.a === g.dataset.area; l.classList.toggle("on", on); if (on) idx.scrollTo({ left: l.offsetLeft - 40, behavior: "auto" }); });
          },
        }));
      }
      if (reduce) return;
      if (!first && !flipped) gsap.from(body.querySelectorAll(".sk-group"), { opacity: 0, y: 14, duration: 0.45, stagger: 0.03, ease: "power3.out" });
      body.querySelectorAll<HTMLElement>(".sk-group").forEach((g) => {
        if (g.getBoundingClientRect().top < innerHeight * 0.9) return;
        const chips = g.querySelectorAll(".sk-chip"), head = g.querySelectorAll(".sk-gh > *");
        gsap.set(chips, { opacity: 0, y: 16, scale: 0.9 }); gsap.set(head, { opacity: 0, y: 12 });
        ScrollTrigger.create({
          trigger: g, start: "top 88%", once: true,
          onEnter: () => {
            gsap.to(head, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", stagger: 0.06 });
            gsap.to(chips, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.6)", stagger: { each: 0.025, from: "start" }, delay: 0.1, clearProps: "transform,opacity" });
          },
        });
      });
      ScrollTrigger.refresh();
    }, body);
    return () => ctx.revert();
  }, [view, q]);

  // Panel entrance, focus and mobile scroll.
  useEffect(() => {
    const p = panelRef.current;
    if (!p || !shown) return;
    if (!reduced()) gsap.fromTo(p, { opacity: 0, x: 18 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out", clearProps: "transform" });
    if (scrollPanel.current) p.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
    if (focusPanel.current) p.querySelector<HTMLElement>("#skClose")?.focus({ preventScroll: true });
    scrollPanel.current = false; focusPanel.current = false;
    return () => { gsap.killTweensOf(p); };
  }, [shown]);

  const changeView = (id: ViewId) => {
    if (id === view) return;
    captureFlip();
    setView(id);
  };

  const onChip = (s: string) => {
    lastChip.current = s;
    select(sel === s ? null : s, { scroll: true, focus: true });
  };

  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = VIEWS.findIndex((v) => v.id === view);
    const n = VIEWS[(i + (e.key === "ArrowRight" ? 1 : -1) + VIEWS.length) % VIEWS.length];
    changeView(n.id);
    requestAnimationFrame(() => tabsRef.current?.querySelector<HTMLElement>(`#vt-${n.id}`)?.focus());
  };

  const ql = q.trim().toLowerCase();
  const chip = (s: Skill, ctx: string) => {
    const sl = slug(s.name);
    return (
      <li key={sl}>
        <button type="button" className="sk-chip" data-s={sl} data-flip-id={`${ctx}:${sl}`} aria-pressed={sel === sl} onClick={() => onChip(sl)}>
          <SkillLogo name={s.name} area={s.area} /><span>{clean(s.name)}</span><i>{s.usedIn.length}</i>
        </button>
      </li>
    );
  };

  const bodyContent = (() => {
    const empty = (
      <div className="card pad sk-empty">
        Nothing matches &quot;{clean(q)}&quot;.{" "}
        <button type="button" className="link" id="skClear" onClick={() => { captureFlip(); setQ(""); if (searchRef.current) searchRef.current.value = ""; }}>Clear search</button>
      </div>
    );
    if (view === "tech") {
      const groups = areas.map((x) => ({ ...x, items: skills.filter((s) => s.area === x.id && matches(s, ql)) })).filter((g) => g.items.length);
      if (!groups.length) return empty;
      return (
        <>
          <nav className="sk-index" aria-label="Jump to area" onClick={(e) => {
            const l = (e.target as HTMLElement).closest("a"); if (!l) return;
            e.preventDefault();
            document.getElementById("area-" + l.dataset.a)?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
          }}>
            {groups.map((g) => <a key={g.id} href={`#area-${g.id}`} data-a={g.id}>{clean(g.label)}<i>{g.items.length}</i></a>)}
          </nav>
          <div className="sk-cols">
            {groups.map((g, gi) => (
              <section key={g.id} className="card sk-group spot" id={`area-${g.id}`} data-area={g.id} aria-label={clean(g.label)}>
                <div className="sk-gh"><span className="sk-idx condensed" aria-hidden="true">{String(gi + 1).padStart(2, "0")}</span><h2 className="sk-gt">{clean(g.label)}</h2><span className="sk-n">{g.items.length}</span></div>
                <ul className="sk-chips">{g.items.map((s) => chip(s, g.id))}</ul>
              </section>
            ))}
          </div>
        </>
      );
    }
    const kinds = VIEWS.find((v) => v.id === view)!.kinds!;
    const cards = sources.filter((x) => kinds.includes(x.kind)).map((x) => ({ x, items: forSource(x.id).filter((s) => matches(s, ql)) })).filter((c) => c.items.length);
    if (!cards.length) return empty;
    const curSel = sel ? bySlug.get(sel) : null;
    return (
      <div className="sk-cols">
        {cards.map(({ x, items }: { x: Source; items: Skill[] }) => {
          const has = curSel ? curSel.usedIn.includes(x.id) : null;
          return (
            <article key={x.id} className={`card spot sk-group sk-src ${has === false ? "dim" : has ? "hit" : ""}`} data-src={x.id}>
              <div className="sk-gh">
                <div>
                  {view === "project" && <p className="kicker">{clean(kindLabel[x.kind])}</p>}
                  <h2 className="sk-st">{clean(x.title)}</h2>
                  <p className="sk-so">{clean(x.org)}</p>
                  {x.period && <p className="sk-sp">{clean(x.period)}</p>}
                </div>
                <SrcLink href={x.href} external={x.external} className="link sk-open">{"Open " + (x.external ? "↗" : "→")}</SrcLink>
              </div>
              <ul className="sk-chips">{items.map((s) => chip(s, x.id))}</ul>
            </article>
          );
        })}
      </div>
    );
  })();

  const cur = shown ? bySlug.get(shown) : null;
  const panel = (() => {
    if (!cur) return null;
    const used = cur.usedIn.map((id) => srcById.get(id)).filter((x): x is Source => !!x);
    const groups = KIND_ORDER.map((k) => ({ k, items: used.filter((x) => x.kind === k) })).filter((g) => g.items.length);
    const mine = new Set(cur.usedIn);
    const related = skills.filter((o) => o !== cur).map((o) => ({ o, n: o.usedIn.filter((i) => mine.has(i)).length })).filter((r) => r.n)
      .sort((x, y) => y.n - x.n || x.o.name.localeCompare(y.o.name)).slice(0, 8).map((r) => r.o);
    return (
      <>
        <div className="sk-ph">
          <div><p className="kicker accent">{clean(areaLabel.get(cur.area))}</p><h2 id="skPanelT" className="display-lg">{clean(cur.name)}</h2></div>
          <button type="button" className="sk-x" id="skClose" aria-label="Close panel" onClick={closePanel}>✕</button>
        </div>
        {cur.note && <p className="muted sk-note">{clean(cur.note)}</p>}
        <p className="kicker sk-used">Used in {used.length} {used.length === 1 ? "place" : "places"}</p>
        {groups.map((g) => (
          <div className="sk-kg" key={g.k}>
            <p className="sk-kl">{clean(kindLabel[g.k])}</p>
            <ul>
              {g.items.map((x) => (
                <li key={x.id}>
                  <SrcLink href={x.href} external={x.external} className="sk-src-link">
                    <span className="sk-r1"><b>{clean(x.title)}</b><span aria-hidden="true">{x.external ? "↗" : "→"}</span></span>
                    <span className="sk-r2">{x.org && <span>{clean(x.org)}</span>}{x.period && <span className="mono">{clean(x.period)}</span>}</span>
                  </SrcLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {related.length > 0 && (
          <div className="sk-kg">
            <p className="sk-kl">Often alongside</p>
            <div className="sk-chips rel">
              {related.map((o) => (
                <button type="button" className="sk-chip" key={o.name} data-rel={slug(o.name)} onClick={() => select(slug(o.name), { focus: false })}>
                  <SkillLogo name={o.name} area={o.area} /><span>{clean(o.name)}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </>
    );
  })();

  return (
    <section className="sk-explorer wrap" id="explorer">
      <div className="sk-bar">
        <div className="sk-search">
          <label htmlFor="skillSearch" className="kicker">Look up a skill</label>
          <input id="skillSearch" ref={searchRef} type="search" autoComplete="off" placeholder="RAG, PyTorch, PRDs..." onChange={(e) => { captureFlip(); setQ(e.target.value); }} />
        </div>
        <div className="tabs" role="tablist" aria-label="Group the skills" id="vtabs" ref={tabsRef} onKeyDown={onTabKey}>
          {VIEWS.map((v) => (
            <button key={v.id} type="button" role="tab" id={`vt-${v.id}`} aria-selected={view === v.id} tabIndex={view === v.id ? 0 : -1} data-v={v.id} onClick={() => changeView(v.id)}>{v.label}</button>
          ))}
        </div>
      </div>
      <div className={`sk-layout${shown ? " has-panel" : ""}`} id="skLayout">
        <div
          className="sk-body" id="skBody" ref={bodyRef} role="tabpanel" aria-live="polite" aria-labelledby={`vt-${view}`}
          onPointerMove={(e) => {
            const g = (e.target as HTMLElement).closest<HTMLElement>(".spot"); if (!g) return;
            const r = g.getBoundingClientRect(); g.style.setProperty("--mx", e.clientX - r.left + "px"); g.style.setProperty("--my", e.clientY - r.top + "px");
          }}
        >
          {bodyContent}
        </div>
        <aside className="sk-panel" id="skPanel" ref={panelRef} aria-label="Skill evidence" aria-labelledby={shown ? "skPanelT" : undefined} hidden={!shown}>
          {panel}
        </aside>
      </div>
    </section>
  );
}
