"""Video ngắn: vụ sụp đổ FTX (bản đồ cổ + nhân vật 2D vẽ bằng code).

python3 pipeline/mapstory/ftx.py <ne_50m_admin_0_countries.geojson> <thư_mục_giọng (có vo_vi.wav, T_vi.json)> <out.mp4>
"""
import io, json, math, subprocess, sys
from multiprocessing import Pool
import numpy as np
import cairosvg
from PIL import Image
from shapely.geometry import shape, box

sys.path.insert(0, __import__("os").path.dirname(__file__))
from demo import (W, H, clamp, prog, ease_io, ease_out, ease_back, lerp, mix, outlined, eyes, mouth,
                  make_texture, OUT, SKIN, LAND, LAND_EDGE, SEA)

FPS = 30
COSF = math.cos(math.radians(25))
G = {}  # dữ liệu dùng chung cho tiến trình con

# ---------- bản đồ ----------
def load_map(path):
    region = box(-140, -20, 0, 65)
    out = []
    for f in json.load(open(path))["features"]:
        code = f["properties"]["ADM0_A3"]
        g = shape(f["geometry"])
        if not g.intersects(region):
            continue
        g = g.intersection(region).simplify(0.01 if code == "BHS" else 0.04)
        polys = [g] if g.geom_type == "Polygon" else list(getattr(g, "geoms", []))
        d = "".join("M" + " ".join(f"{x * COSF:.3f},{-y:.3f}" for x, y in p.exterior.coords) + "Z"
                    for p in polys if p.geom_type == "Polygon" and (code == "BHS" or p.area > 0.03))
        if d:
            out.append((code, d))
    return out

def map_svg(countries, t, T):
    z = ease_io(prog(t, 0.0, 2.0))
    clon, clat = lerp(-62, -77.2, z), lerp(30, 21.5, z)
    s = lerp(13, 78, z) * (1 + 0.02 * max(0, t - 2))  # zoom chậm dần sau đó
    tx, ty = W / 2 - clon * COSF * s, lerp(H * 0.42, H * 0.24, z) + clat * s
    hl = ease_out(prog(t, 1.2, 1.8))
    crash = prog(t, T["s03"], T["s03"] + 0.6)
    sw = 2.2 / s
    p = [f'<g transform="matrix({s},0,0,{s},{tx},{ty})">',
         f'<g transform="translate({4 / s},{6 / s})" fill="#2e5d5c" opacity="0.45">']
    p += [f'<path d="{d}"/>' for _, d in countries]
    p.append("</g>")
    for code, d in countries:
        if code == "BHS":
            fill = mix(mix(LAND, "#f0b429", hl), "#c8323c", crash)
            edge = mix(LAND_EDGE, "#6b3d00", hl)
        else:
            fill, edge = LAND, LAND_EDGE
        p.append(f'<path d="{d}" fill="{fill}" stroke="{edge}" stroke-width="{sw:.4f}" stroke-linejoin="round"/>')
    p.append("</g>")
    lp = prog(t, 1.4, 1.9)
    if lp > 0:
        x, y = -77.4 * COSF * s + tx, -24.4 * s + ty
        p.append(f'<g transform="translate({x + 250:.1f},{y + 10:.1f}) scale({ease_back(lp):.3f}) rotate(-6)">'
                 + outlined('text-anchor="middle" font-family="DejaVu Serif" font-weight="bold" font-size="60"',
                            "BAHAMAS", "#ffd54a", "#3b1d0a", 10) + "</g>")
    return "".join(p)

