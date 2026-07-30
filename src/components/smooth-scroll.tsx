"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Buttery smooth scroll (the premium-product-site feel), kept in lockstep with
// GSAP's ScrollTrigger so pinned/scrubbed sections read the same scroll position.
// Disables itself when the user prefers reduced motion.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.destroy();
    };
  }, []);
  return null;
}
