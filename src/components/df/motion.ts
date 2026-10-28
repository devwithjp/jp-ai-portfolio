"use client";

// Shared motion for every page. Pages render plain markup with hook classes
// (.kin, .rv, .scr, .up, .draw, .spot, .tilt, .btn, [data-count]); `enhance()` wires them up.
// Every function returns a cleanup; GSAP work is reverted by the caller's gsap.context.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type Cleanup = () => void;
export const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const touchOnly = () => typeof window !== "undefined" && matchMedia("(hover: none)").matches;
export const cssVar = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

/* ---------------- Lenis handle (one instance, owned by SmoothScroll) ---------------- */
type LenisLike = { scrollTo: (t: number | string | HTMLElement, o?: object) => void; stop: () => void; start: () => void };
let lenisRef: LenisLike | null = null;
export const setLenis = (l: LenisLike | null) => { lenisRef = l; };
export const getLenis = () => lenisRef;

/* ---------------- Theme events ---------------- */
export const THEME_EVENT = "df-theme";
export const onTheme = (fn: () => void): Cleanup => {
  window.addEventListener(THEME_EVENT, fn);
  return () => window.removeEventListener(THEME_EVENT, fn);
};

/* ---------------- Text ---------------- */
// Splits an element's text into word (and optionally char) spans. Idempotent, so a
// re-run (strict mode, route revisit) returns the existing spans.
export function split(el: HTMLElement, mode: "words" | "chars" = "words"): HTMLElement[] {
  if (el.dataset.split) return Array.from(el.querySelectorAll<HTMLElement>(mode === "chars" ? ".c" : ".w"));
  el.dataset.split = mode;
  const out: HTMLElement[] = [];
  if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", (el.textContent || "").replace(/\s+/g, " ").trim());
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        (n.textContent || "").split(/(\s+)/).forEach((tok) => {
          if (!tok) return;
          if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(" ")); return; }
          const w = document.createElement("span");
          w.className = "w"; w.setAttribute("aria-hidden", "true");
          if (mode === "chars") Array.from(tok).forEach((ch) => { const c = document.createElement("span"); c.className = "c"; c.textContent = ch; w.appendChild(c); out.push(c); });
          else { w.textContent = tok; out.push(w); }
          frag.appendChild(w);
        });
        (n as ChildNode).replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
  };
  walk(el);
  return out;
}

// Scales an element's font so its text fills the parent's width.
export function fit(el: HTMLElement): Cleanup {
  const go = () => {
    if (!el.parentElement) return;
    el.style.fontSize = "100px";
    const r = document.createRange(); r.selectNodeContents(el);
    el.style.fontSize = Math.floor(((100 * el.parentElement.clientWidth) / r.getBoundingClientRect().width) * 0.985) + "px";
  };
  go();
  const ro = new ResizeObserver(go);
  if (el.parentElement) ro.observe(el.parentElement);
  document.fonts?.ready.then(go);
  return () => ro.disconnect();
}

// Headings marked .kin: words rise out of a mask on load (first screen) or on scroll.
function kinetic(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>(".kin").forEach((el) => {
    el.classList.add("mask");
    const words = split(el, "words");
    if (reduced()) return;
    const top = el.getBoundingClientRect().top < innerHeight;
    gsap.from(words, {
      yPercent: 110, rotate: 4, duration: 1.1, ease: "expo.out", stagger: 0.05, delay: top ? 0.55 : 0,
      scrollTrigger: top ? undefined : { trigger: el, start: "top 88%" },
      onComplete: () => el.classList.add("settled"),
    });
  });
}

// Paragraphs marked .rv light up word by word as they cross the reading line.
function readReveal(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>(".rv").forEach((el) => {
    const words = split(el, "words");
    if (reduced()) return;
    gsap.fromTo(words, { opacity: 0.25 }, { opacity: 1, ease: "none", stagger: 0.06, scrollTrigger: { trigger: el, start: "top 86%", end: "bottom 60%", scrub: true } });
  });
}

