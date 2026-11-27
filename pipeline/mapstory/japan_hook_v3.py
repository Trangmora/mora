"""History of Japan – hook v3 (tiếng Anh): "tài liệu tỉnh bơ" – giọng kể nghiêm, tiếng cười đến từ hình, chữ, biểu cảm, âm thanh.
Bảng phân cảnh: lich-su-the-gioi/stories/japan_hook_v3_phan_canh.md

python3 pipeline/mapstory/japan_hook_v3.py <geo_dir> <vo_dir> <out.mp4> [giây,giây…]
Biến môi trường: GLOBE1 (khung địa cầu hạm đội), GLOBE2 (khung địa cầu sang Nga), SFX (thư mục tiếng động), MUSIC (nhạc nền)
"""
import io, json, math, os, subprocess, sys
from multiprocessing import Pool
import numpy as np
import cairosvg
from PIL import Image, ImageFont

sys.path.insert(0, os.path.dirname(__file__))
from demo import clamp, prog, ease_io, ease_out, ease_back, lerp, mix, outlined, make_texture, OUT, LAND, LAND_EDGE, SEA
from ftx import build_captions
from plaza_1985 import W, H, lbl, big, window, YEL, BRN, JP_COL
from plaza_globe_test import projector
from vn_intro import HOANG_SA, TRUONG_SA
import japan_5min as J
import japan_kit as K

FPS, LANG = 30, "en"
COSF = J.COSF
MONGOL, VNC, RUC = "#9a6a2a", "#d23a2f", "#5a6b7a"
G = {}
HL = {"Kublai", "Khan", "China.", "wall.", "Japan", "weather", "side.", "Dai", "Viet,", "stakes,", "tide.", "doors", "Mostly.",
      "Russian", "Empire.", "History", "World.", "largest", "fleets"}

def T(k):
    return G["T"][k]

def wt(sid, s, off=0.0):
    ch = G["chars"][sid]
    txt = "".join(c for c, _ in ch)
    i = txt.find(s)
    return (ch[i][1] if i >= 0 else T(sid)) + off

# ---------- cảnh theo thời gian ----------
def scene_of(t):
    b = [("map1", -1), ("globe1", T("a05") - 0.15), ("storm", T("a07") - 0.5), ("vn", T("a08") - 0.15),
         ("closed", T("a10") - 0.15), ("globe2", T("a12") - 0.15)]
    cur = b[0]
    for s_ in b:
        if t >= s_[1]:
            cur = s_
    return cur

# ---------- bản đồ 2D ----------
def map_cam(t):
    ks = [(-1, (113.0, 34.0, 13.5)), (T("a02") - 0.2, (128.0, 35.0, 24.0)), (T("a03") - 0.2, (130.4, 34.0, 60.0)),
          (T("a04") - 0.2, (130.4, 33.7, 140.0)), (T("a07") - 0.6, (130.0, 33.9, 70.0)), (T("a08") - 0.2, (110.5, 21.0, 21.0)),
          (T("a10") - 0.2, (137.0, 36.8, 44.0))]
    cur = prev = ks[0][1]; t0 = ks[0][0]
    for i, (tk, v) in enumerate(ks):
        if t >= tk:
            cur, t0, prev = v, tk, (ks[i - 1][1] if i else v)
    k = ease_io(prog(t, t0, t0 + 1.1))
    lon, lat, s = (lerp(a, b, k) for a, b in zip(prev, cur))
    s *= 1 + 0.01 * (t - t0)
    tx, ty = W / 2 - lon * COSF * s, H * 0.46 + lat * s
    return (lambda lo, la: (lo * COSF * s + tx, -la * s + ty)), s, tx, ty

def map_bg(t):
    P, s, tx, ty = map_cam(t)
    sw = 2.0 / s
    sweep = lerp(56, 17, ease_io(prog(t, 0.3, 2.6)))
    vk = prog(t, T("a08"), T("a08") + 0.8)
    jk = prog(t, T("a10"), T("a10") + 0.8)
    p = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="{SEA}"/>',
         f'<defs><clipPath id="sw"><rect x="0" y="-60" width="400" height="{60 - sweep:.3f}"/></clipPath></defs>',
         f'<g transform="matrix({s},0,0,{s},{tx},{ty})">', f'<g transform="translate({4 / s},{6 / s})" fill="#2e5d5c" opacity="0.45">']
    p += [f'<path d="{d}"/>' for _, d in G["cs"]] + [f'<path d="{d}"/>' for *_, d in G["prefs"]]
    p.append("</g>")
    for c, d in G["cs"]:
        f = mix(LAND, VNC, vk) if c == "VNM" else (MONGOL if c in ("MNG", "PRK", "KOR") else LAND)
        p.append(f'<path d="{d}" fill="{f}" stroke="{LAND_EDGE}" stroke-width="{sw:.4f}" stroke-linejoin="round"/>')
        if c == "CHN":
            p.append(f'<path d="{d}" fill="{MONGOL}" stroke="{mix(MONGOL, "#000000", .4)}" stroke-width="{sw:.4f}" clip-path="url(#sw)"/>')
    jf = mix(LAND, JP_COL, jk)
    for _, x, y, d in G["prefs"]:
        p.append(f'<path d="{d}" fill="{jf}" stroke="{mix(jf, "#3b1d0a", .4)}" stroke-width="{sw * .8:.4f}" stroke-linejoin="round"/>')
    vf = mix(LAND, VNC, vk)
    for lon, lat in HOANG_SA + TRUONG_SA:
        p.append(f'<circle cx="{lon * COSF:.3f}" cy="{-lat:.3f}" r="{5 / s:.4f}" fill="{vf}" stroke="{mix(vf, "#3b1d0a", .45)}" stroke-width="{sw:.4f}"/>')
    p.append("</g></svg>")
    return "".join(p)

