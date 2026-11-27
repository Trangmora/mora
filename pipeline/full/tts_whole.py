"""Thu cả kịch bản trong MỘT lần gọi ElevenLabs (ngữ điệu liền mạch hơn thu từng câu), rồi tách mốc thời gian theo từng câu.

python3 tts_whole.py <story.json> <lang> <outdir>
Biến môi trường: VOICE_ID, MODEL (mặc định eleven_v4), STABILITY, STYLE, SPEED (nếu model hỗ trợ), SIMILARITY
Xuất: <outdir>/vo_<lang>.wav và <outdir>/T_<lang>.json (cùng định dạng với tts_seg.py: T[sid], T[sid_end], chars[sid]).
Thẻ biểu cảm kiểu [curious] (eleven_v3) được giữ trong văn bản gửi đi; phụ đề tự bỏ thẻ.
"""
import base64, json, os, subprocess, sys

src, lang, out = sys.argv[1:4]
os.makedirs(out, exist_ok=True)
segs = json.load(open(src))[lang]
VID = os.environ.get("VOICE_ID", "1SF4Jqf4CNRoja3ACqWC")
MODEL = os.environ.get("MODEL", "eleven_v4")
SEP = " "
text, spans, pos = "", [], 0
for i, (sid, t) in enumerate(segs):
    if i:
        text += SEP
    a = len(text)
    text += t
    spans.append((sid, a, len(text)))
vs = {"stability": float(os.environ.get("STABILITY", 0.5)), "similarity_boost": float(os.environ.get("SIMILARITY", 0.8)),
      "style": float(os.environ.get("STYLE", 0.3))}
if os.environ.get("SPEED"):
    vs["speed"] = float(os.environ["SPEED"])
body = {"text": text, "model_id": MODEL, "voice_settings": vs}
if lang == "vi":
    body["language_code"] = "vi"
bj = f"{out}/b_{lang}.json"
json.dump(body, open(bj, "w"))
r = subprocess.run(["curl", "-s", "-m", "600", "-X", "POST",
                    f"https://api.elevenlabs.io/v1/text-to-speech/{VID}/with-timestamps?output_format=mp3_44100_128",
                    "-H", "Content-Type: application/json", "-d", "@" + bj], capture_output=True)
d = json.loads(r.stdout)
if "audio_base64" not in d:
    print(str(d)[:500]); sys.exit(1)
json.dump(d, open(f"{out}/{lang}_whole.json", "w"))
mp3 = f"{out}/{lang}_whole.mp3"
open(mp3, "wb").write(base64.b64decode(d["audio_base64"]))
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", mp3, "-ar", "44100", "-ac", "1", f"{out}/vo_{lang}.wav"], check=True)
al = d["alignment"]
ch, st, en = al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]
assert "".join(ch) == text, "alignment không khớp văn bản"
T, chars = {}, {}
for sid, a, b in spans:
    T[sid] = round(st[a], 3)
    T[sid + "_end"] = round(en[b - 1], 3)
    chars[sid] = [[c, round(s, 3)] for c, s in zip(ch[a:b], st[a:b])]
T["end"] = round(en[-1], 3)
json.dump({"T": T, "chars": chars, "model": MODEL}, open(f"{out}/T_{lang}.json", "w"), ensure_ascii=False, indent=0)
print(MODEL, "total", T["end"])
