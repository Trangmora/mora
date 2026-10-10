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
    /** Gợi ý; trong bảng trò chơi là khung chữ như sách, ví dụ "a _ _ _ _ do _ _ o". */
    hint?: string;
    /** Tranh của ô trong bảng trò chơi. */
    image?: string;
    /** Nhãn in nghiêng phía trên câu (khung "Ora sono capace di…"), ví dụ "usare i verbi al passato prossimo:". */
    lead?: string;
  }[];
  /** Ngân hàng từ (nếu sách cho sẵn các từ để chọn). */
  wordBank?: string[];
  /** "board": bảng trò chơi chép chính tả — mỗi câu là một ô có tranh, gõ từ nghe được. */
  layout?: "board";
  board?: BoardSettings;
};

/** Trắc nghiệm / chọn đáp án đúng. */
export type ChoiceExercise = {
  kind: "choice";
  /** Các lựa chọn nằm trên cùng một dòng như sách ("libro / telefono / …"): bấm vào từ để gạch chân. */
  inline?: boolean;
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
  /** image: bài nối tranh (trang 21) — tranh có ô số "1. ……" để chọn chữ cái. */
  left: { id: string; text: string; image?: string }[];
  right: { id: string; text: string }[];
  /** leftId -> rightId */
  answer: Record<string, string>;
  /** Cặp sách đã nối sẵn làm ví dụ (leftId -> rightId). */
  given?: Record<string, string>;
  /** Tiêu đề phía trên hai cột, ví dụ "Alcune informazioni sull'Italia…". */
  title?: string;
};

/** Đúng / Sai (Vero / Falso). */
export type TrueFalseExercise = {
  kind: "truefalse";
  items: { id: string; prompt: string; answer: boolean }[];
};

/** Viết tự do / biến đổi câu — chấm bằng AI (có đáp án mẫu thì so sánh luôn). */
export type WriteExercise = {
  kind: "write";
  items: {
    id: string;
    prompt: string;
    sample?: string;
    lines?: number;
    /** Câu mở đầu sách in sẵn (đỏ), ví dụ "In Italia, nella seconda metà del 1800…". */
    starter?: string;
    /** Bài xếp từ vào cột: các từ đúng của ô này (thứ tự tuỳ ý) — chấm ngay, không cần AI. */
    wordSet?: string[];
  }[];
};

/** Bảng trò chơi "Giochiamo insieme!" (trang 10–12). */
export type BoardSettings = {
  /** Ô "Esempio" và câu mẫu (đỏ) bên cạnh; pattern là khung chữ gợi ý trong ô (bài chép chính tả). */
  example?: { prompt?: string; pattern?: string; image?: string; answer: string };
  /** Ô tổng điểm cuối bảng, ví dụ "Totale: 34 punti". */
  total?: string;
  /** Màu xen kẽ của các hàng ô: cam/vàng (trang 11), xanh lá/cam (trang 10), đỏ/xanh dương (trang 12). */
  palette?: "orange" | "green" | "red";
  /** Điểm mỗi câu đúng. */
  points?: number;
};

