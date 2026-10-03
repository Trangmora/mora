/** Số trang viết bằng chữ tiếng Ý như chân trang sách ("2 due", "17 diciassette"). */
const units = ["zero", "uno", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove", "dieci",
  "undici", "dodici", "tredici", "quattordici", "quindici", "sedici", "diciassette", "diciotto", "diciannove"];
const tens = ["", "", "venti", "trenta", "quaranta", "cinquanta", "sessanta", "settanta", "ottanta", "novanta"];

export function numeroInLettere(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 999) return String(n);
  if (n < 20) return units[n];
  if (n < 100) {
    const t = tens[Math.floor(n / 10)];
    const u = n % 10;
    if (u === 0) return t;
    // venti + uno → ventuno, trenta + otto → trentotto
    const base = u === 1 || u === 8 ? t.slice(0, -1) : t;
    return base + (u === 3 ? "tré" : units[u]);
  }
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const hs = h === 1 ? "cento" : units[h] + "cento";
  if (rest === 0) return hs;
  const r = numeroInLettere(rest);
  // centottanta: "cento" + "ottanta" bỏ o
  return (rest >= 80 && rest < 90 ? hs.slice(0, -1) : hs) + r;
}
