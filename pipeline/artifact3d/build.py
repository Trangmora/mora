"""Ghép three.js r180 + cảnh (vd. drum.js) + kịch bản máy quay thành một trang HTML chạy độc lập.

python3 pipeline/artifact3d/build.py <cảnh.js> <film.json> <out.html>
Chụp khung: node pipeline/globe3d/capture.cjs <out.html> <thư_mục_khung> 1920 1080 30   (chạy trong pipeline/code3d để có playwright)
"""
import json, os, sys

R = os.path.dirname(os.path.abspath(__file__))
src, film, out = sys.argv[1:4]
three = open(os.path.join(R, "..", "code3d", "node_modules", "three", "build", "three.cjs"), encoding="utf-8").read()
code = f"const FILM = {json.dumps(json.load(open(film)))};\n" + open(src, encoding="utf-8").read()
html = f"""<!doctype html><html><head><meta charset="utf-8"><title>artifact</title>
<style>html,body{{margin:0;background:#000;overflow:hidden}}canvas{{display:block}}</style></head><body>
<script>const THREE = (function(){{ const module = {{exports:{{}}}}; const exports = module.exports;
{three}
return module.exports; }})();</script>
<script>
{code}
</script></body></html>"""
open(out, "w", encoding="utf-8").write(html)
print("ok", out, len(html) // 1024, "KB")
