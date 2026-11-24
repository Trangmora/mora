const { chromium } = require('/opt/node22/lib/node_modules/playwright'); const path=require('path'); const {spawn}=require('child_process');
const FPS=24;
const reg=(c,r,o={})=>Object.assign({c,r},o);
const mid=(parts,size=40)=>({size,parts});
const txt=(t0,t1,x,y,parts,size=26)=>({t0,t1,x,y,parts,size});
// regions per image (image-uv coordinates)
const P1=[reg([.22,.07],[.16,.09],{shear:[.006,.2,0]}),reg([.77,.06],[.16,.09],{shear:[.006,.18,1.7]}),
 reg([.36,.42],[.07,.14],{piv:[.36,.28],rot:[.03,.35,0]}),reg([.69,.40],[.07,.14],{piv:[.69,.28],rot:[.03,.3,2]}),
 reg([.19,.30],[.06,.09],{bob:[.012,.3,0]}),reg([.16,.52],[.06,.08],{bob:[.012,.27,1.5]}),reg([.80,.40],[.06,.09],{bob:[.012,.29,3]}),
 reg([.50,.60],[.16,.42],{bob:[.0025,.22,0]})];
const R2=()=>[reg([.20,.45],[.18,.40],{bob:[.0035,.2,0]}),reg([.64,.50],[.18,.40],{bob:[.0035,.2,2]}),reg([.5,.82],[.55,.14],{shear:[.005,.35,0]})];
const P4=[reg([.17,.42],[.06,.09],{bob:[.012,.3,0]}),reg([.52,.40],[.06,.09],{bob:[.012,.27,1]}),reg([.90,.47],[.05,.09],{bob:[.012,.29,2]}),reg([.77,.77],[.06,.08],{bob:[.012,.25,3]}),reg([.20,.58],[.07,.11],{bob:[.014,.23,4]}),
 reg([.72,.12],[.28,.13],{shear:[.008,.12,0]}),reg([.55,.74],[.35,.13],{shear:[.006,.3,0]})];
