"""Tạo danh sách cảnh Hồi 1 từ mốc giọng đọc. Dùng: python3 act1_build.py <T.json> <out.json> <fonts_dir>"""
import json, sys
T = json.load(open(sys.argv[1]))['T']; F = sys.argv[3]; o = 1.0
g = lambda k: o + T[k]; end = o + T['end'] + 3.0; mid = lambda a, b, f: a + (b - a) * f
shots = [
 {"img": "img/A1.png", "s": 0, "e": mid(g('s1'), g('s2'), .5), "tr": "none", "labels": [{"t0": 1.2, "t1": 4.6, "parts": [["551 TCN · ", 0], ["NƯỚC LỖ", 1]], "pos": "tl"}]},
 {"img": "img/A1.png", "s": mid(g('s1'), g('s2'), .5), "e": g('s2') - 0.3, "z": [1.45, 1.52], "f": [0.74, 0.48], "tr": "cross", "labels": [{"t0": 0.3, "t1": 3.4, "parts": [["THỜI ", 0], ["XUÂN THU", 1]], "pos": "tl"}]},
 {"img": "img/A2.png", "s": g('s2') - 0.3, "e": g('s3') - 0.3, "tr": "tear"},
 {"img": "img/A3.png", "s": g('s3') - 0.3, "e": g('s4') - 0.3, "tr": "tear", "labels": [{"t0": 0.8, "t1": 4.4, "parts": [["15 TUỔI · ", 0], ["QUYẾT CHÍ HỌC", 1]], "pos": "tr"}]},
 {"img": "img/A4.png", "s": g('s4') - 0.3, "e": mid(g('s4'), g('s4b'), .45), "tr": "tear"},
 {"clip": "clip_A4.mp4", "s": mid(g('s4'), g('s4b'), .45), "e": g('s4b') - 0.2, "tr": "cross", "labels": [{"t0": 1.6, "t1": 4.6, "parts": [["HỌC PHÍ: ", 0], ["BÓ THỊT KHÔ", 1]], "pos": "br"}]},
 {"img": "img/A4.png", "s": g('s4b') - 0.2, "e": g('s4c') - 0.3, "z": [1.6, 1.68], "f": [0.27, 0.28], "tr": "cross", "labels": [{"t0": 0.3, "t1": 2.6, "parts": [["3.000 ", 1], ["HỌC TRÒ", 0]], "pos": "tr"}]},
 {"img": "img/A4c.png", "s": g('s4c') - 0.3, "e": mid(g('s4c'), end, .5), "tr": "tear", "labels": [{"t0": 1.5, "t1": 5.0, "parts": [["NHẠC ", 0], ["THIỀU", 1]], "pos": "tl"}]},
 {"img": "img/A4c.png", "s": mid(g('s4c'), end, .5), "e": end, "z": [1.5, 1.58], "f": [0.62, 0.45], "f1": [0.62, 0.5], "tr": "cross"},
]
json.dump({"fonts": {"cap": F + "/BeVN600.ttf", "seal": F + "/NotoSerifSC700.ttf"}, "seal": "儒", "dur": end, "fade_in": 0.9, "fade_out": 2.0, "shots": shots},
          open(sys.argv[2], 'w'), ensure_ascii=False, indent=1)
print('dur', round(end, 1))
