import { useEffect, useState } from "react";
import type { SceneName } from "../types";
import { Scene } from "./illustrations/Scene";

type PhotoInfo = {
  url: string;
  width?: number;
  height?: number;
  alt: string;
  author: string;
  authorUrl?: string;
  source: string;
  pageUrl: string;
  license?: string;
};

const CACHE = "italian-b1-book:photo:v1:";

function cached(key: string): PhotoInfo | null {
  try {
    const raw = localStorage.getItem(CACHE + key);
    return raw ? (JSON.parse(raw) as PhotoInfo) : null;
  } catch {
    return null;
  }
}

/** Ảnh chụp thật tìm theo từ khoá (qua /api/photo), có ghi công tác giả; lỗi thì hiện tranh vẽ dự phòng. */
export function Photo({
  query,
  index = 0,
  fallback,
  caption,
  alt,
}: {
  query: string;
  index?: number;
  fallback?: SceneName;
  caption?: string;
  /** Mô tả hiện trong khung khi chưa tải được ảnh. */
  alt?: string;
}) {
  const key = `${query}#${index}`;
  const [info, setInfo] = useState<PhotoInfo | null>(() => cached(key));
  const [state, setState] = useState<"loading" | "ok" | "fail">("loading");

  useEffect(() => {
    if (info) return;
    let alive = true;
    fetch(`/api/photo?q=${encodeURIComponent(query)}&i=${index}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((p: PhotoInfo) => {
        if (!alive) return;
        setInfo(p);
        try {
          localStorage.setItem(CACHE + key, JSON.stringify(p));
        } catch {
          /* bỏ qua */
        }
      })
      .catch(() => alive && setState("fail"));
    return () => {
      alive = false;
    };
  }, [info, key, query, index]);

  if (state === "fail") {
    return (
      <>
        {fallback ? <Scene name={fallback} /> : <div className="photo-box missing">📷 {alt ?? query}</div>}
        {caption && <figcaption>{caption}</figcaption>}
      </>
    );
  }

  return (
    <>
      <div className={`photo-box ${state}`} style={info?.width && info?.height ? { aspectRatio: `${info.width} / ${info.height}` } : undefined}>
        {info && (
          <img
            src={info.url}
            alt={info.alt}
            loading="lazy"
            onLoad={() => setState("ok")}
            onError={() => {
              try {
                localStorage.removeItem(CACHE + key);
              } catch {
                /* bỏ qua */
              }
              setState("fail");
            }}
          />
        )}
      </div>
      <figcaption>
        {caption}
        {info && (
          <span className="credit">
            {caption ? " · " : ""}
            <a href={info.authorUrl ?? info.pageUrl} target="_blank" rel="noreferrer">{info.author}</a>
            {" / "}
            <a href={info.pageUrl} target="_blank" rel="noreferrer">{info.source}</a>
            {info.license ? ` · ${info.license}` : ""}
          </span>
        )}
      </figcaption>
    </>
  );
}
