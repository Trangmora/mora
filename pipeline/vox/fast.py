"""Phong cách nhịp nhanh (kiểu kênh giải thích tài chính): mỗi cảnh 2–4 giây, hình TRÀN KHUNG,
luôn có zoom/lia chậm, camera "dí" vào chi tiết, chữ khoá TO ở 1/3 dưới, chuyển cảnh trượt nhanh + tiếng vút.

Cảnh (shot): {"t": bắt đầu, "bg": ("photo", tên) | ("desk",), "zoom": (z0, z1), "pan": (dx, dy), "els": [...], "punch": [t...]}
Phần tử dùng lại draw_el của engine (label, big, stamp, headline, write, stroke, icon, doc, sticky...),
thêm "key" (chữ khoá 1/3 dưới) và "name" (thẻ tên kiểu bản tin).
"""
import math
import numpy as np
from PIL import Image

from vox import W, H, FPS, INK, prog, ease_io, ease_out, ease_back, lerp, esc, svg_to_rgba, Pen, torn_path, GOLD, MUSTARD
from engine import draw_el, desk_tile, sheet_image

def cover(img, w, h):
    """Cắt ảnh cho phủ kín khung w×h (giữ tỉ lệ)."""
    r = max(w / img.width, h / img.height)
    im = img.resize((int(img.width * r + 0.5), int(img.height * r + 0.5)), Image.LANCZOS)
    x, y = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))

def key_text(txt, t, t0, color="#e3262f", bg="#ffffff", size=86, y=900, accent=None):
    """Chữ khoá to: dải giấy xé tối màu trượt lên từ dưới."""
    k = prog(t, t0, t0 + 0.25)
    if k <= 0:
        return ""
    s = ease_back(k, 1.3)
    w = len(txt) * size * 0.64 + 90
    h = size * 1.5
    dy = (1 - ease_out(k)) * 120
    hl = ""
    if accent:
        hl = f'<rect x="{-w / 2 + 30:.0f}" y="{h / 2 - 22:.0f}" width="{(w - 60) * ease_out(prog(t, t0 + 0.15, t0 + 0.5)):.0f}" height="12" fill="{accent}"/>'
    return (f'<g transform="translate({W / 2},{y + dy:.1f}) scale({s:.3f})">'
            f'<path d="{torn_path(-w / 2 + 8, -h / 2 + 12, w, h, 11, 8)}" fill="#000" opacity="0.25"/>'
            f'<path d="{torn_path(-w / 2, -h / 2, w, h, 11, 8)}" fill="{bg}"/>{hl}'
            f'<text y="{size * 0.35:.1f}" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="{size}" '
            f'fill="{color}">{esc(txt)}</text></g>')

