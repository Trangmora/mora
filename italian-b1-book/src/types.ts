/**
 * Kiểu dữ liệu của cuốn sách.
 * Mỗi trang sách là một file trong src/content/pages, gồm danh sách "block" theo đúng thứ tự trong sách.
 */

export type Lang = "vi" | "en";

/** Kỹ năng được chấm điểm trong lộ trình học. */
export type Skill = "listening" | "writing" | "grammar" | "reading" | "speaking";

/** Bản dịch sang tiếng Việt và tiếng Anh. */
export type L10n = { vi: string; en: string };

export type SceneName =
  | "cafe"
  | "station"
  | "market"
  | "city"
  | "home"
  | "office"
  | "travel"
  | "friends"
  | "food"
  | "weather";

// ---------- Bài tập ----------

/** Điền vào chỗ trống. Mỗi "___" trong prompt là một ô trống. */
export type FillExercise = {
  kind: "fill";
  items: {
    id: string;
    prompt: string;
    /** Đáp án cho từng ô trống theo thứ tự; nhiều đáp án đúng ngăn cách bởi "|". */
    answers: string[];
    hint?: string;
  }[];
  /** Ngân hàng từ (nếu sách cho sẵn các từ để chọn). */
  wordBank?: string[];
};

/** Trắc nghiệm / chọn đáp án đúng. */
export type ChoiceExercise = {
  kind: "choice";
  items: {
    id: string;
    prompt: string;
    options: string[];
    /** Vị trí đáp án đúng (bắt đầu từ 0). */
    answer: number;
  }[];
};

/** Nối cột A với cột B. */
export type MatchExercise = {
  kind: "match";
  left: { id: string; text: string }[];
  right: { id: string; text: string }[];
  /** leftId -> rightId */
  answer: Record<string, string>;
};

/** Đúng / Sai (Vero / Falso). */
export type TrueFalseExercise = {
  kind: "truefalse";
  items: { id: string; prompt: string; answer: boolean }[];
};

/** Viết tự do / biến đổi câu — chấm bằng AI (có đáp án mẫu thì so sánh luôn). */
export type WriteExercise = {
  kind: "write";
  items: { id: string; prompt: string; sample?: string; lines?: number }[];
};

/** Bài nói — ghi âm, chuyển thành chữ rồi AI chấm. */
export type SpeakExercise = {
  kind: "speak";
  items: { id: string; prompt: string; sample?: string }[];
};

/** Một ô trong mẫu đơn (form): ô viết hoặc ô tích chọn. */
export type FormField = {
  id: string;
  /** Nhãn của ô, giữ nguyên như sách, ví dụ "Cognome" hay "1. Quante lingue conosce?". */
  label: string;
  /** Tiêu đề nhỏ hiện phía trên ô này (khi mẫu đơn chuyển sang phần mới). */
  section?: string;
  /** Ô đã điền sẵn trong sách (ví dụ "Smith"). */
  given?: string;
  /** Đáp án của ô viết; nhiều đáp án đúng ngăn cách bởi "|". Bỏ trống = câu trả lời cá nhân, AI chấm. */
  answers?: string;
  /** Các ô tích (☐ sì ☐ no). */
  options?: string[];
  /** Vị trí ô tích đúng (bắt đầu từ 0). */
  answer?: number;
  /** Cột trong mẫu đơn: 1 (trái), 2 (phải) hoặc "foot" (hàng cuối như Data / Firma). */
  col?: 1 | 2 | "foot";
  /** Dòng phụ dưới tiêu đề phần (ví dụ "Allora rispondete alle seguenti domande:"). */
  sectionNote?: string;
  /** Số dòng kẻ để viết (mặc định 1). */
  lines?: number;
  /** Số cột cho các ô tích. */
  optionCols?: number;
};

/** Mẫu đơn: điền thông tin, trả lời câu hỏi, tích ô — như phiếu đăng ký trong sách. */
export type FormExercise = {
  kind: "form";
  /** Kiểu mẫu đơn giống sách. */
  formStyle?: "corso" | "siena";
  /** Tiêu đề in trên mẫu đơn, ví dụ "CORSO DI LINGUA". */
  formTitle?: string;
  /** Dòng tiêu đề phụ, ví dụ "MODULO DI ISCRIZIONE". */
  formSubtitle?: string;
  items: FormField[];
};

/** Ảnh nằm trong một phần của bài (chữ chạy quanh ảnh như sách). */
export type InlineImage = {
  /** Ảnh có sẵn (public/images/…). */
  src?: string;
  /** Hoặc ảnh thật tìm theo từ khoá. */
  photo?: string;
  alt: string;
  side: "left" | "right";
  /** Chiều rộng ảnh, % khung. */
  width: number;
};

/** Đoạn văn / hội thoại có chỗ trống ngay trong câu — xem cú pháp ở src/lib/cloze.ts. */
export type ClozeExercise = {
  kind: "cloze";
  parts: {
    /** Tiêu đề phần, ví dụ "Tutti i numeri… del Bel Paese" hoặc "A. Yunjie Bo, cinese…". */
    title?: string;
    text: string;
    image?: InlineImage;
    /** Đóng khung như sách (viền xanh bo góc). */
    boxed?: boolean;
    /** Chia chữ thành 2 cột. */
    columns?: 1 | 2;
  }[];
  /** Nguồn trích, ví dụ "(adattato da Focus, n. 2, 2000)". */
  source?: string;
};

