import type { ArchitectureStep } from "@/lib/types";

// Lightweight CSS architecture diagram, a labeled pipeline of steps with connectors.
// No image asset needed; renders crisply in both themes.
export function ArchitectureDiagram({ steps }: { steps: ArchitectureStep[] }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <ol className="flex flex-col gap-0">
        {steps.map((s, i) => (
          <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
            {/* connector line */}
            {i < steps.length - 1 ? (
              <span className="absolute left-[15px] top-8 h-full w-px bg-line" aria-hidden />
            ) : null}
            <span className="z-10 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line bg-elevated font-mono text-xs text-accent">
              {i + 1}
            </span>
            <div className="pt-1">
              <div className="font-medium">{s.label}</div>
              <div className="text-sm leading-relaxed text-muted">{s.detail}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
