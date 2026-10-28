"use client";

// Case study tabs for /projects/[slug]. Panels are rendered on the server and passed in.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reduced, tabIndicator } from "./motion";

gsap.registerPlugin(ScrollTrigger);

export function ProjectCaseStudy({ tabs, panels }: { tabs: string[]; panels: Record<string, ReactNode> }) {
  const [tab, setTab] = useState(tabs[0]);
  const tabsRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<HTMLDivElement>(null);
  const moveRef = useRef<() => void>(() => {});
  const first = useRef(true);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const ind = tabIndicator(el);
    moveRef.current = ind.move;
    return () => ind.cleanup();
  }, []);

  // After a tab swap: move the pill and bring the new panel in.
  useEffect(() => {
    moveRef.current();
    ScrollTrigger.refresh();
    if (first.current) { first.current = false; return; }
    const pan = panRef.current;
    if (!pan || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.to(pan, { opacity: 1, y: 0, duration: 0.3 });
      gsap.from(pan.children[0]?.children || pan.children, { y: 24, opacity: 0, duration: 0.7, ease: "expo.out", stagger: 0.06 });
    }, pan);
    return () => ctx.revert();
  }, [tab]);

  const pick = (t: string) => {
    if (t === tab) return;
    const pan = panRef.current;
    if (!pan || reduced()) return setTab(t);
    gsap.to(pan, { opacity: 0, y: 10, duration: 0.2, onComplete: () => setTab(t) });
  };

  return (
    <>
      <div ref={tabsRef} className="tabs cs-tabs" role="tablist" id="csTabs">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={t === tab} data-t={t} onClick={() => pick(t)}>{t}</button>
        ))}
      </div>
      <div ref={panRef} className="cs-panel" id="csPanel" role="tabpanel">{panels[tab]}</div>
    </>
  );
}
