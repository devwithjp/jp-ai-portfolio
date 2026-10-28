"use client";

// Site chrome and the motion that lives across routes: nav, footer, scroll progress,
// one Lenis instance, the ambient dot field, page transitions and the per-route enhance pass.
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";
import { THEME_EVENT, cssVar, enhance, getLenis, onTheme, reduced, setLenis } from "./motion";

gsap.registerPlugin(ScrollTrigger);

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));
// Water is always the dark, cinematic chapter: no theme toggle, no dot field.
const isWater = (path: string) => path.startsWith("/water");

const SUN = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
  </svg>
);
const MENU = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

function toggleTheme() {
  const root = document.documentElement;
  const light = !root.classList.contains("light");
  root.classList.toggle("light", light);
  try { localStorage.setItem("theme", light ? "light" : "dark"); } catch { /* storage blocked */ }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function SiteNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [openFor, setOpenFor] = useState(path);
  // Close the mobile menu whenever the route changes.
  if (openFor !== path) { setOpenFor(path); setOpen(false); }
  const links = site.nav.map((n) => (
    <Link key={n.href} href={n.href} aria-current={isActive(path, n.href) ? "page" : undefined}>{n.label}</Link>
  ));
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="JP, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="" width={26} height={26} />
          <span>AI PM</span>
        </Link>
        <nav className="navlinks" aria-label="Primary">{links}</nav>
        <div className="navtools">
          {!isWater(path) && (
            <button className="iconbtn" type="button" aria-label="Toggle light and dark theme" onClick={toggleTheme}>{SUN}</button>
          )}
          <button className="iconbtn menubtn" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>{MENU}</button>
        </div>
      </div>
      <div className={`mobmenu${open ? " open" : ""}`}><nav className="wrap" aria-label="Mobile">{links}</nav></div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <span>© {new Date().getFullYear()} JP · AI Product Manager</span>
        <nav aria-label="Elsewhere">
          <a href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <Link href="/contact">Email</Link>
        </nav>
      </div>
    </footer>
  );
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();
  useEffect(() => {
    if (reduced() || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
    });
    return () => ctx.revert();
  }, [path]);
  return <div ref={ref} className="progress" aria-hidden />;
}

export function SmoothScroll() {
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ lerp: 0.1 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    // In-page anchors glide instead of jumping.
    const onClick = (e: MouseEvent) => {
      const l = (e.target as Element).closest?.('a[href^="#"]');
      const h = l?.getAttribute("href");
      if (!h || h.length < 2) return;
      const el = document.querySelector<HTMLElement>(h);
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -80, duration: 1.4 }); }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(tick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);
  return null;
}

// A quiet grid of points that breathes in slow waves and brightens around the cursor.
export function Ambient() {
  const ref = useRef<HTMLCanvasElement>(null);
  const path = usePathname();
  const off = isWater(path);
  useEffect(() => {
    const c = ref.current;
    if (!c || off) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let W = 0, H = 0, col = cssVar("--accent"), col2 = cssVar("--accent-2");
    const mouse = { x: -999, y: -999, tx: -999, ty: -999 };
    const G = 34;
    const draw = (t: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.08; mouse.y += (mouse.ty - mouse.y) * 0.08;
      ctx.clearRect(0, 0, W, H);
      const shift = (scrollY * 0.15) % G;
      for (let y = -G; y < H + G; y += G) {
        for (let x = G / 2; x < W; x += G) {
          const yy = y - shift;
          const wave = Math.sin(x * 0.006 + t * 0.35) * Math.cos(yy * 0.008 - t * 0.25);
          const near = Math.max(0, 1 - Math.hypot(x - mouse.x, yy - mouse.y) / 220);
          ctx.globalAlpha = 0.05 + Math.max(0, wave) * 0.07 + near * 0.45;
          ctx.fillStyle = near > 0.15 ? col2 : col;
          const r = 1 + near * 1.6;
          ctx.fillRect(x - r / 2, yy - r / 2, r, r);
        }
      }
      ctx.globalAlpha = 1;
    };
    const size = () => { W = c.width = innerWidth; H = c.height = innerHeight; if (reduced()) draw(2); };
    size();
    const move = (e: PointerEvent) => { mouse.tx = e.clientX; mouse.ty = e.clientY; };
    addEventListener("resize", size);
    addEventListener("pointermove", move, { passive: true });
    const offTheme = onTheme(() => { col = cssVar("--accent"); col2 = cssVar("--accent-2"); if (reduced()) draw(2); });
    if (!reduced()) gsap.ticker.add(draw);
    return () => {
      gsap.ticker.remove(draw);
      removeEventListener("resize", size);
      removeEventListener("pointermove", move);
      offTheme();
    };
  }, [off]);
  if (off) return null;
  return <canvas ref={ref} className="ambient" aria-hidden />;
}

