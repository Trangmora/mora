"""Khuôn cảnh dùng lại cho phong cách "Vật lý giấy cắt" (phys.py).

Mọi mốc thời gian truyền vào là giây trên trục giọng đã cắt (lấy bằng A(câu, cụm chữ)).
Quy ước: vật thả rơi bắt đầu rơi 0,5 s TRƯỚC chữ được nói để chạm đất đúng lúc.
"""
import math
import numpy as np
import pymunk
from PIL import Image, ImageDraw

from phys import (Stage, RED, BLACK, CREAM, GOLD, INK, CAT_SOLID, card, glyph, stamp, text_img, place, slam, prog,
                  ease_io, ease_out, font, comp)

ORANGE = (232, 118, 43)
LEAD = 0.5          # thả trước chữ bao lâu
W0, H0 = 2112, 1188

def T(s, size=64, col=BLACK):
    return (s, size, col)

def mk(lines, bg=CREAM, seed=0, padx=56, pady=30, minw=0):
    """Thẻ giấy tự co theo chữ."""
    w = max(font(s).getbbox(t)[2] - font(s).getbbox(t)[0] for t, s, _ in lines) + 2 * padx
    h = sum(int(s * 1.16) for _, s, _ in lines) + 2 * pady
    return card(int(max(w, minw)), int(h), lines, bg=bg, seed=seed)

def tag(s, size=48, seed=0):
    return mk([T(s, size, CREAM)], bg=BLACK, seed=seed, padx=30, pady=16)

def num(n, seed=0):
    """Thẻ số chương mục (1, 2, 3) – ô đỏ chữ kem."""
    return mk([T(str(n), 90, CREAM)], bg=RED, seed=seed, padx=34, pady=10)

def source(st, txt, t_on):
    st.screen_fns.append(lambda img, t: place(img, text_img(txt, 24, INK), (40 + text_img(txt, 24, INK).width / 2, 1046),
                                              prog(t, t_on, t_on + 0.4), back=False) if t >= t_on else None)

def legend(st, txt, t_on):
    im = mk([T(txt, 34, CREAM)], bg=BLACK, seed=14, padx=24, pady=12)
    st.screen_fns.append(lambda img, t: place(img, im, (1880 - im.width / 2, 1040), prog(t, t_on, t_on + 0.3)))

def heading(st, t_on, s, size=72, col=BLACK, xy=(1056, 150), t_off=None):
    im = text_img(s, size, col, stroke=8)
    def f(d, img, t, snap):
        if t >= t_on and (t_off is None or t < t_off):
            place(img, im, xy, prog(t, t_on, t_on + 0.35))
    st.top_fns.append(f)

def stamps(st, items):
    """items: (t, chữ, (x,y), góc, cỡ). Dấu mộc trên nhãn giấy, rung nhẹ, tiếng giấy (KHÔNG tiếng bùm)."""
    ims = [(t, stamp(s, size, seed=int(t * 10) % 97).rotate(rot, expand=True, resample=Image.BICUBIC), xy) for t, s, xy, rot, size in items]
    for t, _, _ in ims:
        st.shake.append((t, 12))
        st.sounds.append((t, "paper", 0.45))
    st.top_fns.append(lambda d, img, t, snap: [slam(img, im, xy, t, ts) for ts, im, xy in ims])

def floor_walls(st, FL, x0=170, x1=1942, draw=True):
    st.wall((x0, FL), (x1, FL), 5, draw=draw)
    st.wall((x0, -1400), (x0, FL), 5, draw=False)
    st.wall((x1, -1400), (x1, FL), 5, draw=False)

def drift(st, t0, t1, cx=1056, cy=600, a=2112, b=1980):
    st.cam = lambda t: (cx, cy, a + (b - a) * ease_io(prog(t, t0, t1)))

