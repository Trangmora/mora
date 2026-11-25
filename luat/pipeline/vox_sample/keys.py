"""Lấy mốc thời gian của từng cụm từ trong giọng đọc, để hình hiện đúng lúc đọc tới.
Chạy sau tts_seg.py. Đọc vo/T_vi.json, ghi K.json (mốc bắt đầu mỗi đoạn và mỗi cụm từ khóa)."""
import json
d = json.load(open('vo/T_vi.json')); C = d['chars']; T = d['T']
def at(seg, phrase):
    s = ''.join(c for c, _ in C[seg]); i = s.find(phrase)
    assert i >= 0, (seg, phrase); return C[seg][i][1]
K = dict(T)
K.update({
    'w20': at('op1', 'hai mươi triệu'), 'wgap': at('op2', 'Gấp'), 'wq': at('op2', 'Vậy'),
    'w168': at('s1', 'Nghị định 168'), 'w100': at('s1', 'thay thế'),
    'wxm': at('s2', 'Với xe máy'), 'wxmnew': at('s2', 'lên bốn'),
    'woto': at('s3', 'Với ô tô'), 'wotonew': at('s3', 'lên mười tám'),
    'w12': at('s4', 'Lần đầu tiên'), 'w12b': at('s4', 'mười hai điểm'),
    'wm4': at('s5', 'Vượt'), 'whet': at('s5', 'Bị trừ hết'), 'w6': at('s5', 'sau ít nhất'),
    'wrest': at('s6', 'Còn nếu'), 'wph': at('s6', 'phục hồi'), 'wdis': at('end', 'Nội dung'), 'wsrc': at('end', 'Hãy kiểm tra')})
json.dump(K, open('K.json', 'w'), indent=0)
