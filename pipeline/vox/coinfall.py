"""Định dạng mới: "BIỂU ĐỒ VẬT LÝ" – mỗi đồng xu là 1$, rơi qua bàn đinh thật (mô phỏng pymunk),
chất thành cột trong từng ngăn → chính đống xu là biểu đồ cột. Số liệu thật, nguồn ghi ở dưới.
Dọc 1080×1920 cho Shorts/TikTok/Reels. Không AI, không ảnh – chi phí 0$.

python3 coinfall.py <sfx_dir> <out.mp4>
"""
import os, random, subprocess, sys
import numpy as np
import pymunk
from PIL import Image, ImageDraw, ImageFilter, ImageFont

sys.path.insert(0, os.path.dirname(__file__))
import clean as C

W, H, FPS = 1080, 1920, 30
DUR = 10.0
F_XB = "/root/.fonts/BeVietnamPro-ExtraBold.ttf"
RED, BLACK, CREAM = (215, 38, 30), (28, 28, 28), (246, 241, 230)
GOLD = (242, 182, 50)
font = lambda s: ImageFont.truetype(F_XB, s)

# ---- dữ liệu (1 xu = 1$) ----
CATS = [  # (nhãn, dòng phụ, màu xu, số xu, tâm ngăn x)
    ("DOANH NGHIỆP", "API · CLAUDE CODE", GOLD, 80, 375),
    ("GÓI THÁNG", "PRO · MAX", RED, 20, 705),
]
TITLE1, TITLE2 = "CỨ 100$ CLAUDE KIẾM ĐƯỢC", "ĐẾN TỪ ĐÂU?"
END1, END2 = "80% LÀ TIỀN", "CỦA DOANH NGHIỆP"
SOURCE = "Nguồn: hồ sơ S-1 của Anthropic, 6 tháng đầu 2026 (làm tròn)"

R = 17                       # bán kính xu
BIN_TOP, BIN_BOT, BIN_W = 1150, 1740, 220
PEG_Y0, PEG_ROWS, PEG_DX, PEG_DY = 470, 7, 78, 68
T_SPAWN0, T_SPAWN1 = 0.5, 4.1

def build_space():
    sp = pymunk.Space()
    sp.gravity = (0, 2300)
    st = sp.static_body
    segs = []
    def wall(a, b, r=4, cat=None):
        s = pymunk.Segment(st, a, b, r)
        s.elasticity, s.friction = 0.3, 0.15
        if cat is not None:  # cửa phân loại: chỉ đỡ xu cùng màu, xu khác màu rơi xuyên qua
            s.filter = pymunk.ShapeFilter(categories=0b100 << cat)
            s.friction = 0.15
        sp.add(s)
        segs.append((a, b, r, cat))
    # hai nửa tách bởi vách giữa: xu vàng rơi bên trái, xu đỏ bên phải → mỗi nửa một ngăn (cột)
    wall((110, 300), (110, 1000)); wall((970, 300), (970, 1000)); wall((540, 300), (540, 1000), 6)
    for x_out, x_in, (_, _, _, _, cx) in ((110, 540, CATS[0]), (970, 540, CATS[1])):
        x0, x1 = sorted((cx - BIN_W / 2, cx + BIN_W / 2))
        near_out, near_in = (x0, x1) if x_out < x_in else (x1, x0)
        wall((x_out, 1000), (near_out, BIN_TOP), 6); wall((x_in, 1000), (near_in, BIN_TOP), 6)
        wall((x0, BIN_TOP), (x0, BIN_BOT), 6); wall((x1, BIN_TOP), (x1, BIN_BOT), 6)
        wall((x0, BIN_BOT), (x1, BIN_BOT), 6)
    pegs = []
    for r in range(PEG_ROWS):
        n = 11 if r % 2 == 0 else 10
        off = 540 - (n - 1) * PEG_DX / 2
        for i in range(n):
            p = (off + i * PEG_DX, PEG_Y0 + r * PEG_DY)
            if abs(p[0] - 540) < 50 or p[0] < 160 or p[0] > 920:
                continue
            c = pymunk.Circle(st, 9, p)
            c.elasticity, c.friction = 0.5, 0.05
            sp.add(c)
            pegs.append(p)
    return sp, segs, pegs

