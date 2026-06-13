import type { Metric } from "@/lib/types";
import { metricKindLabel } from "@/lib/site";

// Presents the metric *framework* a product is measured by (north star, activation,
// retention, quality, guardrail). Deliberately definitions, not fabricated numbers —
// no unmeasured metric is claimed as real.
export function MetricPanel({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((m, i) => (
        <div key={i} className="rounded-xl border border-line bg-surface p-5">
          <div
            className={`font-mono text-xs uppercase tracking-wider ${
              m.kind === "guardrail" ? "text-muted" : "text-accent"
            }`}
          >
            {metricKindLabel[m.kind] ?? m.kind}
          </div>
          <div className="mt-2 font-medium leading-snug">{m.label}</div>
          {m.note ? <div className="mt-1 text-sm text-muted">{m.note}</div> : null}
        </div>
      ))}
    </div>
  );
}
