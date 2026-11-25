#!/bin/bash
# Dựng cả tập thành 3 phần song song, trộn nhạc, ghép thành video.
# Dùng: [LG=en] [BUILD=ten_script.cjs] [MUSIC=music_en.json] render.sh <thư_mục_tập> <tempo> <tên_file_ra>
D=$1; TEMPO=$2; OUT=$3; T=$(cd $(dirname $0) && pwd); export LG=${LG:-vi}; BUILD=${BUILD:-build.cjs}
cd $D/r && rm -f p0.mp4 p1.mp4 p2.mp4
N=$(python3 -c "import json;print(round(json.load(open('timeline_$LG.json'))['END']*24))"); a=$((N/3)); b=$((2*N/3))
TEMPO=$TEMPO F0=0 F1=$a OUT=p0.mp4 node $BUILD $LG > p0.log 2>&1 &
TEMPO=$TEMPO F0=$a F1=$b OUT=p1.mp4 node $BUILD $LG > p1.log 2>&1 &
TEMPO=$TEMPO F0=$b F1=$N OUT=p2.mp4 node $BUILD $LG > p2.log 2>&1 &
wait
python3 $T/mix.py $D $TEMPO || exit 1
printf "file 'p0.mp4'\nfile 'p1.mp4'\nfile 'p2.mp4'\n" > parts.txt
ffmpeg -v error -y -f concat -safe 0 -i parts.txt -i ../mix_$LG.wav -filter_complex "[0:v]noise=alls=5:allf=t[v];[1:a]alimiter=limit=0.95[a]" -map "[v]" -map "[a]" -c:v libx264 -crf 26 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest $D/$OUT
ffprobe -v error -show_entries format=duration,size -of csv=p=0 $D/$OUT
