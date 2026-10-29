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
  /** scientific name, shown with the common name on wildlife frames */
  species?: string;
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
    length: "0:18",
    place: "Andaman Islands",
    craft: ["Per-shot underwater colour recovery", "Beat-locked cuts and punch-ins", "Split-screen reveals", "Muffled-to-open sound drop"],
  },
  {
    slug: "reef",
    title: "Reef",
    kicker: "Marine life",
    length: "0:13",
    place: "Andaman Islands",
    craft: ["Natural underwater colour, shot by shot", "Subject-first framing at reel speed", "Punch-ins on the beat", "Split-screen schools"],
  },
  {
    slug: "sendit",
    title: "Send it",
    kicker: "Adventure",
    length: "0:16",
    place: "Andaman Islands · Gokarna",
    craft: ["Action timed to the drop", "Speed ramps and whip pans", "Kinetic type", "Photo stop-motion and collage"],
  },
  {
    slug: "golden",
    title: "Golden hour",
    kicker: "Light",
    length: "0:14",
    place: "Andaman · Gokarna · Karnataka",
    craft: ["Stills cut like video", "Grid collages on the beat", "Warm grade matched across cameras", "Build and release pacing"],
  },
];

export const film = {
  slug: "andaman",
  title: "Island days",
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

export const places = ["Andaman Islands", "Neil Island", "Hampi", "Dandeli", "Gokarna", "Masinagudi", "Valparai", "Dudhsagar", "Goa", "Mangaluru", "Yana", "Ooty"];

export const services = [
  { title: "Fast-cut product & brand reels", body: "Vertical-first edits built on the beat: speed ramps, punch-ins, split screens, kinetic type. 6 to 30 seconds, ready for Reels, Shorts and TikTok." },
  { title: "Underwater & action", body: "Freediver-comfortable in open water. GoPro and action-cam rigs for reef, pool and adventure shoots, with proper underwater colour recovery." },
  { title: "Stills & grading", body: "Travel, wildlife and product stills developed from RAW, with one consistent grade across every camera in the shoot." },
];

export const gear = ["GoPro HERO9 Black", "Sony α58", "SJCAM 4K", "Phone (Samsung / OnePlus)", "Edit: DaVinci Resolve, ffmpeg, custom grading"];

export const photos: LensPhoto[] = [
  { slug: "heron-snag", title: "Asian openbill at first light", place: "Dubare, Karnataka", date: "2017", cat: "wildlife", w: 2400, h: 1602, species: "Anastomus oscitans", selected: 8 },
  { slug: "dawn-snags", title: "Drowned forest, sunrise", place: "Dubare, Karnataka", date: "2017", cat: "landscape", w: 2400, h: 1602, selected: 12 },
  { slug: "sun-snag", title: "Still water, low sun", place: "Dubare, Karnataka", date: "2017", cat: "landscape", w: 1602, h: 2400 },
  { slug: "anthias-reef", title: "Anthias reef", place: "Andaman Islands", date: "2023", cat: "underwater", w: 1920, h: 1080, species: "Pseudanthias squamipinnis", selected: 35 },
  { slug: "chital-stag", title: "Chital stag", place: "Ooty", date: "2018", cat: "wildlife", w: 2027, h: 2400, species: "Axis axis", selected: 20 },
  { slug: "storm-lit-flats", title: "Storm light on the flats", place: "Andaman Islands", date: "Apr 2022", cat: "seascape", w: 2400, h: 1350, selected: 32 },
  { slug: "golden-ripples", title: "Golden ripples", place: "Andaman Islands", date: "Apr 2022", cat: "seascape", w: 2400, h: 1350 },
  { slug: "boats-gold-hour", title: "Boats at gold hour", place: "Andaman Islands", date: "Apr 2022", cat: "seascape", w: 2400, h: 1350, selected: 11 },
  { slug: "dudhsagar-falls", title: "Dudhsagar falls", place: "Goa", date: "Oct 2018", cat: "landscape", w: 2400, h: 1602, selected: 26 },
  { slug: "pillared-ruin", title: "Pillared ruin", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 2400, h: 1602, selected: 19 },
  { slug: "hampi-gateway", title: "Stone gateway", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 2400, h: 1602 },
  { slug: "stair-silhouette", title: "Into the light", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 1863, h: 2400, selected: 4 },
  { slug: "boulder-lookout", title: "Boulder country", place: "Hampi", date: "Jul 2019", cat: "adventure", w: 2400, h: 1426 },
  { slug: "carved-mandapa", title: "Carved mandapa", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 2400, h: 1602 },
  { slug: "cormorant-snag", title: "Cormorant", place: "Dubare, Karnataka", date: "2017", cat: "wildlife", w: 1919, h: 2400, species: "Phalacrocoracidae" },
  { slug: "vine-snake", title: "Green vine snake", place: "Dandeli, Karnataka", date: "Oct 2018", cat: "wildlife", w: 1601, h: 2001, species: "Ahaetulla nasuta", selected: 0 },
  { slug: "spotted-deer", title: "Chital", place: "Dandeli, Karnataka", date: "Oct 2018", cat: "wildlife", w: 2400, h: 1600, species: "Axis axis" },
  { slug: "golden-orb", title: "Giant golden orb weaver", place: "Western Ghats", date: "Sep 2018", cat: "macro", w: 1920, h: 2400, species: "Nephila pilipes" },
  { slug: "grass-sun", title: "Last light", place: "Dandeli, Karnataka", date: "Oct 2018", cat: "landscape", w: 2400, h: 1600 },
  { slug: "dudhsagar-tunnel", title: "Dudhsagar through the tunnel", place: "Goa–Karnataka border", date: "Oct 2018", cat: "landscape", w: 1919, h: 2400, selected: 3 },
  { slug: "lotus-mahal-arches", title: "Arches, Lotus Mahal", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 1920, h: 2400, selected: 2 },
  { slug: "stepped-tank", title: "Stepped tank", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 2400, h: 1600 },
  { slug: "elephant-stables", title: "Elephant stables", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 2400, h: 1349 },
  { slug: "wave-silhouette", title: "Silver sea", place: "Mangaluru", date: "Aug 2019", cat: "seascape", w: 2400, h: 1600, selected: 18 },
  { slug: "diya", title: "Diya", place: "Karnataka", date: "Dec 2014", cat: "macro", w: 1920, h: 2400 },
  { slug: "peacock-fan", title: "Indian peafowl", place: "Jogimatti", date: "2015", cat: "wildlife", w: 1920, h: 2400, species: "Pavo cristatus", selected: 7 },
  { slug: "peacock-ooty", title: "Indian peafowl", place: "Ooty", date: "2013", cat: "wildlife", w: 1878, h: 2348, species: "Pavo cristatus" },
  { slug: "elephant-herd", title: "Asian elephants", place: "Masinagudi", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1600, species: "Elephas maximus" },
  { slug: "yana-spires", title: "Yana", place: "Uttara Kannada", date: "Nov 2020", cat: "landscape", w: 1920, h: 2400, selected: 21 },
  { slug: "sea-cave-window", title: "Window", place: "Andaman Islands", date: "2023", cat: "adventure", w: 1920, h: 2400, selected: 14 },
  { slug: "tidepools", title: "Tidepools", place: "Andaman Islands", date: "May 2023", cat: "seascape", w: 2271, h: 1514 },
  { slug: "mangrove", title: "Mangrove", place: "Andaman Islands", date: "Apr 2022", cat: "seascape", w: 2400, h: 1600 },
  { slug: "trees-in-the-tide", title: "Trees in the tide", place: "Andaman Islands", date: "Apr 2022", cat: "seascape", w: 2400, h: 1350, selected: 38 },
  { slug: "clownfish", title: "Ocellaris clownfish", place: "Andaman Islands", date: "2023", cat: "underwater", w: 1440, h: 1800, species: "Amphiprion ocellaris", selected: 1 },
  { slug: "gaur", title: "Indian gaur", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1599, species: "Bos gaurus", selected: 5 },
  { slug: "vulture-flock", title: "White-rumped vultures", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1350, species: "Gyps bengalensis · Critically Endangered", selected: 33 },
  { slug: "vultures-wings", title: "White-rumped vultures", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1600, species: "Gyps bengalensis · Critically Endangered" },
  { slug: "tusker", title: "Asian elephant", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 1921, h: 2400, species: "Elephas maximus", selected: 13 },
  { slug: "peacock-train", title: "Indian peafowl", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1600, species: "Pavo cristatus" },
  { slug: "deer-and-boar", title: "Chital & Indian wild boar", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1600, species: "Axis axis · Sus scrofa", selected: 27 },
  { slug: "wild-boar", title: "Indian wild boar", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2026, h: 1350, species: "Sus scrofa cristatus" },
  { slug: "barrel-coral", title: "Barrel sponge", place: "Andaman Islands", date: "", cat: "underwater", w: 2400, h: 1600, species: "Xestospongia sp." },
  { slug: "blue-sea-star", title: "Blue sea star", place: "Andaman Islands", date: "", cat: "underwater", w: 905, h: 1131, species: "Linckia laevigata" },
  { slug: "brain-coral", title: "Brain coral", place: "Andaman Islands", date: "", cat: "underwater", w: 1156, h: 1444, species: "Platygyra sp." },
  { slug: "crinoid", title: "Feather star", place: "Andaman Islands", date: "", cat: "underwater", w: 1273, h: 1590, species: "Crinoidea" },
  { slug: "feather-star", title: "Feather star", place: "Andaman Islands", date: "", cat: "underwater", w: 1080, h: 1350, species: "Crinoidea" },
  { slug: "fish-school", title: "Fusiliers", place: "Andaman Islands", date: "", cat: "underwater", w: 1728, h: 2160, species: "Caesionidae", selected: 10 },
  { slug: "sea-fan", title: "Sea fan & sea goldies", place: "Andaman Islands", date: "", cat: "underwater", w: 1080, h: 1350, species: "Pseudanthias squamipinnis", selected: 17 },
  { slug: "sea-krait", title: "Banded sea krait", place: "Andaman Islands", date: "", cat: "underwater", w: 2280, h: 1520, species: "Laticauda colubrina" },
  { slug: "staghorn-anthias", title: "Staghorn coral", place: "Andaman Islands", date: "", cat: "underwater", w: 1520, h: 1900, species: "Acropora sp.", selected: 6 },
  { slug: "sweetlips", title: "Titan triggerfish", place: "Andaman Islands", date: "", cat: "underwater", w: 2000, h: 1333, species: "Balistoides viridescens" },
  { slug: "table-coral", title: "Butterflyfish", place: "Andaman Islands", date: "", cat: "underwater", w: 2400, h: 1599, species: "Chaetodon sp.", selected: 29 },
  { slug: "trevally", title: "Trevally", place: "Andaman Islands", date: "", cat: "underwater", w: 2400, h: 1600, species: "Carangidae" },
  // from Instagram (JP's own edits)
  { slug: "pink-driftwood", title: "Driftwood at dusk", place: "Andaman Islands", date: "Jan 2024", cat: "seascape", w: 1078, h: 565, selected: 23 },
  { slug: "valley-dusk", title: "Valley at last light", place: "India", date: "Jan 2024", cat: "landscape", w: 1078, h: 565, selected: 16 },
  { slug: "mountain-wildflowers", title: "Wildflowers under the range", place: "India", date: "May 2025", cat: "landscape", w: 1440, h: 1800, selected: 30 },
  { slug: "ocean-pool", title: "Ocean pool", place: "Sydney", date: "May 2025", cat: "seascape", w: 1440, h: 1800, selected: 25 },
  { slug: "beached-boat", title: "Low tide, last light", place: "Andaman Islands", date: "Mar 2023", cat: "seascape", w: 1440, h: 1080, selected: 24 },
  { slug: "moon-boat", title: "Moonlight on the bay", place: "Andaman Islands", date: "Apr 2023", cat: "seascape", w: 1440, h: 754, selected: 28 },
  { slug: "rainbow-surf", title: "Rainbow over the break", place: "Sydney", date: "May 2025", cat: "seascape", w: 1440, h: 1800, selected: 9 },
  { slug: "arch-window", title: "Window in the rock", place: "Andaman Islands", date: "Mar 2024", cat: "adventure", w: 1080, h: 1350, selected: 22 },
  { slug: "harbour-fireworks", title: "New Year over the harbour", place: "Sydney", date: "Jan 2025", cat: "landscape", w: 1440, h: 640, selected: 15 },
  { slug: "eucalypt-sunset", title: "Sun down behind the gums", place: "Sydney", date: "2026", cat: "landscape", w: 2400, h: 1350 },
  { slug: "blue-break", title: "Blue break", place: "Sydney", date: "2026", cat: "seascape", w: 2400, h: 1350 },
  { slug: "rockpool-light", title: "Rock pools, low sun", place: "Sydney", date: "2026", cat: "seascape", w: 1440, h: 1800, selected: 34 },
  { slug: "cliff-gold", title: "Cliffs under a gold sky", place: "Sydney", date: "2026", cat: "seascape", w: 2334, h: 1311, selected: 36 },
  { slug: "boardwalk-dusk", title: "Boardwalk at dusk", place: "Sydney", date: "2026", cat: "landscape", w: 2361, h: 1325, selected: 31 },
  { slug: "sunburst-pine", title: "Sunburst and pine", place: "Sydney", date: "2026", cat: "landscape", w: 1440, h: 1800 },
  { slug: "harbour-afterglow", title: "Harbour afterglow", place: "Sydney", date: "2026", cat: "landscape", w: 2394, h: 1347, selected: 37 },
];

export const selectedPhotos = photos
  .filter((p) => p.selected !== undefined)
  .sort((a, b) => (a.selected ?? 0) - (b.selected ?? 0));
export const archivePhotos = photos.filter((p) => p.selected === undefined);
