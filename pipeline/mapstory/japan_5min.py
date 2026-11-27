"""Tập "Lịch sử Nhật Bản trong 5 phút" (khung ngang 1920×1080): ghép địa cầu 3D, hiện vật 3D và bản đồ 2D + nhân vật 2D.

python3 pipeline/mapstory/japan_5min.py <geo_dir> <vo_dir> <globe_frames> <art_frames> <out.mp4> [giây,giây…]
geo_dir: ne_50m_admin_0_countries.geojson + jpn_pref.geojson (47 tỉnh Nhật, lọc từ ne_10m_admin_1_states_provinces)
globe_frames / art_frames: khung 3D chụp bằng pipeline/globe3d/capture.cjs (RANGES=…), kèm cams.json
"""
import io, json, math, os, subprocess, sys
from multiprocessing import Pool
import numpy as np
import cairosvg
from PIL import Image
from shapely.geometry import shape, box

sys.path.insert(0, os.path.dirname(__file__))
from demo import clamp, prog, ease_io, ease_out, ease_back, lerp, mix, outlined, make_texture, OUT, LAND, LAND_EDGE, SEA
from ftx import build_captions
from plaza_1985 import W, H, caption, lbl, big, window, YEL, BRN, JP_COL, US_COL, panel, arrow, car, tv
from plaza_globe_test import projector
import japan_kit as K

FPS = 30
COSF = math.cos(math.radians(36))
G = {}
CLANS = ["#c8323c", "#2f5d9e", "#2f7a4a", "#d9a93a", "#6b3fa0", "#b0582a", "#3c8a8a", "#8a2a5a", "#5a6b2a"]

def T(k):
    return G["T"][k]

def wt(sid, s, off=0.0):
    """mốc thời gian bắt đầu của cụm chữ s trong câu sid"""
    ch = G["chars"][sid]
    txt = "".join(c for c, _ in ch)
    i = txt.find(s)
    return (ch[i][1] if i >= 0 else T(sid)) + off

# ---------- dữ liệu bản đồ ----------
def to_path(geom, simp):
    g = geom.simplify(simp)
    polys = [g] if g.geom_type == "Polygon" else list(getattr(g, "geoms", []))
    return "".join("M" + " ".join(f"{x * COSF:.3f},{-y:.3f}" for x, y in p.exterior.coords) + "Z"
                   for p in polys if p.geom_type == "Polygon" and p.area > 0.002)

def load_geo(gdir, region=None):
    region = region or box(95, 5, 170, 60)
    cs = []
    for f in json.load(open(f"{gdir}/ne_50m_admin_0_countries.geojson"))["features"]:
        c = f["properties"]["ADM0_A3"]
        if c == "JPN":
            continue
        g = shape(f["geometry"])
        if g.intersects(region):
            d = to_path(g.intersection(region), 0.03)
            if d:
                cs.append((c, d))
    prefs = []
    for f in json.load(open(f"{gdir}/jpn_pref.geojson"))["features"]:
        g = shape(f["geometry"])
        d = to_path(g, 0.01)
        if d:
            prefs.append((f["properties"]["name"], g.centroid.x, g.centroid.y, d))
    prefs.sort(key=lambda p: p[1])  # tây → đông (thứ tự hợp nhất)
    vn = [d for c, d in cs if c == "VNM"]
    return cs, prefs, vn

# ---------- máy quay bản đồ ----------
def map_keys():
    K_ = {"j04": (129.3, 35.0, 62), "j05": (135.3, 34.8, 95), "j06": (132.0, 35.6, 50), "j07": (135.7, 34.85, 150),
          "j10": (132.6, 34.4, 75), "j11": (137.0, 35.6, 55), "j13": (128.2, 33.0, 46), "j14": (129.8, 33.6, 70),
          "j16": (137.5, 37.2, 44), "j17": (132.5, 32.0, 50), "j18": (137.5, 37.2, 44), "j19": (137.6, 35.6, 75),
          "j20": (134.5, 35.5, 40), "j21": (140.6, 35.1, 90), "j22": (139.9, 35.5, 110), "j23": (139.7, 35.6, 150),
          "j24": (131.0, 38.5, 26), "j26": (131.4, 33.6, 85), "j27": (137.4, 35.3, 62), "j30": (140.8, 38.4, 62),
          "j31": (137.5, 37.2, 44)}
    return sorted((T(k) - 0.3, v) for k, v in K_.items())

def map_cam(t):
    ks = G["mkeys"]
    cur, prev, t0 = ks[0][1], ks[0][1], ks[0][0]
    for i, (tk, v) in enumerate(ks):
        if t >= tk:
            cur, t0 = v, tk
            prev = ks[i - 1][1] if i > 0 else v
    k = ease_io(prog(t, t0, t0 + 1.3))
    lon, lat, s = (lerp(a, b, k) for a, b in zip(prev, cur))
    return lon, lat, s * (1 + 0.01 * (t - t0))

def map_px(t):
    lon, lat, s = map_cam(t)
    tx, ty = W / 2 - lon * COSF * s, H * 0.46 + lat * s
    return (lambda lo, la: (lo * COSF * s + tx, -la * s + ty)), s, tx, ty

def pref_fill(i, x, t):
    s0, u0 = T("j16"), T("j18") + 1.0
    if t < s0 - 0.2:
        return LAND
    clan = CLANS[(i * 5 + int((t - s0) * 1.6 + (i % 3) * .37)) % len(CLANS)]
    k0 = prog(t, s0 - 0.2, s0 + 0.6)
    col = mix(LAND, clan, k0)
    xs = [p[1] for p in G["prefs"]]
    order = (x - min(xs)) / (max(xs) - min(xs))
    m = prog(t, u0 + order * 5.0, u0 + order * 5.0 + 0.5)
    return mix(col, JP_COL, m) if m < 1 else JP_COL

def map_bg(t):
    P, s, tx, ty = map_px(t)
    sw = 2.0 / s
    p = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="{SEA}"/>',
         f'<g transform="matrix({s},0,0,{s},{tx},{ty})">', f'<g transform="translate({4 / s},{6 / s})" fill="#2e5d5c" opacity="0.45">']
    p += [f'<path d="{d}"/>' for _, d in G["cs"]] + [f'<path d="{d}"/>' for *_, d in G["prefs"]]
    p.append("</g>")
    for c, d in G["cs"]:
        p.append(f'<path d="{d}" fill="{LAND}" stroke="{LAND_EDGE}" stroke-width="{sw:.4f}" stroke-linejoin="round"/>')
    for i, (name, x, y, d) in enumerate(G["prefs"]):
        f = pref_fill(i, x, t)
        p.append(f'<path d="{d}" fill="{f}" stroke="{mix(f, "#3b1d0a", .45)}" stroke-width="{sw * .8:.4f}" stroke-linejoin="round"/>')
    p.append("</g></svg>")
    return "".join(p)

