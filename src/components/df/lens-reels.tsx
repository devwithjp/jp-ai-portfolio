"use client";

// Lens hero: vertical reel cards (muted loop while on screen) + the reel lightbox.
import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LensReel } from "@/lib/lens";
import { getLenis, reduced } from "./motion";

gsap.registerPlugin(ScrollTrigger);

const rv = (slug: string) => `/lens/reels/${slug}`;
const X = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>;
const PREV = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>;
const NEXT = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>;

export function LensReels({ reels }: { reels: LensReel[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const lbRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const st = useRef({ open: false, i: 0, locked: false, last: null as HTMLElement | null });
  const api = useRef<{ open: (i: number) => void }>({ open: () => {} });

  useEffect(() => {
    const list = listRef.current, lb = lbRef.current, vid = vidRef.current, wrap = wrapRef.current;
    if (!list || !lb || !vid || !wrap) return;
    const reduce = reduced();
    const s = st.current;
    const vids = [...list.querySelectorAll<HTMLVideoElement>("video")];
    const rvid = lb.querySelector<HTMLElement>(".ln-rvid")!;
    const bg = lb.querySelector<HTMLElement>(".ln-lb-bg")!;
    const btns = () => [...lb.querySelectorAll<HTMLElement>(".iconbtn")];

    const lock = () => { if (!s.locked) { s.locked = true; document.documentElement.style.overflow = "hidden"; getLenis()?.stop(); } };
    const unlock = () => { if (s.locked) { s.locked = false; document.documentElement.style.overflow = ""; getLenis()?.start(); } };

    const cleanups: (() => void)[] = [];
    const ctx = gsap.context(() => {
      /* Play only while on screen */
      let io: IntersectionObserver | undefined;
      if (!reduce) {
        io = new IntersectionObserver((es) => es.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting && !s.open) {
            if (!v.src && v.dataset.src) v.src = v.dataset.src;
            v.play().catch(() => {});
          } else v.pause();
        }), { threshold: 0.35 });
        vids.forEach((v) => io!.observe(v));
      }

      const fillReel = (i: number) => {
        const r = reels[i]; s.i = i;
        vid.poster = `${rv(r.slug)}.jpg`; vid.src = `${rv(r.slug)}.mp4`;
        lb.setAttribute("aria-label", `${r.title} reel`);
      };
      const open = (i: number) => {
        s.open = true; s.last = document.activeElement as HTMLElement | null; lock();
        vids.forEach((v) => v.pause());
        lb.hidden = false; fillReel(i);
        vid.muted = false; vid.play().catch(() => {});
        if (reduce) { closeRef.current?.focus(); return; }
        gsap.timeline({ onComplete: () => closeRef.current?.focus() })
          .fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0)
          .fromTo(rvid, { y: 70, scale: 0.9, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "expo.out" }, 0.05)
          .fromTo(btns(), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.3);
      };
      const close = () => {
        if (!s.open) return;
        s.open = false;
        const done = () => {
          vid.pause(); vid.removeAttribute("src"); vid.load(); lb.hidden = true;
          gsap.set([rvid, ...btns()], { clearProps: "all" });
          unlock(); s.last?.focus?.({ preventScroll: true });
          vids.forEach((v) => { const r = v.getBoundingClientRect(); if (!reduce && r.bottom > 0 && r.top < innerHeight) v.play().catch(() => {}); });
        };
        if (reduce) return done();
        vid.pause();
        gsap.timeline({ onComplete: done })
          .to(rvid, { y: 40, scale: 0.94, opacity: 0, duration: 0.4, ease: "power2.in" }, 0)
          .to(btns(), { opacity: 0, duration: 0.25 }, 0)
          .to(bg, { opacity: 0, duration: 0.35 }, 0.1);
      };
      const step = (d: number) => {
        if (!s.open) return;
        const n = (s.i + d + reels.length) % reels.length;
        if (reduce) { fillReel(n); vid.play().catch(() => {}); return; }
        gsap.to(rvid, { opacity: 0, x: -d * 40, duration: 0.2, onComplete: () => {
          fillReel(n); vid.muted = false; vid.play().catch(() => {});
          gsap.fromTo(rvid, { opacity: 0, x: d * 40 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" });
        } });
      };
      api.current.open = open;

      const onKey = (e: KeyboardEvent) => {
        if (!s.open) return;
        if (e.key === "Escape") { e.preventDefault(); close(); }
        else if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
        else if (e.key === "Tab") {
          const f = [...lb.querySelectorAll<HTMLElement>("button, video[controls]")].filter((x) => x.offsetParent !== null || x === vid);
          if (!f.length) return;
          const first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };
      const onWrap = (e: MouseEvent) => { if (e.target === wrap) close(); };
      const q = (sel: string) => lb.querySelector<HTMLElement>(sel)!;
      const onPrev = () => step(-1), onNext = () => step(1);
      q("[data-x]").addEventListener("click", close);
      q("[data-prev]").addEventListener("click", onPrev);
      q("[data-next]").addEventListener("click", onNext);
      bg.addEventListener("click", close);
      wrap.addEventListener("click", onWrap);
      addEventListener("keydown", onKey);

      /* Title + reel parallax */
      const hero = list.closest<HTMLElement>(".ln-hero");
      const h1 = hero?.querySelector<HTMLElement>("#lnH");
      if (!reduce && hero && h1) {
        gsap.to(h1, { yPercent: -14, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
        if (matchMedia("(min-width: 820px)").matches) {
          gsap.utils.toArray<HTMLElement>(list.querySelectorAll(".ln-rcell")).forEach((c, i) => gsap.to(c, { y: (i - 1) * -40, ease: "none", scrollTrigger: { trigger: list, start: "top bottom", end: "bottom top", scrub: true } }));
        }
      }

      cleanups.push(() => {
        io?.disconnect();
        q("[data-x]").removeEventListener("click", close);
        q("[data-prev]").removeEventListener("click", onPrev);
        q("[data-next]").removeEventListener("click", onNext);
        bg.removeEventListener("click", close);
        wrap.removeEventListener("click", onWrap);
        removeEventListener("keydown", onKey);
      });
    }, list);
    return () => {
      cleanups.forEach((c) => c());
      ctx.revert();
      vid.pause();
      s.open = false;
      unlock();
    };
  }, [reels]);

  const openAt = useCallback((i: number) => api.current.open(i), []);

  return (
    <>
      <ul className="ln-reels" id="lnReels" ref={listRef} style={{ "--n": reels.length } as React.CSSProperties}>
        {reels.map((r, i) => (
          <li className="ln-rcell" key={r.slug}>
            <button type="button" className="ln-reel tilt up" onClick={() => openAt(i)} aria-label={`Play reel: ${r.title}`}>
              <span className="ln-rin">
                <video muted loop playsInline preload="none" poster={`${rv(r.slug)}.jpg`} data-src={`${rv(r.slug)}.mp4`} tabIndex={-1} aria-hidden="true" />
                <span className="ln-shade" />
                <span className="ln-rtop kicker">{r.kicker}<i>{r.length}</i></span>
                <span className="ln-rbot"><b className="condensed">{r.title}</b></span>
                <span className="ln-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg></span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="ln-lb ln-rlb" ref={lbRef} role="dialog" aria-modal="true" aria-label="Reel viewer" hidden>
        <div className="ln-lb-bg" />
        <div className="ln-rwrap" ref={wrapRef}>
          <div className="ln-rvid"><video ref={vidRef} controls playsInline loop /></div>
        </div>
        <button type="button" className="iconbtn ln-x" data-x ref={closeRef} aria-label="Close reel">{X}</button>
        <button type="button" className="iconbtn ln-nav ln-prev" data-prev aria-label="Previous reel">{PREV}</button>
        <button type="button" className="iconbtn ln-nav ln-next" data-next aria-label="Next reel">{NEXT}</button>
      </div>
    </>
  );
}
