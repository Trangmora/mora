#!/usr/bin/env node
/* Bunchasake – dựng website tĩnh.
 *   node bunchasake/src/build.cjs
 * Đọc:  src/home.html (trang chủ, nguồn tiếng Việt + từ điển EN), src/lp.css, content/landing/*.json, content/blog/*.html
 * Ghi:  site/ (thư mục Cloudflare Pages deploy): index.html, vi/, các landing page, blog, sitemap.xml, robots.txt, llms.txt…
 * Cần Playwright (để dựng sẵn trang chủ theo từng ngôn ngữ).
 */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), SITE = path.join(ROOT, "site"), CONTENT = path.join(ROOT, "content");
const ORIGIN = "https://bunchasake.com", MAIL = "hello@bunchasake.com";
const TODAY = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);
const PUBLISHED = "2026-11-11";
const INDEXNOW_KEY = "b7c1e0d94a6f4e2f9d3a58c06e1f72ab";
const LANGS = ["en", "vi"];
const CSS_V = require("crypto").createHash("md5").update(fs.readFileSync(path.join(__dirname, "lp.css"))).digest("hex").slice(0, 8);
const warn = []; const W = m => { warn.push(m); };

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const strip = h => String(h ?? "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const words = h => strip(h).split(/\s+/).filter(Boolean).length;
const ld = o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;
const write = (rel, data) => { const f = path.join(SITE, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); };

/* ---------- Dữ liệu chung ---------- */
const PROJECTS = {
  "chop-chop": { name: "Chop Chop", en: "Restaurant", vi: "Nhà hàng", img: "chop-chop.jpg", url: "https://www.facebook.com/thaichopchop" },
  "borgo-villa-nemec": { name: "Borgo Villa Nemec", en: "Villa · Italy", vi: "Villa · Ý", img: "borgo-villa-nemec.svg", url: "https://borgovillanemec.it/" },
  "impact-investments": { name: "Impact Investments", en: "Investment · Italy", vi: "Đầu tư · Ý", img: "impact-investments.jpg", url: "https://impactinvestments.it/en/" },
  "viet-my-clean-home": { name: "Viet My Clean Home", en: "Home services · Hanoi", vi: "Dịch vụ gia đình · Hà Nội", img: "viet-my-clean-home.jpg", url: "https://www.facebook.com/Dichvudonnhataihanoi" },
  "bac-si-anh": { name: "Bác Sĩ Ánh", en: "Healthcare · Personal brand", vi: "Y tế · Thương hiệu cá nhân", img: "bac-si-anh.jpg", url: "https://www.facebook.com/profile.php?id=61596245068595" },
  "canasto-de-flores": { name: "Canasto de Flores", en: "Flowers · Landscaping", vi: "Hoa tươi · Cảnh quan", img: "canasto-de-flores.jpg", url: "https://www.instagram.com/canastodeflores/" },
  "lac-hong": { name: "Lạc Hồng", en: "Construction machinery", vi: "Máy xây dựng", img: "lac-hong.jpg", url: "https://www.lachongshop.com/" },
  "talk2thetop": { name: "Talk2TheTop", en: "Podcast", vi: "Podcast", img: "talk2thetop.jpg", url: "https://youtube.com/@Talk2TheTop" },
  "navi-living": { name: "NA-VI Living", en: "Hospitality", vi: "Lưu trú", img: "navi-living.jpg", url: "https://www.naviliving.com/" },
  "vestra-place": { name: "Vestra Place", en: "Coworking", vi: "Coworking", img: "vestra-place.jpg", url: "https://www.instagram.com/vestra_place/" },
  "vina-ktv": { name: "Vina KTV", en: "Audio equipment", vi: "Thiết bị âm thanh", img: "vina-ktv.jpg", url: "https://vinaktv.com/" },
};
const LANDING_ORDER = ["nail-salon-brand-marketing", "restaurant-brand-marketing", "vietnamese-diaspora-brand-marketing", "international-brand-marketing-vietnam", "social-media-automation", "social-media-automation-for-nail-salons", "social-media-automation-for-restaurants"];
const LABEL = {
  "nail-salon-brand-marketing": { en: "Nail salons", vi: "Tiệm nail" },
  "restaurant-brand-marketing": { en: "Restaurants & food", vi: "Nhà hàng & F&B" },
  "vietnamese-diaspora-brand-marketing": { en: "Vietnamese businesses abroad", vi: "Doanh nghiệp Việt ở nước ngoài" },
  "international-brand-marketing-vietnam": { en: "Vietnamese brands going global", vi: "Thương hiệu Việt ra quốc tế" },
  "social-media-automation": { en: "AI social media automation", vi: "AI tự động hoá social media" },
  "social-media-automation-for-nail-salons": { en: "AI automation for nail salons", vi: "AI Automation cho tiệm nail" },
  "social-media-automation-for-restaurants": { en: "AI automation for restaurants", vi: "AI Automation cho nhà hàng" },
};
const T = {
  en: { home: "Home", blog: "Blog", work: "Work", emailUs: "Email us", seeWork: "See our work", fromBlog: "From the blog", faq: "Questions, answered", step: "Step", takeaways: "Key takeaways", updated: "Updated", minRead: "min read", toc: "In this article", all: "All articles", who: "Who we work with", automation: "AI Automation", byMail: "Contact by email", write: "Write an email", copy: "Copy", copied: "Copied", footH: "Tell us <em>your story.</em>", footP: "Write us a few lines about your business. We read it, prepare our questions, and set up a 60-minute conversation.", skip: "Skip to content", navNail: "Nail salons", navRest: "Restaurants", tagline: "Brand Builder · Growth Partner", based: "Vietnam · Italy · Online", top: "Back to top ↑", related: "Related service", readGuide: "Read the guide", blogKicker: "Blog", blogH: "Practical guides for <em>owner-run brands.</em>", blogLead: "Plain, usable advice on branding, content and social media for small business owners and growing brands.", blogTitle: "Blog: Branding & Social Media Guides | Bunchasake", blogDesc: "Practical guides on branding, content and social media for nail salons, restaurants, small businesses and brands going international.", nfTitle: "Page not found | Bunchasake", nfH: "This page is <em>not here.</em>", nfP: "The link may be old or mistyped. These will get you back on track:", moreServices: "Services", by: "By Bunchasake", byEd: "By the Bunchasake team", published: "Published", edNote: "Written by the Bunchasake team, the people who build brands and set up AI social media automation between Vietnam and Italy. We update this guide when the advice changes.", aboutH: "About Bunchasake", aboutP: "Bunchasake is a brand builder and growth partner working between Vietnam and Italy, in Vietnamese and English. We turn a founder\u2019s story into a brand and set up AI social media automation that the client\u2019s own team runs." },
  vi: { home: "Trang chủ", blog: "Blog", work: "Dự án", emailUs: "Gửi email", seeWork: "Xem dự án", fromBlog: "Từ blog", faq: "Câu hỏi thường gặp", step: "Bước", takeaways: "Ý chính", updated: "Cập nhật", minRead: "phút đọc", toc: "Trong bài này", all: "Tất cả bài viết", who: "Dành cho ai", automation: "AI Automation", byMail: "Liên hệ email", write: "Viết email", copy: "Sao chép", copied: "Đã chép", footH: "Kể chúng tôi nghe <em>câu chuyện của bạn.</em>", footP: "Viết cho chúng tôi vài dòng về doanh nghiệp của bạn. Chúng tôi đọc, chuẩn bị câu hỏi và hẹn một buổi trò chuyện 60 phút.", skip: "Bỏ qua, tới nội dung", navNail: "Tiệm nail", navRest: "Nhà hàng", tagline: "Brand Builder · Growth Partner", based: "Việt Nam · Ý · Online", top: "Lên đầu trang ↑", related: "Dịch vụ liên quan", readGuide: "Đọc bài viết", blogKicker: "Blog", blogH: "Hướng dẫn thực tế cho <em>chủ doanh nghiệp.</em>", blogLead: "Lời khuyên dễ hiểu, làm được ngay về thương hiệu, content và social media cho chủ doanh nghiệp nhỏ và thương hiệu đang lớn.", blogTitle: "Blog: Hướng dẫn thương hiệu & social media | Bunchasake", blogDesc: "Hướng dẫn thực tế về thương hiệu, content và social media cho tiệm nail, nhà hàng, doanh nghiệp nhỏ và thương hiệu ra quốc tế.", nfTitle: "Không tìm thấy trang | Bunchasake", nfH: "Trang này <em>không có ở đây.</em>", nfP: "Có thể đường dẫn đã cũ hoặc gõ nhầm. Bạn thử các trang sau:", moreServices: "Dịch vụ", by: "Bunchasake", byEd: "Bởi đội ngũ Bunchasake", published: "Đăng", edNote: "Bài do đội ngũ Bunchasake viết, những người xây thương hiệu và dựng hệ thống AI automation cho social media giữa Việt Nam và Ý. Chúng tôi cập nhật bài khi lời khuyên thay đổi.", aboutH: "Về Bunchasake", aboutP: "Bunchasake là brand builder và growth partner, làm việc giữa Việt Nam và Ý, bằng tiếng Việt và tiếng Anh. Chúng tôi biến câu chuyện của người sáng lập thành thương hiệu và dựng hệ thống AI automation cho social media để đội của bạn tự vận hành." },
};
const HOME = {
  en: { title: "Bunchasake | Brand & Growth Partner for Vietnamese Businesses", desc: "Brand studio for Vietnamese-owned businesses abroad and Vietnamese brands going global. Branding and social media automation, in English and Vietnamese." },
  vi: { title: "Bunchasake | Xây thương hiệu & tăng trưởng cho doanh nghiệp Việt", desc: "Bunchasake xây thương hiệu và tự động hoá social media cho chủ doanh nghiệp Việt ở nước ngoài và thương hiệu Việt ra quốc tế. Song ngữ Việt – Anh." },
};
const ORG = { "@type": "Organization", "@id": ORIGIN + "/#org", name: "Bunchasake", url: ORIGIN + "/", logo: ORIGIN + "/apple-touch-icon.png", image: ORIGIN + "/og.png", email: MAIL, slogan: "You run the business. We grow the brand.", description: "Bunchasake is a brand builder and growth partner: a Vietnamese studio working between Vietnam and Italy that builds brands and sets up social media automation for Vietnamese business owners abroad and Vietnamese brands going international.", knowsLanguage: ["vi", "en"], areaServed: ["Vietnam", "Italy", "Worldwide (online)"], parentOrganization: { "@type": "Organization", name: "Impact Investments S.R.L.", vatID: "IT01331310324", address: { "@type": "PostalAddress", streetAddress: "Via Guido Zanetti 1", postalCode: "34133", addressLocality: "Trieste", addressRegion: "TS", addressCountry: "IT" } }, knowsAbout: ["Brand strategy", "Brand identity", "Bilingual Vietnamese and English content", "Social media automation", "Nail salon branding", "Restaurant branding"] };

/* ---------- Đọc nội dung ---------- */
const landing = {}, blog = {};   // key -> { en: {...}, vi: {...} }
for (const f of fs.existsSync(CONTENT + "/landing") ? fs.readdirSync(CONTENT + "/landing") : []) {
  const m = /^(.+)\.(en|vi)\.json$/.exec(f); if (!m) continue;
  try { (landing[m[1]] ||= {})[m[2]] = JSON.parse(fs.readFileSync(`${CONTENT}/landing/${f}`, "utf8")); } catch (e) { W(`landing/${f}: JSON lỗi – ${e.message}`); }
}
for (const f of fs.existsSync(CONTENT + "/blog") ? fs.readdirSync(CONTENT + "/blog") : []) {
  const m = /^(.+)\.(en|vi)\.html$/.exec(f); if (!m) continue;
  const raw = fs.readFileSync(`${CONTENT}/blog/${f}`, "utf8"), fm = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw.trimStart());
  if (!fm) { W(`blog/${f}: thiếu frontmatter`); continue; }
  const d = { takeaways: [], body: fm[2].trim() };
  for (const line of fm[1].split(/\r?\n/)) { const k = /^([a-z0-9_]+):\s*(.*)$/.exec(line); if (!k) continue; if (k[1] === "takeaway") d.takeaways.push(k[2].trim()); else d[k[1]] = k[2].trim().replace(/^"(.*)"$/, "$1"); }
  if (!d.slug || !d.title || !d.h1) { W(`blog/${f}: thiếu slug/title/h1`); continue; }
  (blog[m[1]] ||= {})[m[2]] = d;
}
const landingKeys = [...LANDING_ORDER.filter(k => landing[k]), ...Object.keys(landing).filter(k => !LANDING_ORDER.includes(k))];
const BLOG_ORDER = ["how-to-get-more-nail-clients", "nail-salon-social-media-content-ideas", "nail-salon-instagram-content-ideas", "google-business-profile-for-nail-salons", "how-to-market-a-vietnamese-restaurant", "restaurant-instagram-content-ideas", "how-vietnamese-business-owners-abroad-can-build-a-brand", "bilingual-marketing-for-vietnamese-businesses-abroad", "how-vietnamese-brands-can-enter-european-markets", "ai-content-calendar-for-small-business"];
const blogKeys = [...BLOG_ORDER.filter(k => blog[k]), ...Object.keys(blog).filter(k => !BLOG_ORDER.includes(k))];

