"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reduced, tabIndicator, touchOnly } from "./motion";

gsap.registerPlugin(ScrollTrigger, Flip);

export type WritingPreview = { cat: string; date: string; summary: string };

export function WritingRoot({ previews, children }: { previews: WritingPreview[]; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const tabs = root.querySelector<HTMLElement>("#wtabs");
    const listEl = root.querySelector<HTMLElement>("#wlist");
    const prev = root.querySelector<HTMLElement>("#wprev");
    if (!tabs || !listEl) return;
    const bag: Array<() => void> = [];
    const rows = Array.from(listEl.children) as HTMLElement[];
    const { move, cleanup } = tabIndicator(tabs);
    bag.push(cleanup);
    const reduce = reduced();

    const onTab = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>("button[data-f]");
      if (!b || b.getAttribute("aria-selected") === "true") return;
      tabs.querySelectorAll("button").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
      move();
      const f = b.dataset.f;
      const apply = () => {
        let n = 0;
        rows.forEach((r) => {
          const off = f !== "all" && r.dataset.cat !== f;
          r.classList.toggle("is-off", off);
          const num = r.querySelector(".wnum");
          if (!off && num) num.textContent = String(++n).padStart(2, "0");
        });
      };
      if (reduce) { apply(); return; }
      const state = Flip.getState(rows);
      apply();
      Flip.from(state, {
        duration: 0.7, ease: "expo.inOut", absolute: true, nested: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", delay: 0.25 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, y: -12, duration: 0.3, ease: "power2.in" }),
      });
    };
    tabs.addEventListener("click", onTab);
    bag.push(() => tabs.removeEventListener("click", onTab));

    const ctx = gsap.context(() => {
      /* Floating summary preview that follows the cursor */
      if (prev && !touchOnly() && !reduce) {
        const pc = prev.querySelector<HTMLElement>("#wpc"), ps = prev.querySelector<HTMLElement>("#wps");
        const qx = gsap.quickTo(prev, "x", { duration: 0.5, ease: "power3" }), qy = gsap.quickTo(prev, "y", { duration: 0.5, ease: "power3" });
        root.classList.add("has-prev");
        bag.push(() => root.classList.remove("has-prev"));
        rows.forEach((r, i) => {
          const show = () => {
            if (pc) pc.textContent = previews[i].cat + " · " + previews[i].date;
            if (ps) ps.textContent = previews[i].summary;
            prev.classList.add("on");
          };
          const hide = () => prev.classList.remove("on");
          const focus = () => { show(); const b = r.getBoundingClientRect(); qx(Math.min(b.right - 380, innerWidth - 400)); qy(b.top + 20); };
          r.addEventListener("pointerenter", show);
          r.addEventListener("focus", focus);
          r.addEventListener("pointerleave", hide);
          r.addEventListener("blur", hide);
          bag.push(() => { r.removeEventListener("pointerenter", show); r.removeEventListener("focus", focus); r.removeEventListener("pointerleave", hide); r.removeEventListener("blur", hide); });
        });
        const mv = (e: PointerEvent) => { qx(Math.min(e.clientX + 28, innerWidth - 400)); qy(e.clientY + 22); };
        listEl.addEventListener("pointermove", mv);
        bag.push(() => listEl.removeEventListener("pointermove", mv));
      }
      if (!reduce) gsap.from(rows, { opacity: 0, y: 40, duration: 1, ease: "expo.out", stagger: 0.08, delay: 0.7, clearProps: "all" });
    }, root);
    return () => { bag.forEach((f) => f()); ctx.revert(); };
  }, [previews]);
  return <div className="p-writing" ref={ref}>{children}</div>;
}
