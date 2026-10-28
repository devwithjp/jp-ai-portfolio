// Water: the only page with dive footage. Brand colours only (aqua for passion, sky for authority).
// Hero portrait under caustic light, a frame-blended scroll scrub of the reef descent behind the
// story, a drifting closing photo, and a title that ripples like liquid with scroll speed.
// waterScene(root) wires everything under the page root and returns a cleanup.
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reduced } from "./motion";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Frame sequences: 4x4 WebP atlases, 64 frames per clip ---------- */
const CLIPS = { descent: { cw: 960, ch: 540 } };

class Seq {
  constructor(name, base = "/water/seq/") {
    Object.assign(this, CLIPS[name]);
    this.name = name; this.base = base;
    this.sheets = 4; this.per = 16; this.frames = this.sheets * this.per;
    this.imgs = new Array(this.sheets).fill(null);
    this._p = null;
  }
  load() {
    if (this._p) return this._p;
    const get = (i) => {
      const img = new Image();
      img.src = `${this.base}${this.name}_${i + 1}.webp`;
      return img.decode().then(() => { this.imgs[i] = img; }).catch(() => {});
    };
    this._p = get(0).then(() => Promise.all([1, 2, 3].map(get)));
    return this._p;
  }
  // Load once the element is within 1.5 screens, then call back. Returns a disconnect.
  loadNear(el, cb) {
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { io.disconnect(); this.load().then(() => cb && cb()); }
    }, { rootMargin: "150% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }
  // Until a later sheet lands, draw the nearest loaded frame so a scrub never shows a blank.
  resolve(f) {
    f = Math.max(0, Math.min(this.frames - 1, Math.round(f)));
    let s = Math.floor(f / this.per);
    if (!this.imgs[s]) {
      let d = 1;
      while (d < this.sheets) {
        if (this.imgs[s - d]) { s -= d; f = s * this.per + this.per - 1; break; }
        if (this.imgs[s + d]) { s += d; f = s * this.per; break; }
        d++;
      }
      if (!this.imgs[s]) return null;
    }
    const c = f % this.per;
    return { img: this.imgs[s], sx: (c % 4) * this.cw, sy: Math.floor(c / 4) * this.ch };
  }
  draw(ctx, f, W, H, posY = 0.5) {
    const r = this.resolve(f);
    if (!r) return false;
    const s = Math.max(W / this.cw, H / this.ch), dw = this.cw * s, dh = this.ch * s;
    ctx.drawImage(r.img, r.sx, r.sy, this.cw, this.ch, (W - dw) / 2, (H - dh) * posY, dw, dh);
    return true;
  }
}

// Render loop that only runs while the element is on screen. Returns a stop.
function whenVisible(el, frame) {
  let on = false, raf = 0;
  const tick = (t) => { frame(t / 1000); if (on) raf = requestAnimationFrame(tick); };
  const io = new IntersectionObserver(([e]) => {
    on = e.isIntersecting;
    cancelAnimationFrame(raf);
    if (on) raf = requestAnimationFrame(tick);
  });
  io.observe(el);
  return () => { on = false; cancelAnimationFrame(raf); io.disconnect(); };
}

function webglOK() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); }
  catch { return false; }
}

const GLSL_COVER = /* glsl */ `
vec2 cover(vec2 uv, vec2 res, float texAspect) {
  float a = res.x / res.y;
  vec2 s = a > texAspect ? vec2(1.0, texAspect / a) : vec2(a / texAspect, 1.0);
  return (uv - 0.5) * s + 0.5;
}`;

// Cheap tileable caustics (iterated sine warp), returns 0..1 light.
const GLSL_CAUSTIC = /* glsl */ `
float caustic(vec2 p, float t) {
  vec2 i = p;
  float c = 1.0;
  float inten = 0.005;
  for (int n = 0; n < 5; n++) {
    float tt = t * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten)));
  }
  c /= 5.0;
  c = 1.17 - pow(c, 1.4);
  return clamp(pow(abs(c), 8.0), 0.0, 1.0);
}`;

const VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

