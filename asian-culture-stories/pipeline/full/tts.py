import json,subprocess,base64,sys
S=json.load(open('script.json'))
VID='1SF4Jqf4CNRoja3ACqWC'
for lang in ['en','vi']:
    segs=S[lang];halves=[segs[:17],segs[17:]]
    allstarts={};offset=0.0;files=[]
    for h,part in enumerate(halves):
        text=' '.join(t for _,t in part)
        body={"text":text,"model_id":"eleven_v3","voice_settings":{"stability":0.6,"similarity_boost":0.85,"style":0.1}}
        if lang=='vi': body['language_code']='vi'
        json.dump(body,open('b.json','w'))
        r=subprocess.run(['curl','-s','-m','300','-X','POST',f'https://api.elevenlabs.io/v1/text-to-speech/{VID}/with-timestamps?output_format=mp3_44100_128','-H','Content-Type: application/json','-d','@b.json'],capture_output=True)
        d=json.loads(r.stdout)
        if 'audio_base64' not in d: print(lang,h,str(d)[:300]); sys.exit(1)
        fn=f'vo_{lang}_{h}.mp3';open(fn,'wb').write(base64.b64decode(d['audio_base64']));files.append(fn)
        a=d['alignment'];c=''.join(a['characters']);st=a['character_start_times_seconds'];en=a['character_end_times_seconds']
        pos=0
        for sid,t in part:
            key=t[:12];i=c.index(key,pos);allstarts[sid]=round(st[i]+offset,3);pos=i+1
        dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',fn],capture_output=True,text=True).stdout)
        offset+=dur+0.6
    allstarts['end']=round(offset-0.6,3)
    open(f'list_{lang}.txt','w').write(f"file 'vo_{lang}_0.mp3'\nfile 'gap.wav'\nfile 'vo_{lang}_1.mp3'\n")
    json.dump(allstarts,open(f'T_{lang}.json','w'),indent=0);print(lang,allstarts['end'])
