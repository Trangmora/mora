# Kênh "Story of the Company"

Kênh kể chuyện **các công ty đã làm như thế nào**: họ kiếm tiền ra sao, những thương vụ lớn, cú vươn lên, bê bối, sụp đổ, và bài học tài chính cho người xem.
Giọng kể: chủ kênh tự đọc (tiếng Việt, xưng "mình – các bạn"). Đây là kênh riêng, tách khỏi kênh văn hoá, kênh luật và kênh Lịch sử Thế giới.

## Định dạng
- Video dài 16:9 (1920×1080, 30 fps), 8–15 phút; mỗi video dài cắt 3–5 Shorts.
- Cấu trúc gợi ý: câu hỏi gây tò mò → công ty bán gì / kiếm tiền thế nào → tiền đi đâu → lời hay lỗ → rủi ro / canh bạc → tóm tắt 3 ý → gợi mở tập sau.
- Luôn ghi "không phải lời khuyên đầu tư".

## Phong cách hình (đã được chủ kênh duyệt hướng đi – bản thử "video1_fast")
Tham chiếu: kênh giải thích tài chính kiểu How Money Works, nhưng **không sao chép** (nền, màu, bố cục phải khác).
- **Nhịp nhanh:** đổi cảnh mỗi 2–4 giây; hình **tràn khung**, luôn zoom/lia chậm; camera "dí" vào chi tiết đúng lúc nói.
- **Chữ khoá ĐỎ** (#e3262f) trên dải giấy xé trắng ở 1/3 dưới, chữ to, ít chữ.
- **Nét vẽ tay ĐỎ có cử động** (nét "rung" 10 lần/giây): khoanh tròn, mũi tên cong, gạch chân lượn sóng, tia "bùng nổ";
  **vẽ tay chân + mặt cho đồ vật** (con số, nhãn, con dấu, dấu hỏi…) để chúng vẫy tay, đi bộ, nhảy, buồn/vui/ngạc nhiên.
- **Sơ đồ** để giải thích: hộp viền vẽ tay + mũi tên (A → B → C), so sánh hai cột, dòng tiền vòng tròn.
- **Cảm giác công nghệ:** chuyển cảnh nhiễu số (glitch), khung ngắm 4 góc, dòng chữ máy (JetBrains Mono) góc trên "● TAG // TAG", đồng hồ timecode góc dưới.
- **Nền:** ảnh thật tràn khung, hoặc tờ giấy trắng chấm lưới trên bàn gỗ sáng.
- **Tiêu đề báo thật** (nguyên văn, chỉ ghi tên báo bằng chữ, KHÔNG dùng logo); **trích tài liệu thật** (vd. hồ sơ S-1) có tô vàng.
- Nhân vật MC hoạt hình: tuỳ chủ kênh (bản nhịp nhanh hiện không dùng MC để hình tràn khung).

## Âm thanh (chủ kênh dặn: giống video gốc, KHÔNG nhiều âm)
- Giọng chủ kênh là chính. Nhạc nền **rất nhỏ** (~ -31 dB, tự nhỏ thêm khi có giọng); chỗ ngắt gần như im lặng.
- Gần như **không tiếng động**: chỉ "vút" rất nhẹ khi chuyển cảnh (0.12) và tiếng "dập" nhẹ cho con dấu.
- Nhạc tạo bằng ElevenLabs Music (không lấy nhạc có bản quyền của kênh khác).

## Quy trình một tập
1. Nghiên cứu + kiểm chứng (WebSearch; ghi nguồn). Viết lời thoại dễ hiểu (ví dụ đời thường: bán điện, quán phở, Grab/Shopee…).
2. Chủ kênh thu âm → gửi file.
3. Nhận dạng giọng: ElevenLabs scribe_v1 (mốc từng chữ).
4. Cắt gọn giọng: `pipeline/vox/edit_voice.py` + file KEEP (giữ câu/cụm chữ; tự bỏ "ờ, ờm, ừm"; rút khoảng lặng). Xem mẫu `pipeline/vox/ep1_keep.py`.
5. Kịch bản hình theo mốc lời: mẫu `pipeline/vox/ep1_fast.py` (danh sách cảnh, hàm `A(câu, "cụm chữ", lệch)` lấy thời điểm).
6. Dựng: `pipeline/vox/fast.py` (bộ dựng nhịp nhanh) + `pipeline/vox/engine.py` (phần tử, trộn âm) + `pipeline/vox/vox.py`.
7. Gửi bản thử 30–60 giây cho chủ kênh duyệt trước khi dựng cả tập.

## Nguồn ảnh
- Ảnh minh hoạ: Unsplash API (đã có key qua proxy), tải bản HD `urls.raw&w=2200` cho cảnh tràn khung; gọi `download_location` khi tải; ghi tên tác giả.
- Ảnh người thật: **Wikimedia Commons** (giấy phép public domain / CC0 / CC BY…; ghi tác giả + giấy phép trong mô tả).
  KHÔNG lấy ảnh từ Google Images (bản quyền).
  Lưu ý kỹ thuật: dùng User-Agent riêng; Wikimedia hay trả 429 → chờ/giãn cách; ảnh thu nhỏ ở thumb.wikimedia.org bị chặn → tải ảnh gốc ở upload.wikimedia.org rồi tự thu nhỏ.
- Chưa có video thật (Pexels/Pixabay bị chặn mạng) → dùng ảnh thật + zoom chậm.

## Bài học kỹ thuật
- Font Pangolin / Be Vietnam Pro **không có** ①②③, →, ↓, ↑ → dùng "1.", "=", chữ thường.
- cairosvg không hỗ trợ `paint-order` → vẽ viền chữ bằng hai lớp.
- ElevenLabs tối đa 6 yêu cầu đồng thời.
- Dựng 14 phút mất ~40 phút (4 luồng).

## Đăng bài
- Kênh chưa có tài khoản riêng → KHÔNG đăng lên tài khoản của kênh văn hoá (ALLOWED trong pipeline/publish/morapost.py) hay kênh luật.

## Chủ đề gợi ý
Anthropic (Claude) kiếm tiền thế nào & cơ cấu quyền lực (đã có giọng 2 tập) · Nvidia & Jensen Huang · OpenAI từ phi lợi nhuận đến công ty · FTX sụp đổ · Netflix suýt phá sản · Amazon sống sót bong bóng dot-com · Apple trở lại nhờ iPhone · Tesla · Nokia/Kodak lụi tàn · Grab/Shopee chịu lỗ giành khách · Vinamilk/Vingroup (cẩn trọng pháp lý).
