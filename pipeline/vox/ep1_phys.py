"""Video 1 – bản "VẬT LÝ GIẤY CẮT" (~65 s đầu, giọng chủ kênh). Khung NGANG 1920×1080 cho YouTube.
Không hiện phần giới thiệu bản thân (giọng vẫn giữ): đoạn đó là cảnh mở chủ đề.

python3 ep1_phys.py <voice_edit.wav> <words_edit.json> <people_dir> <sfx_dir> <out.mp4>
"""
import json, math, os, subprocess, sys
from multiprocessing import Pool
import numpy as np
import pymunk
from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(__file__))
import ep1_video as ev
import clean as C
from engine import mix_audio
from phys import (Stage, OW, OH, FPS, RED, BLACK, CREAM, GOLD, INK, CAT_SOLID, card, glyph, stamp, strip_baked_shadow,
                  render_stage, page_slide, text_img, place, slam, prog, ease_io, ease_out, comp, font)

A = ev.A
G = {}
SLIDE = 0.4

def coins_in(snap, x0, x1, ytop):
    return sum(1 for p in snap if p is not None and x0 < p[0] < x1 and p[1] > ytop)

# ---------------- cảnh 1: chữ CLAUDE rơi, biển xu dâng phía sau ----------------
def s_open(t0, t1):
    st = Stage(t0, t1, seed=11)
    FL = 820
    st.wall((150, FL), (1962, FL), 5)
    st.wall((150, -900), (150, FL), 5, draw=False)
    st.wall((1962, -900), (1962, FL), 5, draw=False)
    gl = [glyph(ch, 320) for ch in "CLAUDE"]
    gap = 6
    x = 1056 - (sum(g.width for g in gl) + gap * 5) / 2
    for i, g in enumerate(gl):
        cx = x + g.width / 2
        x += g.width + gap
        st.at(t0 + 0.35 + 0.17 * i, lambda s, g=g, cx=cx: s.solid(g, cx, -230, mass=10, box=(g.width - 12, g.height - 12),
                                                                  angle=s.rng.uniform(-0.05, 0.05), sound=("paper", 0.45)))
    st.pour(t0 + 1.6, A(8, "kiếm", -0.6), 200, (190, 1920), -90, behind=True, rate=lambda u: 0.25 + u * 1.2)
    hom = card(330, 96, [("HÔM NAY", 58, CREAM)], bg=BLACK, seed=3)
    st.at(A(7, "Hôm", -0.42), lambda s: s.solid(hom, 700, -120, mass=2.5, angle=-0.18, z=3))
    plank = card(1260, 176, [("KIẾM TIỀN THẾ NÀO?", 112, RED)], seed=4)
    st.at(A(8, "kiếm", -0.5), lambda s: s.solid(plank, 1090, -190, mass=9, angle=0.04, z=4))
    tk = A(8, "kiếm")
    st.cam = lambda t: (1056, 690 - 16 * ease_io(prog(t, t0, tk)), 1860 + 252 * ease_io(prog(t, t0 + 1.0, tk)))
    return st

