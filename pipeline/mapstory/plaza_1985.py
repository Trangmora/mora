"""Kênh Lịch sử Thế giới – tập "Chiến tranh tiền tệ: Hiệp ước Plaza 1985".

python3 pipeline/mapstory/plaza_1985.py <ne_50m_admin_0_countries.geojson> <ne_50m_admin_1_states_provinces.geojson> \
        <thư_mục_giọng (vo_vi.wav, T_vi.json)> <out.mp4>
"""
import io, json, math, os, subprocess, sys
from multiprocessing import Pool
import numpy as np
import cairosvg
from PIL import Image
from shapely.geometry import shape, box

sys.path.insert(0, os.path.dirname(__file__))
from demo import (W, H, clamp, prog, ease_io, ease_out, ease_back, lerp, mix, outlined, eyes, arm,
                  make_texture, OUT, SKIN, LAND, LAND_EDGE, SEA)
from ftx import build_captions, caption

FPS = 30
COSF = math.cos(math.radians(30))
JP_COL, JP_EDGE = "#c8323c", "#6e1018"
US_COL, US_EDGE = "#2f5d9e", "#132c55"
YEL, BRN = "#ffd54a", "#3b1d0a"
G = {}

def lbl(x, y, txt, size=58, rot=-6, k=1.0, fill=YEL):
    if k <= 0:
        return ""
    return (f'<g transform="translate({x:.1f},{y:.1f}) scale({ease_back(k):.3f}) rotate({rot})">'
            + outlined(f'text-anchor="middle" font-family="DejaVu Serif" font-weight="bold" font-size="{size}"',
                       txt, fill, BRN, 10) + "</g>")

def big(x, y, txt, size, fill="#ffffff", stroke="#141414", sw=14, k=1.0, rot=0):
    if k <= 0:
        return ""
    return (f'<g transform="translate({x:.1f},{y:.1f}) scale({ease_back(k):.3f}) rotate({rot})">'
            + outlined(f'text-anchor="middle" font-family="Inter" font-weight="900" font-size="{size}"',
                       txt, fill, stroke, sw) + "</g>")

def window(t, a, b, fi=0.25, fo=0.25):
    """độ hiện 0..1 của một lớp trong khoảng [a, b]"""
    return clamp(prog(t, a - fi, a) if fi else float(t >= a)) * (1 - prog(t, b, b + fo))

# ---------- bản đồ Thái Bình Dương (dời kinh độ âm +360 để Mỹ nằm bên phải Nhật) ----------
def load_map(path):
    out = []
    for f in json.load(open(path))["features"]:
        code = f["properties"]["ADM0_A3"]
        g = shape(f["geometry"])
        polys = [g] if g.geom_type == "Polygon" else list(g.geoms)
        d = ""
        for p in polys:
            p = p.simplify(0.04)
            if p.is_empty or p.area < 0.05:
                continue
            sh = 360 if p.centroid.x < -25 else 0
            pts = [(x + sh, y) for x, y in p.exterior.coords]
            if not box(95, -40, 330, 82).intersects(shape({"type": "Polygon", "coordinates": [pts]})):
                continue
            d += "M" + " ".join(f"{x * COSF:.3f},{-y:.3f}" for x, y in pts) + "Z"
        if d:
            out.append((code, d))
    return out

def load_california(path):
    for f in json.load(open(path))["features"]:
        if f["properties"].get("adm0_a3") == "USA" and f["properties"]["name"] == "California":
            g = shape(f["geometry"]).simplify(0.03)
            poly = max(g.geoms, key=lambda p: p.area) if g.geom_type == "MultiPolygon" else g
            c = poly.centroid
            k = 24.0  # px / độ
            cs = math.cos(math.radians(37))
            return "M" + " ".join(f"{(x - c.x) * cs * k:.1f},{-(y - c.y) * k:.1f}" for x, y in poly.exterior.coords) + "Z"

def camera(t, T):
    wide = (205, 33, 6.8)
    ny = (286.0, 40.7, 34)
    jp = (138.5, 36.5, 38)
    keys = [(0, (211, 28, 4.6)), (T["s01_end"], wide), (T["s04"], wide), (T["s04"] + 1.3, ny),
            (T["s06"], ny), (T["s06"] + 1.2, wide), (T["s08"], wide), (T["s08"] + 1.2, jp),
            (T["s11"], jp), (T["s11"] + 1.0, (140, 36, 20)), (1e9, (140, 36, 20))]
    for (ta, a), (tb, b) in zip(keys, keys[1:]):
        if ta <= t < tb:
            z = ease_io(prog(t, ta, tb))
            return tuple(lerp(p, q, z) for p, q in zip(a, b))
    return keys[-1][1]

