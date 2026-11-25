"""Tạo hình tập Lê Lợi bằng Nano Banana (fal.ai), kèm 1 hình mẫu của kênh để giữ phong cách giấy cắt. Khoảng $0,04 một hình."""
import json, subprocess, time, base64, sys, os, concurrent.futures as cf
import cv2
REF = '../../samurai/img/b2.png'
im = cv2.resize(cv2.imread(REF), (768, 512)); ok, b = cv2.imencode('.jpg', im, [cv2.IMWRITE_JPEG_QUALITY, 85])
REFURI = 'data:image/jpeg;base64,' + base64.b64encode(b.tobytes()).decode()
ST = ("Create a NEW scene using ONLY the art style of the reference image: flat paper-cut illustration, bold simple shapes, dark-brown outlines, "
      "soft paper grain, muted earthy palette of terracotta, ochre, cream, sage green, indigo and black, minimal faces. "
      "Setting: 15th-century Vietnam (Dai Viet). It must look Vietnamese, NOT Japanese and NOT Chinese: Vietnamese men wear simple cross-collared "
      "tunics with cloth head wraps or conical leaf hats, barefoot or in sandals; thatched bamboo houses, banana trees, areca palms, banyan trees, "
      "rice fields, limestone karst mountains. No kimono, no samurai, no katana, no torii gates. Wide 16:9, no text, no letters, no writing. Scene: ")
S = {
 "v1": "Night on a calm river: a Vietnamese fisherman in a small wooden boat pulling up a fishing net, inside the net a long plain iron blade glows faintly, a burning torch on the boat, reeds and a full moon.",
 "v2": "Close view at night on a river: an amazed Vietnamese fisherman in a brown tunic and conical leaf hat holding up a long bare iron blade with NO handle and NO crossguard, just a plain flat strip of dark iron gripped through a rag, beside a burning torch; the blade shines with soft golden light; dark river and banana leaves behind.",
 "v3": "Occupied land: foreign Ming dynasty soldiers in red-tasseled helmets and lamellar armor leading a line of sad Vietnamese craftsmen and ox carts piled high with books and scrolls along a road, villagers watching sadly from thatched houses, grey sky.",
 "v4": "A dignified Vietnamese landowner in his thirties, with a short beard, dark blue cross-collared tunic and black cloth head wrap, standing calmly in front of a large wooden stilt house in forested green hills, servants and buffalo in the background.",
 "v5": "A secret oath in a forest clearing: nineteen Vietnamese men kneeling in a circle around a small stone altar with burning incense and a bowl, raising their cups together, tall trees and morning mist.",
 "v7": "A huge old banyan tree with hanging roots at dusk; high among its branches a jeweled sword hilt glows with golden light; the Vietnamese leader in a dark blue tunic looks up at it in wonder.",
 "v8": "The Vietnamese leader in a dark blue tunic raising a complete straight double-edged sword that glows golden above his head, his loyal followers with spears and bamboo shields kneeling and cheering around him, banners, sunrise over hills.",
 "v9": "A hungry rebel camp high on a misty mountain in the rain: thin Vietnamese rebel soldiers sitting around a small cooking fire boiling wild roots and banana stems, a tired war elephant standing behind them, bamboo shelters.",
 "v10": "A brave Vietnamese general wearing a bright golden royal robe riding a galloping horse alone out of a forest toward distant enemy lines with red flags, while in the shadows of the trees the real leader in plain brown clothes watches sadly with a few men.",
 "v11": "A wise Vietnamese scholar with a thin beard and black head wrap sitting under a tree, carefully painting on large green leaves with a small brush dipped in a bowl of honey; ants crawling on the leaves; other leaves on the ground with tiny holes eaten through them.",
 "v12": "A narrow mountain pass between very steep limestone cliffs: an army of foreign Ming cavalry with red flags trapped in the valley, Vietnamese rebels with banners appearing on the cliffs on both sides, dramatic sky.",
 "v13": "After the war, a peaceful riverside: the Vietnamese king in a simple golden-yellow robe watching calmly as defeated Ming soldiers, unarmed, board wooden boats and lead horses to go home; Vietnamese soldiers handing them baskets of rice.",
 "v14": "A Vietnamese royal court hall with red wooden columns and dragon carvings: the new king in a golden-yellow robe and a black winged cap seated on a throne, a scholar standing before him reading aloud from a long open scroll, mandarins bowing.",
 "v15": "A green lake in the middle of an old Vietnamese capital city: the king standing on a wooden dragon boat holding out a glowing golden sword, a giant golden turtle rising from the water in front of the boat, willow trees and old tiled roofs around the lake.",
 "v16": "A calm green lake with a small old stone tower on a tiny island in the middle and a red arched wooden bridge on the side; a very large soft-shell turtle surfacing in the water in the foreground; people on the shore watching; sunrise.",
}
def one(k):
    if os.path.exists(f'{k}.png') and not sys.argv[1:]: return k, 'skip'
    json.dump({"prompt": ST + S[k], "image_urls": [REFURI], "num_images": 1, "aspect_ratio": "3:2"}, open(f'b_{k}.json', 'w'))
    r = json.loads(subprocess.run(['curl', '-s', '-m', '120', '-X', 'POST', 'https://queue.fal.run/fal-ai/nano-banana/edit', '-H', 'Content-Type: application/json', '-d', f'@b_{k}.json'], capture_output=True, text=True).stdout or '{}')
    if 'status_url' not in r: return k, str(r)[:300]
    for _ in range(100):
        s = json.loads(subprocess.run(['curl', '-s', '-m', '30', r['status_url']], capture_output=True, text=True).stdout or '{}')
        if s.get('status') == 'COMPLETED': break
        time.sleep(3)
    d = json.loads(subprocess.run(['curl', '-s', '-m', '60', r['response_url']], capture_output=True, text=True).stdout or '{}')
    if 'images' not in d: return k, str(d)[:300]
    subprocess.run(['curl', '-s', '-L', '-m', '120', '-o', f'{k}.raw', d['images'][0]['url']])
    x = cv2.imread(f'{k}.raw'); x = cv2.resize(x, (1536, 1024), interpolation=cv2.INTER_LANCZOS4); cv2.imwrite(f'{k}.png', x); return k, 'ok'
with cf.ThreadPoolExecutor(5) as ex:
    for r in ex.map(one, sys.argv[1:] or list(S)): print(r, flush=True)
