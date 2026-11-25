# Khung dựng video luật (kiểu sơ đồ)

Mỗi video là một chuỗi "slide sơ đồ": ô viền đỏ nối nhau bằng mũi tên bút dạ, ảnh thật, phụ đề cháy chữ. Toàn bộ vẽ bằng code (canvas), xuất 1080p 30 hình/giây. Tập mẫu: `luat/episodes/BLHS2026_lam_nhuc/`.

## Một tập gồm
- `script.json`: `{"vi": [["id_đoạn", "lời đọc"], ...]}`. Số viết bằng chữ để giọng đọc đúng. **Đoạn cuối đặt id `out`, không đặt `end`** (trùng khóa tổng thời lượng).
- `keys.json`: `{"tên_mốc": ["id_đoạn", "cụm từ"]}`. Hình hiện đúng lúc đọc tới cụm từ đó.
- `subs.json`: `{"id_đoạn": [["cụm từ bắt đầu", "chữ phụ đề"], ...]}`. Phụ đề viết số bằng chữ số, mỗi dòng không quá 50 ký tự.
- `scenes.js`: các cảnh, gọi `defineEpisode({header, images, scenes})`.
- `img/`: ảnh thật (Unsplash), ghi tác giả trong `sources.md`.
- `script.md`: lời đọc và bảng "con số nào lấy từ nguồn nào". `sources.md`: nguồn.
- `work/`: file trung gian (giọng, mốc, khung hình), không đưa vào git.

## Các bước
```bash
cd luat/episodes/<tập>
# 1. Thu giọng (giọng chủ kênh chọn, đọc nhanh hơn 15%)
VOICE_ID=ywBZEqUhld86Jeajq94o TEMPO=1.15 python3 ../../../pipeline/full/tts_seg.py script.json vi work/vo 0.3 op2=0.45
# 2. Kiểm tra giọng đọc đúng số: gửi work/vo/vo_vi.wav lên ElevenLabs speech-to-text (scribe_v1), so với lời
# 3. Mốc thời gian và phụ đề
python3 ../../pipeline/vox/keys.py .
# 4. Khung hình mẫu (xem từng khung trước khi dựng)
node ../../pipeline/vox/render.cjs . 3 10 25 40
# 5. Đoạn thử:  node ../../pipeline/vox/render.cjs . --range 0 14   (ghi work/clip.mp4, chưa có tiếng)
# 6. Dựng trọn video có tiếng (kênh luật không dùng nhạc nền)
PARTS=2 ../../pipeline/vox/build.sh . ../../videos/<tên>_vi.mp4
```

## Hàm vẽ trong `vox.html`
Toạ độ 1280x720. Thời điểm tính bằng `g('tên_mốc')` (giây trong video).
- `box(x,y,w,h,t0,{col,lw,fill},a=>{...})`: ô viền đỏ có bóng, bật ra lúc `t0`; nội dung vẽ theo toạ độ trong ô.
- `arrow(x1,y1,x2,y2,t0,dur)`, `underline(x,y,w,t0)`, `check(x,y,s,t0)`: nét bút dạ tự vẽ, cây bút chạy theo đầu nét.
- `title(số,chữ,t0,{sub})`: tiêu đề có số thứ tự và gạch chân đỏ.
- `photo(key,x,y,w,h)` (ảnh trong ô), `photoCard(key,x,y,w,h,t0,{rot})` (thẻ ảnh viền đỏ).
- `icon(tên,x,y,s,t0)`: biểu tượng vẽ tay (`paper, phone, bubble, coin, calendar, bars, shield, house, car, shop`). `bubble(x,y,s,t0,chữ)`: bong bóng thoại.
- `stamp(chữ,x,y,P(t0,.35),{size,rot,col})`: con dấu. `hl(...)`: tô bút dạ vàng. `badge(n,cx,cy,t0)`: số trong vòng tròn đỏ.
- `txt(chữ,x,y,{size,w,col,align,a})`, `tw(chữ,size)` (đo bề rộng), `P(t0,dur)` (0→1 từ lúc t0).
- `source(chữ)`: dòng nguồn góc dưới. Phụ đề và dải tiêu đề trên cùng tự vẽ.
- Cảnh dùng chung: `vxTodo(t0, [[t, dòng1, dòng2], ...])` (cảnh "Bạn nên làm gì?"), `vxDisclaimer(t0, dòng_văn_bản, dòng_số_hiệu, t_nguồn, chữ_nguồn)` (cảnh lưu ý cuối).
- Không có bàn tay, chỉ có cây bút. Tắt bút: `defineEpisode({pen:false})`.

## Lưu ý
- Máy dựng 4 nhân: `PARTS=2` cho một tập, `PARTS=1` khi dựng nhiều tập cùng lúc.
- Kênh luật không dùng nhạc nền (chủ kênh chốt 25/11/2026): chạy `build.sh` không có tham số nhạc.