class Fast:
    def __init__(self, shots, photos, env, duration, sheet=True):
        self.shots = shots
        self.env = env
        self.duration = duration
        self.ph = {}
        for s in shots:
            if s["bg"][0] == "photo":
                n = s["bg"][1]
                if n not in self.ph:
                    big = Image.open(photos[n]).convert("RGB")
                    self.ph[n] = cover(big, int(W * 1.25), int(H * 1.25))  # dư 25% để zoom/lia
        for s_ in shots:
            for e in s_["els"]:
                if e["kind"] == "photo_card":
                    from vox import load_photo
                    e["_img"] = load_photo(e["src"], e.get("w", 320))
        tile = desk_tile()
        self.desk = np.tile(tile, (2, 2, 1))[:int(H * 1.25), :int(W * 1.25)].astype(np.uint8)
        self.desk_img = Image.fromarray(self.desk)
        if sheet:
            sh, shadow = sheet_image(int(W * 1.25 * 0.86), int(H * 1.25 * 0.86))
            x0, y0 = (self.desk_img.width - sh.width) // 2, (self.desk_img.height - sh.height) // 2
            d2 = self.desk_img.copy()
            d2.paste((60, 45, 30), (x0 + 12, y0 + 16), shadow)
            d2.paste(sh, (x0, y0), sh)
            self.sheet_img = d2

    def shot_at(self, t):
        idx = 0
        for i, s in enumerate(self.shots):
            if t >= s["t"]:
                idx = i
        return idx

    def frame_of(self, i, t):
        """Khung hình của cảnh i tại thời điểm t (đã zoom/lia + phần tử)."""
        s = self.shots[i]
        t0 = s["t"]
        t1 = self.shots[i + 1]["t"] if i + 1 < len(self.shots) else self.duration
        u = prog(t, t0, t1)
        z0, z1 = s.get("zoom", (1.0, 1.08))
        z = lerp(z0, z1, ease_io(u))
        for pt in s.get("punch", []):  # "dí" nhanh vào chi tiết
            z *= 1 + 0.10 * ease_out(prog(t, pt, pt + 0.3))
        dx, dy = s.get("pan", (0, 0))
        cxp, cyp = s.get("focus", (W / 2, H / 2))
        if s["bg"][0] == "photo":
            base = self.ph[s["bg"][1]]
        else:
            base = self.sheet_img if s.get("sheet", True) else self.desk_img
        # vùng nhìn trên ảnh nền (ảnh nền rộng 1.25 lần khung)
        bw, bh = base.size
        vw, vh = bw / 1.25 / z, bh / 1.25 / z
        cx = bw / 2 + dx * u + (cxp - W / 2) * (1 - 1 / z) * 1.25
        cy = bh / 2 + dy * u + (cyp - H / 2) * (1 - 1 / z) * 1.25
        x0 = max(0, min(bw - vw, cx - vw / 2))
        y0 = max(0, min(bh - vh, cy - vh / 2))
        img = base.crop((int(x0), int(y0), int(x0 + vw), int(y0 + vh))).resize((W, H), Image.BILINEAR)
        if s.get("dim"):
            img = Image.blend(img, Image.new("RGB", (W, H), (20, 24, 32)), s["dim"])
        # phần tử: vẽ trong khung, cùng phép zoom quanh tâm "focus"
        pen = Pen()
        inner = ""
        for e in s["els"]:
            if e["kind"] == "key":
                continue
            if e["kind"] == "photo_card":
                continue
            if e["kind"] in DOODLE:
                inner += DOODLE[e["kind"]](e, t)
                continue
            inner += draw_el(e, t, pen, None)
        sc = z
        tx, ty = cxp - sc * cxp, cyp - sc * cyp
        body = f'<g transform="translate({tx:.1f},{ty:.1f}) scale({sc:.4f})">{inner}</g>'
        if pen.tip:
            pen.tip = (tx + sc * pen.tip[0], ty + sc * pen.tip[1])
        # thẻ ảnh dán (ảnh thật nhỏ trên nền)
        cards = [e for e in s["els"] if e["kind"] == "photo_card" and t >= e["t"]]
        for e in cards:
            k = ease_out(prog(t, e["t"], e["t"] + 0.3))
            card = e["_img"]
            from vox import paste_photo
            paste_photo(img, card, tx + sc * e["x"], ty + sc * e["y"], e.get("rot", 0), scale=sc * lerp(1.15, 1.0, k), alpha=k)
        # chữ khoá: không zoom theo
        for e in s["els"]:
            if e["kind"] == "key":
                body += key_text(e["text"], t, e["t"], e.get("color", "#e3262f"), e.get("bg", "#ffffff"), e.get("size", 86),
                                 e.get("y", 900), e.get("accent"))
        body += pen.draw_pen()
        body += hud(t, s.get("tag", "MORA AI // TÀI CHÍNH"), dark=s["bg"][0] == "desk")
        return img, body

    def render(self, fi):
        t = fi / FPS
        i = self.shot_at(t)
        img, body = self.frame_of(i, t)
        # chuyển cảnh: cảnh mới trượt vào từ phải trong 0.22 s
        tr = self.shots[i].get("tr", "glitch")
        k = prog(t, self.shots[i]["t"], self.shots[i]["t"] + 0.22)
        a = np.asarray(img, dtype=np.float32)
        f = svg_to_rgba(body)
        al = f[..., 3:4] / 255
        cur = a * (1 - al) + f[..., :3] * al
        if tr == "glitch":
            g = 1 - prog(t, self.shots[i]["t"], self.shots[i]["t"] + 0.2)
            if i > 0 and g > 0:
                cur = glitch(cur, g, fi)
        elif i > 0 and k < 1 and tr != "cut":
            pimg, pbody = self.frame_of(i - 1, t)
            pa = np.asarray(pimg, dtype=np.float32)
            pf = svg_to_rgba(pbody)
            pal = pf[..., 3:4] / 255
            prev = pa * (1 - pal) + pf[..., :3] * pal
            off = int(W * ease_io(k))
            out = np.empty_like(cur)
            out[:, :W - off] = prev[:, off:]
            out[:, W - off:] = cur[:, :off]
            cur = out
        cur *= prog(t, 0, 0.25) * (1 - prog(t, self.duration - 0.5, self.duration))
        return np.clip(cur, 0, 255).astype("uint8").tobytes()

    def sfx(self):
        ev = []
        SF = {"stamp": ("hit", 0.18)}   # giống video gốc: gần như không có tiếng động
        for j, s in enumerate(self.shots):
            if j > 0:
                ev.append((s["t"], "whoosh", 0.12))
            for e in s["els"]:
                n, v = SF.get(e["kind"], (None, 0))
                if e.get("sfx") == "none":
                    continue
                if e.get("sfx"):
                    n, v = e["sfx"], e.get("vol", 0.6)
                if n:
                    ev.append((e["t"], n, v))
        ev.sort()
        out, last = [], {}
        for t, n, v in ev:
            if t - last.get(n, -9) >= 0.25:
                out.append((t, n, v)); last[n] = t
        return out

