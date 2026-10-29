"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { onTheme, reduced } from "./motion";

/* Night mode: a crystal jelly (Aequorea victoria) jets up the right edge, its rim of photophores glowing aqua.
   Plays only when someone switches to dark, never on load, and never on Water (always dark, no toggle). */

const TENTACLES = 14;
const RIM_Y = 62;
const rimX = (i: number, n: number) => 14 + (92 * i) / (n - 1);

export function NightJelly() {
  const path = usePathname();
  const onWater = path.startsWith("/water");
  const root = useRef<HTMLDivElement>(null);
  const bell = useRef<SVGGElement>(null);
  const glow = useRef<SVGGElement>(null);
  const tents = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el || onWater) return;
    let tl: gsap.core.Timeline | null = null;
    let tick: (() => void) | null = null;
    const stop = () => {
      tl?.kill(); tl = null;
      if (tick) { gsap.ticker.remove(tick); tick = null; }
      gsap.set(el, { autoAlpha: 0 });
    };

    const swim = () => {
      stop();
      const vh = window.innerHeight, h = el.offsetHeight;
      const from = vh + 20, to = -h - 40, step = 130;
      const pulses = Math.ceil((from - to) / step);
      // Tentacles trail and ripple; `drag` stretches them while the bell jets forward.
      const s = { drag: 0 };
      const t0 = performance.now();
      tick = () => {
        const t = (performance.now() - t0) / 1000;
        tents.current.forEach((p, i) => {
          const x0 = rimX(i, TENTACLES), len = 150 + ((i * 37) % 60) + s.drag * 40;
          let d = `M${x0} ${RIM_Y}`;
          for (let k = 1; k <= 8; k++) {
            const y = (len * k) / 8, a = (4 + s.drag * -2) * (k / 8);
            d += ` L${(x0 + (x0 - 60) * 0.12 * (k / 8) + Math.sin(k * 0.9 - t * 2.4 + i) * a).toFixed(1)} ${(RIM_Y + y).toFixed(1)}`;
          }
          p.setAttribute("d", d);
        });
      };
      gsap.ticker.add(tick);

      tl = gsap.timeline({ onComplete: stop });
      tl.set(el, { y: from, x: 0, autoAlpha: 1 })
        .fromTo(glow.current, { opacity: 0 }, { opacity: 0.55, duration: 1.2 }, 0);
      for (let i = 0; i < pulses; i++) {
        const at = 0.3 + i * 1.25;
        // Contract (jet), then relax and glide.
        tl.to(bell.current, { scaleX: 0.8, scaleY: 1.07, duration: 0.32, ease: "power2.in", transformOrigin: "50% 100%" }, at)
          .to(bell.current, { scaleX: 1, scaleY: 1, duration: 0.9, ease: "sine.out" }, at + 0.32)
          .to(glow.current, { opacity: 1, duration: 0.2, yoyo: true, repeat: 1 }, at + 0.2)
          .to(s, { drag: 1, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, at + 0.25)
          .to(el, { y: from - step * (i + 1), duration: 1.25, ease: "power3.out" }, at + 0.25)
          .to(el, { x: Math.sin(i * 1.3) * 14, rotation: Math.sin(i * 1.3) * 4, duration: 1.25, ease: "sine.inOut" }, at + 0.25);
      }
    };

    const offTheme = onTheme(() => {
      if (document.documentElement.classList.contains("light") || reduced()) stop();
      else swim();
    });
    return () => { offTheme(); stop(); };
  }, [onWater]);

  if (onWater) return null;
  return (
    <div className="night-jelly" ref={root} aria-hidden="true">
      <svg viewBox="0 0 120 280" width="100%" height="100%" overflow="visible">
        <defs>
          <radialGradient id="njBell" cx="50%" cy="30%" r="70%">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.28" />
            <stop offset="0.7" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.02" />
          </radialGradient>
        </defs>
        <g className="nj-tents" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.55">
          {Array.from({ length: TENTACLES }, (_, i) => (
            <path key={i} ref={(p) => { if (p) tents.current[i] = p; }} d={`M${rimX(i, TENTACLES)} ${RIM_Y} l0 150`} />
          ))}
        </g>
        <g ref={bell}>
          <path d="M8 62 C8 18 38 3 60 3 C82 3 112 18 112 62 C98 70 22 70 8 62 Z" fill="url(#njBell)" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.8" />
          {/* Radial canals and the oral arms hanging under the bell. */}
          <g fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.6">
            {[-40, -24, -8, 8, 24, 40].map((dx) => <path key={dx} d={`M60 14 Q${60 + dx * 0.6} 36 ${60 + dx} 64`} />)}
            <path d="M54 58 q-3 18 2 36 q4 12 -1 24" strokeOpacity="0.35" />
            <path d="M66 58 q3 18 -2 36 q-4 12 1 24" strokeOpacity="0.35" />
          </g>
          <ellipse cx="60" cy="40" rx="11" ry="8" fill="currentColor" opacity="0.14" />
          <g ref={glow} className="nj-glow" fill="currentColor">
            {Array.from({ length: 22 }, (_, i) => {
              const x = 10 + (100 * i) / 21, y = 62 + 5 * Math.sin((Math.PI * (x - 8)) / 104);
              return <circle key={i} cx={x} cy={y} r={1.5} />;
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}
