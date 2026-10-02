import type { ReactNode } from "react";
import type { SceneName } from "../../types";

/**
 * Hình minh hoạ vẽ bằng SVG (không cần tải ảnh). Thêm ảnh thật: đặt file vào public/images
 * rồi dùng { type: "image", src: "/images/ten-anh.jpg" } trong trang.
 */

const C = {
  sky: "#cfe6ef",
  sun: "#f6c453",
  terracotta: "#c8643b",
  ochre: "#e2a54a",
  cream: "#f4e7cf",
  green: "#5f8f4e",
  olive: "#8aa35a",
  red: "#c0392b",
  ink: "#3b2f2a",
  blue: "#3f6f95",
  skin: "#f1c7a3",
  white: "#fffaf0",
};

function Frame({ children, bg = C.sky }: { children: ReactNode; bg?: string }) {
  return (
    <svg viewBox="0 0 320 180" className="scene" role="img">
      <rect width="320" height="180" rx="10" fill={bg} />
      {children}
    </svg>
  );
}

function Person({ x, y, shirt, hair = C.ink, s = 1, flip = false }: { x: number; y: number; shirt: string; hair?: string; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <rect x="-11" y="0" width="22" height="34" rx="9" fill={shirt} />
      <rect x="-9" y="32" width="7" height="22" rx="3" fill={C.ink} />
      <rect x="2" y="32" width="7" height="22" rx="3" fill={C.ink} />
      <circle cx="0" cy="-10" r="10" fill={C.skin} />
      <path d="M-10 -12 Q0 -26 10 -12 Q6 -18 0 -17 Q-6 -18 -10 -12Z" fill={hair} />
      <circle cx="3.5" cy="-10" r="1.2" fill={C.ink} />
      <path d="M1 -5 Q4 -3 6 -5" stroke={C.ink} strokeWidth="1" fill="none" />
    </g>
  );
}

