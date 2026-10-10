import { useMemo } from "react";
import { Icon } from "./Icon";
import { tr } from "../i18n";
import { groupTitle, ruleById, rules, type Rule } from "../content/knowledge";
import { useStore } from "../lib/store";
import { itemPrompt, setStudy, useStudy } from "../lib/study";
import { inline } from "./blocks/Theory";

const txt = {
  whyTitle: { vi: "Vì sao điền như vậy?", en: "Why this answer?" },
  whyEmpty: {
    vi: "Làm bài rồi bấm «Kiểm tra». Câu nào sai sẽ hiện lời giải ở đây; bấm dấu ? cạnh mỗi câu để xem lại.",
    en: "Do an exercise and press «Check». Wrong answers are explained here; press the ? next to any item to see why.",
  },
  yours: { vi: "Bạn viết", en: "You wrote" },
  right: { vi: "Đáp án", en: "Answer" },
  seeRule: { vi: "Xem quy tắc", en: "See the rule" },
  kb: { vi: "Kho kiến thức", en: "Knowledge base" },
  met: { vi: "đã gặp", en: "met" },
  tip: { vi: "Mẹo", en: "Tip" },
  close: { vi: "Đóng", en: "Close" },
};

/** Khung bên cạnh sách: lời giải "Vì sao?" của câu đang chọn + kho kiến thức ngữ pháp. */
export function StudyPanel() {
  const lang = useStore((s) => s.lang);
  const learned = useStore((s) => s.learned ?? []);
  const focus = useStudy((s) => s.focus);
  const openRule = useStudy((s) => s.openRule);
  const drawer = useStudy((s) => s.drawer);
  const result = useStore((s) => (focus ? s.results[focus.ex.id] : undefined));

  const why = focus?.ex.why?.[focus.itemId];
  const item = focus ? result?.items.find((i) => i.id === focus.itemId) : undefined;
  const rule = why?.rule ? ruleById.get(why.rule) : undefined;

  const groups = useMemo(() => {
    const m = new Map<Rule["group"], Rule[]>();
    rules.forEach((r) => m.set(r.group, [...(m.get(r.group) ?? []), r]));
    return [...m];
  }, []);

  return (
    <>
      <button className="study-fab" onClick={() => setStudy({ drawer: !drawer })} aria-label={tr(lang, txt.kb)}>
        <Icon name="book" size={20} />
        <span>?</span>
      </button>
      <aside className={`study-panel ${drawer ? "open" : ""}`}>
        <button className="study-close" onClick={() => setStudy({ drawer: false })} aria-label={tr(lang, txt.close)}>
          <Icon name="close" size={16} />
        </button>

        <section className="why-box">
          <h3>
            <span className="why-q">?</span> {tr(lang, txt.whyTitle)}
          </h3>
          {focus && why ? (
            <div className="why-body">
              <p className="why-where">
                {focus.ex.number ? `Esercizio ${focus.ex.number}${focus.ex.label ?? ""}` : "Esercizio"} · {focus.itemId}
              </p>
              {itemPrompt(focus.ex, focus.itemId) && <p className="why-prompt">{inline(itemPrompt(focus.ex, focus.itemId))}</p>}
              {item && (
                <div className="why-answers">
                  {!item.correct && item.userAnswer && (
                    <span className="ans ko">
                      {tr(lang, txt.yours)}: <s>{item.userAnswer}</s>
                    </span>
                  )}
                  {item.correctAnswer && (
                    <span className="ans ok">
                      {tr(lang, txt.right)}: <b>{item.correctAnswer}</b>
                    </span>
                  )}
                </div>
              )}
              <p className="why-text">{inline(tr(lang, why.tr) ?? "")}</p>
              {rule && (
                <button className="why-rule" onClick={() => setStudy({ openRule: rule.id })}>
                  {tr(lang, txt.seeRule)}: <b>{rule.title}</b> ↓
                </button>
              )}
            </div>
          ) : (
            <p className="why-empty">{tr(lang, txt.whyEmpty)}</p>
          )}
        </section>

        <section className="kb">
          <h3>
            {tr(lang, txt.kb)}
            <span className="kb-count">
              {rules.filter((r) => learned.includes(r.id)).length}/{rules.length} {tr(lang, txt.met)}
            </span>
          </h3>
          <div className="kb-list">
            {groups.map(([g, list]) => (
              <div key={g} className="kb-group">
                <p className="kb-group-title">{tr(lang, groupTitle[g])}</p>
                {list.map((r) => (
                  <RuleCard key={r.id} rule={r} open={openRule === r.id} met={learned.includes(r.id)} />
                ))}
              </div>
            ))}
          </div>
        </section>
      </aside>
    </>
  );
}

function RuleCard({ rule, open, met }: { rule: Rule; open: boolean; met: boolean }) {
  const lang = useStore((s) => s.lang);
  return (
    <div className={`rule-card ${open ? "open" : ""} ${met ? "met" : ""}`} id={`rule-${rule.id}`}>
      <button
        className="rule-head"
        onClick={() => setStudy({ openRule: open ? null : rule.id })}
        ref={(el) => {
          if (open && el) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }}
      >
        <span className="rule-dot" aria-hidden />
        <span className="rule-title">
          <b>{rule.title}</b>
          <small>{tr(lang, rule.titleTr)}</small>
        </span>
        <span className="rule-chev">{open ? "–" : "+"}</span>
      </button>
      {open && (
        <div className="rule-body">
          <p>{inline(tr(lang, rule.summary) ?? "")}</p>
          {rule.table && (
            <table className="rule-table">
              <tbody>
                {rule.table.map(([a, vi, en]) => (
                  <tr key={a}>
                    <td>{a}</td>
                    <td>{lang === "vi" ? vi : en}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <ul className="rule-ex">
            {rule.examples.map((e) => (
              <li key={e.it}>
                <span className="it">{e.it}</span>
                <span className="tr">{tr(lang, e.tr)}</span>
              </li>
            ))}
          </ul>
          {rule.tip && (
            <p className="rule-tip">
              <b>{tr(lang, txt.tip)}:</b> {tr(lang, rule.tip)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
