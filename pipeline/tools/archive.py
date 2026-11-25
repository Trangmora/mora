"""Lưu ảnh và clip của một tập vào kho tài nguyên dùng lại.
Dùng: archive.py <thư_mục_tập> <thư_mục_kho (assets/<nước>)> <tiền_tố> <tên_tập>
Ảnh: img/<k>.png -> images/<tiền_tố>_<k>.jpg ; clip: clips/clip_<k>.mp4 -> clips/<tiền_tố>_<k>.mp4 ; mô tả ghi vào index.json"""
import sys, os, re, json, glob, shutil
import cv2

D, A, PRE, EP = sys.argv[1:5]
os.makedirs(A + '/images', exist_ok=True); os.makedirs(A + '/clips', exist_ok=True)
ix = json.load(open(A + '/index.json')) if os.path.exists(A + '/index.json') else {}
pj = json.load(open(D + '/img/prompts.json')) if os.path.exists(D + '/img/prompts.json') else {'scenes': {}}
cj = json.load(open(D + '/clips/clips.json')) if os.path.exists(D + '/clips/clips.json') else {}
n = 0
for f in sorted(glob.glob(D + '/img/*.png')):
    k = os.path.basename(f)[:-4]
    if not re.fullmatch(r'[a-z]+[0-9]+', k) or k not in pj['scenes']: continue
    im = cv2.imread(f); cv2.imwrite(f'{A}/images/{PRE}_{k}.jpg', im, [cv2.IMWRITE_JPEG_QUALITY, 90])
    ix[f'{PRE}_{k}'] = {'file': f'images/{PRE}_{k}.jpg', 'desc': pj['scenes'][k][:220], 'episode': EP, 'model': 'nano-banana'}; n += 1
m = 0
for f in sorted(glob.glob(D + '/clips/clip_*.mp4')):
    k = os.path.basename(f)[5:-4]
    if not re.fullmatch(r'[a-z]+[0-9]+', k): continue
    shutil.copy(f, f'{A}/clips/{PRE}_{k}.mp4')
    ix[f'{PRE}_{k}_clip'] = {'file': f'clips/{PRE}_{k}.mp4', 'desc': 'fal.ai Wan 2.2 clip (5 s, no audio) of ' + f'{PRE}_{k}' + (': ' + cj[k][:160] if k in cj else ''), 'episode': EP}; m += 1
json.dump(ix, open(A + '/index.json', 'w'), ensure_ascii=False, indent=1)
print(EP, 'images', n, 'clips', m)
