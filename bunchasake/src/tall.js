const { chromium } = require('playwright'); const fs = require('fs'); const B = process.argv[2] || 'http://localhost:8765';
(async () => { const b = await chromium.launch();
  const sm = fs.readFileSync('/home/user/mora/bunchasake/site/sitemap.xml', 'utf8'); const urls = [...sm.matchAll(/<loc>https:\/\/bunchasake\.com([^<]+)<\/loc>/g)].map(m => m[1]);
  let bad = 0;
  for (const [w, h] of [[390, 844], [1440, 900]]) { const p = await b.newPage({ viewport: { width: w, height: h } }); let errs = [];
    p.on('pageerror', e => errs.push(e.message));
    for (const u of urls) { errs = []; const r = await p.goto(B + u, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(150);
      const sw = await p.evaluate(() => document.documentElement.scrollWidth), lang = await p.evaluate(() => document.documentElement.lang), h1 = await p.evaluate(() => document.querySelectorAll('h1').length);
      const wantVi = u === '/' || u.startsWith('/vi/');   /* trang chủ gốc là tiếng Việt, tiếng Anh ở /en/ */
      if (r.status() !== 200 || sw > w + 1 || errs.length || (lang === 'vi') !== wantVi || h1 !== 1) { bad++; console.log('PROBLEM', w, u, r.status(), 'sw', sw, 'lang', lang, 'h1', h1, errs.join('; ')); } }
    await p.close(); }
  console.log(urls.length, 'URLs x 2 widths checked, problems:', bad); await b.close(); })();
