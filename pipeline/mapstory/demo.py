"""Demo: bản đồ cổ + nhân vật 2D vẽ bằng code (bắt tay, nhép miệng, há miệng).

python3 pipeline/mapstory/demo.py <ne_50m_admin_0_countries.geojson> <out.mp4>
"""
import json, math, subprocess, sys
import numpy as np
import cairosvg
from PIL import Image, ImageFilter
from shapely.geometry import shape, box

W, H, FPS, DUR = 1080, 1920, 30, 7.2
COSF = math.cos(math.radians(15))

# ---------- tiện ích ----------
def clamp(x, a=0.0, b=1.0): return max(a, min(b, x))
def prog(t, t0, t1): return clamp((t - t0) / (t1 - t0))
def ease_io(x): return x * x * (3 - 2 * x)
def ease_out(x): return 1 - (1 - x) ** 3
def ease_back(x, s=1.7):
    x -= 1
    return x * x * ((s + 1) * x + s) + 1
def lerp(a, b, x): return a + (b - a) * x
def mix(c1, c2, x):
    a = [int(c1[i:i + 2], 16) for i in (1, 3, 5)]
    b = [int(c2[i:i + 2], 16) for i in (1, 3, 5)]
    return "#" + "".join(f"{round(lerp(p, q, x)):02x}" for p, q in zip(a, b))

# ---------- bản đồ ----------
def load_map(path):
    gj = json.load(open(path))
    region = box(55, -15, 160, 58)
    out = []
    for f in gj["features"]:
        g = shape(f["geometry"])
        if not g.intersects(region):
            continue
        g = g.intersection(region).simplify(0.03)
        polys = [g] if g.geom_type == "Polygon" else list(getattr(g, "geoms", []))
        d = []
        for p in polys:
            if p.geom_type != "Polygon" or p.area < 0.02:
                continue
            pts = " ".join(f"{x * COSF:.3f},{-y:.3f}" for x, y in p.exterior.coords)
            d.append("M" + pts + "Z")
        if d:
            out.append((f["properties"]["ADM0_A3"], "".join(d)))
    return out

LAND, LAND_EDGE, SEA = "#dccb9c", "#a8925f", "#5f9a98"
VN_COLOR = "#c8323c"

def map_svg(countries, t):
    z = ease_io(prog(t, 0.0, 2.2))
    clon, clat = lerp(104, 106.3, z), lerp(22, 14.5, z)
    s = lerp(22, 105, z)  # pixel / độ
    tx, ty = W / 2 - clon * COSF * s, H * 0.40 + clat * s
    vn = ease_out(prog(t, 1.4, 2.1))
    sw = 2.2 / s
    parts = [f'<g transform="matrix({s},0,0,{s},{tx},{ty})">']
    # bóng đổ của đất
    parts.append(f'<g transform="translate({4 / s},{6 / s})" fill="#2e5d5c" opacity="0.45">')
    parts += [f'<path d="{d}"/>' for _, d in countries]
    parts.append("</g>")
    for code, d in countries:
        fill = mix(LAND, VN_COLOR, vn) if code == "VNM" else LAND
        edge = mix(LAND_EDGE, "#6e1018", vn) if code == "VNM" else LAND_EDGE
        parts.append(f'<path d="{d}" fill="{fill}" stroke="{edge}" stroke-width="{sw:.4f}" stroke-linejoin="round"/>')
    parts.append("</g>")

    def to_px(lon, lat): return lon * COSF * s + tx, -lat * s + ty
    # nhãn "ĐẠI NAM"
    lp = prog(t, 1.9, 2.4)
    if lp > 0:
        x, y = to_px(105.2, 18.2)
        k = ease_back(lp)
        parts.append(f'<g transform="translate({x:.1f},{y:.1f}) scale({k:.3f}) rotate(-8)">'
                     + outlined('text-anchor="middle" font-family="DejaVu Serif" font-weight="bold" font-size="64"', "ĐẠI NAM", "#ffd54a", "#3b1d0a", 10) + '</g>')
    # chấm Gia Định nhấp nháy
    gp = prog(t, 5.0, 5.4)
    if gp > 0:
        x, y = to_px(106.7, 10.8)
        r = 14 + 10 * abs(math.sin((t - 5.0) * 5))
        parts.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r * 2.2:.1f}" fill="#ffd54a" opacity="{0.35 * ease_out(gp):.2f}"/>'
                     f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{12 * ease_back(gp):.1f}" fill="#ffd54a" stroke="#3b1d0a" stroke-width="5"/>'
                     + f'<g opacity="{gp:.2f}">' + outlined(f'x="{x - 30:.1f}" y="{y + 12:.1f}" text-anchor="end" font-family="DejaVu Serif" font-weight="bold" font-size="46"', "Gia Định", "#fff6d8", "#3b1d0a", 9) + '</g>')
    return "".join(parts)

