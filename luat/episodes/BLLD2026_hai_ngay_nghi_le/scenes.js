// Tập: Thêm 2 ngày nghỉ lễ hưởng nguyên lương (Luật sửa đổi Bộ luật Lao động và 4 luật khác, thông qua 21/11/2026).
// Giọng nghiêm túc, trung lập (chủ kênh chốt 25/11/2026): không câu đùa, không con dấu hay bong bóng đùa.
const SRC1='Nguồn: Báo Chính phủ, VietnamPlus, VnExpress, Tuổi Trẻ (21/11/2026)';
const SRC2='Nguồn: VTV, Báo Chính phủ, Dân trí, VnExpress (21/11/2026)';
const SRC3='Nguồn: Nghị quyết 28/2026/QH16; VnExpress, Dân trí (21/11/2026)';
// Tờ lịch vẽ bằng code: dải đỏ ghi tháng, số ngày thật to, tên ngày lễ bên dưới.
function calPage(px,py,w,h,t0,month,day,label,tl){box(px,py,w,h,t0,{lw:6},a=>{
 x.fillStyle=RED;x.beginPath();x.roundRect(3,3,w-6,62,[11,11,0,0]);x.fill();
 for(const cx of [w*.26,w*.74]){x.fillStyle=CARD;x.beginPath();x.arc(cx,18,7,0,6.2832);x.fill()}
 txt(month,w/2,48,{size:29,col:'#fff',align:'center',ls:4});
 txt(day,w/2,214,{size:150,align:'center'});
 const m=tw(label,27);hl(w/2-m/2-4,236,m+8,40,(NOW-tl)/.35);txt(label,w/2,266,{size:27,align:'center',a:P(tl,.2)})})}
