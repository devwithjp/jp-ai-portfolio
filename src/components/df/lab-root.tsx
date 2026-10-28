"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cssVar, onTheme, reduced } from "./motion";

gsap.registerPlugin(ScrollTrigger);

/* Hero graphic: a large causal attention matrix. The cursor is the query token. */
function attention(c: HTMLCanvasElement, bag: Array<() => void>) {
  const ctx = c.getContext("2d");
  const hero = c.parentElement;
  if (!ctx || !hero) return;
  const N = 40;
  const seed = Array.from({ length: N * N }, () => Math.random());
  let accent = cssVar("--accent"), accent2 = cssVar("--accent-2");
  const m = { x: -1, y: -1, tx: -1, ty: -1, active: false };
  const move = (e: PointerEvent) => {
    const r = c.getBoundingClientRect();
    m.tx = (e.clientX - r.left) * Math.min(devicePixelRatio, 1.5);
    m.ty = (e.clientY - r.top) * Math.min(devicePixelRatio, 1.5);
    if (!m.active) { m.x = m.tx; m.y = m.ty; }
    m.active = true;
  };
  const leave = () => { m.active = false; };
  hero.addEventListener("pointermove", move, { passive: true });
  hero.addEventListener("pointerleave", leave);
  bag.push(() => { hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave); });
  const draw = (t: number) => {
    const dpr = Math.min(devicePixelRatio, 1.5);
    const w = (c.width = Math.max(1, c.clientWidth * dpr)), h = (c.height = Math.max(1, c.clientHeight * dpr));
    const s = Math.max(34 * dpr, 1), cols = Math.ceil(w / s), rows = Math.ceil(h / s);
    m.x += (m.tx - m.x) * 0.15; m.y += (m.ty - m.y) * 0.15;
    const sweep = (t * 1.4) % rows;
    const qr = m.active ? m.y / s : sweep, qc = m.active ? m.x / s : -1;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols && j <= i; j++) {
        const k = seed[(i % N) * N + (j % N)];
        const rowLive = Math.max(0, 1 - Math.abs(i + 0.5 - qr) / 1.2);
        const near = qc >= 0 ? Math.max(0, 1 - Math.hypot(j - qc, i - qr) / 5) : 0;
        const v = Math.pow(k, 3) * (0.35 + rowLive * 1.4 + near * 1.6) + (i === j ? 0.2 : 0) + near * 0.35;
        const pad = 1 + near * -0.6;
        ctx.globalAlpha = Math.min(0.62, 0.04 + v * 0.34);
        ctx.fillStyle = near > 0.25 || (i + j) % 9 === 0 ? accent2 : accent;
        ctx.fillRect(j * s + pad, i * s + pad, s - 2 * pad, s - 2 * pad);
      }
    }
    ctx.globalAlpha = 1;
  };
  const reduce = reduced();
  bag.push(onTheme(() => { accent = cssVar("--accent"); accent2 = cssVar("--accent-2"); if (reduce) draw(3); }));
  if (reduce) {
    draw(3);
    const rs = () => draw(3);
    addEventListener("resize", rs);
    bag.push(() => removeEventListener("resize", rs));
    return;
  }
  let vis = false;
  const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; });
  io.observe(c);
  const tick = (t: number) => { if (vis) draw(t); };
  gsap.ticker.add(tick);
  bag.push(() => { io.disconnect(); gsap.ticker.remove(tick); });
}

export function LabRoot({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const bag: Array<() => void> = [];
    const canvas = root.querySelector<HTMLCanvasElement>("#labfx");
    if (canvas) attention(canvas, bag);
    const ctx = gsap.context(() => {
      if (reduced()) return;
      /* Scrubbed marquee rows */
      const st = { trigger: ".marq", start: "top bottom", end: "bottom top", scrub: 0.6 };
      gsap.fromTo("#mq1 > div", { xPercent: 0 }, { xPercent: -50, ease: "none", scrollTrigger: st });
      gsap.fromTo("#mq2 > div", { xPercent: -50 }, { xPercent: 0, ease: "none", scrollTrigger: st });

      /* Pack topics stagger in as tokens */
      root.querySelectorAll(".pk").forEach((card) => {
        const toks = card.querySelectorAll(".tok");
        gsap.set(toks, { opacity: 0, y: 18, scale: 0.92 });
        ScrollTrigger.create({ trigger: card, start: "top 78%", once: true, onEnter: () =>
          gsap.to(toks, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "expo.out", stagger: 0.05, delay: 0.3 }) });
      });

      /* Interpretability: stage pins on desktop; method slides out, findings slide in */
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const step = root.querySelector<HTMLElement>("#ipStep");
        gsap.set(".ip-f", { yPercent: 40, opacity: 0 });
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: "#ipStage", start: "top 72px", end: "+=1300", pin: true, scrub: 0.6, anticipatePin: 1,
            onUpdate: (s) => { if (step) step.textContent = s.progress > 0.5 ? "Findings" : "Method"; } },
        });
        tl.to(".ip-m", { yPercent: -40, opacity: 0, scale: 0.96, duration: 1 }, 0.3)
          .to(".ip-f", { yPercent: 0, opacity: 1, duration: 1 }, 0.55);
        return () => { gsap.set(".ip-m, .ip-f", { clearProps: "all" }); };
      });
    }, root);
    return () => { bag.forEach((f) => f()); ctx.revert(); };
  }, []);
  return <div className="p-lab" ref={ref}>{children}</div>;
}
