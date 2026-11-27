"""Thử 10 giây: nền địa cầu 3D (three.js, pipeline/globe3d) + lớp 2D của tập Plaza 1985 (nhân vật, hàng hóa bay, núi thâm hụt, nhãn, phụ đề).

python3 pipeline/mapstory/plaza_globe_test.py <thư_mục_khung_3D (fXXXXX.jpg + cams.json)> <thư_mục_giọng> <out.mp4> [giây,giây…]

Lớp 2D bám vị trí trên địa cầu nhờ ma trận máy quay của từng khung (cams.json do capture.cjs xuất).
"""
import io, json, math, os, subprocess, sys
from multiprocessing import Pool
import numpy as np
import cairosvg
from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
import plaza_1985 as P
from demo import make_texture
from ftx import build_captions

W, H, FPS = P.W, P.H, 30
G = {}

def projector(pv, cam):
    M = np.array(pv, dtype=np.float64).reshape(4, 4).T  # three.js lưu theo cột
    C = np.array(cam)
    def to_px(lon, lat, r=1.0):
        if lon > 180:
            lon -= 360
        la, lo = math.radians(lat), math.radians(lon)
        p = np.array([r * math.cos(la) * math.cos(lo), r * math.sin(la), -r * math.cos(la) * math.sin(lo)])
        x, y, z, w = M @ np.append(p, 1.0)
        return (x / w + 1) / 2 * W, (1 - y / w) / 2 * H
    def visible(lon, lat):
        if lon > 180:
            lon -= 360
        la, lo = math.radians(lat), math.radians(lon)
        p = np.array([math.cos(la) * math.cos(lo), math.sin(la), -math.cos(la) * math.sin(lo)])
        return float(np.dot(p, C - p)) > 0.02
    return to_px, visible

def render(i):
    t = i / FPS
    T = G["T"]
    c = G["cams"][min(i, len(G["cams"]) - 1)]
    to_px, vis = projector(c["pv"], c["cam"])
    P.G["to_px"] = to_px
    base = np.asarray(Image.open(f'{G["dir"]}/f{min(i, len(G["cams"]) - 1):05d}.jpg').convert("RGB"), dtype=np.float32)
    base = np.clip(base * G["tex"], 0, 255)
    lab = ""
    if vis(141, 36):
        x, y = to_px(150, 29)
        lab += P.lbl(x + 70, y, "NHẬT BẢN", 56, -6, P.prog(t, T["s02"] + 0.5, T["s02"] + 1.0))
    if vis(-100, 40):
        x, y = to_px(-121, 47)
        lab += P.lbl(x - 60, y, "HOA KỲ", 62, -4, P.prog(t, T["s03"] + 0.2, T["s03"] + 0.7))
    fg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}">'
          + lab + P.scene_goods(t, T) + P.scene_deficit(t, T) + P.characters(t, T) + P.caption(t, G["caps"]) + "</svg>")
    f = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=fg.encode()))).convert("RGBA"), dtype=np.float32)
    a = f[..., 3:4] / 255
    return (base * (1 - a) + f[..., :3] * a).astype("uint8").tobytes()

def init(fdir, vo):
    d = json.load(open(f"{vo}/T_vi.json"))
    T = dict(d["T"])
    T.update({"s01": -20, "s01_end": -19})
    for k in range(4, 16):  # các câu sau không có trong đoạn thử: đẩy ra xa
        T[f"s{k:02d}"] = 900 + k; T[f"s{k:02d}_end"] = 900.5 + k
    G["T"] = T
    G["cams"] = json.load(open(f"{fdir}/cams.json"))
    G["dir"] = fdir
    G["dur"] = len(G["cams"]) / FPS
    G["caps"] = build_captions(d["chars"], d["T"], G["dur"])
    G["tex"] = make_texture(W, H) ** 0.6  # vân giấy + tối góc nhẹ hơn bản 2D

def main(fdir, vo, out, only=None):
    init(fdir, vo)
    if only:
        for x in only.split(","):
            fr = np.frombuffer(render(int(float(x) * FPS)), np.uint8).reshape(H, W, 3)
            Image.fromarray(fr).resize((W // 2, H // 2)).save(f"{out}_{x}.png")
        return
    n = len(G["cams"])
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-i", f"{vo}/vo_vi.wav", "-af", "apad", "-shortest",
                           "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-c:a", "aac", "-b:a", "192k", out],
                          stdin=subprocess.PIPE)
    with Pool(4, initializer=init, initargs=(fdir, vo)) as pool:
        for fr in pool.imap(render, range(n), chunksize=4):
            ff.stdin.write(fr)
    ff.stdin.close()
    ff.wait()

if __name__ == "__main__":
    main(*sys.argv[1:5])
