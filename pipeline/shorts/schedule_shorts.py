"""Hẹn giờ đăng video ngắn: mỗi ngày một video trên mỗi kênh.
- Tiếng Việt (11:30 giờ VN): YouTube Shorts Ridiculous Case, Facebook Mora Media (Morapost).
- Tiếng Anh (08:00 giờ VN, tức 20:00 giờ New York hôm trước): YouTube Shorts Asian Myths & Culture, Instagram, Threads (Morapost); TikTok, X (Buffer).
Dùng: R=<thư mục trên R2> python3 pipeline/shorts/schedule_shorts.py <ngày đầu YYYY-MM-DD> <id1> <id2> ...
Tiêu đề và hashtag lấy từ shorts/specs.json (hook, câu đầu tiên) và shorts/tags.json."""
import sys, os, json, uuid, subprocess, datetime
sys.path.insert(0, 'pipeline/publish'); import morapost as m
B = 'https://pub-83e6dd21147a481ea2711e70c8c106c5.r2.dev/' + os.environ['R']
SP = {x['id']: x for x in json.load(open('shorts/specs.json'))}; TAGS = json.load(open('shorts/tags.json'))
LOGF = 'pipeline/publish/scheduled_shorts.json'; log = json.load(open(LOGF)) if os.path.exists(LOGF) else {}
day0 = datetime.date.fromisoformat(sys.argv[1]); ids = sys.argv[2:]
TT = '6b06ec178541f09ecb9d82f6'; X = '6b06ec308541f09ecb9d8490'
Q = 'mutation($i: CreatePostInput!){ createPost(input:$i){ __typename ... on PostActionSuccess { post { id dueAt } } ... on MutationError { message } } }'
def mp(name, body):
    r = m.call("POST", "/posts", body, idem=str(uuid.uuid4())); p = r.get('post', {}); log[name] = p.get('id')
    print(name, r.get('ok'), p.get('scheduled_at'), r.get('error') or r.get('message') or '')
for n, sid in enumerate(ids):
    sp = SP[sid]; d = day0 + datetime.timedelta(days=n); tg = TAGS[sid[0]]
    for lang in ['vi', 'en']:
        url = f'{B}/sh_{sid}_{lang}.mp4'; hook = sp[lang][0]; credit = ('\n' + sp['credit']) if sp.get('credit') else ''
        title = (sp['title'][lang] if 'title' in sp else hook)[:88] + ' #Shorts'
        cap = hook + ('\n' + ("Theo dõi kênh để xem thêm chuyện văn hóa Á Đông." if lang == 'vi' else "Follow for more stories from Asia.")) + '\n' + tg[lang] + credit
        if lang == 'vi':
            at = f'{d}T04:30:00Z'
            yo = {"title": title, "caption": cap, "privacy": "public", "made_for_kids": False, "category_id": "27"}
            mp(f'{sid}_vi_yt', {"caption": cap, "title": title, "video_url": url, "accounts": {"youtube": ["UCDHwhQBQk4ndvpwem5hWqCg"]}, "platform_options": {"youtube": yo}, "scheduled_at": at})
            mp(f'{sid}_vi_fb', {"caption": cap, "title": title.replace(' #Shorts', ''), "video_url": url, "accounts": {"facebook": ["661562267031641"]}, "scheduled_at": at})
        else:
            at = f'{d}T01:00:00Z'
            yo = {"title": title, "caption": cap, "privacy": "public", "made_for_kids": False, "category_id": "27"}
            mp(f'{sid}_en_yt', {"caption": cap, "title": title, "video_url": url, "accounts": {"youtube": ["UC5u1YF6TmvZTKCKlEU6K9-w"]}, "platform_options": {"youtube": yo}, "scheduled_at": at})
            mp(f'{sid}_en_ig_th', {"caption": cap, "video_url": url, "accounts": {"instagram": ["29748236828134140"], "threads": ["41529474649984500"]}, "scheduled_at": at})
            for nm, ch, meta in [('tt', TT, {"tiktok": {"title": sp['hook']['en'].title(), "isAiGenerated": True}}), ('x', X, {"twitter": {"isAiGenerated": True}})]:
                inp = {"channelId": ch, "text": cap[:270], "schedulingType": "automatic", "mode": "customScheduled", "dueAt": at, "assets": [{"video": {"url": url, "metadata": {"thumbnailOffset": 1500}}}], "metadata": meta}
                r = subprocess.run(['curl', '-s', '-m', '120', 'https://api.buffer.com', '-H', 'Content-Type: application/json', '-d', json.dumps({"query": Q, "variables": {"i": inp}})], capture_output=True, text=True)
                dd = json.loads(r.stdout)['data']['createPost']
                if dd['__typename'] == 'PostActionSuccess': log[f'{sid}_en_{nm}'] = dd['post']['id']
                else:   # Buffer gói miễn phí: tối đa 10 bài hẹn giờ mỗi kênh. Bài chưa hẹn được thì cất vào hàng chờ.
                    PF = 'pipeline/publish/buffer_pending.json'; P = json.load(open(PF)) if os.path.exists(PF) else []
                    P.append(inp); json.dump(P, open(PF, 'w'), ensure_ascii=False, indent=1); print(sid, nm, 'vào hàng chờ:', dd.get('message', '')[:60])
json.dump(log, open(LOGF, 'w'), indent=1)
