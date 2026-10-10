import * as THREE from 'three';
import { STAGES, PROJECTS } from './content';

/* Port of the <script> body of muskan-space.html (REFERENCE, three.js r128).
   Logic, constants, shaders, colours and timings are unchanged. Differences are limited to:
   TypeScript types, let/const, element lookup scoped to `root`, a canvas created per mount,
   cleanup/disposal, pausing while the tab is hidden, the contact-links row, and returning null without WebGL. */

interface Vec3 { x: number; y: number; z: number }
interface Obj { x: number; y: number; z: number; r: number; kind: string; dist?: number; halo?: number }
type Updater = (dt: number, time: number, reduce: boolean) => void;
type Builder = (d: Obj, grp: THREE.Group) => Updater;
interface DeckItem {
  g: THREE.Group; back: THREE.Mesh; img: THREE.Mesh; frame: THREE.LineSegments; frame2: THREE.LineSegments;
  glow: THREE.Sprite; k: number; w: number; h: number;
}
type AnyMat = THREE.Material & { map?: THREE.Texture | null };

export function createScene(root: HTMLElement): (() => void) | null {
  const LAST = STAGES.length - 1;
  const reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function clamp(v: number, a: number, b: number) { return Math.min(b, Math.max(a, v)); }
  function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
  function smooth(t: number) { return t * t * (3 - 2 * t); }

  /* The canvas is created per mount (not in JSX): forceContextLoss() poisons a canvas, and StrictMode reuses DOM nodes. */
  const stageEl = root.querySelector('#stage') as HTMLElement;
  const canvas = document.createElement('canvas');
  canvas.id = 'gl';
  canvas.setAttribute('aria-hidden', 'true');

  let made: THREE.WebGLRenderer | null;
  try { made = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); } catch { made = null; }
  if (!made) { return null; }
  const renderer: THREE.WebGLRenderer = made;
  stageEl.insertBefore(canvas, stageEl.firstChild);
  renderer.setClearColor(0x000000, 0);

  const $ = (id: string) => root.querySelector('#' + id) as HTMLElement;
  const copy = $('copy'), caption = $('caption');
  const capIdx = $('capIdx'), capName = $('capName'), capDesc = $('capDesc'), capCta = $('capCta'), capLinks = $('capLinks'), chipsEl = $('chips'), tagEl = $('capTag'), ticksEl = $('ticks');
  const distEl = $('dist');
  const dotsEl = $('dots');

  const cleanups: Array<() => void> = [];
  let disposed = false;
  let raf = 0;

  function maxScroll() { return Math.max(1, document.documentElement.scrollHeight - window.innerHeight); }
  const ANCH = [[0, 0.02], [0.14, 0.52], [0.66, 0.69], [0.82, 0.85], [0.98, 1]];
  function tFor(i: number) { return i === 0 ? 0 : (i === 1 ? ANCH[1][0] + 0.004 : (ANCH[i][0] + ANCH[i][1]) / 2); }
  function goT(tt: number) { window.scrollTo({ top: tt * maxScroll(), behavior: reduce ? 'auto' : 'smooth' }); }
  function goTo(i: number) { goT(tFor(i)); }

  root.querySelectorAll<HTMLElement>('[data-go]').forEach(function (b) {
    const fn = function () { goTo(+(b.getAttribute('data-go') as string)); };
    b.addEventListener('click', fn);
    cleanups.push(function () { b.removeEventListener('click', fn); });
  });
  const navBtns = root.querySelectorAll<HTMLElement>('.nav ul button');

  dotsEl.textContent = '';
  const dotBtns = STAGES.map(function (s, i) {
    const b = document.createElement('button');
    b.type = 'button'; b.setAttribute('aria-label', s.name);
    b.innerHTML = '<span>' + s.name + '</span><i></i>';
    b.addEventListener('click', function () { goTo(i); });
    dotsEl.appendChild(b);
    return b;
  });

  ticksEl.textContent = '';
  PROJECTS.forEach(function (pj, k) {
    const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', pj.name);
    b.addEventListener('click', function () { goT(ANCH[1][0] + ((k + 0.3) / 4) * (ANCH[1][1] - ANCH[1][0])); });
    ticksEl.appendChild(b);
  });
  let target = 0;
  function readScroll() { target = clamp(window.scrollY / maxScroll(), 0, 1); }
  window.addEventListener('scroll', readScroll, { passive: true });
  cleanups.push(function () { window.removeEventListener('scroll', readScroll); });

  const scene = new THREE.Scene();
  const FOV = 38;
  const cam = new THREE.PerspectiveCamera(FOV, 1, 0.1, 600);

  function glowTexture() {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d') as CanvasRenderingContext2D, gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,255,255,0.4)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }
  const GLOW = glowTexture();
  function sprite(color: number, scale: number, opacity: number) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW, color: color, transparent: true, opacity: opacity, depthWrite: false, blending: THREE.AdditiveBlending }));
    s.scale.set(scale, scale, 1);
    return s;
  }

  /* ---------- stars: custom shader so the cursor can bend them ---------- */
  const starUniforms = { uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(9, 9) }, uAspect: { value: 1 }, uPx: { value: 1 } };
  {
    const n = 6600, pos = new Float32Array(n * 3), col = new Float32Array(n * 3), size = new Float32Array(n), ph = new Float32Array(n);
    const palette = [[1, 1, 1], [0.78, 0.86, 1], [0.62, 0.74, 1], [1, 0.86, 0.66]];
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 190;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 110;
      pos[i * 3 + 2] = 40 - Math.random() * 480;
      const c = palette[Math.random() < 0.55 ? 0 : 1 + Math.floor(Math.random() * 3)];
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
      size[i] = 1 + Math.pow(Math.random(), 4) * 4.5;
      ph[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    g.setAttribute('aPhase', new THREE.BufferAttribute(ph, 1));
    const m = new THREE.ShaderMaterial({
      uniforms: starUniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: [
        'attribute float aSize; attribute vec3 aColor; attribute float aPhase;',
        'uniform float uTime, uAspect, uPx; uniform vec2 uMouse;',
        'varying vec3 vColor; varying float vA;',
        'void main(){',
        '  vec4 mv = modelViewMatrix * vec4(position, 1.0);',
        '  gl_Position = projectionMatrix * mv;',
        '  vec2 ndc = gl_Position.xy / gl_Position.w;',
        '  vec2 dl = (ndc - uMouse) * vec2(uAspect, 1.0);',
        '  float d = length(dl);',
        '  vec2 dir = d > 0.0001 ? dl / d : vec2(0.0);',
        '  gl_Position.xy += (dir / vec2(uAspect, 1.0)) * exp(-d * d * 7.0) * 0.1 * gl_Position.w;',
        '  float tw = 0.78 + 0.22 * sin(uTime * 1.4 + aPhase * 60.0);',
        '  gl_PointSize = aSize * uPx * tw * clamp(150.0 / max(-mv.z, 1.0), 0.55, 3.2);',
        '  vColor = aColor;',
        '  vA = clamp(1.5 - (-mv.z) / 230.0, 0.12, 1.0) * tw;',
        '}'
      ].join('\n'),
      fragmentShader: [
        'varying vec3 vColor; varying float vA;',
        'void main(){ float r = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, r); gl_FragColor = vec4(vColor, a * vA); }'
      ].join('\n')
    });
    scene.add(new THREE.Points(g, m));
  }

  /* ---------- nebula haze ---------- */
  [[-40, 18, -70, 0x2a3f9e, 150, 0.16], [50, -14, -120, 0x6a2f6e, 170, 0.11], [-30, -20, -190, 0x1f6f78, 190, 0.11], [44, 22, -250, 0x3a4fc0, 200, 0.13], [-20, 6, -40, 0x8a5a2a, 120, 0.07], [30, -10, -320, 0x6a3f9e, 200, 0.12]].forEach(function (n) {
    const s = sprite(n[3], n[4], n[5]); s.position.set(n[0], n[1], n[2]); scene.add(s);
  });

  /* ---------- four abstract objects, one per destination ---------- */
  function mat(color: number, opacity: number) { return new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: opacity, depthWrite: false, blending: THREE.AdditiveBlending }); }

  /* Unused in REFERENCE (kept as is, flagged in the report). */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  function ringMesh(radius: number, tube: number, color: number, opacity: number) { return new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 10, 160), mat(color, opacity)); }
  function beadOn(parent: THREE.Object3D, radius: number, color: number, size: number) {
    const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.SphereGeometry(size, 16, 12), new THREE.MeshBasicMaterial({ color: color }));
    b.position.set(radius, 0, 0); g.add(b, sprite(color, size * 7, 0.7).translateX(radius)); parent.add(g); return g;
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
  function beamTexture() {
    const c = document.createElement('canvas'); c.width = 8; c.height = 256; const g = c.getContext('2d') as CanvasRenderingContext2D;
    const gr = g.createLinearGradient(0, 0, 0, 256);
    gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 8, 256);
    const gx = g.createLinearGradient(0, 0, 8, 0); gx.addColorStop(0, 'rgba(0,0,0,1)'); gx.addColorStop(0.5, 'rgba(0,0,0,0)'); gx.addColorStop(1, 'rgba(0,0,0,1)');
    g.globalCompositeOperation = 'destination-out'; g.fillStyle = gx; g.fillRect(0, 0, 8, 256);
    return new THREE.CanvasTexture(c);
  }
  const BEAM = beamTexture();

  let camZNow = 0, slideF = 0;
  const PANEL_OFF = [[0, 0, 0], [1.3, 1.0, -20], [2.6, -0.4, -40], [3.9, 0.8, -60]];
  /* ---------- helpers ---------- */
  function addMat(color: number, size: number, opacity?: number) { return new THREE.PointsMaterial({ size: size, map: GLOW, color: color, transparent: true, opacity: opacity === undefined ? 1 : opacity, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true }); }
  function lineMat(color: number, opacity: number) { return new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: opacity, blending: THREE.AdditiveBlending, depthWrite: false }); }
  function vcolors(positions: ArrayLike<number>, c0: number, c1: number, axis: number, span: number) {
    const n = positions.length / 3, col = new Float32Array(n * 3), a = new THREE.Color(c0), b = new THREE.Color(c1), t = new THREE.Color();
    for (let i = 0; i < n; i++) { const f = Math.min(1, Math.max(0, positions[i * 3 + axis] / span * 0.5 + 0.5)); t.copy(a).lerp(b, f); const br = 0.7 + Math.random() * 0.3; col[i * 3] = t.r * br; col[i * 3 + 1] = t.g * br; col[i * 3 + 2] = t.b * br; }
    return col;
  }

  const builders: Record<string, Builder> = {
    /* HOME: a luminous trefoil-style torus knot, thousands of points on a line mesh */
    knot: function (d, grp) {
      const R = d.r * 0.62;
      const geo = new THREE.TorusKnotGeometry(R, R * 0.3, 520, 7, 2, 3);
      const pos = geo.attributes.position.array;
      const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); pg.setAttribute('color', new THREE.BufferAttribute(vcolors(pos, 0xffb257, 0x8fb8ff, 0, R * 1.7), 3));
      const pts = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.16, map: GLOW, vertexColors: true, transparent: true, opacity: 1, depthWrite: false, blending: THREE.AdditiveBlending }));
      const lines = new THREE.Group(); [0, 1].forEach(function (k) { const kg = new THREE.TorusKnotGeometry(R, R * 0.3, 400, 4, 2, 3), kp = kg.attributes.position, ar: THREE.Vector3[] = []; for (let m = 0; m < 400; m++) ar.push(new THREE.Vector3(kp.getX(m * 5 + k), kp.getY(m * 5 + k), kp.getZ(m * 5 + k))); ar.push(ar[0].clone()); lines.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ar), lineMat(k ? 0xbcd2ff : 0xffd9a8, 0.55))); });
      const g = new THREE.Group(); g.rotation.set(0.25, 0.2, -0.15); g.add(pts, lines); grp.add(g);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(d.r * 1.28, 0.012, 8, 220), mat(0xffd9a8, 0.35)); ring.rotation.set(1.25, 0.2, 0.3); grp.add(ring);
      grp.add(sprite(0xffa24a, d.r * 2.2, 0.28));
      return function (dt) { g.rotation.y += dt * 0.12; g.rotation.x += dt * 0.025; ring.rotation.z += dt * 0.05; };
    },
    /* WORK: the four projects as glass slides flown through in 3D */
    deck: function (d, grp) {
      const H = 3.6, items: DeckItem[] = [], loader = new THREE.TextureLoader();
      PROJECTS.forEach(function (pj, k) {
        const g = new THREE.Group(); g.position.set(PANEL_OFF[k][0], PANEL_OFF[k][1], PANEL_OFF[k][2]); g.rotation.y = -0.14;
        const back = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0x080b1c, transparent: true, depthWrite: false }));
        const img = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false })); img.position.z = 0.02;
        const frame = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(1, 1)), new THREE.LineBasicMaterial({ color: pj.hex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })); frame.position.z = 0.03;
        const frame2 = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(1, 1)), new THREE.LineBasicMaterial({ color: pj.hex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })); frame2.position.z = -0.5;
        const glow = sprite(pj.hex, 12, 0.3); glow.position.z = -0.8;
        g.add(glow, frame2, back, img, frame); grp.add(g);
        const it: DeckItem = { g: g, back: back, img: img, frame: frame, frame2: frame2, glow: glow, k: k, w: 6.4, h: H };
        function fit() { back.scale.set(it.w + 0.3, it.h + 0.3, 1); img.scale.set(it.w, it.h, 1); frame.scale.set(it.w + 0.3, it.h + 0.3, 1); frame2.scale.set(it.w * 1.06 + 0.3, it.h * 1.06 + 0.3, 1); }
        fit();
        loader.load(pj.img, function (tex) {
          if (disposed) { tex.dispose(); return; }
          tex.minFilter = THREE.LinearFilter; tex.generateMipmaps = false;
          const asp = tex.image.width / tex.image.height; it.h = H; it.w = Math.min(H * asp, 6.4); if (H * asp > 6.4) it.h = 6.4 / asp;
          const im = img.material as THREE.MeshBasicMaterial;
          im.map = tex; im.needsUpdate = true; fit();
        });
        items.push(it);
      });
      return function (dt, time) {
        items.forEach(function (it, k) {
          const far = camZNow - (grp.position.z + PANEL_OFF[k][2]);
          const base = clamp((140 - far) / 50, 0, 1) * clamp((far - 1) / 5, 0, 1);
          const emph = 0.35 + 0.65 * clamp(1 - Math.abs(k - slideF) * 0.9, 0, 1);
          const o = base * emph;
          (it.back.material as THREE.Material).opacity = 0.88 * o; (it.img.material as THREE.Material).opacity = o * 0.96; (it.frame.material as THREE.Material).opacity = 0.9 * o; (it.frame2.material as THREE.Material).opacity = 0.25 * o; (it.glow.material as THREE.Material).opacity = 0.34 * o;
          it.g.visible = o > 0.01;
          it.g.position.y = PANEL_OFF[k][1] + Math.sin(time * 0.6 + k * 1.7) * 0.12;
        });
      };
    },
    /* EXPERIENCE: an Aizawa strange attractor, traced as a thread of light */
    aizawa: function (d, grp) {
      const N = 14000, pos = new Float32Array(N * 3), dt = 0.011, A = 0.95, B = 0.7, C = 0.6, D = 3.5, E = 0.25, F = 0.1, S = d.r * 0.72;
      let x = 0.1, y = 0, z = 0;
      for (let i = 0; i < N + 600; i++) {
        const dx = (z - B) * x - D * y, dy = D * x + (z - B) * y, dz = C + A * z - z * z * z / 3 - (x * x + y * y) * (1 + E * z) + F * z * x * x * x;
        x += dx * dt; y += dy * dt; z += dz * dt;
        if (i >= 600) { const j = i - 600; pos[j * 3] = x * S; pos[j * 3 + 1] = (z - 0.7) * S; pos[j * 3 + 2] = y * S; }
      }
      const col = vcolors(pos, 0x7fa8ff, 0xffc27a, 1, S * 2.2);
      const g = new THREE.Group();
      const gp = new THREE.BufferGeometry(); gp.setAttribute('position', new THREE.BufferAttribute(pos, 3)); gp.setAttribute('color', new THREE.BufferAttribute(col, 3));
      g.add(new THREE.Points(gp, new THREE.PointsMaterial({ size: 0.09, map: GLOW, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending })));
      g.add(new THREE.Line(gp, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false })));
      const head = sprite(0xffffff, 1.3, 0.95); g.add(head);
      g.rotation.set(0.4, 0, 0.2); grp.add(g); grp.add(sprite(0x5f8fff, d.r * 1.9, 0.22));
      let idx = 0;
      return function (dt2) { g.rotation.y += dt2 * 0.1; idx = (idx + dt2 * 900) % N; const k = Math.floor(idx); head.position.set(pos[k * 3], pos[k * 3 + 1], pos[k * 3 + 2]); };
    },
    /* ABOUT: faceted crystal, liked, unchanged */
    crystal: function (d, grp) {
      const outer = new THREE.IcosahedronGeometry(d.r * 0.9, 1), inner = new THREE.IcosahedronGeometry(d.r * 0.5, 0);
      const o = new THREE.Group(), n = new THREE.Group();
      o.add(new THREE.LineSegments(new THREE.EdgesGeometry(outer), new THREE.LineBasicMaterial({ color: 0xf5b8d6, transparent: true, opacity: 0.8 })));
      o.add(new THREE.Mesh(outer, mat(0xe27ba6, 0.07)));
      o.add(new THREE.Points(outer, new THREE.PointsMaterial({ size: 0.34, map: GLOW, color: 0xffd6e8, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })));
      n.add(new THREE.LineSegments(new THREE.EdgesGeometry(inner), new THREE.LineBasicMaterial({ color: 0xffe9f3, transparent: true, opacity: 0.95 })));
      n.add(new THREE.Mesh(inner, mat(0xffc0dc, 0.12)));
      grp.add(o, n, sprite(0xe27ba6, d.r * 1.8, 0.4));
      const orbit = new THREE.Mesh(new THREE.TorusGeometry(d.r * 1.35, 0.012, 10, 160), mat(0xf5b8d6, 0.5)); orbit.rotation.x = 1.25; orbit.rotation.y = 0.3; grp.add(orbit);
      const ob = new THREE.Group(); ob.rotation.x = 1.25; ob.rotation.y = 0.3; const spin = new THREE.Group();
      const bead = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffe3ef })); bead.position.x = d.r * 1.35; spin.add(bead); ob.add(spin); grp.add(ob);
      return function (dt) { o.rotation.y += dt * 0.12; o.rotation.x += dt * 0.04; n.rotation.y -= dt * 0.2; n.rotation.z += dt * 0.07; spin.rotation.z += dt * 0.5; };
    },
    /* CONTACT: a Möbius loop drawn as a fine mesh, one continuous surface */
    mobius: function (d, grp) {
      const U = 160, Vn = 7, R = d.r * 0.95, Wd = d.r * 0.42, pts: THREE.Vector3[] = [], segs: THREE.Vector3[] = [];
      let i: number, j: number;
      function P(u: number, v: number) { const a = u * Math.PI * 2, hw = (v - 0.5) * 2 * Wd, h = a / 2; return new THREE.Vector3((R + hw * Math.cos(h)) * Math.cos(a), hw * Math.sin(h), (R + hw * Math.cos(h)) * Math.sin(a)); }
      for (j = 0; j < Vn; j++) for (i = 0; i < U; i++) { segs.push(P(i / U, j / (Vn - 1)), P((i + 1) / U, j / (Vn - 1))); }
      for (i = 0; i < U; i += 2) for (j = 0; j < Vn - 1; j++) segs.push(P(i / U, j / (Vn - 1)), P(i / U, (j + 1) / (Vn - 1)));
      for (i = 0; i < U; i++) { pts.push(P(i / U, 0)); }
      const g = new THREE.Group();
      const lines = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(segs), lineMat(0x7ee0b5, 0.5));
      const edge = new THREE.Points(new THREE.BufferGeometry().setFromPoints(pts), addMat(0xd8fff0, 0.3));
      const runner = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      const rg = sprite(0x7ee0b5, 1.6, 0.9); runner.add(rg);
      g.add(lines, edge, runner); g.rotation.set(0.9, 0.2, -0.3); grp.add(g);
      grp.add(sprite(0x58e0b8, d.r * 1.8, 0.28));
      let tt = 0;
      return function (dt) { tt += dt; g.rotation.y += dt * 0.14; const q = P((tt * 0.07) % 1, 0.5); runner.position.copy(q); };
    }
  };

  const DATA: Obj[] = [
    { x: 6.2, y: -0.4, z: -70, r: 3.9, dist: 17, kind: 'deck', halo: 0x8fb8ff },
    { x: 7.0, y: 1.0, z: -170, r: 3.8, dist: 25, kind: 'aizawa', halo: 0x5f8fff },
    { x: 4.6, y: -1.2, z: -246, r: 3.9, dist: 24, kind: 'crystal', halo: 0xe27ba6 },
    { x: 6.5, y: 0.6, z: -322, r: 3.6, dist: 24, kind: 'mobius', halo: 0x58e0b8 }
  ];
  const HERO: Obj = { x: 5.2, y: 0.1, z: -26, r: 4.0, kind: 'knot' };
  const heroGrp = new THREE.Group(); heroGrp.position.set(HERO.x, HERO.y, HERO.z); scene.add(heroGrp);
  const heroUpdate = builders.knot(HERO, heroGrp);
  const planets = DATA.map(function (d) {
    const grp = new THREE.Group(); grp.position.set(d.x, d.y, d.z);
    const halo = sprite(d.halo as number, d.r * 4.2, 0.2); grp.add(halo);
    const update = builders[d.kind](d, grp);
    const pick = new THREE.Mesh(new THREE.SphereGeometry(d.r * 1.15, 12, 8), new THREE.MeshBasicMaterial({ visible: false }));
    grp.add(pick);
    scene.add(grp);
    return { grp: grp, body: pick, halo: halo, update: update, d: d, hover: 0 };
  });

  /* ---------- camera keyframes ---------- */
  let narrow = false;
  let WK: Vec3[] = [];
  function keyframes() {
    const offX = narrow ? 0 : 6.0, yo = narrow ? 4.2 : 0, wyo = narrow ? 5.2 : 0, k: Vec3[] = [{ x: narrow ? 4.2 : 0, y: narrow ? 5.2 : 0, z: 0 }];
    DATA.forEach(function (d) { const dist = (d.dist || 21) + (narrow ? 6 : 0); k.push({ x: d.x - offX, y: d.y * 0.5 + yo, z: d.z + dist }); });
    WK = PANEL_OFF.map(function (o) { const d = DATA[0], dist = (d.dist as number) + (narrow ? 6 : 0); return { x: d.x + o[0] - (narrow ? 0 : 4.6), y: (d.y + o[1]) * 0.5 + wyo, z: d.z + o[2] + dist }; });
    return k;
  }
  let KF = keyframes();

  let W = 1, H = 1;
  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    narrow = W / H < 0.95; KF = keyframes();
    const pr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pr); renderer.setSize(W, H, false);
    cam.aspect = W / H; cam.updateProjectionMatrix();
    starUniforms.uAspect.value = W / H; starUniforms.uPx.value = pr;
  }
  window.addEventListener('resize', resize);
  cleanups.push(function () { window.removeEventListener('resize', resize); });
  resize();

  let px = 0, py = 0, cx = 0, cy = 0;
  const mouse = new THREE.Vector2(9, 9), mTarget = new THREE.Vector2(9, 9);
  const ray = new THREE.Raycaster();
  let hoverIdx = -1;
  const onPointerMove = function (e: PointerEvent) {
    px = (e.clientX / W - 0.5) * 2; py = (e.clientY / H - 0.5) * 2;
    mTarget.set((e.clientX / W) * 2 - 1, -(e.clientY / H) * 2 + 1);
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  cleanups.push(function () { window.removeEventListener('pointermove', onPointerMove); });
  const onPointerLeave = function () { mTarget.set(9, 9); };
  window.addEventListener('pointerleave', onPointerLeave);
  cleanups.push(function () { window.removeEventListener('pointerleave', onPointerLeave); });
  const onCanvasClick = function () { if (hoverIdx >= 0) goTo(hoverIdx + 1); };
  canvas.addEventListener('click', onCanvasClick);
  cleanups.push(function () { canvas.removeEventListener('click', onCanvasClick); });

  let t = 0, fov = FOV, stageNow = '', curNow = -1, last = performance.now();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tPrev = 0; /* unused in REFERENCE */
  let tPrev0 = 0;
  readScroll();
  if (reduce) t = target;
  const tmp = new THREE.Vector3(), meshes: THREE.Object3D[] = planets.map(function (p) { return p.body; });
  void tmp; /* unused in REFERENCE */

  function frame(now: number) {
    if (disposed) return;
    if (document.hidden) { raf = 0; return; }
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const time = now / 1000;
    t = reduce ? target : t + (target - t) * (1 - Math.pow(0.001, dt));

    let i0 = 0, u = 0, stage = 0, hold = true, i2: number;
    for (i2 = 0; i2 <= LAST; i2++) if (t <= ANCH[i2][1]) break;
    if (i2 > LAST) i2 = LAST;
    if (t >= ANCH[i2][0]) { stage = i2; i0 = i2; } else { i0 = i2 - 1; stage = -1; u = smooth((t - ANCH[i0][1]) / (ANCH[i2][0] - ANCH[i0][1])); }
    let kk = 0;
    let camX: number, camY: number, camZ: number;
    if (stage === 1) {
      const pp = clamp((t - ANCH[1][0]) / (ANCH[1][1] - ANCH[1][0]), 0, 1), sf = pp * 4, k0 = Math.min(Math.floor(sf), 3), loc = sf - k0;
      slideF = k0 + (k0 < 3 ? smooth(clamp((loc - 0.6) / 0.4, 0, 1)) : 0); kk = k0; hold = k0 === 3 || loc < 0.6;
      const ka = Math.floor(slideF), fr = slideF - ka, A0 = WK[ka], B0 = WK[Math.min(ka + 1, 3)];
      camX = lerp(A0.x, B0.x, fr); camY = lerp(A0.y, B0.y, fr); camZ = lerp(A0.z, B0.z, fr);
    } else if (stage >= 0) {
      const K = KF[stage]; camX = K.x; camY = K.y; camZ = K.z; slideF = stage < 1 ? 0 : 3;
    } else {
      const from = i0 === 1 ? WK[3] : KF[i0], to = i0 + 1 === 1 ? WK[0] : KF[i0 + 1];
      camX = lerp(from.x, to.x, u); camY = lerp(from.y, to.y, u); camZ = lerp(from.z, to.z, u); slideF = i0 < 1 ? 0 : 3;
    }
    camZNow = camZ;
    const seg = stage >= 0 ? stage : (u < 0.5 ? i0 : i0 + 1);
    const speed = dt > 0 ? Math.abs(t - tPrev0) / dt : 0; tPrev0 = t;
    const wantFov = FOV + clamp(speed * 28, 0, 9);
    fov += (wantFov - fov) * 0.08;
    if (Math.abs(cam.fov - fov) > 0.01) { cam.fov = fov; cam.updateProjectionMatrix(); }

    cx += (px - cx) * 0.04; cy += (py - cy) * 0.04;
    cam.position.set(camX + cx * 0.7, camY - cy * 0.45, camZ);
    cam.lookAt(camX + cx * 0.15, camY - cy * 0.1, camZ - 10);

    mouse.lerp(mTarget, 0.12);
    starUniforms.uMouse.value.copy(mouse);
    starUniforms.uTime.value = reduce ? 0 : time;

    const hs = 1 - smooth(clamp(-camZ / 16, 0, 1));
    heroGrp.visible = hs > 0.001; heroGrp.scale.setScalar(0.4 + 0.6 * hs);
    if (heroGrp.visible) heroUpdate(reduce ? 0 : dt, time, reduce);
    for (let i = 0; i < planets.length; i++) {
      const p = planets[i];
      p.hover += ((i === hoverIdx ? 1 : 0) - p.hover) * 0.12;
      const far = camZ - p.d.z, win = i === 0 ? clamp((62 - far) / 22, 0, 1) : (i === 1 ? clamp((40 - far) / 15, 0, 1) : clamp((110 - far) / 35, 0, 1)), appear = smooth(win);
      p.grp.visible = appear > 0.001;
      p.grp.scale.setScalar((1 + p.hover * 0.05) * (0.3 + 0.7 * appear));
      p.halo.material.opacity = 0.18 + p.hover * 0.22 + (stage === i + 1 ? 0.1 : 0);
      if (p.grp.visible) p.update(reduce ? 0 : dt, time, reduce);
    }

    ray.setFromCamera(mouse, cam);
    const hit = ray.intersectObjects(meshes, false);
    const hIdx = hit.length ? meshes.indexOf(hit[0].object as THREE.Mesh) : -1;
    if (hIdx !== hoverIdx) { hoverIdx = hIdx; canvas.style.cursor = hIdx >= 0 ? 'pointer' : 'default'; }

    const home = clamp(1 - t / 0.07, 0, 1);
    copy.style.opacity = home.toFixed(3);
    copy.style.transform = 'translateY(calc(' + (narrow ? '0%' : '-52%') + ' + ' + ((1 - home) * -40).toFixed(1) + 'px))';
    copy.style.pointerEvents = home > 0.5 ? 'auto' : 'none';

    const show = stage >= 2 || (stage === 1 && hold);
    const key = (stage === 1 ? '1:' + kk : String(stage)) + (show ? 'y' : 'n');
    if (key !== stageNow) {
      stageNow = key;
      if (show) {
        const isW = stage === 1, pj = PROJECTS[kk];
        capIdx.textContent = String(stage).padStart(2, '0') + ' / ' + String(LAST).padStart(2, '0') + (isW ? '  ·  WORK  ·  PROJECT ' + String(kk + 1).padStart(2, '0') + ' / 04' : '');
        capName.textContent = isW ? pj.name : STAGES[stage].name; capName.style.color = isW ? pj.color : '';
        capDesc.textContent = isW ? pj.desc : STAGES[stage].desc;
        tagEl.textContent = isW ? pj.tag : '';
        chipsEl.innerHTML = ''; if (isW) pj.metrics.forEach(function (m) { const sp = document.createElement('span'); sp.textContent = m; sp.style.setProperty('--chip', pj.color + '66'); chipsEl.appendChild(sp); });
        ticksEl.classList.toggle('on', isW);
        ticksEl.querySelectorAll('button').forEach(function (bn, j) { bn.classList.toggle('on', j === kk); bn.style.setProperty('--tick', pj.color); });
        capCta.classList.toggle('on', stage === LAST);
        capLinks.classList.toggle('on', stage === LAST);
      }
      caption.classList.toggle('show', show);
    }
    if (seg !== curNow) {
      curNow = seg;
      dotBtns.forEach(function (bn, k) { bn.classList.toggle('on', k === seg); });
      navBtns.forEach(function (bn, k) { bn.classList.toggle('on', k + 1 === seg); });
    }
    distEl.textContent = (-camZ * 0.42).toFixed(1);

    renderer.render(scene, cam);
    raf = requestAnimationFrame(frame);
  }

  /* Pause the loop while the tab is hidden; resume without a time jump. */
  const onVisibility = function () {
    if (disposed) return;
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
    else if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
  };
  document.addEventListener('visibilitychange', onVisibility);
  cleanups.push(function () { document.removeEventListener('visibilitychange', onVisibility); });

  raf = requestAnimationFrame(frame);

  return function dispose() {
    disposed = true;
    cancelAnimationFrame(raf); raf = 0;
    cleanups.forEach(function (fn) { fn(); });
    cleanups.length = 0;
    scene.traverse(function (o) {
      const m = o as THREE.Mesh;
      if (!(o instanceof THREE.Sprite) && m.geometry) m.geometry.dispose();
      const mats = m.material ? (Array.isArray(m.material) ? m.material : [m.material]) : [];
      mats.forEach(function (mt) {
        const am = mt as AnyMat;
        if (am.map && am.map !== GLOW) am.map.dispose();
        am.dispose();
      });
    });
    GLOW.dispose(); BEAM.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
    dotsEl.textContent = ''; ticksEl.textContent = ''; chipsEl.textContent = '';
    caption.classList.remove('show'); capCta.classList.remove('on'); capLinks.classList.remove('on'); ticksEl.classList.remove('on');
    copy.removeAttribute('style');
    root.querySelectorAll('.nav ul button.on').forEach(function (bn) { bn.classList.remove('on'); });
  };
}
