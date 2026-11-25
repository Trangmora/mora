"""Tạo ảnh giấy cắt cho tập Trung Quốc: prompt = ST (phong cách chung) + CN_ERA + CONFUCIUS (nếu có) + cảnh + CN_NEG.
Prompt riêng của từng cảnh lấy từ bảng "Prompt tạo ảnh" trong script.md.
Dùng: python3 gen_cn.py <script.md> <outdir> A1 A2 ... [--ref A0.png cho các cảnh có Khổng Tử]"""
import sys, re, json, base64, subprocess, concurrent.futures as cf
sys.path.insert(0, 'pipeline/scenes')
ST = re.search(r'^ST="(.*)"$', open('pipeline/scenes/gen.py').read(), re.M).group(1)
md = open(sys.argv[1]).read(); out = sys.argv[2]; args = sys.argv[3:]
ref = None
if '--ref' in args: i = args.index('--ref'); ref = args[i + 1]; args = args[:i] + args[i + 2:]
def block(name):
    m = re.search(r'\*\*' + name + r'[^*]*\*\*[^\n]*\n> (.+)', md); return m.group(1).strip()
ERA, CONF, NEG = block('CN_ERA'), block('CONFUCIUS'), block('CN_NEG')
rows = {m.group(1): m.group(3).strip() for m in re.finditer(r'^\| (A\d+\w*) \| ([^|]+) \| (.+) \|$', md, re.M)}
SPRING_AUTUMN = {'A0','A1','A2','A3','A4','A4c','A5','A6','A6b','A7','A8','A9','A10','A11','A12','A12a','A12b','A12c','A12d','A12e','A13','A21'}
NO_CN_NEG = {'A17','A17w','A19','A19w'}                 # cảnh Việt Nam / châu Âu / hiện đại: không dùng danh sách cấm của Trung Quốc
def gen(k):
    scene = rows[k]; has_c = 'Confucius' in scene and k != 'A21' or k == 'A0'
    era = ERA if k in SPRING_AUTUMN else ''          # chỉ cảnh thời Xuân Thu mới thêm mô tả thời đại này
    neg = NEG if k not in NO_CN_NEG else 'No text, no letters.'
    prompt = ST + ' ' + era + ' ' + (CONF + ' ' if has_c else '') + scene + ' One single scene filling the whole picture: no panels, no collage, no split frames, no inset pictures. ' + neg
    if ref and has_c and k != 'A0':
        cmd = ['curl', '-s', '-m', '300', 'https://api.openai.com/v1/images/edits', '-F', 'model=gpt-image-2',
               '-F', 'size=1536x1024', '-F', 'quality=medium', '-F', f'image[]=@{ref}',
               '-F', 'prompt=Use the attached image only as the character reference for Confucius (same face, beard, cap and robe). ' + prompt]
    else:
        json.dump({"model": "gpt-image-2", "size": "1536x1024", "quality": "medium", "n": 1, "prompt": prompt}, open(f'{out}/{k}.json', 'w'))
        cmd = ['curl', '-s', '-m', '300', 'https://api.openai.com/v1/images/generations', '-H', 'Content-Type: application/json', '-d', f'@{out}/{k}.json']
    r = subprocess.run(cmd, capture_output=True, text=True)
    try: d = json.loads(r.stdout); data = base64.b64decode(d['data'][0]['b64_json'])   # giải mã trước, lỗi thì không ghi đè ảnh cũ
    except Exception: return k, r.stdout[:300]
    open(f'{out}/{k}.png', 'wb').write(data); return k, 'ok'
with cf.ThreadPoolExecutor(8) as ex:
    for k, st in ex.map(gen, args): print(k, st)
