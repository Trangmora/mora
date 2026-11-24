# Thư viện nhạc nền (Nhật Bản)

Ba bài nhạc chủ kênh cung cấp cho tập 1. File âm thanh **không được commit** vì là nhạc có bản quyền. Chúng chỉ nằm trên máy làm việc, và được `.gitignore` bỏ qua.

| File | Độ dài | Đặc điểm | Dùng ở |
|---|---|---|---|
| Roie_Shpigler_-_Kumiko.mp3 | 2:39 | koto, nhẹ, không lời | mở đầu, nguồn gốc, thần thoại |
| Isaku_Kageyama_-_Tokyo_Ondo.mp3 | 3:15 | lễ hội, trống, không lời | phần "điều thú vị" |
| Ian_Post_feat._Aya_Ishida_-_Manatsu_Ni_Haeru.mp3 | 3:44 | **có giọng hát** | đoạn kết, rất nhỏ khi có lời đọc |

**Cách trộn** (`pipeline/full/musicbed.py`):
- Nhạc ở mức 0,10 khi có giọng đọc, 0,60 ở khoảng nghỉ trên 0,7 giây.
- Cao trào 0,32 ở chữ "Shinto".
- Tắt hẳn ở đoạn tối đen.
- Lên nhạc trong 0,5 giây, xuống trong 0,4 giây.

Trước khi đăng, kiểm tra giấy phép từng bài có cho dùng trên YouTube không.
