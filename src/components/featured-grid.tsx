import Image from "next/image";
import Link from "next/link";
import { featured, type Featured } from "@/lib/featured";
import { Reveal } from "./reveal";

// The three featured pieces as screenshot cards, top of /projects.
export function FeaturedGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {featured.map((f, i) => (
        <Reveal key={f.title} delay={i * 80}>
          <FeaturedCard f={f} />
        </Reveal>
      ))}
    </div>
  );
}

function FeaturedCard({ f }: { f: Featured }) {
  const body = (
    <>
      <div
        className={`relative aspect-[16/10] overflow-hidden border-b border-line ${f.fit === "contain" ? "bg-white" : ""}`}
      >
        <Image
          src={f.shot}
          alt={`${f.title} screen`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className={`transition-transform duration-500 group-hover:scale-[1.03] ${
            f.fit === "contain" ? "object-contain p-3" : "object-cover object-left-top"
          }`}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="kicker kicker-accent">{f.kicker}</p>
        <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
          {f.title}
        </h3>
        <p className="mt-2 flex-1 leading-relaxed text-muted">{f.blurb}</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-muted/70">{f.meta}</p>
        <span className="link-underline mt-5 self-start text-sm font-medium text-link">
          {f.cta} {f.external ? "↗" : "→"}
        </span>
      </div>
    </>
  );
  const cls = "surface lift group flex h-full flex-col overflow-hidden";
  return f.external ? (
    <a href={f.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <Link href={f.href} className={cls}>
      {body}
    </Link>
  );
}