# ---------- dấu trên bản đồ ----------
def pin(P, lon, lat, label, t, t0, t1, side=1, col=YEL, size=46, dy=12):
    a = window(t, t0 + 0.2, t1)
    if a <= 0:
        return ""
    x, y = P(lon, lat)
    k = ease_back(prog(t, t0, t0 + 0.4))
    r = 13 + 5 * abs(math.sin((t - t0) * 4))
    s = (f'<g opacity="{a:.2f}"><circle cx="{x:.1f}" cy="{y:.1f}" r="{r * 2.2:.1f}" fill="{col}" opacity=".3"/>'
         f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{12 * k:.1f}" fill="{col}" stroke="{BRN}" stroke-width="5"/>')
    if label:
        s += outlined(f'x="{x + side * 26:.0f}" y="{y + dy:.0f}" text-anchor="{"start" if side > 0 else "end"}" font-family="DejaVu Serif" font-weight="bold" font-size="{size}"',
                      label, "#fff6d8", BRN, 9)
    return s + "</g>"

def curve_pts(P, a, b, bend, n=40):
    (x1, y1), (x2, y2) = P(*a), P(*b)
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    dx, dy = x2 - x1, y2 - y1
    cx, cy = mx - dy * bend, my + dx * bend
    return [((1 - u) ** 2 * x1 + 2 * (1 - u) * u * cx + u * u * x2, (1 - u) ** 2 * y1 + 2 * (1 - u) * u * cy + u * u * y2) for u in np.linspace(0, 1, n)]

def route(P, a, b, t, t0, dur, t1, col="#c8323c", bend=0.2, width=12):
    alpha = window(t, t0, t1)
    if alpha <= 0:
        return "", None
    pts = curve_pts(P, a, b, bend)
    k = ease_out(prog(t, t0, t0 + dur))
    n = max(2, int(len(pts) * k))
    q = pts[:n]
    d = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in q)
    s = f'<g opacity="{alpha:.2f}"><path d="{d}" fill="none" stroke="{OUT}" stroke-width="{width + 8}" stroke-linecap="round" stroke-dasharray="1 0"/>'
    s += f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{width}" stroke-linecap="round"/>'
    (xa, ya), (xb, yb) = q[-2], q[-1]
    ang = math.degrees(math.atan2(yb - ya, xb - xa))
    s += f'<g transform="translate({xb:.1f},{yb:.1f}) rotate({ang:.1f})"><path d="M 12 0 L -22 -20 L -22 20 Z" fill="{col}" stroke="{OUT}" stroke-width="5" stroke-linejoin="round"/></g></g>'
    return s, pts

def mover(pts, icon, t, t0, dur, scale=0.8, flip=False, a=1.0):
    if pts is None or t < t0:
        return ""
    u = ease_io(prog(t, t0, t0 + dur))
    j = min(len(pts) - 1, int(u * (len(pts) - 1)))
    x, y = pts[j]
    sx = -scale if flip else scale
    return f'<g opacity="{a:.2f}" transform="translate({x:.1f},{y - 30:.1f}) scale({sx:.3f},{scale:.3f})">{icon}</g>'

def card(t, t0, t1, x, y, w, h, body, fill="#fff6e0"):
    a = window(t, t0, t1, 0.2, 0.25)
    if a <= 0:
        return ""
    k = ease_back(prog(t, t0 - 0.2, t0 + 0.25))
    return (f'<g opacity="{a:.2f}" transform="translate({x},{y}) scale({k:.3f})">'
            f'<rect x="{-w / 2}" y="{-h / 2}" width="{w}" height="{h}" rx="24" fill="{fill}" stroke="{OUT}" stroke-width="8"/>{body}</g>')

def txt(x, y, s, size, col="#3b2a1a", weight=900, anchor="middle", font="Inter"):
    return f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="{font}" font-weight="{weight}" font-size="{size}" fill="{col}">{s}</text>'