/** Bài nói — ghi âm, chuyển thành chữ rồi AI chấm. */
export type SpeakExercise = {
  kind: "speak";
  items: {
    id: string;
    prompt: string;
    sample?: string;
    /** Tranh của ô trong bảng trò chơi (public/images/…). */
    image?: string;
  }[];
  /** "board": bảng trò chơi "Giochiamo insieme!" — mỗi câu là một ô có tranh và số. */
  layout?: "board";
  /** Thiết lập bảng trò chơi. */
  board?: BoardSettings;
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
  side: "left" | "right" | "center";
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
    /** Cột của ô ghi chú khi bài xếp 3 cột (layout "notes3"). */
    col?: 1 | 2 | 3;
    /** Ô ghi chú vuông như "La carta d'identità." trang 7. */
    variant?: "note";
  }[];
  /** "notes3": xếp các phần thành 3 cột ô ghi chú. */
  layout?: "notes3";
  /** Tiêu đề lớn của bài, ví dụ "Giuseppe Russo, l'italiano medio". */
  heading?: string;
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
  /** Phần A / B của cùng một bài (in đậm xanh trước đề bài). */
  label?: string;
  /** Dòng phụ in nghiêng xanh dưới đề bài, ví dụ "Giochiamo insieme!". */
  subtitle?: string;
  /** Đoạn hướng dẫn in thường dưới đề bài (luật chơi…), mỗi dòng một câu. */
  intro?: string;
  /** Câu ví dụ đầu bài: "Esempio: …" và dòng đáp án mẫu "→ …". */
  example?: { q: string; a: string };
  /** Dòng "Punti …… / 10" cuối bài (bài kiểm tra Verifica). */
  points?: number;
  /** Chưa có đáp án (đang chờ file nghe): không chấm theo đáp án, chỉ chấm bằng AI; không hiện đáp án. */
  noKey?: boolean;
  /** "capace": khung nét đứt "ORA SONO CAPACE DI…" cuối bài Verifica. */
  variant?: "capace" | "twoCol";
  /** Khung "Vì sao?": giải thích ngữ pháp cho từng câu (itemId → lời giải + quy tắc trong kho kiến thức). */
  why?: Record<string, { tr: L10n; rule?: string }>;
  /** Các quy tắc trong kho kiến thức mà bài này luyện (đánh dấu "đã gặp" khi chấm bài). */
  rules?: string[];
};

export type BadgeIcon = "speak" | "look" | "read" | "write" | "listen" | "match" | "check";

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
  /** Dải chữ đỏ đặt bên phải, cạnh bài tập (ví dụ "IERI E OGGI"). */
  | { type: "banner"; text: string }
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
  /**
   * Trang lý thuyết ngữ pháp (Grammatica) chia 2 cột như sách. Cú pháp từng dòng:
   * "# TIÊU ĐỀ" (đỏ gạch chân) · "## Tiêu đề phụ" (cam) · "! ATTENZIONE!" (cam nghiêng)
   * "- gạch đầu dòng" · "> ví dụ" (nghiêng, bấm để nghe; thụt vào nếu ngay sau "- "; ">> " luôn thụt vào)
   * "| a | b | c" bảng cam (dòng đầu là tiêu đề) · "%% • a || • b" hai cột hội thoại ngắn
   * "===" sang cột mới · dòng trống = đoạn mới · **đậm**, *nghiêng*, ***đậm nghiêng***.
   */
  | { type: "theory"; text: string; tr?: L10n }
  /**
   * Bảng cam như "Usiamo l'imperfetto per…": head = tiêu đề cột, rows = các hàng ô.
   * Trong ô: "\n" xuống dòng, **đỏ đậm**, ^^xanh đậm^^, *nghiêng*. firstCol: cột đầu là nhãn (io, tu…).
   */
  | { type: "gridTable"; head: string[]; rows: string[][]; firstCol?: boolean; split?: number[] }
  /** Biểu đồ cột ngang như sách (trang 20). */
  | { type: "barChart"; bars: { label: string; value: number; color: string }[]; max: number; step: number; caption?: L10n }
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
  sideTab?: { unit: string; title?: string; /** Màu thẻ (mặc định xanh), ví dụ đỏ ở Lessico, cam ở Grammatica. */ color?: string };
  /** Nền màu cả trang (trang Verifica màu xanh nhạt). */
  tint?: "blue";
  /** Dải đỏ nghiêng đầu trang như "Viaggiamo in Italia", "Un'italiana famosa". */
  ribbon?: string;
  /** Khung viền mảnh bao nội dung trang. */
  framed?: boolean;
  /** Khung sổ gáy lò xo bao quanh trang, với tiêu đề cam như "Ripassiamo quello che abbiamo studiato!". */
  notebook?: { title: string };
  blocks: Block[];
};
