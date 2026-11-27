"""Amazon – demo 10 giây "Amazon kiếm tiền từ đâu" theo kiểu slide: hộp + mũi tên + chấm tiến trình.
Giọng: clone "Trang giọng việt" (ElevenLabs eleven_v3, tốc độ tự nhiên).
Số liệu: báo cáo năm 2024 của Amazon (SEC): doanh thu 637,96 tỷ $, AWS 107,56 tỷ $ (~17%);
lợi nhuận hoạt động 68,59 tỷ $, AWS 39,8 tỷ $ (~58%).
Chạy: python3 amz_money10.py
"""
import base64
import json
import os
import subprocess
import sys

sys.path.insert(0, os.path.dirname(__file__))
from vox import prog, ease_out, ease_back, ease_io, esc
import clean
from clean import title, ORANGE, BLACK, CREAM
from clean_build import Builder, Align
from engine import mix_audio

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../story-of-the-company"))
B = f"{ROOT}/amazon/build/money"
os.makedirs(B, exist_ok=True)
TXT = ("Vậy Amazon kiếm tiền từ đâu? Một: bán hàng online cho các bạn. Hai: thu phí hàng triệu người bán khác trên sàn. "
       "Và ba, thứ ít ai ngờ: cho thuê máy chủ. AWS chỉ chiếm mười bảy phần trăm doanh thu, "
       "nhưng mang về năm mươi tám phần trăm lợi nhuận.")


def tts():
    if os.path.exists(f"{B}/align.json") and json.load(open(f"{B}/align.json"))["text"] == TXT:
        return
    body = json.dumps({"text": TXT, "model_id": "eleven_v3", "language_code": "vi",
                       "voice_settings": {"stability": 0.5, "similarity_boost": 0.75, "style": 0.3}})
    out = subprocess.check_output(["curl", "-s", "-X", "POST",
                                   "https://api.elevenlabs.io/v1/text-to-speech/1SF4Jqf4CNRoja3ACqWC/with-timestamps",
                                   "-H", "Content-Type: application/json", "-H", "xi-api-key: dummy", "-d", body])
    d = json.loads(out)
    open(f"{B}/tts.mp3", "wb").write(base64.b64decode(d["audio_base64"]))
    a = d["alignment"]
    json.dump({"text": TXT, "chars": a["characters"], "t0": a["character_start_times_seconds"]},
              open(f"{B}/align.json", "w"), ensure_ascii=False)


tts()
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", f"{B}/tts.mp3", "-ar", "44100", "-ac", "1", f"{B}/voice.wav"],
               check=True)
A = Align(f"{B}/align.json")
END = A("lợi nhuận.") + 1.6

# ---------------------------------------------------------------- phần tử
ICON = {
    "cart": lambda c: (f'<path d="M -62 -40 L -44 -40 L -28 22 L 40 22 L 54 -22 L -38 -22" fill="none" stroke="{c}" '
                       f'stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>'
                       f'<circle cx="-20" cy="44" r="11" fill="{c}"/><circle cx="34" cy="44" r="11" fill="{c}"/>'),
    "shop": lambda c: (f'<path d="M -58 -20 L -46 -52 L 46 -52 L 58 -20 Z" fill="{c}"/>'
                       f'<rect x="-50" y="-16" width="100" height="66" fill="{c}"/>'
                       f'<rect x="-14" y="10" width="28" height="40" fill="#fff"/>'),
    "server": lambda c: "".join(f'<rect x="-56" y="{-54 + k * 38}" width="112" height="30" rx="6" fill="{c}"/>'
                                f'<circle cx="-36" cy="{-39 + k * 38}" r="6" fill="#fff"/>'
                                f'<rect x="4" y="{-42 + k * 38}" width="38" height="6" fill="#fff"/>' for k in range(3)),
}


