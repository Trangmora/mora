"""Tạo clip cử động 3–5 giây từ ảnh giấy cắt bằng fal.ai Wan 2.2 Turbo (720p, khoảng $0,10/clip).
Dùng: python3 fal_clip.py <outdir> <tên>=<ảnh.png>::<mô tả cử động> ...
Mỗi prompt tự thêm câu giữ phong cách (STYLE_GUIDE mục 5). Xuất <outdir>/clip_<tên>.mp4."""
import sys, json, base64, io, subprocess, time, concurrent.futures as cf
from PIL import Image
OUT = sys.argv[1]; jobs = [a.split('=', 1) for a in sys.argv[2:]]
import os
TAIL = os.environ.get("FAL_TAIL", " Gentle, slow, natural motion. Static camera, no zoom. Keep the exact flat paper-cut illustration style, colors, outlines and faces.")
EP = 'https://queue.fal.run/fal-ai/wan/v2.2-a14b/image-to-video/turbo'
def run(job):
    name, spec = job; img, motion = spec.split('::', 1)
    im = Image.open(img).convert('RGB').resize((1280, 853)); b = io.BytesIO(); im.save(b, 'JPEG', quality=90)
    body = {"image_url": 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode(), "prompt": motion + TAIL, "resolution": "720p"}
    bf = f'{OUT}/fal_{name}.json'; json.dump(body, open(bf, 'w'))
    r = json.loads(subprocess.run(['curl', '-s', '-m', '120', '-X', 'POST', EP, '-H', 'Content-Type: application/json', '-d', '@' + bf], capture_output=True, text=True).stdout)
    for _ in range(120):
        st = json.loads(subprocess.run(['curl', '-s', '-m', '30', r['status_url']], capture_output=True, text=True).stdout).get('status')
        if st == 'COMPLETED': break
        time.sleep(5)
    res = json.loads(subprocess.run(['curl', '-s', '-m', '30', r['response_url']], capture_output=True, text=True).stdout)
    url = res.get('video', {}).get('url')
    if not url: return name, str(res)[:200]
    subprocess.run(['curl', '-s', '-m', '120', '-o', f'{OUT}/clip_{name}.mp4', url]); return name, 'ok'
with cf.ThreadPoolExecutor(6) as ex:
    for n, s in ex.map(run, jobs): print(n, s, flush=True)
