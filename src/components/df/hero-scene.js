// Home hero, in 3D: seminal AI papers spiral up around a Pedestal plinth while sea turtles,
// mantas, a humpback and a school of fish swim through. Creatures are smooth, softly lit
// organic forms; their swimming is a vertex wave in the shader, not rigid parts.
// Interaction: the cursor is a current (papers drift and spin, animals steer away, the school
// scatters), hovering a paper shows what it is, clicking opens it on arXiv, clicking open
// water sends a gust, scrolling lifts the scene away.
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reduced, touchOnly, cssVar as css, onTheme } from "./motion";

gsap.registerPlugin(ScrollTrigger);

const PAPERS = [
  ["Attention Is All You Need", "Vaswani et al.", 2017, "1706.03762"],
  ["BERT: Pre-training of Deep Bidirectional Transformers", "Devlin et al.", 2018, "1810.04805"],
  ["Language Models are Few-Shot Learners", "Brown et al.", 2020, "2005.14165"],
  ["Efficient Estimation of Word Representations in Vector Space", "Mikolov et al.", 2013, "1301.3781"],
  ["Deep Residual Learning for Image Recognition", "He et al.", 2015, "1512.03385"],
  ["Training language models to follow instructions with human feedback", "Ouyang et al.", 2022, "2203.02155"],
  ["Scaling Laws for Neural Language Models", "Kaplan et al.", 2020, "2001.08361"],
  ["Chain-of-Thought Prompting Elicits Reasoning in Large Language Models", "Wei et al.", 2022, "2201.11903"],
  ["Sequence to Sequence Learning with Neural Networks", "Sutskever et al.", 2014, "1409.3215"],
  ["Neural Machine Translation by Jointly Learning to Align and Translate", "Bahdanau et al.", 2014, "1409.0473"],
  ["Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", "Lewis et al.", 2020, "2005.11401"],
  ["Adam: A Method for Stochastic Optimization", "Kingma and Ba", 2014, "1412.6980"],
];

const T = { value: 0 }; // shared clock for every swimming shader
const rnd = (a, b) => a + Math.random() * (b - a);

