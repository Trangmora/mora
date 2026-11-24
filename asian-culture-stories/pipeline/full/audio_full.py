import numpy as np,wave,json,sys
lang=sys.argv[1];TL=json.load(open(f'timeline_{lang}.json'));G=TL['G'];SC=TL['scenes']
SR=44100;DUR=TL['END'];N=int(SR*DUR);rng=np.random.default_rng(5)
L=np.zeros(N);R=np.zeros(N);t=np.arange(N)/SR
def add(sig,t0,pan=0.,g=1.):
    i=int(t0*SR)
    if i>=N or i<0: return
    s=sig[:N-i]*g;L[i:i+len(s)]+=s*(1-max(pan,0));R[i:i+len(s)]+=s*(1+min(pan,0))
def gate(a,b,f=.25): return 1-(np.clip((t-(a-f))/f,0,1)*np.clip(((b+f)-t)/f,0,1))
sil=np.zeros(N)
for k in ['op5','op7','s1','s4','s9','s17','s18']: sil=np.maximum(sil,gate(G[k]-.9,G[k]-.1))
dark=[s for s in SC if s['pg']=='p3'][1];party=[s for s in SC if s['pg']=='p3'][2]
sil=np.maximum(sil,gate(dark['s']+.3,dark['e']-.5)*.85)
mus=1-sil;env=np.minimum(1,t/2)*np.minimum(1,(DUR-t)/4)
w=np.convolve(rng.normal(size=N),np.ones(900)/900,'same')*10*(0.55+0.45*np.sin(t*.5+1))*env*(1-.5*sil)*.05;L+=w;R+=w[::-1]
dr=(np.sin(2*np.pi*73.42*t)+.5*np.sin(2*np.pi*110*t+np.sin(t*.3)))*.05*env*mus;L+=dr;R+=dr
def ks(f,d,dec=.996):
    n=int(SR/f);buf=rng.uniform(-1,1,n);o=np.zeros(int(d*SR))
    for i in range(len(o)): o[i]=buf[i%n];buf[i%n]=dec*.5*(buf[i%n]+buf[(i+1)%n])
    return o*np.linspace(1,0,len(o))**.6
HZ=[293.66,329.63,349.23,440.,466.16,587.33];cache={}
def koto(t0,g=.3,f=None):
    f=f or HZ[int(rng.integers(0,len(HZ)))]
    if f not in cache: cache[f]=ks(f,3.0)
    i=int(t0*SR)
    if 0<=i<N and mus[i]>.5: add(cache[f],t0,float(rng.uniform(-.3,.3)),g)
tt=1.4
while tt<DUR-3: koto(tt,.28);tt+=float(rng.choice([1.4,1.8,2.2,2.6]))
def bell(t0,g=.22,base=880):
    tn=np.arange(int(3.5*SR))/SR;add(sum(a*np.sin(2*np.pi*base*m*tn)*np.exp(-tn*d) for m,a,d in [(1,1,1.2),(1.5,.6,1.6),(2.51,.4,2.5),(3.52,.2,3.5)])*g,t0,.15)
def boom(t0,g=.8):
    tn=np.arange(int(1.6*SR))/SR;add(np.sin(2*np.pi*(55-18*tn)*tn)*np.exp(-tn*4)*g,t0)
def swish(t0,d,g):
    n=int(d*SR);x=np.convolve(rng.normal(size=n),np.ones(25)/25,'same')*np.sin(np.linspace(0,np.pi,n))**2*g;add(x,t0)
def thunder(t0):
    n=int(2.6*SR);x=np.convolve(rng.normal(size=n),np.ones(300)/300,'same')*9;x*=np.exp(-np.linspace(0,1,n)*2.6)*np.minimum(1,np.linspace(0,14,n))*.45;add(x,t0)
    tn=np.arange(int(.4*SR))/SR;add(rng.normal(size=len(tn))*np.exp(-tn*14)*.3,t0)
def tearsfx(t0):
    n=int(1.2*SR);x=rng.normal(size=n)*.5;cl=(rng.random(n)<.004)*rng.normal(size=n)*3;x=np.convolve(x+cl,[1,-.6],'same')*np.sin(np.linspace(0,np.pi,n))**1.5*.09;add(x,t0)
# opening
swish(G['op1']+.4,1.8,.05);swish(G['op8']-.3,2.0,.06);n=int(1.3*SR);add(np.convolve(rng.normal(size=n),np.ones(30)/30,'same')*np.linspace(0,1,n)**2*.12,G['op8']-1.3)
bell(G['op8']);boom(G['op8'])
for i,f in enumerate([587.33,440,349.23,293.66]): koto(G['op8']+.1+i*.5,.45,f)
prev=None
for s in SC:
    if s['tr']=='flower': koto(s['s']-.55,.35,440);koto(s['s']-.15,.3,587.33)
    if s['tr']=='tear': tearsfx(s['s']-.85)
    if s['pg']=='p4': thunder(s['s']+(s['e']-s['s'])*.8)
    if s['pg']=='f4b' and (prev is None or prev['pg']!='f4b'): thunder(s['s']+.25)
    if s['pg']=='p6' : bell(s['s']+(s['e']-s['s'])*.55,.2,587)
    if s['pg']=='clip_f2' : 
        n=int((s['e']-s['s'])*SR);x=np.convolve(rng.normal(size=n),np.ones(6)/6,'same')*.025*np.minimum(1,np.linspace(0,4,n))*np.minimum(1,np.linspace(4,0,n));add(x,s['s'])
    if s['pg']=='clip_f3' and (prev is None or prev['pg']!='clip_f3'): bell(s['s']+1.0,.25,660)
    if s['pg']=='f6' and (prev is None or prev['pg']!='f6'): bell(s['s']+.6,.18,523)
    prev=s
# dark -> reveal -> party
n=int((dark['e']-dark['s'])*SR);tn=np.arange(n)/SR;add(np.sin(2*np.pi*48*tn)*np.sin(np.linspace(0,np.pi,n))*.5,dark['s'])
bell(dark['e']-.45,.25,1174.7)
pend=[s for s in SC if s['pg']=='clip_p3'][0]['e']
for k in np.arange(party['s'],pend,.4):
    tn=np.arange(int(.2*SR))/SR;add(np.sin(2*np.pi*(120-60*tn)*tn)*np.exp(-tn*15)*.45,float(k))
# ending swell
e0=SC[-1]['s'];gx=np.clip((t-e0)/3,0,1)*np.clip((DUR-1-t)/4,0,1)
pad=(np.sin(2*np.pi*146.83*t)+.6*np.sin(2*np.pi*220*t)+.4*np.sin(2*np.pi*293.66*t))*gx*.05;L+=pad;R+=pad
bell(e0+1.2,.22);boom(e0+1.2,.6)
m=max(abs(L).max(),abs(R).max());L/=m;R/=m
wv=wave.open(f'music_{lang}.wav','wb');wv.setnchannels(2);wv.setsampwidth(2);wv.setframerate(SR);wv.writeframes((np.stack([L,R],1)*.85*32767).astype('<i2').tobytes());wv.close();print('ok',lang)