// Con dấu có nền giấy phía sau để đọc được khi đè lên ảnh.
function stampBg(s,px,py,p,o={}){if(p<=0)return;const size=o.size||46,rot=o.rot??-.12,sc=p<.25?2.2-4.8*p:1;x.save();x.translate(px,py);x.rotate(rot);x.scale(sc,sc);x.globalAlpha*=Math.min(1,p*5);const m=tw(s,size,800,'BVP',3);x.fillStyle=CARD;x.fillRect(-m/2-18,-size*.95,m+36,size*1.35);x.restore();stamp(s,px,py,p,o)}
function pop(t0,d=.25){const p=P(t0,d);return p<=0?0:back(p)}
function chip(px,py,w,s,t0){box(px,py,w,68,t0,{col:GREEN},a=>{check(24,17,34,t0+.2,.2,{lw:6});txt(s,80,45,{size:27})})}
function sA(t){ // mở đầu: luật gì, thay đổi gì
 photoCard('cal',80,170,380,390,.15,{rot:-.035});
 txt('BỘ LUẬT LAO ĐỘNG (SỬA ĐỔI)',522,160,{size:22,col:RED,ls:3,a:P(.45,.3)});
 stamp('TỪ NĂM 2027',1112,108,P(g('k_2027'),.4),{size:28,rot:.04});
 txt('Thêm 2 ngày nghỉ lễ,',520,222,{size:58,a:P(g('k_2')-.5,.25)});txt('hưởng nguyên lương',520,292,{size:58,a:P(g('k_luong')-.1,.25)});
 underline(520,308,tw('hưởng nguyên lương',58),g('k_luong')+.3,.4);
 box(520,350,640,214,g('k_nld0')-.1,{lw:6},a=>{txt('NGƯỜI LAO ĐỘNG ĐƯỢC NGHỈ',34,50,{size:23,col:GREY,ls:2});txt('13 NGÀY LỄ, TẾT',30,128,{size:68,col:RED,a:P(g('k_13a')-.1,.2)});
  const m=tw('mỗi năm, thay vì 11 ngày',32);hl(32,152,m+10,44,(NOW-g('k_11a'))/.35);txt('mỗi năm, thay vì 11 ngày',36,186,{size:32,a:P(g('k_11a')-.05,.2)})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(360,92,560,92,t0+.02,{lw:6},a=>{txt('THÊM 2 NGÀY NGHỈ LỄ',280,60,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Nghỉ','ngày nào?'],['Ai','được hưởng?'],['Khi nào','áp dụng?']];
 for(let i=0;i<3;i++){const ti=t0+.25+i*.25;arrow(640+(i-1)*150,188,bx[i]+175,262,ti,.16);
  box(bx[i],268,350,176,ti+.12,{},a=>{badge(i+1,44,46,ti+.2,22);txt(lab[i][0],30,112,{size:28});txt(lab[i][1],30,148,{size:28});
   if(i===0){txt('27/7',320,58,{size:30,col:RED,align:'right'});txt('24/11',320,96,{size:30,col:RED,align:'right'})}
   if(i===1)txt('13 ngày',322,62,{size:34,col:RED,align:'right'});
   if(i===2)txt('2027',322,62,{size:38,col:RED,align:'right'})})}
 const te=t0+1.05;arrow(640,448,640,482,te,.14);box(390,488,500,84,te+.1,{col:GREEN,lw:5},a=>{txt('BẠN NÊN LÀM GÌ?',250,55,{size:32,col:GREEN,align:'center'})});
 source(SRC1,1)}
function sB(t){const t0=g('s1');title(1,'NGHỈ NGÀY NÀO?',t0);
 calPage(130,168,420,310,g('k_277')-.15,'THÁNG 7','27','Ngày Thương binh, liệt sĩ',g('k_tbls'));
 const pp=pop(g('k_2411'));if(pp>0){x.save();x.translate(640,326);x.scale(pp,pp);txt('+',0,34,{size:110,col:RED,align:'center'});x.restore()}
 calPage(730,168,420,310,g('k_2411')+.15,'THÁNG 11','24','Ngày Văn hóa Việt Nam',g('k_vh'));
 box(370,508,540,70,g('k_vh')+.5,{col:GREEN,lw:4},a=>{check(26,16,36,g('k_vh')+.7,.2,{lw:6});txt('Nghỉ làm việc, hưởng nguyên lương',84,45,{size:26})});
 source(SRC1,1)}
function sC(t){const t0=g('s2');title(2,'AI ĐƯỢC HƯỞNG?',t0);
 chip(140,150,590,'Người lao động được nghỉ làm việc',g('k_nld')-.05);
 chip(760,150,380,'Hưởng nguyên lương',g('k_hnl')+.1);
 box(150,246,380,160,g('k_tong')-.05,{col:GREY},a=>{txt('HIỆN NAY',190,42,{size:20,col:GREY,align:'center',ls:2});txt('11 ngày',190,124,{size:78,align:'center'})});
 arrow(542,326,738,326,g('k_13')-.3,.25);txt('+2',640,304,{size:46,col:RED,align:'center',a:P(g('k_13')-.05,.2)});
 box(750,246,380,160,g('k_13'),{lw:7},a=>{txt('TỪ NĂM 2027',190,42,{size:20,col:RED,align:'center',ls:2});txt('13 ngày',190,126,{size:86,col:RED,align:'center'})});
 // 13 ô ngày nghỉ: 11 ô cũ, 2 ô mới màu đỏ
 const s=58,gp=13,x0=640-(13*s+12*gp)/2,y0=436;
 for(let i=0;i<13;i++){const nw=i>=11,ti=nw?g('k_13')+.25+(i-11)*.22:g('k_tong')+.35+i*.13,pp=pop(ti,.22);if(pp<=0)continue;
  x.save();x.translate(x0+i*(s+gp)+s/2,y0+s/2);x.scale(pp,pp);x.shadowColor='rgba(70,35,10,.25)';x.shadowBlur=8;x.shadowOffsetY=3;x.fillStyle=nw?RED:CARD;rr(-s/2,-s/2,s,s,9);x.fill();x.shadowColor='transparent';
  x.strokeStyle=nw?RED:GREY;x.lineWidth=3;rr(-s/2,-s/2,s,s,9);x.stroke();txt(nw?(i===11?'27/7':'24/11'):String(i+1),0,nw?7:10,{size:nw?17:26,col:nw?'#fff':INK,align:'center'});x.restore()}
 txt('Số ngày nghỉ lễ, Tết hưởng nguyên lương mỗi năm',640,538,{size:20,w:600,col:GREY,align:'center',a:P(g('k_tong')+.2,.3)});
 source(SRC1,1)}
function sD(t){const t0=g('s3');title(3,'KHI NÀO ÁP DỤNG?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_qh')-.1,{},a=>{photo('gavel',14,14,322,140);txt('QUỐC HỘI THÔNG QUA',175,196,{size:21,col:GREY,align:'center',ls:1});txt('21/11/2026',175,254,{size:46,align:'center',a:P(g('k_ngay'),.2)});txt('Luật sửa đổi Bộ luật Lao động',175,296,{size:20,w:600,col:GREY,align:'center',a:P(g('k_ngay')+.4,.25)});stampBg('ĐÃ THÔNG QUA',175,92,P(g('k_ngay')+1.5,.4),{size:26,rot:-.1})});
 arrow(408,y+h/2,460,y+h/2,g('k_phieu')-.3,.2);
 box(468,y,350,h,g('k_phieu'),{},a=>{const m=tw('PHIẾU TÁN THÀNH',21,800,'BVP',1);hl(175-m/2-4,36,m+8,30,(NOW-g('k_tt'))/.35);txt('PHIẾU TÁN THÀNH',175,58,{size:21,col:INK,align:'center',ls:1});txt('461',175,196,{size:120,align:'center'});txt('trên 463 đại biểu',175,250,{size:25,w:600,align:'center',a:P(g('k_463'),.2)});txt('tham gia biểu quyết',175,284,{size:25,w:600,align:'center',a:P(g('k_463')+.5,.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.25,.5);const m=tw('01/3/2027',54);hl(175-m/2-4,226,m+8,54,(NOW-g('k_hl2')-.8)/.35);txt('01/3/2027',175,270,{size:54,col:RED,align:'center',a:P(g('k_hl2')-.1,.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl2')+1.5,.3)});
 source(SRC2,1)}
function node(cx,cy,yr,t0){const pp=pop(t0);if(pp<=0)return;x.save();x.translate(cx,cy);x.scale(pp,pp);x.beginPath();x.arc(0,0,15,0,6.2832);x.fillStyle=RED;x.fill();x.strokeStyle=CARD;x.lineWidth=4;x.stroke();x.restore();txt(yr,cx,cy-30,{size:44,align:'center',a:P(t0,.2)})}
function sD2(t){const t0=g('s4');title(3,'KHI NÀO ÁP DỤNG?',t0-9);
 sketch([seg(110,236,1170,236,7)],t0+.05,.5,{col:INK,lw:5});
 node(350,236,'2026',t0+.25);node(930,236,'2027',g('k_r27')-.25);
 arrow(350,256,350,288,t0+.5,.14);
 box(130,294,440,250,t0+.6,{},a=>{txt('24/11',220,74,{size:68,col:RED,align:'center'});txt('Ngày Văn hóa Việt Nam',220,116,{size:25,align:'center'});
  const m=tw('ĐÃ ĐƯỢC NGHỈ',30,800,'BVP',2);hl(220-m/2-4,140,m+8,44,(NOW-g('k_r24b'))/.35,'#bfe3c2');txt('ĐÃ ĐƯỢC NGHỈ',220,174,{size:30,col:GREEN,align:'center',ls:2,a:P(g('k_r24b')-.05,.2)});
  txt('từ năm 2026',220,210,{size:23,align:'center',a:P(g('k_r24y'),.2)});txt('theo Nghị quyết 28/2026/QH16',220,236,{size:17,w:600,col:GREY,align:'center',a:P(g('k_r24c'),.25)})});
 arrow(930,256,930,288,g('k_r27')-.05,.14);
 box(710,294,440,250,g('k_r27')+.05,{lw:6},a=>{txt('27/7',220,74,{size:68,col:RED,align:'center'});txt('Ngày Thương binh, liệt sĩ',220,116,{size:25,align:'center'});
  const m=tw('BẮT ĐẦU NGHỈ',30,800,'BVP',2);hl(220-m/2-4,140,m+8,44,(NOW-g('k_r27b'))/.35);txt('BẮT ĐẦU NGHỈ',220,174,{size:30,col:RED,align:'center',ls:2,a:P(g('k_r27b')-.05,.2)});
  txt('từ năm 2027',220,210,{size:23,align:'center',a:P(g('k_r27y'),.2)});txt('theo Bộ luật Lao động (sửa đổi)',220,236,{size:17,w:600,col:GREY,align:'center',a:P(g('k_r27y')+.4,.25)})});
 source(SRC3,1)}
function sE(t){const t0=g('s5');const m=tw('BẠN NÊN LÀM GÌ?',48);txt('BẠN NÊN LÀM GÌ?',640,122,{size:48,col:GREEN,align:'center',a:P(t0,.2)});underline(640-m/2,136,m,t0+.25,.35,{col:GREEN});
 const W0=940,X0=170;
 let ti=g('k_e1');box(X0,172,W0,122,ti,{col:GREEN},a=>{check(36,36,54,ti+.25,.25);txt('Ghi 27/7 và 24/11 vào lịch làm việc',130,54,{size:30});
  txt('27/7: nghỉ từ năm 2027  ·  24/11: đã nghỉ từ năm 2026',130,94,{size:22,w:600,col:GREY,a:P(g('k_e1b'),.25)});photo('cal',782,13,144,96,{a:P(ti+.3,.3)})});
 const t2=g('s6');box(X0,310,W0,122,t2,{col:GREEN},a=>{check(36,36,54,t2+.25,.25);txt('Nếu phải đi làm ngày lễ:',130,54,{size:30});{const o=tw('hỏi rõ ',30),m2=tw('lương làm thêm',30);hl(130+o-3,66,m2+6,38,(NOW-g('k_e2c')-.7)/.35)}txt('hỏi rõ lương làm thêm',130,94,{size:30,a:P(g('k_e2b'),.2)});txt('theo Bộ luật Lao động',130+tw('hỏi rõ lương làm thêm ',30),94,{size:30,a:P(g('k_e2c'),.2)})});
 const t3=g('s7');box(X0,448,W0,122,t3,{col:GREEN},a=>{check(36,36,54,t3+.25,.25);txt('Xem thông báo lịch nghỉ',130,54,{size:30});txt('chính thức mỗi năm',130+tw('Xem thông báo lịch nghỉ ',30),54,{size:30,a:P(g('k_e3a'),.2)});txt('Vướng mắc: hỏi công đoàn,',130,94,{size:26,a:P(g('k_e3b'),.2)});txt('cơ quan lao động địa phương',130+tw('Vướng mắc: hỏi công đoàn, ',26),94,{size:26,a:P(g('k_e3c'),.2)})});
 source('Gợi ý chung, không thay cho tư vấn pháp lý.',1)}
function sF(t){const t0=g('out');box(240,140,800,380,t0,{lw:6},a=>{txt('LƯU Ý',400,70,{size:30,col:RED,align:'center',ls:4});
 txt('Nội dung chỉ mang tính thông tin,',400,138,{size:36,w:600,f:'LoraV',align:'center'});txt('không phải tư vấn pháp lý.',400,186,{size:36,w:600,f:'LoraV',align:'center'});
 txt('Luật sửa đổi Bộ luật Lao động và 4 luật khác',400,246,{size:20,w:600,align:'center'});txt('thông qua 21/11/2026 · hiệu lực 01/3/2027 · số hiệu: chờ công bố chính thức',400,276,{size:18,w:600,col:GREY,align:'center'});
 txt('Kiểm tra văn bản gốc: vbpl.vn · thuvienphapluat.vn',400,330,{size:22,w:600,col:BLUE,align:'center',a:P(g('k_src'),.3)})});
 source(SRC2+'  ·  Ảnh minh họa: Unsplash',1)}
defineEpisode({header:'Luật sửa đổi Bộ luật Lao động và 4 luật khác  ·  thông qua 21/11/2026  ·  hiệu lực 01/3/2027',
 images:{cal:'img/calendar.jpg',gavel:'img/gavel.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sB],[()=>g('s2')-.15,sC],[()=>g('s3')-.15,sD],[()=>g('s4')-.15,sD2],[()=>g('s5')-.15,sE],[()=>g('out')-.15,sF]]});
