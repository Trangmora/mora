"""Amazon – mở đầu ~25 giây, tiếng Anh, phong cách Vox (giọng Brad, ElevenLabs eleven_v3, nhanh 15%).

Hướng mới (theo nghiên cứu trong story-of-the-company/FORMAT.md):
- Bằng chứng gốc trên màn hình: tiêu đề Barron's 31/5/1999 "Amazon.bomb"; câu mở đầu thư cổ đông năm 2000 của Bezos
  (nguyên văn: "Ouch. It's been a brutal year for many in the capital markets and certainly for Amazon.com shareholders.").
- Người xem là nhân vật: đồng 1.000 đô "của bạn", thẻ "YOUR $1,000" chạy theo đường giá.
- Nền giấy, mực, tô vàng; phần tử chuyển động hơi giật 12 khung/giây (kiểu thủ công), máy quay mượt 30 khung/giây.
Số liệu: đáy 5,97 $ (28/9/2001); đỉnh ~106 $ (12/1999); chia tách 20:1 (2022); 244,43 $ (25/11/2026) → ≈ 818.900 $.
Đường giá giữa các mốc là minh hoạ gần đúng (giá điều chỉnh chia tách).
Chạy: python3 amz_vox20.py            (dựng)    |   python3 amz_vox20.py 3 9.5   (xem khung)
"""
import math
import os
import subprocess
import sys

import numpy as np
from PIL import Image, ImageFilter

sys.path.insert(0, os.path.dirname(__file__))
from vox import W, H, FPS, prog, ease_io, ease_out, ease_back, lerp, esc, svg_to_rgba
from clean_build import Align
from clean import halftone_card
from engine import mix_audio
import amz_hook20 as base  # dùng lại chuỗi giá + máy quay nội suy

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../story-of-the-company"))
B = f"{ROOT}/amazon/build/vox_en"
A = Align(f"{B}/align.json")
SER, price_at, keyed = base.SER, base.price_at, base.keyed
PEAK_Y, LOW_Y, BUY = base.PEAK_Y, base.LOW_Y, base.BUY
X, Y = base.X, base.Y

INK, RED, ORANGE, HL, PAPER = "#1d1b18", "#c8372d", "#e0711f", "#ffd84a", "#efe7d6"
F, MONO, SERIF = "Be Vietnam Pro", "DejaVu Sans Mono", "DejaVu Serif"

tCrash, tUnder, tBar, tBomb, tEven = A("crashed"), A("to under"), A("Barron"), A("Amazon dot"), A("Even Jeff")
tOuch, tBut, tThou, tHow, tMore = A("Ouch"), A("But what"), A("one thousand"), A("How much"), A("More than")
END = tMore + 3.6

DRAW = [(0.0, 1997.38), (tCrash, PEAK_Y), (tUnder + 0.9, LOW_Y), (tHow, LOW_Y), (tMore - 0.15, 2026.9)]
CAM = [(0.0, X(1998.2), Y(0.45), 0.82), (tCrash, X(1999.1), Y(0.9), 0.76), (tUnder + 0.6, X(1999.8), Y(1.0), 0.8),
       (tBar, X(1999.9), Y(1.0), 0.8), (tBut, X(2001.0), Y(0.6), 0.95), (tThou, X(2001.74), Y(BUY), 1.7),
       (tHow + 0.2, X(2002.3), Y(0.55), 1.3), (tMore - 0.1, X(2012.4), Y(4.0), 0.185), (END, X(2012.4), Y(4.0), 0.178)]


def q(t):
    """Thời gian lượng tử 12 khung/giây cho phần tử (cảm giác thủ công kiểu Vox)."""
    return math.floor(t * 12) / 12


def tip_year(t):
    for (t0, y0), (t1, y1) in zip(DRAW, DRAW[1:]):
        if t0 <= t <= t1:
            u = prog(t, t0, t1)
            return lerp(y0, y1, u ** 1.6 if y1 > 2002 else ease_io(u))
    return DRAW[-1][1]