def map_svg(t, T):
    clon, clat, s = camera(t, T)
    tx, ty = W / 2 - clon * COSF * s, H * 0.30 + clat * s
    to_px = lambda lon, lat: (lon * COSF * s + tx, -lat * s + ty)
    jp = ease_out(prog(t, T["s02"] + 0.2, T["s02"] + 0.9))
    us = ease_out(prog(t, T["s03"], T["s03"] + 0.7))
    sw = 2.2 / s
    p = [f'<g transform="matrix({s},0,0,{s},{tx},{ty})">',
         f'<g transform="translate({4 / s},{6 / s})" fill="#2e5d5c" opacity="0.45">']
    p += [f'<path d="{d}"/>' for _, d in G["countries"]]
    p.append("</g>")
    for code, d in G["countries"]:
        fill, edge = LAND, LAND_EDGE
        if code == "JPN":
            fill, edge = mix(LAND, JP_COL, jp), mix(LAND_EDGE, JP_EDGE, jp)
        elif code == "USA":
            fill, edge = mix(LAND, US_COL, us), mix(LAND_EDGE, US_EDGE, us)
        p.append(f'<path d="{d}" fill="{fill}" stroke="{edge}" stroke-width="{sw:.4f}" stroke-linejoin="round"/>')
    p.append("</g>")
    # nhãn quốc gia
    a = 1 - prog(t, T["s04"], T["s04"] + 0.4) + prog(t, T["s06"] + 0.8, T["s06"] + 1.2)
    a = clamp(a) * (1 - prog(t, T["s08"], T["s08"] + 0.4))
    if a > 0:
        x, y = to_px(150, 29)
        p.append(f'<g opacity="{a:.2f}">' + lbl(x + 60, y, "NHẬT BẢN", 52, -6, prog(t, T["s02"] + 0.5, T["s02"] + 1.0)) + "</g>")
        x, y = to_px(262, 42)
        p.append(f'<g opacity="{a:.2f}">' + lbl(x, y, "HOA KỲ", 58, -4, prog(t, T["s03"] + 0.2, T["s03"] + 0.7)) + "</g>")
    # Plaza, New York
    k = prog(t, T["s04"] + 1.0, T["s04"] + 1.4)
    if k > 0 and t < T["s06"] + 0.4:
        x, y = to_px(286.0, 40.75)
        a = 1 - prog(t, T["s06"], T["s06"] + 0.4)
        r = 16 + 10 * abs(math.sin((t - T["s04"]) * 5))
        p.append(f'<g opacity="{a:.2f}"><circle cx="{x:.1f}" cy="{y:.1f}" r="{r * 2.2:.1f}" fill="{YEL}" opacity="0.35"/>'
                 f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{14 * ease_back(k):.1f}" fill="{YEL}" stroke="{BRN}" stroke-width="5"/>'
                 + lbl(x - 170, y - 70, "Plaza, New York", 50, -5, k, "#fff6d8") + "</g>")
    # Tokyo
    k = prog(t, T["s08"] + 1.0, T["s08"] + 1.4)
    if k > 0 and t < T["s11"]:
        x, y = to_px(139.7, 35.7)
        a = 1 - prog(t, T["s10"], T["s10"] + 0.3)
        p.append(f'<g opacity="{a:.2f}"><circle cx="{x:.1f}" cy="{y:.1f}" r="{13 * ease_back(k):.1f}" fill="{YEL}" stroke="{BRN}" stroke-width="5"/>'
                 + lbl(x + 150, y + 80, "Tokyo", 54, -5, k, "#fff6d8") + "</g>")
    G["to_px"] = to_px
    return "".join(p)

# ---------- đạo cụ ----------
def coin(x, y, sym, r=40, gold=True):
    c, ink = ("#f2c233", "#9a6b00") if gold else ("#e8e8e8", "#b8262e")
    return (f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{c}" stroke="{OUT}" stroke-width="{max(4, r / 8):.0f}"/>'
            f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r * 0.78:.1f}" fill="none" stroke="{ink}" stroke-width="{r / 14:.1f}" opacity="0.5"/>'
            f'<text x="{x:.1f}" y="{y + r * 0.4:.1f}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" '
            f'font-size="{r * 1.15:.0f}" fill="{ink}">{sym}</text>')

def car(x, y, sc=1.0, col="#d94141"):
    return (f'<g transform="translate({x:.1f},{y:.1f}) scale({sc:.3f})">'
            f'<path d="M -90 10 L -90 -20 Q -86 -34 -60 -38 L -40 -66 Q -34 -72 -20 -72 L 34 -72 Q 46 -72 54 -62 L 74 -38 '
            f'Q 92 -34 92 -16 L 92 10 Z" fill="{col}" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>'
            f'<path d="M -30 -40 L -18 -60 L 8 -60 L 8 -40 Z M 18 -40 L 18 -60 L 40 -60 L 56 -40 Z" fill="#bfe3ef" stroke="{OUT}" stroke-width="4"/>'
            f'<circle cx="-50" cy="12" r="20" fill="#333" stroke="{OUT}" stroke-width="5"/><circle cx="-50" cy="12" r="8" fill="#aaa"/>'
            f'<circle cx="52" cy="12" r="20" fill="#333" stroke="{OUT}" stroke-width="5"/><circle cx="52" cy="12" r="8" fill="#aaa"/></g>')

def tv(x, y, sc=1.0):
    return (f'<g transform="translate({x:.1f},{y:.1f}) scale({sc:.3f})">'
            f'<path d="M -20 -62 L 0 -44 L 22 -66" fill="none" stroke="{OUT}" stroke-width="5" stroke-linecap="round"/>'
            f'<rect x="-62" y="-46" width="124" height="88" rx="12" fill="#8b5a2b" stroke="{OUT}" stroke-width="6"/>'
            f'<rect x="-50" y="-36" width="80" height="66" rx="10" fill="#6fb7c9" stroke="{OUT}" stroke-width="4"/>'
            f'<circle cx="46" cy="-18" r="6" fill="#ddd" stroke="{OUT}" stroke-width="3"/>'
            f'<circle cx="46" cy="6" r="6" fill="#ddd" stroke="{OUT}" stroke-width="3"/></g>')

def walkman(x, y, sc=1.0):
    return (f'<g transform="translate({x:.1f},{y:.1f}) scale({sc:.3f})">'
            f'<path d="M -44 -6 Q -44 -78 0 -78 Q 44 -78 44 -6" fill="none" stroke="{OUT}" stroke-width="8"/>'
            f'<rect x="-56" y="-14" width="24" height="36" rx="8" fill="#e05a2a" stroke="{OUT}" stroke-width="5"/>'
            f'<rect x="32" y="-14" width="24" height="36" rx="8" fill="#e05a2a" stroke="{OUT}" stroke-width="5"/>'
            f'<rect x="-30" y="0" width="60" height="78" rx="8" fill="#4d6b8a" stroke="{OUT}" stroke-width="5"/>'
            f'<rect x="-20" y="14" width="40" height="24" rx="4" fill="#cfd8df" stroke="{OUT}" stroke-width="3"/></g>')

def bill(x, y, rot, sc=1.0, a=1.0):
    return (f'<g opacity="{a:.2f}" transform="translate({x:.1f},{y:.1f}) rotate({rot:.1f}) scale({sc:.2f})">'
            f'<rect x="-46" y="-24" width="92" height="48" rx="6" fill="#e9dcae" stroke="{OUT}" stroke-width="4"/>'
            f'<circle cx="0" cy="0" r="15" fill="none" stroke="#8a6d2b" stroke-width="3"/>'
            f'<text x="0" y="8" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="22" fill="#8a6d2b">¥</text></g>')

def panel(x, y, w, h, a, fill="#fff6e0"):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="26" fill="{fill}" stroke="{OUT}" stroke-width="8" opacity="{a:.2f}"/>')

def arrow(x, y, up, col, a=1.0, sc=1.0):
    d = -1 if up else 1
    return (f'<g opacity="{a:.2f}" transform="translate({x:.1f},{y:.1f}) scale({sc:.2f})">'
            f'<path d="M -16 {-50 * d} L 16 {-50 * d} L 16 {10 * d} L 38 {10 * d} L 0 {60 * d} L -38 {10 * d} L -16 {10 * d} Z" '
            f'fill="{col}" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/></g>')

