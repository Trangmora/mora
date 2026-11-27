"""Nhân vật 2D theo thời kỳ và biểu tượng cho tập "Lịch sử Nhật Bản trong 5 phút". Toàn bộ vẽ bằng code (SVG).

figure(kind, expr, aL, aR, t, head_rot): kind ∈ farmer, court, samurai, samurai2, mongol, shogun, perry, meiji, modern
Gốc toạ độ ở giữa hai bàn chân, đầu ở y ≈ -262 (giống nhân vật tập Plaza).
"""
import math
from demo import OUT, SKIN, arm, outlined
from plaza_1985 import face, car, tv, coin

HAIR = "#1a1a1a"

def legs(col="#2a2d33", shoe=OUT):
    return (f'<rect x="-50" y="-74" width="42" height="74" fill="{col}" stroke="{OUT}" stroke-width="6"/>'
            f'<rect x="8" y="-74" width="42" height="74" fill="{col}" stroke="{OUT}" stroke-width="6"/>'
            f'<ellipse cx="-34" cy="0" rx="34" ry="12" fill="{shoe}"/><ellipse cx="34" cy="0" rx="34" ry="12" fill="{shoe}"/>')

def robe(col, inner="#f4efe2", belt=None, long=True, layers=()):
    y1 = -14 if long else -60
    s = (f'<path d="M -70 -198 Q 0 -212 70 -198 L {96 if long else 82} {y1} Q 0 {y1 + 12} {-96 if long else -82} {y1} Z" '
         f'fill="{col}" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>')
    for i, c in enumerate(layers):  # nhiều lớp áo (quý tộc Heian)
        o = 10 + i * 9
        s += f'<path d="M {-34 - o} -204 L {6 - o * .1} {-90 + o} L {34 + o} -204" fill="none" stroke="{c}" stroke-width="9" stroke-linejoin="round"/>'
    s += (f'<path d="M -34 -204 L 10 -110 L 34 -204" fill="{inner}" stroke="{OUT}" stroke-width="4" stroke-linejoin="round"/>'
          f'<path d="M -34 -204 L 22 -96" stroke="{OUT}" stroke-width="5"/>')
    if belt:
        s += f'<rect x="-80" y="-112" width="160" height="26" fill="{belt}" stroke="{OUT}" stroke-width="5"/>'
    return s

def suit(col, tie):
    return (f'<path d="M -70 -198 Q 0 -212 70 -198 L 80 -60 Q 0 -48 -80 -60 Z" fill="{col}" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>'
            f'<path d="M -30 -204 L 0 -130 L 30 -204 Z" fill="#ffffff" stroke="{OUT}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="M -8 -192 L 8 -192 L 12 -150 L 0 -132 L -12 -150 Z" fill="{tie}" stroke="{OUT}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="M -30 -204 L -8 -120 M 30 -204 L 8 -120" stroke="{OUT}" stroke-width="5"/>'
            + "".join(f'<circle cx="0" cy="{y}" r="6" fill="#111"/>' for y in (-108, -82)))

def armor(col, lace):
    s = (f'<path d="M -72 -200 Q 0 -214 72 -200 L 78 -96 Q 0 -86 -78 -96 Z" fill="{col}" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>')
    for y in range(-186, -100, 18):
        s += f'<path d="M -74 {y} Q 0 {y - 8} 74 {y}" fill="none" stroke="{lace}" stroke-width="5"/>'
    for x in (-74, -26, 22):  # váy giáp kusazuri
        s += f'<rect x="{x}" y="-98" width="50" height="46" rx="4" fill="{col}" stroke="{OUT}" stroke-width="5"/>'
        s += f'<path d="M {x + 3} -80 L {x + 47} -80 M {x + 3} -64 L {x + 47} -64" stroke="{lace}" stroke-width="4"/>'
    return s

def shoulder_plates(col, lace):
    return "".join(f'<g transform="translate({x},-196) rotate({r})"><rect x="-30" y="0" width="60" height="64" rx="5" fill="{col}" stroke="{OUT}" stroke-width="5"/>'
                   f'<path d="M -27 18 L 27 18 M -27 36 L 27 36 M -27 52 L 27 52" stroke="{lace}" stroke-width="4"/></g>' for x, r in ((-74, 12), (74, -12)))

