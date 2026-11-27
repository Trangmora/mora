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

def make_bg(scale=1.12):
    w, h = int(W * scale), int(H * scale)
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
}

def stat(x, y, icon, value, caption, k, size=150, anchor="start"):
    """Con số lớn đen đậm + biểu tượng cam bên trái + chú thích nhỏ in hoa."""
    if k <= 0:
        return ""
    s = ease_back(k, 1.2)
    vw = len(value) * size * 0.66
    return (f'<g transform="translate({x},{y}) scale({s:.3f})" opacity="{min(1, k * 1.5):.2f}">'
            f'<g transform="translate({-vw / 2 - 90:.0f},{-size * 0.34:.0f}) scale({size / 150:.2f})">{ICONS[icon](ORANGE)}</g>'
            f'<text x="{-vw / 2 + 10:.0f}" y="0" font-family="Be Vietnam Pro" font-weight="800" font-size="{size}" fill="{BLACK}">{esc(value)}</text>'
            f'<text x="{-vw / 2 + 14:.0f}" y="{size * 0.5:.0f}" font-family="Be Vietnam Pro" font-weight="800" font-size="{size * 0.24:.0f}" '
            f'fill="{BLACK}" letter-spacing="3">{esc(caption)}</text></g>')

def title(x, y, txt, size, k, color=BLACK, bar=True, sub=None):
    if k <= 0:
        return ""
    s = ease_out(k)
    w = len(txt) * size * 0.64
    out = (f'<g transform="translate({x},{y + (1 - s) * 40:.1f})" opacity="{min(1, k * 1.6):.2f}">'
           f'<text text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="{size}" fill="{color}">{esc(txt)}</text>')
    if bar:
        out += f'<rect x="{-w / 2 * s:.0f}" y="{size * 0.22:.0f}" width="{w * s:.0f}" height="{max(8, size * 0.07):.0f}" fill="{ORANGE}"/>'
    if sub:
        out += (f'<text y="{size * 0.29 + size * 0.3 * 1.25 + 8:.0f}" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="{size * 0.3:.0f}" '
                f'fill="{ORANGE}" letter-spacing="4">{esc(sub)}</text>')
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