def map_marks(t):
    P, s, *_ = map_px(t)
    o = []
    # Yayoi: lúa nước từ lục địa sang Kyushu
    r, pts = route(P, (127.0, 36.6), (130.6, 33.4), t, T("j04") + 0.8, 1.4, T("j05"), "#2f7a4a")
    o.append(r)
    for k in range(3):
        o.append(mover(pts, K.RICE, t, T("j04") + 1.0 + k * 0.7, 1.6, 0.9, a=window(t, T("j04") + 1.0, T("j05"))))
    o.append(pin(P, 130.4, 33.6, "Kyushu", t, T("j04") + 2.2, T("j05"), 1))
    # Kofun: lăng mộ lỗ khóa ở Sakai (Osaka)
    a = window(t, T("j05") + 0.3, T("j06"))
    if a > 0:
        x, y = P(135.49, 34.56)
        o.append(K.g(x, y - 70, 0.9 * ease_back(prog(t, T("j05") + 0.3, T("j05") + 0.8)), K.KEYHOLE, -20, a))
        o.append(f'<g opacity="{a:.2f}">' + outlined(f'x="{x + 80:.0f}" y="{y:.0f}" font-family="DejaVu Serif" font-weight="bold" font-size="44"', "Lăng mộ lỗ khóa", "#fff6d8", BRN, 9) + "</g>")
    # Phật giáo từ Triều Tiên
    r, pts = route(P, (127.0, 36.3), (135.8, 34.7), t, T("j06") + 0.4, 1.6, T("j07"), "#d9a93a", 0.25)
    o.append(r)
    o.append(mover(pts, K.LOTUS, t, T("j06") + 0.6, 1.8, 0.9, a=window(t, T("j06") + 0.6, T("j07"))))
    o.append(pin(P, 127.0, 36.3, "Bách Tế (Triều Tiên)", t, T("j06") + 0.2, T("j07"), 1, size=38))
    # Nara, Heian
    o.append(pin(P, 135.80, 34.68, "Nara", t, T("j07") + 0.4, T("j10"), -1, size=52))
    a = window(t, T("j07") + 0.9, T("j08"))
    if a > 0:
        x, y = P(135.80, 34.68)
        o.append(K.g(x + 100, y + 60, 0.9 * ease_back(prog(t, T("j07") + 0.9, T("j07") + 1.3)), K.GRID, 0, a))
    r, _ = route(P, (135.80, 34.68), (135.77, 35.01), t, T("j08") + 0.6, 0.8, T("j09"), "#c8323c", -0.6, 9)
    o.append(r)
    o.append(pin(P, 135.77, 35.01, "Heian (Kyoto)", t, T("j08") + 1.2, T("j11"), 1, size=52, dy=-14))
    # Genpei: Dan-no-ura 1185
    a = window(t, T("j10") + 1.8, T("j11"))
    if a > 0:
        x, y = P(130.95, 33.96)
        o.append(K.g(x, y, ease_back(prog(t, T("j10") + 1.8, T("j10") + 2.2)), K.SWORDS, 0, a))
        o.append(K.g(x - 70, y - 30, 0.9, K.flag("#f6f6f6"), 0, a))
        fall = prog(t, wt("j10", "đánh bại"), wt("j10", "đánh bại") + 0.8)
        o.append(K.g(x + 70, y - 30 + fall * 40, 0.9, K.flag("#c8323c"), fall * 70, a * (1 - fall * .7)))
        o.append(f'<g opacity="{a:.2f}">' + outlined(f'x="{x:.0f}" y="{y + 80:.0f}" text-anchor="middle" font-family="DejaVu Serif" font-weight="bold" font-size="42"', "Dan-no-ura 1185", "#fff6d8", BRN, 9) + "</g>")
    o.append(pin(P, 139.55, 35.32, "Kamakura", t, T("j11") + 0.4, T("j12"), 1, size=50))
    # Mông Nguyên 1274 & 1281
    t13 = T("j13")
    r1, p1 = route(P, (128.6, 35.1), (130.3, 33.7), t, t13 + 0.5, 1.2, T("j15"), "#5a5a5a", 0.15)
    r2, p2 = route(P, (121.8, 29.9), (130.1, 33.5), t, wt("j13", "1281", 0.0), 1.4, T("j15"), "#5a5a5a", -0.12)
    o += [r1, r2]
    storm_t = wt("j14", "cơn bão")
    for k, (pts_, t0) in enumerate(((p1, t13 + 0.7), (p2, wt("j13", "1281", 0.2)))):
        for m in range(3):
            sink = prog(t, storm_t + 0.6 + m * 0.2, storm_t + 1.6 + m * 0.2) if k == 1 else 0
            o.append(f'<g transform="translate(0,{sink * 40:.1f})">' + mover(pts_, K.JUNK, t, t0 + m * 0.25, 1.8, 0.7,
                                                                             a=window(t, t0, T("j15")) * (1 - sink)) + "</g>")
    for lab, lo, la, t0 in (("1274", 128.9, 34.8, t13 + 1.0), ("1281", 125.5, 31.6, wt("j13", "1281", 0.3))):
        a = window(t, t0, T("j15"))
        if a > 0:
            x, y = P(lo, la)
            o.append(f'<g opacity="{a:.2f}">' + big(x, y, lab, 54, YEL, BRN, 12, prog(t, t0, t0 + 0.3), -4) + "</g>")
    a = window(t, storm_t, T("j15") + 0.3)
    if a > 0:
        for k, (lo, la) in enumerate(((129.6, 33.9), (130.4, 34.3), (129.1, 33.3))):
            x, y = P(lo, la)
            o.append(K.g(x, y, (1.1 + .3 * k) * ease_out(prog(t, storm_t + k * .2, storm_t + .6 + k * .2)), K.storm(t * 220 + k * 40), 0, a * .9))
        o.append(f'<g opacity="{a:.2f}">' + big(960, 260, "KAMIKAZE = GIÓ THẦN", 84, "#ffffff", "#141414", 14, prog(t, wt("j14", "kamikaze") - .2, wt("j14", "kamikaze") + .2), -3) + "</g>")
    # Chiến quốc: kiếm chéo khắp nơi
    a = window(t, T("j16") + 0.6, T("j18"))
    if a > 0:
        for k, (lo, la) in enumerate(((135.8, 35.0), (138.2, 36.4), (133.0, 34.6), (140.4, 38.2), (131.0, 32.8), (136.9, 35.2), (139.6, 35.8))):
            x, y = P(lo, la)
            kk = prog(t, T("j16") + 0.6 + k * .35, T("j16") + 0.9 + k * .35)
            if kk > 0:
                o.append(K.g(x, y, ease_back(kk), K.SWORDS, math.sin(t * 6 + k) * 8, a))
    o.append(pin(P, 135.77, 35.01, "Kyoto – Onin 1467", t, T("j16") + 0.3, T("j17"), 1, size=40, dy=-16))
    # Súng hỏa mai 1543 tới Tanegashima
    r, pts = route(P, (127.2, 27.5), (130.95, 30.55), t, T("j17") + 0.4, 1.4, T("j18"), "#7a4a2a", 0.2)
    o.append(r)
    o.append(mover(pts, K.NANBAN, t, T("j17") + 0.4, 1.6, 0.8, a=window(t, T("j17") + 0.4, T("j18"))))
    o.append(pin(P, 130.98, 30.60, "Tanegashima 1543", t, T("j17") + 1.6, T("j18"), 1, size=42))
    # Sekigahara, Edo
    a = window(t, T("j19") + 0.2, T("j20"))
    if a > 0:
        x, y = P(136.47, 35.37)
        o.append(K.g(x, y, ease_back(prog(t, T("j19") + 0.2, T("j19") + 0.6)), K.SWORDS, 0, a))
        o.append(f'<g opacity="{a:.2f}">' + outlined(f'x="{x - 46:.0f}" y="{y + 14:.0f}" text-anchor="end" font-family="DejaVu Serif" font-weight="bold" font-size="46"', "Sekigahara 1600", "#fff6d8", BRN, 9) + "</g>")
    o.append(pin(P, 139.75, 35.68, "Edo 1603", t, wt("j19", "1603"), T("j20"), 1, size=50))
    # Tỏa quốc: vòng rào quanh Nhật, cửa Dejima
    a = window(t, T("j20") + 0.3, T("j21"))
    if a > 0:
        cx, cy = P(136.0, 36.0)
        _, sc, *_ = map_px(t)
        R = 12.5 * sc
        k = ease_io(prog(t, T("j20") + 0.3, T("j20") + 2.0))
        circ = 2 * math.pi * R
        o.append(f'<g opacity="{a:.2f}"><circle cx="{cx:.1f}" cy="{cy:.1f}" r="{R:.1f}" fill="none" stroke="#3b1d0a" stroke-width="16" '
                 f'stroke-dasharray="{circ * k:.1f} {circ:.1f}" transform="rotate(-90 {cx:.1f} {cy:.1f})"/>'
                 f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{R:.1f}" fill="none" stroke="{YEL}" stroke-width="7" stroke-dasharray="24 16" opacity="{k:.2f}"/></g>')
        x, y = P(129.87, 32.74)
        o.append(K.g(x - 90, y + 40, 0.7, K.DUTCH, 0, a * prog(t, wt("j20", "Hà Lan"), wt("j20", "Hà Lan") + .3)))
        o.append(K.g(x - 50, y + 90, 0.6, K.JUNK, 0, a * prog(t, wt("j20", "người Hoa"), wt("j20", "người Hoa") + .3)))
    o.append(pin(P, 129.87, 32.74, "Nagasaki (Dejima)", t, wt("j20", "Nagasaki", -0.3), T("j21"), 1, size=42))
    # Tàu đen của Perry 1853
    a = window(t, T("j21") + 0.3, T("j22") + 0.3)
    if a > 0:
        for k in range(4):
            u = ease_out(prog(t, T("j21") + 0.4 + k * .3, T("j21") + 4.0 + k * .3))
            lo, la = lerp(146.5, 139.95 + k * .18, u), lerp(33.2 + k * .25, 35.05 + k * .08, u)
            x, y = P(lo, la)
            o.append(K.g(x, y, 0.75, K.BLACKSHIP + K.smoke(t), 0, a))
    o.append(pin(P, 139.72, 35.30, "Vịnh Edo 1853", t, T("j21") + 2.5, T("j22"), -1, size=44))
    # Minh Trị: Edo → Tokyo, đường sắt, nhà máy
    a = window(t, T("j22") + 0.2, T("j24"))
    if a > 0:
        x, y = P(139.77, 35.68)
        k = prog(t, wt("j22", "Edo đổi"), wt("j22", "Edo đổi") + 1.2)
        o.append(f'<g opacity="{a:.2f}"><circle cx="{x:.1f}" cy="{y:.1f}" r="16" fill="{YEL}" stroke="{BRN}" stroke-width="5"/>'
                 + f'<g opacity="{1 - k:.2f}">' + outlined(f'x="{x + 30:.0f}" y="{y - 20:.0f}" font-family="DejaVu Serif" font-weight="bold" font-size="56"', "Edo", "#fff6d8", BRN, 10) + "</g>"
                 + big(x + 150, y - 40, "TOKYO", 80, YEL, BRN, 14, k, -4) + "</g>")
    a = window(t, T("j23"), T("j24"))
    if a > 0:
        (x1, y1), (x2, y2) = P(139.77, 35.68), P(139.63, 35.45)
        o.append(f'<g opacity="{a:.2f}"><path d="M {x1:.0f} {y1:.0f} L {x2:.0f} {y2:.0f}" stroke="#3b1d0a" stroke-width="14"/>'
                 f'<path d="M {x1:.0f} {y1:.0f} L {x2:.0f} {y2:.0f}" stroke="#e8d9a8" stroke-width="6" stroke-dasharray="10 10"/></g>')
        u = ease_io(prog(t, T("j23") + 0.2, T("j23") + 3.0))
        o.append(K.g(lerp(x1, x2, u), lerp(y1, y2, u) - 40, 0.8, K.TRAIN + K.smoke(t, -56), 0, a))
        for k, (lo, la) in enumerate(((139.45, 35.85), (140.0, 35.55))):
            x, y = P(lo, la)
            o.append(K.g(x, y, 0.8 * ease_back(prog(t, wt("j23", "nhà máy") + k * .3, wt("j23", "nhà máy") + .4 + k * .3)), K.FACTORY + K.smoke(t, 39), 0, a))
    # Thắng Thanh 1895, thắng Nga 1905
    r, _ = route(P, (130.5, 33.8), (122.3, 39.2), t, T("j24") + 0.3, 1.2, T("j25"), "#c8323c", 0.2)
    o.append(r)
    o.append(pin(P, 122.3, 39.2, "1895: thắng nhà Thanh", t, T("j24") + 1.0, T("j25"), -1, size=40))
    r, _ = route(P, (130.5, 33.8), (129.4, 34.6), t, wt("j24", "1905", -0.6), 0.6, T("j25"), "#c8323c", 0.5, 9)
    o.append(r)
    o.append(pin(P, 129.4, 34.6, "1905: Tsushima, thắng Nga", t, wt("j24", "1905", -0.2), T("j25"), 1, size=40, dy=-18))
    # 1945: Hiroshima, Nagasaki (trang nghiêm, không vẽ vụ nổ)
    for lab, lo, la, t0 in (("Hiroshima 6/8/1945", 132.46, 34.39, wt("j26", "Hiroshima", -0.2)), ("Nagasaki 9/8/1945", 129.87, 32.75, wt("j26", "Nagasaki", -0.2))):
        a = window(t, t0, T("j27"))
        if a > 0:
            x, y = P(lo, la)
            rr = (t - t0) * 60 % 120
            o.append(f'<g opacity="{a:.2f}"><circle cx="{x:.1f}" cy="{y:.1f}" r="{20 + rr:.1f}" fill="none" stroke="#ffffff" stroke-width="5" opacity="{1 - rr / 120:.2f}"/>'
                     f'<circle cx="{x:.1f}" cy="{y:.1f}" r="14" fill="#ffffff" stroke="#3b3b3b" stroke-width="5"/>'
                     + outlined(f'x="{x + 30:.0f}" y="{y - 22:.0f}" font-family="DejaVu Serif" font-weight="bold" font-size="40"', lab, "#ffffff", "#2a2a2a", 9) + "</g>")
    # Shinkansen 1964
    a = window(t, T("j27") + 0.2, T("j28"))
    if a > 0:
        (x1, y1), (x2, y2) = P(139.77, 35.68), P(135.50, 34.70)
        o.append(f'<g opacity="{a:.2f}"><path d="M {x1:.0f} {y1:.0f} L {x2:.0f} {y2:.0f}" stroke="#2f5d9e" stroke-width="10" stroke-linecap="round"/></g>')
        o.append(pin(P, 139.77, 35.68, "Tokyo", t, T("j27") + 0.2, T("j28"), 1, size=44))
        o.append(pin(P, 135.50, 34.70, "Osaka", t, T("j27") + 0.2, T("j28"), -1, size=44))
        u = ease_io(prog(t, wt("j27", "tàu cao tốc", -0.3), wt("j27", "tàu cao tốc", 2.0)))
        ang = math.degrees(math.atan2(y2 - y1, x2 - x1)) + 180
        o.append(K.g(lerp(x1, x2, u), lerp(y1, y2, u) - 20, 0.75, K.SHINKANSEN, ang, a * (1 if u > 0 else 0)))
    # 2011: động đất sóng thần
    a = window(t, T("j30") + 0.1, T("j31"))
    if a > 0:
        x, y = P(142.37, 38.32)
        for k in range(4):
            rr = ((t - T("j30")) * 160 + k * 70) % 280
            o.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{rr:.1f}" fill="none" stroke="#ffffff" stroke-width="6" opacity="{a * (1 - rr / 280):.2f}"/>')
        o.append(f'<g opacity="{a:.2f}"><circle cx="{x:.1f}" cy="{y:.1f}" r="16" fill="#c8323c" stroke="{OUT}" stroke-width="5"/>'
                 + outlined(f'x="{x + 30:.0f}" y="{y + 70:.0f}" font-family="DejaVu Serif" font-weight="bold" font-size="44"', "11/3/2011", "#fff6d8", BRN, 9) + "</g>")
    # Ngày nay: biểu tượng xung quanh Nhật Bản
    a = window(t, T("j31") + 0.3, T("j32"))
    if a > 0:
        icons = [(car(0, 0, 1.0, "#d94141"), 142.5, 35.0, "ô tô"), (tv(0, 0, 1.1), 133.0, 38.5, "điện tử"), (K.CONTROLLER, 143.5, 40.5, ""),
                 (K.ROBOT, 131.0, 35.8, ""), (K.MANGA, 136.5, 41.5, "anime")]
        for k, (ic, lo, la, lab) in enumerate(icons):
            x, y = P(lo, la)
            kk = prog(t, T("j31") + 2.0 + k * .35, T("j31") + 2.4 + k * .35)
            if kk > 0:
                o.append(K.g(x, y + math.sin(t * 3 + k) * 8, 0.9 * ease_back(kk), ic, 0, a))
    return "".join(o)

# ---------- thẻ thông tin (màn hình) ----------
def cards(t):
    o = []
    a5 = wt("j05", "Theo truyền thuyết")
    o.append(card(t, a5, T("j06") - 0.2, 1380, 200, 560, 150,
                  txt(0, -10, "660 TCN", 70, "#8a2a22") + txt(0, 44, "Thiên hoàng đầu tiên (theo truyền thuyết)", 28, "#5a4630", 700)))
    o.append(card(t, wt("j07", "phỏng theo"), T("j08") - 0.2, 1380, 200, 560, 130,
                  txt(0, -8, "Phỏng theo Trường An", 46) + txt(0, 40, "kinh đô nhà Đường", 30, "#5a4630", 700)))
    o.append(card(t, wt("j09", "Truyện Genji", -0.2), T("j10") - 0.2, 960, 330, 720, 300,
                  K.g(0, -30, 0.9, K.SCROLL) + txt(0, 100, "Truyện Genji (~1010)", 44) + txt(0, 136, "Murasaki Shikibu", 28, "#5a4630", 700)))
    t11 = wt("j11", "Từ đây")
    o.append(card(t, t11, T("j12") - 0.2, 1380, 230, 600, 260,
                  f'<rect x="-250" y="-90" width="300" height="80" rx="14" fill="#9e2a2b"/>' + txt(-100, -36, "TƯỚNG QUÂN", 40, "#ffffff")
                  + txt(150, -36, "quyền lực", 32, "#9e2a2b", 800)
                  + f'<rect x="-250" y="20" width="200" height="56" rx="12" fill="#c9b48a"/>' + txt(-150, 58, "Thiên hoàng", 30, "#3b2a1a", 800)
                  + txt(120, 58, "biểu tượng", 30, "#5a4630", 700)))
    # Đại Việt cũng đánh bại Mông Nguyên
    a = window(t, T("j15"), T("j16") - 0.2)
    if a > 0:
        vn = "".join(f'<path d="{d}"/>' for d in G["vn"])
        body = (f'<g transform="translate(-200,-10) scale(16) translate({-106 * COSF:.2f},16)" fill="#c8323c" stroke="#6e1018" stroke-width=".12">{vn}</g>'
                + txt(80, -40, "ĐẠI VIỆT", 64, "#8a2a22") + txt(80, 14, "1258 • 1285 • 1287–1288", 36, "#3b2a1a", 800)
                + txt(80, 62, "3 lần đánh bại Mông Nguyên", 32, "#5a4630", 700))
        o.append(card(t, T("j15"), T("j16") - 0.2, 960, 380, 760, 340, body))
    # Ba người thống nhất
    t18 = T("j18")
    for k, (kind, name, w) in enumerate((("samurai", "Oda Nobunaga", "Oda"), ("samurai2", "Toyotomi Hideyoshi", "Toyotomi"), ("shogun", "Tokugawa Ieyasu", "Tokugawa"))):
        tk = wt("j18", w, -0.2)
        a = window(t, tk, T("j19") - 0.1)
        if a > 0:
            o.append(f'<g opacity="{a:.2f}">' + K.head_medallion(kind, 560 + k * 400, 300, 1.0, t, name, prog(t, tk, tk + 0.4)) + "</g>")
    # Thế vận hội 1964
    o.append(card(t, wt("j27", "Thế vận hội", -0.3), T("j28") - 0.1, 1500, 220, 420, 300,
                  K.g(-120, 10, 1.0, K.TORCH) + txt(50, -10, "TOKYO", 56, "#8a2a22") + txt(50, 46, "1964", 56)))
    # Kinh tế lớn thứ hai thế giới 1968
    a = window(t, T("j28"), T("j29") - 0.1)
    if a > 0:
        k = ease_out(prog(t, T("j28") + 0.3, T("j28") + 1.8))
        body = (txt(0, -110, "Kinh tế lớn nhất thế giới, 1968", 40)
                + f'<rect x="-280" y="-70" width="{520:.0f}" height="58" rx="10" fill="{US_COL}"/>' + txt(-300, -28, "1. Mỹ", 34, "#3b2a1a", 900, "end")
                + f'<rect x="-280" y="10" width="{520 * 0.33 * k:.0f}" height="58" rx="10" fill="{JP_COL}"/>' + txt(-300, 52, "2. Nhật", 34, "#3b2a1a", 900, "end")
                + txt(0, 120, "(độ dài thanh chỉ minh họa)", 22, "#8a7a60", 600))
        o.append(card(t, T("j28"), T("j29") - 0.1, 1060, 380, 860, 300, body))
    # Bong bóng vỡ
    a = window(t, T("j29"), T("j30") - 0.1)
    if a > 0:
        data = [(1985, 13), (1986, 18.7), (1987, 21.6), (1988, 30.2), (1989.99, 38.9), (1990.9, 23.8), (1992.6, 14.3), (1995, 19.9), (1998, 13.8), (2003.3, 7.6)]
        x0, y0, w, h = -340, -110, 680, 220
        crash = wt("j29", "vỡ tung")
        end = lerp(1985, 1990, ease_io(prog(t, T("j29") + 0.2, crash))) if t < crash else lerp(1990, 2003.3, ease_io(prog(t, crash, crash + 2.2)))
        pts = [(yy, v) for yy, v in data if yy <= end]
        X = lambda yy: x0 + (yy - 1985) / 18.3 * w
        Y = lambda v: y0 + h - v / 42 * h
        line = " ".join(f"{X(a_):.1f},{Y(v):.1f}" for a_, v in pts)
        col = "#d62828" if t > crash else "#2fa84f"
        body = (txt(x0, y0 - 20, "Chỉ số Nikkei 1985–2003", 34, "#5a4630", 900, "start")
                + f'<line x1="{x0}" y1="{y0 + h}" x2="{x0 + w}" y2="{y0 + h}" stroke="{OUT}" stroke-width="4"/>'
                + (f'<polyline points="{line}" fill="none" stroke="{col}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>' if len(pts) > 1 else "")
                + "".join(txt(X(yy), y0 + h + 34, str(yy), 26, "#5a4630", 800) for yy in (1985, 1990, 1995, 2000)))
        if t > crash:
            body += big(X(1990) + 120, Y(38.9) + 20, "BÙM!", 80, "#ffffff", "#d62828", 14, prog(t, crash, crash + 0.25), -8)
        o.append(card(t, T("j29"), T("j30") - 0.1, 1060, 380, 860, 380, body))
    return "".join(o)

def dim_amount(t):
    d = 0.0
    for a, b, v in ((T("j09"), T("j10"), .35), (T("j15"), T("j16"), .4), (T("j18"), T("j19"), .3), (T("j26"), T("j27"), .45),
                    (T("j28"), T("j30"), .4)):
        d = max(d, v * window(t, a, b, 0.3, 0.3))
    return d

# ---------- nhãn thời kỳ (góc trên trái) ----------
ERAS = [("j03", "THỜI JOMON", "~14.000 – 300 TCN"), ("j04", "THỜI YAYOI", "~300 TCN – 300"), ("j05", "THỜI KOFUN", "thế kỷ 3 – 6"),
        ("j06", "THỜI ASUKA", "538 – 710"), ("j07", "THỜI NARA", "710 – 794"), ("j08", "THỜI HEIAN", "794 – 1185"),
        ("j10", "THỜI KAMAKURA", "1185 – 1333"), ("j16", "THỜI CHIẾN QUỐC", "1467 – ~1600"), ("j19", "THỜI EDO", "1603 – 1868"),
        ("j22", "THỜI MINH TRỊ", "1868 – 1912"), ("j25", "THẾ CHIẾN II", "1939 – 1945"), ("j27", "NHẬT BẢN HIỆN ĐẠI", "1945 – nay")]

def era_badge(t):
    if t < T("j03") - 0.1 or t > T("j32") - 0.2:
        return ""
    cur = None
    for sid, a, b in ERAS:
        if t >= T(sid) - 0.15:
            cur = (sid, a, b)
    sid, a, b = cur
    k = ease_back(prog(t, T(sid) - 0.15, T(sid) + 0.25))
    out = 1 - prog(t, T("j32") - 0.6, T("j32") - 0.2)
    w = 30 + 30 * max(len(a) * 0.62, len(b) * 0.5)
    return (f'<g opacity="{out:.2f}" transform="translate(40,40) scale({k:.3f})">'
            f'<rect x="0" y="0" width="{w:.0f}" height="124" rx="18" fill="#8a2a22" stroke="#141414" stroke-width="6"/>'
            + outlined('x="24" y="58" font-family="Inter" font-weight="900" font-size="46"', a, YEL, "#3b1d0a", 6)
            + outlined('x="24" y="102" font-family="Inter" font-weight="700" font-size="32"', b, "#ffffff", "#3b1d0a", 5) + "</g>")

# ---------- nhân vật ----------
def cast():
    J = lambda k, o=0.0: T(k) + o
    return [  # kind, x, vào, ra, [(t, biểu cảm, động tác)], nhãn tên
        ("farmer", 230, J("j04", .3), J("j08", -.2), [(J("j04"), "smile", "wave"), (J("j05"), "smile", "idle"), (J("j06"), "smile", "point"), (J("j07"), "laugh", "cheer")], "Người Yayoi"),
        ("court", 1690, J("j08", .3), J("j10", -.1), [(J("j08"), "smile", "wave"), (J("j09"), "talk", "talk")], "Quý tộc Heian"),
        ("samurai", 230, J("j10", .2), J("j12", -.3), [(J("j10"), "laugh", "cheer"), (J("j11"), "smile", "idle")], "Samurai"),
        ("samurai", 230, J("j13", .2), J("j18", -.1), [(J("j13"), "shock", "shock"), (wt("j14", "cơn bão"), "laugh", "cheer"), (J("j15"), "smile", "idle"),
                                                       (J("j16"), "shock", "fight"), (J("j17"), "shock", "shock"), (J("j17", 2.0), "smile", "idle")], ""),
        ("mongol", 1690, J("j13", .3), J("j16", -.1), [(J("j13"), "talk", "point"), (wt("j14", "cơn bão"), "shock", "shock"), (J("j15"), "sad", "sad")], "Quân Mông Nguyên"),
        ("samurai2", 1690, J("j16", .3), J("j18", -.1), [(J("j16"), "shock", "fight")], ""),
        ("shogun", 230, J("j18", .1), J("j22", -.1), [(J("j18"), "smile", "idle"), (J("j19"), "laugh", "cheer"), (J("j20"), "smug", "idle"), (J("j21"), "shock", "shock")], "Tướng quân Tokugawa"),
        ("perry", 1690, J("j21", .3), J("j22", .6), [(J("j21"), "smug", "point")], "Đô đốc Perry"),
        ("meiji", 230, J("j22", .2), J("j25", -.2), [(J("j22"), "laugh", "cheer"), (J("j23"), "smile", "point"), (J("j24"), "laugh", "cheer")], "Thời Minh Trị"),
        ("modern", 230, J("j27", .2), J("j32", -.2), [(J("j27"), "laugh", "cheer"), (J("j28"), "smile", "idle"), (J("j29"), "shock", "shock"),
                                                     (J("j29", 3.0), "sad", "sad"), (J("j30"), "shock", "shock"), (J("j31"), "laugh", "wave")], ""),
    ]

def pose(action, t):
    aL, aR, hop, dy, hr = 8.0, -8.0, 0.0, 0.0, math.sin(t * 2.2) * 3
    if action == "wave":
        aR = -150 + math.sin(t * 8) * 14
    elif action == "cheer":
        aL, aR, hop = 150 + math.sin(t * 9) * 10, -150 - math.sin(t * 9) * 10, abs(math.sin(t * 9)) * 26
    elif action == "shock":
        aL, aR, hr = 150 + math.sin(t * 40) * 6, -150 + math.sin(t * 40) * 6, math.sin(t * 40) * 5
    elif action == "point":
        aR = -95 + math.sin(t * 3) * 6
    elif action == "fight":
        aR, aL, hop = -120 + math.sin(t * 7) * 40, 30, abs(math.sin(t * 7)) * 12
    elif action == "talk":
        aR = -40 + math.sin(t * 4) * 12
    elif action == "sad":
        dy = 14
    return aL, aR, hop, dy, hr

def characters(t):
    o = []
    S = 1.1
    for kind, x, a, b, acts, name in G["cast"]:
        if t < a - 0.05 or t > b + 0.6:
            continue
        expr, act = acts[0][1], acts[0][2]
        for ta, e, ac in acts:
            if t >= ta:
                expr, act = e, ac
        aL, aR, hop, dy, hr = pose(act, t)
        ent = ease_back(prog(t, a, a + 0.55), 1.4)
        ex = prog(t, b, b + 0.5) ** 2
        y = 1066 + (1 - ent) * 600 + ex * 700 + dy - hop + math.sin(t * 5 + x) * 3
        sx = -S if x > W / 2 else S
        o.append(f'<g transform="translate({x},{y:.1f}) scale({sx},{S})">{K.figure(kind, expr, aL, aR, t, hr)}</g>')
        if name:
            k = prog(t, a + 0.3, a + 0.6) * (1 - prog(t, a + 3.0, a + 3.4))
            if k > 0:
                o.append(f'<g opacity="{k:.2f}">' + big(x, y - 470 * S, name, 40, "#ffffff", "#8a2a22", 9) + "</g>")
    return "".join(o)

def lineup(t):
    t0 = T("j32") - 0.1
    if t < t0:
        return ""
    o = []
    kinds = ["farmer", "court", "samurai", "shogun", "perry", "meiji", "modern"]
    for k, kind in enumerate(kinds):
        x = 260 + k * 233
        ent = ease_back(prog(t, t0 + k * .12, t0 + .5 + k * .12), 1.4)
        act = "wave" if t > T("j33") else "idle"
        aL, aR, hop, dy, hr = pose(act, t + k)
        y = 1080 + (1 - ent) * 500 + math.sin(t * 5 + k) * 4
        o.append(f'<g transform="translate({x},{y:.1f}) scale(0.82)">{K.figure(kind, "smile", aL, aR, t + k, hr)}</g>')
    return "".join(o)

# ---------- lớp phủ trên địa cầu ----------
def globe_overlay(t, i):
    c = G["gcams"].get(i)
    if c is None:
        return ""
    P, vis = projector(c["pv"], c["cam"])
    o = []
    k = prog(t, 0.6, 1.0) * (1 - prog(t, T("j02") - 0.3, T("j02") + 0.1))
    if k > 0:
        o.append(f'<g opacity="{k:.2f}">' + big(560, 420, "LỊCH SỬ", 120, YEL, BRN, 18, prog(t, 0.6, 1.0), -4) + big(560, 560, "NHẬT BẢN", 140, YEL, BRN, 20, prog(t, 0.6, 1.0), -4)
                 + f'<g transform="translate(560,670) rotate(-4) scale({ease_back(prog(t, 1.2, 1.5)):.3f})"><rect x="-180" y="-48" width="360" height="86" rx="43" fill="{JP_COL}" stroke="{OUT}" stroke-width="7"/>'
                 + outlined('y="16" text-anchor="middle" font-family="Inter" font-weight="900" font-size="50"', "trong 5 phút", "#ffffff", OUT, 6) + "</g></g>")
    if T("j02") <= t < T("j03"):
        x, y = P(146, 33)
        o.append(lbl(x + 40, y, "NHẬT BẢN", 64, -6, prog(t, T("j02"), T("j02") + 0.5)))
        for name, lo, la, dx in (("Hokkaido", 142.8, 43.4, 30), ("Honshu", 139.5, 37.6, 40), ("Shikoku", 133.5, 33.6, -20), ("Kyushu", 130.8, 32.4, -30)):
            kk = prog(t, wt("j02", "bốn đảo lớn", -0.3) + 0.15 * len(o), wt("j02", "bốn đảo lớn", 0.1) + 0.15 * len(o))
            if kk > 0 and vis(lo, la):
                x, y = P(lo, la)
                o.append(f'<g opacity="{kk:.2f}"><circle cx="{x:.1f}" cy="{y:.1f}" r="9" fill="{YEL}" stroke="{BRN}" stroke-width="4"/>'
                         + outlined(f'x="{x + dx:.0f}" y="{y + 50:.0f}" text-anchor="middle" font-family="DejaVu Serif" font-weight="bold" font-size="36"', name, "#fff6d8", BRN, 8) + "</g>")
        kc = prog(t, wt("j02", "mười bốn", -0.3), wt("j02", "mười bốn", 1.2))
        if kc > 0:
            n = int(14125 * ease_out(kc))
            o.append(card(t, wt("j02", "mười bốn", -0.3), T("j03") + 0.2, 470, 300, 560, 170,
                          txt(0, 0, f"{n:,}".replace(",", "."), 84, "#8a2a22") + txt(0, 50, "hòn đảo (khảo sát 2023)", 30, "#5a4630", 700)))
    if T("j25") - 0.3 <= t < T("j26"):
        for (lo, la), lab, t0 in (((106.0, 16.0), "Đông Dương 1940", wt("j25", "Đông Dương", -0.4)), ((-157.95, 21.35), "Trân Châu Cảng 1941", wt("j25", "Trân Châu", -0.4))):
            if t < t0:
                continue
            a0 = np.array([math.radians(135.0), math.radians(35.0)])
            v = lambda lo_, la_: np.array([math.cos(math.radians(la_)) * math.cos(math.radians(lo_)), math.sin(math.radians(la_)), -math.cos(math.radians(la_)) * math.sin(math.radians(lo_))])
            p0, p1 = v(135.0, 35.0), v(lo, la)
            om = math.acos(np.clip(np.dot(p0, p1), -1, 1))
            u_end = ease_out(prog(t, t0, t0 + 1.4))
            pts = []
            for u in np.linspace(0, u_end, 40):
                q = (math.sin((1 - u) * om) * p0 + math.sin(u * om) * p1) / math.sin(om)
                la_ = math.degrees(math.asin(q[1]))
                lo_ = math.degrees(math.atan2(-q[2], q[0]))
                pts.append(P(lo_, la_, 1.0 + 0.06 * math.sin(math.pi * u)))
            if len(pts) > 1:
                d = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts)
                o.append(f'<path d="{d}" fill="none" stroke="{OUT}" stroke-width="18" stroke-linecap="round"/><path d="{d}" fill="none" stroke="#c8323c" stroke-width="10" stroke-linecap="round"/>')
                (xa, ya), (xb, yb) = pts[-2], pts[-1]
                ang = math.degrees(math.atan2(yb - ya, xb - xa))
                o.append(f'<g transform="translate({xb:.1f},{yb:.1f}) rotate({ang:.1f})"><path d="M 12 0 L -22 -20 L -22 20 Z" fill="#c8323c" stroke="{OUT}" stroke-width="5"/></g>')
            if u_end > 0.95:
                x, y = P(lo, la)
                o.append(big(x, y + 70, lab, 46, YEL, BRN, 10, prog(t, t0 + 1.3, t0 + 1.6), -3))
        x, y = P(138, 36)
        o.append(lbl(x, y - 50, "NHẬT BẢN", 50, -5, prog(t, T("j25"), T("j25") + .4)))
    if t >= T("j32") - 0.2:
        k = prog(t, T("j32"), T("j32") + 0.5)
        o.append(big(960, 220, "LỊCH SỬ NHẬT BẢN", 110, YEL, BRN, 18, k, -3))
        k2 = prog(t, T("j33") + 0.2, T("j33") + 0.6)
        if k2 > 0:
            o.append(f'<g transform="translate(960,350) scale({ease_back(k2):.3f})"><rect x="-330" y="-46" width="660" height="84" rx="42" fill="{JP_COL}" stroke="{OUT}" stroke-width="7"/>'
                     + outlined('y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44"', "Bạn thích thời kỳ nào nhất?", "#ffffff", OUT, 6) + "</g>")
    return "".join(o)

