import type { Metadata } from "next";
import { water, waterIntro, waterHighlights, waterQuote } from "@/lib/story";
import { Container, Section, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Water",
  description: "Diving, freediving, and teaching kids to swim. What the water taught me about learning, patience, and trust.",
};

export default function WaterPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-line">
        <div className="bg-depth absolute inset-0 -z-10" aria-hidden />
        <div className="bg-ripple absolute inset-0 -z-10" aria-hidden />
        <Container className="py-24 sm:py-32">
          <Reveal>
            <Eyebrow>Beyond work</Eyebrow>
            <h1 className="font-display mt-4 text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
              Water
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted">{waterIntro}</p>
          </Reveal>
        </Container>
      </div>

      {/* Story (descent) + sticky highlights */}
      <Section className="relative">
        <div className="bg-depth pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,300px)]">
          {/* Narrative reveals as you scroll down (the descent) */}
          <div className="max-w-2xl space-y-7">
            {water.map((para, i) => (
              <Reveal key={i} delay={i * 60}>
                <p className="text-lg leading-relaxed text-muted first:text-fg">{para}</p>
              </Reveal>
            ))}
          </div>

          {/* Sticky credentials rail */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <Reveal>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <Eyebrow>Selected highlights</Eyebrow>
                <ul className="mt-4 space-y-3">
                  {waterHighlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      {/* Closing quote */}
      <Section className="border-t border-line">
        <Reveal>
          <Container className="text-center">
            <blockquote className="font-display mx-auto max-w-2xl text-3xl font-medium italic leading-snug sm:text-4xl">
              “{waterQuote}”
            </blockquote>
          </Container>
        </Reveal>
      </Section>
    </>
  );
}
