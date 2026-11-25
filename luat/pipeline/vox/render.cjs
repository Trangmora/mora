// Dùng: node render.cjs <thư_mục_tập> [t1 t2 ...]   Có mốc t: xuất khung hình mẫu work/st_<t>.jpg. Không có: dựng work/video.mp4 (1080p, 30 hình/giây).
// Đoạn thử: node render.cjs <tập> --range t0 t1 (ghi work/clip.mp4).
// Dựng song song: node render.cjs <tập> --part i n  (ghi work/part_i.mp4), rồi ghép bằng ffmpeg concat.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');const path=require('path');const {spawn}=require('child_process');const fs=require('fs');
const ep=path.resolve(process.argv[2]);const KK=JSON.parse(fs.readFileSync(ep+'/work/K.json','utf8'));const END=0.6+KK.K['end']+1.6;
let args=process.argv.slice(3);let part=null,range=null;if(args[0]==='--part'){part=[+args[1],+args[2]];args=[]}else if(args[0]==='--range'){range=[+args[1],+args[2]];args=[]}
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>{console.log('ERR',e.message);process.exitCode=1});
 await p.goto('file://'+path.join(__dirname,'vox.html'));await p.addScriptTag({path:ep+'/scenes.js'});await p.evaluate(()=>window.ready);
 const imgs=await p.evaluate(()=>EP.images||{});const data={};for(const k in imgs)data[k]='data:image/jpeg;base64,'+fs.readFileSync(ep+'/'+imgs[k]).toString('base64');await p.evaluate(d=>loadImages(d),data);await p.evaluate(k=>setK(k),KK);
 const st=args.map(Number);if(st.length){for(const t of st){await p.evaluate(([t,E])=>draw(t,E),[t,END]);fs.writeFileSync(`${ep}/work/st_${t}.jpg`,await p.screenshot({type:'jpeg',quality:88}))}await b.close();return}
 const N=Math.round(END*30);let f0=0,f1=N,out=ep+'/work/video.mp4';if(part){f0=Math.floor(N*part[0]/part[1]);f1=Math.floor(N*(part[0]+1)/part[1]);out=`${ep}/work/part_${part[0]}.mp4`}
 if(range){f0=Math.round(range[0]*30);f1=Math.round(range[1]*30);out=ep+'/work/clip.mp4'}
 const ff=spawn('ffmpeg',['-y','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','17',out],{stdio:['pipe','ignore','ignore']});
 for(let f=f0;f<f1;f++){await p.evaluate(([t,E])=>draw(t,E),[f/30,END]);if(!ff.stdin.write(await p.screenshot({type:'jpeg',quality:93})))await new Promise(r=>ff.stdin.once('drain',r))}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done',out,END)})();
