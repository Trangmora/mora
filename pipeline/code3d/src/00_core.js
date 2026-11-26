// Lõi dùng chung: tham số trang, nhiễu, tiện ích. Mọi thứ là hàm của thời gian phim t (giây).
const Q = new URLSearchParams(location.search);
let PEND = 0, MAIN_DONE = false;
function loadTex(url, srgb = true) { const tx = new THREE.Texture(); PEND++; const im = new Image();
  im.onload = () => { tx.image = im; tx.needsUpdate = true; if (--PEND === 0 && MAIN_DONE) window.READY = true; }; im.src = url; tx.flipY = false; return tx; }
const W = +(Q.get('w') || 1280), H = +(Q.get('h') || 720);
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const lerp = (a, b, k) => a + (b - a) * k;
const smooth = (a, b, x) => { const k = clamp((x - a) / (b - a), 0, 1); return k * k * (3 - 2 * k); };
function hash(n) { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
function hash3(x, y, z) { const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return s - Math.floor(s); }
function noise3(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z), xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const c = (a, b, d) => hash3(xi + a, yi + b, zi + d);
  return lerp(lerp(lerp(c(0,0,0), c(1,0,0), u), lerp(c(0,1,0), c(1,1,0), u), v),
              lerp(lerp(c(0,0,1), c(1,0,1), u), lerp(c(0,1,1), c(1,1,1), u), v), w);
}
function fbm3(x, y, z, o = 4) { let s = 0, a = .5, f = 1; for (let i = 0; i < o; i++) { s += a * noise3(x * f, y * f, z * f); f *= 2.03; a *= .5; } return s; }
// Nội suy khung hình chính: keys = [[t, giá trị (số hoặc mảng)], ...], làm mượt giữa hai khóa
function track(keys, t) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, a] = keys[i], [t1, b] = keys[i + 1];
    if (t <= t1) { const k = smooth(t0, t1, t); return Array.isArray(a) ? a.map((v, j) => lerp(v, b[j], k)) : lerp(a, b, k); }
  }
  return keys[keys.length - 1][1];
}
