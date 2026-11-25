const { chromium } = require('/opt/node22/lib/node_modules/playwright');const path=require('path');const fs=require('fs');const {spawn}=require('child_process');
const LANG=process.argv[2]||'vi';const STILLS=process.argv.slice(3).map(Number);
const FPS=24,TEMPO=+(process.env.TEMPO||1.07),DELAY=4.6;const VI=LANG==='vi';
const TJ=JSON.parse(fs.readFileSync(`../vo${VI?'':'_en'}/T_${LANG}.json`,'utf8')).T;
const G=id=>DELAY+TJ[id]/TEMPO,E=id=>DELAY+TJ[id+'_end']/TEMPO;const L=(en,vi)=>VI?vi:en;
const FONT=VI?"'Be Vietnam Pro'":'Lora';const lab=(t0,t1,parts,x=40,y=28)=>({t0,t1,x,y,parts,size:26,font:FONT});
const cap=s=>VI?`600 ${s}px 'Be Vietnam Pro'`:`600 ${s}px Lora`;
const P=(...a)=>a.map(x=>typeof x==='string'?{t:x}:{t:x[0],hl:1});
const b={z0:1.04,z1:1.10};const reg=(c,r,o={})=>Object.assign({c,r},o);
const END=E('end')+6.5;
const PI=[1.0,1.13,.5,.5,.5,.5],PO=[1.16,1.02,.5,.5,.5,.5],PR=[1.16,1.16,.40,.5,.60,.5],PL=[1.16,1.16,.60,.5,.40,.5],TU=[1.16,1.16,.5,.62,.5,.40];
const sh=[
 {clip:'o0',s:0,c:[1.0,1.15,.5,.58,.56,.5],fadeIn:1.8},
 {clip:'a1',s:G('op2')-.3,c:PR,tr:'cross',lab:[lab(1.0,4.5,P(L('TWO SWORDS · ','HAI THANH KIẾM · '),[L('POETRY · TEA','THƠ · TRÀ')]))]},
 {clip:'o0',s:G('op3')-.3,c:[1.3,1.42,.6,.45,.64,.42],tr:'cross',title:{at:E('op3')+0.1-(G('op3')-.3),k:'侍',l1:'SAMURAI',l2:L('“THOSE WHO SERVE”','“NGƯỜI HẦU CẬN”'),font1:cap(54),font2:cap(28)}},
 {k:'b1',s:G('s1')-.3,o:{z0:1.22,z1:1.22,f0:[.30,.5],f1:[.70,.5]},tr:'tear',lab:[lab(.6,3.6,P(L('10TH ','THẾ KỶ '),[L('CENTURY','THỨ 10')]))]},
 {clip:'b2',s:G('s2')-.3,c:PI,tr:'cross',lab:[lab(.6,4,P(L('HORSE · ','CƯỠI NGỰA · '),[L('BOW','BẮN CUNG')]))]},
 {k:'b3',s:G('s3')-.3,o:{z0:1.04,z1:1.18,f0:[.45,.5],f1:[.55,.45],regs:[reg([.35,.62],[.25,.3],{bob:[.006,.9,0],bobabs:1}),reg([.75,.75],[.2,.2],{shear:[.006,.5,0]})]},alt:[.62,.32,1.7,.5,.3],tr:'cross',lab:[],lab2:[lab(.4,4.5,P(L('THE FIRST WEAPON: ','VŨ KHÍ ĐẦU TIÊN: '),[L('THE BOW','CÂY CUNG')]))]},
 {clip:'c1',s:G('s4')-.3,c:PL,tr:'tear'},
 {clip:'c2',s:G('s5')-.3,c:PO,tr:'cross',lab:[lab(1.2,5,[{t:'TAIRA',hl:1},{t:L(' VS ',' ĐẤU ')},{t:'MINAMOTO'}])]},
 {k:'c3',s:G('s5b')-.3,o:{z0:1.12,z1:1.26,f0:[.38,.6],f1:[.56,.5],flash:[2.2,2.6],regs:[reg([.5,.85],[.6,.18],{shear:[.008,.4,0]}),reg([.3,.6],[.2,.15],{bob:[.008,.5,0]}),reg([.7,.55],[.2,.15],{bob:[.008,.45,2]})]},tr:'cross',lab:[lab(.8,4.5,P(['1185'],' · DAN-NO-URA'))]},
 {clip:'c4',s:G('s6')-.3,c:[1.0,1.18,.5,.55,.5,.42],alt:[1.7,1.85,.5,.3,.5,.22],tr:'cross',lab:[lab(.8,4,P(L('GENERAL · ','TƯỚNG QUÂN · '),['SHŌGUN']))],lab2:[lab(.6,3.5,P(L('THE EMPEROR','THIÊN HOÀNG')))]},
 {k:'d1',s:G('s7')-.3,o:{z0:1.2,z1:1.2,f0:[.32,.6],f1:[.62,.45],flash:[1.4,1.7]},alt:[.66,.28,1.6,.6,.33],tr:'tear',lab:[lab(1.6,5.5,P(L('WARRING ','THỜI '),[L('STATES','CHIẾN QUỐC')]))]},
 {clip:'d2',s:G('s8')-.3,c:PR,tr:'cross',lab:[lab(.6,4.5,P(['1603'],' · TOKUGAWA'))]},
 {clip:'d3',s:G('s9')-.3,c:[1.0,1.15,.5,.5,.52,.42],tr:'cross',lab:[lab(3,6.3,P(L('PAID IN ','LƯƠNG BẰNG '),[L('RICE','GẠO')]))]},
 {clip:'d4',s:G('s10')-.3,c:PO,alt:[1.75,1.9,.52,.62,.52,.6],tr:'cross',lab:[lab(.8,4.5,P(L('ONE LONG · ','MỘT DÀI · '),[L('ONE SHORT','MỘT NGẮN')]))]},
 {k:'e1',s:G('s11')-.3,o:{z0:1.06,z1:1.22,f0:[.62,.52],f1:[.46,.46],regs:[reg([.45,.6],[.3,.3],{bob:[.007,.8,0],bobabs:1}),reg([.3,.2],[.2,.15],{shear:[.01,.3,0]})]},alt:[.5,.33,1.6,.44,.38],tr:'tear',lab:[],lab2:[lab(.6,4.5,P(['TOMOE GOZEN']))]},
 {clip:'e2',s:G('s12')-.3,c:PL,alt:[1.7,1.8,.25,.36,.27,.32],tr:'cross',lab:[lab(.6,3.5,P(['1581']))],lab2:[lab(.3,3.8,P(['YASUKE']))]},
 {k:'e3',s:G('s13')-.3,o:{z0:1.18,z1:1.18,f0:[.36,.5],f1:[.64,.5],regs:[reg([.5,.4],[.5,.12],{shear:[.005,.3,0]})]},tr:'cross',lab:[lab(.5,3.6,P(['MIYAMOTO MUSASHI'])),lab(3.9,7.5,P(L('60+ DUELS · ','60+ TRẬN · '),[L('0 LOSSES','0 THUA')]))]},
 {clip:'e4',s:G('s14')-.3,c:[1.0,1.2,.5,.5,.45,.55],tr:'cross',lab:[lab(.8,4.5,P(['KATANA']))]},
 {clip:'e5',s:G('s15')-.3,c:PO,alt:[1.16,1.16,.38,.5,.62,.5],tr:'tear',lab:[lab(.6,4.0,P(['RŌNIN']))],lab2:[lab(.4,4.5,P(['47 RŌNIN · '],['1703']))]},
 {clip:'e6',s:G('s16')-.3,c:TU,tr:'cross',lab:[lab(.6,3.8,P(L('A LESSON IN ','BÀI HỌC VỀ '),[L('LOYALTY','LÒNG TRUNG THÀNH')]))]},
 {k:'f1',s:G('s17')-.3,o:{z0:1.2,z1:1.2,f0:[.66,.5],f1:[.40,.5]},alt:[.32,.42,1.6,.3,.5],tr:'tear',lab:[lab(2,6,P(['1876'],L(' · SWORDS BANNED',' · CẤM MANG KIẾM')))]},
 {k:'f2',s:G('s18')-.3,o:{z0:1.04,z1:1.22,f0:[.5,.5],f1:[.42,.42],flash:[1.0,1.3],regs:[reg([.45,.55],[.3,.3],{bob:[.006,1.1,0],bobabs:1})]},alt:[.6,.6,1.5,.75,.55],tr:'cross',lab:[lab(.6,4.5,P(['1877'],' · SAIGŌ TAKAMORI'))]},
 {k:'g1',s:G('s19')-.3,o:{z0:1.04,z1:1.18,f0:[.5,.5],f1:[.5,.45]},tr:'tear',lab:[lab(2.8,6.5,P(['KENDO']))]},
 {clip:'g2',s:G('s20')-.3,c:PO,fadeOut:2.0,tr:'cross',title:{at:G('end')+.4-(G('s20')-.3),k:'茶道',l1:L('NEXT','TẬP SAU'),l2:L('THE JAPANESE TEA CEREMONY','TRÀ ĐẠO NHẬT BẢN'),font1:cap(44),font2:cap(30)}},
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
