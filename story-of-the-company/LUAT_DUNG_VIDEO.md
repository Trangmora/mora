# Bộ luật dựng video – tự áp cho chính mình (Claude)

> Vai: một trong những content creator khó tính nhất thế giới. Mọi chi tiết đều phải có lý do.
> Chủ kênh duyệt ngày 28/11/2026 sau bản "Vật lý giấy cắt". Khi luật này mâu thuẫn với `STYLE.md`, theo luật này.
> Mỗi khi chủ kênh chê điều gì, thêm ngay một luật mới vào đây (ghi ngày).

## 1. Định dạng
- **Khung NGANG 1920×1080, 30 khung/giây** cho YouTube. Chỉ làm dọc khi chủ kênh xin Shorts.
- Phong cách chính: **"Vật lý giấy cắt"** (`pipeline/vox/phys.py`).
  - Mọi vật là giấy cắt có bóng đổ cùng một hướng sáng (lệch phải, xuống dưới).
  - Chữ, thẻ và đồng xu rơi và va chạm theo vật lý thật, không dùng chuyển động giả.
  - Số liệu được biến thành vật thể: 1 đồng xu = 1 đơn vị, chiều cao đống xu chính là biểu đồ.
- Bảng màu:
  - Nền giấy sách cũ kẻ ô to.
  - Chữ ĐỎ `#d7261e` và ĐEN.
  - Giấy kem `#f6f1e6`.
  - Xu vàng cho đối tượng chính, xu đỏ cho đối tượng so sánh.
  - Không dùng màu khác (đã bỏ xanh lá cho chữ "LỜI").
- Không dùng video AI. Mọi hình dựng bằng code. Chi phí tối đa 0,5 $ mỗi video.

## 2. Cắt giọng (người xem phải hiểu, không phải nghe hết)
1. **Giữ:**
   - mọi câu mang thông tin (số liệu, định nghĩa, lý do, ví dụ);
   - câu hỏi dẫn dắt (mở vòng tò mò);
   - lời chào ngắn.
2. **Cắt:**
   - tiếng đệm (ờ, ờm, ừm, à – tự động);
   - câu vấp hoặc nói lại ("mà lại", "công ty, ờ, chính của…");
   - câu lặp ý ("Đó là một con số khổng lồ và một con số mà…");
   - câu rào đón hoặc chung chung ("muốn mở kênh để chia sẻ", "câu chữ có thể không trọn vẹn");
   - **NGOẠI LỆ – KHÔNG BAO GIỜ CẮT đoạn giới thiệu Trang** (lời chào, founder, làm tài chính, MBA tại Ý, việc mỗi ngày tổng hợp – nghiên cứu thông tin, lý do mở kênh, mong mang lại giá trị cho cộng đồng): giữ NGUYÊN TOÀN BỘ như chủ kênh đọc (yêu cầu ngày 28/11). Hình cho đoạn này: cảnh mở màn gợi chủ đề + cảnh "kênh này để chia sẻ" (thẻ chữ về nội dung kênh, không phải về cá nhân). Đoạn này chỉ nói bằng giọng, KHÔNG hiện ảnh, tên hay chức danh lên hình.
3. **Không:**
   - cắt giữa một con số hoặc một tên riêng;
   - cắt làm câu sai ngữ pháp;
   - đảo thứ tự làm sai logic.
4. **Bỏ chữ "thì" đứng đầu câu** ("Thì thứ nhất là…" → "Thứ nhất là…") – tự động trong `edit_voice.py` (chủ kênh yêu cầu 28/11). "Thì" giữa câu giữ nguyên.
4b. **Chỗ nối hai cụm đã cắt** luôn chừa tối thiểu 0,3 giây cho tự nhiên (đã cài trong `edit_voice.py`).
5. **Phần mở đầu:** giữ nguyên đoạn giới thiệu Trang. Trong lúc đó, hình phải là cảnh mở chủ đề hấp dẫn (hook bằng hình) để giữ người xem.
6. Mọi quyết định cắt ghi chú lý do ngay trong `ep*_keep.py` để chủ kênh xem lại được.
7. Nếu lời đọc **sai số liệu**, không sửa bằng hình. Báo chủ kênh để thu lại câu đó. Ví dụ: "13 lần" trong khi số liệu S-1 cho khoảng 11,8 lần.

## 3. Hình phải khớp lời
- Mỗi vật xuất hiện **đúng chữ** được nói (lấy mốc từng chữ, lệch tối đa ±0,3 giây). Vật rơi phải bắt đầu rơi khoảng 0,45 giây trước chữ đó để chạm đất đúng lúc.
- Một ý = một cảnh. Đổi ý thì đổi cảnh bằng chuyển trang giấy (0,4 giây).
- Không để khung hình đứng im quá 3 giây: luôn có ít nhất một chuyển động, ví dụ máy quay đẩy chậm, xu rơi hay cân chao.
- Đoạn giọng nói về bản thân chủ kênh: **không hiện ảnh, tên hay chức danh**. Dùng cảnh mở chủ đề thay thế.

