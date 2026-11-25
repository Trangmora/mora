# Asian Culture Stories: quy tắc làm video

Bộ quy tắc rút ra từ tập 1 (Thần đạo Nhật Bản). Mọi tập sau làm theo đúng file này. Có điều gì thay đổi thì sửa file này trước.

## 1. Kênh
- **Tên kênh:** Asian Culture Stories. Banner ghi "ASIAN CULTURE STORIES · History · Mythology". Avatar là lữ khách cầm đèn lồng đỏ.
- **Ngôn ngữ video:** tiếng Anh (lời dẫn và chữ). Tôi trao đổi với chủ kênh bằng tiếng Việt.
- **Chủ đề:** chỉ văn hóa, thần thoại, lịch sử châu Á (không làm châu Âu).

## 2. Cấu trúc một tập
1. **Mở đầu thủy mặc** (~20 giây, khuôn mẫu chung cho mọi nước, chủ kênh rất thích):
   - Nền tranh thủy mặc sương mù sáng (giấy ấm, mực xám), chiều sâu 2.5D, camera trôi rất chậm, viền tối ở góc.
   - Chữ bản địa màu đỏ (thư pháp, ví dụ 八百万の神) hiện dần **như mực loang**, kèm dòng tiếng Anh serif mảnh, giãn chữ.
   - Lời dẫn kiểu người tò mò tự hỏi: "X has … But why? Where do they come from? … So what is it called? It's called ___. In [language], it means ___."
   - Kết đoạn bằng chữ bản địa lớn (神道) + tên Latin (SHINTO) + nghĩa ("THE WAY OF THE KAMI"), giữ lâu, có một đoạn nhạc dài.
2. **Phần chính:** nguồn gốc → thần thoại → các điều thú vị, theo phong cách ảnh ở mục 4.
3. **Kết:** quay lại câu hỏi mở đầu và giới thiệu tập sau.

## 3. Giọng đọc và nhịp
- **Giọng:** giọng clone của chủ kênh, ElevenLabs **"Trang giọng việt"** (`1SF4Jqf4CNRoja3ACqWC`), model `eleven_v3`, stability 0.5, style 0.3, đọc ở **tốc độ tự nhiên** (không chỉnh atempo). Dùng cho **cả bản tiếng Anh lẫn bản tiếng Việt**. Chủ kênh rất thích giọng này, giữ nguyên.
  - **Không chèn thẻ cảm xúc** dạng `[curious]` hay `[pause]`: model đọc nhầm thành tiếng (nghe như có giọng lạ chen vào). Tạo cảm xúc bằng dấu câu và "...".
  - **Không co giãn giọng để khớp cảnh.** Luôn dựng cảnh theo nhịp đọc tự nhiên (mốc thời gian lấy từ `with-timestamps`).
  - Văn bản dài hơn khoảng 2.500 ký tự thì chia làm 2 lần gọi, nối bằng 0,6 giây lặng.
  - Đã thử và **không dùng**: Chris (từng dùng ở bản nháp), George, Brian, Eric, Will, Marco (giọng Ý), "TRANG TÔI".
- **Hai bản cho hai kênh:** mỗi tập làm bản tiếng Anh và bản tiếng Việt với cùng hình. Lời, chữ trên màn hình và mốc cảnh theo từng ngôn ngữ. Chữ tiếng Việt dùng font Be Vietnam Pro (Lora thiếu dấu).
- **Văn phong:** người kể chuyện bình thường, tò mò, câu ngắn, có câu hỏi. Không giật gân kiểu quảng cáo, không giọng "đọc".
- **Nhịp:** đề tài thần thoại, tôn giáo phải **chậm và bí ẩn, không theo kiểu video công nghệ**.
  - Mỗi cảnh 3–7 giây, **không có cảnh dưới 2 giây**.
  - Dùng "..." trong lời dẫn để tạo khoảng lặng.
