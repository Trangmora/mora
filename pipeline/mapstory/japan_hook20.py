"""Thử 20 giây mở đầu tập Nhật Bản theo nghiên cứu viral: hook (Mông Nguyên 1281 thất bại ở Nhật và Đại Việt) rồi mới chào.

python3 pipeline/mapstory/japan_hook20.py <geo_dir> <vo_dir> <globe_frames> <out.mp4> [giây,giây…]
"""
import io, json, math, os, subprocess, sys
from multiprocessing import Pool
import numpy as np
import cairosvg
from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
from demo import clamp, prog, ease_io, ease_out, ease_back, lerp, mix, outlined, make_texture, OUT, LAND, LAND_EDGE, SEA
from ftx import build_captions
from plaza_1985 import W, H, caption, lbl, big, window, YEL, BRN, JP_COL
from plaza_globe_test import projector
from vn_intro import HOANG_SA, TRUONG_SA
import japan_5min as J
import japan_kit as K

FPS = 30
COSF = J.COSF
MONGOL = "#9a6a2a"
VNC = "#d23a2f"
G = {}
LANG = os.environ.get("VLANG", "vi")
STR = {
    "vi": {"jp": "Nhật Bản", "dv": "Đại Việt", "song": "nhà Tống", "fail": "thất bại", "also": "cũng như", "hello": "đây là", "hist": "lịch sử Nhật",
           "MONGOL": "MÔNG NGUYÊN", "JAPAN": "NHẬT BẢN", "DAIVIET": "ĐẠI VIỆT", "SONGPIN": "Nhà Tống sụp đổ (1279)", "FAILED": "THẤT BẠI",
           "HS": "Hoàng Sa", "TS": "Trường Sa", "CHANNEL": "LỊCH SỬ THẾ GIỚI", "T1": "LỊCH SỬ", "T2": "NHẬT BẢN", "TAG_M": "Quân Mông Nguyên", "TAG_S": "Samurai"},
    "en": {"jp": "In Japan", "dv": "Dai Viet", "song": "Song", "fail": "failed", "also": "and in a small", "hello": "Welcome", "hist": "history of Japan",
           "MONGOL": "MONGOL YUAN", "JAPAN": "JAPAN", "DAIVIET": "DAI VIET", "SONGPIN": "Song dynasty falls (1279)", "FAILED": "FAILED",
           "HS": "Hoàng Sa (Paracel Is.)", "TS": "Trường Sa (Spratly Is.)", "CHANNEL": "HISTORY OF THE WORLD", "T1": "HISTORY OF", "T2": "JAPAN",
           "TAG_M": "Mongol soldier", "TAG_S": "Samurai", "YEARS": "200 YEARS", "LOCKED": "locked", "WENT": "went on"}}
HILITE = {"vi": {"thất", "bại", "Đại", "Việt", "Mông", "Nguyên", "Nhật", "Bản"},
          "en": {"failed", "failed.", "Dai", "Viet,", "Viet", "Mongols,", "Japan", "Japan.", "Japan...", "two", "hundred", "European", "empire", "China", "largest", "Vietnam", "Vietnam.", "locked", "doors"}}
def S(k):
    return STR[LANG][k]

def T(k):
    return G["T"][k]

def wt(sid, s, off=0.0):
    ch = G["chars"][sid]
    txt = "".join(c for c, _ in ch)
    i = txt.find(s)
    return (ch[i][1] if i >= 0 else T(sid)) + off

# ---------- bản đồ 2D ----------
def cam(t):
    ks = [(T("h2") - 0.4, (116.0, 35.0, 13.5)), (T("h3") - 0.3, (117.5, 26.5, 15.5)), (T("h4") - 0.2, (136.0, 35.8, 34.0))]
    cur = prev = ks[0][1]; t0 = ks[0][0]
    for i, (tk, v) in enumerate(ks):
        if t >= tk:
            cur, t0, prev = v, tk, (ks[i - 1][1] if i else v)
    k = ease_io(prog(t, t0, t0 + 1.4))
    lon, lat, s = (lerp(a, b, k) for a, b in zip(prev, cur))
    s *= 1 + 0.012 * (t - t0)
    tx, ty = W / 2 - lon * COSF * s, H * 0.46 + lat * s
    return (lambda lo, la: (lo * COSF * s + tx, -la * s + ty)), s, tx, ty

