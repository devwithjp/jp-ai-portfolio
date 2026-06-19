import Link from "next/link";
import type { Project } from "@/lib/types";
import { Tag, StatusBadge } from "./ui";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass hairline lift group flex h-full flex-col p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-wider text-accent">{project.category}</span>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="font-display mt-4 text-2xl font-medium tracking-tight">
        <Link href={`/projects/${project.slug}`} className="transition-colors group-hover:text-link">
          {project.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{project.pitch}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.roleSignals.map((r) => (
          <span key={r} className="rounded-full border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
            {r}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-sm">
        <Link href={`/projects/${project.slug}`} className="link-underline font-medium text-link">
          Case study →
        </Link>
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-fg">
            Live demo
          </a>
        ) : (
          <span className="text-muted/60">Demo soon</span>
        )}
      </div>
    </article>
  );
}