/* ---------- URL ---------- */
const pre = l => l === "vi" ? "/vi" : "";
const U = {
  home: l => pre(l) + "/",
  blogindex: l => pre(l) + "/blog/",
  landing: (k, l) => landing[k]?.[l] ? `${pre(l)}/${landing[k][l].slug}/` : null,
  blog: (k, l) => blog[k]?.[l] ? `${pre(l)}/blog/${blog[k][l].slug}/` : null,
};
const EXT = {   // liên kết ngoài được phép dùng trong bài (chỉ trang chính thức)
  "gbp": "https://business.google.com/", "gbp-help": "https://support.google.com/business/",
  "ig-business": "https://business.instagram.com/", "ig-help": "https://help.instagram.com/",
  "meta-business": "https://www.facebook.com/business/", "tiktok-business": "https://www.tiktok.com/business/",
  "yelp-business": "https://business.yelp.com/", "tripadvisor-owners": "https://www.tripadvisor.com/Owners", "whatsapp-business": "https://business.whatsapp.com/",
  "google-seo-guide": "https://developers.google.com/search/docs/fundamentals/seo-starter-guide", "google-helpful-content": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
  "eu-access2markets": "https://trade.ec.europa.eu/access-to-markets/", "eu-youreurope": "https://europa.eu/youreurope/business/",
  "euipo": "https://www.euipo.europa.eu/", "wipo-madrid": "https://www.wipo.int/madrid/en/", "vietrade": "https://www.vietrade.gov.vn/",
  "sba": "https://www.sba.gov/", "ftc-business": "https://www.ftc.gov/business-guidance",
  "fda-cosmetics": "https://www.fda.gov/cosmetics", "eu-cosmetics": "https://single-market-economy.ec.europa.eu/sectors/cosmetics_en", "linkedin-help": "https://www.linkedin.com/help/linkedin", "wcag": "https://www.w3.org/WAI/standards-guidelines/wcag/", "pagespeed": "https://pagespeed.web.dev/", "etsy-sellers": "https://www.etsy.com/seller-handbook",
};
const mailto = subj => `mailto:${MAIL}${subj ? "?subject=" + encodeURIComponent(subj) : ""}`;
function resolve(html, l, where) {
  html = String(html ?? "").replace(/href="\{\{\s*ext:([a-z0-9-]+)\s*\}\}"/g, (m, k) => EXT[k] ? `href="${EXT[k]}" target="_blank" rel="noopener"` : (W(`${where}: liên kết ngoài ${m} không có trong danh sách`), 'href="' + U.home(l) + '"'));
  return html.replace(/\{\{\s*([a-z]+)(?::([a-z0-9-]+))?\s*\}\}/g, (m, t, k) => {
    if (t === "home") return U.home(l);
    if (t === "blogindex") return U.blogindex(l);
    if (t === "work") return U.home(l) + "#du-an";
    if (t === "mail") return mailto();
    if (t === "landing" || t === "blog") { const u = U[t](k, l) || U[t](k, "en"); if (u) return u; W(`${where}: liên kết ${m} không có trang`); return t === "blog" ? U.blogindex(l) : U.home(l); }
    W(`${where}: placeholder lạ ${m}`); return U.home(l);
  });
}
const pages = [];   // { url:{en,vi}, lastmod, priority }
const alt = urls => LANGS.filter(l => urls[l]).map(l => `<link rel="alternate" hreflang="${l}" href="${ORIGIN}${urls[l]}">`).join("\n") + (urls.en ? `\n<link rel="alternate" hreflang="x-default" href="${ORIGIN}${urls.en}">` : "");

