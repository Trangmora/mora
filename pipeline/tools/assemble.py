"""Ghép lại giọng đọc từ các đoạn đã thu (không gọi lại ElevenLabs), có thể bỏ bớt đoạn và đổi khoảng lặng.
Dùng: python3 assemble.py <thư_mục_vo> <lang> <khoảng_lặng_mặc_định> drop=s11,s12 op3=6.0 s3=3.0 ...
Đọc <vo>/<lang>_<sid>.wav và <vo>/T_<lang>.json (bản gốc lưu thành T_<lang>_full.json). Ghi lại vo_<lang>.wav và T_<lang>.json."""
import json, sys, os, wave
import numpy as np
V, lang, gdef = sys.argv[1], sys.argv[2], float(sys.argv[3]); kv = dict(a.split('=') for a in sys.argv[4:])
drop = set(kv.pop('drop', '').split(',')) - {''}
full = f'{V}/T_{lang}_full.json'
if not os.path.exists(full): os.rename(f'{V}/T_{lang}.json', full)
d = json.load(open(full)); T0 = d['T']; C0 = d['chars']
sids = [k for k in C0 if k not in drop]
T = {}; C = {}; t = 0.0; buf = []; SR = 44100
for i, sid in enumerate(sids):
    w = wave.open(f'{V}/{lang}_{sid}.wav'); x = np.frombuffer(w.readframes(w.getnframes()), '<i2'); dur = len(x) / SR
    base = C0[sid][0][1]  # mốc bắt đầu gốc của đoạn (T0['end'] bị ghi đè bằng tổng thời lượng nên không dùng được)
    T[sid] = round(t, 3); T[sid + '_end'] = round(t + (T0[sid + '_end'] - base), 3)
    C[sid] = [[c, round(s - base + t, 3)] for c, s in C0[sid]]
    g = float(kv.get(sid, gdef)); buf.append(x)
    if i < len(sids) - 1: buf.append(np.zeros(int(g * SR), '<i2')); t += dur + g
    else: t += dur
T['endS'] = T['end']; T['endS_end'] = T['end_end']; T['end'] = round(t, 3)
y = np.concatenate(buf); w = wave.open(f'{V}/vo_{lang}.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes()); w.close()
json.dump({'T': T, 'chars': C}, open(f'{V}/T_{lang}.json', 'w'), ensure_ascii=False)
print(lang, 'total', round(t, 2), 'dropped', sorted(drop))