def face2(expr, t, glasses=False):
    """biểu cảm hài mới: deadpan (tỉnh bơ), twitch (giật mí mắt), lookup (liếc lên trời), sweat (đổ mồ hôi)"""
    if expr == "deadpan":
        e = "".join(f'<path d="M {x - 13} -262 L {x + 13} -262" stroke="{OUT}" stroke-width="6" stroke-linecap="round"/>'
                    f'<path d="M {x - 9} -262 Q {x} -254 {x + 9} -262" fill="{OUT}"/>' for x in (-22, 30))
        return e + f'<path d="M -12 -224 L 20 -224" stroke="{OUT}" stroke-width="5" stroke-linecap="round"/>'
    if expr == "twitch":
        j = math.sin(t * 55) * 3
        e = (f'<ellipse cx="-22" cy="-264" rx="7" ry="8" fill="{OUT}"/>'
             f'<path d="M 16 {-262 + j:.1f} L 44 {-264 - j:.1f}" stroke="{OUT}" stroke-width="6" stroke-linecap="round"/>'
             f'<path d="M 14 -286 L 46 {-280 + j:.1f}" stroke="{OUT}" stroke-width="5" stroke-linecap="round"/>'
             f'<path d="M -38 -284 L -8 -286" stroke="{OUT}" stroke-width="5" stroke-linecap="round"/>')
        return e + f'<path d="M -14 -224 Q -4 -230 6 -224 Q 14 -218 22 -224" fill="none" stroke="{OUT}" stroke-width="5" stroke-linecap="round"/>'
    if expr == "lookup":
        e = "".join(f'<circle cx="{x}" cy="-266" r="12" fill="#fff" stroke="{OUT}" stroke-width="4"/><circle cx="{x + 2}" cy="-273" r="5" fill="{OUT}"/>' for x in (-22, 30))
        return e + f'<ellipse cx="4" cy="-222" rx="7" ry="8" fill="#5a1d1d" stroke="{OUT}" stroke-width="3"/>'
    if expr == "sweat":
        return (face("smile", t, glasses) + f'<path d="M 70 -330 Q 52 -296 70 -282 Q 88 -296 70 -330 Z" fill="#8fd0ff" stroke="{OUT}" stroke-width="4"/>')
    return face(expr, t, glasses)

def head(extra_back, extra_front, expr, t, glasses=False, rot=0.0, skin=SKIN):
    return (f'<g transform="rotate({rot:.2f} 0 -210)">{extra_back}<circle cx="0" cy="-262" r="80" fill="{skin}" stroke="{OUT}" stroke-width="6"/>'
            f'{extra_front}{face2(expr, t, glasses)}</g>')

MUST = f'<path d="M 4 -236 Q -16 -242 -34 -230 Q -38 -238 -30 -244 M 4 -236 Q 24 -244 42 -232 Q 46 -240 38 -246" fill="none" stroke="{HAIR}" stroke-width="6" stroke-linecap="round"/>'

