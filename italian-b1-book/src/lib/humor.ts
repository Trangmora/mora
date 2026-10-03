import type { L10n } from "../types";

/**
 * Chút "chất Ý" cho vui: câu cảm thán của Nonna Pina và những mẩu văn hoá hài hước.
 * Câu tiếng Ý giữ nguyên, kèm bản dịch Việt / Anh.
 */

export type Quip = { it: string; tr: L10n };

/** Phản ứng của Nonna theo điểm số. */
const reactions: { min: number; quips: Quip[] }[] = [
  {
    min: 100,
    quips: [
      { it: "Perfetto! Sei più italiano della pasta al pomodoro! 🤌", tr: { vi: "Hoàn hảo! Bạn còn Ý hơn cả mì sốt cà chua!", en: "Perfect! You're more Italian than pasta al pomodoro!" } },
      { it: "Bravissimo! Ti preparo le lasagne. 🤌", tr: { vi: "Giỏi quá! Bà nấu lasagne cho con ăn nhé.", en: "Brilliant! I'm making you lasagne." } },
      { it: "Che spettacolo! Neanche Dante scriveva così.", tr: { vi: "Tuyệt vời! Đến Dante cũng không viết hay thế.", en: "Amazing! Not even Dante wrote like this." } },
    ],
  },
  {
    min: 80,
    quips: [
      { it: "Bravo! Quasi perfetto, come il mio tiramisù.", tr: { vi: "Giỏi! Gần hoàn hảo, như món tiramisù của bà.", en: "Well done! Almost perfect, like my tiramisù." } },
      { it: "Ottimo! Un caffè per festeggiare? ☕", tr: { vi: "Rất tốt! Làm ly cà phê ăn mừng nhé?", en: "Great! A coffee to celebrate?" } },
    ],
  },
  {
    min: 50,
    quips: [
      { it: "Mah… non c'è male. Ma la nonna sa che puoi fare di più!", tr: { vi: "Ừm… cũng không tệ. Nhưng bà biết con làm được hơn thế!", en: "Hmm… not bad. But nonna knows you can do better!" } },
      { it: "Piano piano si va lontano. Riprova!", tr: { vi: "Chậm mà chắc. Thử lại nào!", en: "Slowly but surely. Try again!" } },
    ],
  },
  {
    min: 0,
    quips: [
      { it: "Mamma mia! Ma che hai fatto?! 🤌 Dai, riproviamo.", tr: { vi: "Trời ơi! Con làm gì thế này?! Thôi, làm lại nào.", en: "Mamma mia! What did you do?! Come on, let's try again." } },
      { it: "Ma dai! Anche la pizza bruciata si rifà. Coraggio!", tr: { vi: "Thôi mà! Pizza cháy còn làm lại được. Cố lên!", en: "Come on! Even a burnt pizza can be remade. Courage!" } },
      { it: "Calma, calma… prima un espresso, poi riprova.", tr: { vi: "Bình tĩnh… uống ly espresso rồi làm lại.", en: "Easy, easy… have an espresso, then try again." } },
    ],
  },
];

export function reaction(score: number, seed = 0): Quip {
  const tier = reactions.find((r) => score >= r.min)!;
  return tier.quips[Math.abs(seed) % tier.quips.length];
}

export const thinkingQuip: Quip = {
  it: "La nonna sta correggendo… con la penna rossa.",
  tr: { vi: "Bà đang chấm bài… bằng bút đỏ.", en: "Nonna is grading… with her red pen." },
};

export const noMistakesQuip: Quip = {
  it: "Niente errori? Allora mangia, che sei sciupato!",
  tr: { vi: "Không sai câu nào à? Vậy thì ăn đi, trông con gầy quá!", en: "No mistakes? Then eat something, you look too thin!" },
};

export const coverQuip: Quip = {
  it: "Mamma mia, che libro!",
  tr: { vi: "Trời đất, cuốn sách gì mà hay thế!", en: "Mamma mia, what a book!" },
};

