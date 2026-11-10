/**
 * Bunchasake – nhận form từ bunchasake.com
 *  - doPost: lưu vào Google Sheet "Khách liên hệ" + gửi email báo về NOTIFY_EMAIL
 *  - doGet : trang admin đọc danh sách (cần ?key=ADMIN_KEY)
 * Cách cài: xem backend/README.md
 */
const NOTIFY_EMAIL = "trangworkss@gmail.com";
const SHEET_NAME = "Khách liên hệ";
const HEADERS = ["Thời gian", "Loại", "Tên", "Liên hệ", "Doanh nghiệp", "Giai đoạn", "Automation", "Lịch gọi", "Câu chuyện", "Ngôn ngữ", "Trang", "Trạng thái"];
const STAGES = { start: "Sắp mở", build: "Cần làm bài bản", refresh: "Muốn làm mới" };

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sh;
}

const clip_ = (v, n) => String(v == null ? "" : v).replace(/[\u0000-\u001f]/g, " ").slice(0, n || 200).trim();
// Chặn công thức khi mở trong Sheet (=, +, -, @)
const cell_ = v => (/^[=+\-@]/.test(v) ? "'" + v : v);

function doPost(e) {
  let d = {};
  try { d = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false }); }
  if (d.website) return json_({ ok: true }); // honeypot: bot

  const type = d.type === "call" ? "call" : "story";
  const row = {
    name: clip_(d.name, 120), contact: clip_(d.contact, 160), business: clip_(d.business, 200),
    stage: STAGES[d.stage] || "", automation: d.automation ? "Có" : "", slot: clip_(d.slot, 80),
    story: clip_(d.story, 3000), lang: clip_(d.lang, 4), page: clip_(d.page, 300),
  };
  if (!row.name || !row.contact) return json_({ ok: false });

  // Chống spam đơn giản: tối đa 20 lần gửi / 10 phút
  const cache = CacheService.getScriptCache(), n = +(cache.get("n") || 0);
  if (n > 20) return json_({ ok: false });
  cache.put("n", String(n + 1), 600);

  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    sheet_().appendRow([new Date(), type === "call" ? "Đặt lịch gọi" : "Câu chuyện", row.name, row.contact, row.business,
      row.stage, row.automation, row.slot, row.story, row.lang, row.page, "Mới"].map(cell_));
  } finally { lock.releaseLock(); }

  const subject = type === "call"
    ? `[Bunchasake] Lịch gọi mới: ${row.name} – ${row.slot}`
    : `[Bunchasake] Khách mới gửi câu chuyện: ${row.name}${row.business ? " – " + row.business : ""}`;
  const lines = [
    ["Loại", type === "call" ? "Đặt lịch gọi 30 phút" : "Gửi câu chuyện"],
    ["Tên", row.name], ["Liên hệ", row.contact], ["Lịch gọi", row.slot], ["Doanh nghiệp", row.business],
    ["Giai đoạn", row.stage], ["Automation", row.automation], ["Câu chuyện", row.story], ["Ngôn ngữ", row.lang],
  ].filter(r => r[1]);
  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const html = `<table style="font:14px/1.5 sans-serif;border-collapse:collapse">${lines.map(([k, v]) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#777;vertical-align:top">${k}</td><td style="padding:4px 0;white-space:pre-wrap">${esc(v)}</td></tr>`).join("")}</table>
    <p style="font:13px sans-serif;color:#777">Xem tất cả trong Google Sheet: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}</p>`;
  const opts = { htmlBody: html, name: "Bunchasake website" };
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.contact)) opts.replyTo = row.contact;
  MailApp.sendEmail(NOTIFY_EMAIL, subject, lines.map(r => r.join(": ")).join("\n"), opts);

  return json_({ ok: true });
}

function doGet(e) {
  const p = e.parameter || {};
  const key = PropertiesService.getScriptProperties().getProperty("ADMIN_KEY");
  if (!key || p.key !== key) return json_({ ok: false, error: "unauthorized" });
  const sh = sheet_();

  if (p.action === "mark" && p.row) {
    const r = parseInt(p.row, 10);
    if (r >= 2 && r <= sh.getLastRow()) sh.getRange(r, HEADERS.length).setValue(p.status === "new" ? "Mới" : "Đã liên hệ");
    return json_({ ok: true });
  }

  const last = sh.getLastRow();
  const values = last > 1 ? sh.getRange(2, 1, last - 1, HEADERS.length).getValues() : [];
  const rows = values.map((v, i) => ({
    row: i + 2, time: v[0] instanceof Date ? v[0].toISOString() : String(v[0]), type: v[1], name: v[2], contact: v[3],
    business: v[4], stage: v[5], automation: v[6], slot: v[7], story: v[8], lang: v[9], page: v[10], status: v[11],
  })).reverse();
  return json_({ ok: true, rows, sheet: SpreadsheetApp.getActiveSpreadsheet().getUrl() });
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/** Chạy hàm này 1 lần trong Apps Script để cấp quyền & thử gửi email. */
function testNotify() {
  doPost({ postData: { contents: JSON.stringify({ type: "call", name: "Khách thử", contact: "test@example.com", slot: "2026-11-12 10:30 (GMT+7)", lang: "vi" }) } });
}
