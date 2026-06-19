"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";
import { Prose } from "./ui";
import { MetricPanel } from "./metric-panel";
import { ScreenshotGallery } from "./screenshot-gallery";

const TABS = ["Product", "Engineering", "Demo", "Metrics", "Learnings"] as const;
type Tab = (typeof TABS)[number];

function Sections({ sections }: { sections: Project["engineering"] }) {
  return (
    <div className="space-y-8">
      {sections.map((s, i) => (
        <div key={i}>
          <h3 className="text-lg font-semibold tracking-tight">{s.heading}</h3>
          <div className="mt-3">
            <Prose blocks={s.body} />
            {s.bullets ? (
              <ul className="mt-3 space-y-2">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CaseStudyTabs({ project }: { project: Project }) {
  const [tab, setTab] = useState<Tab>("Product");

  return (
    <div>
      <div className="flex flex-wrap gap-1 rounded-full border border-line bg-surface p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === t ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "Product" ? <Sections sections={project.product} /> : null}
        {tab === "Engineering" ? <Sections sections={project.engineering} /> : null}

        {tab === "Demo" ? (
          <div className="space-y-6">
            <p className="leading-relaxed text-muted">
              {project.liveUrl
                ? "Live demo (runs in mock mode, no API key required):"
                : "Live demo deploying soon. Planned captures of the core flow:"}
            </p>
            <ScreenshotGallery shots={project.screenshots} />
          </div>
        ) : null}

        {tab === "Metrics" ? (
          <div className="space-y-6">
            <p className="max-w-2xl leading-relaxed text-muted">
              The metric framework this product is measured by. These are definitions of
              what to track, not fabricated results.
            </p>
            <MetricPanel metrics={project.metrics} />
          </div>
        ) : null}

        {tab === "Learnings" ? (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">What I learned</h3>
              <ul className="mt-3 space-y-2">
                {project.learnings.map((l, i) => (
                  <li key={i} className="flex gap-3 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    <span className="leading-relaxed">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight">Interview talking points</h3>
              <ul className="mt-3 space-y-2">
                {project.interviewTalkingPoints.map((l, i) => (
                  <li key={i} className="flex gap-3 text-muted">
                    <span className="mt-2 font-mono text-xs text-accent">{i + 1}</span>
                    <span className="leading-relaxed">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
