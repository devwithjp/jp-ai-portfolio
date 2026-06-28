// Personal narrative, "Why I Build" and "Water". Voice: plain and declarative.
// Short sentences. Concrete details. No marketing adjectives.

export type Beat = { heading: string; body: string[] };

export const whyIBuildIntro =
  "I've wanted to build things for as long as I can remember, first with code, then with product, startups, and AI.";

export const whyIBuild: Beat[] = [
  {
    heading: "Early ambition",
    body: [
      "I grew up in Bangalore, where it felt like everyone was building something. I wanted something of my own before I really knew what that meant.",
      "I studied computer science because it looked like the shortest path to making things, not because I wanted to be an engineer.",
    ],
  },
  {
    heading: "What changed",
    body: [
      "I tried to start a company before I graduated: an “Uber for trucks” for small and mid-size factories. YC rejected it. It made their top 10% of rejections, which I've decided to count as an encouraging signal. Mostly it was the first time I thought past the code to the actual problem.",
      "Then I spent a couple of years as a software engineer, most of it at Bewakoof, where the listing, product, and homepage flows I built were used by 50 million people. I led the frontend for a gift-card launch that lifted revenue 65% in a festive spike, and shipped Shopping in Hindi. That taught me the thing I keep relearning: products don't win on engineering. They win on understanding people, design, positioning, trust, and knowing what's worth building.",
    ],
  },
  {
    heading: "Where I'm going",
    body: [
      "I moved to Sydney for a master's in AI at UNSW, mostly to see where the technology was heading. I got pulled into the founder world: a Startmate Founder Fellowship, the Peter Farrell Cup pitch competition, late nights at UNSW Founders. Humbling, in a useful way.",
      "Somewhere in there my ambition quietly changed. I stopped wanting a purely technical role. I spent most of 2025 as a Product Manager at Rekro, leading a six-person engineering team and taking a 0→1 product from discovery to ship. It made the thing obvious: I don't just like coding. I like building, deciding what's worth making, then making it. That's the thread now, AI, product, and starting things.",
    ],
  },
];

export const waterIntro = "Water has shaped me more than almost anything outside of work.";

export const water: string[] = [
  "I started swimming as a kid, but I only knew the shallow version of it, fun, familiar, feet near the floor. That changed after a long post-Covid month in Gokarna. A lifeguard friend took me out past the point where you can stand. That was when I fell for the deep.",
  "It took me to the Andaman Islands, where I learned to dive, trained up to rescue diver, and started freediving. Along the way I noticed something: plenty of people can swim. Far fewer are actually comfortable in water.",
  "That stuck with me when I moved to Sydney and started teaching at In The Deep Swim School. Their whole approach is comfort before performance, help kids feel safe, and the skill follows. It matched exactly what I'd seen in the ocean.",
  "I teach children aged 3 to 10. Watching a nervous kid go from gripping the wall to diving for a high-five never gets old. It keeps proving the same point: confidence comes before skill, not after.",
  "Teaching swimming turned out to be a masterclass in things I use everywhere, patience, calm, earning trust, and guiding someone through fear instead of forcing them through it.",
];

export const waterHighlights: string[] = [
  "Swimming since childhood",
  "SSI certified Rescue Diver",
  "Dived the Andaman Islands",
  "Trained in freediving",
  "Swim teacher in Sydney (In The Deep)",
  "Taught children aged 3 to 10",
];

export const waterQuote = "You don't force someone through fear. You guide them through it.";
