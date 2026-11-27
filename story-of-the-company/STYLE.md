# Kênh "Story of the Company"

> **Đọc trước: [`LUAT_DUNG_VIDEO.md`](LUAT_DUNG_VIDEO.md)** – bộ luật dựng video (28/11/2026): khung ngang, phong cách "Vật lý giấy cắt", luật cắt giọng, âm thanh (cấm tiếng "bùm"), kiểm tra trước khi gửi.

Kênh kể chuyện **các công ty đã làm như thế nào**: họ kiếm tiền ra sao, những thương vụ lớn, cú vươn lên, bê bối, sụp đổ, và bài học tài chính cho người xem.
Giọng kể: chủ kênh tự đọc (tiếng Việt, xưng "mình – các bạn"). Đây là kênh riêng, tách khỏi kênh văn hoá, kênh luật và kênh Lịch sử Thế giới.

## Định dạng
- Video dài 16:9 (1920×1080, 30 fps), 8–15 phút; mỗi video dài cắt 3–5 Shorts.
- Cấu trúc gợi ý: câu hỏi gây tò mò → công ty bán gì / kiếm tiền thế nào → tiền đi đâu → lời hay lỗ → rủi ro / canh bạc → tóm tắt 3 ý → gợi mở tập sau.
- Luôn ghi "không phải lời khuyên đầu tư".

## Phong cách hình (chủ kênh CHỐT ngày 27/11/2026: "Vox sạch" theo video mẫu thứ 3)
Bỏ các thử nghiệm trước (trang giấy chấm lưới nhiều chi tiết nhỏ; nét vẽ đỏ có tay chân; HUD/glitch) – chủ kênh KHÔNG thích.
- **Nền:** xám ấm (#dbd8d2) có lưới ô vuông rất mảnh (bước 64 px), vân giấy nhẹ, tối nhẹ ở góc.
- **Ảnh thật:** chuyển **đen trắng tương phản + chấm in báo (halftone)**, phía sau có **mảng màu cam/đỏ lệch** như ảnh cắt dán; đặt hơi nghiêng; zoom rất chậm.
- **Mẩu báo:** tờ báo nền kem đặt nghiêng, tên báo kiểu serif, **tiêu đề thật (nguyên văn)**, **tô vàng** cụm quan trọng, cột chữ xám giả lập. Không dùng logo báo.
- **Con số lớn:** chữ **đen đậm** cỡ rất lớn + **biểu tượng phẳng màu cam** bên trái + **chú thích nhỏ in hoa** bên dưới (vd. "$116 / PER BARREL").
- **Biểu đồ:** **thẻ nền kem bo góc**, lưới mảnh, đường **cam** tự vẽ ra từng điểm (đường so sánh màu xám), nhãn số trên điểm.
- **Tiêu đề / nhãn:** chữ đen đậm + gạch dưới cam; chú thích phụ màu cam in hoa.
- **Bảng màu:** xám ấm, đen #1c1c1c, cam #e8762b, kem #f6f1e6, vàng tô #f7d23e. Tối giản, nhiều khoảng thở.
- **Nhịp:** đổi cảnh 2–4 giây, mỗi cảnh **một ý**, chuyển cảnh gọn (cắt/mờ nhanh), zoom chậm.
- Bộ dựng: `pipeline/vox/clean.py` (nền, ảnh halftone, mẩu báo, con số + biểu tượng, thẻ biểu đồ). Kịch bản cảnh theo mốc lời: xem `pipeline/vox/ep1_fast.py` (hàm A()).
- Tài liệu tham khảo cách cắt giọng/ trộn âm: `pipeline/vox/edit_voice.py`, `pipeline/vox/engine.py` (mix_audio).

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
- Tài nguyên sẵn có trong repo: `story-of-the-company/assets/` (audio: nhạc + tiếng động ElevenLabs; photos: ảnh Unsplash HD + credits; people: ảnh Wikimedia + credits).
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