# ---------------- cảnh 2: cân lời / lỗ ----------------
def s_scale(t0, t1):
    st = Stage(t0, t1, seed=5, damping=0.75)
    sp = st.sp
    FL, PX, PY, L = 1000, 1056, 520, 430
    st.wall((520, FL), (1592, FL), 5)
    st.wall((PX, FL), (PX, PY + 30), 9)
    st.fills.append(([(970, FL), (1142, FL), (1110, FL - 46), (1002, FL - 46)], BLACK))
    beam = pymunk.Body(24, pymunk.moment_for_segment(24, (-L, 0), (L, 0), 10))
    beam.position = (PX, PY)
    beam.angular_velocity = 0.35
    bs = pymunk.Segment(beam, (-L, 0), (L, 0), 10)
    bs.filter = pymunk.ShapeFilter(group=1, categories=CAT_SOLID)
    sp.add(beam, bs)
    sp.add(pymunk.PivotJoint(beam, sp.static_body, (PX, PY)))
    sp.add(pymunk.RotaryLimitJoint(beam, sp.static_body, -0.32, 0.32))
    beam.is_coin, beam.snd = False, False
    bi = st.track(beam)
    pans = []
    for sx in (-1, 1):
        pan = pymunk.Body(5, pymunk.moment_for_box(5, (300, 40)))
        pan.position = (PX + sx * L, PY + 240)
        sp.add(pan)
        for a, b in (((-150, 0), (150, 0)), ((-150, 0), (-168, -46)), ((150, 0), (168, -46))):
            s = pymunk.Segment(pan, a, b, 7)
            s.filter = pymunk.ShapeFilter(group=1, categories=CAT_SOLID)
            s.friction, s.elasticity = 0.9, 0.1
            sp.add(s)
        sp.add(pymunk.PinJoint(beam, pan, (sx * L, 0), (-150, 0)), pymunk.PinJoint(beam, pan, (sx * L, 0), (150, 0)))
        pan.is_coin, pan.snd = False, False
        pans.append(st.track(pan))

    def tf(p, x, y, a):
        c, s = math.cos(a), math.sin(a)
        return (p[0] + x * c - y * s, p[1] + x * s + y * c)

    def draw(d, img, t, snap):
        bx, by, ba = snap[bi]
        ends = [tf((bx, by), sx * L, 0, ba) for sx in (-1, 1)]
        for k, pi in enumerate(pans):
            px, py, pa = snap[pi]
            for lx in (-150, 150):
                d.line((ends[k], tf((px, py), lx, 0, pa)), fill=BLACK + (255,), width=4)
            bowl = [tf((px, py), x, y, pa) for x, y in ((-168, -46), (-150, 0), (150, 0), (168, -46), (150, 10), (-150, 10))]
            d.polygon([bowl[0], bowl[1], bowl[2], bowl[3], (bowl[3][0], bowl[3][1] + 14), bowl[4], bowl[5], (bowl[0][0], bowl[0][1] + 14)],
                      fill=CREAM + (255,), outline=BLACK + (255,), width=6)
            lab = ("LỜI", BLACK) if k == 0 else ("LỖ", RED)
            place(img, text_img(lab[0], 74, lab[1], stroke=8), (px, py + 78))
        poly = [tf((bx, by), x, y, ba) for x, y in ((-L - 14, -13), (L + 14, -13), (L + 14, 13), (-L - 14, 13))]
        d.polygon(poly, fill=CREAM + (255,), outline=BLACK + (255,), width=6)
        d.ellipse((PX - 22, PY - 22, PX + 22, PY + 22), fill=RED + (255,), outline=BLACK + (255,), width=5)
    st.world_fns.append(draw)
    tl, tlo = A(9, "lời"), A(9, "lỗ")
    for k in range(6):
        st.at(tl - 0.5 + k * 0.05, lambda s, k=k: s.coin(PX - L + s.rng.uniform(-70, 70), -40 - k * 30, 26))
    for k in range(7):
        st.at(tlo - 0.45 + k * 0.05, lambda s, k=k: s.coin(PX + L + s.rng.uniform(-70, 70), -40 - k * 30, 26))
    ta = A(9, "AI")

    def head(d, img, t, snap):
        place(img, text_img("CỖ MÁY AI NGHÌN TỶ ĐÔ", 60, BLACK, stroke=6), (PX, 150), prog(t, ta, ta + 0.35))
        place(img, text_img("LỜI HAY LỖ?", 150, RED, stroke=10), (PX, 300), prog(t, tl - 0.1, tl + 0.3))
    st.top_fns.append(head)
    st.cam = lambda t: (1056, 600, 2112 - 150 * ease_io(prog(t, t0, t1)))
    return st

