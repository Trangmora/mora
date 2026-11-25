import numpy as np,wave,json,sys
def rd(f):
    w=wave.open(f);x=np.frombuffer(w.readframes(w.getnframes()),'<i2').astype(np.float32)/32768;return x.reshape(-1,w.getnchannels())
SR=44100
for lang in ['en','vi']:
    TL=json.load(open(f'timeline_{lang}.json'));G=TL['G'];SC=TL['scenes'];DUR=TL['END'];N=int(DUR*SR);t=np.arange(N)/SR
    # sections: kumiko -> ondo (from s9) -> manatsu (from s17)
    def seg(x,start,end,off=0):
        a=int(start*SR);b=min(N,int(end*SR));n=b-a;y=np.zeros((N,2),np.float32)
        src=x[int(off*SR):int(off*SR)+n]
        if len(src)<n: src=np.concatenate([src,x[:n-len(src)]])
        y[a:b]=src;return y
    xf=2.5
    k=rd('m_kumiko.wav');o=rd('m_ondo.wav');m=rd('m_manatsu.wav')
    a9,a17=G['s9']-1.2,G['s17']-1.2
    yk=seg(k,0,a9+xf);yo=seg(o,a9-xf,a17+xf);ym=seg(m,a17-xf,DUR,off=20)
    fk=np.clip((a9+xf-t)/xf,0,1);fo=np.clip((t-(a9-xf))/xf,0,1)*np.clip((a17+xf-t)/xf,0,1);fm=np.clip((t-(a17-xf))/xf,0,1)
    bed=yk*fk[:,None]+yo*fo[:,None]*1.25+ym*fm[:,None]*0.8
    # voice activity from the narration track
    v=rd(f'vot_{lang}.wav')[:,0];v=np.pad(v,(0,max(0,N-len(v))))[:N]
    win=int(.05*SR);rms=np.sqrt(np.convolve(v**2,np.ones(win)/win,'same'))
    speak=(rms>0.02).astype(np.float32)
    # treat a gap shorter than 0.7 s as still speaking
    hold=int(.35*SR);speak=np.convolve(speak,np.ones(2*hold+1),'same')>0
    target=np.where(speak,0.10,0.60).astype(np.float32)
    # swell at the title reveal ("It's called Shinto")
    target=np.where((t>G['op8']-0.2)&(t<G['op9']),np.maximum(target,0.32),target)
    # silence in the 'world went dark' beat
    dark=[s for s in SC if s['pg']=='p3'][1];target=np.where((t>dark['s']+.3)&(t<dark['e']-.2),0.0,target)
    # smooth (attack 0.5 s, release 0.4 s)
    g=np.zeros(N,np.float32);cur=0.;au=1/(0.5*SR);ad=1/(0.4*SR)
    for i in range(0,N,64):
        tg=target[i];cur+= (min(au*64,tg-cur) if tg>cur else max(-ad*64,tg-cur));g[i:i+64]=cur
    env=np.minimum(1,t/2.5)*np.minimum(1,(DUR-t)/5)
    out=bed*(g*env)[:,None]
    ww=wave.open(f'bed2_{lang}.wav','wb');ww.setnchannels(2);ww.setsampwidth(2);ww.setframerate(SR);ww.writeframes((np.clip(out,-1,1)*32767).astype('<i2').tobytes());ww.close()
    print(lang,'speech %.0f%%'%(100*speak.mean()))
