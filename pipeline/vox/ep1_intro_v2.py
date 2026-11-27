"""Video 1 – đoạn mở đầu (~21 giây), phong cách "bàn làm việc sáng":
mặt bàn gỗ sáng, tờ giấy chấm lưới, nhãn giấy xé, ghim xanh ngọc, dây vàng, dải tiêu đề báo, ảnh thật ghim lên giấy.

python3 pipeline/vox/ep1_intro_v2.py <voice.wav> <thư_mục_ảnh> <ne_50m_admin_0_countries.geojson> <out.mp4> [t_end]
"""
import json, math, os, subprocess, sys
from multiprocessing import Pool
import numpy as np
from PIL import Image
from shapely.geometry import shape, box

sys.path.insert(0, os.path.dirname(__file__))
from vox import (W, H, FPS, INK, prog, ease_io, ease_out, ease_back, lerp, load_photo, paste_photo, resample, wobble,
                 Pen, highlight, sticky, svg_to_rgba, envelope, esc, make_desk, draw_sheet, torn_label, pin, string,
                 headline, GOLD, TEAL, NAVY, MUSTARD)
from characters import trang, grad_cap_strokes

G = {}
P_ = W  # mỗi cảnh một "trang"
CUTS = [(3.6, 4.6), (7.0, 7.9), (11.35, 12.25), (16.15, 16.9), (19.3, 20.0)]

def italy_strokes(geo, bx):
    feats = [f for f in json.load(open(geo))["features"] if f["properties"]["ADM0_A3"] == "ITA"]
    g = shape(feats[0]["geometry"])
    polys = sorted(g.geoms if g.geom_type == "MultiPolygon" else [g], key=lambda p: -p.area)[:3]
    x0, y0, x1, y1 = bx
    lon0, lat0, lon1, lat1 = 6.5, 36.5, 18.6, 47.2
    k = min((x1 - x0) / ((lon1 - lon0) * 0.72), (y1 - y0) / (lat1 - lat0))
    P = lambda lon, lat: (x0 + (lon - lon0) * 0.72 * k, y0 + (lat1 - lat) * k)
    return [wobble(resample([P(*c) for c in p.simplify(0.03).exterior.coords], 5), 1.2, seed=i)
            for i, p in enumerate(polys)], P

def world_paths(geo, bx):
    x0, y0, x1, y1 = bx
    lon0, lon1, lat0, lat1 = -170, 180, -58, 80
    sx, sy = (x1 - x0) / (lon1 - lon0), (y1 - y0) / (lat1 - lat0)
    P = lambda lon, lat: (x0 + (lon - lon0) * sx, y0 + (lat1 - lat) * sy)
    out = []
    for f in json.load(open(geo))["features"]:
        g = shape(f["geometry"]).intersection(box(lon0, lat0, lon1, lat1)).simplify(0.25)
        for p in ([g] if g.geom_type == "Polygon" else list(getattr(g, "geoms", []))):
            if p.geom_type == "Polygon" and p.area > 0.6:
                out.append("M" + " L".join(f"{P(*c)[0]:.1f},{P(*c)[1]:.1f}" for c in p.exterior.coords) + "Z")
    return "".join(out), P

def init(voice, photos, geo, t_end):
    G["env"] = envelope(voice)
    desk = make_desk(P_ * 6)
    for k, rot in zip(range(6), (0, -1.2, 0.8, -0.6, 0, 0.7)):
        if k == 4:
            continue  # cảnh tiêu đề báo nằm thẳng trên mặt bàn
        desk = draw_sheet(desk, k * P_ + 110, 60, 1700, 960, rot)
    G["desk"] = desk
    G["ph"] = {n: load_photo(f"{photos}/{n}.jpg", w) for n, w in
               [("stock", 720), ("duomo", 440), ("newspaper", 600), ("papers", 520)]}
    G["italy"], G["P"] = italy_strokes(geo, (2 * P_ + 1120, 150, 2 * P_ + 1700, 940))
    G["world"], G["WP"] = world_paths(geo, (5 * P_ + 260, 170, 5 * P_ + 1700, 880))
    G["t_end"] = t_end

def cam_x(t):
    x = 0
    for k, (a, b) in enumerate(CUTS):
        if t >= a:
            x = lerp(k * P_, (k + 1) * P_, ease_io(prog(t, a, b)))
    return x

