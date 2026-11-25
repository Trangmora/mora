import json,base64,subprocess,time,cv2,concurrent.futures as cf
KEEP=" Static camera, no zoom, no camera movement. Keep the exact flat paper-cut illustration style, colors, outlines and faces."
J={
"o0":"The banners flutter strongly in the wind, the mist drifts slowly across the valley, the horses shift and breathe, the warrior holds the sword up high, the sun glows.",
"a1":"The man slowly writes with the brush on the paper, steam rises from the tea cup, the pine branch sways gently.",
"b1":"The nobles raise their cups and laugh, cherry petals fall, on the right the smoke rises from the huts and the riders move through the fields.",
"b3":"The rider on horseback moves forward, the horse runs, the clouds drift, the dust swirls, the ribbons on the armor flutter.",
"c1":"The warriors march forward toward the gate, the banners sway, the nobles behind the gate lean and look worried.",
"c2":"The banners flutter in the wind, the horses shift their heads, the two groups stand facing each other, the grass sways.",
"c3":"The big stylized waves roll and curl, the wooden boats rock up and down on the sea, the banners flap in the wind, clouds move.",
"c4":"The leader slowly opens and moves his fan, the kneeling men bow their heads, the curtains sway slightly.",
"d1":"Smoke rises and drifts from the valley, the banners sway, the rider gallops along the road, clouds move over the castles.",
"d3":"The official writes with the brush, moves the beads of the abacus, sighs and looks up, the light changes slightly.",
"d4":"The man walks slowly forward along the street, the townspeople bow, the lanterns sway, the cloth banners flutter.",
"e1":"The woman rides the galloping horse forward, her long black hair flows in the wind, the banners flutter, dust rises.",
"e2":"The tall man stands calmly and bows slightly, the seated lord nods and moves his fan, the candle flames flicker.",
"e3":"The two men slowly circle each other on the beach, the waves roll onto the shore, the boats rock, the sun glows.",
"e6":"The incense smoke rises and curls slowly, red maple leaves fall gently, the people bow their heads in prayer.",
"f1":"The man with scissors cuts the hair knot, the seated man lowers his head sadly, the soldiers in the background march past.",
"f2":"The men run down the hill, the grass blows in the wind, smoke drifts across the red sky.",
"g1":"The two kendo fighters step and strike with bamboo swords, the students watch and nod, the light shines through the window.",
"g2":"Cherry petals fall and drift in the wind, the clouds and mist move slowly, the branches sway, the man stands still looking at the sunset.",
"b2":"x","d2":"x","e4":"x","e5":"x"}
def one(k):
    im=cv2.resize(cv2.imread(f'../img/{k}.png'),(1280,853));cv2.imwrite(k+'.jpg',im,[cv2.IMWRITE_JPEG_QUALITY,90])
    uri='data:image/jpeg;base64,'+base64.b64encode(open(k+'.jpg','rb').read()).decode()
    json.dump({"prompt":"Flat paper-cut animation. "+J[k]+KEEP,"image_url":uri,"resolution":"720p"},open(f'fal_{k}.json','w'))
    r=json.loads(subprocess.run(['curl','-s','-m','120','-X','POST','https://queue.fal.run/fal-ai/wan/v2.2-a14b/image-to-video/turbo','-H','Content-Type: application/json','-d',f'@fal_{k}.json'],capture_output=True,text=True).stdout)
    s={}
    for i in range(120):
        s=json.loads(subprocess.run(['curl','-s','-m','30',r['status_url']],capture_output=True,text=True).stdout or '{}')
        if s.get('status')=='COMPLETED':break
        time.sleep(5)
    d=json.loads(subprocess.run(['curl','-s','-m','60',r['response_url']],capture_output=True,text=True).stdout)
    if 'video' not in d: return k,str(d)[:400]
    subprocess.run(['curl','-s','-L','-m','120','-o',f'clip_{k}.mp4',d['video']['url']]);return k,s.get('status')
with cf.ThreadPoolExecutor(8) as ex:
    for r in ex.map(one,[k for k in J if not __import__('os').path.exists(f'clip_{k}.mp4')]): print(r,flush=True)