# ---------- đạo cụ ----------
def bubble(x, y, text, k, size=46, flip=False):
    if k <= 0:
        return ""
    f = G["font"]
    w = f.getlength(text) * size / 66 + 60
    tail = f'M {-20 if not flip else 20} 40 L {-50 if not flip else 50} 80 L {10 if not flip else -10} 40 Z'
    return (f'<g transform="translate({x:.0f},{y:.0f}) scale({ease_back(min(1, k)):.3f})">'
            f'<path d="{tail}" fill="#ffffff" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>'
            f'<rect x="{-w / 2:.0f}" y="-44" width="{w:.0f}" height="88" rx="40" fill="#ffffff" stroke="{OUT}" stroke-width="6"/>'
            f'<rect x="{-w / 2 + 4:.0f}" y="30" width="{w - 8:.0f}" height="14" fill="#ffffff"/>'
            f'<text y="{size * 0.36:.0f}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="{size}" fill="#141414">{text}</text></g>')

def banner(x, y, text, k, fill="#141414", col="#ff4d4d", size=58, rot=0):
    if k <= 0:
        return ""
    w = G["font"].getlength(text) * size / 66 + 70
    return (f'<g transform="translate({x},{y}) rotate({rot}) scale({ease_back(min(1, k)):.3f})">'
            f'<rect x="{-w / 2:.0f}" y="-50" width="{w:.0f}" height="96" rx="10" fill="{fill}" stroke="#ffffff" stroke-width="6"/>'
            f'<text y="{size * 0.36:.0f}" text-anchor="middle" font-family="DejaVu Sans Mono" font-weight="bold" font-size="{size}" fill="{col}">{text}</text></g>')

def wall(t, t0):
    """bức tường đá xây dần, có biển NO MONGOLS"""
    o = []
    for r in range(4):
        for c in range(9):
            k = prog(t, t0 + (r * 9 + c) * 0.035, t0 + (r * 9 + c) * 0.035 + 0.15)
            if k <= 0:
                continue
            x, y = 520 + c * 96 + (48 if r % 2 else 0), 860 - r * 52 - (1 - ease_out(k)) * 200
            o.append(f'<rect x="{x}" y="{y:.0f}" width="92" height="48" rx="8" fill="{mix("#8d8b86", "#b3aea4", ((r * 7 + c * 3) % 5) / 5)}" stroke="{OUT}" stroke-width="5"/>')
    k = prog(t, wt("a04", "They built", -0.1), wt("a04", "They built", 0.2))
    if k > 0:
        o.append(f'<g transform="translate(980,{640 - (1 - ease_back(k)) * 60:.0f}) rotate(-3)">'
                 f'<rect x="-270" y="-70" width="540" height="130" rx="10" fill="#f2e6c8" stroke="{OUT}" stroke-width="7"/>'
                 f'<text y="2" text-anchor="middle" font-family="Inter" font-weight="900" font-size="64" fill="#c8323c">NO MONGOLS</text>'
                 f'<text y="44" text-anchor="middle" font-family="Inter" font-weight="700" font-size="32" fill="#3b2a1a">(thank you)</text></g>')
    return "".join(o)

