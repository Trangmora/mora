# Cách dựng kênh Asian Culture Stories

Tóm tắt cách làm một tập, từ ý tưởng đến lúc đăng. Quy tắc chi tiết nằm ở `STYLE_GUIDE.md`.

1. **Chọn chủ đề:** một nét văn hóa, tôn giáo hoặc thần thoại của một nước châu Á.
2. **Kịch bản:**
   - **Bản tiếng Anh:** giọng người tò mò kể chuyện.
   - **Bản tiếng Việt:** nói chuyện thân mật ("Xin chào các bạn…").
   - **Cấu trúc:** mở đầu bí ẩn bằng câu hỏi → nguồn gốc → thần thoại → các điều thú vị → kết quay lại câu hỏi.
   - Kiểm chứng năm, con số và tên riêng. Không chép kịch bản kênh khác.
3. **Kho tài nguyên:** đọc `assets/<nước>/index.json`, dùng lại ảnh và clip hợp ngữ cảnh.
4. **Ảnh mới:** gpt-image-2, dùng nguyên văn prompt phong cách chung. Tạo thêm bản nhắm mắt và mỉm cười cho cảnh có mặt người.
5. **Clip cử động:** fal.ai Wan 2.2 Turbo, 720p, khoảng $0,10 mỗi clip, chỉ cho cảnh có người làm việc gì đó.
6. **Giọng:** giọng clone "Trang giọng việt", model v3. Lấy mốc thời gian, rồi chèn các khoảng ngắt nhạc.
7. **Dựng hình:** `pipeline/full/full.cjs <lang>`. Gồm mở đầu và kết thủy mặc, cảnh giấy cắt, clip, chuyển cảnh (hoa, xé giấy, mờ), chữ con dấu.
8. **Âm thanh:**
   - `musicbed.py`: nhạc nền không lời, tự nhỏ khi có lời đọc.
   - `audio_sfx.py`: hiệu ứng âm thanh.
   - Ghép với `alimiter`.
9. **Kiểm tra:** xem các khung hình mẫu (chữ không bị che, không còn viền đen), nghe các đoạn chuyển phần.
10. **Đăng:** hai kênh (Anh và Việt). Mô tả ghi nguồn tư liệu. **Không ghi dòng "hình minh họa có sự hỗ trợ của AI / giọng đọc AI" vào mô tả** (chủ kênh chốt 25/11/2026). **Ghi nhạc theo đúng mẫu chủ kênh đưa** (xem `episodes/01-shinto/description.md`):
   - EN: `Music:` rồi mỗi bài một dòng, dạng `"Tên bài" by Tác giả (Nguồn)`.
   - VI: `Nhạc nền:` rồi mỗi bài một dòng, dạng `"Tên bài" – Tác giả (Nguồn)`.
   - Bài Kevin MacLeod (CC BY 4.0) phải ghi thêm câu giấy phép: `Licensed under Creative Commons: By Attribution 4.0 License`.
11. **Ngân sách:** tối đa $5 mỗi video.
12. **Lưu trữ (bắt buộc):** mọi video thành phẩm lưu vào `videos/` (ghi vào `videos/README.md`). Mọi hình GPT và clip fal.ai lưu vào `assets/<nước>/images` và `clips`, kèm mô tả trong `index.json`, để tập sau dùng lại.

## Đăng tự động qua Morapost
- **Key:** đã lưu trong Network secrets của môi trường (host `www.morapost.com`). Gọi `/api/v1/...` là proxy tự gắn key.
- **Script:** `pipeline/publish/morapost.py`, gồm các lệnh `accounts`, `post`, `status`, `metrics`.
- **Video phải là URL công khai** (MP4, tối đa 200 MB). Cần một chỗ chứa file công khai trước khi gọi API.
- **Mặc định đăng ở chế độ `private`.** Chủ kênh xem lại rồi mới chuyển sang công khai, hoặc dùng `--at` để hẹn giờ.
- **Cách đăng theo độ dài (chủ kênh chốt):**
  - **Video dài (16:9, cả tập):** YouTube và Facebook fanpage của từng ngôn ngữ. Kênh nào khác nhận được video dài thì cũng đăng bản dài.
  - **Instagram, Threads, TikTok, X:** cắt lại khổ dọc 9:16, chia thành phần 1, phần 2… cho ngắn. Ảnh và giọng dùng lại, không tốn credit.
- **Tóm tắt kênh đăng:**
  - **Bản tiếng Anh (6 kênh):** YouTube Asian Myths & Culture, Instagram asian_myths, Threads call me You, Facebook Ridiculous Case (qua Morapost); X asian_myths, TikTok asian_myths (qua Buffer).
  - **Bản tiếng Việt (2 kênh):** YouTube Ridiculous Case, Facebook Mora Media (qua Morapost).
- **Kênh đăng (chủ kênh chốt ngày 25/11/2026):**

| Bản | Nền tảng | Tài khoản | ID trong Morapost |
|---|---|---|---|
| Tiếng Anh | YouTube | Asian Myths & Culture | `UC5u1YF6TmvZTKCKlEU6K9-w` |
| Tiếng Anh | Instagram | asian_myths | `29748236828134140` |
| Tiếng Anh | Threads | call me You | `41529474649984500` |
| Tiếng Anh | Facebook | Ridiculous Case | `1054215381111543` |
| Tiếng Việt | YouTube | Ridiculous Case | `UCDHwhQBQk4ndvpwem5hWqCg` |
| Tiếng Việt | Facebook | Mora Media | `661562267031641` |


## Đăng qua Buffer (thêm ngày 25/11/2026)
- **Key:** lưu trong Network secrets, host `api.buffer.com` (GraphQL, `POST https://api.buffer.com`). Proxy tự gắn key.
- **Kênh:**

| Nền tảng | Tài khoản | Channel ID trong Buffer |
|---|---|---|
| X (Twitter) | asian_myths | `6b06ec308541f09ecb9d8490` |
| TikTok | asian_myths | `6b06ec178541f09ecb9d82f6` |

- **Bản ngôn ngữ:** hai kênh này chỉ đăng bản **tiếng Anh** (chủ kênh chốt).
- **Định dạng:** cả hai kênh hợp với video dọc 9:16 ngắn hơn bản YouTube.
  - TikTok gần như bắt buộc khổ dọc.
  - X giới hạn độ dài video với tài khoản thường. Kiểm tra lại giới hạn trước khi đăng.
- Chưa có script đăng cho Buffer. Viết khi có video đầu tiên cần đăng.

- **Ảnh bìa tự chọn trên YouTube cần kênh đã xác minh** (youtube.com/verify, xác minh bằng số điện thoại). Ngày 25/11/2026, kênh Ridiculous Case (bản tiếng Việt) chưa xác minh nên Morapost đăng được video nhưng YouTube từ chối ảnh bìa. Sau khi đăng, luôn xem `links[].warning` trong `morapost.py status`.
- Chạy `python3 pipeline/publish/morapost.py accounts` để kiểm tra lại ID trước khi đăng.
