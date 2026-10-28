// "University & hardware" — coursework and side builds. Voice: plain, declarative, no em dashes.
// Every number below is taken from the project's own report or docs.

export type UniProject = {
  slug: string;
  title: string;
  kind: string; // course code or "Personal"
  blurb: string;
  details: string[];
  stack: string[];
  shot: string;
  shotAlt: string;
  githubUrl?: string;
};

export const uniProjects: UniProject[] = [
  {
    slug: "smartcare-imu",
    title: "SmartCare: mobility monitoring from wearable data",
    kind: "UNSW COMP9900 · Capstone · Team of six",
    blurb:
      "Care staff need an early, explainable warning when an older adult's mobility declines. We built the full stack: upload IMU data, classify activity, track a personal baseline, and raise a risk alert.",
    details: [
      "Pipeline: resample 50 to 30 Hz, quality gate, 135 features per window, an MLP activity classifier with a documented heuristic fallback.",
      "Explainable risk: an alert fires when a change from the person's own baseline holds, 20% for 3 days or 35% for 7 days. Low-coverage days are suppressed instead of guessed.",
      "On the UCI HAPT subject-disjoint test set (4,093 windows): accuracy 0.884, macro-F1 0.774. No clinical accuracy is claimed. HAPT is not older-adult data, so history is simulated.",
    ],
    stack: ["React", "FastAPI", "Supabase / PostgreSQL", "PyTorch", "Docker Compose"],
    shot: "/uni/smartcare-architecture.png",
    shotAlt: "System overview: simulated IMU data to a training notebook, trained models, a FastAPI backend with PostgreSQL, and a React dashboard",
  },
  {
    slug: "germination-chamber",
    title: "Mini Germination Chamber",
    kind: "UNSW COMP6733 · IoT Design Studio · Team project",
    blurb:
      "Manual germination checks are infrequent and subjective. This chamber photographs seedlings every 30 minutes and links each germination event to the conditions that produced it.",
    details: [
      "Raspberry Pi hub running Home Assistant and an MQTT broker. Two ESP32-CAM nodes, an Arduino Nano 33 BLE for temperature, humidity, pressure and light, soil sensors, an LED strip and a heat pad.",
      "Germination is counted from each image with a vision model, using only detections at 90% confidence or higher.",
      "Six batches compared with 8 seeds each. The dark, warm, moist batch had all 8 germinated by day 3. The bright, cold, dry batch started on day 4 and reached 6 by day 6.",
      "Things that broke and got fixed: soil sensor drift (per-sensor calibration), video over MQTT (moved to snapshots), lens condensation (a 3D-printed case), campus WiFi (own hotspot).",
    ],
    stack: ["ESP32 / Arduino", "Raspberry Pi", "MQTT", "Home Assistant", "Python", "OpenSCAD"],
    shot: "/uni/germination-chamber.jpg",
    shotAlt: "The germination chamber: a seedling tray under a clear dome with an LED strip, sensors and microcontrollers",
    githubUrl: "https://github.com/devwithjp/iot-seedgerm",
  },
  {
    slug: "health-aware-recipes",
    title: "Health-aware recipe recommendation",
    kind: "UNSW COMP9727 · Recommender Systems · Team project",
    blurb:
      "Rank 10 unseen recipes per user, then ask whether you can nudge people toward healthier choices without wrecking relevance. I built the nutrition-aware recommender and the final integration.",
    details: [
      "Compared popularity, TF-IDF content ranking, neural collaborative filtering, a nutrition re-ranker and four hybrids on Food.com data: 44,405 recipes, 5,000 users, 99.94% sparse.",
      "TF-IDF won on NDCG@10 (0.0178). The tuned hybrid kept most of that (0.0157) while lifting coverage from 0.019 to 0.130 and nutrition fit from 0.617 to 0.634.",
      "The nutrition-only re-ranker did not move nutrition fit at all. We report that as a negative result, and flag that the hybrid weights were tuned on the test split.",
    ],
    stack: ["Python", "TF-IDF", "Neural CF", "Reciprocal rank fusion", "Jupyter"],
    shot: "/uni/recipe-model-comparison.png",
    shotAlt: "Bar chart comparing NDCG@10, coverage and nutrition fit across eight recommenders",
  },
  {
    slug: "gitit",
    title: "gitit: Reddit for repos and agent skills",
    kind: "Personal · Product + engineering",
    blurb:
      "Describe a problem and get ranked GitHub repos, agent skills or MCP servers, with the reasons people voted the way they did. Install the winner from Claude Code, Codex, Cursor or the terminal.",
    details: [
      "A pnpm monorepo: Next.js app and API, a core ranking package, an MCP server, a CLI and a Claude Code plugin.",
      "Ranking blends relevance (0.45), community votes (0.30), repo health (0.15) and popularity (0.10). Votes decay on a 180-day half-life, and every downvote has to carry a reason.",
      "Switching GitHub ingestion from REST to batched GraphQL took it from about 1,666 to 89,408 repos an hour, a 54x gain that made a full backfill a matter of hours.",
    ],
    stack: ["Next.js", "TypeScript", "Postgres + pgvector", "Drizzle", "MCP"],
    shot: "/uni/gitit-what-you-want.png",
    shotAlt: "Hand-drawn slide: what you actually want to know is whether it still works, whether it broke for anyone, and whether it works in your setup",
  },
  {
    slug: "poolside",
    title: "Poolside: music for swimming earphones",
    kind: "Personal · Tool",
    blurb:
      "Bone-conduction swim earphones are a USB drive with no app. Poolside turns a YouTube Music link into files that sound right underwater and copies them over safely.",
    details: [
      "Downloads whole playlists, converts to FLAC or 320 kb/s MP3, and matches loudness to -16 LUFS. Swim EQ presets come with a gain-matched A/B check.",
      "USB copy is SHA-256 verified and never overwrites. Deletes go to a recoverable trash.",
      "Ten weekly picks every Monday morning, and a DJ-style set builder that reads tempo, key and energy.",
    ],
    stack: ["Python", "yt-dlp", "FFmpeg", "Vanilla JS", "systemd"],
    shot: "/uni/poolside-studio.png",
    shotAlt: "Poolside's studio screen with a link box, selection panel and swim kit status",
  },
];
