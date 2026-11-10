import sys
src, dst = sys.argv[1], sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(a,b):
    global s
    assert a in s, a[:90]; s=s.replace(a,b,1)

# CSS
rep('@media (prefers-reduced-motion: reduce) {', '''/* ===== 3D ===== */
.hero { position: relative; }
.hero > *:not(.hero-art) { position: relative; z-index: 1; }
.hero-art { position: absolute; right: 0; top: 41%; width: min(44%, 660px); aspect-ratio: 4 / 3; max-width: 100%; margin: 0; z-index: 0; pointer-events: none; perspective: 1200px; overflow: hidden; -webkit-mask-image: radial-gradient(ellipse 58% 58% at 56% 54%, #000 45%, transparent 80%); mask-image: radial-gradient(ellipse 58% 58% at 56% 54%, #000 45%, transparent 80%); animation: fade 1.4s .2s var(--ease) both; }
.hero-art img { width: 100%; height: 100%; object-fit: cover; display: block; mix-blend-mode: lighten; transform: rotateY(var(--ry, 0deg)) rotateX(var(--rx, 0deg)) scale(1.04); transition: transform .6s var(--ease); }
.hero-art .glow { position: absolute; left: 51%; top: 20%; width: 26%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, rgba(255,74,46,.35), transparent 65%); mix-blend-mode: screen; animation: pulse 3.2s ease-in-out infinite; }
@keyframes pulse { 50% { opacity: .45; transform: scale(.9); } }
@media (max-width: 1100px) {
  .hero-art { position: relative; top: auto; right: auto; width: 100%; max-width: 620px; margin: 36px auto 0; display: block; }
  .hero-art img { transform: none !important; }
}
.hero3d-old { position: absolute; top: 40%; right: calc(var(--gutter) * -1); width: min(46%, 720px); height: 54%; z-index: 0; display: block; }
.hero-foot { grid-template-columns: minmax(0, 1fr); justify-items: start; }
.hero-foot p { max-width: 46ch; }
@media (max-width: 1100px) { .hero3d { opacity: .45; } }
@media (max-width: 760px) { .hero3d { top: 30%; width: 100%; height: 50%; opacity: .25; } }
.hero3d-hint { position: absolute !important; right: 0; bottom: 18%; font-size: 10px; color: var(--dim); letter-spacing: .06em; }
@media (max-width: 860px) { .hero3d { pointer-events: none; } .hero3d-hint { display: none; } }
.t-logo .box3d { position: absolute; inset: 0; width: 100%; height: 100%; display: none; cursor: grab; touch-action: pan-y; }
.t-logo .box3d:active { cursor: grabbing; }
.t-logo.has3d .box3d { display: block; }
.t-logo.has3d #b-mark, .t-logo.has3d .word { visibility: hidden; }
.t-logo .drag-hint { position: absolute; right: 14px; bottom: 12px; font-size: 10px; opacity: .6; display: none; }
.t-logo.has3d .drag-hint { display: block; }
.t-logo .t { z-index: 1; }
.t-logo.has3d { background: radial-gradient(ellipse 60% 70% at 50% 45%, #34342f 0%, #1c1c1a 55%, #121211 100%) !important; border-color: var(--line) !important; min-height: 340px; }
.t-logo.has3d .t { color: var(--muted) !important; }
.t-logo.has3d .drag-hint { color: var(--muted); }

@media (prefers-reduced-motion: reduce) {''')

# HTML
rep('<div class="tile t-logo" id="b-logo"><span class="t">Logo</span>',
    '<div class="tile t-logo" id="b-logo"><canvas class="box3d" id="box3d" role="img" aria-label="Hộp sản phẩm 3D của thương hiệu"></canvas><span class="drag-hint cap">Kéo để xoay</span><span class="t">Logo</span>')
rep('<script>\nconst esc', '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n<script>\nconst esc')

# i18n entries
rep('const EN = {', 'const EN = {\n"Kéo để xoay": "Drag to rotate",\n"Bấm vào khối để xây lại": "Click a block to rebuild",')
rep('const EN_ATTR = {', 'const EN_ATTR = {\n"Hộp sản phẩm 3D của thương hiệu": "3D product box of the brand",')

# hook into renderBrand
rep('''  web.innerHTML = `<div class="bar"><i></i><i></i><i></i></div><div class="body"><b style="${fontCss}">${esc(line)}</b><span style="background:${c2}"></span></div>`;
}''','''  web.innerHTML = `<div class="bar"><i></i><i></i><i></i></div><div class="body"><b style="${fontCss}">${esc(line)}</b><span style="background:${c2}"></span></div>`;
  if (window.drawBox3D) window.drawBox3D({ name, letter, pk, p, pal, line, ind });
}''')

