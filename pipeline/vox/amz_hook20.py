"""Amazon – mở đầu 20 giây "1.000 đô năm 2001 thành bao nhiêu?" (video ngang 1920x1080).

Ý tưởng: máy quay bay dọc đường giá cổ phiếu Amazon. Đỉnh 1999 → sụp 94% (rung màn hình, đường chuyển đỏ)
→ chấm đỏ đập như nhịp tim "sắp chết" → đồng 1.000 đô rơi xuống đáy → đường giá vút lên, đồng hồ tiền chạy
theo đầu đường → hé lộ: hơn 800 nghìn đô / hơn 20 tỷ đồng.

Số liệu (kiểm chứng 27/11/2026): đáy 5,97 $ (28/9/2001, 10-K405 năm 2001); đỉnh ~106 $ (12/1999);
chia tách 20:1 năm 2022; đóng cửa 244,43 $ (25/11/2026, stockanalysis.com).
1.000 / 5,97 x 20 x 244,43 ≈ 818.900 $. Tiêu đề Barron's 31/5/1999: "Amazon.bomb".
Đường giá giữa các mốc là MINH HOẠ gần đúng (giá đã điều chỉnh chia tách, mốc theo năm).
Giọng: clone "Trang giọng việt" (ElevenLabs eleven_v3).
"""
import json
import math
import os
import subprocess
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

sys.path.insert(0, os.path.dirname(__file__))
from vox import W, H, FPS, prog, ease_io, ease_out, ease_back, lerp, esc, svg_to_rgba
from clean_build import Align
from engine import mix_audio

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../story-of-the-company"))
LANG = os.environ.get("AMZ_LANG", "vi")
B = f"{ROOT}/amazon/build/hook" + ("" if LANG == "vi" else "_en")
A = Align(f"{B}/align.json")
VI = LANG == "vi"
TX = {k: (v if VI else e) for k, (v, e) in {
    "stock": ("CỔ PHIẾU AMAZON", "AMAZON STOCK"), "peak": ("12/1999", "DEC 1999"), "low": ("$5,97", "$5.97"),
    "coin": ("$1.000", "$1,000"), "vnd": ("≈ 15 TRIỆU ĐỒNG", "JUST $1,000"), "yours": ("TIỀN CỦA BẠN · 9/2001", "YOUR BET · SEP 2001"),
    "have": ("NĂM {y} · BẠN ĐANG CÓ", "{y} · YOU NOW HAVE"), "then": ("1.000 ĐÔ NĂM 2001, HÔM NAY THÀNH", "$1,000 IN 2001 IS NOW WORTH"),
    "total": ("$818.900", "$818,900"), "banner": ("HƠN 20 TỶ ĐỒNG", "819 TIMES YOUR MONEY"),
    "date": ("31/5/1999", "MAY 31, 1999"),
    "note": ("Ví dụ minh hoạ, mua đúng đáy 28/9/2001 ($5,97), giá đã điều chỉnh chia tách; giá 25/11/2026: $244,43. Không phải lời khuyên đầu tư.",
             "Illustrative example: bought at the Sep 28, 2001 low ($5.97), split-adjusted; price on Nov 25, 2026: $244.43. Not investment advice."),
}.items()}
CUE = dict(zip("roi xuong bao bomb chet nhung nghin m15 homnay hon tuc".split(),
               ["rơi", "xuống", "Báo chí", "Amazon chấm", "Ai cũng", "Nhưng", "một nghìn", "khoảng mười", "thì hôm", "Hơn tám", "Tức là"] if VI else
               ["crashed", "to under", "Barron", "Amazon dot", "Everyone", "But what", "one thousand", "one thousand", "How much", "More than", "That's"]))

GOLD, RED, WHITE, DIM = "#f5b941", "#ff4b3e", "#f3efe6", "#8b8f99"
F = "Be Vietnam Pro"

# ---------------------------------------------------------------- dữ liệu giá (đã điều chỉnh chia tách)
ANCH = [(1997.38, .075), (1997.9, .11), (1998.5, .45), (1998.95, 1.3), (1999.3, 3.9), (1999.6, 2.6),
        (1999.94, 5.33), (2000.3, 3.3), (2000.6, 1.7), (2000.98, .78), (2001.3, .55), (2001.74, .2985),
        (2002.3, .85), (2002.98, .95), (2003.98, 2.6), (2004.5, 1.9), (2004.98, 2.2), (2005.98, 2.35),
        (2006.55, 1.35), (2007.9, 4.6), (2008.9, 1.6), (2009.98, 6.7), (2010.98, 9.0), (2011.98, 8.7),
        (2012.98, 12.6), (2013.98, 19.9), (2014.98, 15.5), (2015.98, 33.8), (2016.98, 37.5), (2017.98, 58.5),
        (2018.7, 100), (2018.98, 75), (2019.98, 92.4), (2020.98, 162.8), (2021.6, 186), (2022.98, 84),
        (2023.98, 152), (2024.98, 219), (2025.5, 220), (2025.98, 230), (2026.9, 244.43)]