# ======================================================================================
def board(t0, t1, drops=(), pours=(), stamp_items=(), heads=(), FL=800, seed=0, cam=None, src=None, leg=None, floor=True):
    """Cảnh thả thẻ: drops = (t_chữ, ảnh, x[, dict]) – thẻ rơi chạm sàn đúng chữ; pours = (ta, tb, n, màu) xu đổ phía sau."""
    st = Stage(t0, t1, seed=seed)
    floor_walls(st, FL, draw=floor)
    for d in drops:
        tt, im, x = d[:3]
        kw = d[3] if len(d) > 3 else {}
        st.at(tt - kw.get("lead", LEAD), lambda s, im=im, x=x, kw=kw: s.solid(
            im, x, kw.get("y", -im.height / 2 - 60), mass=kw.get("mass", 4 + im.width * im.height / 60000),
            angle=kw.get("ang", s.rng.uniform(-0.03, 0.03)), z=kw.get("z", 2), box=kw.get("box"),
            sound=kw.get("snd", ("paper", 0.45)), elastic=0.04, inertia=kw.get("inertia", 5.0)))
    for ta, tb, n, col in pours:
        st.pour(ta, tb, n, (220, 1890), -90, color=col, behind=True)
    if stamp_items:
        stamps(st, stamp_items)
    for h in heads:
        heading(st, *h)
    if cam:
        st.cam = cam
    else:
        drift(st, t0, t1)
    if src:
        source(st, *src)
    if leg:
        legend(st, *leg)
    return st

# ======================================================================================
def bins(t0, t1, items, TOP=330, BOT=960, BW=380, R=22, seed=0, heads=(), stamp_items=(), src=None, leg=None, cam=None,
         world=(W0, H0)):
    """Thùng xu so sánh. items: dict(cx, n, color, label, sub, ta, tb, fmt) – fmt(k, n) → chữ trên thùng."""
    st = Stage(t0, t1, world=world, seed=seed)
    for it in items:
        cx = it["cx"]
        x0, x1 = cx - BW / 2, cx + BW / 2
        st.fills.append(([(x0, TOP), (x1, TOP), (x1, BOT), (x0, BOT)], CREAM))
        st.wall((x0, TOP), (x0, BOT), 7)
        st.wall((x1, TOP), (x1, BOT), 7)
        st.wall((x0, BOT), (x1, BOT), 7)
        if it.get("n"):
            if it.get("pre"):   # đổ sẵn trước khi cảnh hiện (đã nói ở cảnh trước)
                st.pour(t0 - 2.5, t0 - 0.6, it["n"], (x0 + R + 8, x1 - R - 8), -90, R=R, color=it["color"])
            else:
                st.pour(it["ta"], it["tb"], it["n"], (x0 + R + 8, x1 - R - 8), -90, R=R, color=it["color"])

    def top(d, img, t, snap):
        for it in items:
            cx = it["cx"]
            k = sum(1 for p in snap if p is not None and cx - BW / 2 < p[0] < cx + BW / 2 and p[1] > TOP - 30)
            if k and it.get("fmt"):
                place(img, text_img(it["fmt"](k, it["n"]), it.get("fs", 80), it.get("tcol", BLACK), stroke=10), (cx, TOP - 64))
            ton = it.get("lab_t", it.get("ta", t0))
            place(img, text_img(it["label"], 54, BLACK, stroke=6), (cx, BOT + 56), prog(t, ton - 0.4, ton - 0.1))
            if it.get("sub"):
                place(img, text_img(it["sub"], 32, RED, stroke=5), (cx, BOT + 106), prog(t, ton - 0.3, ton))
    st.top_fns.append(top)
    for h in heads:
        heading(st, *h)
    if stamp_items:
        stamps(st, stamp_items)
    st.cam = cam or (lambda t: (world[0] / 2, world[1] / 2 + 20, world[0] - 110 * ease_io(prog(t, t0, t1))))
    if src:
        source(st, *src)
    if leg:
        legend(st, *leg)
    st.pre_t = t0 - 2.6
    return st

