const { chromium } = require('/opt/node22/lib/node_modules/playwright'); const path=require('path'); const fs=require('fs'); const {spawn}=require('child_process');
const LANG=process.argv[2]||'en';const STILLS=process.argv.slice(3).map(Number);
const FPS=24,TEMPO=0.9,DELAY=1.3;
const T=JSON.parse(fs.readFileSync(`T_${LANG}.json`,'utf8'));const G=id=>DELAY+T[id]/TEMPO;
const reg=(c,r,o={})=>Object.assign({c,r},o);
eval(fs.readFileSync('regs.js','utf8'));
const VI=LANG==='vi';const FONT=VI?"'Be Vietnam Pro'":'Lora';
const lab=(t0,t1,parts,x=40,y=28)=>({t0,t1,x,y,parts,size:26,font:FONT});
const L=(en,vi)=>VI?vi:en;
// ---------- opening ink ----------
const capFont=s=>VI?`600 ${s}px 'Be Vietnam Pro'`:`600 ${s}px Lora`;
const OPEND=G('s1')-0.4;
const opInk=[
 {id:'k1',text:'八百万の神',font:"700 150px NSJP101,NSJP111,NSJP113,NSJP119",color:'#a8161d',x:150,y:290,t0:G('op1')+0.4,t1:G('op5')-0.2,reveal:1.8,by0:130,by1:330},
 {id:'e1',text:L('EIGHT MILLION GODS','TÁM TRIỆU VỊ THẦN'),font:capFont(34),color:'#2b2622',x:156,y:352,t0:G('op1')+1.9,t1:G('op5')-0.5,fadein:1.0,spacing:'7px'},
 {id:'k2',text:'神道',font:"700 210px NSJP113,NSJP114",color:'#a8161d',x:640,y:330,align:'center',t0:G('op8')-0.3,reveal:2.0,by0:130,by1:380},
 {id:'e2',text:L('SHINTO','THẦN ĐẠO'),font:capFont(50),color:'#2b2622',x:640,y:420,align:'center',t0:G('op8')+1.0,fadein:1.2,spacing:'22px'},
 {id:'e3',text:L('THE WAY OF THE KAMI','CON ĐƯỜNG CỦA CÁC VỊ THẦN'),font:capFont(30),color:'#6b1216',x:640,y:480,align:'center',t0:G('op9')+1.4,fadein:1.0,spacing:'12px'}];
const ENDS=G('s18')-0.3,END=G('end')+4.5;
const endInk=[{id:'z1',text:'神道',font:"700 210px NSJP113,NSJP114",color:'#a8161d',x:640,y:330,align:'center',t0:1.2,reveal:2.2,by0:130,by1:380},
 {id:'z2',text:L('NEXT: WHEN BUDDHISM ARRIVED','TẬP SAU: KHI PHẬT GIÁO ĐẾN'),font:capFont(30),color:'#2b2622',x:640,y:430,align:'center',t0:(G('end')-ENDS)-6,fadein:1.2,spacing:'10px'}];