def outlined(attrs, txt, fill, stroke, sw):
    """cairosvg không hỗ trợ paint-order: vẽ viền trước, chữ đè lên sau."""
    return (f'<text {attrs} fill="{stroke}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round">{txt}</text>'
            f'<text {attrs} fill="{fill}">{txt}</text>')

# ---------- nhân vật 2D ----------
OUT = "#262220"
SKIN = "#f4d7bb"

def mouth(state, y=-226):
    if state == "closed":
        return f'<path d="M -8 {y} Q 4 {y + 5} 16 {y}" fill="none" stroke="{OUT}" stroke-width="5" stroke-linecap="round"/>'
    if state == "talk":
        return f'<ellipse cx="4" cy="{y + 2}" rx="10" ry="9" fill="#5a1d1d" stroke="{OUT}" stroke-width="4"/>'
    # há miệng to (ngạc nhiên)
    return (f'<ellipse cx="4" cy="{y + 10}" rx="19" ry="26" fill="#5a1d1d" stroke="{OUT}" stroke-width="5"/>'
            f'<ellipse cx="4" cy="{y + 24}" rx="11" ry="8" fill="#d0606a"/>')

def eyes(shock=False):
    if shock:
        return ''.join(f'<circle cx="{x}" cy="-268" r="13" fill="#fff" stroke="{OUT}" stroke-width="4"/>'
                       f'<circle cx="{x + 2}" cy="-268" r="5" fill="{OUT}"/>' for x in (-22, 30))
    return ''.join(f'<ellipse cx="{x}" cy="-264" rx="6.5" ry="8" fill="{OUT}"/>' for x in (-22, 30))

def arm(sleeve, cuff, angle, sx, sy=-178):
    return (f'<g transform="translate({sx},{sy}) rotate({angle:.2f})">'
            f'<rect x="-18" y="-6" width="36" height="128" rx="18" fill="{sleeve}" stroke="{OUT}" stroke-width="6"/>'
            f'<rect x="-19" y="104" width="38" height="16" rx="6" fill="{cuff}" stroke="{OUT}" stroke-width="4"/>'
            f'<circle cx="0" cy="136" r="20" fill="{SKIN}" stroke="{OUT}" stroke-width="5"/></g>')

