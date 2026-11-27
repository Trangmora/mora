"""Engine "VẬT LÝ GIẤY CẮT": mỗi cảnh là một sân khấu vật lý (pymunk) – đồng xu, chữ, thẻ giấy rơi thật,
va chạm thật; mọi vật là giấy cắt có bóng đổ chung một hướng sáng, nền giấy sách cũ có thị sai (parallax).

Cách dùng: tạo các Stage (mỗi cảnh một Stage), gọi .run() để mô phỏng trước, rồi render_frame(t) ghép
cảnh + chuyển trang (trang mới trượt đè lên trang cũ như lật giấy).
"""
import math, random
import numpy as np
import pymunk
from PIL import Image, ImageDraw, ImageFilter, ImageFont

import clean as C

OW, OH, FPS = 1920, 1080, 30
F_XB = "/root/.fonts/BeVietnamPro-ExtraBold.ttf"
RED, BLACK, CREAM, GOLD = (215, 38, 30), (28, 28, 28), (246, 241, 230), (242, 182, 50)
INK = (90, 86, 80)
_fonts = {}

def font(s):
    if s not in _fonts:
        _fonts[s] = ImageFont.truetype(F_XB, s)
    return _fonts[s]

def ease_io(k):
    k = min(1, max(0, k))
    return k * k * (3 - 2 * k)

def ease_out(k):
    k = min(1, max(0, k))
    return 1 - (1 - k) ** 3

def ease_back(k, s=1.7):
    k = min(1, max(0, k)) - 1
    return k * k * ((s + 1) * k + s) + 1

def prog(t, a, b):
    return min(1, max(0, (t - a) / (b - a)))

# ---------------- giấy ----------------
_grain = {}

