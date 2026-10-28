"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { LensReel } from "@/lib/lens";

// Vertical reel card: muted autoplay loop while on screen, poster otherwise.
// Click opens a full-screen player with sound. Reduced motion: poster only until clicked.
export function ReelCard({
  reel,
  index,
  onOpen,
  size = "md",
}: {
  reel: LensReel;
  index: number;
  onOpen: (i: number) => void;
  size?: "md" | "lg";
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={`group relative block w-full overflow-hidden rounded-[22px] border border-line bg-surface text-left shadow-[var(--shadow-lg)] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${
        size === "lg" ? "" : ""
      }`}
      aria-label={`Play ${reel.title} reel with sound`}
    >
      <div className="relative aspect-[9/16] w-full">
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          src={`/lens/reels/${reel.slug}.mp4`}
          poster={`/lens/reels/${reel.slug}.jpg`}
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03141a]/85 via-transparent to-[#03141a]/20" />
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-[#eef6f7]/80">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{reel.length}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{reel.kicker}</span>
          <h3 className="font-display mt-1 text-3xl font-medium leading-none tracking-tight text-[#eef6f7] sm:text-4xl">
            {reel.title}
          </h3>
          <span className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#eef6f7]/75 transition-colors group-hover:text-accent">
            <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
              <path d="M0 0l10 6-10 6z" fill="currentColor" />
            </svg>
            Watch with sound
          </span>
        </div>
      </div>
    </button>
  );
}

export function ReelLightbox({
  reels,
  open,
  onClose,
  onStep,
}: {
  reels: LensReel[];
  open: number | null;
  onClose: () => void;
  onStep: (d: number) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose, onStep]);

  if (open === null) return null;
  const r = reels[open];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${r.title} reel`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020c10]/95 p-4"
      onClick={onClose}
    >
      <div className="relative flex h-full max-h-[92vh] items-center gap-6" onClick={(e) => e.stopPropagation()}>
        {r.embed ? (
          <iframe
            src={r.embed}
            title={r.title}
            className="aspect-[9/16] h-full max-h-[92vh] rounded-2xl"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            key={r.slug}
            ref={ref}
            className="aspect-[9/16] h-full max-h-[92vh] rounded-2xl bg-black object-contain"
            src={`/lens/reels/${r.slug}.mp4`}
            poster={`/lens/reels/${r.slug}.jpg`}
            controls
            autoPlay
            playsInline
          />
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-white/80 hover:border-accent hover:text-accent"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 1rem)" }}
      >
        Close
      </button>
    </div>
  );
}

// 16:9 film: muted preview while on screen; click plays with sound and controls.
export function FilmFeature({ film }: { film: { slug: string; title: string; kicker: string; length: string; place: string; blurb: string; embed?: string } }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v || live) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, [live]);
  const start = () => {
    const v = ref.current;
    if (!v) return;
    setLive(true);
    v.muted = false;
    v.currentTime = 0;
    v.controls = true;
    v.play().catch(() => {});
  };
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-line bg-surface shadow-[var(--shadow-lg)]">
      <div className="relative aspect-video w-full">
        {film.embed && live ? (
          <iframe src={film.embed} title={film.title} className="absolute inset-0 h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        ) : (
          <video
            ref={ref}
            className="absolute inset-0 h-full w-full object-cover"
            src={`/lens/film/${film.slug}.mp4`}
            poster={`/lens/film/${film.slug}.jpg`}
            muted
            loop={!live}
            playsInline
            preload="metadata"
          />
        )}
        {!live ? (
          <button type="button" onClick={start} className="group absolute inset-0 flex items-end bg-gradient-to-t from-[#03141a]/85 via-[#03141a]/10 to-transparent p-6 text-left sm:p-10" aria-label={`Play ${film.title} with sound`}>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {film.kicker} · {film.place} · {film.length}
              </span>
              <h3 className="font-display mt-2 text-5xl font-medium leading-none tracking-tight text-[#eef6f7] sm:text-7xl">{film.title}</h3>
              <p className="mt-3 max-w-md text-[#d3e6e9]">{film.blurb}</p>
              <span className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-fg transition-transform group-hover:-translate-y-0.5">
                <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
                  <path d="M0 0l10 6-10 6z" fill="currentColor" />
                </svg>
                Watch the film
              </span>
            </div>
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function ReelRail({ reels }: { reels: LensReel[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + reels.length) % reels.length)), [reels.length]);
  const close = useCallback(() => setOpen(null), []);
  return (
    <>
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-10">
        {reels.map((r, i) => (
          <div key={r.slug} className={`w-[68vw] flex-none snap-center sm:w-auto ${i % 2 === 1 ? "sm:translate-y-10" : ""}`}>
            <ReelCard reel={r} index={i} onOpen={setOpen} />
          </div>
        ))}
      </div>
      <ReelLightbox reels={reels} open={open} onClose={close} onStep={step} />
    </>
  );
}