# ---------------- cảnh 3: định giá IPO đổ đầy thùng, so với GDP Việt Nam ----------------
def s_ipo(t0, t1):
    st = Stage(t0, t1, world=(2400, 1350), seed=21)
    TOP, BOT, BW = 360, 1100, 500
    BX = (760, 1640)
    for cx in BX:
        x0, x1 = cx - BW / 2, cx + BW / 2
        st.fills.append(([(x0, TOP), (x1, TOP), (x1, BOT), (x0, BOT)], CREAM))
        st.wall((x0, TOP), (x0, BOT), 7)
        st.wall((x1, TOP), (x1, BOT), 7)
        st.wall((x0, BOT), (x1, BOT), 7)
    ti, tla = A(11, "IPO"), A(11, "la")
    st.pour(ti - 0.3, tla - 0.2, 150, (BX[0] - 200, BX[0] + 200), -90, rate=lambda u: 0.5 + u)
    tm, tn = A(13, "mấy"), A(13, "năm")
    st.pour(tm - 0.35, tn - 0.4, 51, (BX[1] - 200, BX[1] + 200), -90, color=RED)
    t3, trec = A(14, None, -0.4), A(15, "lớn")
    st.shake += [(t3, 16), (trec, 16)]
    st.sounds += [(t3, "paper", 0.45), (trec, "paper", 0.45)]
    s3, srec = stamp("GẤP ~3 LẦN", 78, seed=2), stamp("KỶ LỤC NGÀNH AI", 84, seed=5)

    def top(d, img, t, snap):
        na = coins_in(snap, BX[0] - BW / 2, BX[0] + BW / 2, TOP - 30)
        nb = coins_in(snap, BX[1] - BW / 2, BX[1] + BW / 2, TOP - 30)
        if na:
            place(img, text_img(f"{na * 10:,} TỶ $".replace(",", "."), 92, BLACK, stroke=10), (BX[0], TOP - 70))
        if nb:
            place(img, text_img(f"{round(nb * 514 / 51)} TỶ $", 92, RED, stroke=10), (BX[1], TOP - 70))
        place(img, text_img("ANTHROPIC", 64, BLACK, stroke=6), (BX[0], BOT + 62), prog(t, ti - 0.3, ti))
        place(img, text_img("ĐỊNH GIÁ KHI LÊN SÀN", 34, RED, stroke=5), (BX[0], BOT + 118), prog(t, ti - 0.2, ti + 0.1))
        place(img, text_img("VIỆT NAM", 64, BLACK, stroke=6), (BX[1], BOT + 62), prog(t, tm - 0.6, tm - 0.3))
        place(img, text_img("GDP CẢ NĂM 2025", 34, RED, stroke=5), (BX[1], BOT + 118), prog(t, tm - 0.5, tm - 0.2))
        slam(img, s3.rotate(-6, expand=True, resample=Image.BICUBIC), (1190, 170), t, t3)
        slam(img, srec.rotate(8, expand=True, resample=Image.BICUBIC), (BX[0], 700), t, trec)
    st.top_fns.append(top)
    tp0, tp1 = A(12, None, -0.3), A(12, "gấp")

    def cam(t):
        k = ease_io(prog(t, tp0, tp1))
        k2 = ease_io(prog(t, A(14, None), t1))
        cx = 900 + 300 * k - 120 * k2
        vw = 2000 + 400 * k - 200 * k2
        return cx, 700 - 25 * k, vw
    st.cam = cam
    LEG = card(440, 72, [("1 ĐỒNG XU = 10 TỶ $", 34, CREAM)], bg=BLACK, seed=14)

    def scr(img, t):
        place(img, LEG, (1880 - LEG.width / 2, 1040), prog(t, ti - 0.3, ti))
        if t > tm:
            place(img, text_img("Nguồn: Tổng cục Thống kê – GDP Việt Nam 2025 ước 514 tỷ USD", 24, INK), (500, 1046), prog(t, tm, tm + 0.4), back=False)
    st.screen_fns.append(scr)
    return st

