# 📖 Il Mio Libro — Sách học tiếng Ý B1

Website học tiếng Ý trình độ B1, thiết kế như **một cuốn sách thật**: có bìa, mục lục, lật từng trang
(hiệu ứng lật giấy 3D), mỗi trang giữ đúng nội dung như sách của bạn, cộng thêm:

| Tính năng | Cách dùng |
|---|---|
| **Y hệt sách** | Mỗi trang web là đúng một trang sách, dựng lại cùng bố cục (dải mục tiêu, "Cominciamo", số bài đỏ kèm icon, ảnh cắt từ trang sách, mẫu đơn 2 cột, số trang "2 due"). Trang chẵn bên trái, trang lẻ bên phải như sách mở; cả trang thu nhỏ vừa màn hình, không cuộn. Bấm 🔍 ở góc (hoặc nhấp đúp) để phóng to một trang khi đọc / điền. |
| **Chút hài hước kiểu Ý** | *Nonna Pina* (bà nội Ý) phản ứng mỗi khi chấm bài — «Perfetto! 🤌» hay «Mamma mia!» — và chân mỗi trang có một mẩu *Lo sapevi?* về văn hoá Ý (cappuccino sau 11 giờ, dứa trên pizza…), kèm bản dịch. |
| **Lật trang** | Nút ‹ › hai bên, phím ← →, hoặc vuốt trên điện thoại. Máy tính hiện 2 trang, điện thoại hiện 1 trang. |
| **Mục lục (Indice)** | Menu ☰ *Mục lục*, bấm vào tên bài để lật đến trang đó. Có số bài đã làm ✎ 1/2. |
| **Đáp án bên cạnh** | Bật ✎ *Hiện đáp án* → đáp án hiện bằng “bút đỏ” ngay cạnh từng câu. |
| **Bản dịch** | ⇄ *Hiện bản dịch* → dịch từng câu/đoạn sang Việt hoặc Anh. |
| **Chọn ngôn ngữ** | 🌐 *Tiếng Việt – Italiano* hoặc *English – Italiano* (giao diện, bản dịch và lời giải thích của AI). |
| **Bài nghe (audio)** | 🎧 Track như trong sách: play/pause, tua ±5s, tốc độ 0.75–1.25×, lặp lại, ẩn/hiện lời bài nghe (câu đang đọc được tô vàng). Có file mp3 của sách thì phát file; chưa có thì máy đọc lời bằng giọng Ý, mỗi người nói một giọng. |
| **Nghe phát âm mẫu** | 🔊 cạnh mỗi câu, bấm vào từ vựng hay ô trong bảng ngữ pháp để nghe. |
| **Luyện đọc + chấm phát âm** | 🎙️ → ghi âm → tô xanh/đỏ từng từ đọc đúng/sai, nghe lại giọng mình; 🤖 AI nhận xét lỗi phát âm cụ thể. |
| **Chấm bài tại chỗ** | ✓ *Chấm bài* (theo đáp án, không cần mạng) và 🤖 *AI chấm & giải thích* (chấm cả bài viết, bài nói). |
| **Bài nói** | Ghi âm câu trả lời → chuyển thành chữ (sửa được) → AI chấm ngữ pháp, từ vựng, nội dung và đưa câu sửa. |
| **Sổ lỗi — “tôi sai ở đâu”** | ✗ *Lỗi của tôi*: tổng hợp mọi câu sai, đáp án đúng và giải thích; bấm 🤖 để AI giải thích câu chưa có lời giải. |
| **Ảnh thật** | Mỗi hình trong trang là ảnh chụp thật, tự tìm theo từ khoá (Wikimedia Commons miễn phí, hoặc Pexels/Unsplash nếu có key), có ghi tên tác giả & giấy phép. Có thể dùng ảnh riêng trong `public/images`. |
| **Lộ trình & bảng điểm** | Nút *Lộ trình* trên menu: điểm trung bình, số trang đã học, chuỗi ngày học; điểm và đường tiến bộ theo từng kỹ năng **Nghe · Viết · Ngữ pháp** (cùng Đọc hiểu, Nói & phát âm); lộ trình từng trang (xong / đang học / chưa học); gợi ý bài tiếp theo, kỹ năng cần ôn, bài điểm thấp nên làm lại. |
| **Nhiều người học** | Mỗi người một hồ sơ riêng (tiến độ, câu trả lời, sổ lỗi, ghi chú, lịch sử điểm). Thêm / đổi tên / chuyển người học ngay trong bảng *Lộ trình*. |
| **Ghi chú** | Trang *Appunti* cuối sách để ghi chép. Tiến độ, câu trả lời, ghi chú tự lưu trong trình duyệt. |