- Lấy mốc thời gian từng chữ bằng endpoint `with-timestamps` để khớp cảnh, chữ và hiệu ứng với lời.

## 2b. Độ dài
- **Mỗi tập dài 3 đến 3,5 phút** (chủ kênh không muốn 7–8 phút).

## 3a. Mở đầu riêng cho từng tập
- Giữ **công thức** mở đầu (thủy mặc, 4–5 giây chỉ có nhạc, chữ bản địa đỏ hiện như mực loang, câu hỏi bí ẩn), nhưng **khung cảnh phải khác hẳn ở mỗi tập**. Không lặp lại cảnh đồi núi sương của tập 1.
- Ví dụ: Samurai là chiến trường lúc bình minh, cờ hiệu trong sương, thanh kiếm cắm trên đất. Nho giáo là núi Thái Sơn. Phật giáo là con thuyền vượt biển. Con Rồng cháu Tiên là vịnh có rồng dưới nước.
- Mỗi tập có **một chuyển động mở đầu riêng** (tương tự mặt trời mọc ở tập 1), ví dụ kiếm lóe sáng, cờ bay, thuyền cập bến.

## 3b. Khoảng ngắt nhạc (nhịp kiểu phim Netflix)
- **Mở đầu: 4–5 giây chỉ có nhạc** trước khi có lời. Ở tập 1, mặt trời đỏ mọc lên **từ sau đỉnh núi** (bị núi che theo đường sống núi), và lặn xuống trước khi chữ tên tôn giáo hiện ra.
- **Mặt trời không bao giờ được che chữ:** đặt nó ở vùng trống, cách khối chữ ít nhất 50 px, và kiểm tra trên khung hình thật sau khi camera zoom.
- **Mỗi chỗ chuyển phần có 2,5–4 giây lời dừng, nhạc vang lên,** và cảnh mới hiện ra cùng lúc. Ở tập 1 là các điểm: sau tên tôn giáo, trước thần thoại, trước các điều thú vị, trước mỗi câu chuyện lớn, trước đoạn kết.
- Chèn khoảng lặng vào **chính file giọng đọc** (`G_<lang>.json` lưu mốc đã cộng các khoảng ngắt), và cảnh mới bắt đầu ở **đầu** khoảng ngắt.

## 4. Phong cách ảnh (phần chính)
- **Chất ảnh:** giấy cắt phẳng, **sáng và ấm**, không tối, không cảnh đêm u ám, không quá nhiều chi tiết.
  - Màu: đỏ đất, vàng nghệ, kem, xanh lá mạ, đen mực.
  - Viền nâu đậm, hạt giấy, vân nứt nhẹ, vài bông hoa nhạt rải làm nền.
  - Nhân vật đứng chính diện, mặt vẽ vài nét đơn giản.
- **Prompt chung (dùng nguyên văn cho mọi ảnh):** xem `pipeline/scenes/gen.py` (biến `ST`). Model `gpt-image-2`, 1536×1024, quality medium.
- **Không trộn phong cách:** không lẫn ảnh thật, cảnh vector SVG phẳng và tranh tối nhiều chi tiết trong cùng phần chính.
- Cảnh có hiệu ứng "mọc" (mặt trời, trăng) thì vẽ ảnh **không có** vật đó, rồi thêm bằng code.

