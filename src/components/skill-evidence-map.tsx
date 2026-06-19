import Link from "next/link";
import type { SkillTrack } from "@/lib/types";
import { projects } from "@/lib/projects";

const titleOf = (slug: string) => projects.find((p) => p.slug === slug)?.title ?? slug;

// Maps each skill to the concrete projects that prove it, the portfolio IS the evidence.
export function SkillEvidenceMap({ track }: { track: SkillTrack }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {track.skills.map((s, i) => (
        <div key={i} className="rounded-xl border border-line bg-surface p-5">
          <div className="font-medium">{s.skill}</div>
          <p className="mt-1 text-sm leading-relaxed text-muted">{s.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {s.projects.map((slug) => (
              <Link
                key={slug}
                href={`/projects/${slug}`}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent/50 hover:text-fg"
              >
                {titleOf(slug)}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
