const { chromium } = require('/opt/node22/lib/node_modules/playwright');const path=require('path');const {spawn}=require('child_process');const fs=require('fs');
const K=JSON.parse(fs.readFileSync('K.json','utf8'));const END=2.5+K['wdis']+6.64+2.2;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto('file://'+path.resolve('vox.html'));await p.evaluate(()=>window.ready);await p.evaluate(k=>setK(k),K);
 const st=process.argv.slice(2).map(Number);if(st.length){for(const t of st){await p.evaluate(([t,E])=>draw(t,E),[t,END]);fs.writeFileSync(`st_${t}.jpg`,await p.screenshot({type:'jpeg',quality:88}))}await b.close();return}
 const ff=spawn('ffmpeg',['-y','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18','video.mp4'],{stdio:['pipe','ignore','ignore']});
 const N=Math.round(END*30);for(let f=0;f<N;f++){await p.evaluate(([t,E])=>draw(t,E),[f/30,END]);ff.stdin.write(await p.screenshot({type:'jpeg',quality:92}))}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done',END)})();