## 5. Chuyển động
- **Từ tập 2 (chủ kênh yêu cầu ngày 25/11/2026): mọi cảnh đều phải cử động, video phải nhiều chuyển động để người xem không chán.**
  - **Clip cử động:** đưa **tất cả** ảnh GPT sang fal.ai (Wan 2.2 Turbo) để tạo clip khoảng 5 giây. Sau đó **làm chậm clip** cho vừa độ dài cảnh (tối đa chậm còn 0,45 lần), trộn giữa hai khung liền nhau cho mượt.
  - **Chuyển động máy quay bằng code** chạy chồng lên clip, đổi kiểu mỗi cảnh: zoom vào, zoom ra, lia trái, lia phải, lia dọc, và cảnh dài thì cắt sang cận cảnh (ví dụ thanh kiếm, khuôn mặt). Dùng tham số `c:[z0,z1,fx0,fy0,fx1,fy1]` trong `ep2.cjs`. Zoom trong khoảng 1,0–1,9, chuyển động êm, không rung, không xoay 3D.
  - **Bộ lọc nội dung của fal.ai** có thể chặn ảnh có cung kiếm hay trận đánh. **Không tắt bộ lọc, không viết lại prompt để lách.** Cảnh bị chặn giữ ảnh tĩnh, rồi tạo chuyển động bằng code: lia máy, zoom, sóng hoặc cờ lay (`regs`), lóe sáng, hoa rơi. Tập 2 có 9/23 cảnh bị chặn.
- **Chuyển động phải thật và có ý nghĩa, ăn theo lời đọc:**
  - **Chớp mắt và mỉm cười:** dùng bản "nhắm mắt" và "mỉm cười" do AI sửa từ ảnh gốc (`edits.py`), chỉ trộn đúng vùng mặt.
  - **Môi trường:** mặt trời mọc, mây trôi, nước gợn, ngọn lửa chập chờn, thần linh nhấp nhô, cánh hoa rơi.
- **Không kéo, xoay cả thân người** (nhìn buồn cười): nông dân "cúi", người viết "gật gù" đã bị chê.
- **Cử động tay chân thật:** dùng image-to-video **Wan 2.2 Turbo trên fal.ai** (`fal-ai/wan/v2.2-a14b/image-to-video/turbo`, 720p, khoảng $0,10 mỗi clip 5 giây).
  - Đưa ảnh giấy cắt vào, kèm prompt mô tả cử động.
  - Cuối prompt luôn thêm: "Static camera, no zoom. Keep the exact flat paper-cut illustration style, colors, outlines and faces."
  - Dùng cho các cảnh có người làm việc gì đó: cấy lúa, rửa tay, tung muối, cúi lạy, nhảy múa.
  - Không dùng cách kéo méo vùng ảnh.
- **Không dùng nhân vật dẫn đường xuyên suốt** (cô bé đã bị bỏ).

## 6. Điểm rơi (beats)
Mỗi ý quan trọng trong lời dẫn cần một sự kiện hình và tiếng đi kèm. Ví dụ:
- **"The whole world went dark":** tối đen thật 1–2 giây, nhạc gần như tắt, rồi một đốm sáng nhỏ và tiếng chuông, sau đó vòng sáng mở ra cảnh tiếp theo.
- **"Storm":** màn hình lóe trắng, có sấm.
- **"Ancestor":** nhân vật mỉm cười, có chuông.
- **"Sun":** mặt trời mọc lên.

## 7. Chuyển cảnh
- **Không dùng:** cắt nhanh, trượt ngang nhanh, tiếng thụp "bục bục" ở mỗi lần cắt.
- **Ba kiểu chuyển cảnh được dùng:**
  1. **Theo một vật (match cut)**, dài khoảng 1,4 giây, kèm một nốt đàn koto nhẹ. Ví dụ: một bông hoa trong cảnh cũ nhấc lên, vòng tròn mở rộng quanh nó để lộ cảnh mới, và bông hoa đáp đúng vào một bông hoa trong cảnh mới.
  2. **Xé giấy**, dài khoảng 1,7 giây, kèm tiếng giấy xé: cảnh cũ bị xé từ phải sang trái, có mép xơ giấy trắng và bóng đổ.
  3. **Chuyển mờ nhẹ** (khoảng 0,8 giây) giữa các khung của cùng một cảnh, và khi chuyển từ ảnh tĩnh sang clip của chính ảnh đó.
