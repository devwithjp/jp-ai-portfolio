// Lens: photography + short-form reels. Media lives in public/lens/.
// Stills were graded from the RAW/originals; reels are vertical 9:16 cuts.

export type LensCategory = "underwater" | "wildlife" | "seascape" | "landscape" | "architecture" | "macro" | "adventure";

export type LensPhoto = {
  slug: string;
  title: string;
  place: string;
  date: string;
  cat: LensCategory;
  w: number;
  h: number;
  /** order in the Selected work grid; omitted = archive only */
  selected?: number;
};

export type LensReel = {
  slug: string;
  title: string;
  kicker: string;
  length: string;
  place: string;
  /** what the cut demonstrates, for clients */
  craft: string[];
  /** set when the full-quality cut is uploaded to YouTube/Vimeo */
  embed?: string;
};

export const lensIntro =
  "I shoot what I do: freediving, reefs, cliff jumps, roads and the light at the end of the day. Then I cut it fast and grade it until it looks the way it felt.";

export const reels: LensReel[] = [
  {
    slug: "blue",
    title: "Blue",
    kicker: "Underwater",
    length: "0:20",
    place: "Andaman Islands",
    craft: ["Per-shot underwater colour recovery", "Beat-locked cuts and punch-ins", "Split-screen reveals", "Muffled-to-open sound drop"],
  },
  {
    slug: "reef",
    title: "Reef",
    kicker: "Marine life",
    length: "0:12",
    place: "Andaman Islands",
    craft: ["Natural underwater colour, shot by shot", "Subject-first framing at reel speed", "Punch-ins on the beat", "Split-screen schools"],
  },
  {
    slug: "sendit",
    title: "Send it",
    kicker: "Adventure",
    length: "0:14",
    place: "Andaman Islands · Gokarna",
    craft: ["Action timed to the drop", "Speed ramps and whip pans", "Kinetic type", "Photo stop-motion and collage"],
  },
  {
    slug: "golden",
    title: "Golden hour",
    kicker: "Light",
    length: "0:16",
    place: "Andaman · Gokarna · Karnataka",
    craft: ["Stills cut like video", "Grid collages on the beat", "Warm grade matched across cameras", "Build and release pacing"],
  },
];

export const film = {
  slug: "andaman",
  title: "Andaman",
  kicker: "Film · 16:9",
  length: "0:40",
  place: "Andaman Islands",
  blurb: "Roads, reefs, a backflip off the rocks and the light after. One trip, cut to one track.",
  /** set when the full-quality cut is uploaded to YouTube/Vimeo */
  embed: undefined as string | undefined,
};

export const categories: { key: LensCategory; label: string }[] = [
  { key: "wildlife", label: "Wildlife" },
  { key: "seascape", label: "Sea" },
  { key: "landscape", label: "Land" },
  { key: "underwater", label: "Underwater" },
  { key: "architecture", label: "Stone" },
  { key: "macro", label: "Close" },
  { key: "adventure", label: "Adventure" },
];

export const places = ["Andaman Islands", "Neil Island", "Hampi", "Dandeli", "Dubare", "Gokarna", "Masinagudi", "Valparai", "Dudhsagar", "Goa", "Mangaluru", "Yana", "Ooty"];

export const services = [
  { title: "Fast-cut product & brand reels", body: "Vertical-first edits built on the beat: speed ramps, punch-ins, split screens, kinetic type. 6 to 30 seconds, ready for Reels, Shorts and TikTok." },
  { title: "Underwater & action", body: "Freediver-comfortable in open water. GoPro and action-cam rigs for reef, pool and adventure shoots, with proper underwater colour recovery." },
  { title: "Stills & grading", body: "Travel, wildlife and product stills developed from RAW, with one consistent grade across every camera in the shoot." },
];

export const gear = ["GoPro HERO9 Black", "Sony α58", "SJCAM 4K", "Phone (Samsung / OnePlus)", "Edit: DaVinci Resolve, ffmpeg, custom grading"];

