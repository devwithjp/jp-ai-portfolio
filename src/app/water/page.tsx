import type { Metadata } from "next";
import { water, waterIntro, waterHighlights, waterQuote } from "@/lib/story";
import { Container, Section, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ScrollScrub } from "@/components/scroll-scrub";

export const metadata: Metadata = {
  title: "Water",
  description: "Diving, freediving, and teaching kids to swim. What the water taught me about learning, patience, and trust.",
};

export default function WaterPage() {
  return (
    <>
      {/* Hero over the freedive portrait */}
      <header className="relative flex min-h-[90vh] items-end overflow-hidden border-b border-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/water/face.jpg"
          alt="JP freediving underwater beside a jellyfish"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03141a] via-[#03141a]/45 to-[#03141a]/25" />
        <Container className="relative pb-20 pt-36">
          <Reveal>
            <Eyebrow>Beyond work</Eyebrow>
            <h1 className="font-display mt-4 text-6xl font-medium leading-[1.0] tracking-tight text-[#eef6f7] sm:text-8xl">
              Water
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-[#cfe3e6] [text-shadow:0_2px_18px_rgba(0,0,0,0.5)]">
              {waterIntro}
            </p>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-[#eef6f7]/60">
              Scroll to descend ↓
            </p>
          </Reveal>
        </Container>
      </header>

      {/* The descent: scroll-scrubbed freedive footage, story beats fading in. */}
      <ScrollScrub
        framesBase="/water/dive/frame_"
        frameCount={72}
        poster="/water/dive-poster.jpg"
        steps={water.map((para) => ({ lines: [para] }))}
      />

      {/* Highlights band */}
      <Section className="border-t border-line">
        <Reveal>
          <Eyebrow>Selected highlights</Eyebrow>
        </Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {waterHighlights.map((h, i) => (
            <Reveal key={h} delay={(i % 3) * 70}>
              <div className="glass hairline flex h-full items-center gap-3 p-5">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                <span className="text-sm leading-relaxed text-muted">{h}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Closing quote over the scuba portrait */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden border-t border-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/water/scuba.jpg"
          alt="JP scuba diving on the seabed"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-[#03141a]/72" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent,rgba(3,20,26,0.6))]" />
        <Container className="relative py-28 text-center">
          <Reveal>
            <blockquote className="font-display mx-auto max-w-2xl text-3xl font-medium italic leading-snug text-[#eef6f7] [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-5xl">
              &ldquo;{waterQuote}&rdquo;
            </blockquote>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