def art_overlay(t):
    o = []
    for t0, t1, name, sub in ((T("j03"), T("j04"), "Bình gốm Jomon kiểu \"ngọn lửa\"", "mô phỏng bằng đồ họa máy tính"),
                              (T("j12"), T("j13"), "Kiếm katana", "mô phỏng bằng đồ họa máy tính")):
        a = window(t, t0 + 0.6, t1 - 0.3)
        if a > 0:
            o.append(f'<g opacity="{a:.2f}">' + outlined(f'x="{W - 70}" y="{H - 210}" text-anchor="end" font-family="DejaVu Serif" font-weight="bold" font-size="46"', name, "#fff6d8", BRN, 9)
                     + outlined(f'x="{W - 70}" y="{H - 166}" text-anchor="end" font-family="Inter" font-weight="600" font-size="28"', "(" + sub + ")", "#e8dcc0", BRN, 6) + "</g>")
    k = prog(t, wt("j03", "cổ nhất"), wt("j03", "cổ nhất") + 0.4)
    if T("j03") <= t < T("j04") and k > 0:
        o.append(card(t, wt("j03", "cổ nhất"), T("j04") - 0.2, 440, 300, 600, 150,
                      txt(0, -6, "~16.500 năm trước", 54, "#8a2a22") + txt(0, 44, "mảnh gốm cổ nhất Nhật Bản (Aomori)", 28, "#5a4630", 700)))
    return "".join(o)

