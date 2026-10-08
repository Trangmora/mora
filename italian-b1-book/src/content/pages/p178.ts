import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 178 (Lessico: parlare, professioni, economia). */
const page: BookPage = {
  id: "p178",
  number: 178,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", color: "#d8333a" },
  title: "Lessico · Parlare, professioni, economia",
  blocks: [
    { type: "sectionTitle", text: "Lessico" },
    {
      type: "columns",
      cols: [
        [
          { type: "photo", src: "images/u9/p178-parlare.jpg", alt: "Due uomini parlano sottovoce" },
          { type: "theory", text: "## Parlare\n> balbettare\n> borbottare\n> chiacchierare\n> confondersi\n> conversare\n> fare quattro chiacchiere\n> gridare\n> imbrogliarsi\n> impaperarsi\n> ingarbugliarsi\n> mangiarsi le parole\n> mormorare\n> parlare a fior di labbra\n> parlare del più e del meno\n> parlare fra i denti\n> scambiare due parole\n> sillabare\n> storpiare\n> strascicare le parole\n> sussurrare" },
        ],
        [
          { type: "photo", src: "images/u9/p178-professioni.jpg", alt: "Un regista e un operatore sul set" },
          { type: "theory", text: "## Professioni\n> astronomo\n> atleta\n> attore\n> avvocato\n> bancario\n> conduttore di trasmissioni televisive\n> docente\n> filosofo\n> giornalista\n> impiegato\n> informatico\n> ingegnere\n> interprete\n> manager\n> medico\n> politico\n> psichiatra\n> regista\n> scrittore\n> stilista" },
        ],
        [
          { type: "photo", src: "images/u9/p178-economia.jpg", alt: "Un grafico con una linea che sale" },
          { type: "theory", text: "## Economia\n> azienda\n> banca\n> borsa\n> budget\n> crescita\n> domanda\n> economista\n> esportazione\n> importazione\n> imprenditore\n> impresa\n> inflazione\n> mercato\n> offerta\n> prodotto\n> produzione\n> reddito\n> ricchezza\n> stipendio\n> sviluppo" },
        ],
      ],
    },
  ],
};

export default page;
