import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 166 (Cominciamo, bài 1: Personaggi famosi). */
const page: BookPage = {
  id: "p166",
  number: 166,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  title: "Cominciamo · Personaggi famosi",
  blocks: [
    {
      type: "unitHeader",
      unit: "9",
      title: "Facciamo un'intervista!",
      intro: "In questa Unità impariamo a:",
      goals: [
        { it: "dire le nostre idee su fatti e persone", tr: { vi: "nói ý kiến của mình về sự việc và con người", en: "say what we think about facts and people" } },
        { it: "esprimere apprezzamenti", tr: { vi: "bày tỏ sự đánh giá, khen ngợi", en: "express appreciation" } },
        { it: "fare domande e rispondere a domande", tr: { vi: "đặt câu hỏi và trả lời câu hỏi", en: "ask and answer questions" } },
      ],
    },
    { type: "sectionTitle", text: "Cominciamo", banner: "PERSONAGGI FAMOSI" },
    { type: "audio", src: "audio/u9-p166-ex1.mp3", title: "1", autoTranscript: true, transcript: "1. Lilli Gruber è una giornalista famosa in Italia. Nel 2001 è diventata deputata al Parlamento europeo.\n2. Margherita Hack è una scienziata illustre, si è occupata di importanti ricerche scientifiche nel campo dell'astrofisica.\n3. È uno dei più bravi sciatori italiani: Giorgio Rocca ha partecipato a molte gare internazionali e tutti sperano che diventi un nuovo Alberto Tomba.\n4. Lino Banfi è un attore italiano di cinema e di televisione molto conosciuto: ha recitato in ruoli comici, soprattutto all'inizio della sua carriera, mentre adesso fa anche film impegnati.\n5. Mario Draghi è un economista molto esperto: nel dicembre 2005 è diventato governatore della Banca d'Italia.\n6. Margherita Buy è un'attrice bravissima del nostro cinema: ha lavorato con i migliori registi italiani, ha fatto film comici e drammatici." },
    { type: "photo", src: "images/u9/p166-personaggi.jpg", alt: "1. Lilli Gruber; 2. Margherita Hack; 3. Giorgio Rocca; 4. Lino Banfi; 5. Mario Draghi; 6. Margherita Buy" },
    {
      type: "exercise",
      ex: {
        id: "p166-ex1",
        number: "1",
        icons: ["listen", "write"],
        kind: "write",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo e scriviamo che cosa fanno i personaggi.",
        tr: { vi: "Nghe và viết những nhân vật này làm nghề gì.", en: "Let's listen and write what these people do." },
        items: [
          { id: "1", prompt: "1. Lilli Gruber", lines: 1, sample: "È una giornalista; dal 2001 è deputata al Parlamento europeo." },
          { id: "2", prompt: "2. Margherita Hack", lines: 1, sample: "È una scienziata (astrofisica)." },
          { id: "3", prompt: "3. Giorgio Rocca", lines: 1, sample: "È uno sciatore." },
          { id: "4", prompt: "4. Lino Banfi", lines: 1, sample: "È un attore di cinema e di televisione." },
          { id: "5", prompt: "5. Mario Draghi", lines: 1, sample: "È un economista; dal 2005 è governatore della Banca d'Italia." },
          { id: "6", prompt: "6. Margherita Buy", lines: 1, sample: "È un'attrice." },
        ],
      },
    },
  ],
};

export default page;
