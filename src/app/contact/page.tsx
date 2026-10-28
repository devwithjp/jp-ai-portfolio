import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactBehavior } from "@/components/df/contact-behavior";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}, ${site.role}.`,
};

export default function ContactPage() {
  return (
    <ContactBehavior email={site.email}>
      <section className="ct-screen">
        <div className="wrap ct-top">
          <p className="kicker accent scr">Contact</p>
          <h1 className="condensed ct-h" id="ctH">Let&apos;s talk</h1>
          <p className="lede">Open to AI / Technical Product Manager and AI Engineer / Applied AI roles. The fastest way to reach me is email.</p>
          <p className="ct-pill"><span className="pill"><span className="pulse"></span>{site.availability}</span></p>
        </div>

        <div className="wrap ct-grid">
          <div className="card spot tilt pad up">
            <p className="kicker accent">Email</p>
            <p className="ct-big" id="ctMail">{site.email}</p>
            <p className="muted">Select it, or copy it with one click.</p>
            <div className="btns"><button type="button" className="btn btn-primary" id="copyBtn">Copy email</button></div>
          </div>
          <div className="card spot tilt pad up">
            <p className="kicker accent">LinkedIn</p>
            <p className="ct-big">Say hello</p>
            <p className="muted">Best for a quick intro or a longer conversation.</p>
            <div className="btns">
              <a href={site.links.linkedin} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Connect <span className="arr">↗</span></a>
            </div>
          </div>
          <div className="card spot tilt pad up">
            <p className="kicker accent">GitHub</p>
            <p className="ct-big">Read the code</p>
            <p className="muted">The projects on this site, with the source behind them.</p>
            <div className="btns">
              <a href={site.links.github} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">View code <span className="arr">↗</span></a>
            </div>
          </div>
        </div>
      </section>
    </ContactBehavior>
  );
}
