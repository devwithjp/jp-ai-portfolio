import type { Metadata } from "next";
import { labIntro, labBody, packs, labVerify, labRepo } from "@/lib/lab";
import { Container, Section, SectionHeader, CTA, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { WordsReveal } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Lab",
  description: "I implemented the modern NLP and LLM stack from scratch. 45 notebooks, from a regex tokenizer to RLHF.",
};

export default function LabPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-line">
        <div className="ocean -z-10" aria-hidden />
        <div className="caustics -z-10" aria-hidden />
        <Container className="py-24 sm:py-32">
          <Reveal>
            <Eyebrow>Lab · from scratch</Eyebrow>
          </Reveal>
          <h1 className="font-display mt-5 max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
            <WordsReveal text={labIntro} />
          </h1>
          <div className="mt-7 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
            {labBody.map((p, i) => (
              <Reveal key={i} delay={200 + i * 100}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={460}>
            <div className="mt-9 flex flex-wrap gap-3">
              <CTA href={labRepo} external>
                Code on GitHub
              </CTA>
              <CTA href="/projects" variant="secondary">
                See the products
              </CTA>
            </div>
          </Reveal>
        </Container>
      </div>

      {/* Packs */}
      <Section>
        <Reveal>
          <SectionHeader index="01" eyebrow="What's in it" title="Two packs, 45 notebooks." />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {packs.map((pack, i) => (
            <Reveal key={pack.name} delay={i * 120}>
              <div className="glass hairline lift h-full p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl font-medium tracking-tight">{pack.name}</h3>
                  <span className="font-mono text-xs text-accent">{pack.count}</span>
                </div>
                <p className="mt-3 leading-relaxed text-muted">{pack.blurb}</p>
                <ul className="mt-5 space-y-2">
                  {pack.topics.map((t) => (
                    <li key={t} className="flex gap-3 text-sm text-muted">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Verification */}
      <Section className="border-t border-line">
        <Reveal>
          <div className="glass hairline mx-auto max-w-3xl p-8 text-center">
            <Eyebrow>Does it actually run</Eyebrow>
            <p className="mt-4 text-lg leading-relaxed text-muted">{labVerify}</p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
