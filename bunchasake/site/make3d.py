import sys
src, dst = sys.argv[1], sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(a,b):
    global s
    assert a in s, a[:90]; s=s.replace(a,b,1)

# CSS
rep('@media (prefers-reduced-motion: reduce) {', '''/* ===== 3D ===== */
.hero { position: relative; }
.hero > *:not(.hero3d) { position: relative; z-index: 1; }
.hero3d { position: absolute; top: 40%; right: calc(var(--gutter) * -1); width: min(46%, 720px); height: 54%; z-index: 0; pointer-events: none; display: block; }
.hero-foot { grid-template-columns: minmax(0, 1fr); justify-items: start; }
.hero-foot p { max-width: 46ch; }
@media (max-width: 1100px) { .hero3d { opacity: .45; } }
@media (max-width: 760px) { .hero3d { top: 30%; width: 100%; height: 50%; opacity: .25; } }
.t-logo .box3d { position: absolute; inset: 0; width: 100%; height: 100%; display: none; cursor: grab; touch-action: pan-y; }
.t-logo .box3d:active { cursor: grabbing; }
.t-logo.has3d .box3d { display: block; }
.t-logo.has3d #b-mark, .t-logo.has3d .word { visibility: hidden; }
.t-logo .drag-hint { position: absolute; right: 14px; bottom: 12px; font-size: 10px; opacity: .6; display: none; }
.t-logo.has3d .drag-hint { display: block; }
.t-logo .t { z-index: 1; }
.t-logo.has3d { background: #1B1B1A !important; border-color: var(--line) !important; }
.t-logo.has3d .t { color: var(--muted) !important; }
.t-logo.has3d .drag-hint { color: var(--muted); }

@media (prefers-reduced-motion: reduce) {''')

# HTML
rep('  <section class="hero">\n', '  <section class="hero">\n    <canvas class="hero3d" id="hero3d" aria-hidden="true"></canvas>\n')
rep('<div class="tile t-logo" id="b-logo"><span class="t">Logo</span>',
    '<div class="tile t-logo" id="b-logo"><canvas class="box3d" id="box3d" role="img" aria-label="Hộp sản phẩm 3D của thương hiệu"></canvas><span class="drag-hint cap">Kéo để xoay</span><span class="t">Logo</span>')
rep('<script>\nconst esc', '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n<script>\nconst esc')

# i18n entries
rep('const EN = {', 'const EN = {\n"Kéo để xoay": "Drag to rotate",')
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
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
  camera.position.set(8.5, 7.2, 10.5); camera.lookAt(0, 1.2, 0);
  scene.add(new THREE.AmbientLight(0xffffff, .35));
  const key = new THREE.DirectionalLight(0xffffff, 1.15); key.position.set(5, 10, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0xff4a2e, .35); rim.position.set(-7, 3, -5); scene.add(rim);
  const group = new THREE.Group(); scene.add(group);
  const geo = new THREE.BoxGeometry(.92, .92, .92), edges = new THREE.EdgesGeometry(geo);
  const mats = [new THREE.MeshStandardMaterial({ color: 0x1b1b19, roughness: .6, metalness: .1 }), new THREE.MeshStandardMaterial({ color: 0x2b2b28, roughness: .5, metalness: .1 })];
  const matRed = new THREE.MeshStandardMaterial({ color: 0xff4a2e, roughness: .35, emissive: 0x3a0a04 });
  const lineMat = new THREE.LineBasicMaterial({ color: 0x55554f });
  const blocks = [];
  [4, 3, 2, 1].forEach((n, y) => {
    const off = (n - 1) / 2;
    for (let x = 0; x < n; x++) for (let z = 0; z < n; z++) {
      const top = n === 1;
      const m = new THREE.Mesh(geo, top ? matRed : mats[(x + z + y) % 2]);
      if (!top) m.add(new THREE.LineSegments(edges, lineMat));
      const target = new THREE.Vector3(x - off, y + .46, z - off);
      const start = new THREE.Vector3((Math.random() - .5) * 20, 9 + Math.random() * 9, (Math.random() - .5) * 20);
      const rot = new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      group.add(m); blocks.push({ m, target, start, rot, delay: y * .4 + Math.random() * .35 });
    }
  });
  const red = blocks[blocks.length - 1];
  function size() { const r = canvas.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / Math.max(r.height, 1); camera.updateProjectionMatrix(); frame(performance.now()); }
  let mx = 0, my = 0, visible = true, raf = 0;
  const t0 = performance.now(), ease = k => 1 - Math.pow(1 - k, 3);
  function frame(now) {
    const t = (now - t0) / 1000;
    blocks.forEach(b => {
      const e = reduce ? 1 : ease(Math.min(1, Math.max(0, (t - b.delay) / 1.15)));
      b.m.position.lerpVectors(b.start, b.target, e);
      b.m.rotation.set(b.rot.x * (1 - e), b.rot.y * (1 - e), b.rot.z * (1 - e));
    });
    if (!reduce && t > 2.6) red.m.position.y = red.target.y + .14 + Math.sin(t * 1.6) * .12;
    const ry = .55 + (reduce ? 0 : Math.sin(t * .2) * .2) + mx * .7;
    group.rotation.y += (ry - group.rotation.y) * (reduce ? 1 : .05);
    group.rotation.x += (my * .14 - group.rotation.x) * (reduce ? 1 : .05);
    renderer.render(scene, camera);
  }
  function loop() { cancelAnimationFrame(raf); const tick = now => { frame(now); if (visible && !reduce) raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); }
  addEventListener("pointermove", e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
  addEventListener("resize", size);
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) loop(); }).observe(canvas);
  size(); loop();
}