def simulate():
    random.seed(4)
    sp, segs, pegs = build_space()
    order = [i for i, c in enumerate(CATS) for _ in range(c[3])]
    random.shuffle(order)
    n = len(order)
    spawn_t = [T_SPAWN0 + (T_SPAWN1 - T_SPAWN0) * k / (n - 1) for k in range(n)]
    coins, landed, frames = [], [], []
    sub = 8
    dt = 1 / FPS / sub
    for f in range(int(DUR * FPS)):
        t = f / FPS
        while len(coins) < n and spawn_t[len(coins)] <= t:
            b = pymunk.Body(1, pymunk.moment_for_circle(1, 0, R))
            b.position = (CATS[order[len(coins)]][4] + random.uniform(-70, 70), 380)
            b.velocity = (random.uniform(-80, 80), 0)
            s = pymunk.Circle(b, R)
            s.elasticity, s.friction = 0.35, 0.3
            sp.add(b, s)
            coins.append(b)
            landed.append(None)
        for _ in range(sub):
            sp.step(dt)
        if f >= 12:  # xu gần như không đi xuống trong 0,4 giây (kẹt trên đinh) → hích nhẹ cho rơi tiếp
            prev = frames[f - 12]
            for k, b in enumerate(coins[:len(prev)]):
                if b.position.y < 1000 and b.position.y - prev[k][1] < 25:
                    b.velocity = (random.choice((-1, 1)) * 120, 150)
        for k, b in enumerate(coins):
            if landed[k] is None and b.position.y > BIN_TOP + 10:
                landed[k] = t
        frames.append([(b.position.x, b.position.y, b.angle, order[k]) for k, b in enumerate(coins)])
    return frames, landed, order, segs, pegs