export const photos: LensPhoto[] = [
  { slug: "elephants-dawn", title: "Dawn crossing", place: "Dubare, Karnataka", date: "2017", cat: "wildlife", w: 2400, h: 1600, selected: 1 },
  { slug: "mahout-backlight", title: "Morning bath", place: "Dubare, Karnataka", date: "2017", cat: "wildlife", w: 1919, h: 2400, selected: 4 },
  { slug: "trunk-silhouette", title: "Trunk", place: "Dubare, Karnataka", date: "2017", cat: "wildlife", w: 2400, h: 1600 },
  { slug: "cormorant-snag", title: "Lookout", place: "Dubare, Karnataka", date: "2017", cat: "wildlife", w: 1919, h: 2400 },
  { slug: "vine-snake", title: "Vine snake", place: "Dandeli, Karnataka", date: "Oct 2018", cat: "wildlife", w: 1840, h: 2300, selected: 0 },
  { slug: "spotted-deer", title: "Spotted deer", place: "Dandeli, Karnataka", date: "Oct 2018", cat: "wildlife", w: 2400, h: 1600 },
  { slug: "golden-orb", title: "Golden orb weaver", place: "Western Ghats", date: "Sep 2018", cat: "macro", w: 1920, h: 2400 },
  { slug: "grass-sun", title: "Last light", place: "Dandeli, Karnataka", date: "Oct 2018", cat: "landscape", w: 2400, h: 1600 },
  { slug: "dudhsagar-tunnel", title: "Dudhsagar through the tunnel", place: "Goa\u2013Karnataka border", date: "Oct 2018", cat: "landscape", w: 1919, h: 2400, selected: 11 },
  { slug: "lotus-mahal-arches", title: "Arches, Lotus Mahal", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 1920, h: 2400, selected: 3 },
  { slug: "stepped-tank", title: "Stepped tank", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 2400, h: 1600 },
  { slug: "elephant-stables", title: "Elephant stables", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 2400, h: 1349 },
  { slug: "wave-silhouette", title: "Silver sea", place: "Mangaluru", date: "Aug 2019", cat: "seascape", w: 2400, h: 1600, selected: 7 },
  { slug: "diya", title: "Diya", place: "Karnataka", date: "Dec 2014", cat: "macro", w: 1920, h: 2400 },
  { slug: "peacock-fan", title: "Display", place: "Jogimatti", date: "2015", cat: "wildlife", w: 1920, h: 2400, selected: 8 },
  { slug: "peacock-ooty", title: "Peacock", place: "Ooty", date: "2013", cat: "wildlife", w: 1878, h: 2348 },
  { slug: "elephant-herd", title: "The herd", place: "Masinagudi", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1600 },
  { slug: "yana-spires", title: "Yana", place: "Uttara Kannada", date: "Nov 2020", cat: "landscape", w: 1920, h: 2400, selected: 10 },
  { slug: "sea-cave-window", title: "Window", place: "Andaman Islands", date: "2023", cat: "adventure", w: 1920, h: 2400, selected: 2 },
  { slug: "natural-bridge", title: "Natural Bridge", place: "Neil Island, Andaman", date: "Apr 2023", cat: "seascape", w: 1920, h: 2400, selected: 5 },
  { slug: "tidepools", title: "Tidepools", place: "Andaman Islands", date: "May 2023", cat: "seascape", w: 2400, h: 1600 },
  { slug: "mangrove", title: "Mangrove", place: "Andaman Islands", date: "Apr 2022", cat: "seascape", w: 2400, h: 1600 },
  { slug: "trees-in-the-tide", title: "Trees in the tide", place: "Andaman Islands", date: "Apr 2022", cat: "seascape", w: 2400, h: 1350, selected: 9 },
  { slug: "forest-mirror", title: "Forest mirror", place: "Andaman Islands", date: "Apr 2022", cat: "landscape", w: 2400, h: 1350 },
  { slug: "valparai-dusk", title: "Valley at dusk", place: "Valparai", date: "Nov 2023", cat: "landscape", w: 2400, h: 1600 },
  { slug: "clownfish", title: "Clownfish", place: "Andaman Islands", date: "2023", cat: "underwater", w: 1920, h: 2400, selected: 6 },
  { slug: "wake", title: "Wake", place: "Andaman Sea", date: "Apr 2022", cat: "seascape", w: 1459, h: 1824 },
  { slug: "palm-road", title: "Palm road", place: "Goa", date: "Oct 2021", cat: "landscape", w: 1504, h: 1880 },
  { slug: "toward-the-sun", title: "Toward the sun", place: "Gokarna", date: "Jan 2022", cat: "seascape", w: 2400, h: 1600 },
];

export const selectedPhotos = photos
  .filter((p) => p.selected !== undefined)
  .sort((a, b) => (a.selected ?? 0) - (b.selected ?? 0));