/* ---------------- Page transitions ---------------- */
// Leaving: an aqua edge then a navy wave rise with a bulging curve and the next page's name.
// Arriving: the wave lifts off the top with the opposite curve.
const NAMES: [RegExp, string][] = [
  [/^\/$/, "Home"], [/^\/projects\/lab/, "Lab"], [/^\/projects\/.+/, "Project"], [/^\/projects/, "Projects"],
  [/^\/skills/, "Skills"], [/^\/water/, "Water"], [/^\/lens/, "Lens"], [/^\/writing/, "Writing"],
  [/^\/about/, "About"], [/^\/resume/, "Resume"], [/^\/contact/, "Contact"],
];
const nameFor = (p: string) => NAMES.find(([r]) => r.test(p))?.[1] ?? "";
const rise = (el: SVGPathElement, e: number, c: number) => el.setAttribute("d", `M0 ${e} Q50 ${e - c} 100 ${e} L100 100 L0 100 Z`);
const lift = (el: SVGPathElement, e: number, c: number) => el.setAttribute("d", `M0 0 L100 0 L100 ${e} Q50 ${e + c} 0 ${e} Z`);
const bulge = (k: number) => Math.sin(k * Math.PI) * 18;

export function PageTransition() {
  const router = useRouter();
  const path = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const pa = useRef<SVGPathElement>(null);
  const pb = useRef<SVGPathElement>(null);
  const label = useRef<HTMLParagraphElement>(null);
  const covered = useRef(false);

  // Leaving: intercept internal link clicks before Next's Link handles them.
  useEffect(() => {
    if (reduced()) return;
    const onPointer = (e: PointerEvent) => {
      const href = (e.target as Element).closest?.("a[href]")?.getAttribute("href");
      if (href && href.startsWith("/") && !href.includes(".")) router.prefetch(href.split("#")[0]);
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || covered.current || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("/") || href.startsWith("//") || /\.[a-z0-9]+($|#)/i.test(href.split("?")[0])) return;
      const dest = href.split("#")[0];
      if (dest === location.pathname) return;
      e.preventDefault(); e.stopPropagation();
      covered.current = true;
      const el = root.current!, A = pa.current!, B = pb.current!, L = label.current!;
      L.textContent = nameFor(dest);
      el.style.visibility = "visible";
      rise(A, 100, 0); rise(B, 100, 0);
      gsap.set(L, { yPercent: 60, opacity: 0 });
      const o = { k: 0 };
      gsap.to(o, { k: 1, duration: 0.85, ease: "expo.inOut", onUpdate: () => {
        const ka = Math.min(1, o.k * 1.15), kb = Math.max(0, o.k * 1.15 - 0.15);
        rise(A, 100 - ka * 100, bulge(ka)); rise(B, 100 - kb * 100, bulge(kb));
      }, onComplete: () => router.push(href, { scroll: false }) });
      gsap.to(L, { yPercent: 0, opacity: 1, duration: 0.55, ease: "power3.out", delay: 0.4 });
    };
    document.addEventListener("pointerover", onPointer);
    document.addEventListener("click", onClick, true);
    return () => { document.removeEventListener("pointerover", onPointer); document.removeEventListener("click", onClick, true); };
  }, [router]);

  // Arriving: once the new route has rendered, jump to the top and lift the cover.
  useEffect(() => {
    if (!covered.current) return;
    const el = root.current!, A = pa.current!, B = pb.current!, L = label.current!;
    const hash = location.hash;
    const target = hash ? document.querySelector<HTMLElement>(hash) : null;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target ?? 0, { immediate: true, offset: target ? -80 : 0, force: true });
    else if (target) target.scrollIntoView(); else scrollTo(0, 0);
    lift(A, 100, 0); lift(B, 100, 0);
    const o = { k: 0 };
    const done = () => { el.style.visibility = "hidden"; covered.current = false; };
    gsap.to(L, { yPercent: -60, opacity: 0, duration: 0.7, ease: "power3.in", delay: 0.1 });
    gsap.to(o, { k: 1, duration: 1.1, ease: "expo.inOut", delay: 0.2, onUpdate: () => {
      const ka = Math.min(1, o.k * 1.12);
      lift(B, 100 - o.k * 100, bulge(o.k)); lift(A, 100 - ka * 100, bulge(ka));
    }, onComplete: done });
    // Never leave the page covered if animation frames stall.
    const t = setTimeout(done, 2600);
    return () => clearTimeout(t);
  }, [path]);

  return (
    <div ref={root} className="pt" aria-hidden style={{ visibility: "hidden" }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none"><path ref={pa} className="pt-a" /><path ref={pb} className="pt-b" /></svg>
      <p ref={label} className="pt-name condensed" />
    </div>
  );
}

// Runs the shared hook-class motion over <main> after each route renders.
export function Enhance() {
  const path = usePathname();
  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;
    let cleanup = () => {};
    const ctx = gsap.context(() => { cleanup = enhance(main); }, main);
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    document.fonts?.ready.then(refresh);
    return () => { cleanup(); ctx.revert(); };
  }, [path]);
  return null;
}