# ---------- nhân vật Sam ----------
def sam(t, T):
    shirt, shorts, hair = "#8d9399", "#b59a6a", "#4a2f1d"
    shocked = T["s03"] <= t < T["s04"]
    sad = t >= T["s04"]
    shifty = T["s02"] <= t < T["s03"]
    # tay: vẫy nhẹ lúc đầu, giơ hai tay khi hoảng
    wave = math.sin(t * 6) * 8
    aL = 20 + (130 if shocked else 0)
    aR = -20 - (130 if shocked else 0) + (wave if t < T["s02"] else 0)
    def arm(angle, sx):
        return (f'<g transform="translate({sx},-176) rotate({angle:.1f})">'
                f'<rect x="-17" y="-4" width="34" height="116" rx="17" fill="{SKIN}" stroke="{OUT}" stroke-width="6"/>'
                f'<rect x="-21" y="-10" width="42" height="52" rx="12" fill="{shirt}" stroke="{OUT}" stroke-width="6"/>'
                f'<circle cx="0" cy="122" r="20" fill="{SKIN}" stroke="{OUT}" stroke-width="5"/></g>')
    legs = (f'<rect x="-48" y="-80" width="34" height="74" rx="10" fill="{SKIN}" stroke="{OUT}" stroke-width="6"/>'
            f'<rect x="14" y="-80" width="34" height="74" rx="10" fill="{SKIN}" stroke="{OUT}" stroke-width="6"/>'
            f'<ellipse cx="-34" cy="-4" rx="34" ry="15" fill="#f4f4f4" stroke="{OUT}" stroke-width="5"/>'
            f'<ellipse cx="34" cy="-4" rx="34" ry="15" fill="#f4f4f4" stroke="{OUT}" stroke-width="5"/>')
    body = (f'<path d="M -66 -120 L 66 -120 L 72 -66 L -72 -66 Z" fill="{shorts}" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>'
            f'<rect x="-50" y="-112" width="22" height="26" rx="4" fill="#a3895b" stroke="{OUT}" stroke-width="3"/>'
            f'<path d="M -68 -200 Q 0 -214 68 -200 L 74 -112 Q 0 -100 -74 -112 Z" fill="{shirt}" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>'
            f'<path d="M -22 -205 Q 0 -186 22 -205" fill="none" stroke="{OUT}" stroke-width="5"/>')
    curls = "".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{hair}" stroke="{OUT}" stroke-width="5"/>'
                    for x, y, r in [(-70, -300, 34), (-48, -336, 36), (-8, -352, 38), (36, -344, 36), (70, -310, 34),
                                    (-82, -262, 24), (84, -268, 24), (12, -322, 30), (-30, -316, 28)])
    if shocked:
        face = eyes(True) + mouth("wide")
    else:
        e = eyes(False)
        if shifty:  # liếc ngang
            dx = 10 * math.copysign(1, math.sin(t * 4))
            e = "".join(f'<ellipse cx="{x + dx}" cy="-264" rx="6.5" ry="8" fill="{OUT}"/>' for x in (-22, 30))
        if sad:
            m = f'<path d="M -12 -218 Q 4 -232 20 -218" fill="none" stroke="{OUT}" stroke-width="5" stroke-linecap="round"/>'
            e += '<path d="M -36 -284 L -10 -278 M 44 -284 L 18 -278" stroke="#262220" stroke-width="4" stroke-linecap="round"/>'
        else:
            m = f'<path d="M -16 -232 Q 4 -214 24 -232" fill="none" stroke="{OUT}" stroke-width="5" stroke-linecap="round"/>'
        face = e + m
    tilt = math.sin(t * 2.5) * 3 + (math.sin(t * 40) * 4 if shocked else 0)
    head = (f'<g transform="rotate({tilt:.2f} 0 -210)"><circle cx="0" cy="-262" r="80" fill="{SKIN}" stroke="{OUT}" stroke-width="6"/>'
            f'{curls}{face}</g>')
    return arm(aL, -66) + legs + body + head + arm(aR, 66)

# ---------- đạo cụ ----------
def coin(x, y, r=26, a=1.0):
    return (f'<g opacity="{a:.2f}"><circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="#f2c233" stroke="{OUT}" stroke-width="4"/>'
            f'<text x="{x:.1f}" y="{y + r * 0.38:.1f}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" '
            f'font-size="{r * 1.1:.0f}" fill="#9a6b00">$</text></g>')