const scenes: Record<SceneName, () => ReactNode> = {
  cafe: () => (
    <Frame bg="#f3dfc1">
      <rect x="0" y="0" width="320" height="110" fill="#e9cfa6" />
      <rect x="20" y="16" width="120" height="70" rx="6" fill={C.sky} stroke={C.ink} strokeWidth="3" />
      <line x1="80" y1="16" x2="80" y2="86" stroke={C.ink} strokeWidth="3" />
      <path d="M20 16 h120 v12 h-120z" fill={C.red} />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={20 + i * 20} y="16" width="10" height="12" fill={C.white} />)}
      <text x="230" y="40" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="22" fill={C.terracotta}>Bar Roma</text>
      <rect x="170" y="70" width="140" height="42" rx="4" fill={C.terracotta} />
      <rect x="170" y="66" width="140" height="8" rx="3" fill={C.ink} />
      <rect x="250" y="44" width="28" height="22" rx="3" fill="#9aa4a8" />
      <rect x="256" y="56" width="8" height="10" fill={C.ink} />
      <ellipse cx="90" cy="140" rx="46" ry="8" fill={C.ink} opacity=".15" />
      <rect x="54" y="118" width="72" height="6" rx="3" fill={C.ink} />
      <rect x="88" y="124" width="4" height="34" fill={C.ink} />
      <path d="M72 108 h14 v8 a7 7 0 0 1 -14 0z" fill={C.white} stroke={C.ink} />
      <path d="M77 100 q2 -5 0 -9 M81 100 q2 -5 0 -9" stroke="#9b8" fill="none" />
      <path d="M100 112 h16 l-3 6 h-10z" fill={C.ochre} />
      <Person x={40} y={104} shirt={C.blue} />
      <Person x={140} y={104} shirt={C.green} hair="#7a4a2a" flip />
      <Person x={290} y={36} shirt={C.white} s={0.8} flip />
    </Frame>
  ),
  station: () => (
    <Frame>
      <rect y="120" width="320" height="60" fill="#b9b2a5" />
      <rect y="112" width="320" height="10" fill="#8c8273" />
      <rect x="10" y="60" width="230" height="56" rx="14" fill={C.red} />
      <rect x="10" y="96" width="230" height="8" fill={C.white} />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={28 + i * 42} y="70" width="30" height="20" rx="4" fill={C.sky} stroke={C.ink} />)}
      <circle cx="50" cy="118" r="7" fill={C.ink} />
      <circle cx="200" cy="118" r="7" fill={C.ink} />
      <rect x="250" y="20" width="60" height="34" rx="4" fill={C.ink} />
      <text x="280" y="34" textAnchor="middle" fontSize="9" fill={C.sun} fontFamily="monospace">FIRENZE</text>
      <text x="280" y="47" textAnchor="middle" fontSize="9" fill={C.sun} fontFamily="monospace">10:45 B3</text>
      <circle cx="40" cy="30" r="16" fill={C.white} stroke={C.ink} strokeWidth="2" />
      <line x1="40" y1="30" x2="40" y2="20" stroke={C.ink} strokeWidth="2" />
      <line x1="40" y1="30" x2="48" y2="33" stroke={C.ink} strokeWidth="2" />
      <Person x={270} y={110} shirt={C.ochre} />
      <rect x="282" y="140" width="18" height="22" rx="3" fill={C.blue} />
    </Frame>
  ),
  market: () => (
    <Frame bg="#f6ecd9">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${10 + i * 104} 30)`}>
          <path d="M0 20 L50 0 L100 20z" fill={i % 2 ? C.green : C.red} />
          {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M${k * 20} 20 q10 10 20 0`} fill={C.white} />)}
          <rect x="6" y="20" width="4" height="80" fill={C.ink} />
          <rect x="90" y="20" width="4" height="80" fill={C.ink} />
          <rect x="0" y="80" width="100" height="24" fill="#a0703c" />
          {Array.from({ length: 7 }).map((_, k) => (
            <circle key={k} cx={12 + k * 13} cy={76} r={7} fill={[C.red, C.ochre, C.olive, "#8e44ad"][(k + i) % 4]} />
          ))}
        </g>
      ))}
      <Person x={160} y={120} shirt={C.blue} s={0.9} />
      <text x="60" y="150" fontFamily="Caveat, cursive" fontSize="18" fill={C.ink}>pomodori 2€/kg</text>
    </Frame>
  ),
  city: () => (
    <Frame>
      <circle cx="270" cy="34" r="18" fill={C.sun} />
      {[
        [0, 70, 60, C.ochre],
        [60, 50, 50, C.terracotta],
        [110, 30, 30, C.cream],
        [140, 60, 70, "#d9a066"],
        [210, 45, 55, C.terracotta],
        [265, 65, 55, C.ochre],
      ].map(([x, y, w, c], i) => (
        <g key={i}>
          <rect x={x as number} y={y as number} width={w as number} height={180 - (y as number)} fill={c as string} stroke={C.ink} strokeWidth="1" />
          {Array.from({ length: 3 }).map((_, r) =>
            Array.from({ length: 2 }).map((_, k) => (
              <rect key={`${r}${k}`} x={(x as number) + 8 + k * ((w as number) / 2 - 2)} y={(y as number) + 12 + r * 30} width="10" height="16" fill={C.blue} opacity=".8" />
            )),
          )}
        </g>
      ))}
      <rect x="112" y="10" width="26" height="30" fill={C.cream} stroke={C.ink} />
      <path d="M110 10 L125 -4 L140 10z" fill={C.terracotta} />
      <rect y="160" width="320" height="20" fill="#9c9183" />
      <Person x={180} y={118} shirt={C.red} s={0.75} />
    </Frame>
  ),
  home: () => (
    <Frame bg="#efe3cf">
      <rect y="130" width="320" height="50" fill="#b98b5a" />
      <rect x="30" y="30" width="80" height="60" fill={C.sky} stroke={C.ink} strokeWidth="3" />
      <line x1="70" y1="30" x2="70" y2="90" stroke={C.ink} strokeWidth="2" />
      <path d="M30 30 q20 30 0 60" fill={C.red} opacity=".7" />
      <rect x="150" y="90" width="130" height="40" rx="10" fill={C.green} />
      <rect x="150" y="76" width="130" height="24" rx="10" fill={C.olive} />
      <rect x="230" y="40" width="40" height="30" fill={C.white} stroke={C.ink} />
      <circle cx="250" cy="55" r="8" fill={C.sun} />
      <Person x={190} y={60} shirt={C.terracotta} s={0.8} />
      <path d="M120 130 v-40 h10 v40" fill={C.ink} />
      <circle cx="125" cy="80" r="16" fill={C.olive} />
    </Frame>
  ),
  office: () => (
    <Frame bg="#e6ebee">
      <rect y="130" width="320" height="50" fill="#a9b3b8" />
      <rect x="60" y="100" width="200" height="8" fill={C.ink} />
      <rect x="70" y="108" width="6" height="40" fill={C.ink} />
      <rect x="244" y="108" width="6" height="40" fill={C.ink} />
      <rect x="120" y="58" width="80" height="44" rx="4" fill={C.ink} />
      <rect x="125" y="63" width="70" height="34" fill={C.sky} />
      <Person x={240} y={60} shirt={C.blue} s={0.85} flip />
      <rect x="20" y="20" width="60" height="44" fill={C.white} stroke={C.ink} />
      <polyline points="26,56 40,44 52,50 72,28" stroke={C.red} strokeWidth="3" fill="none" />
      <path d="M90 96 h16 v-10 h-16z" fill={C.ochre} />
    </Frame>
  ),
  travel: () => (
    <Frame>
      <path d="M0 140 Q80 100 160 130 T320 120 V180 H0z" fill={C.olive} />
      <path d="M0 160 Q100 130 200 155 T320 150 V180 H0z" fill={C.green} />
      <circle cx="60" cy="40" r="20" fill={C.sun} />
      <path d="M200 50 l60 -10 l10 4 l-60 14z" fill={C.white} stroke={C.ink} />
      <path d="M232 46 l-10 -14 l8 0 l16 12z" fill={C.white} stroke={C.ink} />
      <path d="M130 118 l14 -50 l14 50z" fill="#7a6a5a" />
      {[0, 1, 2, 3].map((i) => <line key={i} x1={134 + i * 6} y1={118 - i * 10} x2={154 - i * 3} y2={118 - i * 10} stroke={C.white} />)}
      <rect x="40" y="128" width="26" height="30" rx="4" fill={C.terracotta} />
      <rect x="48" y="122" width="10" height="8" fill="none" stroke={C.ink} strokeWidth="2" />
    </Frame>
  ),
  friends: () => (
    <Frame bg="#f4e2c8">
      <path d="M0 150 h320 v30 h-320z" fill="#cfa877" />
      <Person x={90} y={90} shirt={C.red} />
      <Person x={160} y={86} shirt={C.blue} hair="#a0522d" />
      <Person x={230} y={90} shirt={C.green} hair="#e0b050" flip />
      <path d="M110 50 q40 -40 80 0" stroke={C.ochre} strokeWidth="2" fill="none" strokeDasharray="4 4" />
      <text x="150" y="30" fontFamily="Caveat, cursive" fontSize="20" fill={C.terracotta}>Ciao!</text>
      <g fill={C.sun}>
        <circle cx="40" cy="30" r="4" />
        <circle cx="280" cy="40" r="4" />
        <circle cx="60" cy="60" r="3" />
      </g>
    </Frame>
  ),
  food: () => (
    <Frame bg="#f6e7d3">
      <rect y="110" width="320" height="70" fill={C.red} />
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={i} x={i * 20} y={110 + (i % 2) * 0} width="10" height="70" fill={C.white} opacity=".35" />
      ))}
      <ellipse cx="120" cy="120" rx="60" ry="18" fill={C.white} stroke={C.ink} />
      <path d="M78 116 q20 -14 40 0 q20 -14 40 0" stroke={C.ochre} strokeWidth="6" fill="none" />
      <circle cx="104" cy="112" r="5" fill={C.red} />
      <circle cx="132" cy="114" r="5" fill={C.red} />
      <path d="M118 104 l6 -6 l4 6z" fill={C.green} />
      <rect x="220" y="60" width="16" height="60" rx="4" fill={C.green} />
      <rect x="224" y="46" width="8" height="16" fill={C.green} />
      <path d="M250 120 h30 l-6 -40 h-18z" fill={C.white} stroke={C.ink} opacity=".9" />
      <path d="M252 104 h26 l-3 16 h-20z" fill="#8e1b2c" />
    </Frame>
  ),
  weather: () => (
    <Frame>
      <circle cx="80" cy="60" r="26" fill={C.sun} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return <line key={i} x1={80 + Math.cos(a) * 32} y1={60 + Math.sin(a) * 32} x2={80 + Math.cos(a) * 42} y2={60 + Math.sin(a) * 42} stroke={C.sun} strokeWidth="4" strokeLinecap="round" />;
      })}
      <g fill={C.white}>
        <circle cx="210" cy="60" r="22" />
        <circle cx="236" cy="52" r="26" />
        <circle cx="262" cy="64" r="20" />
        <rect x="200" y="62" width="70" height="22" />
      </g>
      {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={212 + i * 13} y1={94} x2={206 + i * 13} y2={110} stroke={C.blue} strokeWidth="3" strokeLinecap="round" />)}
      <path d="M0 150 Q160 120 320 150 V180 H0z" fill={C.green} />
    </Frame>
  ),
};

export function Scene({ name }: { name: SceneName }) {
  const render = scenes[name];
  return render ? <>{render()}</> : null;
}
