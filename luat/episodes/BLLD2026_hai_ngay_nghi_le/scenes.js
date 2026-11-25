// Tập: Thêm 2 ngày nghỉ lễ hưởng nguyên lương (Luật sửa đổi Bộ luật Lao động và 4 luật khác, thông qua 21/11/2026).
// Bản dài khoảng 2 phút 10 giây, giọng nghiêm túc, trung lập (chủ kênh chốt 25/11/2026): không câu đùa.
const SRC1='Nguồn: Báo Chính phủ, VietnamPlus, VnExpress, Tuổi Trẻ (21/11/2026)';
const SRC2='Nguồn: VTV, Báo Chính phủ, Dân trí, VnExpress (21/11/2026)';
const SRC3='Nguồn: Nghị quyết 28/2026/QH16; Dân trí, ThuVienPhapLuat, VnExpress (11/2026)';
const SRC4='Nguồn: Bộ luật Lao động 2019, Điều 112; VietnamPlus, Báo Đà Nẵng, CafeF (11/2026)';
const SRC5='Nguồn: Bộ luật Lao động 2019, Điều 98 và Điều 111; Báo Chính phủ, Dân trí, Công đoàn Việt Nam';
const SRC6='Nguồn: Báo Nhân Dân, VietnamPlus, Dân trí (21/11/2026)';
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
function chip(px,py,w,s,t0){box(px,py,w,60,t0,{col:GREEN},a=>{check(22,15,30,t0+.2,.2,{lw:6});txt(s,72,40,{size:25})})}
function sA(t){ // mở đầu: thay đổi chính
 photoCard('cal',80,170,380,390,.15,{rot:-.035});
 txt('BỘ LUẬT LAO ĐỘNG (SỬA ĐỔI)',522,160,{size:22,col:RED,ls:3,a:P(.45,.3)});
 txt('Thêm 2 ngày nghỉ lễ,',520,222,{size:58,a:P(.7,.25)});txt('hưởng nguyên lương',520,292,{size:58,a:P(1.1,.25)});
 underline(520,308,tw('hưởng nguyên lương',58),g('k_luong'),.4);
 stamp('TỪ NĂM 2027',1112,108,P(.9,.4),{size:28,rot:.04});
 box(520,350,640,214,g('k_nld0')-.1,{lw:6},a=>{txt('NGƯỜI LAO ĐỘNG ĐƯỢC NGHỈ',34,50,{size:23,col:GREY,ls:2});txt('13 NGÀY LỄ, TẾT',30,128,{size:68,col:RED,a:P(g('k_13a')-.1,.2)});
  const m=tw('Bộ luật hiện hành: 11 ngày',32);hl(32,152,m+10,44,(NOW-g('k_11b'))/.35);txt('Bộ luật hiện hành: 11 ngày',36,186,{size:32,a:P(g('k_11a'),.2)})});
 source(SRC1,P(1,.4))}
