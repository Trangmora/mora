"""Tạo danh sách cảnh Hồi 1 từ mốc giọng đọc. Mỗi cảnh dùng clip fal.ai quay chậm (STYLE_GUIDE 5).
Dùng: python3 act1_build.py <T.json> <out.json> <fonts_dir>"""
import json, sys
T = json.load(open(sys.argv[1]))['T']; F = sys.argv[3]; o = 1.0
LANG = sys.argv[4] if len(sys.argv) > 4 else 'vi'; L = lambda vi, en: vi if LANG == 'vi' else en
g = lambda k: o + T[k]; end = o + T['end'] + 3.0; mid = lambda a, b, f: a + (b - a) * f
def scene(clip, s, e, frames, tr='tear', speed=0.6):
    """chia cảnh thành nhiều khung (toàn cảnh rồi cận), clip chạy liền mạch qua các khung"""
    out, n = [], len(frames)
    for j, fr in enumerate(frames):
        a = s + (e - s) * j / n; b = s + (e - s) * (j + 1) / n
        sh = {"clip": clip, "s": a, "e": b, "speed": speed, "clip_t0": (a - s) * speed, "tr": tr if j == 0 else "cross"}
        sh.update(fr); out.append(sh)
    return out
shots = []
shots += scene("clip_A1.mp4", 0, g('s2') - 0.3, [
    {"labels": [{"t0": 1.2, "t1": 4.4, "parts": [[L("551 TCN · ", "551 BC · "), 0], [L("NƯỚC LỖ", "STATE OF LU"), 1]], "pos": "tl"}]},
    {"z": [1.45, 1.5], "f": [0.74, 0.5], "labels": [{"t0": 0.3, "t1": 3.4, "parts": [[L("THỜI ", ""), 0], [L("XUÂN THU", "AN AGE OF WAR"), 1]], "pos": "tl"}]}], tr="none")
shots += scene("clip_A2.mp4", g('s2') - 0.3, g('s3') - 0.3, [{}])
shots += scene("clip_A3.mp4", g('s3') - 0.3, g('s3_end') + 0.4, [{"labels": [{"t0": 0.8, "t1": 4.4, "parts": [[L("15 TUỔI · ", "AGE 15 · "), 0], [L("QUYẾT CHÍ HỌC", "SET ON LEARNING"), 1]], "pos": "tr"}]}])
shots += scene("clip_A4.mp4", g('s3_end') + 0.4, g('s4c') - 0.3, [
    {"labels": [{"t0": 4.5, "t1": 8.2, "parts": [[L("HỌC PHÍ: ", "FEE: "), 0], [L("BÓ THỊT KHÔ", "DRIED MEAT"), 1]], "pos": "br"}]},
    {"z": [1.6, 1.66], "f": [0.27, 0.3], "labels": [{"t0": 2.4, "t1": 5.0, "parts": [[L("3.000 ", "3,000 "), 1], [L("HỌC TRÒ", "STUDENTS"), 0]], "pos": "tr"}]}], speed=0.5)
shots += scene("clip_A4c.mp4", g('s4c') - 0.3, end, [
    {"labels": [{"t0": 1.5, "t1": 5.0, "parts": [[L("NHẠC ", "SHAO "), 0], [L("THIỀU", "MUSIC"), 1]], "pos": "tl"}]},
    {"z": [1.5, 1.56], "f": [0.62, 0.45], "f1": [0.62, 0.5]}], speed=0.5)
json.dump({"fonts": {"cap": F + ("/BeVN600.ttf" if LANG == "vi" else "/Lora600.ttf"), "seal": F + "/NotoSerifSC700.ttf"}, "seal": "儒", "dur": end, "fade_in": 0.9, "fade_out": 2.0, "shots": shots},
          open(sys.argv[2], 'w'), ensure_ascii=False, indent=1)
print('dur', round(end, 1), [(round(x['s'], 1), round(x['e'] - x['s'], 1)) for x in shots])
