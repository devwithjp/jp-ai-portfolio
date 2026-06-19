import type { Metadata } from "next";
import { site } from "@/lib/site";
import {
  resumeSummary,
  experience,
  education,
  resumeBulletsAiEngineer,
  resumeBulletsAiPm,
} from "@/lib/resume";
import { projects } from "@/lib/projects";
import { Section, SectionHeader, Eyebrow, CTA } from "@/components/ui";

export const metadata: Metadata = {
  title: "Resume",
  description: resumeSummary,
};

function EntryList({ entries }: { entries: typeof experience }) {
  return (
    <div className="space-y-6">
      {entries.map((e, i) => (
        <div key={i} className="border-l border-line pl-5">
          <div className="font-mono text-xs uppercase tracking-wider text-muted">{e.period}</div>
          <div className="mt-1 font-medium">
            {e.title}
            {e.org ? <span className="text-muted"> · {e.org}</span> : null}
          </div>
          {e.points.length ? (
            <ul className="mt-2 space-y-1.5">
              {e.points.map((p, j) => (
                <li key={j} className="flex gap-2 text-sm text-muted">
                  <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function ResumePage() {
  return (
    <Section>
      <SectionHeader eyebrow="Resume" title={`${site.name}, ${site.role}`} intro={resumeSummary} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr]">
        <div className="space-y-10">
          <div>
            <Eyebrow>Experience</Eyebrow>
            <p className="mb-3 mt-2 text-xs text-muted/70">
              (Placeholder entries, replace with your real roles.)
            </p>
            <EntryList entries={experience} />
          </div>
          <div>
            <Eyebrow>Education</Eyebrow>
            <div className="mt-3">
              <EntryList entries={education} />
            </div>
          </div>
          <div>
            <CTA href="/contact" variant="secondary">Request a PDF / full CV</CTA>
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <Eyebrow>Selected projects</Eyebrow>
            <div className="mt-3 space-y-4">
              {projects.map((p) => (
                <div key={p.slug} className="rounded-xl border border-line bg-surface p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium">{p.title}</div>
                    <div className="font-mono text-xs text-muted">{p.category}</div>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {[...p.aiEngineerBullets.slice(0, 1), ...p.aiPmBullets.slice(0, 1)].map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted">
                        <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Eyebrow>Resume bullets · AI Engineering</Eyebrow>
              <ul className="mt-3 space-y-2">
                {resumeBulletsAiEngineer.map((b, i) => (
                  <li key={i} className="text-sm leading-relaxed text-muted">• {b}</li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>Resume bullets · AI PM</Eyebrow>
              <ul className="mt-3 space-y-2">
                {resumeBulletsAiPm.map((b, i) => (
                  <li key={i} className="text-sm leading-relaxed text-muted">• {b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
