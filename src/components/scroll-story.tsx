"use client";

import { useEffect, useRef, useState } from "react";

export type StoryStep = { kicker?: string; lines: string[] };

// Scrollytelling: a pinned panel where one beat is shown at a time and the text
// advances to the next as you scroll through the (tall) section. Progressive
// enhancement: before JS (and under prefers-reduced-motion) it renders every
// beat stacked and readable, so crawlers and no-JS loads always see the text.
export function ScrollStory({ steps, className = "" }: { steps: StoryStep[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // keep the stacked fallback
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        const p = total > 0 ? scrolled / total : 0;
        const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length)));
        setActive(idx);
      });
    };
    // Arm on the next frame (a callback, not a synchronous effect setState),
    // so the SSR/no-JS markup hydrates cleanly before we switch to stepped mode.
    const armId = requestAnimationFrame(() => {
      setReady(true);
      onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(armId);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps.length]);

  if (!ready) {
    return (
      <div className={`max-w-2xl space-y-10 ${className}`}>
        {steps.map((s, i) => (
          <div key={i}>
            {s.kicker ? (
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{s.kicker}</div>
            ) : null}
            <div className="mt-3 space-y-4 text-lg leading-relaxed text-muted first:text-fg">
              {s.lines.map((l, j) => (
                <p key={j}>{l}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ height: `${steps.length * 78}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center">
        {/* progress rail */}
        <div className="mb-9 flex gap-2" aria-hidden>
          {steps.map((_, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active ? "w-12 bg-accent" : "w-6 bg-line"
              }`}
            />
          ))}
        </div>

        {/* stacked beats, crossfading */}
        <div className="relative min-h-[clamp(220px,42vh,440px)]">
          {steps.map((s, i) => (
            <div
              key={i}
              aria-hidden={i !== active}
              className="absolute inset-x-0 top-0 transition-all duration-700 ease-out will-change-transform"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? "translateY(0)" : i < active ? "translateY(-28px)" : "translateY(28px)",
                pointerEvents: i === active ? "auto" : "none",
              }}
            >
              {s.kicker ? (
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{s.kicker}</div>
              ) : null}
              <div className="mt-4 max-w-3xl space-y-4 font-display text-2xl font-medium leading-snug tracking-tight text-fg sm:text-[2rem]">
                {s.lines.map((l, j) => (
                  <p key={j}>{l}</p>
                ))}
              </div>
              <div className="mt-7 font-mono text-xs text-muted/70">
                {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
