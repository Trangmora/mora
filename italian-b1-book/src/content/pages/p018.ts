import type { BookPage } from "../../types";

/** Unità 1 · Entriamo in Italia! — trang 18 (Grammatica: le preposizioni articolate). */
const page: BookPage = {
  id: "p018",
  number: 18,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Grammatica · Le preposizioni articolate",
  addedOn: "2026-10-07",
  runningHead: "Grammatica",
  sideTab: { unit: "U1", color: "#ef8a3a" },
  blocks: [
    {
      type: "theory",
      text: `
# Le preposizioni articolate
Formiamo le preposizioni articolate con le preposizioni semplici e gli articoli determinativi:
^^ preposizioni semplici + articoli determinativi = preposizioni articolate
| | IL | LO | L' | LA | I | GLI | LE
| A | al | allo | all' | alla | ai | agli | alle
| DA | dal | dallo | dall' | dalla | dai | dagli | dalle
| DI | del | dello | dell' | della | dei | degli | delle
| IN | nel | nello | nell' | nella | nei | negli | nelle
| SU | sul | sullo | sull' | sulla | sui | sugli | sulle
---
> Esco **dall'**ufficio **alle** 5.
> Preferisci gli spaghetti **al** pomodoro o **al** burro?
> **Nella** borsa ci sono i soldi.
> Sono nato **nel** 1963.

! ATTENZIONE!
### Vado al (all', allo, alla)…
> Vado **all'**appuntamento.
> Vado **al** cinema.
> Vado **al** corso di italiano.
> Vado **al** lavoro.
> Vado **al** mare.
> Vado **al** mercato.
> Vado **al** museo.
> Vado **al** ristorante.
> Vado **allo** stadio.
> Vado **al** supermercato.

### Vado a…
> Vado **a** casa.
> Vado **a** letto.
> Vado **a** lezione.
> Vado **a** messa.
> Vado **a** scuola.
> Vado **a** teatro.

### Vado in…
> Vado **in** albergo.
> Vado **in** banca.
===
> Vado **in** biblioteca.
> Vado **in** birreria.
> Vado **in** camera.
> Vado **in** cartoleria.
> Vado **in** farmacia.
> Vado **in** montagna.
> Vado **in** ospedale.
> Vado **in** palestra.
> Vado **in** piscina.
> Vado **in** pizzeria.
> Vado **in** trattoria.
> Vado **in** ufficio.

### Vado dal (dall', dallo, dalla)…
> Vado **dall'**avvocato.
> Vado **dal** barbiere.
> Vado **dal** dentista.
> Vado **dal** fornaio.
> Vado **dal** fruttivendolo.
> Vado **dal** macellaio.
> Vado **dal** meccanico.
> Vado **dal** medico.
> Vado **dal** parrucchiere.
> Vado **dal** professore di italiano.
> Vado **dal** tabaccaio.

! ATTENZIONE!
> Vado **in** aeroporto. / Vado **all'**aeroporto.
> Vado **in** stazione. / Vado **alla** stazione.
> Vado **in** bagno. / Vado **al** bagno.
`.trim(),
      tr: {
        vi: "Tóm tắt: Giới từ a, da, di, in, su ghép với mạo từ xác định thành giới từ có mạo từ (a + il = al, di + la = della, su + gli = sugli…). Đi đến địa điểm có mạo từ: al cinema, allo stadio. Không mạo từ: a casa, a scuola, a teatro; in banca, in farmacia, in ufficio. Đến chỗ một người/nghề: dal medico, dall'avvocato. Một số nơi dùng được cả hai: in/all'aeroporto, in/alla stazione, in/al bagno.",
        en: "Summary: a, da, di, in, su combine with the definite article (a + il = al, di + la = della, su + gli = sugli…). Going to places with the article: al cinema, allo stadio. Without it: a casa, a scuola, a teatro; in banca, in farmacia, in ufficio. To a person/profession: dal medico, dall'avvocato. Some places take both: in/all'aeroporto, in/alla stazione, in/al bagno.",
      },
    },
  ],
};

export default page;
