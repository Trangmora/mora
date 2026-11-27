"""Video 1 – đoạn mở đầu ~16 giây (giới thiệu MC), phong cách Vox.

python3 pipeline/vox/ep1_intro.py <voice.wav> <thư_mục_ảnh_unsplash> <ne_50m_admin_0_countries.geojson> <out.mp4> [t_end]
"""
import json, math, os, subprocess, sys
from multiprocessing import Pool
import numpy as np
from PIL import Image
from shapely.geometry import shape

sys.path.insert(0, os.path.dirname(__file__))
from vox import (W, H, FPS, INK, prog, ease_io, ease_out, ease_back, lerp, make_paper, vignette, load_photo,
                 paste_photo, tape, resample, wobble, Pen, highlight, sticky, svg_to_rgba, envelope, esc)
from characters import trang, grad_cap_strokes

G = {}
PAGE = W  # mỗi cảnh một "trang" giấy

# ---------- dữ liệu dựng sẵn ----------
def italy_strokes(geo, box):
    feats = [f for f in json.load(open(geo))["features"] if f["properties"]["ADM0_A3"] == "ITA"]
    g = shape(feats[0]["geometry"])
    polys = sorted(g.geoms if g.geom_type == "MultiPolygon" else [g], key=lambda p: -p.area)[:3]
    x0, y0, x1, y1 = box
    lon0, lat0, lon1, lat1 = 6.5, 36.5, 18.6, 47.2
    k = min((x1 - x0) / ((lon1 - lon0) * 0.72), (y1 - y0) / (lat1 - lat0))
    def P(lon, lat): return (x0 + (lon - lon0) * 0.72 * k, y0 + (lat1 - lat) * k)
    out = []
    for i, p in enumerate(polys):
        pts = [P(*c) for c in p.simplify(0.03).exterior.coords]
        out.append(wobble(resample(pts, 5), 1.2, seed=i))
    return out, P

def init(voice, photos, geo, t_end):
    G["env"] = envelope(voice)
    G["paper"] = make_paper(PAGE * 4 + W)
    G["vig"] = vignette()
    G["ph"] = {n: load_photo(f"{photos}/{n}.jpg", w) for n, w in
               [("stock", 760), ("duomo", 470), ("newspaper", 640), ("papers", 560)]}
    G["italy"], G["P"] = italy_strokes(geo, (1160, 150, 1760, 960))
    G["t_end"] = t_end

# ---------- camera ----------
def cam_x(t):
    keys = [(3.6, 4.6, 0, PAGE), (7.0, 7.9, PAGE, 2 * PAGE), (11.35, 12.25, 2 * PAGE, 3 * PAGE)]
    x = 0
    for a, b, f, to in keys:
        if t >= a:
            x = lerp(f, to, ease_io(prog(t, a, b)))
    return x