def box(x, y, w, h, icon, label, sub, k, hot=1.0, dim=False):
    """Hộp kem bo góc: biểu tượng cam bên trái, chữ đen đậm, chú thích cam in hoa. hot = độ nổi bật (viền cam)."""
    if k <= 0:
        return ""
    s = ease_back(k, 1.3) * (1 + 0.04 * hot)
    op = min(1, k * 1.6) * (0.45 if dim else 1)
    bw = 3 + 5 * hot
    return (f'<g transform="translate({x},{y}) scale({s:.3f})" opacity="{op:.2f}">'
            f'<rect x="{-w / 2 + 10}" y="{-h / 2 + 14}" width="{w}" height="{h}" rx="22" fill="#000" opacity="0.15"/>'
            f'<rect x="{-w / 2}" y="{-h / 2}" width="{w}" height="{h}" rx="22" fill="{CREAM}" '
            f'stroke="{ORANGE if hot > 0.05 else "#d9d2c2"}" stroke-width="{bw:.1f}"/>'
            f'<g transform="translate({-w / 2 + 90},0) scale(0.85)">{ICON[icon](ORANGE)}</g>'
            f'<text x="{-w / 2 + 170}" y="-6" font-family="Be Vietnam Pro" font-weight="800" font-size="46" fill="{BLACK}">{esc(label)}</text>'
            f'<text x="{-w / 2 + 172}" y="40" font-family="Be Vietnam Pro" font-weight="800" font-size="22" fill="{ORANGE}" '
            f'letter-spacing="2">{esc(sub)}</text></g>')


def arrow(x0, y0, x1, y1, p, color=BLACK, dim=False):
    """Mũi tên cong nhẹ tự vẽ ra (p: 0..1)."""
    if p <= 0:
        return ""
    p = ease_io(p)
    mx, my = (x0 + x1) / 2, (y0 + y1) / 2
    cx, cy = mx, my + (0 if abs(y1 - y0) < 5 else 0)
    cx = x0 + (x1 - x0) * 0.55
    cy = y1
    pts = []
    n = 30
    for i in range(int(n * p) + 1):
        u = i / n
        pts.append(((1 - u) ** 2 * x0 + 2 * (1 - u) * u * cx + u * u * x1, (1 - u) ** 2 * y0 + 2 * (1 - u) * u * cy + u * u * y1))
    d = "M" + " L".join(f"{a:.1f},{b:.1f}" for a, b in pts)
    op = 0.35 if dim else 1
    out = f'<path d="{d}" fill="none" stroke="{color}" stroke-width="8" stroke-linecap="round" opacity="{op}"/>'
    if p > 0.97:
        out += (f'<path d="M {x1} {y1} L {x1 - 30} {y1 - 16} L {x1 - 30} {y1 + 16} Z" fill="{color}" opacity="{op}"/>')
    return out


def dots(cur, k):
    """Chấm tiến trình slide 1 – 2 – 3 phía trên."""
    if k <= 0:
        return ""
    g = f'<g opacity="{min(1, k * 2):.2f}">'
    for i in range(3):
        x = 860 + i * 100
        on = i + 1 <= cur
        g += (f'<circle cx="{x}" cy="190" r="26" fill="{ORANGE if on else CREAM}" stroke="{ORANGE if on else "#bdb6a6"}" stroke-width="4"/>'
              f'<text x="{x}" y="200" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="28" '
              f'fill="{"#fff" if on else "#8a8374"}">{i + 1}</text>')
        if i < 2:
            g += f'<line x1="{x + 30}" y1="190" x2="{x + 70}" y2="190" stroke="{ORANGE if i + 2 <= cur else "#bdb6a6"}" stroke-width="4"/>'
    return g + "</g>"


def amazon_box(k):
    if k <= 0:
        return ""
    s = ease_back(k, 1.2)
    return (f'<g transform="translate(400,600) scale({s:.3f})">'
            f'<rect x="-190" y="-80" width="380" height="160" rx="24" fill="{BLACK}"/>'
            f'<text y="20" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="62" fill="#fff" '
            f'letter-spacing="4">AMAZON</text></g>')


