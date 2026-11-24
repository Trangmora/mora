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
