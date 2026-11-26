# code3d: cảnh 3D dựng hoàn toàn bằng code (theo cách làm của Crimson Loong)

- Thư viện duy nhất: three.js r180 (`npm install` trong thư mục này), nhúng thẳng vào trang khi build. Không add-on, không gói hậu kỳ.
- Không tài sản: không ảnh, mô hình, font, HDRI hay file âm thanh. Mọi hình khối, vân, shader đều sinh bằng code lúc tải trang.
- Không gọi AI (không fal.ai, không ảnh AI). Giọng đọc và nhạc nền ghép sau như các video khác.
- Mọi thứ trên màn hình là hàm của thời gian phim t, nên khung nào cũng dựng riêng được, theo thứ tự bất kỳ.

## Cấu trúc
| File | Làm gì |
|---|---|
| src/00_core.js | tham số trang (w, h, cap), nhiễu, nội suy khung chính |
| src/05_glsl.js | GLSL dùng chung: nhiễu, chiếu sáng trăng + đuốc, sương theo độ cao |
| src/10_world.js | bộ kết xuất, cảnh, uniform chung, vật liệu tự viết, dời đỉnh |
| src/20_sky.js | bầu trời đêm: sao, trăng, quầng, mây mỏng |
| src/30_rock.js | núi đá vôi (karst) từ mặt tròn xoay + nhiễu |
| src/50_people.js | thuyền, người (khối tròn xoay, trụ, cầu, có khớp), đuốc, lưới, lưỡi gươm |
| src/68_water.js | mặt nước gương phẳng tự làm, gợn sóng, ánh trăng, ánh đuốc |
| src/72_air.js | sương trôi, đom đóm |
| src/80_post.js | HDR, bloom, ACES, tối góc, hạt phim (tự viết) |
| src/90_main.js | renderAt(t), vòng lặp |
| films/<phim>/88_film.js | kịch bản khung của từng phim: máy quay, tư thế, hiệu ứng theo t |

## Dùng
```
cd pipeline/code3d && npm install
python3 tools/build.py v1_guom                     # -> dist/v1_guom.html (mở trực tiếp bằng trình duyệt)
node tools/capture.cjs dist/v1_guom.html out.mp4 1280 720 30          # chụp từng khung -> video
node tools/capture.cjs dist/v1_guom.html still 1280 720 30 0 0 3,9,16  # chỉ chụp vài ảnh tĩnh để kiểm tra
```
Khổ dọc cho short: 720 1280.
