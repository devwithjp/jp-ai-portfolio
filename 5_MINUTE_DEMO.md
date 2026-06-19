# 5-Minute Demo Script

Adds depth and the "why" behind each build.

1. **Positioning (20s).** Home page. "AI Product Engineer — I sit in the overlap: scope an ambiguous AI opportunity, build it, evaluate whether it works, and explain the trade-offs to both engineers and stakeholders."

2. **AgentEval Studio (75s).** Run a sample suite.
   - "Deterministic checks (schema, must-include, regex) run first — free, and they catch the obvious failures before any paid model call."
   - "Then an LLM-as-judge — Claude Haiku — scores relevance, faithfulness, safety, with a confidence label. I surface judge/check disagreement rather than hiding it."
   - "Per-run latency and cost are tracked, so quality is never judged in isolation."
   - "The headline is a **release gate**: ship or hold against a threshold. That turns a vibes-based decision into a measured one."

3. **SignalDesk AI (75s).** Analyze sample feedback.
   - "Classic RAG: ingest → embed → cluster → retrieve → generate. Mock mode uses deterministic hashing vectors so it runs with no key."
   - Open **Ask** → ask a question → "answers are grounded in retrieved feedback with citations."
   - **Generate PRD** → "every recommendation cites at least two real user quotes — that guardrail is the whole value of an evidence-first tool."
   - Roadmap + experiments → "opportunity scoring drives a Now/Next/Later roadmap."

4. **ScreenSense QA (45s).** Pick a rubric → Analyze.
   - "Multimodal critique with a strict JSON contract — severity-ranked findings, each with a concrete fix. A PM gets a ranked backlog, not an essay. Confidence labels keep it honest."

5. **WorkflowPilot (60s).** Propose a plan.
   - "Goal → proposed tool-call plan. In live mode Claude proposes the calls via real tool-use — and they're intercepted, never auto-executed."
   - Approve some, uncheck a tool in safety settings, execute → "approved-and-allowed steps run against mock tools; the disallowed one is blocked and logged. Failures aren't auto-retried — they surface with a rollback suggestion."
   - Show the audit trail. "Approval gate, permissions, audit, rollback — that's the product."

6. **Close (15s).** "All mock-first so the demos never break. Each has a PRD, a metric framework, and an engineering + product case study. Where would you like to go deeper?"
