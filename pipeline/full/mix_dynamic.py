"""Ghép âm thanh có nhịp lên xuống (thăng trầm) cho video:
giọng + nhạc nền theo kế hoạch mức (lên ở khoảng ngắt và cao trào, xuống khi có lời, tắt hẳn trước câu then chốt)
+ hiệu ứng tự tạo (chuông, trống trầm, tiếng đàn gảy, giấy lướt) đặt đúng mốc.
Dùng: python3 mix_dynamic.py <plan.json> <video_câm.mp4> <out.mp4>
plan: {"dur", "vo": "vo.wav", "music": [["file.mp3", bắt_đầu_trong_bài, từ_giây, đến_giây], ...],
       "levels": [[t, mức], ...]  (mức nhạc khi KHÔNG có lời; nội suy tuyến tính),
       "duck": 0.2 (mức tối đa khi đang có lời), "mutes": [[t0, t1], ...], "sfx": [[t, "bell|drum|pluck|paper", gain], ...]}"""
import json, sys, subprocess, wave
import numpy as np
P = json.load(open(sys.argv[1])); VID, OUT = sys.argv[2], sys.argv[3]
SR = 44100; DUR = P['dur']; N = int(DUR * SR); t = np.arange(N) / SR
def load(p, ss=0.0, ln=None, ch=2):
    cmd = ['ffmpeg', '-v', 'error', '-ss', str(ss), '-i', p] + (['-t', str(ln)] if ln else []) + ['-f', 's16le', '-ac', str(ch), '-ar', str(SR), '-']
    x = np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, '<i2').astype(np.float32) / 32768
    return x.reshape(-1, ch)
v = np.zeros((N, 1), np.float32); x = load(P['vo'], ch=1)[:N]; v[:len(x)] = x
# nhạc: nhiều đoạn, mỗi đoạn chuẩn hóa độ to, nối mềm 2 giây
mus = np.zeros((N, 2), np.float32)
for f, off, a, b in P['music']:
    seg = load(f, off, b - a + 2.5); seg *= 0.16 / (np.sqrt(np.mean(seg ** 2)) + 1e-9)
    i0 = int(a * SR); n = min(len(seg), N - i0); env = np.ones(n, np.float32)
    fl = int(2.0 * SR); env[:fl] = np.linspace(0, 1, min(fl, n))[:n] if a > 0 else 1
    tail = int((b - a) * SR); env[tail:] = np.clip(1 - (np.arange(n - tail) / fl), 0, 1) if tail < n else env[tail:]
    mus[i0:i0 + n] += seg[:n] * env[:, None]
# kế hoạch mức nhạc
L = np.array(P['levels'], np.float32); lvl = np.interp(t, L[:, 0], L[:, 1]).astype(np.float32)
def box(x, n):   # trung bình trượt bằng tổng tích lũy (nhanh hơn np.convolve hàng trăm lần)
    c = np.concatenate([[0.0], np.cumsum(x, dtype=np.float64)]); h = n // 2; i = np.arange(len(x))
    return (c[np.minimum(i + h + 1, len(x))] - c[np.maximum(i - h, 0)]) / n
win = int(.05 * SR); rms = np.sqrt(np.maximum(box(v[:, 0].astype(np.float64) ** 2, win), 0))
speak = box((rms > 0.02).astype(np.float64), int(2.6 * SR)) > 0
target = np.where(speak, np.minimum(lvl, P.get('duck', 0.2)), lvl)
for a, b in P.get('mutes', []): target[(t >= a) & (t < b)] = 0.0
g = np.empty_like(target); cur = target[0]; up, dn = 1 / (0.5 * SR), 1 / (0.35 * SR)
for i in range(N): d = target[i] - cur; cur += max(-dn, min(up, d)); g[i] = cur
g *= np.clip(t / 0.8, 0, 1) * np.clip((DUR - t) / 2.5, 0, 1)
mix = np.repeat(v, 2, 1) + mus * g[:, None] * 0.85
# hiệu ứng
rng = np.random.default_rng(2)
def bell(n):
    tt = np.arange(n) / SR; return sum(a * np.sin(2 * np.pi * f * tt) * np.exp(-tt / d) for f, a, d in [(98, 1, 3.5), (196.5, .5, 2.5), (293, .25, 1.8), (523, .12, 1)])
def drum(n):
    tt = np.arange(n) / SR; f = 55 + 60 * np.exp(-tt * 18); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-tt * 4.5) + rng.normal(0, 1, n) * np.exp(-tt * 40) * .15
def pluck(n, f=196.0):   # đàn dây gảy (Karplus-Strong), gần tiếng cổ cầm
    p = int(SR / f); buf = rng.uniform(-1, 1, p); out = np.zeros(n)
    for i in range(n): out[i] = buf[i % p]; buf[i % p] = .996 * .5 * (buf[i % p] + buf[(i + 1) % p])
    return out * np.exp(-np.arange(n) / SR / 1.8)
def paper(n):
    nz = rng.normal(0, 1, n); nz = np.convolve(nz, np.ones(6) / 6, 'same'); return nz * np.sin(np.linspace(0, np.pi, n)) ** 2
GEN = {'bell': (bell, 5.0, .09), 'drum': (drum, 2.0, .35), 'pluck': (pluck, 3.0, .10), 'paper': (paper, 0.9, .035)}
for tt, kind, gain in P.get('sfx', []):
    fn, ln, base = GEN[kind]; n = int(ln * SR); i0 = int(tt * SR); n = min(n, N - i0)
    if n > 0: s = fn(int(ln * SR))[:n] * base * gain; mix[i0:i0 + n] += s[:, None]
mix = np.clip(mix, -1, 1); tmp = OUT + '.wav'
w = wave.open(tmp, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype('<i2').tobytes()); w.close()
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', VID, '-i', tmp, '-af', 'alimiter=limit=0.95', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', OUT], check=True)
print('ok', OUT)