/* ---------- Khung trang ---------- */
function head({ l, title, desc, urls, type = "website", ldjson = [], cls = "" }) {
  return `<!doctype html>
<html lang="${l}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${ORIGIN}${urls[l]}">
${alt(urls)}
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="Bunchasake">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${ORIGIN}${urls[l]}">
<meta property="og:image" content="${ORIGIN}/og.png">
<meta property="og:locale" content="${l === "vi" ? "vi_VN" : "en_US"}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="#0A0A0A">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,400&display=swap">
<link rel="stylesheet" href="/assets/lp.css?v=${CSS_V}">
${ldjson.map(ld).join("\n")}
</head>
<body${cls ? ` class="${cls}"` : ""}>
<a class="skip" href="#main">${T[l].skip}</a>`;
}
function nav(l, urls, current, blogCur) {
  const t = T[l], a = (k, label) => U.landing(k, l) ? `<li><a href="${U.landing(k, l)}"${current === k ? ' aria-current="page"' : ""}>${label}</a></li>` : "";
  const lang = LANGS.map(x => urls[x] ? `<a href="${urls[x]}" hreflang="${x}" lang="${x}"${x === l ? ' aria-current="true"' : ""}>${x.toUpperCase()}</a>` : `<span>${x.toUpperCase()}</span>`).join("");
  return `<header class="nav" id="nav">
  <a class="logo" href="${U.home(l)}"><span class="dot" aria-hidden="true"></span>Bunchasake <i>${t.tagline}</i></a>
  <ul class="cap">${blogCur ? `<li><a href="${U.cat("automation", l)}"${blogCur === "automation" ? ' aria-current="page"' : ""}>${t.automation}</a></li><li><a href="${U.blogindex(l)}"${blogCur !== "automation" ? ' aria-current="page"' : ""}>${t.blog}</a></li>` : `${a("nail-salon-brand-marketing", t.navNail)}${a("restaurant-brand-marketing", t.navRest)}${a("social-media-automation", t.automation)}<li><a href="${U.blogindex(l)}"${current === "blog" ? ' aria-current="page"' : ""}>${t.blog}</a></li>`}</ul>
  <div class="nav-r"><div class="lang" role="group" aria-label="Language">${lang}</div><a class="pill" href="${mailto()}">${t.emailUs} <span aria-hidden="true">↗</span></a></div>
</header>`;
}
function foot(l, cta) {
  const t = T[l], link = (k) => U.landing(k, l) ? `<a href="${U.landing(k, l)}">${esc(LABEL[k]?.[l] || landing[k][l].kicker)}</a>` : "";
  const posts = blogKeys.filter(k => blog[k][l]).slice(0, 4).map(k => `<a href="${U.blog(k, l)}">${esc(blog[k][l].h1)}</a>`).join("");
  return `<footer class="foot" id="contact">
  <div class="foot-top">
    <div><h2>${cta?.h2 ? cta.h2 : t.footH}</h2><p class="sub">${cta?.p ? cta.p : t.footP}</p></div>
    <div class="mail-card">
      <span class="cap">${t.byMail}</span>
      <a class="mail-big" href="${mailto(cta?.subject)}" id="mail">${MAIL}</a>
      <div class="mail-act"><a class="btn" href="${mailto(cta?.subject)}">${t.write} <span aria-hidden="true">↗</span></a><button class="mail-copy" type="button" id="copyMail" data-done="${t.copied}">${t.copy}</button></div>
    </div>
  </div>
  <nav class="foot-cols" aria-label="Footer">
    <div><b class="cap">${t.who}</b>${["nail-salon-brand-marketing", "restaurant-brand-marketing", "vietnamese-diaspora-brand-marketing", "international-brand-marketing-vietnam"].map(link).join("")}</div>
    <div><b class="cap">${t.automation}</b>${["social-media-automation", "social-media-automation-for-nail-salons", "social-media-automation-for-restaurants"].map(link).join("")}</div>
    <div><b class="cap">${t.blog}</b>${posts}<a href="${U.blogindex(l)}">${t.all} →</a></div>
    <div><b class="cap">Bunchasake</b><a href="${U.home(l)}">${t.home}</a><a href="${U.home(l)}#du-an">${t.work}</a><a href="${mailto()}">${MAIL}</a></div>
  </nav>
  <div class="legal">
    <p>© 2026 Bunchasake — Built by Impact Investments S.R.L. · VAT ID IT01331310324 · Via Guido Zanetti 1, 34133 Trieste (TS), Italy</p>
    <p>Operated by Mora AI Business (household business) · Vietnam</p>
    <nav class="legal-links" aria-label="Legal"><a href="${mailto()}">${MAIL}</a><a href="${U.blogindex(l)}">Blog</a><a href="${U.home(l)}#goi">Pricing</a><a href="/privacy/">Privacy policy</a><a href="/terms/">Terms of service</a><a href="/refund-policy/">Refunds &amp; cancellations</a></nav>
  </div>
</footer>
<script>
(function () {
  var b = document.getElementById("copyMail"); if (!b) return;
  b.addEventListener("click", function () {
    var m = document.getElementById("mail").textContent, o = b.textContent;
    (navigator.clipboard ? navigator.clipboard.writeText(m) : Promise.reject()).then(function () { b.textContent = b.dataset.done; setTimeout(function () { b.textContent = o; }, 1800); }, function () {});
  });
})();
</script>
</body>
</html>
`;
}
const crumbs = (l, items) => `<ol class="crumbs">${items.map(([n, u]) => `<li>${u ? `<a href="${u}">${esc(n)}</a>` : `<span aria-current="page">${esc(n)}</span>`}</li>`).join("")}</ol>`;
const crumbLd = items => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map(([n, u], i) => ({ "@type": "ListItem", position: i + 1, name: n, ...(u ? { item: ORIGIN + u } : {}) })) });
const faqLd = (qa) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qa.map(x => ({ "@type": "Question", name: strip(x.q), acceptedAnswer: { "@type": "Answer", text: strip(x.a) } })) });
function clean(html, where) {
  if (/<script|<style|<iframe|\son[a-z]+\s*=|javascript:/i.test(html)) { W(`${where}: có thẻ/thuộc tính không cho phép, đã bỏ`); html = html.replace(/<(script|style|iframe)[\s\S]*?<\/\1>/gi, "").replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi, ""); }
  if (/https?:\/\//i.test(html.replace(/https:\/\/bunchasake\.com/g, ""))) W(`${where}: có liên kết ngoài`);
  return html;
}
const relatedList = (l, keys, where) => { const items = (keys || []).filter(k => { if (!blog[k]?.[l]) { if (!blog[k]) W(`${where}: related "${k}" không có bài`); return false; } return true; }); return items.length ? `<div class="links">${items.map(k => `<a href="${U.blog(k, l)}"><span style="color:inherit;transform:none">${esc(blog[k][l].h1)}<small>${esc(blog[k][l].description || "")}</small></span><span aria-hidden="true">→</span></a>`).join("")}</div>` : ""; };

