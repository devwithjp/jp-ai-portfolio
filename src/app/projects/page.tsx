import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { Section, SectionHeader, Eyebrow } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "Four hosted AI products spanning evaluation, RAG, multimodal, and agents, plus 45 from-scratch NLP/LLM notebooks.",
};

export default function ProjectsPage() {
  return (
    <>
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Projects"
            title="Four AI products, two lenses each."
            intro="Evaluation, RAG, multimodal, and safe agents. Each one is a working demo, then reads two ways: an engineering case study for how it's built, and a product case study for why. Every demo runs in mock mode, so it works with no API keys."
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

      {/* Lab teaser */}
      <Section className="border-t border-line">
        <Reveal>
          <Link href="/lab" className="glass hairline lift group block overflow-hidden p-8 sm:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>Lab · from scratch</Eyebrow>
                <h2 className="font-display mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                  And underneath the products: the stack, built by hand.
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Products show I can ship. The Lab shows I know what&apos;s underneath: 45 notebooks
                  implementing the modern NLP and LLM stack from first principles, a regex tokenizer to RLHF.
                </p>
              </div>
              <span className="link-underline shrink-0 text-sm font-medium text-link">Open the Lab →</span>
            </div>
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
