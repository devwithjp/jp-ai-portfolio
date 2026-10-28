"use client";

// Lab teaser card: a causal attention matrix, each row lighting up in turn.
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cssVar, reduced } from "./motion";

export function ProjectsLabTeaser() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const accent = cssVar("--accent");
    const N = 18;
    const seed = Array.from({ length: N * N }, () => Math.random());
    const draw = (t: number) => {
      const k = Math.min(window.devicePixelRatio, 1.5);
      const w = (c.width = c.clientWidth * k), hh = (c.height = c.clientHeight * k);
      const s = Math.min(w, hh) / N, ox = w - s * N, row = Math.floor(t * 2) % N;
      ctx.fillStyle = accent;
      for (let i = 0; i < N; i++) for (let j = 0; j <= i; j++) {
        const v = Math.pow(seed[i * N + j], 3) * (i === row ? 1 : 0.35) + (i === j ? 0.15 : 0);
        ctx.globalAlpha = 0.04 + v * 0.7;
        ctx.fillRect(ox + j * s + 1, i * s + 1, s - 2, s - 2);
      }
      ctx.globalAlpha = 1;
    };
    if (reduced()) { draw(0); return; }
    let vis = false;
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; });
    io.observe(c);
    const tick = (t: number) => { if (vis) draw(t); };
    gsap.ticker.add(tick);
    return () => { io.disconnect(); gsap.ticker.remove(tick); };
  }, []);
  return (
    <Link className="card spot labteaser" href="/projects/lab">
      <canvas ref={ref} className="lt-fx" id="ltfx" aria-hidden="true" />
      <div className="lt-body">
        <p className="kicker accent">Lab · from scratch</p>
        <h2 className="display-lg">And underneath the products: the stack, built by hand.</h2>
        <p className="muted">Products show I can ship. The Lab shows I know what&apos;s underneath: 45 notebooks implementing the modern NLP and LLM stack from first principles, a regex tokenizer to RLHF.</p>
      </div>
      <span className="link">Open the Lab →</span>
    </Link>
  );
}
