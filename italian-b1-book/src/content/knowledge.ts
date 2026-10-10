import type { L10n } from "../types";

/**
 * Kho kiến thức: các quy tắc ngữ pháp mà bài tập dẫn tới.
 * Bài tập gắn quy tắc qua `rules` (cả bài) hoặc `why[itemId].rule` (từng câu).
 */
export type Rule = {
  id: string;
  /** Tên quy tắc bằng tiếng Ý. */
  title: string;
  titleTr: L10n;
  /** Nhóm để xếp trong kho: verbi, pronomi, comunicazione… */
  group: "verbi" | "pronomi" | "comunicazione";
  summary: L10n;
  /** Bảng chia động từ / bảng nhỏ: mỗi hàng là [it, ghi chú vi, ghi chú en]. */
  table?: [it: string, vi: string, en: string][];
  examples: { it: string; tr: L10n }[];
  /** Mẹo nhớ / lỗi hay gặp. */
  tip?: L10n;
};

export const groupTitle: Record<Rule["group"], L10n> = {
  verbi: { vi: "Động từ", en: "Verbs" },
  pronomi: { vi: "Đại từ", en: "Pronouns" },
  comunicazione: { vi: "Giao tiếp", en: "Communication" },
};

export const rules: Rule[] = [
  {
    id: "essere",
    title: "Il presente di essere",
    titleTr: { vi: "Thì hiện tại của essere (là, ở)", en: "Present tense of essere (to be)" },
    group: "verbi",
    summary: {
      vi: "Essere là động từ bất quy tắc. Dùng để nói quốc tịch, quê quán (essere di + thành phố), nghề, tính chất.",
      en: "Essere is irregular. We use it for nationality, origin (essere di + city), job and qualities.",
    },
    table: [
      ["io sono", "tôi là", "I am"],
      ["tu sei", "bạn là", "you are"],
      ["lui / lei / Lei è", "anh ấy / cô ấy / ngài là", "he / she / you (formal) are"],
      ["noi siamo", "chúng tôi là", "we are"],
      ["voi siete", "các bạn là", "you (pl.) are"],
      ["loro sono", "họ là", "they are"],
    ],
    examples: [
      { it: "Tomás è argentino.", tr: { vi: "Tomás là người Argentina.", en: "Tomás is Argentinian." } },
      { it: "Voi di dove siete?", tr: { vi: "Các bạn từ đâu đến?", en: "Where are you all from?" } },
    ],
    tip: {
      vi: "Chú ý dấu: è (là) ≠ e (và). «sono» dùng cho cả io và loro — nhìn chủ ngữ để biết.",
      en: "Mind the accent: è (is) ≠ e (and). «sono» is both io and loro — look at the subject.",
    },
  },
  {
    id: "avere",
    title: "Il presente di avere",
    titleTr: { vi: "Thì hiện tại của avere (có)", en: "Present tense of avere (to have)" },
    group: "verbi",
    summary: {
      vi: "Avere bất quy tắc, chữ h không đọc. Tiếng Ý dùng avere để nói tuổi: «ho 28 anni» (không dùng essere!).",
      en: "Avere is irregular; the h is silent. Italian uses avere for age: «ho 28 anni» (not essere!).",
    },
    table: [
      ["io ho", "tôi có", "I have"],
      ["tu hai", "bạn có", "you have"],
      ["lui / lei / Lei ha", "anh ấy / cô ấy / ngài có", "he / she / you (formal) have"],
      ["noi abbiamo", "chúng tôi có", "we have"],
      ["voi avete", "các bạn có", "you (pl.) have"],
      ["loro hanno", "họ có", "they have"],
    ],
    examples: [
      { it: "Noi abbiamo lezione alle nove.", tr: { vi: "Chúng tôi có giờ học lúc chín giờ.", en: "We have class at nine." } },
      { it: "Quanti anni hai? — Ho ventotto anni.", tr: { vi: "Bạn bao nhiêu tuổi? — Tôi 28 tuổi.", en: "How old are you? — I'm twenty-eight." } },
    ],
    tip: {
      vi: "Người Việt hay nói «sono 28 anni» theo tiếng Anh «I am». Sai! Luôn là «ho … anni».",
      en: "Learners often say «sono 28 anni» like English «I am». Wrong! It's always «ho … anni».",
    },
  },
  {
    id: "fare",
    title: "Il presente di fare",
    titleTr: { vi: "Thì hiện tại của fare (làm)", en: "Present tense of fare (to do / make)" },
    group: "verbi",
    summary: {
      vi: "Fare bất quy tắc. Nói nghề nghiệp: fare + mạo từ xác định + nghề («faccio il cuoco»), hoặc essere + nghề không mạo từ («sono cuoco»).",
      en: "Fare is irregular. For jobs: fare + definite article + job («faccio il cuoco»), or essere + job without article («sono cuoco»).",
    },
    table: [
      ["io faccio", "tôi làm", "I do"],
      ["tu fai", "bạn làm", "you do"],
      ["lui / lei / Lei fa", "anh ấy / cô ấy / ngài làm", "he / she / you (formal) do"],
      ["noi facciamo", "chúng tôi làm", "we do"],
      ["voi fate", "các bạn làm", "you (pl.) do"],
      ["loro fanno", "họ làm", "they do"],
    ],
    examples: [
      { it: "Che lavoro fai? — Faccio il cuoco.", tr: { vi: "Bạn làm nghề gì? — Tôi là đầu bếp.", en: "What do you do? — I'm a cook." } },
      { it: "Hoa fa l'architetta? No, studia architettura.", tr: { vi: "Hoa làm kiến trúc sư à? Không, cô ấy học kiến trúc.", en: "Is Hoa an architect? No, she studies architecture." } },
    ],
  },
  {
    id: "chiamarsi",
    title: "I verbi riflessivi: chiamarsi",
    titleTr: { vi: "Động từ phản thân: chiamarsi (tên là)", en: "Reflexive verbs: chiamarsi (to be called)" },
    group: "verbi",
    summary: {
      vi: "Động từ đuôi -arsi / -ersi / -irsi là phản thân: luôn đi với đại từ mi, ti, si, ci, vi, si đứng TRƯỚC động từ đã chia.",
      en: "Verbs ending in -arsi / -ersi / -irsi are reflexive: they always take mi, ti, si, ci, vi, si BEFORE the conjugated verb.",
    },
    table: [
      ["io mi chiamo", "tôi tên là", "my name is"],
      ["tu ti chiami", "bạn tên là", "your name is"],
      ["lui / lei / Lei si chiama", "anh ấy / cô ấy / ngài tên là", "his / her / your (formal) name is"],
      ["noi ci chiamiamo", "chúng tôi tên là", "our names are"],
      ["voi vi chiamate", "các bạn tên là", "your (pl.) names are"],
      ["loro si chiamano", "họ tên là", "their names are"],
    ],
    examples: [
      { it: "Come si chiama la vostra insegnante?", tr: { vi: "Cô giáo của các bạn tên là gì?", en: "What's your teacher's name?" } },
      { it: "Mi chiamo Tomás, piacere.", tr: { vi: "Tôi tên là Tomás, rất vui được gặp.", en: "My name is Tomás, nice to meet you." } },
    ],
    tip: {
      vi: "Chủ ngữ «la vostra insegnante» là ngôi thứ ba số ít → «si chiama». Đừng để «vostra» (của các bạn) đánh lừa thành «vi chiamate».",
      en: "The subject «la vostra insegnante» is third person singular → «si chiama». Don't let «vostra» trick you into «vi chiamate».",
    },
  },
  {
    id: "tu-lei",
    title: "Tu o Lei?",
    titleTr: { vi: "Xưng tu hay Lei?", en: "Tu or Lei?" },
    group: "comunicazione",
    summary: {
      vi: "Tu: với bạn bè, người trẻ, gia đình. Lei (viết hoa): lịch sự với người lạ, người lớn tuổi, khách hàng — động từ chia ở ngôi thứ ba số ít.",
      en: "Tu: with friends, young people, family. Lei (capital L): polite with strangers, older people, customers — the verb is third person singular.",
    },
    table: [
      ["Come ti chiami?", "tu — thân mật", "tu — informal"],
      ["Come si chiama?", "Lei — lịch sự", "Lei — formal"],
      ["Di dove sei?", "tu", "tu"],
      ["Di dov'è?", "Lei", "Lei"],
    ],
    examples: [
      { it: "Buongiorno, signora. Lei è la nuova insegnante?", tr: { vi: "Chào cô. Cô là giáo viên mới phải không ạ?", en: "Good morning, madam. Are you the new teacher?" } },
    ],
  },
  {
    id: "ne-quantita",
    title: "Ne con le quantità",
    titleTr: { vi: "Đại từ ne khi nói số lượng", en: "The pronoun ne with quantities" },
    group: "pronomi",
    summary: {
      vi: "Khi trả lời bằng một con số mà không lặp lại danh từ, tiếng Ý thêm «ne» trước động từ: «Ne ho ventotto» = tôi có 28 (tuổi).",
      en: "When you answer with a number without repeating the noun, Italian adds «ne» before the verb: «Ne ho ventotto» = I have twenty-eight (of them).",
    },
    examples: [
      { it: "Quanti anni hai? — Ne ho ventotto.", tr: { vi: "Bạn bao nhiêu tuổi? — 28 tuổi.", en: "How old are you? — Twenty-eight." } },
      { it: "Quanti fratelli hai? — Ne ho due.", tr: { vi: "Bạn có mấy anh chị em? — Hai.", en: "How many siblings do you have? — Two." } },
    ],
  },
  {
    id: "domande",
    title: "Le parole per fare domande",
    titleTr: { vi: "Từ để hỏi", en: "Question words" },
    group: "comunicazione",
    summary: {
      vi: "Từ để hỏi quyết định kiểu câu trả lời: come → tên/cách thức, quanti → số lượng, che → cái gì/loại gì, perché → lý do (trả lời cũng bằng perché).",
      en: "The question word decides the answer: come → name/manner, quanti → number, che → what/which, perché → reason (answer with perché too).",
    },
    table: [
      ["Come…?", "thế nào / tên gì", "how / what name"],
      ["Quanti / quante…?", "bao nhiêu", "how many"],
      ["Che (cosa)…?", "cái gì / nghề gì", "what / which job"],
      ["Perché…?", "tại sao → Perché…", "why → Perché…"],
      ["Di dove…?", "từ đâu", "where from"],
    ],
    examples: [
      { it: "Perché studi l'italiano? — Perché voglio lavorare in Italia.", tr: { vi: "Sao bạn học tiếng Ý? — Vì tôi muốn làm việc ở Ý.", en: "Why do you study Italian? — Because I want to work in Italy." } },
    ],
  },
];

export const ruleById = new Map(rules.map((r) => [r.id, r]));
