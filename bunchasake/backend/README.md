# Nhận form + email báo + trang admin

Khi khách gửi form trên bunchasake.com (Đặt lịch gọi hoặc Gửi câu chuyện):

1. Thông tin được lưu thành 1 dòng trong Google Sheet.
2. Một email báo được gửi về **trangworkss@gmail.com** (bấm Reply là trả lời thẳng cho khách nếu khách để email).
3. Trang `site/admin.html` hiển thị danh sách khách, số khách mới, lịch gọi sắp tới, và nút "Đánh dấu đã liên hệ".

Không cần server riêng. Miễn phí (Gmail thường gửi tối đa ~100 email/ngày qua Apps Script).

## Cài đặt (khoảng 10 phút, đăng nhập bằng trangworkss@gmail.com)

1. Vào https://sheets.new tạo một Google Sheet mới, đặt tên ví dụ "Bunchasake – Khách".
2. Menu **Extensions → Apps Script**. Xoá code mẫu, dán toàn bộ nội dung `apps-script.gs`, bấm Save.
3. Đặt mã admin: biểu tượng bánh răng **Project Settings → Script Properties → Add script property**
   - Property: `ADMIN_KEY`
   - Value: một mật khẩu dài, ví dụ 20 ký tự ngẫu nhiên. Đây là mật khẩu vào trang admin.
4. Chọn hàm `testNotify` ở thanh trên, bấm **Run**, cho phép quyền (Sheets + gửi email).
   Kiểm tra: Sheet có tab "Khách liên hệ" với 1 dòng thử, và hộp thư nhận được email thử. Xoá dòng thử nếu muốn.
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Bấm Deploy, sao chép **Web app URL** (dạng `https://script.google.com/macros/s/…/exec`).
6. Dán URL đó vào website:
   - `site/page.html` (và build lại `index.html`), tìm dòng `const FORM_ENDPOINT = "";` → `const FORM_ENDPOINT = "https://script.google.com/macros/s/…/exec";`
   - Tuỳ chọn: `site/admin.html`, dòng `const DEFAULT_ENDPOINT = "";` để khỏi phải nhập URL mỗi lần.
7. Mở `bunchasake.com/admin.html`, nhập URL + mã admin. Trình duyệt sẽ nhớ cho lần sau.

Khi sửa `apps-script.gs` sau này: **Deploy → Manage deployments → Edit → Version: New version** để giữ nguyên URL.

## Ghi chú

- Khi `FORM_ENDPOINT` để trống, website chạy ở chế độ demo (hiện dòng "This is a demo…" và không gửi gì).
- Bản xem trước trên claude.ai không gửi được ra ngoài (trình duyệt chặn), chỉ hoạt động khi website được host thật.
- Chống spam: có ô ẩn (honeypot) và giới hạn 20 lần gửi / 10 phút.
- Trang admin có `noindex`, nhưng ai có URL Web App **và** mã admin đều đọc được dữ liệu. Giữ mã admin bí mật; đổi mã trong Script Properties bất cứ lúc nào.
- Muốn nhận thông báo trên điện thoại: bật thông báo Gmail cho email có tiêu đề bắt đầu bằng `[Bunchasake]`.