# ---------------------------------------------------------------- giấy
def make_paper():
    rng = np.random.default_rng(3)
    a = np.ones((H, W, 3), np.float32) * np.array([239, 231, 214], np.float32)
    fib = rng.normal(0, 1, (H // 2, W // 2)).astype(np.float32)
    fib = np.asarray(Image.fromarray(((fib * 18) + 128).clip(0, 255).astype("uint8")).resize((W, H), Image.BILINEAR)
                     .filter(ImageFilter.GaussianBlur(1.2)), np.float32) - 128
    a += fib[..., None] * 0.35
    yy, xx = np.mgrid[0:H, 0:W]
    v = 1 - 0.35 * (((xx - W / 2) / W) ** 2 + ((yy - H / 2) / H) ** 2) * 2.2
    return np.clip(a * v[..., None], 0, 255)


PAPER_BG = make_paper()
GRAINS = [np.random.default_rng(10 + i).normal(0, 5, (H, W)).astype(np.float32)[..., None] for i in range(6)]
BEZOS = halftone_card(f"{ROOT}/assets/people/bezos.jpg", 420, crop=(0, 0, 923, 1050), shadow=(200, 55, 45))
BEZOS_RGBA = np.asarray(BEZOS, np.float32)


def card_shadow(x, y, w, h, rot, body, k, sx=14, sy=18, fill="#fbf7ee"):
    s = ease_back(k, 1.6)
    return (f'<g transform="translate({x},{y}) rotate({rot}) scale({s:.3f})" opacity="{min(1, k * 2):.2f}">'
            f'<rect x="{-w / 2 + sx}" y="{-h / 2 + sy}" width="{w}" height="{h}" fill="#000" opacity="0.22"/>'
            f'<rect x="{-w / 2}" y="{-h / 2}" width="{w}" height="{h}" fill="{fill}"/>{body}</g>')


def highlight(x, y, w, h, p):
    return f'<rect x="{x}" y="{y}" width="{w * ease_out(p):.0f}" height="{h}" fill="{HL}" opacity="0.85"/>' if p > 0 else ""


def frame_svg(t):
    ta = q(t)
    cx, cy, z = keyed(CAM, t)
    P = lambda x, y: ((x - cx) * z + W / 2, (y - cy) * z + H / 2)
    g = []
    # trục năm kiểu bản in
    for yr in range(1997, 2027):
        x, _ = P(X(yr), 0)
        if -50 < x < W + 50 and (yr % 5 == 0 or z > 0.5):
            g.append(f'<line x1="{x:.1f}" y1="{H - 120}" x2="{x:.1f}" y2="{H - 100}" stroke="{INK}" stroke-opacity="0.5" stroke-width="2"/>'
                     f'<text x="{x:.1f}" y="{H - 70}" text-anchor="middle" font-family="{MONO}" font-size="22" fill="{INK}" fill-opacity="0.6">{yr}</text>')
    g.append(f'<line x1="0" y1="{H - 110}" x2="{W}" y2="{H - 110}" stroke="{INK}" stroke-opacity="0.35" stroke-width="2"/>')
    # đường giá (đầu đường theo thời gian lượng tử → hơi giật)
    ty = tip_year(ta)
    segs = {"rise": [], "fall": [], "grow": []}
    for yr, p in SER:
        if yr > ty:
            break
        segs["rise" if yr <= PEAK_Y else ("fall" if yr <= LOW_Y else "grow")].append(P(X(yr), Y(p)))
    tp = P(X(ty), Y(price_at(ty)))
    last = "rise" if ty <= PEAK_Y else ("fall" if ty <= LOW_Y else "grow")
    segs[last].append(tp)
    if segs["fall"] and segs["rise"]:
        segs["fall"].insert(0, segs["rise"][-1])
    if segs["grow"]:
        segs["grow"].insert(0, (segs["fall"] or segs["rise"])[-1])
    col = {"rise": INK, "fall": RED, "grow": ORANGE}
    for k, pts in segs.items():
        if len(pts) > 1:
            d = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts)
            g.append(f'<path d="{d}" fill="none" stroke="{col[k]}" stroke-width="{9 if k == "grow" else 7}" stroke-linejoin="round" stroke-linecap="round"/>')
    g.append(f'<circle cx="{tp[0]:.1f}" cy="{tp[1]:.1f}" r="12" fill="{col[last]}"/>')
    # nhãn góc
    if t < tMore:
        k = prog(ta, 0.1, 0.4) * (1 - prog(t, tMore - 0.3, tMore))
        g.append(f'<g opacity="{k:.2f}"><text x="90" y="120" font-family="{F}" font-weight="800" font-size="44" fill="{INK}">AMAZON STOCK</text>'
                 f'<rect x="90" y="138" width="{330 * k:.0f}" height="9" fill="{ORANGE}"/>'
                 f'<text x="90" y="194" font-family="{MONO}" font-size="34" fill="{col[last]}">{int(ty)}</text></g>')
    # đỉnh
    k = prog(ta, tCrash - 0.25, tCrash + 0.1)
    if k > 0 and t < tBut + 0.3:
        x, y = P(X(PEAK_Y), Y(5.33))
        f = 1 - prog(t, tBut, tBut + 0.3)
        g.append(f'<g opacity="{k * f:.2f}"><text x="{x:.0f}" y="{y - 38:.0f}" text-anchor="middle" font-family="{F}" font-weight="800" font-size="62" fill="{INK}">$106</text>'
                 f'<text x="{x:.0f}" y="{y - 108:.0f}" text-anchor="middle" font-family="{MONO}" font-size="24" fill="{INK}" fill-opacity="0.6">DEC 1999</text></g>')
    # đáy + dấu mực -94%
    k = prog(ta, tUnder + 0.85, tUnder + 1.1)
    if k > 0 and t < tBut + 0.3:
        x, y = P(X(LOW_Y), Y(BUY))
        f = 1 - prog(t, tBut, tBut + 0.3)
        g.append(f'<g opacity="{f:.2f}"><text x="{x:.0f}" y="{y + 86:.0f}" text-anchor="middle" font-family="{F}" font-weight="800" font-size="54" fill="{RED}">$5.97</text></g>')
        g.append(f'<g transform="translate({x + 300:.0f},{y - 230:.0f}) rotate(-9) scale({ease_back(k, 2.2):.2f})" opacity="{0.9 * f:.2f}">'
                 f'<rect x="-200" y="-92" width="400" height="164" rx="10" fill="none" stroke="{RED}" stroke-width="9"/>'
                 f'<text y="42" text-anchor="middle" font-family="{F}" font-weight="800" font-size="124" fill="{RED}">-94%</text></g>')
    # lớp giấy mờ phủ biểu đồ khi tài liệu hiện lên (bằng chứng nổi bật)
    veil = prog(ta, tBar - 0.1, tBar + 0.25) * (1 - prog(t, tBut - 0.05, tBut + 0.3))
    if veil > 0:
        g.append(f'<rect width="{W}" height="{H}" fill="{PAPER}" opacity="{0.72 * veil:.2f}"/>')
    # bằng chứng 1: Barron's
    if tBar - 0.1 < t < tEven + 0.25:
        k = prog(ta, tBar - 0.1, tBar + 0.25) * (1 - prog(t, tEven - 0.05, tEven + 0.25))
        hl = prog(ta, tBomb, tBomb + 0.5)
        body = (f'<text x="-370" y="-140" font-family="{SERIF}" font-weight="bold" font-size="44" fill="{INK}">BARRON\'S</text>'
                f'<text x="370" y="-140" text-anchor="end" font-family="{MONO}" font-size="22" fill="#555">MAY 31, 1999</text>'
                f'<line x1="-370" y1="-115" x2="370" y2="-115" stroke="{INK}" stroke-width="3"/>'
                + highlight(-340, -55, 680, 120, hl) +
                f'<text y="40" text-anchor="middle" font-family="{SERIF}" font-weight="bold" font-size="104" fill="{INK}">Amazon.bomb</text>'
                + "".join(f'<rect x="{-370 + c * 250}" y="{110 + r * 24}" width="{220 - (r % 2) * 40}" height="9" fill="#cfc8b8"/>' for c in range(3) for r in range(4)))
        g.append(card_shadow(W / 2 - 200, H / 2 - 30, 860, 440, -4, body, k))
    # bằng chứng 2: thư cổ đông
    if tEven - 0.1 < t < tBut + 0.3:
        k = prog(ta, tEven - 0.05, tEven + 0.3) * (1 - prog(t, tBut - 0.05, tBut + 0.3))
        hl = prog(ta, tOuch - 0.05, tOuch + 0.35)
        lines = ["It's been a brutal year for many in the", "capital markets and certainly for", "Amazon.com shareholders."]
        body = (f'<text x="-330" y="-220" font-family="{MONO}" font-size="22" fill="#666">AMAZON.COM · 2000 ANNUAL REPORT</text>'
                f'<text x="-330" y="-150" font-family="{SERIF}" font-size="34" fill="{INK}">To our shareholders:</text>'
                + highlight(-338, -112, 196, 68, hl) +
                f'<text x="-330" y="-62" font-family="{SERIF}" font-weight="bold" font-size="56" fill="{INK}">Ouch.</text>'
                + "".join(f'<text x="-330" y="{-2 + i * 46}" font-family="{SERIF}" font-size="31" fill="{INK}">{esc(s)}</text>' for i, s in enumerate(lines))
                + "".join(f'<rect x="-330" y="{150 + r * 26}" width="{640 - (r % 3) * 70}" height="9" fill="#d3ccbc"/>' for r in range(4))
                + f'<text x="-330" y="282" font-family="{SERIF}" font-style="italic" font-size="30" fill="{INK}">Jeffrey P. Bezos</text>')
        g.append(card_shadow(W / 2 + 150, H / 2 + 10, 760, 620, 2.5, body, k))
    # đồng 1.000 đô "của bạn"
    if t >= tThou - 0.35:
        x, y = P(X(LOW_Y), Y(BUY))
        k = prog(ta, tThou - 0.35, tThou + 0.15)
        drop = (1 - ease_out(k)) * -650
        bounce = math.sin(prog(ta, tThou + 0.15, tThou + 0.5) * math.pi) * -16
        f = 1 - prog(t, tHow + 0.3, tHow + 0.8)
        if f > 0:
            yc = y - 95 + drop + bounce
            g.append(f'<g opacity="{f:.2f}"><circle cx="{x:.0f}" cy="{yc:.0f}" r="80" fill="{HL}" stroke="{INK}" stroke-width="5"/>'
                     f'<text x="{x:.0f}" y="{yc + 15:.0f}" text-anchor="middle" font-family="{F}" font-weight="800" font-size="42" fill="{INK}">$1,000</text>'
                     f'<path d="M {x + 95:.0f} {yc - 60:.0f} L {x + 190:.0f} {yc - 130:.0f}" stroke="{INK}" stroke-width="5"/>'
                     f'<text x="{x + 200:.0f}" y="{yc - 140:.0f}" font-family="{F}" font-weight="800" font-size="50" fill="{RED}" opacity="{prog(ta, tThou + 0.3, tThou + 0.5):.2f}">YOU</text></g>')
    # thẻ "YOUR $1,000" chạy theo năm (góc phải)
    if t >= tHow + 0.2:
        k = prog(ta, tHow + 0.2, tHow + 0.5) * (1 - prog(t, tMore, tMore + 0.3))
        if k > 0:
            val = 1000 * price_at(ty) / BUY
            body = (f'<text x="-220" y="-40" font-family="{MONO}" font-size="24" fill="#666">YOUR $1,000 · {int(ty)}</text>'
                    f'<text x="-220" y="50" font-family="{F}" font-weight="800" font-size="78" fill="{INK}">${val:,.0f}</text>')
            g.append(card_shadow(W - 330, 170, 480, 190, -2, body, k))
    # hé lộ
    if t >= tMore:
        k = prog(ta, tMore, tMore + 0.3)
        g.append(f'<rect width="{W}" height="{H}" fill="{PAPER}" opacity="{0.78 * k:.2f}"/>')
        hl = prog(ta, tMore + 0.5, tMore + 1.0)
        s = ease_back(k, 1.5)
        g.append(f'<g transform="translate({W / 2},{H / 2 - 40}) scale({s:.3f})">'
                 f'<text y="-170" text-anchor="middle" font-family="{MONO}" font-size="30" fill="#555">$1,000 IN SEPT 2001 IS NOW WORTH</text>'
                 + highlight(-560, -30, 1120, 95, hl) +
                 f'<text y="60" text-anchor="middle" font-family="{F}" font-weight="800" font-size="210" fill="{INK}">$818,900</text></g>')
        k2 = prog(ta, tMore + 1.2, tMore + 1.45)
        if k2 > 0:
            g.append(f'<g transform="translate({W / 2},{H / 2 + 190}) rotate(-4) scale({ease_back(k2, 2.2):.2f})" opacity="0.92">'
                     f'<rect x="-310" y="-70" width="620" height="120" rx="10" fill="none" stroke="{RED}" stroke-width="8"/>'
                     f'<text y="22" text-anchor="middle" font-family="{F}" font-weight="800" font-size="74" fill="{RED}">819 TIMES</text></g>')
        g.append(f'<text x="{W / 2}" y="{H - 30}" text-anchor="middle" font-family="{MONO}" font-size="18" fill="#555" opacity="{k:.2f}">'
                 f'Illustrative: bought at the Sep 28, 2001 low ($5.97), split-adjusted; price on Nov 25, 2026: $244.43. Not investment advice.</text>')
    # chú thích nguồn (kiểu Vox)
    src = None
    if tBar < t < tEven:
        src = "SOURCE: BARRON'S, MAY 31, 1999"
    elif tEven < t < tBut:
        src = "SOURCE: AMAZON.COM 2000 LETTER TO SHAREHOLDERS"
    elif tUnder + 0.9 < t < tBar:
        src = "SOURCE: AMAZON 10-K405 (2001)"
    if src:
        g.append(f'<text x="{W - 60}" y="{H - 30}" text-anchor="end" font-family="{MONO}" font-size="18" fill="#555">{src}</text>')
    return "".join(g)


def frame(t):
    ta = q(t)
    out = PAPER_BG.copy()
    ov = svg_to_rgba(frame_svg(t))
    al = ov[..., 3:4] / 255.0
    out = out * (1 - al) + ov[..., :3] * al
    # ảnh Bezos (halftone) cạnh lá thư
    if tEven - 0.1 < t < tBut + 0.3:
        k = prog(ta, tEven + 0.15, tEven + 0.5) * (1 - prog(t, tBut - 0.05, tBut + 0.3))
        if k > 0:
            img = BEZOS.rotate(-4, resample=Image.BICUBIC, expand=True)
            s = 0.85 + 0.15 * ease_back(k, 1.4)
            img = img.resize((int(img.width * s), int(img.height * s)))
            a = np.asarray(img, np.float32)
            x0, y0 = 250 - img.width // 2 + 120, H // 2 - img.height // 2 + 20
            sub = out[y0:y0 + img.height, x0:x0 + img.width]
            al = a[..., 3:4] / 255 * k
            out[y0:y0 + img.height, x0:x0 + img.width] = sub * (1 - al) + a[..., :3] * al
    out = out + GRAINS[int(ta * 12) % len(GRAINS)]
    f = min(1.0, t / 0.3, max(0.0, (END - t) / 0.5))
    return np.clip(out * f, 0, 255).astype(np.uint8)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        for s in sys.argv[1:]:
            Image.fromarray(frame(float(s))).resize((960, 540)).save(f"{B}/f_{s}.jpg")
        sys.exit()
    events = [(tUnder + 0.85, "hit", 0.3), (tBomb, "paper", 0.25), (tEven, "paper", 0.25), (tThou + 0.1, "coin", 0.3),
              (tHow + 0.2, "riser", 0.22), (tMore - 0.02, "cash", 0.3)]
    mix_audio(f"{B}/voice.wav", [f"{ROOT}/assets/audio/music2.mp3"], f"{ROOT}/assets/audio", events, [],
              f"{B}/mix.wav", END, music_db=-27)
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
           "-i", "-", "-i", f"{B}/mix.wav", "-c:a", "aac", "-b:a", "192k", "-shortest", "-c:v", "libx264", "-pix_fmt",
           "yuv420p", "-crf", "18", f"{B}/amazon_vox_en.mp4"]
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for i in range(int(END * FPS)):
        p.stdin.write(frame(i / FPS).tobytes())
    p.stdin.close()
    p.wait()
    print("xong", END)