def paper_grain(w, h, seed=3):
    key = (w, h)
    if key not in _grain:
        rng = np.random.default_rng(seed)
        g = rng.normal(0, 1, (h // 2 + 1, w // 2 + 1)).astype(np.float32)
        g = np.asarray(Image.fromarray(((g * 18) + 128).clip(0, 255).astype("uint8")).resize((w, h), Image.BILINEAR), np.float32) - 128
        _grain[key] = g
    return _grain[key]

def card(w, h, lines, bg=CREAM, seed=0, pad_y=0):
    """Mảnh giấy cắt: mép hơi lệch tay, thớ giấy li ti, chữ căn giữa. lines = [(text, size, color), ...]"""
    rng = random.Random(seed)
    m = 6
    im = Image.new("RGBA", (w + 2 * m, h + 2 * m), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    j = lambda: rng.uniform(-3, 3)
    d.polygon([(m + j(), m + j()), (m + w + j(), m + j()), (m + w + j(), m + h + j()), (m + j(), m + h + j())], fill=bg + (255,))
    a = np.asarray(im, np.float32)
    a[..., :3] += paper_grain(im.width, im.height, seed + 5)[..., None] * 0.35
    im = Image.fromarray(a.clip(0, 255).astype("uint8"))
    d = ImageDraw.Draw(im)
    fit = []
    for t_, s_, c_ in lines:  # tự thu cỡ chữ cho vừa mảnh giấy (không bao giờ tràn mép)
        while s_ > 12 and font(s_).getbbox(t_)[2] - font(s_).getbbox(t_)[0] > w - 56:
            s_ -= 2
        fit.append((t_, s_, c_))
    lines = fit
    hs = [int(s * 1.16) for _, s, _ in lines]
    y = m + (h - sum(hs)) / 2 + pad_y
    for (t, s, col), hh in zip(lines, hs):
        d.text((m + w / 2, y + hh / 2), t, font=font(s), fill=col + (255,), anchor="mm")
        y += hh
    return im

def glyph(ch, size, fill=RED, edge=CREAM, stroke=14):
    """Chữ cắt giấy: lõi màu + viền giấy kem dày (như dán chồng hai lớp)."""
    f = font(size)
    bb = f.getbbox(ch, stroke_width=stroke)
    w, h = bb[2] - bb[0] + 8, bb[3] - bb[1] + 8
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.text((4 - bb[0], 4 - bb[1]), ch, font=f, fill=fill + (255,), stroke_width=stroke, stroke_fill=edge + (255,))
    return im

def coin_sprites(R, color):
    out = []
    s = 2 * R + 6
    for a in range(36):
        im = Image.new("RGBA", (s * 3, s * 3), (0, 0, 0, 0))
        d = ImageDraw.Draw(im)
        c, rr = s * 1.5, R * 3
        d.ellipse((c - rr, c - rr, c + rr, c + rr), fill=color + (255,), outline=BLACK + (255,), width=8)
        d.ellipse((c - rr + 14, c - rr + 14, c + rr - 14, c + rr - 14), outline=tuple(int(v * 0.7) for v in color) + (255,), width=4)
        d.text((c, c + 2), "$", font=font(int(rr * 1.15)), fill=BLACK + (255,), anchor="mm")
        im = im.rotate(-a * 10, resample=Image.BICUBIC)
        out.append(im.resize((s, s), Image.LANCZOS))
    return out

def stamp(txt, size, color=RED, seed=1):
    """Dấu mộc đỏ: khung viền đôi, mực loang không đều."""
    f = font(size)
    bb = f.getbbox(txt)
    w, h = bb[2] - bb[0] + size, int(size * 1.7)
    im = Image.new("RGBA", (w + 20, h + 20), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((10, 10, w + 10, h + 10), radius=18, fill=CREAM + (255,), outline=color + (255,), width=10)
    d.rounded_rectangle((24, 24, w - 4, h - 4), radius=12, outline=color + (255,), width=3)
    d.text((10 + w / 2, 10 + h / 2), txt, font=f, fill=color + (255,), anchor="mm")
    a = np.asarray(im, np.float32)
    rng = np.random.default_rng(seed)
    n = rng.random(a.shape[:2])
    n = np.asarray(Image.fromarray((n * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(1.5)), np.float32) / 255
    ink = (a[..., 0] > 150) & (a[..., 1] < 120)          # chỉ phần mực đỏ bị loang, nền giấy giữ nguyên
    a[..., :3] = np.where(ink[..., None] & (n[..., None] < 0.35), CREAM, a[..., :3])
    return Image.fromarray(a.astype("uint8"))

def strip_baked_shadow(im):
    a = np.asarray(im).copy()
    a[..., 3] = np.where(a[..., 3] < 90, 0, a[..., 3])
    return Image.fromarray(a)

# ---------------- sân khấu ----------------
CAT_STATIC, CAT_COIN, CAT_SOLID = 0b1, 0b10, 0b100

class Stage:
    def __init__(self, t0, t1, world=(2112, 1188), gravity=2600, seed=1, damping=1.0):
        self.t0, self.t1 = t0, t1
        self.ww, self.wh = world
        self.sp = pymunk.Space()
        self.sp.gravity = (0, gravity)
        self.sp.damping = damping
        self.rng = random.Random(seed)
        self.bodies = []        # mọi vật động được ghi lại vị trí
        self.items = []         # (body_idx, sprite_list|sprite, kind, z)
        self.statics = []       # (a, b, r) vẽ nét mực
        self.fills = []         # (polygon, color) vẽ mảng giấy tĩnh
        self.events = []        # (t, fn)
        self.world_fns = []     # fn(draw, img, t, pos) vẽ trong toạ độ thế giới (trước/sau vật)
        self.top_fns = []
        self.screen_fns = []    # fn(img, t) vẽ trên màn hình
        self.sounds = []        # (t, name, vol)
        self.cam = lambda t: (self.ww / 2, self.wh / 2, self.ww)
        self.shake = []         # (t, amp)
        self.coin_cache = {}
        self.kill_y = self.wh + 200

    # --- dựng ---
    def wall(self, a, b, r=5, draw=True, filt=None):
        s = pymunk.Segment(self.sp.static_body, a, b, r)
        s.elasticity, s.friction = 0.25, 0.6
        s.filter = filt or pymunk.ShapeFilter(categories=CAT_STATIC)
        self.sp.add(s)
        if draw:
            self.statics.append((a, b, r))
        return s

    def track(self, body):
        self.bodies.append(body)
        return len(self.bodies) - 1

    def coin(self, x, y, R=24, color=GOLD, vx=0, vy=0, behind=False, z=0):
        b = pymunk.Body(1, pymunk.moment_for_circle(1, 0, R))
        b.position, b.velocity = (x, y), (vx, vy)
        b.angle = self.rng.uniform(0, 6.28)
        s = pymunk.Circle(b, R)
        s.elasticity, s.friction = 0.3, 0.5
        mask = pymunk.ShapeFilter.ALL_MASKS() ^ (CAT_SOLID if behind else 0)
        s.filter = pymunk.ShapeFilter(categories=CAT_COIN, mask=mask)
        self.sp.add(b, s)
        key = (R, color)
        if key not in self.coin_cache:
            self.coin_cache[key] = coin_sprites(R, color)
        b.is_coin = True
        self.items.append((self.track(b), self.coin_cache[key], "coin", z))
        return b

    def solid(self, sprite, x, y, mass=6, angle=0.0, vx=0, vy=0, box=None, z=2, elastic=0.15, friction=0.8, sound=("paper", 0.55),
              inertia=1.0):
        w, h = box or (sprite.width - 16, sprite.height - 16)
        b = pymunk.Body(mass, pymunk.moment_for_box(mass, (w, h)) * inertia)  # giấy dày: khó lật hơn khi rơi nhanh
        b.position, b.angle, b.velocity = (x, y), angle, (vx, vy)
        s = pymunk.Poly.create_box(b, (w, h), radius=2)
        s.elasticity, s.friction = elastic, friction
        s.filter = pymunk.ShapeFilter(categories=CAT_SOLID)
        self.sp.add(b, s)
        b.is_coin = False
        b.snd = sound
        self.items.append((self.track(b), sprite, "sprite", z))
        return b

    def at(self, t, fn):
        if getattr(self, "_running", False):   # sự kiện sinh ra trong lúc chạy → chèn đúng thứ tự thời gian
            import heapq
            self._seq += 1
            heapq.heappush(self._heap, (t, self._seq, fn))
        else:
            self.events.append((t, fn))

    def pour(self, ta, tb, n, xr, y, R=24, color=GOLD, behind=False, vx=(-40, 40), rate=None):
        """Đổ n đồng xu trong [ta,tb]; rate(u)∈[0,1]→mật độ tương đối (mặc định đều)."""
        us = np.linspace(0, 1, 2000)
        dens = np.array([rate(u) for u in us]) if rate else np.ones_like(us)
        cdf = np.cumsum(dens)
        cdf /= cdf[-1]
        for k in range(n):
            u = us[np.searchsorted(cdf, (k + 0.5) / n)]
            t = ta + (tb - ta) * u
            self.at(t, lambda st, t=t: st.coin(st.rng.uniform(*xr), y, R, color, st.rng.uniform(*vx), 0, behind))

    # --- mô phỏng ---
    def run(self, extra=0.5):
        import heapq
        self._heap = [(t, i, fn) for i, (t, fn) in enumerate(self.events)]
        heapq.heapify(self._heap)
        self._seq = len(self._heap)
        self._running = True
        sub = 10
        dt = 1 / FPS / sub
        start = min(self.t0, getattr(self, "pre_t", self.t0))   # chạy trước (không ghi hình) để thùng đã đầy sẵn
        pre = int(round((self.t0 - start) * FPS))
        nfr = int(math.ceil((self.t1 + extra - self.t0) * FPS)) + pre
        self.frames = []
        prev_v = {}
        last_snd = -1
        for f in range(nfr):
            t = start + f / FPS
            self._now = t
            while self._heap and self._heap[0][0] <= t:
                heapq.heappop(self._heap)[2](self)
            for _ in range(sub):
                self.sp.step(dt)
            snap = []
            for i, b in enumerate(self.bodies):
                if getattr(b, "dead", False) or b.position.y > getattr(b, "kill", self.kill_y):
                    if not getattr(b, "dead", False):
                        b.dead = True
                        self.sp.remove(b, *b.shapes)
                    snap.append(None)
                    continue
                v = b.velocity
                pv = prev_v.get(i)
                if pv is not None and getattr(b, "snd", None) is not False:
                    dv = abs(pv[1] - v.y) + abs(pv[0] - v.x) * 0.5
                    hit = getattr(b, "hits", 0)
                    if b.is_coin and dv > 420 and hit < 2 and t - last_snd > 0.05:
                        self.sounds.append((t, "coin", 0.16 + 0.1 * self.rng.random()))
                        last_snd = t
                        b.hits = hit + 1
                    elif not b.is_coin and dv > 300 and hit < 1 and b.snd:
                        self.sounds.append((t, b.snd[0], b.snd[1]))
                        b.hits = hit + 1
                prev_v[i] = (v.x, v.y)
                snap.append((b.position.x, b.position.y, b.angle))
            if f >= pre:
                self.frames.append(snap)
        self.sounds = [e for e in self.sounds if e[0] >= self.t0]
        self._running = False
        self._heap = None
        self.sp = None  # không cần nữa (để fork nhẹ)
        self.static_layer = self._static_layer()
        return self

    def pos(self, t, i):
        f = min(len(self.frames) - 1, max(0, int(round((t - self.t0) * FPS))))
        s = self.frames[f]
        return s[i] if i < len(s) else None

    def _static_layer(self):
        L = Image.new("RGBA", (self.ww, self.wh), (0, 0, 0, 0))
        d = ImageDraw.Draw(L)
        for poly, col in self.fills:
            d.polygon(poly, fill=col + (255,))
        for a, b, r in self.statics:
            d.line((a, b), fill=BLACK + (255,), width=int(r * 2))
            for p in (a, b):
                d.ellipse((p[0] - r, p[1] - r, p[0] + r, p[1] + r), fill=BLACK + (255,))
        return L

    # --- vẽ ---
    def world_image(self, t):
        f = min(len(self.frames) - 1, max(0, int(round((t - self.t0) * FPS))))
        snap = self.frames[f]
        L = self.static_layer.copy()
        d = ImageDraw.Draw(L)
        for fn in self.world_fns:
            fn(d, L, t, snap)
        for bi, spr, kind, z in sorted(self.items, key=lambda it: it[3]):
            if bi >= len(snap) or snap[bi] is None:
                continue
            x, y, a = snap[bi]
            if kind == "coin":
                im = spr[int(round(-math.degrees(a) / 10)) % 36]
            else:
                im = spr.rotate(-math.degrees(a), resample=Image.BICUBIC, expand=True)
            comp(L, im, x - im.width / 2, y - im.height / 2)
        d = ImageDraw.Draw(L)
        for fn in self.top_fns:
            fn(d, L, t, snap)
        return L

def add_shadow(L, off=(11, 15), blur=7, alpha=0.36, scale=4):
    """Bóng đổ chung cho cả lớp giấy (tính ở độ phân giải 1/4 cho nhanh)."""
    a = L.getchannel("A")
    small = a.resize((a.width // scale, a.height // scale), Image.BILINEAR).filter(ImageFilter.GaussianBlur(blur / scale * 1.4))
    sh = small.resize(a.size, Image.BILINEAR).point(lambda v: int(v * alpha))
    out = Image.new("RGBA", L.size, (0, 0, 0, 0))
    shimg = Image.new("RGBA", L.size, (45, 32, 20, 255))
    shimg.putalpha(sh)
    out.alpha_composite(shimg, off)
    out.alpha_composite(L)
    return out

_bg = {}

def background(w, h):
    if (w, h) not in _bg:
        _bg[(w, h)] = C.make_oldgrid(w, h, cell=118).convert("RGBA")
    return _bg[(w, h)]

def render_stage(st, t):
    L = add_shadow(st.world_image(t))
    cx, cy, vw = st.cam(t)
    vw = min(vw, st.ww)
    vh = vw * OH / OW
    cx = min(max(cx, vw / 2), st.ww - vw / 2)
    cy = min(max(cy, vh / 2), st.wh - vh / 2)
    for ts, amp in st.shake:  # rung máy khi dấu mộc đập xuống
        if 0 <= t - ts < 0.35:
            k = 1 - (t - ts) / 0.35
            vw *= 0.97
            cx += math.sin((t - ts) * 90) * amp * k
            cy += math.cos((t - ts) * 70) * amp * k * 0.7
    vh = vw * OH / OW
    bgw, bgh = int(st.ww * 1.08), int(st.wh * 1.08)
    bg = background(bgw, bgh)
    # nền đi chậm hơn vật (thị sai) → cảm giác lớp giấy nổi
    bcx = bgw / 2 + (cx - st.ww / 2) * 0.55
    bcy = bgh / 2 + (cy - st.wh / 2) * 0.55
    bvw = vw * 0.92 + st.ww * 0.08
    bvh = bvw * OH / OW
    bcx = min(max(bcx, bvw / 2), bgw - bvw / 2)
    bcy = min(max(bcy, bvh / 2), bgh - bvh / 2)
    out = bg.crop((int(bcx - bvw / 2), int(bcy - bvh / 2), int(bcx + bvw / 2), int(bcy + bvh / 2))).resize((OW, OH), Image.BILINEAR)
    fg = L.crop((int(cx - vw / 2), int(cy - vh / 2), int(cx + vw / 2), int(cy + vh / 2))).resize((OW, OH), Image.LANCZOS)
    out.alpha_composite(fg)
    for fn in st.screen_fns:
        fn(out, t)
    return out

def page_slide(prev, cur, k):
    """Trang mới trượt từ phải đè lên trang cũ, mép trái có bóng giấy."""
    e = ease_io(k)
    x = int((1 - e) * OW)
    out = prev.copy()
    dark = Image.new("RGBA", (OW, OH), (20, 15, 10, int(70 * e)))
    out.alpha_composite(dark)
    if x < OW:
        g = np.zeros((OH, 60, 4), np.uint8)
        g[..., 3] = (np.linspace(0, 1, 60) ** 2 * 110).astype(np.uint8)[None, :]
        sh = Image.fromarray(g)
        if x >= 60:
            out.alpha_composite(sh, (x - 60, 0))
        out.paste(cur.crop((0, 0, OW - x, OH)), (x, 0))
    return out

def text(d, xy, s, size, col=BLACK, anchor="mm", stroke=0, stroke_col=CREAM):
    d.text(xy, s, font=font(size), fill=col + (255,), anchor=anchor, stroke_width=stroke, stroke_fill=stroke_col + (255,))

def comp(dst, im, x, y):
    """alpha_composite an toàn khi vật nằm một phần ngoài khung."""
    x, y = int(x), int(y)
    if x >= dst.width or y >= dst.height or x + im.width <= 0 or y + im.height <= 0:
        return
    cx0, cy0 = max(0, -x), max(0, -y)
    cx1, cy1 = min(im.width, dst.width - x), min(im.height, dst.height - y)
    dst.alpha_composite(im.crop((cx0, cy0, cx1, cy1)), (x + cx0, y + cy0))

_tc = {}

def text_img(s, size, col=BLACK, stroke=0, rot=0.0):
    key = (s, size, col, stroke, rot)
    if key not in _tc:
        f = font(size)
        bb = f.getbbox(s, stroke_width=stroke)
        im = Image.new("RGBA", (bb[2] - bb[0] + 20, bb[3] - bb[1] + 20), (0, 0, 0, 0))
        ImageDraw.Draw(im).text((10 - bb[0], 10 - bb[1]), s, font=f, fill=col + (255,), stroke_width=stroke, stroke_fill=CREAM + (255,))
        if rot:
            im = im.rotate(rot, expand=True, resample=Image.BICUBIC)
        _tc[key] = im
    return _tc[key]

def place(img, im, xy, k=1.0, scale=1.0, back=True):
    """Đặt ảnh có hiệu ứng bật (ease_back) + mờ dần theo k∈[0,1]."""
    if k <= 0:
        return
    sc = scale * (max(0.05, ease_back(k)) if back else 1.0)
    if abs(sc - 1) > 0.01:
        im = im.resize((max(1, int(im.width * sc)), max(1, int(im.height * sc))), Image.BICUBIC)
    if k < 0.5:
        a = np.asarray(im).copy()
        a[..., 3] = (a[..., 3] * (k * 2)).astype("uint8")
        im = Image.fromarray(a)
    comp(img, im, xy[0] - im.width / 2, xy[1] - im.height / 2)

def slam(img, im, xy, t, ts):
    """Dấu mộc đập xuống: to → đúng cỡ trong 0,12 s."""
    if t < ts:
        return
    k = prog(t, ts, ts + 0.12)
    place(img, im, xy, max(0.5, k), scale=1.55 - 0.55 * ease_out(k), back=False)
