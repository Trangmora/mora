"""3 khung mẫu nền cho kênh tài chính: màn hình giao dịch, phòng xử án, giấy báo.

python3 pipeline/mapstory/bg_mockups.py <thư_mục_ra>
"""
import io, math, os, random, sys
import cairosvg
from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
from demo import W, H, outlined, OUT, SKIN
import ftx

T_NORMAL = {"s02": 99, "s03": 100, "s04": 101}
T_SAD = {"s02": -3, "s03": -2, "s04": -1}

def sam_at(x, y, scale, T):
    return f'<g transform="translate({x},{y}) scale({scale})">{ftx.sam(1.0, T)}</g>'

def caption(txt, y=1110):
    return (f'<g transform="translate({W / 2},{y})">'
            + outlined('text-anchor="middle" font-family="Inter" font-weight="800" font-size="66"', txt, "#ffffff", "#141414", 13)
            + "</g>")

# ---------- A. màn hình giao dịch ----------
def candles(rng, x0, x1, y_mid, amp, n, alpha):
    s, v = "", 0.0
    step = (x1 - x0) / n
    for i in range(n):
        o = v
        v += rng.gauss(0.15 if i < n * 0.7 else -0.9, 1.0)
        c = v
        hi, lo = max(o, c) + abs(rng.gauss(0, 0.5)), min(o, c) - abs(rng.gauss(0, 0.5))
        col = "#1fbf75" if c >= o else "#e5484d"
        x = x0 + i * step + step / 2
        Y = lambda q: y_mid - q * amp
        s += (f'<line x1="{x:.1f}" y1="{Y(hi):.1f}" x2="{x:.1f}" y2="{Y(lo):.1f}" stroke="{col}" stroke-width="4" opacity="{alpha}"/>'
              f'<rect x="{x - step * 0.32:.1f}" y="{Y(max(o, c)):.1f}" width="{step * 0.64:.1f}" '
              f'height="{max(4, abs(c - o) * amp):.1f}" fill="{col}" opacity="{alpha}"/>')
    return s

def terminal():
    rng = random.Random(3)
    s = f'<rect width="{W}" height="{H}" fill="#0b1424"/>'
    for x in range(0, W, 90):
        s += f'<line x1="{x}" y1="0" x2="{x}" y2="{H}" stroke="#16233a" stroke-width="2"/>'
    for y in range(0, H, 90):
        s += f'<line x1="0" y1="{y}" x2="{W}" y2="{y}" stroke="#16233a" stroke-width="2"/>'
    s += candles(rng, 0, W, 1050, 38, 34, 0.35)
    s += f'<rect width="{W}" height="96" fill="#060b15"/><line x1="0" y1="96" x2="{W}" y2="96" stroke="#24344f" stroke-width="3"/>'
    items = [("BTC", "▲ 2.31%", "#1fbf75"), ("ETH", "▲ 1.12%", "#1fbf75"), ("FTT", "▼ 80.4%", "#e5484d"), ("SOL", "▼ 12.7%", "#e5484d")]
    x = 30
    for name, ch, col in items:
        s += (f'<text x="{x}" y="62" font-family="DejaVu Sans" font-weight="bold" font-size="40" fill="#c9d4e5">{name}</text>'
              f'<text x="{x + 100}" y="62" font-family="DejaVu Sans" font-weight="bold" font-size="40" fill="{col}">{ch}</text>')
        x += 330
    s += (f'<g transform="translate({W / 2},560)"><rect x="-150" y="-70" width="300" height="120" rx="22" fill="#11a3c9" stroke="{OUT}" stroke-width="8"/>'
          + outlined('y="30" text-anchor="middle" font-family="Inter" font-weight="900" font-size="88"', "FTX", "#ffffff", "#0b3d4f", 6)
          + "</g>")
    s += (f'<g transform="translate({W / 2},820)">'
          + outlined('text-anchor="middle" font-family="Inter" font-weight="900" font-size="170"', "$32 tỷ", "#7CFC7C", "#02060d", 18)
          + "</g>")
    return s + caption("định giá 32 tỷ đô!") + sam_at(540, 1860, 1.5, T_NORMAL)

