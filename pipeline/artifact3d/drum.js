// Trống đồng Đông Sơn (mô phỏng, cách điệu) xoay dưới đèn bảo tàng. Dựng hoàn toàn bằng code three.js:
// hoa văn mặt trống và thân trống vẽ bằng Canvas 2D lúc tải trang, không dùng ảnh hay mô hình có sẵn.
// FILM (do build.py chèn): {dur, cams: [[t, px,py,pz, lx,ly,lz], ...], spin}
const Q = new URLSearchParams(location.search);
const W = +(Q.get('w') || 1920), H = +(Q.get('h') || 1080);
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(W, H);
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f0b08);
const camera = new THREE.PerspectiveCamera(32, W / H, 0.02, 40);
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const smooth = (a, b, x) => { const k = clamp((x - a) / (b - a), 0, 1); return k * k * (3 - 2 * k); };
const lerp = (a, b, k) => a + (b - a) * k;
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// ---------- hoa văn vẽ bằng Canvas 2D: một canvas màu + một canvas nổi (bump) ----------
const BRONZE = '#6b5130', RAISE = '#b8914f';
function pair(w, h) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const b = document.createElement('canvas'); b.width = w; b.height = h;
  const cx = c.getContext('2d'), bx = b.getContext('2d');
  cx.fillStyle = BRONZE; cx.fillRect(0, 0, w, h); bx.fillStyle = '#000'; bx.fillRect(0, 0, w, h);
  // vẽ cùng một hình lên cả hai canvas
  const both = fn => { cx.save(); cx.fillStyle = cx.strokeStyle = RAISE; fn(cx); cx.restore();
                       bx.save(); bx.fillStyle = bx.strokeStyle = '#fff'; fn(bx); bx.restore(); };
  return { c, b, cx, bx, both };
}
function patina(P, w, h, n) {  // gỉ đồng xanh loang + vết mòn
  const g = P.cx; g.save(); g.filter = 'blur(18px)';
  for (let i = 0; i < n; i++) { g.globalAlpha = .10 + rnd() * .22; g.fillStyle = rnd() < .7 ? '#4f7d62' : '#2f2416';
    g.beginPath(); g.ellipse(rnd() * w, rnd() * h, 20 + rnd() * 140, 15 + rnd() * 90, rnd() * 3, 0, 7); g.fill(); }
  g.restore();
  g.save(); g.globalAlpha = .06; for (let i = 0; i < 9000; i++) { g.fillStyle = rnd() < .5 ? '#000' : '#e8c88a'; g.fillRect(rnd() * w, rnd() * h, 2, 2); } g.restore();
}
function bird(g, s) {  // chim Lạc cách điệu: mỏ dài, mào, đuôi xòe, bay ngược chiều kim đồng hồ
  g.beginPath(); g.moveTo(-1.0 * s, 0); g.lineTo(-0.35 * s, -0.08 * s); g.lineTo(0.15 * s, -0.16 * s); g.lineTo(0.5 * s, -0.05 * s);
  g.lineTo(0.95 * s, -0.22 * s); g.lineTo(0.85 * s, 0.02 * s); g.lineTo(0.98 * s, 0.2 * s); g.lineTo(0.5 * s, 0.08 * s);
  g.lineTo(0.12 * s, 0.14 * s); g.lineTo(-0.35 * s, 0.06 * s); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(0.1 * s, -0.15 * s); g.lineTo(0.0 * s, -0.36 * s); g.lineTo(0.22 * s, -0.16 * s); g.fill();  // mào
  g.beginPath(); g.moveTo(-0.15 * s, -0.1 * s); g.lineTo(-0.05 * s, -0.42 * s); g.lineTo(0.08 * s, -0.12 * s); g.fill();  // cánh
}
function person(g, s) {  // người đội mũ lông chim (cách điệu)
  g.fillRect(-0.08 * s, -0.25 * s, 0.16 * s, 0.5 * s);
  g.beginPath(); g.arc(0, -0.34 * s, 0.1 * s, 0, 7); g.fill();
  for (let k = -2; k <= 2; k++) { g.beginPath(); g.moveTo(0, -0.42 * s); g.lineTo(k * 0.12 * s - 0.05 * s, -0.85 * s); g.lineTo(k * 0.12 * s + 0.03 * s, -0.84 * s); g.fill(); }
  g.fillRect(-0.32 * s, -0.12 * s, 0.64 * s, 0.07 * s);
}
function tympanum() {
  const N = 2048, R = N / 2, P = pair(N, N);
  P.both(g => {
    g.translate(R, R); g.lineWidth = 5;
    const ring = r => { g.beginPath(); g.arc(0, 0, r * R, 0, 7); g.stroke(); };
    // ngôi sao 14 cánh ở giữa, kẽ cánh có hình lông công
    g.beginPath(); for (let i = 0; i < 28; i++) { const q = i / 28 * Math.PI * 2, r = (i % 2 ? .035 : .13) * R; g.lineTo(Math.cos(q) * r, Math.sin(q) * r); } g.closePath(); g.fill();
    for (let i = 0; i < 14; i++) { const q = (i + .5) / 14 * Math.PI * 2; g.save(); g.rotate(q);
      g.beginPath(); g.moveTo(.05 * R, 0); g.lineTo(.12 * R, -.012 * R); g.lineTo(.12 * R, .012 * R); g.closePath(); g.stroke(); g.restore(); }
    // các vành hoa văn
    const bands = [[.145, .155], [.215, .225], [.245, .255], [.375, .385], [.405, .415], [.475, .485], [.655, .665], [.695, .705], [.775, .785], [.845, .855], [.975, .99]];
    bands.forEach(([a, b]) => { ring(a); ring(b); });
    const dots = (r, n, rr) => { for (let i = 0; i < n; i++) { const q = i / n * Math.PI * 2; g.beginPath(); g.arc(Math.cos(q) * r * R, Math.sin(q) * r * R, rr * R, 0, 7); g.stroke();
      g.beginPath(); g.arc(Math.cos(q) * r * R, Math.sin(q) * r * R, rr * R * .35, 0, 7); g.fill(); } };
    const ladder = (a, b, n) => { for (let i = 0; i < n; i++) { const q = i / n * Math.PI * 2; g.beginPath(); g.moveTo(Math.cos(q) * a * R, Math.sin(q) * a * R); g.lineTo(Math.cos(q) * b * R, Math.sin(q) * b * R); g.stroke(); } };
    dots(.185, 40, .022); ladder(.225, .245, 160); ladder(.385, .405, 260); dots(.445, 90, .02); ladder(.665, .695, 420); dots(.74, 150, .02);
    // vành người đội mũ lông chim
    for (let i = 0; i < 20; i++) { const q = i / 20 * Math.PI * 2; g.save(); g.rotate(q); g.translate(0, -.33 * R); person(g, .085 * R); g.restore(); }
    // vành chim Lạc bay
    for (let i = 0; i < 18; i++) { const q = i / 18 * Math.PI * 2; g.save(); g.rotate(q); g.translate(0, -.565 * R); g.rotate(Math.PI); bird(g, .1 * R); g.restore(); }
    // răng cưa
    g.beginPath(); for (let i = 0; i <= 240; i++) { const q = i / 240 * Math.PI * 2, r = (i % 2 ? .795 : .835) * R; g.lineTo(Math.cos(q) * r, Math.sin(q) * r); } g.stroke();
  });
  patina(P, N, N, 70);
  return P;
}
function mantle() {
  const w = 4096, h = 1024, P = pair(w, h);
  P.both(g => {
    g.lineWidth = 5;
    const line = y => { g.fillRect(0, y, w, 6); };
    [70, 110, 330, 370, 520, 560].forEach(line);
    for (let x = 0; x < w; x += 14) { g.fillRect(x, 74, 4, 36); g.fillRect(x, 334, 4, 36); g.fillRect(x, 524, 4, 36); }
    // vành thuyền chở người (dưới vai trống)
    for (let k = 0; k < 6; k++) { const x0 = k * w / 6 + 60, bw = w / 6 - 120;
      g.beginPath(); g.moveTo(x0, 250); g.quadraticCurveTo(x0 + bw / 2, 330, x0 + bw, 250); g.lineTo(x0 + bw + 40, 170); g.lineTo(x0 + bw - 20, 240);
      g.quadraticCurveTo(x0 + bw / 2, 300, x0 + 20, 240); g.lineTo(x0 - 40, 170); g.closePath(); g.fill();
      for (let j = 0; j < 5; j++) { g.save(); g.translate(x0 + 120 + j * (bw - 240) / 4, 220); person(g, 110); g.restore(); } }
    // các ô dọc ở thân giữa, trong ô có người và chim
    for (let k = 0; k < 8; k++) { const x0 = k * w / 8; g.fillRect(x0, 370, 8, 150); g.fillRect(x0 + 30, 370, 8, 150);
      g.save(); g.translate(x0 + w / 16 + 15, 460); person(g, 120); g.restore(); }
    // đế: dải tròn chấm
    for (let x = 30; x < w; x += 60) { g.beginPath(); g.arc(x, 620, 18, 0, 7); g.stroke(); g.beginPath(); g.arc(x, 620, 6, 0, 7); g.fill(); }
  });
  patina(P, w, h, 120);
  return P;
}
const canvasTex = (cv, srgb) => { const t = new THREE.CanvasTexture(cv); t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 8; return t; };

