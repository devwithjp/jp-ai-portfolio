import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { caseStudies, caseworkUrl } from "@/lib/casework";
import { pedestal } from "@/lib/pedestal";
import { featured } from "@/lib/featured";
import { groupTypes, itemTypes, pitchscore, projectTypes, typesOf, type ProjectType } from "@/lib/project-types";
import { uniLead, uniSide, getUni } from "@/lib/uni";
import { XLink } from "@/components/df/projects-link";
import { ProjectsShowAll } from "@/components/df/projects-showall";
import { ProjectsLabTeaser } from "@/components/df/projects-labteaser";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Pedestal, my AI communication coach; SmartCare, gitit and other university and personal builds; five playable AI PM case studies; four hosted AI products; and 45 from-scratch NLP/LLM notebooks.",
};

// How many pieces of work each tab shows. Grouped work counts once per item;
// uni projects and side builds are typed card by card.
const SIDE = ["pitchscore-ai", ...uniSide];
const tally: [readonly ProjectType[], number][] = [
  [groupTypes.pedestal, 1],
  ...[...uniLead, ...SIDE].map((slug): [ProjectType[], number] => [itemTypes[slug], 1]),
  [groupTypes.casework, caseStudies.length],
  [groupTypes.products, projects.length],
  [groupTypes.lab, 1],
];
const counts = {
  all: tally.reduce((n, [, k]) => n + k, 0),
  ...Object.fromEntries(
    projectTypes.map((t) => [t.id, tally.filter(([types]) => types.includes(t.id)).reduce((n, [, k]) => n + k, 0)]),
  ),
} as Record<"all" | ProjectType, number>;


// Prototype screenshot per product (public/df).
const SHOT: Record<string, string> = {
  "agenteval-studio": "product-agenteval",
  "signaldesk-ai": "product-signaldesk",
  "screensense-qa": "product-screensense",
  "workflowpilot-safe-agents": "product-workflow",
};
const dfImg = (p: string) => "/df/" + p.split("/").pop()!.replace(/\.(png|jpg)$/, "") + ".jpg";
// Featured/uni shots that have no /df copy keep their original file.
const featImg = (p: string) => (/\/(pedestal|casework-|product-)/.test(p) ? dfImg(p) : p);
const STATUS: Record<string, string> = { live: "Live", "mock-demo": "Mock demo", planned: "Planned" };

function Header({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="sh">
      {eyebrow ? <p className="kicker accent scr">{eyebrow}</p> : null}
      <h2 className="display-xl kin">{title}</h2>
      {intro ? <p className="lede">{intro}</p> : null}
    </div>
  );
}

