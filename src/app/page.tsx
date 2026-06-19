import Link from "next/link";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { whyIBuild, whyIBuildIntro, waterQuote } from "@/lib/story";
import { posts } from "@/lib/blog";
import { Container, Section, SectionHeader, CTA, Eyebrow } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-line">
        <div className="bg-depth absolute inset-0 -z-10" aria-hidden />
        <div className="bg-ripple absolute inset-0 -z-10" aria-hidden />
        <Container className="py-24 sm:py-36">
          <div className="max-w-3xl">
            <Eyebrow>{site.role} · {site.location}</Eyebrow>
            <h1 className="font-display mt-5 text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
              I started with code.
              <br />
              I stayed for <span className="italic text-link">building</span>.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">{site.positioning}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CTA href="/projects">See what I&apos;ve built</CTA>
              <CTA href="/water" variant="secondary">The water chapter</CTA>
              <CTA href="/contact" variant="secondary">Get in touch</CTA>
            </div>
          </div>
        </Container>
      </div>

      {/* Why I build (teaser) */}
      <Section>
        <Reveal>
          <SectionHeader eyebrow="Why I build" title="Engineering was the door, not the room." intro={whyIBuildIntro} />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {whyIBuild.map((beat, i) => (
            <Reveal key={beat.heading} delay={i * 90}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{beat.heading}</div>
                <p className="mt-3 leading-relaxed text-muted">{beat.body[0]}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="mt-8">
            <Link href="/about" className="text-sm font-medium text-link hover:underline">
              Read the whole story →
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* Featured projects */}
      <Section className="border-t border-line">
        <Reveal>
          <SectionHeader
            eyebrow="Projects"
            title="Four AI products, built end to end."
            intro="Each one ships a working demo, an engineering case study, and a product case study. Every demo runs in mock mode, so it works with no API keys."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 90}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Water teaser */}
      <Section className="border-t border-line">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="bg-depth absolute inset-0" aria-hidden />
          <div className="relative grid gap-8 p-8 sm:p-12 md:grid-cols-2 md:items-center">
            <Reveal>
              <div>
                <Eyebrow>Water</Eyebrow>
                <h2 className="font-display mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                  Confidence comes before skill, not after.
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  Diving in the Andamans, teaching kids to swim in Sydney. The water taught me more about
                  learning, patience, and trust than most things at work.
                </p>
                <div className="mt-6">
                  <Link href="/water" className="text-sm font-medium text-link hover:underline">
                    Read the water chapter →
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <blockquote className="font-display text-2xl font-medium italic leading-snug text-fg sm:text-3xl">
                “{waterQuote}”
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Writing teaser */}
      <Section className="border-t border-line">
        <Reveal>
          <SectionHeader eyebrow="Writing" title="Notes on building, and on the water." />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Link
                href={`/writing/${p.slug}`}
                className="block h-full rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/50"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent">{p.category}</span>
                <h3 className="font-display mt-2 text-lg font-medium tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="mt-8">
            <Link href="/writing" className="text-sm font-medium text-link hover:underline">
              All writing →
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* Contact strip */}
      <Section className="border-t border-line">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-10 text-center sm:p-14">
            <div className="accent-glow absolute inset-0" aria-hidden />
            <h2 className="font-display relative text-3xl font-medium tracking-tight sm:text-4xl">
              Building something? Let&apos;s talk.
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-muted">
              I&apos;m {site.name}, open to AI engineering and product roles, and to people building interesting things.
            </p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <CTA href="/contact">Contact</CTA>
              <CTA href="/projects" variant="secondary">Browse projects</CTA>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
