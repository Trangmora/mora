import json,base64,subprocess,concurrent.futures as cf
ST="Flat 2D vector illustration like a hand-made paper-cut animated documentary: bold simple geometric shapes with clean dark-brown outlines, visible soft paper grain and faint hand-drawn crackle lines, evenly lit bright mid-tone warm colors (NOT dark, NOT night), muted earthy palette of terracotta red, ochre, cream, sage green and black ink, characters drawn front-facing and symmetrical with minimal faces made of a few simple lines, flat colors with slight soft shading, gentle vignette, a few simple pale flowers scattered as decoration. Wide 16:9, no text, no letters. "
S={
"p1":"A Shinto priest in white robes and a tall black eboshi hat standing in front of a huge sacred tree trunk wrapped with a thick straw rope and white zigzag paper streamers, small cream round spirits floating, warm terracotta red-brown textured background.",
"p2":"Two ancient Japanese farmers in conical straw hats planting rice in a bright green flooded paddy, pale ochre sky with a red sun, simple rolling hills, front view, flat shapes.",
"p3":"The sun goddess Amaterasu as a front-facing woman in ancient cream robes with a halo of golden rays, peeking out of a round dark cave opening in a sage green hill, a few small ancient figures dancing in front, terracotta background.",
}
def one(k):
    json.dump({"model":"gpt-image-2","size":"1536x1024","quality":"medium","n":1,"prompt":ST+S[k]},open(k+'.json','w'))
    r=subprocess.run(['curl','-s','-m','280','https://api.openai.com/v1/images/generations','-H','Content-Type: application/json','-d','@'+k+'.json'],capture_output=True)
    d=json.loads(r.stdout)
    if 'data' in d: open(k+'.png','wb').write(base64.b64decode(d['data'][0]['b64_json'])); return k,'ok'
    return k,str(d)[:200]
with cf.ThreadPoolExecutor(3) as ex:
    for r in ex.map(one,S): print(r)