def figure(kind, expr, aL, aR, t, rot=0.0):
    if kind == "farmer":
        col = "#c9b48a"
        hb = ""
        hf = (f'<path d="M -82 -272 Q -84 -346 0 -350 Q 84 -346 82 -272 Q 50 -318 0 -314 Q -50 -318 -82 -272 Z" fill="{HAIR}" stroke="{OUT}" stroke-width="5"/>'
              f'<circle cx="0" cy="-362" r="24" fill="{HAIR}" stroke="{OUT}" stroke-width="5"/>'
              f'<path d="M -84 -300 Q 0 -322 84 -300" fill="none" stroke="#d9c7a0" stroke-width="10"/>')
        return arm(col, SKIN, aL, -70) + legs("#8a7552", "#5a4a32") + robe(col, "#efe6cf", "#7a5a32", long=False) + head(hb, hf, expr, t, rot=rot) + arm(col, SKIN, aR, 66)
    if kind == "court":
        col = "#7b2e5a"
        hb = (f'<path d="M -92 -300 Q -110 -200 -100 -60 L 100 -60 Q 110 -200 92 -300 Q 60 -360 0 -360 Q -60 -360 -92 -300 Z" fill="{HAIR}" stroke="{OUT}" stroke-width="5"/>')
        hf = f'<path d="M -82 -268 Q -80 -346 0 -352 Q 80 -346 82 -268 Q 60 -320 0 -322 Q -60 -320 -82 -268 Z" fill="{HAIR}"/>'
        body = robe(col, "#f6efe0", None, long=True, layers=("#2f6b5a", "#d9a93a", "#c8323c"))
        return (f'<g transform="rotate({rot:.2f} 0 -210)">{hb}</g>' + arm(col, "#d9a93a", aL, -70)
                + f'<ellipse cx="0" cy="-6" rx="110" ry="18" fill="{col}" stroke="{OUT}" stroke-width="5"/>'
                + body + head("", hf, expr, t, rot=rot) + arm(col, "#d9a93a", aR, 66))
    if kind in ("samurai", "samurai2"):
        col, lace = ("#9e2a2b", "#e8c25a") if kind == "samurai" else ("#24406b", "#d9d9d9")
        hb = (f'<path d="M -96 -300 Q -110 -250 -96 -214 L -70 -226 Q -82 -260 -76 -296 Z M 96 -300 Q 110 -250 96 -214 L 70 -226 Q 82 -260 76 -296 Z" '
              f'fill="#2a2a2e" stroke="{OUT}" stroke-width="5"/>')
        hf = (f'<path d="M -88 -284 Q -88 -362 0 -366 Q 88 -362 88 -284 Z" fill="#2a2a2e" stroke="{OUT}" stroke-width="5"/>'
              f'<path d="M -92 -284 L 92 -284" stroke="{OUT}" stroke-width="10" stroke-linecap="round"/>'
              f'<path d="M -6 -350 Q -60 -380 -70 -440 Q -40 -400 -4 -372 M 6 -350 Q 60 -380 70 -440 Q 40 -400 4 -372" fill="#e8c25a" stroke="{OUT}" stroke-width="4"/>'
              f'<circle cx="0" cy="-358" r="12" fill="#e8c25a" stroke="{OUT}" stroke-width="4"/>')
        return (arm("#2a2a2e", lace, aL, -70) + legs("#2a2a2e") + armor(col, lace) + shoulder_plates(col, lace)
                + head(hb, hf, expr, t, rot=rot) + arm("#2a2a2e", lace, aR, 66))
    if kind == "mongol":
        col = "#2f5f7a"
        hf = (f'<path d="M -70 -300 Q 0 -420 70 -300 Z" fill="#a8322c" stroke="{OUT}" stroke-width="5"/>'
              f'<rect x="-92" y="-312" width="184" height="36" rx="18" fill="#7a5a3a" stroke="{OUT}" stroke-width="5"/>'
              + MUST + f'<path d="M -6 -212 L 4 -186 L 14 -212" fill="{HAIR}"/>')
        return arm(col, "#7a5a3a", aL, -70) + legs("#3a3a3a", "#5a3a22") + robe(col, "#e9dcc0", "#d9a93a", long=False) + head("", hf, expr, t, rot=rot) + arm(col, "#7a5a3a", aR, 66)
    if kind == "shogun":
        col, wing = "#3c3f55", "#5d6b8a"
        hf = (f'<path d="M -82 -272 Q -84 -330 -50 -340 L -50 -300 Q -70 -296 -82 -272 Z M 82 -272 Q 84 -330 50 -340 L 50 -300 Q 70 -296 82 -272 Z" fill="{HAIR}"/>'
              f'<path d="M -10 -342 L 10 -342 L 14 -380 Q 0 -392 -14 -380 Z" fill="{HAIR}" stroke="{OUT}" stroke-width="4"/>'
              f'<path d="M -14 -380 Q 0 -400 30 -392" fill="none" stroke="{HAIR}" stroke-width="12" stroke-linecap="round"/>')
        wings = f'<path d="M -70 -200 L -126 -214 L -112 -150 L -66 -150 Z M 70 -200 L 126 -214 L 112 -150 L 66 -150 Z" fill="{wing}" stroke="{OUT}" stroke-width="5" stroke-linejoin="round"/>'
        return (arm(col, "#f4efe2", aL, -70) + robe(col, "#f4efe2", None, long=True) + f'<path d="M -66 -150 L -50 -200 M 66 -150 L 50 -200" stroke="{OUT}" stroke-width="4"/>'
                + wings + head("", hf, expr, t, rot=rot) + arm(col, "#f4efe2", aR, 66))
    if kind == "perry":
        col = "#1d2b4f"
        hf = (f'<path d="M -84 -270 Q -96 -240 -80 -214 L -66 -230 Q -74 -250 -70 -270 Z M 84 -270 Q 96 -240 80 -214 L 66 -230 Q 74 -250 70 -270 Z" fill="#c9c9c9" stroke="{OUT}" stroke-width="4"/>'
              f'<path d="M -80 -300 Q -86 -350 0 -356 Q 86 -350 80 -300 Z" fill="{col}" stroke="{OUT}" stroke-width="5"/>'
              f'<rect x="-84" y="-312" width="168" height="16" fill="#e2b33c" stroke="{OUT}" stroke-width="4"/>'
              f'<path d="M -60 -300 Q 0 -282 70 -298 L 86 -290 Q 0 -270 -60 -290 Z" fill="#111" stroke="{OUT}" stroke-width="4"/>')
        body = (f'<path d="M -70 -198 Q 0 -212 70 -198 L 84 -40 Q 0 -30 -84 -40 Z" fill="{col}" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>'
                + "".join(f'<circle cx="{x}" cy="{y}" r="6" fill="#e2b33c" stroke="{OUT}" stroke-width="2"/>' for x in (-18, 18) for y in (-170, -140, -110, -80))
                + "".join(f'<ellipse cx="{x}" cy="-198" rx="28" ry="11" fill="#e2b33c" stroke="{OUT}" stroke-width="4"/>' for x in (-62, 62)))
        return arm(col, "#e2b33c", aL, -70) + legs("#e9e9e9") + body + head("", hf, expr, t, rot=rot) + arm(col, "#e2b33c", aR, 66)
    if kind == "khan":  # Hốt Tất Liệt (cách điệu): áo bào vàng, mũ viền lông, râu dài
        col = "#c99a2e"
        hf = (f'<path d="M -84 -292 Q -80 -372 0 -380 Q 80 -372 84 -292 Z" fill="#8a2a22" stroke="{OUT}" stroke-width="5"/>'
              f'<rect x="-96" y="-306" width="192" height="40" rx="20" fill="#e8dcc8" stroke="{OUT}" stroke-width="5"/>'
              f'<circle cx="0" cy="-384" r="12" fill="#e8c25a" stroke="{OUT}" stroke-width="4"/>'
              f'<path d="M 4 -234 Q -30 -238 -54 -214 M 4 -234 Q 38 -238 62 -214" fill="none" stroke="{HAIR}" stroke-width="8" stroke-linecap="round"/>'
              f'<path d="M -14 -210 Q 4 -150 22 -210 Z" fill="{HAIR}"/>')
        body = robe(col, "#8a2a22", "#3b1d0a", long=True) + "".join(f'<circle cx="0" cy="{y}" r="7" fill="#8a2a22"/>' for y in (-80, -50))
        return arm(col, "#e8dcc8", aL, -70) + body + head("", hf, expr, t, rot=rot) + arm(col, "#e8dcc8", aR, 66)
    if kind == "tran":  # tướng Đại Việt thời Trần (cách điệu): khăn đen, giáp đỏ nâu
        col, lace = "#8a3a24", "#d9b15a"
        hf = (f'<path d="M -84 -280 Q -86 -350 0 -356 Q 86 -350 84 -280 Q 40 -300 0 -298 Q -40 -300 -84 -280 Z" fill="#1c1c1c" stroke="{OUT}" stroke-width="5"/>'
              f'<path d="M 70 -300 Q 110 -296 104 -250 Q 96 -280 72 -284 Z" fill="#1c1c1c" stroke="{OUT}" stroke-width="4"/>'
              f'<path d="M -84 -296 Q 0 -316 84 -296" fill="none" stroke="#c8323c" stroke-width="8"/>' + MUST)
        return (arm(col, lace, aL, -70) + legs("#3a2a20", "#2a1a10") + armor(col, lace)
                + head("", hf, expr, t, rot=rot) + arm(col, lace, aR, 66))
    if kind == "admiral":  # đô đốc Nga chung chung (không phải nhân vật có thật)
        col = "#f2f2f0"
        hf = (f'<path d="M -82 -300 Q -86 -352 0 -356 Q 86 -352 82 -300 Z" fill="#ffffff" stroke="{OUT}" stroke-width="5"/>'
              f'<rect x="-86" y="-312" width="172" height="20" fill="#1d2b4f" stroke="{OUT}" stroke-width="4"/>'
              f'<path d="M -66 -300 Q 0 -284 72 -298 L 88 -290 Q 0 -270 -66 -290 Z" fill="#111" stroke="{OUT}" stroke-width="4"/>'
              f'<path d="M -70 -246 Q -60 -160 0 -150 Q 60 -160 70 -246 Q 40 -210 0 -212 Q -40 -210 -70 -246 Z" fill="#9a9a9a" stroke="{OUT}" stroke-width="4"/>')
        body = (f'<path d="M -70 -198 Q 0 -212 70 -198 L 84 -50 Q 0 -40 -84 -50 Z" fill="{col}" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>'
                + "".join(f'<circle cx="{x}" cy="{y}" r="6" fill="#e2b33c" stroke="{OUT}" stroke-width="2"/>' for x in (-18, 18) for y in (-150, -120, -90))
                + "".join(f'<ellipse cx="{x}" cy="-198" rx="30" ry="12" fill="#e2b33c" stroke="{OUT}" stroke-width="4"/>' for x in (-62, 62)))
        return arm(col, "#e2b33c", aL, -70) + legs("#1d2b4f") + body + head("", hf, expr, t, rot=rot) + arm(col, "#e2b33c", aR, 66)
    if kind == "meiji":
        hf = f'<path d="M -84 -268 Q -90 -346 -8 -352 Q 76 -354 86 -272 Q 76 -300 30 -312 Q -10 -306 -40 -320 Q -66 -304 -84 -268 Z" fill="{HAIR}" stroke="{OUT}" stroke-width="5"/>' + MUST
        return arm("#1e1e24", "#ffffff", aL, -70) + legs("#1e1e24") + suit("#1e1e24", "#7a2a2a") + head("", hf, expr, t, rot=rot) + arm("#1e1e24", "#ffffff", aR, 66)
    # modern
    hf = '<path d="M -82 -272 Q -86 -350 -10 -350 Q 70 -352 84 -280 Q 60 -320 10 -316 Q -40 -330 -82 -272 Z" fill="#1a1a1a" stroke="#262220" stroke-width="5"/>'
    return arm("#3a3f47", "#ffffff", aL, -70) + legs() + suit("#3a3f47", "#2f5d9e") + head("", hf, expr, t, glasses=True, rot=rot) + arm("#3a3f47", "#ffffff", aR, 66)

