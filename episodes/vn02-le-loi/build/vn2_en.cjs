const { chromium } = require('/opt/node22/lib/node_modules/playwright');const path=require('path');const fs=require('fs');const {spawn}=require('child_process');
const LANG=process.argv[2]||'vi';const STILLS=process.argv.slice(3).map(Number);
const FPS=24,TEMPO=+(process.env.TEMPO||1.07),DELAY=4.6;const VI=LANG==='vi';
const TJ=JSON.parse(fs.readFileSync(`../${process.env.VODIR||(VI?'vo':'vo_en')}/T_${LANG}.json`,'utf8')).T;
const G=id=>DELAY+TJ[id]/TEMPO,E=id=>DELAY+TJ[id+'_end']/TEMPO;const L=(en,vi)=>VI?vi:en;
const FONT="'Be Vietnam Pro'";const lab=(t0,t1,parts,x=40,y=28)=>({t0,t1,x,y,parts,size:26,font:FONT,seal:'越'});
const cap=s=>`600 ${s}px 'Be Vietnam Pro'`;
const P=(...a)=>a.map(x=>typeof x==='string'?{t:x}:{t:x[0],hl:1});
const b={z0:1.04,z1:1.10};const reg=(c,r,o={})=>Object.assign({c,r},o);
const END=E('endS')+5.0;
const PI=[1.0,1.13,.5,.5,.5,.5],PO=[1.16,1.02,.5,.5,.5,.5],PR=[1.16,1.16,.40,.5,.60,.5],PL=[1.16,1.16,.60,.5,.40,.5],TU=[1.16,1.16,.5,.62,.5,.40];
const sh=[
 {clip:'v1',s:0,c:[1.0,1.15,.5,.55,.42,.58],fadeIn:2.0},
 {k:'v2',s:G('op2')-.3,o:{z0:1.05,z1:1.4,f0:[.5,.5],f1:[.52,.45],flash:[3.6,3.9]},tr:'cross',lab:[lab(3.8,7.2,P(['THUẬN THIÊN'],' · THE WILL OF HEAVEN'))]},
 {clip:'v1',s:G('op3')-.3,c:[1.3,1.42,.45,.6,.5,.58],tr:'cross',title:{at:E('op3')+0.1-(G('op3')-.3),k:'黎利',l1:'LÊ LỢI',l2:'VIETNAM · THE LEGEND OF THE MAGIC SWORD',font1:cap(54),font2:cap(24)}},
 {k:'v3',s:G('s1')-.3,o:{z0:1.18,z1:1.18,f0:[.36,.5],f1:[.64,.5]},tr:'tear',lab:[lab(.6,4.2,P(['1407'],' · MING CHINA RULES VIETNAM'))]},
 {k:'v4',s:G('s2')-.3,o:{z0:1.03,z1:1.14,f0:[.5,.5],f1:[.6,.48]},alt:[.69,.36,1.75,.69,.33],tr:'cross',lab:[lab(.6,4.2,P(['LÊ LỢI'],' · LAM SƠN, VIETNAM'))]},
 {clip:'v5',s:G('s3')-.3,c:PI,tr:'cross',lab:[lab(.5,4.5,P(['1416'],' · THE OATH'))]},
 {clip:'v1',s:G('s4')-.3,c:[1.5,1.6,.42,.62,.46,.6],tr:'tear',lab:[lab(.6,3.8,P(['LÊ THẬN']))]},
 {k:'v2',s:G('s4b')-.25,o:{z0:1.9,z1:2.2,f0:[.52,.5],f1:[.55,.44],flash:[2.2,2.5]},tr:'cross'},
 {k:'v7',s:G('s5')-.3,o:{z0:1.05,z1:1.55,f0:[.5,.5],f1:[.5,.28]},tr:'cross',lab:[lab(.6,4.2,P(['THE HILT'],' IN THE BANYAN TREE'))]},
 {k:'v8',s:G('s6')-.3,o:{z0:1.1,z1:1.32,f0:[.5,.5],f1:[.5,.36],flash:[1.9,2.2]},tr:'cross'},
 {k:'v9',s:G('s7')-.3,o:{z0:1.15,z1:1.15,f0:[.62,.5],f1:[.4,.5]},tr:'tear',lab:[lab(2.6,6.6,P(['1418'],' · THE LAM SƠN UPRISING'))]},
 {k:'v9',s:G('s8')-.3,o:{z0:1.55,z1:1.7,f0:[.6,.64],f1:[.36,.5]},tr:'cross',lab:[lab(.6,4,P(['CHÍ LINH MOUNTAIN']))]},
 {k:'v10',s:G('s9')-.3,o:{z0:1.03,z1:1.14,f0:[.5,.5],f1:[.55,.5]},alt:[.56,.52,1.7,.6,.5],tr:'cross',lab:[lab(.6,4.5,P(['LÊ LAI'],' SAVES HIS LEADER'))]},
 {k:'v10',s:G('s10')-.3,o:{z0:1.9,z1:2.05,f0:[.2,.6],f1:[.18,.58]},tr:'cross'},
 {clip:'v5',s:G('s10b')-.3,c:[1.5,1.7,.5,.5,.5,.46],alt:[1.02,1.12,.5,.5,.5,.5],tr:'cross',lab:[lab(1.2,6.4,P(['LÊ LAI'],' IS HONORED FIRST'))],lab2:[lab(.4,4.6,P('THEN ',['LÊ LỢI']))]},
 {k:'v8',s:G('s13')-.3,o:{z0:1.12,z1:1.12,f0:[.4,.5],f1:[.6,.5]},tr:'tear',lab:[lab(.5,4.2,P(['1424'],' · THE MARCH SOUTH'))]},
 {k:'v12',s:G('s14')-.3,o:{z0:1.16,z1:1.16,f0:[.5,.4],f1:[.5,.6],flash:[.6,.9]},alt:[.3,.78,1.6,.34,.8],tr:'cross',lab:[lab(.6,4.6,P(['1427'],' · CHI LĂNG PASS'))],lab2:[lab(.5,4.2,P('100,000 ',['RELIEF TROOPS DEFEATED']))]},
 {k:'v13',s:G('s15')-.3,o:{z0:1.2,z1:1.2,f0:[.3,.55],f1:[.6,.55]},alt:[.62,.6,1.6,.66,.6],tr:'cross',lab:[lab(2,6,P('NO REVENGE · ',['SHIPS AND HORSES HOME']))]},
 {k:'v14',s:G('s16')-.3,o:{z0:1.03,z1:1.15,f0:[.5,.5],f1:[.5,.42]},alt:[.5,.62,1.8,.5,.58],tr:'tear',lab:[lab(.5,4,P(['1428'],' · KING LÊ THÁI TỔ'))],lab2:[lab(.4,4.4,P(['THE GREAT PROCLAMATION']))]},
 {clip:'v15',s:G('s17')-.3,c:[1.0,1.18,.5,.5,.5,.6],alt:[1.7,1.95,.5,.7,.56,.72],tr:'cross',lab:[lab(.6,4.5,P(['THĂNG LONG'],' · TODAY HANOI'))],lab2:[lab(3.6,7.8,P(['HOÀN KIẾM'],' · LAKE OF THE RETURNED SWORD'))]},
 {clip:'v16',s:G('s19')-.3,c:[1.16,1.02,.5,.5,.5,.5],alt:[1.7,1.85,.42,.78,.45,.8],tr:'tear',lab:[lab(2.6,5.4,P(['THE LAKE TURTLE'],' · ALMOST 200 KG'))],lab2:[lab(.5,4.6,P(['2016'],' · NGỌC SƠN TEMPLE, HANOI'))]},
 {clip:'v16',s:G('endS')-.3,c:[1.1,1.0,.5,.46,.5,.46],fadeOut:2.0,tr:'cross',title:{at:.6,k:'白藤',l1:'NEXT',l2:'THE BATTLE OF BẠCH ĐẰNG',font1:cap(46),font2:cap(30)}},
];
for(let i=0;i<sh.length;i++)sh[i].e=i<sh.length-1?sh[i+1].s:END;
// split: long stills with alt focus -> 2 shots; clips -> clip (<=5.3s) + still zoom; clipAfter -> still then clip
const sc=[];const sub=(l,m)=>(l||[]).filter(x=>x.t0>=m).map(x=>({...x,t0:x.t0-m,t1:x.t1-m}));
for(const s of sh){const d=s.e-s.s;
 if(s.clip){const n=fs.readdirSync('cf_'+s.clip).length;const sp=Math.max(.45,Math.min(1,(n/FPS)/d));
  if(s.alt&&d>7.2){const m=d*.52;sc.push({...s,e:s.s+m,sp,off:0});sc.push({clip:s.clip,s:s.s+m,e:s.e,tr:'cross',c:s.alt,sp,off:m*sp*FPS,lab:s.lab2||[],fadeOut:s.fadeOut});continue}
  sc.push({...s,sp,off:0,lab:[...(s.lab||[]),...(s.lab2||[])]});continue}
 if(s.alt&&d>7.2){const m=d*.52;sc.push({...s,e:s.s+m});const a=s.alt;sc.push({k:s.k,s:s.s+m,e:s.e,tr:'cross',o:{...s.o,z0:a[2],z1:a[2]+.08,f0:[a[0],a[1]],f1:[a[3]??a[0],a[4]??a[1]],flash:undefined},lab:s.lab2||[]});continue}
 sc.push({...s,lab:[...(s.lab||[]),...(s.lab2||[])]})}