# ---------- hình ----------
def coin_sprite(color, rot):
    s = 4 * R + 8
    im = Image.new("RGBA", (s * 2, s * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    c, rr = s, 2 * R
    d.ellipse((c - rr, c - rr, c + rr, c + rr), fill=color + (255,), outline=BLACK + (255,), width=5)
    d.ellipse((c - rr + 9, c - rr + 9, c + rr - 9, c + rr - 9), outline=tuple(int(v * 0.72) for v in color) + (255,), width=3)
    d.text((c, c + 1), "$", font=font(int(rr * 1.1)), fill=BLACK + (255,), anchor="mm")
    im = im.rotate(-np.degrees(rot), resample=Image.BICUBIC)
    return im.resize((s, s), Image.LANCZOS)

def shadowed(layer, off=(9, 11), blur=7, alpha=0.38):
    a = layer.split()[3].filter(ImageFilter.GaussianBlur(blur))
    sh = Image.new("RGBA", layer.size, (40, 30, 20, 0))
    sh.putalpha(a.point(lambda v: int(v * alpha)))
    out = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    out.alpha_composite(sh, off)
    out.alpha_composite(layer)
    return out

def static_layer(segs, pegs):
    L = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(L)
    for _, _, _, _, cx in CATS:  # ngăn: miếng giấy kem dán lên nền
        d.rectangle((cx - BIN_W / 2, BIN_TOP, cx + BIN_W / 2, BIN_BOT), fill=CREAM + (255,))
    for a, b, r, cat in segs:
        if cat is not None:
            d.line((a, b), fill=BLACK + (255,), width=int(r * 2 + 6))
            d.line((a, b), fill=CATS[cat][2] + (255,), width=int(r * 2 - 2))
            continue
        d.line((a, b), fill=BLACK + (255,), width=int(r * 2))
        for p in (a, b):
            d.ellipse((p[0] - r, p[1] - r, p[0] + r, p[1] + r), fill=BLACK + (255,))
    for x, y in pegs:
        d.ellipse((x - 9, y - 9, x + 9, y + 9), fill=BLACK + (255,))
    for name, subl, col, _, cx in CATS:
        d.text((cx, BIN_BOT + 40), name, font=font(36), fill=BLACK + (255,), anchor="mm")
        d.text((cx, BIN_BOT + 82), subl, font=font(24), fill=RED + (255,), anchor="mm")
    return shadowed(L)

def text_card(lines, pad=(46, 30), rot=-2.5):
    """Mảnh giấy cắt (kem) có bóng đổ – chữ đỏ/đen."""
    fs = [font(s) for _, s, _ in lines]
    ws = [f.getbbox(t)[2] for (t, _, _), f in zip(lines, fs)]
    hs = [int(s * 1.18) for _, s, _ in lines]
    cw, ch = max(ws) + pad[0] * 2, sum(hs) + pad[1] * 2
    im = Image.new("RGBA", (cw + 60, ch + 60), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.polygon([(30, 34), (cw + 26, 30), (cw + 30, ch + 26), (34, ch + 30)], fill=CREAM + (255,))
    y = 30 + pad[1]
    for (t, s, col), f, h in zip(lines, fs, hs):
        d.text((30 + cw / 2, y + h / 2), t, font=f, fill=col + (255,), anchor="mm")
        y += h
    return shadowed(im.rotate(rot, resample=Image.BICUBIC, expand=True), (12, 16), 10, 0.45)

def ease_back(k, s=1.6):
    k -= 1
    return k * k * ((s + 1) * k + s) + 1

def paste_pop(canvas, im, cx, cy, k):
    if k <= 0:
        return
    sc = max(0.01, ease_back(min(1, k)))
    w, h = int(im.width * sc), int(im.height * sc)
    canvas.alpha_composite(im.resize((max(1, w), max(1, h)), Image.BICUBIC), (int(cx - w / 2), int(cy - h / 2)))

# Video NGANG cho YouTube: mô phỏng vẫn chạy trong "bàn" dọc (toạ độ thế giới W×H), rồi bàn được thu nhỏ đặt bên phải
# khung 1920×1080; tiêu đề, thẻ kết, nguồn nằm bên trái.
OW, OH = 1920, 1080
CROP = (90, 270, 990, 1850)            # vùng bàn trong toạ độ thế giới
BS = (OH - 40) / (CROP[3] - CROP[1])   # tỉ lệ thu
BX, BY = 1360 - (CROP[2] - CROP[0]) * BS / 2, 20
LX = 560                               # tâm cột chữ bên trái

def main(sfx_dir, out):
    frames, landed, order, segs, pegs = simulate()
    bg = C.make_oldgrid(OW, OH, cell=108).convert("RGBA")
    sd = ImageDraw.Draw(bg)
    sd.text((LX, 600), "1 ĐỒNG XU = 1$", font=font(40), fill=BLACK + (255,), anchor="mm")
    sd.text((LX, 1035), SOURCE, font=font(24), fill=(90, 86, 80, 255), anchor="mm")
    board0 = static_layer(segs, pegs)
    sprites = {(ci, a): shadowed(coin_sprite(CATS[ci][2], a * np.pi / 18), (5, 7), 4, 0.35)
               for ci in range(len(CATS)) for a in range(36)}
    t1 = text_card([(TITLE1, 60, RED), (TITLE2, 104, BLACK)])
    endc = text_card([(END1, 76, BLACK), (END2, 92, RED)], rot=2)
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{OW}x{OH}",
                           "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18",
                           out.replace(".mp4", "_v.mp4")], stdin=subprocess.PIPE)
    bw, bh = int((CROP[2] - CROP[0]) * BS), int((CROP[3] - CROP[1]) * BS)
    for f, cs in enumerate(frames):
        t = f / FPS
        bd = board0.copy()
        sp0 = sprites[(0, 0)]
        for x, y, a, ci in cs:
            s = sprites[(ci, int(round(np.degrees(a) / 10)) % 36)]
            bd.alpha_composite(s, (int(x - sp0.width / 2), int(y - sp0.height / 2)))
        d = ImageDraw.Draw(bd)
        for ci, (_, _, _, n, cx) in enumerate(CATS):
            cnt = sum(1 for k, lt in enumerate(landed) if lt is not None and lt <= t and order[k] == ci)
            if cnt:
                d.text((cx, BIN_TOP + 70), f"{cnt}$", font=font(96), fill=BLACK + (255,), anchor="mm",
                       stroke_width=8, stroke_fill=CREAM + (255,))
        cv = bg.copy()
        cv.alpha_composite(bd.crop(CROP).resize((bw, bh), Image.LANCZOS), (int(BX), BY))
        paste_pop(cv, t1, LX, 330, (t - 0.1) / 0.45)
        if t > 7.4:
            k = (t - 7.4) / 0.45
            ov = Image.new("RGBA", (OW, OH), (20, 16, 12, int(90 * min(1, k))))
            cv.alpha_composite(ov)
            paste_pop(cv, endc, LX, 790, k)
        fade = min(1, t / 0.25, (DUR - t) / 0.35)
        arr = np.asarray(cv.convert("RGB"), dtype=np.float32) * max(0, fade)
        ff.stdin.write(arr.astype("uint8").tobytes())
    ff.stdin.close(); ff.wait()
    # ---------- âm thanh: tiếng xu rất nhỏ khi rơi vào ngăn + nhạc nền rất nhỏ ----------
    sr = 44100
    load = lambda p: np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-f", "f32le", "-ac", "1", "-ar", str(sr), "-"],
                                                  capture_output=True).stdout, dtype=np.float32)
    mix = np.zeros(int(DUR * sr) + sr, np.float32)
    coin = load(os.path.join(sfx_dir, "coin.mp3"))[: int(0.35 * sr)]
    coin = coin / (np.abs(coin).max() + 1e-9)
    last = -1
    rng = np.random.default_rng(2)
    for lt in sorted(x for x in landed if x is not None):
        if lt - last < 0.07:
            continue
        last = lt
        i = int(lt * sr)
        g = 10 ** (rng.uniform(-24, -18) / 20)
        mix[i:i + len(coin)] += coin[: len(mix) - i] * g
    ding = load(os.path.join(sfx_dir, "ding.mp3"))
    i = int(7.45 * sr)
    mix[i:i + len(ding)] += ding[: len(mix) - i] / (np.abs(ding).max() + 1e-9) * 10 ** (-16 / 20)
    mus = load(os.path.join(sfx_dir, "music2.mp3"))[: len(mix)]
    mus = mus / (np.abs(mus).max() + 1e-9) * 10 ** (-26 / 20)
    mix[: len(mus)] += mus
    env = np.minimum(1, np.minimum(np.arange(len(mix)) / (0.3 * sr), (DUR * sr - np.arange(len(mix))) / (0.5 * sr)).clip(0))
    mix = (mix * env)[: int(DUR * sr)]
    wav = out.replace(".mp4", "_a.f32")
    mix.astype(np.float32).tofile(wav)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", out.replace(".mp4", "_v.mp4"), "-f", "f32le", "-ar", str(sr), "-ac", "1",
                    "-i", wav, "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", out], check=True)

if __name__ == "__main__":
    main(*sys.argv[1:])
