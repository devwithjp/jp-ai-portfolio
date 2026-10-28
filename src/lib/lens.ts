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
  title: "Island days",
  kicker: "Film · 16:9",
  length: "0:34",
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
  { slug: "cormorant-snag", title: "Cormorant", place: "Dubare, Karnataka", date: "2017", cat: "wildlife", w: 1919, h: 2400, species: "Phalacrocoracidae" },
  { slug: "vine-snake", title: "Green vine snake", place: "Dandeli, Karnataka", date: "Oct 2018", cat: "wildlife", w: 1601, h: 2001, species: "Ahaetulla nasuta", selected: 0 },
  { slug: "spotted-deer", title: "Chital", place: "Dandeli, Karnataka", date: "Oct 2018", cat: "wildlife", w: 2400, h: 1600, species: "Axis axis" },
  { slug: "golden-orb", title: "Giant golden orb weaver", place: "Western Ghats", date: "Sep 2018", cat: "macro", w: 1920, h: 2400, species: "Nephila pilipes" },
  { slug: "grass-sun", title: "Last light", place: "Dandeli, Karnataka", date: "Oct 2018", cat: "landscape", w: 2400, h: 1600 },
  { slug: "dudhsagar-tunnel", title: "Dudhsagar through the tunnel", place: "Goa–Karnataka border", date: "Oct 2018", cat: "landscape", w: 1919, h: 2400, selected: 19 },
  { slug: "lotus-mahal-arches", title: "Arches, Lotus Mahal", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 1920, h: 2400, selected: 6 },
  { slug: "stepped-tank", title: "Stepped tank", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 2400, h: 1600 },
  { slug: "elephant-stables", title: "Elephant stables", place: "Hampi", date: "Jul 2019", cat: "architecture", w: 2400, h: 1349 },
  { slug: "wave-silhouette", title: "Silver sea", place: "Mangaluru", date: "Aug 2019", cat: "seascape", w: 2400, h: 1600, selected: 12 },
  { slug: "diya", title: "Diya", place: "Karnataka", date: "Dec 2014", cat: "macro", w: 1920, h: 2400 },
  { slug: "peacock-fan", title: "Indian peafowl", place: "Jogimatti", date: "2015", cat: "wildlife", w: 1920, h: 2400, species: "Pavo cristatus", selected: 13 },
  { slug: "peacock-ooty", title: "Indian peafowl", place: "Ooty", date: "2013", cat: "wildlife", w: 1878, h: 2348, species: "Pavo cristatus" },
  { slug: "elephant-herd", title: "Asian elephants", place: "Masinagudi", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1600, species: "Elephas maximus" },
  { slug: "yana-spires", title: "Yana", place: "Uttara Kannada", date: "Nov 2020", cat: "landscape", w: 1920, h: 2400, selected: 18 },
  { slug: "sea-cave-window", title: "Window", place: "Andaman Islands", date: "2023", cat: "adventure", w: 1920, h: 2400, selected: 5 },
  { slug: "natural-bridge", title: "Natural Bridge", place: "Neil Island, Andaman", date: "Apr 2023", cat: "seascape", w: 1920, h: 2400, selected: 9 },
  { slug: "tidepools", title: "Tidepools", place: "Andaman Islands", date: "May 2023", cat: "seascape", w: 2271, h: 1514 },
  { slug: "mangrove", title: "Mangrove", place: "Andaman Islands", date: "Apr 2022", cat: "seascape", w: 2400, h: 1600 },
  { slug: "trees-in-the-tide", title: "Trees in the tide", place: "Andaman Islands", date: "Apr 2022", cat: "seascape", w: 2400, h: 1350, selected: 15 },
  { slug: "forest-mirror", title: "Forest mirror", place: "Andaman Islands", date: "Apr 2022", cat: "landscape", w: 2400, h: 1350 },
  { slug: "valparai-dusk", title: "Valley at dusk", place: "Valparai", date: "Nov 2023", cat: "landscape", w: 2400, h: 1600 },
  { slug: "clownfish", title: "Ocellaris clownfish", place: "Andaman Islands", date: "2023", cat: "underwater", w: 1920, h: 2400, species: "Amphiprion ocellaris", selected: 2 },
  { slug: "wake", title: "Wake", place: "Andaman Sea", date: "Apr 2022", cat: "seascape", w: 1459, h: 1824 },
  { slug: "palm-road", title: "Palm road", place: "Goa", date: "Oct 2021", cat: "landscape", w: 1504, h: 1880 },
  { slug: "toward-the-sun", title: "Toward the sun", place: "Gokarna", date: "Jan 2022", cat: "seascape", w: 2400, h: 1600 },
  { slug: "gaur", title: "Indian gaur", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1599, species: "Bos gaurus", selected: 1 },
  { slug: "vulture-flock", title: "White-rumped vultures", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1350, species: "Gyps bengalensis · Critically Endangered", selected: 3 },
  { slug: "vultures-wings", title: "White-rumped vultures", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1600, species: "Gyps bengalensis · Critically Endangered" },
  { slug: "tusker", title: "Asian elephant", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 1921, h: 2400, species: "Elephas maximus", selected: 10 },
  { slug: "peacock-train", title: "Indian peafowl", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1600, species: "Pavo cristatus" },
  { slug: "peacock-display", title: "Indian peafowl", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 1716, h: 2144, species: "Pavo cristatus" },
  { slug: "deer-and-boar", title: "Chital & Indian wild boar", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2400, h: 1600, species: "Axis axis · Sus scrofa", selected: 16 },
  { slug: "wild-boar", title: "Indian wild boar", place: "Masinagudi, Nilgiris", date: "Jul 2022", cat: "wildlife", w: 2026, h: 1350, species: "Sus scrofa cristatus" },
  { slug: "anthias-whip", title: "Sea goldies", place: "Andaman Islands", date: "", cat: "underwater", w: 864, h: 1080, species: "Pseudanthias squamipinnis" },
  { slug: "barrel-coral", title: "Barrel sponge", place: "Andaman Islands", date: "", cat: "underwater", w: 2400, h: 1600, species: "Xestospongia sp." },
  { slug: "blue-sea-star", title: "Blue sea star", place: "Andaman Islands", date: "", cat: "underwater", w: 905, h: 1131, species: "Linckia laevigata" },
  { slug: "brain-coral", title: "Brain coral", place: "Andaman Islands", date: "", cat: "underwater", w: 1156, h: 1444, species: "Platygyra sp.", selected: 14 },
  { slug: "clownfish-anemone", title: "Clark's anemonefish", place: "Andaman Islands", date: "", cat: "underwater", w: 2400, h: 1600, species: "Amphiprion clarkii" },
  { slug: "clownfish-pair", title: "Clark's anemonefish", place: "Andaman Islands", date: "", cat: "underwater", w: 2400, h: 1600, species: "Amphiprion clarkii" },
  { slug: "crinoid", title: "Feather star", place: "Andaman Islands", date: "", cat: "underwater", w: 1273, h: 1590, species: "Crinoidea" },
  { slug: "feather-star", title: "Feather star", place: "Andaman Islands", date: "", cat: "underwater", w: 1080, h: 1350, species: "Crinoidea" },
  { slug: "fish-school", title: "Fusiliers", place: "Andaman Islands", date: "", cat: "underwater", w: 1728, h: 2160, species: "Caesionidae", selected: 8 },
  { slug: "giant-clam", title: "Giant clam", place: "Andaman Islands", date: "", cat: "underwater", w: 1520, h: 1900, species: "Tridacna sp.", selected: 17 },
  { slug: "moon-jelly", title: "Jellyfish", place: "Andaman Islands", date: "", cat: "underwater", w: 1080, h: 1350, species: "Scyphozoa" },
  { slug: "sea-fan", title: "Sea fan & sea goldies", place: "Andaman Islands", date: "", cat: "underwater", w: 1080, h: 1350, species: "Pseudanthias squamipinnis", selected: 4 },
  { slug: "sea-krait", title: "Banded sea krait", place: "Andaman Islands", date: "", cat: "underwater", w: 2280, h: 1520, species: "Laticauda colubrina" },
  { slug: "staghorn-anthias", title: "Staghorn coral", place: "Andaman Islands", date: "", cat: "underwater", w: 1520, h: 1900, species: "Acropora sp.", selected: 7 },
  { slug: "sweetlips", title: "Titan triggerfish", place: "Andaman Islands", date: "", cat: "underwater", w: 2400, h: 1599, species: "Balistoides viridescens" },
  { slug: "table-coral", title: "Butterflyfish", place: "Andaman Islands", date: "", cat: "underwater", w: 2400, h: 1599, species: "Chaetodon sp.", selected: 11 },
  { slug: "trevally", title: "Trevally", place: "Andaman Islands", date: "", cat: "underwater", w: 2400, h: 1600, species: "Carangidae" },
  { slug: "yellow-snappers", title: "Bluestripe snappers", place: "Andaman Islands", date: "", cat: "underwater", w: 2400, h: 1600, species: "Lutjanus kasmira" },
  { slug: "giant-moray", title: "Giant moray", place: "Andaman Islands", date: "", cat: "underwater", w: 2400, h: 1599, species: "Gymnothorax javanicus" },
  { slug: "moray-crevice", title: "Moray eel", place: "Andaman Islands", date: "", cat: "underwater", w: 1273, h: 1590, species: "Muraenidae" },
  { slug: "clownfish-colony", title: "Ocellaris clownfish", place: "Andaman Islands", date: "", cat: "underwater", w: 2400, h: 1600, species: "Amphiprion ocellaris" },
];

export const selectedPhotos = photos
  .filter((p) => p.selected !== undefined)
  .sort((a, b) => (a.selected ?? 0) - (b.selected ?? 0));
