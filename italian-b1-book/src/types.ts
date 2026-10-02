/**
 * Kiểu dữ liệu của cuốn sách.
 * Mỗi trang sách là một file trong src/content/pages, gồm danh sách "block" theo đúng thứ tự trong sách.
 */

export type Lang = "vi" | "en";

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

export type ExerciseBody =
  | FillExercise
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
};

// ---------- Block nội dung ----------

export type Block =
  | { type: "unitHeader"; unit: string; title: string; tr?: L10n; goals?: L10n[] }
  | { type: "heading"; text: string; tr?: L10n; level?: 2 | 3 }
  | { type: "text"; it: string; tr?: L10n; title?: string; readAloud?: boolean }
  | { type: "dialogue"; title?: string; lines: { speaker: string; it: string; tr?: L10n }[] }
  | { type: "vocab"; title?: string; items: { it: string; tr: L10n; note?: string }[] }
  | { type: "image"; scene?: SceneName; src?: string; caption?: L10n; alt?: string; float?: "left" | "right" }
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
  | {
      type: "audio";
      /** Số track như trong sách, ví dụ "1.04". */
      track?: string;
      title?: string;
      /** File nghe của sách, đặt trong public/audio (ví dụ "/audio/1-04.mp3"). */
      src?: string;
      /** Lời bài nghe. Nếu không có file mp3, máy sẽ đọc lời này bằng giọng Ý. Dạng "Tên: câu" để chia người nói. */
      transcript?: string;
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
  blocks: Block[];
};
