import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { whyIBuild, whyIBuildIntro } from "@/lib/story";
import { Section, SectionHeader, CTA, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description: site.positioning,
};

export default function AboutPage() {
  return (
    <Section>
      <Reveal>
        <SectionHeader eyebrow="Why I build" title={`I'm ${site.name}.`} intro={whyIBuildIntro} />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_minmax(0,280px)]">
        {/* Story */}
        <div className="space-y-12">
          {whyIBuild.map((beat, i) => (
            <Reveal key={beat.heading} delay={i * 60}>
              <div className="border-l border-line pl-6">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{beat.heading}</div>
                <div className="mt-3 space-y-4 text-lg leading-relaxed text-muted">
                  {beat.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Aside */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <Eyebrow>How I say it</Eyebrow>
              <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
                {site.altPositionings.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <Eyebrow>Based in</Eyebrow>
              <p className="mt-2 text-muted">{site.location}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                There&apos;s another side of me too:{" "}
                <Link href="/water" className="text-link hover:underline">
                  the water
                </Link>
                .
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <CTA href="/resume" variant="secondary">Resume</CTA>
                <CTA href="/contact" variant="secondary">Contact</CTA>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </Section>
  );
}