def render(i):
    t = i / FPS
    cx = cam_x(t)
    pen = Pen()
    base = Image.fromarray(G["desk"][:, int(cx):int(cx) + W].astype("uint8"))
    S = lambda x: x - cx

    photos = [("stock", P_ + 1000, 470, -2.5, 4.35), ("duomo", 2 * P_ + 720, 660, 3.5, 10.85),
              ("newspaper", 3 * P_ + 640, 430, -3.5, 12.2), ("papers", 3 * P_ + 1000, 680, 2.5, 12.6)]
    pins = ""
    for name, wx, wy, rot, t0 in photos:
        sx = S(wx)
        if -800 < sx < W + 800 and t >= t0:
            k = ease_out(prog(t, t0, t0 + 0.35))
            card = G["ph"][name]
            kb = 1.0 + 0.03 * prog(t, t0, t0 + 6)  # zoom chậm kiểu "ảnh sống"
            paste_photo(base, card, sx, wy, rot, scale=lerp(1.12, 1.0, k) * kb, alpha=k)
            pins += pin(wx, wy - card.height / 2 + 26, TEAL, prog(t, t0 + 0.25, t0 + 0.5))
    a = np.asarray(base, dtype=np.float32)

    b = f'<g transform="translate({-cx:.1f},0)">' + pins

    # ===== Cảnh 1 =====
    b += pen.write("Xin chào!", 1150, 250, 84, t, 0.9, 1.6, color="#e4572e", cid="c0")
    b += torn_label(1420, 430, "TRANG", 150, "#ffffff", rot=-3, k=prog(t, 1.75, 2.1), seed=1)
    b += pin(1225, 372, "#e4572e", prog(t, 2.0, 2.2))
    b += torn_label(1440, 610, "FOUNDER · MORA AI", 54, MUSTARD, rot=2, k=prog(t, 2.35, 2.7), seed=2)
    b += pen.stroke(wobble(resample([(1150, 700), (1440, 690), (1740, 702)], 8), 3, 1), t, 2.8, 3.2, color=TEAL, width=7)

    # ===== Cảnh 2: tài chính =====
    X = P_
    b += torn_label(X + 1000, 880, "TÀI CHÍNH", 80, MUSTARD, rot=-2, k=prog(t, 5.95, 6.3), seed=3)
    b += pen.stroke(resample([(X + 1480, 470), (X + 1480, 720), (X + 1760, 720)], 6), t, 4.8, 5.2, width=5)
    chart = [(X + 1500, 690), (X + 1550, 650), (X + 1600, 670), (X + 1650, 590), (X + 1700, 610), (X + 1750, 490)]
    b += pen.stroke(wobble(resample(chart, 6), 1.5, 3), t, 5.2, 5.8, color="#1a9b55", width=8)
    b += pen.stroke(resample([(X + 1722, 497), (X + 1750, 490), (X + 1745, 520)], 4), t, 5.8, 5.9, color="#1a9b55", width=8)

    # ===== Cảnh 3: MBA tại Ý =====
    X = 2 * P_
    for pts, a0, a1 in zip(G["italy"], (7.9, 9.3, 9.5), (9.3, 9.5, 9.7)):
        b += pen.stroke(pts, t, a0, a1, width=5, fill_after=(MUSTARD, 0.85 * ease_out(prog(t, a1, a1 + 0.4))))
    b += torn_label(X + 560, 240, "THẠC SĨ QUẢN TRỊ KINH DOANH", 50, "#ffffff", rot=-2, k=prog(t, 8.9, 9.3), seed=4)
    b += torn_label(X + 470, 380, "MBA", 120, TEAL, ink="#ffffff", rot=3, k=prog(t, 10.25, 10.6), seed=5)
    mx, my = G["P"](9.19, 45.46)
    b += pin(mx, my, "#e4572e", prog(t, 10.75, 10.95))
    b += string((mx, my), (X + 720, 660 - G["ph"]["duomo"].height / 2 + 26), t, 10.95, 11.3, sag=60)
    if t >= 10.9:
        b += pen.write("Milano", mx - 40, my - 34, 54, t, 10.9, 11.3, cid="c5", anchor="end")

    # ===== Cảnh 4: mỗi ngày =====
    X = 3 * P_
    b += torn_label(X + 1460, 220, "MỖI NGÀY", 84, "#e4572e", ink="#ffffff", rot=-3, k=prog(t, 13.9, 14.3), seed=6)
    b += sticky(X + 1330, 480, 250, "Deal lớn", "#ffe27a", -6, prog(t, 14.8, 15.1))
    b += sticky(X + 1600, 570, 250, "Thị trường", "#bfe8ff", 5, prog(t, 15.15, 15.45))
    b += sticky(X + 1440, 810, 250, "Báo cáo\ntài chính", "#c7f0d8", -3, prog(t, 15.5, 15.8))

    # ===== Cảnh 5: tiêu đề báo – các deal lớn =====
    X = 4 * P_
    b += headline(X + 980, 250, "Yahoo Finance", "Elon Musk's SpaceX Merges With xAI In Trillion-Dollar Merger",
                  NAVY, 1500, prog(t, 16.95, 17.35), -1.2, 7, 56)
    b += headline(X + 940, 530, "CNN", "Jensen Huang reinstated as CEO of Nvidia", "#2c7a7b", 1350,
                  prog(t, 17.55, 17.95), 1.0, 8, 60)
    b += headline(X + 1000, 820, "Bloomberg Law", "Allbirds to Wind Down After Selling Assets for Just $39 Million",
                  "#5b4b8a", 1500, prog(t, 18.15, 18.55), -0.6, 9, 56)

    # ===== Cảnh 6: thế giới tài chính vận hành =====
    X = 5 * P_
    k = ease_out(prog(t, 19.6, 20.0))
    if k > 0:
        b += f'<path d="{G["world"]}" fill="{MUSTARD}" stroke="#c99a12" stroke-width="2" opacity="{k:.2f}"/>'
    WP = G["WP"]
    cities = [("New York", -74, 40.7), ("London", -0.1, 51.5),
              ("Hong Kong", 114.2, 22.3), ("Tokyo", 139.7, 35.7), ("Singapore", 103.8, 1.35)]
    pts = {n: WP(lo, la) for n, lo, la in cities}
    links = [("New York", "London"), ("London", "Hong Kong"), ("Hong Kong", "Tokyo"),
             ("Hong Kong", "Singapore"), ("New York", "Tokyo")]
    for j, (p0, p1) in enumerate(links):
        t0 = 20.1 + j * 0.18
        b += string(pts[p0], pts[p1], t, t0, t0 + 0.4, sag=-40 if j % 2 else 40)
        u = ((t - t0 - 0.4) * 0.8) % 1.0
        if t > t0 + 0.4:
            (x0, y0), (x1, y1) = pts[p0], pts[p1]
            sag = -40 if j % 2 else 40
            xx, yy = x0 + (x1 - x0) * u, y0 + (y1 - y0) * u + sag * math.sin(math.pi * u)
            b += (f'<circle cx="{xx:.1f}" cy="{yy:.1f}" r="15" fill="{GOLD}" stroke="{INK}" stroke-width="3"/>'
                  f'<text x="{xx:.1f}" y="{yy + 6:.1f}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" '
                  f'font-size="17" fill="#6b4b00">$</text>')
    for j, (n, lo, la) in enumerate(cities):
        x, y = pts[n]
        kk = prog(t, 19.9 + j * 0.08, 20.1 + j * 0.08)
        b += pin(x, y, TEAL if j % 2 else "#e4572e", kk)
        if kk > 0:
            b += (f'<text x="{x:.1f}" y="{y + 44:.1f}" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" '
                  f'font-size="26" fill="{INK}" opacity="{kk:.2f}">{n}</text>')
    b += torn_label(X + 980, 120, "THẾ GIỚI TÀI CHÍNH VẬN HÀNH THẾ NÀO?", 52, "#ffffff", rot=-1.5,
                    k=prog(t, 20.2, 20.6), seed=10)
    b += "</g>"

    # ===== MC =====
    mv = ease_io(prog(t, 3.6, 4.3))
    pop = ease_back(prog(t, 0.3, 0.8))
    hide = ease_io(prog(t, 16.15, 16.7))
    TX, TY, SC = lerp(600, 270, mv), lerp(1050, 1068, mv) + (1 - pop) * 700 + hide * 520, lerp(1.45, 0.9, mv)
    env = G["env"]
    m = float(env[int(t * FPS)]) if t * FPS < len(env) else 0
    wave = ease_out(prog(t, 0.9, 1.2)) * (1 - ease_out(prog(t, 2.6, 3.0)))
    cap = ""
    if 8.3 <= t < 11.45:
        cpen = Pen()
        board, cbase, tassel = grad_cap_strokes()
        cap += cpen.stroke(resample(cbase, 5), t, 8.3, 8.55, width=6, fill_after=("#1b1b1b", 1.0))
        cap += cpen.stroke(resample(board, 5), t, 8.55, 8.9, width=6, fill_after=("#1b1b1b", 1.0))
        cap += cpen.stroke(resample(tassel, 4), t, 8.9, 9.05, color=GOLD, width=6)
        if cpen.tip:
            pen.tip = (TX + SC * cpen.tip[0], TY + SC * cpen.tip[1])
    b += (f'<ellipse cx="{TX:.1f}" cy="{TY - 2:.1f}" rx="{120 * SC:.1f}" ry="{14 * SC:.1f}" fill="#000" opacity="0.12"/>'
          f'<g transform="translate({TX:.1f},{TY:.1f}) scale({SC:.3f})">{trang(t, m, wave, (i % 110) < 3, cap)}</g>')
    b += pen.draw_pen()

    f = svg_to_rgba(b)
    al = f[..., 3:4] / 255
    out = a * (1 - al) + f[..., :3] * al
    out *= 1 - prog(t, G["t_end"] - 0.35, G["t_end"])
    return np.clip(out, 0, 255).astype("uint8").tobytes()

def main(voice, photos, geo, out, t_end=21.6):
    t_end = float(t_end)
    init(voice, photos, geo, t_end)
    n = int(t_end * FPS)
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-t", str(t_end), "-i", voice,
                           "-af", f"afade=t=out:st={t_end - 0.4}:d=0.4", "-shortest",
                           "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-c:a", "aac", "-b:a", "192k", out],
                          stdin=subprocess.PIPE)
    with Pool(4, initializer=init, initargs=(voice, photos, geo, t_end)) as pool:
        for fr in pool.imap(render, range(n), chunksize=4):
            ff.stdin.write(fr)
    ff.stdin.close()
    ff.wait()

if __name__ == "__main__":
    main(*sys.argv[1:])
