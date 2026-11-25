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
def gen(k):
    scene = rows[k]; has_c = 'Confucius' in scene and k != 'A21' or k == 'A0'
    prompt = ST + ' ' + ERA + ' ' + (CONF + ' ' if has_c else '') + scene + ' ' + NEG
    if ref and has_c and k != 'A0':
        cmd = ['curl', '-s', '-m', '300', 'https://api.openai.com/v1/images/edits', '-F', 'model=gpt-image-2',
               '-F', 'size=1536x1024', '-F', 'quality=medium', '-F', f'image[]=@{ref}',
               '-F', 'prompt=Use the attached image only as the character reference for Confucius (same face, beard, cap and robe). ' + prompt]
    else:
        json.dump({"model": "gpt-image-2", "size": "1536x1024", "quality": "medium", "n": 1, "prompt": prompt}, open(f'{out}/{k}.json', 'w'))
        cmd = ['curl', '-s', '-m', '300', 'https://api.openai.com/v1/images/generations', '-H', 'Content-Type: application/json', '-d', f'@{out}/{k}.json']
    r = subprocess.run(cmd, capture_output=True, text=True)
    try: d = json.loads(r.stdout); open(f'{out}/{k}.png', 'wb').write(base64.b64decode(d['data'][0]['b64_json'])); return k, 'ok'
    except Exception: return k, r.stdout[:300]
with cf.ThreadPoolExecutor(6) as ex:
    for k, st in ex.map(gen, args): print(k, st)
