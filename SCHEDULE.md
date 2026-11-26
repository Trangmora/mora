# Lịch đăng (4 ngày một video dài, chủ kênh chốt 25/11/2026)
- **YouTube và Facebook:** đăng nguyên video. Bản tiếng Việt 19:00 giờ Việt Nam, bản tiếng Anh 07:00 sáng hôm sau (19:00 giờ New York). YouTube để **public**.
- **Các phần cắt ngang 1 phút kiểu cũ đã hủy** (chủ kênh yêu cầu 26/11). Thay bằng video ngắn dọc toàn màn hình, xem cuối file.
- **Buffer (TikTok, X) gói miễn phí chỉ cho 10 bài hẹn giờ mỗi kênh.** Bài chưa hẹn được nằm trong `pipeline/publish/buffer_pending.json`; chạy `python3 pipeline/publish/buffer_topup.py` khi hàng chờ vơi (khoảng 02/12 và 06/12).
- File đăng nằm trên Cloudflare R2, bucket `asian-myths-media`. **Chỉ xóa sau 17/12/2026.**

| Ngày (giờ VN) | Tập | Kênh | Trạng thái |
|---|---|---|---|
| **27/11 19:00** | Vụ án Lệ Chi Viên (chỉ có bản VI) | YouTube Ridiculous Case, Facebook Mora Media | đã hẹn giờ |
| **29/11 19:00** | Khổng Tử (VI) | YouTube Ridiculous Case, Facebook Mora Media | đã hẹn giờ |
| 30/11 07:00 | Khổng Tử (EN) | YouTube Asian Myths & Culture, Facebook Ridiculous Case | đã hẹn giờ |
| 30/11 đến 03/12 | Khổng Tử (EN), 8 phần 1 phút, mỗi ngày 2 phần (07:00 và 19:00) | Instagram, Threads, TikTok, X | đã hẹn giờ |
| **01/12 19:00** | Điện Biên Phủ (chỉ có bản VI) | YouTube Ridiculous Case, Facebook Mora Media | đã hẹn giờ |
| **03/12 19:00** | Samurai (VI) | YouTube, Facebook | đã hẹn giờ |
| 04/12 07:00 | Samurai (EN) | YouTube, Facebook | đã hẹn giờ |
| 04/12 đến 07/12 | Samurai (EN), 4 phần 1 phút, mỗi ngày 1 phần | Instagram, Threads: đã hẹn. TikTok, X: phần 1 đã hẹn, phần 2–4 chờ Buffer | một phần |
| **07/12 19:00** | Lão Tử (VI) | YouTube, Facebook | đã hẹn giờ |
| 08/12 07:00 | Lão Tử (EN) | YouTube, Facebook | đã hẹn giờ |
| 08/12 đến 11/12 | Lão Tử (EN), 5 phần 1 phút | Instagram, Threads: đã hẹn. TikTok, X: chờ Buffer | một phần |
| **11/12 19:00** | 47 Rōnin (VI) | YouTube, Facebook | đã hẹn giờ |
| 12/12 07:00 | 47 Rōnin (EN) | YouTube, Facebook | đã hẹn giờ |
| **15/12 19:00** | Sông Hằng (VI) | YouTube, Facebook | đã hẹn giờ |
| 16/12 07:00 | Sông Hằng (EN) | YouTube, Facebook | đã hẹn giờ |
| **19/12** | Geisha (Iwasaki Mineko) | | kịch bản mẫu, chưa dựng |
| **23/12** | Trà đạo | | chưa có kịch bản |

## Video ngắn dọc (mỗi ngày một video trên mỗi kênh)
Tiếng Việt 11:30 giờ VN (YouTube Shorts Ridiculous Case, Facebook Mora Media). Tiếng Anh 08:00 giờ VN (YouTube Shorts Asian Myths & Culture, Instagram, Threads, TikTok, X). ID bài đã hẹn: `pipeline/publish/scheduled_shorts.json`.

| Ngày | Video ngắn | Trạng thái |
|---|---|---|
| 26/11 | Học phí của Khổng Tử | đã hẹn giờ |
| 27/11 | Ngày mặt trời biến mất (Amaterasu) | đã hẹn giờ |
| 28/11 | Ai tìm ra thuốc súng? | đã hẹn giờ |
| 29/11 | Tia nước trên đầu thần Shiva | đã hẹn giờ |
| 30/11 | Bị gọi là chó lạc nhà | đã hẹn giờ |
| 01/12 | Vị thần của sĩ tử | đã hẹn giờ |
| 02/12 | Vì sao sumo tung muối? | đã hẹn giờ |
| 03/12 | Dữ hơn cả hổ | đã hẹn giờ |
| 04/12 | Người Khổng Tử không hiểu nổi | đã hẹn giờ |
| 05/12 | Cuộc tụ họp lớn nhất hành tinh (Kumbh Mela) | đã hẹn giờ |
| 06/12 | Bí mật cổng torii | đã hẹn giờ; TikTok và X chờ Buffer |
| 07/12 | Ngày sách bị đốt | đã hẹn giờ; TikTok và X chờ Buffer |
| 08/12 | Viết xong rồi biến mất (Lão Tử) | đã hẹn giờ; TikTok và X chờ Buffer |
| 09/12 | Dòng sông có quyền như người? | đã hẹn giờ; TikTok và X chờ Buffer |
| 10/12 | Ngôi đền 20 năm dựng lại (Ise) | đã hẹn giờ; TikTok và X chờ Buffer |

Buffer gói miễn phí chỉ giữ 10 bài hẹn giờ mỗi kênh. 10 bài TikTok và X của 06–10/12 nằm trong `pipeline/publish/buffer_pending.json`; đã đặt nhắc việc ngày 01/12 và 05/12 để chạy `buffer_topup.py`.
