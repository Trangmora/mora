"""Kênh Lịch sử Thế giới – thử 10 giây mở đầu tập "Lịch sử Việt Nam trong 5 phút" (khung ngang 1920×1080).

python3 pipeline/mapstory/vn_intro.py <ne_50m_admin_0_countries.geojson> <thư_mục_giọng (vo_vi.wav, T_vi.json)> <out.mp4> [giây,giây…]

Quần đảo Hoàng Sa và Trường Sa không có trong dữ liệu Natural Earth 50m, nên vẽ riêng theo tọa độ các đảo, tô cùng màu Việt Nam.
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
from plaza_1985 import W, H, caption, lbl, big

FPS = 30
COSF = math.cos(math.radians(15))
VN, VN_EDGE, YEL, BRN = "#c8323c", "#6e1018", "#ffd54a", "#3b1d0a"
G = {}

# tọa độ (kinh độ, vĩ độ) gần đúng của các đảo, bãi chính
HOANG_SA = [(112.33, 16.83), (112.26, 16.98), (112.73, 16.67), (111.60, 16.53), (111.71, 16.45), (111.75, 16.40),
            (111.20, 15.78), (111.75, 16.05), (112.10, 16.25), (112.55, 16.95)]
TRUONG_SA = [(111.92, 8.65), (114.33, 11.43), (114.29, 11.06), (114.36, 10.38), (114.48, 10.38), (114.36, 10.18),
             (114.33, 9.88), (114.53, 10.68), (113.69, 8.97), (113.30, 8.20), (112.92, 7.87), (112.25, 8.85),
             (115.00, 10.90), (115.50, 9.60), (114.10, 9.40)]
BATTLES = [("Bạch Đằng", 106.75, 20.90), ("Chi Lăng", 106.60, 21.65),
           ("Đống Đa", 105.83, 21.01), ("Rạch Gầm", 106.05, 10.35)]

def load_map(path):
    keep = box(80, -10, 135, 35)
    islands = [box(110.5, 15.3, 113.2, 17.3), box(111.3, 7.3, 116.2, 11.8)]
    out = []
    for f in json.load(open(path))["features"]:
        code = f["properties"]["ADM0_A3"]
        g = shape(f["geometry"])
        if not g.intersects(keep):
            continue
        g = g.intersection(keep).simplify(0.02)
        polys = [g] if g.geom_type == "Polygon" else list(getattr(g, "geoms", []))
        d = "".join("M" + " ".join(f"{x * COSF:.3f},{-y:.3f}" for x, y in p.exterior.coords) + "Z"
                    for p in polys if p.geom_type == "Polygon" and p.area > 0.01
                    and not any(b.contains(p.centroid) for b in islands))
        if d:
            out.append((code, d))
    return out

def times(chars):
    """mốc bắt đầu của các cụm từ trong câu s01"""
    txt = "".join(c for c, _ in chars)
    ts = [t for _, t in chars]
    def at(s):
        i = txt.find(s)
        return ts[i] if i >= 0 else None
    return {"truyen": at("Truyền"), "su": at("Sử sách"), "day": at("Đây là"), "chu_s": at("chữ S")}

def camera(t):
    z = ease_io(prog(t, 0.0, 2.4))
    return lerp(106, 109.6, z), lerp(17, 15.4, z), lerp(20, 47, z) * (1 + 0.006 * max(0, t - 2.4))

def scene(t):
    P = G["P"]
    clon, clat, s = camera(t)
    tx, ty = W / 2 - clon * COSF * s, H / 2 - 20 + clat * s
    px = lambda lon, lat: (lon * COSF * s + tx, -lat * s + ty)
    sw = 2.0 / s
    # Việt Nam đỏ dần từ bắc xuống nam (lộ hình chữ S)
    fill_k = ease_io(prog(t, 0.9, P["chu_s"] + 0.9))
    top, bot = -24.0, -8.0
    cut = lerp(top, bot, fill_k)
    m = [f'<defs><clipPath id="vn"><rect x="0" y="{top - 1}" width="200" height="{cut - top + 1:.3f}"/></clipPath></defs>',
         f'<g transform="matrix({s},0,0,{s},{tx},{ty})">',
         f'<g transform="translate({4 / s},{6 / s})" fill="#2e5d5c" opacity="0.45">'] + \
        [f'<path d="{d}"/>' for _, d in G["countries"]] + ["</g>"]
    for code, d in G["countries"]:
        m.append(f'<path d="{d}" fill="{LAND}" stroke="{LAND_EDGE}" stroke-width="{sw:.4f}" stroke-linejoin="round"/>')
    vn = [d for c, d in G["countries"] if c == "VNM"]
    m += [f'<path d="{d}" fill="{VN}" stroke="{VN_EDGE}" stroke-width="{sw * 1.3:.4f}" stroke-linejoin="round" clip-path="url(#vn)"/>' for d in vn]
    m.append("</g>")
    # hai quần đảo
    ik = prog(t, P["chu_s"] + 0.2, P["chu_s"] + 0.8)
    if ik > 0:
        for grp, t0 in ((HOANG_SA, 0.0), (TRUONG_SA, 0.25)):
            for j, (lon, lat) in enumerate(grp):
                k = ease_back(prog(t, P["chu_s"] + 0.2 + t0 + j * 0.03, P["chu_s"] + 0.5 + t0 + j * 0.03))
                if k <= 0:
                    continue
                x, y = px(lon, lat)
                r = (6 + (j % 3) * 2) * k * s / 54
                m.append(f'<circle cx="{x:.1f}" cy="{y + 3:.1f}" r="{r:.1f}" fill="#2e5d5c" opacity="0.5"/>'
                         f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}" fill="{VN}" stroke="{VN_EDGE}" stroke-width="2.5"/>')
        x, y = px(112.0, 17.6)
        m.append(lbl(x + 40, y - 20, "QĐ. Hoàng Sa", 40, -4, prog(t, P["chu_s"] + 0.6, P["chu_s"] + 1.0), "#fff6d8"))
        x, y = px(114.2, 12.2)
        m.append(lbl(x + 30, y - 10, "QĐ. Trường Sa", 40, -4, prog(t, P["chu_s"] + 0.85, P["chu_s"] + 1.25), "#fff6d8"))
        m.append(f'<g opacity="{clamp(prog(t, P["chu_s"] + 1.0, P["chu_s"] + 1.4)):.2f}">'
                 + outlined(f'x="{px(113.4, 16.9)[0]:.0f}" y="{px(113.4, 16.9)[1] + 40:.0f}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="26"', "(Việt Nam)", "#fff6d8", BRN, 6)
                 + outlined(f'x="{px(115.4, 11.4)[0]:.0f}" y="{px(115.4, 11.4)[1] + 40:.0f}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="26"', "(Việt Nam)", "#fff6d8", BRN, 6) + "</g>")
    # nhãn Việt Nam
    x, y = px(110.4, 13.4)
    va = 1 - prog(t, P["day"], P["day"] + 0.3)
    if va > 0:
        m.append(f'<g opacity="{va:.2f}">' + lbl(x, y, "VIỆT NAM", 60, -60, prog(t, P["chu_s"] - 0.1, P["chu_s"] + 0.4)) + "</g>")
    # chiến trận giữ nước
    if t >= P["su"]:
        a = 1 - prog(t, P["day"] - 0.1, P["day"] + 0.3)
        for j, (name, lon, lat) in enumerate(BATTLES):
            k = prog(t, P["su"] + 0.3 + j * 0.28, P["su"] + 0.55 + j * 0.28)
            if k <= 0:
                continue
            x, y = px(lon, lat)
            m.append(f'<g opacity="{a:.2f}" transform="translate({x:.1f},{y:.1f}) scale({ease_back(k):.3f})">'
                     f'<circle r="30" fill="{YEL}" stroke="{BRN}" stroke-width="5"/>'
                     f'<path d="M -16 -16 L 16 16 M 16 -16 L -16 16" stroke="{BRN}" stroke-width="7" stroke-linecap="round"/>'
                     f'<path d="M -20 -10 L -10 -20 M 20 -10 L 10 -20" stroke="{BRN}" stroke-width="5" stroke-linecap="round"/></g>')
            side = -1 if name in ("Đống Đa", "Rạch Gầm") else 1
            dy = -34 if name == "Chi Lăng" else 12
            m.append(f'<g opacity="{a * k:.2f}">' + outlined(
                f'x="{x + side * 44:.0f}" y="{y + dy:.0f}" text-anchor="{"start" if side > 0 else "end"}" font-family="DejaVu Serif" font-weight="bold" font-size="34"',
                name, "#fff6d8", BRN, 8) + "</g>")
    return "".join(m)

def drum(x, y, r, rot):
    """mặt trống đồng: vòng tròn đồng tâm + ngôi sao nhiều cánh ở giữa"""
    s = (f'<g transform="translate({x:.1f},{y:.1f}) rotate({rot:.1f})">'
         f'<circle r="{r}" fill="#b98a3e" stroke="{OUT}" stroke-width="8"/>')
    for k, c in ((0.88, "#8f6526"), (0.72, "#c99b4b"), (0.56, "#8f6526"), (0.40, "#d4a85a")):
        s += f'<circle r="{r * k:.1f}" fill="none" stroke="{c}" stroke-width="{r * 0.05:.1f}"/>'
    for i in range(18):  # chim Lạc bay quanh (cách điệu)
        q = i / 18 * 2 * math.pi
        cx, cy = math.cos(q) * r * 0.80, math.sin(q) * r * 0.80
        s += f'<path d="M {cx - 8:.1f} {cy:.1f} L {cx + 8:.1f} {cy:.1f}" stroke="#6b4a18" stroke-width="4" transform="rotate({math.degrees(q) + 90:.0f} {cx:.1f} {cy:.1f})"/>'
    pts = []
    for i in range(28):
        q = i / 28 * 2 * math.pi
        rr = r * (0.32 if i % 2 == 0 else 0.12)
        pts.append(f"{math.cos(q) * rr:.1f},{math.sin(q) * rr:.1f}")
    s += f'<polygon points="{" ".join(pts)}" fill="#f2d27a" stroke="#6b4a18" stroke-width="3"/></g>'
    return s

def overlay(t):
    P = G["P"]
    s = ""
    # trống đồng + "4.000 năm" (truyền thuyết)
    a = clamp(prog(t, P["truyen"], P["truyen"] + 0.3)) * (1 - prog(t, P["su"] - 0.1, P["su"] + 0.3))
    if a > 0:
        k = ease_back(prog(t, P["truyen"], P["truyen"] + 0.5))
        s += f'<g opacity="{a:.2f}">' + drum(470, 470, 210 * k, (t - P["truyen"]) * 25)
        s += big(470, 780, "4.000 năm", 84, YEL, BRN, 14, prog(t, P["truyen"] + 0.6, P["truyen"] + 0.9), -3)
        s += big(470, 850, "theo truyền thuyết", 40, "#ffffff", "#141414", 9, prog(t, P["truyen"] + 0.9, P["truyen"] + 1.2), -3)
        s += "</g>"
    # tiêu đề
    k = prog(t, P["day"] + 0.4, P["day"] + 0.8)
    if k > 0:
        s += big(560, 420, "LỊCH SỬ", 130, YEL, BRN, 20, k, -4) + big(560, 560, "VIỆT NAM", 150, YEL, BRN, 22, k, -4)
        k2 = prog(t, P["day"] + 1.2, P["day"] + 1.5)
        if k2 > 0:
            s += (f'<g transform="translate(560,680) rotate(-4) scale({ease_back(k2):.3f})">'
                  f'<rect x="-190" y="-50" width="380" height="90" rx="45" fill="{VN}" stroke="{OUT}" stroke-width="7"/>'
                  + outlined('y="18" text-anchor="middle" font-family="Inter" font-weight="900" font-size="52"', "trong 5 phút", "#ffffff", OUT, 6) + "</g>")
    return s

def render(i):
    t = i / FPS
    P = G["P"]
    bg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="{SEA}"/>{scene(t)}</svg>'
    base = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=bg.encode()))).convert("RGB"), dtype=np.float32)
    dim = 0.3 * prog(t, P["truyen"], P["truyen"] + 0.3) * (1 - prog(t, P["su"] - 0.1, P["su"] + 0.3))
    base = np.clip(base * G["tex"], 0, 255) * (1 - dim)
    fg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}">{overlay(t)}{caption(t, G["caps"])}</svg>'
    f = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=fg.encode()))).convert("RGBA"), dtype=np.float32)
    a = f[..., 3:4] / 255
    return (base * (1 - a) + f[..., :3] * a).astype("uint8").tobytes()

def init(geo, vo):
    d = json.load(open(f"{vo}/T_vi.json"))
    G["dur"] = d["T"]["end"] + 1.2
    G["caps"] = build_captions(d["chars"], d["T"], G["dur"])
    G["P"] = times(d["chars"]["s01"])
    G["countries"] = load_map(geo)
    G["tex"] = make_texture(W, H)

def main(geo, vo, out, only=None):
    init(geo, vo)
    if only:
        for x in only.split(","):
            fr = np.frombuffer(render(int(float(x) * FPS)), np.uint8).reshape(H, W, 3)
            Image.fromarray(fr).resize((W // 2, H // 2)).save(f"{out}_{x}.png")
        return
    n = int(G["dur"] * FPS)
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-i", f"{vo}/vo_vi.wav", "-af", "apad", "-shortest",
                           "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-c:a", "aac", "-b:a", "192k", out],
                          stdin=subprocess.PIPE)
    with Pool(4, initializer=init, initargs=(geo, vo)) as pool:
        for fr in pool.imap(render, range(n), chunksize=4):
            ff.stdin.write(fr)
    ff.stdin.close()
    ff.wait()

if __name__ == "__main__":
    main(*sys.argv[1:5])
