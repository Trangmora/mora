"""Ghép three.js r180 + texture (data URI) + kịch bản máy quay thành một trang HTML chạy độc lập.

python3 pipeline/globe3d/build.py <thư_mục_texture> <film.json> <out.html>
film.json: {"dur": giây, "cams": [[t, lon, lat, dist, lift], ...], "hl": [[t0, t1], ...], "clouds": 0..1}
three.js lấy từ pipeline/code3d/node_modules (chạy `npm install` trong pipeline/code3d trước).
"""
import base64, glob, json, os, sys

R = os.path.dirname(os.path.abspath(__file__))
texdir, film, out = sys.argv[1:4]
three = open(os.path.join(R, "..", "code3d", "node_modules", "three", "build", "three.cjs"), encoding="utf-8").read()
TEX = {os.path.splitext(os.path.basename(p))[0]: "data:image/png;base64," + base64.b64encode(open(p, "rb").read()).decode()
       for p in glob.glob(f"{texdir}/*.png")}
code = (f"const TEX = {json.dumps(TEX)};\nconst FILM = {open(film).read()};\n"
        + open(os.path.join(R, "globe.js"), encoding="utf-8").read())
html = f"""<!doctype html><html><head><meta charset="utf-8"><title>globe</title>
<style>html,body{{margin:0;background:#000;overflow:hidden}}canvas{{display:block}}</style></head><body>
<script>const THREE = (function(){{ const module = {{exports:{{}}}}; const exports = module.exports;
{three}
return module.exports; }})();</script>
<script>
{code}
</script></body></html>"""
open(out, "w", encoding="utf-8").write(html)
print("ok", out, len(html) // 1024, "KB")
