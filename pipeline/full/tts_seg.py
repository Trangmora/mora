"""Thu giọng Trang theo từng đoạn (mỗi đoạn một lần gọi), chèn khoảng lặng giữa các đoạn.
Dùng: python3 tts_seg.py <script.json> <lang> <outdir> [gap_giây_mặc_định=0.9] [op5=2.0 ...]
Xuất: <outdir>/vo_<lang>.wav và <outdir>/T_<lang>.json (mốc bắt đầu mỗi đoạn, kèm mốc từng ký tự).
Cài đặt giọng theo STYLE_GUIDE: eleven_v3, stability 0.5, style 0.3, không chỉnh tốc độ."""
import json, subprocess, base64, sys, os
VID = '1SF4Jqf4CNRoja3ACqWC'
src, lang, out = sys.argv[1], sys.argv[2], sys.argv[3]
gap_def = float(sys.argv[4]) if len(sys.argv) > 4 else 0.9
gaps = dict(a.split('=') for a in sys.argv[5:])
os.makedirs(out, exist_ok=True)
segs = json.load(open(src))[lang]
SR = 44100
T = {}; chars = {}; t = 0.0; parts = []
for i, (sid, text) in enumerate(segs):
    body = {"text": text, "model_id": "eleven_v3",
            "voice_settings": {"stability": 0.5, "similarity_boost": 0.85, "style": 0.3}}
    if lang == 'vi': body['language_code'] = 'vi'
    bj = f'{out}/b_{lang}.json'; json.dump(body, open(bj, 'w'))
    r = subprocess.run(['curl', '-s', '-m', '300', '-X', 'POST',
        f'https://api.elevenlabs.io/v1/text-to-speech/{VID}/with-timestamps?output_format=mp3_44100_128',
        '-H', 'Content-Type: application/json', '-d', '@' + bj], capture_output=True)
    d = json.loads(r.stdout)
    if 'audio_base64' not in d: print(sid, str(d)[:300]); sys.exit(1)
    mp3 = f'{out}/{lang}_{sid}.mp3'; open(mp3, 'wb').write(base64.b64decode(d['audio_base64']))
    wav = f'{out}/{lang}_{sid}.wav'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', mp3, '-ar', str(SR), '-ac', '1', wav], check=True)
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', wav],
                               capture_output=True, text=True).stdout)
    a = d['alignment']
    T[sid] = round(t, 3); T[sid + '_end'] = round(t + a['character_end_times_seconds'][-1], 3)
    chars[sid] = [[c, round(s + t, 3)] for c, s in zip(a['characters'], a['character_start_times_seconds'])]
    parts.append((wav, dur))
    t += dur + float(gaps.get(sid, gap_def))
    print(lang, sid, round(dur, 2))
T['end'] = round(t - float(gaps.get(segs[-1][0], gap_def)), 3)
# ghép: đoạn + lặng
import wave, numpy as np
buf = []
for (wav, dur), (sid, _) in zip(parts, segs):
    w = wave.open(wav); x = np.frombuffer(w.readframes(w.getnframes()), '<i2'); buf.append(x)
    buf.append(np.zeros(int(float(gaps.get(sid, gap_def)) * SR), '<i2'))
y = np.concatenate(buf[:-1])
w = wave.open(f'{out}/vo_{lang}.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes()); w.close()
json.dump({'T': T, 'chars': chars}, open(f'{out}/T_{lang}.json', 'w'), ensure_ascii=False, indent=0)
print(lang, 'total', T['end'])