def jp_on(t):
    return prog(t, wt("h3", S("jp"), -0.2), wt("h3", S("jp"), 0.5))

def vn_on(t):
    return prog(t, wt("h3", S("dv"), -0.2), wt("h3", S("dv"), 0.5))

def map_bg(t):
    P, s, tx, ty = cam(t)
    sw = 2.0 / s
    sweep = lerp(56, 17, ease_io(prog(t, T("h2") + 0.2, T("h2_end"))))  # Mông Nguyên tràn xuống phía nam
    p = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="{SEA}"/>',
         f'<defs><clipPath id="sw"><rect x="0" y="-60" width="400" height="{60 - sweep:.3f}"/></clipPath></defs>',
         f'<g transform="matrix({s},0,0,{s},{tx},{ty})">', f'<g transform="translate({4 / s},{6 / s})" fill="#2e5d5c" opacity="0.45">']
    p += [f'<path d="{d}"/>' for _, d in G["cs"]] + [f'<path d="{d}"/>' for *_, d in G["prefs"]]
    p.append("</g>")
    vk = vn_on(t)
    for c, d in G["cs"]:
        f = mix(LAND, VNC, vk) if c == "VNM" else (MONGOL if c in ("MNG", "PRK", "KOR") else LAND)
        p.append(f'<path d="{d}" fill="{f}" stroke="{LAND_EDGE}" stroke-width="{sw:.4f}" stroke-linejoin="round"/>')
        if c == "CHN":
            p.append(f'<path d="{d}" fill="{MONGOL}" stroke="{mix(MONGOL, "#000000", .4)}" stroke-width="{sw:.4f}" clip-path="url(#sw)"/>')
    jk = jp_on(t)
    jf = mix(LAND, JP_COL, jk)
    for _, x, y, d in G["prefs"]:
        p.append(f'<path d="{d}" fill="{jf}" stroke="{mix(jf, "#3b1d0a", .4)}" stroke-width="{sw * .8:.4f}" stroke-linejoin="round"/>')
    # quần đảo Hoàng Sa, Trường Sa (Việt Nam)
    vf = mix(LAND, VNC, vk)
    for lon, lat in HOANG_SA + TRUONG_SA:
        p.append(f'<circle cx="{lon * COSF:.3f}" cy="{-lat:.3f}" r="{5 / s:.4f}" fill="{vf}" stroke="{mix(vf, "#3b1d0a", .45)}" stroke-width="{sw:.4f}"/>')
    p.append("</g></svg>")
    return "".join(p)

def stamp(x, y, t0, t, label=None, by=54):
    label = label or S("FAILED")
    k = prog(t, t0, t0 + 0.25)
    if k <= 0:
        return ""
    sc = lerp(2.4, 1.0, ease_out(k))
    return (f'<g transform="translate({x:.1f},{y:.1f}) rotate(-10) scale({sc:.3f})" opacity="{min(1, k * 2):.2f}">'
            f'<path d="M -46 -46 L 46 46 M 46 -46 L -46 46" stroke="#d62828" stroke-width="22" stroke-linecap="round"/>'
            f'<rect x="-140" y="{by}" width="280" height="64" rx="10" fill="#fff6e0" stroke="#d62828" stroke-width="8"/>'
            + outlined(f'y="{by + 46}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44"', label, "#d62828", "#fff6e0", 3) + "</g>")

