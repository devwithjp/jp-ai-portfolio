import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { skillTracks } from "@/lib/skills";
import { skills as graph } from "@/lib/skill-graph";
import { projects } from "@/lib/projects";
import { SkillLogo } from "@/components/df/skills-logo";
import { TrackProgress } from "@/components/df/track-progress";

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

// No em or en dashes in visible text.
const clean = (s: string) => s.replace(/\s*[–—]\s*/g, ", ");
const projectTitle = (slug: string) => projects.find((p) => p.slug === slug)?.title || slug;

function TrackLogo({ name }: { name: string }) {
  const n = name.toLowerCase();
  const g =
    graph.find((x) => x.name.toLowerCase() === n) ||
    graph.find((x) => n.includes(x.name.toLowerCase()) && x.name.length > 3) ||
    graph.find((x) => x.name.toLowerCase().includes(n));
  return <SkillLogo name={g ? g.name : name} area={g ? g.area : "ai"} size={28} />;
}

export default async function SkillTrackPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;
  const t = skillTracks[track];
  if (!t) notFound();
  const other = Object.values(skillTracks).find((x) => x.track !== t.track);
  const total = String(t.skills.length).padStart(2, "0");

  return (
    <div className="p-track">
      <section className="phero tk-hero">
        <div className="wrap">
          <p><Link className="link back" href="/skills">← All skills</Link></p>
          <p className="kicker accent scr" style={{ marginTop: 22 }}>{clean(t.title)}</p>
          <h1 className="display-hero kin">{clean(t.claim)}</h1>
          <div className="tk-count condensed" aria-hidden="true">{total}</div>
          <div className="tags">
            {t.keywords.map((k) => <span className="tag" key={k}>{clean(k)}</span>)}
          </div>
        </div>
      </section>
      <section className="tk-map">
        <div className="wrap">
          <p className="kicker accent scr">Skill → evidence</p>
          <p className="lede">Every skill below links to the project(s) that prove it. The portfolio is the evidence.</p>
          <TrackProgress total={t.skills.length}>
            {t.skills.map((s, i) => (
              <div className="tk-row spot up" key={s.skill}>
                <span className="tk-n condensed" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3><span className="tk-logo"><TrackLogo name={s.skill} /></span>{clean(s.skill)}</h3>
                <p>{clean(s.description)}</p>
                <div className="tk-projs">
                  {s.projects.map((p) => <Link key={p} href={`/projects/${p}`}>{clean(projectTitle(p))}</Link>)}
                </div>
              </div>
            ))}
          </TrackProgress>
          {other && (
            <div className="tk-other">
              <Link href={`/skills/${other.track}`} className="btn btn-ghost">Read it as {clean(other.title)} <span className="arr">→</span></Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
