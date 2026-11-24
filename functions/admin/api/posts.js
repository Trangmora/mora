// Trang admin bunchasake.com/admin – lấy bài đăng + số liệu từ Morapost.
// Chỉ chạy khi request đi qua Cloudflare Access và đúng email admin.
// Biến môi trường (Cloudflare Pages → Settings → Variables and Secrets):
//   MORAPOST_KEY    (Secret)  khoá API Morapost
//   ACCESS_TEAM     tên miền Zero Trust, ví dụ "bunchasake.cloudflareaccess.com"
//   ACCESS_AUD      Application Audience (AUD) tag của ứng dụng Access
//   ADMIN_EMAILS    danh sách email được vào, cách nhau bằng dấu phẩy
const API = "https://www.morapost.com/api/v1";
const b64u = s => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=")), c => c.charCodeAt(0));
const json = (o, st = 200) => new Response(JSON.stringify(o), { status: st, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex" } });

async function verifyAccess(request, env) {
  const tok = request.headers.get("cf-access-jwt-assertion");
  if (!tok || !env.ACCESS_TEAM || !env.ACCESS_AUD) return null;
  const [h, p, s] = tok.split(".");
  if (!h || !p || !s) return null;
  const head = JSON.parse(new TextDecoder().decode(b64u(h)));
  const certs = await (await fetch(`https://${env.ACCESS_TEAM}/cdn-cgi/access/certs`, { cf: { cacheTtl: 3600 } })).json();
  const jwk = (certs.keys || []).find(k => k.kid === head.kid);
  if (!jwk) return null;
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64u(s), new TextEncoder().encode(`${h}.${p}`));
  if (!ok) return null;
  const c = JSON.parse(new TextDecoder().decode(b64u(p)));
  const now = Date.now() / 1000;
  const aud = Array.isArray(c.aud) ? c.aud : [c.aud];
  if (!aud.includes(env.ACCESS_AUD) || c.exp < now || c.iss !== `https://${env.ACCESS_TEAM}`) return null;
  const allowed = (env.ADMIN_EMAILS || "").toLowerCase().split(",").map(x => x.trim()).filter(Boolean);
  return allowed.includes((c.email || "").toLowerCase()) ? c.email : null;
}

export async function onRequestGet({ request, env }) {
  const who = await verifyAccess(request, env);
  if (!who) return json({ error: "forbidden" }, 403);
  if (!env.MORAPOST_KEY) return json({ error: "missing MORAPOST_KEY" }, 500);
  const H = { authorization: `Bearer ${env.MORAPOST_KEY}` };
  const get = async u => { const r = await fetch(API + u, { headers: H }); if (!r.ok) throw new Error(`${u} → ${r.status}`); return r.json(); };
  try {
    const [acc, ...pages] = await Promise.all([get("/accounts"), get("/posts?limit=100&offset=0"), get("/posts?limit=100&offset=100")]);
    const posts = pages.flatMap(p => p.posts || []);
    const pub = posts.filter(p => p.status === "published").sort((a, b) => (b.published_at || "").localeCompare(a.published_at || "")).slice(0, 40);
    const metrics = {};
    await Promise.all(pub.map(async p => { try { metrics[p.id] = await get(`/posts/${p.id}/metrics`); } catch (e) { metrics[p.id] = { error: String(e.message) }; } }));
    return json({ user: who, fetched_at: new Date().toISOString(), accounts: acc.accounts || [], posts, metrics });
  } catch (e) { return json({ error: String(e.message) }, 502); }
}