export type ExerciseBody =
  | FillExercise
  | ClozeExercise
  | FormExercise
  | ChoiceExercise
  | MatchExercise
  | TrueFalseExercise
  | WriteExercise
  | SpeakExercise;

export type Exercise = ExerciseBody & {
  /** Mã duy nhất trong toàn sách, ví dụ "p12-ex3". */
  id: string;
  /** Số thứ tự bài như trong sách (1, 2, 3a...). */
  number?: string;
  /** Đề bài tiếng Ý, giữ nguyên như sách. */
  instruction: string;
  /** Dịch đề bài. */
  tr?: L10n;
  /** Gắn với một bài đọc / nghe trong trang (nếu có). */
  refText?: string;
  /** Kỹ năng của bài (nếu bỏ trống sẽ tự đoán: nghe sau bài audio, viết, nói, đọc, còn lại là ngữ pháp). */
  skill?: Skill;
  /** Icon dưới số bài như trong sách. */
  icons?: BadgeIcon[];
};

export type BadgeIcon = "speak" | "look" | "read" | "write" | "listen";

// ---------- Block nội dung ----------

export type Block =
  | {
      type: "unitHeader";
      unit: string;
      title: string;
      tr?: L10n;
      /** Câu dẫn mục tiêu, ví dụ "In questa Unità impariamo a:". */
      intro?: string;
      /** Mục tiêu bài học (tiếng Ý như sách + bản dịch). */
      goals?: { it?: string; tr: L10n }[];
    }
  | { type: "heading"; text: string; tr?: L10n; level?: 2 | 3 }
  | { type: "text"; it: string; tr?: L10n; title?: string; readAloud?: boolean }
  | { type: "dialogue"; title?: string; lines: { speaker: string; it: string; tr?: L10n }[] }
  | { type: "vocab"; title?: string; items: { it: string; tr: L10n; note?: string }[] }
  | {
      type: "image";
      /** Ảnh thật tự tìm theo từ khoá (tiếng Anh cho kết quả tốt nhất), ví dụ "Italian espresso bar". */
      photo?: string;
      /** Chọn ảnh thứ mấy trong kết quả tìm (0 = ảnh đầu tiên) nếu ảnh đầu chưa hợp. */
      photoIndex?: number;
      /** Ảnh có sẵn: file trong public/images hoặc đường link ảnh. */
      src?: string;
      /** Tranh vẽ dự phòng khi không tải được ảnh. */
      scene?: SceneName;
      caption?: L10n;
      alt?: string;
      float?: "left" | "right";
    }
  | {
      type: "grammar";
      title: string;
      tr?: L10n;
      /** Giải thích ngữ pháp bằng VI/EN. */
      explain?: L10n;
      table?: { head: string[]; rows: string[][] };
      examples?: { it: string; tr?: L10n }[];
    }
  | { type: "tip"; it?: string; tr: L10n }
  /** Tiêu đề phần lớn như "Cominciamo". */
  | { type: "sectionTitle"; text: string; banner?: string }
  /** Chia cột như trong sách; widths là tỉ lệ mỗi cột (ví dụ [3, 5, 2]). */
  | { type: "columns"; cols: Block[][]; widths?: number[]; align?: "start" | "center" | "end" }
  /** Ảnh cắt từ trang sách (public/images/…). */
  | { type: "photo"; src: string; alt: string; caption?: L10n }
  /** Ảnh ghép đặt tự do như trang sách: x, y, w tính theo % khung; height tính theo % chiều rộng. */
  | { type: "collage"; height: number; items: { src: string; alt: string; x: number; y: number; w: number; caption?: L10n }[] }
  /** Chữ "dán" trang trí như trong sách, ví dụ "CIAO!". */
  | { type: "sticker"; text: string; tr?: L10n }
  | {
      type: "audio";
      /** Số track như trong sách, ví dụ "1.04". */
      track?: string;
      title?: string;
      /** File nghe của sách, đặt trong public/audio (ví dụ "/audio/1-04.mp3"). */
      src?: string;
      /** Lời bài nghe. Nếu không có file mp3, máy sẽ đọc lời này bằng giọng Ý. Dạng "Tên: câu" để chia người nói. */
      transcript?: string;
      /** Lời bài nghe được chép tự động từ file nghe (có thể sai sót nhỏ). */
      autoTranscript?: boolean;
      tr?: L10n;
    }
  | { type: "exercise"; ex: Exercise };

export type BookPage = {
  /** Mã duy nhất, ví dụ "p012". */
  id: string;
  /** Số trang in trong sách. */
  number: number;
  /** Tên bài / đơn vị (Unità) để hiện trong mục lục. */
  unit: string;
  unitTitle: string;
  /** Tiêu đề phần của trang (hiện trong mục lục). */
  title: string;
  /** Ngày bạn học trang này. */
  addedOn?: string;
  /** Tiêu đề chạy ở đầu trang như sách (ví dụ "Cominciamo"). */
  runningHead?: string;
  /** Dải chữ đỏ ở đầu trang (ví dụ "GLI STRANIERI E L'ITALIA"). */
  banner?: string;
  /** Thẻ bên lề (trang lẻ ở phải, trang chẵn ở trái), ví dụ "U1 · Entriamo in Italia!". */
  sideTab?: { unit: string; title: string };
  blocks: Block[];
};