function UniCard({ slug }: { slug: string }) {
  const u = getUni(slug);
  const contain = u.fit === "contain";
  return (
    <article id={u.slug} data-types={itemTypes[slug].join(" ")} className="card spot up pcard" style={{ scrollMarginTop: 120 }}>
      <div className="shot pc-shot" style={contain ? { background: "#fff" } : undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={u.shot} alt={u.shotAlt} loading="lazy" data-fit={contain ? "contain" : undefined} style={contain ? { objectFit: "contain", padding: 12 } : undefined} />
      </div>
      <div className="pad pc-body">
        <div className="pc-top"><span className="kicker accent">{u.kind}</span></div>
        <h3 className="display-lg">{u.title}</h3>
        <p className="muted">{u.blurb}</p>
        <ul className="dotlist">{u.details.map((d) => <li key={d}>{d}</li>)}</ul>
        <div className="tags">{u.stack.map((s) => <span key={s} className="tag">{s}</span>)}</div>
        {u.githubUrl ? (
          <div className="pc-links"><XLink href={u.githubUrl} className="link">View code ↗</XLink></div>
        ) : null}
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const tabs = projectTypes.map((t) => ({ id: t.id, label: t.label, count: counts[t.id] }));
  return (
    <div className="p-projects">
      <section className="phero">
        <div className="wrap">
          <p className="kicker accent scr">Projects</p>
          <h1 className="display-hero kin">Three I&apos;d show you first.</h1>
          <p className="lede">A venture I&apos;m building, my capstone, and a product I shipped on my own. All real, all measured. Everything else is one click away.</p>
          <div className="feat3">
            {featured.map((f, i) => {
              const contain = f.fit === "contain";
              return (
                <XLink key={f.title} href={f.href} className={`card spot tilt f3 up ${i === 0 ? "f3-lead" : ""}`}>
                  <div className="shot f3-shot" style={contain ? { background: "#fff" } : undefined}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={featImg(f.shot)} alt={`${f.title} screen`} loading={i ? "lazy" : "eager"} style={contain ? { objectFit: "contain", padding: 12 } : undefined} />
                  </div>
                  <div className="f3-body">
                    <p className="kicker accent">{f.kicker}</p>
                    <h3>{f.title}</h3>
                    <p className="muted">{f.blurb}</p>
                    <p className="fc-meta">{f.meta}</p>
                    <span className="link">{f.cta} {f.external ? "↗" : "→"}</span>
                  </div>
                </XLink>
              );
            })}
          </div>
        </div>
      </section>

      <ProjectsShowAll total={counts.all} tabs={tabs}>
        <section className="section fg" data-types={groupTypes.pedestal.join(" ")} id="pedestal">
          <div className="wrap">
            <Header eyebrow="My venture" title="Pedestal, the thing I'm building." intro="An AI communication coach for the rooms that decide careers. I build the product end to end: the mobile app, the backend, the coach, and the pitch." />
            <a className="card spot ped" href={pedestal.url} target="_blank" rel="noopener noreferrer">
              <div className="shot ped-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/df/pedestal.jpg" alt="Pedestal landing page" loading="lazy" />
              </div>
              <div className="pad ped-body">
                <p className="kicker accent">{pedestal.role} · <span className="muted">{pedestal.period}</span></p>
                <h3 className="display-lg">{pedestal.name}</h3>
                <p className="ped-tag">{pedestal.tagline}</p>
                <p className="muted">{pedestal.pitch}</p>
                <ul className="dotlist">{pedestal.built.map((b) => <li key={b}>{b}</li>)}</ul>
                <div className="tags">{pedestal.stack.map((s) => <span key={s} className="tag">{s}</span>)}</div>
                <div className="ped-foot"><span className="pill"><span className="pulse"></span>{pedestal.status}</span><span className="link">Visit pedestaltech.dev ↗</span></div>
              </div>
            </a>
          </div>
        </section>

        <section className="section fg" data-types={typesOf(uniLead).join(" ")} id="built">
          <div className="wrap">
            <Header eyebrow="University & personal" title="Built with a team, evaluated honestly." intro="Projects from my Master's at UNSW, and a product I built for myself. Real data, real results, limits stated. Numbers come from the reports. Where a result was negative, it says so." />
            <div className="grid2 pc">{uniLead.map((slug) => <UniCard key={slug} slug={slug} />)}</div>
          </div>
        </section>

        <section className="section fg" data-types={groupTypes.casework.join(" ")} id="casework">
          <div className="wrap">
            <Header eyebrow="Casework" title="Case studies you play, not read." intro="Five core AI PM skills: PRDs, evals, launch plans, risk and safety, and metrics. Each grounded in a real product from a company you know, and turned into a decision you actually make. Unofficial concept work, everything in mock mode." />
            <div className="grid2 cw">
              {caseStudies.map((c, i) => (
                <XLink key={c.slug} href={`${caseworkUrl}/${c.slug}`} className={`card spot up ${i === 0 ? "span2" : ""}`}>
                  <div className={`shot cw-shot ${i === 0 ? "wide" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={dfImg(c.shot ?? `casework-${c.slug}`)} alt={`${c.title} case study screen`} loading="lazy" />
                  </div>
                  <div className="pad">
                    <div className="cw-meta"><span className="kicker accent">{c.skill}</span><span className="muted">{c.company}</span><span className="muted cw-min">~{c.minutes} min</span></div>
                    <h3 className="cw-t">{c.title}</h3>
                    <p className="cw-hook">{c.hook}</p>
                    <p className="muted cw-twist">{c.twist}</p>
                    <span className="link">Play it →</span>
                  </div>
                </XLink>
              ))}
            </div>
          </div>
        </section>

        <section className="section fg" data-types={groupTypes.products.join(" ")} id="products">
          <div className="wrap">
            <Header title="Four AI products, two lenses each." intro="Evaluation, RAG, multimodal, and safe agents. Each one is a working demo, then reads two ways: an engineering case study for how it's built, and a product case study for why. Every demo runs in mock mode, so it works with no API keys." />
            <div className="grid2 pc">
              {projects.map((p) => (
                <article key={p.slug} className="card spot up pcard">
                  <XLink href={`/projects/${p.slug}`} className="shot pc-shot" tabIndex={-1} ariaHidden>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/df/${SHOT[p.slug]}.jpg`} alt="" loading="lazy" />
                  </XLink>
                  <div className="pad pc-body">
                    <div className="pc-top"><span className="kicker accent">{p.category}</span><span className={`status s-${p.status}`}>{STATUS[p.status] || p.status}</span></div>
                    <h3 className="display-lg"><XLink href={`/projects/${p.slug}`}>{p.title}</XLink></h3>
                    <p className="muted">{p.pitch}</p>
                    <div className="tags role">{p.roleSignals.map((r) => <span key={r} className="tag mono">{r}</span>)}</div>
                    <div className="tags">{p.stack.slice(0, 4).map((s) => <span key={s} className="tag">{s}</span>)}</div>
                    <div className="pc-links">
                      <XLink href={`/projects/${p.slug}`} className="link">Case study →</XLink>
                      {p.liveUrl ? <XLink href={p.liveUrl} className="muted plain">Live demo</XLink> : <span className="muted">Demo soon</span>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section fg" data-types={typesOf(SIDE).join(" ")} id="builds">
          <div className="wrap">
            <Header eyebrow="Side builds" title="Smaller things, shipped for fun." intro="Built for myself: a pitch coach, and a music tool because I swim." />
            <div className="grid2 pc">
              <a className="card spot pad up build" data-types={itemTypes["pitchscore-ai"].join(" ")} href={pitchscore.url} target="_blank" rel="noopener noreferrer">
                <p className="kicker accent">Voice AI · web app</p>
                <h3 className="display-lg">{pitchscore.title}</h3>
                <p className="muted">{pitchscore.pitch}</p>
                <div className="tags">{pitchscore.stack.map((s) => <span key={s} className="tag">{s}</span>)}</div>
                <span className="link">View on GitHub ↗</span>
              </a>
              {uniSide.map((slug) => <UniCard key={slug} slug={slug} />)}
            </div>
          </div>
        </section>

        <section className="section fg" data-types={groupTypes.lab.join(" ")} id="lab">
          <div className="wrap">
            <ProjectsLabTeaser />
          </div>
        </section>
      </ProjectsShowAll>
    </div>
  );
}
