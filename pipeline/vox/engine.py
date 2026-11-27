"""Bộ máy dựng video dài kiểu "bàn làm việc sáng": trang giấy trên mặt bàn, camera lia giữa các trang,
các phần tử (nhãn giấy xé, ảnh thật, tiêu đề báo, biểu đồ, biểu tượng, nét bút) xuất hiện theo mốc lời đọc,
tiếng động tự gắn theo loại phần tử, nhạc nền tự nhỏ đi khi có giọng.
"""
import io, json, math, os, random, subprocess, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

from vox import (W, H, FPS, INK, prog, ease_io, ease_out, ease_back, lerp, esc, load_photo, paste_photo, resample,
                 wobble, partial, Pen, sticky, svg_to_rgba, envelope, torn_path, torn_label, pin, string, headline,
                 GOLD, GOLD_DK, TEAL, NAVY, MUSTARD)
from characters import trang

RED = "#e4572e"
GREEN = "#2a9d55"
BLUE = "#3a86c8"
PURPLE = "#6b5bd6"
PAGE_W, PAGE_H = 2100, 1250

# ---------------------------------------------------------------- nền
def desk_tile(n=1024, seed=5):
    rng = np.random.default_rng(seed)
    y = np.arange(n, dtype=np.float32)[:, None]
    x = np.arange(n, dtype=np.float32)[None, :]
    grain = np.sin(2 * np.pi * (y / n * 14 + np.sin(2 * np.pi * x / n * 2) * 0.35)) * 0.6 + \
        np.sin(2 * np.pi * (y / n * 41 + x / n)) * 0.25
    a = np.array([238, 229, 212], np.float32)[None, None, :] + grain[..., None] * 5
    for yy in range(0, n, 256):
        a[yy:yy + 2] -= 14
    noise = rng.normal(0, 2.2, (n // 2, n // 2, 1)).astype(np.float32)
    noise = np.concatenate([noise, noise[::-1]], 0)
    noise = np.concatenate([noise, noise[:, ::-1]], 1)
    return np.clip(a + noise, 0, 255)

def sheet_image(w=1760, h=1000, rot=0.0, color=(253, 252, 248)):
    sh = Image.new("RGBA", (w, h), color + (255,))
    d = ImageDraw.Draw(sh)
    for yy in range(30, h, 36):
        for xx in range(30, w, 36):
            d.ellipse([xx - 1.6, yy - 1.6, xx + 1.6, yy + 1.6], fill=(198, 208, 222, 255))
    if rot:
        sh = sh.rotate(rot, resample=Image.BICUBIC, expand=True)
    shadow = Image.new("RGBA", sh.size, (0, 0, 0, 0))
    shadow.putalpha(sh.getchannel("A").point(lambda v: int(v * 0.22)))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    return sh, shadow

# ---------------------------------------------------------------- biểu tượng phẳng
def icon(kind, s=1.0, c=None):
    o = INK
    if kind == "bolt":
        return f'<path d="M 10 -60 L -30 10 L 0 10 L -10 60 L 32 -12 L 4 -12 L 16 -60 Z" fill="{c or GOLD}" stroke="{o}" stroke-width="6" stroke-linejoin="round"/>'
    if kind == "coin":
        return (f'<circle r="44" fill="{c or GOLD}" stroke="{o}" stroke-width="6"/><circle r="32" fill="none" stroke="{GOLD_DK}" stroke-width="4"/>'
                f'<text y="17" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="46" fill="{GOLD_DK}">$</text>')
    if kind == "chip":
        pins = "".join(f'<rect x="{-50 + k * 22}" y="-70" width="8" height="20" fill="{o}"/><rect x="{-50 + k * 22}" y="50" width="8" height="20" fill="{o}"/>'
                       f'<rect x="-70" y="{-50 + k * 22}" width="20" height="8" fill="{o}"/><rect x="50" y="{-50 + k * 22}" width="20" height="8" fill="{o}"/>' for k in range(5))
        return pins + f'<rect x="-52" y="-52" width="104" height="104" rx="10" fill="{c or "#3d4b5c"}" stroke="{o}" stroke-width="6"/><text y="14" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="34" fill="#fff">AI</text>'
    if kind == "factory":
        return (f'<path d="M -80 60 L -80 -10 L -40 -40 L -40 -10 L 0 -40 L 0 -10 L 40 -40 L 40 -80 L 70 -80 L 70 60 Z" fill="{c or "#9fb3c8"}" stroke="{o}" stroke-width="6" stroke-linejoin="round"/>'
                f'<rect x="-60" y="15" width="24" height="24" fill="#fff" stroke="{o}" stroke-width="4"/><rect x="-20" y="15" width="24" height="24" fill="#fff" stroke="{o}" stroke-width="4"/>'
                f'<rect x="20" y="15" width="24" height="24" fill="#fff" stroke="{o}" stroke-width="4"/>')
    if kind == "meter":
        return (f'<rect x="-70" y="-70" width="140" height="140" rx="18" fill="#e9eef3" stroke="{o}" stroke-width="6"/>'
                f'<circle cy="-5" r="46" fill="#fff" stroke="{o}" stroke-width="5"/><rect x="-46" y="46" width="92" height="20" rx="4" fill="{o}"/>')
    if kind == "bowl":
        return (f'<path d="M -90 -10 L 90 -10 Q 80 70 0 74 Q -80 70 -90 -10 Z" fill="#fff" stroke="{o}" stroke-width="6"/>'
                f'<path d="M -70 -10 Q -40 -40 -10 -14 Q 20 -44 50 -14 Q 70 -30 80 -10" fill="#f1d38a" stroke="{o}" stroke-width="4"/>'
                f'<path d="M 30 -90 L 90 -20 M 50 -96 L 104 -28" stroke="#b07a3a" stroke-width="7" stroke-linecap="round"/>')
    if kind == "store":
        return (f'<rect x="-60" y="-20" width="120" height="80" fill="#fff" stroke="{o}" stroke-width="5"/>'
                f'<path d="M -70 -20 L -60 -60 L 60 -60 L 70 -20 Z" fill="{c or RED}" stroke="{o}" stroke-width="5" stroke-linejoin="round"/>'
                f'<rect x="-15" y="10" width="30" height="50" fill="{MUSTARD}" stroke="{o}" stroke-width="4"/>')
    if kind == "server":
        return "".join(f'<rect x="-60" y="{-75 + k * 52}" width="120" height="44" rx="6" fill="#4a5a6e" stroke="{o}" stroke-width="5"/>'
                       f'<circle cx="38" cy="{-53 + k * 52}" r="6" fill="#7CFC7C"/><rect x="-46" y="{-58 + k * 52}" width="50" height="8" fill="#9fb3c8"/>' for k in range(3))
    if kind == "phone":
        return (f'<rect x="-42" y="-78" width="84" height="156" rx="16" fill="{o}"/><rect x="-34" y="-64" width="68" height="120" rx="6" fill="#dff3f1"/>'
                f'<rect x="-24" y="-50" width="44" height="14" rx="7" fill="{TEAL}"/><rect x="-24" y="-28" width="34" height="14" rx="7" fill="#fff" stroke="{o}" stroke-width="2"/>')
    if kind == "laptop":
        return (f'<rect x="-80" y="-60" width="160" height="100" rx="8" fill="{o}"/><rect x="-70" y="-50" width="140" height="80" fill="#1e2a38"/>'
                f'<path d="M -100 40 L 100 40 L 90 58 L -90 58 Z" fill="#9fb3c8" stroke="{o}" stroke-width="5"/>'
                f'<text x="-58" y="-22" font-family="DejaVu Sans Mono" font-size="20" fill="#7CFC7C">&lt;/&gt; code</text>'
                f'<rect x="-58" y="-8" width="80" height="6" fill="#5fa8ff"/><rect x="-58" y="6" width="100" height="6" fill="#ffd166"/>')
    if kind == "check":
        return f'<circle r="50" fill="{GREEN}" stroke="{o}" stroke-width="6"/><path d="M -24 0 L -6 20 L 26 -20" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>'
    if kind == "cross":
        return f'<circle r="50" fill="{RED}" stroke="{o}" stroke-width="6"/><path d="M -20 -20 L 20 20 M 20 -20 L -20 20" stroke="#fff" stroke-width="12" stroke-linecap="round"/>'
    if kind == "bank":
        cols = "".join(f'<rect x="{-58 + k * 32}" y="-20" width="18" height="62" fill="#fff" stroke="{o}" stroke-width="4"/>' for k in range(4))
        return (f'<path d="M -80 -20 L 0 -70 L 80 -20 Z" fill="{c or "#cfd8e3"}" stroke="{o}" stroke-width="6" stroke-linejoin="round"/>{cols}'
                f'<rect x="-84" y="42" width="168" height="18" fill="{c or "#cfd8e3"}" stroke="{o}" stroke-width="5"/>')
    if kind == "cloud":
        return f'<path d="M -70 40 Q -100 40 -96 10 Q -92 -20 -60 -18 Q -50 -60 -6 -56 Q 34 -54 44 -20 Q 90 -26 92 12 Q 92 40 60 40 Z" fill="{c or "#dbeefe"}" stroke="{o}" stroke-width="6" stroke-linejoin="round"/>'
    if kind == "person":
        return (f'<circle cy="-40" r="26" fill="#f6dcc6" stroke="{o}" stroke-width="5"/>'
                f'<path d="M -40 50 Q -40 -6 0 -6 Q 40 -6 40 50 Z" fill="{c or BLUE}" stroke="{o}" stroke-width="5"/>')
    if kind == "flame":
        return f'<path d="M 0 -70 Q 50 -20 40 20 Q 34 60 0 64 Q -34 60 -40 20 Q -46 -20 -10 -40 Q -8 -10 6 -6 Q 10 -40 0 -70 Z" fill="#ff8c2b" stroke="{o}" stroke-width="6" stroke-linejoin="round"/><path d="M 0 10 Q 18 26 12 44 Q 0 54 -12 44 Q -16 26 0 10 Z" fill="{GOLD}"/>'
    if kind == "lock":
        return f'<path d="M -30 -10 L -30 -40 Q -30 -70 0 -70 Q 30 -70 30 -40 L 30 -10" fill="none" stroke="{o}" stroke-width="12"/><rect x="-50" y="-14" width="100" height="80" rx="12" fill="{c or GOLD}" stroke="{o}" stroke-width="6"/><circle cy="20" r="10" fill="{o}"/>'
    if kind == "button":
        return f'<ellipse cy="14" rx="70" ry="30" fill="#8b1e1e"/><ellipse rx="70" ry="30" fill="{RED}" stroke="{o}" stroke-width="6"/><text y="10" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="28" fill="#fff">BẤM</text>'
    if kind == "star":
        pts = " ".join(f"{(52 if k % 2 == 0 else 22) * math.cos(-math.pi / 2 + k * math.pi / 5):.1f},{(52 if k % 2 == 0 else 22) * math.sin(-math.pi / 2 + k * math.pi / 5):.1f}" for k in range(10))
        return f'<polygon points="{pts}" fill="{c or GOLD}" stroke="{o}" stroke-width="6" stroke-linejoin="round"/>'
    if kind == "egg":
        return f'<ellipse rx="44" ry="58" fill="{GOLD}" stroke="{o}" stroke-width="6"/><ellipse cx="-14" cy="-20" rx="10" ry="16" fill="#fff6c8"/>'
    if kind == "weight":
        return f'<path d="M -60 60 L -40 -30 L 40 -30 L 60 60 Z" fill="#555" stroke="{o}" stroke-width="6" stroke-linejoin="round"/><circle cy="-44" r="16" fill="none" stroke="{o}" stroke-width="8"/><text y="34" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="28" fill="#fff">895B</text>'
    if kind == "bell":
        return f'<path d="M -46 30 Q -40 -50 0 -54 Q 40 -50 46 30 L 56 40 L -56 40 Z" fill="{GOLD}" stroke="{o}" stroke-width="6" stroke-linejoin="round"/><circle cy="50" r="10" fill="{o}"/>'
    if kind == "thumb":
        return f'<path d="M -50 0 L -20 0 L 6 -50 Q 24 -50 20 -20 L 50 -20 Q 64 -18 58 0 L 46 46 Q 42 56 30 56 L -20 56 L -20 0" fill="#ffd9b8" stroke="{o}" stroke-width="6" stroke-linejoin="round"/><rect x="-60" y="-4" width="34" height="64" fill="{BLUE}" stroke="{o}" stroke-width="6"/>'
    if kind == "play":
        return f'<rect x="-80" y="-56" width="160" height="112" rx="30" fill="{RED}" stroke="{o}" stroke-width="6"/><path d="M -18 -26 L 30 0 L -18 26 Z" fill="#fff"/>'
    if kind == "card":
        return (f'<rect x="-60" y="-84" width="120" height="168" rx="12" fill="#fff" stroke="{o}" stroke-width="6"/>'
                f'<text y="22" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="70" fill="{c or RED}">?</text>')
    if kind == "drop":
        return f'<path d="M 0 -50 Q 36 0 36 20 Q 36 50 0 50 Q -36 50 -36 20 Q -36 0 0 -50 Z" fill="{BLUE}" stroke="{o}" stroke-width="5"/>'
    if kind == "gear":
        teeth = "".join(f'<rect x="-10" y="-62" width="20" height="24" fill="{c or "#9fb3c8"}" stroke="{o}" stroke-width="4" transform="rotate({k * 45})"/>' for k in range(8))
        return teeth + f'<circle r="44" fill="{c or "#9fb3c8"}" stroke="{o}" stroke-width="6"/><circle r="16" fill="#fff" stroke="{o}" stroke-width="5"/>'
    if kind == "doc":
        return (f'<rect x="-56" y="-72" width="112" height="144" rx="6" fill="#fff" stroke="{o}" stroke-width="6"/>'
                + "".join(f'<rect x="-38" y="{-48 + k * 22}" width="{76 - (k % 3) * 14}" height="8" fill="#b9c4d0"/>' for k in range(5)))
    if kind == "mail":
        return f'<rect x="-70" y="-46" width="140" height="92" rx="8" fill="#fff" stroke="{o}" stroke-width="6"/><path d="M -70 -46 L 0 10 L 70 -46" fill="none" stroke="{o}" stroke-width="6"/>'
    if kind == "translate":
        return (f'<rect x="-70" y="-50" width="80" height="80" rx="10" fill="{TEAL}" stroke="{o}" stroke-width="5"/><text x="-30" y="5" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="40" fill="#fff">A</text>'
                f'<rect x="-10" y="-20" width="80" height="80" rx="10" fill="{MUSTARD}" stroke="{o}" stroke-width="5"/><text x="30" y="36" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="40" fill="{o}">Ă</text>')
    if kind == "chart":
        return (f'<rect x="-70" y="-60" width="140" height="120" rx="8" fill="#fff" stroke="{o}" stroke-width="6"/>'
                f'<rect x="-50" y="10" width="22" height="34" fill="{TEAL}"/><rect x="-16" y="-12" width="22" height="56" fill="{MUSTARD}"/><rect x="18" y="-36" width="22" height="80" fill="{RED}"/>')
    return f'<circle r="40" fill="{c or GOLD}" stroke="{o}" stroke-width="6"/>'

# ---------------------------------------------------------------- phần tử
def E(kind, t, **kw):
    kw["kind"] = kind
    kw["t"] = t
    return kw

SFX_OF = {"label": ("pop", 0.55), "photo": ("paper", 0.7), "headline": ("whoosh", 0.7), "sticky": ("pop", 0.5),
          "big": ("hit", 0.55), "stamp": ("hit", 0.6), "icon": ("pop", 0.35), "string": ("pin", 0.5),
          "write": ("pen", 0.25), "stroke": ("pen", 0.2), "doc": ("paper", 0.7), "bars": ("pop", 0.4), "pie": ("pop", 0.45)}

def text_w(txt, size, factor=0.62):
    return len(txt) * size * factor

def big_text(x, y, txt, size, color, k, anchor="middle", rot=0, outline="#ffffff"):
    if k <= 0:
        return ""
    s = ease_back(k)
    return (f'<g transform="translate({x:.1f},{y:.1f}) rotate({rot}) scale({s:.3f})">'
            f'<text text-anchor="{anchor}" font-family="Be Vietnam Pro" font-weight="800" font-size="{size}" fill="{outline}" '
            f'stroke="{outline}" stroke-width="{size * 0.16:.1f}" stroke-linejoin="round">{esc(txt)}</text>'
            f'<text text-anchor="{anchor}" font-family="Be Vietnam Pro" font-weight="800" font-size="{size}" fill="{color}">{esc(txt)}</text></g>')

def fmt_num(v, dec=0):
    s = f"{v:,.{dec}f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return s

def draw_el(e, t, pen, ph):
    k0 = e["t"]
    if t < k0:
        return ""
    if "end" in e and t > e["end"] + 0.4:
        return ""
    fade = 1 - prog(t, e.get("end", 1e9), e.get("end", 1e9) + 0.4)
    k = prog(t, k0, k0 + e.get("dur", 0.35))
    kind = e["kind"]
    s = ""
    if kind == "label":
        s = torn_label(e["x"], e["y"], e["text"], e.get("size", 60), e.get("bg", "#ffffff"), ink=e.get("ink", INK),
                       rot=e.get("rot", -2), k=k, seed=e.get("seed", hash(e["text"]) % 97))
    elif kind == "write":
        s = pen.write(e["text"], e["x"], e["y"], e.get("size", 64), t, k0, k0 + e.get("dur", 0.8),
                      color=e.get("color", INK), anchor=e.get("anchor", "start"), cid=f"w{abs(hash((e['text'], k0))) % 10 ** 8}")
    elif kind == "sticky":
        s = sticky(e["x"], e["y"], e.get("w", 250), e["text"], e.get("color", "#ffe27a"), e.get("rot", -4), k, e.get("size", 44))
    elif kind == "headline":
        s = headline(e["x"], e["y"], e["outlet"], e["title"], e.get("band", NAVY), e.get("w", 1400),
                     prog(t, k0, k0 + 0.4), e.get("rot", -1), e.get("seed", 3), e.get("size", 54))
    elif kind == "big":
        if "count" in e:
            a, b = e["count"]
            v = lerp(a, b, ease_out(prog(t, k0, k0 + e.get("cdur", 1.4))))
            txt = e.get("pre", "") + fmt_num(v, e.get("dec", 0)) + e.get("suf", "")
        else:
            txt = e["text"]
        s = big_text(e["x"], e["y"], txt, e.get("size", 120), e.get("color", INK), k, e.get("anchor", "middle"), e.get("rot", 0))
    elif kind == "stamp":
        kk = prog(t, k0, k0 + 0.25)
        sc = lerp(2.0, 1.0, ease_out(kk))
        w = text_w(e["text"], e.get("size", 90), 0.7) + 60
        col = e.get("color", RED)
        s = (f'<g transform="translate({e["x"]},{e["y"]}) rotate({e.get("rot", -8)}) scale({sc:.3f})" opacity="{min(1, kk * 2):.2f}">'
             f'<rect x="{-w / 2:.0f}" y="{-e.get("size", 90) * 0.85:.0f}" width="{w:.0f}" height="{e.get("size", 90) * 1.25:.0f}" rx="14" fill="none" stroke="{col}" stroke-width="10"/>'
             f'<text y="{e.get("size", 90) * 0.15:.0f}" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="{e.get("size", 90)}" fill="{col}">{esc(e["text"])}</text></g>')
    elif kind == "icon":
        sc = ease_back(k) * e.get("s", 1.0)
        rot = e.get("rot", 0)
        if e.get("spin"):
            rot += (t - k0) * e["spin"]
        bob = math.sin((t - k0) * 3) * 4 if e.get("bob") else 0
        s = f'<g transform="translate({e["x"]},{e["y"] + bob:.1f}) rotate({rot:.1f}) scale({sc:.3f})">{icon(e["icon"], 1, e.get("c"))}</g>'
        if e.get("label"):
            s += (f'<text x="{e["x"]}" y="{e["y"] + 100 * e.get("s", 1.0) + 18:.0f}" text-anchor="middle" font-family="Pangolin" '
                  f'font-size="{e.get("lsize", 40)}" fill="{INK}" opacity="{k:.2f}">{esc(e["label"])}</text>')
    elif kind == "stroke":
        pts = e["pts"]
        if e.get("smooth", True):
            pts = wobble(resample(pts, 6), e.get("wob", 2.0), e.get("seed", 1))
        s = pen.stroke(pts, t, k0, k0 + e.get("dur", 0.6), color=e.get("color", INK), width=e.get("width", 6))
        if e.get("head") and t >= k0 + e.get("dur", 0.6):
            (x1, y1), (x2, y2) = e["pts"][-2], e["pts"][-1]
            a = math.atan2(y2 - y1, x2 - x1)
            hx = [(x2 - 30 * math.cos(a - 0.5), y2 - 30 * math.sin(a - 0.5)), (x2, y2), (x2 - 30 * math.cos(a + 0.5), y2 - 30 * math.sin(a + 0.5))]
            s += (f'<path d="M{hx[0][0]:.1f},{hx[0][1]:.1f} L{hx[1][0]:.1f},{hx[1][1]:.1f} L{hx[2][0]:.1f},{hx[2][1]:.1f}" fill="none" '
                  f'stroke="{e.get("color", INK)}" stroke-width="{e.get("width", 6)}" stroke-linecap="round" stroke-linejoin="round"/>')
    elif kind == "string":
        s = string(e["p0"], e["p1"], t, k0, k0 + e.get("dur", 0.5), e.get("sag", 40)) + pin(*e["p0"], TEAL, prog(t, k0 - 0.1, k0 + 0.1)) + \
            pin(*e["p1"], RED, prog(t, k0 + e.get("dur", 0.5), k0 + e.get("dur", 0.5) + 0.2))
    elif kind == "pie":
        cx, cy, r = e["x"], e["y"], e.get("r", 220)
        p = ease_io(prog(t, k0, k0 + 1.2))
        acc = -math.pi / 2
        for pct, col, lab in e["parts"]:
            ang = 2 * math.pi * pct / 100 * p
            a1 = acc + ang
            large = 1 if ang > math.pi else 0
            if ang > 0.001:
                s += (f'<path d="M {cx} {cy} L {cx + r * math.cos(acc):.1f} {cy + r * math.sin(acc):.1f} A {r} {r} 0 {large} 1 '
                      f'{cx + r * math.cos(a1):.1f} {cy + r * math.sin(a1):.1f} Z" fill="{col}" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>')
            mid = acc + ang / 2
            if p >= 1:
                s += big_text(cx + r * 0.58 * math.cos(mid), cy + r * 0.58 * math.sin(mid) + 22, f"{pct}%", 64, "#ffffff", 1, outline=INK)
                s += (f'<text x="{cx + (r + 60) * math.cos(mid):.1f}" y="{cy + (r + 60) * math.sin(mid) + 14:.1f}" text-anchor="{"start" if math.cos(mid) > 0 else "end"}" '
                      f'font-family="Pangolin" font-size="44" fill="{INK}">{esc(lab)}</text>')
            acc = a1
    elif kind == "bars":
        x0, base, bw, sc = e["x"], e["y"], e.get("bw", 170), e.get("scale", 3.0)
        s += f'<line x1="{x0 - 40}" y1="{base}" x2="{x0 + len(e["items"]) * (bw + 80)}" y2="{base}" stroke="{INK}" stroke-width="6"/>'
        for j, it in enumerate(e["items"]):
            lab, v, col = it[:3]
            tj = it[3] if len(it) > 3 else k0 + j * 0.5
            pj = ease_out(prog(t, tj, tj + 0.6))
            if pj <= 0:
                continue
            h = v * sc * pj
            bx = x0 + j * (bw + 80)
            y = base - h if h > 0 else base
            s += f'<rect x="{bx}" y="{y:.1f}" width="{bw}" height="{abs(h):.1f}" fill="{col}" stroke="{INK}" stroke-width="5"/>'
            vt = it[4] if len(it) > 4 else (f"{v:+.0f}¢" if v else "0")
            ty = (base - h - 24) if h > 0 else (base - h + 70)
            s += f'<text x="{bx + bw / 2}" y="{ty:.1f}" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="52" fill="{col}" opacity="{pj:.2f}">{esc(vt)}</text>'
            s += f'<text x="{bx + bw / 2}" y="{base + (60 if h >= 0 else -20)}" text-anchor="middle" font-family="Pangolin" font-size="48" fill="{INK}" opacity="{pj:.2f}">{esc(lab)}</text>'
    elif kind == "doc":
        x, y, w = e["x"], e["y"], e.get("w", 1500)
        lines = e["lines"]
        lh = e.get("lh", 62)
        h = len(lines) * lh + 80
        kk = ease_out(prog(t, k0, k0 + 0.4))
        s = (f'<g transform="translate({x},{y + (1 - kk) * 300:.1f})" opacity="{kk:.2f}">'
             f'<rect x="10" y="14" width="{w}" height="{h}" fill="#000" opacity="0.15"/><rect width="{w}" height="{h}" fill="#ffffff"/>'
             f'<text x="40" y="-18" font-family="Be Vietnam Pro" font-weight="800" font-size="30" fill="#7a8796">{esc(e.get("src", ""))}</text>')
        for j, ln in enumerate(lines):
            yy = 60 + j * lh
            for (hj, ht0, hfrac) in e.get("hl", []):
                if hj == j:
                    p = ease_out(prog(t, ht0, ht0 + 0.5))
                    s += f'<rect x="32" y="{yy - lh * 0.72:.0f}" width="{(w - 64) * hfrac * p:.0f}" height="{lh * 0.92:.0f}" fill="{GOLD}" opacity="0.55"/>'
            s += f'<text x="40" y="{yy}" font-family="DejaVu Serif" font-size="{e.get("size", 40)}" fill="#222">{esc(ln)}</text>'
        s += "</g>"
    elif kind == "svg":
        s = f'<g opacity="{ease_out(k):.2f}">{e["svg"]}</g>'
    elif kind == "coinpath":
        pts = e["pts"]
        u = ((t - k0) * e.get("speed", 0.35)) % 1.0
        n = len(pts)
        seg = u * n
        i0 = int(seg) % n
        f = seg - int(seg)
        (x0, y0), (x1, y1) = pts[i0], pts[(i0 + 1) % n]
        x, y = lerp(x0, x1, f), lerp(y0, y1, f)
        s = f'<g transform="translate({x:.1f},{y:.1f}) scale(0.6)">{icon("coin")}</g>'
    if fade < 1:
        s = f'<g opacity="{fade:.2f}">{s}</g>'
    return s

# ---------------------------------------------------------------- dựng
class Video:
    def __init__(self, pages, words, photos_dir, duration, host_plan=None):
        self.pages = pages  # list of dict: t (bắt đầu), pos (col,row), sheet(bool), els, host(bool)
        self.duration = duration
        self.photos_dir = photos_dir
        self.host_plan = host_plan or {}

    def setup(self, voice):
        self.env = envelope(voice)
        self.tile = desk_tile()
        self.reps = np.tile(self.tile, (3, 4, 1)).astype(np.uint8)
        self.sheets = [sheet_image(rot=r) for r in (0, -0.9, 0.7)]
        self.ph = {}
        for p in self.pages:
            for e in p["els"]:
                if e["kind"] == "photo" and (e["name"], e.get("w", 600)) not in self.ph:
                    self.ph[(e["name"], e.get("w", 600))] = load_photo(f"{self.photos_dir}/{e['name']}.jpg", e.get("w", 600))

    def page_xy(self, i):
        c, r = self.pages[i]["pos"]
        return c * PAGE_W, r * PAGE_H

    def cam(self, t):
        idx = 0
        for i, p in enumerate(self.pages):
            if t >= p["t"]:
                idx = i
        x, y = self.page_xy(idx)
        if idx > 0:
            mv = ease_io(prog(t, self.pages[idx]["t"], self.pages[idx]["t"] + 0.75))
            px, py = self.page_xy(idx - 1)
            x, y = lerp(px, x, mv), lerp(py, y, mv)
        return x, y, idx

    def render(self, i):
        t = i / FPS
        cx, cy, idx = self.cam(t)
        # nền bàn
        n = self.tile.shape[0]
        ox, oy = int(cx) % n, int(cy) % n
        bg = self.reps[oy:oy + H, ox:ox + W]
        canvas = Image.fromarray(bg.astype("uint8"))
        body = ""
        pen = Pen()
        for j in (idx - 1, idx, idx + 1):
            if j < 0 or j >= len(self.pages):
                continue
            p = self.pages[j]
            px, py = self.page_xy(j)
            sx, sy = px - cx, py - cy
            if abs(sx) > W + 200 or abs(sy) > H + 200:
                continue
            if j > idx and t < p["t"] - 0.01:
                continue
            if p.get("sheet", True):
                sh, shadow = self.sheets[j % 3]
                x0 = int(sx + (W - sh.width) / 2)
                y0 = int(sy + (H - sh.height) / 2)
                canvas.paste((60, 45, 30), (x0 + 12, y0 + 16), shadow)
                canvas.paste(sh, (x0, y0), sh)
            # ảnh thật
            for e in p["els"]:
                if e["kind"] == "photo" and t >= e["t"]:
                    if "end" in e and t > e["end"] + 0.4:
                        continue
                    k = ease_out(prog(t, e["t"], e["t"] + 0.35))
                    fade = 1 - prog(t, e.get("end", 1e9), e.get("end", 1e9) + 0.4)
                    card = self.ph[(e["name"], e.get("w", 600))]
                    kb = 1.0 + 0.025 * prog(t, e["t"], e["t"] + 8)
                    paste_photo(canvas, card, sx + e["x"], sy + e["y"], e.get("rot", 0), scale=lerp(1.12, 1.0, k) * kb, alpha=k * fade)
                    body += f'<g transform="translate({sx:.1f},{sy:.1f})">' + pin(e["x"], e["y"] - card.height * kb / 2 + 26, e.get("pin", TEAL), prog(t, e["t"] + 0.2, e["t"] + 0.45) * fade) + "</g>"
            inner = "".join(draw_el(e, t, pen, self.ph) for e in p["els"] if e["kind"] != "photo")
            body += f'<g transform="translate({sx:.1f},{sy:.1f})">{inner}</g>'
        # pen.tip đang ở toạ độ trang -> đổi về màn hình (trang hiện tại)
        if pen.tip:
            px, py = self.page_xy(idx)
            pen.tip = (pen.tip[0] + px - cx, pen.tip[1] + py - cy)
        # MC
        body += self.host(t, i)
        body += pen.draw_pen()
        a = np.asarray(canvas, dtype=np.float32)
        f = svg_to_rgba(body)
        al = f[..., 3:4] / 255
        out = a * (1 - al) + f[..., :3] * al
        out *= prog(t, 0, 0.3) * (1 - prog(t, self.duration - 0.6, self.duration))
        return np.clip(out, 0, 255).astype("uint8").tobytes()

    def host(self, t, i):
        """MC: lúc đầu đứng to giữa-trái, sau đó thu về góc trái dưới; trang nào host=False thì trượt xuống ẩn."""
        show = 1.0
        _, _, idx = self.cam(t)
        p = self.pages[idx]
        want = 1.0 if p.get("host", True) else 0.0
        prev = self.pages[idx - 1].get("host", True) if idx > 0 else True
        mv = ease_io(prog(t, p["t"], p["t"] + 0.5))
        show = lerp(1.0 if prev else 0.0, want, mv)
        intro = self.host_plan.get("intro_end", 0)
        big = 1 - ease_io(prog(t, intro, intro + 0.7))
        TX = lerp(270, 520, big)
        TY = lerp(1068, 1050, big) + (1 - show) * 560 + (1 - ease_back(prog(t, 0.2, 0.7))) * 700
        SC = lerp(0.88, 1.35, big)
        m = float(self.env[int(t * FPS)]) if int(t * FPS) < len(self.env) else 0
        wave = ease_out(prog(t, 0.5, 0.8)) * (1 - ease_out(prog(t, 2.2, 2.6)))
        return (f'<ellipse cx="{TX:.1f}" cy="{TY - 2:.1f}" rx="{120 * SC:.1f}" ry="{14 * SC:.1f}" fill="#000" opacity="0.12"/>'
                f'<g transform="translate({TX:.1f},{TY:.1f}) scale({SC:.3f})">{trang(t, m, wave, (i % 110) < 3, self.host_plan.get("cap", lambda t: "")(t))}</g>')

    # ------------------------------------------------------------ âm thanh
    def sfx_events(self):
        ev = []
        for j, p in enumerate(self.pages):
            if j > 0:
                ev.append((p["t"], "whoosh", 0.45))
            for e in p["els"]:
                name, vol = SFX_OF.get(e["kind"], (None, 0))
                if e.get("sfx") == "none":
                    continue
                if e.get("sfx"):
                    name, vol = e["sfx"], e.get("vol", 0.7)
                if e["kind"] in ("write", "stroke") and e.get("dur", 0.6) < 0.5 and not e.get("sfx"):
                    continue
                if name:
                    ev.append((e["t"], name, vol))
        ev.sort()
        # tránh dồn dập: cùng loại cách nhau >= 0.25 s
        out, last = [], {}
        for t, n, v in ev:
            if t - last.get(n, -9) >= 0.25:
                out.append((t, n, v))
                last[n] = t
        return out

def load_audio(path, sr=44100):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "s16le", "-ac", "1", "-ar", str(sr), "-"],
                         capture_output=True).stdout
    return np.frombuffer(raw, "<i2").astype(np.float32) / 32768

