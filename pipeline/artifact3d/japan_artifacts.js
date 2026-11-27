// Hai hiện vật Nhật Bản dựng hoàn toàn bằng code (three.js + Canvas 2D), dưới đèn bảo tàng:
//  1) bình gốm Jomon kiểu "ngọn lửa" (kaen-doki, cách điệu): thân tròn xoay, vân thừng, vành có 4 quai uốn như lửa
//  2) kiếm katana (cách điệu): lưỡi cong có đường vân tôi (hamon), chắn tay tsuba, chuôi quấn dây
// FILM: {dur, pot:[t0,t1], katana:[t0,t1], cams:{pot:[[t,px,py,pz,lx,ly,lz]...], katana:[...]}}
const Q = new URLSearchParams(location.search);
const W = +(Q.get('w') || 1920), H = +(Q.get('h') || 1080);
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(W, H);
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene(); scene.background = new THREE.Color(0x0e0b09);
const camera = new THREE.PerspectiveCamera(32, W / H, 0.01, 40);
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const smooth = (a, b, x) => { const k = clamp((x - a) / (b - a), 0, 1); return k * k * (3 - 2 * k); };
const lerp = (a, b, k) => a + (b - a) * k;
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const canvasTex = (cv, srgb) => { const t = new THREE.CanvasTexture(cv); t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 8; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; };
const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; };

