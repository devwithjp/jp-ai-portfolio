import type { Metadata } from "next";
import Link from "next/link";
import { skillTracks } from "@/lib/skills";
import { skillStats } from "@/lib/skill-graph";
import { SkillsConstellation } from "@/components/df/skills-constellation";
import { SkillsExplorer } from "@/components/df/skills-explorer";

export const metadata: Metadata = {
  title: "Skills",
  description: "Every skill, by technology, job and project, and where I used it.",
};

// No em or en dashes in visible text.
const clean = (s: string) => s.replace(/\s*[–—]\s*/g, ", ");

const stats: [number, string][] = [
  [skillStats.skills, "skills"],
  [skillStats.work, "roles"],
  [skillStats.projects, "projects & research"],
  [skillStats.learning, "degrees & courses"],
];

export default function SkillsPage() {
  return (
    <div className="p-skills">
      <section className="phero sk-hero">
        <SkillsConstellation />
        <div className="sk-ghost condensed" aria-hidden="true">EVIDENCE</div>
        <div className="wrap">
          <p className="kicker accent scr">Skills</p>
          <h1 className="display-hero kin">Everything I&apos;ve built with, and where.</h1>
          <p className="lede">
            A skill on a CV is a claim. Here each one points at the job, project, case study, or course where I actually used it. Pick one to see the evidence.
          </p>
          <dl className="stats sk-stats up">
            {stats.map(([n, l]) => (
              <div key={l}><dt>{l}</dt><dd data-count={n}>{n}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <SkillsExplorer />

      <section className="section rule-top sk-lenses">
        <div className="wrap">
          <div className="sh up">
            <p className="kicker accent scr">Role lenses</p>
            <h2 className="display-xl kin">The same evidence, read for the job you&apos;re hiring for.</h2>
          </div>
          <div className="grid2 sk-lgrid">
            {Object.values(skillTracks).map((t) => (
              <Link key={t.track} href={`/skills/${t.track}`} className="card spot tilt up">
                <div className="pad">
                  <div className="sk-lt"><h3 className="sk-ltitle condensed">{clean(t.title)}</h3><span className="sk-arr" aria-hidden="true">→</span></div>
                  <p className="sk-lclaim">{clean(t.claim)}</p>
                  <span className="sk-lcta kicker accent">Read the evidence</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
