import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import { metricKindLabel } from "@/lib/site";
import type { Project } from "@/lib/types";
import { XLink } from "@/components/df/projects-link";
import { ProjectCaseStudy } from "@/components/df/project-casestudy";
import { ProjectFx } from "@/components/df/project-fx";

const SHOT: Record<string, string> = {
  "agenteval-studio": "product-agenteval",
  "signaldesk-ai": "product-signaldesk",
  "screensense-qa": "product-screensense",
  "workflowpilot-safe-agents": "product-workflow",
};
const TABS = ["Product", "Engineering", "Demo", "Metrics", "Learnings"];

function Sections({ list }: { list: Project["product"] }) {
  return (
    <>
      {list.map((s) => (
        <div key={s.heading} className="cs-sec">
          <h3>{s.heading}</h3>
          {s.body.map((b) => <p key={b} className="muted">{b}</p>)}
          {s.bullets ? <ul className="dotlist">{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul> : null}
        </div>
      ))}
    </>
  );
}

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
  const p = getProject(slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const shot = `/df/${SHOT[p.slug]}.jpg`;

  const panels: Record<string, React.ReactNode> = {
    Product: <Sections list={p.product} />,
    Engineering: <Sections list={p.engineering} />,
    Demo: (
      <div className="demo">
        <div className="shot demo-shot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot} alt={`${p.title} screenshot`} />
        </div>
        <div className="demo-side">
          <p className="muted">The demo runs in mock mode: realistic output, no API keys, no cost. Add a key and the same interface calls the live model.</p>
          <ul className="dotlist">{p.screenshots.map((s) => <li key={s.caption}>{s.caption}</li>)}</ul>
          {p.liveUrl ? <XLink href={p.liveUrl} className="btn btn-primary">Open the live demo ↗</XLink> : <span className="tag">Demo deploying soon</span>}
        </div>
      </div>
    ),
    Metrics: (
      <div className="metrics">
        {p.metrics.map((m) => (
          <div key={m.label} className={`card pad metric k-${m.kind}`}>
            <p className="kicker accent">{metricKindLabel[m.kind] || m.kind}</p>
            <h3>{m.label}</h3>
            <p className="muted">{m.note}</p>
          </div>
        ))}
      </div>
    ),
    Learnings: (
      <div className="grid2">
        <div><p className="kicker accent">What I learned</p><ul className="dotlist big">{p.learnings.map((l) => <li key={l}>{l}</li>)}</ul></div>
        <div><p className="kicker accent">Interview talking points</p><ul className="dotlist big">{p.interviewTalkingPoints.map((l) => <li key={l}>{l}</li>)}</ul></div>
      </div>
    ),
  };

  return (
    <div className="p-project">
      <section className="phero proj-hero">
        <div className="wrap">
          <p><XLink href="/projects#products" className="link back">← All projects</XLink></p>
          <div className="ph-meta"><span className="kicker accent scr">{p.category}</span><span className={`status s-${p.status}`}>{p.status === "mock-demo" ? "Mock demo" : p.status}</span></div>
          <h1 className="display-hero kin">{p.title}</h1>
          <p className="lede">{p.pitch}</p>
          <div className="tags ph-tags">{p.stack.map((s) => <span key={s} className="tag">{s}</span>)}</div>
          <div className="btns ph-ctas">
            {p.liveUrl ? <XLink href={p.liveUrl} className="btn btn-primary">Live demo <span className="arr">↗</span></XLink> : <span className="btn btn-ghost" aria-disabled="true">Demo deploying soon</span>}
            {p.githubUrl ? <XLink href={p.githubUrl} className="btn btn-ghost">GitHub</XLink> : null}
          </div>
        </div>
        <div className="wrap"><div className="shot ph-shot tilt">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot} alt={`${p.title} screenshot`} />
        </div></div>
      </section>

      <section className="section">
        <div className="wrap glance">
          <div>
            <h2 className="display-lg kin">At a glance</h2>
            <dl className="gl">
              <div><dt className="kicker accent">ICP</dt><dd className="muted">{p.icp}</dd></div>
              <div><dt className="kicker accent">Features</dt><dd><ul className="dotlist feat">{p.features.map((f) => <li key={f}>{f}</li>)}</ul></dd></div>
            </dl>
          </div>
          <div>
            <h2 className="display-lg kin">AI architecture</h2>
            <div className="archwrap" id="arch">
              <span className="arch-line" aria-hidden="true"><i id="archFill"></i></span>
              <ol className="arch">{p.architecture.map((s, k) => <li key={s.label}><span className="arch-n">{k + 1}</span><div><h3>{s.label}</h3><p className="muted">{s.detail}</p></div></li>)}</ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="display-xl kin">Case study</h2>
          <ProjectCaseStudy tabs={TABS} panels={panels} />
        </div>
      </section>

      <section className="section">
        <div className="wrap grid2 bullets">
          <div><p className="kicker accent">Resume bullets · AI Engineering</p><ul>{p.aiEngineerBullets.map((b) => <li key={b} className="card pad up">{b}</li>)}</ul></div>
          <div><p className="kicker accent">Resume bullets · AI PM</p><ul>{p.aiPmBullets.map((b) => <li key={b} className="card pad up">{b}</li>)}</ul></div>
        </div>
      </section>

      <section className="nextp">
        <XLink href={`/projects/${next.slug}`} className="wrap"><span className="kicker">Next project</span><span className="np-t">{next.title}</span><span className="np-a" aria-hidden="true">→</span></XLink>
      </section>
      <ProjectFx />
    </div>
  );
}
