import type { BookPage } from "../types";

/**
 * Tất cả trang sách được tự động nạp từ thư mục ./pages (mỗi file một trang, export default).
 * Thêm trang mới = thêm một file p012.ts vào ./pages. Trang được sắp theo số trang.
 */
const modules = import.meta.glob<{ default: BookPage }>("./pages/*.ts", { eager: true });

export const pages: BookPage[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.number - b.number);

/** Thông tin bìa sách — đổi ở đây khi đặt tên sách mới. */
export const bookInfo = {
  title: "Sách mới",
  subtitle: "Tên môn · Trình độ",
  level: "A1",
};
