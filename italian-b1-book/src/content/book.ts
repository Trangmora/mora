import type { BookPage } from "../types";

/**
 * Tất cả trang sách được tự động nạp từ thư mục ./pages (mỗi file một trang, export default).
 * Thêm trang mới = thêm một file p012.ts vào ./pages. Trang được sắp theo số trang.
 */
const modules = import.meta.glob<{ default: BookPage }>("./pages/*.ts", { eager: true });

export const pages: BookPage[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.number - b.number);

export const bookInfo = {
  title: "Il Mio Libro",
  subtitle: "Italiano · Livello B1",
};
