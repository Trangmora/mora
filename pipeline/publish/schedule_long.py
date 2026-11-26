"""Hẹn giờ đăng video dài lên YouTube + Facebook qua Morapost, lấy tiêu đề/mô tả từ description.md.
Dùng: R=<thư mục R2> python3 pipeline/publish/schedule_long.py <tên> <lang> <description.md> <video.mp4 trên R2> <thumb trên R2> <ISO time Z> "<tags,...>"
VI: YouTube Ridiculous Case + Facebook Mora Media. EN: YouTube Asian Myths & Culture + Facebook Ridiculous Case."""
import sys, os, json, uuid, re
sys.path.insert(0, 'pipeline/publish'); import morapost as m
name, lang, desc_f, vid, thumb, at, tags = sys.argv[1:8]
B = 'https://pub-83e6dd21147a481ea2711e70c8c106c5.r2.dev/' + os.environ['R'] + '/'
txt = open(desc_f, encoding='utf-8').read()
sec = txt.split('## ' + lang.upper() + ' (')[1].split('\n## ')[0]
title = re.search(r'\*\*(?:Tiêu đề|Title):\*\* (.+)', sec).group(1).strip()
desc = sec.split('**Mô tả:**' if lang == 'vi' else '**Description:**')[1].strip()
YT, FB = (('UCDHwhQBQk4ndvpwem5hWqCg', '661562267031641') if lang == 'vi' else ('UC5u1YF6TmvZTKCKlEU6K9-w', '1054215381111543'))
LOGF = 'pipeline/publish/scheduled_ids.json'; log = json.load(open(LOGF))
yo = {"title": title[:100], "caption": desc, "privacy": "public", "made_for_kids": False, "category_id": "27",
      "tags": [t for t in tags.split(',') if t], "thumbnail_url": B + thumb}
for k, body in [(f'{name}_yt_{lang}', {"caption": desc, "title": title[:100], "video_url": B + vid, "accounts": {"youtube": [YT]},
                                       "platform_options": {"youtube": yo}, "thumbnail_url": B + thumb, "scheduled_at": at}),
                (f'{name}_fb_{lang}', {"caption": title + '\n\n' + desc, "title": title, "video_url": B + vid, "accounts": {"facebook": [FB]}, "scheduled_at": at})]:
    r = m.call("POST", "/posts", body, idem=str(uuid.uuid4())); p = r.get('post', {})
    log[k] = p.get('id'); print(k, r.get('ok'), p.get('scheduled_at'), r.get('error') or r.get('message') or '', [l.get('warning') for l in p.get('links', []) if l.get('warning')])
json.dump(log, open(LOGF, 'w'), indent=1)
