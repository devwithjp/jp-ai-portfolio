import Link from "next/link";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { whyIBuild, whyIBuildIntro, waterQuote } from "@/lib/story";
import { posts } from "@/lib/blog";
import { Container, Section, SectionHeader, CTA, Eyebrow } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { WordsReveal, WaveDivider, Marquee } from "@/components/chrome";

const TECH = [
  "RAG", "LLM evals", "Agents", "Tool-calling", "Multimodal", "Embeddings",
  "Next.js", "TypeScript", "Product strategy", "PRDs", "Experiments", "pgvector",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <header className="relative flex min-h-[88vh] items-center overflow-hidden border-b border-line">
        <div className="ocean -z-10" aria-hidden />
        <div className="caustics -z-10" aria-hidden />
        <Container className="py-24">
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow>{site.role} · {site.location}</Eyebrow>
            </Reveal>
            <h1 className="font-display mt-6 text-5xl font-medium leading-[1.0] tracking-tight sm:text-7xl md:text-8xl">
              <WordsReveal text="I started with code." className="block" />
              <span className="mt-2 block">
                <Reveal delay={360}>
                  <span>
                    I stayed for <span className="text-gradient italic">building</span>.
                  </span>
                </Reveal>
              </span>
            </h1>
            <Reveal delay={520}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{site.positioning}</p>
            </Reveal>
            <Reveal delay={640}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <CTA href="/projects">See what I&apos;ve built</CTA>
                <CTA href="/water" variant="secondary">The water chapter</CTA>
                <CTA href="/contact" variant="secondary">Get in touch</CTA>
              </div>
            </Reveal>
            <Reveal delay={760}>
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted/80">
                {site.proof.map((p, i) => (
                  <span key={p} className="flex items-center gap-5">
                    {i > 0 ? <span className="h-1 w-1 rounded-full bg-accent/50" /> : null}
                    {p}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce font-mono text-xs text-muted/60" aria-hidden>
          scroll ↓
        </div>
      </header>

      {/* Tech marquee */}
      <div className="border-b border-line bg-surface/40 py-5">
        <Marquee>
          {TECH.map((t) => (
            <span key={t} className="flex items-center gap-10 font-mono text-sm text-muted">
              {t}
              <span className="h-1 w-1 rounded-full bg-accent/60" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Why I build */}
      <Section>
        <Reveal>
          <SectionHeader index="01" eyebrow="Why I build" title="Engineering was the door, not the room." intro={whyIBuildIntro} />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {whyIBuild.map((beat, i) => (
            <Reveal key={beat.heading} delay={i * 110}>
              <div className="glass hairline lift h-full p-7">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{beat.heading}</div>
                <p className="mt-4 leading-relaxed text-muted">{beat.body[0]}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={140}>
          <div className="mt-8">
            <Link href="/about" className="link-underline text-sm font-medium text-link">
              Read the whole story →
            </Link>
          </div>
        </Reveal>
      </Section>

      <WaveDivider />

      {/* Featured projects */}
      <Section>
        <Reveal>
          <SectionHeader
            index="02"
            eyebrow="Projects"
            title="Four AI products, built end to end."
            intro="Each ships a working demo, an engineering case study, and a product case study. Every demo runs in mock mode, so it works with no API keys."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 110}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Water teaser */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-line">
          <div className="ocean opacity-80" aria-hidden />
          <div className="relative grid gap-10 p-8 sm:p-14 md:grid-cols-2 md:items-center">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted/60">03</span>
                  <Eyebrow>Water</Eyebrow>
                </div>
                <h2 className="font-display mt-4 text-3xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
                  Confidence comes before skill, not after.
                </h2>
                <p className="mt-5 leading-relaxed text-muted">
                  Diving in the Andamans, teaching kids to swim in Sydney. The water taught me more about
                  learning, patience, and trust than most things at work.
                </p>
                <div className="mt-7">
                  <Link href="/water" className="link-underline text-sm font-medium text-link">
                    Read the water chapter →
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <blockquote className="font-display text-2xl font-medium italic leading-snug sm:text-4xl">
                “{waterQuote}”
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Section>

      <WaveDivider flip />

      {/* Writing teaser */}
      <Section>
        <Reveal>
          <SectionHeader index="04" eyebrow="Writing" title="Notes on building, and on the water." />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 110}>
              <Link href={`/writing/${p.slug}`} className="glass hairline lift block h-full p-6">
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent">{p.category}</span>
                <h3 className="font-display mt-2 text-lg font-medium tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={140}>
          <div className="mt-8">
            <Link href="/writing" className="link-underline text-sm font-medium text-link">
              All writing →
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* Contact */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line p-12 text-center sm:p-16">
            <div className="ocean opacity-70" aria-hidden />
            <h2 className="font-display relative text-3xl font-medium tracking-tight sm:text-5xl">
              Building something? Let&apos;s talk.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-muted">
              I&apos;m {site.shortName}, open to AI engineering and product roles, and to people building interesting things.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <CTA href="/contact">Contact</CTA>
              <CTA href="/projects" variant="secondary">Browse projects</CTA>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