# ---------- các cảnh phủ ----------
def scene_title(t, T):
    """s01: tiêu đề + đồng $ và đồng ¥ lao vào nhau"""
    s = ""
    a = window(t, 0.05, T["s02"] - 0.1)
    if a > 0:
        hit = T["s01"] + 0.9
        k = ease_in = prog(t, 0.1, hit) ** 2
        xL, xR = lerp(-120, 430, k), lerp(1200, 650, k)
        rb = ease_out(prog(t, hit, hit + 0.5))
        xL -= 60 * rb; xR += 60 * rb
        rot = (t - 0.1) * 400 * (1 - rb * 0.9)
        s += (f'<g opacity="{a:.2f}"><g transform="rotate({rot:.1f} {xL:.1f} 640)">{coin(xL, 640, "$", 110)}</g>'
              f'<g transform="rotate({-rot:.1f} {xR:.1f} 640)">{coin(xR, 640, "¥", 110, False)}</g>')
        fl = prog(t, hit, hit + 0.35)
        if 0 < fl < 1:
            r = 60 + 340 * ease_out(fl)
            s += (f'<circle cx="540" cy="640" r="{r:.0f}" fill="#fff3b0" opacity="{0.8 * (1 - fl):.2f}"/>'
                  + "".join(f'<path d="M {540 + math.cos(q) * r * 0.5:.0f} {640 + math.sin(q) * r * 0.5:.0f} L {540 + math.cos(q) * r:.0f} {640 + math.sin(q) * r:.0f}" '
                            f'stroke="{YEL}" stroke-width="14" stroke-linecap="round" opacity="{1 - fl:.2f}"/>' for q in np.linspace(0, 2 * math.pi, 10, endpoint=False)))
        s += "</g>"
        tk = prog(t, T["s01"] + 1.5, T["s01"] + 1.9)
        s += f'<g opacity="{a:.2f}">' + big(540, 390, "CHIẾN TRANH", 120, YEL, BRN, 18, tk, -4) + big(540, 520, "TIỀN TỆ", 150, YEL, BRN, 20, tk, -4) + "</g>"
    return s

def scene_goods(t, T):
    """s02: hàng Nhật bay qua Thái Bình Dương"""
    a = window(t, T["s02"] + 1.0, T["s03"] + 0.4)
    if a <= 0:
        return ""
    to_px = G["to_px"]
    (x0, y0), (x1, y1) = to_px(141, 37), to_px(238, 38)
    s = f'<g opacity="{a:.2f}">'
    for i, f in enumerate((car, tv, walkman, car, tv, walkman)):
        ph = (t - T["s02"] - 1.0) * 0.55 - i / 6
        if ph < 0:
            continue
        ph %= 1.0
        x = lerp(x0, x1, ph)
        y = lerp(y0, y1, ph) - math.sin(ph * math.pi) * 240
        sc = 0.75 * ease_back(clamp(ph * 6)) * (1 - prog(ph, 0.9, 1.0))
        s += f(x, y, sc) if f is not car else car(x, y, sc, ["#d94141", "#f0f0f0", "#3f7fd9"][i % 3])
    return s + "</g>"

def scene_deficit(t, T):
    """s03: núi thâm hụt mọc lên trên đất Mỹ"""
    a = window(t, T["s03"] + 0.6, T["s04"] + 0.2)
    if a <= 0:
        return ""
    x, y = G["to_px"](262, 34)
    hgt = 420 * ease_out(prog(t, T["s03"] + 0.6, T["s03_end"]))
    wob = math.sin(t * 30) * 4 * (hgt / 420)
    pts = f"{x - 230},{y} {x - 90 + wob},{y - hgt * 0.72} {x - 40},{y - hgt * 0.6} {x + wob},{y - hgt} {x + 70},{y - hgt * 0.7} {x + 230},{y}"
    s = (f'<g opacity="{a:.2f}"><polygon points="{pts}" fill="#d62828" stroke="{OUT}" stroke-width="8" stroke-linejoin="round"/>'
         f'<polygon points="{x - 18 + wob},{y - hgt * 0.92} {x + wob},{y - hgt} {x + 22},{y - hgt * 0.9}" fill="#ffffff" opacity="0.8"/>')
    s += big(x, y - hgt - 40, "THÂM HỤT", 66, "#ffffff", "#141414", 13, prog(t, T["s03"] + 1.0, T["s03"] + 1.4))
    for i in range(3):
        if hgt > 100:
            s += f'<text x="{x - 80 + i * 80}" y="{y - 40 - (i % 2) * 60}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" fill="#ffffff" opacity="0.85">-$</text>'
    return s + "</g>"

def scene_plaza(t, T):
    """s04: ngày ký + 5 nước G5"""
    a = window(t, T["s04"] + 0.8, T["s05"] + 0.1)
    if a <= 0:
        return ""
    s = f'<g opacity="{a:.2f}">' + big(540, 300, "22/9/1985", 110, YEL, BRN, 18, prog(t, T["s04"] + 0.8, T["s04"] + 1.2), -3)
    names = [("MỸ", US_COL), ("NHẬT", JP_COL), ("TÂY ĐỨC", "#3b3b3b"), ("PHÁP", "#2a4d8f"), ("ANH", "#8f2a3a")]
    xs = [140, 330, 560, 780, 945]
    for i, ((n, c), x) in enumerate(zip(names, xs)):
        k = prog(t, T["s04"] + 2.2 + i * 0.22, T["s04"] + 2.5 + i * 0.22)
        if k <= 0:
            continue
        w = 60 + 40 * len(n)
        s += (f'<g transform="translate({x},{430}) scale({ease_back(k):.3f})">'
              f'<rect x="{-w / 2}" y="-44" width="{w}" height="80" rx="40" fill="{c}" stroke="{OUT}" stroke-width="6"/>'
              + outlined('y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="42"', n, "#ffffff", OUT, 6) + "</g>")
    return s + "</g>"

