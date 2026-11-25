"""Thu giọng Trang cả đoạn trong MỘT lần gọi (giọng liền mạch hơn thu từng câu), rồi chèn thêm khoảng lặng trước các đoạn chỉ định.
Dùng: python3 tts_flow.py <script.json> <lang> <out_prefix> [op4=0.6 op5=0.4 ...]
Xuất <out_prefix>.wav và <out_prefix>.json ({'T': mốc đầu mỗi đoạn + '<id>_end' + 'end', 'chars': [[ký tự, giây], ...]})."""
import json, subprocess, base64, sys, wave
import numpy as np
src, lang, out = sys.argv[1:4]; extra = {k: float(v) for k, v in (a.split('=') for a in sys.argv[4:])}
segs = json.load(open(src))[lang]; text = ' '.join(t for _, t in segs)
body = {"text": text, "model_id": "eleven_v3", "voice_settings": {"stability": 0.5, "similarity_boost": 0.85, "style": 0.3}}
if lang == 'vi': body['language_code'] = 'vi'
json.dump(body, open(out + '_req.json', 'w'))
r = subprocess.run(['curl', '-s', '-m', '300', '-X', 'POST', 'https://api.elevenlabs.io/v1/text-to-speech/1SF4Jqf4CNRoja3ACqWC/with-timestamps?output_format=mp3_44100_128',
                    '-H', 'Content-Type: application/json', '-d', '@' + out + '_req.json'], capture_output=True)
d = json.loads(r.stdout)
if 'audio_base64' not in d: print(str(d)[:300]); sys.exit(1)
open(out + '.mp3', 'wb').write(base64.b64decode(d['audio_base64']))
SR = 44100
x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', out + '.mp3', '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True).stdout, '<i2')
a = d['alignment']; c = ''.join(a['characters']); st = a['character_start_times_seconds']; en = a['character_end_times_seconds']
starts, ends, pos = [], [], 0
for sid, t in segs:
    i = c.index(t[:12], pos); j = i + len(t) - 1; starts.append(st[i]); ends.append(en[min(j, len(en) - 1)]); pos = i + 1
# cắt ở giữa khoảng lặng trước mỗi đoạn có chèn thêm
parts, T, shift, prev = [], {}, 0.0, 0
for k, (sid, _) in enumerate(segs):
    if k and sid in extra:
        cut = int(((ends[k - 1] + starts[k]) / 2) * SR); parts.append(x[prev:cut]); parts.append(np.zeros(int(extra[sid] * SR), '<i2')); prev = cut; shift += extra[sid]
    T[sid] = round(starts[k] + shift, 3); T[sid + '_end'] = round(ends[k] + shift, 3)
parts.append(x[prev:]); y = np.concatenate(parts); T['end'] = round(ends[-1] + shift, 3)
w = wave.open(out + '.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes()); w.close()
# mốc từng ký tự đã cộng khoảng chèn
ch = []; ks = [T[s] - starts[k] for k, (s, _) in enumerate(segs)]
for ci, (cc, s0) in enumerate(zip(a['characters'], st)):
    k = max([kk for kk in range(len(segs)) if starts[kk] <= s0 + 1e-6] or [0]); ch.append([cc, round(s0 + ks[k], 3)])
json.dump({'T': T, 'chars': ch}, open(out + '.json', 'w'), ensure_ascii=False)
print(lang, T)
