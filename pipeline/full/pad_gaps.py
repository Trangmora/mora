"""Chèn khoảng lặng vào giọng đọc ngay trước một số câu (để câu đùa "có nhịp"), dời mốc thời gian theo.

python3 pad_gaps.py <vo_dir> <lang> <out_dir> a07=0.6 a08=1.0 ...
Khoảng lặng được chèn ở giữa quãng nghỉ sẵn có giữa câu trước và câu đó (không cắt vào chữ).
"""
import json, os, subprocess, sys, wave
import numpy as np

src, lang, out = sys.argv[1:4]
gaps = {k: float(v) for k, v in (a.split("=") for a in sys.argv[4:])}
os.makedirs(out, exist_ok=True)
d = json.load(open(f"{src}/T_{lang}.json"))
T, chars = d["T"], d["chars"]
w = wave.open(f"{src}/vo_{lang}.wav")
sr = w.getframerate()
x = np.frombuffer(w.readframes(w.getnframes()), "<i2")
sids = sorted(k for k in T if "_" not in k and k != "end")
cuts = []  # (thời điểm cắt trong bản gốc, số giây chèn)
for i, sid in enumerate(sids):
    if sid in gaps and i > 0:
        cuts.append(((T[sids[i - 1] + "_end"] + T[sid]) / 2, gaps[sid]))
parts, last = [], 0
for t, g in sorted(cuts):
    j = int(t * sr)
    parts += [x[last:j], np.zeros(int(g * sr), "<i2")]
    last = j
parts.append(x[last:])
y = np.concatenate(parts)
shift = lambda t: t + sum(g for c, g in cuts if c <= t)
T2 = {k: round(shift(v), 3) for k, v in T.items()}
T2["end"] = round(len(y) / sr, 3) if T.get("end") is None else round(shift(T["end"]), 3)
ch2 = {k: [[c, round(shift(s), 3)] for c, s in v] for k, v in chars.items()}
o = wave.open(f"{out}/vo_{lang}.wav", "wb"); o.setnchannels(1); o.setsampwidth(2); o.setframerate(sr); o.writeframes(y.tobytes()); o.close()
json.dump({"T": T2, "chars": ch2, "model": d.get("model")}, open(f"{out}/T_{lang}.json", "w"), ensure_ascii=False, indent=0)
print("total", T2["end"])
