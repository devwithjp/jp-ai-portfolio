"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Thin scroll-progress bar pinned to the top. Driven by a CSS scroll-driven
// animation (animation-timeline: scroll) so there is no scroll listener and no
// per-frame React work. Hidden where scroll-timeline is unsupported (decorative).
export function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden />;
}

// Headline that reveals word by word as it scrolls into view.
export function WordsReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (e) => {
        if (e[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className={`reveal inline-block ${visible ? "is-visible" : ""}`}
          style={{ transitionDelay: `${i * 60}ms`, marginRight: "0.26em" }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

// SVG wave divider between sections. flip points it the other way.
export function WaveDivider({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <div className={`pointer-events-none w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`} aria-hidden>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-[40px] w-full sm:h-[56px]">
        <path
          d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
          fill="color-mix(in oklab, var(--accent) 7%, transparent)"
        />
      </svg>
    </div>
  );
}

// Seamless marquee strip (duplicates children for the loop).
export function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <div className="marquee py-1 group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center gap-10">{children}</div>
        <div className="flex shrink-0 items-center gap-10" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
