import type { BookPage } from "../../types";

/** Unità 2 · Facciamo shopping! — trang 4 (Al telefono: cuộc gọi có tiếng nền + video YouTube). Nội dung tự soạn. */
const page: BookPage = {
  id: "p004",
  number: 4,
  unit: "2",
  unitTitle: "Facciamo shopping!",
  addedOn: "2026-10-14",
  sideTab: { unit: "U2", title: "Facciamo shopping!" },
  title: "Al telefono · Ci vediamo ai saldi?",
  runningHead: "Al telefono",
  blocks: [
    { type: "sectionTitle", text: "Al telefono", banner: "CI VEDIAMO AI SALDI?" },
    {
      type: "audio",
      track: "2.01",
      src: "audio/nb-u2-telefonata.mp3",
      title: "Pronto? Hoa chiama Tomás",
      transcript:
        "Tomás: Pronto? Hoa! Ciao!\nHoa: Ciao Tomás! Ti disturbo? Sei al lavoro?\nTomás: Sì, ma sono in pausa… Aspetta, qui c'è troppo rumore, esco un attimo. Ecco, adesso ti sento.\nHoa: Senti, sabato cominciano i saldi! Ti va di venire con me in Via dell'Indipendenza?\nTomás: Volentieri! Devo comprare una giacca per l'inverno: la mia è vecchissima.\nHoa: E io cerco un paio di scarpe comode per andare in bici. A che ora ci vediamo?\nTomás: Alle dieci va bene? Davanti alla libreria, sotto i portici.\nHoa: Perfetto! Però non spendiamo troppo, eh!\nTomás: Promesso… forse!\nChef: Tomás! Il risotto!\nTomás: Arrivo! Scusa Hoa, devo scappare. Ci sentiamo, ciao!\nHoa: A sabato, ciao ciao!",
      tr: {
        vi: "Nghe cuộc gọi: Hoa gọi cho Tomás đang làm trong bếp nhà hàng.",
        en: "Listen to the phone call: Hoa calls Tomás, who is at work in a restaurant kitchen.",
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p004-ex1",
        number: "1",
        icons: ["listen", "check"],
        kind: "truefalse",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo la telefonata: vero o falso?",
        tr: {
          vi: "Nghe cuộc gọi: đúng hay sai?",
          en: "Listen to the phone call: true or false?",
        },
        items: [
          { id: "1", prompt: "Quando Hoa chiama, Tomás è a casa.", answer: false },
          { id: "2", prompt: "Tomás esce perché in cucina c'è troppo rumore.", answer: true },
          { id: "3", prompt: "I saldi cominciano domenica.", answer: false },
          { id: "4", prompt: "Tomás vuole comprare una giacca nuova.", answer: true },
          { id: "5", prompt: "Hoa e Tomás si vedono alle dieci davanti alla libreria.", answer: true },
        ],
        why: {
          "1": {
            tr: {
              vi: "**Falso.** «Sei al lavoro?» — «Sì, ma sono **in pausa**». Tomás đang ở chỗ làm (bếp nhà hàng), chỉ đang nghỉ giải lao.",
              en: "**False.** «Sei al lavoro?» — «Sì, ma sono **in pausa**». Tomás is at work (the restaurant kitchen), just on a break.",
            },
          },
          "2": {
            tr: {
              vi: "**Vero.** «Qui c'è troppo **rumore**, esco un attimo» — ồn quá nên anh ấy ra ngoài một chút (*un attimo* = một lát).",
              en: "**True.** «Qui c'è troppo **rumore**, esco un attimo» — too noisy, so he steps out for a moment (*un attimo* = a moment).",
            },
          },
          "3": {
            tr: {
              vi: "**Falso.** «**Sabato** cominciano i saldi» — thứ Bảy, không phải Chủ nhật (*domenica*).",
              en: "**False.** «**Sabato** cominciano i saldi» — Saturday, not Sunday (*domenica*).",
            },
          },
          "4": {
            tr: {
              vi: "**Vero.** «Devo comprare **una giacca** per l'inverno: la mia è vecchissima.»",
              en: "**True.** «Devo comprare **una giacca** per l'inverno: la mia è vecchissima.»",
            },
          },
          "5": {
            tr: {
              vi: "**Vero.** «Alle dieci va bene? **Davanti alla libreria**, sotto i portici.» — «Perfetto!»",
              en: "**True.** «Alle dieci va bene? **Davanti alla libreria**, sotto i portici.» — «Perfetto!»",
            },
          },
        },
      },
    },
    {
      type: "columns",
      widths: [1, 1.15],
      cols: [
        [
          {
            type: "vocab",
            title: "Al telefono e in negozio",
            items: [
              { it: "Pronto?", tr: { vi: "A lô?", en: "Hello? (on the phone)" } },
              { it: "Ti disturbo?", tr: { vi: "Mình có làm phiền bạn không?", en: "Am I bothering you?" } },
              { it: "Ti va di…?", tr: { vi: "Bạn có muốn… không?", en: "Do you fancy…?" } },
              { it: "i saldi", tr: { vi: "mùa giảm giá", en: "the sales" } },
              { it: "un paio di scarpe", tr: { vi: "một đôi giày", en: "a pair of shoes" } },
              { it: "Ci sentiamo!", tr: { vi: "Nói chuyện sau nhé!", en: "Talk soon!" } },
            ],
          },
        ],
        [
          {
            type: "video",
            youtube: "nrsSFr-5iII",
            thumb: "images/yt/nrsSFr-5iII.jpg",
            title: "Nel negozio di abbigliamento: cosa dire per fare acquisti",
            channel: "Classe Italiana",
            duration: "6:03",
            tr: {
              vi: "Xem thêm: nói gì khi mua quần áo ở Ý (có phụ đề tiếng Ý).",
              en: "Watch more: what to say when buying clothes in Italy (Italian subtitles).",
            },
          },
        ],
      ],
    },
  ],
};

export default page;
