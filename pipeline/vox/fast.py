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

def key_text(txt, t, t0, color="#ffffff", bg=INK, size=86, y=900, accent=None):
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
                body += key_text(e["text"], t, e["t"], e.get("color", "#ffffff"), e.get("bg", INK), e.get("size", 86),
                                 e.get("y", 900), e.get("accent"))
        body += pen.draw_pen()
        return img, body

    def render(self, fi):
        t = fi / FPS
        i = self.shot_at(t)
        img, body = self.frame_of(i, t)
        # chuyển cảnh: cảnh mới trượt vào từ phải trong 0.22 s
        tr = self.shots[i].get("tr", "slide")
        k = prog(t, self.shots[i]["t"], self.shots[i]["t"] + 0.22)
        a = np.asarray(img, dtype=np.float32)
        f = svg_to_rgba(body)
        al = f[..., 3:4] / 255
        cur = a * (1 - al) + f[..., :3] * al
        if i > 0 and k < 1 and tr != "cut":
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
        SF = {"label": ("pop", 0.5), "big": ("hit", 0.5), "stamp": ("hit", 0.55), "headline": ("whoosh", 0.6),
              "sticky": ("pop", 0.45), "key": ("pop", 0.35), "icon": ("pop", 0.3), "photo_card": ("paper", 0.6),
              "doc": ("paper", 0.6), "write": ("pen", 0.25)}
        for j, s in enumerate(self.shots):
            if j > 0:
                ev.append((s["t"], "whoosh", 0.4))
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