def scoreboard(t):
    n = sum(1 for w in ("1258", "1285", "1288") if t >= wt("a09", w))
    k = prog(t, T("a08") + 0.6, T("a08") + 0.9)
    if k <= 0:
        return ""
    pulse = 1 + 0.12 * max(0, 1 - (t - max([wt("a09", w) for w in ("1258", "1285", "1288") if t >= wt("a09", w)] or [-9])) / 0.3)
    return (f'<g transform="translate(960,120) scale({ease_back(min(1, k)):.3f})">'
            f'<rect x="-420" y="-62" width="840" height="124" rx="16" fill="#141414" stroke="#ffffff" stroke-width="6"/>'
            f'<text x="-250" y="20" text-anchor="middle" font-family="Inter" font-weight="900" font-size="48" fill="{mix(MONGOL, "#ffffff", .3)}">MONGOLS</text>'
            f'<text x="250" y="20" text-anchor="middle" font-family="Inter" font-weight="900" font-size="48" fill="#ff6b5b">ĐẠI VIỆT</text>'
            f'<text x="-60" y="30" text-anchor="middle" font-family="DejaVu Sans Mono" font-weight="bold" font-size="82" fill="#ffd54a">0</text>'
            f'<text x="0" y="26" text-anchor="middle" font-family="Inter" font-weight="900" font-size="60" fill="#ffffff">:</text>'
            f'<g transform="translate(60,0) scale({pulse:.3f})"><text y="30" text-anchor="middle" font-family="DejaVu Sans Mono" font-weight="bold" font-size="82" fill="#ffd54a">{n}</text></g></g>')

def river(t):
    """mặt cắt sông Bạch Đằng: nước rút, lộ cọc, thuyền mắc cạn"""
    t0 = wt("a09", "stakes", -0.6)
    a = window(t, t0, T("a10") + 0.1, 0.2, 0.2)
    if a <= 0:
        return ""
    x0, y0, w, h = 560, 330, 800, 420
    lvl = lerp(0.82, 0.30, ease_io(prog(t, wt("a09", "stakes"), wt("a09", "tide", 0.4))))
    yw = y0 + h - lvl * h
    s = (f'<g opacity="{a:.2f}"><rect x="{x0 - 16}" y="{y0 - 16}" width="{w + 32}" height="{h + 32}" rx="20" fill="#fff6e0" stroke="{OUT}" stroke-width="8"/>'
         f'<clipPath id="rv"><rect x="{x0}" y="{y0}" width="{w}" height="{h}" rx="8"/></clipPath><g clip-path="url(#rv)">'
         f'<rect x="{x0}" y="{y0}" width="{w}" height="{h}" fill="#cfe7ef"/>'
         f'<rect x="{x0}" y="{yw:.0f}" width="{w}" height="{h}" fill="#3f7f9a" opacity=".85"/>'
         f'<path d="M {x0} {y0 + h - 40} Q {x0 + w / 2} {y0 + h - 70} {x0 + w} {y0 + h - 40} L {x0 + w} {y0 + h} L {x0} {y0 + h} Z" fill="#8a6a3a"/>')
    for i in range(9):
        cx = x0 + 60 + i * 85
        s += f'<path d="M {cx - 14} {y0 + h - 50} L {cx} {y0 + h - 200} L {cx + 14} {y0 + h - 50} Z" fill="#6b4a2a" stroke="{OUT}" stroke-width="4"/>'
    tilt = 14 * prog(t, wt("a09", "tide", -0.2), wt("a09", "tide", 0.6))
    sy = min(yw - 22, y0 + h - 210)
    s += f'<g transform="translate({x0 + w * 0.52:.0f},{sy:.0f}) rotate({tilt:.1f}) scale(1.6)">{K.JUNK}</g>'
    s += (f'<rect x="{x0}" y="{yw:.0f}" width="{w}" height="6" fill="#ffffff" opacity=".7"/></g>'
          f'<text x="{x0 + 20}" y="{y0 + 44}" font-family="DejaVu Serif" font-weight="bold" font-size="34" fill="#3b2a1a">Bạch Đằng River, 1288</text></g>')
    return s

