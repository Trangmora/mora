"""Tạo hình bằng Nano Banana (fal.ai), kèm hình mẫu để giữ phong cách giấy cắt của kênh. Khoảng $0,04 một hình.
Dùng: python3 gen_nb.py <thư_mục_img> [khóa ...]   (đọc <thư_mục_img>/prompts.json)
prompts.json: {"ref": đường_dẫn_hình_mẫu, "setting": "...", "scenes": {khóa: mô_tả}, "refs": {khóa: hình_mẫu_riêng}}"""
import json, subprocess, time, base64, sys, os, concurrent.futures as cf
import cv2
D = sys.argv[1]; C = json.load(open(f'{D}/prompts.json'))
def uri(f):
    im = cv2.resize(cv2.imread(f), (768, 512)); ok, b = cv2.imencode('.jpg', im, [cv2.IMWRITE_JPEG_QUALITY, 85])
    return 'data:image/jpeg;base64,' + base64.b64encode(b.tobytes()).decode()
ST = ("Create a NEW scene using ONLY the art style of the reference image: flat paper-cut illustration, bold simple shapes, dark-brown outlines, "
      "soft paper grain, muted earthy palette of terracotta, ochre, cream, sage green, indigo and black, minimal faces. " + C['setting'] +
      " Wide 16:9, no text, no letters, no writing. Scene: ")
def one(k):
    out = f'{D}/{k}.png'
    if os.path.exists(out) and len(sys.argv) < 3: return k, 'skip'
    ref = C.get('refs', {}).get(k, C['ref'])
    bj = f'{D}/b_{k}.json'; json.dump({"prompt": ST + C['scenes'][k], "image_urls": [uri(ref)], "num_images": 1, "aspect_ratio": "3:2"}, open(bj, 'w'))
    for attempt in range(2):
        r = json.loads(subprocess.run(['curl', '-s', '-m', '120', '-X', 'POST', 'https://queue.fal.run/fal-ai/nano-banana/edit', '-H', 'Content-Type: application/json', '-d', '@' + bj], capture_output=True, text=True).stdout or '{}')
        if 'status_url' not in r: res = str(r)[:200]; continue
        for _ in range(100):
            s = json.loads(subprocess.run(['curl', '-s', '-m', '30', r['status_url']], capture_output=True, text=True).stdout or '{}')
            if s.get('status') == 'COMPLETED': break
            time.sleep(3)
        d = json.loads(subprocess.run(['curl', '-s', '-m', '60', r['response_url']], capture_output=True, text=True).stdout or '{}')
        if 'images' in d:
            subprocess.run(['curl', '-s', '-L', '-m', '120', '-o', f'{D}/{k}.raw', d['images'][0]['url']])
            x = cv2.imread(f'{D}/{k}.raw'); cv2.imwrite(out, cv2.resize(x, (1536, 1024), interpolation=cv2.INTER_LANCZOS4)); return k, 'ok'
        res = str(d)[:200]
    return k, res
keys = sys.argv[2:] or list(C['scenes'])
with cf.ThreadPoolExecutor(5) as ex:
    for r in ex.map(one, keys): print(r, flush=True)
# bảng xem nhanh
import numpy as np
ks = [k for k in C['scenes'] if os.path.exists(f'{D}/{k}.png')]; ims = []
for k in ks:
    im = cv2.resize(cv2.imread(f'{D}/{k}.png'), (512, 341)); cv2.putText(im, k, (8, 30), 0, 1, (0, 0, 255), 2); ims.append(im)
while len(ims) % 5: ims.append(np.zeros_like(ims[0]))
cv2.imwrite(f'{D}/../sheet.jpg', np.vstack([np.hstack(ims[i:i + 5]) for i in range(0, len(ims), 5)]), [cv2.IMWRITE_JPEG_QUALITY, 78])
