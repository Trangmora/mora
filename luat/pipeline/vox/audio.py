"""Trộn giọng đọc, và nhạc nền nếu tập có file music.json. Dùng: python3 audio.py <thư_mục_tập>
Ghi <tập>/work/mix.wav. Không có music.json thì chỉ có giọng (mặc định của kênh luật).
music.json: {"file": "đường dẫn tính từ thư mục tập", "offset": giây bỏ qua ở đầu bài, "duck": mức nhạc khi đang có lời (0.14),
 "gap": mức nhạc ở chỗ nghỉ giữa các đoạn (0.55), "edge": mức nhạc lúc mở đầu và kết thúc (0.7),
 "sections": [["id_đoạn", hệ_số], ...]} (từ đoạn đó trở đi, mức dưới lời nhân với hệ số; để nhạc dày hơn hoặc mỏng hơn theo từng phần)."""
import numpy as np, wave, json, sys, os, subprocess
ep = sys.argv[1]; SR = 44100; K = json.load(open(f'{ep}/work/K.json'))['K']; D = 0.6; END = D + K['end'] + 1.6; N = int(END * SR); t = np.arange(N) / SR
w = wave.open(f'{ep}/work/vo/vo_vi.wav'); assert w.getframerate() == SR
v = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(np.float32) / 32768
V = np.zeros(N, np.float32); i0 = int(D * SR); n = min(len(v), N - i0); V[i0:i0 + n] = v[:n]
V *= 0.89 / max(1e-6, np.abs(V).max())
out = np.repeat(V[:, None], 2, 1); mp = f'{ep}/music.json'
if os.path.exists(mp):
    M = json.load(open(mp)); f = os.path.join(ep, M['file'])
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(M.get('offset', 0)), '-i', f, '-f', 's16le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    m = np.frombuffer(raw, '<i2').astype(np.float32).reshape(-1, 2) / 32768; m *= 0.158 / np.sqrt((m ** 2).mean())
    if len(m) < N:  # bài ngắn hơn video: lặp lại, nối mềm 2 giây
        fl = 2 * SR; reps = [m]
        while sum(len(r) for r in reps) - fl * (len(reps) - 1) < N: reps.append(m)
        o = np.zeros((sum(len(r) for r in reps) - fl * (len(reps) - 1), 2), np.float32); p = 0
        for r in reps:
            e = np.ones(len(r), np.float32); e[:fl] = np.linspace(0, 1, fl) if p else 1; e[-fl:] = np.linspace(1, 0, fl)
            o[p:p + len(r)] += r * e[:, None]; p += len(r) - fl
        m = o
    m = m[:N]
    # san bớt chỗ to chỗ nhỏ của chính bài nhạc (cửa sổ 3 giây), để chỗ nổi lên ở các khoảng nghỉ được đều nhau
    wl = 3 * SR; lr = np.sqrt(np.convolve((m ** 2).mean(1), np.ones(wl) / wl, 'same')) + 1e-4
    m *= ((0.158 / lr) ** 0.65)[:, None]; m *= 0.158 / np.sqrt((m ** 2).mean())
    duck, gap, edge = M.get('duck', 0.14), M.get('gap', 0.55), M.get('edge', 0.7)
    mult = np.ones(N, np.float32)
    for sid, k in M.get('sections', []): mult[t >= D + K[sid] - 0.3] = k
    win = int(.03 * SR); rms = np.sqrt(np.convolve(V ** 2, np.ones(win) / win, 'same'))
    speak = np.convolve((rms > 0.015).astype(np.float32), np.ones(int(.36 * SR)), 'same') > 0   # lời đọc, nới 0,18 giây mỗi bên
    tg = np.where(speak, duck * mult, gap).astype(np.float32)
    tg[t < D - 0.05] = edge; tg[t > D + K['end'] + 0.25] = edge
    g = np.zeros(N, np.float32); c = float(tg[0]); up, dn = 64 / (0.22 * SR), 64 / (0.16 * SR)
    for i in range(0, N, 64):
        d = tg[i] - c; c += max(-dn, min(up, d)); g[i:i + 64] = c
    env = np.minimum(1, t / 0.25) * np.minimum(1, (END - t) / 1.4)
    out = m * (g * env)[:, None] + out
w = wave.open(f'{ep}/work/mix.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(out, -1, 1) * 32767).astype('<i2').tobytes()); w.close(); print('ok', round(END, 2), 'nhạc:', os.path.exists(mp))