- **Cảnh dài hơn 7,5 giây phải chia thành 2–4 khung:** toàn cảnh, rồi cận vào chi tiết (mặt người, tay, tia sét…), xen kẽ clip và ảnh tĩnh.
- Từ phần mở đầu sang phần chính: tối dần rồi sáng dần.

## 8. Chữ trên màn hình
- **Không dùng khối chữ đỏ to kiểu Vox** (đã bị chê là quá to).
- **Dùng dải giấy nhỏ** có con dấu đỏ (hanko) chữ 神 (đổi chữ hợp với từng nước), chữ Lora serif giãn rộng, gạch chân bằng nét cọ đỏ dưới từ khóa.
- Tối đa khoảng 4 từ. **Đặt ở góc trống, không bao giờ che nhân vật.**
- Phần mở đầu dùng chữ mực loang (mục 2).

## 9. Âm thanh
- **Nền:** gió, âm ngân trầm, đàn koto thưa (thang hirajoshi Rê), chuông.
- **Nhạc tắt hẳn 0,5–1,5 giây** trước các câu then chốt để tạo bí ẩn.
- **Không có tiếng trống thụp khi cắt cảnh.** Chỉ có tiếng giấy lướt rất nhẹ và một nốt đàn ở chỗ chuyển cảnh.
- **Tiếng động đúng lúc:** sấm, mưa, trống và vỗ tay ở cảnh tiệc, chuông khi ánh sáng trở lại.
- Xem `pipeline/audio/audio4.py`.

## 9a. Nhạc nền
- **Nhạc phải có lên có xuống** (chủ kênh yêu cầu từ tập 2):
  - **Mỗi phần nội dung một bài, hợp không khí:** mở đầu hùng tráng, chiến tranh dùng trống, thái bình dùng sáo, chuyện thú vị dùng nhạc vui, đoạn buồn dùng nhạc trầm, cao trào cuối dùng đoạn mạnh nhất của bài hùng tráng.
  - **Cao trào:** nhạc dâng mạnh (0,95) đúng lúc hiện tiêu đề, kèm một tiếng trống lớn. Ở đoạn kết, nhạc dâng lên khi hiện tiêu đề tập sau.
  - **Ngắt nghỉ:** nhạc lặng hẳn 0,5–0,8 giây ngay trước khi vào phần mới, rồi vào lại cùng một tiếng trống ("ngắt – vào").
  - **Mức nhạc dưới giọng đổi theo đoạn:** đoạn chiến tranh và cao trào cao hơn, đoạn thái bình và đoạn buồn thấp hơn.
  - Đoạn mạnh và đoạn nhẹ của từng bài: đo độ lớn theo từng 4 giây rồi chọn vị trí bắt đầu cho đúng chỗ (xem `episodes/02-samurai/build/audio2.py`).
- **Dưới lời đọc, nhạc phải không lời** (không giọng hát) và nhỏ: chuẩn hóa bài nhạc về khoảng -16 dBFS, rồi để mức 0,18 dưới giọng (nhạc thấp hơn giọng khoảng 13 dB). Mức 0,10 cũ của tập 1 làm nhạc gần như mất hẳn. Bài có giọng hát chỉ được dùng ở đoạn không có lời đọc, hoặc dùng bản instrumental.
- Đoạn chỉ có nhạc ở đầu và các khoảng ngắt: mức 0,9 (lên trong 0,5 giây, xuống trong 0,4 giây). Bỏ qua đoạn dạo đầu quá nhỏ của bài nhạc (ví dụ Finding Movement bắt đầu từ giây thứ 4).
- **Nguồn nhạc:** bài chủ kênh cung cấp (YouTube Audio Library, Kevin MacLeod CC-BY, Pixabay; xem `assets/music/README.md`). **Không dùng nhạc Artlist** (bị dính bản quyền), Openverse (chỉ CC0 hoặc CC-BY, ghi tên tác giả), hoặc nhạc AI (fal.ai ACE-Step). Không đưa file nhạc có bản quyền vào git.
- Hiệu ứng âm thanh (xé giấy, nốt koto lúc chuyển cảnh, sấm, chuông, trống) chỉ dùng **ít và nhỏ**: mỗi lần chuyển phần một âm, không lặp ở mọi lần cắt cảnh.
- **Clip AI từ fal.ai không có tiếng.** Mọi âm thanh lạ trong video đều đến từ hiệu ứng tự tạo hoặc từ nhạc.

