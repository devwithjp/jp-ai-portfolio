import Link from "next/link";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { skillTracks } from "@/lib/skills";
import { Container, Section, SectionHeader, CTA, Eyebrow } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-line">
        <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
        <div className="accent-glow absolute inset-0 -z-10" aria-hidden />
        <Container className="py-24 sm:py-32">
          <div className="max-w-3xl">
            <Eyebrow>{site.role} · {site.location}</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              {site.tagline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {site.positioning}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CTA href="/projects">View projects</CTA>
              <CTA href="/resume" variant="secondary">Resume</CTA>
              <CTA href="/contact" variant="secondary">Get in touch</CTA>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/skills/ai-engineering"
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm transition-colors hover:border-accent/50"
              >
                <span className="text-accent">→</span> AI Engineering: RAG · agents · evals · multimodal
              </Link>
              <Link
                href="/skills/ai-product-management"
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm transition-colors hover:border-accent/50"
              >
                <span className="text-accent">→</span> AI PM: PRDs · metrics · roadmaps · GTM
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Featured projects */}
      <Section>
        <SectionHeader
          eyebrow="Selected work"
          title="Four hosted AI products"
          intro="Each one ships a working demo, an engineering case study, and a product case study — proof of both tracks. Every demo runs in mock mode, so it works with zero API keys."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      {/* Dual track */}
      <Section className="border-t border-line">
        <div className="grid gap-5 md:grid-cols-2">
          {Object.values(skillTracks).map((t) => (
            <Link
              key={t.track}
              href={`/skills/${t.track}`}
              className="group rounded-2xl border border-line bg-surface p-8 transition-colors hover:border-accent/50"
            >
              <Eyebrow>{t.title}</Eyebrow>
              <p className="mt-3 text-xl font-medium leading-snug">{t.claim}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {t.keywords.slice(0, 8).map((k) => (
                  <span key={k} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                    {k}
                  </span>
                ))}
              </div>
              <div className="mt-6 text-sm font-medium text-link group-hover:underline">
                See the evidence map →
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Contact strip */}
      <Section className="border-t border-line">
        <div className="rounded-2xl border border-line bg-surface p-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Hiring for AI engineering or AI product?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            I&apos;m {site.name}, an {site.role.toLowerCase()} who can define, build, evaluate, and ship AI products. Let&apos;s talk.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <CTA href="/contact">Contact</CTA>
            <CTA href="/projects" variant="secondary">Browse projects</CTA>
          </div>
        </div>
      </Section>
    </>
  );
}
