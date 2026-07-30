"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudies, caseworkUrl } from "@/lib/casework";

gsap.registerPlugin(ScrollTrigger);

/*
  Five case studies as a sticky card stack. CSS position:sticky does the stacking;
  GSAP scrubs only compositor-cheap props: a small scale on the card being covered
  plus the opacity of a solid dim overlay (never `filter`, which repaints). Cards
  are fully opaque, so the covering card hides the one beneath with no text bleed.
  One card at a time is the product's whole thesis, so the pin is motivated.
  Reduced motion / no JS: a plain stacked list.
*/
export function CaseworkStack() {
  const ref = useRef<HTMLDivElement>(null);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMotion(true);
  }, []);

  useEffect(() => {
    if (!motion || !ref.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".case-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const inner = card.querySelector<HTMLElement>(".case-card-inner");
        const dim = card.querySelector<HTMLElement>(".case-card-dim");
        if (!inner || !dim) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 92%",
            end: "top 116px",
            scrub: true,
          },
        });
        tl.to(inner, { scale: 0.95, ease: "none" }, 0);
        tl.to(dim, { opacity: 0.55, ease: "none" }, 0);
      });
    }, ref);
    return () => ctx.revert();
  }, [motion]);

  return (
    <div ref={ref} className="relative">
      {caseStudies.map((c, i) => (
        <div
          key={c.slug}
          className={
            motion
              ? `case-card sticky top-24 ${i < caseStudies.length - 1 ? "mb-[52vh]" : ""}`
              : "case-card mb-5"
          }
        >
          <a
            href={`${caseworkUrl}/${c.slug}`}
            className="case-card-inner lift group relative block overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-lg)]"
            style={{ transformOrigin: "center top" }}
          >
            <div className="grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
              <div className="flex flex-col justify-between p-7 sm:p-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="kicker kicker-accent">{c.skill}</span>
                    <span className="text-muted/50">/</span>
                    <span className="font-mono text-xs text-muted">{c.company}</span>
                  </div>
                  <h3 className="font-display display-lg mt-5">{c.title}</h3>
                  <p className="mt-3 max-w-md text-muted sm:text-lg">{c.hook}</p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{c.twist}</p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <span className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-fg transition-opacity group-hover:opacity-90">
                    Play it
                  </span>
                  <span className="font-mono text-xs text-muted">~{c.minutes} min, mock mode</span>
                </div>
              </div>
              <div className="relative hidden min-h-[380px] border-l border-line bg-elevated md:block">
                {c.shot ? (
                  <Image
                    src={c.shot}
                    alt={`${c.title} case study screen`}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover object-left-top"
                  />
                ) : (
                  <div className="bg-dots absolute inset-0" aria-hidden />
                )}
              </div>
            </div>
            {/* solid dim overlay, opacity scrubbed as the next card covers this one */}
            <div className="case-card-dim pointer-events-none absolute inset-0 rounded-2xl bg-bg opacity-0" aria-hidden />
          </a>
        </div>
      ))}
    </div>
  );
}
