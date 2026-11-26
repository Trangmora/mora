// Chụp từng khung bằng Chromium ẩn rồi đẩy thẳng vào ffmpeg. Dùng:
// node tools/capture.cjs <dist/phim.html> <out.mp4> [w=1280] [h=720] [fps=30] [t0=0] [t1=DUR] [still=giây,giây,...]
const { chromium } = require('playwright'); const { spawn } = require('child_process'); const fs = require('fs'); const path = require('path');
(async () => {
const [html, out, w = 1280, h = 720, fps = 30, t0a, t1a, stills] = process.argv.slice(2);
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const pg = await b.newPage({ viewport: { width: +w, height: +h } });
pg.on('console', m => { if (m.type() === 'error') console.log('LỖI trang:', m.text()); }); pg.on('pageerror', e => console.log('LỖI:', e.message));
await pg.goto('file://' + path.resolve(html) + `?cap=1&w=${w}&h=${h}` + (process.env.CAM ? '&cam=' + process.env.CAM : '')); await pg.waitForFunction('window.READY === true', null, { timeout: 120000 });
const grab = t => pg.evaluate(t => { renderAt(t); return document.querySelector('canvas').toDataURL('image/jpeg', .93); }, t).then(u => Buffer.from(u.split(',')[1], 'base64'));
if (stills) { for (const s of stills.split(',')) { fs.writeFileSync(`${out}_${s}.jpg`, await grab(+s)); console.log('ảnh', s); } await b.close(); process.exit(0); }
const dur = await pg.evaluate('window.FILM_DUR'), t0 = +(t0a || 0), t1 = +(t1a || dur), n = Math.round((t1 - t0) * fps);
const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', out], { stdio: ['pipe', 'inherit', 'inherit'] });
const st = Date.now();
for (let i = 0; i < n; i++) { const buf = await grab(t0 + i / fps); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (i % 60 === 0) console.log(`khung ${i}/${n}  ${((Date.now() - st) / 1000 / (i + 1)).toFixed(2)} s/khung`); }
ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log('xong', out);
})();