def scene_seesaw(t, T):
    """s05: đô la xuống, yên lên"""
    a = window(t, T["s05"] + 0.2, T["s06"] + 0.1)
    if a <= 0:
        return ""
    cx, cy = 540, 720
    ang = -16 * ease_back(prog(t, T["s05"] + 1.0, T["s05"] + 1.8), 1.3)
    r = math.radians(ang)
    L = (cx - 330 * math.cos(r), cy - 330 * math.sin(r))
    R = (cx + 330 * math.cos(r), cy + 330 * math.sin(r))
    s = (f'<g opacity="{a:.2f}">{panel(70, 440, 940, 520, 0.92)}'
         f'<polygon points="{cx - 60},{cy + 200} {cx},{cy} {cx + 60},{cy + 200}" fill="#8b5a2b" stroke="{OUT}" stroke-width="7" stroke-linejoin="round"/>'
         f'<g transform="rotate({ang:.2f} {cx} {cy})"><rect x="{cx - 370}" y="{cy - 14}" width="740" height="28" rx="12" fill="#c28a4a" stroke="{OUT}" stroke-width="7"/></g>'
         + coin(L[0], L[1] - 104, "$", 90) + coin(R[0], R[1] - 104, "¥", 90, False))
    k = prog(t, T["s05"] + 1.4, T["s05"] + 1.8)
    if k > 0:
        s += arrow(L[0] - 140, L[1] - 100, False, "#d62828", k) + arrow(R[0] + 140, R[1] - 120, True, "#2fa84f", k)
    return s + "</g>"

def scene_rate(t, T):
    """s06: 1 $ = 240 ¥ -> 120 ¥"""
    a = window(t, T["s06"] + 0.1, T["s07"] + 0.1)
    if a <= 0:
        return ""
    k = ease_io(prog(t, T["s06"] + 1.6, T["s06_end"] - 0.2))
    v = round(lerp(240, 120, k))
    col = mix("#141414", "#d62828", k)
    s = f'<g opacity="{a:.2f}">{panel(90, 420, 900, 520, 0.95)}'
    s += f'<text x="540" y="560" text-anchor="middle" font-family="Inter" font-weight="800" font-size="64" fill="#5a4630">1 đô la Mỹ =</text>'
    s += f'<text x="540" y="760" text-anchor="middle" font-family="Inter" font-weight="900" font-size="200" fill="{col}">{v} ¥</text>'
    years = ["1985", "1986", "1987", "1988"]
    yi = min(3, int(k * 3.999))
    s += f'<text x="540" y="880" text-anchor="middle" font-family="DejaVu Serif" font-weight="bold" font-size="54" fill="#8a6d2b">{years[yi]}</text>'
    if k > 0.05:
        s += arrow(880, 700, False, "#d62828", min(1, k * 4), 0.9)
    return s + "</g>"

def scene_price(t, T):
    """s07: hàng Nhật đắt gấp đôi"""
    a = window(t, T["s07"], T["s08"] + 0.1)
    if a <= 0:
        return ""
    k = prog(t, T["s07"] + 0.2, T["s07"] + 0.6)
    s = f'<g opacity="{a:.2f}">{panel(90, 420, 900, 520, 0.95)}' + car(400, 760, 2.2 * ease_back(k))
    k2 = prog(t, T["s07"] + 1.3, T["s07"] + 1.6)
    if k2 > 0:
        sc = lerp(2.4, 1.0, ease_out(k2))
        s += (f'<g transform="translate(790,640) rotate(10) scale({sc:.3f})" opacity="{min(1, k2 * 2):.2f}">'
              f'<rect x="-120" y="-90" width="240" height="160" rx="20" fill="#fff" stroke="#d62828" stroke-width="12"/>'
              + outlined('y="40" text-anchor="middle" font-family="Inter" font-weight="900" font-size="120"', "×2", "#d62828", "#ffffff", 4) + "</g>")
        s += arrow(790, 840, True, "#d62828", min(1, k2 * 2), 0.8)
    k3 = prog(t, T["s07"] + 2.2, T["s07"] + 2.6)
    if k3 > 0:
        s += big(540, 500, "XUẤT KHẨU LAO ĐAO", 62, "#ffffff", "#141414", 12, k3, -3)
    return s + "</g>"

def scene_rates_money(t, T):
    """s08: hạ lãi suất, mưa tiền yên trên nước Nhật"""
    s = ""
    a = window(t, T["s08"] + 1.6, T["s10"] + 0.1)
    if a > 0:
        rng = np.random.default_rng(3)
        for i in range(26):
            x0 = rng.uniform(80, 1000); sp = rng.uniform(260, 420); ph = rng.uniform(0, 1)
            y = ((t - T["s08"]) * sp + ph * 1100) % 1100 - 100
            s += bill(x0 + math.sin(t * 2 + i) * 30, y, math.sin(t * 3 + i * 1.7) * 30, 1.2, a)
    a = window(t, T["s08"] + 0.6, T["s09"] + 0.2)
    if a > 0:
        k = ease_io(prog(t, T["s08"] + 1.2, T["s08"] + 2.2))
        v = lerp(5.0, 2.5, k)
        txt = f"{v:.1f}%".replace(".", ",")
        s += (f'<g opacity="{a:.2f}" transform="translate(540,330) scale({ease_back(prog(t, T["s08"] + 0.6, T["s08"] + 1.0)):.3f})">'
              f'<rect x="-330" y="-120" width="660" height="230" rx="26" fill="#fff6e0" stroke="{OUT}" stroke-width="8"/>'
              f'<text x="0" y="-40" text-anchor="middle" font-family="Inter" font-weight="800" font-size="52" fill="#5a4630">LÃI SUẤT</text>'
              f'<text x="-30" y="80" text-anchor="middle" font-family="Inter" font-weight="900" font-size="130" fill="{mix("#141414", "#2fa84f", k)}">{txt}</text>'
              + arrow(220, 30, False, "#2fa84f", clamp(k * 3), 0.8) + "</g>")
    return s

