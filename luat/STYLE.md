# Kênh video luật: phong cách và quy tắc (chủ kênh chốt ngày 25/11/2026)

## Chọn đề tài
- **Chỉ làm luật mới nhất:** luật hoặc nghị định vừa được thông qua hay vừa có hiệu lực. Có luật mới thì làm ngay luật đó.
- **Không làm lại** đề tài kênh khác đã làm nhiều. Tháng 11/2026 chủ kênh dặn tạm không làm Luật Đất đai, Nhà ở, Kinh doanh bất động sản.
- **Ưu tiên** luật ảnh hưởng trực tiếp đến người dân: thuế, giao thông, lao động, hình sự, tiêu dùng, công nghệ.

## Phong cách hình (kiểu Vox / bảng trắng)
- Nền trắng ngà sạch. Tiêu đề chữ đen đậm, có gạch chân đỏ vẽ tay.
- **Con số lớn có màu:** xanh lá cho "tăng/tán thành", đỏ cho "phạt/giảm", xanh dương cho tên luật.
- **Thẻ hình** có bóng đổ nhẹ. **Không dùng ảnh báo chí** (bản quyền). Dùng biểu tượng vẽ bằng code hoặc hình tự tạo.
- Bàn tay cầm bút dạ vẽ biểu tượng (giấy tờ, cân công lý…), tô vàng bằng bút dạ, gạch đỏ số cũ.
- **Phụ đề cháy chữ** ở dưới (dải xám đậm, chữ trắng), khớp từng câu theo mốc thời gian của giọng đọc.
- Mọi hình đều vẽ bằng code (`vox/vox.html` là mẫu đầu tiên), chi phí hình $0.

## Nội dung
- Dài 1–2 phút. Mỗi video một ý chính: luật gì, thay đổi gì, ảnh hưởng ai, từ khi nào.
- Câu ngắn, dễ hiểu, như nói chuyện.
- **Bắt buộc trên màn hình:** số hiệu văn bản, ngày thông qua, ngày có hiệu lực, nguồn (góc dưới).
- Kết video luôn có câu: "Nội dung chỉ mang tính thông tin, không phải tư vấn pháp lý."
- **Kiểm chứng:** mỗi con số phải có nguồn chính thống (Cổng thông tin Chính phủ, Quốc hội, Công báo, thuvienphapluat.vn, luatvietnam.vn). Chủ kênh đọc lại trước khi đăng.

## Cập nhật theo ý chủ kênh (25/11/2026, phiên kênh luật)
- **Đề tài:** những luật nhiều người quan tâm: kinh doanh, thuế, bất động sản, phạt giao thông, lao động, hình sự. (Chủ kênh đã cho làm lại bất động sản.)
- **Trình bày kiểu sơ đồ:** ô nối ô bằng mũi tên, đi từng ô một cho tới khi ra cả sơ đồ. **Màu chủ đạo là đỏ:** viền ô đỏ, chữ đen, nền màu giấy.
- **Bỏ bàn tay, chỉ giữ cây bút dạ** vẽ mũi tên và gạch chân.
- **Dùng ảnh thật từ Unsplash** (ghi tác giả trong `sources.md`); không dùng ảnh rõ mặt người gắn với hành vi vi phạm. Vẫn không dùng ảnh báo chí.
- **Tiết tấu nhanh:** giọng đọc nhanh hơn 15%, khoảng nghỉ giữa các đoạn 0,3–0,5 giây, không để quá 2 giây mà không có gì mới hiện ra.
- **Hơi hài cho dễ hiểu:** một hai câu đùa nhẹ mỗi video; không đùa về con số, không giễu cơ quan nhà nước.
- **Luôn có phần "Bạn nên làm gì?"** (ô viền xanh lá, dấu tích) trước câu lưu ý cuối video.
- **Giọng đọc:** giọng nam, mã ElevenLabs `ywBZEqUhld86Jeajq94o` (chủ kênh gửi), model eleven_v3.
- Khung dựng: `luat/pipeline/vox/` (xem README ở đó). Tập mẫu: `luat/episodes/BLHS2026_diem_moi/`.