def map_marks(t):
    P, s, *_ = cam(t)
    o = []
    a = window(t, T("h2") + 0.3, T("h3") + 0.6)
    if a > 0:
        x, y = P(104.0, 41.5)
        o.append(f'<g opacity="{a:.2f}">' + lbl(x, y, S("MONGOL"), 72, -5, prog(t, T("h2") + 0.3, T("h2") + 0.8), YEL) + "</g>")
    o.append(J.pin(P, 120.15, 30.25, S("SONGPIN"), t, wt("h2", S("song"), -0.2), T("h3") + 0.2, 1, size=42))
    # hai mũi tên xâm lược và dấu thất bại
    fj, fv = wt("h3", S("fail"), -0.1), wt("h3", S("dv"), -0.4)
    r, pj = J.route(P, (121.0, 31.0), (129.8, 33.4), t, T("h3") + 0.1, 1.0, T("h4") + 0.3, MONGOL, 0.25, 14)
    o.append(r)
    r, pv = J.route(P, (112.0, 25.5), (106.2, 21.4), t, wt("h3", S("also"), -0.3), 1.0, T("h4") + 0.3, MONGOL, -0.25, 14)
    o.append(r)
    a = window(t, T("h3"), T("h4") + 0.3)
    if a > 0:
        if pj:
            o.append(f'<g opacity="{a:.2f}">' + stamp(*pj[-1], fj, t) + "</g>")
        if pv:
            o.append(f'<g opacity="{a:.2f}">' + stamp(*pv[-1], fv + 0.3, t, by=-130) + "</g>")
        x, y = P(138.5, 39.5)
        o.append(f'<g opacity="{a * jp_on(t):.2f}">' + lbl(x + 90, y - 30, S("JAPAN"), 58, -5, jp_on(t)) + big(x + 90, y + 30, "1274 • 1281", 40, "#ffffff", "#141414", 9, jp_on(t)) + "</g>")
        x, y = P(99.0, 11.5)
        o.append(f'<g opacity="{a * vn_on(t):.2f}">' + lbl(x - 40, y, S("DAIVIET"), 58, -5, vn_on(t)) + big(x - 40, y + 56, "1258 • 1285 • 1288", 38, "#ffffff", "#141414", 9, vn_on(t)) + "</g>")
        for name, lo, la in ((S("HS"), 112.0, 17.6), (S("TS"), 114.2, 12.4)):
            x, y = P(lo, la)
            o.append(f'<g opacity="{a * vn_on(t):.2f}">' + outlined(f'x="{x + 20:.0f}" y="{y:.0f}" font-family="DejaVu Serif" font-weight="bold" font-size="26"', name, "#fff6d8", BRN, 6) + "</g>")
    return "".join(o)

def title(t):
    o = []
    k = prog(t, wt("h4", S("hello"), 0.0), wt("h4", S("hello"), 0.35))
    if k > 0:
        o.append(f'<g transform="translate(960,250) scale({ease_back(k):.3f})"><rect x="-260" y="-44" width="520" height="80" rx="40" fill="#8a2a22" stroke="{OUT}" stroke-width="6"/>'
                 + outlined('y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44"', S("CHANNEL"), YEL, "#3b1d0a", 6) + "</g>")
    k = prog(t, wt("h4", S("hist"), -0.1), wt("h4", S("hist"), 0.35))
    if k > 0:
        o.append(big(960, 430, S("T1"), 120, YEL, BRN, 18, k, -3) + big(960, 570, S("T2"), 150, YEL, BRN, 22, k, -3))
    return "".join(o)

# ---------- phụ đề: từ khóa tô vàng ----------
_FONT = None
def _font():
    global _FONT
    if _FONT is None:
        from PIL import ImageFont
        _FONT = ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf", 66)
    return _FONT

def caption_hl(t):
    for a, b, txt in G["caps"]:
        if a <= t < b:
            k = ease_back(prog(t, a, a + 0.15), 2.2)
            words = txt.split(" ")
            hl = HILITE[LANG]
            f = _font()
            sp = f.getlength(" ")
            ws = [f.getlength(w) for w in words]
            x = -(sum(ws) + sp * (len(words) - 1)) / 2
            st, fi = "", ""
            for w, wl in zip(words, ws):
                col = YEL if (w in hl or any(ch.isdigit() for ch in w)) else "#ffffff"
                at = f'x="{x:.1f}" font-family="Inter" font-weight="800" font-size="66"'
                st += f'<text {at} fill="#141414" stroke="#141414" stroke-width="13" stroke-linejoin="round">{w}</text>'
                fi += f'<text {at} fill="{col}">{w}</text>'
                x += wl + sp
            return f'<g transform="translate({W / 2},{H - 92}) scale({0.6 + 0.4 * k:.3f})">{st}{fi}</g>'
    return ""