# ======================================================================================
def scale(t0, t1, left, right, lab=("LỜI", "LỖ"), heads=(), stamp_items=(), spin=0.35, seed=0):
    """Cân hai đĩa treo thật. left/right: danh sách (t, số xu) thả vào đĩa."""
    st = Stage(t0, t1, seed=seed, damping=0.75)
    sp = st.sp
    FL, PX, PY, L = 1000, 1056, 540, 430
    st.wall((520, FL), (1592, FL), 5)
    st.wall((PX, FL), (PX, PY + 30), 9)
    st.fills.append(([(970, FL), (1142, FL), (1110, FL - 46), (1002, FL - 46)], BLACK))
    beam = pymunk.Body(24, pymunk.moment_for_segment(24, (-L, 0), (L, 0), 10))
    beam.position = (PX, PY)
    beam.angular_velocity = spin
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
            bw = [tf((px, py), x, y, pa) for x, y in ((-168, -46), (-150, 0), (150, 0), (168, -46), (150, 10), (-150, 10))]
            d.polygon([bw[0], bw[1], bw[2], bw[3], (bw[3][0], bw[3][1] + 14), bw[4], bw[5], (bw[0][0], bw[0][1] + 14)],
                      fill=CREAM + (255,), outline=BLACK + (255,), width=6)
            place(img, text_img(lab[k], 74, BLACK if k == 0 else RED, stroke=8), (px, py + 78))
        poly = [tf((bx, by), x, y, ba) for x, y in ((-L - 14, -13), (L + 14, -13), (L + 14, 13), (-L - 14, 13))]
        d.polygon(poly, fill=CREAM + (255,), outline=BLACK + (255,), width=6)
        d.ellipse((PX - 22, PY - 22, PX + 22, PY + 22), fill=RED + (255,), outline=BLACK + (255,), width=5)
    st.world_fns.append(draw)
    for side, evs in ((-1, left), (1, right)):
        for tt, n in evs:
            for k in range(n):
                st.at(tt - LEAD + k * 0.05, lambda s, k=k, side=side: s.coin(PX + side * L + s.rng.uniform(-70, 70), -40 - k * 30, 26))
    for h in heads:
        heading(st, *h)
    if stamp_items:
        stamps(st, stamp_items)
    drift(st, t0, t1, cy=600, b=1960)
    return st

# ======================================================================================
def bucket(t0, t1, pours, hole=True, fire=True, labels=(), stamp_items=(), heads=(), t_fire=None, src=None, seed=0):
    """Xô: tiền đổ vào từ trên; hole=True → chảy qua đáy rơi vào lửa giấy (đốt tiền); False → tiền tích lại (lãi)."""
    st = Stage(t0, t1, seed=seed)
    T_, B = 300, 800
    st.fills.append(([(700, T_), (1412, T_), (1232, B), (880, B)], CREAM))
    st.wall((700, T_), (880, B), 7)
    st.wall((1412, T_), (1232, B), 7)
    if hole:
        st.wall((880, B), (938, B), 7)
        st.wall((1174, B), (1232, B), 7)
        st.kill_y = 1010
    else:
        st.wall((880, B), (1232, B), 7)
    for ta, tb, n, rate in pours:
        st.pour(ta, tb, n, (930, 1180), -80, vx=(-30, 30), rate=rate)

    def draw(d, img, t, snap):
        if fire:
            grow = 1 + (0.9 * ease_out(prog(t, t_fire - 0.2, t_fire + 0.3)) if t_fire else 0)
            for layer, (col, sc) in enumerate(((RED, 1.0), (ORANGE, 0.72), (GOLD, 0.45))):
                pts = []
                for i in range(13):
                    u = i / 12
                    x = 1056 + (u - 0.5) * 420 * sc
                    spike = (1 if i % 2 else 0.45) * (150 + 40 * math.sin(t * 9 + i * 1.7 + layer)) * sc * grow
                    pts.append((x, 1090 - spike * math.sin(math.pi * u) ** 0.6))
                pts += [(1056 + 210 * sc, 1090), (1056 - 210 * sc, 1090)]
                d.polygon(pts, fill=col + (255,), outline=BLACK + (255,) if layer == 0 else None, width=5)
        for tt, s, size, col, xy in labels:
            if t >= tt:
                place(img, text_img(s, size, col, stroke=8), xy, prog(t, tt, tt + 0.3))
    st.top_fns.append(draw)
    for h in heads:
        heading(st, *h)
    if stamp_items:
        stamps(st, stamp_items)
    drift(st, t0, t1, b=1990)
    if src:
        source(st, *src)
    return st

