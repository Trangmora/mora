"""Đổi khoảng nghỉ giữa các đoạn giọng đọc mà KHÔNG thu lại giọng. Dùng: python3 regap.py <thư_mục_tập> <nghỉ_mặc_định> [id=giây ...]
Đọc các file <tập>/work/vo/vi_<id>.wav và T_vi.json cũ, ghi lại vo_vi.wav và T_vi.json với khoảng nghỉ mới (mốc từng ký tự được dời theo).
Dùng khi cần chỗ nghỉ dài hơn ở các đoạn chuyển ý, ví dụ để nhạc nền nổi lên."""
import json, sys, wave
import numpy as np
ep = sys.argv[1]; gap_def = float(sys.argv[2]); gaps = dict(a.split('=') for a in sys.argv[3:])
vo = f'{ep}/work/vo'; d = json.load(open(f'{vo}/T_vi.json')); T0 = d['T']; C0 = d['chars']; SR = 44100
T = {}; chars = {}; buf = []; t = 0.0; order = list(C0)
for i, sid in enumerate(order):
    w = wave.open(f'{vo}/vi_{sid}.wav'); assert w.getframerate() == SR and w.getnchannels() == 1
    x = np.frombuffer(w.readframes(w.getnframes()), '<i2'); dur = len(x) / SR
    T[sid] = round(t, 3); T[sid + '_end'] = round(t + T0[sid + '_end'] - T0[sid], 3)
    chars[sid] = [[c, round(s - T0[sid] + t, 3)] for c, s in C0[sid]]
    buf.append(x); g = float(gaps.get(sid, gap_def))
    if i + 1 < len(order): buf.append(np.zeros(int(g * SR), '<i2')); t += dur + g
    else: t += dur
T['end'] = round(t, 3); y = np.concatenate(buf)
w = wave.open(f'{vo}/vo_vi.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes()); w.close()
json.dump({'T': T, 'chars': chars}, open(f'{vo}/T_vi.json', 'w'), ensure_ascii=False, indent=0); print('tổng', T['end'])
