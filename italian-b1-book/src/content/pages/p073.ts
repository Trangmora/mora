import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 73 (La situazione: Un invito a cena!, bài 10). */
const page: BookPage = {
  id: "p073",
  number: 73,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", title: "L'Italia a tavola" },
  title: "La situazione · Un invito a cena!",
  runningHead: "La situazione",
  ribbon: "Un invito a cena!",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p073-ex10a", number: "10", label: "A", icons: ["listen"], kind: "speak", skill: "listening", instruction: "Ascoltiamo il dialogo.", tr: { vi: "Nghe đoạn hội thoại.", en: "Let's listen to the dialogue." }, items: [] },
    },
    {
      type: "audio",
      src: "audio/u4-p73-ex10a.mp3",
      title: "10 A",
      autoTranscript: true,
      transcript: [
        "Elena: Ragazze, ho un'idea! Vogliamo organizzare una cena per i nostri amici per venerdì prossimo a casa mia?",
        "Grazia: Oh, grazie! Che bella idea!",
        "Amica: Sì, mi fa piacere! Possiamo prepararla insieme!",
        "Elena: E tu, Giordana, che ne pensi?",
        "Giordana: Mi dispiace, ragazze, ma purtroppo venerdì avrei un impegno. Magari verrò la prossima volta.",
        "Grazia: Va bene. Allora, Elena, che cosa vogliamo cucinare?",
        "Elena: Andiamo sul classico. Pasta all'amatriciana?",
        "Grazia: No, perché non facciamo un piatto nuovo? Ho letto una ricetta strepitosa su una rivista. Aspetta, ora te la faccio vedere.",
        "Elena: Ah, risotto ai gamberi? Vorrei proprio assaggiarlo. Allora, mettiamoci al lavoro!",
      ].join("\n"),
    },
    { type: "photo", src: "images/u4/p73-cucina.jpg", alt: "Elena e Grazia chiacchierano in cucina" },
    {
      type: "exercise",
      ex: { id: "p073-ex10b", label: "B", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "La ricetta di Elena e Grazia", tr: { vi: "Cùng đọc: Công thức của Elena và Grazia.", en: "Let's read: Elena and Grazia's recipe." }, items: [] },
    },
    { type: "theory", text: "# Risotto con verdure e gamberi" },
    {
      type: "columns",
      cols: [
        [
          { type: "photo", src: "images/u4/p73-risotto.jpg", alt: "Un piatto di risotto con verdure e gamberi" },
          { type: "theory", text: "**Preparazione:** 30 minuti\n**Cottura:** 30 minuti\n**Difficoltà:** ★" },
        ],
        [
          {
            type: "theory",
            text: "## Ingredienti per 4 persone:\n- 280 grammi di riso\n- 80 grammi di piselli\n- 80 grammi di asparagi\n- 80 grammi di zucchine\n- 80 grammi di carote\n- una cipolla piccola\n- 200 grammi di gamberi precotti\n- un mazzetto di erbe miste (prezzemolo, basilico)\n- 1,5 litro di brodo vegetale\n- 100 grammi di burro\n- olio extra vergine di oliva\n- sale",
          },
        ],
        [
          {
            type: "theory",
            text: "## Procedimento:\nTagliare la cipolla e le altre verdure. Mettere la cipolla in una padella con 60 grammi di burro, aggiungere il riso e mescolarlo per qualche minuto. Aggiungere tutte le verdure e il brodo a poco a poco. Mescolare bene. Intanto mettere i gamberi in un'altra padella con poco olio per pochi minuti. Tagliare le erbe, togliere il risotto dal fuoco, aggiungere il burro, le erbe e metà dei gamberi. Mescolare piano, versare il risotto nei piatti, distribuire l'altra metà dei gamberi e servire subito.",
          },
        ],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p073-ex10c",
        label: "C",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo.",
        intro: "Scrivete una ricetta tipica del vostro paese.",
        tr: { vi: "Cùng viết: viết một công thức món ăn đặc trưng của nước bạn.", en: "Let's write: write a typical recipe from your country." },
        items: [
          {
            id: "a",
            prompt: "",
            lines: 6,
            sample: "Phở (zuppa di manzo e spaghetti di riso). Ingredienti per 4 persone: 400 grammi di spaghetti di riso, 300 grammi di carne di manzo, 2 litri di brodo di manzo, una cipolla, zenzero, anice stellato, cannella, erbe fresche, lime, sale. Procedimento: abbrustolire la cipolla e lo zenzero, metterli nel brodo con le spezie e cuocere per due ore. Tagliare la carne a fette sottili. Cuocere gli spaghetti, metterli nelle ciotole con la carne cruda e versare il brodo bollente. Servire con le erbe e il lime.",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p073-ex10d",
        label: "D",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo (a coppie).",
        intro: "Invitate alcuni amici a cena: descrivete quello che volete preparare e chiedete ai vostri amici di portarvi una loro specialità.",
        tr: { vi: "Nói theo cặp: mời bạn bè đến ăn tối, kể món bạn định nấu và nhờ bạn bè mang một món đặc sản của họ.", en: "Talk in pairs: invite some friends to dinner, describe what you want to cook and ask them to bring one of their specialities." },
        items: [
          { id: "1", prompt: "Invita i tuoi amici a cena.", sample: "Sabato sera vi invito a cena da me: preparo un risotto con verdure e gamberi e un arrosto. Mi portereste il vostro tiramisù? È buonissimo!" },
        ],
      },
    },
  ],
};

export default page;