/* ---------- Landing ---------- */
function renderLanding(k, l) {
  const d = landing[k][l], t = T[l], where = `landing/${k}.${l}`, R = h => resolve(clean(h, where), l, where);
  const urls = Object.fromEntries(LANGS.map(x => [x, U.landing(k, x)]).filter(x => x[1]));
  const label = LABEL[k]?.[l] || d.kicker, bc = [[t.home, U.home(l)], [label, null]];
  const faq = (d.faq || []).map(x => ({ q: x.q, a: R(x.a) }));
  const work = (d.work?.items || []).filter(id => PROJECTS[id] || (W(`${where}: work "${id}" không có`), false));
  const ldjson = [
    { "@context": "https://schema.org", "@type": "Service", name: strip(d.h1), serviceType: label, description: d.description, url: ORIGIN + urls[l], inLanguage: l, provider: ORG, areaServed: "Worldwide (online)" },
    crumbLd([[t.home, U.home(l)], [label, urls[l]]]),
    ...(faq.length ? [faqLd(faq)] : []),
  ];
  let h = head({ l, title: d.title, desc: d.description, urls, ldjson }) + "\n" + nav(l, urls, k) + `
<main id="main">
  ${crumbs(l, bc)}
  <section class="lp-hero">
    <p class="kicker cap"><span class="dot" aria-hidden="true"></span>${esc(d.kicker)}</p>
    <h1>${R(d.h1)}</h1>
    <p class="lead">${R(d.lead)}</p>
    <div class="hero-cta"><a class="pill" href="${mailto(d.cta?.subject)}">${t.emailUs} <span aria-hidden="true">↗</span></a><a class="pill ghost" href="${U.home(l)}#du-an">${t.seeWork}</a></div>
  </section>
`;
  if (d.problems?.items?.length) h += `  <section class="sec"><div class="sec-head"><h2>${R(d.problems.title)}</h2></div>
    <div class="pains">${d.problems.items.map(x => `<div class="pain"><q>${R(x.q)}</q><p>${R(x.p)}</p></div>`).join("")}</div></section>
`;
  if (d.services?.items?.length) h += `  <section class="sec"><div class="sec-head"><h2>${R(d.services.title)}</h2>${d.services.intro ? `<p>${R(d.services.intro)}</p>` : ""}</div>
    <div class="svc">${d.services.items.map((x, i) => `<div><span class="n cap">${String(i + 1).padStart(2, "0")}</span><h3>${R(x.t)}</h3><p>${R(x.p)}</p></div>`).join("")}</div></section>
`;
  for (const s of d.sections || []) h += `  <section class="sec block"><div class="split"><h2>${R(s.h2)}</h2><div class="prose">${R(s.html)}</div></div></section>
`;
  if (d.process?.items?.length) h += `  <section class="sec"><div class="sec-head"><h2>${R(d.process.title)}</h2></div>
    <div class="steps4 n${d.process.items.length}">${d.process.items.map((x, i) => `<div><span class="n cap">${t.step} ${i + 1}</span><h3>${R(x.t)}</h3><p>${R(x.p)}</p></div>`).join("")}</div><script>(function(){var g=document.currentScript.previousElementSibling;if(!g||!("IntersectionObserver" in window))return;var io=new IntersectionObserver(function(es){es.forEach(function(e){var c=e.target.classList;if(e.isIntersecting){c.add("on");c.remove("past")}else{c.remove("on");c.toggle("past",e.boundingClientRect.top<innerHeight/2)}})},{rootMargin:"-49.5% 0px -49.5% 0px"});[].forEach.call(g.children,function(c){io.observe(c)})})()</script></section>
`;
  if (work.length) h += `  <section class="sec"><div class="sec-head"><h2>${R(d.work.title)}</h2>${d.work.intro ? `<p>${R(d.work.intro)}</p>` : ""}</div>
    <div class="work n${Math.min(work.length, 4)}">${work.map(id => { const p = PROJECTS[id]; return `<a class="wcard" href="${p.url}" target="_blank" rel="noopener"><span class="img"><img src="/work/${p.img}" alt="${esc(p.name)}" loading="lazy" width="900" height="675"></span><h3>${esc(p.name)}</h3><p>${esc(p[l])}</p></a>`; }).join("")}</div></section>
`;
  if (faq.length) h += `  <section class="sec"><div class="sec-head"><h2>${t.faq}</h2></div>
    <div class="faq">${faq.map(x => `<details><summary>${esc(strip(x.q))}</summary><p>${x.a}</p></details>`).join("")}</div></section>
`;
  const rel = relatedList(l, d.related, where);
  if (rel) h += `  <section class="sec"><div class="sec-head"><h2>${t.fromBlog}</h2></div>${rel}</section>
`;
  h += `</main>\n` + foot(l, d.cta ? { h2: R(d.cta.h2), p: R(d.cta.p), subject: d.cta.subject } : null);
  write(urls[l] + "index.html", h);
  if (l === "en" || !urls.en) pages.push({ urls, lastmod: TODAY, priority: k.startsWith("social-media-automation-for") ? "0.7" : "0.9" });
  return { title: d.title, desc: d.description, words: words(h.replace(/<header[\s\S]*?<\/header>|<footer[\s\S]*?<\/footer>|<script[\s\S]*?<\/script>/g, "")) };
}

