# 📖 Il Mio Libro — Sách học tiếng Ý B1

Website học tiếng Ý trình độ B1, thiết kế như **một cuốn sách thật**: có bìa, mục lục, lật từng trang
(hiệu ứng lật giấy 3D), mỗi trang giữ đúng nội dung như sách của bạn, cộng thêm:

| Tính năng | Cách dùng |
|---|---|
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
| **Hình minh hoạ** | Tranh SVG sinh động có sẵn (quán bar, nhà ga, chợ, thành phố…) hoặc ảnh thật đặt trong `public/images`. |
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

## Thêm trang sách mới

Mỗi trang sách là một file trong [`src/content/pages/`](src/content/pages), tự động xuất hiện trong
sách và mục lục (sắp theo số trang). Mỗi ngày bạn gửi ảnh/chữ của trang đang học, trang đó sẽ được chép
thành một file như `p012.ts`.

Các loại nội dung (xem [`src/types.ts`](src/types.ts)):

- `unitHeader` — đầu bài (Unità), mục tiêu bài học
- `heading`, `text` (bài đọc), `dialogue` (hội thoại), `vocab` (từ vựng), `grammar` (bảng ngữ pháp), `tip`
- `audio` — bài nghe: `track: "1.04"`, `src: "/audio/1-04.mp3"` (đặt file vào `public/audio/`), `transcript: "Anna: …\nMarco: …"`
- `image` — tranh minh hoạ (`scene: "cafe" | "station" | "market" | "city" | "home" | "office" | "travel" | "friends" | "food" | "weather"`) hoặc ảnh `src: "/images/..."`
- `exercise` với các dạng: `fill` (điền từ, `___` là ô trống), `choice` (trắc nghiệm), `truefalse`,
  `match` (nối), `write` (viết), `speak` (nói)

Hai trang `p000-demo-*.ts` chỉ là trang mẫu để xem thử, sẽ được xoá khi có trang thật đầu tiên.

## Cấu trúc dự án

```
italian-b1-book/
├── server/
│   ├── index.ts        # server Express (+ Vite khi dev)
│   └── grader.ts       # "giáo viên AI" — nơi duy nhất gọi API
├── src/
│   ├── content/pages/  # ← các trang sách (mỗi ngày thêm 1 file)
│   ├── components/     # Book (lật trang), Cover, TableOfContents, blocks/, illustrations/…
│   ├── lib/            # store (lưu tiến độ), speech (nghe/ghi âm), grading (chấm điểm)
│   ├── i18n.ts         # chữ giao diện Việt / Anh
│   └── styles.css      # giao diện cuốn sách
├── public/audio/       # file nghe mp3 của sách (nếu có)
└── public/images/      # ảnh minh hoạ thật (nếu có)
```