# ---------- đoạn cắt nhanh hé lộ (câu hứa hẹn h5) ----------
PADLOCK = (f'<path d="M -60 -10 L -60 -70 Q -60 -130 0 -130 Q 60 -130 60 -70 L 60 -10" fill="none" stroke="#c9c9c9" stroke-width="26"/>'
           f'<path d="M -60 -10 L -60 -70 Q -60 -130 0 -130 Q 60 -130 60 -70 L 60 -10" fill="none" stroke="{OUT}" stroke-width="6" opacity=".5"/>'
           f'<rect x="-100" y="-20" width="200" height="160" rx="22" fill="#d9a93a" stroke="{OUT}" stroke-width="8"/>'
           f'<circle cx="0" cy="44" r="20" fill="{OUT}"/><rect x="-8" y="50" width="16" height="44" fill="{OUT}"/>')

def montage(t):
    """trả về (kiểu nền, chỉ số khung 3D hoặc None, lớp phủ) cho đoạn h5"""
    h5 = T("h5")
    tl, tw = wt("h5", S("LOCKED"), -0.15), wt("h5", S("WENT"), -0.1)
    if t < h5 + 0.55:
        return "art", 2380 + int((t - h5) * 30), ""
    if t < h5 + 1.1:
        return "art", 420 + int((t - h5) * 30), ""
    if t < tl:
        return "art", 2480 + int((t - h5) * 20) % 50, ""
    if t < tw:
        k = prog(t, tl, tl + 0.3)
        o = (f'<g transform="translate(960,420) scale({lerp(2.2, 1.0, ease_out(k)):.3f})" opacity="{min(1, k * 2):.2f}">{PADLOCK}</g>'
             + big(960, 700, S("YEARS"), 130, YEL, BRN, 20, prog(t, tl + 0.3, tl + 0.6), -3))
        return "map", None, o
    k = prog(t, tw, tw + 0.25)
    o = (f'<g transform="translate(960,470) rotate(-6) scale({lerp(2.6, 1.0, ease_out(k)):.3f})" opacity="{min(1, k * 2):.2f}">'
         + outlined('y="60" text-anchor="middle" font-family="Inter" font-weight="900" font-size="260"', "1905", YEL, "#3b1d0a", 26) + "</g>"
         + big(960, 720, "?", 200, "#ffffff", "#d62828", 22, prog(t, tw + 0.8, tw + 1.1), 8))
    return "map", None, o

def sfx_events():
    d = G["sfxdir"]
    ev = [(0.0, f"{d}/taiko.mp3", 0.9), (0.15, f"{d}/ocean.mp3", 0.55), (0.25, f"{d}/pop.mp3", 0.6),
          (T("h2") - 0.35, f"{d}/whoosh.mp3", 0.7), (T("h2") + 0.2, f"{d}/rumble.mp3", 0.6),
          (wt("h3", S("fail"), -0.1), f"{d}/boom.mp3", 0.9), (wt("h3", S("fail"), -0.1), f"{d}/stamp.mp3", 0.6),
          (wt("h3", S("dv"), 0.2), f"{d}/boom.mp3", 0.9), (wt("h3", S("dv"), 0.2), f"{d}/stamp.mp3", 0.6),
          (T("h4") - 0.3, f"{d}/whoosh.mp3", 0.7), (wt("h4", S("hello")), f"{d}/pop.mp3", 0.6), (wt("h4", S("hist"), -0.1), f"{d}/taiko.mp3", 0.9)]
    if "h5" in G["T"]:
        h5 = T("h5")
        ev += [(h5 - 0.1, f"{d}/whoosh.mp3", 0.7), (h5 + 0.45, f"{d}/whoosh.mp3", 0.6), (h5 + 1.0, f"{d}/whoosh.mp3", 0.6),
               (wt("h5", S("LOCKED"), -0.15), f"{d}/lock.mp3", 0.9), (wt("h5", S("WENT"), -0.1), f"{d}/boom.mp3", 1.0),
               (wt("h5", S("WENT"), -0.1), f"{d}/taiko.mp3", 0.8)]
    return ev