def mix_audio(voice_path, music_paths, sfx_dir, events, extra, out_path, duration, sr=44100, music_db=-17):
    v = load_audio(voice_path, sr)
    n = int(duration * sr)
    out = np.zeros(n, np.float32)
    out[:min(n, len(v))] += v[:n] * 0.95
    # nhạc nền: nối các bài, đan chéo 3 s, lặp đủ dài
    tracks = [load_audio(p, sr) for p in music_paths]
    bed, k, xf = np.zeros(0, np.float32), 0, int(3 * sr)
    while len(bed) < n + sr:
        tr = tracks[k % len(tracks)]
        if len(bed) == 0:
            bed = tr.copy()
        else:
            ramp = np.linspace(0, 1, xf)
            bed[-xf:] = bed[-xf:] * (1 - ramp) + tr[:xf] * ramp
            bed = np.concatenate([bed, tr[xf:]])
        k += 1
    bed = bed[:n]
    # ducking: nhỏ hẳn khi có giọng, to lên ở chỗ nghỉ
    env = np.zeros(n, np.float32)
    hop = sr // 50
    vv = np.abs(np.pad(v, (0, max(0, n - len(v))))[:n])
    m = len(vv) // hop
    e = vv[:m * hop].reshape(m, hop).mean(1)
    e = np.convolve(e, np.ones(25) / 25, mode="same")
    e = np.clip(e / (np.percentile(e, 90) + 1e-6), 0, 1)
    env[:m * hop] = np.repeat(e, hop)
    base = 10 ** (music_db / 20)
    gain = base * (1.35 - 0.75 * env)
    gain[: int(3 * sr)] *= np.linspace(1.6, 1.0, int(3 * sr))
    gain[-int(4 * sr):] *= np.linspace(1.0, 0.0, int(4 * sr))
    out += bed * gain
    cache = {}
    for t, name, vol in list(events) + list(extra):
        if name not in cache:
            cache[name] = load_audio(f"{sfx_dir}/{name}.mp3", sr)
        s = cache[name] * vol * 0.55
        a = int(t * sr)
        b = min(n, a + len(s))
        if a < n:
            out[a:b] += s[:b - a]
    peak = np.abs(out).max()
    out = np.tanh(out / max(peak, 1e-6) * 1.4) * 0.89
    w = wave.open(out_path, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes((out * 32767).astype("<i2").tobytes()); w.close()