# ======================================================================================
def meter(t0, t1, chips_t, n_chips, words, label="TOKEN", heads=(), stamp_items=(), coins_out=True, seed=0, src=None,
          extra_drops=()):
    """Đồng hồ token: các mẩu chữ rơi vào phễu, qua đồng hồ thì số nhảy + kim quay, tiền rơi ra dưới."""
    st = Stage(t0, t1, seed=seed)
    MX, MY, MR = 1056, 610, 190
    FL = 1060
    st.wall((220, FL), (1892, FL), 5)
    st.wall((220, -1400), (220, FL), 5, draw=False)
    st.wall((1892, -1400), (1892, FL), 5, draw=False)
    st.wall((760, 120), (1000, 330), 7)       # phễu
    st.wall((1352, 120), (1112, 330), 7)
    chip_ims = [mk([T(w, 34, BLACK)], seed=i, padx=18, pady=10) for i, w in enumerate(words)]
    ta, tb = chips_t
    passed = []
    for k in range(n_chips):
        tt = ta + (tb - ta) * k / max(1, n_chips - 1)
        def drop(s, k=k):
            b = s.solid(chip_ims[k % len(chip_ims)], s.rng.uniform(880, 1232), -60, mass=1, angle=s.rng.uniform(-0.6, 0.6), z=1,
                        sound=False)
            b.kill = 380
            if coins_out and k % 3 == 0:
                s.at(s_time(s) + 0.45, lambda s2: s2.coin(MX + s2.rng.uniform(-40, 40), MY + MR + 40, 22,
                                                          vx=s2.rng.uniform(-260, 260), vy=200, behind=True))
        st.at(tt, drop)
        passed.append(tt + 0.55)

    def draw(d, img, t, snap):
        cnt = sum(1 for p in passed if p <= t)
        d.ellipse((MX - MR, MY - MR, MX + MR, MY + MR), fill=CREAM + (255,), outline=BLACK + (255,), width=10)
        for i in range(11):
            a = math.radians(210 - i * 24)
            r0, r1 = MR - 18, MR - (44 if i % 5 == 0 else 32)
            d.line(((MX + r0 * math.cos(a), MY - r0 * math.sin(a)), (MX + r1 * math.cos(a), MY - r1 * math.sin(a))),
                   fill=BLACK + (255,), width=6)
        ang = math.radians(210 - (cnt * 37 + t * 40) % 240)
        d.line(((MX, MY), (MX + (MR - 50) * math.cos(ang), MY - (MR - 50) * math.sin(ang))), fill=RED + (255,), width=12)
        d.ellipse((MX - 18, MY - 18, MX + 18, MY + 18), fill=BLACK + (255,))
        d.rounded_rectangle((MX - 150, MY + 46, MX + 150, MY + 116), 10, fill=BLACK + (255,))
        d.text((MX, MY + 81), f"{cnt * 137:07d}", font=font(46), fill=GOLD + (255,), anchor="mm")
        place(img, text_img(label, 44, BLACK, stroke=6), (MX, MY - MR - 40))
    st.top_fns.append(draw)
    st.fills.append(([(MX - 60, 330), (MX + 60, 330), (MX + 60, MY - MR + 10), (MX - 60, MY - MR + 10)], CREAM))
    st.statics += [((MX - 60, 330), (MX - 60, MY - MR + 10), 6), ((MX + 60, 330), (MX + 60, MY - MR + 10), 6)]
    for d in extra_drops:
        tt, im, x = d[:3]
        st.at(tt - LEAD, lambda s, im=im, x=x: s.solid(im, x, -im.height / 2 - 60, mass=4, angle=s.rng.uniform(-0.02, 0.02), z=3,
                                                        elastic=0.04, inertia=5.0))
    for h in heads:
        heading(st, *h)
    if stamp_items:
        stamps(st, stamp_items)
    drift(st, t0, t1, b=2000)
    if src:
        source(st, *src)
    return st

def s_time(st):
    return st._now