/* ---------- Blog ---------- */
const CTA_LABEL = { "nail-salon-brand-marketing": { en: "Branding for nail salons", vi: "Thương hiệu cho tiệm nail" }, "restaurant-brand-marketing": { en: "Branding for restaurants", vi: "Thương hiệu cho nhà hàng" }, "vietnamese-diaspora-brand-marketing": { en: "Branding for small businesses", vi: "Thương hiệu cho doanh nghiệp nhỏ" }, "international-brand-marketing-vietnam": { en: "For brands going global", vi: "Cho thương hiệu ra quốc tế" }, "social-media-automation": { en: "AI social media automation", vi: "AI tự động hoá social media" } };
const CAT = { "nail-salon-brand-marketing": { en: "Nail salons", vi: "Tiệm nail" }, "restaurant-brand-marketing": { en: "Restaurants", vi: "Nhà hàng" }, "vietnamese-diaspora-brand-marketing": { en: "Small business", vi: "Doanh nghiệp nhỏ" }, "international-brand-marketing-vietnam": { en: "Going international", vi: "Ra quốc tế" }, "social-media-automation": { en: "Automation", vi: "Automation" } };
const BCATS = [
  { id: "nail-salons", en: "Nail salons", vi: "Tiệm nail", se: "nail-salons", sv: "tiem-nail", de: "Guides on branding, content, social media and bookings for nail salon owners.", dv: "Hướng dẫn về thương hiệu, content, social media và lượng khách cho chủ tiệm nail." },
  { id: "restaurants", en: "Restaurants", vi: "Nhà hàng", se: "restaurants", sv: "nha-hang", de: "Guides on branding, menus, content and local marketing for restaurants, cafés and food businesses.", dv: "Hướng dẫn về thương hiệu, menu, content và marketing địa phương cho nhà hàng, quán cà phê." },
  { id: "fashion", en: "Fashion", vi: "Thời trang", se: "fashion", sv: "thoi-trang", de: "Guides on identity, storytelling, launches and content for fashion and clothing brands.", dv: "Hướng dẫn về nhận diện, câu chuyện, ra mắt và content cho thương hiệu thời trang." },
  { id: "retail", en: "Retail & e-commerce", vi: "Bán lẻ & TMĐT", se: "retail", sv: "ban-le", de: "Guides on store branding, packaging, online shops and content for retail brands.", dv: "Hướng dẫn về thương hiệu cửa hàng, bao bì, bán hàng online và content cho thương hiệu bán lẻ." },
  { id: "beauty", en: "Beauty & spa", vi: "Làm đẹp & spa", se: "beauty", sv: "lam-dep-spa", de: "Guides on branding and marketing for spas, hair and beauty salons and skincare brands.", dv: "Hướng dẫn về thương hiệu và marketing cho spa, salon tóc, tiệm làm đẹp và thương hiệu mỹ phẩm." },
  { id: "startups", en: "Startups & tech", vi: "Startup & công nghệ", se: "startups", sv: "startup-cong-nghe", de: "Guides on branding, positioning, websites and founder content for startups and tech companies.", dv: "Hướng dẫn về thương hiệu, định vị, website và content của nhà sáng lập cho startup và công ty công nghệ." },
  { id: "small-business", en: "Small business", vi: "Doanh nghiệp nhỏ", se: "small-business", sv: "doanh-nghiep-nho", de: "Guides on building a brand and marketing a small business, at home or abroad.", dv: "Hướng dẫn xây thương hiệu và làm marketing cho doanh nghiệp nhỏ, trong nước hay ở nước ngoài." },
  { id: "international", en: "Going international", vi: "Ra quốc tế", se: "international", sv: "ra-quoc-te", de: "Guides for brands entering new markets: positioning, localization and content.", dv: "Hướng dẫn cho thương hiệu bước vào thị trường mới: định vị, bản địa hoá và content." },
  { id: "automation", en: "AI Automation", vi: "AI Automation", se: "ai-automation", sv: "ai-automation", de: "Guides on AI content calendars, social media automation and AI assistants for small businesses.", dv: "Hướng dẫn về lịch nội dung AI, tự động hoá social media và trợ lý AI cho doanh nghiệp nhỏ." },
];
const BCAT = Object.fromEntries(BCATS.map(c => [c.id, c]));
const LANDING_CAT = { "nail-salon-brand-marketing": "nail-salons", "restaurant-brand-marketing": "restaurants", "vietnamese-diaspora-brand-marketing": "small-business", "international-brand-marketing-vietnam": "international" };
const catOf = d => (d.category && BCAT[d.category]) ? d.category : (LANDING_CAT[d.landing] || (String(d.landing).startsWith("social-media-automation") ? "automation" : "small-business"));
U.cat = (c, l) => l === "vi" ? `/vi/blog/${BCAT[c].sv}/` : `/blog/${BCAT[c].se}/`;
const usedCats = l => BCATS.filter(c => blogKeys.some(k => blog[k][l] && catOf(blog[k][l]) === c.id));
function catbar(l, current) {
  const t = T[l];
  return `<nav class="catbar" aria-label="${l === "vi" ? "Chủ đề blog" : "Blog topics"}"><div class="catbar-in">${usedCats(l).map(c => `<a href="${U.cat(c.id, l)}"${current === c.id ? ' aria-current="page"' : ""}${c.id === "automation" ? ' class="m-only"' : ""}>${esc(c[l])}</a>`).join("")}</div></nav><script>(function(){var b=document.currentScript.previousElementSibling.firstChild,a=b.querySelector("[aria-current]");if(a&&b.scrollWidth>b.clientWidth)b.scrollLeft=a.offsetLeft-b.offsetLeft-(b.clientWidth-a.offsetWidth)/2;})()</script>`;
}
const prow = (k, l) => { const d = blog[k][l]; return `<a class="prow" href="${U.blog(k, l)}"><h3>${esc(d.h1)}</h3><p>${esc(d.description || d.lead || "")}</p><time datetime="${PUBLISHED}">${fmtDate(l, PUBLISHED)}</time></a>`; };
function renderCategory(c, l) {
  const t = T[l], C = BCAT[c], urls = { en: U.cat(c, "en"), vi: U.cat(c, "vi") }, list = blogKeys.filter(k => blog[k][l] && catOf(blog[k][l]) === c);
  if (!list.length) return;
  const name = C[l], title = l === "vi" ? `${name}: hướng dẫn thương hiệu & marketing | Bunchasake` : `${name}: branding & marketing guides | Bunchasake`;
  const desc = l === "vi" ? C.dv : C.de;
  const svc = [...Object.entries(LANDING_CAT), ["social-media-automation", "automation"]].find(([lk, cc]) => cc === c && U.landing(lk, l))?.[0];
  const ldjson = [{ "@context": "https://schema.org", "@type": "CollectionPage", name: `${name} | Bunchasake Blog`, url: ORIGIN + urls[l], inLanguage: l, description: desc, hasPart: list.map(k => ({ "@type": "BlogPosting", headline: blog[k][l].h1, url: ORIGIN + U.blog(k, l) })) }, crumbLd([[t.home, U.home(l)], [t.blog, U.blogindex(l)], [name, urls[l]]])];
  const h = head({ l, title: title.length > 65 ? `${name} | Bunchasake Blog` : title, desc, urls, ldjson, cls: "blog" }) + "\n" + nav(l, urls, "blog", c) + "\n" + catbar(l, c) + `
<main id="main">
  <div class="blog-wrap">${crumbs(l, [[t.home, U.home(l)], [t.blog, U.blogindex(l)], [name, null]])}<section class="blog-head"><h1>${esc(name)}</h1><p class="lead">${esc(desc)}</p>${svc ? `<p class="cat-svc"><a href="${U.landing(svc, l)}">${t.related}: ${esc(CTA_LABEL[svc]?.[l] || LABEL[svc][l])} <span aria-hidden="true">→</span></a></p>` : ""}</section>
  <section class="plist">${list.map(k => prow(k, l)).join("")}</section>
  </div>
</main>
` + foot(l, null);
  write(urls[l] + "index.html", h);
  if (l === "en") pages.push({ urls, lastmod: TODAY, priority: "0.6" });
}
const fmtDate = (l, iso) => { const [y, m, d] = iso.split("-").map(Number); return l === "vi" ? `${d}/${m}/${y}` : `${d} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1]} ${y}`; };
function renderPost(k, l) {
  const d = blog[k][l], t = T[l], where = `blog/${k}.${l}`;
  const urls = Object.fromEntries(LANGS.map(x => [x, U.blog(k, x)]).filter(x => x[1]));
  let body = resolve(clean(d.body, where), l, where).replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, "");
  const toc = []; let n = 0;
  body = body.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (m, a, inner) => { const id = "s" + (++n); toc.push([id, strip(inner)]); return `<h2 id="${id}"${a.replace(/\sid="[^"]*"/, "")}>${inner}</h2>`; });
  body = body.replace(/<table/g, '<div class="table"><table').replace(/<\/table>/g, "</table></div>");
  const faq = [...body.matchAll(/<details>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)].map(m => ({ q: m[1], a: m[2] }));
  body = body.replace(/<details>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g, "<h3>$1</h3>$2");
  const lk = d.landing && landing[d.landing]?.[l] ? d.landing : null; if (d.landing && !lk) W(`${where}: landing "${d.landing}" không có`);
  const ck = catOf(d), cat = BCAT[ck][l], wc = words(body), mins = Math.max(3, Math.round(wc / (l === "vi" ? 260 : 220)));
  const bc = [[t.home, U.home(l)], [t.blog, U.blogindex(l)], [cat, U.cat(ck, l)], [d.h1, null]];
  const ldjson = [
    { "@context": "https://schema.org", "@type": "BlogPosting", headline: d.h1, description: d.description, inLanguage: l, datePublished: PUBLISHED, dateModified: TODAY, mainEntityOfPage: ORIGIN + urls[l], image: ORIGIN + "/og.png", author: { "@type": "Organization", name: "Bunchasake", url: ORIGIN + "/" }, publisher: ORG, keywords: d.keyword, wordCount: wc },
    crumbLd([[t.home, U.home(l)], [t.blog, U.blogindex(l)], [cat, U.cat(ck, l)], [d.h1, urls[l]]]),
    ...(faq.length ? [faqLd(faq)] : []),
  ];
  const others = blogKeys.filter(x => x !== k && blog[x][l] && catOf(blog[x][l]) === ck).concat(blogKeys.filter(x => x !== k && blog[x][l] && catOf(blog[x][l]) !== ck)).slice(0, 4);
  const h = head({ l, title: d.title.includes("Bunchasake") ? d.title : d.title, desc: d.description, urls, type: "article", ldjson, cls: "blog" }) + "\n" + nav(l, urls, "blog", ck) + "\n" + catbar(l, ck) + `
<main id="main">
  <article class="post-page">
    ${crumbs(l, bc)}
    <header class="post-head">
      <p class="kicker cap"><span class="dot" aria-hidden="true"></span>${esc(cat)}</p>
      <h1>${esc(d.h1)}</h1>
      ${d.lead ? `<p class="lead">${esc(d.lead)}</p>` : ""}
      <p class="byline">${t.byEd} · ${t.published} <time datetime="${PUBLISHED}">${fmtDate(l, PUBLISHED)}</time> · ${mins} ${t.minRead}</p>
    </header>
    <div class="post-body">
      ${d.takeaways.length ? `<div class="takeaways"><b class="cap">${t.takeaways}</b><ul>${d.takeaways.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}
      ${toc.length > 2 ? `<details class="toc"><summary class="cap">${t.toc}</summary><ol>${toc.map(([id, n]) => `<li><a href="#${id}">${esc(n)}</a></li>`).join("")}</ol></details>` : ""}
      <div class="prose">${body}</div>
      <div class="cta-box"><p>${esc(d.cta || t.footP)}</p><div class="cta-row">${lk ? `<a class="btn" href="${U.landing(lk, l)}">${esc(CTA_LABEL[lk]?.[l] || LABEL[lk]?.[l] || t.related)} <span aria-hidden="true">→</span></a>` : ""}<a class="btn line" href="${mailto(d.h1)}">${t.emailUs} <span aria-hidden="true">↗</span></a></div><small>${MAIL}</small></div>
      <div class="author"><p>${t.edNote}</p></div>
      <p class="back"><a href="${U.blogindex(l)}">← ${t.all}</a></p>
    </div>
  </article>
  ${others.length ? `<section class="sec"><div class="sec-head"><h2>${t.fromBlog}</h2></div>${relatedList(l, others, where)}</section>` : ""}