# ---------- biểu tượng ----------
def g(x, y, s, body, rot=0, a=1.0):
    return f'<g opacity="{a:.2f}" transform="translate({x:.1f},{y:.1f}) rotate({rot:.1f}) scale({s:.3f})">{body}</g>'

RICE = (f'<path d="M 0 40 Q -4 0 -30 -50 M 0 40 Q 2 -10 0 -60 M 0 40 Q 6 0 30 -50" fill="none" stroke="#8a6d2b" stroke-width="6"/>'
        + "".join(f'<ellipse cx="{x}" cy="{y}" rx="7" ry="12" fill="#e8c25a" stroke="{OUT}" stroke-width="3" transform="rotate({r} {x} {y})"/>'
                  for x, y, r in ((-28, -44, -30), (-20, -28, -30), (-12, -14, -20), (0, -56, 0), (0, -38, 0), (0, -20, 0), (28, -44, 30), (20, -28, 30), (12, -14, 20))))
KEYHOLE = (f'<path d="M -46 -60 A 52 52 0 1 1 46 -60 L 70 70 L -70 70 Z" fill="#5b8c3a" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>'
           f'<path d="M -30 -60 A 36 36 0 1 1 30 -60 L 48 54 L -48 54 Z" fill="none" stroke="#2f5d9e" stroke-width="8" opacity=".6"/>')
