"""Danh sách cảnh tập sông Hằng. Dùng (trong thư mục work): python3 ../build_acts.py <lang> <fonts_dir>"""
import json, sys
LANG, F = sys.argv[1], sys.argv[2]; VI = LANG == 'vi'
L = lambda vi, en: vi if VI else en
FONTS = {"cap": F + ("/BeVN600.ttf" if VI else "/Lora600.ttf"), "seal": F + "/NotoSerifDeva700.ttf", "brush": F + "/NotoSerifDeva700.ttf", "serif": F + "/NotoSerifSC700.ttf"}
def lab(t0, t1, parts, pos='tl', size=26): return {"t0": t0, "t1": t1, "parts": parts, "pos": pos, "size": size}
def P(*a): return [[x, i % 2] for i, x in enumerate(a)]
def scene(src, s, e, frames, tr='tear', speed=0.6, **kw):
    out, n = [], len(frames)
    for j, fr in enumerate(frames):
        a = s + (e - s) * j / n; b = s + (e - s) * (j + 1) / n
        sh = dict(kw); sh.update({"s": a, "e": b, "tr": tr if j == 0 else "cross"})
        if src.endswith('.mp4'): sh.update({"clip": src, "speed": speed, "clip_t0": (a - s) * speed})
        else: sh["img"] = src
        sh.update(fr); out.append(sh)
    return out
def act(name, o, build, tail=2.5):
    T = json.load(open(f'vo_{name}_{LANG}.json'))['T']; g = lambda k: o + T[k]
    end = o + T['end'] + tail; shots = build(g, end)
    json.dump({"fonts": FONTS, "seal": "ॐ", "dur": end, "fade_in": .6, "fade_out": .8, "shots": shots}, open(f'{name}_{LANG}_shots.json', 'w'), ensure_ascii=False, indent=1)
    print(name, round(end, 1), len(shots))
I = lambda k: f'img/{k}.png'
def a1(g, end):
    s = scene(I('G1'), 0, g('m3') - .3, [{"z": [1.3, 1.36], "f": [.62, .28], "labels": [lab(1.5, 6.0, P(L("NỮ THẦN ", "THE GODDESS "), "GANGA"))]},
              {"z": [1.3, 1.36], "f": [.25, .5], "labels": [lab(1.0, 6.0, P(L("VUA ", "KING "), "BHAGIRATHA"))]}, {}], tr='none')
    s += scene(I('G2'), g('m3') - .3, g('m4') - .3, [{}])
    s += scene('clip_G2.mp4', g('m4') - .3, end, [{"labels": [lab(1.0, 6.0, P(L("THẦN ", "LORD "), "SHIVA"))]}, {"z": [1.35, 1.42], "f": [.5, .32]}, {}], tr='cross', speed=.4)
    return s
def a2(g, end):
    s = scene(I('G3'), 0, g('j2') - .3, [{"labels": [lab(2.0, 6.5, P("GANGOTRI · ", "HIMALAYA"))]}, {"z": [1.3, 1.36], "f": [.3, .55], "labels": [lab(1.0, 6.0, P(L("HƠN ", "OVER "), "2.500 KM"))]}], tr='none')
    m = (g('j2') + g('j3')) / 2
    s += scene('clip_G4.mp4', g('j2') - .3, m, [{"labels": [lab(1.0, 5.5, P("VARANASI · ", "GHAT"))]}])
    s += scene('clip_G5.mp4', m, g('j3') - .3, [{"fx": ["flicker"], "labels": [lab(.6, 4.5, P(L("LỄ LỬA ", "FIRE CEREMONY · "), "AARTI"))]}], tr='cross')
    s += scene(I('G4'), g('j3') - .3, end, [{"z": [1.5, 1.56], "f": [.8, .3], "fx": ["smoke"], "smoke_at": [.55, .45]}])
    return s
def a3(g, end):
    s = scene(I('G4'), 0, g('g2') - .3, [{"z": [1.3, 1.36], "f": [.15, .6], "ink": {"text": "गंगा माँ", "x": .72, "y": .2, "size": 110, "t0": 1.5},
              "labels": [lab(3.0, 7.5, P("GANGA MA · ", L("MẸ GANGA", "MOTHER GANGA")))]}], tr='none')
    s += scene('clip_G6.mp4', g('g2') - .3, g('g3') - .3, [{"labels": [lab(1.0, 5.5, P(L("LÚC ", "AT "), L("CHÀO ĐỜI", "BIRTH")))]}, {"z": [1.3, 1.36], "f": [.2, .4]}])
    s += scene(I('G6'), g('g3') - .3, g('g4') - .3, [{"z": [1.4, 1.46], "f": [.2, .35]}])
    s += scene(I('G7'), g('g4') - .3, end, [{"labels": [lab(4.0, 9.0, P(L("GIẢI THOÁT · ", "LIBERATION · "), "MOKSHA"))]}, {"z": [1.3, 1.36], "f": [.4, .45]}])
    return s
def a4(g, end):
    s = scene('clip_G8.mp4', 0, g('k2') - .3, [{"labels": [lab(4.5, 9.0, P("", "KUMBH MELA"))]}], tr='none', speed=.5)
    s += scene(I('G8'), g('k2') - .3, g('k3') - .3, [{"z": [1.3, 1.36], "f": [.3, .55]}, {"labels": [lab(.5, 5.0, P(L("HÀNG CHỤC TRIỆU ", "TENS OF MILLIONS OF "), L("NGƯỜI", "PILGRIMS")))]}])
    s += scene('clip_G8.mp4', g('k3') - .3, end, [{"z": [1.2, 1.26], "f": [.6, .5]}], speed=.4)
    return s
def a5(g, end):
    s = scene(I('G9'), 0, g('p2') - .3, [{}, {"z": [1.4, 1.46], "f": [.75, .6]}], tr='none')
    s += scene(I('G10'), g('p2') - .3, end, [{"labels": [lab(1.0, 6.0, P("2017 · ", L("THỰC THỂ SỐNG", "A LIVING ENTITY")))]}, {"z": [1.35, 1.4], "f": [.4, .45]}, {}])
    return s
def ending(g, end):
    a = end * .45
    s = scene('clip_G5.mp4', 0, a, [{"fx": ["flicker"]}], tr='none', speed=.45)
    s += scene(I('OPBG'), a, end, [{"par": 0, "ink": {"text": "गंगा", "x": .3, "y": .3, "size": 200, "t0": .8, "reveal": 2.2}}], tr='cross')
    return s
act('a1', 3.0, a1); act('a2', 3.0, a2); act('a3', 3.0, a3); act('a4', 2.5, a4); act('a5', 3.0, a5); act('end', 2.0, ending, tail=4.5)
