import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 188 (Osserviamo bene, bài 4–5: i vari tipi di si). */
const page: BookPage = {
  id: "p188",
  number: 188,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", title: "Tradizioni popolari" },
  title: "Osserviamo bene · I vari tipi di si",
  banner: "SI AMANO!",
  blocks: [
    { type: "sectionTitle", text: "Osserviamo bene" },
    {
      type: "exercise",
      ex: { id: "p188-ex4a", number: "4", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "… guardiamo i vari tipi di si!", tr: { vi: "Cùng đọc: … xem các loại si khác nhau!", en: "Let's read: … let's look at the different kinds of si!" }, items: [] },
    },
    { type: "theory", text: "### Si riflessivo\n> Marco **si lava**. = Marco lava Marco.\n> Gino **si è pettinato**. = Gino ha pettinato Gino.\n> Piero **si lava le mani**. = Piero lava le mani di Piero.\n### Si pronominale\n> Carla **si vergogna**. = SÌ: Carla prova vergogna. / NO: Carla vergogna Carla.\n> Il bambino **si è addormentato**. = SÌ: Il bambino ha cominciato a dormire. / NO: Il bambino ha addormentato il bambino.\n### Si riflessivo reciproco\n> Carlo e Giulia **si baciano**. = Carlo bacia Giulia e Giulia bacia Carlo.\n> Piero e Lucia non **si sono salutati**. = Piero non ha salutato Lucia e Lucia non ha salutato Piero." },
    {
      type: "exercise",
      ex: {
        id: "p188-ex4b",
        label: "B",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Scriviamo: completiamo le frasi con i verbi e indichiamo se sono riflessivi, pronominali o reciproci.",
        example: { q: "1. Caterina (*tagliarsi*) …… i capelli perché erano troppo lunghi.", a: "Caterina ***si è tagliata*** i capelli perché erano troppo lunghi. = ***riflessivo***" },
        tr: { vi: "Cùng viết: hoàn thành câu với động từ và cho biết là phản thân, đại từ hay tương hỗ.", en: "Let's write: complete the sentences with the verbs and say whether they are reflexive, pronominal or reciprocal." },
        items: [
          { id: "2", prompt: "2. Ugo (*svegliarsi*) ___ presto perché doveva partire. = ___", answers: ["si è svegliato|si svegliava", "pronominale"] },
          { id: "3", prompt: "3. Pare che (*loro, incontrarsi*) ___ a una festa di compleanno. = ___", answers: ["si siano incontrati|si incontrino", "reciproco"] },
          { id: "4", prompt: "4. Ieri Carla e Marco, quando (*vedersi*) ___, (*abbracciarsi*) ___ e (*baciarsi*) ___. = ___", answers: ["si sono visti", "si sono abbracciati", "si sono baciati", "reciproco"] },
          { id: "5", prompt: "5. È meglio che Luca (*curarsi*) ___ con gli antibiotici. = ___", answers: ["si curi", "riflessivo"] },
          { id: "6", prompt: "6. È vero che Paolo e Maura (*conoscersi*) ___ l'anno scorso? = ___", answers: ["si sono conosciuti", "reciproco"] },
          { id: "7", prompt: "7. Daniela non (*guardarsi*) ___ molto allo specchio. = ___", answers: ["si guarda", "riflessivo"] },
          { id: "8", prompt: "8. Per la cerimonia di domenica prossima Antonio (*mettersi*) ___ l'abito scuro. = ___", answers: ["si metterà|si mette", "riflessivo"] },
          { id: "9", prompt: "9. Non so se Gianni e Monica (*volere sposarsi*) ___ quest'anno o l'anno prossimo. = ___", answers: ["vogliano sposarsi|si vogliano sposare", "reciproco"] },
          { id: "10", prompt: "10. Sabato sera Giulio e i suoi amici (*vedersi*) ___ in Piazza del Campo. = ___", answers: ["si vedranno|si vedono|si sono visti", "reciproco"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: { id: "p188-ex5a", number: "5", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Si impersonale", tr: { vi: "Cùng đọc: si phiếm chỉ.", en: "Let's read: the impersonal si." }, items: [] },
    },
    { type: "theory", text: "> In questa trattoria **si mangia** bene. = In questa trattoria uno mangia bene.\n> In questa trattoria **si è mangiato** sempre bene. = In questa trattoria noi abbiamo mangiato sempre bene.\n> In montagna **si va** a sciare. = In montagna uno va a sciare.\n! ATTENZIONE!\n> L'anno scorso a Natale **si è andati** in montagna a sciare. = L'anno scorso a Natale noi siamo andati in montagna a sciare." },
  ],
};

export default page;
