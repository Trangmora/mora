# Bunchasake – website

- `index.html`: trang chủ đang chạy ở bunchasake.com (bản có video ở ô Logo của Brand Lab). Được tạo từ `page-3d.html`.
- `page.html`: nguồn nội dung chính. Sửa nội dung ở đây.
- `page-3d.html`: tạo từ `page.html` bằng `python3 make3d.py page.html page-3d.html` (thêm video vào ô Logo).
- `work/`: ảnh dự án và video `lab-video.mp4`.

Danh sách dự án nằm trong mảng `projects` trong `page.html`. Thêm dự án mới bằng cách thêm một dòng vào mảng đó.
Liên hệ: chỉ dùng email hello@bunchasake.com (không có form).
Cloudflare Pages tự deploy thư mục này khi push lên nhánh production.
