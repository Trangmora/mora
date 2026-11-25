# Bộ công cụ dựng một tập (dùng chung cho mọi tập từ tập Lệ Chi Viên)

Mỗi tập là một thư mục làm việc có các file sau, còn code thì dùng chung:

| File của tập | Nội dung |
|---|---|
| `script.json` | lời đọc theo từng đoạn (`vi`, `en`), dùng cho `pipeline/full/tts_seg.py` |
| `img/prompts.json` | `{"ref": ảnh mẫu phong cách, "setting": bối cảnh chung, "scenes": {khóa: mô tả}, "refs": {khóa: ảnh tham chiếu riêng}}` |
| `clips/clips.json` | `{khóa: mô tả chuyển động}` cho những cảnh cần clip fal.ai |
| `r/shots.js` | danh sách cảnh: ảnh hay clip nào, lúc nào, máy quay đi thế nào, chữ gì |
| `music.json` | nhạc theo từng phần, mức to nhỏ, chỗ ngắt lặng, tiếng trống |

Thứ tự chạy:

1. `python3 gen_nb.py <tập>/img [khóa…]` tạo ảnh bằng Nano Banana trên fal.ai (khoảng 0,04 đô một ảnh).
2. `python3 clips.py <tập>` tạo clip 5 giây bằng Wan 2.2 Turbo (khoảng 0,10 đô một clip). Giữ nguyên bộ lọc nội dung của fal.ai; cảnh bị chặn thì để ảnh tĩnh, máy quay chuyển động bằng code.
3. Thu giọng: `python3 pipeline/full/tts_seg.py …` (ghi `vo/vo_vi.wav`, `vo/T_vi.json`).
4. `python3 prep.py <tập> <tempo> [khóa=đoạn:cụm từ …]` tăng tốc giọng, thêm mốc thời gian theo cụm từ, chuẩn bị trang ảnh và khung hình clip trong `r/`.
5. `cd <tập>/r && TEMPO=1.07 node build.cjs vi 12 30 …` xuất vài khung hình thử để soát chữ và bố cục.
6. `render.sh <tập> <tempo> <tên_file.mp4>` dựng 3 phần song song, trộn nhạc (`mix.py`), ghép thành video.
   Bản tiếng Anh: `LG=en BUILD=<script>.cjs MUSIC=music_en.json render.sh …`.
7. `python3 archive.py <tập> assets/<nước> <tiền_tố> <tên_tập>` lưu ảnh và clip vào kho dùng lại.

`assemble.py` ghép lại giọng đọc từ các đoạn đã thu (bỏ đoạn, đổi khoảng nghỉ) mà không phải thu lại.
Nhạc nền (file wav) không nằm trong repo; `mix.py` đọc ở thư mục `samurai/mus` của phiên làm việc.
