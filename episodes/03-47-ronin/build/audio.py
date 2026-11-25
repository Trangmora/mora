"""Nhạc nền có cao trào: mỗi phần một bài, có điểm lên (tiêu đề, khoảng ngắt), điểm xuống (đoạn buồn), chỗ ngắt lặng trước các phần mới."""
import numpy as np,wave,json,sys
lang=sys.argv[1];vo=sys.argv[2];SR=44100;DELAY=4.6
TL=json.load(open(f'r/timeline_{lang}.json'));G=TL['G'];SC=TL['scenes'];DUR=TL['END'];N=int(DUR*SR);t=np.arange(N)/SR
TJ=json.load(open(vo.replace('vo_vi_f.wav','T_vi.json').replace('vo_en_f.wav','T_en.json')))['T'];TEMPO=float(sys.argv[3]) if len(sys.argv)>3 else 1.07
E=lambda k:DELAY+TJ[k+'_end']/TEMPO
def rd(f):
    w=wave.open(f);x=np.frombuffer(w.readframes(w.getnframes()),'<i2').astype(np.float32)/32768;return x.reshape(-1,w.getnchannels())
v=rd(vo)[:,0];V=np.zeros(N,np.float32);i0=int(DELAY*SR);n=min(len(v),N-i0);V[i0:i0+n]=v[:n]
# (bài, bắt đầu, kết thúc, vị trí trong bài)
secs=[('Imperial_Forces',0,G['s1']-.8,2),          # đêm tuyết: dạo nhẹ, bùng lên ở tiêu đề
      ('Hammersion',G['s1']-.8,G['s7']-.8,8),            # nhát kiếm trong lâu đài: trống dồn
      ('Hon_Kyoku',G['s7']-.8,G['s11']-.8,0),            # kế hoạch trong bóng tối: sáo, bí ẩn
      ('Imperial_Forces',G['s11']-.8,G['s14']-.8,80),    # đêm tuyết tấn công: cao trào
      ('Yearning',G['s14']-.8,DUR,22)]                  # cái giá và kết: trầm, dâng lên ở cuối
xf=1.2;bed=np.zeros((N,2),np.float32)
for name,a,b,off in secs:
    x=rd(f'mus/{name}.wav');x=x*(0.158/np.sqrt((x**2).mean()))  # chuẩn hóa -16 dBFS
    A=max(0,int((a-xf)*SR));B=min(N,int((b+xf)*SR));st=int(max(0,off-(a-xf-A/SR))*SR);src=x[int(off*SR)-(int(a*SR)-A) if int(off*SR)>=(int(a*SR)-A) else 0:][:B-A]
    if len(src)<B-A: src=np.concatenate([src,np.zeros((B-A-len(src),2),np.float32)])
    tt=t[A:B];f=np.clip((tt-(a-xf))/xf,0,1)*np.clip(((b+xf)-tt)/xf,0,1)
    if a<=0: f=np.clip((b+xf-tt)/xf,0,1)
    if b>=DUR-.01: f=np.clip((tt-(a-xf))/xf,0,1)
    bed[A:B]+=src*f[:,None]
# mức nhạc: dưới giọng đọc thấp, khoảng trống cao; mỗi đoạn có mức riêng
win=int(.05*SR);rms=np.sqrt(np.convolve(V**2,np.ones(win)/win,'same'))
speak=np.convolve((rms>0.02).astype(np.float32),np.ones(2*int(.4*SR)+1),'same')>0
under=np.full(N,0.18,np.float32);gap=np.full(N,0.85,np.float32)
def zone(a,b,u=None,g=None):
    m=(t>=a)&(t<b)
    if u is not None: under[m]=u
    if g is not None: gap[m]=g
zone(G["s1"]-.8,G["s7"]-.8,u=.20,g=.9)
zone(G["s7"]-.8,G["s11"]-.8,u=.16,g=.7)
zone(G["s11"]-.8,G["s14"]-.8,u=.22,g=1.0)
zone(G["s14"]-.8,DUR,u=.15,g=.7)
target=np.where(speak,under,gap)
tit=E('op3');target=np.where((t>tit-.2)&(t<G['s1']-.4),0.95,target)   # bùng lên ở tiêu đề
target=np.where((t>G['end']+.2),np.maximum(target,0.6),target)          # dâng lên ở tiêu đề tập sau
# ngắt lặng ngắn trước các phần mới (tạo nhịp "ngắt – vào")
for k,d in [('s1',.55),('s7',.5),('s11',.6),('s14',.6)]:
    target=np.where((t>G[k]-.3-d)&(t<G[k]-.3),0.0,target)
g=np.zeros(N,np.float32);cur=0.;au=1/(0.35*SR);ad=1/(0.25*SR)
for i in range(0,N,64):
    tg=target[i];cur+=(min(au*64,tg-cur) if tg>cur else max(-ad*64,tg-cur));g[i:i+64]=cur
env=np.minimum(1,t/1.0)*np.minimum(1,(DUR-t)/4)
bed=bed*(g*env)[:,None]
# hiệu ứng: tiếng xé giấy, tiếng trống lớn ở các điểm vào phần mới
rng=np.random.default_rng(3);S=np.zeros(N,np.float32)
def add(x,t0,gain=1.):
    i=int(t0*SR)
    if 0<=i<N: m=min(len(x),N-i);S[i:i+m]+=x[:m]*gain
for s in SC:
    if s['tr']=='tear':
        n=int(1.2*SR);x=rng.normal(size=n)*.5;cl=(rng.random(n)<.004)*rng.normal(size=n)*3;x=np.convolve(x+cl,[1,-.6],'same')*np.sin(np.linspace(0,np.pi,n))**1.5*.09;add(x.astype(np.float32),s['s']-.85)
tn=np.arange(int(1.8*SR))/SR;boom=(np.sin(2*np.pi*(58-20*tn)*tn)*np.exp(-tn*3.5)+.3*np.random.default_rng(1).normal(size=len(tn))*np.exp(-tn*30)).astype(np.float32)
add(boom,tit,1.0)
for k in ['s3','s11','end']: add(boom,G[k]-.3,.7)
out=bed+(V*1.5+S*0.45)[:,None]
w=wave.open(f'mix_{lang}.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(out,-1,1)*32767).astype('<i2').tobytes());w.close()
print('ok',round(DUR,1))
