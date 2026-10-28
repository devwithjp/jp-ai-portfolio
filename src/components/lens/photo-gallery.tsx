"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { LensCategory, LensPhoto } from "@/lib/lens";

function Lightbox({ list, index, onClose, onStep }: { list: LensPhoto[]; index: number | null; onClose: () => void; onStep: (d: number) => void }) {
  useEffect(() => {
    if (index === null) return;
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
  }, [index, onClose, onStep]);

  const [touchX, setTouchX] = useState<number | null>(null);
  if (index === null) return null;
  const p = list[index];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
      className="fixed inset-0 z-[100] flex flex-col bg-[#020c10]/96"
      onClick={onClose}
      onTouchStart={(e) => setTouchX(e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touchX === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchX) - touchX;
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
        setTouchX(null);
      }}
    >
      <div className="relative m-4 mt-16 flex-1" onClick={(e) => e.stopPropagation()}>
        <Image src={`/lens/photos/${p.slug}.jpg`} alt={`${p.title}, ${p.place}`} fill sizes="100vw" className="object-contain" priority />
      </div>
      <div className="flex items-end justify-end gap-4 px-5 pb-6" onClick={(e) => e.stopPropagation()} style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}>
        <div className="flex gap-2">
          <button type="button" onClick={() => onStep(-1)} className="rounded-full border border-white/15 px-4 py-2 font-mono text-xs text-white/80 hover:border-accent hover:text-accent" aria-label="Previous photo">
            ←
          </button>
          <button type="button" onClick={() => onStep(1)} className="rounded-full border border-white/15 px-4 py-2 font-mono text-xs text-white/80 hover:border-accent hover:text-accent" aria-label="Next photo">
            →
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 rounded-full border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-white/80 hover:border-accent hover:text-accent"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 1rem)" }}
      >
        Close
      </button>
    </div>
  );
}

function useLightbox(len: number) {
  const [i, setI] = useState<number | null>(null);
  const step = useCallback((d: number) => setI((o) => (o === null ? o : (o + d + len) % len)), [len]);
  const close = useCallback(() => setI(null), []);
  return { i, setI, step, close };
}

// Selected work: masonry columns, frames at their own aspect.
export function SelectedGrid({ photos }: { photos: LensPhoto[] }) {
  const lb = useLightbox(photos.length);
  return (
    <>
      {/* masonry columns: every frame keeps its own aspect ratio, no holes */}
      <div className="columns-2 gap-2 sm:gap-3 lg:columns-3">
        {photos.map((p, i) => (
          <figure key={p.slug} className="group relative mb-2 break-inside-avoid overflow-hidden rounded-xl bg-surface sm:mb-3" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
            <button type="button" onClick={() => lb.setI(i)} className="absolute inset-0" aria-label={`Open ${p.title}`}>
              <Image
                src={`/lens/photos/${p.slug}.jpg`}
                alt={`${p.title}, ${p.place}`}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                loading={i < 3 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </button>
          </figure>
        ))}
      </div>
      <Lightbox list={photos} index={lb.i} onClose={lb.close} onStep={lb.step} />
    </>
  );
}

// Archive: category tabs over a horizontal drag strip.
export function ArchiveStrip({ photos, categories }: { photos: LensPhoto[]; categories: { key: LensCategory; label: string }[] }) {
  const present = categories.filter((c) => photos.some((p) => p.cat === c.key));
  const [cat, setCat] = useState<LensCategory | "all">("all");
  const list = useMemo(() => (cat === "all" ? photos : photos.filter((p) => p.cat === cat)), [cat, photos]);
  const lb = useLightbox(list.length);
  return (
    <>
      <div role="tablist" aria-label="Filter photos" className="flex flex-wrap gap-2">
        {[{ key: "all" as const, label: "All" }, ...present].map((c) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={cat === c.key}
            type="button"
            onClick={() => setCat(c.key)}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
              cat === c.key ? "border-accent bg-accent text-accent-fg" : "border-line text-muted hover:border-accent/50 hover:text-fg"
            }`}
          >
            {c.label}
            <span className="ml-1.5 opacity-60">{c.key === "all" ? photos.length : photos.filter((p) => p.cat === c.key).length}</span>
          </button>
        ))}
      </div>
      <div className="-mx-5 mt-6 flex snap-x gap-3 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 [scrollbar-width:thin]">
        {list.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => lb.setI(i)}
            className="group relative h-[52vw] max-h-[22rem] flex-none snap-start overflow-hidden rounded-xl bg-surface sm:h-[22rem]"
            style={{ aspectRatio: `${p.w} / ${p.h}` }}
            aria-label={`Open ${p.title}`}
          >
            <Image src={`/lens/photos/${p.slug}.jpg`} alt={`${p.title}, ${p.place}`} fill sizes="(max-width: 640px) 80vw, 40vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          </button>
        ))}
      </div>
      <Lightbox list={list} index={lb.i} onClose={lb.close} onStep={lb.step} />
    </>
  );
}