// ---------- scenes ----------
const base={z0:1.05,z1:1.09,f0:[.5,.5]};
const mid=(a,b,f)=>a+(b-a)*f;
const s2a=G('s2'),s2b=mid(G('s2'),G('s3'),.42);
const sc=[
 {pg:'op',s:0,o:{z0:1.07,z1:1.26,y0:-.03,y1:.03,f0:[.5,.55],depth:.5,punch:0,nodust:1,ink:opInk,vig:1,fadeIn:1.2,fadeOut:1.4}},
 {pg:'p1',s:OPEND,o:{...base,fadeIn:.8,petals:1,regs:P1,faces:[[.50,.30,.09]]},lab:[lab(1.2,3.6,L([{t:'NOBODY '},{t:'FOUNDED',hl:1},{t:' IT'}],[{t:'KHÔNG AI '},{t:'SÁNG LẬP',hl:1}]))]},
 {pg:'r2',s:s2a-0.2,o:{...base,sun:[.44,.52,.30,.08],cloud:[.010,.30,.8],regs:R2(),faces:[[.32,.40,.12],[.69,.46,.11]]},lab:[lab(.5,3.2,L([{t:'2,000+ ',hl:1},{t:'YEARS AGO'}],[{t:'HƠN ',},{t:'2.000 NĂM',hl:1},{t:' TRƯỚC'}]))],tr:'cross'},
 {clip:'r2',s:s2b,lab:[lab(1.5,4.5,L([{t:'RAIN · SUN · '},{t:'SOIL',hl:1}],[{t:'MƯA · NẮNG · '},{t:'ĐẤT',hl:1}]))]},
 {pg:'p4',s:G('s3')-0.3,o:{...base,regs:P4,flashAt:.80},lab:[lab(1.0,4.5,L([{t:'MOUNTAIN · RIVER · '},{t:'STORM',hl:1}],[{t:'NÚI · SÔNG · '},{t:'BÃO',hl:1}]))],flower:2},
 {pg:'p5',s:G('s4')-0.3,o:{...base,petals:1,regs:P5,faces:[[.50,.32,.11]]},lab:[lab(.5,3.0,L([{t:'AROUND '},{t:'700 AD',hl:1}],[{t:'KHOẢNG '},{t:'NĂM 700',hl:1}])),lab(3.2,6.0,[{t:'KOJIKI · '},{t:'NIHON SHOKI',hl:1}])],flower:3},
 {pg:'p3',s:G('s5')-0.3,o:{...base,petals:1,regs:P3,faces:[[.50,.27,.085]],blinks:[1.5]},lab:[lab(.3,3.2,[{t:'AMATERASU',hl:1}])],flower:4},
 {pg:'p3',s:G('s6')-0.1,o:{z0:1.08,z1:1.10,f0:[.5,.45],regs:P3,t0:3.5,darkRamp:.7,revealEnd:.45},tr:'none'},
 {pg:'p3',s:G('s7')-0.1,o:{z0:1.05,z1:1.08,f0:[.5,.5],regs:P3.map((g,i)=>i?{...g,bob:[.011,1.3,i],rot:[.05,.65,i*1.2]}:g),t0:6,darkConst:1,reveal:[.5,.27,.035,1.6,0,1.7],faces:[[.50,.27,.085]],smile:[1.0,2.0],blinks:[2.6]},tr:'none'},
 {clip:'p3',s:G('s7')+1.9,tr:'cross'},
 {pg:'p6',s:G('s8')-0.3,o:{...base,petals:1,regs:P6,faces:[[.50,.31,.12]],smileFrac:[.55,.8],blinks:[.5,3.6,5.6]},lab:[lab(1.2,4.2,L([{t:'THE EMPERORS’ '},{t:'ANCESTOR',hl:1}],[{t:'TỔ TIÊN CỦA '},{t:'THIÊN HOÀNG',hl:1}]))],flower:7},
 {pg:'f1',s:G('s9')-0.3,o:{...base,petals:1,cloud:[.008,.3,.6]},lab:[lab(2.5,6.0,L([{t:'TORII ',hl:1},{t:'GATE'}],[{t:'CỔNG ',},{t:'TORII',hl:1}])),lab(9.0,13.0,[{t:'FUSHIMI ',hl:1},{t:'INARI'}])]},
 {clip:'f2',s:G('s10')-0.3,lab:[lab(1.0,4.5,L([{t:'PURIFICATION',hl:1}],[{t:'THANH TẨY',hl:1}]))]},
 {clip:'f2b',s:G('s11')-0.3,lab:[lab(.6,3.2,[{t:'SUMO',hl:1}])]},
 {clip:'f3',s:G('s12')-0.3,lab:[lab(1.0,6.0,L([{t:'2 BOWS · 2 CLAPS · '},{t:'1 BOW',hl:1}],[{t:'2 LẠY · 2 VỖ TAY · '},{t:'1 LẠY',hl:1}]))]},
 {pg:'f4a',s:G('s13')-0.3,o:{...base,petals:1},lab:[lab(3.0,7.0,[{t:'SUGAWARA NO '},{t:'MICHIZANE',hl:1}])]},
 {pg:'f4b',s:G('s14')-0.3,o:{...base,flash:[.25,.6]},tr:'cut'},
 {pg:'f4c',s:G('s15')-0.3,o:{...base,petals:1},lab:[lab(.8,4.0,L([{t:'TENJIN · '},{t:'GOD OF LEARNING',hl:1}],[{t:'TENJIN · '},{t:'THẦN HỌC VẤN',hl:1}]))]},
 {pg:'f5',s:G('s16')-0.3,o:{...base,petals:1},lab:[lab(1.0,5.0,L([{t:'ISE · '},{t:'EVERY 20 YEARS',hl:1}],[{t:'ISE · '},{t:'MỖI 20 NĂM',hl:1}]))]},
 {pg:'f6',s:G('s17')-0.3,o:{...base,petals:1},lab:[lab(4.0,8.0,L([{t:'HATSUMŌDE · '},{t:'NEW YEAR',hl:1}],[{t:'HATSUMODE · '},{t:'NĂM MỚI',hl:1}]))]},
 {pg:'op',s:ENDS,o:{z0:1.1,z1:1.25,y0:.02,y1:-.02,f0:[.5,.55],depth:.5,punch:0,nodust:1,ink:endInk,vig:1,fadeIn:1.2,fadeOut:2.5},tr:'none'}
];
for(let i=0;i<sc.length;i++){sc[i].e=i<sc.length-1?sc[i+1].s:END;const d=sc[i].e-sc[i].s;const o=sc[i].o;if(!o)continue;
 if(o.flashAt){o.flash=[d*o.flashAt,d*o.flashAt+.35]}if(o.revealEnd){o.reveal=[.5,.25,0,.035,d-o.revealEnd,.4]}if(o.smileFrac){o.smile=[d*o.smileFrac[0],d*o.smileFrac[1]]}}

