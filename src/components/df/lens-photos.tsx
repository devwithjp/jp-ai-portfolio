"use client";

// Lens photo sections: selected masonry, filterable archive strip, and the shared photo lightbox.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LensCategory, LensPhoto } from "@/lib/lens";
import { getLenis, reduced, tabIndicator } from "./motion";

gsap.registerPlugin(ScrollTrigger);

const ph = (p: LensPhoto) => `/lens/photos/${p.slug}.jpg`;
const num = (i: number) => String(i + 1).padStart(2, "0");
const altOf = (p: LensPhoto) => `${p.title}, ${p.place}`;
const metaOf = (p: LensPhoto) => [p.place, p.date].filter(Boolean).join(" · ") + (p.species ? ` · ${p.species}` : "");

const X = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>;
const PREV = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>;
const NEXT = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>;

function Fig({ p, i, cls = "", onOpen }: { p: LensPhoto; i: number; cls?: string; onOpen: (i: number, img: HTMLImageElement) => void }) {
  return (
    <figure className={`ln-ph ${cls}`} style={{ "--ar": `${p.w}/${p.h}` } as React.CSSProperties}>
      <button type="button" className="ln-open" onClick={(e) => { const im = e.currentTarget.querySelector("img"); if (im) onOpen(i, im); }} aria-label={`Open ${p.title}, ${p.place}`}>
        <span className="ln-z">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ph(p)} alt={altOf(p)} width={p.w} height={p.h} loading="lazy" decoding="async" draggable={false} />
        </span>
        <span className="ln-cap"><b>{p.title}</b><span>{p.place}{p.date ? ` · ${p.date}` : ""}</span></span>
      </button>
    </figure>
  );
}

