// Chụp từng khung nền 3D bằng Chromium ẩn: ghi ảnh JPEG + ma trận máy quay (để lớp 2D bám đúng vị trí).
// node pipeline/globe3d/capture.cjs <page.html> <thư_mục_ra> [w=1920] [h=1080] [fps=30] [still=giây,giây]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const [html, out, w = 1920, h = 1080, fps = 30, stills] = process.argv.slice(2);
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const pg = await b.newPage({ viewport: { width: +w, height: +h } });
  pg.on('pageerror', e => console.log('LỖI:', e.message));
  pg.on('console', m => { if (m.type() === 'error') console.log('LỖI trang:', m.text()); });
  await pg.goto('file://' + path.resolve(html) + `?w=${w}&h=${h}`);
  await pg.waitForFunction('window.READY === true', null, { timeout: 180000 });
  const grab = t => pg.evaluate(t => { const c = renderAt(t); c.img = document.querySelector('canvas').toDataURL('image/jpeg', .95); return c; }, t);
  // RANGES="a-b,c-d": chỉ chụp các khung trong các khoảng (giây); tên file theo chỉ số khung toàn phim
  let idx = null, times;
  if (process.env.RANGES) { idx = []; for (const r of process.env.RANGES.split(',')) { const [a, b2] = r.split('-').map(Number);
      for (let i = Math.ceil(a * fps); i <= Math.floor(b2 * fps); i++) idx.push(i); } times = idx.map(i => i / fps); }
  else times = stills ? stills.split(',').map(Number) : Array.from({ length: Math.round(await pg.evaluate('window.FILM_DUR') * fps) }, (_, i) => i / fps);
  const cams = [], st = Date.now();
  for (let i = 0; i < times.length; i++) {
    const c = await grab(times[i]);
    fs.writeFileSync(path.join(out, `f${String(idx ? idx[i] : i).padStart(5, '0')}.jpg`), Buffer.from(c.img.split(',')[1], 'base64'));
    cams.push({ i: idx ? idx[i] : i, t: times[i], pv: c.pv, cam: c.cam });
    if (i % 30 === 0) console.log(`khung ${i}/${times.length}  ${((Date.now() - st) / 1000 / (i + 1)).toFixed(2)} s/khung`);
  }
  fs.writeFileSync(path.join(out, 'cams.json'), JSON.stringify(cams));
  await b.close(); console.log('xong', out);
})();
