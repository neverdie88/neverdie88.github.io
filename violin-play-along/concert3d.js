// First-person 3D concert view: you sit in the concertmaster's chair of a live
// orchestra. Everything is synchronised to the play-along beat via window.PlayAlong
// (see the bridge at the bottom of app.js). Built procedurally with three.js.
import * as THREE from "./lib/three.module.min.js";

const PA = window.PlayAlong;
const $ = (id) => document.getElementById(id);
const canvas = $("concertCanvas");
const stageEl = canvas.parentElement;
const workspace = $("workspace");
const btnView = $("btnConcertView");
const btnOrch = $("btnOrchestraSound");
const btnFull = $("btnConcertFull");
const btnTab = $("btnConcertTab");
const bar = $("concertBar");
const judgeEl = $("concertJudge");
const loadingEl = $("concertLoading");

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const UP = V(0, 1, 0);
const AXIS_Z = V(0, 0, 1);
const _d = V();
const DEG = Math.PI / 180;

// Position a unit-height cylinder (along +Y) so that it spans a -> b
function limb(mesh, a, b) {
  _d.subVectors(b, a);
  const len = Math.max(1e-5, _d.length());
  mesh.position.copy(a).addScaledVector(_d, 0.5);
  mesh.scale.set(1, len, 1);
  mesh.quaternion.setFromUnitVectors(UP, _d.divideScalar(len));
}

// Deterministic pseudo-random numbers so the hall looks the same every time
let seed = 20261122;
function rnd() {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
}
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];

