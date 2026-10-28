"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reduced } from "./motion";

gsap.registerPlugin(ScrollTrigger);

export function PostRoot({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const prose = root.querySelector<HTMLElement>("#prose");
    const fg = root.querySelector<SVGCircleElement>("#rgfg");
    const txt = root.querySelector<HTMLElement>("#rgtxt");
    const ring = root.querySelector<HTMLElement>("#ring");
    if (!prose || !fg || !txt || !ring) return;
    const C = 2 * Math.PI * 18;
    fg.style.strokeDasharray = String(C);
    const upd = () => {
      const r = prose.getBoundingClientRect();
      const total = r.height - innerHeight * 0.5;
      const p01 = Math.min(1, Math.max(0, (innerHeight * 0.3 - r.top) / Math.max(1, total)));
      fg.style.strokeDashoffset = String(C * (1 - p01));
      txt.textContent = String(Math.round(p01 * 100));
      ring.classList.toggle("on", r.top < innerHeight * 0.6);
      ring.classList.toggle("done", p01 >= 0.995);
    };
    addEventListener("scroll", upd, { passive: true });
    addEventListener("resize", upd);
    upd();

    const ctx = gsap.context(() => {
      if (reduced()) return;
      gsap.to(".post-ghost", { yPercent: 30, ease: "none", scrollTrigger: { trigger: ".post-hero", start: "top top", end: "bottom top", scrub: true } });
      prose.querySelectorAll("p:not(.pull), ul").forEach((el) =>
        gsap.from(el.tagName === "UL" ? el.children : el, { opacity: 0, y: 34, duration: 0.9, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 88%" } }));
      gsap.from(".pull", { opacity: 0, y: 30, duration: 1.1, ease: "expo.out", delay: 1, clearProps: "all" });
    }, root);
    return () => { removeEventListener("scroll", upd); removeEventListener("resize", upd); ctx.revert(); };
  }, []);
  return <div className="p-post" ref={ref}>{children}</div>;
}