# ---------- khung hình ----------
def render(i):
    t = i / FPS
    cx = cam_x(t)
    pen = Pen()

    # nền giấy + ảnh thật (toạ độ thế giới)
    base = Image.fromarray(G["paper"][:, int(cx):int(cx) + W].astype("uint8"))
    def S(x): return x - cx  # world -> screen
    photos = [  # (tên, tâm x thế giới, y, xoay, thời điểm xuất hiện)
        ("stock", PAGE + 1080, 430, -3, 4.35),
        ("duomo", 2 * PAGE + 700, 640, 4, 10.85),
        ("newspaper", 3 * PAGE + 700, 430, -4, 12.2),
        ("papers", 3 * PAGE + 1080, 640, 3, 12.6),
    ]
    tapes = ""
    for name, wx, wy, rot, t0 in photos:
        sx = S(wx)
        if -800 < sx < W + 800 and t >= t0:
            k = ease_out(prog(t, t0, t0 + 0.35))
            card = G["ph"][name]
            paste_photo(base, card, sx, wy, rot, scale=lerp(1.12, 1.0, k), alpha=k)
            tapes += tape(sx - card.width * 0.32, wy - card.height / 2 + 6, 150, rot - 12, k)
            tapes += tape(sx + card.width * 0.32, wy - card.height / 2 + 6, 150, rot + 10, k)
    a = np.asarray(base, dtype=np.float32)

    body = f'<g transform="translate({-cx:.1f},0)">' + tapes

    # ===== Cảnh 1: chào, tên, founder =====
    body += pen.write("Trang", 1180, 470, 190, t, 1.75, 2.45, cid="c1")
    body += pen.stroke(wobble(resample([(1170, 510), (1380, 500), (1620, 512)], 8), 3, 1), t, 2.45, 2.75, width=7)
    body += highlight(1160, 560, 640, 76, t, 2.35, 2.75)
    if t >= 2.4:
        body += (f'<text x="1180" y="618" font-family="Be Vietnam Pro" font-weight="800" font-size="56" fill="{INK}" '
                 f'opacity="{ease_out(prog(t, 2.4, 2.7)):.2f}">FOUNDER · MORA AI</text>')
    star = [(1700 + 34 * math.cos(math.pi / 2 + k * 4 * math.pi / 5), 340 - 34 * math.sin(math.pi / 2 + k * 4 * math.pi / 5)) for k in range(6)]
    body += pen.stroke(resample(star, 5), t, 2.9, 3.4, color="#e0a100", width=6)
    body += pen.write("Xin chào!", 1180, 300, 80, t, 0.9, 1.6, color="#c0392b", cid="c0")

    # ===== Cảnh 2: tài chính =====
    X2 = PAGE
    body += pen.write("Tài chính", X2 + 1080, 900, 96, t, 5.9, 6.6, cid="c2", anchor="middle")
    oval = [(X2 + 1080 + 300 * math.cos(a_), 868 + 78 * math.sin(a_)) for a_ in np.linspace(-0.4, 2 * math.pi + 0.2, 60)]
    body += pen.stroke(wobble(oval, 3, 2), t, 6.6, 7.0, color="#c0392b", width=6)
    chart = [(X2 + 1560, 690), (X2 + 1620, 650), (X2 + 1670, 670), (X2 + 1730, 590), (X2 + 1780, 610), (X2 + 1840, 500)]
    body += pen.stroke(resample([(X2 + 1540, 480), (X2 + 1540, 720), (X2 + 1860, 720)], 6), t, 4.8, 5.2, width=5)
    body += pen.stroke(wobble(resample(chart, 6), 1.5, 3), t, 5.2, 5.8, color="#1a9b55", width=7)
    body += pen.stroke(resample([(X2 + 1810, 505), (X2 + 1840, 500), (X2 + 1832, 530)], 4), t, 5.8, 5.9, color="#1a9b55", width=7)

    # ===== Cảnh 3: MBA tại Ý =====
    X3 = 2 * PAGE
    for k, (pts, a0, a1) in enumerate(zip(G["italy"], (7.9, 9.3, 9.5), (9.3, 9.5, 9.7))):
        pts = [(x + X3, y) for x, y in pts]
        body += pen.stroke(pts, t, a0, a1, width=5, fill_after=("#7fb77e", 0.35 * ease_out(prog(t, a1, a1 + 0.4))))
    body += pen.write("Thạc sĩ", X3 + 330, 250, 96, t, 8.9, 9.4, cid="c3")
    body += pen.write("Quản trị Kinh doanh", X3 + 330, 360, 80, t, 9.4, 10.2, cid="c4")
    body += highlight(X3 + 320, 410, 300, 110, t, 10.25, 10.55, color="#9ad0f5", rot=1)
    if t >= 10.3:
        k = ease_back(prog(t, 10.3, 10.6))
        body += (f'<g transform="translate({X3 + 470},492) scale({k:.3f})"><text text-anchor="middle" font-family="Be Vietnam Pro" '
                 f'font-weight="800" font-size="100" fill="{INK}">MBA</text></g>')
    mx, my = G["P"](9.19, 45.46)
    if t >= 10.75:
        k = ease_back(prog(t, 10.75, 11.05))
        body += (f'<g transform="translate({mx + X3:.1f},{my:.1f}) scale({k:.3f})">'
                 f'<path d="M 0 0 C -30 -40 -30 -80 0 -80 C 30 -80 30 -40 0 0 Z" fill="#c0392b" stroke="{INK}" stroke-width="4"/>'
                 f'<circle cx="0" cy="-55" r="11" fill="#fff"/></g>')
        body += pen.write("Milano", mx + X3 + 40, my - 40, 58, t, 10.9, 11.3, cid="c5")

    # ===== Cảnh 4: nghiên cứu mỗi ngày =====
    X4 = 3 * PAGE
    body += pen.write("Mỗi ngày", X4 + 1450, 230, 100, t, 13.9, 14.5, cid="c6", color="#c0392b", anchor="middle")
    body += pen.stroke(wobble(resample([(X4 + 1250, 260), (X4 + 1650, 252)], 8), 3, 5), t, 14.5, 14.75, color="#c0392b", width=6)
    body += sticky(X4 + 1330, 470, 250, "Deal lớn", "#ffe27a", -6, prog(t, 14.8, 15.1))
    body += sticky(X4 + 1600, 560, 250, "Thị trường", "#ffb3c7", 5, prog(t, 15.15, 15.45))
    body += sticky(X4 + 1440, 800, 250, "Báo cáo\ntài chính", "#a7e3c9", -3, prog(t, 15.5, 15.8))
    body += "</g>"

    # ===== Lớp nhân vật (đứng yên theo màn hình) =====
    mv = ease_io(prog(t, 3.6, 4.3))
    pop = ease_back(prog(t, 0.3, 0.8))
    TX, TY, SC = lerp(600, 270, mv), lerp(1060, 1075, mv) + (1 - pop) * 700, lerp(1.45, 0.9, mv)
    env = G["env"]
    m = float(env[min(len(env) - 1, int(t * FPS))]) if t * FPS < len(env) else 0
    wave = ease_out(prog(t, 0.9, 1.2)) * (1 - ease_out(prog(t, 2.6, 3.0)))
    blink = (i % 110) in (0, 1, 2)
    cap = ""
    if 8.3 <= t < 11.45:
        cpen = Pen()
        board, cbase, tassel = grad_cap_strokes()
        cap += cpen.stroke(resample(cbase, 5), t, 8.3, 8.55, width=6, fill_after=("#1b1b1b", 1.0))
        cap += cpen.stroke(resample(board, 5), t, 8.55, 8.9, width=6, fill_after=("#1b1b1b", 1.0))
        cap += cpen.stroke(resample(tassel, 4), t, 8.9, 9.05, color="#e0a100", width=6)
        if cpen.tip:
            pen.tip = (TX + SC * cpen.tip[0], TY + SC * cpen.tip[1])
    body += (f'<ellipse cx="{TX:.1f}" cy="{TY - 2:.1f}" rx="{120 * SC:.1f}" ry="{14 * SC:.1f}" fill="#000" opacity="0.12"/>'
             f'<g transform="translate({TX:.1f},{TY:.1f}) scale({SC:.3f})">{trang(t, m, wave, blink, cap)}</g>')

    body += pen.draw_pen()
    f = svg_to_rgba(body)
    al = f[..., 3:4] / 255
    out = (a * (1 - al) + f[..., :3] * al) * G["vig"]
    # mờ dần cuối đoạn
    fade = 1 - prog(t, G["t_end"] - 0.35, G["t_end"])
    return np.clip(out * fade + 0 * (1 - fade), 0, 255).astype("uint8").tobytes()

def main(voice, photos, geo, out, t_end=16.4):
    t_end = float(t_end)
    init(voice, photos, geo, t_end)
    n = int(t_end * FPS)
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-ss", "0", "-t", str(t_end), "-i", voice,
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