PEAK_Y, LOW_Y, BUY = 1999.94, 2001.74, .2985


def series(step=0.02):
    rng = np.random.default_rng(7)
    pts = []
    for (y0, p0), (y1, p1) in zip(ANCH, ANCH[1:]):
        n = max(2, int((y1 - y0) / step))
        noise = np.cumsum(rng.normal(0, 0.035, n))
        noise -= np.linspace(noise[0], noise[-1], n)  # bằng 0 ở hai mốc
        for i in range(n):
            u = i / n
            lp = lerp(math.log10(p0), math.log10(p1), ease_io(u) * 0.6 + u * 0.4) + noise[i] * 0.5
            pts.append((y0 + (y1 - y0) * u, 10 ** lp))
    pts.append(ANCH[-1])
    return pts


SER = series()
X = lambda yr: (yr - 1997) * 300
Y = lambda p: -math.log10(p) * 600


def price_at(yr):
    for (a, p), (b, q) in zip(SER, SER[1:]):
        if a <= yr <= b:
            return lerp(p, q, (yr - a) / (b - a))
    return SER[-1][1]


# ---------------------------------------------------------------- mốc lời
tRoi, tXuong, tBao, tBomb, tChet = [A(CUE[k]) for k in "roi xuong bao bomb chet".split()]
tNhung, tNghin, t15, tHomnay, tHon, tTuc = [A(CUE[k]) for k in "nhung nghin m15 homnay hon tuc".split()]
if not VI:
    t15 += 0.7
END = tTuc + 3.7

# tiến trình vẽ đường (năm của đầu đường theo thời gian)
DRAW = [(0.0, 1997.38), (tRoi, PEAK_Y), (tXuong + 0.9, LOW_Y), (tHomnay, LOW_Y), (tHon - 0.15, 2026.9)]
# máy quay: (t, cx, cy, zoom)
CAM = [(0.0, X(1998.1), Y(0.35), 0.85), (tRoi, X(1999.0), Y(0.95), 0.74), (tXuong + 0.6, X(1999.9), Y(1.1), 0.82),
       (tBao, X(2000.0), Y(1.1), 0.8), (tChet, X(2000.8), Y(0.7), 0.95), (tNhung + 0.2, X(2001.74), Y(BUY), 1.6),
       (t15 + 0.6, X(2001.74), Y(BUY), 1.75), (tHomnay + 0.3, X(2002.6), Y(0.6), 1.2),
       (tHon - 0.1, X(2012.4), Y(4.0), 0.185), (END, X(2012.4), Y(4.0), 0.175)]


def keyed(table, t):
    for (t0, *a), (t1, *b) in zip(table, table[1:]):
        if t0 <= t <= t1:
            u = ease_io(prog(t, t0, t1))
            return [lerp(x, y, u) for x, y in zip(a, b)]
    return list(table[-1][1:]) if t > table[-1][0] else list(table[0][1:])


def tip_year(t):
    seg = DRAW
    for (t0, y0), (t1, y1) in zip(seg, seg[1:]):
        if t0 <= t <= t1:
            u = prog(t, t0, t1)
            if y1 > 2002:  # đoạn tăng trưởng: chậm đầu, tăng tốc cuối
                u = u ** 1.6
            else:
                u = ease_io(u)
            return lerp(y0, y1, u)
    return seg[-1][1]


def shake(t):
    k = max(0.0, 1 - (t - (tXuong + 0.9)) / 0.6) if t >= tXuong + 0.9 else 0.0
    k2 = max(0.0, 1 - (t - tHon) / 0.5) * 0.6 if t >= tHon else 0.0
    k = max(k, k2)
    return (math.sin(t * 91) * 22 * k, math.cos(t * 77) * 16 * k)


