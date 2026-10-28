import type { Metadata } from "next";
import Link from "next/link";
import { skillTracks } from "@/lib/skills";
import { skillStats } from "@/lib/skill-graph";
import { Container, Section, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { WordsReveal } from "@/components/chrome";
import { SkillExplorer } from "@/components/skill-explorer";

export const metadata: Metadata = {
  title: "Skills",
  description: "Every skill, by technology, job and project, and where I used it.",
};

const stats = [
  { n: skillStats.skills, label: "skills" },
  { n: skillStats.work, label: "roles" },
  { n: skillStats.projects, label: "projects & research" },
  { n: skillStats.learning, label: "degrees & courses" },
];

export default function SkillsPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-line">
        <div className="ocean -z-10 opacity-80" aria-hidden />
        <Section className="!pb-14 !pt-20">
          <Reveal>
            <Eyebrow>Skills</Eyebrow>
          </Reveal>
          <h1 className="font-display mt-4 max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
            <WordsReveal text="Everything I've built with, and where." />
          </h1>
          <Reveal delay={300}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              A skill on a CV is a claim. Here each one points at the job, project, case study, or course where I
              actually used it. Pick one to see the evidence.
            </p>
          </Reveal>
          <Reveal delay={380}>
            <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-bg px-5 py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{s.label}</dt>
                  <dd className="font-display mt-1 text-3xl font-semibold tracking-tight text-fg">{s.n}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Section>
      </div>

      {/* Explorer */}
      <Container className="pb-16 sm:pb-24">
        <SkillExplorer />
      </Container>

      {/* Role lenses */}
      <Section className="border-t border-line">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="tick" aria-hidden />
            <Eyebrow>Role lenses</Eyebrow>
          </div>
          <h2 className="font-display display-lg mt-4 max-w-2xl">The same evidence, read for the job you&apos;re hiring for.</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {Object.values(skillTracks).map((t, i) => (
            <Reveal key={t.track} delay={i * 80}>
              <Link href={`/skills/${t.track}`} className="surface lift group block h-full p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl font-medium tracking-tight">{t.title}</h3>
                  <span className="text-muted transition-transform group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.claim}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
