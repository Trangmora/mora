import numpy as np,wave,json,subprocess
SR=44100;K=json.load(open('K.json'));END=2.5+K['wdis']+6.64+2.2;N=int(END*SR);t=np.arange(N)/SR
def rd(f):
    w=wave.open(f);x=np.frombuffer(w.readframes(w.getnframes()),'<i2').astype(np.float32)/32768;return x.reshape(-1,w.getnchannels())
v=rd('vo/vo_vi.wav')[:,0];V=np.zeros(N,np.float32);i0=int(2.5*SR);n=min(len(v),N-i0);V[i0:i0+n]=v[:n]
m=rd('../samurai/mus/Hammersion.wav');m=m*(0.158/np.sqrt((m**2).mean()));m=m[int(4*SR):int(4*SR)+N]
rms=np.sqrt(np.convolve(V**2,np.ones(2205)/2205,'same'));sp=np.convolve((rms>0.02).astype(np.float32),np.ones(2*int(.4*SR)+1),'same')>0
tg=np.where(sp,0.13,0.5).astype(np.float32);g=np.zeros(N,np.float32);c=0.
for i in range(0,N,64):
    d=tg[i]-c;c+=max(-64/(0.3*SR),min(64/(0.4*SR),d));g[i:i+64]=c
env=np.minimum(1,t/1.0)*np.minimum(1,(END-t)/2.0)
out=m*(g*env)[:,None]+(V*1.5)[:,None]
w=wave.open('mix.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(out,-1,1)*32767).astype('<i2').tobytes());w.close();print('ok',END)