def scene_bubble(t, T):
    """s09: bong bóng phình to trên Tokyo"""
    a = window(t, T["s09"] + 0.6, T["s10"] + 0.1)
    if a <= 0:
        return ""
    x, y = G["to_px"](139.7, 35.7)
    r = 60 + 300 * ease_out(prog(t, T["s09"] + 0.6, T["s10"])) + math.sin(t * 7) * 8
    cx, cy = x, y - r * 0.85
    s = (f'<g opacity="{a:.2f}"><circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}" fill="#bfe8ff" fill-opacity="0.45" stroke="#ffffff" stroke-width="8"/>'
         f'<path d="M {cx - r * 0.55:.1f} {cy - r * 0.35:.1f} Q {cx - r * 0.45:.1f} {cy - r * 0.7:.1f} {cx - r * 0.05:.1f} {cy - r * 0.75:.1f}" '
         f'fill="none" stroke="#ffffff" stroke-width="14" stroke-linecap="round" opacity="0.9"/>')
    sc = r / 300
    # nhà + biểu đồ đi lên trong bóng
    s += (f'<g transform="translate({cx:.1f},{cy:.1f}) scale({sc:.3f})">'
          f'<path d="M -190 60 L -190 -20 L -120 -80 L -50 -20 L -50 60 Z" fill="#e8b04a" stroke="{OUT}" stroke-width="8" stroke-linejoin="round"/>'
          f'<path d="M -210 -10 L -120 -100 L -30 -10" fill="none" stroke="#b8262e" stroke-width="18" stroke-linejoin="round" stroke-linecap="round"/>'
          f'<polyline points="20,80 80,30 130,50 200,-80" fill="none" stroke="#2fa84f" stroke-width="22" stroke-linejoin="round" stroke-linecap="round"/>'
          f'<path d="M 170 -90 L 214 -96 L 206 -52 Z" fill="#2fa84f" stroke="#2fa84f" stroke-width="8" stroke-linejoin="round"/></g>')
    s += big(cx, cy - r - 30, "BONG BÓNG", 70, YEL, BRN, 14, prog(t, T["s09"] + 1.6, T["s09"] + 2.0), -4)
    return s + "</g>"

def scene_scale(t, T):
    """s10: đất Hoàng cung nặng hơn cả California"""
    a = window(t, T["s10"] + 0.4, T["s11"] + 0.1)
    if a <= 0:
        return ""
    cx, cy = 540, 560
    ang = -13 * ease_back(prog(t, T["s10"] + 2.6, T["s10"] + 3.4), 1.6)
    r = math.radians(ang)
    L = (cx - 300 * math.cos(r), cy - 300 * math.sin(r))
    R = (cx + 300 * math.cos(r), cy + 300 * math.sin(r))
    s = (f'<g opacity="{a:.2f}">{panel(60, 300, 960, 720, 0.94)}'
         f'<rect x="{cx - 14}" y="{cy}" width="28" height="380" fill="#8b5a2b" stroke="{OUT}" stroke-width="6"/>'
         f'<rect x="{cx - 110}" y="{cy + 370}" width="220" height="30" rx="10" fill="#8b5a2b" stroke="{OUT}" stroke-width="6"/>'
         f'<g transform="rotate({ang:.2f} {cx} {cy})"><rect x="{cx - 320}" y="{cy - 12}" width="640" height="24" rx="10" fill="#c28a4a" stroke="{OUT}" stroke-width="6"/></g>'
         f'<circle cx="{cx}" cy="{cy}" r="20" fill="{YEL}" stroke="{OUT}" stroke-width="6"/>')
    for (px, py) in (L, R):
        s += (f'<path d="M {px:.1f} {py:.1f} L {px - 110:.1f} {py + 170:.1f} M {px:.1f} {py:.1f} L {px + 110:.1f} {py + 170:.1f}" stroke="{OUT}" stroke-width="5"/>'
              f'<path d="M {px - 140:.1f} {py + 170:.1f} L {px + 140:.1f} {py + 170:.1f} Q {px:.1f} {py + 230:.1f} {px - 140:.1f} {py + 170:.1f} Z" fill="#b0b6bc" stroke="{OUT}" stroke-width="6"/>')
    lx, ly = L[0], L[1] + 168
    # khu Hoàng cung: ô đất xanh nhỏ + mái cong
    s += (f'<rect x="{lx - 46:.1f}" y="{ly - 58:.1f}" width="92" height="58" fill="#5b8c3a" stroke="{OUT}" stroke-width="5"/>'
          f'<path d="M {lx - 40:.1f} {ly - 58:.1f} Q {lx:.1f} {ly - 96:.1f} {lx + 40:.1f} {ly - 58:.1f}" fill="#7a2b22" stroke="{OUT}" stroke-width="5"/>')
    s += lbl(lx, ly + 110, "Hoàng cung", 50, 0, prog(t, T["s10"] + 1.3, T["s10"] + 1.7), "#fff6d8")
    rx, ry = R[0], R[1] + 168
    s += (f'<g transform="translate({rx:.1f},{ry - 130:.1f}) scale(0.75)"><path d="{G["calif"]}" fill="{US_COL}" stroke="{US_EDGE}" stroke-width="4" stroke-linejoin="round"/></g>')
    s += lbl(rx, ry + 110, "California", 50, 0, prog(t, T["s10"] + 2.2, T["s10"] + 2.6), "#fff6d8")
    return s + "</g>"

# Nikkei 225, điểm đóng cửa cuối năm (gần đúng) + đáy 8/1992, mốc vượt đỉnh 22/2/2024
NIKKEI = [(1985, 13113), (1986, 18701), (1987, 21564), (1988, 30159), (1989.99, 38916), (1990.9, 23849), (1991.9, 22984),
          (1992.6, 14309), (1993.9, 17417), (1994.9, 19723), (1995.9, 19868), (1996.9, 19361), (1997.9, 15259), (1998.9, 13842),
          (1999.9, 18934), (2000.9, 13786), (2001.9, 10543), (2002.9, 8579), (2003.3, 7608), (2004.9, 11489), (2005.9, 16111),
          (2006.9, 17226), (2007.9, 15308), (2008.9, 8860), (2009.9, 10546), (2010.9, 10229), (2011.9, 8455), (2012.9, 10395),
          (2013.9, 16291), (2014.9, 17451), (2015.9, 19034), (2016.9, 19114), (2017.9, 22765), (2018.9, 20015), (2019.9, 23657),
          (2020.9, 27444), (2021.9, 28792), (2022.9, 26095), (2023.9, 33464), (2024.15, 39098), (2024.6, 38400)]

