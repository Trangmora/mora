# Kênh "Lịch sử Thế giới"

Kênh video ngắn kể chuyện lịch sử và chiến tranh bằng **bản đồ cổ động + nhân vật 2D phẳng vẽ bằng code**.
Tách riêng khỏi kênh văn hóa (Asian Culture Stories) và kênh luật (Hiểu Luật 2 Phút).

## Định dạng
- Video **ngang 1920×1080**, 30 fps (chủ kênh chốt 27/11/2026: không làm bản dọc nữa).
- Tiếng Việt (bản tiếng Anh: chưa chốt).
- Nhịp nhanh: mỗi 2–4 giây có một chuyển động mới (zoom, tô màu lãnh thổ, nhân vật vào cảnh, mũi tên, nhãn bật ra).

## Quy trình
1. Gửi **kịch bản** cho chủ kênh duyệt trước. Chưa duyệt thì không thu giọng, không dựng.
2. Kiểm chứng năm, số liệu, tên riêng trong kịch bản.
3. Thu giọng (chủ kênh dự định tự thu hoặc clone giọng mình; giọng MC Anh Đức chỉ dùng tạm), rồi mới dựng.

## Phong cách hình
- **Bản đồ cổ:** biển `#5f9a98`, đất `#dccb9c`, viền đất `#a8925f`, bóng đổ xanh đậm dưới đất liền, vân giấy và tối góc (vignette).
- **Tô lãnh thổ:** mỗi phe một màu đậm (ví dụ Đại Nam `#c8323c`), chuyển màu từ từ khi lãnh thổ đổi chủ.
- **Nhãn địa danh:** DejaVu Serif đậm, chữ vàng `#ffd54a`, viền nâu `#3b1d0a`, nghiêng nhẹ, bật ra (ease-back).
- **Nhân vật:** 2D phẳng, đầu tròn, mắt chấm, viền đậm `#262220`, ghép từ nhiều bộ phận (đầu, miệng, tay) để diễn: nhép miệng, bắt tay, giơ tay, há miệng, trợn mắt, lắc đầu, nhún.
  Trang phục đúng thời kỳ (khăn đóng/áo dài quan Nguyễn, mũ kepi sĩ quan Pháp…).
- **Phụ đề:** Inter 800, chữ trắng viền đen, 2–3 chữ mỗi cụm, giữa đáy khung ngang (y ≈ 988), khớp mốc từng chữ của giọng đọc.
- Không sao chép thiết kế nhân vật, bảng màu hay bố cục của kênh khác (kể cả kênh mẫu @GeoGlobeTales).

## Bộ công cụ (dùng chung với `pipeline/mapstory/`)
- `pipeline/mapstory/demo.py`: bản đồ, camera zoom/lia, tô lãnh thổ, nhân vật 2D, phụ đề.
- `pipeline/mapstory/ftx.py`: khung dựng hoàn chỉnh: giọng + phụ đề theo mốc chữ + dựng song song 4 luồng + ghép âm thanh.
- Giọng: `pipeline/full/tts_seg.py <story.json> vi <thư_mục> <khoảng_lặng>`; chọn giọng bằng biến `VOICE_ID`, chỉnh `STABILITY`, `STYLE`.
- Dữ liệu bản đồ (Natural Earth, không lưu trong git, tải khi dựng):
  - Quốc gia: `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson`
  - Tỉnh/bang: `.../geojson/ne_10m_admin_1_states_provinces.geojson` (khoảng 40 MB, lọc theo nước trước khi dùng).
- Kịch bản mỗi tập: `lich-su-the-gioi/stories/<tên>.json`, dạng `{"vi": [["s01", "câu 1"], ...]}`.
- Chi phí: chỉ tốn giọng ElevenLabs; hình và chuyển động đều vẽ bằng code.

## Nội dung
- Chủ đề: chiến tranh và các bước ngoặt lịch sử (Việt Nam, châu Á, thế giới).
- Kiểm chứng năm, số liệu và tên riêng trước khi thu giọng.
- Tránh: chiến tranh Việt Nam hiện đại, biên giới 1979, Biển Đông và các xung đột còn nóng.
- Ranh giới lịch sử dựng từ tỉnh hiện đại là **gần đúng**; ghi chú điều này trong mô tả video khi cần.

## Đăng bài
- **Chưa có tài khoản riêng.** Không đăng lên 6 tài khoản kênh văn hóa hay YouTube "Hiểu Luật 2 Phút".
- Khi chủ kênh tạo tài khoản, thêm danh sách tài khoản cho phép **riêng** cho kênh này (không dùng chung `ALLOWED` của kênh văn hóa).

## Lưu trữ
- Video thành phẩm: `lich-su-the-gioi/videos/` (ghi vào `lich-su-the-gioi/videos/README.md`).

## Chủ đề dự kiến
1. Hòa ước Nhâm Tuất 1862: Pháp lấy Nam Kỳ (đã có kịch bản và giọng)
2. Ba lần đánh bại quân Mông – Nguyên
3. Quang Trung đại phá quân Thanh trong 5 ngày
4. Bạch Đằng 938: cọc gỗ và thủy triều
5. Nhật thắng Nga 1905
6. Chiến tranh Nha phiến và Hồng Kông
7. Thành Cát Tư Hãn
8. Vì sao Thái Lan không bị đô hộ
9. Napoleon: từ đỉnh cao đến Waterloo
10. Vì sao Hitler thua ở Nga
