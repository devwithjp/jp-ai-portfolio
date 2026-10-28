"use client";

// "Show all projects" button, the filter tabs, and the unrolling long tail (server-rendered children).
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { reduced, tabIndicator } from "./motion";

gsap.registerPlugin(ScrollTrigger, Flip);

export type FilterTab = { id: string; label: string; count: number };

export function ProjectsShowAll({ total, tabs, children }: { total: number; tabs: FilterTab[]; children: ReactNode }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const allRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = btnRef.current, all = allRef.current, tabsEl = tabsRef.current;
    if (!btn || !all || !tabsEl) return;
    const reduce = reduced();
    const ctx = gsap.context(() => {}, all);
    const bag: Array<() => void> = [];
    let built = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const afterOpen = () => {
      const ind = tabIndicator(tabsEl);
      bag.push(ind.cleanup);
      const onTabs = (e: Event) => {
        const b = (e.target as HTMLElement).closest<HTMLButtonElement>("button[data-f]");
        if (!b) return;
        tabsEl.querySelectorAll("button").forEach((x) => x.setAttribute("aria-selected", x === b ? "true" : "false"));
        ind.move();
        const f = b.dataset.f!;
        const els = [...all.querySelectorAll<HTMLElement>("[data-types]")];
        const state = !reduce ? Flip.getState(els) : null;
        els.forEach((g) => { g.hidden = !(f === "all" || g.dataset.types!.split(" ").includes(f)); });
        if (state) ctx.add(() => {
          Flip.from(state, { duration: 0.8, ease: "expo.inOut", absolute: false,
            onEnter: (e2) => gsap.fromTo(e2, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }),
            onLeave: (e2) => gsap.to(e2, { opacity: 0, duration: 0.3 }),
            onComplete: () => ScrollTrigger.refresh() });
        });
        else ScrollTrigger.refresh();
      };
      tabsEl.addEventListener("click", onTabs);
      bag.push(() => tabsEl.removeEventListener("click", onTabs));
      // Screenshots drift slightly inside their frames as the page scrolls.
      if (!reduce) ctx.add(() => {
        all.querySelectorAll<HTMLImageElement>(".shot img:not([data-fit='contain'])").forEach((im) =>
          gsap.fromTo(im, { yPercent: -4, scale: 1.08 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: im.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));
      });
    };

    const open = (scrollTo?: string) => {
      if (all.hidden) {
        all.hidden = false;
        btn.setAttribute("aria-expanded", "true");
        btn.classList.add("open");
        if (!built) { built = true; afterOpen(); }
        if (!reduce) ctx.add(() => { gsap.from(all, { height: 0, opacity: 0, duration: 1.1, ease: "expo.inOut", clearProps: "height,opacity", onComplete: () => ScrollTrigger.refresh() }); });
        else ScrollTrigger.refresh();
      }
      if (scrollTo) {
        clearTimeout(timer);
        timer = setTimeout(() => document.getElementById(scrollTo)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }), reduce ? 0 : 900);
      }
    };
    const onBtn = () => {
      if (all.hidden) return open();
      all.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      btn.classList.remove("open");
      ScrollTrigger.refresh();
    };
    btn.addEventListener("click", onBtn);

    // Deep links like /projects#casework or /projects#smartcare-imu open the list first.
    const fromHash = () => {
      const h = decodeURIComponent(location.hash.slice(1));
      if (h && all.querySelector(`[id="${CSS.escape(h)}"]`)) open(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);

    return () => {
      clearTimeout(timer);
      btn.removeEventListener("click", onBtn);
      window.removeEventListener("hashchange", fromHash);
      bag.forEach((f) => f());
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section className="showall wrap">
        <button ref={btnRef} className="showbtn" id="showBtn" type="button" aria-expanded="false" aria-controls="allwork">
          <span><span className="sb-t">Show all projects</span><span className="muted">The venture, the capstone, side builds, five case studies, four products and the Lab.</span></span>
          <span className="sb-n"><span>{total}</span><span className="sb-plus" aria-hidden="true"></span></span>
        </button>
      </section>
      <div ref={allRef} id="allwork" className="allwork" hidden>
        <div className="wrap filterbar">
          <div ref={tabsRef} className="tabs" role="tablist" aria-label="Filter projects" id="ftabs">
            <button role="tab" aria-selected="true" data-f="all">All<span className="n">{total}</span></button>
            {tabs.map((t) => (
              <button key={t.id} role="tab" aria-selected="false" data-f={t.id}>{t.label}<span className="n">{t.count}</span></button>
            ))}
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
