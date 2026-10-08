import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 184 (Viaggiamo in Italia: Intervista con la storia). */
const page: BookPage = {
  id: "p184",
  number: 184,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  title: "Viaggiamo in Italia · Intervista con la storia",
  addedOn: "2026-10-08",
  ribbon: "Viaggiamo in Italia",
  framed: true,
  sideTab: { unit: "U9", title: "Facciamo un'intervista!" },
  blocks: [
    {
      type: "exercise",
      ex: { id: "p184-ex1", number: "1", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Intervista con la storia", tr: { vi: "Cùng đọc: Phỏng vấn với lịch sử.", en: "Let's read: Interview with history." }, items: [] },
    },
    {
      type: "columns",
      widths: [2, 3],
      cols: [
        [{ type: "photo", src: "images/u9/p184-fallaci.jpg", alt: "La giornalista Oriana Fallaci" }],
        [{ type: "text", it: "Negli anni '70 il settimanale L'Europeo chiede a Oriana Fallaci di realizzare alcune interviste a personaggi dell'epoca: la giornalista riesce così a parlare, fra gli altri, con Henry Kissinger, Golda Meir, Yasser Arafat, re Hussein di Giordania, Indira Gandhi, Giulio Andreotti. Nel 1974 esce Intervista con la storia, un libro che raccoglie tutte le interviste della Fallaci. Attraverso le conversazioni con alcuni fra gli uomini più conosciuti e importanti del mondo, Oriana Fallaci ci mostra non soltanto gli aspetti" }],
      ],
    },
    {
      type: "columns",
      widths: [3, 2],
      cols: [
        [{ type: "text", it: "meno noti della loro personalità, ma anche molti momenti fondamentali della nostra storia contemporanea. Le sue domande sono dirette, semplici, acute e i suoi interlocutori apprezzano la sua bravura e la sua professionalità. Intervista con la storia ottiene un enorme successo: dopo quella esperienza la Fallaci diventa in breve tempo una delle giornaliste più famose della stampa italiana, fa numerosi reportages all'estero, anche in zone pericolose del mondo, e scrive molte riflessioni su alcuni eventi tragici di quegli anni. Dal giornalismo passa poi all'attività di scrittrice: Lettera a un bambino mai nato (1975), Un uomo (1979), Insciallah (1990) sono alcune delle sue opere più celebri. Per la Fallaci scrivere vuol dire “raccontare una storia con un significato” ed “è una grande emozione, un'emozione psicologica, politica e intellettuale”.\n(adattato da www.biografie.leonardo.it)" }],
        [{ type: "photo", src: "images/u9/p184-libri.jpg", alt: "Le copertine dei libri Intervista con la storia e Insciallah di Oriana Fallaci" }],
      ],
    },
    {
      type: "exercise",
      ex: { id: "p184-ex2", number: "2", icons: ["look"], kind: "speak", skill: "speaking", instruction: "Osserviamo l'immagine.", tr: { vi: "Quan sát bức tranh.", en: "Let's look at the picture." }, items: [{ id: "1", prompt: "Per gli italiani le interviste ai personaggi famosi sono importanti?", sample: "Sembra di sì: nella vignetta il telegiornale comincia con l'intervista a una star e solo dopo parla del nuovo presidente della Repubblica!" }] },
    },
    { type: "photo", src: "images/u9/p184-vignetta.jpg", alt: "Vignetta: un giornalista del telegiornale dice «Cari telespettatori, cominciamo il telegiornale con l'intervista alla nostra star Simona Ventura che ha comprato una nuova villa in Sardegna, poi, come seconda notizia, abbiamo il nuovo presidente della Repubblica…»" },
  ],
};

export default page;
