# Lịch đăng (4 ngày một video dài, chủ kênh chốt 25/11/2026)
- **YouTube và Facebook:** đăng nguyên video. Bản tiếng Việt 19:00 giờ Việt Nam, bản tiếng Anh 07:00 sáng hôm sau (19:00 giờ New York). YouTube để **public**.
- **TikTok, Instagram, Threads, X (chỉ bản tiếng Anh):** cắt thành các phần khoảng 1 phút, đăng dần trong 4 ngày sau khi bản tiếng Anh lên.
- **Buffer (TikTok, X) gói miễn phí chỉ cho 10 bài hẹn giờ mỗi kênh.** Bài chưa hẹn được nằm trong `pipeline/publish/buffer_pending.json`; chạy `python3 pipeline/publish/buffer_topup.py` khi hàng chờ vơi (khoảng 02/12 và 06/12).
- File đăng nằm trên Cloudflare R2, bucket `asian-myths-media`. **Chỉ xóa sau 12/12/2026.**

| Ngày (giờ VN) | Tập | Kênh | Trạng thái |
|---|---|---|---|
| **29/11 19:00** | Khổng Tử (VI) | YouTube Ridiculous Case, Facebook Mora Media | đã hẹn giờ |
| 30/11 07:00 | Khổng Tử (EN) | YouTube Asian Myths & Culture, Facebook Ridiculous Case | đã hẹn giờ |
| 30/11 đến 03/12 | Khổng Tử (EN), 8 phần 1 phút, mỗi ngày 2 phần (07:00 và 19:00) | Instagram, Threads, TikTok, X | đã hẹn giờ |
| **03/12 19:00** | Samurai (VI) | YouTube, Facebook | đã hẹn giờ |
| 04/12 07:00 | Samurai (EN) | YouTube, Facebook | đã hẹn giờ |
| 04/12 đến 07/12 | Samurai (EN), 4 phần 1 phút, mỗi ngày 1 phần | Instagram, Threads: đã hẹn. TikTok, X: phần 1 đã hẹn, phần 2–4 chờ Buffer | một phần |
| **07/12 19:00** | Lão Tử (VI) | YouTube, Facebook | đã hẹn giờ |
| 08/12 07:00 | Lão Tử (EN) | YouTube, Facebook | đã hẹn giờ |
| 08/12 đến 11/12 | Lão Tử (EN), 5 phần 1 phút | Instagram, Threads: đã hẹn. TikTok, X: chờ Buffer | một phần |
| **11/12** | Sông Hằng (Ấn Độ) | | đang dựng |
| **15/12** | Geisha (Iwasaki Mineko) | | kịch bản mẫu, chưa dựng |
| **19/12** | 47 Ronin | | kịch bản nháp |
| **23/12** | Trà đạo | | chưa có kịch bản |
