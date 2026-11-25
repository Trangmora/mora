"""Tạo ảnh cho một tập theo bảng "Prompt tạo ảnh" trong script.md (khối thời đại, nhân vật, danh sách cấm).
Dùng: python3 gen_ep.py <script.md> <outdir> <khối_nhân_vật> <tên_nhân_vật_trong_prompt> <cảnh>=<khối_thời_đại|-|raw> ...
  '-' = không thêm khối thời đại; 'raw' = dùng nguyên prompt (không thêm phong cách giấy cắt, ví dụ tranh thủy mặc).
  Cảnh có tên nhân vật thì thêm khối nhân vật. Cảnh không phải Trung Quốc thêm hậu tố ':vn' để bỏ danh sách cấm."""
import sys, re, json, base64, subprocess, concurrent.futures as cf
ST = re.search(r'^ST="(.*)"$', open('pipeline/scenes/gen.py').read(), re.M).group(1)
md = open(sys.argv[1]).read(); out = sys.argv[2]; CHB, CHN = sys.argv[3], sys.argv[4]
def block(name):
    m = re.search(r'\*\*' + name + r'[^*]*\*\*[^\n]*\n> (.+)', md); return m.group(1).strip() if m else ''
rows = {}
for m in re.finditer(r'^\| (A\d+\w*) \| ([^|]+) \| (.+) \|$', md, re.M): rows.setdefault(m.group(1), m.group(3).strip())   # lấy dòng đầu tiên (bảng prompt), bỏ qua bảng clip phía sau
EXTRA = json.loads(open(out + '/extra_prompts.json').read()) if __import__('os').path.exists(out + '/extra_prompts.json') else {}
NEG = block(__import__('os').environ.get('NEG_BLOCK', 'CN_NEG')); CH = block(CHB)
def gen(spec):
    k, era = spec.split('=', 1); vn = era.endswith(':vn'); era = era.replace(':vn', '')
    scene = EXTRA.get(k) or rows[k]
    if era == 'raw': prompt = scene
    else:
        prompt = ST + ' ' + (block(era) + ' ' if era != '-' else '') + (CH + ' ' if CHN in scene else '') + scene + \
                 ' One single scene filling the whole picture: no panels, no collage, no split frames, no inset pictures. ' + ('No text, no letters.' if vn else NEG)
    json.dump({"model": "gpt-image-2", "size": "1536x1024", "quality": "medium", "n": 1, "prompt": prompt}, open(f'{out}/{k}.json', 'w'))
    r = subprocess.run(['curl', '-s', '-m', '300', 'https://api.openai.com/v1/images/generations', '-H', 'Content-Type: application/json', '-d', f'@{out}/{k}.json'], capture_output=True, text=True)
    try: d = json.loads(r.stdout); data = base64.b64decode(d['data'][0]['b64_json'])
    except Exception: return k, r.stdout[:200]
    open(f'{out}/{k}.png', 'wb').write(data); return k, 'ok'
with cf.ThreadPoolExecutor(8) as ex:
    for k, s in ex.map(gen, sys.argv[5:]): print(k, s, flush=True)