function buildConcert() {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070504);
  scene.fog = new THREE.Fog(0x070504, 14, 42);

  // ---------------------------------------------------------------- materials
  const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0, ...o });
  const lam = (color, o = {}) => new THREE.MeshLambertMaterial({ color, ...o });
  const M = {
    black: lam(0x15161a),
    chair: lam(0x1c1a19),
    wood: std(0x9a4a1c, { roughness: 0.34, metalness: 0.05 }),
    woodDark: std(0x5a2a10, { roughness: 0.4 }),
    ebony: std(0x121214, { roughness: 0.35 }),
    gold: std(0xd9a441, { roughness: 0.3, metalness: 0.45 }),
    silver: std(0xd5dbe3, { roughness: 0.3, metalness: 0.45 }),
    copper: std(0xb5652d, { roughness: 0.35, metalness: 0.4 }),
    bowStick: lam(0x6b3a1c),
    bowHair: lam(0xf1ead8),
    standMetal: lam(0x23252b),
    paper: lam(0xf4efe2),
    shirt: lam(0xf2f2f2),
  };
  const SKINS = [0xf1c9a5, 0xe0ac86, 0xc98f67, 0x9c6b47, 0x7a4f33, 0xf5d5b8].map((c) => lam(c));
  const HAIRS = [0x1b1411, 0x3a2416, 0x6b4a2b, 0x8c8c8c, 0xb08a4a, 0x0d0d0f].map((c) => lam(c));

  const cylCache = new Map();
  const cyl = (r) => {
    if (!cylCache.has(r)) cylCache.set(r, new THREE.CylinderGeometry(r, r, 1, 8));
    return cylCache.get(r);
  };
  const G = {
    head: new THREE.SphereGeometry(0.105, 14, 10),
    hair: new THREE.SphereGeometry(0.112, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.52),
    hand: new THREE.SphereGeometry(0.042, 8, 6),
    torso: new THREE.CylinderGeometry(0.15, 0.185, 0.5, 10),
    shoulders: new THREE.SphereGeometry(1, 12, 8),
    box: new THREE.BoxGeometry(1, 1, 1),
    sphere: new THREE.SphereGeometry(1, 16, 12),
  };
  const box = (mat, sx, sy, sz, x, y, z, parent) => {
    const m = new THREE.Mesh(G.box, mat);
    m.scale.set(sx, sy, sz);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };
  const anims = [];

  // -------------------------------------------------------------------- hall
  (function buildHall() {
    // Stage floor (wood planks)
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const g = c.getContext("2d");
    for (let i = 0; i < 16; i++) {
      const l = 96 + Math.floor(rnd() * 34);
      g.fillStyle = `rgb(${l + 44},${l - 6},${l - 52})`;
      g.fillRect(i * 32, 0, 32, 512);
      g.fillStyle = "rgba(40,20,8,0.5)";
      g.fillRect(i * 32, 0, 1.5, 512);
      for (let k = 0; k < 3; k++) g.fillRect(i * 32, Math.floor(rnd() * 512), 32, 1.5);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(5, 4);
    tex.colorSpace = THREE.SRGBColorSpace;
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(17, 11), std(0xffffff, { map: tex, roughness: 0.42 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, -3);
    scene.add(floor);
    box(M.woodDark, 17, 1.0, 0.12, 0, -0.5, 2.5, scene); // stage front apron

    // Risers for winds and brass
    const riserMat = std(0x7a5232, { roughness: 0.55 });
    box(riserMat, 12.5, 0.2, 3.4, 0, 0.1, -6.8, scene);
    box(riserMat, 12.5, 0.2, 2.4, 0, 0.3, -7.3, scene);
    box(riserMat, 12.5, 0.2, 1.4, 0, 0.5, -7.8, scene);

    // Walls, ceiling
    const wall = lam(0x5a3d26);
    const wallDark = lam(0x4d3523);
    box(wall, 22, 11, 0.3, 0, 4.5, -8.65, scene);
    box(wallDark, 0.3, 12, 30, -11, 4.5, 6, scene);
    box(wallDark, 0.3, 12, 30, 11, 4.5, 6, scene);
    box(wallDark, 22, 12, 0.3, 0, 4.5, 21, scene);
    box(lam(0x1a120c), 22, 0.3, 30, 0, 10, 6, scene);
    // Wooden slats on the back wall
    const slat = lam(0x7a5433);
    for (let i = -17; i <= 17; i++) box(slat, 0.16, 2.3, 0.08, i * 0.6, 1.15, -8.45, scene);
    // Organ pipes
    for (let i = -16; i <= 16; i++) {
      const h = 2.6 + 2.4 * Math.cos(i * 0.2) + (i % 2 ? 0.25 : 0);
      const p = new THREE.Mesh(cyl(0.085), M.silver);
      p.scale.set(1, h, 1);
      p.position.set(i * 0.21, 2.7 + h / 2, -8.4);
      scene.add(p);
    }
    box(M.woodDark, 7.6, 0.35, 0.5, 0, 2.55, -8.35, scene);
    // Acoustic canopy with stage lamps
    const lampMat = new THREE.MeshBasicMaterial({ color: 0xfff0cf });
    const lampGeo = new THREE.CircleGeometry(0.16, 12);
    for (let ix = -3; ix <= 3; ix++) {
      const panel = box(lam(0x8a6a48), 2.1, 0.08, 2.6, ix * 2.35, 7.6 + Math.abs(ix) * 0.18, -3.2, scene);
      panel.rotation.x = 0.12;
      for (const dz of [-0.7, 0.7]) {
        const l = new THREE.Mesh(lampGeo, lampMat);
        l.rotation.x = Math.PI / 2;
        l.position.set(ix * 2.35, 7.54 + Math.abs(ix) * 0.18, -3.2 + dz);
        scene.add(l);
      }
    }
    // Dim house lights over the audience
    const houseMat = new THREE.MeshBasicMaterial({ color: 0x8a6a3a });
    for (let ix = -3; ix <= 3; ix++) for (let iz = 0; iz < 4; iz++) {
      const l = new THREE.Mesh(lampGeo, houseMat);
      l.rotation.x = Math.PI / 2;
      l.position.set(ix * 2.8, 9.8, 5 + iz * 4);
      scene.add(l);
    }

    // Audience: stalls + rear balcony (instanced)
    const seats = [];
    for (let r = 0; r < 15; r++) for (let k = -15; k <= 15; k++) {
      const x = k * 0.62;
      if (Math.abs(Math.abs(x) - 3.4) < 0.45) continue; // aisles
      seats.push([x, -0.95 + r * 0.12, 3.7 + r * 0.95, rnd() > 0.06]);
    }
    box(lam(0x24170f), 22, 0.3, 6.5, 0, 3.3, 17.8, scene); // balcony slab
    box(lam(0x3a2617), 22, 0.9, 0.15, 0, 3.75, 14.6, scene); // parapet
    for (let r = 0; r < 3; r++) for (let k = -16; k <= 16; k++) seats.push([k * 0.62, 3.45 + r * 0.3, 15.3 + r * 0.95, rnd() > 0.1]);
    box(lam(0x1c130d), 22, 0.1, 17, 0, -0.98, 11.5, scene).rotation.x = -0.125; // sloped floor

    const people = seats.filter((s) => s[3]);
    const heads = new THREE.InstancedMesh(new THREE.SphereGeometry(0.105, 8, 6), lam(0xffffff), people.length);
    const bodies = new THREE.InstancedMesh(G.box, lam(0xffffff), people.length);
    const chairs = new THREE.InstancedMesh(G.box, lam(0x4a1414), seats.length);
    const m4 = new THREE.Matrix4();
    const col = new THREE.Color();
    const SK = [0xd9b08c, 0xc49470, 0x9a6c4a, 0x70482f, 0xe8c4a2];
    const CL = [0x1c2331, 0x2a1e2c, 0x33302e, 0x1f2a24, 0x3a2420, 0x4a4f5a, 0x2b3550, 0x5a2a2a];
    seats.forEach((s, i) => {
      m4.makeScale(0.5, 0.55, 0.08).setPosition(s[0], s[1] + 0.62, s[2] + 0.24);
      chairs.setMatrixAt(i, m4);
    });
    people.forEach((s, i) => {
      const sway = (rnd() - 0.5) * 0.08;
      m4.makeScale(1, 1.08, 1).setPosition(s[0] + sway, s[1] + 1.12, s[2]);
      heads.setMatrixAt(i, m4);
      heads.setColorAt(i, col.setHex(pick(SK)));
      m4.makeScale(0.42, 0.55, 0.24).setPosition(s[0] + sway, s[1] + 0.72, s[2] + 0.02);
      bodies.setMatrixAt(i, m4);
      bodies.setColorAt(i, col.setHex(pick(CL)));
    });
    const audience = new THREE.Group();
    audience.add(heads, bodies);
    scene.add(audience, chairs);
    anims.push((t, beat) => {
      // Applause shimmer once the piece is over
      audience.position.y = beat >= PA.TOTAL_BEATS ? Math.abs(Math.sin(t * 9)) * 0.025 : 0;
    });
  })();

  // ------------------------------------------------------------------ lights
  scene.add(new THREE.AmbientLight(0xffe8cc, 0.5));
  scene.add(new THREE.HemisphereLight(0xfff1dc, 0x2a1a10, 0.85));
  const key = new THREE.DirectionalLight(0xffe2b8, 2.3);
  key.position.set(3, 10, 7);
  key.target.position.set(0, 0.5, -3);
  scene.add(key, key.target);
  const rim = new THREE.DirectionalLight(0xbcd0ff, 0.55);
  rim.position.set(-6, 7, -9);
  rim.target.position.set(0, 1, -2);
  scene.add(rim, rim.target);
  const houseLight = new THREE.PointLight(0xffd9a0, 0, 0, 0);
  houseLight.position.set(0, 8, 10);
  scene.add(houseLight);

  // ------------------------------------------------------------------ people
  function makePerson(o = {}) {
    const g = new THREE.Group();
    const standing = Boolean(o.standing);
    const hip = standing ? 0.93 : 0.5;
    const skin = pick(SKINS);
    const cloth = o.cloth || M.black;
    if (standing) {
      box(cloth, 0.3, 0.93, 0.18, 0, 0.465, 0, g);
    } else {
      box(M.chair, 0.44, 0.04, 0.42, 0, 0.45, -0.02, g);
      box(M.chair, 0.42, 0.42, 0.04, 0, 0.72, -0.22, g);
      box(M.chair, 0.4, 0.44, 0.36, 0, 0.21, -0.02, g).material = M.chair;
      box(cloth, 0.32, 0.13, 0.42, 0, 0.53, 0.14, g);
      box(cloth, 0.3, 0.46, 0.13, 0, 0.25, 0.33, g);
    }
    const torso = new THREE.Mesh(G.torso, cloth);
    torso.position.set(0, hip + 0.27, 0);
    g.add(torso);
    const sh = new THREE.Mesh(G.shoulders, cloth);
    sh.scale.set(0.215, 0.085, 0.125);
    sh.position.set(0, hip + 0.5, 0);
    g.add(sh);
    if (o.shirt) box(M.shirt, 0.1, 0.3, 0.02, 0, hip + 0.38, 0.165, g);
    const headG = new THREE.Group();
    headG.position.set(0, hip + 0.69, 0.01);
    const head = new THREE.Mesh(G.head, skin);
    const hair = new THREE.Mesh(G.hair, pick(HAIRS));
    hair.rotation.x = -0.35;
    headG.add(head, hair);
    g.add(headG);
    const arms = {};
    for (const side of ["L", "R"]) {
      const sx = side === "L" ? 0.2 : -0.2;
      const upper = new THREE.Mesh(cyl(0.046), cloth);
      const lower = new THREE.Mesh(cyl(0.04), cloth);
      const hand = new THREE.Mesh(G.hand, skin);
      g.add(upper, lower, hand);
      arms[side] = { upper, lower, hand, shoulder: V(sx, hip + 0.49, 0), elbow: V(), out: side === "L" ? 0.09 : -0.09 };
    }
    function setHand(side, p) {
      const a = arms[side];
      a.elbow.addVectors(a.shoulder, p).multiplyScalar(0.5);
      a.elbow.x += a.out;
      a.elbow.y -= 0.13;
      a.elbow.z -= 0.03;
      limb(a.upper, a.shoulder, a.elbow);
      limb(a.lower, a.elbow, p);
      a.hand.position.copy(p);
    }
    return { g, hip, dy: hip - 0.5, setHand, headG, skin };
  }

  function smallStand(parent, z = 0.72) {
    const pole = new THREE.Mesh(cyl(0.012), M.standMetal);
    pole.scale.y = 0.95;
    pole.position.set(0, 0.475, z);
    const desk = box(M.standMetal, 0.5, 0.33, 0.012, 0, 1.0, z, parent);
    desk.rotation.x = -0.3;
    const paper = box(M.paper, 0.44, 0.28, 0.004, 0, 1.0, z - 0.012, parent);
    paper.rotation.x = -0.3;
    parent.add(pole);
  }

  // Bowed string player (violin / viola on the shoulder)
  function addUpperString(p, scale, strokes, phase) {
    const dy = p.dy;
    const tail = V(0.12, 1.07 + dy, 0.08);
    const dir = V(0.42, -0.04, 0.9).normalize();
    const inst = new THREE.Group();
    const body = new THREE.Mesh(G.sphere, M.wood);
    body.scale.set(0.095 * scale, 0.022, 0.17 * scale);
    body.position.z = 0.17 * scale;
    inst.add(body);
    box(M.ebony, 0.022, 0.014, 0.26 * scale, 0, 0.018, 0.4 * scale, inst);
    inst.position.copy(tail);
    inst.quaternion.setFromUnitVectors(AXIS_Z, dir);
    p.g.add(inst);
    const leftHand = tail.clone().addScaledVector(dir, 0.47 * scale).add(V(0, -0.025, 0));
    p.setHand("L", leftHand);
    const bow = new THREE.Mesh(cyl(0.006), M.bowHair);
    p.g.add(bow);
    const C = tail.clone().addScaledVector(dir, 0.2 * scale).add(V(0, 0.035, 0));
    const r = V(-0.82, -0.32, 0.38).normalize();
    const restH = V(-0.2, 0.62 + dy, 0.3);
    const restT = V(-0.12, 1.28 + dy, 0.34);
    const H = V();
    const T = V();
    anims.push((t, beat, a) => {
      const s = 0.3 - 0.2 * Math.cos(Math.PI * (beat * strokes + phase));
      H.copy(C).addScaledVector(r, s);
      T.copy(H).addScaledVector(r, -0.68);
      H.lerpVectors(restH, H, a);
      T.lerpVectors(restT, T, a);
      p.setHand("R", H);
      limb(bow, H, T);
      p.headG.rotation.x = 0.1 + 0.03 * a * Math.sin(Math.PI * beat);
    });
  }

  // Cello (seated) or double bass (standing)
  function addLowString(p, big, strokes, phase) {
    const dy = p.dy;
    const body = new THREE.Mesh(G.sphere, M.wood);
    const bh = big ? 0.5 : 0.36;
    body.scale.set(big ? 0.28 : 0.2, bh, big ? 0.13 : 0.1);
    body.position.set(0.04, (big ? 0.72 : 0.6), 0.36);
    body.rotation.x = -0.18;
    p.g.add(body);
    const neck = new THREE.Mesh(cyl(0.02), M.ebony);
    const neckTop = V(0.1, (big ? 1.92 : 1.3), 0.14);
    limb(neck, V(0.05, body.position.y + bh * 0.85, 0.3), neckTop);
    p.g.add(neck);
    const pin = new THREE.Mesh(cyl(0.008), M.standMetal);
    limb(pin, V(0.03, 0, 0.44), V(0.04, body.position.y - bh * 0.9, 0.4));
    p.g.add(pin);
    p.setHand("L", V(0.09, (big ? 1.6 : 1.1), 0.2));
    const bow = new THREE.Mesh(cyl(0.007), M.bowHair);
    p.g.add(bow);
    const by = big ? 0.92 : 0.62;
    const restH = V(-0.22, 0.6 + dy, 0.3);
    const restT = V(-0.25, 1.2 + dy, 0.36);
    const H = V();
    const T = V();
    anims.push((t, beat, a) => {
      const s = 0.28 - 0.2 * Math.cos(Math.PI * (beat * strokes + phase));
      H.set(-0.1 - s, by, 0.5);
      T.set(H.x + 0.7, by + 0.03, 0.5);
      H.lerpVectors(restH, H, a);
      T.lerpVectors(restT, T, a);
      p.setHand("R", H);
      limb(bow, H, T);
    });
  }

  function addWind(p, kind) {
    const hy = p.hip;
    const tube = new THREE.Mesh(cyl(kind === "bassoon" ? 0.024 : kind === "flute" ? 0.011 : 0.015), kind === "flute" ? M.silver : kind === "bassoon" ? M.woodDark : M.ebony);
    p.g.add(tube);
    let a, b;
    if (kind === "flute") {
      a = V(0.14, hy + 0.67, 0.13);
      b = V(-0.5, hy + 0.65, 0.17);
    } else if (kind === "bassoon") {
      a = V(0.12, hy + 1.0, 0.16);
      b = V(-0.14, hy - 0.05, 0.3);
    } else {
      a = V(0, hy + 0.65, 0.11);
      b = V(0, hy + 0.2, 0.43);
    }
    const L = a.clone().lerp(b, 0.42);
    const R = a.clone().lerp(b, 0.72);
    const A = V();
    const B = V();
    anims.push((t, beat, amt) => {
      const sway = 0.02 * amt * Math.sin(Math.PI * beat * 0.5 + p.g.position.x);
      A.copy(a); B.copy(b);
      B.y += sway * 2; B.x += sway;
      limb(tube, A, B);
      L.lerpVectors(A, B, 0.42); R.lerpVectors(A, B, 0.72);
      p.setHand("L", L);
      p.setHand("R", R);
    });
  }

  function addBrass(p, kind) {
    const hy = p.hip;
    if (kind === "horn") {
      const coil = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.022, 8, 20), M.gold);
      coil.position.set(-0.1, hy + 0.42, 0.22);
      coil.rotation.y = 0.5;
      const bell = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.2, 14, 1, true), M.gold);
      bell.material.side = THREE.DoubleSide;
      bell.position.set(-0.26, hy + 0.36, 0.14);
      bell.rotation.z = -1.2;
      p.g.add(coil, bell);
      p.setHand("L", V(0.02, hy + 0.5, 0.26));
      p.setHand("R", V(-0.24, hy + 0.36, 0.16));
      return;
    }
    const len = kind === "trombone" ? 0.95 : 0.55;
    const tube = new THREE.Mesh(cyl(0.013), M.gold);
    limb(tube, V(0, hy + 0.66, 0.11), V(0, hy + 0.64, 0.11 + len));
    const bell = new THREE.Mesh(new THREE.ConeGeometry(kind === "trombone" ? 0.1 : 0.065, 0.16, 14, 1, true), M.gold);
    bell.material.side = THREE.DoubleSide;
    bell.rotation.x = -Math.PI / 2;
    bell.position.set(kind === "trombone" ? 0.07 : 0, hy + 0.64, 0.11 + (kind === "trombone" ? 0.6 : len));
    p.g.add(tube, bell);
    p.setHand("L", V(0.04, hy + 0.62, 0.3));
    const R = V();
    anims.push((t, beat, a) => {
      const slide = kind === "trombone" ? 0.18 * a * (0.5 + 0.5 * Math.sin(Math.PI * beat * 0.5)) : 0;
      R.set(-0.04, hy + 0.62, 0.38 + slide);
      p.setHand("R", R);
    });
  }

  function seat(x, z, o = {}) {
    const p = makePerson(o);
    const y = z < -7.1 ? 0.6 : z < -6.1 ? 0.4 : z < -5.1 ? 0.2 : 0;
    p.g.position.set(x, y, z);
    p.g.lookAt(0, y, 0);
    scene.add(p.g);
    return p;
  }
  const arc = (n, r, a0, a1) =>
    Array.from({ length: n }, (_, i) => {
      const a = (n === 1 ? (a0 + a1) / 2 : a0 + ((a1 - a0) * i) / (n - 1)) * DEG;
      return [r * Math.sin(a), -r * Math.cos(a)];
    });

  // Your chair is the first desk of the first violins (conductor's left hand)
  const firstViolins = [...arc(3, 2.1, -100, -44), ...arc(5, 3.2, -100, -46), ...arc(5, 4.3, -98, -46)];
  const PLAYER_POS = V(firstViolins[0][0], 0, firstViolins[0][1]);
  firstViolins.slice(1).forEach(([x, z], i) => { const p = seat(x, z); addUpperString(p, 1, 1, 0); if (i > 0) smallStand(p.g); });
  [...arc(2, 2.3, -36, -12), ...arc(3, 3.4, -38, -8), ...arc(4, 4.5, -40, -6)].forEach(([x, z]) => { const p = seat(x, z); addUpperString(p, 1, 1, 0); smallStand(p.g); });
  [...arc(2, 2.3, 12, 36), ...arc(3, 3.4, 8, 38), ...arc(4, 4.5, 6, 40)].forEach(([x, z]) => { const p = seat(x, z); addUpperString(p, 1.14, 1, 1); smallStand(p.g); });
  [...arc(3, 2.15, 54, 100), ...arc(4, 3.3, 50, 100)].forEach(([x, z]) => { const p = seat(x, z); addLowString(p, false, 0.5, 0); smallStand(p.g, 0.95); });
  arc(3, 4.7, 62, 98).forEach(([x, z]) => { const p = seat(x, z, { standing: true }); addLowString(p, true, 0.5, 1); });
  arc(2, 5.7, -22, -9).forEach(([x, z]) => { const p = seat(x, z); addWind(p, "flute"); smallStand(p.g); });
  arc(2, 5.7, 9, 22).forEach(([x, z]) => { const p = seat(x, z); addWind(p, "oboe"); smallStand(p.g); });
  arc(2, 6.7, -18, -6).forEach(([x, z]) => { const p = seat(x, z); addWind(p, "clarinet"); smallStand(p.g); });
  arc(2, 6.7, 6, 18).forEach(([x, z]) => { const p = seat(x, z); addWind(p, "bassoon"); smallStand(p.g); });
  arc(3, 7.7, -34, -14).forEach(([x, z]) => { const p = seat(x, z); addBrass(p, "horn"); smallStand(p.g); });
  arc(2, 7.7, -3, 8).forEach(([x, z]) => { const p = seat(x, z); addBrass(p, "trumpet"); smallStand(p.g); });
  arc(2, 7.7, 20, 31).forEach(([x, z]) => { const p = seat(x, z); addBrass(p, "trombone"); smallStand(p.g); });

  // Timpani
  (() => {
    const [x, z] = arc(1, 7.5, 47, 47)[0];
    const p = seat(x, z, { standing: true });
    const drums = [-0.55, 0, 0.55].map((dx) => {
      const d = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), M.copper);
      d.position.set(dx, 0.82, 0.62 - Math.abs(dx) * 0.25);
      const skin = new THREE.Mesh(new THREE.CircleGeometry(0.34, 20), M.paper);
      skin.rotation.x = -Math.PI / 2;
      skin.position.copy(d.position);
      p.g.add(d, skin);
      return d.position;
    });
    const L = V();
    const R = V();
    anims.push((t, beat, a) => {
      const f = beat - Math.floor(beat);
      const hit = Math.pow(1 - f, 3);
      const even = Math.floor(beat) % 2 === 0;
      L.set(0.22, 1.02 + 0.2 * (1 - a) + (even ? 0.22 * (1 - hit) : 0.2), 0.42);
      R.set(-0.22, 1.02 + 0.2 * (1 - a) + (!even ? 0.22 * (1 - hit) : 0.2), 0.42);
      p.setHand("L", L);
      p.setHand("R", R);
    });
    void drums;
  })();

  // Harp
  (() => {
    const [x, z] = arc(1, 5.5, -60, -60)[0];
    const p = seat(x, z);
    const col = new THREE.Mesh(cyl(0.035), M.gold);
    limb(col, V(-0.05, 0.05, 1.0), V(-0.05, 1.75, 1.0));
    const neck = new THREE.Mesh(cyl(0.03), M.gold);
    limb(neck, V(-0.05, 1.75, 1.0), V(-0.05, 1.35, 0.28));
    const sound = new THREE.Mesh(cyl(0.05), M.gold);
    limb(sound, V(-0.05, 1.35, 0.28), V(-0.05, 0.08, 0.82));
    const strings = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 1.3), new THREE.MeshBasicMaterial({ color: 0xfff3c4, transparent: true, opacity: 0.18, side: THREE.DoubleSide }));
    strings.rotation.y = Math.PI / 2;
    strings.position.set(-0.05, 0.95, 0.7);
    p.g.add(col, neck, sound, strings);
    const L = V();
    const R = V();
    anims.push((t, beat, a) => {
      L.set(0.02, 1.05 + 0.12 * a * Math.sin(Math.PI * beat), 0.55);
      R.set(-0.12, 0.95 + 0.12 * a * Math.sin(Math.PI * beat + 1.7), 0.6);
      p.setHand("L", L);
      p.setHand("R", R);
    });
  })();

  // Conductor on the podium, beating a 4/4 pattern in time with the play-along
  (() => {
    box(std(0x6b4526, { roughness: 0.5 }), 1.15, 0.22, 1.15, 0, 0.11, 0, scene);
    const p = makePerson({ standing: true, shirt: true });
    p.g.position.set(0, 0.22, 0.05);
    p.g.rotation.y = Math.PI + 0.3;
    box(M.black, 0.34, 0.4, 0.05, 0, 0.75, -0.13, p.g); // coat tails
    scene.add(p.g);
    const stand = new THREE.Group();
    smallStand(stand, 0);
    stand.position.set(0.05, 0.22, -0.62);
    scene.add(stand);
    const baton = new THREE.Mesh(cyl(0.005), M.paper);
    p.g.add(baton);
    // Ictus points [x (conductor's left = +x), y] for beats 1..4: down, left, right, up
    const PT = [[0, -0.2], [0.24, -0.07], [-0.3, -0.05], [-0.04, 0.24]];
    const R = V();
    const L = V();
    const tip = V();
    anims.push((t, beat, _a, aCond) => {
      const b = (((beat - 1) % 4) + 4) % 4;
      const i = Math.floor(b);
      const f = b - i;
      const e = f * f * (3 - 2 * f);
      const from = PT[i];
      const to = PT[(i + 1) % 4];
      const bounce = Math.sin(Math.PI * f) * 0.1;
      const px = from[0] + (to[0] - from[0]) * e;
      const py = from[1] + (to[1] - from[1]) * e + bounce;
      const hy = p.hip + 0.52;
      R.set(-0.24 + px * aCond, hy + (py * aCond) - 0.42 * (1 - aCond), 0.36 * aCond + 0.08);
      L.set(0.26 - px * 0.45 * aCond, hy - 0.06 + py * 0.4 * aCond - 0.4 * (1 - aCond), 0.3 * aCond + 0.08);
      p.setHand("R", R);
      p.setHand("L", L);
      tip.set(R.x + 0.04, R.y + 0.2 + 0.1 * aCond, R.z + 0.26 * aCond + 0.02);
      limb(baton, R, tip);
      p.headG.rotation.x = 0.05 + 0.04 * aCond * Math.sin(Math.PI * beat);
    });
  })();

  // ------------------------------------------------- first-person player rig
  const rig = new THREE.Group();
  rig.position.copy(PLAYER_POS);
  rig.lookAt(2 * PLAYER_POS.x, 0, 2 * PLAYER_POS.z); // local -Z faces the conductor
  scene.add(rig);
  const camera = new THREE.PerspectiveCamera(70, 1, 0.03, 60);
  camera.position.set(0, 1.2, 0);
  camera.rotation.order = "YXZ";
  rig.add(camera);
  const look = { yaw: -0.03, pitch: -0.2, dYaw: -0.03, dPitch: -0.2 };
  {
    const q = new URLSearchParams(location.search);
    if (q.has("yaw")) look.yaw = Number(q.get("yaw")) || 0;
    if (q.has("pitch")) look.pitch = Number(q.get("pitch")) || 0;
  }

  // Your music stand, showing the live sheet with the playback cursor (reloads when switching songs)
  const SCALE = 3;
  let SW = PA.LAYOUT.width || 440;
  let SH = PA.LAYOUT.height || 324;
  const sheetCanvas = document.createElement("canvas");
  sheetCanvas.width = SW * SCALE;
  sheetCanvas.height = SH * SCALE;
  const sctx = sheetCanvas.getContext("2d");
  const baseCanvas = document.createElement("canvas");
  baseCanvas.width = sheetCanvas.width;
  baseCanvas.height = sheetCanvas.height;
  const sheetTex = new THREE.CanvasTexture(sheetCanvas);
  sheetTex.colorSpace = THREE.SRGBColorSpace;
  sheetTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  let sheetKey = "";
  let baseReady = false;
  const sheetImg = new Image();

  function reloadStandSheet() {
    const song = PA.SONG;
    if (!song) return;
    SW = PA.LAYOUT.width || 440;
    SH = PA.LAYOUT.height || 324;
    sheetCanvas.width = SW * SCALE;
    sheetCanvas.height = SH * SCALE;
    baseCanvas.width = sheetCanvas.width;
    baseCanvas.height = sheetCanvas.height;
    baseReady = false;
    sheetKey = "";
    sheetImg.onload = () => {
      const b = baseCanvas.getContext("2d");
      b.fillStyle = "#fff";
      b.fillRect(0, 0, baseCanvas.width, baseCanvas.height);
      b.drawImage(sheetImg, 0, 0, baseCanvas.width, baseCanvas.height);
      const fSize = (song.sheet && song.sheet.fingerFontSize) || 6.4;
      b.font = `800 ${fSize * SCALE}px -apple-system, "Helvetica Neue", Arial, sans-serif`;
      b.textAlign = "center";
      b.fillStyle = "#64748b";
      for (const n of PA.NOTES) {
        const top = PA.LAYOUT.systemMid[n.sys] - 8.625;
        b.fillText(n.classic, n.pdfX * SCALE, Math.min(top - 5.5, n.svgY - 8) * SCALE);
      }
      baseReady = true;
      sheetKey = "";
    };
    sheetImg.src = song.sheet.image;
  }
  reloadStandSheet();
  window.addEventListener("playalong-song-changed", reloadStandSheet);
  sctx.fillStyle = "#fff";
  sctx.fillRect(0, 0, sheetCanvas.width, sheetCanvas.height);

  function drawSheet(ctx, beat) {
    if (!baseReady) return;
    const k = `${ctx.cursorX.toFixed(1)}|${ctx.sys}|${ctx.activeNote ? ctx.activeNote.idx : -1}|${beat >= PA.TOTAL_BEATS}`;
    if (k === sheetKey) return;
    sheetKey = k;
    sctx.drawImage(baseCanvas, 0, 0);
    if (beat >= PA.TOTAL_BEATS) { sheetTex.needsUpdate = true; return; }
    const mid = PA.LAYOUT.systemMid[ctx.sys];
    const m = ctx.activeMeasure;
    sctx.save();
    sctx.scale(SCALE, SCALE);
    if (m) {
      sctx.fillStyle = "rgba(59,130,246,0.16)";
      sctx.fillRect(m.xStart, mid - 15.5, m.xEnd - m.xStart, 31);
    }
    if (ctx.activeNote) {
      const n = ctx.activeNote;
      sctx.fillStyle = "#2563eb";
      sctx.beginPath();
      sctx.ellipse(n.pdfX, n.svgY, 3.3, 2.5, -0.38, 0, Math.PI * 2);
      sctx.fill();
    }
    sctx.fillStyle = "#1d6bf3";
    sctx.fillRect(ctx.cursorX - 0.9, mid - 16.5, 1.8, 33);
    sctx.restore();
    sheetTex.needsUpdate = true;
  }

  (() => {
    const stand = new THREE.Group();
    stand.position.set(0.31, 0, -0.9);
    const pole = new THREE.Mesh(cyl(0.014), M.standMetal);
    pole.scale.y = 0.9;
    pole.position.y = 0.45;
    stand.add(pole);
    for (let i = 0; i < 3; i++) {
      const leg = new THREE.Mesh(cyl(0.01), M.standMetal);
      const a = (i / 3) * Math.PI * 2 + 0.5;
      limb(leg, V(0, 0.22, 0), V(Math.cos(a) * 0.28, 0.01, Math.sin(a) * 0.28));
      stand.add(leg);
    }
    const desk = new THREE.Group();
    desk.position.set(0, 1.0, 0);
    desk.rotation.x = -0.26;
    const w = 0.68;
    const h = (w * SH) / SW;
    box(M.standMetal, w + 0.05, h + 0.05, 0.012, 0, 0, -0.008, desk);
    box(M.standMetal, w + 0.05, 0.02, 0.05, 0, -h / 2 - 0.02, 0.016, desk);
    const sheet = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: sheetTex, color: 0xeae4d6 }));
    desk.add(sheet);
    stand.add(desk);
    rig.add(stand);
  })();

  // ---- Your violin (local axes: +x toward the G string, +y out of the top plate, +z tail -> scroll)
  const violin = new THREE.Group();
  {
    const zv = V(-0.4, -0.16, -0.9).normalize();
    const xv = V().crossVectors(V(0.3, 0.95, 0).normalize(), zv).normalize();
    const yv = V().crossVectors(zv, xv).normalize();
    violin.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(xv, yv, zv));
    violin.position.set(-0.07, 1.035, -0.02);
    rig.add(violin);
  }
  const NUT = 0.52;
  const BRIDGE = 0.195;
  const SCALE_LEN = NUT - BRIDGE;
  const OPEN_MIDI = [55, 62, 69, 76];
  const uOf = (semis) => NUT - SCALE_LEN * (1 - Math.pow(2, -semis / 12));
  const lerp = (a, b, t) => a + (b - a) * t;
  // String index may be fractional (smooth string crossings)
  const stringX = (s, u) => lerp(0.0165, 0.0085, (u - BRIDGE) / SCALE_LEN) * (1 - (s * 2) / 3);
  const bridgeY = (s) => 0.0375 - 0.0022 * Math.pow(s - 1.5, 2);
  const stringY = (s, u) => lerp(bridgeY(s), 0.0232, (u - BRIDGE) / SCALE_LEN);

  const stringMeshes = [];
  const stringMats = [];
  {
    // Body outline
    const half = [[0.0, 0.0], [0.06, 0.004], [0.098, 0.04], [0.104, 0.085], [0.086, 0.135], [0.056, 0.175], [0.058, 0.215], [0.08, 0.262], [0.084, 0.3], [0.062, 0.338], [0.0, 0.355]];
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.splineThru(half.slice(1).map(([w, u]) => new THREE.Vector2(w, u)));
    shape.splineThru(half.slice(0, -1).reverse().map(([w, u]) => new THREE.Vector2(-w, u)));
    const bodyGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: true, bevelSize: 0.003, bevelThickness: 0.003, bevelSegments: 2, curveSegments: 24 });
    bodyGeo.rotateX(Math.PI / 2);
    violin.add(new THREE.Mesh(bodyGeo, M.wood));
    for (const sx of [-1, 1]) box(M.ebony, 0.004, 0.001, 0.06, sx * 0.04, 0.0036, 0.19, violin).rotation.y = sx * 0.12; // f-holes
    // Neck, pegbox, scroll, pegs
    box(M.wood, 0.024, 0.02, 0.175, 0, 0.004, 0.44, violin);
    box(M.wood, 0.024, 0.026, 0.07, 0, 0.006, 0.557, violin);
    const scroll = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.028, 14), M.wood);
    scroll.rotation.z = Math.PI / 2;
    scroll.position.set(0, 0.006, 0.6);
    violin.add(scroll);
    for (let i = 0; i < 4; i++) {
      const peg = new THREE.Mesh(cyl(0.004), M.ebony);
      const side = i % 2 ? 1 : -1;
      limb(peg, V(0, 0.008, 0.535 + i * 0.012), V(side * 0.034, 0.008, 0.535 + i * 0.012));
      violin.add(peg);
    }
    // Fingerboard (tapered), nut, bridge, tailpiece, chin rest
    const fbGeo = new THREE.BoxGeometry(0.043, 0.007, NUT - 0.25);
    const pos = fbGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) if (pos.getZ(i) > 0) pos.setX(i, pos.getX(i) * 0.58);
    const fb = new THREE.Mesh(fbGeo, M.ebony);
    fb.position.set(0, 0.0185, (NUT + 0.25) / 2);
    violin.add(fb);
    box(M.paper, 0.026, 0.004, 0.004, 0, 0.0215, NUT + 0.002, violin);
    box(std(0xd8b98a, { roughness: 0.6 }), 0.042, 0.034, 0.0025, 0, 0.019, BRIDGE, violin);
    box(M.ebony, 0.034, 0.006, 0.11, 0, 0.02, 0.085, violin);
    const chin = new THREE.Mesh(G.sphere, M.ebony);
    chin.scale.set(0.045, 0.01, 0.036);
    chin.position.set(0.055, 0.012, 0.035);
    violin.add(chin);
    // White finger tapes at 1st and 3rd finger (same as the fingerboard diagram)
    const tape = lam(0xf8fafc);
    for (const semis of [2, 5]) box(tape, lerp(0.043, 0.025, (uOf(semis) - 0.25) / (NUT - 0.25)), 0.0006, 0.0045, 0, 0.0222, uOf(semis), violin);
    // Strings
    for (let s = 0; s < 4; s++) {
      const mat = new THREE.MeshStandardMaterial({ color: 0xdfe5ee, roughness: 0.3, metalness: 0.6, emissive: 0x00e8ff, emissiveIntensity: 0 });
      const m = new THREE.Mesh(cyl(s === 0 ? 0.00075 : s === 3 ? 0.0004 : 0.0006), mat);
      limb(m, V(stringX(s, BRIDGE), bridgeY(s), BRIDGE), V(stringX(s, NUT), 0.0232, NUT));
      const tail = new THREE.Mesh(cyl(0.0005), mat);
      limb(tail, V(stringX(s, BRIDGE) * 0.6, 0.024, 0.14), V(stringX(s, BRIDGE), bridgeY(s), BRIDGE));
      violin.add(m, tail);
      stringMeshes.push(m);
      stringMats.push(mat);
    }
  }

  // Finger guidance markers on the fingerboard
  const nowMat = new THREE.MeshBasicMaterial({ color: 0x00e8ff });
  const nowMarker = new THREE.Mesh(new THREE.SphereGeometry(0.0058, 14, 10), nowMat);
  nowMarker.scale.y = 0.45;
  const nextMarker = new THREE.Mesh(new THREE.TorusGeometry(0.0075, 0.0014, 8, 22), new THREE.MeshBasicMaterial({ color: 0xfbbf24 }));
  nextMarker.rotation.x = Math.PI / 2;
  violin.add(nowMarker, nextMarker);

  // Floating note label above the left hand
  const labelCanvas = document.createElement("canvas");
  labelCanvas.width = 384;
  labelCanvas.height = 128;
  const lctx = labelCanvas.getContext("2d");
  const labelTex = new THREE.CanvasTexture(labelCanvas);
  labelTex.colorSpace = THREE.SRGBColorSpace;
  const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTex, transparent: true, depthTest: false }));
  label.scale.set(0.114, 0.038, 1);
  label.position.set(0.02, 0.105, 0.56);
  label.renderOrder = 10;
  violin.add(label);
  let labelKey = "";
  function drawLabel(text, sub, color) {
    const k = text + sub + color;
    if (k === labelKey) return;
    labelKey = k;
    lctx.clearRect(0, 0, 384, 128);
    if (!text) { labelTex.needsUpdate = true; return; }
    lctx.fillStyle = "rgba(10,15,25,0.82)";
    lctx.beginPath();
    lctx.roundRect(4, 14, 376, 100, 26);
    lctx.fill();
    lctx.lineWidth = 4;
    lctx.strokeStyle = color;
    lctx.stroke();
    lctx.textAlign = "center";
    lctx.fillStyle = color;
    lctx.font = "800 52px -apple-system, 'Helvetica Neue', Arial, sans-serif";
    lctx.fillText(text, 192, 68);
    lctx.fillStyle = "#e2e8f0";
    lctx.font = "600 26px -apple-system, 'Helvetica Neue', Arial, sans-serif";
    lctx.fillText(sub, 192, 100);
    labelTex.needsUpdate = true;
  }

  // Left hand: four fingers arching over from the E-string side, thumb on the G side
  const skinMat = lam(0xe8b998);
  const sleeve = M.black;
  const fingers = [];
  const DEFAULT_SEMIS = [0, 2, 4, 5, 7];
  for (let f = 1; f <= 4; f++) {
    const a = new THREE.Mesh(cyl(0.0052), skinMat);
    const b = new THREE.Mesh(cyl(0.0047), skinMat);
    const joint = new THREE.Mesh(new THREE.SphereGeometry(0.0056, 8, 6), skinMat);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.0052, 8, 6), skinMat);
    violin.add(a, b, joint, tip);
    fingers.push({ a, b, joint, tip, lift: 1, u: uOf(DEFAULT_SEMIS[f]), K: V(), Mid: V(), T: V() });
  }
  const palm = box(skinMat, 0.02, 0.05, 0.085, -0.036, -0.012, 0.455, violin);
  palm.rotation.z = 0.25;
  const thumb = new THREE.Mesh(cyl(0.0062), skinMat);
  limb(thumb, V(0.014, -0.018, 0.478), V(0.02, 0.022, 0.498));
  violin.add(thumb);
  const forearmL = new THREE.Mesh(cyl(0.026), sleeve);
  const cuffL = new THREE.Mesh(cyl(0.021), M.shirt);
  violin.add(forearmL, cuffL);

  // Bow + right hand (in violin space so it always meets the strings)
  const bow = new THREE.Group();
  {
    const stick = new THREE.Mesh(cyl(0.0038), M.bowStick);
    limb(stick, V(-0.03, 0.013, 0), V(0.66, 0.011, 0));
    box(M.bowHair, 0.65, 0.0012, 0.009, 0.325, 0, 0, bow);
    box(M.ebony, 0.046, 0.018, 0.013, 0.004, 0.007, 0, bow);
    box(M.bowStick, 0.02, 0.016, 0.008, 0.655, 0.006, 0, bow);
    const hand = new THREE.Mesh(G.sphere, skinMat);
    hand.scale.set(0.03, 0.021, 0.027);
    hand.position.set(-0.01, 0.024, 0.004);
    bow.add(stick, hand);
    violin.add(bow);
  }
  const forearmR = new THREE.Mesh(cyl(0.027), sleeve);
  const cuffR = new THREE.Mesh(cyl(0.023), M.shirt);
  violin.add(forearmR, cuffR);

  rig.updateMatrixWorld(true);
  const rigToViolin = new THREE.Matrix4().copy(violin.matrix).invert();
  const elbowL = V(-0.2, 0.74, -0.3).applyMatrix4(rigToViolin);
  const tmpA = V();
  const tmpB = V();
  const tmpC = V();
  const bx = V();
  const by = V();
  const bz = V();
  const bowMat4 = new THREE.Matrix4();
  const BOW_PHI = [-22, -7.5, 7.5, 22].map((d) => d * DEG);
  const P = { handStr: 2, bowStr: 2, bowS: 0.2, bowLift: 0.012, flash: 0, flashColor: new THREE.Color(0x00e8ff) };
  limb(forearmL, V(-0.04, -0.045, 0.43), elbowL);
  limb(cuffL, V(-0.04, -0.04, 0.44), V(-0.04, -0.045, 0.43).lerp(elbowL, 0.12));

  function updatePlayer(ctx, beat, playing, t) {
    const n = beat < PA.TOTAL_BEATS ? ctx.activeNote : null;
    const next = beat < PA.TOTAL_BEATS ? ctx.nextNote : null;
    const focus = n || next;
    const fN = n ? parseInt(n.classic, 10) || 0 : 0;
    const targetStr = focus ? focus.stringIdx : 2;
    P.handStr += (targetStr - P.handStr) * 0.3;

    // Fingers
    fingers.forEach((F, i) => {
      const f = i + 1;
      const pressed = n && f <= fN;
      const semis = n && f === fN ? n.midi - OPEN_MIDI[n.stringIdx] : DEFAULT_SEMIS[f];
      F.u += (uOf(semis) - F.u) * 0.4;
      F.lift += ((pressed ? 0 : 1) - F.lift) * 0.35;
      const sx = stringX(P.handStr, F.u);
      F.T.set(sx, 0.0238 + F.lift * 0.017, F.u);
      F.K.set(-0.03, 0.004, F.u - 0.014);
      F.Mid.set(sx * 0.5 - 0.013, 0.05 + F.lift * 0.006, F.u - 0.005);
      limb(F.a, F.K, F.Mid);
      limb(F.b, F.Mid, F.T);
      F.joint.position.copy(F.Mid);
      F.tip.position.copy(F.T);
    });

    // NOW / NEXT markers + label
    const place = (obj, note) => {
      const semis = note.midi - OPEN_MIDI[note.stringIdx];
      const u = semis === 0 ? NUT - 0.006 : uOf(semis);
      obj.position.set(stringX(note.stringIdx, u), 0.0245, u);
    };
    nowMarker.visible = Boolean(n);
    if (n) {
      place(nowMarker, n);
      const pulse = 1 + 0.18 * Math.sin(t * 9);
      nowMarker.scale.set(pulse, 0.45, pulse);
    }
    P.flash *= 0.9;
    nowMat.color.setHex(0x00e8ff).lerp(P.flashColor, Math.min(1, P.flash));
    nextMarker.visible = Boolean(next) && (!n || next.pitch !== n.pitch);
    if (nextMarker.visible) {
      place(nextMarker, next);
      nextMarker.position.y += 0.002;
      const s = 1.15 + 0.2 * Math.sin(t * 5);
      nextMarker.scale.set(s, s, s);
    }
    if (n) drawLabel(`${n.stringName} · ${PA.fingerLabel(n)}`, n.kind === "open" ? "open string" : `finger ${n.classic} · ${n.noteLabel}`, "#00e8ff");
    else if (next) drawLabel(`${next.stringName} · ${PA.fingerLabel(next)}`, "get ready", "#fbbf24");
    else drawLabel("", "", "");

    // Strings: the sounding one glows and shimmers
    stringMats.forEach((m, s) => {
      const on = n && n.stringIdx === s && playing;
      m.emissiveIntensity += ((on ? 1.6 : 0) - m.emissiveIntensity) * 0.3;
      stringMeshes[s].position.y = (bridgeY(s) + 0.0232) / 2 + (on ? Math.sin(t * 190) * 0.0005 : 0);
    });

    // Bow: alternate down/up strokes, one per note
    let sT = 0.2;
    let lift = 0.012;
    if (n && playing) {
      const p = Math.min(1, Math.max(0, (beat - n.startBeat) / n.durBeats));
      const len = Math.min(0.42, 0.13 + 0.14 * n.durBeats);
      sT = n.idx % 2 === 0 ? 0.13 + len * p : 0.13 + len * (1 - p);
      lift = 0;
    } else if (n) {
      lift = 0;
    }
    P.bowS += (sT - P.bowS) * 0.4;
    P.bowLift += (lift - P.bowLift) * 0.3;
    P.bowStr += (targetStr - P.bowStr) * 0.25;
    const i0 = Math.min(2, Math.floor(P.bowStr));
    const phi = lerp(BOW_PHI[i0], BOW_PHI[i0 + 1], P.bowStr - i0);
    const uB = 0.224;
    bx.set(Math.cos(phi), Math.sin(phi), 0.05).normalize();
    bz.set(0, 0, 1).addScaledVector(bx, -bx.z).normalize();
    by.crossVectors(bz, bx);
    bowMat4.makeBasis(bx, by, bz);
    bow.quaternion.setFromRotationMatrix(bowMat4);
    tmpA.set(stringX(P.bowStr, uB), stringY(P.bowStr, uB) + 0.0012 + P.bowLift, uB); // contact point
    bow.position.copy(tmpA).addScaledVector(bx, -P.bowS);
    // Right forearm from the frog back to the elbow
    tmpB.set(0.3 + 0.3 * P.bowS, 0.82 - 0.14 * P.bowS, -0.08 - 0.22 * P.bowS).applyMatrix4(rigToViolin);
    tmpC.copy(bow.position).addScaledVector(bx, -0.03).addScaledVector(by, 0.03);
    limb(forearmR, tmpC, tmpB);
    tmpB.lerpVectors(tmpC, tmpB, 0.14);
    limb(cuffR, tmpC, tmpB);
  }

  window.addEventListener("playalong-judgment", (e) => {
    const { status } = e.detail;
    P.flash = 1;
    P.flashColor.setHex(status === "perfect" ? 0xfde047 : status === "almost" ? 0x38bdf8 : 0xf87171);
    if (!PA.state.concertView || PA.state.concertTab) return;
    judgeEl.textContent = status === "perfect" ? "★ PERFECT!" : status === "almost" ? "≈ ALMOST" : "✕ MISS";
    judgeEl.className = `concert-judge ${status}`;
    void judgeEl.offsetWidth;
    judgeEl.classList.add("show");
  });

  // ------------------------------------------------------------- look around
  let drag = null;
  canvas.addEventListener("pointerdown", (e) => {
    drag = { x: e.clientX, y: e.clientY, yaw: look.yaw, pitch: look.pitch };
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!drag) return;
    look.yaw = Math.max(-1.9, Math.min(1.5, drag.yaw + (e.clientX - drag.x) * 0.0045));
    look.pitch = Math.max(-0.75, Math.min(0.6, drag.pitch + (e.clientY - drag.y) * 0.0045));
  });
  const endDrag = () => { drag = null; };
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);
  canvas.addEventListener("dblclick", () => { look.yaw = look.dYaw; look.pitch = look.dPitch; });

  function resize() {
    const w = Math.max(50, canvas.clientWidth || stageEl.clientWidth);
    const h = Math.max(50, canvas.clientHeight || stageEl.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Keep at least ~76° of horizontal view so the violin and the stand both fit
    const v = (2 * Math.atan(Math.tan(38 * DEG) / camera.aspect)) / DEG;
    camera.fov = Math.max(64, Math.min(100, v));
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(stageEl);
  ro.observe(canvas);
  resize();

  let aOrch = 0;
  let aCond = 0;
  let yaw = look.yaw;
  let pitch = look.pitch;
  function frame(tMs) {
    const t = tMs / 1000;
    const beat = PA.getBeat();
    const playing = PA.state.isPlaying;
    const ctx = PA.getContext(beat);
    const done = beat >= PA.TOTAL_BEATS;
    aOrch += ((playing && beat >= 0.7 && !done ? 1 : 0) - aOrch) * 0.08;
    aCond += ((playing && !done ? 1 : 0) - aCond) * 0.1;
    for (const f of anims) f(t, beat, aOrch, aCond);
    updatePlayer(ctx, beat, playing, t);
    drawSheet(ctx, beat);
    houseLight.intensity += ((done ? 1.4 : 0) - houseLight.intensity) * 0.05;
    yaw += (look.yaw - yaw) * 0.2;
    pitch += (look.pitch - pitch) * 0.2;
    camera.rotation.y = yaw + Math.sin(t * 0.5) * 0.006;
    camera.rotation.x = pitch + Math.sin(t * 0.8) * 0.004;
    renderer.render(scene, camera);
  }
  return { frame, resize };
}

// --------------------------------------------------------------------- wiring
let concert = null;
let rafId = 0;
let orchestraOffered = false;

function loop(t) {
  if (!PA.state.concertView) return;
  concert.frame(t);
  rafId = requestAnimationFrame(loop);
}

function refreshButtons() {
  btnView.classList.toggle("active", PA.state.concertView);
  btnView.textContent = PA.state.concertView ? "🎻 Back to TAB" : "🎭 Concert 3D";
  btnOrch.classList.toggle("active", PA.isLiveOrchestraOn());
  btnFull.classList.toggle("active", workspace.classList.contains("concert-full"));
  btnTab.classList.toggle("active", PA.state.concertTab);
}

function setConcertView(on) {
  PA.state.concertView = on;
  canvas.classList.toggle("hidden", !on);
  bar.classList.toggle("hidden", !on);
  stageEl.classList.toggle("concert-on", on);
  stageEl.classList.toggle("with-tab", on && PA.state.concertTab);
  cancelAnimationFrame(rafId);
  if (!on) {
    workspace.classList.remove("concert-full");
    judgeEl.className = "concert-judge";
    PA.relayout();
    refreshButtons();
    return;
  }
  if (!orchestraOffered) {
    // Turn on the real-time A-major chamber orchestra when entering the concert hall
    orchestraOffered = true;
    PA.setLiveOrchestra(true);
  }
  refreshButtons();
  PA.relayout();
  if (concert) {
    concert.resize();
    rafId = requestAnimationFrame(loop);
    return;
  }
  loadingEl.classList.remove("hidden");
  setTimeout(() => {
    try {
      concert = buildConcert();
      loadingEl.classList.add("hidden");
      rafId = requestAnimationFrame(loop);
    } catch (err) {
      console.error(err);
      loadingEl.textContent = "3D view is not available in this browser (WebGL failed to start).";
    }
  }, 30);
}

btnView.addEventListener("click", () => setConcertView(!PA.state.concertView));
btnOrch.addEventListener("click", () => {
  const next = !PA.isLiveOrchestraOn();
  PA.setLiveOrchestra(next);
  if (!next) {
    // Fall back to piano if orchestra is turned off in concert view
    const btnPiano = document.getElementById("btnChordAudio");
    if (btnPiano && !PA.state.chordAudio) btnPiano.click();
  }
  refreshButtons();
});
btnFull.addEventListener("click", () => {
  workspace.classList.toggle("concert-full");
  PA.relayout();
  refreshButtons();
});
function setConcertTab(on) {
  PA.state.concertTab = on;
  stageEl.classList.toggle("with-tab", on && PA.state.concertView);
  PA.relayout();
  if (concert) concert.resize();
  refreshButtons();
}
btnTab.addEventListener("click", () => setConcertTab(!PA.state.concertTab));
$("btnConcertTabClose").addEventListener("click", () => setConcertTab(false));

// Drag the divider between the 3D stage and the TAB column to resize it
{
  const handle = $("concertTabResizer");
  let dragging = false;
  const apply = () => {
    PA.relayout();
    if (concert) concert.resize();
  };
  handle.addEventListener("pointerdown", (e) => {
    dragging = true;
    handle.classList.add("dragging");
    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  handle.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const rect = stageEl.getBoundingClientRect();
    const w = Math.round(Math.max(150, Math.min(rect.width - 200, rect.right - e.clientX)));
    stageEl.style.setProperty("--ctab-user", w + "px");
    apply();
  });
  const end = () => {
    dragging = false;
    handle.classList.remove("dragging");
  };
  handle.addEventListener("pointerup", end);
  handle.addEventListener("pointercancel", end);
  handle.addEventListener("dblclick", () => {
    stageEl.style.removeProperty("--ctab-user");
    apply();
  });
}
window.addEventListener("playalong-backing", refreshButtons);

const params = new URLSearchParams(location.search);
if (params.get("view") === "concert") {
  if (params.get("tab") === "1") PA.state.concertTab = true;
  setConcertView(true);
  if (params.get("full") === "1") workspace.classList.add("concert-full");
  refreshButtons();
}