// ---------- trống ----------
const drum = new THREE.Group(); scene.add(drum);
const TP = tympanum(), MP = mantle();
const bronze = (P, extra = {}) => new THREE.MeshStandardMaterial(Object.assign({ map: canvasTex(P.c, true), bumpMap: canvasTex(P.b, false), bumpScale: 2.2,
  metalness: .82, roughness: .42, color: 0xffffff }, extra));
// mặt cắt dọc thân trống (bán kính, độ cao) theo tỉ lệ trống Ngọc Lũ: đường kính mặt 79 cm, cao 63 cm
const prof = [[.400, 0], [.392, .02], [.36, .08], [.335, .18], [.33, .30], [.345, .40], [.39, .47], [.425, .53], [.43, .57], [.418, .61], [.395, .63]]
  .map(([r, y]) => new THREE.Vector2(r, y));
const body = new THREE.Mesh(new THREE.LatheGeometry(prof, 256), bronze(MP, { side: THREE.DoubleSide }));
body.castShadow = body.receiveShadow = true; drum.add(body);
const face = new THREE.Mesh(new THREE.CircleGeometry(.395, 256), bronze(TP));
face.rotation.x = -Math.PI / 2; face.position.y = .63; face.castShadow = true; drum.add(face);
const handleMat = new THREE.MeshStandardMaterial({ color: 0x8a6a3c, metalness: .85, roughness: .5 });
for (const a of [0, .32, Math.PI, Math.PI + .32]) {  // hai cặp quai
  const hnd = new THREE.Mesh(new THREE.TorusGeometry(.055, .014, 16, 40, Math.PI), handleMat);
  hnd.position.set(Math.cos(a) * .425, .5, -Math.sin(a) * .425); hnd.rotation.set(0, a, Math.PI / 2); hnd.castShadow = true; drum.add(hnd);
}

