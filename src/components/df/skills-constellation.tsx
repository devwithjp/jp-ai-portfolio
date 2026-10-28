"use client";

import { useEffect, useRef } from "react";
import { areas, skills } from "@/lib/skill-graph";
import { cssVar, onTheme, reduced } from "./motion";

// Hero constellation: one drifting cluster of dots per skill area.
export function SkillsConstellation() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current, hero = cv?.parentElement;
    const ctx = cv?.getContext("2d");
    if (!cv || !hero || !ctx) return;
    const reduce = reduced();
    let W = 0, H = 0, dpr = 1, c1 = "69,230,203", c2 = "56,189,242", raf = 0, visible = true, t0 = 0;
    const rgb = (c: string) => {
      const x = document.createElement("canvas").getContext("2d");
      if (!x) return null;
      x.fillStyle = c; x.fillRect(0, 0, 1, 1);
      const d = x.getImageData(0, 0, 1, 1).data;
      return `${d[0]},${d[1]},${d[2]}`;
    };
    const colours = () => { c1 = rgb(cssVar("--accent") || "#45e6cb") ?? c1; c2 = rgb(cssVar("--accent-2") || "#38bdf2") ?? c2; };
    // Deterministic pseudo-random so the layout is stable.
    let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const clusters = areas.map((x) => {
      const items = skills.filter((s) => s.area === x.id);
      return { n: items.length, cx: 0, cy: 0, r: 0, ux: rnd(), uy: rnd(), dots: items.map(() => ({ a: rnd() * 6.283, d: 0.25 + 0.75 * Math.sqrt(rnd()), sp: (0.04 + rnd() * 0.08) * (rnd() < 0.5 ? -1 : 1), ph: rnd() * 6.283 })) };
    });
    const COLS = 5, ROWS = 3;
    function layout() {
      const r = hero!.getBoundingClientRect();
      W = r.width; H = r.height; dpr = Math.min(devicePixelRatio || 1, 2);
      cv!.width = W * dpr; cv!.height = H * dpr;
      const wide = W > 900, x0 = wide ? W * 0.46 : W * 0.06, x1 = wide ? W * 0.97 : W * 0.94;
      const cols = wide ? COLS : 3, rows = wide ? ROWS : 5;
      const cw = (x1 - x0) / cols, ch = (H * 0.86) / rows;
      clusters.forEach((c, k) => {
        const col = k % cols, row = Math.floor(k / cols);
        c.cx = x0 + cw * (col + 0.2 + c.ux * 0.6); c.cy = H * 0.07 + ch * (row + 0.2 + c.uy * 0.6);
        c.r = Math.min(cw, ch) * (0.16 + 0.34 * Math.sqrt(c.n / 30));
        c.r = Math.min(c.r, Math.min(cw, ch) * 0.46);
      });
    }
    function draw(t: number) {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);
      clusters.forEach((c, k) => {
        const col = k % 2 ? c2 : c1;
        const pts = c.dots.map((d) => {
          const ang = d.a + t * d.sp, rr = c.r * d.d * (1 + 0.08 * Math.sin(t * 0.4 + d.ph));
          return [c.cx + Math.cos(ang) * rr * 1.25, c.cy + Math.sin(ang) * rr];
        });
        ctx!.lineWidth = 1; ctx!.strokeStyle = `rgba(${col},0.09)`;
        ctx!.beginPath();
        pts.forEach((p, i) => { for (let j = 1; j <= 2; j++) { const q = pts[i + j]; if (q) { ctx!.moveTo(p[0], p[1]); ctx!.lineTo(q[0], q[1]); } } });
        ctx!.stroke();
        ctx!.fillStyle = `rgba(${col},0.5)`;
        pts.forEach((p, i) => { ctx!.beginPath(); ctx!.arc(p[0], p[1], i % 7 === 0 ? 2 : 1.3, 0, 6.283); ctx!.fill(); });
      });
    }
    function loop(ts: number) { if (!visible) { raf = 0; return; } t0 = t0 || ts; draw((ts - t0) / 1000); raf = requestAnimationFrame(loop); }
    const start = () => { if (!raf && !reduce) raf = requestAnimationFrame(loop); };
    colours(); layout(); draw(0);
    const ro = new ResizeObserver(() => { layout(); if (reduce || !raf) draw(0); });
    ro.observe(hero);
    const offTheme = onTheme(() => { colours(); if (reduce || !raf) draw(0); });
    let io: IntersectionObserver | null = null;
    if (!reduce) {
      io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) start(); }, { threshold: 0 });
      io.observe(hero);
      start();
    }
    return () => { cancelAnimationFrame(raf); raf = 0; ro.disconnect(); io?.disconnect(); offTheme(); };
  }, []);
  return <canvas className="fx" id="constellation" ref={ref} aria-hidden="true" />;
}
