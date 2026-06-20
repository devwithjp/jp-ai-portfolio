import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { whyIBuild, whyIBuildIntro } from "@/lib/story";
import { Section, SectionHeader, CTA, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ScrollStory } from "@/components/scroll-story";

export const metadata: Metadata = {
  title: "About",
  description: site.positioning,
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <Reveal>
          <SectionHeader eyebrow="Why I build" title={`I'm ${site.name}.`} intro={whyIBuildIntro} />
        </Reveal>

        {/* The building story: scrollytelling, one beat at a time. */}
        <div className="mt-8">
          <ScrollStory steps={whyIBuild.map((beat) => ({ kicker: beat.heading, lines: beat.body }))} />
        </div>
      </Section>

      {/* Voice + based-in band */}
      <Section className="border-t border-line">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass hairline h-full p-6">
              <Eyebrow>How I say it</Eyebrow>
              <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
                {site.altPositionings.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="glass hairline h-full p-6">
              <Eyebrow>Based in</Eyebrow>
              <p className="mt-2 text-muted">{site.location}</p>
              <p className="mt-3 font-mono text-xs text-link">{site.availability}</p>
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
        </div>
      </Section>
    </>
  );
}
