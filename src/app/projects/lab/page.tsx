import type { Metadata } from "next";
import Link from "next/link";
import { labIntro, labBody, packs, labVerify, labRepo, interp } from "@/lib/lab";
import { LabRoot } from "@/components/df/lab-root";

export const metadata: Metadata = {
  title: "Lab · interpretability research + NLP/LLM from scratch",
  description:
    "Interpretability research (activation probing with TransformerLens) plus 45 from-scratch NLP and LLM notebooks, a regex tokenizer to RLHF.",
};

const allTopics = packs.flatMap((p) => p.topics);
const half = Math.ceil(allTopics.length / 2);
const strip = (arr: string[]) => [...arr, ...arr];

function List({ items }: { items: string[] }) {
  return (
    <ul className="dotlist">
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}

export default function LabPage() {
  return (
    <LabRoot>
      <section className="phero lab-hero">
        <canvas className="fx lab-fx" id="labfx" aria-hidden="true" />
        <div className="wrap">
          <p className="kicker accent scr">Lab · from scratch</p>
          <h1 className="condensed kin lab-h1">{labIntro}</h1>
          <div className="lab-body">
            {labBody.map((p, i) => (
              <p className="lede" key={i}>{p}</p>
            ))}
          </div>
          <div className="lab-cta">
            <a href={labRepo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Code on GitHub <span className="arr">↗</span>
            </a>
            <Link href="/projects" className="btn btn-ghost">
              See the products <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="lab-stats" aria-label="The Lab in numbers">
        <div className="wrap">
          <div className="ls-main">
            <span className="condensed ls-big" data-count="45">45</span>
            <span className="ls-cap kicker accent">Notebooks, tokenizer to RLHF</span>
          </div>
          <div className="ls-side">
            <div><span className="condensed ls-n" data-count="232">232</span><span className="kicker">Cells</span></div>
            <div><span className="condensed ls-n" data-count="0">0</span><span className="kicker">Syntax errors</span></div>
            <div><span className="condensed ls-n" data-count="2">2</span><span className="kicker">Packs</span></div>
          </div>
        </div>
      </section>

      <section className="interp" id="interp">
        <div className="wrap">
          <div className="ip-stage" id="ipStage">
            <div className="ip-left">
              <p className="kicker accent"><span className="idx">01</span> <span className="scr">{interp.eyebrow}</span></p>
              <h2 className="condensed kin ip-title">{interp.title}</h2>
              <p className="interp-frame">{interp.framing}</p>
              <div className="interp-body">
                {interp.body.map((p, i) => (
                  <p key={i} className={i ? "" : "ip-first"}>{p}</p>
                ))}
              </div>
            </div>
            <div className="ip-right">
              <div className="ip-hint kicker" aria-hidden="true"><span id="ipStep">Method</span><i></i><span>Scroll</span></div>
              <div className="slides">
                <div className="card spot pad ip-card ip-m"><p className="kicker accent">Step 1</p><h3 className="ic-t">How we tested it</h3><List items={interp.method} /></div>
                <div className="card spot pad ip-card ip-f"><p className="kicker accent">Step 2</p><h3 className="ic-t">What we found</h3><List items={interp.findings} /></div>
              </div>
            </div>
          </div>
          <div className="ip-stats">
            <div className="up"><span className="condensed big-s">0.975</span><span className="kicker">Peak linear-probe accuracy</span></div>
            <div className="up"><span className="condensed big-s">5</span><span className="kicker">Models probed</span></div>
            <div className="up"><span className="condensed big-s">L8 to 12</span><span className="kicker">Where the signal peaks</span></div>
            <div className="up"><span className="condensed big-s">+0.14</span><span className="kicker">Shift from causal patching</span></div>
          </div>
          <div className="tags interp-skills up">
            {interp.skills.map((s) => (
              <span className="tag" key={s}>{s}</span>
            ))}
          </div>
          <p className="interp-take up">{interp.takeaway}</p>
        </div>
      </section>

      <section className="marq" aria-hidden="true">
        <div className="mq-row" id="mq1">
          <div>{strip(allTopics.slice(0, half)).map((t, i) => <span key={i}>{t}</span>)}</div>
        </div>
        <div className="mq-row mq-alt" id="mq2">
          <div>{strip(allTopics.slice(half)).map((t, i) => <span key={i}>{t}</span>)}</div>
        </div>
      </section>

      <section className="section packs">
        <div className="wrap">
          <div className="sh">
            <p className="kicker accent"><span className="idx">02</span> <span className="scr">The notebooks</span></p>
            <h2 className="condensed kin pk-title">Two packs, 45 notebooks.</h2>
          </div>
          <div className="grid2 pk-grid">
            {packs.map((p) => (
              <article className="card spot pad up pk" key={p.name}>
                <div className="pk-top">
                  <span className="condensed pk-n" data-count={parseInt(p.count, 10)}>{parseInt(p.count, 10)}</span>
                  <span className="pk-lbl"><span className="kicker accent">{p.count}</span><h3 className="pk-name">{p.name}</h3></span>
                </div>
                <p className="muted">{p.blurb}</p>
                <div className="toks">
                  {p.topics.map((t, i) => (
                    <span className="tok" key={t} style={{ "--i": i } as React.CSSProperties}>{t}</span>
                  ))}
                </div>
                <a href={labRepo} target="_blank" rel="noopener noreferrer" className="link">Open on GitHub ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section verify">
        <div className="wrap">
          <div className="card spot pad up vf">
            <p className="kicker accent">Verification</p>
            <h3 className="condensed vf-t">Does it actually run</h3>
            <p className="muted">{labVerify}</p>
          </div>
        </div>
      </section>
    </LabRoot>
  );
}