def scene_chart(t, T):
    """s11–s14: chỉ số Nikkei lên đỉnh, sụp, 34 năm mới vượt lại"""
    a = window(t, T["s11"] + 0.4, T["s15"] + 0.1)
    if a <= 0:
        return ""
    x0, y0, w, h = 150, 330, 820, 560
    X = lambda yr: x0 + (yr - 1985) / (2025 - 1985) * w
    Y = lambda v: y0 + h - v / 42000 * h
    if t < T["s12"]:
        end = lerp(1985, 1990, ease_io(prog(t, T["s11"] + 0.6, T["s11_end"])))
    elif t < T["s13"]:
        end = lerp(1990, 1992.7, ease_io(prog(t, T["s12"] + 0.5, T["s12"] + 1.4)))
    elif t < T["s14"]:
        end = lerp(1992.7, 2013, ease_io(prog(t, T["s13"], T["s13_end"] + 0.15)))
    else:
        end = lerp(2013, 2024.6, ease_io(prog(t, T["s14"] + 0.3, T["s14"] + 2.4)))
    pts = []
    for (ya, va), (yb, vb) in zip(NIKKEI, NIKKEI[1:]):
        if ya > end:
            break
        pts.append((ya, va))
        if yb > end:
            pts.append((end, lerp(va, vb, (end - ya) / (yb - ya))))
    if end >= NIKKEI[-1][0]:
        pts.append(NIKKEI[-1])
    crashing = T["s12"] <= t < T["s13"]
    col = "#d62828" if t >= T["s12"] + 0.5 and t < T["s14"] + 1.6 else "#2fa84f"
    s = f'<g opacity="{a:.2f}">{panel(70, 230, 940, 760, 0.95)}'
    s += (f'<text x="{x0}" y="{y0 - 30}" font-family="Inter" font-weight="900" font-size="54" fill="#5a4630">NIKKEI 225</text>'
          f'<line x1="{x0}" y1="{y0 + h}" x2="{x0 + w}" y2="{y0 + h}" stroke="{OUT}" stroke-width="5"/>')
    for yr in (1985, 1990, 2000, 2010, 2024):
        s += (f'<text x="{X(yr):.0f}" y="{y0 + h + 50}" text-anchor="middle" font-family="Inter" font-weight="800" '
              f'font-size="34" fill="#5a4630">{yr}</text>')
    if t >= T["s12"]:
        da = prog(t, T["s12"], T["s12"] + 0.4)
        s += (f'<line x1="{X(1989.99):.0f}" y1="{Y(38916):.0f}" x2="{x0 + w}" y2="{Y(38916):.0f}" stroke="#8a6d2b" '
              f'stroke-width="5" stroke-dasharray="18 14" opacity="{da:.2f}"/>')
    if t >= T["s13"]:  # vùng xám "thập kỷ mất mát"
        ga = prog(t, T["s13"], T["s13"] + 0.4) * (1 - prog(t, T["s14"] + 1.0, T["s14"] + 1.5))
        s += (f'<rect x="{X(1990):.0f}" y="{y0}" width="{X(2012) - X(1990):.0f}" height="{h}" fill="#5a5a5a" opacity="{0.18 * ga:.2f}"/>'
              f'<text x="{(X(1990) + X(2012)) / 2:.0f}" y="{y0 + h - 30}" text-anchor="middle" font-family="Inter" font-weight="900" '
              f'font-size="46" fill="#555" opacity="{ga:.2f}">THẬP KỶ MẤT MÁT</text>')
    if len(pts) > 1:
        line = " ".join(f"{X(a_):.1f},{Y(v):.1f}" for a_, v in pts)
        s += f'<polyline points="{line}" fill="none" stroke="{col}" stroke-width="11" stroke-linejoin="round" stroke-linecap="round"/>'
        hx, hy = X(pts[-1][0]), Y(pts[-1][1])
        s += f'<circle cx="{hx:.1f}" cy="{hy:.1f}" r="14" fill="{col}" stroke="{OUT}" stroke-width="5"/>'
    pk = prog(t, T["s11_end"] - 1.2, T["s11_end"] - 0.8)
    if pk > 0:
        s += big(X(1989.99) + 150, Y(38916) + 80, "38.915", 64, YEL, BRN, 12, pk, -4)
    # bong bóng vỡ ở đỉnh
    pop = T["s12"] + 0.45
    b = prog(t, pop - 0.5, pop)
    if T["s11_end"] - 0.6 < t < pop:
        r = 50 + 30 * b
        s += f'<circle cx="{X(1989.99):.0f}" cy="{Y(38916) + 10:.0f}" r="{r:.0f}" fill="#bfe8ff" fill-opacity="0.4" stroke="#ffffff" stroke-width="7"/>'
    bp = prog(t, pop, pop + 0.45)
    if 0 < bp < 1:
        cx, cy = X(1989.99), Y(38916) + 10
        for q in np.linspace(0, 2 * math.pi, 12, endpoint=False):
            r1, r2 = 60 + 160 * bp, 90 + 200 * bp
            s += (f'<path d="M {cx + math.cos(q) * r1:.0f} {cy + math.sin(q) * r1:.0f} L {cx + math.cos(q) * r2:.0f} {cy + math.sin(q) * r2:.0f}" '
                  f'stroke="#ffffff" stroke-width="12" stroke-linecap="round" opacity="{1 - bp:.2f}"/>')
        s += big(cx + 230, cy + 20, "BÙM!", 110, "#ffffff", "#d62828", 16, prog(t, pop, pop + 0.2), -8)
    if crashing and t > T["s12"] + 1.4:
        s += big(X(1996), Y(9000), "-63%", 96, "#d62828", "#ffffff", 14, prog(t, T["s12"] + 1.4, T["s12"] + 1.7), -4)
    if t >= T["s14"] + 2.0:
        k = prog(t, T["s14"] + 2.0, T["s14"] + 2.4)
        s += big(X(2015), Y(38916) + 80, "2024!", 92, YEL, BRN, 14, k, -6)
    return s + "</g>"

def scene_end(t, T):
    a = prog(t, T["s15"] + 0.2, T["s15"] + 0.5)
    if a <= 0:
        return ""
    return (big(540, 470, "CHIẾN TRANH", 120, YEL, BRN, 18, a, -4) + big(540, 610, "TIỀN TỆ", 150, YEL, BRN, 20, a, -4)
            + big(540, 760, "Hiệp ước Plaza 1985", 64, "#ffffff", "#141414", 12, prog(t, T["s15"] + 0.6, T["s15"] + 0.9)))