// ---- split long scenes into sub-shots (rule: 3-7 s per shot) ----
const FOC={f1:[[.5,.45,1.5],[.22,.72,1.6]],f2:[[.45,.33,1.6]],f2b:[[.5,.35,1.6]],f3:[[.5,.30,1.6]],f4a:[[.48,.38,1.6],[.3,.25,1.6]],f4b:[[.68,.2,1.6],[.25,.72,1.6]],f4c:[[.45,.45,1.6],[.2,.62,1.6]],f5:[[.72,.55,1.6],[.3,.5,1.6]],f6:[[.5,.3,1.5],[.2,.7,1.6]]};
{const out=[];for(const s of sc){const d=s.e-s.s;const key=s.pg||s.clip;if(d<=7.5||!FOC[key]){out.push(s);continue}
 const n=Math.ceil(d/5.5);const L0=s.lab||[];
 for(let j=0;j<n;j++){const a=s.s+d*j/n,e=s.s+d*(j+1)/n;let sub;
  if(j===0)sub={...s,s:a,e};
  else{const f=FOC[key][(j-1)%FOC[key].length];const isClipTurn=s.clip&&j%2===0;
   sub=isClipTurn?{clip:s.clip,s:a,e,tr:'cross'}:{pg:key,s:a,e,tr:'cross',o:{...(s.o||{}),petals:1,z0:f[2],z1:f[2]+.05,f0:[f[0],f[1]],flash:(s.o&&s.o.flash&&key==='f4b'&&j===1)?[.3,.6]:undefined,fadeOut:(j===n-1&&s.o&&s.o.fadeOut)?s.o.fadeOut:undefined}};
   if(sub.o&&j<n-1)delete sub.o.fadeOut}
  const off=a-s.s;sub.lab=L0.filter(l=>l.t0>=off-(j?0:99)&&l.t0<(e-s.s)).map(l=>({...l,t0:l.t0-off,t1:l.t1-off}));if(j===0)sub.lab=L0.filter(l=>l.t0<(e-s.s));
  if(j>0)delete sub.flower;out.push(sub)}}
 sc.length=0;out.forEach(x=>sc.push(x));
 if(sc[0].o&&sc[0].o.fadeOut){}}