# ---------------------------------------------------------------- cảnh
b = Builder(END)
t1, t2, t3, t4 = A("Một"), A("Hai"), A("Và ba"), A("AWS chỉ")
ROWS = [(330, "cart", "BÁN LẺ ONLINE", "BÁN HÀNG CHO CÁC BẠN", t1),
        (600, "shop", "PHÍ NGƯỜI BÁN", "NGƯỜI BÁN KHÁC TRẢ PHÍ", t2),
        (870, "server", "AWS", "CHO THUÊ MÁY CHỦ (ĐÁM MÂY)", t3)]


def s_title(t, cv):
    return title(960, 560, "AMAZON KIẾM TIỀN TỪ ĐÂU?", 104, prog(t, 0.05, 0.45), sub="MÔ HÌNH KINH DOANH")


def s_flow(t, cv):
    T = t + t1  # thời gian tuyệt đối
    cur = sum(1 for r in ROWS if T >= r[4])
    out = dots(cur, prog(T, t1, t1 + 0.3)) + amazon_box(prog(T, t1, t1 + 0.35))
    for i, (y, ic, lb, sb, tc) in enumerate(ROWS):
        out += arrow(600, 600, 990, y, prog(T, tc + 0.05, tc + 0.5), dim=(cur > i + 1))
        hot = 1.0 if cur == i + 1 else 0.0
        out += box(1330, y, 640, 170, ic, lb, sb, prog(T, tc + 0.35, tc + 0.75), hot=hot, dim=(cur > i + 1))
    return out


def s_aws(t, cv):
    T = t + t4
    k = prog(t, 0.0, 0.35)
    s = ease_out(k)
    g = (f'<g transform="translate(0,{(1 - s) * 50:.1f})" opacity="{min(1, k * 1.6):.2f}">'
         f'<rect x="270" y="250" width="1380" height="600" rx="28" fill="#000" opacity="0.15" transform="translate(10,14)"/>'
         f'<rect x="270" y="250" width="1380" height="600" rx="28" fill="{CREAM}" stroke="#d9d2c2" stroke-width="2"/>'
         f'<text x="340" y="340" font-family="Be Vietnam Pro" font-weight="800" font-size="40" fill="{BLACK}" letter-spacing="2">'
         f'AWS TRONG TOÀN BỘ AMAZON (NĂM 2024)</text>')
    bars = [("DOANH THU", 17, A("doanh thu")), ("LỢI NHUẬN", 58, A("lợi nhuận"))]
    for i, (lb, v, tc) in enumerate(bars):
        y = 450 + i * 200
        p = ease_out(prog(T, tc - 0.6, tc + 0.4))
        g += (f'<text x="340" y="{y}" font-family="Be Vietnam Pro" font-weight="800" font-size="34" fill="#6b655a" letter-spacing="2">{lb}</text>'
              f'<rect x="340" y="{y + 25}" width="1100" height="70" rx="12" fill="#e4ddcc"/>'
              f'<rect x="340" y="{y + 25}" width="{1100 * v / 100 * p:.0f}" height="70" rx="12" fill="{ORANGE}"/>')
        if p > 0.05:
            g += (f'<text x="{340 + 1100 * v / 100 * p + 24:.0f}" y="{y + 80}" font-family="Be Vietnam Pro" font-weight="800" '
                  f'font-size="64" fill="{BLACK}" opacity="{min(1, p * 2):.2f}">{round(v * p)}%</text>')
    g += (f'<text x="340" y="815" font-family="Be Vietnam Pro" font-weight="800" font-size="20" fill="#8a8374" letter-spacing="1">'
          f'NGUỒN: BÁO CÁO NĂM 2024 CỦA AMAZON (SEC)</text>')
    return g + "</g>"


b.scene(0, t1, s_title)
b.scene(t1, t4, s_flow)
b.scene(t4, END, s_aws)

mix_audio(f"{B}/voice.wav", [f"{ROOT}/assets/audio/music1.mp3"], f"{ROOT}/assets/audio",
          [(t - 0.05, "whoosh", 0.12) for t in b.cuts()], [], f"{B}/mix.wav", END, music_db=-31)
b.render(f"{B}/amazon_kiem_tien_10s.mp4", f"{B}/mix.wav")
print("xong", END, t1, t2, t3, t4)