# ---------- nhân vật: quan chức Nhật (kính tròn) và quan chức Mỹ (cà vạt đỏ) ----------
def face(expr, t, glasses=False):
    s = ""
    if expr == "shock":
        s += eyes(True)
    elif expr == "laugh":
        s += "".join(f'<path d="M {x - 12} -262 Q {x} -278 {x + 12} -262" fill="none" stroke="{OUT}" stroke-width="6" stroke-linecap="round"/>' for x in (-22, 30))
    elif expr == "smug":
        s += "".join(f'<path d="M {x - 12} -264 L {x + 12} -264" stroke="{OUT}" stroke-width="6" stroke-linecap="round"/>'
                     f'<path d="M {x - 8} -264 Q {x} -256 {x + 8} -264" fill="{OUT}"/>' for x in (-22, 30))
    else:
        s += eyes(False)
    if expr == "sad":
        s += f'<path d="M -38 -292 L -10 -284 M 46 -292 L 18 -284" stroke="{OUT}" stroke-width="5" stroke-linecap="round"/>'
    if glasses:
        s += (f'<circle cx="-22" cy="-265" r="22" fill="#ffffff" fill-opacity="0.18" stroke="{OUT}" stroke-width="5"/>'
              f'<circle cx="30" cy="-265" r="22" fill="#ffffff" fill-opacity="0.18" stroke="{OUT}" stroke-width="5"/>'
              f'<path d="M 0 -267 L 8 -267 M -44 -268 L -76 -276 M 52 -268 L 78 -276" stroke="{OUT}" stroke-width="5"/>')
    y = -226
    if expr == "shock":
        s += (f'<ellipse cx="4" cy="{y + 10}" rx="19" ry="26" fill="#5a1d1d" stroke="{OUT}" stroke-width="5"/>'
              f'<ellipse cx="4" cy="{y + 24}" rx="11" ry="8" fill="#d0606a"/>')
    elif expr == "laugh":
        s += f'<path d="M -22 {y - 4} Q 4 {y + 40} 30 {y - 4} Z" fill="#5a1d1d" stroke="{OUT}" stroke-width="5" stroke-linejoin="round"/>'
    elif expr == "sad":
        s += f'<path d="M -12 {y + 8} Q 4 {y - 6} 20 {y + 8}" fill="none" stroke="{OUT}" stroke-width="5" stroke-linecap="round"/>'
    elif expr == "smug":
        s += f'<path d="M -6 {y} Q 14 {y + 8} 30 {y - 8}" fill="none" stroke="{OUT}" stroke-width="5" stroke-linecap="round"/>'
    elif expr == "talk" and int(t * FPS / 3.5) % 3 != 2:
        s += f'<ellipse cx="4" cy="{y + 2}" rx="11" ry="10" fill="#5a1d1d" stroke="{OUT}" stroke-width="4"/>'
    else:
        s += f'<path d="M -14 {y - 4} Q 4 {y + 14} 22 {y - 4}" fill="none" stroke="{OUT}" stroke-width="5" stroke-linecap="round"/>'
    return s

def official(kind, expr, aL, aR, t, head_rot=0.0):
    if kind == "jp":
        suit, tie, hair, glasses = "#3a3f47", "#2f5d9e", "#1a1a1a", True
        hair_d = ('<path d="M -82 -272 Q -86 -350 -10 -350 Q 70 -352 84 -280 Q 60 -320 10 -316 Q -40 -330 -82 -272 Z"/>')
    else:
        suit, tie, hair, glasses = "#23395d", "#c8323c", "#9a6a3a", False
        hair_d = ('<path d="M -84 -268 Q -90 -346 -8 -352 Q 76 -354 86 -272 Q 76 -300 40 -312 Q -6 -302 -30 -326 Q -60 -306 -84 -268 Z"/>')
    legs = (f'<rect x="-50" y="-74" width="42" height="74" fill="#2a2d33" stroke="{OUT}" stroke-width="6"/>'
            f'<rect x="8" y="-74" width="42" height="74" fill="#2a2d33" stroke="{OUT}" stroke-width="6"/>'
            f'<ellipse cx="-34" cy="0" rx="34" ry="12" fill="{OUT}"/><ellipse cx="34" cy="0" rx="34" ry="12" fill="{OUT}"/>')
    body = (f'<path d="M -70 -198 Q 0 -212 70 -198 L 80 -60 Q 0 -48 -80 -60 Z" fill="{suit}" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>'
            f'<path d="M -30 -204 L 0 -130 L 30 -204 Z" fill="#ffffff" stroke="{OUT}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="M -8 -192 L 8 -192 L 12 -150 L 0 -132 L -12 -150 Z" fill="{tie}" stroke="{OUT}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="M -30 -204 L -8 -120 M 30 -204 L 8 -120" stroke="{OUT}" stroke-width="5"/>'
            + "".join(f'<circle cx="0" cy="{y}" r="6" fill="#111"/>' for y in (-108, -82)))
    head = (f'<g transform="rotate({head_rot:.2f} 0 -210)"><circle cx="0" cy="-262" r="80" fill="{SKIN}" stroke="{OUT}" stroke-width="6"/>'
            f'<g fill="{hair}" stroke="{OUT}" stroke-width="5" stroke-linejoin="round">{hair_d}</g>'
            f'{face(expr, t, glasses)}</g>')
    return arm(suit, "#ffffff", aL, -70) + legs + body + head + arm(suit, "#ffffff", aR, 66)

def seg(t, T):
    cur = "s01"
    for sid in sorted(k for k in T if k.startswith("s") and "_" not in k):
        if t >= T[sid] - 0.1:
            cur = sid
    return cur