</main>
` + foot(l, null);
  write(urls[l] + "index.html", h);
  if (l === "en" || !urls.en) pages.push({ urls, lastmod: TODAY, priority: "0.6" });
  return { title: d.title, desc: d.description, words: wc, faq: faq.length, takeaways: d.takeaways.length };
}
function renderBlogIndex(l) {
  const t = T[l], urls = { en: U.blogindex("en"), vi: U.blogindex("vi") }, list = blogKeys.filter(k => blog[k][l]);
  const ldjson = [{ "@context": "https://schema.org", "@type": "Blog", name: "Bunchasake Blog", url: ORIGIN + urls[l], inLanguage: l, publisher: ORG, blogPost: list.map(k => ({ "@type": "BlogPosting", headline: blog[k][l].h1, url: ORIGIN + U.blog(k, l) })) }, crumbLd([[t.home, U.home(l)], [t.blog, urls[l]]])];
  const h = head({ l, title: t.blogTitle, desc: t.blogDesc, urls, ldjson, cls: "blog" }) + "\n" + nav(l, urls, "blog", "index") + "\n" + catbar(l, null) + `
<main id="main">
  <div class="blog-wrap">${crumbs(l, [[t.home, U.home(l)], [t.blog, null]])}<section class="blog-head"><h1>Blog</h1><p class="lead">${t.blogLead}</p></section>
  ${usedCats(l).map(C => { const g = list.filter(k => catOf(blog[k][l]) === C.id); return `<section class="plist" id="${C.se}"><h2><a href="${U.cat(C.id, l)}">${esc(C[l])}</a></h2>${g.slice(0, 6).map(k => prow(k, l)).join("")}${g.length > 6 ? `<a class="more-cat" href="${U.cat(C.id, l)}">${l === "vi" ? `Xem tất cả ${g.length} bài` : `See all ${g.length} articles`} →</a>` : ""}</section>`; }).join("")}
  </div>
  <section class="sec"><div class="sec-head"><h2>${t.moreServices}</h2></div><div class="links">${landingKeys.filter(k => landing[k][l]).map(k => `<a href="${U.landing(k, l)}"><span style="color:inherit;transform:none">${esc(LABEL[k]?.[l] || landing[k][l].kicker)}<small>${esc(landing[k][l].description)}</small></span><span aria-hidden="true">→</span></a>`).join("")}</div></section>
</main>
` + foot(l, null);
  write(urls[l] + "index.html", h);
  if (l === "en") pages.push({ urls, lastmod: TODAY, priority: "0.7" });
}

/* ---------- Trang pháp lý (chỉ tiếng Anh) ---------- */
const COMPANY = "Impact Investments S.R.L., VAT ID IT01331310324, Via Guido Zanetti 1, 34133 Trieste (TS), Italy";
const OPERATOR = "Mora AI Business (household business), Vietnam";
const LEGAL = {
  privacy: { slug: "/privacy/", title: "Privacy policy | Bunchasake", h1: "Privacy policy", desc: "How Bunchasake handles the information you send us: what we collect, why, who processes it and how to ask us to delete it.", body: `
