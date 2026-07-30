"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudies, caseworkUrl } from "@/lib/casework";

gsap.registerPlugin(ScrollTrigger);

/*
  The five Casework case studies as a sticky card stack: CSS position:sticky does
  the stacking (later cards paint over earlier ones in DOM order), GSAP scrubs a
  scale + brightness recede on the card being covered. No opacity animation, so
  covered text never bleeds through. One card at a time is the whole thesis of
  the product, so the pin is motivated, not decorative.
  Reduced motion: a plain stacked list.
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
        if (!inner) return;
        gsap.to(inner, {
          scale: 0.95,
          filter: "brightness(0.55)",
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 90%",
            end: "top 112px",
            scrub: true,
          },
        });
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
            className="case-card-inner group block overflow-hidden rounded-3xl border border-line bg-surface shadow-[var(--shadow-lg)] transition-colors hover:border-accent/40"
          >
            <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
              <div className="flex flex-col justify-between bg-surface p-7 sm:p-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="uppercase tracking-[0.18em] text-accent">{c.skill}</span>
                    <span className="text-muted">·</span>
                    <span className="text-muted">{c.company}</span>
                  </div>
                  <h3 className="font-display mt-4 text-3xl font-medium tracking-tight sm:text-5xl">
                    {c.title}
                  </h3>
                  <p className="mt-3 max-w-md text-muted sm:text-lg">{c.hook}</p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{c.twist}</p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <span className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-fg transition-opacity group-hover:opacity-90">
                    Play it
                  </span>
                  <span className="font-mono text-xs text-muted">~{c.minutes} min · mock mode</span>
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
                  <div className="ocean opacity-60" aria-hidden />
                )}
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
