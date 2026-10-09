import type { BookPage } from "../../types";

/** Trang mẫu của sách mới — thay bằng nội dung thật. Mỗi trang là một file pNNN.ts trong thư mục này. */
const page: BookPage = {
  id: "p001",
  number: 1,
  unit: "1",
  unitTitle: "Unità 1",
  addedOn: "2026-10-09",
  title: "Trang mẫu",
  blocks: [
    {
      type: "unitHeader",
      unit: "1",
      title: "Tên bài 1",
      intro: "Trong bài này chúng ta học:",
      goals: [
        { it: "Mục tiêu 1", tr: { vi: "Mục tiêu 1", en: "Goal 1" } },
        { it: "Mục tiêu 2", tr: { vi: "Mục tiêu 2", en: "Goal 2" } },
      ],
    },
    { type: "sectionTitle", text: "Cominciamo", banner: "TRANG MẪU" },
    { type: "text", it: "Đây là trang mẫu của sách mới. Gửi nội dung để thay trang này.", tr: { vi: "Đây là trang mẫu của sách mới.", en: "This is a sample page of the new book." } },
    {
      type: "exercise",
      ex: {
        id: "p001-ex1",
        number: "1",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Bài tập mẫu: điền từ.",
        tr: { vi: "Bài tập mẫu: điền từ.", en: "Sample exercise: fill in the word." },
        items: [{ id: "1", prompt: "1. Ciao, io ___ Marco.", answers: ["sono"] }],
      },
    },
  ],
};

export default page;
