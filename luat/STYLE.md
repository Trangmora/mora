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
- Dài tối thiểu khoảng 2 phút (xem cập nhật bên dưới). Mỗi video một vấn đề: luật gì, thay đổi gì, ảnh hưởng ai, từ khi nào.
- Câu ngắn, dễ hiểu, như nói chuyện.
- **Bắt buộc trên màn hình:** số hiệu văn bản, ngày thông qua, ngày có hiệu lực, nguồn (góc dưới).
- Kết video luôn có câu: "Nội dung chỉ mang tính thông tin, không phải tư vấn pháp lý."
- **Kiểm chứng:** mỗi con số phải có nguồn chính thống (Cổng thông tin Chính phủ, Quốc hội, Công báo, thuvienphapluat.vn, luatvietnam.vn). Chủ kênh đọc lại trước khi đăng.

## Cập nhật theo ý chủ kênh (25/11/2026, phiên kênh luật)
- **Đề tài:** những luật nhiều người quan tâm: kinh doanh, thuế, bất động sản, phạt giao thông, lao động, hình sự. (Chủ kênh đã cho làm lại bất động sản.)
- **Trình bày kiểu sơ đồ:** ô nối ô bằng mũi tên, đi từng ô một cho tới khi ra cả sơ đồ. **Màu chủ đạo là đỏ:** viền ô đỏ, chữ đen, nền màu giấy.
- **Bỏ bàn tay, chỉ giữ cây bút dạ** vẽ mũi tên và gạch chân.
- **Dùng ảnh thật từ Unsplash** (ghi tác giả trong `sources.md`); không dùng ảnh rõ mặt người gắn với hành vi vi phạm. Vẫn không dùng ảnh báo chí.
- **Tiết tấu nhanh:** giọng đọc nhanh hơn 15%, khoảng nghỉ giữa các đoạn 0,3–0,5 giây, hình mới hiện ra đều theo lời đọc.
- **Nghiêm túc, không đùa** (chủ kênh đổi ý sau khi xem bản thử có câu đùa): giọng trung lập, giải thích cho dễ hiểu.
- **Một video một vấn đề.** Ví dụ tội làm nhục người khác là một video riêng, không gộp với tội khác của cùng bộ luật.
- **Dài tối thiểu khoảng 2 phút**, giải thích kỹ luật nói gì: văn bản nào, khái niệm là gì, quy định từng ý, so với trước, áp dụng từ khi nào, bạn nên làm gì.
- **Luôn có phần "Bạn nên làm gì?"** (ô viền xanh lá, dấu tích) trước câu lưu ý cuối video.
- **Giọng đọc:** giọng nam, mã ElevenLabs `ywBZEqUhld86Jeajq94o` (chủ kênh gửi), model eleven_v3.
- **Nhạc nền:** mặc định không dùng (chủ kênh chốt 25/11/2026). Chủ kênh đang xem thử một bản có nhạc lên xuống theo chỗ nghỉ (`BLHS2026_lam_nhuc_vi_nhac.mp4`); chờ chủ kênh quyết.
- Khung dựng: `luat/pipeline/vox/` (xem README ở đó). Tập mẫu: `luat/episodes/BLHS2026_lam_nhuc/`.

## Kênh đăng (26/11/2026)
- **Kênh YouTube:** "Hiểu Luật 2 Phút", mã kênh `UCsgNKzFknzaH0lqNz-ivNfQ`. Chỉ đăng lên kênh này (chủ kênh dặn). Key Morapost của kênh có nhìn thấy cả kênh khác, nên khi đăng luôn truyền đúng mã này.
- **Đăng qua Morapost** trong môi trường "Kênh luật – Morapost": `python3 luat/publish/post_schedule.py run --account UCsgNKzFknzaH0lqNz-ivNfQ`. Mỗi ngày đúng một video, 09:00 sáng giờ Việt Nam, công khai (xem mục "Lịch đăng" bên dưới). Ngày 27/11/2026 đã xếp lại 41 video thành mỗi ngày một video 09:00, từ 28/11/2026 đến 07/01/2027; post_id ghi trong `luat/publish/schedule.json`.

