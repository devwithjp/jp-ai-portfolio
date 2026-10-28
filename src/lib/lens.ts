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
  { slug: "elephants-dawn", title: "Dawn crossing", place: "Dubare, Karnataka", date: "2017", cat: "wildlife", w: 2400, h: 1600, selected: 3 },
  { slug: "mahout-backlight", title: "Morning bath", place: "Dubare, Karnataka", date: "2017", cat: "wildlife", w: 1919, h: 2400, selected: 9 },
  { slug: "trunk-silhouette", title: "Trunk", place: "Dubare, Karnataka", date: "2017", cat: "wildlife", w: 2400, h: 1600 },
  { slug: "cormorant-snag", title: "Lookout", place: "Dubare, Karnataka", date: "2017", cat: "wildlife", w: 1919, h: 2400 },
  { slug: "vine-snake", title: "Vine snake", place: "Dandeli, Karnataka", date: "Oct 2018", cat: "wildlife", w: 1601, h: 2001, selected: 0 },
  { slug: "spotted-deer", title: "Spotted deer", place: "Dandeli, Karnataka", date: "Oct 2018", cat: "wildlife", w: 2400, h: 1600 },
  { slug: "golden-orb", title: "Golden orb weaver", place: "Western Ghats", date: "Sep 2018", cat: "macro", w: 1920, h: 2400 },
  { slug: "grass-sun", title: "Last light", place: "Dandeli, Karnataka", date: "Oct 2018", cat: "landscape", w: 2400, h: 1600 },
  { slug: "dudhsagar-tunnel", title: "Dudhsagar through the tunnel", place: "Goa–Karnataka border", date: "Oct 2018", cat: "landscape", w: 1919, h: 2400, selected: 19 },
  { slug: "lotus-mahal-arches", title: "Arches, Lotus Mahal", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 1920, h: 2400, selected: 7 },
  { slug: "stepped-tank", title: "Stepped tank", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 2400, h: 1600 },
  { slug: "elephant-stables", title: "Elephant stables", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 2400, h: 1349 },
  { slug: "wave-silhouette", title: "Silver sea", place: "Mangaluru", date: "Aug 2019", cat: "seascape", w: 2400, h: 1600, selected: 13 },
  { slug: "diya", title: "Diya", place: "Karnataka", date: "Dec 2014", cat: "macro", w: 1920, h: 2400 },
  { slug: "peacock-fan", title: "Display", place: "Jogimatti", date: "2015", cat: "wildlife", w: 1920, h: 2400, selected: 14 },
  { slug: "peacock-ooty", title: "Peacock", place: "Ooty", date: "2013", cat: "wildlife", w: 1878, h: 2348 },
  { slug: "elephant-herd", title: "The herd", place: "Masinagudi", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1600 },
  { slug: "yana-spires", title: "Yana", place: "Uttara Kannada", date: "Nov 2020", cat: "landscape", w: 1920, h: 2400, selected: 18 },
  { slug: "sea-cave-window", title: "Window", place: "Andaman Islands", date: "2023", cat: "adventure", w: 1920, h: 2400, selected: 5 },
  { slug: "natural-bridge", title: "Natural Bridge", place: "Neil Island, Andaman", date: "Apr 2023", cat: "seascape", w: 1920, h: 2400, selected: 10 },
  { slug: "tidepools", title: "Tidepools", place: "Andaman Islands", date: "May 2023", cat: "seascape", w: 2271, h: 1514 },
  { slug: "mangrove", title: "Mangrove", place: "Andaman Islands", date: "Apr 2022", cat: "seascape", w: 2400, h: 1600 },
  { slug: "trees-in-the-tide", title: "Trees in the tide", place: "Andaman Islands", date: "Apr 2022", cat: "seascape", w: 2400, h: 1350, selected: 15 },
  { slug: "forest-mirror", title: "Forest mirror", place: "Andaman Islands", date: "Apr 2022", cat: "landscape", w: 2400, h: 1350 },
  { slug: "valparai-dusk", title: "Valley at dusk", place: "Valparai", date: "Nov 2023", cat: "landscape", w: 2400, h: 1600 },
  { slug: "clownfish", title: "Clownfish", place: "Andaman Islands", date: "2023", cat: "underwater", w: 1920, h: 2400 },
  { slug: "wake", title: "Wake", place: "Andaman Sea", date: "Apr 2022", cat: "seascape", w: 1459, h: 1824 },
  { slug: "palm-road", title: "Palm road", place: "Goa", date: "Oct 2021", cat: "landscape", w: 1504, h: 1880 },
  { slug: "toward-the-sun", title: "Toward the sun", place: "Gokarna", date: "Jan 2022", cat: "seascape", w: 2400, h: 1600 },
  { slug: "gaur", title: "Gaur", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1599, selected: 1 },
  { slug: "vulture-flock", title: "The gathering", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1350 },
  { slug: "vultures-wings", title: "Vultures", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1600, selected: 6 },
  { slug: "tusker", title: "Tusker", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 1921, h: 2400, selected: 11 },
  { slug: "peacock-train", title: "Train", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1600 },
  { slug: "peacock-display", title: "Display", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 1716, h: 2144 },
  { slug: "deer-and-boar", title: "Standoff", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1600, selected: 16 },
  { slug: "wild-boar", title: "Wild boar", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2026, h: 1350 },
  { slug: "anthias-whip", title: "Anthias", place: "Andaman Islands", date: "2022", cat: "underwater", w: 864, h: 1080 },
  { slug: "barrel-coral", title: "Barrel sponge", place: "Andaman Islands", date: "2022", cat: "underwater", w: 2400, h: 1600 },
  { slug: "blue-sea-star", title: "Blue sea star", place: "Andaman Islands", date: "2023", cat: "underwater", w: 905, h: 1131 },
  { slug: "brain-coral", title: "Brain coral", place: "Andaman Islands", date: "2023", cat: "underwater", w: 1156, h: 1444 },
  { slug: "clownfish-anemone", title: "Anemone", place: "Andaman Islands", date: "2022", cat: "underwater", w: 2400, h: 1600 },
  { slug: "clownfish-pair", title: "Clownfish", place: "Andaman Islands", date: "2022", cat: "underwater", w: 2400, h: 1600, selected: 2 },
  { slug: "crinoid", title: "Feather star", place: "Andaman Islands", date: "2023", cat: "underwater", w: 1273, h: 1590 },
  { slug: "feather-star", title: "Crinoid", place: "Andaman Islands", date: "2023", cat: "underwater", w: 1080, h: 1350 },
  { slug: "fish-school", title: "School", place: "Andaman Islands", date: "2022", cat: "underwater", w: 1728, h: 2160, selected: 8 },
  { slug: "giant-clam", title: "Giant clam", place: "Andaman Islands", date: "2023", cat: "underwater", w: 1520, h: 1900, selected: 17 },
  { slug: "moon-jelly", title: "Moon jelly", place: "Andaman Islands", date: "2023", cat: "underwater", w: 1080, h: 1350 },
  { slug: "sea-fan", title: "Sea fan", place: "Andaman Islands", date: "2023", cat: "underwater", w: 1080, h: 1350, selected: 4 },
  { slug: "sea-krait", title: "Banded sea krait", place: "Andaman Islands", date: "2023", cat: "underwater", w: 2280, h: 1520 },
  { slug: "staghorn-anthias", title: "Staghorn", place: "Andaman Islands", date: "2023", cat: "underwater", w: 1520, h: 1900 },
  { slug: "sweetlips", title: "Sweetlips", place: "Andaman Islands", date: "2022", cat: "underwater", w: 2400, h: 1599 },
  { slug: "table-coral", title: "Table coral", place: "Andaman Islands", date: "2022", cat: "underwater", w: 2400, h: 1599, selected: 12 },
  { slug: "trevally", title: "Trevally", place: "Andaman Islands", date: "2022", cat: "underwater", w: 2400, h: 1600 },
  { slug: "yellow-snappers", title: "Yellow snappers", place: "Andaman Islands", date: "2022", cat: "underwater", w: 2400, h: 1600 },
];

export const selectedPhotos = photos
  .filter((p) => p.selected !== undefined)
  .sort((a, b) => (a.selected ?? 0) - (b.selected ?? 0));
