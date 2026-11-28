"""Trộn âm thanh cho video: giọng đọc + nhạc nền (tự nhỏ đi khi có giọng) + tiếng động đặt theo mốc thời gian.

mix(voice_wav, music_path, events, out_wav, dur)
events: [(giây, đường_dẫn_tiếng_động, âm_lượng), ...]
"""
import subprocess
import numpy as np

SR = 44100

def load(path, sr=SR):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "f32le", "-ac", "2", "-ar", str(sr), "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).copy()

def envelope(x, win=0.05):
    m = np.abs(x).mean(axis=1)
    n = int(win * SR)
    k = np.ones(n) / n
    e = np.convolve(m, k, mode="same")
    # giữ mức "đang nói" thêm 0.25 s để nhạc không nhấp nhô giữa các chữ
    hold = int(0.25 * SR)
    from numpy.lib.stride_tricks import sliding_window_view
    pad = np.pad(e, (hold, 0))
    return sliding_window_view(pad, hold + 1).max(axis=1)[: len(e)]

def loudest(x, win=0.4):
    """RMS lớn nhất trên cửa sổ 400 ms (độ to cảm nhận gần đúng)"""
    m = (x.astype(np.float64) ** 2).mean(axis=1)
    n = max(1, int(win * SR))
    if len(m) <= n:
        return float(np.sqrt(m.mean()))
    c = np.cumsum(np.concatenate([[0], m]))
    return float(np.sqrt(((c[n:] - c[:-n]) / n).max()))

def mix(voice_wav, music_path, events, out_wav, dur, music_gain=0.12, duck_to=0.035, fade_out=1.2, sfx_gain=1.0, mutes=(), sfx_rel=0.4, vpeak_cap=0.45):
    n = int(dur * SR)
    out = np.zeros((n, 2), np.float32)
    v = load(voice_wav)[:n]
    out[: len(v)] += v * 1.0
    if music_path:
        m = load(music_path)
        if len(m) < n:
            m = np.concatenate([m] * (n // len(m) + 1))
        m = m[:n]
        e = np.zeros(n, np.float32)
        ev = envelope(v)
        e[: len(ev)] = ev
        speaking = np.clip(e / 0.02, 0, 1)
        g = music_gain - (music_gain - duck_to) * speaking
        a = int(0.12 * SR)  # làm mượt đường âm lượng
        g = np.convolve(g, np.ones(a) / a, mode="same")
        for a0, b0 in mutes:  # nhịp im lặng: tắt hẳn nhạc nền (có vào/ra mềm 60 ms)
            i0, i1 = int(a0 * SR), int(b0 * SR)
            r = int(0.06 * SR)
            g[i0:i1] = 0
            g[max(0, i0 - r):i0] *= np.linspace(1, 0, len(g[max(0, i0 - r):i0]))
            g[i1:i1 + r] *= np.linspace(0, 1, len(g[i1:i1 + r]))
        fo = np.linspace(1, 0, int(fade_out * SR))
        g[-len(fo):] *= fo
        out += m * g[:, None]
    # tiếng động: chuẩn hoá theo độ to (RMS 400 ms lớn nhất) so với giọng đọc, để không tiếng nào làm giật mình
    vref = loudest(v) if len(v) else 0.1
    for t, path, gain in events:
        s = load(path)
        i = int(max(0, t) * SR)
        if i >= n:
            continue
        lv = loudest(s)
        if lv > 0:
            s = s * (vref * sfx_rel / lv)
        pk = np.abs(s).max()
        if pk > vpeak_cap * np.abs(v).max():  # chặn đỉnh: không vượt 45% đỉnh giọng
            s = s * (vpeak_cap * np.abs(v).max() / pk)
        f = min(len(s), int(0.015 * SR))  # vào mềm 15 ms
        s[:f] *= np.linspace(0, 1, f)[:, None]
        j = min(n, i + len(s))
        out[i:j] += s[: j - i] * gain * sfx_gain
    peak = np.abs(out).max()
    if peak > 0.98:
        out *= 0.98 / peak
    data = (out * 32767).astype("<i2").tobytes()
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ac", "2", "-ar", str(SR), "-i", "-", out_wav], input=data, check=True)
