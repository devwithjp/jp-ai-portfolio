import type { Metadata } from "next";
import { site } from "@/lib/site";
import {
  resumeSummary,
  experience,
  education,
  certifications,
  skillGroups,
  resumeBulletsAiEngineer,
  resumeBulletsAiPm,
  reforge,
} from "@/lib/resume";
import { Section, SectionHeader, Eyebrow, CTA } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { WordsReveal } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Resume",
  description: resumeSummary,
};

function Timeline({ entries }: { entries: typeof experience }) {
  return (
    <div className="relative space-y-5 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-line">
      {entries.map((e, i) => (
        <Reveal key={i} delay={i * 50}>
          <div className="relative pl-8">
            <span className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg" />
            <div className="glass hairline lift p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-medium tracking-tight">{e.title}</h3>
                <span className="font-mono text-xs text-muted">{e.period}</span>
              </div>
              {e.org ? <div className="mt-1 text-sm text-link">{e.org}</div> : null}
              {e.points.length ? (
                <ul className="mt-3 space-y-2">
                  {e.points.map((p, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function ResumePage() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-line">
        <div className="ocean -z-10 opacity-80" aria-hidden />
        <Section className="!py-20">
          <Reveal>
            <Eyebrow>Resume</Eyebrow>
          </Reveal>
          <h1 className="font-display mt-4 max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
            <WordsReveal text="AI Product Manager with an engineer's hands." />
          </h1>
          <Reveal delay={300}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{resumeSummary}</p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/[0.07] px-4 py-2 font-mono text-xs text-link">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
              {site.availability}
            </div>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTA href="/jp-resume.pdf" external>
                Download CV (PDF)
              </CTA>
              <CTA href={site.links.linkedin} external variant="secondary">
                LinkedIn
              </CTA>
              <CTA href="/contact" variant="secondary">
                Contact
              </CTA>
            </div>
          </Reveal>
        </Section>
      </div>

      {/* Experience */}
      <Section>
        <Reveal>
          <SectionHeader index="01" eyebrow="Experience" title="Where I've built." />
        </Reveal>
        <div className="mt-10">
          <Timeline entries={experience} />
        </div>
      </Section>

      {/* Education + Certs + Skills */}
      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionHeader index="02" eyebrow="Education" title="Foundations." />
            </Reveal>
            <div className="mt-6 space-y-4">
              {education.map((e, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass hairline p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="font-medium">{e.title}</div>
                      {e.period ? <span className="font-mono text-xs text-muted">{e.period}</span> : null}
                    </div>
                    {e.org ? <div className="mt-1 text-sm text-muted">{e.org}</div> : null}
                    {e.points.map((p, j) => (
                      <p key={j} className="mt-2 text-sm text-muted">{p}</p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-8">
                <Eyebrow>Certifications + programs</Eyebrow>
                <ul className="mt-3 space-y-2">
                  {certifications.map((c) => (
                    <li key={c} className="flex gap-3 text-sm text-muted">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <SectionHeader index="03" eyebrow="Skills" title="What I work with." />
            </Reveal>
            <div className="mt-6 space-y-6">
              {skillGroups.map((g, i) => (
                <Reveal key={g.label} delay={i * 60}>
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{g.label}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <span key={s} className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Reforge */}
      <Section className="border-t border-line">
        <Reveal>
          <SectionHeader
            index="04"
            eyebrow="Product craft"
            title="What I learned at Reforge."
            intro={reforge.blurb}
          />
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {reforge.learned.map((m, i) => (
            <Reveal key={m.h} delay={(i % 2) * 90}>
              <div className="glass hairline lift h-full p-6">
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{m.h}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={140}>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
            <CTA href={reforge.certHref} external>
              View certificate
            </CTA>
            <span className="font-mono text-xs text-muted">{reforge.name} · {reforge.completed}</span>
          </div>
        </Reveal>
      </Section>

      {/* Project resume bullets */}
      <Section className="border-t border-line">
        <Reveal>
          <SectionHeader
            index="05"
            eyebrow="From the projects"
            title="Bullet-ready, if you're skimming."
            intro="The four AI products on this site, distilled into CV lines."
          />
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow>AI Product</Eyebrow>
              <ul className="mt-3 space-y-2">
                {resumeBulletsAiPm.map((b, i) => (
                  <li key={i} className="text-sm leading-relaxed text-muted">• {b}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <Eyebrow>AI Engineering</Eyebrow>
              <ul className="mt-3 space-y-2">
                {resumeBulletsAiEngineer.map((b, i) => (
                  <li key={i} className="text-sm leading-relaxed text-muted">• {b}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
