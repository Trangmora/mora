import type { L10n, Lang } from "./types";

const strings = {
  bookTitle: { vi: "Il Mio Libro · Tiếng Ý B1", en: "Il Mio Libro · Italian B1" },
  contents: { vi: "Mục lục", en: "Contents" },
  indice: { vi: "Indice", en: "Indice" },
  showAnswers: { vi: "Hiện đáp án", en: "Show answers" },
  hideAnswers: { vi: "Ẩn đáp án", en: "Hide answers" },
  showTranslation: { vi: "Hiện bản dịch", en: "Show translation" },
  mistakes: { vi: "Lỗi của tôi", en: "My mistakes" },
  mistakesTitle: { vi: "Sổ lỗi sai — giải thích tôi sai ở đâu", en: "Mistake notebook — where I went wrong" },
  noMistakes: { vi: "Chưa có lỗi nào được lưu. Làm bài và bấm “Chấm bài” nhé!", en: "No mistakes saved yet. Do an exercise and press “Check”!" },
  progress: { vi: "Tiến độ", en: "Progress" },
  settings: { vi: "Cài đặt", en: "Settings" },
  language: { vi: "Ngôn ngữ", en: "Language" },
  prev: { vi: "Trang trước", en: "Previous page" },
  next: { vi: "Trang sau", en: "Next page" },
  goTo: { vi: "Đến trang", en: "Go to page" },
  check: { vi: "Chấm bài", en: "Check" },
  aiCheck: { vi: "AI chấm & giải thích", en: "AI grade & explain" },
  reset: { vi: "Làm lại", en: "Reset" },
  score: { vi: "Điểm", en: "Score" },
  listen: { vi: "Nghe", en: "Listen" },
  practice: { vi: "Luyện đọc", en: "Practice" },
  record: { vi: "Ghi âm", en: "Record" },
  stop: { vi: "Dừng", en: "Stop" },
  recording: { vi: "Đang ghi âm… hãy đọc to", en: "Recording… read aloud" },
  youSaid: { vi: "Bạn đã đọc", en: "You said" },
  playback: { vi: "Nghe lại giọng tôi", en: "Play my voice" },
  thinking: { vi: "AI đang chấm…", en: "AI is grading…" },
  aiOffline: {
    vi: "Chưa kết nối API — đang chấm theo đáp án có sẵn. Thêm ANTHROPIC_API_KEY vào file .env để AI chấm & giải thích.",
    en: "API not connected — grading with the answer key only. Add ANTHROPIC_API_KEY to .env to enable AI grading.",
  },
  aiOnline: { vi: "AI chấm điểm: đã kết nối", en: "AI grading: connected" },
  noSpeech: {
    vi: "Trình duyệt chưa hỗ trợ nhận dạng giọng nói. Hãy dùng Chrome hoặc Edge.",
    en: "Speech recognition is not supported. Please use Chrome or Edge.",
  },
  correctAnswer: { vi: "Đáp án", en: "Answer" },
  sample: { vi: "Bài mẫu", en: "Sample" },
  yourAnswer: { vi: "Bạn trả lời", en: "Your answer" },
  explanation: { vi: "Giải thích", en: "Explanation" },
  corrected: { vi: "Câu sửa lại", en: "Corrected version" },
  feedback: { vi: "Nhận xét", en: "Feedback" },
  tips: { vi: "Mẹo luyện tập", en: "Tips" },
  writeHere: { vi: "Viết câu trả lời bằng tiếng Ý…", en: "Write your answer in Italian…" },
  speakHint: { vi: "Bấm ghi âm, trả lời bằng tiếng Ý. Bạn có thể sửa lại chữ trước khi chấm.", en: "Press record and answer in Italian. You can edit the transcript before grading." },
  vero: { vi: "Vero (Đúng)", en: "Vero (True)" },
  falso: { vi: "Falso (Sai)", en: "Falso (False)" },
  page: { vi: "Trang", en: "Page" },
  emptyBook: {
    vi: "Sách đang chờ trang đầu tiên của bạn. Mỗi ngày gửi một trang, trang mới sẽ xuất hiện ở đây.",
    en: "The book is waiting for your first page. Each new page you send will appear here.",
  },
  openBook: { vi: "Mở sách", en: "Open the book" },
  clearMistakes: { vi: "Xoá sổ lỗi", en: "Clear notebook" },
  goToPage: { vi: "Mở trang này", en: "Open this page" },
  pronunciation: { vi: "Phát âm", en: "Pronunciation" },
  accuracy: { vi: "Độ chính xác", en: "Accuracy" },
  speechRate: { vi: "Tốc độ đọc mẫu", en: "Model voice speed" },
  close: { vi: "Đóng", en: "Close" },
  of: { vi: "trên", en: "of" },
  done: { vi: "đã làm", en: "done" },
  transcript: { vi: "Lời bài nghe", en: "Transcript" },
  hideTranscript: { vi: "Ẩn lời", en: "Hide transcript" },
  ttsAudio: {
    vi: "Giọng máy của trình duyệt — thêm key giọng đọc AI vào .env để nghe giọng tự nhiên (hoặc gửi file nghe của sách)",
    en: "Browser voice — add an AI voice key to .env for a natural voice (or add the book's audio file)",
  },
  autoTranscript: {
    vi: "Lời này được máy chép tự động từ file nghe, có thể sai vài chữ (tên riêng, con số).",
    en: "Transcribed automatically from the audio; a few words (names, numbers) may be off.",
  },
  ttsNeural: { vi: "Giọng đọc AI (chưa có file nghe của sách)", en: "AI voice (book audio file not added yet)" },
  speed: { vi: "Tốc độ", en: "Speed" },
  loop: { vi: "Lặp lại", en: "Repeat" },
  progressTitle: { vi: "Lộ trình & bảng điểm", en: "Learning path & scores" },
  path: { vi: "Lộ trình", en: "My path" },
  pick: { vi: "— chọn —", en: "— choose —" },
} satisfies Record<string, L10n>;

export type StringKey = keyof typeof strings;

export function t(lang: Lang, key: StringKey): string {
  return strings[key][lang];
}

export function tr(lang: Lang, value?: L10n): string | undefined {
  return value ? value[lang] : undefined;
}