# ======================================================================================
def loop(t0, t1, a_lab, b_lab, steps, heads=(), stamp_items=(), counter=None, seed=0, src=None):
    """Dòng tiền vòng tròn giữa hai thẻ cố định. steps: (t_bắt_đầu, hướng 'ab'|'ba', nhãn mũi tên, số xu)."""
    st = Stage(t0, t1, seed=seed)
    A_ = (440, 600)
    B_ = (1672, 600)
    ca, cb = mk([T(a_lab, 76, BLACK)], seed=1, minw=460), mk([T(b_lab, 76, RED)], seed=2, minw=460)

    def path(u, d):
        # cung trên (a→b) hoặc cung dưới (b→a)
        if d == "ab":
            x = A_[0] + (B_[0] - A_[0]) * u
            y = 600 - 300 * math.sin(math.pi * u)
        else:
            x = B_[0] + (A_[0] - B_[0]) * u
            y = 600 + 300 * math.sin(math.pi * u)
        return x, y
    coin_im = __import__("phys").coin_sprites(24, GOLD)

    def draw(d, img, t, snap):
        for ts, dr, lab, n in steps:
            if t < ts:
                continue
            k = ease_out(prog(t, ts, ts + 0.6))
            pts = [path(u, dr) for u in np.linspace(0, k, 40)]
            if len(pts) > 1:
                d.line(pts, fill=RED + (255,) if dr == "ba" else BLACK + (255,), width=10, joint="curve")
            if k >= 1:
                (x0, y0), (x1, y1) = path(0.96, dr), path(1.0, dr)
                a = math.atan2(y1 - y0, x1 - x0)
                col = RED if dr == "ba" else BLACK
                d.polygon([(x1 + 30 * math.cos(a), y1 + 30 * math.sin(a)), (x1 + 34 * math.cos(a + 2.4), y1 + 34 * math.sin(a + 2.4)),
                           (x1 + 34 * math.cos(a - 2.4), y1 + 34 * math.sin(a - 2.4))], fill=col + (255,))
            mx, my = path(0.5, dr)
            place(img, text_img(lab, 46, BLACK if dr == "ab" else RED, stroke=7), (mx, my + (-60 if dr == "ab" else 60)),
                  prog(t, ts + 0.2, ts + 0.5))
            for i in range(n):  # đồng xu chạy dọc cung
                u = (t - ts - 0.6 - i * 0.18) / 1.2
                if 0 <= u <= 1:
                    x, y = path(ease_io(u), dr)
                    im = coin_im[int(t * 20 + i) % 36]
                    comp(img, im, x - im.width / 2, y - im.height / 2)
        comp(img, ca, A_[0] - ca.width / 2, A_[1] - ca.height / 2)
        comp(img, cb, B_[0] - cb.width / 2, B_[1] - cb.height / 2)
        if counter:
            tt, lab = counter
            if t >= tt:
                place(img, text_img(lab, 40, RED, stroke=6), (A_[0], A_[1] + 120), prog(t, tt, tt + 0.3))
    st.top_fns.append(draw)
    for h in heads:
        heading(st, *h)
    if stamp_items:
        stamps(st, stamp_items)
    drift(st, t0, t1, b=1990)
    if src:
        source(st, *src)
    return st

# ======================================================================================
def factory(st, x=1056, base=860, w=520, label="ANTHROPIC", puffs_t=None, puff_lab=None):
    """Nhà máy giấy cắt (tĩnh) + khói giấy bay lên."""
    x0, x1 = x - w / 2, x + w / 2
    roof = base - 230
    st.fills.append(([(x0, base), (x1, base), (x1, roof), (x0 + w * 0.66, roof - 90), (x0 + w * 0.66, roof), (x0 + w * 0.33, roof - 90),
                      (x0 + w * 0.33, roof), (x0, roof - 90)], CREAM))
    st.fills.append(([(x1 - 110, roof), (x1 - 40, roof), (x1 - 40, roof - 170), (x1 - 110, roof - 170)], CREAM))
    pts = [(x0, base), (x0, roof - 90), (x0 + w * 0.33, roof), (x0 + w * 0.33, roof - 90), (x0 + w * 0.66, roof), (x0 + w * 0.66, roof - 90),
           (x1 - 110, roof - 30), (x1 - 110, roof - 170), (x1 - 40, roof - 170), (x1 - 40, roof), (x1, roof), (x1, base)]
    st.statics += [(pts[i], pts[i + 1], 6) for i in range(len(pts) - 1)]
    for i in range(3):
        wx = x0 + 60 + i * (w - 120) / 2
        st.fills.append(([(wx - 36, base - 150), (wx + 36, base - 150), (wx + 36, base - 80), (wx - 36, base - 80)], GOLD))
    cx_, cy_ = x1 - 75, roof - 180

    def smoke(d, img, t, snap):
        for i in range(6):
            u = ((t * 0.45 + i / 6) % 1)
            r = 22 + 44 * u
            px, py = cx_ + 30 * math.sin(u * 5 + i) + 90 * u, cy_ - 150 * u
            a = int(255 * (1 - u) ** 0.7)
            d.ellipse((px - r, py - r, px + r, py + r), fill=(250, 248, 242, a), outline=(28, 28, 28, a), width=5)
    def labels(d, img, t, snap):
        place(img, text_img(label, 56, BLACK, stroke=6), (x, base + 50))
        if puffs_t and t >= puffs_t:
            place(img, text_img(puff_lab, 64, RED, stroke=8), (cx_ + 60, cy_ - 150), prog(t, puffs_t, puffs_t + 0.4))
    st.world_fns.append(smoke)
    st.top_fns.append(labels)

