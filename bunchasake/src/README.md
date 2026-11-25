# Bunchasake – cách website được dựng

Cloudflare Pages deploy thư mục `bunchasake/site/` mỗi khi push lên nhánh production. Thư mục đó là **kết quả dựng**, đừng sửa tay.

## Sửa ở đâu

| Muốn sửa | Sửa file |
|---|---|
| Trang chủ (nội dung, giao diện) | `src/home.html` (nguồn tiếng Việt + từ điển tiếng Anh `EN` trong file) |
| Landing page (tiệm nail, nhà hàng, …) | `content/landing/<tên>.en.json` và `<tên>.vi.json` |
| Bài blog | `content/blog/<tên>.en.html` và `<tên>.vi.html` |
| Giao diện landing page và blog | `src/lp.css` |
| Tiêu đề/mô tả trang chủ, danh sách dự án, liên kết ngoài được phép | `src/build.cjs` (các hằng `HOME`, `PROJECTS`, `EXT`) |

Quy tắc viết nội dung và định dạng file: `content/BRIEF.md`.

## Dựng lại

```
node bunchasake/src/build.cjs
```

Cần Node và Playwright (trang chủ được dựng sẵn bằng trình duyệt thành hai bản tĩnh: `/` tiếng Việt và `/en/` tiếng Anh).
Lệnh này ghi lại toàn bộ `site/`: các trang HTML, `sitemap.xml`, `robots.txt`, `llms.txt`, `404.html`, `_headers`, `_redirects`.
Nếu có cảnh báo (liên kết hỏng, tiêu đề quá dài…) lệnh sẽ in ra ở cuối; sửa hết trước khi push.

## Thêm bài mới

1. Tạo `content/blog/<slug-tiếng-anh>.en.html` và `.vi.html` theo mẫu trong `content/BRIEF.md`.
   Ghi `date: YYYY-MM-DD` (ngày đăng) và `category:` trong phần đầu file: bài có ngày đăng mới nhất tự lên đầu blog. Ngày "cập nhật" và `lastmod` trong sitemap lấy từ git, không gõ tay.
2. Chạy lệnh dựng, kiểm tra không có cảnh báo, rồi commit và push. Sitemap tự cập nhật.
3. Kiểm tra: `python3 src/check.py` (PROBLEMS: 0) và `node src/tall.js` (problems: 0; cần `cd site && python3 -m http.server 8765`).
4. Sau khi push: `bash src/cfst.sh` xem Cloudflare deploy xong chưa, rồi `bash src/indexnow.sh` để báo các công cụ tìm kiếm những URL vừa đổi.
