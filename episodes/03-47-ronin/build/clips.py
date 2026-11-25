"""Clip cử động bằng fal.ai Wan 2.2 Turbo (720p, khoảng $0,10 một clip). Giữ nguyên bộ lọc nội dung mặc định của fal.ai."""
import json, base64, subprocess, time, os, concurrent.futures as cf
import cv2

KEEP = " Static camera, no zoom, no camera movement. Keep the exact flat paper-cut illustration style, colors, outlines and faces."
J = {
    "n6": "The candle flames flicker, the kneeling men slowly bow their heads and press their seals on the scroll, shadows move on the walls.",
    "n7": "The red lanterns sway, the man lying on the ground rolls slightly and lifts the bottle, the townsman shakes his head and walks on, people in the teahouse laugh and point.",
    "n9": "The actors on stage slowly move their arms and turn in a dramatic pose, the paper snow falls on the stage, the audience heads move slightly.",
    "n5": "The men walk slowly forward carrying their bundles, the waves roll, cherry petals drift in the wind.",
}


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True).stdout


def one(k):
    if os.path.exists(f"clip_{k}.mp4"):
        return k, "skip"
    im = cv2.resize(cv2.imread(f"../img/{k}.png"), (1280, 853))
    cv2.imwrite(f"{k}.jpg", im, [cv2.IMWRITE_JPEG_QUALITY, 90])
    uri = "data:image/jpeg;base64," + base64.b64encode(open(f"{k}.jpg", "rb").read()).decode()
    json.dump({"prompt": "Flat paper-cut animation. " + J[k] + KEEP, "image_url": uri, "resolution": "720p"}, open(f"fal_{k}.json", "w"))
    r = json.loads(run(["curl", "-s", "-m", "120", "-X", "POST", "https://queue.fal.run/fal-ai/wan/v2.2-a14b/image-to-video/turbo",
                        "-H", "Content-Type: application/json", "-d", f"@fal_{k}.json"]) or "{}")
    if "status_url" not in r:
        return k, str(r)[:300]
    for _ in range(120):
        s = json.loads(run(["curl", "-s", "-m", "30", r["status_url"]]) or "{}")
        if s.get("status") == "COMPLETED":
            break
        time.sleep(5)
    d = json.loads(run(["curl", "-s", "-m", "60", r["response_url"]]) or "{}")
    if "video" not in d:
        return k, str(d)[:300]
    subprocess.run(["curl", "-s", "-L", "-m", "120", "-o", f"clip_{k}.mp4", d["video"]["url"]])
    return k, "ok"


with cf.ThreadPoolExecutor(4) as ex:
    for res in ex.map(one, J):
        print(res, flush=True)
