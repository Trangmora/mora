"""Video 1 – thử ~23 giây đầu theo phong cách "Vox sạch" (clean.py).

python3 pipeline/vox/ep1_clean.py <voice_edit.wav> <words_edit.json> <thư_mục_ảnh_hd> <sfx_dir> <out.mp4>
"""
import json, os, subprocess, sys
from multiprocessing import Pool
import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
from vox import W, H, FPS, prog, ease_io, ease_out, lerp, svg_to_rgba
from engine import mix_audio
import ep1_video as ev
import clean as C

G = {}
PEOPLE = os.environ.get("PEOPLE_DIR", "")

def build(photos):
    A = ev.A
    card = lambda n, w, sh=C.ORANGE_RGB, off=(18, 18): C.halftone_card(os.path.join(photos, f"{n}.jpg"), w, sh, off)
    shots = [
        {"t": 0.0, "z": (1.0, 1.04), "cards": [],
         "svg": lambda t: C.title(960, 520, "TRANG", 230, prog(t, A(1, "Trang"), A(1, "Trang") + 0.4))
                          + C.title(960, 690, "FOUNDER · MORA AI", 64, prog(t, A(1, "founder"), A(1, "founder") + 0.4), bar=False, color=C.BLACK)},
        {"t": A(2, None, -0.1), "z": (1.0, 1.05), "cards": [(card("stock", 840), 560, 540, -2.5, A(2, None))],
         "svg": lambda t: C.title(1440, 560, "TÀI CHÍNH", 120, prog(t, A(2, "tài chính"), A(2, "tài chính") + 0.4), sub="NƠI MÌNH LÀM VIỆC")},
        {"t": A(2, "tốt nghiệp", -0.1), "z": (1.0, 1.05), "cards": [(card("duomo", 760, C.RED_RGB, (-18, 18)), 1400, 540, 2.5, A(2, "tốt nghiệp"))],
         "svg": lambda t: C.stat(580, 560, "cap", "MBA", "THẠC SĨ QTKD · Ý", prog(t, A(2, "MBA"), A(2, "MBA") + 0.4), size=190)},
        {"t": A(4, None, -0.1), "z": (1.0, 1.05), "cards": [(card("chatbot", 840), 560, 540, -1.5, A(4, None))],
         "svg": lambda t: C.title(1440, 540, "CHIA SẺ", 120, prog(t, A(4, "chia sẻ"), A(4, "chia sẻ") + 0.4), sub="KIẾN THỨC TÀI CHÍNH")},
        {"t": A(7, None, -0.1), "z": (1.0, 1.05), "cards": [(C.sticker(os.path.join(PEOPLE, "dario_cut.png"), 470, C.RED_RGB), 1460, 600, 0, A(8, "Claude", 0.3))],
         "svg": lambda t: C.title(700, 230, "HÔM NAY", 70, prog(t, A(7, None, 0.1), A(7, None, 0.5)), bar=False, color=C.BLACK)
                          + C.title(700, 480, "CLAUDE", 230, prog(t, A(8, "Claude"), A(8, "Claude") + 0.4), sub="KIẾM TIỀN THẾ NÀO?")
                          + C.title(1460, 1010, "DARIO AMODEI · CEO ANTHROPIC", 34, prog(t, A(8, "Claude", 0.6), A(8, "Claude", 1.0)), bar=False, color=C.BLACK)},
        {"t": A(8, "kiếm tiền", 0.2), "z": (1.0, 1.06), "cards": [],
         "svg": lambda t: C.newspaper(960, 560, 1300, "FinanceFeeds", "NOV 2026 · AI", "Anthropic IPO Filing: $17B Quarter, $895B Commitments",
                                      "$895B Commitments", "Anthropic's S-1 shows the scale of the AI business",
                                      prog(t, A(8, "kiếm tiền", 0.2), A(8, "kiếm tiền", 0.7)), rot=-2,
                                      ht=prog(t, A(8, "kiếm tiền", 0.8), A(8, "kiếm tiền", 1.4)))},
        {"t": A(8, "cỗ máy", -0.1), "z": (1.0, 1.0), "cards": [], "ocean": True,
         "svg": lambda t: C.stat(1380, 250, "chip", "1.500 TỶ $", "ĐỊNH GIÁ KHI LÊN SÀN", prog(t, A(9, "nghìn"), A(9, "nghìn") + 0.4), size=110)},
        {"t": A(9, "lời", -0.3), "z": (1.0, 1.04), "cards": [],
         "svg": lambda t: C.chart_card(960, 560, 1300, 780, "DOANH THU ANTHROPIC (TỶ $) – LỜI HAY LỖ?", ["2024", "2025", "6T/2026"],
                                       [("Doanh thu", C.RED_TXT, [0.39, 4.59, 16.3])], prog(t, A(9, "lời", -0.3), A(9, "lời", 0.1)),
                                       A(9, "lời", 0.0), t, ymax=20)},
    ]
    return shots