# ---------- ghép ----------
def scenes():
    b = [T("j03") - 0.15, T("j04") - 0.15, T("j12") - 0.15, T("j13") - 0.15, T("j25") - 0.15, T("j26") - 0.15, T("j32") - 0.15]
    kinds = ["globe", "art", "map", "art", "map", "globe", "map", "globe"]
    edges = [0.0] + b + [G["dur"] + 1]
    return list(zip(kinds, edges[:-1], edges[1:]))

def load_frame(d, i, have):
    j = min(have, key=lambda x: abs(x - i)) if i not in have else i
    return np.asarray(Image.open(f"{d}/f{j:05d}.jpg").convert("RGB"), dtype=np.float32)

def background(kind, t, i):
    if kind == "globe":
        return np.clip(load_frame(G["gdir"], i, G["ghave"]) * G["tex6"], 0, 255)
    if kind == "art":
        return np.clip(load_frame(G["adir"], i, G["ahave"]) * G["tex5"], 0, 255)
    img = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=map_bg(t).encode()))).convert("RGB"), dtype=np.float32)
    return np.clip(img * G["tex"], 0, 255) * (1 - dim_amount(t))

def shake(t):
    for t0, amp, dur in ((wt("j14", "cơn bão"), 14, 0.7), (T("j16") + 0.6, 8, 0.5), (wt("j29", "vỡ tung"), 16, 0.6), (T("j30") + 0.2, 20, 1.4)):
        if t0 <= t < t0 + dur:
            k = 1 - (t - t0) / dur
            return math.sin(t * 90) * amp * k, math.cos(t * 77) * amp * .8 * k
    return 0.0, 0.0

