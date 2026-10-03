import { useEffect, useMemo, useRef, useState } from "react";
import { tr } from "../i18n";
import { emitFun, espressoPoints, greeting, levelOf, onFun, randomNonnaLine, LEVELS } from "../lib/fun";
import { reaction, type Quip } from "../lib/humor";
import { setState, useStore } from "../lib/store";
import { NonnaFace } from "./Nonna";

type Mood = "happy" | "shocked" | "wink";

/** Lớp vui chơi phủ trên cuốn sách: Nonna đồng hành, pháo giấy, ăn mừng lên cấp. */
export function FunLayer() {
  const confetti = useRef<ConfettiHandle | null>(null);
  return (
    <>
      <Confetti handleRef={confetti} />
      <NonnaBuddy onParty={() => confetti.current?.burst()} />
      <LevelWatcher onParty={() => confetti.current?.burst(true)} />
    </>
  );
}

// ---------- Nonna đồng hành ----------

function NonnaBuddy({ onParty }: { onParty: () => void }) {
  const lang = useStore((s) => s.lang);
  const [say, setSay] = useState<{ quip: Quip; mood: Mood; key: number } | null>(null);
  const [bounce, setBounce] = useState(0);
  const timer = useRef<number>(0);

  const show = (quip: Quip, mood: Mood, ms = 6500) => {
    window.clearTimeout(timer.current);
    setSay({ quip, mood, key: Date.now() });
    setBounce((b) => b + 1);
    timer.current = window.setTimeout(() => setSay(null), ms);
  };

  useEffect(() => {
    // Lời chào khi mở sách.
    const t = window.setTimeout(() => show(greeting(), "wink"), 900);
    const off = onFun((e) => {
      if (e.type === "graded") {
        const mood: Mood = e.score >= 80 ? "happy" : e.score >= 50 ? "wink" : "shocked";
        show(reaction(e.score, Date.now()), mood);
        if (e.score >= 100) onParty();
      }
    });
    return () => {
      window.clearTimeout(t);
      off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="buddy">
      {say && (
        <div className="buddy-bubble" key={say.key} role="status" onClick={() => setSay(null)}>
          <span className="buddy-it">{say.quip.it}</span>
          <span className="buddy-tr">{tr(lang, say.quip.tr)}</span>
        </div>
      )}
      <button
        className={`buddy-nonna mood-${say?.mood ?? "happy"}`}
        key={bounce}
        onClick={() => show(randomNonnaLine(Math.floor(Math.random() * 1e6)), "wink")}
        title="Nonna Pina"
        aria-label="Nonna Pina"
      >
        <NonnaFace size={64} mood={say?.mood ?? "happy"} />
      </button>
    </div>
  );
}

// ---------- Lên cấp ----------

function LevelWatcher({ onParty }: { onParty: () => void }) {
  const lang = useStore((s) => s.lang);
  const results = useStore((s) => s.results);
  const history = useStore((s) => s.history);
  const lastLevel = useStore((s) => s.lastLevel);
  const currentUser = useStore((s) => s.currentUser);
  const points = useMemo(() => espressoPoints(results, history), [results, history]);
  const { index } = levelOf(points);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    // Người học mới / dữ liệu cũ: ghi nhận cấp hiện tại, không ăn mừng.
    if (lastLevel === undefined) {
      setState({ lastLevel: index });
      return;
    }
    if (index > lastLevel) {
      setState({ lastLevel: index });
      setShown(index);
      emitFun({ type: "levelup", level: index });
      onParty();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, lastLevel, currentUser]);

  if (shown === null) return null;
  const lv = LEVELS[shown];
  return (
    <div className="overlay" onClick={() => setShown(null)}>
      <div className="levelup" onClick={(e) => e.stopPropagation()}>
        <div className="levelup-emoji">{lv.emoji}</div>
        <p className="levelup-kicker">{lang === "vi" ? "Lên cấp!" : "Level up!"}</p>
        <h2>{lv.it}</h2>
        <p className="levelup-tr">{tr(lang, lv.tr)}</p>
        <div className="levelup-nonna">
          <NonnaFace size={46} mood="happy" />
          <span>
            <i>Brava/o! Ti sei guadagnato/a un cannolo. 🍰</i>
            <small>{lang === "vi" ? "Giỏi lắm! Thưởng con một cái cannolo." : "Well done! You've earned a cannolo."}</small>
          </span>
        </div>
        <button className="pill primary" onClick={() => setShown(null)}>
          Grazie, Nonna!
        </button>
      </div>
    </div>
  );
}

// ---------- Pháo giấy ba màu cờ Ý ----------

type ConfettiHandle = { burst: (big?: boolean) => void };

function Confetti({ handleRef }: { handleRef: React.MutableRefObject<ConfettiHandle | null> }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const colors = ["#009246", "#f4f5f0", "#ce2b37", "#f2b134"];
    type P = { x: number; y: number; vx: number; vy: number; r: number; vr: number; w: number; h: number; c: string; life: number };
    let parts: P[] = [];
    let raf = 0;

    const resize = () => {
      cv.width = innerWidth * devicePixelRatio;
      cv.height = innerHeight * devicePixelRatio;
    };
    resize();
    addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const s = devicePixelRatio;
      parts = parts.filter((p) => p.life > 0 && p.y < innerHeight + 40);
      for (const p of parts) {
        p.vy += 0.18;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        p.life -= 1;
        ctx.save();
        ctx.translate(p.x * s, p.y * s);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = Math.min(1, p.life / 40);
        ctx.fillRect((-p.w / 2) * s, (-p.h / 2) * s, p.w * s, p.h * s);
        ctx.restore();
      }
      raf = parts.length ? requestAnimationFrame(tick) : 0;
    };

    handleRef.current = {
      burst: (big = false) => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const n = big ? 220 : 120;
        for (let i = 0; i < n; i++) {
          const fromLeft = i % 2 === 0;
          parts.push({
            x: fromLeft ? innerWidth * 0.15 : innerWidth * 0.85,
            y: innerHeight * 0.75,
            vx: (fromLeft ? 1 : -1) * (3 + Math.random() * 7),
            vy: -(9 + Math.random() * 9),
            r: Math.random() * 6,
            vr: (Math.random() - 0.5) * 0.4,
            w: 6 + Math.random() * 6,
            h: 3 + Math.random() * 4,
            c: colors[Math.floor(Math.random() * colors.length)],
            life: 160 + Math.random() * 60,
          });
        }
        if (!raf) raf = requestAnimationFrame(tick);
      },
    };
    return () => {
      removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      handleRef.current = null;
    };
  }, [handleRef]);

  return <canvas ref={canvas} className="confetti" aria-hidden />;
}

// ---------- Huy hiệu espresso trên menu ----------

export function EspressoBadge({ onClick }: { onClick?: () => void }) {
  const lang = useStore((s) => s.lang);
  const results = useStore((s) => s.results);
  const history = useStore((s) => s.history);
  const points = useMemo(() => espressoPoints(results, history), [results, history]);
  const { level, next, progress } = levelOf(points);
  return (
    <button
      className="menu-btn espresso"
      onClick={onClick}
      title={`${level.it} — ${tr(lang, level.tr)}${next ? ` · ${next.min - points} ☕ → ${next.it}` : ""}`}
    >
      <span className="espresso-cup" style={{ ["--fill" as string]: `${Math.round(progress * 100)}%` }} aria-hidden>
        ☕
      </span>
      <b>{points}</b>
      <span className="lbl">{level.it}</span>
    </button>
  );
}
