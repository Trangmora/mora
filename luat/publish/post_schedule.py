"""Hẹn giờ đăng các video kênh luật lên YouTube qua Morapost. CHẠY TRONG MÔI TRƯỜNG "Kênh luật – Morapost" (key Morapost riêng của kênh luật).
Dùng:
  python3 post_schedule.py accounts                 # liệt kê kênh mà key nhìn thấy, để lấy mã kênh luật (UC...)
  python3 post_schedule.py run --account UCxxxx     # hẹn giờ mọi video chưa có post_id; bỏ qua video có giờ đăng đã qua
  python3 post_schedule.py run --account UCxxxx --shift-from 2026-11-29   # dời cả lịch để video đầu rơi vào ngày này (giữ nhịp 2 ngày)
Ghi post_id vào schedule.json để không đăng lặp."""
import json, sys, subprocess, datetime, os
H = os.path.dirname(os.path.abspath(__file__)); MP = os.path.join(H, '../../pipeline/publish/morapost.py'); S = os.path.join(H, 'schedule.json')
a = sys.argv[1:]
if not a or a[0] == 'accounts': subprocess.run([sys.executable, MP, 'accounts']); sys.exit()
acc = a[a.index('--account') + 1]; plan = json.load(open(S))
if '--shift-from' in a:
    d0 = datetime.date.fromisoformat(a[a.index('--shift-from') + 1]); pend = [p for p in plan if not p['post_id']]
    for i, p in enumerate(pend): p['date'] = str(d0 + datetime.timedelta(days=2 * i)); p['at'] = f"{p['date']}T19:00:00+07:00"
now = datetime.datetime.now(datetime.timezone.utc)
for p in plan:
    if p['post_id']: continue
    if datetime.datetime.fromisoformat(p['at']) < now + datetime.timedelta(minutes=30): print('BỎ QUA (giờ đã qua):', p['file']); continue
    out = subprocess.run([sys.executable, MP, 'post', '--video-url', p['video_url'], '--account', acc, '--title', p['title'],
                          '--desc-file', os.path.join(H, f"desc_{p['file']}.txt"), '--tags', p['tags'], '--privacy', 'public', '--at', p['at']],
                         capture_output=True, text=True).stdout
    try: r = json.loads(out)
    except Exception: r = {'raw': out}
    pid = r.get('id') or r.get('post_id') or (r.get('post') or {}).get('id')
    print(p['date'], p['file'], '->', pid or out[:300]); p['post_id'] = pid
    json.dump(plan, open(S, 'w'), ensure_ascii=False, indent=1)
    if not pid: sys.exit('Dừng: đăng lỗi, xem phản hồi ở trên.')
