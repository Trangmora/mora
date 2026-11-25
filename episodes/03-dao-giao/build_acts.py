"""Danh sách cảnh tập Lão Tử (kể chuyện theo mẫu Geisha). Mốc lấy từ giọng đọc từng phần (tts_flow).
Dùng (trong thư mục work): python3 ../build_acts.py <lang> <fonts_dir>"""
import json, sys
LANG, F = sys.argv[1], sys.argv[2]; VI = LANG == 'vi'
L = lambda vi, en: vi if VI else en
FONTS = {"cap": F + ("/BeVN600.ttf" if VI else "/Lora600.ttf"), "seal": F + "/NotoSerifSC700.ttf", "brush": F + "/MaShanZheng.ttf", "serif": F + "/NotoSerifSC700.ttf"}
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
    json.dump({"fonts": FONTS, "seal": "道", "dur": end, "fade_in": .6, "fade_out": .8, "shots": shots},
              open(f'{name}_{LANG}_shots.json', 'w'), ensure_ascii=False, indent=1)
    print(name, round(end, 1), len(shots))
I = lambda k: f'img/{k}.png'
def a1(g, end):
    s = scene(I('A1'), 0, g('k2') - .3, [{"labels": [lab(1.5, 6.0, P(L("LÝ NHĨ · ", "LI ER · "), L("GIỮ KHO SÁCH", "ARCHIVIST")))]}, {"z": [1.4, 1.46], "f": [.55, .45]}], tr='none')
    s += scene(I('A1b'), g('k2') - .3, g('k3') - .3, [{}])
    s += scene('clip_A2.mp4', g('k3') - .3, g('k4') - .3, [{"labels": [lab(1.0, 5.0, P(L("KHỔNG TỬ ", "CONFUCIUS "), L("HỎI LỄ", "VISITS")))]}])
    s += scene(I('A2b'), g('k4') - .3, end, [{"ink": {"text": "龍", "x": .8, "y": .28, "size": 230, "t0": 4.0, "reveal": 2.0},
              "labels": [lab(5.5, 10.0, P(L("NHƯ ", "LIKE A "), L("CON RỒNG", "DRAGON")))]}])
    return s
def a2(g, end):
    s = scene('clip_A3.mp4', 0, g('p2') - .3, [{"labels": [lab(3.5, 8.0, P(L("VỀ PHÍA ", "RIDING "), L("TÂY", "WEST")))]}], tr='none')
    s += scene(I('A4'), g('p2') - .3, g('p3') - .3, [{"fx": ["purple"], "labels": [lab(1.0, 5.0, P(L("ẢI ", ""), L("HÀM CỐC", "HANGU PASS")))]}, {"fx": ["purple"], "z": [1.4, 1.45], "f": [.3, .35]}])
    s += scene(I('A5'), g('p3') - .3, g('p4') - .3, [{}])
    s += scene('clip_A6.mp4', g('p4') - .3, g('p5') - .3, [{"labels": [lab(1.5, 5.5, P("", L("ĐẠO ĐỨC KINH", "TAO TE CHING")))]}])
    s += scene(I('A7'), g('p5') - .3, end, [{}], tr='fade')
    return s
def a3(g, end):
    s = scene(I('A8'), 0, g('t2') - .3, [{"labels": [lab(.2, 3.0, P("", L("SÁCH NÓI GÌ?", "WHAT DOES IT SAY?")), 'tc', 40), lab(4.5, 9.0, P(L("CHƯƠNG ", "CHAPTER "), "1"))],
              "ink": {"text": "道", "x": .5, "y": .3, "size": 230, "t0": 3.2}}], tr='none')
    s += scene(I('A8b'), g('t2') - .3, g('t3') - .3, [{"ink": {"text": "無為", "x": .82, "y": .25, "size": 150, "t0": .6}, "labels": [lab(1.0, 5.0, P("", L("VÔ VI", "WU WEI")))]}])
    s += scene('clip_A8c.mp4', g('t3') - .3, g('t4') - .3, [{"labels": [lab(1.0, 5.5, P(L("NƯỚC ", "WATER "), L("MÀI MÒN ĐÁ", "WEARS STONE")))]}])
    s += scene(I('A1b'), g('t4') - .3, end, [{"z": [1.15, 1.25], "f": [.5, .4]}])
    return s
def a4(g, end):
    s = scene(I('A11n'), 0, g('g2') - .3, [{"fx": ["smoke"], "smoke_at": [.5, .62], "labels": [lab(3.5, 8.0, P("", L("ĐẠO GIÁO", "TAOISM")))]}], tr='none')
    s += scene('clip_A12.mp4', g('g2') - .3, g('g3') - .3, [{"labels": [lab(1.0, 5.0, P(L("THUỐC ", "ELIXIR OF "), L("TRƯỜNG SINH", "LIFE")))]}])
    s += scene('clip_A13.mp4', g('g3') - .3, end, [{"fx": ["fire"]}, {"fx": ["fire"], "z": [1.3, 1.36], "ink": {"text": "火藥", "font": "serif", "x": .2, "y": .2, "size": 140, "t0": .6},
              "labels": [lab(1.0, 6.0, P("", L("THUỐC SÚNG", "GUNPOWDER")))]}], speed=.5)
    return s
def a5(g, end):
    if VI:
        s = scene(I('A14'), 0, g('w2') - .3, [{"labels": [lab(3.0, 8.0, P(L("TAM GIÁO ", ""), L("ĐỒNG NGUYÊN", "")))]}], tr='none')
        s += scene(I('A15'), g('w2') - .3, end, [{"fx": ["smoke"], "smoke_at": [.6, .7], "labels": [lab(1.0, 6.0, P("ĐỀN QUÁN THÁNH · ", "HÀ NỘI"))]}])
    else:
        s = scene(I('A14w'), 0, mid := (g('w1') + g('w2')) / 2, [{"labels": [lab(3.0, 7.0, P("YIN · ", "YANG"))]}], tr='none')
        s += scene('clip_A15w.mp4', mid, g('w2') - .3, [{"labels": [lab(.6, 4.0, P("", "TAI CHI"))]}], tr='cross')
        s += scene(I('A17w'), g('w2') - .3, end, [{"labels": [lab(1.0, 6.0, P("", "BE WATER"))]}])
    return s
def ending(g, end):
    a, b = end / 3, 2 * end / 3
    s = scene(I('OPBG'), 0, a, [{"par": 0}], tr='none')
    s += scene('clip_A3.mp4', a, b, [{}], tr='cross', speed=.5)
    s += scene(I('OPBG'), b, end, [{"par": 0, "z": [1.08, 1.02], "ink": {"text": "道", "x": .36, "y": .3, "size": 230, "t0": .8, "reveal": 2.4}}], tr='cross')
    return s
act('a1', 1.0, a1); act('a2', 3.0, a2); act('a3', 3.0, a3); act('a4', 3.0, a4); act('a5', 2.5, a5); act('end', 2.0, ending, tail=4.5)
