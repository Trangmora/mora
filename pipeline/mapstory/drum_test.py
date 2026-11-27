"""Thử 10 giây: trống đồng Đông Sơn 3D (pipeline/artifact3d/drum.js) + chữ 2D + phụ đề, giọng Trang.

python3 pipeline/mapstory/drum_test.py <thư_mục_khung_3D> <thư_mục_giọng> <out.mp4> [giây,giây…]
"""
import io, json, os, subprocess, sys
from multiprocessing import Pool
import numpy as np
import cairosvg
from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
import plaza_1985 as P
from demo import make_texture, outlined
from ftx import build_captions

W, H, FPS = P.W, P.H, 30
G = {}

def word_time(chars, w):
    txt = "".join(c for c, _ in chars)
    return chars[txt.find(w)][1]

def overlay(t):
    M = G["M"]
    s = ""
    k = P.prog(t, M["vh"], M["vh"] + 0.4)
    if k > 0:
        s += P.big(470, 190, "VĂN HÓA", 96, P.YEL, P.BRN, 16, k, -3) + P.big(470, 300, "ĐÔNG SƠN", 116, P.YEL, P.BRN, 18, k, -3)
    k = P.prog(t, M["hn"], M["hn"] + 0.4)
    if k > 0:
        s += (f'<g transform="translate(470,400) scale({P.ease_back(k):.3f})">'
              f'<rect x="-250" y="-46" width="500" height="84" rx="42" fill="#8a2a22" stroke="#141414" stroke-width="6"/>'
              + outlined('y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="46"', "~2.500 năm trước", "#ffffff", "#141414", 6) + "</g>")
    k = P.prog(t, M["td"], M["td"] + 0.4)
    if k > 0:
        s += (f'<g opacity="{min(1, k * 2):.2f}">'
              + outlined(f'x="{W - 80}" y="{H - 200}" text-anchor="end" font-family="DejaVu Serif" font-weight="bold" font-size="44"', "Trống đồng Đông Sơn", "#fff6d8", P.BRN, 9)
              + outlined(f'x="{W - 80}" y="{H - 158}" text-anchor="end" font-family="Inter" font-weight="600" font-size="28"', "(mô phỏng bằng đồ họa máy tính)", "#e8dcc0", P.BRN, 6) + "</g>")
    return s

def render(i):
    t = i / FPS
    n = min(i, G["n"] - 1)
    base = np.asarray(Image.open(f'{G["dir"]}/f{n:05d}.jpg').convert("RGB"), dtype=np.float32)
    base = np.clip(base * G["tex"], 0, 255)
    fg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}">{overlay(t)}{P.caption(t, G["caps"])}</svg>'
    f = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=fg.encode()))).convert("RGBA"), dtype=np.float32)
    a = f[..., 3:4] / 255
    return (base * (1 - a) + f[..., :3] * a).astype("uint8").tobytes()

def init(fdir, vo):
    d = json.load(open(f"{vo}/T_vi.json"))
    ch = d["chars"]["s03"]
    G["M"] = {"vh": word_time(ch, "Văn hóa") if "Văn hóa" in "".join(c for c, _ in ch) else word_time(ch, "văn hóa"),
              "hn": word_time(ch, "hai nghìn"), "td": word_time(ch, "trống đồng")}
    G["dir"] = fdir
    G["n"] = len([f for f in os.listdir(fdir) if f.endswith(".jpg")])
    G["dur"] = G["n"] / FPS
    G["caps"] = build_captions(d["chars"], d["T"], G["dur"])
    G["tex"] = make_texture(W, H) ** 0.5

def main(fdir, vo, out, only=None):
    init(fdir, vo)
    if only:
        for x in only.split(","):
            fr = np.frombuffer(render(int(float(x) * FPS)), np.uint8).reshape(H, W, 3)
            Image.fromarray(fr).resize((W // 2, H // 2)).save(f"{out}_{x}.png")
        return
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-i", f"{vo}/vo_vi.wav", "-af", "apad", "-shortest",
                           "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-c:a", "aac", "-b:a", "192k", out],
                          stdin=subprocess.PIPE)
    with Pool(4, initializer=init, initargs=(fdir, vo)) as pool:
        for fr in pool.imap(render, range(G["n"]), chunksize=4):
            ff.stdin.write(fr)
    ff.stdin.close()
    ff.wait()

if __name__ == "__main__":
    main(*sys.argv[1:5])