def punch(t):
    """giật nhẹ khung hình vào gần ở các khoảnh khắc mạnh"""
    z = 1.0
    keys = [wt("h3", S("fail"), -0.1), wt("h3", S("dv"), 0.2), wt("h4", S("hist"), -0.1)]
    if "h5" in G["T"]:
        keys.append(wt("h5", S("WENT"), -0.1))
    for t0 in keys:
        if t0 <= t < t0 + 0.6:
            z = max(z, 1 + 0.06 * (1 - (t - t0) / 0.6) ** 2)
    return z

# ---------- địa cầu: hạm đội vượt biển ----------
def globe_overlay(t, i):
    c = G["gcams"].get(i) or G["gcams"][min(G["gcams"], key=lambda j: abs(j - i))]
    P, vis = projector(c["pv"], c["cam"])
    o = []
    x, y = P(108, 38)
    o.append(lbl(x, y, S("MONGOL"), 64, -5, prog(t, 0.6, 1.1), YEL))
    if t > 3.3:
        x, y = P(140, 37)
        o.append(lbl(x + 60, y, S("JAPAN"), 60, -5, prog(t, 3.4, 3.9)))
    for (lo0, la0), n, t0 in (((126.8, 34.7), 10, 0.8), ((122.0, 30.0), 12, 1.3)):
        for m in range(n):
            u = ease_out(prog(t, t0 + m * 0.12, t0 + 3.2 + m * 0.12))
            if u <= 0:
                continue
            lo = lerp(lo0, 130.0, u) + math.sin(m * 2.3) * 0.5
            la = lerp(la0, 33.8, u) + math.cos(m * 1.7) * 0.4
            x, y = P(lo, la)
            o.append(K.g(x, y, 0.8 + 0.35 * u, K.JUNK, math.sin(t * 2 + m) * 3))
    k = ease_back(prog(t, 0.2, 0.6))
    o.append(big(330, 220, "1281", 150, YEL, BRN, 20, k, -4))
    return "".join(o)

# ---------- nhân vật ----------
def cast():
    return [("mongol", 1690, 1.0, T("h4") + 0.4, [(0, "smug", "point"), (T("h2"), "laugh", "cheer"), (wt("h3", S("fail"), -0.1), "shock", "shock"), (wt("h3", S("dv"), 0.4), "sad", "sad")], S("TAG_M")),
            ("samurai", 230, 3.4, (T("h5") - 0.3) if "h5" in G["T"] else 99, [(0, "shock", "shock"), (T("h2"), "shock", "idle"), (wt("h3", S("fail"), -0.1), "laugh", "cheer"), (T("h4"), "smile", "wave")], S("TAG_S"))]

def background(kind, t, i):
    if kind == "globe":
        have = G["ghave"]
        j = min(have, key=lambda x: abs(x - i))
        return np.clip(np.asarray(Image.open(f'{G["gdir"]}/f{j:05d}.jpg').convert("RGB"), dtype=np.float32) * G["tex6"], 0, 255)
    img = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=map_bg(t).encode()))).convert("RGB"), dtype=np.float32)
    dim = 0.45 * prog(t, T("h4") + 0.6, T("h4") + 1.2)
    return np.clip(img * G["tex"], 0, 255) * (1 - dim)

