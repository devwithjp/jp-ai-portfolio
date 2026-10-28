"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

// Water is always dark, whatever the site theme: drop `light` while here, restore it on the way out.
export function WaterFx({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const html = document.documentElement;
    const wasLight = html.classList.contains("light");
    html.classList.remove("light");
    let stop = () => {};
    let dead = false;
    import("./water-scene").then(({ waterScene }) => {
      if (!dead && ref.current) stop = waterScene(ref.current);
    });
    return () => {
      dead = true; stop();
      let saved = null;
      try { saved = localStorage.getItem("theme"); } catch { /* storage blocked */ }
      if (wasLight || saved === "light") html.classList.add("light");
    };
  }, []);
  return <div className="p-water" ref={ref}>{children}</div>;
}
