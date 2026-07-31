"use client";

import { useState } from "react";
import Image from "next/image";
import { workGroups, allWork, type WorkItem } from "@/lib/work";

/*
  Editorial work index with hover preview. The left column is a scannable,
  numbered list of every project; hovering (or focusing) a row updates the sticky
  preview pane on the right with that project's real screenshot. On mobile the
  preview pane is dropped and each row carries its own thumbnail. This replaces
  two generic card grids with one authored index.
*/
export function WorkIndex() {
  const [active, setActive] = useState<WorkItem>(allWork[0]);

  return (
    <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1fr_minmax(0,440px)]">
      {/* Index */}
      <div>
        {workGroups.map((group, gi) => (
          <section key={group.label} className={gi > 0 ? "mt-14" : ""}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line pb-4">
              <h3 className="font-display text-lg font-semibold">{group.label}</h3>
              <p className="max-w-sm text-sm text-muted">{group.caption}</p>
            </div>
            <ul>
              {group.items.map((item) => {
                const isActive = active.href === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onMouseEnter={() => setActive(item)}
                      onFocus={() => setActive(item)}
                      className="group block border-b border-line py-6 transition-colors"
                    >
                      <div className="flex items-baseline gap-5 sm:gap-8">
                        <span className="font-mono text-xs text-muted/60">{item.n}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                            <h4
                              className={`font-display text-2xl font-semibold tracking-tight transition-colors sm:text-3xl ${
                                isActive ? "text-accent" : "text-fg group-hover:text-accent"
                              }`}
                            >
                              {item.title}
                            </h4>
                            <span className="font-mono text-xs uppercase tracking-wider text-muted">
                              {item.meta}
                            </span>
                          </div>
                          <p className="mt-2 max-w-lg text-muted">{item.blurb}</p>
                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                            {item.tags.map((t) => (
                              <span key={t} className="font-mono text-[11px] uppercase tracking-wider text-muted/70">
                                {t}
                              </span>
                            ))}
                          </div>
                          {/* mobile thumbnail */}
                          {item.shot ? (
                            <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-xl border border-line lg:hidden">
                              <Image
                                src={item.shot}
                                alt={`${item.title} screen`}
                                fill
                                sizes="100vw"
                                className="object-cover object-left-top"
                              />
                            </div>
                          ) : null}
                        </div>
                        <span className="mt-1 hidden shrink-0 items-center gap-2 self-start whitespace-nowrap text-sm font-medium text-link lg:flex">
                          {item.cta}
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {/* Sticky preview: all shots stacked, crossfaded by opacity (decode once,
          no load flash on hover). */}
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-elevated shadow-[var(--shadow-lg)]">
            {allWork.map((item) =>
              item.shot ? (
                <Image
                  key={item.href}
                  src={item.shot}
                  alt={`${item.title} screen`}
                  fill
                  sizes="440px"
                  className={`object-cover object-left-top transition-opacity duration-300 ${
                    active.href === item.href ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : null
            )}
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <div>
              <p className="font-display text-lg font-semibold">{active.title}</p>
              <p className="font-mono text-xs uppercase tracking-wider text-muted">{active.meta}</p>
            </div>
            <a href={active.href} className="whitespace-nowrap text-sm font-medium text-link">
              {active.cta} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