def render(i):
    t = i / FPS
    sc = G["scenes"]
    cur = next(s for s in sc if s[1] <= t < s[2])
    base = background(cur[0], t, i)
    fade = 0.3
    idx = sc.index(cur)
    if idx > 0 and t < cur[1] + fade:
        prev = background(sc[idx - 1][0], t, i)
        k = (t - cur[1]) / fade
        base = prev * (1 - k) + base * k
    sx, sy = shake(t)
    if sx or sy:
        base = np.roll(base, (int(sy), int(sx)), axis=(0, 1))
    layer = ""
    if cur[0] == "map" or (idx > 0 and sc[idx - 1][0] == "map" and t < cur[1] + fade):
        layer += f'<g transform="translate({sx:.1f},{sy:.1f})">{map_marks(t)}</g>'
    if cur[0] == "globe":
        layer += globe_overlay(t, i)
    if cur[0] == "art":
        layer += art_overlay(t)
    fg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}">{layer}{cards(t)}{characters(t)}{lineup(t)}'
          f'{era_badge(t)}{caption(t, G["caps"])}</svg>')
    f = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=fg.encode()))).convert("RGBA"), dtype=np.float32)
    a = f[..., 3:4] / 255
    return (base * (1 - a) + f[..., :3] * a).astype("uint8").tobytes()

