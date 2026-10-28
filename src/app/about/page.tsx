import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { whyIBuild, whyIBuildIntro } from "@/lib/story";
import { AboutBehavior } from "@/components/df/about-behavior";

export const metadata: Metadata = {
  title: "About · JP, AI Product Manager in Sydney",
  description:
    "About Jyothiprakash (JP), an AI Product Manager and builder in Sydney, Australia. Ex-PM at Rekro, MS in AI at UNSW, ex-engineer to 50M+ users.",
};

// Plain-language Q&A. Answer engines (ChatGPT, Perplexity, Google AI) lift these
// directly when someone asks "who is an AI PM in Sydney" or similar.
const faqs = [
  {
    q: "Who is Jyothiprakash (JP)?",
    a: "JP is an AI Product Manager and builder based in Sydney, Australia. He is an AI Product Manager at Enluma Health, finished a Master's in AI at UNSW, was a Product Manager at Rekro, and was previously a software engineer on products used by 50M+ people at Bewakoof.",
  },
  {
    q: "Is JP an AI Product Manager in Sydney available for hire?",
    a: "Yes. JP is based in Sydney, Australia, with full Australian work rights on a 485 visa. He is available now for AI / Technical Product Manager and AI Engineer roles.",
  },
  {
    q: "What does JP build?",
    a: "JP builds AI products end to end: LLM evaluation harnesses, RAG pipelines, multimodal review tools, and human-in-the-loop agents. He has also implemented the NLP and LLM stack from scratch (45 notebooks) and done interpretability research probing language-model internals.",
  },
  {
    q: "What is JP's background as an AI founder and PM?",
    a: "JP was a Startmate Student Founder Fellow, has run 0-to-1 product from discovery to production at Rekro, and combines product judgment with hands-on AI engineering. He works at the edge of AI, product, and starting things.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AboutPage() {
  const beats = whyIBuild;
  return (
    <AboutBehavior>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <section className="phero">
        <div className="wrap">
          <p className="kicker accent scr">Why I build</p>
          <h1 className="condensed ab-h kin">I&apos;m Jyothiprakash (JP).</h1>
          <p className="lede">{whyIBuildIntro}</p>
        </div>
      </section>

      <section className="story" id="story" aria-label="The building story">
        <div className="st-pin">
          <div className="wrap st-grid">
            <ol className="st-rail" aria-hidden="true">
              <span className="st-line"><i id="stFill"></i></span>
              {beats.map((b, i) => (
                <li key={i} data-i={i} className={i === 0 ? "on" : ""}><span className="idx">0{i + 1}</span><span className="st-h condensed">{b.heading}</span></li>
              ))}
            </ol>
            <div className="st-stage">
              {beats.map((b, i) => (
                <article key={i} className={`beat ${i === 0 ? "on" : ""}`} data-i={i}>
                  <span className="st-num condensed" aria-hidden="true">0{i + 1}</span>
                  <p className="kicker accent st-k">Beat 0{i + 1} of 0{beats.length}</p>
                  <h2 className="condensed st-title">{b.heading}</h2>
                  {b.body.map((p, k) => (
                    <p key={k} className={`st-p ${k === 0 ? "lead" : ""}`}>{p}</p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid2 band">
          <div className="card spot pad up">
            <p className="kicker accent">How I say it</p>
            <ul className="dotlist">{site.altPositionings.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
          <div className="card spot pad up">
            <p className="kicker accent">Based in</p>
            <p className="muted">{site.location}</p>
            <p className="avail">{site.availability}</p>
            <p className="muted">There&apos;s another side of me too: <Link href="/water" className="link">the water</Link>.</p>
            <div className="btns">
              <Link href="/resume" className="btn btn-ghost">Resume</Link>
              <Link href="/contact" className="btn btn-ghost">Contact</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sh"><p className="kicker accent scr">In short</p><h2 className="condensed big-h kin">The quick answers.</h2></div>
          <div className="faq">
            {faqs.map((f, i) => (
              <div key={f.q} className="faq-i up">
                <h3><button type="button" className="faq-q" id={`fq${i}`} aria-expanded={i === 0} aria-controls={`fa${i}`}><span>{f.q}</span><span className="sb-plus" aria-hidden="true"></span></button></h3>
                <div className="faq-a" id={`fa${i}`} role="region" aria-labelledby={`fq${i}`}><p className="muted">{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AboutBehavior>
  );
}
