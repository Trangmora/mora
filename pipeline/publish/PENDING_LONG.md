# ĐÃ CHẠY XONG ngày 26/11/2026 (16 bài, ID trong scheduled_ids.json). Đừng chạy lại kẻo đăng trùng.
Video + ảnh bìa đã ở R2, thư mục f806673a4d5b. Chạy từ thư mục gốc repo:
```
export R=f806673a4d5b; S=pipeline/publish/schedule_long.py
python3 $S lcv en episodes/vn03-le-chi-vien/description.md VN03_LeChiVien_en.mp4 lcv_thumb_en.jpg 2026-11-28T00:00:00Z "Vietnam,history,Nguyen Trai,mystery,Asian culture"
python3 $S dbp en episodes/vn04-dien-bien-phu/description.md VN04_DienBienPhu_en.mp4 dbp_thumb_en.jpg 2026-12-02T00:00:00Z "Dien Bien Phu,Vietnam,history,military history,Asian culture"
python3 $S ll vi episodes/vn02-le-loi/description.md VN02_LeLoi_vi.mp4 ll_thumb_vi.jpg 2026-12-19T12:00:00Z "Lê Lợi,Hồ Gươm,lịch sử Việt Nam,truyền thuyết"
python3 $S ll en episodes/vn02-le-loi/description.md VN02_LeLoi_en.mp4 ll_thumb_en.jpg 2026-12-20T00:00:00Z "Vietnam,legend,Hanoi,history,Asian culture"
python3 $S th vi episodes/th01-thai-lan-khong-bi-do-ho/description.md TH01_ThaiLan_vi.mp4 th_thumb_vi.jpg 2026-12-23T12:00:00Z "Thái Lan,Xiêm,lịch sử châu Á,Đông Nam Á"
python3 $S th en episodes/th01-thai-lan-khong-bi-do-ho/description.md TH01_ThaiLan_en.mp4 th_thumb_en.jpg 2026-12-24T00:00:00Z "Thailand,Siam,history,Southeast Asia,Asian culture"
python3 $S mm vi episodes/mm01-myanmar/description.md MM01_Myanmar_vi.mp4 mm_thumb_vi.jpg 2026-12-27T12:00:00Z "Myanmar,Bagan,lịch sử châu Á,Đông Nam Á"
python3 $S mm en episodes/mm01-myanmar/description.md MM01_Myanmar_en.mp4 mm_thumb_en.jpg 2026-12-28T00:00:00Z "Myanmar,Burma,Bagan,history,Asian culture"
```
Myanmar: kiểm tra tin mới trước 27/12. Sau đó: cập nhật SCHEDULE.md (giữ file R2 tới hết 28/12), short hằng ngày từ 11/12.
Không đăng vào kênh "Hiểu luật 2 phút".
