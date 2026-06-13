import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import { Container, Section, CTA, Tag, StatusBadge, Eyebrow } from "@/components/ui";
import { CaseStudyTabs } from "@/components/case-study-tabs";
import { ArchitectureDiagram } from "@/components/architecture-diagram";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.pitch,
    openGraph: { title: project.title, description: project.pitch },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      {/* Header */}
      <div className="border-b border-line">
        <div className="bg-grid absolute inset-x-0 -z-10 h-72" aria-hidden />
        <Container className="py-14">
          <div className="flex items-center gap-3">
            <Eyebrow>{project.category}</Eyebrow>
            <StatusBadge status={project.status} />
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{project.pitch}</p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.liveUrl ? (
              <CTA href={project.liveUrl} external>
                Live demo
              </CTA>
            ) : (
              <span className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm text-muted">
                Demo deploying soon
              </span>
            )}
            {project.githubUrl ? (
              <CTA href={project.githubUrl} external variant="secondary">
                GitHub
              </CTA>
            ) : null}
            <CTA href="/projects" variant="secondary">
              All projects
            </CTA>
          </div>
        </Container>
      </div>

      {/* At a glance */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,360px)]">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">At a glance</h2>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-accent">ICP</dt>
                <dd className="mt-1 text-muted">{project.icp}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-accent">Features</dt>
                <dd className="mt-2">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {project.features.map((f) => (
                      <li key={f} className="flex gap-2 text-muted">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">AI architecture</h2>
            <div className="mt-4">
              <ArchitectureDiagram steps={project.architecture} />
            </div>
          </div>
        </div>
      </Section>

      {/* Tabbed case study */}
      <Section className="border-t border-line">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Case study</h2>
        <CaseStudyTabs project={project} />
      </Section>

      {/* Resume bullets */}
      <Section className="border-t border-line">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Eyebrow>Resume bullets · AI Engineering</Eyebrow>
            <ul className="mt-4 space-y-3">
              {project.aiEngineerBullets.map((b, i) => (
                <li key={i} className="rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed text-muted">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Resume bullets · AI PM</Eyebrow>
            <ul className="mt-4 space-y-3">
              {project.aiPmBullets.map((b, i) => (
                <li key={i} className="rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed text-muted">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
