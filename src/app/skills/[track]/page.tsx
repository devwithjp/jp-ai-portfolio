import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { skillTracks } from "@/lib/skills";
import { Section, SectionHeader, Eyebrow } from "@/components/ui";
import { SkillEvidenceMap } from "@/components/skill-evidence-map";

export function generateStaticParams() {
  return Object.keys(skillTracks).map((track) => ({ track }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>;
}): Promise<Metadata> {
  const { track } = await params;
  const t = skillTracks[track];
  if (!t) return { title: "Skills" };
  return { title: t.title, description: t.claim };
}

export default async function SkillTrackPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;
  const t = skillTracks[track];
  if (!t) notFound();

  return (
    <Section>
      <SectionHeader eyebrow={t.title} title={t.claim} />
      <div className="mt-6 flex flex-wrap gap-1.5">
        {t.keywords.map((k) => (
          <span key={k} className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
            {k}
          </span>
        ))}
      </div>

      <div className="mt-10">
        <Eyebrow>Skill → evidence</Eyebrow>
        <p className="mt-2 max-w-2xl text-muted">
          Every skill below links to the project(s) that prove it. The portfolio is the evidence.
        </p>
        <div className="mt-6">
          <SkillEvidenceMap track={t} />
        </div>
      </div>
    </Section>
  );
}