LOTUS = "".join(f'<path d="M 0 30 Q {d * 40} -10 {d * 8} -50 Q {d * 2} -10 0 30 Z" fill="#f2a7b8" stroke="{OUT}" stroke-width="4"/>' for d in (-1.4, -0.6, 0.6, 1.4)) + \
        f'<path d="M 0 30 Q -16 -20 0 -60 Q 16 -20 0 30 Z" fill="#f7c6d0" stroke="{OUT}" stroke-width="4"/><path d="M -50 34 Q 0 50 50 34" fill="none" stroke="#2f7a4a" stroke-width="8"/>'
GRID = (f'<rect x="-60" y="-60" width="120" height="120" fill="#efe6cf" stroke="{OUT}" stroke-width="6"/>'
        + "".join(f'<path d="M {v} -60 L {v} 60 M -60 {v} L 60 {v}" stroke="#a8925f" stroke-width="4"/>' for v in (-30, 0, 30))
        + f'<rect x="-14" y="-60" width="28" height="30" fill="#c8323c" stroke="{OUT}" stroke-width="4"/>')
SWORDS = (f'<circle r="30" fill="#ffd54a" stroke="#3b1d0a" stroke-width="5"/>'
          f'<path d="M -16 -16 L 16 16 M 16 -16 L -16 16" stroke="#3b1d0a" stroke-width="7" stroke-linecap="round"/>'
          f'<path d="M -20 -10 L -10 -20 M 20 -10 L 10 -20" stroke="#3b1d0a" stroke-width="5" stroke-linecap="round"/>')