// transitions at start of scene i (between i-1 and i)
const META=JSON.parse(fs.readFileSync('flsp.json','utf8'));
const FL={1:{sp:'fl_p1_0.png',a:[.90,.30],b:[.89,.85],bw:META['fl_r2_0.png'].wpx},2:{sp:'fl_r2_1.png',a:[.04,.84],b:[.07,.72],bw:META['fl_p4_0.png'].wpx},3:{sp:'fl_p4_1.png',a:[.93,.72],b:[.91,.40],bw:META['fl_p5_0.png'].wpx},4:{sp:'fl_p5_1.png',a:[.14,.38],b:[.13,.24],bw:META['fl_p3_0.png'].wpx},7:{sp:'fl_p3_1.png',a:[.93,.48],b:[.89,.11],bw:META['fl_p6_0.png'].wpx}};
const trOf=i=>{if(i===0)return null;const s=sc[i];if(s.tr==='none'||s.tr==='cut')return null;if(i===1)return null; if(s.tr==='cross')return {type:'cross',hw:.35};if(s.flower)return {type:'flower',hw:.7,spec:FL[s.flower]};if(sc[i-1].pg==='f6'||s.pg==='op')return null;return {type:'tear',hw:.85}};
// timeline export for audio
const tl={lang:LANG,END,G:Object.fromEntries(Object.keys(T).map(k=>[k,G(k)])),scenes:sc.map((s,i)=>({i,pg:s.pg||('clip_'+s.clip),s:s.s,e:s.e,tr:trOf(i)?trOf(i).type:null}))};
fs.writeFileSync(`timeline_${LANG}.json`,JSON.stringify(tl,null,1));
const PG={f2:'pf_f2.html',f2b:'pf_f2b.html',f3:'pf_f3.html',op:'../op/g3.html',p1:'../paper/pr_p1.html',r2:'../paper/pr_r2.html',p4:'../paper/pr_p4.html',p5:'../paper/pr_p5.html',p3:'../paper/pr_p3.html',p6:'../paper/pr_p6.html',f1:'pf_f1.html',f4a:'pf_f4a.html',f4b:'pf_f4b.html',f4c:'pf_f4c.html',f5:'pf_f5.html',f6:'pf_f6.html'};
const CL={};for(const k of ['r2','f2','f2b','f3','p3'])CL[k]=fs.readdirSync('cf_'+k).sort().map(f=>`cf_${k}/${f}`);
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--use-gl=angle','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const P={};for(const k in PG){const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>console.log('ERR',k,e.message));await p.goto('file://'+path.resolve(PG[k]));await p.evaluate(()=>window.ready);P[k]=p}
 const comp=await b.newPage({viewport:{width:1280,height:720}});comp.on('pageerror',e=>console.log('ERR comp',e.message));await comp.goto('file://'+path.resolve('comp4.html'));await comp.evaluate(d=>loadSp(d),JSON.parse(fs.readFileSync('sp_b64.json','utf8')));
 const idxOf=t=>{for(let i=sc.length-1;i>=0;i--)if(t>=sc[i].s)return i;return 0};
 const buf=async(i,t)=>{const s=sc[i];const lt=Math.max(0,t-s.s);
  if(s.clip){const fr=CL[s.clip];const D=s.e-s.s;const n=fr.length;const cd=n/FPS;let sp=Math.max(.55,Math.min(1,cd/D));let pos=lt*sp*FPS;const per=2*(n-1);let q=Math.floor(pos)%per;if(q>=n)q=per-q;return fs.readFileSync(fr[q])}
  const o=Object.assign({dur:s.e-s.s},s.o);await P[s.pg].evaluate(([t,o])=>draw(t,o),[lt,o]);return await P[s.pg].screenshot({type:'jpeg',quality:92})};
 const frame=async t=>{let i=idxOf(t);let tri=null;
  if(i+1<sc.length){const tr=trOf(i+1);if(tr&&sc[i+1].s-t<tr.hw)tri={k:i+1,tr}}
  if(!tri){const tr=trOf(i);if(tr&&t-sc[i].s<tr.hw)tri={k:i,tr}}
  if(tri){const {k,tr}=tri;const p=(t-(sc[k].s-tr.hw))/(2*tr.hw);const A=(await buf(k-1,t)).toString('base64'),B=(await buf(k,t)).toString('base64');
   if(tr.type==='flower')await comp.evaluate(([a,b,p,s])=>flower(a,b,p,s),[A,B,p,tr.spec]);else if(tr.type==='tear')await comp.evaluate(([a,b,p])=>tear(a,b,p),[A,B,p]);else await comp.evaluate(([a,b,p])=>cross(a,b,p),[A,B,p]);
   i=p<.5?k-1:k}else await comp.evaluate(a=>single(a),(await buf(i,t)).toString('base64'));
  await comp.evaluate(([l,t])=>labels(l,t),[sc[i].lab||[],t-sc[i].s]);return await comp.screenshot({type:'jpeg',quality:92})};
 if(STILLS.length){for(const t of STILLS){fs.writeFileSync(`st_${LANG}_${t}.jpg`,await frame(t))}await b.close();return}
 const ff=spawn('ffmpeg',['-y','-f','image2pipe','-framerate','24','-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18',`video_${LANG}.mp4`],{stdio:['pipe','ignore','inherit']});
 const N=Math.round(END*FPS);for(let f=0;f<N;f++){const bb=await frame(f/FPS);if(!ff.stdin.write(bb))await new Promise(r=>ff.stdin.once('drain',r));if(f%480===0)console.log(LANG,'frame',f,'/',N)}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done',LANG)})();
