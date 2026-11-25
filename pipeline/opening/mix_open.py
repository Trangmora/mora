"""Ghép âm thanh cho đoạn mở đầu: giọng (tốc độ tự nhiên) + nhạc nền tự hạ khi có lời + gió + một tiếng chuông trầm.
Dùng: python3 mix_open.py <lang> <video_câm.mp4> <vo.wav> <nhạc.mp3> <out.mp4> [nhạc_bắt_đầu_giây=0]
Mốc lấy từ <video_câm.mp4>.json (DUR, OFF, marks) do ink_open.py xuất ra.
Mức nhạc (sau khi chuẩn hóa bài nhạc về ~ -16 dBFS): 0,9 lúc chỉ có nhạc và ở khoảng ngắt, 0,18 dưới giọng; lên 0,5 s, xuống 0,4 s.
"""
import sys, json, subprocess, wave
import numpy as np
lang, vid, vo_p, mus_p, out = sys.argv[1:6]
mstart = float(sys.argv[6]) if len(sys.argv) > 6 else 0.0
meta = json.load(open(vid + '.json')); DUR, OFF = meta['DUR'], meta['OFF']
SR = 44100; N = int(DUR * SR); t = np.arange(N) / SR

def load(p, ss=0.0):
    r = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(ss), '-i', p, '-t', str(DUR + 1), '-f', 's16le', '-ac', '2', '-ar', str(SR), '-'],
                       capture_output=True, check=True)
    x = np.frombuffer(r.stdout, '<i2').astype(np.float32).reshape(-1, 2) / 32768
    y = np.zeros((N, 2), np.float32); y[:min(N, len(x))] = x[:N]; return y

vo = load(vo_p); v = np.zeros((N, 2), np.float32); a = int(OFF * SR); v[a:] = vo[:N - a]
mus = load(mus_p, mstart)
# chuẩn hóa độ to nhạc (RMS ~ -16 dBFS) để các mức 0,7 / 0,18 nghe rõ, bài nào cũng như nhau
mus *= 0.16 / (np.sqrt(np.mean(mus ** 2)) + 1e-9)
# phát hiện lúc đang nói
mono = v[:, 0]; win = int(.05 * SR)
rms = np.sqrt(np.convolve(mono ** 2, np.ones(win) / win, 'same'))
speak = np.convolve((rms > 0.02).astype(np.float32), np.ones(int(2.6 * SR)), 'same') > 0   # lặng < 1,3 s vẫn tính là đang nói (tránh nhạc nhấp nhô giữa các câu)
target = np.where(speak, 0.18, 0.90).astype(np.float32)
last = np.where(speak)[0].max() / SR
target[t > last + 0.3] = 0.90                                                              # khoảng ngắt cuối, nhạc lên
# làm mượt (lên 0,5 s, xuống 0,4 s)
g = np.empty_like(target); cur = target[0]
up, dn = 1 / (0.5 * SR), 1 / (0.4 * SR)
for i in range(N):
    d = target[i] - cur; cur += max(-dn, min(up, d)); g[i] = cur
g *= np.clip(t / 1.0, 0, 1) * np.clip((DUR - t) / 2.5, 0, 1)
mix = v * 1.0 + mus * g[:, None] * 0.85
# gió: nhiễu lọc thấp, rất nhỏ
rng = np.random.default_rng(1); n = rng.normal(0, 1, (N, 2)).astype(np.float32)
for _ in range(3): n = np.cumsum(n, 0); n -= np.convolve(n[:, 0], np.ones(SR // 2) / (SR // 2), 'same')[:, None]
n /= np.abs(n).max() + 1e-9; wind = n * (0.5 + 0.5 * np.sin(2 * np.pi * t / 7.0))[:, None]
mix += wind * 0.035 * np.clip(t / 2, 0, 1)[:, None] * np.clip((DUR - t) / 2, 0, 1)[:, None]
# chuông trầm khi chữ chính hiện (mốc lớn nhất trong marks có reveal: lấy chữ 儒 nếu có)
bell_t = meta['marks'].get('儒')
if bell_t is not None:
    tb = t - bell_t; m = tb >= 0
    bell = np.zeros(N, np.float32)
    for f, amp, dec in [(98, 1.0, 3.5), (196.5, .5, 2.5), (293, .25, 1.8), (523, .12, 1.0)]:
        bell[m] += amp * np.sin(2 * np.pi * f * tb[m]) * np.exp(-tb[m] / dec)
    mix += (bell * 0.09)[:, None]
mix = np.clip(mix, -1, 1)
tmp = out + '.wav'
w = wave.open(tmp, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((mix * 32767).astype('<i2').tobytes()); w.close()
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', vid, '-i', tmp, '-af', 'alimiter=limit=0.95', '-c:v', 'copy',
                '-c:a', 'aac', '-b:a', '192k', '-shortest', out], check=True)
print('ok', out)