def init(gdir, vo, gfr, afr):
    d = json.load(open(f"{vo}/T_vi.json"))
    G["T"], G["chars"] = d["T"], d["chars"]
    G["dur"] = d["T"]["end"] + 0.8
    G["caps"] = build_captions(d["chars"], d["T"], G["dur"])
    G["cs"], G["prefs"], G["vn"] = load_geo(gdir)
    G["mkeys"] = map_keys()
    G["gdir"], G["adir"] = gfr, afr
    jl = lambda p: json.load(open(p)) if os.path.exists(p) else []
    G["gcams"] = {c["i"]: c for c in jl(f"{gfr}/cams.json")}
    G["ghave"] = sorted(G["gcams"]) or [0]
    G["ahave"] = sorted(c["i"] for c in jl(f"{afr}/cams.json")) or [0]
    tex = make_texture(W, H)
    G["tex"], G["tex6"], G["tex5"] = tex, tex ** 0.6, tex ** 0.5
    G["scenes"] = scenes()
    G["cast"] = cast()

def main(gdir, vo, gfr, afr, out, only=None):
    init(gdir, vo, gfr, afr)
    if only:
        for x in only.split(","):
            fr = np.frombuffer(render(int(float(x) * FPS)), np.uint8).reshape(H, W, 3)
            Image.fromarray(fr).resize((W // 2, H // 2)).save(f"{out}_{x}.png")
        return
    n = int(G["dur"] * FPS)
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-i", f"{vo}/vo_vi.wav", "-af", "apad", "-shortest",
                           "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "19", "-c:a", "aac", "-b:a", "192k", out],
                          stdin=subprocess.PIPE)
    with Pool(4, initializer=init, initargs=(gdir, vo, gfr, afr)) as pool:
        for k, fr in enumerate(pool.imap(render, range(n), chunksize=6)):
            ff.stdin.write(fr)
            if k % 900 == 0:
                print("khung", k, "/", n, flush=True)
    ff.stdin.close()
    ff.wait()

if __name__ == "__main__":
    main(*sys.argv[1:7])