# ---------------------------------------------------------------- nền tối
def make_bg():
    a = np.zeros((H, W, 3), np.float32)
    yy, xx = np.mgrid[0:H, 0:W]
    r = np.sqrt(((xx - W * 0.5) / W) ** 2 + ((yy - H * 0.45) / H) ** 2)
    base = np.array([24, 27, 34], np.float32)
    a[:] = base * (1.25 - 0.9 * r)[..., None]
    a += np.random.default_rng(1).normal(0, 2.2, (H, W))[..., None]
    return np.clip(a, 0, 255)


BG = make_bg()


def fmt(v):
    return f"{v:,.0f}".replace(",", ".") if VI else f"{v:,.0f}"


def frame_svg(t):
    cx, cy, z = keyed(CAM, t)
    sx, sy = shake(t)
    P = lambda x, y: ((x - cx) * z + W / 2 + sx, (y - cy) * z + H / 2 + sy)
    g = []
    # lưới năm (đường dọc mảnh) + nhãn năm
    for yr in range(1997, 2027):
        x, _ = P(X(yr), 0)
        if -50 < x < W + 50:
            major = yr % 5 == 0 or z > 0.5
            g.append(f'<line x1="{x:.1f}" y1="0" x2="{x:.1f}" y2="{H}" stroke="#ffffff" stroke-opacity="{0.06 if major else 0.025}" stroke-width="2"/>')
            if major:
                g.append(f'<text x="{x + 8:.1f}" y="{H - 40}" font-family="{F}" font-weight="600" font-size="22" fill="{DIM}" fill-opacity="0.7">{yr}</text>')
    # đường giá
    ty = tip_year(t)
    segs = {"rise": [], "fall": [], "grow": []}
    for yr, p in SER:
        if yr > ty:
            break
        key = "rise" if yr <= PEAK_Y else ("fall" if yr <= LOW_Y else "grow")
        segs[key].append(P(X(yr), Y(p)))
    tp = P(X(ty), Y(price_at(ty)))
    last = "rise" if ty <= PEAK_Y else ("fall" if ty <= LOW_Y else "grow")
    segs[last].append(tp)
    if segs["fall"] and segs["rise"]:
        segs["fall"].insert(0, segs["rise"][-1])
    if segs["grow"] and (segs["fall"] or segs["rise"]):
        segs["grow"].insert(0, (segs["fall"] or segs["rise"])[-1])
    col = {"rise": WHITE, "fall": RED, "grow": GOLD}
    for k, pts in segs.items():
        if len(pts) > 1:
            d = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts)
            g.append(f'<path d="{d}" fill="none" stroke="{col[k]}" stroke-opacity="0.18" stroke-width="22" stroke-linejoin="round" stroke-linecap="round"/>')
            g.append(f'<path d="{d}" fill="none" stroke="{col[k]}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>')
    # đầu đường
    tc = col[last]
    g.append(f'<circle cx="{tp[0]:.1f}" cy="{tp[1]:.1f}" r="13" fill="{tc}"/>')
    # nhãn đỉnh $106
    k = prog(t, tRoi - 0.2, tRoi + 0.2)
    if k > 0 and t < tHomnay:
        x, y = P(X(PEAK_Y), Y(5.33))
        g.append(f'<g opacity="{k * (1 - prog(t, tNhung, tNhung + 0.4)):.2f}"><text x="{x:.0f}" y="{y - 40:.0f}" text-anchor="middle" font-family="{F}" font-weight="800" font-size="64" fill="{WHITE}">$106</text>'
                 f'<text x="{x:.0f}" y="{y - 112:.0f}" text-anchor="middle" font-family="{F}" font-weight="600" font-size="24" fill="{DIM}" letter-spacing="3">{TX["peak"]}</text></g>')
    # đáy: $5,97 + dấu -94%
    k = prog(t, tXuong + 0.85, tXuong + 1.1)
    if k > 0 and t < tNhung + 0.4:
        x, y = P(X(LOW_Y), Y(BUY))
        fade = 1 - prog(t, tNhung, tNhung + 0.4)
        s = ease_back(k, 2.0)
        g.append(f'<g opacity="{fade:.2f}"><text x="{x:.0f}" y="{y + 90:.0f}" text-anchor="middle" font-family="{F}" font-weight="800" font-size="56" fill="{RED}">{TX["low"]}</text></g>')
        g.append(f'<g transform="translate({x + 330:.0f},{y - 220:.0f}) rotate(-8) scale({s:.2f})" opacity="{fade:.2f}">'
                 f'<rect x="-210" y="-95" width="420" height="170" rx="14" fill="none" stroke="{RED}" stroke-width="10"/>'
                 f'<text y="45" text-anchor="middle" font-family="{F}" font-weight="800" font-size="130" fill="{RED}">-94%</text></g>')
    # nhịp tim "sắp chết"
    if tChet - 0.3 < t < tNhung + 0.3:
        x, y = P(X(LOW_Y), Y(BUY))
        ph = ((t - tChet) % 0.95) / 0.95
        g.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{14 + ph * 80:.0f}" fill="none" stroke="{RED}" stroke-width="5" stroke-opacity="{(1 - ph) * 0.9:.2f}"/>')
    # đồng 1.000 đô rơi xuống
    if t >= tNghin - 0.35:
        x, y = P(X(LOW_Y), Y(BUY))
        k = prog(t, tNghin - 0.35, tNghin + 0.15)
        drop = (1 - ease_out(k)) * -700
        bounce = math.sin(prog(t, tNghin + 0.15, tNghin + 0.5) * math.pi) * -18
        fade = 1 - prog(t, tHomnay + 0.2, tHomnay + 0.7)
        if fade > 0:
            cyc = y - 95 + drop + bounce
            g.append(f'<g opacity="{fade:.2f}"><ellipse cx="{x:.0f}" cy="{y - 8:.0f}" rx="{60 * k:.0f}" ry="10" fill="#000" opacity="0.35"/>'
                     f'<circle cx="{x:.0f}" cy="{cyc:.0f}" r="82" fill="{GOLD}"/><circle cx="{x:.0f}" cy="{cyc:.0f}" r="66" fill="none" stroke="#c98d1c" stroke-width="5"/>'
                     f'<text x="{x:.0f}" y="{cyc + 16:.0f}" text-anchor="middle" font-family="{F}" font-weight="800" font-size="44" fill="#3a2a06">{TX["coin"]}</text></g>')
            k2 = prog(t, t15, t15 + 0.3)
            if k2 > 0:
                g.append(f'<text x="{x:.0f}" y="{y + 110:.0f}" text-anchor="middle" font-family="{F}" font-weight="800" font-size="40" fill="{WHITE}" opacity="{k2 * fade:.2f}">{TX["vnd"]}</text>'
                         f'<text x="{x:.0f}" y="{y + 152:.0f}" text-anchor="middle" font-family="{F}" font-weight="600" font-size="24" fill="{DIM}" letter-spacing="3" opacity="{k2 * fade:.2f}">{TX["yours"]}</text>')
    # đồng hồ tiền bám theo đầu đường
    if t >= tHomnay + 0.2 and ty > LOW_Y:
        val = 1000 * price_at(ty) / BUY
        k = prog(t, tHomnay + 0.2, tHomnay + 0.6) * (1 - prog(t, tHon + 0.05, tHon + 0.35))
        if k > 0:
            bx = min(tp[0] + 40, W - 520)
            by = max(tp[1] - 40, 140)
            g.append(f'<g opacity="{k:.2f}"><text x="{bx:.0f}" y="{by - 70:.0f}" font-family="{F}" font-weight="600" font-size="24" fill="{DIM}" letter-spacing="3">{TX["have"].format(y=int(ty))}</text>'
                     f'<text x="{bx:.0f}" y="{by:.0f}" font-family="{F}" font-weight="800" font-size="76" fill="{GOLD}">${fmt(val)}</text></g>')
    # hé lộ
    if t >= tHon:
        k = prog(t, tHon, tHon + 0.35)
        s = ease_back(k, 1.6)
        g.append(f'<rect width="{W}" height="{H}" fill="#0b0c10" opacity="{0.55 * k:.2f}"/>')
        g.append(f'<g transform="translate({W / 2},{H / 2 - 60}) scale({s:.3f})">'
                 f'<text y="-150" text-anchor="middle" font-family="{F}" font-weight="600" font-size="30" fill="{DIM}" letter-spacing="5">{TX["then"]}</text>'
                 f'<text y="40" text-anchor="middle" font-family="{F}" font-weight="800" font-size="210" fill="{GOLD}">{TX["total"]}</text></g>')
        k2 = prog(t, tTuc + 0.5, tTuc + 0.85)
        if k2 > 0:
            s2 = ease_back(k2, 2.2)
            g.append(f'<g transform="translate({W / 2},{H / 2 + 170}) rotate(-3) scale({s2:.3f})">'
                     f'<rect x="-470" y="-82" width="940" height="140" rx="16" fill="{GOLD}"/>'
                     f'<text y="28" text-anchor="middle" font-family="{F}" font-weight="800" font-size="88" fill="#1a1406">{TX["banner"]}</text></g>')
        g.append(f'<text x="{W / 2}" y="{H - 34}" text-anchor="middle" font-family="{F}" font-weight="600" font-size="20" fill="{DIM}" opacity="{k:.2f}">'
                 f'{TX["note"]}</text>')
    # nhãn cố định góc trái: đường kẻ là gì + năm của đầu đường
    if t < tHon:
        k = prog(t, 0.1, 0.5) * (1 - prog(t, tHon - 0.3, tHon))
        g.append(f'<g opacity="{k:.2f}"><rect x="80" y="78" width="12" height="96" fill="{tc}"/>'
                 f'<text x="112" y="116" font-family="{F}" font-weight="800" font-size="40" fill="{WHITE}" letter-spacing="2">{TX["stock"]}</text>'
                 f'<text x="112" y="168" font-family="{F}" font-weight="800" font-size="46" fill="{tc}">{int(ty)}</text></g>')
    # mẩu báo Barron's
    if tBao - 0.1 < t < tChet + 0.2:
        k = prog(t, tBao - 0.1, tBao + 0.25) * (1 - prog(t, tChet - 0.1, tChet + 0.2))
        s = 0.9 + 0.1 * ease_out(k)
        hl = ease_out(prog(t, tBomb, tBomb + 0.5))
        g.append(f'<g transform="translate({W / 2 - 240},{H / 2 - 40}) rotate(-4) scale({s:.3f})" opacity="{k:.2f}">'
                 f'<rect x="-420" y="-210" width="860" height="440" fill="#000" opacity="0.45" transform="translate(16,20)"/>'
                 f'<rect x="-420" y="-210" width="860" height="440" fill="#efe9dc"/>'
                 f'<text x="-370" y="-140" font-family="DejaVu Serif" font-weight="bold" font-size="44" fill="#151515">BARRON\'S</text>'
                 f'<text x="370" y="-140" text-anchor="end" font-family="{F}" font-weight="600" font-size="24" fill="#555">{TX["date"]}</text>'
                 f'<line x1="-370" y1="-115" x2="370" y2="-115" stroke="#151515" stroke-width="3"/>'
                 f'<rect x="-340" y="-55" width="{680 * hl:.0f}" height="120" fill="#ffd84a"/>'
                 f'<text y="40" text-anchor="middle" font-family="DejaVu Serif" font-weight="bold" font-size="104" fill="#151515">Amazon.bomb</text>'
                 + "".join(f'<rect x="{-370 + c * 250}" y="{110 + r * 24}" width="{220 - (r % 2) * 40}" height="9" fill="#c4bfb3"/>' for c in range(3) for r in range(4))
                 + '</g>')
    return "".join(g)


