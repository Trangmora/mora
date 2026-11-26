"""Ghép three.js r180 (bản cjs, bọc lại) + src/*.js + films/<phim>/*.js thành một file HTML chạy độc lập.
Dùng: python3 tools/build.py <phim>   ->  dist/<phim>.html"""
import sys, glob, os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); film = sys.argv[1]
three = open(f'{R}/node_modules/three/build/three.cjs', encoding='utf-8').read()
parts = sorted(glob.glob(f'{R}/src/*.js') + glob.glob(f'{R}/films/{film}/*.js'), key=os.path.basename)
code = '\n'.join(f'// ===== {os.path.basename(p)}\n' + open(p, encoding='utf-8').read() for p in parts)
html = f'''<!doctype html><html><head><meta charset="utf-8"><title>{film}</title>
<style>html,body{{margin:0;background:#000;overflow:hidden}}canvas{{display:block;width:100vw;height:100vh;object-fit:contain}}</style></head><body>
<script>const THREE = (function(){{ const module = {{exports:{{}}}}; const exports = module.exports;
{three}
return module.exports; }})();</script>
<script>
{code}
</script></body></html>'''
os.makedirs(f'{R}/dist', exist_ok=True); open(f'{R}/dist/{film}.html', 'w', encoding='utf-8').write(html); print('ok', f'dist/{film}.html', len(html) // 1024, 'KB')
