"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll-linked progress through the evidence rows, plus the live card spotlight.
export function TrackProgress({ total, children }: { total: number; children: ReactNode }) {
  const rows = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLElement>(null);
  const cur = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const r = rows.current, f = fill.current, c = cur.current;
    if (!r || !f || !c) return;
    const items = [...r.children] as HTMLElement[];
    const st = ScrollTrigger.create({
      trigger: r, start: "top 60%", end: "bottom 60%",
      onUpdate: (self) => {
        f.style.transform = `scaleX(${self.progress})`;
        let n = 1; items.forEach((el, i) => { if (el.getBoundingClientRect().top < innerHeight * 0.55) n = i + 1; });
        c.textContent = String(n).padStart(2, "0");
      },
    });
    const offs = items.map((el) => {
      const move = (e: PointerEvent) => { const b = el.getBoundingClientRect(); el.style.setProperty("--mx", e.clientX - b.left + "px"); el.style.setProperty("--my", e.clientY - b.top + "px"); };
      el.addEventListener("pointermove", move);
      return () => el.removeEventListener("pointermove", move);
    });
    return () => { st.kill(); offs.forEach((o) => o()); };
  }, []);
  return (
    <>
      <div className="tk-prog" aria-hidden="true">
        <span className="tk-cur" ref={cur}>01</span>
        <span className="tk-bar"><i ref={fill} /></span>
        <span className="kicker">of {String(total).padStart(2, "0")}</span>
      </div>
      <div className="tk-rows" id="tkRows" ref={rows}>{children}</div>
    </>
  );
}