# ---------- hình nhỏ ----------
def bowl_sprite():
    im = Image.new("RGBA", (300, 230), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    for i in range(3):
        x = 100 + i * 50
        d.line([(x + 12 * math.sin(k / 3), 20 + k * 6) for k in range(12)], fill=INK + (255,), width=6)
    d.pieslice((20, 10, 280, 250), 0, 180, fill=CREAM + (255,), outline=BLACK + (255,), width=8)
    d.rectangle((20, 124, 280, 140), fill=RED + (255,))
    d.text((150, 175), "PHỞ", font=font(44), fill=BLACK + (255,), anchor="mm")
    return im

def house_sprite(seed=0):
    im = Image.new("RGBA", (70, 70), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.polygon([(6, 30), (35, 4), (64, 30)], fill=RED + (255,), outline=BLACK + (255,))
    d.rectangle((12, 30, 58, 66), fill=CREAM + (255,), outline=BLACK + (255,), width=4)
    d.rectangle((28, 44, 42, 66), fill=BLACK + (255,))
    return im

def chip_sprite():
    im = Image.new("RGBA", (84, 84), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    for i in range(4):
        p = 18 + i * 16
        for a, b in (((p, 2), (p, 14)), ((p, 70), (p, 82)), ((2, p), (14, p)), ((70, p), (82, p))):
            d.line((a, b), fill=GOLD + (255,), width=6)
    d.rounded_rectangle((12, 12, 72, 72), 8, fill=BLACK + (255,))
    d.text((42, 43), "AI", font=font(26), fill=GOLD + (255,), anchor="mm")
    return im

def egg_sprite():
    im = Image.new("RGBA", (80, 100), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.ellipse((6, 6, 74, 94), fill=GOLD + (255,), outline=BLACK + (255,), width=6)
    d.ellipse((20, 22, 34, 44), fill=(255, 236, 170, 255))
    return im

def weight_sprite(txt):
    im = Image.new("RGBA", (560, 330), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.ellipse((230, 0, 330, 80), outline=BLACK + (255,), width=16)
    d.polygon([(90, 60), (470, 60), (550, 320), (10, 320)], fill=BLACK + (255,))
    d.text((280, 200), txt, font=font(84), fill=CREAM + (255,), anchor="mm")
    return im


def row(items, x0=200, x1=1912, gap=40):
    """Xếp thẻ thành một hàng ngay ngắn theo bề rộng thật: items = (t, ảnh[, dict]) → drops có x tính sẵn."""
    ws = [it[1].width for it in items]
    need = sum(ws) + gap * (len(items) - 1)
    if need > x1 - x0:  # quá rộng → thu nhỏ đều các thẻ cho vừa hàng (không bao giờ chồng lên nhau)
        k = (x1 - x0 - gap * (len(items) - 1)) / sum(ws)
        items = [(it[0], it[1].resize((int(it[1].width * k), int(it[1].height * k)), Image.LANCZOS)) + tuple(it[2:]) for it in items]
        ws = [it[1].width for it in items]
    free = (x1 - x0) - sum(ws)
    g = min(gap, free / max(1, len(items) - 1)) if len(items) > 1 else 0
    total = sum(ws) + g * (len(items) - 1)
    x = (x0 + x1) / 2 - total / 2
    out = []
    for it, w in zip(items, ws):
        out.append((it[0], it[1], x + w / 2) + ((it[2],) if len(it) > 2 else ()))
        x += w + g
    return out
