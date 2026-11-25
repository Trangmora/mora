"""Buffer gói miễn phí chỉ cho 10 bài hẹn giờ mỗi kênh. Các bài chưa hẹn được nằm trong buffer_pending.json.
Chạy lại file này khi hàng chờ đã vơi: bài nào hẹn được thì xóa khỏi danh sách. Bài đã quá giờ thì đăng lùi 1 giờ kể từ lúc chạy.
Dùng: python3 pipeline/publish/buffer_topup.py"""
import json, subprocess, datetime, os
F = os.path.join(os.path.dirname(__file__), 'buffer_pending.json'); P = json.load(open(F)); left = []
Q = 'mutation($i: CreatePostInput!){ createPost(input:$i){ __typename ... on PostActionSuccess { post { id dueAt } } ... on MutationError { message } } }'
now = datetime.datetime.now(datetime.timezone.utc)
for inp in sorted(P, key=lambda x: x['dueAt']):
    due = datetime.datetime.fromisoformat(inp['dueAt'].replace('Z', '+00:00'))
    if due < now + datetime.timedelta(minutes=10): inp = dict(inp, dueAt=(now + datetime.timedelta(hours=1)).strftime('%Y-%m-%dT%H:%M:%SZ'))
    r = subprocess.run(['curl', '-s', '-m', '120', 'https://api.buffer.com', '-H', 'Content-Type: application/json', '-d', json.dumps({"query": Q, "variables": {"i": inp}})], capture_output=True, text=True)
    try: d = json.loads(r.stdout)['data']['createPost']
    except Exception: d = {'__typename': 'Error', 'message': r.stdout[:100]}
    if d['__typename'] == 'PostActionSuccess': print('đã hẹn', inp['dueAt'], inp['text'][:40])
    else: left.append(inp); print('chưa được', d.get('message', '')[:60], inp['text'][:30])
json.dump(left, open(F, 'w'), ensure_ascii=False, indent=1); print('còn lại', len(left))
