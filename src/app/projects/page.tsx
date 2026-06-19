import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { Section, SectionHeader } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description: "Four hosted AI products spanning evaluation, RAG, multimodal, and agents.",
};

export default function ProjectsPage() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Projects"
        title="Four AI products, two role signals"
        intro="Evaluation, RAG, multimodal, and safe agents. Each demonstrates both AI engineering depth and AI product thinking, with a working mock-first demo, an engineering case study, and a product case study."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Section>
  );
}