## Chạy trên máy

Cần [Node.js](https://nodejs.org) 20 trở lên.

```bash
cd italian-b1-book
npm install
cp .env.example .env      # rồi dán API key vào .env (xem dưới)
npm run dev               # mở http://localhost:5173
```

Dùng **Chrome hoặc Edge** để có nhận dạng giọng nói tiếng Ý (Safari/Firefox vẫn đọc và làm bài được,
nhưng không ghi âm-chấm phát âm được).

Bản chạy thật (sau khi build):

```bash
npm run build
npm start
```

## Gắn API để AI chấm bài

Mọi lời gọi AI nằm ở **một chỗ duy nhất**: [`server/grader.ts`](server/grader.ts) (gọi Claude qua
Anthropic SDK). Key chỉ nằm trên server, không lộ ra trình duyệt.

1. Lấy API key tại <https://platform.claude.com>.
2. Mở file `.env`, điền:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   CLAUDE_MODEL=claude-opus-5-5   # model chấm bài
   CLAUDE_EFFORT=low              # low = nhanh & rẻ; medium/high = chấm kỹ hơn
   ```
3. Khởi động lại `npm run dev`. Chấm xanh cạnh ⚙ trên menu = AI đã kết nối.

Khi chưa có key, web vẫn chạy đầy đủ: bài trắc nghiệm / điền từ / nối / đúng-sai chấm theo đáp án,
luyện đọc chấm từng từ. Chỉ phần *giải thích bằng AI*, *chấm bài viết* và *chấm bài nói* cần key.

Có 2 API:

| Endpoint | Việc |
|---|---|
| `POST /api/grade/exercise` | Chấm một bài tập (mọi dạng, kể cả viết & nói), trả điểm, đáp án đúng và giải thích từng câu. |
| `POST /api/grade/reading` | Chấm luyện đọc: so văn bản gốc với những gì máy nghe được, chỉ ra lỗi phát âm và cách sửa. |

> Lưu ý trung thực: AI không “nghe” trực tiếp file âm thanh. Trình duyệt chuyển giọng bạn thành chữ
> (nhận dạng tiếng Ý), rồi AI suy ra lỗi phát âm từ những chỗ máy nghe nhầm (ví dụ *anno → ano* = thiếu
> phụ âm đôi). Vì vậy hãy đọc rõ ràng và ở nơi yên tĩnh.

## Giọng đọc tiếng Ý — tạo một lần, dùng mãi

Ưu tiên giọng đọc theo thứ tự:

1. **File nghe của sách** (`src: "/audio/…mp3"` trong bài nghe) — giọng thật của người bản xứ, tốt nhất.
2. **Giọng AI đã tạo sẵn** trong `public/voices/` — tạo **một lần** bằng lệnh dưới, commit lên repo, sau đó
   nghe lại bao nhiêu lần cũng **không gọi API, không tốn tiền**.
3. **Giọng máy của trình duyệt** — miễn phí nhưng nghe không tự nhiên, chỉ dùng khi chưa có hai loại trên.

```bash
npm run voices -- --dry   # xem có bao nhiêu câu / ký tự cần tạo (không gọi API)
npm run voices            # tạo giọng cho các câu còn thiếu, lưu vào public/voices
```

Chỉ cần **một** key trong `.env`:

| Dịch vụ | Biến trong `.env` | Chi phí |
|---|---|---|
| Google Cloud Text-to-Speech | `GOOGLE_TTS_API_KEY` | Có hạn mức miễn phí hằng tháng cho giọng Neural2 |
| Azure Speech | `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION` | Gói F0 miễn phí hằng tháng |
| ElevenLabs | `ELEVENLABS_API_KEY` | Tự nhiên nhất, gói miễn phí nhỏ |

Hai trang mẫu chỉ khoảng 1.000 ký tự; cả một cuốn sách B1 vẫn nằm trong hạn mức miễn phí của Google hoặc Azure
(xem lại hạn mức hiện tại trên trang giá của từng dịch vụ). Mỗi lần thêm trang mới, chạy lại `npm run voices`
là chỉ tạo phần câu mới. Bài nghe có nhiều người nói sẽ xen kẽ giọng nữ / nam.

## Thêm trang sách mới

Mỗi trang sách là một file trong [`src/content/pages/`](src/content/pages), tự động xuất hiện trong
sách và mục lục (sắp theo số trang). Mỗi ngày bạn gửi ảnh/chữ của trang đang học, trang đó sẽ được chép
thành một file như `p012.ts`.

Các loại nội dung (xem [`src/types.ts`](src/types.ts)):

- `unitHeader` — đầu bài (Unità), mục tiêu bài học
- `heading`, `text` (bài đọc), `dialogue` (hội thoại), `vocab` (từ vựng), `grammar` (bảng ngữ pháp), `tip`
- `audio` — bài nghe: `track: "1.04"`, `src: "/audio/1-04.mp3"` (đặt file vào `public/audio/`), `transcript: "Anna: …\nMarco: …"`
- `image` — ảnh thật: `photo: "Italian espresso bar"` (từ khoá tiếng Anh; `photoIndex: 1` để lấy ảnh khác), hoặc ảnh riêng `src: "/images/..."`; `scene: "cafe"` là tranh vẽ dự phòng khi không tải được ảnh
- Bố cục sách: `sectionTitle` ("Cominciamo"), `columns` (chia cột), `photo` (ảnh cắt từ trang sách), `collage` (ảnh ghép đặt tự do), `sticker` ("CIAO!")
- `exercise` với các dạng: `cloze` (đoạn văn / hội thoại có ô trống ngay trong câu: `{{đáp án|đáp án khác}}`, `{{=mẫu sách}}`, `*gợi ý nghiêng*`, dòng "• " / "○ " là lượt thoại), `form` (mẫu đơn như sách: ô viết, ô tích, kiểu `corso` / `siena`), `fill` (điền từ, `___` là ô trống), `choice` (trắc nghiệm), `truefalse`,
  `match` (nối), `write` (viết), `speak` (nói)

Mỗi bài tập được xếp vào một kỹ năng để tính điểm lộ trình: tự đoán theo dạng bài (`write` → Viết,
`speak` → Nói, bài ngay sau `audio` → Nghe, bài gắn với bài đọc → Đọc hiểu, còn lại → Ngữ pháp),
hoặc ghi rõ bằng `skill: "listening" | "writing" | "grammar" | "reading" | "speaking"`.

> Hồ sơ và điểm được lưu trong trình duyệt của máy đang dùng. Muốn đồng bộ giữa nhiều máy thì cần thêm
> tài khoản đăng nhập và cơ sở dữ liệu trên server (có thể làm ở bước sau).

Hai trang `p000-demo-*.ts` chỉ là trang mẫu để xem thử, sẽ được xoá khi có trang thật đầu tiên.

## Cấu trúc dự án

```
italian-b1-book/
├── server/
│   ├── index.ts        # server Express (+ Vite khi dev)
│   ├── grader.ts       # "giáo viên AI" chấm bài (Claude)
│   ├── tts.ts          # giọng đọc AI, lưu file vào public/voices
│   └── photos.ts       # tìm ảnh thật theo từ khoá
├── scripts/voices.ts   # npm run voices — tạo giọng một lần
├── src/
│   ├── content/pages/  # ← các trang sách (mỗi ngày thêm 1 file)
│   ├── components/     # Book (lật trang), Cover, TableOfContents, blocks/, illustrations/…
│   ├── lib/            # store (lưu tiến độ), speech (nghe/ghi âm), grading (chấm điểm)
│   ├── i18n.ts         # chữ giao diện Việt / Anh
│   └── styles.css      # giao diện cuốn sách
├── public/audio/       # file nghe mp3 của sách (nếu có)
├── public/voices/      # giọng đọc đã tạo sẵn (commit lên repo)
└── public/images/      # ảnh minh hoạ thật (nếu có)
```
