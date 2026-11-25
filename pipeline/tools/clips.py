"""Clip cử động bằng fal.ai Wan 2.2 Turbo (720p, khoảng $0,10 một clip). Giữ nguyên bộ lọc nội dung mặc định của fal.ai.
Dùng: python3 clips.py <thư_mục_tập>   (đọc <thư_mục_tập>/clips/clips.json: {khóa: mô_tả_cử_động}; hình ở <thư_mục_tập>/img/<khóa>.png)"""
import json, base64, subprocess, time, os, sys, concurrent.futures as cf
import cv2
D = sys.argv[1]; J = json.load(open(f'{D}/clips/clips.json'))
KEEP = " Static camera, no zoom, no camera movement. Keep the exact flat paper-cut illustration style, colors, outlines and faces."
def run(cmd): return subprocess.run(cmd, capture_output=True, text=True).stdout
def one(k):
    out = f"{D}/clips/clip_{k}.mp4"
    if os.path.exists(out): return k, "skip"
    im = cv2.resize(cv2.imread(f"{D}/img/{k}.png"), (1280, 853)); jp = f"{D}/clips/{k}.jpg"; cv2.imwrite(jp, im, [cv2.IMWRITE_JPEG_QUALITY, 90])
    uri = "data:image/jpeg;base64," + base64.b64encode(open(jp, "rb").read()).decode()
    bj = f"{D}/clips/fal_{k}.json"; json.dump({"prompt": "Flat paper-cut animation. " + J[k] + KEEP, "image_url": uri, "resolution": "720p"}, open(bj, "w"))
    r = json.loads(run(["curl", "-s", "-m", "120", "-X", "POST", "https://queue.fal.run/fal-ai/wan/v2.2-a14b/image-to-video/turbo", "-H", "Content-Type: application/json", "-d", "@" + bj]) or "{}")
    if "status_url" not in r: return k, str(r)[:160]
    for _ in range(120):
        s = json.loads(run(["curl", "-s", "-m", "30", r["status_url"]]) or "{}")
        if s.get("status") == "COMPLETED": break
        time.sleep(5)
    d = json.loads(run(["curl", "-s", "-m", "60", r["response_url"]]) or "{}")
    if "video" not in d: return k, str(d)[:160]
    subprocess.run(["curl", "-s", "-L", "-m", "120", "-o", out, d["video"]["url"]]); return k, "ok"
with cf.ThreadPoolExecutor(6) as ex:
    for res in ex.map(one, J): print(res, flush=True)