<p>This policy explains how Bunchasake handles personal information when you visit bunchasake.com or write to us.</p>
<h2>Who we are</h2>
<p>Bunchasake is built by ${COMPANY}, and operated by ${OPERATOR}. You can reach us at <a href="mailto:${MAIL}">${MAIL}</a>.</p>
<h2>What we collect</h2>
<ul><li><strong>What you send us.</strong> When you email us, we receive your name, email address and whatever you choose to tell us about your business.</li><li><strong>Technical data.</strong> The website has no contact forms, no advertising trackers and no analytics cookies. Like any website, the servers that deliver it receive technical data such as your IP address and browser type.</li></ul>
<h2>Why we use it</h2>
<ul><li>To reply to you and prepare for a possible project with you.</li><li>To keep the website secure and working.</li></ul>
<p>We do not sell your information or share it with third parties for their own marketing.</p>
<h2>Services that process data for us</h2>
<ul><li><strong>Cloudflare</strong> hosts the website, protects it and forwards emails sent to ${MAIL} to our mailbox.</li><li><strong>Google</strong> provides the mailbox where those emails arrive, and the web fonts used on the site, which means your browser requests the fonts from Google's servers.</li></ul>
<h2>How long we keep it</h2>
<p>We keep emails for as long as we need them to talk with you or to work on your project, and as required by law, for example for invoices.</p>
<h2>Your rights</h2>
<p>You can ask us at any time to see, correct or delete the information we hold about you, or to stop using it. Email <a href="mailto:${MAIL}">${MAIL}</a>. If you live in the European Union, you also have the right to complain to your data protection authority; in Italy that is the Garante per la protezione dei dati personali.</p>
<h2>Changes</h2>
<p>If we change this policy, we update this page and the date below.</p>` },
  terms: { slug: "/terms/", title: "Terms of service | Bunchasake", h1: "Terms of service", desc: "The basic terms for using bunchasake.com and for working with Bunchasake on a brand or automation project.", body: `
<p>These terms apply to bunchasake.com and to how a project with Bunchasake is agreed.</p>
<h2>Who we are</h2>
<p>Bunchasake is built by ${COMPANY}, and operated by ${OPERATOR}. Contact: <a href="mailto:${MAIL}">${MAIL}</a>.</p>
<h2>Using this website</h2>
<p>The articles on this website are general information to help you run and grow your business. They are not legal, tax or financial advice. Questions about laws, permits, trade marks, tax or customs should go to a qualified adviser.</p>
<p>The text, design and images on this website belong to Bunchasake or to the brands shown in our work, and may not be copied for commercial use without permission.</p>
<h2>How a project is agreed</h2>
<p>Every project starts with a conversation. After it, we send a written proposal and quote. The proposal describes the scope, the price, the timeline and the payment and cancellation terms for that project. Work starts only when you accept it, and the accepted proposal is what governs the project.</p>
<h2>Your materials and the work we create</h2>
<p>You keep the rights to everything you give us, such as your name, story, photos and existing logo. The proposal states how the rights to the work we create for you are transferred.</p>
<h2>Liability</h2>
<p>We work with care, but we cannot promise particular results such as a number of customers, followers or sales.</p>
<h2>Changes</h2>
<p>If we change these terms, we update this page and the date below.</p>` },
  refund: { slug: "/refund-policy/", title: "Refunds and cancellations | Bunchasake", h1: "Refunds and cancellations", desc: "How cancellations and refunds work for a Bunchasake project: they follow the written proposal you accept before work starts.", body: `
<p>Each Bunchasake project is quoted individually, so cancellation and refund terms are set out in the written proposal you accept before any work starts.</p>
<h2>Before you accept a proposal</h2>
<p>The first conversation and the proposal are free, and you are under no obligation to go ahead.</p>
<h2>After you accept a proposal</h2>
<p>If you want to pause or cancel a project, email <a href="mailto:${MAIL}">${MAIL}</a>. We will reply, confirm what has been delivered so far and settle the account according to the terms in your accepted proposal.</p>
<h2>Who we are</h2>
<p>Bunchasake is built by ${COMPANY}, and operated by ${OPERATOR}.</p>` },
};
function renderLegal(key) {
  const d = LEGAL[key], l = "en", urls = { en: d.slug }, t = T.en;
  const h = head({ l, title: d.title, desc: d.desc, urls, ldjson: [crumbLd([[t.home, "/"], [d.h1, d.slug]])], cls: "blog" }) + "\n" + nav(l, { en: d.slug }, "") + `
<main id="main">
  <article class="post-page">
    ${crumbs(l, [[t.home, "/"], [d.h1, null]])}
    <header class="post-head"><h1>${d.h1}</h1><p class="byline">Last updated <time datetime="${PUBLISHED}">${fmtDate(l, PUBLISHED)}</time></p></header>
    <div class="post-body"><div class="prose">${d.body}</div></div>
  </article>
</main>
` + foot(l, null);
  write(d.slug + "index.html", h);
  pages.push({ urls, lastmod: TODAY, priority: "0.3" });
}
function render404() {
  const l = "en", t = T.en, urls = { en: "/404.html" };
  const h = head({ l, title: t.nfTitle, desc: "Page not found.", urls }).replace(/<link rel="canonical"[^>]*>\n/, '<meta name="robots" content="noindex">\n').replace(/<link rel="alternate"[^>]*>\n?/g, "") + "\n" + nav(l, { en: "/", vi: "/vi/" }, "") + `
<main id="main"><section class="notfound"><p class="kicker cap"><span class="dot" aria-hidden="true"></span>404</p><h1>${t.nfH}</h1><p class="lead">${t.nfP}</p>
<div class="hero-cta"><a class="pill" href="/">${t.home}</a><a class="pill ghost" href="/blog/">${t.blog}</a><a class="pill ghost" href="/vi/">Tiếng Việt</a></div></section></main>
` + foot(l, null);
  write("404.html", h);
}

/* ---------- Trang chủ (dựng sẵn bằng trình duyệt) ---------- */
function wrapHome(src) {
  const i = src.indexOf("\n</style>") + "\n</style>".length;
  return `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n${src.slice(0, i)}\n</head>\n<body>${src.slice(i)}\n</body>\n</html>\n`;
}
async function renderHome(browser, l) {
  const src = fs.readFileSync(path.join(__dirname, "home.html"), "utf8"), urls = { en: "/", vi: "/vi/" };
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = []; page.on("pageerror", e => errs.push(e.message));
  await page.route("**/*", r => r.request().url() === ORIGIN + "/" ? r.fulfill({ contentType: "text/html; charset=utf-8", body: wrapHome(src) }) : r.abort());
  await page.goto(ORIGIN + "/", { waitUntil: "domcontentloaded" });
  let html = await page.evaluate(lang => {
    setLang(lang);
    const de = document.documentElement; de.lang = lang; de.dataset.lang = lang;
    document.querySelectorAll("a[data-vi]").forEach(a => { if (lang === "vi") a.setAttribute("href", a.dataset.vi); a.removeAttribute("data-vi"); });
    document.querySelector(".lang").innerHTML = ["en", "vi"].map(x => `<a href="${x === "vi" ? "/vi/" : "/"}" hreflang="${x}" lang="${x}"${x === lang ? ' aria-current="true"' : ""}>${x.toUpperCase()}</a>`).join("");
    document.getElementById("progress").removeAttribute("style");
    document.getElementById("nav").classList.remove("scrolled"); document.getElementById("mobileCta").classList.remove("show");
    document.querySelectorAll(".nav ul a.active").forEach(a => a.classList.remove("active"));
    return "<!doctype html>\n" + de.outerHTML + "\n";
  }, l);
  await page.close();
  if (errs.length) W(`home.${l}: lỗi JS khi dựng – ${errs.join("; ")}`);
  html = html.replace(/href="https:\/\/bunchasake\.com\//g, 'href="/').replace(/"work\//g, '"/work/').replace(/href="(favicon\.svg|favicon\.ico|apple-touch-icon\.png)"/g, 'href="/$1"');
  const stillMissing = [...html.matchAll(/href="(\/[^"#]*\/)"/g)].map(m => m[1]).filter(u => !["/", "/vi/"].includes(u) && !fs.existsSync(path.join(SITE, u, "index.html")));
  [...new Set(stillMissing)].forEach(u => W(`home.${l}: liên kết ${u} chưa có trang`));
  const m = HOME[l];
  const extra = `<link rel="canonical" href="${ORIGIN}${urls[l]}">\n${alt(urls)}\n<meta property="og:type" content="website">\n<meta property="og:site_name" content="Bunchasake">\n<meta property="og:title" content="${esc(m.title)}">\n<meta property="og:description" content="${esc(m.desc)}">\n<meta property="og:url" content="${ORIGIN}${urls[l]}">\n<meta property="og:image" content="${ORIGIN}/og.png">\n<meta property="og:locale" content="${l === "vi" ? "vi_VN" : "en_US"}">\n<meta name="twitter:card" content="summary_large_image">`;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(m.title)}</title>`).replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(m.desc)}">\n${extra}`);
  const services = landingKeys.filter(k => landing[k][l]).map(k => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: LABEL[k]?.[l] || k, url: ORIGIN + U.landing(k, l) } }));
  const graph = { "@context": "https://schema.org", "@graph": [{ ...ORG, ...(services.length ? { hasOfferCatalog: { "@type": "OfferCatalog", name: l === "vi" ? "Dịch vụ" : "Services", itemListElement: services } } : {}) }, { "@type": "WebSite", "@id": ORIGIN + "/#website", url: ORIGIN + "/", name: "Bunchasake", inLanguage: ["en", "vi"], publisher: { "@id": ORIGIN + "/#org" } }] };
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, ld(graph));
  write(urls[l] + "index.html", html);
  if (l === "en") pages.unshift({ urls, lastmod: TODAY, priority: "1.0" });
}

