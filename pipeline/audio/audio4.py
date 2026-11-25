import numpy as np, wave
SR=44100; DUR=57.6; N=int(SR*DUR)
rng=np.random.default_rng(77)
L=np.zeros(N);R=np.zeros(N)
def add(sig,t,pan=0.,g=1.):
    i=int(t*SR)
    if i>=N or i<0: return
    s=sig[:N-i]*g
    L[i:i+len(s)]+=s*(1-max(pan,0)); R[i:i+len(s)]+=s*(1+min(pan,0))
t=np.arange(N)/SR
def gate(t0,t1,fade=.25): return 1-(np.clip((t-(t0-fade))/fade,0,1)*np.clip(((t1+fade)-t)/fade,0,1))
sil=np.maximum.reduce([gate(9.6,10.4),gate(13.8,14.5),gate(20.3,21.9),gate(36.6,37.4)])
mus=1-sil*1.0
mus*=1-0.6*gate(45.9,47.4)
env=np.minimum(1,t/2.0)*np.minimum(1,(DUR-t)/3.5)
w=rng.normal(size=N);w=np.convolve(w,np.ones(900)/900,'same')*10;w*=(0.55+0.45*np.sin(t*.5+1))*env*(1-0.5*sil)*.05
L+=w;R+=w[::-1]
dr=(np.sin(2*np.pi*73.42*t)+.5*np.sin(2*np.pi*110*t+np.sin(t*.3)))*.05*env*mus
L+=dr;R+=dr
def ks(f,dur,decay=.996):
    n=int(SR/f);buf=rng.uniform(-1,1,n);out=np.zeros(int(dur*SR))
    for i in range(len(out)):
        out[i]=buf[i%n];buf[i%n]=decay*.5*(buf[i%n]+buf[(i+1)%n])
    return out*np.linspace(1,0,len(out))**.6
hz={'D':293.66,'E':329.63,'F':349.23,'A':440.,'B':466.16,'d':587.33,'a':220.}
kn=[(1.6,'D',.5),(3.9,'A',.4),(6.3,'F',.35),(7.6,'D',.3),
    (17.1,'d',.5),(17.7,'A',.45),(18.2,'F',.4),(18.8,'D',.4),(19.9,'E',.3),
    (22.2,'D',.3),(23.6,'A',.28),(25.2,'F',.3),(26.9,'D',.3),(28.6,'E',.28),(30.1,'A',.3),(32.0,'F',.3),(33.3,'D',.3),
    (38.0,'D',.4),(39.4,'A',.35),(40.9,'F',.33),(43.0,'E',.3),(44.0,'D',.3),(51.0,'d',.5),(51.6,'A',.45),(52.4,'F',.4),(53.4,'D',.4),(54.6,'A',.35),(55.8,'D',.3)]
for tt,n,g in kn: add(ks(hz[n],3.4),tt,float(rng.uniform(-.3,.3)),g)
def swish(t0,d,g):
    n=int(d*SR);x=rng.normal(size=n);x=np.convolve(x,np.ones(25)/25,'same')*np.sin(np.linspace(0,np.pi,n))**2*g;add(x,t0,0)
swish(1.6,1.8,.05);swish(16.6,2.0,.06)
n=int(1.3*SR);x=rng.normal(size=n);x=np.convolve(x,np.ones(30)/30,'same')*np.linspace(0,1,n)**2*.12;add(x,15.7,0)
tn=np.arange(int(3.5*SR))/SR
bell=sum(a*np.sin(2*np.pi*f*tn)*np.exp(-tn*dk) for f,a,dk in [(880,1,1.2),(1320,.6,1.6),(2210,.4,2.5),(3100,.2,3.5)]);add(bell*.22,17.05,.15)
tn=np.arange(int(1.6*SR))/SR;add(np.sin(2*np.pi*(55-18*tn)*tn)*np.exp(-tn*4)*.8,17.05)
# cuts: only a soft paper swish, no thumps
for s_ in [24.9,31.6,37.2,42.3,50.4]:
    n=int(1.1*SR);x=rng.normal(size=n);k=np.convolve(x,np.ones(60)/60,'same')*np.sin(np.linspace(0,np.pi,n))**2*.05;add(k,s_-.55,0)
# storm: thunder at lightning (35.9) + crack
n=int(2.6*SR);x=rng.normal(size=n);x=np.convolve(x,np.ones(300)/300,'same')*9;x*=np.exp(-np.linspace(0,1,n)*2.6)*np.minimum(1,np.linspace(0,14,n))*.45;add(x,35.9,0)
tn=np.arange(int(.4*SR))/SR;add(rng.normal(size=len(tn))*np.exp(-tn*14)*.3,35.9)
# rain hiss over 'rain sun soil' & farming water
n=int(1.8*SR);x=rng.normal(size=n);x=np.convolve(x,np.ones(4)/4,'same')*np.sin(np.linspace(0,np.pi,n))*.03;add(x,29.8,0)
# cave: dark drone swell 'went dark' then party rhythm
n=int(1.8*SR);tn=np.arange(n)/SR;add(np.sin(2*np.pi*48*tn)*np.sin(np.linspace(0,np.pi,n))*.5,45.8)
for k in np.arange(47.6,50.4,0.4):
    tn=np.arange(int(.2*SR))/SR;add(np.sin(2*np.pi*(120-60*tn)*tn)*np.exp(-tn*15)*.5,float(k))
for k in np.arange(47.8,50.4,0.8):
    nn=int(.1*SR);x=rng.normal(size=nn)*np.exp(-np.arange(nn)/SR*40);x=np.convolve(x,[1,-1])[:nn];add(x*.5,float(k))
# sunrise bell + pad
tn=np.arange(int(4*SR))/SR
b2=sum(a_*np.sin(2*np.pi*f*tn)*np.exp(-tn*dk) for f,a_,dk in [(587,1,1.0),(880,.6,1.4),(1760,.3,2.2)]);add(b2*.2,50.4,-.1)
gx=np.clip((t-50.4)/2.0,0,1)*np.clip((DUR-1.0-t)/3.0,0,1)
pad=(np.sin(2*np.pi*146.83*t)+.6*np.sin(2*np.pi*220*t)+.4*np.sin(2*np.pi*293.66*t))*gx*.05
L+=pad;R+=pad
for s_ in [24.9,31.6,37.2,42.3,50.4]:
    add(ks(hz['A'],2.8),s_-0.55,0.1,.35);add(ks(hz['d'],2.8),s_-0.15,-0.1,.3)
tn=np.arange(int(3.0*SR))/SR
ting=sum(a_*np.sin(2*np.pi*f*tn)*np.exp(-tn*dk) for f,a_,dk in [(1174.7,1,1.6),(1760,.5,2.2),(2349,.3,3)]);add(ting*.25,47.35,0)
n=int(2.0*SR);x=rng.normal(size=n);x=np.convolve(x,np.ones(20)/20,'same')*np.linspace(0,1,n)**2*.08;add(x,47.4,0)
m=max(abs(L).max(),abs(R).max());L/=m;R/=m
d=(np.stack([L,R],1)*.85*32767).astype('<i2')
wv=wave.open('music.wav','wb');wv.setnchannels(2);wv.setsampwidth(2);wv.setframerate(SR);wv.writeframes(d.tobytes());wv.close()
