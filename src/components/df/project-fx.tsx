"use client";

// Scroll-driven bits of /projects/[slug]: the architecture line fills as you read, steps light up,
// and the hero screenshot settles. Renders nothing.
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reduced } from "./motion";

gsap.registerPlugin(ScrollTrigger);

export function ProjectFx() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".p-project");
    if (!root) return;
    const steps = root.querySelectorAll<HTMLElement>(".arch li");
    if (reduced()) { steps.forEach((li) => li.classList.add("lit")); return; }
    const ctx = gsap.context(() => {
      gsap.fromTo("#archFill", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "#arch", start: "top 70%", end: "bottom 60%", scrub: true } });
      steps.forEach((li) => ScrollTrigger.create({ trigger: li, start: "top 62%", onToggle: (st) => li.classList.toggle("lit", st.isActive || st.progress === 1), end: "+=99999" }));
      gsap.fromTo(".ph-shot img", { scale: 1.1 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".ph-shot", start: "top bottom", end: "bottom 30%", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return null;
}
