"use client";

// Long-form 16:9 film: muted preview while on screen, click plays in place with sound and controls.
import { useEffect, useRef, useState } from "react";
import { reduced } from "./motion";

type Film = { slug: string; title: string; kicker: string; length: string; place: string; blurb: string; embed?: string };

export function LensFilm({ film }: { film: Film }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || live || reduced() || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, [live]);

  const start = () => {
    setLive(true);
    const v = ref.current;
    if (!v) return;
    v.muted = false; v.currentTime = 0; v.controls = true; v.loop = false;
    v.play().catch(() => {});
  };

  return (
    <div className="ln-reel up" style={{ cursor: "default" }}>
      <span className="ln-rin" style={{ aspectRatio: "16 / 9" }}>
        {film.embed && live ? (
          <iframe src={film.embed} title={film.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        ) : (
          <video ref={ref} src={`/lens/film/${film.slug}.mp4`} poster={`/lens/film/${film.slug}.jpg`} muted loop playsInline preload="metadata" />
        )}
        {!live && (
          <>
            <span className="ln-shade" />
            <span className="ln-rtop kicker">{film.kicker}<i>{film.length}</i></span>
            <span className="ln-rbot"><b className="condensed">{film.title}</b><span>{film.blurb}</span></span>
            <button type="button" className="ln-play" style={{ opacity: 0.95, transform: "none", pointerEvents: "auto", border: 0, cursor: "pointer" }} onClick={start} aria-label={`Play ${film.title} with sound`}>
              <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
            </button>
          </>
        )}
      </span>
    </div>
  );
}