# ---------- B. phòng xử án ----------
def courtroom():
    s = f'<rect width="{W}" height="{H}" fill="#7a4a24"/>'
    for x in range(0, W, 180):  # ô ván gỗ
        s += (f'<rect x="{x + 18}" y="120" width="144" height="560" rx="8" fill="#8a5630" stroke="#5e3518" stroke-width="5"/>')
    s += f'<rect y="700" width="{W}" height="40" fill="#5e3518"/>'
    s += f'<rect y="1500" width="{W}" height="420" fill="#4a2b14"/>'
    for x in range(-200, W + 200, 160):
        s += f'<line x1="{x}" y1="1500" x2="{x - 120}" y2="{H}" stroke="#3a2010" stroke-width="5"/>'
    # huy hiệu sau ghế thẩm phán
    s += (f'<circle cx="540" cy="330" r="130" fill="#d9a93a" stroke="{OUT}" stroke-width="8"/>'
          f'<circle cx="540" cy="330" r="96" fill="#b88a26" stroke="{OUT}" stroke-width="5"/>'
          f'<path d="M 540 260 L 556 312 L 610 312 L 566 344 L 582 396 L 540 364 L 498 396 L 514 344 L 470 312 L 524 312 Z" fill="#f5d77a" stroke="{OUT}" stroke-width="4"/>')
    # thẩm phán
    s += (f'<path d="M 400 900 Q 540 760 680 900 Z" fill="#141414" stroke="{OUT}" stroke-width="6"/>'
          f'<circle cx="540" cy="700" r="80" fill="{SKIN}" stroke="{OUT}" stroke-width="6"/>'
          f'<path d="M 462 690 Q 450 610 540 606 Q 630 610 618 690 Q 600 640 540 640 Q 480 640 462 690 Z" fill="#d8d8d8" stroke="{OUT}" stroke-width="5"/>'
          f'<path d="M 505 700 L 525 700 M 555 700 L 575 700" stroke="{OUT}" stroke-width="7" stroke-linecap="round"/>'
          f'<path d="M 520 745 L 562 745" stroke="{OUT}" stroke-width="5" stroke-linecap="round"/>')
    # bục thẩm phán + búa
    s += (f'<rect x="200" y="840" width="680" height="300" rx="10" fill="#6b3d1c" stroke="{OUT}" stroke-width="8"/>'
          f'<rect x="180" y="820" width="720" height="44" rx="8" fill="#8a5630" stroke="{OUT}" stroke-width="7"/>'
          f'<g transform="translate(760,790) rotate(-30)"><rect x="-60" y="-24" width="120" height="48" rx="12" fill="#a0632e" stroke="{OUT}" stroke-width="6"/>'
          f'<rect x="-8" y="20" width="16" height="110" rx="6" fill="#a0632e" stroke="{OUT}" stroke-width="5"/></g>')
    s += caption("25 năm tù", 1250)
    return s + sam_at(540, 1880, 1.35, T_SAD)

# ---------- C. giấy báo ----------
def clipping(x, y, w, h, rot, head, sub, rng):
    lines = ""
    for i in range(int((h - 190) / 30)):
        ln = w - 60 - rng.randint(0, 120)
        lines += f'<rect x="30" y="{170 + i * 30}" width="{ln}" height="12" rx="4" fill="#b9ad95"/>'
    return (f'<g transform="translate({x},{y}) rotate({rot})">'
            f'<rect x="8" y="10" width="{w}" height="{h}" fill="#000" opacity="0.25"/>'
            f'<rect width="{w}" height="{h}" fill="#f4ecd8" stroke="#8c7d5f" stroke-width="3"/>'
            f'<rect x="20" y="20" width="{w - 40}" height="6" fill="#2b2b2b"/>'
            f'<text x="30" y="100" font-family="DejaVu Serif" font-weight="bold" font-size="66" fill="#141414">{head}</text>'
            f'<text x="30" y="148" font-family="DejaVu Serif" font-style="italic" font-size="34" fill="#3a3a3a">{sub}</text>'
            f'{lines}</g>')

def newspaper():
    rng = random.Random(5)
    s = f'<rect width="{W}" height="{H}" fill="#d9ccb0"/>'
    for i in range(70):
        y = 30 + i * 28
        s += f'<rect x="40" y="{y}" width="{W - 80 - rng.randint(0, 300)}" height="10" rx="4" fill="#c7b995"/>'
    s += clipping(60, 150, 640, 420, -6, "FTX SỤP ĐỔ", "Sàn tiền ảo phá sản sau một tuần", rng)
    s += clipping(420, 470, 600, 380, 5, "32 TỶ ĐÔ", "...bốc hơi khỏi định giá", rng)
    s += clipping(80, 760, 680, 300, -3, "KHÁCH MẤT TIỀN", "Tiền gửi bị chuyển sang Alameda", rng)
    s += caption("FTX bay màu")
    return s + sam_at(540, 1860, 1.5, {"s02": -2, "s03": -1, "s04": 99})

def main(out):
    os.makedirs(out, exist_ok=True)
    imgs = []
    for name, fn in [("a_terminal", terminal), ("b_courtroom", courtroom), ("c_newspaper", newspaper)]:
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}">{fn()}</svg>'
        im = Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg.encode()))).convert("RGB")
        im.save(f"{out}/{name}.png")
        imgs.append(im.resize((540, 960)))
    sheet = Image.new("RGB", (540 * 3 + 40, 960), "#ffffff")
    for i, im in enumerate(imgs):
        sheet.paste(im, (i * 560, 0))
    sheet.save(f"{out}/so_sanh_nen.jpg", quality=92)

if __name__ == "__main__":
    main(sys.argv[1])
