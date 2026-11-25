"""Tạo hình bằng Nano Banana (fal.ai), có gửi kèm 1 hình mẫu của kênh để giữ phong cách. Khoảng $0,04 một hình."""
import json,subprocess,time,base64,sys,os,concurrent.futures as cf,cv2
REF='../../samurai/img/e5.png'
im=cv2.resize(cv2.imread(REF),(768,512));ok,b=cv2.imencode('.jpg',im,[cv2.IMWRITE_JPEG_QUALITY,85]);REFURI='data:image/jpeg;base64,'+base64.b64encode(b.tobytes()).decode()
ST="Create a NEW scene in exactly the same flat paper-cut illustration style as the reference image (bold simple shapes, dark-brown outlines, soft paper grain, muted earthy palette of terracotta, ochre, cream, sage, indigo and black, minimal faces), Edo period Japan, wide 16:9, no text, no letters. Scene: "
S={
"n1":"A young Japanese lord in formal court robes and a tall black lacquered cap kneeling respectfully in a grand Edo castle hall with golden painted sliding doors, imperial envoys in elegant robes seated opposite him.",
"n2":"An old arrogant court official with a thin beard and rich purple robes looking down and sneering at a humiliated young lord who kneels with clenched fists in a castle hall.",
"n3":"A long castle corridor with sliding doors painted with large pine trees; a young lord in formal robes angrily drawing a short sword while an old official in purple robes flees in panic, other officials rushing in to hold the young lord back.",
"n4":"A quiet empty room with white tatami and a folded white cloth, a single short sword lying on a small wooden stand, cherry blossom petals drifting in from an open sliding door, solemn and peaceful mood.",
"n5":"A sad line of samurai retainers carrying bundles walking away from the gate of a white Japanese castle by the sea, looking back over their shoulders, grey sky, falling cherry petals.",
"n6":"A group of masterless samurai kneeling in a circle in a dark room by candlelight, solemnly pressing their seals on a long paper oath scroll, determined faces.",
"n7":"Night street in Kyoto: a samurai in a dark kimono lying drunk on the ground with a sake bottle, a passing townsman in a straw hat looking down at him with contempt, people watching from a teahouse with red lanterns.",
"n8":"Night, snowy garden of a mansion: several masterless samurai in black and white triangle patterned coats holding lanterns opening the wooden door of a small charcoal storage shed, an old man in white sleeping robes hiding inside among sacks of charcoal.",
"n9":"A traditional kabuki theater stage with colorful painted backdrop of a snowy night, actors in dramatic costumes of black and white triangle patterned coats striking a bold pose, audience silhouettes in front.",
}
def one(k):
    if os.path.exists(f'{k}.png') and not sys.argv[1:]: return k,'skip'
    body={"prompt":ST+S[k],"image_urls":[REFURI],"num_images":1,"aspect_ratio":"3:2"}
    json.dump(body,open(f'b_{k}.json','w'))
    r=json.loads(subprocess.run(['curl','-s','-m','120','-X','POST','https://queue.fal.run/fal-ai/nano-banana/edit','-H','Content-Type: application/json','-d',f'@b_{k}.json'],capture_output=True,text=True).stdout or '{}')
    if 'status_url' not in r: return k,str(r)[:300]
    for i in range(100):
        s=json.loads(subprocess.run(['curl','-s','-m','30',r['status_url']],capture_output=True,text=True).stdout or '{}')
        if s.get('status')=='COMPLETED':break
        time.sleep(3)
    d=json.loads(subprocess.run(['curl','-s','-m','60',r['response_url']],capture_output=True,text=True).stdout)
    if 'images' not in d: return k,str(d)[:300]
    subprocess.run(['curl','-s','-L','-m','120','-o',f'{k}.raw',d['images'][0]['url']])
    x=cv2.imread(f'{k}.raw');x=cv2.resize(x,(1536,1024),interpolation=cv2.INTER_LANCZOS4);cv2.imwrite(f'{k}.png',x);return k,'ok'
with cf.ThreadPoolExecutor(5) as ex:
    for r in ex.map(one,sys.argv[1:] or list(S)): print(r,flush=True)