def init(voice, words, photos):
    C.use_red_sand()
    ev.WORDS = json.load(open(words))
    G["shots"] = build(photos)
    G["bg"] = C.make_bg(1.12)

def frame(i, t):
    s = G["shots"][i]
    t0 = s["t"]
    t1 = G["shots"][i + 1]["t"] if i + 1 < len(G["shots"]) else G["dur"]
    z = lerp(s["z"][0], s["z"][1], ease_io(prog(t, t0, t1)))
    bg = G["bg"]
    vw, vh = bg.width / 1.12 / z, bg.height / 1.12 / z
    x0, y0 = (bg.width - vw) / 2, (bg.height - vh) / 2
    canvas = bg.crop((int(x0), int(y0), int(x0 + vw), int(y0 + vh))).resize((W, H), Image.BILINEAR).convert("RGBA")
    if s.get("ocean"):
        if "ocean" not in G:
            G["ocean"] = C.Ocean()
        sx = lerp(W * 0.42, W * 0.58, prog(t, t0, t1))
        canvas = Image.fromarray(G["ocean"].frame(t, sx, canvas.convert("RGB")).astype("uint8")).convert("RGBA")
    for c, cx, cy, rot, ct in s["cards"]:
        k = ease_out(prog(t, ct, ct + 0.35))
        sc = z * lerp(1.06, 1.0, k)
        C.paste_card(canvas, c, W / 2 + (cx - W / 2) * z, H / 2 + (cy - H / 2) * z, rot, sc, k)
    a = np.asarray(canvas.convert("RGB"), dtype=np.float32)
    svg = f'<g transform="translate({W / 2},{H / 2}) scale({z:.4f}) translate({-W / 2},{-H / 2})">{s["svg"](t)}</g>'
    f = svg_to_rgba(svg)
    al = f[..., 3:4] / 255
    return a * (1 - al) + f[..., :3] * al

def render(fi):
    t = fi / FPS
    idx = 0
    for j, s in enumerate(G["shots"]):
        if t >= s["t"]:
            idx = j
    cur = frame(idx, t)
    k = prog(t, G["shots"][idx]["t"], G["shots"][idx]["t"] + 0.18)
    if idx > 0 and k < 1:  # mờ nhanh giữa hai cảnh
        cur = frame(idx - 1, t) * (1 - k) + cur * k
    cur *= prog(t, 0, 0.25) * (1 - prog(t, G["dur"] - 0.5, G["dur"]))
    return np.clip(cur, 0, 255).astype("uint8").tobytes()

def pinit(voice, words, photos, dur):
    init(voice, words, photos)
    G["dur"] = dur

def main(voice, words, photos, sfx_dir, out):
    ev.WORDS = json.load(open(words))
    ws = [w for w in ev.WORDS if w["seg"] == 9]
    dur = ws[-1]["end"] + 1.8
    pinit(voice, words, photos, dur)
    events = [(s["t"], "whoosh", 0.1) for s in G["shots"][1:]]
    mixed = out.replace(".mp4", "_mix.wav")
    mix_audio(voice, [os.path.join(sfx_dir, "music2.mp3")], sfx_dir, events, [], mixed, dur, music_db=-31)
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-i", mixed, "-shortest", "-c:v", "libx264", "-pix_fmt", "yuv420p",
                           "-crf", "19", "-c:a", "aac", "-b:a", "192k", out], stdin=subprocess.PIPE)
    with Pool(4, initializer=pinit, initargs=(voice, words, photos, dur)) as pool:
        for fr in pool.imap(render, range(int(dur * FPS)), chunksize=4):
            ff.stdin.write(fr)
    ff.stdin.close()
    ff.wait()

if __name__ == "__main__":
    main(*sys.argv[1:])
