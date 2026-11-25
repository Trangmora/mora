# Mẫu video luật kiểu Vox (Nghị định 168/2024, vượt đèn đỏ)

Video mẫu đầu tiên của kênh luật, dài 1 phút 05 giây, 1080p. Toàn bộ hình vẽ bằng code, không dùng ảnh.

## Các bước dựng
1. `python3 ../../../pipeline/full/tts_seg.py script.json vi vo 0.4 op2=0.8 s1=0.7 s3=0.9 s5=0.6 s6=0.9`: thu giọng từng đoạn (ElevenLabs, giọng Trang), ghi `vo/vo_vi.wav` và `vo/T_vi.json`.
2. `python3 keys.py`: lấy mốc thời gian từng cụm từ khóa, ghi `K.json`.
3. `node render.cjs 9 26 45`: xuất vài khung hình mẫu để kiểm tra. `node render.cjs` (không tham số): dựng cả video ra `video.mp4`.
4. `python3 audio.py`: trộn giọng với nhạc nền (nhạc nhỏ dưới giọng). Sửa đường dẫn file nhạc trong `audio.py` cho đúng máy đang chạy.
5. Ghép: `ffmpeg -i video.mp4 -i mix.wav -filter_complex "[1:a]alimiter=limit=0.95[a]" -map 0:v -map "[a]" -c:v libx264 -crf 22 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest out.mp4`

## Ghi chú
- `vox.html` chứa mọi cảnh: `sceneA` (con số), `sceneB` (văn bản), `sceneC` (biểu đồ), `sceneD` (bằng lái 12 điểm), `sceneE` (lưu ý). Các hàm dùng lại được: `hl` (tô bút dạ), `stamp` (con dấu), `strike` (gạch đỏ), `card` (thẻ giấy), `bar` (cột biểu đồ).
- Font trong `fonts/` là bản đầy đủ, có dấu tiếng Việt (Be Vietnam Pro, Lora; giấy phép OFL).
- File nhạc không nằm trong git. Bản mẫu dùng bài "Hammersion" (Ezra Lipp, YouTube Audio Library).
- **Số liệu trong bản mẫu chưa được chủ kênh đối chiếu với văn bản gốc.**