const tl={lang:LANG,END,G:Object.fromEntries(Object.keys(TJ).filter(k=>!k.endsWith('_end')).map(k=>[k,G(k)])),scenes:sc.map((s,i)=>({i,pg:s.clip?'clip_'+s.clip:s.k,s:s.s,e:s.e,tr:s.tr||null}))};
fs.writeFileSync(`timeline_${LANG}.json`,JSON.stringify(tl,null,1));
const trOf=i=>{if(i===0)return null;const s=sc[i];if(!s.tr||s.tr==='cut')return null;return s.tr==='tear'?{type:'tear',hw:.85}:{type:'cross',hw:.35}};
const keys=[...new Set(sc.filter(s=>!s.clip).map(s=>s.k))];const ease=x=>x<=0?0:x>=1?1:x*x*(3-2*x);
const CL={};for(const s of sc)if(s.clip&&!CL[s.clip])CL[s.clip]=fs.readdirSync('cf_'+s.clip).sort().map(f=>`cf_${s.clip}/${f}`);const CP=[];
(async()=>{const br=await chromium.launch({args:['--use-angle=swiftshader','--use-gl=angle','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const PG={};for(const k of keys){const p=await br.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>console.log('ERR',k,e.message));await p.goto('file://'+path.resolve(`pf_${k}.html`));await p.evaluate(()=>window.ready);PG[k]=p}
 const comp=await br.newPage({viewport:{width:1280,height:720}});comp.on('pageerror',e=>console.log('ERR comp',e.message));await comp.goto('file://'+path.resolve('comp5.html'));await comp.evaluate(()=>loadSp({}));const KP=await br.newPage({viewport:{width:1280,height:720}});await KP.goto('file://'+path.resolve('comp5.html'));await KP.evaluate(()=>loadSp({}));
 const idxOf=t=>{for(let i=sc.length-1;i>=0;i--)if(t>=sc[i].s)return i;return 0};
 const buf=async(i,t)=>{const s=sc[i];const lt=Math.max(0,t-s.s);
  if(s.clip){const fr=CL[s.clip];const n=fr.length;const pos=s.off+lt*s.sp*FPS;const per=2*(n-1);const ix=q=>{q=((q%per)+per)%per;return q>=n?per-q:q};const q0=Math.floor(pos),f=pos-q0;
   const d=s.e-s.s,k=ease(lt/d),c=s.c;const cam=[c[0]+(c[1]-c[0])*k,c[2]+(c[4]-c[2])*k,c[3]+(c[5]-c[3])*k];
   let dk=0;if(s.fadeIn)dk=Math.max(dk,1-Math.min(1,lt/s.fadeIn));if(s.fadeOut)dk=Math.max(dk,1-Math.min(1,Math.max(0,(d-lt)/s.fadeOut)));
   await KP.evaluate(([a,b,f,cam,dk])=>kb(a,b,f,cam,dk),[fs.readFileSync(fr[ix(q0)]).toString('base64'),f>0.02?fs.readFileSync(fr[ix(q0+1)]).toString('base64'):null,f,cam,dk]);return await KP.screenshot({type:'jpeg',quality:92})}
  const o=Object.assign({dur:s.e-s.s},s.o);await PG[s.k].evaluate(([t,o])=>draw(t,o),[lt,o]);return await PG[s.k].screenshot({type:'jpeg',quality:92})};
 const frame=async t=>{let i=idxOf(t);let tri=null;
  if(i+1<sc.length){const tr=trOf(i+1);if(tr&&sc[i+1].s-t<tr.hw)tri={k:i+1,tr}}
  if(!tri){const tr=trOf(i);if(tr&&t-sc[i].s<tr.hw)tri={k:i,tr}}
  if(tri){const {k,tr}=tri;const p=(t-(sc[k].s-tr.hw))/(2*tr.hw);const A=(await buf(k-1,t)).toString('base64'),B=(await buf(k,t)).toString('base64');
   if(tr.type==='tear')await comp.evaluate(([a,b,p])=>tear(a,b,p),[A,B,p]);else await comp.evaluate(([a,b,p])=>cross(a,b,p),[A,B,p]);i=p<.5?k-1:k}
  else await comp.evaluate(a=>single(a),(await buf(i,t)).toString('base64'));
  const s=sc[i];await comp.evaluate(([l,t])=>labels(l,t),[s.lab||[],t-s.s]);
  if(s.title&&t-s.s>=s.title.at)await comp.evaluate(([sp,t])=>title(sp,t),[{...s.title,d:s.e-s.s-s.title.at+(s===sc[sc.length-1]?-1.2:0)},t-s.s-s.title.at]);
  return await comp.screenshot({type:'jpeg',quality:92})};
 if(STILLS.length){for(const t of STILLS)fs.writeFileSync(`st_${LANG}_${t}.jpg`,await frame(t));await br.close();return}
 const out=process.env.OUT||`video_${LANG}.mp4`;const ff=spawn('ffmpeg',['-y','-f','image2pipe','-framerate','24','-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18',out],{stdio:['pipe','ignore','ignore']});
 const N=Math.round(END*FPS);const F0=+(process.env.F0||0),F1=Math.min(N,+(process.env.F1||N));for(let f=F0;f<F1;f++){const bb=await frame(f/FPS);if(!ff.stdin.write(bb))await new Promise(r=>ff.stdin.once('drain',r));if(f%240===0)console.log(LANG,'frame',f,'/',F1)}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await br.close();console.log('done',LANG)})();
