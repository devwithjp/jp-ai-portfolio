import type { Metadata } from "next";
import { water, waterIntro, waterHighlights, waterQuote } from "@/lib/story";
import { Container, Section, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ScrollStory } from "@/components/scroll-story";

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

      {/* The descent: scrollytelling, one beat at a time as you scroll. */}
      <Section className="relative">
        <div className="bg-depth pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <ScrollStory steps={water.map((para) => ({ lines: [para] }))} />
      </Section>

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
