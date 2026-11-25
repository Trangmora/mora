"""Trộn giọng đọc với nhạc nền có lên xuống, theo cấu hình music.json của từng tập.
Dùng: python3 mix.py <thư_mục_tập> <tempo>   (đọc r/timeline_vi.json, vo/vo_vi_f.wav, vo/T_vi.json, music.json; ghi mix_vi.wav)
music.json: {"secs":[[bài, bắt_đầu, kết_thúc, vị_trí_trong_bài]], "zones":[[bắt_đầu, kết_thúc, mức_dưới_giọng, mức_khoảng_trống]],
             "silence":[[mốc, số_giây]], "booms":[[mốc, độ_lớn]], "hush":[[bắt_đầu, kết_thúc]]}
Mốc thời gian: "s4", "s4-0.8", "E:op3+0.1" (E: là lúc đọc xong đoạn đó), "END", hoặc số giây."""
import numpy as np, wave, json, sys, re, os
D = sys.argv[1]; TEMPO = float(sys.argv[2]); SR = 44100; DELAY = 4.6
LG = os.environ.get('LG', 'vi'); VO = 'vo' if LG == 'vi' else 'vo_' + LG
MUS = os.path.dirname(os.path.abspath(__file__)) + '/../samurai/mus'
TL = json.load(open(f'{D}/r/timeline_{LG}.json')); G = TL['G']; SC = TL['scenes']; DUR = TL['END']; N = int(DUR * SR); t = np.arange(N) / SR
TJ = json.load(open(f'{D}/{VO}/T_{LG}.json'))['T']; C = json.load(open(f'{D}/' + os.environ.get('MUSIC', 'music.json')))
def tm(x):
    if isinstance(x, (int, float)): return float(x)
    if re.fullmatch(r'-?[0-9.]+', x): return float(x)
    m = re.match(r'^(E:)?([A-Za-z0-9_]+?)([+-][0-9.]+)?$', x); key = m.group(2); off = float(m.group(3) or 0)
    if key == 'END': return DUR + off
    return (DELAY + TJ[key + '_end'] / TEMPO if m.group(1) else G[key]) + off
def rd(f):
    w = wave.open(f); x = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(np.float32) / 32768; return x.reshape(-1, w.getnchannels())
v = rd(f'{D}/{VO}/vo_{LG}_f.wav')[:, 0]; V = np.zeros(N, np.float32); i0 = int(DELAY * SR); n = min(len(v), N - i0); V[i0:i0 + n] = v[:n]
xf = 1.2; bed = np.zeros((N, 2), np.float32)
for name, a, b, off in C['secs']:
    a = tm(a); b = tm(b); x = rd(f'{MUS}/{name}.wav'); x = x * (0.158 / np.sqrt((x ** 2).mean()))
    A = max(0, int((a - xf) * SR)); B = min(N, int((b + xf) * SR)); st = max(0, int(off * SR) - (int(a * SR) - A)); src = x[st:st + B - A]
    if len(src) < B - A: src = np.concatenate([src, np.zeros((B - A - len(src), 2), np.float32)])
    tt = t[A:B]; f = np.clip((tt - (a - xf)) / xf, 0, 1) * np.clip(((b + xf) - tt) / xf, 0, 1)
    if a <= 0: f = np.clip((b + xf - tt) / xf, 0, 1)
    if b >= DUR - .01: f = np.clip((tt - (a - xf)) / xf, 0, 1)
    bed[A:B] += src * f[:, None]
win = int(.05 * SR); rms = np.sqrt(np.convolve(V ** 2, np.ones(win) / win, 'same'))
speak = np.convolve((rms > 0.02).astype(np.float32), np.ones(2 * int(.4 * SR) + 1), 'same') > 0
under = np.full(N, 0.18, np.float32); gap = np.full(N, 0.85, np.float32)
for a, b, u, g in C.get('zones', []):
    m = (t >= tm(a)) & (t < tm(b)); under[m] = u; gap[m] = g
target = np.where(speak, under, gap)
tit = tm('E:op3'); target = np.where((t > tit - .2) & (t < G['s1'] - .4), 0.95, target)          # bùng lên ở tiêu đề
target = np.where(t > tm('E:endS') + .2, np.maximum(target, 0.6), target)                         # dâng lên ở màn kết
for k, dd in C.get('silence', []):
    target = np.where((t > tm(k) - .3 - dd) & (t < tm(k) - .3), 0.0, target)                      # ngắt lặng trước phần mới
for a, b in C.get('hush', []):
    target = np.where((t > tm(a)) & (t < tm(b)), 0.0, target)                                     # lặng hẳn
g = np.zeros(N, np.float32); cur = 0.; au = 1 / (0.35 * SR); ad = 1 / (0.25 * SR)
for i in range(0, N, 64):
    tg = target[i]; cur += (min(au * 64, tg - cur) if tg > cur else max(-ad * 64, tg - cur)); g[i:i + 64] = cur
env = np.minimum(1, t / 1.0) * np.minimum(1, (DUR - t) / 4)
bed = bed * (g * env)[:, None]
rng = np.random.default_rng(3); S = np.zeros(N, np.float32)
def add(x, t0, gain=1.):
    i = int(t0 * SR)
    if 0 <= i < N: m = min(len(x), N - i); S[i:i + m] += x[:m] * gain
for s in SC:
    if s['tr'] == 'tear':
        n = int(1.2 * SR); x = rng.normal(size=n) * .5; cl = (rng.random(n) < .004) * rng.normal(size=n) * 3
        x = np.convolve(x + cl, [1, -.6], 'same') * np.sin(np.linspace(0, np.pi, n)) ** 1.5 * .09; add(x.astype(np.float32), s['s'] - .85)
tn = np.arange(int(1.8 * SR)) / SR
boom = (np.sin(2 * np.pi * (58 - 20 * tn) * tn) * np.exp(-tn * 3.5) + .3 * np.random.default_rng(1).normal(size=len(tn)) * np.exp(-tn * 30)).astype(np.float32)
add(boom, tit, 1.0)
for k, gn in C.get('booms', []): add(boom, tm(k), gn)
out = bed + (V * 1.5 + S * 0.45)[:, None]
w = wave.open(f'{D}/mix_{LG}.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(out, -1, 1) * 32767).astype('<i2').tobytes()); w.close()
print('ok', round(DUR, 1))