const P5=[reg([.46,.60],[.07,.10],{piv:[.56,.54],rot:[.018,.4,0]}),reg([.50,.30],[.08,.13],{piv:[.50,.42],rot:[.006,.25,0]}),reg([.72,.57],[.04,.06],{shear:[.012,3,0]}),reg([.5,.50],[.15,.30],{bob:[.0025,.22,0]})];
const dance=(c,ph,f=.9)=>reg(c,[.08,.16],{piv:[c[0],c[1]+.12],rot:[.035,f/2,ph],bob:[.008,f,ph],bobabs:1});
const P3=[reg([.50,.33],[.2,.3],{rot:[.015,.12,0]}),dance([.12,.68],0),dance([.27,.68],1.2),dance([.45,.76],2.4),dance([.63,.70],3.6),dance([.82,.66],4.8)];
const P6=[reg([.50,.30],[.24,.32],{rot:[.015,.1,0]}),reg([.50,.28],[.08,.12],{piv:[.5,.40],rot:[.008,.2,0]}),reg([.15,.22],[.14,.10],{shear:[.01,.12,0]}),reg([.85,.30],[.15,.10],{shear:[.01,.11,1]}),reg([.50,.55],[.20,.30],{bob:[.0025,.22,0]})];
const S=[
 {pg:'p1',s:21.4,e:24.9,o:{z0:1.05,z1:1.08,f0:[.5,.5],fadeIn:.7,faces:[[.50,.30,.09]],blinks:[1.0,2.9],petals:1,regs:P1,text:[txt(1.2,3.3,40,630,[{t:'NOBODY '},{t:'FOUNDED',hl:1},{t:' IT'}])]}},
 {pg:'r2',s:24.9,e:31.6,o:{z0:1.05,z1:1.14,f0:[.5,.5],faces:[[.32,.40,.12],[.69,.46,.11]],sun:[.44,.52,.17,.08],cloud:[.010,.30,.8],regs:R2(),text:[txt(.3,2.6,40,28,[{t:'2,000+ ',hl:1},{t:'YEARS AGO'}]),txt(4.9,6.5,40,28,[{t:'RAIN · SUN · '},{t:'SOIL',hl:1}])]}},
 {pg:'p4',s:31.6,e:37.2,o:{z0:1.05,z1:1.1,f0:[.5,.5],regs:P4,flash:[4.3,4.65]}},
 {pg:'p5',s:37.2,e:42.3,o:{z0:1.05,z1:1.08,f0:[.5,.5],faces:[[.50,.32,.11]],blinks:[1.2,3.5],petals:1,regs:P5,text:[txt(.4,2.4,40,28,[{t:'AROUND '},{t:'700 AD',hl:1}]),txt(2.6,4.8,40,28,[{t:'KOJIKI · '},{t:'NIHON SHOKI',hl:1}])]}},
 {pg:'p3',s:42.3,e:45.8,o:{z0:1.05,z1:1.08,f0:[.5,.5],faces:[[.50,.27,.085]],blinks:[1.5],petals:1,regs:P3,text:[txt(.2,3.0,40,28,[{t:'AMATERASU',hl:1}])]}},
 {pg:'p3',s:45.8,e:47.6,o:{z0:1.08,z1:1.10,f0:[.5,.45],regs:P3,t0:3.5,darkRamp:.7,reveal:[.5,.25,0,.035,1.3,.5]}},
 {pg:'p3',s:47.6,e:50.4,o:{z0:1.05,z1:1.08,f0:[.5,.5],regs:P3.map((g,i)=>i?{...g,bob:[.011,1.3,i],rot:[.05,.65,i*1.2]}:g),t0:6,darkConst:1,reveal:[.5,.27,.035,1.6,0,1.7],faces:[[.50,.27,.085]],smile:[1.0,2.0],blinks:[2.6]}},
 {pg:'p6',s:50.4,e:57.5,o:{z0:1.05,z1:1.1,f0:[.5,.5],faces:[[.50,.31,.12]],smile:[1.3,2.6],blinks:[.5,3.6,5.6],fadeOut:2.6,petals:1,regs:P6,text:[txt(1.6,4.2,40,28,[{t:'THE EMPERORS’ '},{t:'ANCESTOR',hl:1}])]}}
];
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--use-gl=angle','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const P={};for(const k of ['r2','p1','p3','p4','p5','p6']){const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>console.log('ERR',k,e.message));await p.goto('file://'+path.resolve(`pr_${k}.html`));await p.evaluate(()=>window.ready);P[k]=p}
 const st=process.argv.slice(2).map(Number);const at=T=>S.find(s=>T>=s.s&&T<s.e)||S[S.length-1];
 if(st.length){for(const T of st){const sh=at(T);const o=Object.assign({dur:sh.e-sh.s},sh.o);await P[sh.pg].evaluate(([t,o])=>draw(t,o),[T-sh.s,o]);await P[sh.pg].screenshot({path:`v_${T}.png`})}await b.close();return}
 const comp=await b.newPage({viewport:{width:1280,height:720}});await comp.goto('file://'+path.resolve('comp2.html'));await comp.evaluate(d=>loadSp(d),JSON.parse(require('fs').readFileSync('sp_b64.json','utf8')));
 const META=JSON.parse(require('fs').readFileSync('flsp.json','utf8'));
 const SPEC={1:{sp:'fl_p1_0.png',a:[.90,.30],b:[.89,.85],bw:META['fl_r2_0.png'].wpx},2:{sp:'fl_r2_1.png',a:[.04,.84],b:[.07,.72],bw:META['fl_p4_0.png'].wpx},3:{sp:'fl_p4_1.png',a:[.93,.72],b:[.91,.40],bw:META['fl_p5_0.png'].wpx},4:{sp:'fl_p5_1.png',a:[.14,.38],b:[.13,.24],bw:META['fl_p3_0.png'].wpx},7:{sp:'fl_p3_1.png',a:[.93,.48],b:[.89,.11],bw:META['fl_p6_0.png'].wpx}};
 const idxOf=T=>{for(let i=0;i<S.length;i++)if(T>=S[i].s&&T<S[i].e)return i;return S.length-1};
 const shotBuf=async(i,T,q=93)=>{const sh=S[i];const o=Object.assign({dur:sh.e-sh.s},sh.o);await P[sh.pg].evaluate(([t,o])=>draw(t,o),[Math.max(0,T-sh.s),o]);return await P[sh.pg].screenshot({type:'jpeg',quality:q})};
 const noSlide=new Set([5,6]); // continuity inside cave scene
 const hwOf=i=>0.7;
 const ff=spawn('ffmpeg',['-y','-f','image2pipe','-framerate','24','-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','17','part2.mp4'],{stdio:['pipe','ignore','inherit']});
 const f0=Math.round(S[0].s*FPS),f1=Math.round(S[S.length-1].e*FPS);
 for(let f=f0;f<f1;f++){const T=f/FPS;let i=idxOf(T);let buf;let done=false;
  for(let k=1;k<S.length;k++){if(!SPEC[k])continue;const hw=hwOf(k);const bnd=S[k].s;if(Math.abs(T-bnd)<hw){const p=(T-(bnd-hw))/(2*hw);const A=await shotBuf(k-1,T),B=await shotBuf(k,T);buf=await (async()=>{await comp.evaluate(([a,b,p,sp])=>comp2(a,b,p,sp),[A.toString('base64'),B.toString('base64'),p,SPEC[k]]);return await comp.screenshot({type:'jpeg',quality:93})})();done=true;break}}
  if(!done)buf=await shotBuf(i,T);
  if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r))}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done')})();
