import json,base64,subprocess,concurrent.futures as cf
J=[
 ('p1','blink',"Exactly the same illustration, but every person's eyes are gently closed, as in a blink. Change nothing else: same faces, clothes, poses, colors, background and composition."),
 ('r2','blink',"Exactly the same illustration, but both farmers' eyes are gently closed, as in a blink. Change nothing else: same faces, clothes, poses, colors, background and composition."),
 ('p5','blink',"Exactly the same illustration, but the scribe's eyes are gently closed, as in a blink. Change nothing else: same face, clothes, pose, colors, background and composition."),
 ('p3','blink',"Exactly the same illustration, but the central goddess's eyes are gently closed, as in a blink. Change nothing else: same faces, clothes, poses, colors, background and composition."),
 ('p6','blink',"Exactly the same illustration, but the emperor's eyes are gently closed, as in a blink. Change nothing else: same face, clothes, pose, colors, background and composition."),
 ('p6','smile',"Exactly the same illustration, but the emperor has a gentle warm smile with the corners of his mouth lifted and eyes open and softly bright. Change nothing else: same face shape, clothes, pose, colors, background and composition."),
 ('p3','smile',"Exactly the same illustration, but the central goddess has a gentle warm smile with the corners of her mouth lifted and eyes open. Change nothing else: same faces, clothes, poses, colors, background and composition."),
]
def one(j):
    n,k,p=j
    r=subprocess.run(['curl','-s','-m','280','https://api.openai.com/v1/images/edits','-F','model=gpt-image-2','-F','quality=medium','-F','size=1536x1024','-F',f'image=@{n}.png','-F',f'prompt={p}'],capture_output=True)
    try:
        d=json.loads(r.stdout)
        if 'data' in d: open(f'{n}_{k}.png','wb').write(base64.b64decode(d['data'][0]['b64_json'])); return n,k,'ok'
        return n,k,str(d)[:160]
    except Exception as e: return n,k,str(e)
with cf.ThreadPoolExecutor(7) as ex:
    for r in ex.map(one,J): print(r)
