#!/bin/bash
# Dựng trọn một tập. Dùng: build.sh <thư_mục_tập> <video_ra.mp4>   (có nhạc nền khi tập có music.json)
# Cần có sẵn: <tập>/work/vo (đã chạy tts_seg.py), keys.json, subs.json, scenes.js.
set -e
V=$(dirname "$(readlink -f "$0")"); EP=$(readlink -f "$1"); OUT=$2; N=${PARTS:-2}
python3 "$V/keys.py" "$EP"
python3 "$V/audio.py" "$EP"
for i in $(seq 0 $((N-1))); do node "$V/render.cjs" "$EP" --part $i $N & done; wait
for i in $(seq 0 $((N-1))); do echo "file '$EP/work/part_$i.mp4'"; done > "$EP/work/parts.txt"
ffmpeg -v error -y -f concat -safe 0 -i "$EP/work/parts.txt" -i "$EP/work/mix.wav" -filter_complex "[1:a]alimiter=limit=0.95[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest "$OUT"
ffprobe -v error -show_entries format=duration,size -of csv=p=0 "$OUT"