def vault(x, y, label, color, fill_ratio, a):
    w, h = 280, 210
    stack = ""
    n = int(round(9 * fill_ratio))
    for i in range(n):
        stack += coin(x - 80 + (i % 3) * 80, y + 60 - (i // 3) * 34, 24)
    return (f'<g opacity="{a:.2f}"><rect x="{x - w / 2}" y="{y - h / 2}" width="{w}" height="{h}" rx="18" fill="{color}" '
            f'stroke="{OUT}" stroke-width="7"/>{stack}'
            + outlined(f'x="{x}" y="{y - h / 2 - 22}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="44"',
                       label, "#ffffff", "#141414", 11) + "</g>")

def bars(k):
    y0 = -1100 + 1100 * ease_out(k)
    s = f'<g transform="translate(0,{y0:.1f})">'
    s += f'<rect x="250" y="1160" width="580" height="30" fill="#6b6f75" stroke="{OUT}" stroke-width="6"/>'
    for i in range(7):
        x = 270 + i * 90
        s += f'<rect x="{x}" y="1160" width="26" height="760" fill="#8a8f96" stroke="{OUT}" stroke-width="6"/>'
    return s + "</g>"

def big_number(t, T):
    a = ease_back(prog(t, 2.2, 2.6))
    if a <= 0:
        return ""
    if t < T["s03"]:
        v = round(32 * ease_out(prog(t, 2.2, 3.4)))
        col = "#7CFC7C"
    else:
        v = round(32 * (1 - ease_io(prog(t, T["s03"] + 0.2, T["s03"] + 1.4))))
        col = "#ff4d4d"
    txt = f"${v} tỷ" if v > 0 else "$0"
    fade = 1 - prog(t, T["s02"] - 0.1, T["s02"] + 0.2) + prog(t, T["s03"] - 0.1, T["s03"] + 0.15)
    fade = clamp(fade) * (1 - prog(t, T["s04"], T["s04"] + 0.3))
    if fade <= 0:
        return ""
    return (f'<g opacity="{fade:.2f}" transform="translate({W / 2},{900 if t < T["s03"] else 400}) scale({a:.3f})">'
            + outlined('text-anchor="middle" font-family="Inter" font-weight="900" font-size="170"', txt, col, "#141414", 18)
            + "</g>")

def crash_chart(t, T):
    k = prog(t, T["s03"], T["s03"] + 0.3)
    if k <= 0 or t >= T["s04"] + 0.3:
        return ""
    a = ease_out(k) * (1 - prog(t, T["s04"], T["s04"] + 0.3))
    pts_up = [(0, 0.55), (0.1, 0.62), (0.2, 0.58), (0.3, 0.72), (0.4, 0.68), (0.5, 0.85), (0.58, 0.95)]
    pts_dn = [(0.62, 0.9), (0.68, 0.6), (0.74, 0.35), (0.82, 0.12), (0.9, 0.04), (1.0, 0.02)]
    d = prog(t, T["s03"] + 0.2, T["s03"] + 1.4)
    pts = pts_up + [p for p in pts_dn if p[0] <= 0.62 + d * 0.38]
    x0, y0, w, h = 140, 560, 800, 340
    path = " ".join(f"{x0 + x * w:.0f},{y0 + h - y * h:.0f}" for x, y in pts)
    return (f'<g opacity="{a:.2f}"><rect x="{x0 - 30}" y="{y0 - 40}" width="{w + 60}" height="{h + 80}" rx="20" '
            f'fill="#fff6e0" stroke="{OUT}" stroke-width="7"/>'
            f'<polyline points="{path}" fill="none" stroke="#d62828" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/></g>')

def money_flow(t, T):
    a0, a1 = T["s02"], T["s03"]
    if not (a0 - 0.2 <= t < a1 + 0.2):
        return ""
    a = clamp(prog(t, a0 - 0.2, a0 + 0.2)) * (1 - prog(t, a1 - 0.05, a1 + 0.2))
    drained = prog(t, a0 + 0.4, a1 - 0.2)
    s = vault(230, 820, "KHÁCH HÀNG", "#2b6cb0", 1 - drained, a)
    s += vault(850, 820, "ALAMEDA", "#dd6b20", drained, a)
    for i in range(6):
        ph = ((t - a0 - 0.4) * 1.6 + i / 6) % 1.0
        if t < a0 + 0.4 or t > a1 - 0.2:
            continue
        x = lerp(260, 820, ph)
        y = 760 - math.sin(ph * math.pi) * 260
        s += coin(x, y, 28, a)
    # mũi tên "lén"
    s += (f'<path d="M 320 640 Q 540 470 760 640" fill="none" stroke="#141414" stroke-width="16" stroke-dasharray="30 22" opacity="{a * 0.5:.2f}"/>')
    return s

def stamp(t, T):
    k = prog(t, T["s04"] + 0.9, T["s04"] + 1.2)
    if k <= 0:
        return ""
    sc = lerp(2.2, 1.0, ease_out(k))
    return (f'<g transform="translate({W / 2},700) rotate(-8) scale({sc:.3f})" opacity="{min(1, k * 2):.2f}">'
            f'<rect x="-330" y="-95" width="660" height="150" rx="16" fill="none" stroke="#d62828" stroke-width="14"/>'
            + outlined('y="20" text-anchor="middle" font-family="Inter" font-weight="900" font-size="104"', "25 NĂM TÙ",
                       "#d62828", "#fff6e0", 10) + "</g>")

def logo(t, T):
    k = ease_back(prog(t, 1.8, 2.2))
    if k <= 0 or t > T["s02"] + 0.2:
        return ""
    a = 1 - prog(t, T["s02"] - 0.1, T["s02"] + 0.2)
    return (f'<g opacity="{a:.2f}" transform="translate({W / 2},690) scale({k:.3f})">'
            f'<rect x="-150" y="-70" width="300" height="120" rx="22" fill="#11a3c9" stroke="{OUT}" stroke-width="8"/>'
            + outlined('y="30" text-anchor="middle" font-family="Inter" font-weight="900" font-size="88"', "FTX", "#ffffff", "#0b3d4f", 6)
            + "</g>")

# ---------- phụ đề theo mốc từng chữ ----------
def build_captions(chars, T, total):
    caps = []
    for sid in sorted(chars):
        words, cur, st, tag = [], "", None, False
        for c, ts in chars[sid] + [(" ", None)]:
            if c == "[": tag = True
            if tag:  # bỏ thẻ biểu cảm [excited] ... của eleven_v3
                tag = c != "]"
                continue
            if c == " ":
                if cur.strip(".…"): words.append((st, cur))
                cur = ""
                continue
            if not cur: st = ts
            cur += c
        phrases, ph = [], []
        for w in words:
            ph.append(w)
            if w[1][-1] in ".,!?:…": phrases.append(ph); ph = []
        if ph: phrases.append(ph)
        for ph in phrases:
            n = len(ph); k = math.ceil(n / 3); size = math.ceil(n / k)
            groups = [ph[a:a + size] for a in range(0, n, size)]
            if len(groups) > 1 and len(groups[-1]) == 1:  # không để chữ mồ côi
                last = groups.pop(); groups[-1] = groups[-1] + last
            for grp in groups:
                caps.append([grp[0][0], " ".join(w for _, w in grp).rstrip(".,:…").replace("...", ""), sid])
    out = []
    for j, (a, txt, sid) in enumerate(caps):
        nxt = caps[j + 1][0] if j + 1 < len(caps) else total
        out.append((a, min(nxt, T[sid + "_end"] + 0.15) if j + 1 < len(caps) else total, txt))
    return out

def caption(t, caps):
    for a, b, txt in caps:
        if a <= t < b:
            k = ease_back(prog(t, a, a + 0.15), 2.2)
            return (f'<g transform="translate({W / 2},1110) scale({0.6 + 0.4 * k:.3f})">'
                    + outlined('text-anchor="middle" font-family="Inter" font-weight="800" font-size="66"', txt,
                               "#ffffff", "#141414", 13) + "</g>")
    return ""

# ---------- dựng khung ----------
def render(i):
    t = i / FPS
    T = G["T"]
    shake = ""
    if T["s03"] <= t < T["s03"] + 0.6:
        k = 1 - prog(t, T["s03"], T["s03"] + 0.6)
        shake = f'transform="translate({math.sin(t * 90) * 18 * k:.1f},{math.cos(t * 77) * 14 * k:.1f})"'
    bg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="{SEA}"/>'
          f'<g {shake}>{map_svg(G["countries"], t, T)}</g></svg>')
    base = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=bg.encode()))).convert("RGB"), dtype=np.float32)
    base = np.clip(base * G["tex"], 0, 255)
    dim = 0.35 * prog(t, T["s02"] - 0.2, T["s02"] + 0.3)
    base *= 1 - dim
    ent = ease_back(prog(t, 1.6, 2.2), 1.4)
    bob = math.sin(t * 5) * 4
    jail = prog(t, T["s04"] + 0.1, T["s04"] + 0.6)
    fg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}"><g {shake}>'
          f'{logo(t, T)}{big_number(t, T)}{money_flow(t, T)}{crash_chart(t, T)}'
          f'<g transform="translate(540,{1860 + (1 - ent) * 900 + bob:.1f}) scale(1.5)">{sam(t, T)}</g>'
          f'{bars(jail) if jail > 0 else ""}{stamp(t, T)}{caption(t, G["caps"])}</g></svg>')
    f = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=fg.encode()))).convert("RGBA"), dtype=np.float32)
    a = f[..., 3:4] / 255
    return (base * (1 - a) + f[..., :3] * a).astype("uint8").tobytes()

def init(geo, vo):
    d = json.load(open(f"{vo}/T_vi.json"))
    G["T"] = d["T"]
    G["dur"] = d["T"]["end"] + 0.6
    G["caps"] = build_captions(d["chars"], d["T"], G["dur"])
    G["countries"] = load_map(geo)
    G["tex"] = make_texture()

def main(geo, vo, out):
    init(geo, vo)
    n = int(G["dur"] * FPS)
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-i", f"{vo}/vo_vi.wav",
                           "-af", "apad", "-shortest", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18",
                           "-c:a", "aac", "-b:a", "192k", out], stdin=subprocess.PIPE)
    with Pool(4, initializer=init, initargs=(geo, vo)) as pool:
        for fr in pool.imap(render, range(n), chunksize=4):
            ff.stdin.write(fr)
    ff.stdin.close()
    ff.wait()

if __name__ == "__main__":
    main(*sys.argv[1:4])
