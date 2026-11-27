"""Nhân vật 2D (cùng nét với bộ mapstory: đầu tròn, mắt chấm, viền đậm)."""
import math

OUT = "#262220"
SKIN = "#f6dcc6"

def trang(t, mouth=0.0, wave=0.0, blink=False, cap=""):
    """MC Trang: tóc dài nâu đen, áo vest xanh than, sơ mi trắng.
    mouth: 0..1 độ mở miệng; wave: 0..1 mức vẫy tay phải; cap: svg mũ tốt nghiệp (toạ độ đầu)."""
    hair, blazer, shirt, pants = "#2b1a14", "#1f3b5c", "#ffffff", "#2a2a33"
    # tay trái (thả)
    armL = (f'<g transform="translate(-64,-178) rotate(10)">'
            f'<rect x="-18" y="-6" width="36" height="128" rx="18" fill="{blazer}" stroke="{OUT}" stroke-width="6"/>'
            f'<circle cx="0" cy="134" r="19" fill="{SKIN}" stroke="{OUT}" stroke-width="5"/></g>')
    ang = -20 - 140 * wave + (math.sin(t * 9) * 18 * wave)
    armR = (f'<g transform="translate(64,-178) rotate({ang:.1f})">'
            f'<rect x="-18" y="-6" width="36" height="128" rx="18" fill="{blazer}" stroke="{OUT}" stroke-width="6"/>'
            f'<circle cx="0" cy="134" r="19" fill="{SKIN}" stroke="{OUT}" stroke-width="5"/></g>')
    legs = (f'<rect x="-46" y="-92" width="38" height="86" rx="10" fill="{pants}" stroke="{OUT}" stroke-width="6"/>'
            f'<rect x="8" y="-92" width="38" height="86" rx="10" fill="{pants}" stroke="{OUT}" stroke-width="6"/>'
            f'<ellipse cx="-30" cy="-4" rx="30" ry="12" fill="#151515"/><ellipse cx="30" cy="-4" rx="30" ry="12" fill="#151515"/>')
    body = (f'<path d="M -66 -202 Q 0 -214 66 -202 L 76 -84 Q 0 -72 -76 -84 Z" fill="{blazer}" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>'
            f'<path d="M -24 -206 L 0 -150 L 24 -206 Z" fill="{shirt}" stroke="{OUT}" stroke-width="4" stroke-linejoin="round"/>'
            f'<path d="M -24 -206 L -6 -120 M 24 -206 L 6 -120" stroke="#16304d" stroke-width="5"/>'
            f'<circle cx="0" cy="-112" r="5" fill="#d9b44a"/>')
    hair_back = (f'<path d="M -88 -290 Q -116 -210 -112 -118 Q -92 -104 -70 -128 Q -76 -170 -64 -196 L 64 -196 '
                 f'Q 76 -170 70 -128 Q 92 -104 112 -118 Q 116 -210 88 -290 Q 70 -366 0 -366 Q -70 -366 -88 -290 Z" '
                 f'fill="{hair}" stroke="{OUT}" stroke-width="6" stroke-linejoin="round"/>')
    if blink:
        eyes = ''.join(f'<path d="M {x - 8} -262 Q {x} -256 {x + 8} -262" fill="none" stroke="{OUT}" stroke-width="4" stroke-linecap="round"/>'
                       for x in (-24, 28))
    else:
        eyes = ''.join(f'<ellipse cx="{x}" cy="-262" rx="6.5" ry="8.5" fill="{OUT}"/>' for x in (-24, 28))
    if mouth > 0.15:
        h = 6 + 16 * min(1, mouth)
        m = (f'<ellipse cx="2" cy="{-224 + h / 3:.1f}" rx="{11 + 3 * min(1, mouth):.1f}" ry="{h / 2 + 3:.1f}" fill="#7a2a2a" stroke="{OUT}" stroke-width="4"/>'
             f'<ellipse cx="2" cy="{-224 + h / 2 + 2:.1f}" rx="7" ry="{max(2, h / 5):.1f}" fill="#e07a7a"/>')
    else:
        m = f'<path d="M -12 -228 Q 2 -214 16 -228" fill="none" stroke="{OUT}" stroke-width="5" stroke-linecap="round"/>'
    face = (f'<circle cx="0" cy="-262" r="80" fill="{SKIN}" stroke="{OUT}" stroke-width="6"/>'
            f'<path d="M -84 -262 Q -86 -330 -20 -346 Q 50 -352 84 -296 Q 70 -278 60 -262 Q 46 -306 -6 -312 Q -40 -300 -62 -268 Q -72 -250 -84 -262 Z" fill="{hair}"/>'
            f'<path d="M -6 -312 Q 10 -330 30 -340" fill="none" stroke="#5a3b2e" stroke-width="5" stroke-linecap="round"/>'
            f'<circle cx="-44" cy="-236" r="11" fill="#f2a7a7" opacity="0.7"/><circle cx="48" cy="-236" r="11" fill="#f2a7a7" opacity="0.7"/>'
            + eyes + m)
    tilt = math.sin(t * 2.2) * 2.5
    head = f'<g transform="rotate({tilt:.2f} 0 -200)">{hair_back}{face}{cap}</g>'
    return armL + legs + body + head + armR

def grad_cap_strokes():
    """Điểm nét bút vẽ mũ tốt nghiệp (toạ độ đầu nhân vật)."""
    board = [(-100, -350), (0, -392), (100, -350), (0, -310), (-100, -350)]
    base = [(-58, -338), (-58, -300), (0, -284), (58, -300), (58, -338)]
    tassel = [(60, -348), (96, -330), (100, -282)]
    return board, base, tassel