# =====================================================================
# Nét vẽ tay ĐỎ có cử động (nét "rung" như phim vẽ tay) + tay chân/mặt gắn vào đồ vật
# =====================================================================
import random as _r
DRED = "#e3262f"

def _boil(t, seed=0):
    return _r.Random(int(t * 10) * 7919 + seed)   # đổi nét 10 lần/giây

def _path(pts):
    return "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts)

def _jit(pts, rng, a=2.5):
    return [(x + rng.uniform(-a, a), y + rng.uniform(-a, a)) for x, y in pts]

def _part(pts, p):
    n = max(2, int(len(pts) * p))
    return pts[:n]

def d_circle(e, t):
    k = ease_out(prog(t, e["t"], e["t"] + 0.45))
    if k <= 0:
        return ""
    cx, cy, rx, ry = e["x"], e["y"], e["rx"], e["ry"]
    pts = [(cx + rx * math.cos(a) * (1 + 0.04 * math.sin(3 * a)), cy + ry * math.sin(a)) for a in [-0.6 + i * 0.12 for i in range(60)]]
    pts = _jit(_part(pts, k), _boil(t, 1), 2.5)
    return f'<path d="{_path(pts)}" fill="none" stroke="{e.get("c", DRED)}" stroke-width="{e.get("w", 9)}" stroke-linecap="round" stroke-linejoin="round"/>'

def d_arrow(e, t):
    k = ease_out(prog(t, e["t"], e["t"] + 0.35))
    if k <= 0:
        return ""
    (x0, y0), (x1, y1) = e["p0"], e["p1"]
    bend = e.get("bend", 60)
    mx, my = (x0 + x1) / 2 - (y1 - y0) / 4 * bend / 60, (y0 + y1) / 2 + (x1 - x0) / 4 * bend / 60
    pts = [((1 - u) ** 2 * x0 + 2 * (1 - u) * u * mx + u * u * x1, (1 - u) ** 2 * y0 + 2 * (1 - u) * u * my + u * u * y1) for u in [i / 30 for i in range(31)]]
    rng = _boil(t, 2)
    seg = _jit(_part(pts, k), rng, 2.0)
    s = f'<path d="{_path(seg)}" fill="none" stroke="{e.get("c", DRED)}" stroke-width="{e.get("w", 9)}" stroke-linecap="round"/>'
    if k >= 1:
        ax, ay = pts[-1]
        bx, by = pts[-4]
        a = math.atan2(ay - by, ax - bx)
        h = [(ax - 38 * math.cos(a - 0.5), ay - 38 * math.sin(a - 0.5)), (ax, ay), (ax - 38 * math.cos(a + 0.5), ay - 38 * math.sin(a + 0.5))]
        s += f'<path d="{_path(_jit(h, rng, 1.5))}" fill="none" stroke="{e.get("c", DRED)}" stroke-width="{e.get("w", 9)}" stroke-linecap="round" stroke-linejoin="round"/>'
    return s

def d_under(e, t):
    k = ease_out(prog(t, e["t"], e["t"] + 0.3))
    if k <= 0:
        return ""
    x0, x1, y = e["x0"], e["x1"], e["y"]
    pts = [(x0 + (x1 - x0) * u, y + 6 * math.sin(u * 18)) for u in [i / 40 for i in range(41)]]
    return f'<path d="{_path(_jit(_part(pts, k), _boil(t, 3), 1.5))}" fill="none" stroke="{e.get("c", DRED)}" stroke-width="{e.get("w", 8)}" stroke-linecap="round"/>'

