"""Trộn giọng đọc (và nhạc nền nếu có). Dùng: python3 audio.py <thư_mục_tập> [nhạc.wav]
Ghi <tập>/work/mix.wav. Không có nhạc thì chỉ có giọng. Nhạc nằm nhỏ dưới giọng, to hơn ở chỗ nghỉ."""
import numpy as np, wave, json, sys
ep = sys.argv[1]; mus = sys.argv[2] if len(sys.argv) > 2 else None
SR = 44100; K = json.load(open(f'{ep}/work/K.json'))['K']; D = 0.6; END = D + K['end'] + 1.6; N = int(END * SR); t = np.arange(N) / SR
def rd(f):
    w = wave.open(f); assert w.getframerate() == SR, 'cần 44100 Hz'
    x = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(np.float32) / 32768; return x.reshape(-1, w.getnchannels())
v = rd(f'{ep}/work/vo/vo_vi.wav')[:, 0]; V = np.zeros(N, np.float32); i0 = int(D * SR); n = min(len(v), N - i0); V[i0:i0 + n] = v[:n]
V *= 0.89 / max(1e-6, np.abs(V).max())
out = np.repeat(V[:, None], 2, 1)
if mus:
    m = rd(mus); m = m if m.shape[1] == 2 else np.repeat(m, 2, 1); m = m * (0.158 / np.sqrt((m ** 2).mean()))
    while len(m) < N: m = np.concatenate([m, m])
    m = m[:N]
    rms = np.sqrt(np.convolve(V ** 2, np.ones(2205) / 2205, 'same')); sp = np.convolve((rms > 0.02).astype(np.float32), np.ones(2 * int(.4 * SR) + 1), 'same') > 0
    tg = np.where(sp, 0.13, 0.45).astype(np.float32); g = np.zeros(N, np.float32); c = 0.
    for i in range(0, N, 64):
        d = tg[i] - c; c += max(-64 / (0.3 * SR), min(64 / (0.4 * SR), d)); g[i:i + 64] = c
    env = np.minimum(1, t / 0.6) * np.minimum(1, (END - t) / 1.2)
    out = m * (g * env)[:, None] + out
w = wave.open(f'{ep}/work/mix.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(out, -1, 1) * 32767).astype('<i2').tobytes()); w.close(); print('ok', round(END, 2), 'nhạc:', bool(mus))
