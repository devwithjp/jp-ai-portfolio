import type { Course } from "@/lib/types";

// A degree's coursework, grouped by theme. Full mode lists what each subject
// covered; compact mode is subject names only (the home page card).
// Codes stay internal and are never rendered.
export function CourseList({ courses, compact = false }: { courses: Course[]; compact?: boolean }) {
  const groups = [...new Set(courses.map((c) => c.group))].map((g) => ({
    label: g,
    items: courses.filter((c) => c.group === g),
  }));

  return (
    <div className="mt-5 space-y-5 border-t border-line pt-5">
      {groups.map((g) => (
        <div key={g.label}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{g.label}</p>
          {compact ? (
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{g.items.map((c) => c.title).join(" · ")}</p>
          ) : (
            <ul className="mt-1 divide-y divide-line">
              {g.items.map((c) => (
                <li key={c.code} className="py-3">
                  <div className="font-medium text-fg">{c.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{c.topics.join(" · ")}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
