"use client";

// Resume page behaviour: coursework collapsibles, scroll-linked timeline, chip stagger, hash scroll.
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reduced } from "./motion";

gsap.registerPlugin(ScrollTrigger);

export function ResumeBehavior({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const off: Array<() => void> = [];
    const reduce = reduced();
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const ctx = gsap.context(() => {
      /* Coursework collapsibles */
      root.querySelectorAll<HTMLElement>(".cbtn").forEach((btn) => {
        const panel = document.getElementById(btn.getAttribute("aria-controls") || "");
        if (!panel) return;
        gsap.set(panel, { height: 0 });
        const onClick = () => {
          const o = btn.getAttribute("aria-expanded") !== "true";
          btn.setAttribute("aria-expanded", String(o));
          const t = btn.querySelector(".cbtn-t");
          if (t) t.textContent = o ? "Hide coursework" : "Show coursework";
          if (reduce) { gsap.set(panel, { height: o ? "auto" : 0 }); return; }
          gsap.to(panel, { height: o ? "auto" : 0, duration: 0.6, ease: "power3.out", onComplete: () => ScrollTrigger.refresh() });
        };
        btn.addEventListener("click", onClick);
        off.push(() => btn.removeEventListener("click", onClick));
      });

      /* Timeline fill + dots */
      const entries = Array.from(root.querySelectorAll<HTMLElement>(".tl-e"));
      if (reduce) {
        entries.forEach((e) => e.classList.add("lit"));
        gsap.set("#tlFill", { scaleY: 1 });
      } else {
        gsap.fromTo("#tlFill", { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: { trigger: "#tl", start: "top 60%", end: "bottom 60%", scrub: 0.4 } });
        entries.forEach((e) => ScrollTrigger.create({ trigger: e, start: "top 60%", onLeaveBack: () => e.classList.remove("lit"), onEnter: () => e.classList.add("lit") }));
        off.push(() => entries.forEach((e) => e.classList.remove("lit")));
        // Skill chips stagger in
        root.querySelectorAll<HTMLElement>(".sg, .cg").forEach((g) => gsap.from(g.querySelectorAll(".chip"), { y: 40, x: -16, opacity: 0, scale: 0.9, duration: 0.9, ease: "expo.out", stagger: { each: 0.035, from: "start" }, scrollTrigger: { trigger: g, start: "top 90%" } }));
        entries.forEach((e) => gsap.from(e.querySelector(".tl-per"), { clipPath: "inset(0 100% 0 0)", x: -20, duration: 1, ease: "expo.out", scrollTrigger: { trigger: e, start: "top 75%" } }));
      }
    }, root);

    /* Scroll to hash after layout */
    if (location.hash.length > 1) {
      const go = () => {
        if (cancelled) return;
        const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (!el) return;
        ScrollTrigger.refresh();
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "auto" });
      };
      (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { if (!cancelled) timer = setTimeout(go, 350); });
    }

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      off.forEach((f) => f());
      ctx.revert();
    };
  }, []);

  return <div className="p-resume" ref={ref}>{children}</div>;
}
