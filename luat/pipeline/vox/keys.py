"""Lấy mốc thời gian từ giọng đọc cho một tập. Dùng: python3 keys.py <thư_mục_tập>
Đọc <tập>/work/vo/T_vi.json, <tập>/keys.json ({"tên_mốc": ["đoạn", "cụm từ"]}) và <tập>/subs.json ({"đoạn": [["cụm từ bắt đầu", "chữ phụ đề"], ...]}).
Ghi <tập>/work/K.json gồm K (mốc từng đoạn và từng cụm từ) và SUBS (phụ đề: t0, t1, text)."""
import json, sys
ep = sys.argv[1]
d = json.load(open(f'{ep}/work/vo/T_vi.json')); C = d['chars']; T = d['T']
def at(seg, phrase, start=0):
    s = ''.join(c for c, _ in C[seg]); i = s.find(phrase, start)
    assert i >= 0, (seg, phrase); return C[seg][i][1], i
K = dict(T)
for name, (seg, phrase) in json.load(open(f'{ep}/keys.json')).items(): K[name] = at(seg, phrase)[0]
subs = json.load(open(f'{ep}/subs.json')); order = [s for s in C]; SUBS = []
for n, seg in enumerate(order):
    cues = subs[seg]; pos = 0; ts = []
    for anchor, text in cues:
        t, i = at(seg, anchor, pos); pos = i + len(anchor); ts.append(t)
    seg_end = T[seg + '_end'] + 0.25
    if n + 1 < len(order): seg_end = min(seg_end, T[order[n + 1]])
    for k, (anchor, text) in enumerate(cues):
        SUBS.append({'t0': round(T[seg] if k == 0 else ts[k], 3), 't1': round(ts[k + 1] if k + 1 < len(cues) else seg_end, 3), 'text': text})
json.dump({'K': K, 'SUBS': SUBS}, open(f'{ep}/work/K.json', 'w'), ensure_ascii=False, indent=0)
print('mốc:', len(K), 'phụ đề:', len(SUBS), 'dài nhất:', max(len(c['text']) for c in SUBS), 'ký tự')
