"use client";

import { useEffect, useRef, useState } from "react";

export type ScrubStep = { lines: string[] };

// Scroll-scrubbed image sequence: as you scroll through the (tall) section, the
// freedive footage plays frame by frame on a pinned canvas, with the story beats
// fading in over it. Progressive enhancement: before JS (and under reduced motion)
// it renders the poster image with the beats stacked and readable.
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
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const frameUrl = (i: number) => `${framesBase}${String(i + 1).padStart(framePad, "0")}${frameExt}`;

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

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

    // Preload the sequence; draw the first frame as soon as it lands.
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const im = new window.Image();
      im.decoding = "async";
      im.src = frameUrl(i);
      if (i === 0) im.onload = () => draw(0);
      imgs.push(im);
    }
    imagesRef.current = imgs;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        const p = total > 0 ? scrolled / total : 0;
        const idx = Math.min(frameCount - 1, Math.max(0, Math.round(p * (frameCount - 1))));
        draw(idx);
        setProgress(p);
        setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length))));
      });
    };

    const arm = requestAnimationFrame(() => {
      setReady(true);
      onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(arm);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [frameCount, steps.length]);

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
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
        {/* legibility scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#03141a] via-[#03141a]/35 to-[#03141a]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgba(3,20,26,0.85),transparent_60%)]" />

        {/* descent progress line (left) */}
        <div className="absolute left-6 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-white/15 sm:block">
          <div className="w-px bg-accent shadow-[0_0_10px_var(--accent)]" style={{ height: `${progress * 100}%` }} />
        </div>

        {/* story beats */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-3xl px-6 pb-16 sm:px-10 sm:pb-20">
            <div className="relative min-h-[clamp(140px,26vh,260px)]">
              {steps.map((s, i) => (
                <div
                  key={i}
                  aria-hidden={i !== active}
                  className="absolute inset-x-0 bottom-0 transition-all duration-700 ease-out"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "translateY(0)" : "translateY(16px)",
                  }}
                >
                  <div className="space-y-3 font-display text-2xl font-medium leading-snug tracking-tight text-[#eef6f7] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-[2rem]">
                    {s.lines.map((l, j) => (
                      <p key={j}>{l}</p>
                    ))}
                  </div>
                  <div className="mt-5 font-mono text-xs text-[#eef6f7]/70">
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
