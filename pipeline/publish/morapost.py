"""Đăng video lên YouTube (và mạng khác) qua Morapost API.

Key Morapost do proxy của môi trường tự gắn vào header (Network secrets,
host www.morapost.com). Không ghi key vào code.

Cách dùng:
  python3 morapost.py accounts
  python3 morapost.py post --video-url https://.../video.mp4 --account UCxxxx \
      --title "..." --desc-file desc.txt --tags shinto,japan --privacy private \
      [--thumb-url https://.../thumb.jpg] [--at 2026-11-30T19:00:00+07:00]
  python3 morapost.py status <post_id>
  python3 morapost.py metrics <post_id>

Lưu ý: Morapost chỉ nhận video qua URL công khai (MP4/MOV, tối đa 200 MB).
"""
import argparse, json, subprocess, sys, uuid
BASE = "https://www.morapost.com/api/v1"
# CHỈ đăng vào các kênh văn hóa. Key Morapost dùng chung với kênh luật, nên mọi bài gửi đi đều bị kiểm tra ở đây.
# TUYỆT ĐỐI KHÔNG dùng YouTube "Hiểu Luật 2 Phút" (UCsgNKzFknzaH0lqNz-ivNfQ): kênh đó chỉ của phiên kênh luật.
ALLOWED = {"UCDHwhQBQk4ndvpwem5hWqCg",   # YouTube Ridiculous Case (VI)
           "UC5u1YF6TmvZTKCKlEU6K9-w",   # YouTube Asian Myths & Culture (EN)
           "1054215381111543",           # Facebook Ridiculous Case (EN)
           "661562267031641",            # Facebook Mora Media (VI)
           "29748236828134140",          # Instagram asian_myths (EN)
           "41529474649984500"}          # Threads call me You (EN)
def check_accounts(body):
    acc = (body or {}).get("accounts") or {}
    bad = [a for ids in acc.values() for a in ids if a not in ALLOWED]
    if bad: raise SystemExit(f"CHẶN: tài khoản không thuộc kênh văn hóa: {bad}")

def call(method, path, body=None, idem=None):
    if method in ("POST", "PATCH"): check_accounts(body)
    cmd = ["curl", "-s", "-m", "120", "-X", method, BASE + path, "-H", "Content-Type: application/json"]
    if idem: cmd += ["-H", f"Idempotency-Key: {idem}"]
    if body is not None: cmd += ["--data-binary", json.dumps(body, ensure_ascii=False)]
    out = subprocess.run(cmd, capture_output=True, text=True).stdout
    try: return json.loads(out)
    except Exception: return {"raw": out}

def main():
    ap = argparse.ArgumentParser(); sp = ap.add_subparsers(dest="cmd", required=True)
    sp.add_parser("accounts")
    p = sp.add_parser("post")
    p.add_argument("--video-url", required=True); p.add_argument("--account", required=True, help="YouTube channel id (UC...)")
    p.add_argument("--title", required=True); p.add_argument("--desc-file", required=True)
    p.add_argument("--tags", default=""); p.add_argument("--privacy", default="private", choices=["public", "unlisted", "private"])
    p.add_argument("--thumb-url"); p.add_argument("--at", help="ISO time with timezone; omit = publish now")
    p.add_argument("--category", default="27")  # 27 = Education
    for c in ("status", "metrics"):
        q = sp.add_parser(c); q.add_argument("id")
    a = ap.parse_args()
    if a.cmd == "accounts":
        r = call("GET", "/accounts")
        for x in r.get("accounts", []): print(x["platform"], x["account_id"], x["name"], x["status"])
        return
    if a.cmd == "status": print(json.dumps(call("GET", f"/posts/{a.id}"), indent=1, ensure_ascii=False)); return
    if a.cmd == "metrics": print(json.dumps(call("GET", f"/posts/{a.id}/metrics"), indent=1, ensure_ascii=False)); return
    desc = open(a.desc_file, encoding="utf-8").read()
    yt = {"title": a.title[:100], "caption": desc, "privacy": a.privacy, "made_for_kids": False, "category_id": a.category}
    if a.tags: yt["tags"] = [t.strip() for t in a.tags.split(",") if t.strip()]
    if a.thumb_url: yt["thumbnail_url"] = a.thumb_url
    body = {"caption": desc, "title": a.title[:100], "video_url": a.video_url,
            "accounts": {"youtube": [a.account]}, "platform_options": {"youtube": yt}}
    if a.thumb_url: body["thumbnail_url"] = a.thumb_url
    if a.at: body["scheduled_at"] = a.at
    r = call("POST", "/posts", body, idem=str(uuid.uuid4()))
    print(json.dumps(r, indent=1, ensure_ascii=False))

if __name__ == "__main__": main()