# ---------------- cảnh 4: Anthropic → Claude, dấu hỏi to ----------------
def s_company(t0, t1, people):
    st = Stage(t0, t1, seed=31)
    FL = 860
    st.wall((180, FL), (1932, FL), 5)
    st.wall((180, -900), (180, FL), 5, draw=False)
    st.wall((1932, -900), (1932, FL), 5, draw=False)
    anth = card(780, 196, [("ANTHROPIC", 118, BLACK)], seed=7)
    st.at(A(19, None, -0.5), lambda s: s.solid(anth, 600, -150, mass=9, angle=-0.03))
    stk = strip_baked_shadow(C.sticker(os.path.join(people, "dario_cut.png"), 220, C.RED_RGB, outline=12))
    lab = card(stk.width - 10, 52, [("CEO DARIO AMODEI", 26, BLACK)], seed=8)
    dar = Image.new("RGBA", (stk.width, stk.height + 40), (0, 0, 0, 0))
    dar.alpha_composite(stk)
    dar.alpha_composite(lab, (0, stk.height - 30))
    st.at(A(19, "tức", -0.45), lambda s: s.solid(dar, 470, -260, mass=3, angle=0.1, box=(dar.width - 40, dar.height - 40), z=3))
    cla = card(640, 220, [("CLAUDE", 124, RED), ("TRỢ LÝ AI", 38, BLACK)], seed=9)
    st.at(A(19, "Claude", -0.5), lambda s: s.solid(cla, 1490, -170, mass=8, angle=0.05))
    q = glyph("?", 520)
    st.at(A(20, "bán", -0.5), lambda s: s.solid(q, 1060, -420, mass=16, angle=0.25, box=(q.width - 40, q.height - 40), z=4,
                                                   sound=("paper", 0.5)))
    ta0, ta1 = A(19, "cha", -0.15), A(19, "cha", 0.75)
    pts = [(940 + 520 * u, 500 - 210 * math.sin(math.pi * u) + 80 * u) for u in np.linspace(0, 1, 60)]

    def arrow(d, img, t, snap):
        k = ease_out(prog(t, ta0, ta1))
        n = int(k * (len(pts) - 1))
        if n >= 1:
            d.line(pts[:n + 1], fill=RED + (255,), width=13, joint="curve")
        if k >= 1:
            (x0, y0), (x1, y1) = pts[-6], pts[-1]
            a = math.atan2(y1 - y0, x1 - x0)
            d.polygon([(x1 + 30 * math.cos(a), y1 + 30 * math.sin(a)),
                       (x1 + 34 * math.cos(a + 2.4), y1 + 34 * math.sin(a + 2.4)),
                       (x1 + 34 * math.cos(a - 2.4), y1 + 34 * math.sin(a - 2.4))], fill=RED + (255,))
        place(img, text_img("CÔNG TY ĐỨNG SAU", 44, BLACK, stroke=6), (1200, 270), prog(t, ta0, ta0 + 0.3))
    st.top_fns.append(arrow)
    st.cam = lambda t: (1000 + 56 * ease_io(prog(t, t0, t1)), 600, 1960 + 152 * ease_io(prog(t, t0, t1)))
    return st

# ---------------- cảnh 5: xô thủng – doanh thu đổ vào x13, tiền vẫn cháy ----------------
def s_burn(t0, t1):
    st = Stage(t0, t1, seed=41)
    st.kill_y = 1010
    T, B = 300, 800
    st.fills.append(([(700, T), (1412, T), (1232, B), (880, B)], CREAM))
    st.wall((700, T), (880, B), 7)
    st.wall((1412, T), (1232, B), 7)
    st.wall((880, B), (938, B), 7)
    st.wall((1174, B), (1232, B), 7)
    th, tt = A(21, "Họ"), A(21, "tiền?")
    st.pour(th - 0.45, tt, 230, (930, 1180), -80, vx=(-30, 30), rate=lambda u: 13 ** u)
    td, ttg, tn, tdot = A(21, "doanh"), A(21, "tăng"), A(21, "năm"), A(21, "đốt")

    def fire(d, img, t, snap):
        grow = 1 + 0.9 * ease_out(prog(t, tdot - 0.2, tdot + 0.3))
        for layer, (col, sc) in enumerate(((RED, 1.0), ((232, 118, 43), 0.72), (GOLD, 0.45))):
            pts = []
            for i in range(13):
                u = i / 12
                x = 1056 + (u - 0.5) * 420 * sc
                spike = (1 if i % 2 else 0.45) * (150 + 40 * math.sin(t * 9 + i * 1.7 + layer)) * sc * grow
                pts.append((x, 1090 - spike * math.sin(math.pi * u) ** 0.6))
            pts += [(1056 + 210 * sc, 1090), (1056 - 210 * sc, 1090)]
            d.polygon(pts, fill=col + (255,), outline=BLACK + (255,) if layer == 0 else None, width=5)
        place(img, text_img("DOANH THU ĐỔ VÀO", 60, BLACK, stroke=6), (520, 250), prog(t, td - 0.2, td + 0.15))
        if t >= ttg:
            v = "6T ĐẦU 2025: 1,2 TỶ $" if t < tn else "6T ĐẦU 2026: 16,3 TỶ $"
            place(img, text_img(v, 64, RED, stroke=8), (520, 340), prog(t, ttg, ttg + 0.25) if t < tn else prog(t, tn, tn + 0.25))
        place(img, text_img("VẪN ĐỐT TIỀN", 96, RED, stroke=10), (1580, 960), prog(t, tdot - 0.1, tdot + 0.25))
    st.top_fns.append(fire)
    st.cam = lambda t: (1056, 600, 2112 - 120 * ease_io(prog(t, t0, t1)))

    def scr(img, t):
        place(img, text_img("Nguồn: hồ sơ S-1 của Anthropic (6 tháng đầu 2025 và 2026)", 24, INK), (380, 1046), prog(t, ttg, ttg + 0.4), back=False)
    st.screen_fns.append(scr)
    return st

