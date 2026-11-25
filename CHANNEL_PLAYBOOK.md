# Cách dựng kênh Asian Culture Stories

Tóm tắt cách làm một tập, từ ý tưởng đến lúc đăng. Quy tắc chi tiết nằm ở `STYLE_GUIDE.md`.

1. **Chọn chủ đề:** một nét văn hóa, tôn giáo hoặc thần thoại của một nước châu Á.
2. **Kịch bản:**
   - **Bản tiếng Anh:** giọng người tò mò kể chuyện.
   - **Bản tiếng Việt:** nói chuyện thân mật ("Xin chào các bác…").
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
10. **Đăng:** hai kênh (Anh và Việt). Ghi nguồn nhạc trong mô tả, khai báo nội dung có dùng AI.
11. **Ngân sách:** tối đa $5 mỗi video.

## Đăng tự động qua Morapost
- **Key:** đã lưu trong Network secrets của môi trường (host `www.morapost.com`). Gọi `/api/v1/...` là proxy tự gắn key.
- **Script:** `pipeline/publish/morapost.py`, gồm các lệnh `accounts`, `post`, `status`, `metrics`.
- **Video phải là URL công khai** (MP4, tối đa 200 MB). Cần một chỗ chứa file công khai trước khi gọi API.
- **Mặc định đăng ở chế độ `private`.** Chủ kênh xem lại rồi mới chuyển sang công khai, hoặc dùng `--at` để hẹn giờ.
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

- **Bản ngôn ngữ dùng cho hai kênh này:** chưa chốt, nhưng tên kênh cho thấy là bản tiếng Anh.
- **Định dạng:** cả hai kênh hợp với video dọc 9:16 ngắn hơn bản YouTube.
  - TikTok gần như bắt buộc khổ dọc.
  - X giới hạn độ dài video với tài khoản thường. Kiểm tra lại giới hạn trước khi đăng.
- Chưa có script đăng cho Buffer. Viết khi có video đầu tiên cần đăng.

- Chạy `python3 pipeline/publish/morapost.py accounts` để kiểm tra lại ID trước khi đăng.
