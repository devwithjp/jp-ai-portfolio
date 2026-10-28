"use client";

// About page behaviour: FAQ accordion and the pinned "why I build" story.
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reduced } from "./motion";

gsap.registerPlugin(ScrollTrigger);

export function AboutBehavior({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const off: Array<() => void> = [];
    const reduce = reduced();

    const ctx = gsap.context(() => {
      /* Accordion */
      root.querySelectorAll<HTMLElement>(".faq-i").forEach((it) => {
        const btn = it.querySelector<HTMLElement>(".faq-q");
        const panel = it.querySelector<HTMLElement>(".faq-a");
        if (!btn || !panel) return;
        const open = btn.getAttribute("aria-expanded") === "true";
        gsap.set(panel, { height: open ? "auto" : 0 });
        panel.style.overflow = "hidden";
        const onClick = () => {
          const o = btn.getAttribute("aria-expanded") !== "true";
          btn.setAttribute("aria-expanded", String(o));
          if (reduce) { gsap.set(panel, { height: o ? "auto" : 0 }); return; }
          gsap.to(panel, { height: o ? "auto" : 0, duration: 0.55, ease: "power3.out", onComplete: () => ScrollTrigger.refresh() });
        };
        btn.addEventListener("click", onClick);
        off.push(() => btn.removeEventListener("click", onClick));
      });
    }, root);

    /* Pinned story: desktop with motion only, otherwise beats just stack. */
    const story = root.querySelector<HTMLElement>("#story");
    const fill = root.querySelector<HTMLElement>("#stFill");
    const mm = gsap.matchMedia();
    if (story && fill) {
      const rail = Array.from(story.querySelectorAll<HTMLElement>(".st-rail li"));
      const bs = Array.from(story.querySelectorAll<HTMLElement>(".beat"));
      const pin = story.querySelector<HTMLElement>(".st-pin");
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        if (!pin) return;
        story.classList.add("pinned");
        let cur = 0;
        const set = (i: number) => {
          cur = i;
          gsap.fromTo(bs[i].querySelector(".st-num"), { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: "expo.out" });
          rail.forEach((r, k) => r.classList.toggle("on", k === i));
          bs.forEach((b, k) => b.classList.toggle("on", k === i));
        };
        set(0);
        const st = ScrollTrigger.create({
          trigger: pin, start: "top top+=64", end: "+=" + bs.length * 70 + "%", pin: true, scrub: true,
          onUpdate: (self) => {
            gsap.set(fill, { scaleY: self.progress });
            const i = Math.min(bs.length - 1, Math.floor(self.progress * bs.length));
            if (i !== cur) set(i);
          },
        });
        return () => {
          story.classList.remove("pinned");
          st.kill();
          rail.forEach((r) => r.classList.remove("on"));
          bs.forEach((b) => b.classList.add("on"));
          gsap.set(fill, { clearProps: "all" });
        };
      });
    }

    return () => {
      off.forEach((f) => f());
      mm.revert();
      ctx.revert();
    };
  }, []);

  return <div className="p-about" ref={ref}>{children}</div>;
}