export function waterScene(root) {
  const reduce = reduced();
  const bag = [];
  const q = (s) => root.querySelector(s);

  /* Hero: the portrait under moving caustic light. */
  const heroGL = q("#heroGL");
  if (heroGL && webglOK()) {
    const r = new THREE.WebGLRenderer({ canvas: heroGL, antialias: false });
    r.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    const u = { uTex: { value: null }, uRes: { value: new THREE.Vector2() }, uTime: { value: 0 }, uAspect: { value: 1800 / 1012 } };
    const mat = new THREE.ShaderMaterial({ uniforms: u, vertexShader: VERT, fragmentShader: `
      precision highp float; uniform sampler2D uTex; uniform vec2 uRes; uniform float uTime, uAspect; varying vec2 vUv;
      ${GLSL_COVER} ${GLSL_CAUSTIC}
      void main(){
        vec2 uv = vUv; float t = uTime;
        vec2 w = vec2(sin(uv.y * 20.0 + t), cos(uv.x * 16.0 + t * 0.8)) * 0.003;
        vec3 col = texture2D(uTex, cover(uv + w, uRes, uAspect)).rgb;
        col += vec3(0.4, 0.95, 0.88) * caustic(uv * vec2(uRes.x / uRes.y, 1.0) * 3.5 + 9.0, t * 0.3) * 0.16;
        col = mix(col, vec3(0.012, 0.07, 0.09), smoothstep(0.55, 0.0, uv.y) * 0.8);
        gl_FragColor = vec4(col, 1.0);
      }` });
    const geo = new THREE.PlaneGeometry(2, 2);
    const scene = new THREE.Scene(); scene.add(new THREE.Mesh(geo, mat));
    const cam = new THREE.Camera();
    const render = () => { if (u.uTex.value) r.render(scene, cam); };
    const resize = () => { const b = heroGL.getBoundingClientRect(); r.setSize(b.width, b.height, false); u.uRes.value.set(b.width, b.height); render(); };
    const ro = new ResizeObserver(resize); ro.observe(heroGL); resize();
    let dead = false, stopLoop = () => {};
    const img = new Image(); img.src = "/water/face.jpg";
    img.decode().then(() => {
      if (dead) return;
      u.uTex.value = new THREE.Texture(img); u.uTex.value.needsUpdate = true; render();
      if (!reduce) stopLoop = whenVisible(heroGL, (t) => { u.uTime.value = t; render(); });
    }).catch(() => {});
    bag.push(() => { dead = true; stopLoop(); ro.disconnect(); u.uTex.value?.dispose(); geo.dispose(); mat.dispose(); r.dispose(); });
  }

  /* Story: scroll sets a target; a render loop eases toward it, cross-fades neighbouring frames,
     pushes the footage in slightly, and fades each paragraph in and out continuously. */
  const canvas = q("#storyCanvas"), sec = q("#wstory");
  if (canvas && sec) {
    const descent = new Seq("descent");
    const beats = [...root.querySelectorAll(".w-beat")], dots = [...root.querySelectorAll(".w-dots i")];
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, target = 0, cur = 0, last = -1, ready = false;
    const size = () => {
      const d = Math.min(devicePixelRatio || 1, 1.5), b = canvas.getBoundingClientRect();
      W = canvas.width = Math.round(b.width * d); H = canvas.height = Math.round(b.height * d); last = -1;
    };
    const ro = new ResizeObserver(size); ro.observe(canvas); size();
    const n = beats.length;
    const render = () => {
      if (!ready) return;
      cur += (target - cur) * (reduce ? 1 : 0.1);
      if (Math.abs(cur - last) < 0.0004) return;
      last = cur;
      const f = cur * (descent.frames - 1), f0 = Math.floor(f), frac = f - f0;
      const z = 1 + cur * 0.08;
      ctx.setTransform(z, 0, 0, z, (W - W * z) / 2, (H - H * z) / 2);
      ctx.globalAlpha = 1; descent.draw(ctx, f0, W, H);
      if (frac > 0.02) { ctx.globalAlpha = frac; descent.draw(ctx, Math.min(descent.frames - 1, f0 + 1), W, H); }
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
      const g = ctx.createLinearGradient(0, 0, W, 0);
      g.addColorStop(0, "rgba(3,17,26,0.9)"); g.addColorStop(0.65, "rgba(3,17,26,0.55)"); g.addColorStop(1, "rgba(3,17,26,0.3)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      if (reduce) return;
      let best = 0, bestD = 9;
      beats.forEach((b, k) => {
        const d = cur * n - (k + 0.5), ad = Math.abs(d);
        if (ad < bestD) { bestD = ad; best = k; }
        const op = Math.max(0, Math.min(1, (0.62 - ad) / 0.3));
        b.style.opacity = op.toFixed(3);
        b.style.transform = `translateY(${(-d * 48).toFixed(1)}px)`;
        b.style.visibility = op > 0 ? "visible" : "hidden";
      });
      dots.forEach((dd, k) => dd.classList.toggle("on", k === best));
    };
    bag.push(descent.loadNear(sec, () => { ready = true; last = -1; render(); }));
    bag.push(() => ro.disconnect());
    if (!reduce) {
      beats.forEach((b) => b.classList.add("scrubbed"));
      const st = ScrollTrigger.create({ trigger: sec, start: "top top", end: "bottom bottom", onUpdate: (s) => (target = s.progress) });
      bag.push(() => st.kill(), whenVisible(canvas, render));
    }
  }

  const gctx = gsap.context(() => {
    /* Closing photo drifts slowly as it scrolls past. */
    if (!reduce && q(".w-scuba img")) gsap.fromTo(q(".w-scuba img"), { scale: 1.12, yPercent: -6 }, { scale: 1, yPercent: 6, ease: "none", scrollTrigger: { trigger: q(".w-scuba"), start: "top bottom", end: "bottom top", scrub: true } });

    /* The title moves like liquid: a turbulence ripple that grows with scroll speed, letters riding a wave. */
    const title = q("#wTitle"), turb = q("#liqTurb"), disp = q("#liqDisp");
    if (!title || reduce) return;
    const ls = [...title.querySelectorAll(".wl")];
    title.style.filter = "url(#liquid)";
    let energy = 0.35, vel = 0;
    ScrollTrigger.create({ onUpdate: (s) => { vel = Math.min(1, Math.abs(s.getVelocity()) / 1800); } });
    gsap.from(ls, { yPercent: 110, opacity: 0, duration: 1.4, ease: "expo.out", stagger: 0.07, delay: 0.4 });
    const tick = (t) => {
      energy += (0.06 + vel * 1.5 - energy) * 0.07; vel *= 0.93;
      disp?.setAttribute("scale", (energy * 42).toFixed(2));
      turb?.setAttribute("baseFrequency", `${(0.003 + energy * 0.003).toFixed(4)} ${(0.011 + Math.sin(t * 0.6) * 0.003).toFixed(4)}`);
      ls.forEach((l, i) => { l.style.translate = `0 ${(Math.sin(t * 1.6 + i * 0.9) * energy * 14).toFixed(2)}px`; l.style.rotate = `${(Math.sin(t * 1.2 + i) * energy * 2.5).toFixed(2)}deg`; });
    };
    gsap.ticker.add(tick);
    bag.push(() => gsap.ticker.remove(tick));
  }, root);

  return () => { bag.forEach((f) => f()); gctx.revert(); };
}