function initBox3D() {
  const tile = document.getElementById("b-logo"), canvas = document.getElementById("box3d");
  tile.classList.add("has3d");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, .1, 50);
  camera.position.set(0, .6, 5.1); camera.lookAt(0, -.05, 0);
  scene.add(new THREE.AmbientLight(0xffffff, .6));
  const d1 = new THREE.DirectionalLight(0xffffff, .85); d1.position.set(3, 5, 4); scene.add(d1);
  const d2 = new THREE.DirectionalLight(0xffffff, .25); d2.position.set(-4, -1, 2); scene.add(d2);
  const W = 1.5, H = 1.9, D = .9, PX = 300;
  const dims = [[D, H], [D, H], [W, D], [W, D], [W, H], [W, H]]; // +x -x +y -y +z -z
  const faces = dims.map(([w, h]) => {
    const c = document.createElement("canvas"); c.width = Math.round(w * PX); c.height = Math.round(h * PX);
    const tx = new THREE.CanvasTexture(c); tx.anisotropy = 4;
    return { c, tx, mat: new THREE.MeshStandardMaterial({ map: tx, roughness: .62 }) };
  });
  const box = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), faces.map(f => f.mat));
  scene.add(box);
  const sh = new THREE.Mesh(new THREE.CircleGeometry(1.15, 48), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .22 }));
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
      ctx.fillStyle = on(c3); ctx.globalAlpha = .7; ctx.font = `500 ${w * .045}px Inter Tight, sans-serif`; ctx.fillText(ind.label.toUpperCase(), w / 2, h * .9); ctx.globalAlpha = 1;
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
  window.drawBox3D = d => { tile.classList.add("has3d"); draw(d); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => last && draw(last));

  let rotY = -.5, rotX = .12, vel = 0, dragging = false, px = 0, py = 0, visible = true, raf = 0;
  function size() { const r = canvas.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / Math.max(r.height, 1); camera.updateProjectionMatrix(); render(); }
  function render() { box.rotation.set(rotX, rotY, 0); renderer.render(scene, camera); }
  canvas.addEventListener("pointerdown", e => { dragging = true; px = e.clientX; py = e.clientY; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointermove", e => { if (!dragging) return; vel = (e.clientX - px) * .01; rotY += vel; rotX = Math.max(-.5, Math.min(.6, rotX + (e.clientY - py) * .006)); px = e.clientX; py = e.clientY; render(); });
  ["pointerup", "pointercancel"].forEach(ev => canvas.addEventListener(ev, () => { dragging = false; }));
  function loop() { cancelAnimationFrame(raf); const tick = () => { if (!dragging) { vel *= .95; rotY += .006 + vel; } render(); if (visible && !reduce) raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); }
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) loop(); }).observe(canvas);
  addEventListener("resize", size);
  size(); loop();
}

if (has3D) { try { initHero3D(); initBox3D(); build(false); } catch (err) { console.warn("3D tắt:", err); document.getElementById("b-logo").classList.remove("has3d"); } }
'''
i = s.rindex('</script>')
s = s[:i] + js + s[i:]
open(dst,'w',encoding='utf-8').write(s)
print('ok')