def flag(col):
    return (f'<path d="M 0 40 L 0 -60" stroke="{OUT}" stroke-width="6"/>'
            f'<path d="M 0 -60 Q 30 -66 56 -56 L 56 -14 Q 30 -24 0 -18 Z" fill="{col}" stroke="{OUT}" stroke-width="5"/>')
JUNK = (f'<path d="M -60 0 L 60 0 L 46 22 L -50 22 Z" fill="#7a4a2a" stroke="{OUT}" stroke-width="5" stroke-linejoin="round"/>'
        f'<path d="M -6 0 L -6 -70" stroke="{OUT}" stroke-width="5"/>'
        f'<path d="M -6 -66 L 34 -60 L 30 -6 L -6 -6 Z" fill="#d9c08a" stroke="{OUT}" stroke-width="4"/>'
        + "".join(f'<path d="M -6 {y} L 32 {y + 3}" stroke="#8a6d2b" stroke-width="3"/>' for y in (-50, -36, -22)))
def storm(rot):
    return f'<g transform="rotate({rot:.1f})">' + "".join(
        f'<path d="M 0 0 Q {50 * math.cos(a)} {50 * math.sin(a)} {90 * math.cos(a + 1)} {90 * math.sin(a + 1)}" fill="none" stroke="#e9f1f5" stroke-width="12" stroke-linecap="round" opacity=".85"/>'
        for a in (0, 2.09, 4.19)) + f'<circle r="14" fill="#e9f1f5"/></g>'
MUSKET = (f'<path d="M -90 -6 L 70 -6 L 70 2 L -90 2 Z" fill="#5a5f66" stroke="{OUT}" stroke-width="4"/>'
          f'<path d="M -10 2 L 70 2 L 96 26 L 60 30 L 30 10 L -10 10 Z" fill="#7a4a2a" stroke="{OUT}" stroke-width="4" stroke-linejoin="round"/>'
          f'<path d="M 20 10 Q 22 24 12 26" fill="none" stroke="{OUT}" stroke-width="4"/>')
