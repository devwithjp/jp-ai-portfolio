import Image from "next/image";
import { pedestal } from "@/lib/pedestal";
import { Tag } from "./ui";

// Pedestal, JP's venture, as one wide card: real landing screenshot + what's built.
// Links out to the live site; there is no case-study page for it here.
export function PedestalFeature() {
  return (
    <a
      href={pedestal.url}
      target="_blank"
      rel="noopener noreferrer"
      className="surface lift group grid overflow-hidden lg:grid-cols-[1.1fr_1fr]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line lg:aspect-auto lg:border-b-0 lg:border-r">
        <Image
          src={pedestal.shot}
          alt="Pedestal landing page"
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-7 sm:p-9">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="uppercase tracking-[0.18em] text-accent">{pedestal.role}</span>
          <span className="text-muted">·</span>
          <span className="text-muted">{pedestal.period}</span>
        </div>
        <h3 className="font-display display-lg mt-3">{pedestal.name}</h3>
        <p className="mt-2 text-lg text-fg">{pedestal.tagline}</p>
        <p className="mt-3 leading-relaxed text-muted">{pedestal.pitch}</p>
        <ul className="mt-5 space-y-2">
          {pedestal.built.map((b) => (
            <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {pedestal.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="link-underline font-medium text-link">Visit pedestaltech.dev ↗</span>
          <span className="font-mono text-xs text-muted">{pedestal.status}</span>
        </div>
      </div>
    </a>
  );
}