def quan_nha_nguyen(arm_angle, mouth_state, shock, head_rot):
    coat, trim = "#1f3f73", "#d9a93a"
    body = (f'<ellipse cx="-30" cy="0" rx="34" ry="12" fill="{OUT}"/><ellipse cx="34" cy="0" rx="34" ry="12" fill="{OUT}"/>'
            f'<path d="M -72 -196 Q 0 -212 72 -196 L 98 -6 Q 0 8 -98 -6 Z" fill="{coat}" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>'
            f'<path d="M 10 -200 L 26 -8" stroke="#163056" stroke-width="5"/>'
            f'<path d="M -40 -200 Q 0 -178 40 -200" fill="none" stroke="{trim}" stroke-width="12" stroke-linecap="round"/>'
            f'<rect x="-34" y="-120" width="68" height="62" rx="6" fill="{trim}" stroke="{OUT}" stroke-width="4"/>'
            f'<circle cx="0" cy="-89" r="16" fill="none" stroke="#8a5a14" stroke-width="4"/>')
    head = (f'<g transform="rotate({head_rot:.2f} 0 -210)">'
            f'<circle cx="0" cy="-262" r="80" fill="{SKIN}" stroke="{OUT}" stroke-width="6"/>'
            f'<path d="M -86 -284 L -86 -318 Q 0 -378 86 -318 L 86 -284 Q 0 -266 -86 -284 Z" fill="#141414" stroke="{OUT}" stroke-width="5"/>'
            + ''.join(f'<path d="M -84 {y} Q 0 {y - 18} 84 {y}" fill="none" stroke="#3c3c3c" stroke-width="4"/>' for y in (-296, -310))
            + eyes(shock)
            + f'<path d="M -6 -242 Q -24 -238 -36 -228 M 14 -242 Q 32 -238 44 -228" fill="none" stroke="{OUT}" stroke-width="4" stroke-linecap="round"/>'
            + mouth(mouth_state) + '</g>')
    return (arm(coat, trim, 8, -70) + body + head + arm(coat, trim, arm_angle, 66))

def si_quan_phap(arm_angle, mouth_state, shock, head_rot):
    coat, red, gold = "#1d2b4f", "#b8262e", "#e2b33c"
    body = (f'<rect x="-52" y="-70" width="44" height="70" fill="{red}" stroke="{OUT}" stroke-width="6"/>'
            f'<rect x="8" y="-70" width="44" height="70" fill="{red}" stroke="{OUT}" stroke-width="6"/>'
            f'<ellipse cx="-32" cy="0" rx="32" ry="12" fill="{OUT}"/><ellipse cx="32" cy="0" rx="32" ry="12" fill="{OUT}"/>'
            f'<path d="M -70 -198 Q 0 -212 70 -198 L 80 -56 Q 0 -44 -80 -56 Z" fill="{coat}" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>'
            + ''.join(f'<circle cx="0" cy="{y}" r="7" fill="{gold}" stroke="{OUT}" stroke-width="3"/>' for y in (-176, -146, -116, -86))
            + f'<rect x="-80" y="-104" width="160" height="16" fill="{gold}" stroke="{OUT}" stroke-width="4"/>'
            f'<ellipse cx="-66" cy="-196" rx="30" ry="13" fill="{gold}" stroke="{OUT}" stroke-width="4"/>')
    head = (f'<g transform="rotate({head_rot:.2f} 0 -210)">'
            f'<circle cx="0" cy="-262" r="80" fill="{SKIN}" stroke="{OUT}" stroke-width="6"/>'
            f'<path d="M -58 -316 L -50 -396 Q 0 -404 50 -396 L 58 -316 Z" fill="{red}" stroke="{OUT}" stroke-width="5" stroke-linejoin="round"/>'
            f'<rect x="-60" y="-336" width="120" height="24" fill="{coat}" stroke="{OUT}" stroke-width="5"/>'
            f'<path d="M -10 -316 Q 60 -318 96 -300 Q 50 -296 -10 -306 Z" fill="#111" stroke="{OUT}" stroke-width="4"/>'
            f'<path d="M -46 -372 L 46 -372" stroke="{gold}" stroke-width="5"/>'
            + eyes(shock)
            + f'<path d="M 4 -238 Q -20 -244 -40 -230 Q -46 -240 -38 -246 M 4 -238 Q 30 -246 52 -232 Q 58 -242 50 -248" '
              f'fill="none" stroke="#4a2a14" stroke-width="7" stroke-linecap="round"/>'
            + mouth(mouth_state, -218) + '</g>')
    return (arm(coat, gold, 8, -70) + body + head + arm(coat, gold, arm_angle, 66))

def talk_mouth(t, t0, t1, seed):
    if not (t0 <= t < t1):
        return "closed"
    k = int((t - t0) * FPS / 3.5)
    return "talk" if ((k * 7 + seed) % 5) in (0, 1, 3) else "closed"