def shoji(t):
    """cửa giấy shoji đóng sập rồi treo biển CLOSED (mostly)"""
    t0 = wt("a10", "shut", -0.1)
    if t < t0:
        return ""
    k = ease_out(prog(t, t0, t0 + 0.35))
    gap = 220 * prog(t, wt("a11", "Mostly", -0.1), wt("a11", "Mostly", 0.4))
    o = []
    for side in (-1, 1):
        xe = W / 2 + side * (W / 2) * (1 - k) + side * gap / 2
        x = xe if side > 0 else xe - W / 2
        o.append(f'<g transform="translate({x:.0f},0)"><rect width="{W / 2}" height="{H}" fill="#f4ead2" stroke="#3b2a1a" stroke-width="14"/>'
                 + "".join(f'<path d="M {c} 0 L {c} {H}" stroke="#5a3a22" stroke-width="10"/>' for c in range(120, int(W / 2), 160))
                 + "".join(f'<path d="M 0 {r} L {W / 2} {r}" stroke="#5a3a22" stroke-width="10"/>' for r in range(135, H, 180)) + "</g>")
    if gap > 1:
        o.insert(0, f'<g transform="translate(960,560) scale(0.9)">{K.JUNK}</g><g transform="translate(990,500) scale(0.55)">{K.DUTCH}</g>')
    ks = prog(t, t0 + 0.4, t0 + 0.8)
    if ks > 0:
        sw_ = math.sin((t - t0) * 6) * 8 * max(0, 1 - (t - t0 - 0.4) / 1.5)
        o.append(f'<g transform="translate(960,300) rotate({sw_:.1f})"><path d="M -120 -150 L 0 -230 L 120 -150" fill="none" stroke="#3b2a1a" stroke-width="6"/>'
                 f'<rect x="-230" y="-150" width="460" height="150" rx="12" fill="#c8323c" stroke="{OUT}" stroke-width="8"/>'
                 f'<text y="-50" text-anchor="middle" font-family="Inter" font-weight="900" font-size="88" fill="#ffffff">CLOSED</text>'
                 + (f'<g transform="translate(150,40) rotate(8)"><rect x="-120" y="-40" width="240" height="70" rx="10" fill="#ffd54a" stroke="{OUT}" stroke-width="6"/>'
                    f'<text y="12" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" fill="#141414">(mostly)</text></g>'
                    if t >= wt("a11", "Mostly", -0.1) else "") + "</g>")
    if t >= wt("a11", "Mostly", 0.3):
        o.append(f'<g opacity="{prog(t, wt("a11", "Mostly", 0.3), wt("a11", "Mostly", 0.6)):.2f}">'
                 + outlined('x="960" y="860" text-anchor="middle" font-family="Inter" font-weight="800" font-size="40"', "except a few Dutch &amp; Chinese traders. in one harbor.", "#ffffff", "#141414", 8) + "</g>")
    return "".join(o)

