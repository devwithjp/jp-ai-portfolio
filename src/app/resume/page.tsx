import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import {
  resumeSummary,
  experience,
  education,
  certifications,
  skillGroups,
  resumeBulletsAiEngineer,
  resumeBulletsAiPm,
  reforge,
} from "@/lib/resume";
import { ResumeBehavior } from "@/components/df/resume-behavior";

export const metadata: Metadata = {
  title: "Resume",
  description: resumeSummary,
};

function Head({ idx, eyebrow, title, intro }: { idx: string; eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="sh">
      <p className="kicker accent"><span className="idx">{idx}</span> <span className="scr">{eyebrow}</span></p>
      <h2 className="condensed big-h kin">{title}</h2>
      {intro ? <p className="lede">{intro}</p> : null}
    </div>
  );
}

function Courses({ courses }: { courses: NonNullable<(typeof education)[number]["courses"]> }) {
  const groups = [...new Set(courses.map((c) => c.group))];
  return (
    <>
      {groups.map((g) => (
        <div className="cg" key={g}>
          <p className="kicker accent">{g}</p>
          <div className="tags cloud">
            {courses.filter((c) => c.group === g).map((c) => (
              <span className="tag chip" key={c.code} title={c.topics.join(" · ")} tabIndex={0}>{c.title}</span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default function ResumePage() {
  return (
    <ResumeBehavior>
      <section className="phero">
        <div className="wrap">
          <p className="kicker accent scr">Resume</p>
          <h1 className="condensed r-h kin">AI Product Manager who still builds.</h1>
          <p className="lede">{resumeSummary}</p>
          <p className="r-pill"><span className="pill"><span className="pulse"></span>{site.availability}</span></p>
          <div className="btns">
            <a href="/jp-resume.pdf" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Download CV (PDF) <span className="arr">↗</span></a>
            <a href={site.links.linkedin} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <Link href="/contact" className="btn btn-ghost">Contact</Link>
          </div>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="wrap">
          <Head idx="01" eyebrow="Experience" title="Where I've built." />
          <div className="tl" id="tl">
            <span className="tl-line"><i id="tlFill"></i></span>
            {experience.map((e) => (
              <div className="tl-e" id={e.id} key={e.id}>
                <span className="tl-dot"></span>
                <div className="card spot pad">
                  <span className="tl-per mono">{e.period}</span>
                  <h3 className="condensed tl-co">{e.org || e.title}</h3>
                  <p className="tl-role">
                    {e.title}
                    {e.link ? <> · <a href={e.link} className="link" target="_blank" rel="noopener noreferrer">Visit ↗</a></> : null}
                  </p>
                  {e.points?.length ? (
                    <ul className="dotlist">{e.points.map((p, j) => <li key={j}>{p}</li>)}</ul>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid2 edu">
          <div>
            <Head idx="02" eyebrow="Education" title="Foundations." />
            <div className="edu-list">
              {education.map((e, i) => (
                <div className="card spot pad up" id={e.id} key={e.id}>
                  <div className="tl-top"><h3>{e.title}</h3>{e.period ? <span className="mono">{e.period}</span> : null}</div>
                  {e.org ? <p className="muted">{e.org}</p> : null}
                  {(e.points || []).map((p, j) => <p className="muted" key={j}>{p}</p>)}
                  {e.courses?.length ? (
                    <>
                      <button type="button" className="cbtn" aria-expanded="false" aria-controls={`cw${i}`}><span className="cbtn-t">Show coursework</span><span className="sb-plus" aria-hidden="true"></span></button>
                      <div className="cw" id={`cw${i}`}><Courses courses={e.courses} /></div>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
            <div id="certifications" className="certs up">
              <p className="kicker accent">Certifications + programs</p>
              <ul className="dotlist">{certifications.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          </div>
          <div>
            <Head idx="03" eyebrow="Skills" title="What I work with." />
            <div className="skills">
              {skillGroups.map((g) => (
                <div className="sg" key={g.label}>
                  <p className="kicker accent">{g.label}</p>
                  <div className="tags">{g.items.map((s) => <span className="tag chip" key={s}>{s}</span>)}</div>
                </div>
              ))}
            </div>
            <Link href="/skills" className="link sk-link">Every skill, and where I used it →</Link>
          </div>
        </div>
      </section>

      <section className="section" id="reforge">
        <div className="wrap">
          <Head idx="04" eyebrow="Product craft" title="What I learned at Reforge." intro={reforge.blurb} />
          <div className="grid2 rf">
            {reforge.learned.map((m) => (
              <div className="card spot tilt pad up" key={m.h}><p className="kicker accent">{m.h}</p><p className="muted">{m.d}</p></div>
            ))}
          </div>
          <div className="btns rf-foot">
            <a href={reforge.certHref} className="btn btn-primary" target="_blank" rel="noopener noreferrer">View certificate <span className="arr">↗</span></a>
            <span className="mono muted">{reforge.name} · {reforge.completed}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Head idx="05" eyebrow="From the projects" title="Bullet-ready, if you're skimming." intro="The four AI products on this site, distilled into CV lines." />
          <div className="grid2 bl">
            <div className="up"><p className="kicker accent">AI Product</p><ul className="dotlist">{resumeBulletsAiPm.map((b, i) => <li key={i}>{b}</li>)}</ul></div>
            <div className="up"><p className="kicker accent">AI Engineering</p><ul className="dotlist">{resumeBulletsAiEngineer.map((b, i) => <li key={i}>{b}</li>)}</ul></div>
          </div>
        </div>
      </section>
    </ResumeBehavior>
  );
}
