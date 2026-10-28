"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fit, reduced, split, touchOnly } from "./motion";

gsap.registerPlugin(ScrollTrigger);

/* Hero: the name fills the width and rises letter by letter over the 3D scene. */
export function HomeHero({ facts }: { facts: [string, ReactNode][] }) {
  const hero = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const name = useRef<HTMLHeadingElement>(null);

  // three.js loads only in the browser, in its own chunk.
  useEffect(() => {
    let stop = () => {};
    let dead = false;
    import("./hero-scene").then(({ heroScene }) => {
      if (!dead && canvas.current && hero.current) stop = heroScene(canvas.current, hero.current);
    });
    return () => { dead = true; stop(); };
  }, []);

  useEffect(() => {
    const el = name.current, h = hero.current;
    if (!el || !h) return;
    const chars = split(el, "chars");
    const unfit = fit(el);
    const off: (() => void)[] = [];
    const ctx = gsap.context(() => {
      if (reduced()) return;
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from(chars, { yPercent: 115, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.04 })
        .from(["#hlede", "#hctas"], { y: 28, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.12 }, "-=0.8")
        .from(".facts .wrap > div", { y: 20, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.08 }, "-=0.7");
      // Letters lean away from the cursor, then settle.
      if (!touchOnly()) {
        const qs = chars.map((c) => ({ c, y: gsap.quickTo(c, "y", { duration: 0.6, ease: "power3" }), r: gsap.quickTo(c, "rotation", { duration: 0.6, ease: "power3" }) }));
        const move = (e: PointerEvent) => qs.forEach(({ c, y, r }) => {
          const b = c.getBoundingClientRect(), dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height / 2);
          const k = Math.max(0, 1 - Math.hypot(dx, dy * 0.7) / 300);
          y(-k * k * 22); r(-dx * k * k * 0.04);
        });
        const leave = () => qs.forEach(({ y, r }) => { y(0); r(0); });
        h.addEventListener("pointermove", move);
        h.addEventListener("pointerleave", leave);
        off.push(() => { h.removeEventListener("pointermove", move); h.removeEventListener("pointerleave", leave); });
      }
      // The name drifts up and thins as you leave the hero.
      gsap.to(".hh-inner", { yPercent: -12, opacity: 0.2, ease: "none", scrollTrigger: { trigger: h, start: "top top", end: "bottom top", scrub: true } });
    }, h);
    return () => { off.forEach((f) => f()); unfit(); ctx.revert(); };
  }, []);

  return (
    <header className="hhero" id="hhero" ref={hero}>
      <canvas className="fx" id="field" aria-hidden="true" ref={canvas} />
      <div className="wrap hh-inner">
        <p className="kicker accent scr" id="hkick">AI Product Manager / Sydney, Australia</p>
        <div className="hname-wrap"><h1 className="hname condensed" id="hname" ref={name}>Jyothiprakash</h1></div>
        <div className="hh-row">
          <p className="lede hh-lede" id="hlede">I decide which AI products are worth building, then I build them. A couple of years as an engineer shipping to 50M+ people, then product at Rekro, now AI PM at Enluma Health.</p>
          <div className="btns" id="hctas">
            <Link className="btn btn-primary" href="/projects">See the work <span className="arr">→</span></Link>
            <Link className="btn btn-ghost" href="/water">Why water</Link>
          </div>
        </div>
      </div>
      <div className="facts"><div className="wrap">{facts.map(([k, v]) => <div key={k}><p className="kicker">{k}</p><p>{v}</p></div>)}</div></div>
    </header>
  );
}

/* Featured: a sticky stack. Each card pins, then sinks back as the next one lands on it. */
export function FeaturedStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".fcard", el);
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        gsap.fromTo(card.querySelector(".fc-shot img"), { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top 20%", scrub: true } });
        if (!next) return;
        gsap.to(card, { scale: 0.92, opacity: 0.35, filter: "blur(2px)", ease: "none", scrollTrigger: { trigger: next, start: "top bottom", end: "top 120px", scrub: true } });
      });
    });
    return () => mm.revert();
  }, []);
  return <div className="fstack" id="fstack" ref={ref}>{children}</div>;
}