NANBAN = (f'<path d="M -70 0 L 70 0 Q 60 26 -60 26 Z" fill="#4a2e1a" stroke="{OUT}" stroke-width="5"/>'
          + "".join(f'<path d="M {x} 0 L {x} -80" stroke="{OUT}" stroke-width="5"/><path d="M {x - 26} -70 Q {x} -60 {x + 26} -70 L {x + 22} -30 Q {x} -22 {x - 22} -30 Z" fill="#f2ead8" stroke="{OUT}" stroke-width="4"/>' for x in (-30, 26)))
BLACKSHIP = (f'<path d="M -80 0 L 80 0 L 66 26 L -70 26 Z" fill="#141414" stroke="#000" stroke-width="5"/>'
             f'<rect x="-14" y="-40" width="18" height="40" fill="#2a2a2a" stroke="#000" stroke-width="4"/>'
             f'<circle cx="30" cy="4" r="22" fill="#2a2a2a" stroke="#000" stroke-width="4"/>'
             f'<path d="M -50 0 L -50 -70 M 50 0 L 50 -60" stroke="#000" stroke-width="5"/>')
def smoke(t, x0=-5):
    return "".join(f'<circle cx="{x0 - 20 - k * 22 + math.sin(t * 3 + k) * 4:.1f}" cy="{-50 - k * 14:.1f}" r="{10 + k * 5}" fill="#6a6a6a" opacity="{.7 - k * .12:.2f}"/>' for k in range(5))
TRAIN = (f'<rect x="-70" y="-40" width="90" height="40" rx="6" fill="#2a2a2e" stroke="{OUT}" stroke-width="5"/>'
         f'<rect x="20" y="-62" width="40" height="62" rx="4" fill="#2a2a2e" stroke="{OUT}" stroke-width="5"/>'
         f'<rect x="-56" y="-66" width="16" height="26" fill="#2a2a2e" stroke="{OUT}" stroke-width="4"/>'
         f'<rect x="28" y="-54" width="24" height="18" fill="#e8d9a8" stroke="{OUT}" stroke-width="3"/>'
         + "".join(f'<circle cx="{x}" cy="6" r="13" fill="#7a2a2a" stroke="{OUT}" stroke-width="4"/>' for x in (-48, -14, 36)))
FACTORY = (f'<path d="M -70 40 L -70 -10 L -40 -30 L -40 -10 L -10 -30 L -10 -10 L 20 -30 L 20 40 Z" fill="#a8786a" stroke="{OUT}" stroke-width="5" stroke-linejoin="round"/>'
           f'<rect x="28" y="-70" width="22" height="110" fill="#7a5a4a" stroke="{OUT}" stroke-width="5"/>'
           + "".join(f'<rect x="{x}" y="6" width="14" height="14" fill="#e8d9a8" stroke="{OUT}" stroke-width="3"/>' for x in (-60, -34, -8)))
SHINKANSEN = (f'<path d="M -150 -30 L 60 -30 Q 140 -26 160 10 L -150 10 Z" fill="#f5f5f5" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>'
              f'<path d="M -150 -2 L 150 -2" stroke="#2f5d9e" stroke-width="10"/>'
              f'<path d="M 78 -24 Q 120 -20 136 -4 L 80 -4 Z" fill="#33424f" stroke="{OUT}" stroke-width="4"/>'
              + "".join(f'<rect x="{x}" y="-22" width="26" height="12" rx="3" fill="#33424f"/>' for x in range(-136, 60, 36)))
TORCH = (f'<path d="M -16 -20 L 16 -20 L 8 70 L -8 70 Z" fill="#c9a046" stroke="{OUT}" stroke-width="5"/>'
         f'<path d="M 0 -26 Q -34 -60 -6 -110 Q 0 -80 14 -96 Q 36 -56 0 -26 Z" fill="#f28c28" stroke="{OUT}" stroke-width="4"/>'
         f'<path d="M 0 -30 Q -12 -54 2 -76 Q 16 -54 0 -30 Z" fill="#ffd54a"/>')
