import type { Metadata } from "next";
import { water, waterIntro, waterHighlights } from "@/lib/story";
import { WaterFx } from "@/components/df/water-fx";

export const metadata: Metadata = {
  title: "Water",
  description: "Diving, freediving, and teaching kids to swim. What the water taught me about learning, patience, and trust.",
};

const TITLE = "Water";

export default function WaterPage() {
  return (
    <WaterFx>
      <header className="w-hero" id="whero">
        <canvas id="heroGL" aria-hidden="true" />
        <div className="wrap w-hero-copy">
          <p className="kicker accent scr">Beyond work</p>
          <svg className="w-defs" aria-hidden="true" width="0" height="0">
            <filter id="liquid" x="-10%" y="-20%" width="120%" height="140%">
              <feTurbulence id="liqTurb" type="fractalNoise" baseFrequency="0.004 0.012" numOctaves={1} seed={3} />
              <feDisplacementMap id="liqDisp" in="SourceGraphic" scale={0} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>
          <h1 className="w-title condensed" id="wTitle" aria-label={TITLE}>
            {Array.from(TITLE).map((ch, i) => <span className="wl" aria-hidden="true" key={i}>{ch}</span>)}
          </h1>
          <p className="lede">{waterIntro}</p>
        </div>
      </header>

      <section className="w-story" id="wstory" aria-label="The water story">
        <div className="w-stage">
          <canvas id="storyCanvas" aria-hidden="true" />
          <div className="wrap w-beats">{water.map((p, i) => <p className={`w-beat${i ? "" : " on"}`} key={i}>{p}</p>)}</div>
          <div className="w-dots wrap" aria-hidden="true">{water.map((_, i) => <i className={i ? "" : "on"} key={i} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="kicker accent scr">Selected highlights</p>
          <ul className="w-hl">{waterHighlights.map((h) => <li className="up" key={h}>{h}</li>)}</ul>
        </div>
      </section>

      <section className="w-scuba" aria-label="Scuba diving on the seabed">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/water/scuba.jpg" alt="JP scuba diving on the seabed" loading="lazy" />
      </section>
    </WaterFx>
  );
}