def characters(t):
    ent = ease_back(prog(t, 2.2, 2.85), 1.4)
    dy = (1 - ent) * 900
    raise_ = ease_out(prog(t, 3.0, 3.55))
    shake = math.sin((t - 3.55) * 2 * math.pi * 3) * 7 if 3.55 <= t < 5.0 else 0
    release = ease_io(prog(t, 5.3, 5.8))
    ang = lerp(8, -70, raise_ * (1 - release)) + shake * (1 - release)
    shockA = t >= 6.0
    mA = "wide" if shockA else talk_mouth(t, 3.0, 4.6, 1)
    mB = talk_mouth(t, 4.7, 5.95, 3)
    bob = math.sin(t * 5) * 4
    S = 1.45
    hrA = (math.sin(t * 9) * 3 if mA == "talk" else 0) + (-6 if shockA else 0)
    hrB = math.sin(t * 8) * 3 if 4.7 <= t < 5.95 else 0
    yfeet = 1880 + dy
    return (f'<g transform="translate(816,{yfeet + bob * 0.7:.1f}) scale({-S},{S})">{si_quan_phap(ang, mB, False, hrB)}</g>'
            f'<g transform="translate(264,{yfeet - bob:.1f}) scale({S},{S})">{quan_nha_nguyen(ang, mA, shockA, hrA)}</g>')

# ---------- phụ đề ----------
CAPS = [(0.0, 1.25, "Năm 1862"), (1.25, 2.45, "triều đình Huế"), (2.45, 3.6, "ngồi vào bàn"),
        (3.6, 4.8, "ký hòa ước với Pháp"), (4.8, 6.0, "và mất ba tỉnh"), (6.0, 99, "miền Đông Nam Kỳ")]

def caption(t):
    for a, b, txt in CAPS:
        if a <= t < b:
            k = ease_back(prog(t, a, a + 0.18), 2.2)
            return (f'<g transform="translate({W / 2},1110) scale({0.6 + 0.4 * k:.3f})">'
                    + outlined('text-anchor="middle" font-family="Inter" font-weight="800" font-size="66"', txt, "#ffffff", "#141414", 13) + '</g>')
    return ""

# ---------- giấy/vignette ----------
def make_texture():
    rng = np.random.default_rng(7)
    n = Image.fromarray((rng.random((H // 4, W // 4)) * 255).astype("uint8")).resize((W, H), Image.BICUBIC)
    n = np.asarray(n.filter(ImageFilter.GaussianBlur(3)), dtype=np.float32) / 255
    yy, xx = np.mgrid[0:H, 0:W]
    v = 1 - 0.35 * (((xx - W / 2) / (W * 0.75)) ** 2 + ((yy - H / 2) / (H * 0.75)) ** 2)
    return np.clip((0.9 + 0.12 * n) * v, 0, 1.1)[..., None]

def main(geo, out):
    countries = load_map(geo)
    tex = make_texture()
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", out],
                          stdin=subprocess.PIPE)
    for i in range(int(DUR * FPS)):
        t = i / FPS
        bg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}">'
              f'<rect width="{W}" height="{H}" fill="{SEA}"/>{map_svg(countries, t)}</svg>')
        base = np.asarray(Image.open(__import__("io").BytesIO(cairosvg.svg2png(bytestring=bg.encode()))).convert("RGB"),
                          dtype=np.float32)
        base = np.clip(base * tex, 0, 255)
        fg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}">'
              f'{characters(t)}{caption(t)}</svg>')
        fgi = np.asarray(Image.open(__import__("io").BytesIO(cairosvg.svg2png(bytestring=fg.encode()))).convert("RGBA"),
                         dtype=np.float32)
        a = fgi[..., 3:4] / 255
        frame = base * (1 - a) + fgi[..., :3] * a
        ff.stdin.write(frame.astype("uint8").tobytes())
    ff.stdin.close()
    ff.wait()

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