// A material whose vertices swim. mode 0: side-to-side wave (fish), 1: up-down wave (whale),
// 2: wing flap across the span (manta). Head is at +x.
function swimMat(color, { mode = 0, amp = 0.1, freq = 3, k = 4, head = 0.5, len = 1, span = 1, phase = 0, rough = 0.55, metal = 0.05, map = null, instanced = false, top = null, belly = null, stripes = 0 } = {}) {
  const m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, map, side: THREE.DoubleSide });
  m.userData.u = { uAmp: { value: amp }, uFreq: { value: freq }, uK: { value: k }, uHead: { value: head }, uLen: { value: len }, uSpan: { value: span }, uPhase: { value: phase }, uMode: { value: mode },
    uTop: { value: new THREE.Color(top ?? color) }, uBelly: { value: new THREE.Color(belly ?? color) }, uStripes: { value: stripes }, uPattern: { value: top ? 1 : 0 } };
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, m.userData.u, { uT: T });
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", `#include <common>
        uniform float uT, uAmp, uFreq, uK, uHead, uLen, uSpan, uPhase; uniform int uMode;
        varying vec3 vLocal; varying float vPh;
        ${instanced ? "attribute float aPhase;" : ""}`)
      .replace("#include <begin_vertex>", `#include <begin_vertex>
        float ph = uPhase ${instanced ? "+ aPhase" : ""};
        vLocal = position; vPh = ph;
        float sx = clamp((uHead - position.x) / uLen, 0.0, 1.0);
        if (uMode == 0) transformed.z += sin(uT * uFreq - sx * uK + ph) * uAmp * pow(sx, 1.7);
        else if (uMode == 1) transformed.y += sin(uT * uFreq - sx * uK + ph) * uAmp * pow(sx, 2.0);
        else { float a = abs(position.z) / uSpan; transformed.y += sin(uT * uFreq - a * 1.6 + ph) * uAmp * pow(a, 1.5); transformed.x -= pow(a, 2.0) * abs(sin(uT * uFreq + ph)) * uAmp * 0.25; }`);
    // Two-tone pattern: dark back, pale belly (countershading), optional stripes along the back.
    sh.fragmentShader = sh.fragmentShader
      .replace("#include <common>", `#include <common>
        uniform vec3 uTop, uBelly; uniform float uStripes; uniform int uPattern; varying vec3 vLocal; varying float vPh;`)
      .replace("#include <color_fragment>", `#include <color_fragment>
        if (uPattern == 1) {
          float back = smoothstep(-0.04, 0.06, vLocal.y);
          vec3 c = mix(uBelly, uTop, back);
          if (uStripes > 0.0) {
            float st = smoothstep(0.55, 0.75, sin(vLocal.x * uStripes + vPh * 0.7) * 0.5 + 0.5);
            c = mix(c, uTop * 0.55, st * smoothstep(-0.02, 0.05, vLocal.y) * 0.85);
          }
          diffuseColor.rgb = c;
        }`);
  };
  return m;
}

// Body of revolution along x (head at +x), from a radius profile s: 0 tail .. 1 head.
function lathe(L, R, prof, seg = 28, steps = 40) {
  const pts = [];
  for (let i = 0; i <= steps; i++) { const s = i / steps; pts.push(new THREE.Vector2(Math.max(R * prof(s), 0.0008), -L / 2 + s * L)); }
  const g = new THREE.LatheGeometry(pts, seg); g.rotateZ(-Math.PI / 2); return g;
}
const ellipsoid = (sx, sy, sz, x = 0, y = 0, z = 0) => { const g = new THREE.SphereGeometry(1, 20, 14); g.scale(sx, sy, sz); g.translate(x, y, z); return g; };

/* ---------------- creatures ---------------- */
function makeFishGeo() {
  const body = lathe(1, 0.15, (s) => Math.pow(Math.sin(Math.PI * Math.min(1, s * 0.92 + 0.08)), 0.8) * (0.35 + 0.65 * s));
  body.scale(1, 1, 0.5);
  const sh = new THREE.Shape(); sh.moveTo(-0.44, 0); sh.lineTo(-0.66, 0.17); sh.quadraticCurveTo(-0.58, 0, -0.66, -0.17); sh.closePath();
  const tail = new THREE.ShapeGeometry(sh);
  return { body, tail };
}

function makeWhale(color) {
  const L = 4.2, g = new THREE.Group();
  const mat = swimMat(color, { mode: 1, amp: 0.35, freq: 1.1, k: 3, head: L / 2, len: L, rough: 0.6, top: 0x456a73, belly: 0xc8dcdc });
  const body = lathe(L, 0.5, (s) => Math.pow(Math.sin(Math.PI * Math.min(1, s * 0.9 + 0.1)), 0.7) * (0.25 + 0.75 * Math.pow(s, 0.6)));
  body.scale(1, 0.85, 1);
  g.add(new THREE.Mesh(body, mat));
  // Flukes, horizontal at the tail.
  const fs = new THREE.Shape(); fs.moveTo(0, 0); fs.quadraticCurveTo(-0.25, 0.55, -0.55, 0.75); fs.quadraticCurveTo(-0.3, 0.2, -0.22, 0); fs.quadraticCurveTo(-0.3, -0.2, -0.55, -0.75); fs.quadraticCurveTo(-0.25, -0.55, 0, 0);
  const fl = new THREE.ShapeGeometry(fs); fl.rotateX(Math.PI / 2); fl.translate(-L / 2 + 0.05, 0, 0);
  g.add(new THREE.Mesh(fl, mat));
  // Long humpback pectoral fins.
  [-1, 1].forEach((s) => { const f = ellipsoid(0.75, 0.04, 0.16); f.rotateY(s * 0.6); f.rotateX(s * 0.5); f.translate(0.75, -0.25, s * 0.55); g.add(new THREE.Mesh(f, mat)); });
  // A small dorsal hump.
  g.add(new THREE.Mesh(ellipsoid(0.16, 0.08, 0.04, -0.7, 0.4, 0), mat));
  return { g, speed: 0.45, size: L };
}

function makeManta(color) {
  const SPAN = 1.6, g = new THREE.Group();
  const front = (a) => 0.25 - 0.5 * Math.pow(Math.max(0, a - 0.12) / 0.88, 1.8);
  const back = (a) => { const w = -0.12 - 0.13 * a * a * a, k = Math.min(1, Math.max(0, (a - 0.08) / 0.24)), sm = k * k * (3 - 2 * k); return -0.55 * (1 - sm) + w * sm; };
  // Planform in (x = head direction, y = span) then laid flat; span ends up on z.
  const sh = new THREE.Shape(), N = 50;
  for (let i = 0; i <= N; i++) { const u = -1 + (i / N) * 2; const x = front(Math.abs(u)) * SPAN, y = u * SPAN; i ? sh.lineTo(x, y) : sh.moveTo(x, y); }
  for (let i = N; i >= 0; i--) { const u = -1 + (i / N) * 2; sh.lineTo(back(Math.abs(u)) * SPAN, u * SPAN); }
  const geo = new THREE.ExtrudeGeometry(sh, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 4, curveSegments: 4, steps: 1 });
  geo.rotateX(-Math.PI / 2);
  const mat = swimMat(color, { mode: 2, amp: 0.45, freq: 1.5, span: SPAN, rough: 0.5, top: 0x3c5f67, belly: 0xe3eeee });
  g.add(new THREE.Mesh(geo, mat));
  [-1, 1].forEach((s) => g.add(new THREE.Mesh(ellipsoid(0.16, 0.04, 0.05, 0.42, 0, s * 0.16), mat)));
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.02, 1.2, 6).rotateZ(Math.PI / 2).translate(-1.3, 0, 0), mat);
  g.add(tail);
  return { g, speed: 0.6, size: SPAN * 2 };
}

function makeShark() {
  const L = 3.4, g = new THREE.Group();
  const mat = swimMat(0x8fb0b8, { mode: 0, amp: 0.22, freq: 2.4, k: 3.2, head: L / 2, len: L, rough: 0.42, top: 0x8aa9b1, belly: 0xf1f7f7 });
  mat.emissive = new THREE.Color(0x12343b);
  // Torpedo body: pointed snout, thick middle, narrow tail stock.
  const body = lathe(L, 0.36, (s) => Math.pow(Math.sin(Math.PI * Math.min(1, s * 0.94 + 0.06)), 0.85) * (s > 0.86 ? Math.pow((1 - s) / 0.14, 0.55) : 1) * (0.25 + 0.75 * Math.min(1, s * 1.6)));
  body.scale(1, 0.92, 0.82);
  g.add(new THREE.Mesh(body, mat));
  // Dorsal fin.
  const df = new THREE.Shape(); df.moveTo(0.35, 0); df.quadraticCurveTo(0.05, 0.25, -0.18, 0.62); df.quadraticCurveTo(-0.12, 0.25, -0.35, 0); df.closePath();
  const dg = new THREE.ShapeGeometry(df); dg.translate(0.1, 0.28, 0); g.add(new THREE.Mesh(dg, mat));
  // Crescent tail, upper lobe longer.
  const tf = new THREE.Shape(); tf.moveTo(0, 0); tf.quadraticCurveTo(-0.2, 0.35, -0.55, 0.85); tf.quadraticCurveTo(-0.3, 0.3, -0.28, 0); tf.quadraticCurveTo(-0.3, -0.2, -0.45, -0.5); tf.quadraticCurveTo(-0.15, -0.25, 0, 0);
  const tg = new THREE.ShapeGeometry(tf); tg.translate(-L / 2 + 0.08, 0, 0); g.add(new THREE.Mesh(tg, mat));
  // Pectoral fins swept back.
  [-1, 1].forEach((s) => { const f = ellipsoid(0.42, 0.03, 0.14); f.rotateY(s * 0.9); f.rotateX(s * 0.35); f.translate(0.45, -0.18, s * 0.38); g.add(new THREE.Mesh(f, mat)); });
  return { g, mat };
}

function shellTexture(base, line) {
  const c = document.createElement("canvas"); c.width = c.height = 512;
  const x = c.getContext("2d");
  const grd = x.createRadialGradient(256, 256, 40, 256, 256, 300); grd.addColorStop(0, base); grd.addColorStop(1, line);
  x.fillStyle = grd; x.fillRect(0, 0, 512, 512);
  // Scutes: a loose hexagon pattern with soft, hand-drawn edges.
  x.strokeStyle = line; x.lineWidth = 7; x.lineJoin = "round"; x.globalAlpha = 0.7;
  const R = 62;
  for (let row = -1; row < 6; row++) for (let col = -1; col < 6; col++) {
    const cx = col * R * 1.72 + (row % 2 ? R * 0.86 : 0) + 30, cy = row * R * 1.5 + 30;
    x.beginPath();
    for (let k = 0; k <= 6; k++) { const a = Math.PI / 6 + (k * Math.PI) / 3; const j = 1 + (Math.sin(cx * 7 + cy * 3 + k) * 0.06); x.lineTo(cx + Math.cos(a) * R * j, cy + Math.sin(a) * R * j); }
    x.stroke();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function makeTurtle(shell, skin, line) {
  const g = new THREE.Group();
  const skinMat = new THREE.MeshStandardMaterial({ color: skin, roughness: 0.7 });
  const shellGeo = new THREE.SphereGeometry(1, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2); shellGeo.scale(0.95, 0.36, 0.75);
  g.add(new THREE.Mesh(shellGeo, new THREE.MeshStandardMaterial({ map: shellTexture(shell, line), roughness: 0.45 })));
  const plast = new THREE.CircleGeometry(1, 36); plast.rotateX(Math.PI / 2); plast.scale(0.92, 1, 0.72);
  g.add(new THREE.Mesh(plast, skinMat));
  g.add(new THREE.Mesh(ellipsoid(0.3, 0.2, 0.2, 1.08, 0.04, 0), skinMat));
  // Flippers on pivots so they can row.
  const flips = [];
  [[0.45, 0.62, 0.75, 0.18], [-0.6, 0.5, 0.36, 0.12]].forEach(([px, pz, l, w], front) => {
    [-1, 1].forEach((s) => {
      const piv = new THREE.Group(); piv.position.set(px, -0.02, s * pz);
      const f = new THREE.Mesh(ellipsoid(l, 0.035, w, -l * 0.15, 0, s * l * 0.7), skinMat); f.rotation.y = s * (front ? 0.5 : -0.4);
      piv.add(f); g.add(piv); flips.push({ piv, s, front: !front });
    });
  });
  g.scale.setScalar(0.95);
  return { g, speed: 0.35, size: 2, flips };
}

/* ---------------- papers and plinth ---------------- */
const PAPER = "#f2f7f7", PAPER_INK = "#0b2530";
function paperTexture([title, auth, year]) {
  const c = document.createElement("canvas"); c.width = 384; c.height = 496;
  const x = c.getContext("2d");
  x.fillStyle = PAPER; x.fillRect(0, 0, c.width, c.height);
  x.fillStyle = PAPER_INK; x.textAlign = "center"; x.textBaseline = "top";
  x.font = '600 26px "Geist", system-ui, sans-serif';
  const words = title.split(" "), lines = []; let ln = "";
  words.forEach((w) => { const t = ln ? ln + " " + w : w; if (x.measureText(t).width > 320 && ln) { lines.push(ln); ln = w; } else ln = t; });
  lines.push(ln);
  lines.slice(0, 4).forEach((l, i) => x.fillText(l, 192, 40 + i * 32));
  const y0 = 40 + Math.min(4, lines.length) * 32 + 14;
  x.globalAlpha = 0.7; x.font = '400 18px "Geist", system-ui, sans-serif'; x.fillText(`${auth}, ${year}`, 192, y0);
  x.globalAlpha = 0.2;
  for (let i = 0; i < 12; i++) { const yy = y0 + 50 + i * 24; if (yy > 470) break; x.fillRect(36, yy, i % 5 === 4 ? 160 : 312, 9); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
function paperGeo() {
  const g = new THREE.PlaneGeometry(1, 1.29, 10, 1);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i); p.setZ(i, x * x * 0.12); } // a gentle curl
  g.computeVertexNormals(); return g;
}

// Returns a cleanup that stops the loop, removes listeners and frees GPU memory.
export function heroScene(canvas, trigger) {
  const reduce = reduced(), touch = touchOnly();
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); }
  catch { canvas.style.display = "none"; return () => {}; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  const host = canvas.parentElement;
  const scene = new THREE.Scene();
  const fog = new THREE.Fog(0x07161c, 10, 26); scene.fog = fog;
  const cam = new THREE.PerspectiveCamera(36, 1, 0.1, 80);
  cam.position.set(0, 4.2, 12.5); cam.lookAt(0, 0.6, 0);

  const hemi = new THREE.HemisphereLight(0xcff6f4, 0x07161c, 1.1);
  const sun = new THREE.DirectionalLight(0xeefcff, 1.8); sun.position.set(-3, 8, 5);
  const rim = new THREE.DirectionalLight(0x45e6cb, 1.2); rim.position.set(4, 2, -6);
  scene.add(hemi, sun, rim);
  const world = new THREE.Group(); scene.add(world);

  /* plinth */
  const stone = new THREE.MeshStandardMaterial({ color: 0xc9d8da, roughness: 0.8 });
  const plinth = new THREE.Group();
  const box = (w, h, d, y) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), stone); m.position.y = y; plinth.add(m); };
  box(2.2, 0.16, 1.5, 0.92); box(1.95, 0.08, 1.3, 0.8); box(1.7, 1.25, 1.1, 0.13); box(1.95, 0.08, 1.3, -0.52); box(2.4, 0.2, 1.7, -0.66);
  const lc = document.createElement("canvas"); lc.width = 512; lc.height = 128;
  const lx = lc.getContext("2d"); lx.fillStyle = "#0b2530"; lx.font = '500 44px "Geist Mono", ui-monospace, monospace'; lx.textAlign = "center"; lx.textBaseline = "middle";
  const drawLabel = () => { lx.clearRect(0, 0, 512, 128); lx.fillText("P E D E S T A L", 256, 64); labelTex.needsUpdate = true; };
  const labelTex = new THREE.CanvasTexture(lc); labelTex.colorSpace = THREE.SRGBColorSpace;
  const label = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.35), new THREE.MeshBasicMaterial({ map: labelTex, transparent: true, fog: true }));
  label.position.set(0, 0.15, 0.556); plinth.add(label);
  world.add(plinth);

  /* papers */
  const pg = paperGeo();
  const papers = PAPERS.map((p, i) => {
    const mat = new THREE.MeshStandardMaterial({ map: paperTexture(p), roughness: 0.85, side: THREE.DoubleSide });
    const m = new THREE.Mesh(pg, mat); m.scale.setScalar(0.62); m.userData.i = i;
    world.add(m);
    return { m, mat, p, i, th: (i / PAPERS.length) * Math.PI * 2, lvl: (i % 6) / 6, spin: rnd(-0.3, 0.3), rot: rnd(0, 6), wob: rnd(0, 6), off: new THREE.Vector3(), vel: new THREE.Vector3(), hover: 0 };
  });
  const anchor = papers[0];
  const refreshPapers = () => papers.forEach((pp) => { pp.mat.map = paperTexture(pp.p); pp.mat.needsUpdate = true; });
  document.fonts?.ready.then(() => { refreshPapers(); drawLabel(); });
  drawLabel();

  /* creatures */
  const C = { whale: 0x7d9ea6, manta: 0x8fb2b9, fish: 0xc4dde0, skin: 0x9ab8b2 };
  const animals = [];
  const add = (made, x, y, z) => { made.g.position.set(x, y, z); world.add(made.g); animals.push({ ...made, vel: new THREE.Vector3(rnd(-1, 1), rnd(-0.1, 0.1), rnd(-0.3, 0.3)).normalize(), ph: rnd(0, 6), flee: 0 }); };
  add(makeWhale(C.whale), -6, 2.6, -9);
  add(makeManta(C.manta), -3, 2.2, -3); add(makeManta(C.manta), 6, 3.4, -6); add(makeManta(C.manta), -7, -0.5, -5);
  add(makeTurtle("#93b6b1", C.skin, "#45686a"), -3, 2.6, 0); add(makeTurtle("#9cbdbb", C.skin, "#45686a"), 7.5, 0.4, -1); add(makeTurtle("#8fb1ae", C.skin, "#45686a"), 0.5, -1.2, -4); add(makeTurtle("#97b9b5", C.skin, "#45686a"), -7, 3.6, -6);

  // Fish school: instanced bodies and tails sharing transforms.
  const NF = innerWidth < 760 ? 26 : 48;
  const fg = makeFishGeo();
  const ph = new Float32Array(NF); for (let i = 0; i < NF; i++) ph[i] = rnd(0, 6);
  fg.body.setAttribute("aPhase", new THREE.InstancedBufferAttribute(ph, 1)); fg.tail.setAttribute("aPhase", new THREE.InstancedBufferAttribute(ph, 1));
  const fishMat = swimMat(C.fish, { mode: 0, amp: 0.09, freq: 9, k: 5, head: 0.5, len: 1.2, rough: 0.35, metal: 0.3, instanced: true, top: 0x2b6a73, belly: 0xdcefef, stripes: 26 });
  const fishBody = new THREE.InstancedMesh(fg.body, fishMat, NF), fishTail = new THREE.InstancedMesh(fg.tail, fishMat, NF);
  world.add(fishBody, fishTail);
  // The shark: waits in the deep, then strikes through the school and returns.
  const shark = makeShark();
  shark.g.position.set(0, -3, -30); world.add(shark.g);
  const scare = { hits: 0, need: 1 + (Math.random() < 0.5 ? 1 : 0), near: false, wasNear: false, leftAt: 0, cool: 0, shake: 0, target: new THREE.Vector3() };
  const hunt = { phase: "wait", t: 0, next: 0, p0: new THREE.Vector3(), p1: new THREE.Vector3(), p2: new THREE.Vector3(), p3: new THREE.Vector3() };
  let huntCurve = null;
  const sharkPrev = new THREE.Vector3();
  const fish = Array.from({ length: NF }, () => ({ p: new THREE.Vector3(rnd(-6, -2), rnd(-2, 0), rnd(-3, 1)), v: new THREE.Vector3(rnd(-1, 1), 0, rnd(-1, 1)).multiplyScalar(0.5), s: rnd(0.42, 0.6) }));

  /* hover card + accessible list */
  const card = document.createElement("a");
  card.className = "paper-card"; card.target = "_blank"; card.rel = "noopener"; card.hidden = true;
  host.appendChild(card);
  const list = document.createElement("ul"); list.className = "sr-only";
  list.innerHTML = PAPERS.map(([t, a, y, id]) => `<li><a href="https://arxiv.org/abs/${id}" target="_blank" rel="noopener">${t}, ${a} ${y}</a></li>`).join("");
  host.appendChild(list);

  /* pointer as a current */
  const ndc = new THREE.Vector2(9, 9), ray = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const ptr = new THREE.Vector3(999, 999, 0), prevPtr = new THREE.Vector3(), pvel = new THREE.Vector3();
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  addEventListener("pointermove", onMove, { passive: true });

  const colours = () => { const bg = css("--bg"); fog.color.set(bg); hemi.groundColor.set(bg); rim.color.set(css("--accent")); };
  colours();

  let wide = true;
  const layout = () => {
    const r = canvas.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    cam.aspect = r.width / r.height; cam.updateProjectionMatrix();
    wide = r.width > 900;
    plinth.position.set(wide ? 5.4 : 1.2, wide ? 1.9 : 2.6, -2.5); plinth.scale.setScalar(wide ? 0.85 : 0.7);
  };

  let hovered = null, gust = 0, lift = 0, enter = reduce ? 1 : 0, last = 0, vis = true;
  const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting)); io.observe(canvas);
  const q = new THREE.Quaternion(), m4 = new THREE.Matrix4(), up = new THREE.Vector3(0, 1, 0), tmp = new THREE.Vector3(), dir = new THREE.Vector3(), proj = new THREE.Vector3();
  const BOUND = { x: 10, yMin: -3, yMax: 5, zMin: -11, zMax: 2 };

  function steer(a, dt, speed) {
    const pos = a.g.position;
    // Wander, stay in the volume, and steer away from the cursor current.
    tmp.set(Math.sin(last * 0.3 + a.ph), Math.sin(last * 0.21 + a.ph * 2) * 0.25, Math.cos(last * 0.17 + a.ph)).multiplyScalar(0.15);
    if (pos.y > BOUND.yMax) tmp.y -= 0.6; if (pos.y < BOUND.yMin) tmp.y += 0.6;
    if (pos.z > BOUND.zMax) tmp.z -= 0.6; if (pos.z < BOUND.zMin) tmp.z += 0.6;
    const d = pos.distanceTo(ptr);
    const dp = pos.distanceTo(plinth.position);
    if (dp < 4.5) tmp.add(dir.copy(pos).sub(plinth.position).normalize().multiplyScalar(0.9 * (1 - dp / 4.5)));
    if (d < 3.2 && !reduce) { dir.copy(pos).sub(ptr).normalize().multiplyScalar(1.4 * (1 - d / 3.2)); tmp.add(dir); a.flee = Math.min(1, a.flee + 0.05); }
    a.flee *= 0.98;
    a.vel.add(tmp.multiplyScalar(dt)).normalize();
    pos.addScaledVector(a.vel, speed * (1 + a.flee * 2 + gust) * dt);
    if (pos.x > BOUND.x) pos.x = -BOUND.x; if (pos.x < -BOUND.x) pos.x = BOUND.x;
    // Face the direction of travel, head is +x.
    m4.lookAt(tmp.set(0, 0, 0), dir.copy(a.vel).multiplyScalar(-1), up);
    q.setFromRotationMatrix(m4); q.multiply(new THREE.Quaternion().setFromAxisAngle(up, -Math.PI / 2));
    a.g.quaternion.slerp(q, 0.05);
  }

  const draw = (t) => {
    const dt = Math.min(0.05, t - last || 0.016); last = t;
    T.value = t;
    ray.setFromCamera(ndc, cam);
    if (ray.ray.intersectPlane(plane, tmp)) { world.worldToLocal(tmp); pvel.copy(tmp).sub(prevPtr).divideScalar(Math.max(dt, 0.008)); prevPtr.copy(tmp); ptr.copy(tmp); }
    pvel.multiplyScalar(0.9); gust *= 0.96;
    world.position.y = lift * 5 + (1 - enter) * -2;

    if (!reduce || t < 1) animals.forEach((a) => {
      if (!reduce) steer(a, dt, a.speed);
      if (a.flips) a.flips.forEach((f) => { const w = Math.sin(t * 1.6 + a.ph + (f.front ? 0 : 1.2)); f.piv.rotation.x = f.s * (f.front ? w * 0.55 : w * 0.25); f.piv.rotation.y = f.s * w * 0.25; });
    });

    // Shark jump scare: after one or two hovers over the school it bursts out of the deep,
    // lunges at the screen where you were hovering, then turns and sinks back.
    if (!reduce) {
      scare.cool = Math.max(0, scare.cool - dt);
      if (scare.near && !scare.wasNear && t - scare.leftAt > 0.6) scare.hits++;
      if (!scare.near && scare.wasNear) scare.leftAt = t;
      scare.wasNear = scare.near;
      if (hunt.phase === "wait" && scare.hits >= scare.need && scare.cool <= 0) {
        // Path: up from the deep, through the hovered fish, a close sideways pass across
        // the front of the view (so the whole profile is seen), then back down into the dark.
        const camL = world.worldToLocal(cam.position.clone());
        const tg = scare.target.clone(), side = Math.random() < 0.5 ? -1 : 1;
        // The close pass runs through the open upper middle of the hero, clear of the name.
        const close = new THREE.Vector3(side * 0.6, 3.4, 4.2);
        huntCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(tg.x - side * 4, tg.y - 6, -34),
          new THREE.Vector3(tg.x - side * 2.5, tg.y - 2, tg.z - 5),
          tg.clone(),
          new THREE.Vector3(close.x - side * 1.2, close.y - 0.2, close.z),
          new THREE.Vector3(close.x + side * 6, close.y - 1.5, close.z - 4),
          new THREE.Vector3(tg.x + side * 12, -6, -36),
        ], false, "centripetal");
        hunt.phase = "hunt"; hunt.t = 0;
        sharkPrev.copy(huntCurve.getPointAt(0)); shark.g.position.copy(sharkPrev);
        shark.g.scale.setScalar(1.4);
      }
      if (hunt.phase === "hunt") {
        hunt.t += dt;
        const D = 4.6, u0 = Math.min(1, hunt.t / D);
        // Fast rise and strike, slower close pass so it can be seen, then an easy retreat.
        const u = u0 < 0.28 ? 0.42 * Math.pow(u0 / 0.28, 1.8)
          : u0 < 0.58 ? 0.42 + 0.3 * ((u0 - 0.28) / 0.3)
          : 0.72 + 0.28 * Math.pow((u0 - 0.58) / 0.42, 1.2);
        huntCurve.getPointAt(Math.min(1, u), shark.g.position);
        const fast = u0 < 0.58;
        shark.mat.userData.u.uFreq.value = fast ? 7 : 3;
        shark.mat.userData.u.uAmp.value = fast ? 0.32 : 0.24;
        if (u0 > 0.3 && u0 < 0.5) scare.shake = Math.max(scare.shake, 0.8);
        dir.copy(shark.g.position).sub(sharkPrev);
        if (dir.lengthSq() > 1e-6) {
          m4.lookAt(tmp.set(0, 0, 0), dir.multiplyScalar(-1), up);
          q.setFromRotationMatrix(m4).multiply(new THREE.Quaternion().setFromAxisAngle(up, -Math.PI / 2));
          shark.g.quaternion.slerp(q, 0.25);
        }
        sharkPrev.copy(shark.g.position);
        if (u0 >= 1) { hunt.phase = "wait"; scare.hits = 0; scare.need = 1 + (Math.random() < 0.5 ? 1 : 0); scare.cool = 8; shark.g.position.set(0, -3, -40); shark.g.scale.setScalar(1); }
      }
      // A short camera shake while it is in your face.
      scare.shake *= 0.9;
      cam.position.set(Math.sin(t * 61) * 0.09 * scare.shake, 4.2 + Math.cos(t * 53) * 0.07 * scare.shake, 12.5);
    }

    // School: loose flocking toward a drifting centre, scattering from the cursor.
    const ctr = tmp.set(-4.5 + Math.sin(t * 0.13) * 2.5, -1 + Math.sin(t * 0.21) * 0.9, -1.5 + Math.cos(t * 0.11) * 1.5).clone();
    let anyNear = false;
    fish.forEach((f, i) => {
      if (!reduce) {
        dir.copy(ctr).sub(f.p).multiplyScalar(0.12);
        // Hover: if the cursor is over a fish on screen, it darts away.
        proj.copy(f.p).applyMatrix4(world.matrixWorld).project(cam);
        const sdx = (proj.x - ndc.x) * cam.aspect, sdy = proj.y - ndc.y, sd = Math.hypot(sdx, sdy);
        if (sd < 0.16 && ndc.x < 5) { anyNear = true; scare.target.copy(f.p); f.flee = 1; dir.x += (sdx / (sd || 1)) * 30 * (1 - sd / 0.16); dir.y += (sdy / (sd || 1)) * 30 * (1 - sd / 0.16); dir.z += (Math.random() - 0.5) * 6; }
        const ds = f.p.distanceTo(shark.g.position);
        if (ds < 3.6) { f.flee = 1; dir.add(proj.copy(f.p).sub(shark.g.position).normalize().multiplyScalar(26 * (1 - ds / 3.6))); }
        f.flee = (f.flee || 0) * 0.97;
        const dp = f.p.distanceTo(plinth.position);
        if (dp < 5) dir.add(proj.copy(f.p).sub(plinth.position).normalize().multiplyScalar(3 * (1 - dp / 5)));
        dir.x += Math.sin(t + i) * 0.2; dir.y += Math.cos(t * 1.3 + i) * 0.1;
        f.v.addScaledVector(dir, dt).clampLength(0.6, 2.4 + gust * 3 + (f.flee || 0) * 7);
        f.p.addScaledVector(f.v, dt);
      }
      m4.lookAt(proj.set(0, 0, 0), dir.copy(f.v).multiplyScalar(-1), up);
      q.setFromRotationMatrix(m4).multiply(new THREE.Quaternion().setFromAxisAngle(up, -Math.PI / 2));
      m4.compose(f.p, q, proj.set(f.s, f.s, f.s));
      fishBody.setMatrixAt(i, m4); fishTail.setMatrixAt(i, m4);
    });
    fishBody.instanceMatrix.needsUpdate = true; fishTail.instanceMatrix.needsUpdate = true;
    scare.near = anyNear;

    // Papers: a rising spiral around the plinth, pushed by the cursor current.
    const cx = plinth.position.x, cy = plinth.position.y;
    papers.forEach((pp) => {
      const m = pp.m;
      if (pp === anchor) {
        m.position.set(cx, cy + 1.25 + Math.sin(t * 0.8) * 0.04, plinth.position.z + 0.05);
        m.rotation.set(-0.5 + pp.hover * 0.5, 0, 0.05 * (1 - pp.hover));
      } else {
        if (!reduce) { pp.th += dt * (0.25 + gust * 2) * (1 - pp.lvl * 0.35); pp.lvl = (pp.lvl + dt * 0.015) % 1; pp.rot += dt * (0.4 + pp.spin + gust); }
        const rr = (1.4 + pp.lvl * 1.9) * (wide ? 1 : 0.75);
        tmp.set(cx + Math.cos(pp.th) * rr, cy + 0.9 + pp.lvl * 1.9, plinth.position.z + Math.sin(pp.th) * rr * 0.8);
        const d = tmp.distanceTo(ptr);
        if (d < 2.4 && !reduce) pp.vel.addScaledVector(pvel, (1 - d / 2.4) * 0.02);
        pp.vel.addScaledVector(pp.off, -0.04).multiplyScalar(0.92); pp.off.add(pp.vel);
        m.position.copy(tmp).add(pp.off);
        const h = pp.hover;
        m.rotation.set(Math.sin(pp.rot) * 0.6 * (1 - h), -pp.th + Math.PI / 2 + Math.sin(pp.wob + t * 0.5) * 0.4 * (1 - h), Math.cos(pp.rot * 0.7) * 0.4 * (1 - h));
        if (h > 0.01) m.quaternion.slerp(cam.quaternion, h);
      }
      pp.hover += ((hovered === pp ? 1 : 0) - pp.hover) * 0.12;
      m.scale.setScalar(0.62 * (1 + pp.hover * 0.5) * enter);
    });

    // Hover: raycast the papers.
    if (!touch && ndc.x < 5) {
      const hit = ray.intersectObjects(papers.map((p) => p.m), false)[0];
      setHover(hit ? papers[hit.object.userData.i] : null);
    }
    renderer.render(scene, cam);
  };

  function setHover(pp) {
    if (pp !== hovered) {
      hovered = pp; canvas.style.cursor = pp ? "pointer" : "default";
      if (!pp) card.hidden = true;
      else {
        const [title, auth, year, id] = pp.p;
        card.href = `https://arxiv.org/abs/${id}`;
        card.innerHTML = `<span class="pc-t">${title}</span><span class="pc-m">${auth} · ${year}</span><span class="pc-l">Open on arXiv ↗</span>`;
        card.hidden = false;
      }
    }
    if (pp) {
      pp.m.getWorldPosition(proj).project(cam);
      const r = canvas.getBoundingClientRect();
      card.style.transform = `translate(${Math.round((proj.x * 0.5 + 0.5) * r.width + 70)}px, ${Math.round((-proj.y * 0.5 + 0.5) * r.height - 40)}px)`;
    }
  }
  const onClick = () => {
    if (hovered) { card.click(); return; }
    gust = 1;
    papers.forEach((pp) => pp.vel.add(new THREE.Vector3(rnd(-0.2, 0.2), rnd(0, 0.15), rnd(-0.2, 0.2))));
    animals.forEach((a) => (a.flee = 1));
  };
  canvas.addEventListener("click", onClick);

  const offTheme = onTheme(() => { colours(); draw(last); });
  layout();
  const ro = new ResizeObserver(() => { layout(); draw(last || 3); }); ro.observe(canvas);
  const tick = (t) => vis && draw(t);
  const e = { v: 0 };
  let intro = null, st = null;
  if (reduce) draw(3);
  else {
    gsap.ticker.add(tick);
    intro = gsap.to(e, { v: 1, duration: 2.2, ease: "expo.out", delay: 0.3, onUpdate: () => (enter = e.v) });
    st = ScrollTrigger.create({ trigger, start: "top top", end: "bottom top", scrub: true, onUpdate: (s) => (lift = s.progress) });
  }
  return () => {
    gsap.ticker.remove(tick); intro?.kill(); st?.kill();
    removeEventListener("pointermove", onMove); canvas.removeEventListener("click", onClick);
    io.disconnect(); ro.disconnect(); offTheme();
    card.remove(); list.remove();
    scene.traverse((o) => {
      o.geometry?.dispose();
      [].concat(o.material || []).forEach((m) => { Object.values(m).forEach((v) => v?.isTexture && v.dispose()); m.dispose(); });
    });
    renderer.dispose();
  };
}