CONTROLLER = (f'<path d="M -70 -20 Q -60 -40 -30 -36 L 30 -36 Q 60 -40 70 -20 L 80 30 Q 70 50 50 30 L 30 10 L -30 10 L -50 30 Q -70 50 -80 30 Z" fill="#e9e9ee" stroke="{OUT}" stroke-width="5" stroke-linejoin="round"/>'
              f'<path d="M -46 -16 L -46 4 M -56 -6 L -36 -6" stroke="{OUT}" stroke-width="6"/>'
              + "".join(f'<circle cx="{x}" cy="{y}" r="6" fill="{c}"/>' for x, y, c in ((40, -16, "#c8323c"), (52, -4, "#2f5d9e"), (28, -4, "#2fa84f"))))
ROBOT = (f'<rect x="-40" y="-60" width="80" height="60" rx="14" fill="#cfd8df" stroke="{OUT}" stroke-width="5"/>'
         f'<circle cx="-16" cy="-32" r="10" fill="#4fc3f7" stroke="{OUT}" stroke-width="3"/><circle cx="16" cy="-32" r="10" fill="#4fc3f7" stroke="{OUT}" stroke-width="3"/>'
         f'<path d="M 0 -60 L 0 -80" stroke="{OUT}" stroke-width="5"/><circle cx="0" cy="-84" r="7" fill="#c8323c" stroke="{OUT}" stroke-width="3"/>'
         f'<rect x="-34" y="4" width="68" height="50" rx="8" fill="#9fb0bd" stroke="{OUT}" stroke-width="5"/>')
MANGA = (f'<path d="M -70 -50 L 70 -50 L 70 30 L 10 30 L -10 56 L -10 30 L -70 30 Z" fill="#ffffff" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>'
         + outlined('y="10" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54"', "!!", "#c8323c", "#ffffff", 2))
SCROLL = (f'<rect x="-150" y="-80" width="300" height="160" fill="#f2e6c8" stroke="{OUT}" stroke-width="6"/>'
          f'<rect x="-170" y="-90" width="24" height="180" rx="10" fill="#7a2a2a" stroke="{OUT}" stroke-width="5"/>'
          f'<rect x="146" y="-90" width="24" height="180" rx="10" fill="#7a2a2a" stroke="{OUT}" stroke-width="5"/>'
          + "".join(f'<path d="M {x} -60 L {x} 60" stroke="#3b2a1a" stroke-width="4" stroke-dasharray="14 8"/>' for x in range(-120, 130, 30)))
DUTCH = (f'<path d="M 0 30 L 0 -50" stroke="{OUT}" stroke-width="5"/>'
         f'<rect x="0" y="-50" width="50" height="12" fill="#ae1c28"/><rect x="0" y="-38" width="50" height="12" fill="#ffffff"/><rect x="0" y="-26" width="50" height="12" fill="#21468b"/>'
         f'<rect x="0" y="-50" width="50" height="36" fill="none" stroke="{OUT}" stroke-width="4"/>')

def head_medallion(kind, x, y, s, t, label, k):
    """chân dung nhỏ trong khung tròn (ba người thống nhất Nhật Bản)"""
    if k <= 0:
        return ""
    from plaza_1985 import ease_back
    fig = figure(kind, "smile", 8, -8, t)
    return (f'<g transform="translate({x:.1f},{y:.1f}) scale({ease_back(min(k, 1)):.3f})">'
            f'<circle r="{120 * s:.0f}" fill="#fff6e0" stroke="{OUT}" stroke-width="8"/>'
            f'<clipPath id="cm{int(x)}"><circle r="{114 * s:.0f}"/></clipPath>'
            f'<g clip-path="url(#cm{int(x)})"><g transform="translate(0,{205 * s:.0f}) scale({.62 * s:.3f})">{fig}</g></g>'
            + outlined(f'y="{165 * s:.0f}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="{40 * s:.0f}"', label, "#ffffff", "#141414", 9) + "</g>")
