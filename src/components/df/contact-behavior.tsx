"use client";

// Contact page behaviour: copy-email button and the heading letters that lean away from the cursor.
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { copyText, reduced, split, touchOnly } from "./motion";

export function ContactBehavior({ email, children }: { email: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const off: Array<() => void> = [];

    const copyBtn = root.querySelector<HTMLElement>("#copyBtn");
    if (copyBtn) {
      const onCopy = () => { void copyText(copyBtn, email, "Copy email"); };
      copyBtn.addEventListener("click", onCopy);
      off.push(() => copyBtn.removeEventListener("click", onCopy));
    }

    const ctx = gsap.context(() => {
      const h = root.querySelector<HTMLElement>("#ctH");
      if (!h) return;
      const chars = split(h, "chars");
      if (reduced()) return;
      gsap.from(chars, { yPercent: 100, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.04, delay: 0.5 });
      if (touchOnly()) return;
      const setY = chars.map((c) => gsap.quickTo(c, "y", { duration: 0.5, ease: "power3" }));
      const setR = chars.map((c) => gsap.quickTo(c, "rotation", { duration: 0.5, ease: "power3" }));
      const reset = () => { setY.forEach((f) => f(0)); setR.forEach((f) => f(0)); };
      const onMove = (e: PointerEvent) => {
        const hb = h.getBoundingClientRect();
        if (e.clientY < hb.top - 160 || e.clientY > hb.bottom + 160) { reset(); return; }
        chars.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const near = Math.max(0, 1 - Math.hypot(dx, dy) / 220);
          setY[i](-near * 26); setR[i](near * Math.sign(dx) * -8);
        });
      };
      window.addEventListener("pointermove", onMove);
      document.addEventListener("pointerleave", reset);
      off.push(() => { window.removeEventListener("pointermove", onMove); document.removeEventListener("pointerleave", reset); });
    }, root);

    return () => {
      off.forEach((f) => f());
      ctx.revert();
    };
  }, [email]);

  return <div className="p-contact" ref={ref}>{children}</div>;
}
