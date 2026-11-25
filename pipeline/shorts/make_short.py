"""Dựng một video ngắn dọc 9:16 toàn màn hình (720x1280), một câu chuyện trọn vẹn 35–55 giây, dùng lại ảnh và clip trong kho.
- Câu đầu là câu móc, không có lời chào. Phụ đề to chạy theo lời đọc. Nhãn câu móc ở trên 3 giây đầu.
- Mỗi câu một cảnh (clip quay chậm hoặc ảnh có lia ngang); câu dài hơn 6 giây chia 2 khung.
Dùng: python3 pipeline/shorts/make_short.py <specs.json> <id> <lang> <fonts_dir> <outdir>"""
import json, sys, subprocess, os, re
SPEC, SID, LANG, F, OUT = sys.argv[1:6]
sp = [x for x in json.load(open(SPEC)) if x['id'] == SID][0]
os.makedirs(OUT, exist_ok=True); W = f'{OUT}/{SID}_{LANG}'
sents = sp[LANG]; segs = [[f's{i}', t] for i, t in enumerate(sents)]
json.dump({LANG: segs}, open(W + '_txt.json', 'w'), ensure_ascii=False)
if not (os.path.exists(W + '_vo.json') and os.path.exists(W + '_vo.wav')):      # đã thu giọng rồi thì dùng lại, không tốn thêm credit
    subprocess.run(['python3', 'pipeline/full/tts_flow.py', W + '_txt.json', LANG, W + '_vo'], check=True, stdout=subprocess.DEVNULL)
J = json.load(open(W + '_vo.json')); T, CH = J['T'], J['chars']
LEAD, TAIL = 0.25, 1.2; DUR = LEAD + T['end'] + TAIL
shots = []
for i, (sid, _) in enumerate(segs):
    s = 0 if i == 0 else LEAD + T[sid] - .15; e = DUR if i == len(segs) - 1 else LEAD + T[segs[i + 1][0]] - .15
    src = sp['shots'][min(i, len(sp['shots']) - 1)]; src = src if isinstance(src, dict) else {'src': src}
    n = 2 if e - s > 6.5 else 1
    for j in range(n):
        a = s + (e - s) * j / n; b = s + (e - s) * (j + 1) / n
        sh = {"s": a, "e": b, "tr": "none" if i == 0 and j == 0 else "cross"}
        if src['src'].endswith('.mp4'): sh.update({"clip": src['src'], "speed": .6, "clip_t0": (a - s) * .6})
        else: sh.update({"img": src['src'], "par": 0})
        if 'f' in src and j == 0: sh.update({"f": [src['f'][0], src['f'][1]], "f1": [src['f'][0] + .06, src['f'][1]], "z": [src.get('z', 1.0), src.get('z', 1.0) + .06]})
        if j == 1: sh['z'] = [1.22, 1.3]
        if src.get('fx'): sh['fx'] = src['fx']
        shots.append(sh)
shots[0]['labels'] = [{"t0": .15, "t1": 3.2, "parts": [[sp['hook'][LANG], 1]], "pos": "tc", "size": 38}]
# phụ đề: gom 2–4 từ một cụm theo mốc từng ký tự
words, cur, t0 = [], '', None
for c, t in CH:
    if c == ' ':
        if cur: words.append((cur, t0)); cur = ''; t0 = None
    else:
        if not cur: t0 = t
        cur += c
if cur: words.append((cur, t0))
subs, buf, bt = [], [], None
for k, (w, t) in enumerate(words):
    if not buf: bt = t
    buf.append(w); txt = ' '.join(buf)
    if len(txt) >= 16 or re.search(r'[.,?!:…]$', w) or k == len(words) - 1:
        nt = words[k + 1][1] if k + 1 < len(words) else T['end']
        subs.append([LEAD + bt, LEAD + min(nt, bt + 4.0) if k + 1 < len(words) else LEAD + T['end'] + .4, txt.replace('...', '…')]); buf = []
cfg = {"size": [720, 1280], "fonts": {"cap": F + ("/BeVN800.ttf" if LANG == 'vi' else "/Lora700.ttf"), "seal": F + '/' + sp.get('seal_font', 'NotoSerifSC700.ttf'),
       "brush": F + "/MaShanZheng.ttf", "serif": F + "/NotoSerifSC700.ttf", "sub": F + "/BeVN800.ttf"},
       "seal": sp['seal'], "dur": DUR, "fade_in": .2, "fade_out": .5, "shots": shots, "subs": subs}
json.dump(cfg, open(W + '_shots.json', 'w'), ensure_ascii=False, indent=1)
subprocess.run(['python3', 'pipeline/scenes/paper_scenes.py', W + '_shots.json', W + '_silent.mp4'], check=True, stdout=subprocess.DEVNULL)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', W + '_vo.wav', '-af', f'adelay={int(LEAD * 1000)}', W + '_vo_pad.wav'], check=True)
m = sp['music']; plan = {"dur": DUR, "vo": W + '_vo_pad.wav', "duck": .24, "music": [[m[0], m[1], 0, DUR]], "levels": [[0, .6], [T['end'] + LEAD, .6], [DUR, .9]], "mutes": [],
                         "sfx": [[0.05, 'drum', .5], [LEAD + T[segs[-1][0]] - .2, 'bell', .6]]}
json.dump(plan, open(W + '_mix.json', 'w'))
subprocess.run(['python3', 'pipeline/full/mix_dynamic.py', W + '_mix.json', W + '_silent.mp4', W + '_raw.mp4'], check=True, stdout=subprocess.DEVNULL)
final = f'{OUT}/{SID}_{LANG}.mp4'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', W + '_raw.mp4', '-c:v', 'libx264', '-preset', 'medium', '-crf', '21', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', final], check=True)
for x in ['_silent.mp4', '_raw.mp4', '_raw.mp4.wav', '_vo_pad.wav', '_vo_req.json', '_txt.json', '_mix.json']:
    try: os.remove(W + x)
    except OSError: pass
print('ok', final, round(DUR, 1), 's')