def d_burst(e, t):
    k = ease_back(prog(t, e["t"], e["t"] + 0.3))
    if k <= 0:
        return ""
    rng = _boil(t, 4)
    s = ""
    for j in range(e.get("n", 7)):
        a = -math.pi / 2 + (j - (e.get("n", 7) - 1) / 2) * 0.32 + e.get("rot", 0)
        r0, r1 = 40 * k, 80 * k + rng.uniform(-6, 6)
        s += (f'<line x1="{e["x"] + r0 * math.cos(a):.1f}" y1="{e["y"] + r0 * math.sin(a):.1f}" x2="{e["x"] + r1 * math.cos(a):.1f}" '
              f'y2="{e["y"] + r1 * math.sin(a):.1f}" stroke="{e.get("c", DRED)}" stroke-width="8" stroke-linecap="round"/>')
    return s

def d_limbs(e, t):
    """Tay chân + mặt vẽ tay gắn vào một vật (hộp x,y,w,h). mood: happy/sad/wow; act: wave/jump/walk/cheer."""
    k = ease_out(prog(t, e["t"], e["t"] + 0.3))
    if k <= 0:
        return ""
    x, y, w, h = e["x"], e["y"], e["w"], e["h"]
    c = e.get("c", DRED)
    rng = _boil(t, 5)
    tt = t - e["t"]
    act, mood = e.get("act", "wave"), e.get("mood", "happy")
    jump = -abs(math.sin(tt * 7)) * 26 if act == "jump" else 0
    sw = lambda a, b: f'stroke="{c}" stroke-width="{a}" fill="none" stroke-linecap="round" stroke-linejoin="round"{b}'
    s = f'<g opacity="{k:.2f}" transform="translate(0,{jump:.1f})">'
    # chân
    for side, lx in ((-1, x + w * 0.35), (1, x + w * 0.65)):
        ph = math.sin(tt * 8 + (0 if side < 0 else math.pi)) if act == "walk" else 0.2 * side
        fx, fy = lx + 26 * ph, y + h + 90
        kx, ky = lx + 12 * ph, y + h + 48
        pts = _jit([(lx, y + h), (kx, ky), (fx, fy), (fx + 26 * side, fy + 2)], rng, 2)
        s += f'<path d="{_path(pts)}" {sw(9, "")}/>'
    # tay
    for side in (-1, 1):
        sx, sy = (x - 4 if side < 0 else x + w + 4), y + h * 0.5
        if act == "cheer" or (act == "wave" and side > 0) or act == "jump":
            a = -math.pi / 2 + side * 0.5 + 0.35 * math.sin(tt * 10) * side
        elif mood == "sad":
            a = math.pi / 2 + side * 0.3
        else:
            a = side * 0.5 + 0.2 * math.sin(tt * 4)
            a = (0 if side > 0 else math.pi) + (0.6 if side > 0 else -0.6) + 0.15 * math.sin(tt * 5)
        L = e.get("arm", 90)
        ex, ey = sx + side * 0 + L * 0.55 * math.cos(a) * (1 if side > 0 else 1), sy + L * 0.55 * math.sin(a)
        hx, hy = sx + L * math.cos(a), sy + L * math.sin(a)
        if side < 0 and not (act in ("cheer", "jump")) and mood != "sad":
            hx, hy = sx - L * 0.8, sy + L * 0.5
            ex, ey = sx - L * 0.5, sy + L * 0.1
        if side < 0 and act in ("cheer", "jump"):
            a2 = -math.pi / 2 - 0.5 - 0.35 * math.sin(tt * 10)
            hx, hy = sx + L * math.cos(a2), sy + L * math.sin(a2)
            ex, ey = sx + L * 0.55 * math.cos(a2), sy + L * 0.55 * math.sin(a2)
        s += f'<path d="{_path(_jit([(sx, sy), (ex, ey), (hx, hy)], rng, 2))}" {sw(9, "")}/>'
        s += f'<circle cx="{hx:.1f}" cy="{hy:.1f}" r="11" fill="{c}"/>'
    # mặt
    if e.get("face", True):
        fx, fy = e.get("fx", x + w / 2), e.get("fy", y - 70)
        blink = (int(tt * 3) % 7 == 0)
        for dx in (-26, 26):
            if blink:
                s += f'<path d="M {fx + dx - 10} {fy} L {fx + dx + 10} {fy}" {sw(7, "")}/>'
            else:
                s += f'<circle cx="{fx + dx}" cy="{fy}" r="{12 if mood == "wow" else 9}" fill="{c}"/>'
        if mood == "happy":
            s += f'<path d="{_path(_jit([(fx - 30, fy + 28), (fx, fy + 48), (fx + 30, fy + 28)], rng, 1.5))}" {sw(8, "")}/>'
        elif mood == "sad":
            s += f'<path d="{_path(_jit([(fx - 30, fy + 50), (fx, fy + 30), (fx + 30, fy + 50)], rng, 1.5))}" {sw(8, "")}/>'
            s += f'<path d="M {fx + 34} {fy + 6} Q {fx + 44} {fy + 30} {fx + 34} {fy + 36}" stroke="#3a86c8" stroke-width="7" fill="none"/>'
        else:
            s += f'<ellipse cx="{fx}" cy="{fy + 40}" rx="16" ry="20" fill="none" stroke="{c}" stroke-width="8"/>'
    return s + "</g>"

