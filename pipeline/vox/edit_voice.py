"""Cắt gọn giọng đọc theo danh sách giữ lại (KEEP) + tự bỏ tiếng đệm (ờ, ờm, ừm, à) + rút ngắn khoảng lặng.

Đầu vào: voice.wav, stt.json (ElevenLabs scribe, mốc từng chữ), segments (câu tách theo khoảng lặng).
Đầu ra: voice_edit.wav + words_edit.json (mỗi chữ: text, seg, t mới).

KEEP: {seg_id: "all" | [cụm chữ cần giữ, ...]} – cụm chữ phải khớp nguyên văn (không tính dấu câu, hoa thường).
"""
import json, re, sys, wave
import numpy as np

FILLERS = {"ờ", "ờm", "ừm", "à", "ừ", "ơ"}
LEAD_FILLERS = {"thì"}
SR = 44100

def norm(w):
    return re.sub(r"[^\wÀ-ỹ%]", "", w.lower())

def load_segments(stt):
    ws = [w for w in json.load(open(stt))["words"] if w["type"] == "word"]
    segs, cur = [], []
    for i, w in enumerate(ws):
        cur.append(w)
        gap = ws[i + 1]["start"] - w["end"] if i + 1 < len(ws) else 9
        if gap > 0.55 or w["text"][-1] in ".?!":
            segs.append(cur)
            cur = []
    return segs

def pick(seg_words, phrases):
    """Trả về danh sách các dải chữ (list chỉ số) khớp với từng cụm."""
    toks = [norm(w["text"]) for w in seg_words]
    out = []
    for ph in phrases:
        p = [norm(x) for x in ph.split() if norm(x)]
        found = False
        for s in range(len(toks) - len(p) + 1):
            if toks[s:s + len(p)] == p:
                out.append(list(range(s, s + len(p))))
                found = True
                break
        if not found:
            raise SystemExit(f"Không khớp cụm: {ph!r} trong: {' '.join(w['text'] for w in seg_words)}")
    return out

def build(stt, wav_in, keep, wav_out, words_out, max_gap=0.32, sent_gap=0.42, order=None):
    segs = load_segments(stt)
    w = wave.open(wav_in)
    x = np.frombuffer(w.readframes(w.getnframes()), "<i2").astype(np.float32)
    if w.getnchannels() > 1:
        x = x.reshape(-1, w.getnchannels()).mean(1)
    sr = w.getframerate()
    runs = []  # mỗi run: list chữ liên tiếp (đã bỏ tiếng đệm)
    for sid in (order or sorted(keep)):
        sw = segs[sid - 1]
        spans = [list(range(len(sw)))] if keep[sid] == "all" else pick(sw, keep[sid])
        for sp in spans:
            run = [dict(sw[k], seg=sid) for k in sp if norm(sw[k]["text"]) not in FILLERS]
            # bỏ chữ đệm đứng ĐẦU câu ("Thì thứ nhất là…" → "Thứ nhất là…") – chủ kênh yêu cầu 28/11
            while run and norm(run[0]["text"]) in LEAD_FILLERS and len(run) > 1:
                run = run[1:]
            if run:
                runs.append(run)
    out, words, t = [], [], 0.0
    fade = int(0.012 * sr)
    for ri, run in enumerate(runs):
        # gom các chữ trong run thành các khúc liền (cắt bỏ chỗ trống dài / chỗ tiếng đệm đã bị bỏ)
        chunks, cur = [], [run[0]]
        for a, b in zip(run, run[1:]):
            if b["start"] - a["end"] > max_gap or (b.get("seg") != a.get("seg")):
                chunks.append(cur); cur = [b]
            else:
                cur.append(b)
        chunks.append(cur)
        for ci, ch in enumerate(chunks):
            s0 = max(0, ch[0]["start"] - 0.05)
            s1 = ch[-1]["end"] + 0.08
            seg = x[int(s0 * sr):int(s1 * sr)].copy()
            n = len(seg)
            if n > 2 * fade:
                seg[:fade] *= np.linspace(0, 1, fade)
                seg[-fade:] *= np.linspace(1, 0, fade)
            for wd in ch:
                words.append({"text": wd["text"], "seg": wd["seg"], "t": round(t + (wd["start"] - s0), 3),
                              "end": round(t + (wd["end"] - s0), 3)})
            out.append(seg)
            t += n / sr
            last = ch[-1]["text"]
            g = sent_gap if last[-1] in ".?!" else (0.22 if last[-1] in ",;:" else 0.12)
            if ci == len(chunks) - 1:  # chỗ nối hai cụm đã cắt: chừa hơi thở cho tự nhiên
                g = max(g, 0.3)
            out.append(np.zeros(int(g * sr), np.float32))
            t += g
    y = np.concatenate(out)
    y = y / (np.abs(y).max() + 1e-6) * 0.92 * 32767
    o = wave.open(wav_out, "wb"); o.setnchannels(1); o.setsampwidth(2); o.setframerate(sr)
    o.writeframes(y.astype("<i2").tobytes()); o.close()
    json.dump(words, open(words_out, "w"), ensure_ascii=False)
    return t, words

if __name__ == "__main__":
    import importlib
    spec = importlib.import_module(sys.argv[1])
    total, words = build(sys.argv[2], sys.argv[3], spec.KEEP, sys.argv[4], sys.argv[5], order=getattr(spec, 'ORDER', None))
    print("độ dài mới:", round(total, 1), "giây; số chữ:", len(words))
