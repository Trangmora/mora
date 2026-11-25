"""Danh sách cảnh cho Hồi 2 đến đoạn kết (tập Nho giáo). Mốc lấy từ giọng đọc từng hồi (tts_flow).
Dùng: python3 build_acts.py <lang> <fonts_dir>   (chạy trong thư mục work)
Xuất <act>_<lang>_shots.json cho paper_scenes.py. Mỗi hồi mở bằng một khoảng ngắt chỉ có nhạc (BR giây), cảnh mới hiện ngay đầu khoảng ngắt."""
import json, sys
LANG, F = sys.argv[1], sys.argv[2]
VI = LANG == 'vi'
L = lambda vi, en: vi if VI else en
FONTS = {"cap": F + ("/BeVN600.ttf" if VI else "/Lora600.ttf"), "seal": F + "/NotoSerifSC700.ttf",
         "brush": F + "/MaShanZheng.ttf", "serif": F + "/NotoSerifSC700.ttf"}
def lab(t0, t1, parts, pos='tl', size=26): return {"t0": t0, "t1": t1, "parts": parts, "pos": pos, "size": size}
def P(*a): return [[x, i % 2] for i, x in enumerate(a)]          # luân phiên thường / tô đỏ
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
    json.dump({"fonts": FONTS, "seal": "儒", "dur": end, "fade_in": .6, "fade_out": .8, "shots": shots},
              open(f'{name}_{LANG}_shots.json', 'w'), ensure_ascii=False, indent=1)
    print(name, round(end, 1), len(shots), 'khung')

def act2(g, end):
    s = []
    s += scene('clip_A5.mp4', 0, g('s6') - .3, [{"labels": [lab(4.0, 8.5, P(L("RỜI ", "LEAVING "), L("NƯỚC LỖ", "LU")))]}], tr='none')
    s += scene('clip_A6.mp4', g('s6') - .3, g('s6b') - .3, [{"labels": [lab(1.0, 5.0, P(L("14 NĂM · ", "14 YEARS · "), L("CHU DU", "ON THE ROAD")))]}])
    s += scene('img/A6b.png', g('s6b') - .3, g('s7') - .3, [{}, {"z": [1.5, 1.56], "f": [.72, .55]},
              {"z": [1.45, 1.5], "f": [.45, .4], "labels": [lab(2.0, 6.0, P(L("CÒN DỮ HƠN ", "FIERCER THAN A "), L("HỔ", "TIGER")))]}])
    s += scene('clip_A7.mp4', g('s7') - .3, g('s8') - .3, [{"labels": [lab(1.0, 4.5, P(L("VÂY GIỮA ", "TRAPPED · "), L("TRẦN – THÁI", "CHEN & CAI")))]}, {"z": [1.45, 1.5], "f": [.45, .42]}], speed=.5)
    s += scene('img/A8.png', g('s8') - .3, g('s9') - .3, [{}, {"z": [1.4, 1.46], "f": [.3, .55], "labels": [lab(1.0, 4.5, P(L("NHƯ CHÓ ", "LIKE A "), L("LẠC NHÀ", "STRAY DOG")))]}])
    s += scene('img/A9.png', g('s9') - .3, g('s10') - .3, [{"fx": ["smoke"], "smoke_at": [.86, .7]}, {"z": [1.35, 1.4], "f": [.45, .45], "fx": ["smoke"], "smoke_at": [.86, .7]}])
    s += scene('img/A10.png', g('s10') - .3, end, [{"fx": ["smoke"], "smoke_at": [.5, .58], "labels": [lab(3.0, 7.5, P(L("NĂM ", "DIED "), L("479 TCN", "479 BC")))]}], tr='fade')
    return s
def act3(g, end):
    s = []
    s += scene('clip_A11.mp4', 0, g('t1') - .3, [{"labels": [lab(3.6, 8.5, P(L("LUẬN NGỮ", "THE ANALECTS"), ""))]}], tr='none')
    s += scene('clip_A12a.mp4', g('t1') - .3, g('t2') - .3, [{"labels": [lab(0.0, 2.4, P("", L("ÔNG DẠY GÌ?", "WHAT DID HE TEACH?")), 'tc', 40), lab(3.0, 8.0, P(L("NHÂN · ", "REN · "), L("THƯƠNG NGƯỜI", "LOVE PEOPLE")))],
              "ink": {"text": "仁", "x": .84, "y": .3, "size": 200, "t0": 2.6}}])
    s += scene('clip_A12b.mp4', g('t2') - .3, g('t3') - .3, [{"fx": ["smoke"], "smoke_at": [.63, .5], "labels": [lab(1.0, 6.0, P(L("LỄ · ", "LI · "), L("CƯ XỬ ĐÚNG MỰC", "RITUAL")))],
              "ink": {"text": "禮", "font": "serif", "x": .13, "y": .3, "size": 170, "t0": .8}}])
    s += scene('clip_A12c.mp4', g('t3') - .3, g('t4') - .3, [{"labels": [lab(1.0, 6.0, P(L("HIẾU · ", "FILIAL "), L("KÍNH CHA MẸ", "PIETY")))], "ink": {"text": "孝", "x": .87, "y": .28, "size": 180, "t0": .8}}])
    s += scene('clip_A12d.mp4', g('t4') - .3, g('t5') - .3, [{"ink": {"text": "君子", "x": .5, "y": .17, "size": 150, "t0": .8}},
              {"z": [1.35, 1.4], "f": [.3, .5], "f1": [.7, .5], "labels": [lab(.8, 5.5, P(L("QUÂN TỬ · ", "NOBLE · "), L("TIỂU NHÂN", "PETTY")))]}])
    s += scene('clip_A12e.mp4', g('t5') - .3, g('t6') - .3, [{"ink": {"text": "德", "x": .86, "y": .25, "size": 180, "t0": .8}, "labels": [lab(1.0, 6.0, P(L("TRỊ NƯỚC ", "RULE BY "), L("BẰNG ĐỨC", "VIRTUE")))]},
              {"z": [1.35, 1.4], "f": [.5, .3], "labels": [lab(1.0, 5.5, P(L("VUA RA ", "LET THE RULER "), L("VUA", "BE A RULER")))]}])
    s += scene('img/A12.png', g('t6') - .3, g('t7') - .3, [{"ink": {"text": "五倫", "font": "serif", "x": .5, "y": .17, "size": 130, "t0": .8},
              "labels": [lab(1.5, 6.5, P(L("NGŨ LUÂN · ", "FIVE BONDS · "), L("MẠNH TỬ", "MENCIUS")))]}])
    s += scene('clip_A13.mp4', g('t7') - .3, end, [{"ink": {"text": "己所不欲 勿施於人", "x": .5, "y": .66, "size": 64, "t0": 4.0, "reveal": 3.5, "alpha": .95, "color": [.12, .1, .09]}},
              {"z": [1.3, 1.35], "f": [.5, .6], "ink": {"text": "己所不欲 勿施於人", "x": .5, "y": .66, "size": 64, "t0": -9, "color": [.12, .1, .09]}, "labels": [lab(1.0, 5.5, P(L("KỶ SỞ ", "DO NOT DO "), L("BẤT DỤC", "TO OTHERS")))]}])
    return s
