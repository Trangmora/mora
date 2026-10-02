/**
 * Tìm ảnh chụp thật cho trang sách theo từ khoá.
 * Thứ tự: Pexels (PEXELS_API_KEY) → Unsplash (UNSPLASH_ACCESS_KEY) → Wikimedia Commons (không cần key).
 * Mỗi ảnh trả về kèm tên tác giả + nguồn để ghi công theo giấy phép.
 */

export type Photo = {
  url: string;
  width?: number;
  height?: number;
  alt: string;
  author: string;
  authorUrl?: string;
  source: "Pexels" | "Unsplash" | "Wikimedia Commons";
  pageUrl: string;
  license?: string;
};

const cache = new Map<string, Photo | null>();
const UA = "IlMioLibroB1/0.1 (personal Italian study app)";

export async function findPhoto(query: string, index = 0): Promise<Photo | null> {
  const q = query.trim().slice(0, 120);
  if (!q) return null;
  const key = `${q}#${index}`;
  if (cache.has(key)) return cache.get(key)!;

  const providers = [
    process.env.PEXELS_API_KEY ? fromPexels : null,
    process.env.UNSPLASH_ACCESS_KEY ? fromUnsplash : null,
    fromWikimedia,
  ].filter(Boolean) as ((q: string, i: number) => Promise<Photo | null>)[];

  let photo: Photo | null = null;
  for (const p of providers) {
    try {
      photo = await p(q, index);
      if (photo) break;
    } catch (e) {
      console.warn("[photo]", (e as Error).message);
    }
  }
  cache.set(key, photo);
  return photo;
}

async function getJSON(url: string, headers: Record<string, string> = {}) {
  const r = await fetch(url, { headers: { "User-Agent": UA, ...headers }, signal: AbortSignal.timeout(10000) });
  if (!r.ok) throw new Error(`${new URL(url).host} HTTP ${r.status}`);
  return r.json();
}

// ---------- Pexels ----------
type PexelsResponse = {
  photos?: {
    width: number;
    height: number;
    url: string;
    alt?: string;
    photographer: string;
    photographer_url: string;
    src: { large2x: string; large: string; landscape: string };
  }[];
};

export function parsePexels(j: PexelsResponse, q: string, index: number): Photo | null {
  const p = j.photos?.[index] ?? j.photos?.[0];
  if (!p) return null;
  return {
    url: p.src.large,
    width: p.width,
    height: p.height,
    alt: p.alt || q,
    author: p.photographer,
    authorUrl: p.photographer_url,
    source: "Pexels",
    pageUrl: p.url,
  };
}

async function fromPexels(q: string, index: number) {
  const j = await getJSON(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=${index + 1}&orientation=landscape`,
    { Authorization: process.env.PEXELS_API_KEY! },
  );
  return parsePexels(j, q, index);
}

// ---------- Unsplash ----------
type UnsplashResponse = {
  results?: {
    width: number;
    height: number;
    alt_description?: string | null;
    urls: { regular: string };
    links: { html: string };
    user: { name: string; links: { html: string } };
  }[];
};

export function parseUnsplash(j: UnsplashResponse, q: string, index: number): Photo | null {
  const p = j.results?.[index] ?? j.results?.[0];
  if (!p) return null;
  const ref = "?utm_source=il_mio_libro&utm_medium=referral";
  return {
    url: p.urls.regular,
    width: p.width,
    height: p.height,
    alt: p.alt_description || q,
    author: p.user.name,
    authorUrl: p.user.links.html + ref,
    source: "Unsplash",
    pageUrl: p.links.html + ref,
  };
}

async function fromUnsplash(q: string, index: number) {
  const j = await getJSON(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=${index + 1}&orientation=landscape`,
    { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
  );
  return parseUnsplash(j, q, index);
}

// ---------- Wikimedia Commons ----------
type CommonsResponse = {
  query?: {
    pages?: Record<
      string,
      {
        index?: number;
        title: string;
        imageinfo?: {
          thumburl?: string;
          thumbwidth?: number;
          thumbheight?: number;
          url: string;
          descriptionurl: string;
          mime?: string;
          extmetadata?: Record<string, { value: string } | undefined>;
        }[];
      }
    >;
  };
};

const stripHtml = (s = "") => s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

export function parseCommons(j: CommonsResponse, q: string, index: number): Photo | null {
  const pages = Object.values(j.query?.pages ?? {})
    .filter((p) => {
      const info = p.imageinfo?.[0];
      // Chỉ lấy ảnh chụp (jpeg), ảnh ngang, đủ lớn.
      return info && /jpe?g/i.test(info.mime ?? p.title) && (info.thumbwidth ?? 0) >= (info.thumbheight ?? 0);
    })
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  const p = pages[index] ?? pages[0];
  const info = p?.imageinfo?.[0];
  if (!p || !info) return null;
  const meta = info.extmetadata ?? {};
  return {
    url: info.thumburl ?? info.url,
    width: info.thumbwidth,
    height: info.thumbheight,
    alt: stripHtml(meta.ImageDescription?.value).slice(0, 140) || q,
    author: stripHtml(meta.Artist?.value) || "Wikimedia Commons",
    source: "Wikimedia Commons",
    pageUrl: info.descriptionurl,
    license: stripHtml(meta.LicenseShortName?.value) || undefined,
  };
}

async function fromWikimedia(q: string, index: number) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrnamespace: "6",
    gsrsearch: `${q} filetype:bitmap`,
    gsrlimit: "12",
    prop: "imageinfo",
    iiprop: "url|mime|extmetadata",
    iiurlwidth: "1000",
    iiextmetadatafilter: "Artist|LicenseShortName|ImageDescription",
  });
  const j = await getJSON(`https://commons.wikimedia.org/w/api.php?${params}`);
  return parseCommons(j, q, index);
}
