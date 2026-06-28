import type { Metadata } from "next";
import { labIntro, labBody, packs, labVerify, labRepo, interp } from "@/lib/lab";
import { Container, Section, SectionHeader, CTA, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { WordsReveal } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Lab — interpretability research + NLP/LLM from scratch",
  description:
    "Interpretability research (activation probing with TransformerLens) plus 45 from-scratch NLP and LLM notebooks, a regex tokenizer to RLHF.",
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

      {/* Featured interpretability research */}
      <Section className="relative">
        <div className="bg-depth pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Reveal>
          <SectionHeader index="01" eyebrow={interp.eyebrow} title={interp.title} />
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">{interp.framing}</p>
        </Reveal>
        <div className="mt-7 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
          {interp.body.map((p, i) => (
            <Reveal key={i} delay={120 + i * 90}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass hairline h-full p-7">
              <Eyebrow>How we tested it</Eyebrow>
              <ul className="mt-4 space-y-2.5">
                {interp.method.map((m) => (
                  <li key={m} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="glass hairline h-full p-7">
              <Eyebrow>What we found</Eyebrow>
              <ul className="mt-4 space-y-2.5">
                {interp.findings.map((m) => (
                  <li key={m} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-6 flex flex-wrap gap-2">
            {interp.skills.map((s) => (
              <span key={s} className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
                {s}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-7 max-w-2xl border-l-2 border-accent/50 pl-5 text-base leading-relaxed text-fg">
            {interp.takeaway}
          </p>
        </Reveal>
      </Section>

      {/* Packs */}
      <Section className="border-t border-line">
        <Reveal>
          <SectionHeader index="02" eyebrow="What's in it" title="Two packs, 45 notebooks." />
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
