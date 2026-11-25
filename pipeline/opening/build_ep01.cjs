const { chromium } = require('/opt/node22/lib/node_modules/playwright'); const path=require('path'); const {spawn}=require('child_process');
const FPS=24;const OPEND=21.4;
const mid=(parts,size=64)=>({size,parts});
const opInk=[
 {id:'k1',text:'八百万の神',font:"700 150px NSJP101,NSJP111,NSJP113,NSJP119",color:'#a8161d',x:150,y:290,t0:1.6,t1:8.2,reveal:1.8,by0:130,by1:330},
 {id:'e1',text:'EIGHT MILLION GODS',font:"600 34px Lora",color:'#2b2622',x:156,y:352,t0:3.4,t1:7.8,fadein:1.0,spacing:'7px'},
 {id:'k2',text:'神道',font:"700 210px NSJP113,NSJP114",color:'#a8161d',x:640,y:330,align:'center',t0:16.6,reveal:2.0,by0:130,by1:380},
 {id:'e2',text:'SHINTO',font:"600 50px Lora",color:'#2b2622',x:640,y:420,align:'center',t0:17.9,fadein:1.2,spacing:'22px'},
 {id:'e3',text:'THE WAY OF THE KAMI',font:"600 30px Lora",color:'#6b1216',x:640,y:480,align:'center',t0:19.5,fadein:1.0,spacing:'12px'}
];
const S=[
 {pg:'op',s:0,e:OPEND,o:{z0:1.07,z1:1.26,y0:-.03,y1:.03,f0:[.5,.55],depth:.5,punch:0,nodust:1,ink:opInk,vig:1,fadeIn:1.2,fadeOut:1.4}},
 {pg:'c',s:21.4,e:24.9,o:{z0:1.1,z1:1.35,y0:-.06,y1:.06,f0:[.5,.55],depth:1,punch:0,cloud:1.6,fadeIn:1.0,text:[{t0:1.2,t1:3.3,x:640,y:160,lines:[mid([{t:'NOBODY '},{t:'FOUNDED',hl:1},{t:' IT'}],64)]}]}},
 {pg:'r',s:24.9,e:27.7,o:{z0:1.1,z1:1.35,y0:-.05,y1:.05,f0:[.5,.55],depth:1,waterH:.5,water:.5,text:[{t0:.3,t1:2.6,x:640,y:150,lines:[mid([{t:'2,000+ ',hl:1},{t:'YEARS AGO'}],64)]}]}},
 {pg:'r',s:27.7,e:29.8,o:{z0:1.7,z1:2.0,y0:.05,y1:-.05,f0:[.18,.62],f1:[.22,.6],depth:1,waterH:.5,water:.5}},
 {pg:'r',s:29.8,e:31.6,o:{z0:1.5,z1:1.75,y0:-.04,y1:.04,f0:[.72,.2],f1:[.7,.3],depth:1,text:[{t0:.2,t1:1.7,x:640,y:600,lines:[mid([{t:'RAIN · SUN · '},{t:'SOIL',hl:1}],56)]}]}},
 {pg:'d',s:31.6,e:34.4,o:{z0:1.1,z1:1.3,y0:-.06,y1:.06,f0:[.5,.5],depth:1}},
 {pg:'d',s:34.4,e:35.0,o:{z0:1.7,z1:1.8,y0:-.05,y1:.05,f0:[.32,.45],depth:1,shake:1.2}},
 {pg:'d',s:35.0,e:35.9,o:{z0:1.7,z1:1.8,y0:.05,y1:-.05,f0:[.62,.78],depth:1,shake:1.2}},
 {pg:'d',s:35.9,e:37.2,o:{z0:1.6,z1:1.8,y0:-.05,y1:.05,f0:[.55,.18],depth:1,shake:2,fadeOut:.5}},
 {pg:'v',s:37.2,e:42.3,o:{z0:1.1,z1:1.4,y0:-.06,y1:.06,f0:[.5,.55],depth:1,fadeIn:.6,text:[{t0:.4,t1:2.4,x:640,y:150,lines:[mid([{t:'AROUND '},{t:'700 AD',hl:1}],64)]},{t0:2.6,t1:4.8,x:640,y:150,lines:[mid([{t:'KOJIKI · '},{t:'NIHON SHOKI',hl:1}],56)]}]}},
 {pg:'e',s:42.3,e:45.8,o:{z0:1.35,z1:1.7,y0:-.05,y1:.05,f0:[.2,.35],f1:[.18,.32],depth:1,text:[{t0:.2,t1:2.8,x:640,y:600,lines:[mid([{t:'AMATERASU',hl:1}],64)]}]}},
 {pg:'e',s:45.8,e:47.6,o:{z0:2.0,z1:2.3,y0:.04,y1:-.04,f0:[.18,.3],depth:1,fadeOut:1.7}},
 {pg:'e',s:47.6,e:50.4,o:{z0:1.3,z1:1.55,y0:-.05,y1:.05,f0:[.5,.72],f1:[.55,.7],depth:1,fadeIn:.5}},
 {pg:'e2',s:50.4,e:57.5,o:{z0:1.1,z1:1.4,y0:-.05,y1:.05,f0:[.5,.55],depth:1,fadeOut:2.6,text:[{t0:1.6,t1:4.2,x:640,y:150,lines:[mid([{t:'THE EMPERORS’ '},{t:'ANCESTOR',hl:1}],60)]}]}}
];
const PG={op:'../op/g3.html',c:'p_c.html',r:'p_r.html',d:'p_d.html',e:'p_e.html',e2:'p_e2.html',v:'p_v.html'};
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--use-gl=angle','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const P={};for(const k in PG){const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>console.log('ERR',k,e.message));await p.goto('file://'+path.resolve(PG[k]));await p.evaluate(()=>window.ready);P[k]=p}
 const st=process.argv.slice(2).map(Number);const at=T=>S.find(s=>T>=s.s&&T<s.e)||S[S.length-1];
 if(st.length){for(const T of st){const sh=at(T);const o=Object.assign({dur:sh.e-sh.s},sh.o);await P[sh.pg].evaluate(([t,o])=>draw(t,o),[T-sh.s,o]);await P[sh.pg].screenshot({path:`s_${T}.png`})}await b.close();return}
 const ff=spawn('ffmpeg',['-y','-f','image2pipe','-framerate','24','-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','17','silent.mp4'],{stdio:['pipe','ignore','inherit']});
 for(const sh of S){const f0=Math.round(sh.s*FPS),f1=Math.round(sh.e*FPS),n=f1-f0,dur=n/FPS;const o=Object.assign({dur},sh.o);
  for(let j=0;j<n;j++){await P[sh.pg].evaluate(([t,o])=>draw(t,o),[j/FPS,o]);const buf=await P[sh.pg].screenshot({type:'jpeg',quality:93});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r))}console.log('shot',sh.pg,n)}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done')})();