// Mono labels marked .scr decode from random glyphs.
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>+=";
function scramble(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>(".scr").forEach((el) => {
    const final = el.dataset.final ?? el.textContent ?? "";
    el.dataset.final = final;
    if (reduced()) return;
    const run = () => {
      const o = { p: 0 };
      gsap.to(o, { p: 1, duration: 0.9 + final.length * 0.012, ease: "power2.out", onUpdate: () => {
        const n = Math.floor(o.p * final.length);
        el.textContent = final.slice(0, n) + Array.from(final.slice(n)).map((ch) => (ch === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join("");
      }, onComplete: () => { el.textContent = final; } });
    };
    ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: run });
  });
}

/* ---------------- Interaction ---------------- */
function listen(el: EventTarget, type: string, fn: EventListener, bag: Cleanup[]) {
  el.addEventListener(type, fn);
  bag.push(() => el.removeEventListener(type, fn));
}

function magnetic(root: HTMLElement, bag: Cleanup[]) {
  if (reduced() || touchOnly()) return;
  root.querySelectorAll<HTMLElement>(".btn, .mag").forEach((el) => {
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" }), y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    listen(el, "pointermove", ((e: PointerEvent) => { const r = el.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * 0.25); y((e.clientY - r.top - r.height / 2) * 0.35); }) as EventListener, bag);
    listen(el, "pointerleave", () => { gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.45)" }); }, bag);
  });
}

function cards(root: HTMLElement, bag: Cleanup[]) {
  root.querySelectorAll<HTMLElement>(".spot").forEach((el) => {
    listen(el, "pointermove", ((e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", e.clientX - r.left + "px"); el.style.setProperty("--my", e.clientY - r.top + "px");
    }) as EventListener, bag);
  });
  if (reduced() || touchOnly()) return;
  root.querySelectorAll<HTMLElement>(".tilt").forEach((el) => {
    gsap.set(el, { transformPerspective: 1000 });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.7, ease: "power3" }), ry = gsap.quickTo(el, "rotationY", { duration: 0.7, ease: "power3" });
    listen(el, "pointermove", ((e: PointerEvent) => { const r = el.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 6); rx(-((e.clientY - r.top) / r.height - 0.5) * 6); }) as EventListener, bag);
    listen(el, "pointerleave", () => { rx(0); ry(0); }, bag);
  });
}

function counters(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    if (reduced()) return;
    const end = parseFloat(el.dataset.count || "0"), suf = el.dataset.suffix || "", o = { v: 0 };
    el.textContent = "0" + suf;
    ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () =>
      gsap.to(o, { v: end, duration: 1.6, ease: "expo.out", onUpdate: () => { el.textContent = Math.round(o.v) + suf; } }) });
  });
}

function rise(root: HTMLElement) {
  if (reduced()) return;
  const els = root.querySelectorAll<HTMLElement>(".up");
  if (!els.length) return;
  gsap.set(els, { y: 50, opacity: 0.001 });
  ScrollTrigger.batch(els, { start: "top 92%", onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }) });
}

function draws(root: HTMLElement) {
  if (reduced()) return;
  root.querySelectorAll<HTMLElement>(".draw").forEach((el) => gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 92%" } }));
}

// Animated pill indicator for a .tabs group. Call the returned `move` after changing aria-selected.
export function tabIndicator(tabs: HTMLElement): { move: () => void; cleanup: Cleanup } {
  let ind = tabs.querySelector<HTMLElement>(".ind");
  if (!ind) { ind = document.createElement("span"); ind.className = "ind"; tabs.prepend(ind); }
  const el = ind;
  const move = () => {
    const b = tabs.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!b) return;
    el.style.width = b.offsetWidth + "px";
    el.style.transform = `translateX(${b.offsetLeft}px)`;
  };
  move();
  const ro = new ResizeObserver(move); ro.observe(tabs);
  document.fonts?.ready.then(move);
  return { move, cleanup: () => ro.disconnect() };
}

export async function copyText(btn: HTMLElement, text: string, label: string) {
  try { await navigator.clipboard.writeText(text); btn.textContent = "Copied"; }
  catch { btn.textContent = "Select and copy"; }
  setTimeout(() => { btn.textContent = label; }, 2000);
}

// Wires every hook class under `root`. Run inside a gsap.context; call the cleanup for listeners.
export function enhance(root: HTMLElement): Cleanup {
  const bag: Cleanup[] = [];
  kinetic(root); readReveal(root); scramble(root); magnetic(root, bag); cards(root, bag); counters(root); rise(root); draws(root);
  ScrollTrigger.sort();
  return () => bag.forEach((f) => f());
}
