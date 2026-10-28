// Pedestal: JP's own venture. An AI communication coach for high-stakes rooms.
// Facts come from the Pedestal repo (STATUS.md, docs/). Voice: plain, no em dashes.

export const pedestal = {
  name: "Pedestal",
  url: "https://pedestaltech.dev",
  // TODO(JP): confirm the title and start date.
  role: "Co-founder",
  period: "Jun 2026 - Present",
  tagline: "The private practice room before your high-stakes room.",
  pitch:
    "Rehearse the interview, the pitch, or the hard conversation out loud. Pedestal gives feedback on what you said, how you sounded, and how you showed up, picks one weakness, hands you a drill, and puts take one next to take two.",
  status: "In build · early access waitlist open",
  built: [
    "Flutter app for iOS and Android: 14 scenarios, 34 drills, and the full record, feedback, drill, retake loop, verified on both platforms.",
    "Supabase backend with six edge functions and row level security on every table. Raw video never leaves the phone.",
    "A coach quality lab: deterministic metric tiers, DSPy few-shot compilation, and DeepEval rubrics behind a live quality gate.",
    "User interviews, positioning, pricing, the waitlist site, and the pitch at the UNSW Peter Farrell Cup 2026.",
  ],
  stack: ["Flutter", "Supabase", "Deno edge functions", "DSPy", "DeepEval", "Next.js"],
  shot: "/shots/pedestal.jpg",
};