def frame(t):
    ov = svg_to_rgba(frame_svg(t))
    a = ov[..., 3:4] / 255.0
    out = BG * (1 - a) + ov[..., :3] * a
    # mờ nhẹ đầu / cuối
    f = min(1.0, t / 0.35, max(0.0, (END - t) / 0.5))
    return np.clip(out * f, 0, 255).astype(np.uint8)


if __name__ == "__main__":
    if len(sys.argv) > 1:  # xem thử khung hình: python3 amz_hook20.py 4.5 9 ...
        for s in sys.argv[1:]:
            Image.fromarray(frame(float(s))).resize((960, 540)).save(f"{B}/f_{s}.jpg")
        sys.exit()
    events = [(tXuong + 0.85, "hit", 0.35), (tNghin + 0.1, "coin", 0.3), (tHomnay + 0.2, "riser", 0.25),
              (tHon - 0.02, "cash", 0.35)]
    mix_audio(f"{B}/voice.wav", [f"{ROOT}/assets/audio/music2.mp3"], f"{ROOT}/assets/audio", events, [],
              f"{B}/mix.wav", END, music_db=-26)
    n = int(END * FPS)
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
           "-i", "-", "-i", f"{B}/mix.wav", "-c:a", "aac", "-b:a", "192k", "-shortest", "-c:v", "libx264", "-pix_fmt",
           "yuv420p", "-crf", "18", f"{B}/amazon_mo_dau_20s{"" if VI else "_en"}.mp4"]
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for i in range(n):
        p.stdin.write(frame(i / FPS).tobytes())
    p.stdin.close()
    p.wait()
    print("xong", END)