def render(i):
    t = i / FPS
    b = T("h2") - 0.15
    kind = "globe" if t < b else "map"
    if "h5" in G["T"] and t >= T("h5"):
        mk, idx, mo = montage(t)
        if mk == "art":
            j = min(G["ahave"], key=lambda x: abs(x - idx))
            base = np.clip(np.asarray(Image.open(f'{G["adir"]}/f{j:05d}.jpg').convert("RGB"), dtype=np.float32) * G["tex6"], 0, 255)
        else:
            base = background("map", t, i) * 0.75
        fl = max(0.0, 1 - (t - T("h5")) / 0.12)  # chớp trắng khi vào đoạn cắt nhanh
        base = base * (1 - fl) + 255 * fl
        fg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}">{mo}{caption_hl(t)}</svg>')
        f = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=fg.encode()))).convert("RGBA"), dtype=np.float32)
        a = f[..., 3:4] / 255
        return finish(base * (1 - a) + f[..., :3] * a, t)
    base = background(kind, t, i)
    if kind == "map" and t < b + 0.35:
        k = (t - b) / 0.35
        base = background("globe", t, i) * (1 - k) + base * k
    layer = globe_overlay(t, i) if kind == "globe" else map_marks(t)
    sx = sy = 0
    for t0, amp in ((wt("h3", S("fail"), -0.1), 12), (wt("h3", S("dv"), 0.0), 12)):
        if t0 <= t < t0 + 0.45:
            kk = 1 - (t - t0) / 0.45
            sx, sy = math.sin(t * 90) * amp * kk, math.cos(t * 77) * amp * kk
    if sx or sy:
        base = np.roll(base, (int(sy), int(sx)), axis=(0, 1))
    fg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}"><g transform="translate({sx:.1f},{sy:.1f})">{layer}</g>'
          f'{J.characters(t)}{title(t)}{caption_hl(t)}</svg>')
    f = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=fg.encode()))).convert("RGBA"), dtype=np.float32)
    a = f[..., 3:4] / 255
    return finish(base * (1 - a) + f[..., :3] * a, t)

def finish(img, t):
    z = punch(t)
    if z > 1.001:
        im = Image.fromarray(np.clip(img, 0, 255).astype("uint8"))
        w2, h2 = int(W / z), int(H / z)
        im = im.crop(((W - w2) // 2, (H - h2) // 2, (W - w2) // 2 + w2, (H - h2) // 2 + h2)).resize((W, H), Image.BILINEAR)
        return np.asarray(im).tobytes()
    return np.clip(img, 0, 255).astype("uint8").tobytes()

def init(gdir, vo, gfr):
    d = json.load(open(f"{vo}/T_{LANG}.json"))
    G["T"], G["chars"] = d["T"], d["chars"]
    G["dur"] = d["T"]["end"] + 0.8
    G["caps"] = build_captions(d["chars"], d["T"], G["dur"])
    G["cs"], G["prefs"], _ = J.load_geo(gdir, J.box(55, -15, 185, 78))
    G["gdir"] = gfr
    G["gcams"] = {c["i"]: c for c in json.load(open(f"{gfr}/cams.json"))}
    G["ghave"] = sorted(G["gcams"])
    tex = make_texture(W, H)
    G["tex"], G["tex6"] = tex, tex ** 0.6
    J.G["cast"] = cast()
    # tuỳ chọn: ART_DIR (khung hiện vật 3D cho đoạn cắt nhanh), SFX_DIR (tiếng động), MUSIC (nhạc nền)
    G["adir"] = os.environ.get("ART_DIR", "")
    G["ahave"] = sorted(int(f[1:6]) for f in os.listdir(G["adir"]) if f.endswith(".jpg")) if G["adir"] else [0]
    G["sfxdir"] = os.environ.get("SFX_DIR", "")

def main(gdir, vo, gfr, out, only=None):
    init(gdir, vo, gfr)
    if only:
        for x in only.split(","):
            fr = np.frombuffer(render(int(float(x) * FPS)), np.uint8).reshape(H, W, 3)
            Image.fromarray(fr).resize((W // 2, H // 2)).save(f"{out}_{x}.png")
        return
    n = int(G["dur"] * FPS)
    audio = f"{vo}/vo_{LANG}.wav"
    if G["sfxdir"]:
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "full"))
        from mixer import mix
        audio = out + ".mix.wav"
        mix(f"{vo}/vo_{LANG}.wav", os.environ.get("MUSIC"), sfx_events(), audio, G["dur"])
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-i", audio, "-af", "apad", "-shortest",
                           "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-c:a", "aac", "-b:a", "192k", out],
                          stdin=subprocess.PIPE)
    with Pool(4, initializer=init, initargs=(gdir, vo, gfr)) as pool:
        for fr in pool.imap(render, range(n), chunksize=4):
            ff.stdin.write(fr)
    ff.stdin.close()
    ff.wait()

if __name__ == "__main__":
    main(*sys.argv[1:6])
