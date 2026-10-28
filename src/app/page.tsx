import Link from "next/link";
import { site } from "@/lib/site";
import { featured } from "@/lib/featured";
import { education, reforge } from "@/lib/resume";
import type { Course } from "@/lib/types";
import { HomeHero, FeaturedStack } from "@/components/df/home-motion";

// Recruiter-critical facts, shown as a bare credential strip under the hero.
const FACTS: [string, React.ReactNode][] = [
  ["Now", "AI PM, Enluma Health"],
  ["Before", <>Engineer, <span data-count="50" data-suffix="M+">50M+</span> users</>],
  ["Study", "MS in AI, UNSW, 2026"],
  ["Rights", "Full AU work rights, 485"],
];

const DEGREES = education.filter((e) => e.id !== "udacity");

const COURSES = [
  { title: reforge.name, note: `Full feature lifecycle · ${reforge.completed}`, href: "/resume#reforge" },
  { title: "Machine Learning, Andrew Ng", note: "Coursera", href: "/resume#certifications" },
  { title: "UX Design + Front-End Developer", note: "Udacity Nanodegrees · 2020", href: "/resume#udacity" },
  { title: "Leadership Foundations + Strategic Thinking", note: "UNSW · AGSM", href: "/resume#certifications" },
];

const ELSEWHERE = [
  { href: "/skills", label: "Skills", note: "Every skill, and where" },
  { href: "/about", label: "About", note: "How I got here" },
  { href: "/writing", label: "Writing", note: "Notes on building" },
  { href: "/resume", label: "Resume", note: "The one-page version" },
];

const groups = (courses: Course[]) => [...new Set(courses.map((c) => c.group))];

export default function Home() {
  return (
    <div className="p-home">
      <HomeHero facts={FACTS} />

      <section className="section" id="work">
        <div className="wrap">
          <div className="sh-row">
            <h2 className="display-xl kin">The work, in short.</h2>
            <Link className="link" href="/projects">All projects →</Link>
          </div>
          <FeaturedStack>
            {featured.map((w, i) => {
              const inner = (
                <>
                  <div className="fc-text">
                    <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                    <p className="kicker accent">{w.kicker}</p>
                    <h3>{w.title}</h3>
                    <p className="muted">{w.blurb}</p>
                    <p className="fc-meta">{w.meta}</p>
                    <span className="btn btn-ghost fc-cta">{w.cta} <span className="arr">→</span></span>
                  </div>
                  <div className="shot fc-shot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={w.shot} alt={`${w.title} screenshot`} loading="lazy" style={w.fit === "contain" ? { objectFit: "contain" } : undefined} />
                  </div>
                </>
              );
              return (
                <article className="fcard-wrap" key={w.title}>
                  {w.external
                    ? <a className="card fcard spot" href={w.href} target="_blank" rel="noopener noreferrer">{inner}</a>
                    : <Link className="card fcard spot" href={w.href}>{inner}</Link>}
                </article>
              );
            })}
          </FeaturedStack>
        </div>
      </section>

      <section className="section" id="education">
        <div className="wrap">
          <div className="sh-row">
            <div className="sh"><p className="kicker accent scr">Education</p><h2 className="display-xl kin">Two degrees, and the courses between.</h2></div>
            <Link className="link" href="/skills">What each one taught me →</Link>
          </div>
          <div className="edu">
            <div className="edu-degrees">
              {DEGREES.map((d) => (
                <Link key={d.id} href={`/resume#${d.id}`} className="card spot pad up edu-card">
                  <div className="edu-top"><span className="link-c">{d.org}</span>{d.period && <span className="kicker">{d.period}</span>}</div>
                  <h3>{d.title}</h3>
                  {d.points.map((p) => <p className="muted" key={p}>{p}</p>)}
                  {d.courses && (
                    <div className="cgs">
                      {groups(d.courses).map((g) => (
                        <div className="cg" key={g}>
                          <p className="kicker accent">{g}</p>
                          <p className="muted">{d.courses!.filter((c) => c.group === g).map((c) => c.title).join(" · ")}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
            <div className="card pad up edu-courses">
              <p className="kicker">Courses + programs</p>
              <ul>
                {COURSES.map((c) => (
                  <li key={c.title}><Link href={c.href}><span>{c.title}</span><span className="muted">{c.note}</span></Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="desk">
        <div className="wrap desk">
          <p className="kicker accent scr">Away from the desk</p>
          <p className="desk-line rv">I freedive, and I teach kids to swim in Sydney. It has taught me a lot about patience, and about helping someone through something they&apos;re scared of.</p>
          <Link className="link" href="/water">Read the water chapter →</Link>
        </div>
      </section>

      <section className="section" id="close">
        <div className="wrap close">
          <div>
            <h2 className="display-xl kin">Building something? Let&apos;s talk.</h2>
            <p className="lede">I&apos;m JP, open to AI product and engineering roles, and to people building things worth building.</p>
            <div className="btns close-ctas">
              <Link className="btn btn-primary" href="/contact">Get in touch <span className="arr">→</span></Link>
              <a className="link" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="link" href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
          <nav className="elsewhere" aria-label="More">
            {ELSEWHERE.map((e) => (
              <Link key={e.href} href={e.href} className="up">
                <span className="el-l">{e.label}</span><span className="muted">{e.note}</span><span className="el-a" aria-hidden="true">→</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}
