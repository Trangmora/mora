"""Ảnh phong cách 3D điện ảnh (thử nghiệm thay cho cắt giấy). gpt-image-2, 1536x1024.
Dùng: python3 pipeline/scenes/gen3d.py <outdir> <prompts.json>   (prompts.json: {tên: mô tả cảnh})
Mỗi prompt = STYLE + ERA (nếu có trong file, khóa "_era") + cảnh + NEG."""
import sys, json, base64, subprocess, os, concurrent.futures as cf
OUT, PF = sys.argv[1], sys.argv[2]; P = json.load(open(PF)); ERA = P.pop('_era', '')
STYLE = ("A still frame from a high-quality stylized 3D animated feature film: soft global illumination, volumetric light and mist, "
         "rich painterly textures, subtle subsurface skin, expressive but natural faces, cinematic depth of field, warm filmic color grade. ")
NEG = (" Single coherent scene, one moment in time. No text, no letters, no captions, no watermark, no borders, no split panels, "
       "no modern objects, no anachronisms.")
def gen(item):
    k, scene = item; f = f'{OUT}/{k}.png'
    if os.path.exists(f): return k, 'có rồi'
    body = {"model": "gpt-image-2", "size": "1536x1024", "quality": "medium", "n": 1, "prompt": STYLE + ERA + ' ' + scene + NEG}
    jf = f'{OUT}/{k}.json'; json.dump(body, open(jf, 'w'))
    r = subprocess.run(['curl', '-s', '-m', '300', 'https://api.openai.com/v1/images/generations', '-H', 'Content-Type: application/json', '-d', '@' + jf], capture_output=True, text=True)
    try: data = base64.b64decode(json.loads(r.stdout)['data'][0]['b64_json'])
    except Exception: return k, r.stdout[:200]
    open(f, 'wb').write(data); return k, 'ok'
with cf.ThreadPoolExecutor(6) as ex:
    for k, s in ex.map(gen, P.items()): print(k, s, flush=True)
