"""Chuẩn bị một tập trước khi dựng.
Dùng: python3 prep.py <thư_mục_tập> <tempo> [khóa=đoạn:cụm_từ ...]
- Thêm mốc 'endS' (lúc bắt đầu đoạn 'end') và các mốc cụm từ vào vo/T_vi.json.
- Tạo vo/vo_vi_f.wav (giọng đọc đã chỉnh tốc độ).
- Tạo các trang cảnh r/pf_<khóa>.html từ img/*.png và tách khung hình clip vào r/cf_<khóa>/."""
import json, sys, os, re, glob, base64, subprocess
import cv2
D = sys.argv[1]; TEMPO = sys.argv[2]; P = os.path.dirname(os.path.abspath(__file__)) + '/..'
d = json.load(open(f'{D}/vo/T_vi.json')); T = d['T']; C = d['chars']
def at(seg, ph):
    s = ''.join(c for c, _ in C[seg]); i = s.find(ph); assert i >= 0, (seg, ph); return C[seg][i][1]
T['endS'] = C['end'][0][1]; T['endS_end'] = T['end_end']
for a in sys.argv[3:]:
    k, v = a.split('=', 1); seg, ph = v.split(':', 1); T[k] = at(seg, ph)
json.dump(d, open(f'{D}/vo/T_vi.json', 'w'), ensure_ascii=False)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{D}/vo/vo_vi.wav', '-af', f'atempo={TEMPO}', f'{D}/vo/vo_vi_f.wav'], check=True)
R = f'{D}/r'; os.makedirs(R + '/fonts', exist_ok=True)
for f in glob.glob(f'{P}/leloi/r/fonts/*'): subprocess.run(['cp', f, R + '/fonts/'])
for f in ['fonts.css', 'comp5.html']: subprocess.run(['cp', f'{P}/leloi/r/{f}', R + '/'])
subprocess.run(['cp', f'{P}/tools/build.cjs', R + '/'])
tpl = open(f'{P}/shinto/paper/paper_tpl4.html').read().replace('href="../fonts.css"', 'href="fonts.css"')
tpl = re.sub(r"@font-face\{font-family:NSJP113;src:url\([^)]*\);font-weight:700\}", "", tpl)
for f in sorted(glob.glob(f'{D}/img/*.png')):
    k = os.path.basename(f)[:-4]
    if not re.fullmatch(r'[a-z]+\d+', k): continue
    ok, b = cv2.imencode('.jpg', cv2.imread(f), [cv2.IMWRITE_JPEG_QUALITY, 88]); u = 'data:image/jpeg;base64,' + base64.b64encode(b.tobytes()).decode()
    open(f'{R}/pf_{k}.html', 'w').write(tpl.replace('__A__', u).replace('__B__', u).replace('__S__', u))
for f in sorted(glob.glob(f'{D}/clips/clip_*.mp4')):
    k = os.path.basename(f)[5:-4]
    if not re.fullmatch(r'[a-z]+\d+', k): continue
    os.makedirs(f'{R}/cf_{k}', exist_ok=True)
    if len(os.listdir(f'{R}/cf_{k}')) < 10:
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f, '-vf', 'fps=24,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720', '-q:v', '3', f'{R}/cf_{k}/%04d.jpg'], check=True)
print('T', {k: round(v, 1) for k, v in T.items() if not k.endswith('_end')})
print('clips', sorted(os.path.basename(x)[3:] for x in glob.glob(f'{R}/cf_*')))