## 9b. Ngân sách và tái sử dụng
- **Tối đa $5 cho mỗi video** (ảnh OpenAI, ElevenLabs, fal.ai cộng lại).
- **Tập 1 (khoảng 3 phút 10 giây):** khoảng 30 ảnh và bản sửa (gồm cả các bản thử) cộng 5 clip, ước tính **khoảng $3**. Đây là ước tính, không phải số đọc từ hóa đơn.
- **Luôn xem `assets/<nước>/index.json` trước khi tạo ảnh hoặc clip mới.** Dùng lại hình và clip đã có nếu hợp ngữ cảnh.
- Mỗi ảnh và clip mới tạo phải được lưu vào kho này kèm một câu mô tả.

## 10. Nội dung và độ chính xác
- Kiểm chứng năm, con số, tên riêng trước khi đăng. Thần thoại kể là thần thoại ("They say…", "Legend says…").
- Chủ đề chính trị (ví dụ Thần đạo Quốc gia) giữ trung lập, chỉ nêu sự kiện.
- **Không chép kịch bản hay hình của kênh khác:** chỉ lấy sự kiện làm tư liệu, tự viết lời và tự dựng cấu trúc.

## 11. Quy trình làm một tập
1. Viết kịch bản tiếng Việt cho chủ kênh duyệt, rồi dịch sang tiếng Anh.
2. Làm bản thử 10–30 giây, rồi bản 1 phút, rồi cả tập.
3. **Thứ tự kỹ thuật:**
   1. Tạo giọng đọc có mốc thời gian.
   2. Tạo ảnh và bản chớp mắt, mỉm cười.
   3. Tạo bản đồ độ sâu cho phần mở đầu (Depth Anything V2 ONNX từ Hugging Face).
   4. Render bằng Playwright + WebGL (`paper_tpl4.html`, `build8.cjs`, `comp2.html`) và ffmpeg.
   5. Tạo nhạc (`audio4.py`).
   6. Ghép: VO `atempo=0.93, adelay=1300`, nhạc ×0,85, grain 5, fade cuối 3 giây.
4. **Môi trường:** key OpenAI (`api.openai.com`) và ElevenLabs (`api.elevenlabs.io`, header `xi-api-key`) lưu trong Network secrets của môi trường Default. Unsplash cũng có key nhưng hiện không dùng ảnh thật.

## 12. Đã thử và bỏ (đừng lặp lại)
- Cảnh vector SVG tự vẽ đơn sơ ("ảnh xấu").
- Tranh màu tối, nhiều chi tiết, cảnh đêm.
- Trộn ảnh thật với tranh vẽ.
- Chữ Vox to.
- Cô bé dẫn đường.
- Giọng Chris (thay bằng giọng clone của chủ kênh).
- Co giãn giọng đọc nhanh hơn để khớp cảnh có sẵn (nghe bị gấp).
- Một khung hình giữ quá 7 giây.
- Camera 3D xoay và zoom nhiều.
- Cắt nhanh kiểu video công nghệ.
- Tiếng thụp ở các lần cắt.
- Chuyển cảnh trượt ngang nhanh.
- Kéo méo thân người để giả cử động.
- Giọng Marco.
- Thẻ cảm xúc tiếng Anh trong lời đọc.
- Nhạc có lời chạy dưới giọng đọc.
- Mặt trời che chữ.
- Bản tiếng Việt đọc kiểu "đọc bài". Phải nói chuyện thân mật: "Xin chào các bạn, hôm nay chúng ta cùng tìm hiểu…".
