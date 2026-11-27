"""Bộ dựng kiểu Vox: giấy kẻ dòng + nét bút vẽ tay + ảnh thật dán băng keo + nhân vật 2D.

Toạ độ "thế giới" (world) là một dải giấy dài; camera lia ngang. Lớp nhân vật (fg) đứng yên theo màn hình.
"""
import io, math, random
import numpy as np
import cairosvg
from PIL import Image, ImageDraw, ImageFilter

W, H, FPS = 1920, 1080, 30
INK = "#1f2a44"
PAPER = (244, 236, 216)
RULE = (182, 203, 222)
MARGIN = (226, 150, 150)
HI_YELLOW = "#ffe066"

# ---------- tiện ích thời gian ----------
def clamp(x, a=0.0, b=1.0): return max(a, min(b, x))
def prog(t, t0, t1): return clamp((t - t0) / max(1e-6, t1 - t0))
def ease_io(x): return x * x * (3 - 2 * x)
def ease_out(x): return 1 - (1 - x) ** 3
def ease_back(x, s=1.7):
    x -= 1
    return x * x * ((s + 1) * x + s) + 1
def lerp(a, b, x): return a + (b - a) * x

def esc(s): return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

# ---------- giấy ----------
def make_paper(width, seed=3):
    """Giấy kem kẻ dòng xanh nhạt, có vân và đường lề đỏ mỗi trang."""
    rng = np.random.default_rng(seed)
    img = Image.new("RGB", (width, H), PAPER)
    d = ImageDraw.Draw(img)
    for y in range(150, H, 56):
        d.line([(0, y), (width, y)], fill=RULE, width=2)
    for x0 in range(0, width, W):
        d.line([(x0 + 150, 0), (x0 + 150, H)], fill=MARGIN, width=3)
    a = np.asarray(img, dtype=np.float32)
    n = rng.normal(0, 1, (H // 3, width // 3)).astype(np.float32)
    n = np.asarray(Image.fromarray(((n * 20) + 128).clip(0, 255).astype("uint8")).resize((width, H), Image.BICUBIC),
                   dtype=np.float32)[..., None] / 255 - 0.5
    fib = rng.normal(0, 1, (H, width)).astype(np.float32)[..., None] * 3
    a = a * (1 + n * 0.08) + fib
    return np.clip(a, 0, 255)

def vignette():
    yy, xx = np.mgrid[0:H, 0:W]
    v = 1 - 0.28 * (((xx - W / 2) / (W * 0.7)) ** 2 + ((yy - H / 2) / (H * 0.75)) ** 2)
    return v[..., None].astype(np.float32)

# ---------- ảnh thật dán băng keo ----------
def load_photo(path, w):
    im = Image.open(path).convert("RGB")
    h = int(im.height * w / im.width)
    im = im.resize((w, h), Image.LANCZOS)
    b = 16
    card = Image.new("RGBA", (w + 2 * b, h + 2 * b), (252, 250, 244, 255))
    card.paste(im, (b, b))
    return card

def paste_photo(canvas, card, cx, cy, rot, scale=1.0, alpha=1.0):
    """canvas: PIL RGB khung hình. Dán ảnh có bóng đổ, xoay nhẹ."""
    if alpha <= 0:
        return
    c = card if scale == 1.0 else card.resize((max(1, int(card.width * scale)), max(1, int(card.height * scale))),
                                              Image.BILINEAR)
    c = c.rotate(rot, resample=Image.BICUBIC, expand=True)
    sh = Image.new("RGBA", c.size, (0, 0, 0, 0))
    sh.putalpha(c.getchannel("A").point(lambda v: int(v * 0.35 * alpha)))
    sh = sh.filter(ImageFilter.GaussianBlur(10))
    x, y = int(cx - c.width / 2), int(cy - c.height / 2)
    canvas.paste((40, 30, 20), (x + 10, y + 14), sh)
    if alpha < 1:
        c = c.copy()
        c.putalpha(c.getchannel("A").point(lambda v: int(v * alpha)))
    canvas.paste(c, (x, y), c)

def tape(cx, cy, w, rot, alpha=1.0):
    return (f'<g transform="translate({cx:.1f},{cy:.1f}) rotate({rot:.1f})" opacity="{alpha:.2f}">'
            f'<rect x="{-w / 2:.1f}" y="-20" width="{w:.1f}" height="40" fill="#efe2b8" opacity="0.82"/>'
            f'<path d="M {-w / 2:.1f} -20 l 6 6 l -6 6 l 6 6 l -6 6 l 6 6 l -6 6 M {w / 2:.1f} -20 l -6 6 l 6 6 l -6 6 l 6 6 l -6 6 l 6 6" '
            f'fill="none" stroke="#d8c99a" stroke-width="2"/></g>')

# ---------- nét bút ----------
def wobble(pts, amp=2.2, seed=0):
    r = random.Random(seed)
    ph1, ph2 = r.random() * 6, r.random() * 6
    out = []
    for i, (x, y) in enumerate(pts):
        out.append((x + amp * math.sin(i * 0.37 + ph1), y + amp * math.sin(i * 0.29 + ph2)))
    return out

def resample(pts, step=6):
    out = [pts[0]]
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        L = math.hypot(x1 - x0, y1 - y0)
        n = max(1, int(L / step))
        for k in range(1, n + 1):
            out.append((x0 + (x1 - x0) * k / n, y0 + (y1 - y0) * k / n))
    return out

def partial(pts, p):
    """Cắt polyline theo tỉ lệ độ dài p, trả (điểm, đầu bút)."""
    if p <= 0:
        return [], None
    segs = [math.hypot(b[0] - a[0], b[1] - a[1]) for a, b in zip(pts, pts[1:])]
    total = sum(segs) or 1
    target, acc = total * min(p, 1), 0
    out = [pts[0]]
    for (a, b), L in zip(zip(pts, pts[1:]), segs):
        if acc + L >= target:
            k = (target - acc) / (L or 1)
            tip = (a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k)
            out.append(tip)
            return out, tip
        acc += L
        out.append(b)
    return out, out[-1]

class Pen:
    """Gom các nét đang vẽ để đặt cây bút ở đầu nét."""
    def __init__(self):
        self.tip = None

    def stroke(self, pts, t, t0, t1, color=INK, width=6, opacity=1.0, fill_after=None):
        p = prog(t, t0, t1)
        if p <= 0:
            return ""
        seg, tip = partial(pts, ease_io(p))
        if 0 < p < 1:
            self.tip = tip
        d = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in seg)
        s = ""
        if fill_after and p >= 1:
            s += f'<path d="{d} Z" fill="{fill_after[0]}" opacity="{fill_after[1]:.2f}"/>'
        s += (f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round" '
              f'stroke-linejoin="round" opacity="{opacity:.2f}"/>')
        return s

    def write(self, txt, x, y, size, t, t0, t1, font="Pangolin", color=INK, anchor="start", weight="normal", cid="c"):
        """Chữ viết tay hiện dần từ trái sang phải, bút chạy theo."""
        p = prog(t, t0, t1)
        if p <= 0:
            return ""
        wid = len(txt) * size * 0.52
        x0 = x - (wid / 2 if anchor == "middle" else 0)
        rev = wid * p
        if 0 < p < 1:
            self.tip = (x0 + rev, y - size * 0.35 + math.sin(t * 40) * size * 0.18)
        return (f'<clipPath id="{cid}"><rect x="{x0 - 10:.1f}" y="{y - size * 1.3:.1f}" width="{rev + 10:.1f}" height="{size * 1.8:.1f}"/></clipPath>'
                f'<g clip-path="url(#{cid})"><text x="{x:.1f}" y="{y:.1f}" font-family="{font}" font-weight="{weight}" '
                f'font-size="{size}" fill="{color}" text-anchor="{anchor}">{esc(txt)}</text></g>')

    def draw_pen(self):
        if not self.tip:
            return ""
        x, y = self.tip
        return (f'<g transform="translate({x:.1f},{y:.1f}) rotate(-35)">'
                f'<path d="M 0 0 L -9 -26 L 9 -26 Z" fill="#c9a24a" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
                f'<rect x="-13" y="-200" width="26" height="176" rx="10" fill="#2d6cdf" stroke="{INK}" stroke-width="4"/>'
                f'<rect x="-13" y="-200" width="26" height="40" rx="8" fill="#1f2a44"/>'
                f'<rect x="7" y="-190" width="6" height="70" rx="3" fill="#dfe6f2"/></g>')

def highlight(x, y, w, h, t, t0, t1, color=HI_YELLOW, rot=-1.5):
    p = ease_out(prog(t, t0, t1))
    if p <= 0:
        return ""
    return (f'<g transform="rotate({rot} {x} {y})"><rect x="{x}" y="{y}" width="{w * p:.1f}" height="{h}" rx="6" '
            f'fill="{color}" opacity="0.75"/></g>')

def sticky(x, y, w, txt, color, rot, k, size=46):
    if k <= 0:
        return ""
    s = ease_back(k)
    lines = txt.split("\n")
    t = "".join(f'<text x="0" y="{-((len(lines) - 1) * size * 0.6) + i * size * 1.15:.1f}" font-family="Pangolin" '
                f'font-size="{size}" fill="{INK}" text-anchor="middle">{esc(l)}</text>' for i, l in enumerate(lines))
    return (f'<g transform="translate({x},{y}) rotate({rot}) scale({s:.3f})">'
            f'<rect x="{-w / 2 + 8}" y="{-w / 2 + 12}" width="{w}" height="{w}" fill="#000" opacity="0.15"/>'
            f'<rect x="{-w / 2}" y="{-w / 2}" width="{w}" height="{w}" fill="{color}"/>'
            f'<rect x="{-w / 2}" y="{-w / 2}" width="{w}" height="{w * 0.16}" fill="#000" opacity="0.06"/>{t}</g>')

def svg_to_rgba(body):
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}">{body}</svg>'
    return np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg.encode()))).convert("RGBA"),
                      dtype=np.float32)

# ---------- lip-sync ----------
def envelope(wav_path, fps=FPS):
    import wave
    w = wave.open(wav_path)
    sr = w.getframerate()
    x = np.frombuffer(w.readframes(w.getnframes()), "<i2").astype(np.float32) / 32768
    if w.getnchannels() > 1:
        x = x.reshape(-1, w.getnchannels()).mean(1)
    hop = sr // fps
    n = len(x) // hop
    rms = np.sqrt((x[: n * hop].reshape(n, hop) ** 2).mean(1))
    rms = rms / (np.percentile(rms, 95) + 1e-6)
    return np.clip(rms, 0, 1.5)