## Đăng bài (chủ kênh chốt 26/11/2026)
- **Kênh luật CHỈ đăng lên YouTube "Hiểu Luật 2 Phút"** (account_id `UCsgNKzFknzaH0lqNz-ivNfQ`). Tuyệt đối không đăng lên các tài khoản của kênh văn hóa, dù key Morapost (dùng chung) nhìn thấy chúng: YouTube Ridiculous Case, YouTube Asian Myths & Culture, Facebook Ridiculous Case, Facebook Mora Media, Instagram asian_myths, Threads.
- Script `luat/publish/post_schedule.py` tự từ chối mọi mã kênh khác.
- Lịch: mỗi ngày một video, 09:00 sáng giờ Việt Nam, công khai (chủ kênh chốt 27/11/2026; trước đó 2 ngày một video lúc 19:00). Mô tả luôn có mục "Thông tin tham khảo, nguồn" (tên báo, tiêu đề, link) và dòng "🔎 Từ khóa" cùng hashtag theo chủ đề (chủ kênh dặn 26/11/2026); không nhắc giọng AI hay ElevenLabs.
- Mỗi sáng 06:47 có nhiệm vụ tự động săn luật mới: đạt chuẩn thì làm video, chiếm suất 09:00 hôm đó, các video trong lịch tự lùi một ngày (`post_schedule.py reflow`). Nhật ký ở `luat/publish/trend_log.md`.

## Lịch đăng: TỐI ĐA MỘT VIDEO MỘT NGÀY (chủ kênh chốt 27/11/2026)
Ngày 26–27/11/2026 kênh bị lên nhiều video trong một ngày và hai video trùng đề tài (hương ước, Nghị định 420/2026), do nhiều phiên cùng "đăng luôn" mà không thấy bài của nhau. Từ nay:
- **Tin trong ngày đăng trong ngày (chủ kênh dặn 28/11/2026, để tăng view).** Chủ đề gắn với một ngày (văn bản ban hành, thông qua hoặc có hiệu lực hôm đó, hoặc báo đang đưa tin hôm đó) phải lên kênh ĐÚNG ngày đó: kịp thì 09:00 (chạy `reflow` để video lịch lùi một ngày); nếu làm xong sau 9 giờ thì vẫn đăng trong ngày, 30 phút sau khi xong (mục có `"trend": true`, script cho phép thêm một video trong ngày). Video về văn bản có hiệu lực vào một ngày sắp tới thì xếp `at` = 09:00 đúng ngày hiệu lực.
- **Video thường không "đăng luôn", không hẹn "30 phút sau".** Mọi video lên lúc 09:00, mỗi ngày một video. Video thường: xếp vào ngày trống sớm nhất (`python3 luat/publish/post_schedule.py next-slot`). Video bắt trend: thêm `"trend": true`, `at` = 09:00 ngày gần nhất còn kịp, đăng, rồi chạy `python3 luat/publish/post_schedule.py reflow --from <ngày đó>` để các video sau lùi một ngày.
- **Trước khi chọn đề tài:** `git pull` nhánh `claude/law-channel`, tìm số hiệu văn bản trong `luat/publish/schedule.json` và `luat/episodes/` để tránh trùng.
- **Giữ chỗ trước, đăng sau:** thêm mục vào `schedule.json` (post_id null) → commit + push ngay → rồi mới chạy `post_schedule.py run`. Push bị từ chối thì pull, gộp, chạy lại `next-slot` nếu ngày đã bị phiên khác lấy.
- `post_schedule.py` tự từ chối khi ngày đó đã có video, hoặc khi cùng văn bản đã có trong lịch (tập thứ hai cố ý về cùng văn bản: thêm `--allow-same-law`).
- Mọi bài đã đăng hoặc đã hẹn phải có trong `schedule.json` kèm post_id; bài đăng ngoài lịch thì ghi bổ sung ngay.
