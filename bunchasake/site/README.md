# Bunchasake – website demo

- `index.html`: trang hoàn chỉnh (hướng Brand Builder), mở thẳng bằng trình duyệt, không cần build.
- `page.html`: cùng nội dung, bản dùng để đăng xem trước (không có thẻ html/head/body).
- `work/`: ảnh dự án, lấy từ repo `Trangmora/ai-agency-for-bussiness` và đã nén lại.

Danh sách dự án nằm trong mảng `projects` ở cuối file. Thêm dự án mới bằng cách thêm một dòng vào mảng đó.
Form liên hệ hiện chỉ là demo, chưa gửi dữ liệu đi đâu.

## Bản 3D
- `index-3d.html` / `page-3d.html`: bản thử 3D (three.js r128 từ cdnjs). Đầu trang có khối 3D tự xếp thành công trình; Brand Lab hiển thị hộp sản phẩm 3D xoay được.
- Hai file này được tạo từ `page.html` bằng `python3 make3d.py page.html page-3d.html`. Sửa nội dung ở `page.html` rồi chạy lại lệnh này để bản 3D cập nhật theo.
