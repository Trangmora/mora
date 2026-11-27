"""Phong cách "Vox sạch" (theo mẫu chủ kênh gửi): nền xám ấm có lưới ô mảnh, ảnh thật đen trắng chấm in báo
kèm mảng màu cam lệch phía sau, mẩu báo tô vàng, con số lớn đen đậm + biểu tượng cam + chú thích nhỏ,
thẻ biểu đồ nền kem bo góc với đường cam tự vẽ. Tối giản: chỉ zoom chậm, chuyển cảnh gọn.
"""
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

from vox import W, H, FPS, prog, ease_io, ease_out, ease_back, lerp, esc, svg_to_rgba

BG = (219, 216, 210)
GRID = (205, 202, 196)
ORANGE = "#e8762b"
ORANGE_RGB = (232, 118, 43)
RED_RGB = (214, 69, 52)
BLACK = "#1c1c1c"
CREAM = "#f6f1e6"

THEME = {"bg": "grid", "text": None, "bar": None, "sub": None, "num": None}
RED_TXT = "#d7261e"

def use_red_sand():
    """Chủ đề chủ kênh chọn 27/11: nền giấy nhám (không kẻ ô) + chữ đỏ, gạch dưới đen."""
    THEME.update(bg="oldgrid", text=RED_TXT, bar=BLACK, sub=BLACK, num=RED_TXT)