/* ---------- Tệp cho máy tìm kiếm & AI ---------- */
function writeMeta() {
  const sm = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` + pages.flatMap(p => LANGS.filter(l => p.urls[l]).map(l => `  <url><loc>${ORIGIN}${p.urls[l]}</loc><lastmod>${p.lastmod}</lastmod><priority>${p.priority}</priority>${LANGS.filter(x => p.urls[x]).map(x => `<xhtml:link rel="alternate" hreflang="${x}" href="${ORIGIN}${p.urls[x]}"/>`).join("")}${p.urls.en ? `<xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${p.urls.en}"/>` : ""}</url>`)).join("\n") + `\n</urlset>\n`;
  write("sitemap.xml", sm);
  const bots = ["Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot", "Applebot-Extended", "DuckDuckBot", "Amazonbot", "meta-externalagent", "CCBot", "Bravebot"];
  write("robots.txt", `# bunchasake.com – mọi công cụ tìm kiếm và trợ lý AI đều được đọc toàn bộ website\nUser-agent: *\nAllow: /\n\n${bots.map(b => `User-agent: ${b}`).join("\n")}\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
  const L = k => landing[k]?.en ? `- [${LABEL[k]?.en || k}](${ORIGIN}${U.landing(k, "en")}): ${landing[k].en.description}` : "";
  write("llms.txt", `# Bunchasake

> Bunchasake is a brand builder and growth partner: a Vietnamese studio working between Vietnam and Italy, online with clients anywhere, in Vietnamese and English. We turn a founder's story into a brand and set up a social media automation system the client's own team runs. Contact: ${MAIL}

Promise: "You run the business. We grow the brand."

## Who we work with
- Vietnamese business owners abroad (nail salons, restaurants and other owner-run businesses in the US, Canada, Australia and Europe)
- Vietnamese brands that want to enter international markets

## How we work
Six steps, and the client approves after each one: Listening (a 60-minute conversation: the founder's story, why they started, what they believe in and what the founder wants from the business), Positioning (who the brand is, who it is for, how it is different; in-depth competitor analysis to see where the brand stands and which direction to take, based on the founder's wishes; the brand story), Identity (working directly with the founder and the person in charge of the brand: name if needed, logo, colours, typography, voice, guidelines), Reach (taking the brand where customers already go: website, social media such as Facebook, Instagram, TikTok, YouTube, Threads, LinkedIn, Zalo and Pinterest, and other media channels; for existing channels we read the channel data, customer behaviour and past campaign results, then advise on a strategy for new campaigns), Community (helping the client build a loyal community on the platforms their customers prefer), Crisis communication (a team that studies and handles communication crises, keeps the impact and risk to the brand as small as possible, and trains the client's team to respond).

Packages: Start (new businesses), Build (the full six steps), Refresh (an existing brand that feels dated). The quote comes after the first conversation.

Add-on, Social Media Automation: your own AI assistant trained on the brand voice, a 30-day content calendar, AI drafts that you approve, automatic scheduling on Facebook, Instagram and TikTok, and automatic inbox replies. We set up the system; your team runs it.

## Services
${landingKeys.map(L).filter(Boolean).join("\n")}

## Guides
${blogKeys.filter(k => blog[k].en).map(k => `- [${blog[k].en.h1}](${ORIGIN}${U.blog(k, "en")}): ${blog[k].en.description}`).join("\n")}

## Tiếng Việt
- [Trang chủ tiếng Việt](${ORIGIN}/vi/)
${landingKeys.filter(k => landing[k].vi).map(k => `- [${LABEL[k]?.vi || k}](${ORIGIN}${U.landing(k, "vi")})`).join("\n")}
- [Blog tiếng Việt](${ORIGIN}/vi/blog/)

## Work
Brands we have worked with: ${Object.values(PROJECTS).map(p => `${p.name} (${p.en})`).join(", ")}.
`);
  write("_headers", `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n/work/*\n  Cache-Control: public, max-age=604800\n/assets/*\n  Cache-Control: public, max-age=300, must-revalidate\n`);
  write("_redirects", ["/index-3d", "/index-3d.html", "/page", "/page.html", "/admin", "/admin.html"].map(p => `${p} / 301`).join("\n") + "\n");
  write(INDEXNOW_KEY + ".txt", INDEXNOW_KEY + "\n");
}

/* ---------- Chạy ---------- */
(async () => {
  // dọn các trang đã dựng lần trước (giữ work/, favicon, og.png)
  for (const e of fs.readdirSync(SITE, { withFileTypes: true })) if (e.isDirectory() && !["work"].includes(e.name)) fs.rmSync(path.join(SITE, e.name), { recursive: true });
  fs.mkdirSync(SITE + "/assets", { recursive: true });
  fs.copyFileSync(path.join(__dirname, "lp.css"), SITE + "/assets/lp.css");
  const report = [];
  for (const k of landingKeys) for (const l of LANGS) if (landing[k][l]) report.push([`landing ${k}.${l}`, renderLanding(k, l)]);
  for (const k of blogKeys) for (const l of LANGS) if (blog[k][l]) report.push([`blog ${k}.${l}`, renderPost(k, l)]);
  for (const l of LANGS) renderBlogIndex(l);
  for (const c of BCATS) for (const l of LANGS) renderCategory(c.id, l);
  render404();
  for (const k of Object.keys(LEGAL)) renderLegal(k);
  const { chromium } = require("playwright"); const browser = await chromium.launch();
  for (const l of LANGS) await renderHome(browser, l);
  await browser.close();
  writeMeta();
  for (const [n, r] of report) { const bad = []; if (r.title.length > 62) bad.push(`title ${r.title.length} ký tự`); if (r.desc.length > 160) bad.push(`description ${r.desc.length} ký tự`); console.log(`${n.padEnd(78)} ${String(r.words).padStart(5)} từ${bad.length ? "  ⚠ " + bad.join(", ") : ""}`); }
  console.log(`\n${pages.reduce((n, p) => n + LANGS.filter(l => p.urls[l]).length, 0)} URL trong sitemap · ${landingKeys.length} landing · ${blogKeys.length} bài`);
  if (warn.length) { console.log(`\n${warn.length} cảnh báo:`); [...new Set(warn)].forEach(w => console.log(" - " + w)); process.exitCode = 2; }
})();
