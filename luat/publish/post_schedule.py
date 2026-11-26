"""Hẹn giờ đăng các video kênh luật lên YouTube qua Morapost. CHẠY TRONG MÔI TRƯỜNG "Kênh luật – Morapost" (key Morapost riêng của kênh luật).
Dùng:
  python3 post_schedule.py accounts                 # liệt kê kênh mà key nhìn thấy, để lấy mã kênh luật (UC...)
  python3 post_schedule.py run --account UCxxxx     # hẹn giờ mọi video chưa có post_id; bỏ qua video có giờ đăng đã qua
  python3 post_schedule.py run --account UCxxxx --shift-from 2026-11-29   # dời cả lịch để video đầu rơi vào ngày này (giữ nhịp 2 ngày)
  python3 post_schedule.py next-slot                # ngày trống sớm nhất (từ ngày mai) để xếp video mới, giờ 19:00
Ghi post_id vào schedule.json để không đăng lặp.
QUY TẮC (chủ kênh chốt 27/11/2026): TỐI ĐA MỘT VIDEO MỘT NGÀY. Video mới không "đăng luôn" mà xếp vào ngày trống
(lệnh next-slot). Script từ chối đăng nếu ngày đó đã có video khác, hoặc nếu cùng văn bản đã có trong lịch
(thêm --allow-same-law khi cố ý làm tập thứ hai về cùng văn bản, ví dụ hai tập khác ý của cùng một luật).
Trước khi chạy: git pull nhánh claude/law-channel; giữ chỗ trong schedule.json rồi commit + push NGAY, sau đó mới đăng."""
import json, sys, subprocess, datetime, os
H = os.path.dirname(os.path.abspath(__file__)); MP = os.path.join(H, '../../pipeline/publish/morapost.py'); S = os.path.join(H, 'schedule.json')
a = sys.argv[1:]
if not a or a[0] == 'accounts': subprocess.run([sys.executable, MP, 'accounts']); sys.exit()
VN = datetime.timezone(datetime.timedelta(hours=7))
def vn_date(p): return datetime.datetime.fromisoformat(p['at']).astimezone(VN).date()
def law_key(p): return p['file'].split('_')[0]  # số hiệu/tên văn bản ở đầu mã tập: ND168, TT108, BLHS2026, LuatNhaO2026
if a[0] == 'next-slot':
    used = {vn_date(p) for p in json.load(open(S))}; d = datetime.datetime.now(VN).date() + datetime.timedelta(days=1)
    while d in used: d += datetime.timedelta(days=1)
    print(f'{d}  ->  "date": "{d}", "at": "{d}T19:00:00+07:00"'); sys.exit()
LAW_CHANNEL = 'UCsgNKzFknzaH0lqNz-ivNfQ'  # YouTube "Hiểu Luật 2 Phút": kênh luật CHỈ đăng lên kênh này (chủ kênh dặn 26/11/2026)
acc = a[a.index('--account') + 1]; plan = json.load(open(S))
if acc != LAW_CHANNEL: sys.exit(f'Từ chối: kênh luật chỉ đăng lên Hiểu Luật 2 Phút ({LAW_CHANNEL}), không đăng lên {acc}.')
if '--shift-from' in a:
    d0 = datetime.date.fromisoformat(a[a.index('--shift-from') + 1]); pend = [p for p in plan if not p['post_id']]
    for i, p in enumerate(pend): p['date'] = str(d0 + datetime.timedelta(days=2 * i)); p['at'] = f"{p['date']}T19:00:00+07:00"
now = datetime.datetime.now(datetime.timezone.utc)
for p in plan:
    if p['post_id']: continue
    if datetime.datetime.fromisoformat(p['at']) < now + datetime.timedelta(minutes=30): print('BỎ QUA (giờ đã qua):', p['file']); continue
    same_day = [q['file'] for q in plan if q is not p and vn_date(q) == vn_date(p)]
    if same_day: sys.exit(f'Từ chối: ngày {vn_date(p)} đã có video {same_day} (tối đa một video một ngày). Chạy "next-slot" để lấy ngày trống.')
    same_law = [q['file'] for q in plan if q is not p and law_key(q) == law_key(p)]
    if same_law and '--allow-same-law' not in a: sys.exit(f'Từ chối: {p["file"]} trùng văn bản với {same_law} đã có trong lịch. Kiểm tra trùng đề tài; nếu cố ý làm tập khác ý thì thêm --allow-same-law.')
    out = subprocess.run([sys.executable, MP, 'post', '--video-url', p['video_url'], '--account', acc, '--title', p['title'],
                          '--desc-file', os.path.join(H, f"desc_{p['file']}.txt"), '--tags', p['tags'], '--privacy', 'public', '--at', p['at']],
                         capture_output=True, text=True).stdout
    try: r = json.loads(out)
    except Exception: r = {'raw': out}
    pid = r.get('id') or r.get('post_id') or (r.get('post') or {}).get('id')
    print(p['date'], p['file'], '->', pid or out[:300]); p['post_id'] = pid
    json.dump(plan, open(S, 'w'), ensure_ascii=False, indent=1)
    if not pid: sys.exit('Dừng: đăng lỗi, xem phản hồi ở trên.')