// ---------- bệ đá, ánh sáng bảo tàng ----------
const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(.62, .66, .9, 96), new THREE.MeshStandardMaterial({ color: 0x2a2420, roughness: .85 }));
pedestal.position.y = -.45; pedestal.receiveShadow = true; scene.add(pedestal);
const floor = new THREE.Mesh(new THREE.CircleGeometry(8, 64), new THREE.MeshStandardMaterial({ color: 0x15100c, roughness: .95 }));
floor.rotation.x = -Math.PI / 2; floor.position.y = -.9; floor.receiveShadow = true; scene.add(floor);
// môi trường phản chiếu: hộp tối có vài tấm đèn mềm (để đồng có ánh kim)
const env = new THREE.Scene(); env.background = new THREE.Color(0x0c0907);
for (const [x, y, z, c, s] of [[0, 4, 1, 0xffe2b0, 3], [-4, 1.5, 2, 0xffd8a0, 1.6], [4, 1, -2, 0x9fc4d6, 1.2], [0, 1, 4, 0x705a40, 2.5]]) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(s, s), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }));
  m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m); }
const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(env, .04).texture; scene.environmentIntensity = .55;
const spot = new THREE.SpotLight(0xffd9a6, 38, 9, .42, .55, 1.6);
spot.position.set(.9, 3.2, 1.4); spot.target.position.set(0, .3, 0); spot.castShadow = true; spot.shadow.mapSize.set(2048, 2048); spot.shadow.bias = -.0004;
scene.add(spot, spot.target);
const rim = new THREE.DirectionalLight(0x9cc0d8, 1.4); rim.position.set(-2, 1.5, -2.5); scene.add(rim);
scene.add(new THREE.HemisphereLight(0x4a3c2e, 0x0a0806, .9));
const fill = new THREE.DirectionalLight(0xffe0b8, 1.1); fill.position.set(1.5, .6, 2.2); scene.add(fill);
// quầng sáng sau lưng trống
const halo = new THREE.Mesh(new THREE.PlaneGeometry(9, 6), new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`,
  fragmentShader: `varying vec2 vUv; void main(){ float d = length((vUv - vec2(.5, .55)) * vec2(1.5, 1.)); float g = smoothstep(.55, 0., d); gl_FragColor = vec4(vec3(.42, .28, .15) * g * .55, g); }` }));
halo.position.set(0, .6, -3.5); scene.add(halo);
// bụi bay trong luồng đèn
const NP = 420, dustPos = new Float32Array(NP * 3), dustBase = [];
for (let i = 0; i < NP; i++) dustBase.push([(rnd() - .5) * 1.4 + .3, rnd() * 2.6 - .3, (rnd() - .5) * 1.4 + .4, rnd() * 6.28, .02 + rnd() * .05]);
const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xffe6bf, size: .006, transparent: true, opacity: .35, depthWrite: false, blending: THREE.AdditiveBlending }));
scene.add(dust);

// ---------- máy quay ----------
function camAt(t) {
  const K = FILM.cams; let a = K[0], b = K[K.length - 1];
  for (let i = 0; i < K.length - 1; i++) if (t >= K[i][0] && t < K[i + 1][0]) { a = K[i]; b = K[i + 1]; break; }
  const k = t <= K[0][0] ? 0 : t >= K[K.length - 1][0] ? 1 : smooth(a[0], b[0], t);
  return a.slice(1).map((v, i) => lerp(v, b[i + 1], k));
}
function renderAt(t) {
  const c = camAt(t);
  camera.position.set(c[0], c[1], c[2]); camera.lookAt(c[3], c[4], c[5]); camera.updateMatrixWorld(); camera.updateProjectionMatrix();
  drum.rotation.y = t * FILM.spin;
  for (let i = 0; i < NP; i++) { const [x, y, z, ph, sp] = dustBase[i];
    dustPos[i * 3] = x + Math.sin(t * .4 + ph) * .08; dustPos[i * 3 + 1] = ((y + t * sp + 0.3) % 2.6) - .3; dustPos[i * 3 + 2] = z + Math.cos(t * .3 + ph) * .08; }
  dustGeo.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
  const pv = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  return { pv: pv.elements.slice(), cam: camera.position.toArray() };
}
window.renderAt = renderAt; window.FILM_DUR = FILM.dur;
renderAt(0); window.READY = true;
