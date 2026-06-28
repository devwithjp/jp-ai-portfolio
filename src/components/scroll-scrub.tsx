"use client";

import { useEffect, useRef, useState } from "react";

export type ScrubStep = { lines: string[] };

// Scroll-scrubbed image sequence. Performance-critical bits:
//  - every frame is decoded up front (img.decode), so drawImage never blocks;
//  - a single rAF loop (gated by IntersectionObserver) reads scroll and draws;
//  - the progress line and the active beat are mutated via refs, NOT React state,
//    so scrolling triggers zero React re-renders.
// Progressive enhancement: before JS / under reduced motion it renders the poster
// with the beats stacked and readable.
export function ScrollScrub({
  framesBase,
  frameCount,
  framePad = 3,
  frameExt = ".jpg",
  poster,
  steps,
  posterAlt = "Freediving over a coral reef",
}: {
  framesBase: string;
  frameCount: number;
  framePad?: number;
  frameExt?: string;
  poster: string;
  steps: ScrubStep[];
  posterAlt?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  const frameUrl = (i: number) => `${framesBase}${String(i + 1).padStart(framePad, "0")}${frameExt}`;

  // Decide ready on mount (rAF callback, not a sync effect setState). Stays in the
  // stacked fallback under reduced motion. This MUST be separate from the scrub
  // setup below, because sectionRef only exists once the `ready` branch renders.
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const section = sectionRef.current;
    if (!section) return;

    // Preload + decode every frame so draws are instant.
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const im = new window.Image();
      im.decoding = "async";
      im.src = frameUrl(i);
      im.decode?.().catch(() => {});
      imgs.push(im);
    }
    imagesRef.current = imgs;

    const draw = (idx: number) => {
      const c = canvasRef.current;
      const im = imagesRef.current[idx];
      if (!c || !im || !im.complete || !im.naturalWidth) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(c.clientWidth * dpr);
      const h = Math.round(c.clientHeight * dpr);
      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
      }
      const scale = Math.max(c.width / im.naturalWidth, c.height / im.naturalHeight);
      const dw = im.naturalWidth * scale;
      const dh = im.naturalHeight * scale;
      ctx.drawImage(im, (c.width - dw) / 2, (c.height - dh) / 2, dw, dh);
    };

    let raf = 0;
    let running = false;
    let lastBeat = -1;
    const tick = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        const p = total > 0 ? scrolled / total : 0;
        draw(Math.min(frameCount - 1, Math.max(0, Math.round(p * (frameCount - 1)))));
        if (progressRef.current) progressRef.current.style.height = `${p * 100}%`;
        const b = Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length)));
        if (b !== lastBeat) {
          lastBeat = b;
          beatRefs.current.forEach((node, i) => {
            if (!node) return;
            node.style.opacity = i === b ? "1" : "0";
            node.style.transform = i === b ? "translateY(0)" : "translateY(16px)";
          });
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          if (!running) {
            running = true;
            raf = requestAnimationFrame(tick);
          }
        } else if (running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(section);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ready, frameCount, steps.length]);

  if (!ready) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} alt={posterAlt} className="h-[60vh] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03141a]/90 via-[#03141a]/40 to-[#03141a]/30" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl space-y-5 p-8 sm:p-12">
          {steps.map((s, i) => (
            <div key={i} className="font-display text-xl font-medium leading-snug text-[#eef6f7] sm:text-2xl">
              {s.lines.map((l, j) => (
                <p key={j}>{l}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} style={{ height: `${Math.max(steps.length, 3) * 80}vh` }}>
      <div
        className="sticky top-0 h-screen overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 h-full w-full [filter:saturate(1.12)_contrast(1.08)_brightness(0.82)]"
        />
        {/* cinematic grade + legibility: deepen toward the brand navy, vignette, bottom scrim */}
        <div className="pointer-events-none absolute inset-0 bg-[#06202a] mix-blend-multiply opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03141a] via-[#03141a]/45 to-[#03141a]/25" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(135%_110%_at_50%_35%,transparent_42%,rgba(3,20,26,0.82))]" />

        <div className="absolute left-6 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-white/15 sm:block">
          <div ref={progressRef} className="w-px bg-accent shadow-[0_0_10px_var(--accent)]" style={{ height: "0%" }} />
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-10 sm:pb-24">
            <div className="relative min-h-[clamp(150px,28vh,280px)] max-w-2xl">
              {steps.map((s, i) => (
                <div
                  key={i}
                  ref={(node) => {
                    beatRefs.current[i] = node;
                  }}
                  className="absolute inset-x-0 bottom-0 transition-[opacity,transform] duration-[450ms] ease-out"
                  style={{ opacity: i === 0 ? 1 : 0, transform: i === 0 ? "translateY(0)" : "translateY(14px)" }}
                >
                  <div className="space-y-2 font-display text-[1.7rem] font-medium leading-[1.18] tracking-tight text-[#eef6f7] [text-shadow:0_2px_30px_rgba(0,0,0,0.75)] sm:text-[2.1rem]">
                    {s.lines.map((l, j) => (
                      <p key={j}>{l}</p>
                    ))}
                  </div>
                  <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#eef6f7]/55">
                    {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