js = r'''
/* ---------- 3D ---------- */
const has3D = (() => { try { const c = document.createElement("canvas"); return !!(window.THREE && (c.getContext("webgl") || c.getContext("experimental-webgl"))); } catch { return false; } })();

function initHero3D() {
  const canvas = document.getElementById("hero3d");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0a0a, 14, 30);
  const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
  camera.position.set(8.5, 7.2, 10.5); camera.lookAt(0, 1.2, 0);

  scene.add(new THREE.HemisphereLight(0xfff4ec, 0x111111, .45));
  const key = new THREE.DirectionalLight(0xffffff, 1.5); key.position.set(6, 12, 7); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024); key.shadow.camera.left = -6; key.shadow.camera.right = 6; key.shadow.camera.top = 6; key.shadow.camera.bottom = -6; key.shadow.radius = 4; key.shadow.bias = -.0008;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xff4a2e, .45); rim.position.set(-7, 4, -6); scene.add(rim);
  const glow = new THREE.PointLight(0xff4a2e, 2.2, 6, 2); scene.add(glow);

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: .45 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const ring = new THREE.Mesh(new THREE.RingGeometry(2.9, 2.92, 96), new THREE.MeshBasicMaterial({ color: 0x3a3a36, transparent: true, opacity: .6 }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = .002; scene.add(ring);

  const group = new THREE.Group(); scene.add(group);
  const geo = new THREE.BoxGeometry(.92, .92, .92), edges = new THREE.EdgesGeometry(geo);
  const mats = [new THREE.MeshStandardMaterial({ color: 0x1f1f1d, roughness: .45, metalness: .25 }), new THREE.MeshStandardMaterial({ color: 0x2e2e2b, roughness: .4, metalness: .25 })];
  const matRed = new THREE.MeshStandardMaterial({ color: 0xff4a2e, roughness: .3, metalness: .1, emissive: 0xff2a10, emissiveIntensity: .35 });
  const lineMat = new THREE.LineBasicMaterial({ color: 0x5a5a54, transparent: true, opacity: .8 });
  const blocks = [];
  [4, 3, 2, 1].forEach((n, y) => {
    const off = (n - 1) / 2;
    for (let x = 0; x < n; x++) for (let z = 0; z < n; z++) {
      const top = n === 1;
      const m = new THREE.Mesh(geo, top ? matRed : mats[(x + z + y) % 2]);
      m.castShadow = true; m.receiveShadow = true;
      if (!top) m.add(new THREE.LineSegments(edges, lineMat));
      const target = new THREE.Vector3(x - off, y + .46, z - off);
      const dir = target.clone().setY(0); if (dir.lengthSq() < .01) dir.set(0, 0, 0); else dir.normalize();
      const b = { m, target, dir, y, lift: 0, start: new THREE.Vector3(), rot: new THREE.Euler(), delay: 0, born: 0 };
      group.add(m); blocks.push(b);
    }
  });
  const red = blocks[blocks.length - 1];

  // bụi sáng lơ lửng
  const N = 140, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - .5) * 14; pos[i * 3 + 1] = Math.random() * 8; pos[i * 3 + 2] = (Math.random() - .5) * 14; }
  const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xffb8a8, size: .045, transparent: true, opacity: .55, depthWrite: false }));
  scene.add(dust);

  let t0 = performance.now();
  function assemble() {
    t0 = performance.now();
    blocks.forEach(b => {
      b.start.set((Math.random() - .5) * 20, 9 + Math.random() * 9, (Math.random() - .5) * 20);
      b.rot.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      b.delay = b.y * .4 + Math.random() * .35;
    });
  }
  assemble();

  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(-9, -9);
  let mx = 0, my = 0, visible = true, raf = 0, explode = 0, hover = null;
  const ease = k => 1 - Math.pow(1 - k, 3);
  function frame(now) {
    const t = (now - t0) / 1000, T = now / 1000;
    // tách khối khi cuộn qua phần đầu trang
    const hero = canvas.parentElement.getBoundingClientRect();
    const ex = reduce ? 0 : Math.min(1, Math.max(0, -hero.top / (hero.height * .8)));
    explode += (ex - explode) * .12;
    // khối dưới con trỏ
    ray.setFromCamera(ptr, camera);
    const hit = ray.intersectObjects(blocks.map(b => b.m), false)[0];
    hover = hit ? blocks.find(b => b.m === hit.object) : null;
    canvas.style.cursor = hover ? "pointer" : "";
    blocks.forEach(b => {
      const e = reduce ? 1 : ease(Math.min(1, Math.max(0, (t - b.delay) / 1.15)));
      b.lift += ((b === hover && e === 1 ? .35 : 0) - b.lift) * .18;
      const spread = explode * (1.6 + b.y * .25);
      const tx = b.target.x + b.dir.x * spread, tz = b.target.z + b.dir.z * spread, ty = b.target.y + b.lift + explode * b.y * .9;
      b.m.position.set(b.start.x + (tx - b.start.x) * e, b.start.y + (ty - b.start.y) * e, b.start.z + (tz - b.start.z) * e);
      b.m.rotation.set(b.rot.x * (1 - e) + explode * (b.dir.z * .5), b.rot.y * (1 - e) + explode * b.y * .3, b.rot.z * (1 - e) - explode * (b.dir.x * .5));
    });
    if (!reduce && t > 2.6) {
      red.m.position.y += .14 + Math.sin(T * 1.6) * .12;
      matRed.emissiveIntensity = .35 + Math.sin(T * 2) * .15;
    }
    glow.position.copy(red.m.position).add(new THREE.Vector3(0, .2, 0)).applyEuler(group.rotation);
    const ry = .55 + (reduce ? 0 : T * .08 % (Math.PI * 2) * 0 + Math.sin(T * .2) * .25) + mx * .8;
    group.rotation.y += (ry - group.rotation.y) * (reduce ? 1 : .05);
    group.rotation.x += (my * .12 - group.rotation.x) * (reduce ? 1 : .05);
    dust.rotation.y = T * .02; dust.position.y = Math.sin(T * .3) * .2;
    renderer.render(scene, camera);
  }
  function size() { const r = canvas.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / Math.max(r.height, 1); camera.updateProjectionMatrix(); frame(performance.now()); }
  function loop() { cancelAnimationFrame(raf); const tick = now => { frame(now); if (visible && !reduce) raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); }
  addEventListener("pointermove", e => {
    mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5;
    const r = canvas.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  }, { passive: true });
  canvas.addEventListener("click", () => { if (hover && !reduce) { assemble(); } });
  addEventListener("resize", size);
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) loop(); }).observe(canvas);
  size(); loop();
}

function initBox3D() {
  const tile = document.getElementById("b-logo"), canvas = document.getElementById("box3d");
  tile.classList.add("has3d");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, .1, 50);
  camera.position.set(0, .9, 5.6); camera.lookAt(0, -.12, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x404040, .55));
  const d1 = new THREE.DirectionalLight(0xffffff, 1.1); d1.position.set(-3, 5, 4); scene.add(d1);
  const d2 = new THREE.DirectionalLight(0xffffff, .35); d2.position.set(4, 1, 3); scene.add(d2);
  const d3 = new THREE.DirectionalLight(0xff8a70, .45); d3.position.set(0, 3, -5); scene.add(d3);
  const W = 1.5, H = 1.9, D = .9, PX = 300;
  const dims = [[D, H], [D, H], [W, D], [W, D], [W, H], [W, H]]; // +x -x +y -y +z -z
  const faces = dims.map(([w, h]) => {
    const c = document.createElement("canvas"); c.width = Math.round(w * PX); c.height = Math.round(h * PX);
    const tx = new THREE.CanvasTexture(c); tx.anisotropy = 4; tx.encoding = THREE.sRGBEncoding;
    return { c, tx, mat: new THREE.MeshStandardMaterial({ map: tx, roughness: .62 }) };
  });
  const box = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), faces.map(f => f.mat));
  scene.add(box);
  const sh = new THREE.Mesh(new THREE.CircleGeometry(1.15, 48), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .4 }));
  sh.rotation.x = -Math.PI / 2; sh.position.y = -H / 2 - .18; sh.scale.set(1, .5, 1); scene.add(sh);

  const fam = f => f.replace(/"/g, "'");
  function fit(ctx, text, maxW, size, weight, family) {
    let s = size; do { ctx.font = `${weight} ${s}px ${family}`; s -= 2; } while (ctx.measureText(text).width > maxW && s > 10); return s + 2;
  }
  function shape(ctx, pk, cx, cy, r, color) {
    ctx.save(); ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineWidth = r * .12;
    if (pk === "warm" || pk === "playful") { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill(); }
    else if (pk === "minimal") { ctx.strokeRect(cx - r, cy - r, r * 2, r * 2); }
    else if (pk === "luxe") { ctx.translate(cx, cy); ctx.rotate(Math.PI / 4); ctx.lineWidth = r * .06; ctx.strokeRect(-r * .75, -r * .75, r * 1.5, r * 1.5); }
    else { ctx.beginPath(); ctx.moveTo(cx - r * .7, cy - r); ctx.lineTo(cx + r, cy - r); ctx.lineTo(cx + r * .7, cy + r); ctx.lineTo(cx - r, cy + r); ctx.closePath(); ctx.fill(); }
    ctx.restore();
  }
  let last = null;
  function draw(d) {
    last = d;
    const { name, letter, pk, p, pal, line, ind } = d, [c1, c2, c3, c4] = pal, family = fam(p.font), up = s => p.transform === "uppercase" ? s.toUpperCase() : s;
    const markIn = pk === "minimal" || pk === "luxe";
    const paint = (i, bg, fn) => { const { c, tx } = faces[i], ctx = c.getContext("2d"); ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height); ctx.textAlign = "center"; ctx.textBaseline = "middle"; fn(ctx, c.width, c.height); tx.needsUpdate = true; };
    // mặt trước
    paint(4, c3, (ctx, w, h) => {
      const r = w * .17, cy = h * .36;
      shape(ctx, pk, w / 2, cy, r, c1);
      ctx.fillStyle = markIn ? c1 : on(c1); ctx.font = `${p.weight} ${r * (pk === "luxe" ? .8 : 1.1)}px ${family}`; ctx.fillText(letter, w / 2, cy + r * .04);
      ctx.fillStyle = c1; fit(ctx, up(name), w * .82, w * .14, p.weight, family); ctx.fillText(up(name), w / 2, h * .66);
      ctx.fillStyle = on(c3); ctx.globalAlpha = .7; ctx.font = `600 ${w * .062}px Inter Tight, sans-serif`; ctx.fillText(ind.label.toUpperCase(), w / 2, h * .88); ctx.globalAlpha = 1;
    });
    // mặt sau
    paint(5, c1, (ctx, w, h) => {
      ctx.fillStyle = on(c1); fit(ctx, up(line), w * .8, w * .09, p.weight, family); ctx.fillText(up(line), w / 2, h / 2);
      ctx.globalAlpha = .6; ctx.font = `500 ${w * .04}px Inter Tight, sans-serif`; ctx.fillText("bunchasake.com", w / 2, h * .9); ctx.globalAlpha = 1;
    });
    // hai mặt bên
    [0, 1].forEach(i => paint(i, c1, (ctx, w, h) => {
      ctx.save(); ctx.translate(w / 2, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillStyle = on(c1);
      fit(ctx, up(i === 0 ? line : name), h * .8, w * .2, p.weight, family); ctx.fillText(up(i === 0 ? line : name), 0, 0); ctx.restore();
    }));
    // nắp và đáy
    paint(2, c2, (ctx, w, h) => { shape(ctx, pk, w / 2, h / 2, h * .26, on(c2)); ctx.fillStyle = markIn ? on(c2) : c2; ctx.font = `${p.weight} ${h * .3}px ${family}`; ctx.fillText(letter, w / 2, h / 2 + h * .01); });
    paint(3, c4, () => {});
    render();
  }
  let spin = 0, drawn = false;
  window.drawBox3D = d => { tile.classList.add("has3d"); draw(d); if (drawn && !reduce) spin = 1; drawn = true; };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => last && draw(last));

  let rotY = -.62, rotX = .1, vel = 0, dragging = false, px = 0, py = 0, visible = true, raf = 0;
  function size() { const r = canvas.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / Math.max(r.height, 1); camera.updateProjectionMatrix(); render(); }
  function render() { box.rotation.set(rotX, rotY, 0); renderer.render(scene, camera); }
  canvas.addEventListener("pointerdown", e => { dragging = true; px = e.clientX; py = e.clientY; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointermove", e => { if (!dragging) return; vel = (e.clientX - px) * .01; rotY += vel; rotX = Math.max(-.5, Math.min(.6, rotX + (e.clientY - py) * .006)); px = e.clientX; py = e.clientY; render(); });
  ["pointerup", "pointercancel"].forEach(ev => canvas.addEventListener(ev, () => { dragging = false; }));
  function loop() { cancelAnimationFrame(raf); const tick = now => { if (!dragging) { vel *= .95; rotY += .0035 + vel + spin * .32; spin *= .9; if (spin < .01) spin = 0; } box.position.y = Math.sin(now / 800) * .06; sh.scale.set(1 - box.position.y * .8, .5 - box.position.y * .4, 1); render(); if (visible && !reduce) raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); }
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) loop(); }).observe(canvas);
  addEventListener("resize", size);
  size(); loop();
}

(() => { const art = document.getElementById("heroArt"); if (!art || reduce) return; addEventListener("pointermove", e => { const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5; art.style.setProperty("--ry", (x * 6).toFixed(2) + "deg"); art.style.setProperty("--rx", (-y * 4).toFixed(2) + "deg"); }, { passive: true }); })();
if (has3D) { try { initBox3D(); build(false); } catch (err) { console.warn("3D tắt:", err); document.getElementById("b-logo").classList.remove("has3d"); } }
'''
i = s.rindex('</script>')
s = s[:i] + js + s[i:]
open(dst,'w',encoding='utf-8').write(s)
print('ok')
