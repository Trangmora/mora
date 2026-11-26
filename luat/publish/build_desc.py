"""Thêm mục "Thông tin tham khảo" (tên báo, tiêu đề bài, đường link) vào mô tả YouTube, lấy từ <tập>/sources.md.
Dùng: python3 build_desc.py   (sửa tại chỗ mọi desc_*.txt có trong schedule.json; chạy lại không bị lặp)"""
import json, re, os
H = os.path.dirname(os.path.abspath(__file__)); EP = os.path.join(H, '../episodes')
GOOD = ['chinhphu.vn', 'baochinhphu.vn', 'congbao', 'nhandan.vn', 'vietnamplus.vn', 'bocongan.gov.vn', 'mps.gov.vn', 'quochoi.vn', 'daibieunhandan.vn',
        'vtv.vn', 'vov.vn', 'vnexpress.net', 'tuoitre.vn', 'thanhnien.vn', 'dantri.com.vn', 'tienphong.vn', 'znews.vn', 'vneconomy.vn', 'thuvienphapluat.vn', 'luatvietnam.vn', 'lsvn.vn', 'voh.com.vn']
def refs(ep, n=8):
    src = open(os.path.join(EP, ep, 'sources.md'), encoding='utf-8').read().split('## Ảnh')[0]
    out, seen = [], set()
    for line in src.splitlines():
        if re.search(r'dự thảo|DỰ THẢO|đăng lại|qua Báo Mới|eva\.vn|unsplash', line): continue
        m = re.search(r'(https?://[^\s)>\]]+)', line)
        if not m: continue
        url = m.group(1).rstrip('.,;'); host = re.sub(r'^https?://(www\.)?', '', url).split('/')[0]
        if not any(g in host for g in GOOD) or host in seen and len(out) >= 4: continue
        t = re.search(r'["“](.+?)["”]', line); name = re.sub(r'^\s*([-*]|\d+\.)\s*', '', line.split(',')[0]).strip(' *')
        label = f'{name}: {t.group(1)}' if t else name
        lab = label if len(label) <= 140 else label[:140].rsplit(' ', 1)[0] + '…'
        out.append(f'• {lab}\n  {url}'); seen.add(host)
        if len(out) >= n: break
    return out
for p in json.load(open(os.path.join(H, 'schedule.json'))):
    f = os.path.join(H, f"desc_{p['file']}.txt"); d = open(f, encoding='utf-8').read()
    d = re.sub(r'\nNguồn: [^\n]*\n', '\n', d)
    d = re.sub(r'\n📚 THÔNG TIN THAM KHẢO.*?(?=\n⚠️)', '\n', d, flags=re.S)
    ep = p['file'][:-3]; r = refs(ep)
    sec = '\n📚 THÔNG TIN THAM KHẢO, NGUỒN\n' + '\n'.join(r) + '\n'
    d = d.replace('\n⚠️', sec + '\n⚠️', 1); d = re.sub(r'\n{3,}', '\n\n', d); open(f, 'w', encoding='utf-8').write(d)
    print(p['file'], len(r), 'nguồn,', len(d), 'ký tự')