## 4. Chữ trên hình
- Chữ phải đọc được trên điện thoại: tối thiểu 34 px với chữ phụ, 60 px với chữ chính, ở khung 1920 px.
- Chữ không bao giờ tràn mép giấy (thẻ tự thu cỡ). Không đè lên số hay nhãn khác. Dấu mộc nằm trên nhãn giấy kem cho dễ đọc.
- Chữ nào cũng phải là tiếng Việt có dấu đầy đủ. Không dùng ký tự font không có (→ ↓ ① …).
- Mỗi màn hình tối đa 1 ý chính + 1 ý phụ.

## 4b. Người thật trong hình (chủ kênh yêu cầu 28/11)
- Nhắc tới ai (CEO, nhà sáng lập, thành viên quỹ, đối thủ) → có **ảnh thật** của người đó trong thẻ/sơ đồ, dạng sticker đen trắng chấm báo, viền đỏ, tên + vai trò bên dưới (`person()` trong `phys_scenes.py`).
- Ảnh chỉ lấy từ nguồn có giấy phép (Wikimedia Commons CC BY / CC BY-SA / PD), lưu `people/credits.json`, và **ghi công trong mô tả video** (`story-of-the-company/videos/ghi_cong_anh.md`).
- Không có ảnh hợp lệ, hoặc ảnh quá xa/mờ/tách nền vỡ → dùng **hình bóng giấy + tên**, không dùng ảnh trôi nổi.
- Font không có "→": viết bằng chữ (tự động thay bằng "»" nếu lỡ dùng).

## 5. Âm thanh
- **Nhạc nền rất nhỏ** (−31 dB), tự hạ khi có giọng.
- Hiệu ứng chỉ là **tiếng vật thật, nhỏ**:
  - tiếng xu khi chạm, có giới hạn mật độ;
  - tiếng giấy rơi;
  - tiếng lướt nhẹ khi chuyển trang.
- **CẤM tiếng va mạnh, tiếng "bùm"** (chủ kênh chê ngày 28/11). Dấu mộc, vật to rơi xuống cũng chỉ dùng tiếng giấy.
- Không có tiếng nào to hơn giọng nói.

## 6. Sự thật
- **Tự kiểm chứng trước, không đẩy việc cho chủ kênh** (chủ kênh yêu cầu 28/11). Mỗi con số, nhận định trong lời đọc:
  tìm ≥ 2 nguồn (ưu tiên hồ sơ gốc như S-1/EDGAR, cơ quan thống kê, báo cáo khảo sát gốc), ghi lại nguồn và độ lệch giữa các nguồn.
  - Đúng → hiện lên hình kèm dòng "Nguồn: …" cụ thể (tên báo cáo, thời điểm).
  - Sai rõ ràng → cắt câu đó khỏi giọng (nếu không làm gãy logic) hoặc báo chủ kênh thu lại; không bao giờ để hình nói ngược lời.
  - Chưa kiểm được → không hiện số lên hình, hoặc hiện kèm "ước tính" và báo chủ kênh.
  - Ví dụ 28/11: "13 lần" ĐÚNG (6T/2025 1,2 tỷ $ → 6T/2026 16,3 tỷ $); "89% của 1.500 lãnh đạo" ĐÚNG (Cloudera 2026);
    "895 tỷ gần bằng giá trị công ty" SAI (≈ 60%) → đã cắt câu.
- Mọi con số trên hình phải có nguồn, ghi dòng nhỏ góc dưới trái ("Nguồn: …").
- Nhận định của chủ kênh (ví dụ "kỷ lục ngành AI") được phép xuất hiện, nhưng phải báo chủ kênh nếu chưa kiểm được độc lập.
- So sánh phải đúng tỉ lệ: số đồng xu tỉ lệ với số thật. Ví dụ 150 xu = 1.500 tỷ $, 51 xu ≈ 514 tỷ $.
- Ảnh người thật chỉ lấy từ nguồn có giấy phép (Wikimedia, Unsplash) và lưu credits.

## 7. Kiểm tra trước khi gửi (bắt buộc)
1. Xem khung hình mẫu ở mọi cảnh và mọi chỗ chuyển trang. Tìm lỗi: chữ tràn, đè, cắt mép, vật kẹt, khoảng trống chết.
2. Kiểm tra vật lý: đồng xu đều rơi đến đích, số đếm cuối khớp số thật.
3. Kiểm tra âm lượng tổng (khoảng −19 dB trung bình, đỉnh dưới −1 dB).
4. Tự sửa hết lỗi tìm được rồi mới gửi. Báo rõ những gì còn cần chủ kênh quyết.
5. Không đưa file giọng của chủ kênh lên git.