export function LensPhotos({ selected, photos, categories }: { selected: LensPhoto[]; photos: LensPhoto[]; categories: { key: LensCategory; label: string }[] }) {
  const [filter, setFilter] = useState<"all" | LensCategory>("all");
  const rootRef = useRef<HTMLDivElement>(null);
  const masonRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const lbRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const tRef = useRef<HTMLParagraphElement>(null);
  const mRef = useRef<HTMLParagraphElement>(null);
  const cRef = useRef<HTMLSpanElement>(null);
  const xRef = useRef<HTMLButtonElement>(null);
  const api = useRef<{ open: (list: LensPhoto[], i: number, from?: Element | null) => void }>({ open: () => {} });
  const drag = useRef({ on: false, x: 0, sl: 0, moved: false });
  const firstStrip = useRef(true);
  const moveRef = useRef<(() => void) | null>(null);

  const present = useMemo(() => categories.filter((c) => photos.some((p) => p.cat === c.key)), [categories, photos]);
  const cnt = (k: string) => (k === "all" ? photos.length : photos.filter((p) => p.cat === k).length);
  const list = useMemo(() => (filter === "all" ? photos : photos.filter((p) => p.cat === filter)), [filter, photos]);

  const openSel = useCallback((i: number, img: HTMLImageElement) => api.current.open(selected, i, img), [selected]);
  const openArc = useCallback((i: number, img: HTMLImageElement) => { if (!drag.current.moved) api.current.open(list, i, img); }, [list]);

  /* Archive: reset scroll + animate in on filter change (skip first paint) */
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollLeft = 0;
    if (firstStrip.current) { firstStrip.current = false; return; }
    ScrollTrigger.refresh();
    if (reduced()) return;
    const tw = gsap.from(strip.querySelectorAll(".ln-sph"), { x: 60, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.04, clearProps: "all" });
    return () => { tw.kill(); };
  }, [filter]);

  /* Tabs indicator follows selection */
  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;
    const t = tabIndicator(tabs);
    moveRef.current = t.move;
    return () => { moveRef.current = null; t.cleanup(); };
  }, []);
  useEffect(() => { moveRef.current?.(); }, [filter]);

  useEffect(() => {
    const root = rootRef.current, lb = lbRef.current, stage = stageRef.current, img = imgRef.current, strip = stripRef.current, tabs = tabsRef.current, mason = masonRef.current;
    if (!root || !lb || !stage || !img || !strip || !tabs || !mason) return;
    const reduce = reduced();
    const bg = lb.querySelector<HTMLElement>(".ln-lb-bg")!;
    const s = { open: false, busy: false, i: 0, list: [] as LensPhoto[], locked: false, last: null as HTMLElement | null };
    const bits = () => [tRef.current!, mRef.current!];
    const chrome = () => [...lb.querySelectorAll<HTMLElement>(".iconbtn, .ln-lb-info, .ln-lb-count")];
    const lock = () => { if (!s.locked) { s.locked = true; document.documentElement.style.overflow = "hidden"; getLenis()?.stop(); } };
    const unlock = () => { if (s.locked) { s.locked = false; document.documentElement.style.overflow = ""; getLenis()?.start(); } };
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const fill = (p: LensPhoto, i: number) => {
        img.src = ph(p); img.alt = altOf(p);
        tRef.current!.textContent = p.title; mRef.current!.textContent = metaOf(p);
        cRef.current!.textContent = `${num(i)} / ${String(s.list.length).padStart(2, "0")}`;
        [s.list[(i + 1) % s.list.length], s.list[(i - 1 + s.list.length) % s.list.length]].forEach((q) => { const im = new Image(); im.src = ph(q); });
      };
      const open = (l: LensPhoto[], i: number, from?: Element | null) => {
        s.list = l; s.i = i; s.open = true; s.last = document.activeElement as HTMLElement | null;
        lock(); lb.hidden = false; fill(l[i], i);
        lb.classList.toggle("single", l.length < 2);
        if (reduce) { xRef.current?.focus(); return; }
        const tl = gsap.timeline({ onComplete: () => xRef.current?.focus() });
        tl.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
        const r = from?.getBoundingClientRect();
        const fx = r ? { x: r.left + r.width / 2 - innerWidth / 2, y: r.top + r.height / 2 - innerHeight / 2, scale: Math.min(1, r.width / Math.min(innerWidth, 900)) } : { scale: 0.9, x: 0, y: 0 };
        tl.fromTo(img, { ...fx, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.7, ease: "expo.out" }, 0.02);
        tl.fromTo(chrome(), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power3.out" }, 0.25);
      };
      const close = () => {
        if (!s.open) return;
        s.open = false;
        const done = () => { lb.hidden = true; gsap.set([img, ...chrome(), ...bits()], { clearProps: "all" }); unlock(); s.last?.focus?.({ preventScroll: true }); };
        if (reduce) return done();
        gsap.timeline({ onComplete: done })
          .to(img, { scale: 0.92, opacity: 0, duration: 0.35, ease: "power2.in" }, 0)
          .to(chrome(), { opacity: 0, duration: 0.25 }, 0)
          .to(bg, { opacity: 0, duration: 0.35 }, 0.1);
      };
      const step = (d: number) => {
        if (!s.open || s.busy || s.list.length < 2) return;
        const n = (s.i + d + s.list.length) % s.list.length;
        if (reduce) { s.i = n; fill(s.list[n], n); return; }
        s.busy = true;
        const tgt = [img, ...bits()];
        gsap.to(tgt, { x: (_t: number, el: Element) => (el === img ? -d * 70 : 0), opacity: 0, duration: 0.22, ease: "power2.in", onComplete: () => {
          s.i = n; fill(s.list[n], n);
          const go = () => gsap.fromTo(tgt, { x: (_t: number, el: Element) => (el === img ? d * 70 : 0), opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: "expo.out", onComplete: () => { s.busy = false; } });
          if (img.complete) go();
          else { img.onload = () => { img.onload = null; go(); }; img.onerror = () => { s.busy = false; gsap.set(img, { opacity: 1, x: 0 }); }; }
        } });
      };
      api.current.open = open;

      const q = (sel: string) => lb.querySelector<HTMLElement>(sel)!;
      const onPrev = () => step(-1), onNext = () => step(1);
      const onStage = (e: MouseEvent) => { if (e.target === stage) close(); };
      q("[data-x]").addEventListener("click", close);
      q("[data-prev]").addEventListener("click", onPrev);
      q("[data-next]").addEventListener("click", onNext);
      bg.addEventListener("click", close);
      stage.addEventListener("click", onStage);
      let sx = 0, sy = 0, down = false;
      const pd = (e: PointerEvent) => { down = true; sx = e.clientX; sy = e.clientY; };
      const pu = (e: PointerEvent) => {
        if (!down) return; down = false;
        const dx = e.clientX - sx, dy = e.clientY - sy;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) step(dx < 0 ? 1 : -1);
      };
      const pc = () => { down = false; };
      stage.addEventListener("pointerdown", pd); stage.addEventListener("pointerup", pu); stage.addEventListener("pointercancel", pc);
      const onKey = (e: KeyboardEvent) => {
        if (!s.open) return;
        if (e.key === "Escape") { e.preventDefault(); close(); }
        else if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
        else if (e.key === "Tab") {
          const f = [...lb.querySelectorAll<HTMLElement>("button")].filter((x) => x.offsetParent !== null);
          if (!f.length) return;
          const first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };
      addEventListener("keydown", onKey);
      cleanups.push(() => {
        q("[data-x]").removeEventListener("click", close);
        q("[data-prev]").removeEventListener("click", onPrev);
        q("[data-next]").removeEventListener("click", onNext);
        bg.removeEventListener("click", close);
        stage.removeEventListener("click", onStage);
        stage.removeEventListener("pointerdown", pd); stage.removeEventListener("pointerup", pu); stage.removeEventListener("pointercancel", pc);
        removeEventListener("keydown", onKey);
      });

      /* Selected masonry: batch reveal + in-frame parallax */
      const figs = [...mason.querySelectorAll<HTMLElement>(".ln-ph")];
      if (!reduce) {
        gsap.set(figs, { y: 60, opacity: 0.001 });
        ScrollTrigger.batch(figs, { start: "top 94%", once: true, onEnter: (b) => { gsap.to(b, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.1 }); } });
        mason.querySelectorAll<HTMLElement>(".ln-ph img").forEach((im) => {
          gsap.fromTo(im, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: im.closest(".ln-ph"), start: "top bottom", end: "bottom top", scrub: true } });
        });
      }

      /* Archive strip: drag, wheel, keys */
      const d = drag.current;
      const sd = (e: PointerEvent) => { if (e.pointerType !== "mouse" || e.button !== 0) return; d.on = true; d.moved = false; d.x = e.clientX; d.sl = strip.scrollLeft; };
      const pm = (e: PointerEvent) => {
        if (!d.on) return;
        const dx = e.clientX - d.x;
        if (!d.moved && Math.abs(dx) > 5) { d.moved = true; strip.classList.add("dragging"); }
        if (d.moved) strip.scrollLeft = d.sl - dx;
      };
      let tm: ReturnType<typeof setTimeout> | undefined;
      const endDrag = () => { if (!d.on) return; d.on = false; strip.classList.remove("dragging"); tm = setTimeout(() => { d.moved = false; }, 0); };
      const ds = (e: Event) => e.preventDefault();
      const wh = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
        const max = strip.scrollWidth - strip.clientWidth, sl = strip.scrollLeft;
        if ((e.deltaY > 0 && sl >= max - 1) || (e.deltaY < 0 && sl <= 0) || !e.shiftKey) return;
        e.preventDefault(); strip.scrollLeft += e.deltaY;
      };
      const sk = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") strip.scrollBy({ left: 300, behavior: reduce ? "auto" : "smooth" });
        if (e.key === "ArrowLeft") strip.scrollBy({ left: -300, behavior: reduce ? "auto" : "smooth" });
      };
      strip.addEventListener("pointerdown", sd); addEventListener("pointermove", pm); addEventListener("pointerup", endDrag); addEventListener("pointercancel", endDrag);
      strip.addEventListener("dragstart", ds); strip.addEventListener("wheel", wh, { passive: false }); strip.addEventListener("keydown", sk);
      cleanups.push(() => {
        clearTimeout(tm);
        strip.removeEventListener("pointerdown", sd); removeEventListener("pointermove", pm); removeEventListener("pointerup", endDrag); removeEventListener("pointercancel", endDrag);
        strip.removeEventListener("dragstart", ds); strip.removeEventListener("wheel", wh); strip.removeEventListener("keydown", sk);
      });
    }, root);

    return () => {
      cleanups.forEach((c) => c());
      ctx.revert();
      s.open = false;
      unlock();
    };
  }, []);

  const onTabs = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const bs = [...e.currentTarget.querySelectorAll<HTMLButtonElement>("button")], i = bs.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    const n = bs[(i + (e.key === "ArrowRight" ? 1 : -1) + bs.length) % bs.length];
    n.focus(); n.click();
  };

  const head = (kick: string, title: string, lede?: string) => (
    <div className="sh">
      <p className="kicker accent scr">{kick}</p>
      <h2 className="display-xl condensed kin">{title}</h2>
      {lede ? <p className="lede">{lede}</p> : null}
    </div>
  );

  return (
    <div ref={rootRef}>
      <section className="section ln-work" id="work">
        <div className="wrap">
          {head("Selected work", "Frames I keep coming back to.", "Developed from the originals and graded as one set. Tap any frame to see it full size.")}
          <div className="ln-mason" id="lnMason" ref={masonRef}>
            {selected.map((p, i) => <Fig key={p.slug} p={p} i={i} onOpen={openSel} />)}
          </div>
        </div>
      </section>

      <section className="section ln-arch" id="archive">
        <div className="wrap">
          <div className="sh-row">
            {head("Archive", "Everything else worth keeping.")}
            <p className="kicker ln-hint">Drag or scroll</p>
          </div>
          <div className="tabs ln-tabs" role="tablist" aria-label="Filter the archive" id="lnTabs" ref={tabsRef} onKeyDown={onTabs}>
            {[{ key: "all" as const, label: "All" }, ...present].map((c) => (
              <button key={c.key} role="tab" type="button" aria-selected={filter === c.key} onClick={() => setFilter(c.key)}>
                {c.label}<span className="n">{cnt(c.key)}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="ln-strip" id="lnStrip" ref={stripRef} tabIndex={0} aria-label="Archive photos, scrollable">
          <div className="ln-srow">
            {list.map((p, i) => <Fig key={`${filter}-${p.slug}`} p={p} i={i} cls="ln-sph" onOpen={openArc} />)}
          </div>
        </div>
      </section>

      <div className="ln-lb" ref={lbRef} role="dialog" aria-modal="true" aria-label="Photo viewer" hidden>
        <div className="ln-lb-bg" />
        <div className="ln-stage" ref={stageRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={imgRef} alt="" draggable={false} />
        </div>
        <div className="ln-lb-info"><p className="ln-lb-t condensed" ref={tRef} /><p className="muted" ref={mRef} /></div>
        <span className="ln-lb-count kicker" ref={cRef} />
        <button type="button" className="iconbtn ln-x" data-x ref={xRef} aria-label="Close viewer">{X}</button>
        <button type="button" className="iconbtn ln-nav ln-prev" data-prev aria-label="Previous photo">{PREV}</button>
        <button type="button" className="iconbtn ln-nav ln-next" data-next aria-label="Next photo">{NEXT}</button>
      </div>
    </div>
  );
}