export const blankQuip: Quip = {
  it: "Pagina bianca? Perfetta per la lista della spesa: pasta, pomodori, basilico…",
  tr: { vi: "Trang trắng à? Hợp để ghi danh sách đi chợ: mì, cà chua, húng quế…", en: "A blank page? Perfect for the shopping list: pasta, tomatoes, basil…" },
};

export const notesQuip: Quip = {
  it: "Scrivi, scrivi… la memoria è come il ragù: va mescolata spesso.",
  tr: { vi: "Viết đi, viết đi… trí nhớ như nồi ragù: phải khuấy thường xuyên.", en: "Write, write… memory is like ragù: stir it often." },
};

/** "Lo sapevi?" — mẩu văn hoá vui ở chân mỗi trang. */
export const facts: Quip[] = [
  { it: "Il cappuccino dopo le 11? Per un italiano è quasi un reato.", tr: { vi: "Uống cappuccino sau 11 giờ sáng? Với người Ý gần như là phạm tội.", en: "Cappuccino after 11am? For an Italian it's almost a crime." } },
  { it: "Ananas sulla pizza: in Italia non se ne parla. Mai.", tr: { vi: "Dứa trên pizza: ở Ý không bàn tới. Không bao giờ.", en: "Pineapple on pizza: in Italy, we don't talk about it. Ever." } },
  { it: "Gli spaghetti non si spezzano. La nonna ti guarda.", tr: { vi: "Không được bẻ đôi mì spaghetti. Bà đang nhìn đấy.", en: "Never break spaghetti. Nonna is watching." } },
  { it: "Gli italiani parlano anche con le mani: 🤌 vuol dire «ma che vuoi?».", tr: { vi: "Người Ý nói cả bằng tay: 🤌 nghĩa là «ông muốn gì đây?».", en: "Italians talk with their hands too: 🤌 means 'what do you want?'." } },
  { it: "Al bar l'espresso si beve in piedi, in tre sorsi.", tr: { vi: "Ở quầy bar, espresso uống đứng, trong ba ngụm.", en: "At the bar, espresso is drunk standing up, in three sips." } },
  { it: "Il parmigiano sul pesce? Meglio non chiedere al cameriere.", tr: { vi: "Rắc phô mai parmigiano lên món cá? Đừng hỏi bồi bàn thì hơn.", en: "Parmesan on fish? Better not ask the waiter." } },
  { it: "«Arrivo tra cinque minuti» in Italia può voler dire mezz'ora.", tr: { vi: "«5 phút nữa tới» ở Ý có thể nghĩa là nửa tiếng.", en: "'I'll be there in five minutes' in Italy can mean half an hour." } },
  { it: "La domenica il pranzo dalla nonna dura almeno tre ore.", tr: { vi: "Bữa trưa Chủ nhật ở nhà bà kéo dài ít nhất ba tiếng.", en: "Sunday lunch at nonna's lasts at least three hours." } },
  { it: "In Italia ci sono più di 300 forme di pasta. E ognuna ha il suo sugo.", tr: { vi: "Ở Ý có hơn 300 hình dạng mì. Và mỗi loại có nước sốt riêng.", en: "Italy has over 300 pasta shapes. Each with its own sauce." } },
  { it: "La moka si lava solo con l'acqua. Il sapone? Sacrilegio!", tr: { vi: "Bình moka chỉ rửa bằng nước. Xà phòng? Phạm thánh!", en: "The moka pot is washed with water only. Soap? Sacrilege!" } },
  { it: "«Buon appetito» si dice prima di mangiare, e guai a chi inizia prima!", tr: { vi: "«Chúc ngon miệng» nói trước khi ăn, ai ăn trước là bị mắng!", en: "'Buon appetito' comes before eating — woe to whoever starts first!" } },
  { it: "Il ciao viene dal veneziano «s-ciào»: «sono tuo schiavo».", tr: { vi: "Chữ «ciao» đến từ tiếng Venice «s-ciào»: «tôi là đầy tớ của bạn».", en: "'Ciao' comes from Venetian 's-ciào': 'I am your servant'." } },
];

export function factFor(key: string): Quip {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) | 0;
  return facts[Math.abs(h) % facts.length];
}