def make_sand(w, h, seed=7):
    """Nền giấy nhám: nền kem ấm, hạt mịn dày, lấm tấm hạt sáng/tối, loang nhẹ."""
    rng = np.random.default_rng(seed)
    base = np.array([228, 221, 208], np.float32)
    a = np.ones((h, w, 3), np.float32) * base
    fine = rng.normal(0, 9.0, (h, w)).astype(np.float32)
    a += fine[..., None]
    low = rng.normal(0, 1, (h // 60 + 2, w // 60 + 2)).astype(np.float32)
    low = np.asarray(Image.fromarray(((low * 30) + 128).clip(0, 255).astype("uint8")).resize((w, h), Image.BICUBIC), dtype=np.float32) / 255 - 0.5
    a *= (1 + low * 0.06)[..., None]
    n = int(w * h * 0.004)
    ys, xs = rng.integers(0, h, n), rng.integers(0, w, n)
    a[ys, xs] -= rng.uniform(25, 60, (n, 1))
    ys, xs = rng.integers(0, h, n // 2), rng.integers(0, w, n // 2)
    a[ys, xs] += rng.uniform(15, 30, (n // 2, 1))
    img = Image.fromarray(np.clip(a, 0, 255).astype("uint8")).filter(ImageFilter.GaussianBlur(0.6))
    a = np.asarray(img, dtype=np.float32)
    yy, xx = np.mgrid[0:h, 0:w]
    v = 1 - 0.12 * (((xx - w / 2) / w) ** 2 + ((yy - h / 2) / h) ** 2) * 4
    return Image.fromarray(np.clip(a * v[..., None], 0, 255).astype("uint8"))

def make_oldgrid(w, h, cell=110, seed=11):
    """Giấy sách cũ (theo video mẫu): nền xám ấm (216,216,209), hạt nhám lấm tấm, chấm trắng li ti,
    ô kẻ TO (~110 px), đường kẻ TRẮNG sáng hơn nền, mảnh, hơi run/đứt như in trên giấy."""
    rng = np.random.default_rng(seed)
    a = np.ones((h, w, 3), np.float32) * np.array([225, 225, 218], np.float32)
    # hạt nhám nhiều cỡ
    for sc, amp in ((1, 4.0), (2, 3.0), (5, 2.5)):
        n = rng.normal(0, 1, (h // sc + 1, w // sc + 1)).astype(np.float32)
        if sc > 1:
            n = np.asarray(Image.fromarray(((n * 40) + 128).clip(0, 255).astype("uint8")).resize((w, h), Image.BILINEAR), dtype=np.float32) / 40 - 3.2
        else:
            n = n[:h, :w]
        a += (n * amp)[..., None]
    # chấm trắng và chấm tối li ti
    k = int(w * h * 0.006)
    ys, xs = rng.integers(0, h, k), rng.integers(0, w, k)
    a[ys, xs] += rng.uniform(12, 26, (k, 1))
    k2 = int(w * h * 0.0015)
    ys, xs = rng.integers(0, h, k2), rng.integers(0, w, k2)
    a[ys, xs] -= rng.uniform(10, 22, (k2, 1))
    # đường kẻ trắng, hơi run, độ đậm thay đổi dọc theo đường
    lines = np.zeros((h, w), np.float32)
    off = cell // 4
    for x in range(off, w, cell):
        strength = 0.55 + 0.45 * np.asarray(Image.fromarray((rng.random((h // 40 + 2, 1)) * 255).astype("uint8")).resize((1, h), Image.BILINEAR), dtype=np.float32)[:, 0] / 255
        jit = int(rng.integers(-1, 2))
        lines[:, max(0, x + jit):x + jit + 2] = np.maximum(lines[:, max(0, x + jit):x + jit + 2], strength[:, None])
    for y in range(off, h, cell):
        strength = 0.55 + 0.45 * np.asarray(Image.fromarray((rng.random((1, w // 40 + 2)) * 255).astype("uint8")).resize((w, 1), Image.BILINEAR), dtype=np.float32)[0] / 255
        jit = int(rng.integers(-1, 2))
        lines[max(0, y + jit):y + jit + 2, :] = np.maximum(lines[max(0, y + jit):y + jit + 2, :], strength[None, :])
    lines *= (rng.random((h, w)) > 0.08)   # đứt nét li ti
    lines = np.asarray(Image.fromarray((lines * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(0.7)), dtype=np.float32) / 255
    a = a * (1 - lines[..., None] * 0.85) + np.array([241, 241, 236], np.float32) * lines[..., None] * 0.85
    yy, xx = np.mgrid[0:h, 0:w]
    v = 1 - 0.06 * (((xx - w / 2) / w) ** 2 + ((yy - h / 2) / h) ** 2) * 4
    return Image.fromarray(np.clip(a * v[..., None], 0, 255).astype("uint8"))

def make_bg(scale=1.12):
    w, h = int(W * scale), int(H * scale)
    if THEME["bg"] == "oldgrid":
        return make_oldgrid(w, h, cell=int(110 * scale))
    if THEME["bg"] == "sand":
        return make_sand(w, h)
    im = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(im)
    step = 64
    for x in range(0, w, step):
        d.line([(x, 0), (x, h)], fill=GRID, width=2)
    for y in range(0, h, step):
        d.line([(0, y), (w, y)], fill=GRID, width=2)
    a = np.asarray(im, dtype=np.float32)
    rng = np.random.default_rng(2)
    a += rng.normal(0, 3.0, a.shape[:2])[..., None]
    yy, xx = np.mgrid[0:h, 0:w]
    v = 1 - 0.10 * (((xx - w / 2) / w) ** 2 + ((yy - h / 2) / h) ** 2) * 4
    return Image.fromarray(np.clip(a * v[..., None], 0, 255).astype("uint8"))

def halftone_card(path, w, shadow=ORANGE_RGB, offset=(16, 16), crop=None):
    """Ảnh đen trắng tương phản + chấm in báo, mảng màu lệch phía sau."""
    im = Image.open(path).convert("L")
    if crop:
        im = im.crop(crop)
    h = int(im.height * w / im.width)
    im = ImageOps.autocontrast(im.resize((w, h), Image.LANCZOS), cutoff=2)
    a = np.asarray(im, dtype=np.float32) / 255
    # lớp chấm in báo (nhân nhẹ lên ảnh)
    cell = 7
    dots = Image.new("L", (w, h), 255)
    dd = ImageDraw.Draw(dots)
    small = np.asarray(im.resize((max(1, w // cell), max(1, h // cell)), Image.BILINEAR), dtype=np.float32) / 255
    for j in range(small.shape[0]):
        for i in range(small.shape[1]):
            r = (1 - small[j, i]) * cell * 0.62
            if r > 0.4:
                cx, cy = i * cell + cell / 2, j * cell + cell / 2
                dd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=0)
    dots = np.asarray(dots, dtype=np.float32) / 255
    g = np.clip(a * (0.55 + 0.45 * dots) * 1.05, 0, 1)
    gray = Image.fromarray((g * 255).astype("uint8")).convert("RGB")
    ox, oy = offset
    card = Image.new("RGBA", (w + abs(ox) + 30, h + abs(oy) + 30), (0, 0, 0, 0))
    sh = Image.new("RGBA", card.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).rectangle([15 + max(0, ox), 15 + max(0, oy), 15 + max(0, ox) + w, 15 + max(0, oy) + h], fill=(0, 0, 0, 70))
    sh = sh.filter(ImageFilter.GaussianBlur(10))
    card.alpha_composite(sh)
    ImageDraw.Draw(card).rectangle([15 + max(0, ox), 15 + max(0, oy), 15 + max(0, ox) + w, 15 + max(0, oy) + h], fill=shadow + (255,))
    card.paste(gray, (15 + max(0, -ox), 15 + max(0, -oy)))
    return card

def paste_card(canvas, card, cx, cy, rot=0.0, scale=1.0, alpha=1.0):
    if alpha <= 0:
        return
    c = card
    if scale != 1.0:
        c = c.resize((max(1, int(c.width * scale)), max(1, int(c.height * scale))), Image.BILINEAR)
    if rot:
        c = c.rotate(rot, resample=Image.BICUBIC, expand=True)
    if alpha < 1:
        c = c.copy()
        c.putalpha(c.getchannel("A").point(lambda v: int(v * alpha)))
    canvas.alpha_composite(c, (int(cx - c.width / 2), int(cy - c.height / 2)))

# ---------------------------------------------------------------- SVG
def wrap(txt, maxc):
    out, cur = [], ""
    for wd in txt.split():
        if len(cur) + len(wd) + 1 > maxc and cur:
            out.append(cur); cur = wd
        else:
            cur = (cur + " " + wd).strip()
    out.append(cur)
    return out

def newspaper(x, y, w, outlet, date, title, hl, deck, k, rot=-2.0, ht=None):
    """Mẩu báo: tên báo kiểu serif, tiêu đề lớn (nguyên văn) có tô vàng cụm hl, cột chữ xám."""
    if k <= 0:
        return ""
    s = ease_out(k)
    size = 64
    lines = wrap(title, int((w - 140) / (size * 0.62)))
    hh = 230 + len(lines) * size * 1.12 + 260
    yy = 230
    body = ""
    hp = ease_out(prog(ht if ht is not None else 0, 0, 1)) if ht is not None else 1
    for ln in lines:
        if hl and hl in ln:
            pre = ln[:ln.index(hl)]
            # ước lượng vị trí cụm cần tô
            cw = size * 0.6
            tot = len(ln) * cw
            x0 = w / 2 - tot / 2 + len(pre) * cw
            body += f'<rect x="{x0 - 6:.0f}" y="{yy - size * 0.82:.0f}" width="{(len(hl) * cw + 12) * hp:.0f}" height="{size * 1.0:.0f}" fill="#f7d23e"/>'
        body += f'<text x="{w / 2}" y="{yy:.0f}" text-anchor="middle" font-family="DejaVu Serif" font-weight="bold" font-size="{size}" fill="#151515">{esc(ln)}</text>'
        yy += size * 1.12
    body += f'<text x="{w / 2}" y="{yy + 20:.0f}" text-anchor="middle" font-family="DejaVu Serif" font-style="italic" font-size="30" fill="#333">{esc(deck)}</text>'
    cols = ""
    for c in range(3):
        for r in range(6):
            lw = (w - 160) / 3 - 30 - (r % 3) * 16
            cols += f'<rect x="{60 + c * (w - 120) / 3:.0f}" y="{yy + 80 + r * 26:.0f}" width="{lw:.0f}" height="9" fill="#bdbab3"/>'
    return (f'<g transform="translate({x},{y + (1 - s) * 80:.1f}) rotate({rot}) translate({-w / 2},{-hh / 2:.0f})" opacity="{min(1, k * 2):.2f}">'
            f'<rect x="14" y="18" width="{w}" height="{hh:.0f}" fill="#000" opacity="0.22"/>'
            f'<rect width="{w}" height="{hh:.0f}" fill="#f4f1ea"/>'
            f'<text x="{w / 2}" y="100" text-anchor="middle" font-family="DejaVu Serif" font-weight="bold" font-size="64" fill="#111">{esc(outlet)}</text>'
            f'<line x1="50" y1="128" x2="{w - 50}" y2="128" stroke="#111" stroke-width="3"/>'
            f'<line x1="50" y1="136" x2="{w - 50}" y2="136" stroke="#111" stroke-width="1"/>'
            f'<text x="50" y="168" font-family="DejaVu Sans" font-weight="bold" font-size="20" fill="#444">{esc(date)}</text>'
            f'{body}{cols}</g>')

ICONS = {
    "chip": lambda c: (f'<rect x="-46" y="-46" width="92" height="92" rx="10" fill="{c}"/>'
                       + "".join(f'<rect x="{-38 + k * 22}" y="-62" width="9" height="16" fill="{c}"/><rect x="{-38 + k * 22}" y="46" width="9" height="16" fill="{c}"/>'
                                 f'<rect x="-62" y="{-38 + k * 22}" width="16" height="9" fill="{c}"/><rect x="46" y="{-38 + k * 22}" width="16" height="9" fill="{c}"/>' for k in range(4))
                       + '<rect x="-24" y="-24" width="48" height="48" rx="4" fill="#fff" opacity="0.9"/>'),
    "cap": lambda c: (f'<path d="M -70 -10 L 0 -44 L 70 -10 L 0 24 Z" fill="{c}"/><path d="M -40 6 L -40 40 Q 0 60 40 40 L 40 6 L 0 24 Z" fill="{c}"/>'
                      f'<path d="M 62 -6 L 62 40" stroke="{c}" stroke-width="6"/><circle cx="62" cy="44" r="8" fill="{c}"/>'),
    "play": lambda c: f'<rect x="-64" y="-46" width="128" height="92" rx="24" fill="{c}"/><path d="M -16 -24 L 26 0 L -16 24 Z" fill="#fff"/>',
    "chart": lambda c: f'<rect x="-50" y="10" width="26" height="40" fill="{c}"/><rect x="-13" y="-14" width="26" height="64" fill="{c}"/><rect x="24" y="-44" width="26" height="94" fill="{c}"/>',
    "spark": lambda c: f'<path d="M 0 -60 Q 8 -8 60 0 Q 8 8 0 60 Q -8 8 -60 0 Q -8 -8 0 -60 Z" fill="{c}"/>',
    "coin": lambda c: f'<circle r="54" fill="{c}"/><text y="22" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="64" fill="#fff">$</text>',
    "pin": lambda c: f'<path d="M 0 60 C -50 0 -46 -54 0 -56 C 46 -54 50 0 0 60 Z" fill="{c}"/><circle cy="-14" r="18" fill="#fff"/>',
    "car": lambda c: (f'<path d="M -70 20 L -70 -6 L -48 -10 L -30 -40 L 34 -40 L 54 -10 L 70 -4 L 70 20 Z" fill="{c}"/>'
                      '<path d="M -22 -32 L 26 -32 L 40 -10 L -36 -10 Z" fill="#fff" opacity="0.9"/>'
                      f'<circle cx="-40" cy="22" r="16" fill="#1c1c1c"/><circle cx="40" cy="22" r="16" fill="#1c1c1c"/>'),
}

def stat(x, y, icon, value, caption, k, size=150, anchor="start"):
    """Con số lớn đen đậm + biểu tượng cam bên trái + chú thích nhỏ in hoa."""
    if k <= 0:
        return ""
    s = ease_back(k, 1.2)
    vw = len(value) * size * 0.66
    return (f'<g transform="translate({x},{y}) scale({s:.3f})" opacity="{min(1, k * 1.5):.2f}">'
            f'<g transform="translate({-vw / 2 - 90:.0f},{-size * 0.34:.0f}) scale({size / 150:.2f})">{ICONS[icon](ORANGE)}</g>'
            f'<text x="{-vw / 2 + 10:.0f}" y="0" font-family="Be Vietnam Pro" font-weight="800" font-size="{size}" fill="{THEME['num'] or BLACK}">{esc(value)}</text>'
            f'<text x="{-vw / 2 + 14:.0f}" y="{size * 0.5:.0f}" font-family="Be Vietnam Pro" font-weight="800" font-size="{size * 0.24:.0f}" '
            f'fill="{BLACK}" letter-spacing="3">{esc(caption)}</text></g>')

def title(x, y, txt, size, k, color=None, bar=True, sub=None):
    if k <= 0:
        return ""
    color = color or THEME["text"] or BLACK
    s = ease_out(k)
    w = len(txt) * size * 0.64
    out = (f'<g transform="translate({x},{y + (1 - s) * 40:.1f})" opacity="{min(1, k * 1.6):.2f}">'
           f'<text text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="{size}" fill="{color}">{esc(txt)}</text>')
    if bar:
        out += f'<rect x="{-w / 2 * s:.0f}" y="{size * 0.22:.0f}" width="{w * s:.0f}" height="{max(8, size * 0.07):.0f}" fill="{THEME['bar'] or ORANGE}"/>'
    if sub:
        out += (f'<text y="{size * 0.29 + size * 0.3 * 1.25 + 8:.0f}" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="{size * 0.3:.0f}" '
                f'fill="{THEME['sub'] or ORANGE}" letter-spacing="4">{esc(sub)}</text>')
    return out + "</g>"

def chart_card(x, y, w, h, ttl, labels, series, k, t0, t, legend=None, ymax=None, unit=""):
    """Thẻ biểu đồ kem bo góc, đường cam tự vẽ (series: [(tên, màu, [giá trị...])])."""
    if k <= 0:
        return ""
    s = ease_out(k)
    px, py, pw, ph = 90, 120, w - 150, h - 210
    ymax = ymax or max(max(v) for _, _, v in series) * 1.15
    g = (f'<g transform="translate({x - w / 2},{y - h / 2 + (1 - s) * 60:.1f})" opacity="{min(1, k * 1.5):.2f}">'
         f'<rect x="10" y="16" width="{w}" height="{h}" rx="26" fill="#000" opacity="0.16"/>'
         f'<rect width="{w}" height="{h}" rx="26" fill="{CREAM}" stroke="#d9d2c2" stroke-width="2"/>'
         f'<text x="50" y="72" font-family="Be Vietnam Pro" font-weight="800" font-size="34" fill="{BLACK}" letter-spacing="2">{esc(ttl)}</text>')
    for j in range(5):
        yy = py + ph - ph * j / 4
        g += (f'<line x1="{px}" y1="{yy:.0f}" x2="{px + pw}" y2="{yy:.0f}" stroke="#d6cfbf" stroke-width="2"/>'
              f'<text x="{px - 16}" y="{yy + 8:.0f}" text-anchor="end" font-family="Be Vietnam Pro" font-weight="800" font-size="22" fill="#6b655a">{ymax * j / 4:.1f}{unit}</text>')
    n = len(labels)
    xs = [px + pw * (i + 0.5) / n for i in range(n)]
    for i, lb in enumerate(labels):
        g += f'<text x="{xs[i]:.0f}" y="{py + ph + 44}" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="26" fill="#6b655a">{esc(lb)}</text>'
    p = ease_io(prog(t, t0, t0 + 1.4))
    for name, col, vals in series:
        pts = [(xs[i], py + ph - ph * v / ymax) for i, v in enumerate(vals)]
        # vẽ dần theo p
        m = p * (len(pts) - 1)
        q = pts[:int(m) + 1]
        if int(m) < len(pts) - 1:
            a, b = pts[int(m)], pts[int(m) + 1]
            f = m - int(m)
            q.append((lerp(a[0], b[0], f), lerp(a[1], b[1], f)))
        d = "M" + " L".join(f"{u:.1f},{v:.1f}" for u, v in q)
        g += f'<path d="{d}" fill="none" stroke="{col}" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>'
        for i, (u, v) in enumerate(pts):
            if i <= m + 0.01:
                g += f'<circle cx="{u:.1f}" cy="{v:.1f}" r="11" fill="{col}" stroke="{CREAM}" stroke-width="4"/>'
                g += (f'<text x="{u:.1f}" y="{v - 26:.1f}" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="30" '
                      f'fill="{BLACK}">{vals[i]:g}{unit}</text>')
    return g + "</g>"

# =====================================================================
# Chấm in báo nhanh (lưới xoay 45°) + nhân vật "hình dán" + cảnh biển dựng bằng code
# =====================================================================
def screen(gray, period=7.0, angle=45):
    """gray: mảng 0..1 (1 = sáng). Trả về mảng 0..1 dạng chấm in báo (vector hoá, nhanh)."""
    h, w = gray.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    a = math.radians(angle)
    u = (xx * math.cos(a) + yy * math.sin(a)) * (2 * math.pi / period)
    v = (-xx * math.sin(a) + yy * math.cos(a)) * (2 * math.pi / period)
    pat = (np.cos(u) * np.cos(v) + 1) / 2          # 0..1
    dark = 1 - gray
    dots = (pat < dark * 0.95).astype(np.float32)   # chấm to ở vùng tối
    out = 1 - dots * 0.88
    return np.clip(out * 0.35 + gray * 0.65 * out + 0.0, 0, 1)

def sticker(cut_path, w, color=RED_RGB, outline=16, contrast=True):
    """Ảnh người đã tách nền -> đen trắng chấm in báo + viền màu dày + bóng đổ."""
    im = Image.open(cut_path).convert("RGBA")
    bb = im.getchannel("A").getbbox()
    im = im.crop(bb)
    h = int(im.height * w / im.width)
    im = im.resize((w, h), Image.LANCZOS)
    alpha = im.getchannel("A")
    g = ImageOps.autocontrast(im.convert("L"), cutoff=1)
    ga = np.asarray(g, dtype=np.float32) / 255
    ht = screen(ga, 6.0)
    gray = Image.fromarray((ht * 255).astype("uint8")).convert("RGB")
    pad = outline + 30
    card = Image.new("RGBA", (w + 2 * pad, h + 2 * pad), (0, 0, 0, 0))
    big = Image.new("L", card.size, 0)
    big.paste(alpha, (pad, pad))
    ring = big.filter(ImageFilter.MaxFilter(outline * 2 + 1)).filter(ImageFilter.GaussianBlur(1.2))
    sh = Image.new("RGBA", card.size, (0, 0, 0, 0))
    sh.putalpha(ring.point(lambda v: int(v * 0.30)))
    sh = sh.filter(ImageFilter.GaussianBlur(12))
    card.alpha_composite(sh, (10, 14))
    col = Image.new("RGBA", card.size, color + (255,))
    col.putalpha(ring)
    card.alpha_composite(col)
    person = Image.new("RGBA", card.size, (0, 0, 0, 0))
    person.paste(gray, (pad, pad))
    person.putalpha(big)
    card.alpha_composite(person)
    return card

# ---------------- cảnh biển ----------------
def ship_layer(w=1100):
    """Tàu chở container vẽ bằng code (SVG) -> RGBA."""
    hull = "#1d1d1d"
    cont = "".join(f'<rect x="{180 + i * 58}" y="{-70 - (j * 34)}" width="54" height="32" fill="{["#3a3a3a", "#5a5a5a", "#2c2c2c", "#4a4a4a"][(i + j) % 4]}" stroke="#151515" stroke-width="2"/>'
                   for i in range(12) for j in range(2 + (i % 3 == 0)))
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="420" viewBox="0 -260 1100 420">'
           f'<path d="M 20 0 L 1040 0 L 1000 110 L 80 110 Q 40 80 20 0 Z" fill="{hull}"/>'
           f'<rect x="20" y="0" width="1020" height="10" fill="#8a2f2f"/>'
           f'{cont}'
           f'<rect x="40" y="-150" width="120" height="150" fill="#e8e8e8" stroke="#222" stroke-width="3"/>'
           + "".join(f'<rect x="{52 + i * 26}" y="{-138 + j * 30}" width="16" height="14" fill="#333"/>' for i in range(4) for j in range(4))
           + f'<rect x="60" y="-200" width="80" height="50" fill="#d9d9d9" stroke="#222" stroke-width="3"/>'
           f'<rect x="90" y="-250" width="16" height="50" fill="#222"/>'
           f'<line x1="900" y1="-120" x2="900" y2="0" stroke="#222" stroke-width="6"/></svg>')
    import cairosvg, io
    return Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg.encode()))).convert("RGBA")

class Ocean:
    def __init__(self, horizon=540, ship_w=1000):
        self.hz = horizon
        self.ship = ship_layer(ship_w)
        hgt = H - horizon
        yy, xx = np.mgrid[0:hgt, 0:W].astype(np.float32)
        self.z = 520.0 / (yy + 6.0)                      # độ sâu
        self.wx = (xx - W / 2) * self.z / 400.0           # toạ độ thế giới
        self.wz = self.z * 3.0
        self.fog = np.clip(1 - (yy / hgt) * 1.4, 0, 1) ** 2

    def height(self, x, z, t):
        return (0.55 * np.sin(1.3 * x + 0.9 * z - 1.6 * t) + 0.35 * np.sin(0.7 * x - 1.7 * z - 1.1 * t)
                + 0.18 * np.sin(3.1 * x + 2.3 * z - 2.7 * t) + 0.10 * np.sin(5.3 * x - 4.1 * z - 3.3 * t))

    def frame(self, t, ship_x=None, bg=None):
        """Trả về ảnh RGB (W×H): nền trên đường chân trời + mặt biển chấm in báo + tàu."""
        x, z = self.wx, self.wz
        e = 0.02
        hc = self.height(x, z, t)
        dx = (self.height(x + e, z, t) - hc) / e
        dz = (self.height(x, z + e, t) - hc) / e
        shade = 0.50 + 0.07 * dx - 0.09 * dz              # ánh sáng dịu
        spec = np.clip(dx * 0.5 - dz * 0.4, 0, None) ** 3 * 0.06
        g = np.clip(shade + spec, 0, 1)
        g = g * (1 - self.fog) + 0.70 * self.fog          # xa mờ dần về xám
        sea = np.full((H, W), 0.84, np.float32)
        sea[self.hz:] = g
        # tàu nhấp nhô theo sóng
        sx = ship_x if ship_x is not None else W * 0.5
        sy = self.hz + 175
        bob = 8 * math.sin(t * 1.6) + 5 * math.sin(t * 2.7)
        roll = 1.2 * math.sin(t * 1.3)
        shp = self.ship.rotate(roll, resample=Image.BICUBIC, expand=True)
        sa = np.asarray(shp, dtype=np.float32) / 255
        x0, y0 = int(sx - shp.width / 2), int(sy - shp.height * 0.80 + bob)
        x1, y1 = max(0, x0), max(0, y0)
        x2, y2 = min(W, x0 + shp.width), min(H, y0 + shp.height)
        if x2 > x1 and y2 > y1:
            sub = sa[y1 - y0:y2 - y0, x1 - x0:x2 - x0]
            lum = sub[..., :3].mean(-1)
            a = sub[..., 3].copy()
            # phần thân dưới mép nước bị sóng che (mép nước nhấp nhô)
            cols = np.arange(x1, x2, dtype=np.float32)
            wline = sy + bob * 0.3 + 5 * np.sin(cols * 0.03 + 3 * t)
            rows = np.arange(y1, y2, dtype=np.float32)[:, None]
            a[rows > wline[None, :]] = 0
            sea[y1:y2, x1:x2] = sea[y1:y2, x1:x2] * (1 - a) + lum * a
            # bọt nước quanh mũi và đuôi tàu
            wl = min(H - 1, int(sy + bob + shp.height * 0.0))
            for k in range(3):
                yy = wl + 6 + k * 7
                if yy < H:
                    xs = slice(max(0, x0 - 40 - k * 60), min(W, x0 + 80))
                    sea[yy:yy + 4, xs] = np.maximum(sea[yy:yy + 4, xs], 0.95 - k * 0.1)
        ht = screen(sea, 6.5)
        rgb = (np.stack([ht] * 3, -1) * 255).astype(np.float32)
        if bg is not None:
            top = np.asarray(bg, dtype=np.float32)[: self.hz]
            rgb[: self.hz] = top
            # dải chuyển mượt ở chân trời
            for k in range(30):
                yy = self.hz + k
                if yy < H:
                    f = k / 30
                    rgb[yy] = rgb[yy] * f + np.asarray(bg, dtype=np.float32)[yy] * (1 - f)
        tint = np.array([0.98, 0.97, 0.95], np.float32)
        return np.clip(rgb * tint, 0, 255)