// ---------- ánh sáng + môi trường chung ----------
const env = new THREE.Scene(); env.background = new THREE.Color(0x0b0907);
for (const [x, y, z, c, s] of [[0, 4, 1, 0xffe2b0, 3], [-4, 1.5, 2, 0xffd8a0, 1.6], [4, 1, -2, 0x9fc4d6, 1.4], [0, 1, 4, 0x806a50, 2.5], [3, 3, 3, 0xffffff, 1.2]]) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(s, s), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m); }
const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(env, .04).texture; scene.environmentIntensity = .6;
const spot = new THREE.SpotLight(0xffd9a6, 36, 9, .45, .55, 1.6);
spot.position.set(.9, 3.2, 1.4); spot.target.position.set(0, .3, 0); spot.castShadow = true; spot.shadow.mapSize.set(2048, 2048); spot.shadow.bias = -.0004;
scene.add(spot, spot.target);
const rim = new THREE.DirectionalLight(0x9cc0d8, 1.6); rim.position.set(-2, 1.5, -2.5); scene.add(rim);
const fill = new THREE.DirectionalLight(0xffe0b8, 1.0); fill.position.set(1.5, .6, 2.2); scene.add(fill);
scene.add(new THREE.HemisphereLight(0x4a3c2e, 0x0a0806, .8));
const halo = new THREE.Mesh(new THREE.PlaneGeometry(9, 6), new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`,
  fragmentShader: `varying vec2 vUv; void main(){ float d = length((vUv - vec2(.5, .55)) * vec2(1.5, 1.)); float g = smoothstep(.55, 0., d); gl_FragColor = vec4(vec3(.42, .26, .14) * g * .5, g); }` }));
halo.position.set(0, .6, -3.5); scene.add(halo);
const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(.5, .54, .9, 96), new THREE.MeshStandardMaterial({ color: 0x2a2420, roughness: .85 }));
pedestal.position.y = -.45; pedestal.receiveShadow = true; scene.add(pedestal);
const floor = new THREE.Mesh(new THREE.CircleGeometry(8, 64), new THREE.MeshStandardMaterial({ color: 0x15100c, roughness: .95 }));
floor.rotation.x = -Math.PI / 2; floor.position.y = -.9; floor.receiveShadow = true; scene.add(floor);

// ---------- 1) bình gốm Jomon ----------
const pot = new THREE.Group(); scene.add(pot);
{
  const [c, g] = mk(2048, 1024), [b, bg] = mk(2048, 1024);
  g.fillStyle = '#6e4430'; g.fillRect(0, 0, 2048, 1024); bg.fillStyle = '#808080'; bg.fillRect(0, 0, 2048, 1024);
  // vân thừng (jōmon = "dấu thừng"): những vệt xiên nhỏ dày đặc
  for (let i = 0; i < 26000; i++) { const x = rnd() * 2048, y = 300 + rnd() * 724, l = 10 + rnd() * 8;
    g.strokeStyle = rnd() < .5 ? 'rgba(60,30,18,.35)' : 'rgba(190,130,90,.25)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.lineTo(x + l * .6, y + l); g.stroke();
    bg.strokeStyle = 'rgba(0,0,0,.5)'; bg.lineWidth = 2; bg.beginPath(); bg.moveTo(x, y); bg.lineTo(x + l * .6, y + l); bg.stroke(); }
  // dải xoắn nổi ở vai bình
  bg.lineWidth = 14; g.lineWidth = 6;
  for (let k = 0; k < 8; k++) { const x0 = k * 256 + 128;
    for (const [ctx, col] of [[bg, '#fff'], [g, 'rgba(120,70,45,.9)']]) { ctx.strokeStyle = col; ctx.beginPath();
      for (let a = 0; a < 5 * Math.PI; a += .1) { const r = 8 + a * 9; ctx.lineTo(x0 + Math.cos(a) * r, 170 + Math.sin(a) * r * .8); } ctx.stroke(); } }
  for (const [ctx, col] of [[bg, '#fff'], [g, 'rgba(120,70,45,.9)']]) { ctx.strokeStyle = col; ctx.lineWidth = 12; [40, 290, 330].forEach(y => { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(2048, y); ctx.stroke(); }); }
  // muội than, loang màu
  g.save(); g.filter = 'blur(30px)'; for (let i = 0; i < 60; i++) { g.globalAlpha = .12 + rnd() * .2; g.fillStyle = rnd() < .6 ? '#2a1810' : '#b37a52';
    g.beginPath(); g.ellipse(rnd() * 2048, rnd() * 1024, 60 + rnd() * 200, 40 + rnd() * 120, 0, 0, 7); g.fill(); } g.restore();
  const mat = new THREE.MeshStandardMaterial({ map: canvasTex(c, true), bumpMap: canvasTex(b, false), bumpScale: 3, roughness: .92, metalness: 0, side: THREE.DoubleSide });
  const prof = [[.0, 0], [.13, 0], [.15, .03], [.17, .12], [.19, .25], [.22, .36], [.25, .44], [.27, .50], [.265, .53], [.255, .55]].map(([r, y]) => new THREE.Vector2(r, y));
  const body = new THREE.Mesh(new THREE.LatheGeometry(prof, 200), mat); body.castShadow = body.receiveShadow = true; pot.add(body);
  // 4 quai "ngọn lửa" trên miệng bình
  const flameMat = new THREE.MeshStandardMaterial({ map: mat.map, bumpMap: mat.bumpMap, bumpScale: 3, roughness: .9, color: 0xb09080 });
  for (let k = 0; k < 4; k++) { const a = k / 4 * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
    const P = (r, y, side) => new THREE.Vector3(ca * r - sa * side, y, -sa * r - ca * side);
    const curve = new THREE.CatmullRomCurve3([P(.255, .54, -.09), P(.30, .62, -.07), P(.33, .72, -.02), P(.29, .80, .03), P(.24, .74, .05), P(.27, .66, .0), P(.31, .69, -.04), P(.255, .55, .09)]);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 120, .022, 12, false), flameMat); tube.castShadow = true; pot.add(tube);
    const spike = new THREE.Mesh(new THREE.ConeGeometry(.025, .12, 12), flameMat); spike.position.copy(P(.32, .82, .0)); spike.rotation.z = -.2; pot.add(spike);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(.03, .01, 10, 30), flameMat); ring.position.copy(P(.28, .66, -.06)); ring.lookAt(P(.6, .66, -.06)); pot.add(ring); }
  const lip = new THREE.Mesh(new THREE.TorusGeometry(.255, .014, 12, 120), flameMat); lip.rotation.x = Math.PI / 2; lip.position.y = .55; pot.add(lip);
}

// ---------- 2) kiếm katana ----------
const katana = new THREE.Group(); scene.add(katana);
{
  const L = .72, sh = new THREE.Shape();
  // mặt cắt cạnh (nhìn ngang): sống cong, lưỡi cong, mũi kissaki
  const spine = x => .032 + .028 * Math.pow(x / L, 2), edge = x => .0 + .028 * Math.pow(x / L, 2) - .004;
  sh.moveTo(0, edge(0)); for (let i = 1; i <= 60; i++) { const x = i / 60 * (L - .04); sh.lineTo(x, edge(x)); }
  sh.quadraticCurveTo(L + .005, edge(L) + .004, L, spine(L) - .004); // mũi kiếm
  for (let i = 60; i >= 0; i--) { const x = i / 60 * (L - .04); sh.lineTo(x, spine(x)); } sh.closePath();
  const geo = new THREE.ExtrudeGeometry(sh, { depth: .006, bevelEnabled: true, bevelThickness: .003, bevelSize: .002, bevelSegments: 3, steps: 1, curveSegments: 40 });
  geo.translate(0, 0, -.003);
  // vân tôi hamon: dải sáng gợn sóng dọc lưỡi (texture theo toạ độ x,y của hình cắt)
  const [c, g] = mk(2048, 256);
  const toPx = (x, y) => [x / .76 * 2048, 256 - (y + .01) / .08 * 256];
  g.fillStyle = '#b4bac0'; g.fillRect(0, 0, 2048, 256);
  g.fillStyle = '#f3f5f7'; g.beginPath();
  for (let i = 0; i <= 200; i++) { const x = i / 200 * L, w = .010 + .003 * Math.sin(i * .35) + .0012 * Math.sin(i * .9); g.lineTo(...toPx(x, edge(x) + w)); }
  for (let i = 200; i >= 0; i--) { const x = i / 200 * L; g.lineTo(...toPx(x, edge(x) - .01)); } g.fill();
  g.save(); g.filter = 'blur(3px)'; g.globalAlpha = .5; g.fillStyle = '#ffffff'; g.fillRect(0, 0, 2048, 6); g.restore();
  const tex = canvasTex(c, true); tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping; tex.repeat.set(1 / .76, 1 / .08); tex.offset.set(0, .01 / .08);
  const blade = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex, metalness: .8, roughness: .24, envMapIntensity: 1.6 }));
  blade.castShadow = true; katana.add(blade);
  const gold = new THREE.MeshStandardMaterial({ color: 0xc9a046, metalness: .9, roughness: .3 });
  const habaki = new THREE.Mesh(new THREE.BoxGeometry(.03, .04, .014), gold); habaki.position.set(-.012, .016, 0); katana.add(habaki);
  // chắn tay tsuba: đĩa sắt đen có vân
  const [tc, tg] = mk(512, 512); tg.fillStyle = '#2b2622'; tg.fillRect(0, 0, 512, 512); tg.strokeStyle = '#6b5a3a'; tg.lineWidth = 6;
  for (let r = 60; r < 250; r += 38) { tg.beginPath(); tg.arc(256, 256, r, 0, 7); tg.stroke(); }
  for (let k = 0; k < 8; k++) { tg.save(); tg.translate(256, 256); tg.rotate(k * Math.PI / 4); tg.beginPath(); tg.ellipse(0, -150, 22, 60, 0, 0, 7); tg.stroke(); tg.restore(); }
  const tsuba = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, .008, 64), [new THREE.MeshStandardMaterial({ color: 0x2b2622, metalness: .7, roughness: .5 }),
    new THREE.MeshStandardMaterial({ map: canvasTex(tc, true), metalness: .6, roughness: .5 }), new THREE.MeshStandardMaterial({ map: canvasTex(tc, true), metalness: .6, roughness: .5 })]);
  tsuba.rotation.z = Math.PI / 2; tsuba.position.set(-.03, .016, 0); katana.add(tsuba);
  // chuôi tsuka: dây quấn đen hình thoi trên nền da cá đuối trắng
  const [hc, hg] = mk(1024, 256); hg.fillStyle = '#e9e2d0'; hg.fillRect(0, 0, 1024, 256); hg.fillStyle = '#141414';
  for (let x = -128; x < 1100; x += 96) { hg.beginPath(); hg.moveTo(x, 0); hg.lineTo(x + 60, 0); hg.lineTo(x + 140, 256); hg.lineTo(x + 80, 256); hg.fill();
    hg.beginPath(); hg.moveTo(x + 140, 0); hg.lineTo(x + 80, 0); hg.lineTo(x, 256); hg.lineTo(x + 60, 256); hg.fill(); }
  const tsuka = new THREE.Mesh(new THREE.CylinderGeometry(.016, .018, .25, 48, 1), new THREE.MeshStandardMaterial({ map: canvasTex(hc, true), roughness: .7 }));
  tsuka.rotation.z = Math.PI / 2; tsuka.position.set(-.16, .018, 0); katana.add(tsuka);
  const kashira = new THREE.Mesh(new THREE.SphereGeometry(.019, 24, 16), gold); kashira.scale.set(.6, 1, 1); kashira.position.set(-.287, .018, 0); katana.add(kashira);
  // giá kiếm sơn mài đen
  const lac = new THREE.MeshStandardMaterial({ color: 0x120d0b, metalness: .1, roughness: .25 });
  for (const x of [-.2, .35]) { const st = new THREE.Mesh(new THREE.BoxGeometry(.03, .12, .12), lac); st.position.set(x, -.06, 0); st.castShadow = st.receiveShadow = true; katana.add(st); }
  katana.position.set(-.18, .14, 0);
}

function camAt(K, t) {
  let a = K[0], b = K[K.length - 1];
  for (let i = 0; i < K.length - 1; i++) if (t >= K[i][0] && t < K[i + 1][0]) { a = K[i]; b = K[i + 1]; break; }
  const k = t <= K[0][0] ? 0 : t >= K[K.length - 1][0] ? 1 : smooth(a[0], b[0], t);
  return a.slice(1).map((v, i) => lerp(v, b[i + 1], k));
}
function renderAt(t) {
  const usePot = t < (FILM.pot[1] + FILM.katana[0]) / 2;
  pot.visible = usePot; katana.visible = !usePot;
  const c = camAt(usePot ? FILM.cams.pot : FILM.cams.katana, t);
  camera.position.set(c[0], c[1], c[2]); camera.lookAt(c[3], c[4], c[5]); camera.updateMatrixWorld(); camera.updateProjectionMatrix();
  pot.rotation.y = t * .25;
  katana.rotation.y = Math.sin(t * .5) * .35; katana.rotation.x = Math.sin(t * .3) * .08;
  renderer.render(scene, camera);
  const pv = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  return { pv: pv.elements.slice(), cam: camera.position.toArray() };
}
window.renderAt = renderAt; window.FILM_DUR = FILM.dur;
renderAt(FILM.pot[0]); window.READY = true;
