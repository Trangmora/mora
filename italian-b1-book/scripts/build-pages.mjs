/**
 * Build bản web cho GitHub Pages vào ../docs (video YouTube phát ngay trong trang).
 * Giữ lại docs/CNAME (tên miền riêng mà GitHub ghi vào khi bật Custom domain) và thêm .nojekyll.
 *   npm run pages
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = path.resolve(root, "../docs");
const cnamePath = path.join(out, "CNAME");
const cname = existsSync(cnamePath) ? readFileSync(cnamePath, "utf8") : null;

execFileSync("npx", ["vite", "build", "--base=./", "--outDir", out, "--emptyOutDir"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, VITE_EMBED_VIDEO: "1" },
});

writeFileSync(path.join(out, ".nojekyll"), "");
if (cname) {
  writeFileSync(cnamePath, cname);
  console.log(`🌐 Giữ tên miền: ${cname.trim()}`);
}
