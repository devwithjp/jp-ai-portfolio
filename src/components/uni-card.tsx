import Image from "next/image";
import type { UniProject } from "@/lib/uni";

// A university or personal project: one shot, the problem, what was built and
// measured, and the stack. Diagrams and charts are contained, never cropped.
export function UniCard({ u }: { u: UniProject }) {
  return (
    <article id={u.slug} className="glass hairline h-full scroll-mt-32 overflow-hidden">
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-line bg-white">
        <Image
          src={u.shot}
          alt={u.shotAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className={u.fit === "contain" ? "object-contain p-3" : "object-cover object-top"}
        />
      </div>
      <div className="p-6 sm:p-7">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{u.kind}</span>
        <h3 className="font-display mt-3 text-2xl font-medium tracking-tight">{u.title}</h3>
        <p className="mt-2 text-muted">{u.blurb}</p>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
          {u.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          {u.stack.map((t) => (
            <span key={t} className="font-mono text-[11px] uppercase tracking-wider text-muted/70">
              {t}
            </span>
          ))}
        </div>
        {u.githubUrl ? (
          <a
            href={u.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-5 inline-block text-sm font-medium text-link"
          >
            View code ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}