def d_box(e, t):
    k = ease_back(prog(t, e["t"], e["t"] + 0.3))
    if k <= 0:
        return ""
    x, y, w, h = e["x"], e["y"], e["w"], e["h"]
    rng = _boil(t, 6)
    pts = _jit([(x, y), (x + w, y), (x + w, y + h), (x, y + h), (x, y + 2)], rng, 2.2)
    lines = e["text"].split("\n")
    sz = e.get("size", 56)
    txt = "".join(f'<text x="{x + w / 2:.0f}" y="{y + h / 2 + sz * 0.36 + (i - (len(lines) - 1) / 2) * sz * 1.15:.0f}" text-anchor="middle" '
                  f'font-family="Be Vietnam Pro" font-weight="800" font-size="{sz}" fill="{e.get("ink", INK)}">{esc(l)}</text>' for i, l in enumerate(lines))
    cx, cy = x + w / 2, y + h / 2
    return (f'<g transform="translate({cx:.1f},{cy:.1f}) scale({k:.3f}) translate({-cx:.1f},{-cy:.1f})">'
            f'<rect x="{x + 10}" y="{y + 12}" width="{w}" height="{h}" fill="#000" opacity="0.18"/>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{e.get("fill", "#ffffff")}"/>'
            f'<path d="{_path(pts)}" fill="none" stroke="{e.get("c", DRED)}" stroke-width="8" stroke-linejoin="round"/>{txt}</g>')

DOODLE = {"d_box": d_box, "d_circle": d_circle, "d_arrow": d_arrow, "d_under": d_under, "d_burst": d_burst, "d_limbs": d_limbs}

# ---------- lớp "công nghệ": khung ngắm, dòng chữ máy, đồng hồ ----------
def hud(t, tag, dark=False):
    c = INK if dark else "#ffffff"
    L = 60
    s = ""
    for (x, y, dx, dy) in ((40, 40, 1, 1), (W - 40, 40, -1, 1), (40, H - 40, 1, -1), (W - 40, H - 40, -1, -1)):
        s += f'<path d="M {x} {y + dy * L} L {x} {y} L {x + dx * L} {y}" stroke="{c}" stroke-width="5" fill="none" opacity="0.85"/>'
    blink = 1 if int(t * 2) % 2 == 0 else 0.25
    s += (f'<circle cx="80" cy="82" r="9" fill="{DRED}" opacity="{blink}"/>'
          f'<text x="100" y="92" font-family="JetBrains Mono" font-weight="bold" font-size="28" fill="{c}" opacity="0.9">{esc(tag)}</text>')
    tc = f"{int(t // 60):02d}:{int(t % 60):02d}:{int((t * 30) % 30):02d}"
    s += f'<text x="{W - 80}" y="{H - 66}" text-anchor="end" font-family="JetBrains Mono" font-weight="bold" font-size="28" fill="{c}" opacity="0.9">{tc}</text>'
    return f'<g>{s}</g>'

def glitch(arr, amount, seed):
    """Nhiễu số khi chuyển cảnh: lệch kênh màu + trượt từng dải ngang."""
    if amount <= 0:
        return arr
    rng = np.random.default_rng(seed)
    out = arr.copy()
    sh = int(18 * amount)
    out[..., 0] = np.roll(arr[..., 0], sh, axis=1)
    out[..., 2] = np.roll(arr[..., 2], -sh, axis=1)
    for _ in range(int(10 * amount) + 2):
        y0 = rng.integers(0, H - 40)
        hgt = rng.integers(8, 60)
        out[y0:y0 + hgt] = np.roll(out[y0:y0 + hgt], int(rng.integers(-120, 120) * amount), axis=1)
    return out