# ---------- lớp phủ bản đồ ----------
def map_layer(t):
    P, s, *_ = map_cam(t)
    o = []
    o.append(banner(960, 200, "SONG DYNASTY: GAME OVER", prog(t, 1.4, 1.7), rot=-2) if t < T("a02") + 0.3 else "")
    k = prog(t, 2.6, 2.85)
    if k > 0 and t < T("a02") + 0.3:
        o.append(big(1200, 330, "+1 CHINA", 96, "#7CFC7C", "#141414", 14, k, -6))
    # 1274: lần thử thứ nhất
    if T("a03") - 0.2 <= t < T("a04") - 0.1:
        o.append(J.pin(P, 130.4, 33.6, "Hakata, 1274", t, T("a03") + 0.2, T("a04"), 1, size=44))
        kk = prog(t, wt("a03", "did not", -0.1), wt("a03", "did not", 0.2))
        if kk > 0:
            o.append(f'<g transform="translate(1180,300) rotate(-4) scale({ease_back(kk):.3f})"><rect x="-230" y="-70" width="460" height="130" rx="12" fill="#fff6e0" stroke="{OUT}" stroke-width="7"/>'
                     f'<text y="22" text-anchor="middle" font-family="Inter" font-weight="900" font-size="62" fill="#3b2a1a">ATTEMPT #1</text></g>')
            ks = prog(t, wt("a03", "well", -0.2), wt("a03", "well", 0.05))
            if ks > 0:
                o.append(f'<g transform="translate(1180,295) scale({lerp(2.2, 1, ease_out(ks)):.3f})" opacity="{min(1, ks * 2):.2f}">'
                         f'<path d="M -200 -60 L 200 40 M 200 -60 L -200 40" stroke="#d62828" stroke-width="20" stroke-linecap="round"/></g>')
    # bức tường
    if T("a04") - 0.1 <= t < T("a05"):
        o.append(J.pin(P, 130.4, 33.6, "Hakata Bay", t, T("a04"), T("a05"), 1, size=44))
        o.append(wall(t, T("a04") + 0.25))
    # bão: thuyền giấy bay khỏi bản đồ
    if scene_of(t)[0] == "storm":
        ts = T("a07") - 0.1
        for k_, (lo, la) in enumerate(((129.4, 33.9), (130.2, 34.2), (129.0, 33.4), (129.8, 33.5))):
            x, y = P(lo, la)
            o.append(K.g(x, y, 1.2 + .3 * (k_ % 2), K.storm(t * 260 + k_ * 50), 0, ease_out(prog(t, ts - 0.3 + k_ * .1, ts + .3 + k_ * .1))))
        for m in range(14):
            fly = ease_out(prog(t, ts + 0.15 + m * 0.05, ts + 1.1 + m * 0.05))
            x0, y0 = 600 + (m % 7) * 110, 520 + (m // 7) * 90
            x, y = x0 + fly * (900 + m * 40), y0 - fly * (700 + (m % 3) * 120)
            o.append(K.g(x, y, 0.9, K.JUNK, fly * 540 + m * 10, 1 - prog(t, ts + 1.0 + m * .05, ts + 1.3 + m * .05)))
        o.append(big(960, 240, "KAMIKAZE = “divine wind”", 76, "#ffffff", "#141414", 14, prog(t, ts + 0.3, ts + 0.6), -3)
                 if t < T("a07_end") + 0.15 else "")
    # Đại Việt
    if scene_of(t)[0] == "vn":
        r, pv = J.route(P, (112.0, 25.5), (106.2, 21.4), t, T("a08") + 0.2, 0.9, T("a10"), MONGOL, -0.25, 14)
        o.append(r)
        x, y = P(101.0, 13.0)
        o.append(lbl(x, y, "ĐẠI VIỆT", 58, -5, prog(t, T("a08") + 0.3, T("a08") + 0.8)))
        for name, lo, la in (("Hoàng Sa (Paracel Is.)", 112.0, 17.6), ("Trường Sa (Spratly Is.)", 114.2, 12.4)):
            x, y = P(lo, la)
            o.append(f'<g opacity="{prog(t, T("a08") + 0.6, T("a08") + 1.0):.2f}">' + outlined(f'x="{x + 18:.0f}" y="{y:.0f}" font-family="DejaVu Serif" font-weight="bold" font-size="26"', name, "#fff6d8", BRN, 6) + "</g>")
        o.append(scoreboard(t))
        o.append(river(t))
    if scene_of(t)[0] == "closed":
        o.append(shoji(t))
    return "".join(o)

# ---------- địa cầu ----------
def globe_layer(t, which, j):
    c = G[which + "cams"][j]
    P, vis = projector(c["pv"], c["cam"])
    o = []
    if which == "g1":
        t0 = T("a05") - 0.15
        n = int(8 + 52 * ease_out(prog(t, t0, wt("a05", "largest", 0.8))))
        u = ease_io(prog(t, t0, t0 + 5.0))
        clon, clat = lerp(124.6, 127.8, u), lerp(31.4, 33.0, u)
        x1, y1 = P(clon, clat); x2, y2 = P(clon + 1, clat)
        pxdeg = math.hypot(x2 - x1, y2 - y1)
        sc = clamp(pxdeg * 0.022, 0.28, 0.55)
        for m in range(n):
            rr = (m / 60) ** 0.5
            a_ = m * 2.399
            lo, la = clon + math.cos(a_) * rr * 4.2, clat + math.sin(a_) * rr * 2.4
            if not vis(lo, la):
                continue
            x, y = P(lo, la)
            k_ = ease_back(prog(t, t0 + m * 0.04, t0 + m * 0.04 + 0.3))
            o.append(K.g(x, y + math.sin(t * 3 + m) * 2, sc * k_, K.JUNK, math.sin(t * 2 + m) * 4))
        kk = prog(t, wt("a05", "largest", -0.1), wt("a05", "largest", 0.2))
        if kk > 0:
            o.append(big(1380, 300, "~4,400 ships*", 92, YEL, BRN, 16, kk, -4))
            o.append(f'<g opacity="{prog(t, wt("a05", "largest", 0.9), wt("a05", "largest", 1.2)):.2f}">'
                     + outlined('x="1340" y="390" text-anchor="middle" font-family="Inter" font-weight="800" font-size="38"',
                                "*medieval estimate. medieval people loved big numbers.", "#ffffff", "#141414", 7) + "</g>")
    else:
        if wt("a12", "1905", -0.1) <= t < T("a13") - 0.1:
            o.append(big(600, 300, "1905", 170, YEL, BRN, 22, prog(t, wt("a12", "1905", -0.1), wt("a12", "1905", 0.2)), -5))
        x, y = P(110, 60)
        if t < T("a13") - 0.1:
            o.append(lbl(x, y, "RUSSIAN EMPIRE", 60, -4, prog(t, wt("a12", "Russian", -0.2), wt("a12", "Russian", 0.3)), "#e9eef2"))
        tq = T("a13")
        if t >= tq - 0.1 and t < T("a14") - 0.1:
            k1 = prog(t, tq - 0.1, tq + 0.2)
            k2 = prog(t, wt("a13", "to that?", -0.1), wt("a13", "to that?", 0.2))
            o.append(f'<g transform="translate(420,520) rotate(-3) scale({ease_back(k1):.3f})"><rect x="-230" y="-150" width="460" height="300" rx="20" fill="#f4ead2" stroke="{OUT}" stroke-width="8"/>'
                     f'<text y="-40" text-anchor="middle" font-family="Inter" font-weight="900" font-size="64" fill="#c8323c">CLOSED</text>'
                     f'<text y="20" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" fill="#141414">(mostly)</text>'
                     f'<text y="100" text-anchor="middle" font-family="Inter" font-weight="800" font-size="40" fill="#5a4630">1630s–1853</text></g>')
            if k2 > 0:
                o.append(f'<g transform="translate(1500,520) rotate(3) scale({ease_back(k2):.3f})"><rect x="-230" y="-150" width="460" height="300" rx="20" fill="#1d2b4f" stroke="{OUT}" stroke-width="8"/>'
                         f'<g transform="translate(0,-10) scale(1.6)">{K.BLACKSHIP}</g>'
                         f'<text y="110" text-anchor="middle" font-family="Inter" font-weight="900" font-size="56" fill="#ffd54a">1905</text></g>')
                o.append(big(960, 560, "HOW?", 150, "#ffffff", "#d62828", 22, prog(t, wt("a13", "to that?", 0.2), wt("a13", "to that?", 0.5)), -6))
        if t >= T("a14") - 0.2:
            k = prog(t, T("a14") - 0.2, T("a14") + 0.2)
            o.append(f'<g transform="translate(960,470) scale({ease_back(k):.3f})"><rect x="-520" y="-90" width="1040" height="170" rx="85" fill="#8a2a22" stroke="#141414" stroke-width="8"/>'
                     + outlined('y="26" text-anchor="middle" font-family="Inter" font-weight="900" font-size="86"', "HISTORY OF THE WORLD", YEL, "#3b1d0a", 10) + "</g>")
    return "".join(o)

# ---------- nhân vật ----------
def cast():
    J_ = lambda k, o=0.0: T(k) + o
    return [
        ("khan", 1690, 0.2, J_("a05", -0.3), [(0, "smug", "idle"), (J_("a02"), "smug", "point"), (J_("a03"), "deadpan", "idle"), (wt("a04", "They built"), "sweat", "idle")], "Kublai Khan"),
        ("mongol", 230, J_("a03", 0.2), J_("a04", -0.2), [(0, "smile", "idle"), (wt("a03", "did not"), "sweat", "scratch")], ""),
        ("samurai", 230, J_("a04", 0.1), J_("a07", -0.6), [(0, "smile", "pat"), (J_("a05"), "shock", "idle"), (J_("a06"), "lookup", "idle")], "Samurai"),
        ("tran", 230, J_("a08", 0.3), J_("a10", -0.3), [(0, "deadpan", "cross")], "Đại Việt general"),
        ("mongol", 1690, J_("a08", 0.6), J_("a10", -0.3), [(0, "smug", "idle"), (wt("a09", "1258"), "sweat", "idle"), (wt("a09", "1288"), "shock", "shock")], ""),
        ("shogun", 230, J_("a10", 0.1), J_("a12", -0.3), [(0, "smile", "idle"), (wt("a10", "shut"), "smug", "wave"), (wt("a11", "Mostly", -0.1), "deadpan", "idle")], ""),
        ("admiral", 1690, J_("a12", 0.5), J_("a13", -0.2), [(0, "smug", "spy"), (wt("a12", "Russian", -0.1), "shock", "shock")], "Russian admiral"),
    ]

def pose(action, t):
    if action == "scratch":
        return 8.0, -165 + math.sin(t * 14) * 8, 0.0, 0.0, 4.0
    if action == "pat":
        return 8.0, -80 + math.sin(t * 10) * 18, 0.0, 0.0, 0.0
    if action == "cross":
        return -72.0, 72.0, 0.0, 0.0, 0.0
    if action == "spy":
        return 8.0, -150.0, 0.0, 0.0, -3.0
    return J.pose(action, t)

def khan_closeup(t):
    """cắt sang phản ứng: Khả Hãn giật mí mắt, giữ 1 giây, tiếng dế"""
    a, b = T("a07_end") + 0.15, T("a08") - 0.15
    if not (a <= t < b):
        return ""
    return (f'<rect width="{W}" height="{H}" fill="#2a2118" opacity=".72"/>'
            f'<g transform="translate(960,1500) scale(2.6)">{K.figure("khan", "twitch", 8, -8, t)}</g>')

def binoculars(t):
    t0 = wt("a12", "Russian", -0.1)
    if t < T("a12") + 0.5 or t > T("a13") + 0.2:
        return ""
    fall = ease_out(prog(t, t0, t0 + 0.5)) if t >= t0 else 0
    x, y = 1690 - 66 * 1.1 - 40, 1066 - 360 * 1.1
    if fall > 0:
        x, y = x + fall * 40, y + fall * 420
    return (f'<g transform="translate({x:.0f},{y:.0f}) rotate({fall * 160:.0f})">'
            f'<rect x="-34" y="-16" width="30" height="40" rx="8" fill="#2a2a2a" stroke="{OUT}" stroke-width="4"/>'
            f'<rect x="4" y="-16" width="30" height="40" rx="8" fill="#2a2a2a" stroke="{OUT}" stroke-width="4"/></g>')

def characters(t):
    o = []
    S_ = 1.1
    for kind, x, a, b, acts, name in G["cast"]:
        if t < a - 0.05 or t > b + 0.6:
            continue
        expr, act = acts[0][1], acts[0][2]
        for ta, e, ac in acts:
            if t >= ta:
                expr, act = e, ac
        aL, aR, hop, dy, hr = pose(act, t)
        ent = ease_back(prog(t, a, a + 0.45), 1.4)
        ex = prog(t, b, b + 0.4) ** 2
        y = 1066 + (1 - ent) * 600 + ex * 700 + dy - hop + math.sin(t * 5 + x) * 3
        sc = S_ * (1.18 if kind == "khan" else 1.0)
        sx = -sc if x > W / 2 else sc
        o.append(f'<g transform="translate({x},{y:.1f}) scale({sx:.3f},{sc:.3f})">{K.figure(kind, expr, aL, aR, t, hr)}</g>')
        if name:
            k = prog(t, a + 0.25, a + 0.5) * (1 - prog(t, a + 2.4, a + 2.8))
            if k > 0:
                o.append(f'<g opacity="{k:.2f}">' + big(x, y - 470 * sc, name, 38, "#ffffff", "#8a2a22", 9) + "</g>")
    # bong bóng thoại
    o.append(bubble(1560, 520, "Next.", prog(t, T("a02") + 0.3, T("a02") + 0.6)) if T("a02") <= t < T("a03") + 0.2 else "")
    if T("a09") <= t < T("a10") - 0.2:
        o.append(bubble(1500, 560, "why is the river… pointy?", prog(t, wt("a09", "tide", -0.4), wt("a09", "tide", -0.1)), 40))
    o.append(binoculars(t))
    return "".join(o)

# ---------- phụ đề tô vàng từ khóa ----------
def caption_hl(t):
    for a, b, txt in G["caps"]:
        if a <= t < b:
            k = ease_back(prog(t, a, a + 0.15), 2.2)
            words, f = txt.split(" "), G["font"]
            sp = f.getlength(" ")
            ws = [f.getlength(w) for w in words]
            x = -(sum(ws) + sp * (len(words) - 1)) / 2
            st = fi = ""
            for w, wl in zip(words, ws):
                col = YEL if (w in HL or any(ch.isdigit() for ch in w)) else "#ffffff"
                at = f'x="{x:.1f}" font-family="Inter" font-weight="800" font-size="66"'
                st += f'<text {at} fill="#141414" stroke="#141414" stroke-width="13" stroke-linejoin="round">{w}</text>'
                fi += f'<text {at} fill="{col}">{w}</text>'
                x += wl + sp
            return f'<g transform="translate({W / 2},{H - 92}) scale({0.6 + 0.4 * k:.3f})">{st}{fi}</g>'
    return ""

# ---------- âm thanh ----------
def sfx_events():
    d, d1 = G["sfx"], G["sfx_old"]
    e = lambda t, n, g, dd=None: (t, f"{dd or d}/{n}.mp3", g)
    ev = [e(0.0, "taiko", .8, d1), e(1.4, "stinger", .6), e(2.6, "ding", .7), e(T("a02") - 0.1, "whoosh", .6, d1), e(T("a02") + 0.3, "pop", .6, d1),
          e(wt("a03", "well", -0.2), "wahwah", .55), e(T("a04") - 0.2, "whoosh", .5, d1)]
    t0 = wt("a04", "They built", -0.1)
    ev += [e(t0 + k * 0.32, "thunk", .5) for k in range(5)] + [e(t0 + 1.5, "pop", .6, d1)]
    ev += [e(T("a05") - 0.25, "whoosh", .6, d1), e(T("a05"), "ocean", .5, d1), e(wt("a05", "largest", -0.1), "taiko", .7, d1)]
    ev += [e(T("a07") - 0.15, "storm", .18), e(T("a07_end") + 0.02, "storm", .6)] + [e(T("a07_end") + 0.1 + k * 0.18, "boing", .4) for k in range(3)]
    ev += [e(T("a07_end") + 0.15, "crickets", .7)]
    ev += [e(T("a08") - 0.2, "whoosh", .6, d1)] + [e(wt("a09", w), "tick", .8) for w in ("1258", "1285")] + [e(wt("a09", "1288"), "stinger", .7)]
    ev += [e(wt("a09", "stakes", -0.1), "water", .6), e(wt("a09", "tide", -0.4), "pop", .5, d1)]
    ev += [e(wt("a10", "shut", -0.1), "shoji", .9), e(wt("a11", "Mostly", -0.1), "pop", .5, d1)]
    ev += [e(T("a12") - 0.25, "whoosh", .6, d1), e(wt("a12", "1905", -0.1), "taiko", .8, d1), e(wt("a12", "Russian", 0.1), "drop", .8),
           e(wt("a13", "to that?", 0.2), "stinger", .7), e(T("a14") - 0.3, "jingle", .8)]
    return ev

def mutes():
    """tắt nhạc nền ở các nhịp im lặng (trước câu đùa lớn, lúc tiếng dế)"""
    return [(T("a06_end"), T("a07")), (T("a07_end") + 0.1, T("a08") - 0.1), (T("a10_end"), T("a11"))]

# ---------- ghép ----------
def frame3d(which, t):
    if which == "g1":
        t0 = T("a05") - 0.15
        j = int(clamp(60 + (t - t0) * 30 * 0.7, 0, len(G["g1list"]) - 1))
        idx = G["g1list"][j]
        return f'{G["g1dir"]}/f{idx:05d}.jpg', idx
    t0 = T("a12") - 0.15
    j = int(clamp((t - t0) * 30, 0, len(G["g2list"]) - 1))
    idx = G["g2list"][j]
    return f'{G["g2dir"]}/f{idx:05d}.jpg', idx

def render(i):
    t = i / FPS
    sc = scene_of(t)[0]
    if sc in ("globe1", "globe2"):
        which = "g1" if sc == "globe1" else "g2"
        path, idx = frame3d(which, t)
        base = np.clip(np.asarray(Image.open(path).convert("RGB"), dtype=np.float32) * G["tex6"], 0, 255)
        layer = globe_layer(t, which, idx)
    else:
        img = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=map_bg(t).encode()))).convert("RGB"), dtype=np.float32)
        dim = 0.3 * window(t, wt("a09", "stakes", -0.6), T("a10"), 0.3, 0.2)
        base = np.clip(img * G["tex"], 0, 255) * (1 - dim)
        layer = map_layer(t)
    tb = scene_of(t)[1]
    if t - tb < 0.08 and tb > 0:  # chớp sáng khi đổi cảnh
        base = base * 0.6 + 255 * 0.4
    fg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}">{layer}{characters(t)}{khan_closeup(t)}{caption_hl(t)}</svg>')
    f = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=fg.encode()))).convert("RGBA"), dtype=np.float32)
    a = f[..., 3:4] / 255
    img = base * (1 - a) + f[..., :3] * a
    z = 1.0
    for t0 in (wt("a03", "well", -0.2), T("a07") + 0.1, wt("a09", "1288"), wt("a10", "shut", -0.1), wt("a13", "to that?", 0.2)):
        if t0 <= t < t0 + 0.5:
            z = max(z, 1 + 0.05 * (1 - (t - t0) / 0.5) ** 2)
    if z > 1.001:
        im = Image.fromarray(np.clip(img, 0, 255).astype("uint8"))
        w2, h2 = int(W / z), int(H / z)
        im = im.crop(((W - w2) // 2, (H - h2) // 2, (W - w2) // 2 + w2, (H - h2) // 2 + h2)).resize((W, H), Image.BILINEAR)
        return np.asarray(im).tobytes()
    return np.clip(img, 0, 255).astype("uint8").tobytes()

def init(gdir, vo):
    d = json.load(open(f"{vo}/T_{LANG}.json"))
    G["T"], G["chars"] = d["T"], d["chars"]
    G["dur"] = d["T"]["end"] + 1.2
    G["caps"] = build_captions(d["chars"], d["T"], G["dur"])
    G["cs"], G["prefs"], _ = J.load_geo(gdir, J.box(55, -15, 185, 78))
    for k, env in (("g1", "GLOBE1"), ("g2", "GLOBE2")):
        G[k + "dir"] = os.environ[env]
        cams = json.load(open(f"{G[k + 'dir']}/cams.json"))
        G[k + "cams"] = {c["i"]: c for c in cams}
        G[k + "list"] = sorted(G[k + "cams"])
    tex = make_texture(W, H)
    G["tex"], G["tex6"] = tex, tex ** 0.6
    G["font"] = ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf", 66)
    G["sfx"], G["sfx_old"] = os.environ.get("SFX", ""), os.environ.get("SFX_OLD", "")
    G["cast"] = cast()

def main(gdir, vo, out, only=None):
    init(gdir, vo)
    if only:
        for x in only.split(","):
            fr = np.frombuffer(render(int(float(x) * FPS)), np.uint8).reshape(H, W, 3)
            Image.fromarray(fr).resize((W // 2, H // 2)).save(f"{out}_{x}.png")
        return
    sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "full"))
    from mixer import mix
    audio = out + ".mix.wav"
    mix(f"{vo}/vo_{LANG}.wav", os.environ.get("MUSIC"), sfx_events(), audio, G["dur"], mutes=mutes())
    n = int(G["dur"] * FPS)
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-i", audio, "-af", "loudnorm=I=-14:TP=-1.5:LRA=11,apad", "-shortest",
                           "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-c:a", "aac", "-b:a", "192k", out],
                          stdin=subprocess.PIPE)
    with Pool(4, initializer=init, initargs=(gdir, vo)) as pool:
        for fr in pool.imap(render, range(n), chunksize=4):
            ff.stdin.write(fr)
    ff.stdin.close()
    ff.wait()
    os.remove(audio)

if __name__ == "__main__":
    main(*sys.argv[1:5])
