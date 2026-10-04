/** Bộ icon nét mảnh (stroke) dùng chung cho giao diện. */
const paths = {
  menu: "M4 6h16M4 12h16M4 18h10",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z",
  key: "M9 11l9-9 3 3-2 2 2 2-3 3-2-2-2 2M9 11a4 4 0 1 1-5.7 5.7A4 4 0 0 1 9 11Z",
  translate: "M4 5h9M8.5 3v2c0 4-2 7-5 8.5M6 9c1 2.2 3 4 5.5 5M13 21l4-9 4 9M14.5 18h5",
  alert: "M12 8v5m0 3.5h.01M10.3 3.9 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
  star: "m12 3 2.7 5.6 6.2.9-4.5 4.4 1 6.1L12 17.1 6.6 20l1-6.1L3.1 9.5l6.2-.9L12 3Z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7.6 7.6 0 0 0-2-1.2L14.5 3h-5l-.4 2.6a7.6 7.6 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7.6 7.6 0 0 0 2 1.2l.4 2.6h5l.4-2.6a7.6 7.6 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z",
  left: "m15 18-6-6 6-6",
  right: "m9 18 6-6-6-6",
  volume: "M11 5 6 9H3v6h3l5 4V5Zm4.5 3.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13",
  mute: "M11 5 6 9H3v6h3l5 4V5Zm5 4.5 5 5m0-5-5 5",
  mic: "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm-6-3a6 6 0 0 0 12 0M12 18v3",
  stop: "M7 7h10v10H7z",
  play: "M8 5v14l11-7L8 5Z",
  pause: "M8 5v14M16 5v14",
  check: "m5 12.5 4.5 4.5L19 7.5",
  sparkle: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
  reset: "M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4",
  back: "M11 17l-5-5 5-5M18 17l-5-5 5-5",
  fwd: "m13 17 5-5-5-5M6 17l5-5-5-5",
  repeat: "M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3",
  text: "M4 6h16M4 12h16M4 18h9",
  close: "M6 6l12 12M18 6 6 18",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Zm0 16a2 2 0 0 1 2-2h13",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4.5 4.5M8 11h6M11 8v6",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={paths[name]} fill={name === "play" ? "currentColor" : "none"} />
    </svg>
  );
}
