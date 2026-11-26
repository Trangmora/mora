# Hướng dẫn dựng một tập video luật (dành cho trợ lý dựng tập)

Đọc hết trước khi làm. Tập mẫu tốt nhất để bám theo: `luat/episodes/BLHS2026_lam_nhuc/` (đọc `script.json`, `keys.json`, `subs.json`, `scenes.js`, `script.md`, `sources.md`). Khung vẽ: `luat/pipeline/vox/` (đọc `README.md` và phần hàm trong `vox.html`).

## Quy tắc của chủ kênh (bắt buộc)
- Nghiêm túc, KHÔNG đùa. Giọng trung lập, câu ngắn, dễ hiểu. Tránh chính trị nhạy cảm.
- Một video một vấn đề. Dài TỐI THIỂU 2 phút (120–145 giây), giải thích kỹ luật nói gì.
- Sơ đồ ô viền đỏ, chữ đen, nền giấy; chỉ có cây bút (không bàn tay); ảnh thật Unsplash nếu có; phụ đề; KHÔNG nhạc nền.
- Trên màn hình bắt buộc: tên văn bản và số hiệu (hoặc "Số hiệu: chờ công bố chính thức"), ngày ban hành/thông qua, ngày hiệu lực, dòng nguồn ở mỗi cảnh, phần "BẠN NÊN LÀM GÌ?", cảnh lưu ý cuối.
- Câu cuối lời đọc (đoạn id "out"): "Nội dung chỉ mang tính thông tin, không phải tư vấn pháp lý. Hãy kiểm tra văn bản gốc."
- Mỗi con số lên hình phải có 2 nguồn chính thống độc lập nói về văn bản ĐÃ ban hành/thông qua, hoặc là quy định hiện hành dẫn được điều luật. 1 NGUỒN / MÂU THUẪN / DỰ THẢO thì không đưa lên hình, hoặc nói rõ "theo báo chí", "còn chờ hướng dẫn".

## Cấu trúc lời gợi ý
Mở đầu nêu thay đổi chính → video này giải thích gì → văn bản nào, khi nào → khái niệm bằng lời thường → hiện nay thế nào → quy định mới, từng ý → (ví dụ bằng số nếu hợp) → ai bị ảnh hưởng, từ khi nào, điều còn chờ hướng dẫn → bạn nên làm gì (3–4 ý) → lưu ý cuối.

## Các bước
1. Đọc phần chủ đề của mình trong `luat/research/2026-11_30_chu_de.md`. Chạy thêm 3–6 lượt WebSearch (mode extended, tiếng Việt) để đủ chi tiết cho 2 phút. KHÔNG dùng WebFetch (bị chặn).
2. `script.json` dạng `{"vi":[["op1","..."],...,["out","..."]]}`. Số viết bằng chữ ("hai mươi triệu đồng", "ngày một tháng ba năm 2027"). Đoạn cuối id "out", KHÔNG dùng id "end".
3. Thu giọng (trong thư mục tập): `VOICE_ID=ywBZEqUhld86Jeajq94o TEMPO=1.15 python3 ../../../pipeline/full/tts_seg.py script.json vi work/vo 0.35 [id=0.5 ...]`.
4. Kiểm giọng: `ffmpeg -v error -y -i work/vo/vo_vi.wav -b:a 96k work/vo/vo_vi.mp3 && curl -s -m 300 -X POST https://api.elevenlabs.io/v1/speech-to-text -H "xi-api-key: dummy" -F model_id=scribe_v1 -F language_code=vi -F file=@work/vo/vo_vi.mp3`. So mọi con số, ngày tháng; sai thì sửa lời, thu lại đoạn đó.
5. `keys.json` (`{"tên_mốc":["id_đoạn","cụm từ có trong lời"]}`), `subs.json` (`{"id_đoạn":[["cụm từ bắt đầu","chữ phụ đề"],...]}`, phụ đề ≤ 50 ký tự, số viết bằng chữ số), `scenes.js` (dùng `box, arrow, title, photo, photoCard, icon, stamp, check, underline, badge, txt, tw, P, g, source, vxTodo, vxDisclaimer`; hàm riêng thì viết trong scenes.js của tập).
6. Ảnh: Unsplash giới hạn 50 lượt/giờ DÙNG CHUNG cho mọi trợ lý: mỗi tập tối đa 3 lượt tìm (`https://api.unsplash.com/search/photos?query=...&per_page=10&orientation=landscape`, header `Authorization: Client-ID dummy`), tải thẳng `urls.raw` + `&w=1200&q=80&fm=jpg&fit=max` từ kết quả, không gọi thêm. Lỗi 403/hết lượt thì dùng lại ảnh trong `luat/episodes/*/img/` hoặc vẽ bằng `icon()`. Không dùng ảnh rõ mặt người hay biển số xe thật gắn với vi phạm.
7. `python3 ../../pipeline/vox/keys.py .` rồi `node ../../pipeline/vox/render.cjs . t1 t2 ...` (14–20 mốc rải đều). XEM từng khung (ghép thành bảng 2x3 bằng PIL cho đỡ tốn), sửa tới khi chữ không đè nhau, không tràn ô, đủ dấu, không có quãng >3 giây không có gì mới hiện.
8. Dựng: từ gốc repo `PARTS=1 luat/pipeline/vox/build.sh luat/episodes/<TẬP> luat/videos/<TẬP>_vi.mp4` (chạy nền, timeout dài; nhiều trợ lý dựng cùng lúc trên máy 4 nhân). Trích 4–6 khung từ video cuối để kiểm.
9. Viết `script.md` (lời đọc + bảng "dữ kiện | giá trị | nguồn | mức kiểm chứng" + mục "Chỗ cần chủ kênh lưu ý"), `sources.md` (danh sách đánh số `N. Tên báo, "Tiêu đề bài": URL`, rồi mục `## Ảnh` ghi tác giả, link Unsplash).
10. Viết `publish.json` cho phần đăng YouTube:
```json
{"title": "≤100 ký tự: từ khóa người ta tìm + con số chính | tên văn bản",
 "intro": "2 câu tóm tắt cho người xem",
 "van_ban": "Tên văn bản (số hiệu nếu có)",
 "moc": "Ban hành/Quốc hội thông qua: dd/mm/yyyy (số phiếu nếu có) · Hiệu lực: dd/mm/yyyy",
 "so_hieu": "Số hiệu luật: chờ công bố chính thức  (bỏ trống nếu đã có số hiệu)",
 "bullets": ["5–7 ý trong video, có con số"],
 "tags": ["8–12 cụm từ khóa tiếng Việt người ta hay gõ tìm: tên văn bản, chủ đề, mức phạt, năm; 3 cụm đầu dùng làm hashtag"]}
```
Không nhắc ElevenLabs, giọng AI hay Unsplash trong publish.json (phần mô tả tự thêm nguồn và câu lưu ý).

## Ràng buộc
KHÔNG sửa `luat/pipeline/`, `pipeline/`, tập của người khác. KHÔNG git add/commit/push. KHÔNG đăng lên đâu. KHÔNG gọi thêm agent. KHÔNG nhạc.
