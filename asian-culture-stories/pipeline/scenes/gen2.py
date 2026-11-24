import json,base64,subprocess,concurrent.futures as cf
ST="Flat 2D vector illustration like a hand-made paper-cut animated documentary: bold simple geometric shapes with clean dark-brown outlines, visible soft paper grain and faint hand-drawn crackle lines, evenly lit bright mid-tone warm colors (NOT dark, NOT night), muted earthy palette of terracotta red, ochre, cream, sage green and black ink, characters drawn front-facing and symmetrical with minimal faces made of a few simple lines, flat colors with slight soft shading, gentle vignette, a few simple pale flowers scattered as decoration. Wide 16:9, no text, no letters. "
S={
"r2":"Two ancient Japanese farmers in conical straw hats bending over planting rice seedlings in a bright green flooded paddy, front view, simple rolling sage-green hills in the distance, a plain clear pale ochre sky with absolutely NO sun and NO clouds, flat shapes.",
"p4":"A wild landscape: a tall sage-green mountain on the left, a winding blue-green river in the middle, a big terracotta-brown storm cloud with a bold vermilion lightning bolt above, small cream round ghost-like spirits (kami) with dot eyes floating near the mountain and river, cream sky.",
"p5":"An ancient Japanese court scribe in cream robes kneeling at a low desk writing with a brush on a long paper scroll, two stacks of scrolls beside him and a small oil lamp with a flame, front view, simple room with a paper screen, warm terracotta background.",
"p6":"An ancient Japanese emperor seated front-facing in ornate cream and red robes with a golden halo of rays behind him, in front of him on a low table a round bronze mirror, a sword and a curved jewel, pale ochre background with simple cloud shapes and scattered flowers.",
}
def one(k):
    json.dump({"model":"gpt-image-2","size":"1536x1024","quality":"medium","n":1,"prompt":ST+S[k]},open(k+'.json','w'))
    r=subprocess.run(['curl','-s','-m','280','https://api.openai.com/v1/images/generations','-H','Content-Type: application/json','-d','@'+k+'.json'],capture_output=True)
    d=json.loads(r.stdout)
    if 'data' in d: open(k+'.png','wb').write(base64.b64decode(d['data'][0]['b64_json'])); return k,'ok'
    return k,str(d)[:200]
with cf.ThreadPoolExecutor(4) as ex:
    for r in ex.map(one,S): print(r)