function sB(t){const t0=g('s1');title(1,'VĂN BẢN NÀO? KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_lsd')-.1,{},a=>{photo('gavel',14,14,322,118);txt('Luật sửa đổi Bộ luật Lao động',175,164,{size:20,align:'center'});txt('và 4 luật khác',175,190,{size:20,align:'center',a:P(g('k_4l'),.2)});
  txt('QUỐC HỘI THÔNG QUA',175,240,{size:20,col:GREY,align:'center',ls:1,a:P(g('k_qh'),.2)});txt('21/11/2026',175,294,{size:46,align:'center',a:P(g('k_ngay'),.2)});stampBg('ĐÃ THÔNG QUA',175,80,P(g('k_ngay')+1.3,.4),{size:26,rot:-.1})});
 arrow(408,y+h/2,460,y+h/2,g('k_phieu')-.3,.2);
 box(468,y,350,h,g('k_phieu'),{},a=>{const m=tw('PHIẾU TÁN THÀNH',21,800,'BVP',1);hl(175-m/2-4,36,m+8,30,(NOW-g('k_tt'))/.35);txt('PHIẾU TÁN THÀNH',175,58,{size:21,col:INK,align:'center',ls:1});txt('461',175,196,{size:120,align:'center'});txt('trên 463 đại biểu',175,250,{size:25,w:600,align:'center',a:P(g('k_463'),.2)});txt('tham gia biểu quyết',175,284,{size:25,w:600,align:'center',a:P(g('k_463')+.5,.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.25,.5);const m=tw('01/3/2027',54);hl(175-m/2-4,226,m+8,54,(NOW-g('k_hl2')-.8)/.35);txt('01/3/2027',175,270,{size:54,col:RED,align:'center',a:P(g('k_hl2')-.1,.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl2')+1.4,.3)});
 source(SRC2,1)}
function sC(t){const t0=g('s2');title(2,'HAI NGÀY NGHỈ MỚI',t0);
 calPage(130,160,420,310,g('k_277')-.15,'THÁNG 7','27','Ngày Thương binh, liệt sĩ',g('k_tbls'));
 txt('Tri ân những người đã hy sinh,',340,508,{size:23,w:600,align:'center',a:P(g('k_tri'),.25)});txt('cống hiến vì Tổ quốc',340,538,{size:23,w:600,align:'center',a:P(g('k_tri2'),.25)});
 const pp=pop(g('k_2411'));if(pp>0){x.save();x.translate(640,318);x.scale(pp,pp);txt('+',0,34,{size:110,col:RED,align:'center'});x.restore()}
 calPage(730,160,420,310,g('k_2411')+.15,'THÁNG 11','24','Ngày Văn hóa Việt Nam',g('k_vh'));
 txt('Tôn vinh các giá trị',940,508,{size:23,w:600,align:'center',a:P(g('k_ton'),.25)});txt('văn hóa dân tộc',940,538,{size:23,w:600,align:'center',a:P(g('k_ton2'),.25)});
 source(SRC1,1)}
// Một dòng trong bảng 13 ngày: tên dịp nghỉ, ghi chú nhỏ, số ngày; dòng mới viền đậm và có nhãn MỚI.
const DAYS=[[0,0,'Tết Dương lịch','1/1',1,'k_td'],[0,1,'Tết Âm lịch','',5,'k_ta'],[0,2,'Giỗ Tổ Hùng Vương','10/3 âm lịch',1,'k_gt'],[0,3,'Ngày 30/4','',1,'k_304',0,0,'k_moi'],
 [1,0,'Ngày 1/5','',1,'k_15',0,0,'k_moi'],[1,1,'Quốc khánh','2/9',2,'k_qk'],[1,2,'Ngày 27/7','Thương binh, liệt sĩ',1,'k_c2',1],[1,3,'Ngày 24/11','Văn hóa Việt Nam',1,'k_c2',1,.4]];
function sD(t){const t0=g('s3');title(3,'13 NGÀY NGHỈ GỒM NHỮNG GÌ?',t0);
 txt('11 ngày đã có trong Bộ luật Lao động 2019',128,164,{size:19,w:600,col:GREY,a:P(g('k_11c'),.3)});
 box(1040,84,180,52,g('k_11d')+.7,{lw:3},a=>{txt('Điều 112',90,35,{size:22,align:'center'})});
 let n=0;for(const [c,r,name,note,cnt,key,nw,dl,ck] of DAYS){const ti=g(key)+(dl||0)-.05,tc=ck?g(ck):ti;if(NOW>=tc)n+=cnt;
  box(c?660:60,184+r*78,560,66,ti,{lw:nw?6:3,fill:nw?'#fdeee9':CARD},a=>{txt(name,22,43,{size:26});
   if(note)txt(note,22+tw(name,26)+12,43,{size:18,w:600,col:GREY,a:key==='k_qk'?P(g('k_29'),.2):1});
   if(key==='k_qk')txt('và 1 ngày liền kề',22+tw(name,26)+12+tw('2/9 ',18,600),43,{size:18,w:600,col:GREY,a:P(g('k_lk'),.2)});
   txt(cnt+' ngày',538,44,{size:27,col:nw?RED:INK,align:'right',a:ck?P(tc,.2):1});
   if(nw){x.fillStyle=RED;rr(382,19,62,28,6);x.fill();txt('MỚI',413,39,{size:15,col:'#fff',align:'center',ls:1})}})}
 const pt=P(g('k_td')-.05,.3);if(pt>0){const done=NOW>=g('k_13b');txt('Tổng cộng:',630,552,{size:30,w:600,align:'right',a:pt});const m=tw(n+' ngày',44);if(done)hl(646,514,m+10,50,(NOW-g('k_13b'))/.35);txt(n+' ngày',650,554,{size:44,col:done?RED:INK,a:pt})}
 source(SRC4,1)}
function node(cx,cy,yr,t0){const pp=pop(t0);if(pp<=0)return;x.save();x.translate(cx,cy);x.scale(pp,pp);x.beginPath();x.arc(0,0,14,0,6.2832);x.fillStyle=RED;x.fill();x.strokeStyle=CARD;x.lineWidth=4;x.stroke();x.restore();txt(yr,cx,cy-26,{size:38,align:'center',a:P(t0,.2)})}
function sE(t){const t0=g('s4');title(4,'ÁP DỤNG TỪ KHI NÀO?',t0);
 const ly=214;sketch([seg(110,ly,1170,ly,7)],t0+.6,.5,{col:INK,lw:5});
 const a1=g('k_r24')-.1;node(350,ly,'2026',a1);arrow(350,ly+18,350,ly+46,a1+.2,.14);
 box(130,266,440,228,a1+.3,{},a=>{txt('24/11',220,64,{size:60,col:RED,align:'center'});txt('Ngày Văn hóa Việt Nam',220,102,{size:24,align:'center'});
  const m=tw('ĐÃ ĐƯỢC NGHỈ',28,800,'BVP',2);hl(220-m/2-4,124,m+8,40,(NOW-g('k_r24b'))/.35,'#bfe3c2');txt('ĐÃ ĐƯỢC NGHỈ',220,154,{size:28,col:GREEN,align:'center',ls:2,a:P(g('k_r24b')-.05,.2)});
  txt('từ năm 2026',220,188,{size:22,align:'center',a:P(g('k_r24b')+.7,.2)});txt('theo Nghị quyết 28/2026/QH16',220,212,{size:16,w:600,col:GREY,align:'center',a:P(g('k_r24c'),.25)})});
 box(100,506,500,62,g('k_r24d'),{lw:3},a=>{const s1='Kỳ nghỉ đầu tiên: ',s2='24/11/2026',s3=', nghỉ 1 ngày',w=tw(s1+s2+s3,21),x0=250-w/2;txt(s1,x0,40,{size:21,w:600});txt('24/11',x0+tw(s1,21,600),40,{size:21,col:RED,a:P(g('k_r24f'),.2)});txt('/2026',x0+tw(s1,21,600)+tw('24/11',21),40,{size:21,col:RED,a:P(g('k_r24g'),.2)});txt(s3,x0+tw(s1,21,600)+tw(s2,21),40,{size:21,w:600,a:P(g('k_r24e'),.2)})});
 const a2=g('k_r27')-.1;node(930,ly,'2027',a2);arrow(930,ly+18,930,ly+46,a2+.2,.14);
 box(710,266,440,228,a2+.3,{lw:6},a=>{txt('27/7',220,64,{size:60,col:RED,align:'center'});txt('Ngày Thương binh, liệt sĩ',220,102,{size:24,align:'center'});
  const m=tw('BẮT ĐẦU NGHỈ',28,800,'BVP',2);hl(220-m/2-4,124,m+8,40,(NOW-g('k_r27b'))/.35);txt('BẮT ĐẦU NGHỈ',220,154,{size:28,col:RED,align:'center',ls:2,a:P(g('k_r27b')-.05,.2)});
  txt('từ năm 2027',220,188,{size:22,align:'center',a:P(g('k_r27y'),.2)});txt('theo Bộ luật Lao động (sửa đổi)',220,212,{size:16,w:600,col:GREY,align:'center',a:P(g('k_r27y')+.4,.25)})});
 source(SRC3,1)}
function sF(t){const t0=g('s5');title(5,'HAI QUY ĐỊNH LIÊN QUAN',t0,{sub:'Bộ luật Lao động 2019 (hiện hành)'});
 const y=186,h=340;
 box(60,y,560,h,g('k_h2')-.5,{},a=>{txt('ĐIỀU 111',280,46,{size:22,col:GREY,align:'center',ls:3});const b1=g('k_bu1');txt('Ngày lễ trùng',280,100,{size:32,align:'center',a:P(b1,.2)});txt('ngày nghỉ hằng tuần',280,140,{size:32,align:'center',a:P(b1+.6,.2)});
  arrow(280,158,280,192,g('k_bu2')-.3,.16);txt('NGHỈ BÙ',280,262,{size:66,col:RED,align:'center',a:P(g('k_bu2'),.2)});txt('vào ngày làm việc kế tiếp',280,306,{size:26,w:600,align:'center',a:P(g('k_bu3'),.2)})});
 box(660,y,560,h,g('k_h2')-.1,{},a=>{txt('ĐIỀU 98',280,46,{size:22,col:GREY,align:'center',ls:3});const b1=g('k_lt1');txt('Làm thêm',280,100,{size:32,align:'center',a:P(b1,.2)});txt('vào ngày lễ, Tết',280,140,{size:32,align:'center',a:P(b1+.5,.2)});
  arrow(280,158,280,192,g('k_lt2')-.3,.16);txt('ÍT NHẤT 300%',280,260,{size:62,col:RED,align:'center',a:P(g('k_lt2'),.2)});txt('tiền lương, chưa kể lương ngày lễ',280,300,{size:24,w:600,align:'center',a:P(g('k_lt3'),.2)});txt('(với người hưởng lương ngày)',280,328,{size:20,w:600,col:GREY,align:'center',a:P(g('k_lt4'),.2)})});
 source(SRC5,1)}
function sG(t){const t0=g('s6');title(6,'AI ĐƯỢC HƯỞNG?',t0);
 const y=186,h=340,tn=g('k_nld');
 box(60,y,560,h,tn-.1,{lw:6},a=>{txt('NGƯỜI LAO ĐỘNG',280,84,{size:46,align:'center'});txt('theo Bộ luật Lao động',280,124,{size:24,w:600,col:GREY,align:'center',a:P(g('k_nld2'),.2)});
  chip(110,160,340,'Nghỉ làm việc',g('k_nld2')+.5);chip(110,236,340,'Hưởng nguyên lương',g('k_nld2')+.95)});
 box(660,y,560,h,g('k_tt2')-.1,{},a=>{txt('LỊCH NGHỈ CỤ THỂ',280,46,{size:22,col:GREY,align:'center',ls:3});txt('Thủ tướng Chính phủ quyết định',280,92,{size:24,align:'center'});txt('ngày nghỉ Tết Âm lịch và Quốc khánh',280,124,{size:24,align:'center',a:P(g('k_tt3'),.2)});
  x.save();x.globalAlpha*=P(g('k_309')-.1,.2);x.fillStyle='#d9cfbd';x.fillRect(60,150,440,3);x.restore();
  {const m=tw('Trước 30/9',58);hl(280-m/2-4,176,m+8,56,(NOW-g('k_lich')-1)/.35)}txt('Trước 30/9',280,222,{size:58,col:RED,align:'center',a:P(g('k_309'),.2)});txt('hằng năm, Bộ trưởng Bộ Nội vụ thông báo',280,264,{size:22,w:600,align:'center',a:P(g('k_bnv'),.2)});txt('lịch nghỉ lễ, Tết của năm sau',280,294,{size:22,w:600,align:'center',a:P(g('k_lich'),.2)})});
 source(SRC6,1)}
function sH(t){const t0=g('s7');const m=tw('BẠN NÊN LÀM GÌ?',48);txt('BẠN NÊN LÀM GÌ?',640,122,{size:48,col:GREEN,align:'center',a:P(t0,.2)});underline(640-m/2,136,m,t0+.25,.35,{col:GREEN});
 const W0=940,X0=170;
 const ti=g('k_e1');box(X0,172,W0,122,ti,{col:GREEN},a=>{check(36,36,54,ti+.25,.25);txt('Ghi 27/7 và 24/11',130,54,{size:30});txt('vào lịch làm việc',130+tw('Ghi 27/7 và 24/11 ',30),54,{size:30,a:P(g('k_e1a'),.2)});
  txt('Trùng ngày nghỉ hằng tuần:',130,94,{size:25,w:600,a:P(g('k_e1b'),.2)});txt('nhớ tính ngày nghỉ bù',130+tw('Trùng ngày nghỉ hằng tuần: ',25,600),94,{size:25,a:P(g('k_e1c'),.2)});photo('cal',782,13,144,96,{a:P(ti+.3,.3)})});
 const t2=g('s8');box(X0,310,W0,122,t2,{col:GREEN},a=>{check(36,36,54,t2+.25,.25);txt('Nếu phải',130,54,{size:30});txt('đi làm ngày lễ:',130+tw('Nếu phải ',30),54,{size:30,a:P(g('k_e2a'),.2)});{const o=tw('hỏi rõ ',30),m2=tw('tiền lương làm thêm',30);hl(130+o-3,66,m2+6,38,(NOW-g('k_e2c')-1)/.35)}txt('hỏi rõ tiền lương làm thêm',130,94,{size:30,a:P(g('k_e2b'),.2)});txt('(Điều 98 Bộ luật Lao động)',130+tw('hỏi rõ tiền lương làm thêm  ',30),94,{size:22,w:600,col:GREY,a:P(g('k_e2c'),.2)})});
 const t3=g('s9');box(X0,448,W0,122,t3,{col:GREEN},a=>{check(36,36,54,t3+.25,.25);txt('Theo dõi thông báo lịch nghỉ',130,54,{size:30});txt('chính thức hằng năm',130+tw('Theo dõi thông báo lịch nghỉ ',30),54,{size:30,a:P(g('k_e3a'),.2)});{const o=tw('Vướng mắc: hỏi ',26),m2=tw('công đoàn, cơ quan lao động địa phương',26);hl(130+o-3,68,m2+6,34,(NOW-g('k_e3c')-1)/.35,'#bfe3c2')}txt('Vướng mắc: hỏi công đoàn,',130,94,{size:26,a:P(g('k_e3b'),.2)});txt('cơ quan lao động địa phương',130+tw('Vướng mắc: hỏi công đoàn, ',26),94,{size:26,a:P(g('k_e3c'),.2)})});
 source('Gợi ý chung, không thay cho tư vấn pháp lý.',1)}
function sI(t){const t0=g('out');box(240,140,800,380,t0,{lw:6},a=>{txt('LƯU Ý',400,70,{size:30,col:RED,align:'center',ls:4});
 txt('Nội dung chỉ mang tính thông tin,',400,138,{size:36,w:600,f:'LoraV',align:'center'});txt('không phải tư vấn pháp lý.',400,186,{size:36,w:600,f:'LoraV',align:'center',a:P(g('k_kp'),.25)});
 txt('Luật sửa đổi Bộ luật Lao động và 4 luật khác',400,246,{size:20,w:600,align:'center'});txt('thông qua 21/11/2026 · hiệu lực 01/3/2027 · số hiệu: chờ công bố chính thức',400,276,{size:18,w:600,col:GREY,align:'center'});
 txt('Kiểm tra văn bản gốc: vbpl.vn · thuvienphapluat.vn',400,330,{size:22,w:600,col:BLUE,align:'center',a:P(g('k_src'),.3)})});
 source(SRC2+'  ·  Ảnh minh họa: Unsplash',1)}
defineEpisode({header:'Luật sửa đổi Bộ luật Lao động và 4 luật khác  ·  thông qua 21/11/2026  ·  hiệu lực 01/3/2027',
 images:{cal:'img/calendar.jpg',gavel:'img/gavel.jpg'},
 scenes:[[0,sA],[()=>g('s1')-.15,sB],[()=>g('s2')-.15,sC],[()=>g('s3')-.15,sD],[()=>g('s4')-.15,sE],[()=>g('s5')-.15,sF],[()=>g('s6')-.15,sG],[()=>g('s7')-.15,sH],[()=>g('out')-.15,sI]]});
