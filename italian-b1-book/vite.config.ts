import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Máy chủ ghi bản dịch mới vào file này khi người học bấm icon dịch: không tải lại trang vì thế.
    watch: { ignored: ["**/src/content/translations.json"] },
  },
});