# ---------------- cảnh 6: kết mở đầu ----------------
def s_end(t0, t1):
    st = Stage(t0, t1, seed=51)
    FL = 820
    st.wall((200, FL), (1912, FL), 5)
    st.wall((200, -900), (200, FL), 5, draw=False)
    st.wall((1912, -900), (1912, FL), 5, draw=False)
    st.pour(t0 + 0.1, t1 - 0.6, 90, (230, 1880), -80, behind=True)
    tag = card(500, 96, [("TRONG VIDEO NÀY", 50, CREAM)], bg=BLACK, seed=12)
    st.at(A(22, "trong", -0.45), lambda s: s.solid(tag, 330, -120, mass=3, angle=-0.08, z=3))
    pl = card(1380, 180, [("GIẢI THÍCH THẬT ĐƠN GIẢN", 104, RED)], seed=13)
    st.at(A(22, "giải", -0.5), lambda s: s.solid(pl, 1250, -200, mass=10, angle=-0.03, z=4))
    st.cam = lambda t: (1056, 600, 1960 + 152 * ease_io(prog(t, t0, t1)))
    return st

def build(people):
    ev.WORDS = G["words"]
    cut = [0.0, A(8, "cỗ", -0.1), A(11, None, -0.2), A(19, None, -0.25), A(21, None, -0.2), A(22, None, -0.25), G["dur"]]
    makers = [s_open, s_scale, s_ipo, lambda a, b: s_company(a, b, people), s_burn, s_end]
    return [m(cut[i], cut[i + 1]).run(extra=SLIDE + 0.1) for i, m in enumerate(makers)]

def render(fi):
    t = fi / FPS
    S = G["stages"]
    i = max(j for j, s in enumerate(S) if s.t0 <= t)
    cur = render_stage(S[i], t)
    if i > 0 and t - S[i].t0 < SLIDE:
        cur = page_slide(render_stage(S[i - 1], t), cur, (t - S[i].t0) / SLIDE)
    a = np.asarray(cur.convert("RGB"), np.float32)
    a *= min(1, t / 0.3, (G["dur"] - t) / 0.6)
    return np.clip(a, 0, 255).astype("uint8").tobytes()

def main(voice, words, people, sfx_dir, out):
    G["words"] = json.load(open(words))
    ev.WORDS = G["words"]
    G["dur"] = A(22, "giản") + 1.6
    G["stages"] = build(people)
    dur = G["dur"]
    if os.environ.get("PREVIEW"):
        for tt in [float(x) for x in os.environ["PREVIEW"].split(",")]:
            Image.frombytes("RGB", (OW, OH), render(int(tt * FPS))).resize((960, 540)).save(out.replace(".mp4", f"_{tt}.jpg"))
        return
    events = []
    for k, s in enumerate(G["stages"]):
        events += [e for e in s.sounds if s.t0 <= e[0] < s.t1 + (0 if k + 1 < len(G["stages"]) else 9)]
        if k:
            events.append((s.t0, "whoosh", 0.12))
    mixed = out.replace(".mp4", "_mix.wav")
    mix_audio(voice, [os.path.join(sfx_dir, "music2.mp3")], sfx_dir, events, [], mixed, dur, music_db=-31)
    if os.environ.get("AUDIO_ONLY"):  # chỉ trộn lại tiếng, giữ nguyên hình của bản đã render
        src = os.environ["AUDIO_ONLY"]
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-i", mixed, "-map", "0:v", "-map", "1:a", "-c:v", "copy",
                        "-c:a", "aac", "-b:a", "192k", "-shortest", out], check=True)
        return
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{OW}x{OH}", "-r", str(FPS),
                           "-i", "-", "-i", mixed, "-shortest", "-c:v", "libx264", "-preset", "slow", "-pix_fmt", "yuv420p",
                           "-crf", "18", "-c:a", "aac", "-b:a", "192k", out], stdin=subprocess.PIPE)
    with Pool(4) as pool:
        for fr in pool.imap(render, range(int(dur * FPS)), chunksize=4):
            ff.stdin.write(fr)
    ff.stdin.close()
    ff.wait()

if __name__ == "__main__":
    main(*sys.argv[1:])