def act4(g, end):
    s = []
    s += scene('clip_A14.mp4', 0, g('s15') - .3, [{"fx": ["fire"], "labels": [lab(4.0, 9.0, P(L("213 TCN · ", "213 BC · "), L("ĐỐT SÁCH", "BOOK BURNING")))]}, {"fx": ["fire"], "z": [1.35, 1.4], "f": [.5, .55]}], tr='tear', speed=.5)
    s += scene('img/A15.png', g('s15') - .3, end, [{"labels": [lab(3.0, 8.0, P(L("NHÀ HÁN · ", "HAN DYNASTY · "), L("HÁN VŨ ĐẾ", "EMPEROR WU")))]}, {"z": [1.4, 1.45], "f": [.5, .35]}])
    return s
def act5(g, end):
    s = []
    s += scene('clip_A16.mp4', 0, g('s17') - .3, [{"labels": [lab(.2, 3.2, P("", L("NHỮNG ĐIỀU THÚ VỊ", "CURIOUS FACTS")), 'tc', 40), lab(5.0, 10.0, P(L("KHOA CỬ · ", "EXAMS · "), "605 – 1905"))]}], tr='tear')
    if VI:
        s += scene('img/A17.png', g('s17') - .3, g('s18') - .3, [{"labels": [lab(1.0, 5.0, P("VĂN MIẾU · ", "1070"))]},
                  {"z": [1.5, 1.55], "f": [.36, .4], "labels": [lab(1.0, 5.0, P("TIÊN HỌC ", "LỄ"))]},
                  {"z": [1.3, 1.35], "f": [.5, .6], "labels": [lab(1.0, 5.0, P("KHOA THI CUỐI · ", "1919"))]}])
    else:
        s += scene('clip_A13.mp4', g('s17') - .3, g('s18') - .3, [{"z": [1.2, 1.25], "labels": [lab(1.0, 5.0, P("KOREA · ", "JAPAN"))]},
                  {"z": [1.5, 1.55], "f": [.5, .6], "labels": [lab(1.0, 5.0, P("LATIN · ", "1687"))]}, {"z": [1.3, 1.35], "f": [.4, .4], "labels": [lab(1.0, 5.0, P("", "VOLTAIRE"))]}])
    s += scene('img/A18.png', g('s18') - .3, g('s19') - .3, [{"labels": [lab(1.0, 5.0, P(L("HƠN ", "MORE THAN "), L("80 ĐỜI", "80 GENERATIONS")))]}])
    if VI: s += scene('clip_A19.mp4', g('s19') - .3, end, [{"labels": [lab(2.0, 7.0, P(L("KÍNH TRÊN ", ""), L("NHƯỜNG DƯỚI", "")))]}], speed=.55)
    else: s += scene('img/A19w.png', g('s19') - .3, end, [{"labels": [lab(2.0, 7.0, P("RESPECT ", "YOUR ELDERS"))]}, {"z": [1.4, 1.45], "f": [.35, .55]}])
    return s
def ending(g, end):
    s = []
    s += scene('../../../assets/china/images/bg_tai.jpg', 0, g('s21') - .3, [{"ink": {"text": "儒", "x": .36, "y": .3, "size": 230, "t0": 1.0, "reveal": 2.4}, "par": 0}], tr='none')
    s += scene('img/A21.png', g('s21') - .3, g('s22') - .3, [{"labels": [lab(2.0, 7.0, P(L("LÃO TỬ · ", "LAOZI · "), L("NHƯ CON RỒNG", "LIKE A DRAGON")))]}, {"z": [1.4, 1.45], "f": [.7, .45]}])
    s += scene('../../../assets/china/images/bg_tai.jpg', g('s22') - .3, end, [{"ink": {"text": "道", "x": .36, "y": .3, "size": 230, "t0": .6, "reveal": 2.2}, "par": 0,
              "labels": [lab(2.5, 99, P(L("TẬP SAU: ", "NEXT: "), L("LÃO TỬ & ĐẠO GIÁO", "LAOZI & THE TAO")), 'br', 30)]}], tr='fade')
    return s
act('act2', 3.0, act2); act('act3', 3.0, act3); act('act4', 3.0, act4); act('act5', 3.5, act5); act('end', 1.0, ending, tail=5.0)