def characters(t, T):
    sg = seg(t, T)
    S = 1.4
    bob = math.sin(t * 5) * 4
    # quan chức Nhật (trái)
    jp_expr = {"s02": "smile", "s03": "laugh", "s04": "smile", "s05": "smile", "s06": "shock", "s07": "sad", "s08": "talk",
               "s09": "laugh", "s10": "laugh", "s11": "laugh", "s12": "shock", "s13": "sad", "s14": "shock", "s15": "sad"}.get(sg, "smile")
    us_expr = {"s03": "shock", "s04": "smile", "s05": "talk", "s06": "smug", "s07": "smug", "s08": "smile", "s09": "smile",
               "s10": "laugh", "s11": "smile", "s12": "shock", "s13": "smug", "s14": "smile", "s15": "smug"}.get(sg, "smile")
    if sg == "s05" and t > T["s05"] + 1.4:
        jp_expr = "shock"
    if sg == "s14" and t > T["s14"] + 2.0:
        jp_expr = "laugh"
    aLj, aRj, aLu, aRu = 8.0, -8.0, 8.0, -8.0
    if sg == "s02":
        aRj = -150 + math.sin(t * 8) * 14
    if sg in ("s09", "s11"):
        aLj, aRj = 150 + math.sin(t * 9) * 10, -150 - math.sin(t * 9) * 10
    if sg in ("s06", "s12"):
        aLj, aRj = 150 + math.sin(t * 40) * 6, -150 + math.sin(t * 40) * 6
    if sg == "s03":
        aLu, aRu = 150 + math.sin(t * 40) * 6, -150 + math.sin(t * 40) * 6
    if sg == "s08":  # tung tiền
        aRj = -120 + math.sin(t * 10) * 30
    # bắt tay ở khách sạn Plaza
    hs0 = T["s04"] + 1.2
    raise_ = ease_out(prog(t, hs0, hs0 + 0.5)) * (1 - ease_io(prog(t, T["s05"] - 0.1, T["s05"] + 0.3)))
    if raise_ > 0:
        shk = math.sin((t - hs0) * 2 * math.pi * 2.5) * 7 * raise_
        aRj = lerp(aRj, -70, raise_) + shk
        aRu = lerp(aRu, -70, raise_) + shk
    hr_j = math.sin(t * 40) * 5 if jp_expr == "shock" else math.sin(t * 2.2) * 3
    hr_u = math.sin(t * 8) * 3 if us_expr == "talk" else (8 if sg == "s05" else math.sin(t * 2.0 + 1) * 3)
    sad_dy = 20 if jp_expr == "sad" else 0
    hop = abs(math.sin(t * 9)) * 30 if sg in ("s09", "s11") or (sg == "s14" and t > T["s14"] + 2.0) else 0
    ej = ease_back(prog(t, T["s02"] + 0.2, T["s02"] + 0.8), 1.4)
    eu = ease_back(prog(t, T["s03"] + 0.1, T["s03"] + 0.7), 1.4)
    xj, xu = 264, 816
    if sg == "s05":  # Mỹ ghé tai thì thầm
        lean = ease_io(prog(t, T["s05"], T["s05"] + 0.4))
        xu = lerp(816, 740, lean)
    yj = 1880 + (1 - ej) * 900 - bob + sad_dy - hop
    yu = 1880 + (1 - eu) * 900 + bob * 0.7
    s = ""
    if eu > -0.2 and t >= T["s03"]:
        s += f'<g transform="translate({xu:.1f},{yu:.1f}) scale({-S},{S})">{official("us", us_expr, aLu, aRu, t, hr_u)}</g>'
    if t >= T["s02"]:
        s += f'<g transform="translate({xj:.1f},{yj:.1f}) scale({S},{S})">{official("jp", jp_expr, aLj, aRj, t, hr_j)}</g>'
    # nhãn tên nhỏ dưới chân
    k = prog(t, T["s03"] + 0.6, T["s03"] + 1.0) * (1 - prog(t, T["s04"] + 0.6, T["s04"] + 1.0))
    if k > 0:
        s += (f'<g opacity="{k:.2f}">' + big(xj, 1890, "NHẬT", 50, "#ffffff", JP_COL, 10) + big(xu, 1890, "MỸ", 50, "#ffffff", US_COL, 10) + "</g>")
    return s

# ---------- dựng khung ----------
def dim_amount(t, T):
    d = 0.0
    for a, b, v in (("s05", "s08", 0.42), ("s10", "s11", 0.45), ("s11", "end", 0.45)):
        d = max(d, v * window(t, T[a] + 0.2, T[b] if b != "end" else 1e9, 0.3, 0.3))
    return d

def shake_tf(t, T):
    for t0, amp in ((T["s01"] + 0.9, 16), (T["s12"] + 0.45, 22), (T["s03"] + 0.6, 6)):
        if t0 <= t < t0 + 0.55:
            k = 1 - prog(t, t0, t0 + 0.55)
            return f'transform="translate({math.sin(t * 90) * amp * k:.1f},{math.cos(t * 77) * amp * 0.8 * k:.1f})"'
    return ""

def render(i):
    t = i / FPS
    T = G["T"]
    sh = shake_tf(t, T)
    bg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="{SEA}"/>'
          f'<g {sh}>{map_svg(t, T)}</g></svg>')
    base = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=bg.encode()))).convert("RGB"), dtype=np.float32)
    base = np.clip(base * G["tex"], 0, 255) * (1 - dim_amount(t, T))
    fg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}"><g {sh}>'
          + scene_goods(t, T) + scene_deficit(t, T) + scene_rates_money(t, T) + scene_bubble(t, T)
          + scene_title(t, T) + scene_plaza(t, T) + scene_seesaw(t, T) + scene_rate(t, T) + scene_price(t, T)
          + scene_scale(t, T) + scene_chart(t, T) + scene_end(t, T)
          + characters(t, T) + caption(t, G["caps"]) + "</g></svg>")
    f = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=fg.encode()))).convert("RGBA"), dtype=np.float32)
    a = f[..., 3:4] / 255
    return (base * (1 - a) + f[..., :3] * a).astype("uint8").tobytes()

def init(geo, geo1, vo):
    d = json.load(open(f"{vo}/T_vi.json"))
    G["T"] = d["T"]
    G["dur"] = d["T"]["end"] + 0.8
    G["caps"] = build_captions(d["chars"], d["T"], G["dur"])
    G["countries"] = load_map(geo)
    G["calif"] = load_california(geo1)
    G["tex"] = make_texture()

def main(geo, geo1, vo, out, only=None):
    init(geo, geo1, vo)
    if only:  # xem nhanh: lưu ảnh PNG tại các giây cho trước
        for x in only.split(","):
            fr = np.frombuffer(render(int(float(x) * FPS)), np.uint8).reshape(H, W, 3)
            Image.fromarray(fr).resize((W // 2, H // 2)).save(f"{out}_{x}.png")
        return
    n = int(G["dur"] * FPS)
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-i", f"{vo}/vo_vi.wav",
                           "-af", "apad", "-shortest", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18",
                           "-c:a", "aac", "-b:a", "192k", out], stdin=subprocess.PIPE)
    with Pool(4, initializer=init, initargs=(geo, geo1, vo)) as pool:
        for fr in pool.imap(render, range(n), chunksize=4):
            ff.stdin.write(fr)
    ff.stdin.close()
    ff.wait()

if __name__ == "__main__":
    main(*sys.argv[1:6])
