// Tập: Nghị định 174/2026/NĐ-CP, phạt giả mạo thông tin thuê bao (kể cả 1 SIM) và các thủ đoạn lừa đảo công nghệ cao. Nghiêm túc, khoảng 2 phút 24 giây.
const SRC1='Nguồn: Báo Nhân Dân, Công an tỉnh Nghệ An, LuatVietnam, Thư viện Pháp luật. Nghị định đang có hiệu lực.';
const SRC2='Nguồn: Báo Nhân Dân, LuatVietnam, Dân Việt (Điều 34 Nghị định 174/2026/NĐ-CP). Chờ đối chiếu toàn văn.';
const SRC3='Nguồn: Báo Nhân Dân, Thanh Niên, LuatVietnam (khoản 10 Điều 34). Chờ đối chiếu toàn văn.';
function sA(t){
 photoCard('sim',70,170,400,390,.1,{rot:-.035});
 stamp('TỪ 01/7/2026',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Giả mạo thông tin thuê bao',520,236,{size:48,a:P(g('op1')+1.6,.2)});txt('dù chỉ 1 SIM cũng bị phạt',520,302,{size:48,col:RED,a:P(g('k_sim')-.1,.2)});
 underline(520,320,tw('dù chỉ 1 SIM cũng bị phạt',48),g('k_sim')+.3,.4);
 box(520,368,660,190,g('k_ai'),{lw:6},a=>{txt('DÙNG PHẦN MỀM, AI ĐỂ LÀM GIẢ',34,54,{size:24,col:GREY,ls:2});txt('ĐẾN 100 TRIỆU ĐỒNG',30,144,{size:54,col:RED,a:P(g('k_100')-.1,.2)})});
 source(SRC2,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('NGHỊ ĐỊNH 174/2026/NĐ-CP',310,62,{size:36,align:'center'})});
 const bx=[60,465,870],lab=[['Quy định ở','văn bản nào?'],['Các mức phạt','cụ thể'],['Bạn nên','làm gì?']],ph=['sim2','code','phone'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, TỪ KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_nd')-.25,{lw:6},a=>{txt('NGHỊ ĐỊNH CỦA CHÍNH PHỦ',175,58,{size:20,col:GREY,align:'center',ls:1});txt('174/2026',175,160,{size:56,col:RED,align:'center'});txt('/NĐ-CP',175,206,{size:30,align:'center'});
  txt('Xử phạt vi phạm hành chính:',175,262,{size:19,w:600,align:'center',a:P(g('k_xph'),.25)});txt('bưu chính, viễn thông, CNTT...',175,288,{size:19,w:600,align:'center',a:P(g('k_lv'),.25)})});
 arrow(408,y+h/2,460,y+h/2,g('k_bh')-.3,.2);
 box(468,y,350,h,g('k_bh'),{},a=>{icon('paper',115,40,120,g('k_bh')+.2,.5);txt('BAN HÀNH',175,210,{size:21,col:GREY,align:'center',ls:2});txt('15/5/2026',175,270,{size:52,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{icon('calendar',115,40,120,g('k_hl')+.2,.5);txt('CÓ HIỆU LỰC TỪ',175,210,{size:21,col:GREY,align:'center',ls:2});txt('01/7/2026',175,270,{size:52,col:RED,align:'center'})});
 stamp('ĐANG ÁP DỤNG',1060,566,P(g('k_ap'),.4),{size:30,rot:-.06,col:GREEN});
 source(SRC1,1)}
function chip(s,px,py,t0){const w=tw(s,26)+44;box(px,py,w,62,t0,{lw:3,r:31},a=>{txt(s,w/2,41,{size:26,align:'center'})});return w}
function sB(t){const t0=g('s2');title(null,'THAY THẾ PHẦN LỚN NGHỊ ĐỊNH 15/2020',t0);
 box(60,186,500,230,g('k_15')-.3,{col:GREY},a=>{txt('QUY ĐỊNH CŨ',34,50,{size:22,col:GREY,ls:3});txt('Nghị định 15/2020',34,120,{size:44});txt('(đã sửa đổi năm 2022)',34,170,{size:24,w:600,col:GREY})});
 arrow(570,300,690,300,g('k_tang')-.3,.22);
 box(700,186,520,230,g('k_tang'),{lw:6},a=>{txt('QUY ĐỊNH MỚI',34,50,{size:22,col:RED,ls:3});txt('Nghị định 174/2026',34,120,{size:44});txt('Tăng mức phạt với',34,170,{size:28,w:600});txt('lừa đảo công nghệ cao',34,204,{size:28,col:RED})});
 txt('NHẮM VÀO',60,488,{size:22,col:GREY,ls:3,a:P(g('k_t1')-.2,.2)});
 let px=230;px+=chip('SIM không chính chủ',px,450,g('k_t1'))+18;px+=chip('Trang mạng giả mạo',px,450,g('k_t2'))+18;chip('Tin sai sự thật',px,450,g('k_t3'));
 source(SRC1,1)}
function sC(t){const t0=g('s3');title(null,'SIM CHÍNH CHỦ LÀ GÌ?',t0);
 box(60,186,540,330,g('k_cc')-.2,{col:GREEN,lw:6},a=>{txt('SIM CHÍNH CHỦ',34,52,{size:24,col:GREEN,ls:3});icon('phone',30,80,140,g('k_cc'),.5);icon('paper',170,90,120,g('k_cc')+.4,.5);check(320,130,60,g('k_cc')+.9);
  txt('Đăng ký đúng giấy tờ',34,262,{size:32});txt('của người thật sự sử dụng',34,302,{size:32,a:P(g('k_cc2'),.2)})});
 box(680,186,540,330,g('k_ld'),{lw:6},a=>{txt('SIM ĐỨNG TÊN NGƯỜI KHÁC',34,52,{size:24,col:RED,ls:2});photo('phone',34,76,472,150);
  txt('Thủ đoạn hay gặp của',34,262,{size:32});txt('kẻ lừa đảo: khó bị lần ra',34,302,{size:32,col:RED,a:P(g('k_ld2'),.2)})});
 source('Minh họa khái niệm. Nguồn: Báo Nhân Dân, LuatVietnam.',1)}
function lvl(y,lab,val,unit,t0,o={}){box(400,y,820,112,t0,o,a=>{txt(lab,30,44,{size:22,col:GREY,ls:1});txt(val,30,94,{size:40,col:RED});txt(unit,40+tw(val,40),94,{size:24,w:600})})}
function sS(t){const t0=g('s4');title(null,'GIẢ MẠO THÔNG TIN THUÊ BAO',t0,{sub:'Điều 34 Nghị định 174/2026/NĐ-CP'});
 box(50,190,320,140,g('k_truoc')-.2,{col:GREY},a=>{txt('TRƯỚC ĐÂY',30,44,{size:20,col:GREY,ls:2});txt('Thường chỉ xử lý',30,86,{size:26});txt('khi số lượng lớn',30,118,{size:26,col:RED,a:P(g('k_lon'),.2)})});
 box(50,350,320,190,g('k_nay'),{lw:6},a=>{txt('NAY',30,44,{size:20,col:RED,ls:2});txt('Giả mạo, dùng giấy tờ',30,84,{size:22,w:600});txt('người khác đăng ký',30,112,{size:22,w:600});txt('Từ 1 SIM',30,166,{size:44,col:RED,a:P(g('k_1sim'),.2)})});
 lvl(200,'TỪ 1 ĐẾN 10 SỐ THUÊ BAO','200.000 – 500.000 đ',g('k_moi')<=NOW?'/ mỗi số':'',g('k_110'));
 const pa=P(g('k_nhieu'),.3);if(pa>0){txt('Càng nhiều số, mức phạt càng cao',810,368,{size:24,w:600,align:'center',a:pa});arrow(810,382,810,410,g('k_nhieu')+.2,.2)}
 lvl(418,'TỪ 501 SỐ THUÊ BAO TRỞ LÊN','30 – 50 triệu đồng','',g('k_501'),{lw:6});
 source(SRC2+' Các bậc ở giữa: báo chí ghi chưa thống nhất.',1)}
function sAI(t){const t0=g('s6');title(null,'MỨC NẶNG NHẤT: DÙNG PHẦN MỀM, AI',t0,{sub:'Khoản 10 Điều 34 Nghị định 174/2026/NĐ-CP'});
 photoCard('phone',60,190,360,330,g('k_ai1'),{rot:-.03});
 box(470,186,750,170,g('k_ai2')-.2,{},a=>{txt('LÀM GIẢ KHI ĐĂNG KÝ THUÊ BAO',30,46,{size:21,col:GREY,ls:2});
  let px=30;['Giấy tờ','Ảnh chân dung','Khuôn mặt'].forEach((s,i)=>{const ti=g('k_ai2')+.3+i*.45,w=tw(s,28)+40;box(px,72,w,62,ti,{lw:3,r:31},b=>{txt(s,w/2,41,{size:28,align:'center'})});px+=w+16})});
 arrow(845,364,845,392,g('k_ai3')-.25,.2);
 box(470,398,750,150,g('k_ai3'),{lw:7},a=>{txt('80 – 100 triệu đồng',30,84,{size:58,col:RED});txt('Nếu chưa đến mức truy cứu trách nhiệm hình sự',30,126,{size:21,w:600,a:P(g('k_ai4'),.25)})});
 source(SRC3,1)}
function sW(t){const t0=g('s7');title(null,'TRANG THÔNG TIN ĐIỆN TỬ GIẢ MẠO',t0,{sub:'Theo báo Nhân Dân'});
 photoCard('code',60,190,420,320,g('k_web')-.2,{rot:.02});
 box(530,186,690,120,g('k_web'),{},a=>{txt('Giả mạo cơ quan,',30,52,{size:32});txt('tổ chức, cá nhân',30,96,{size:32})});
 box(530,330,320,180,g('k_web3'),{col:GREY},a=>{txt('TRƯỚC ĐÂY',30,44,{size:20,col:GREY,ls:2});txt('20 – 30',30,110,{size:52,col:GREY});txt('triệu đồng',30,150,{size:24,w:600,col:GREY});
  sketch([seg(24,96,230,80,7)],g('k_web3')+.4,.3,{col:RED,lw:5})});
 box(900,330,320,180,g('k_web2'),{lw:6},a=>{txt('NAY',30,44,{size:20,col:RED,ls:2});txt('30 – 40',30,110,{size:52,col:RED});txt('triệu đồng',30,150,{size:24,w:600})});
 source('Nguồn: Báo Nhân Dân, "Tăng mức xử phạt hàng loạt thủ đoạn lừa đảo công nghệ cao" (đăng lại: Báo Tuyên Quang, An ninh Thủ đô).',1)}
function sN(t){const t0=g('s8');title(null,'VI PHẠM TRÊN MẠNG XÃ HỘI',t0,{sub:'Điều 95 Nghị định 174/2026/NĐ-CP'});
 box(60,190,560,330,g('k_xp'),{},a=>{icon('bubble',30,60,110,g('k_xp')+.1,.5);txt('Xúc phạm danh dự,',160,110,{size:30});txt('nhân phẩm người khác',160,148,{size:30});
  txt('CÁ NHÂN',34,226,{size:20,col:GREY,ls:2});txt('10 – 15 triệu đồng',34,284,{size:46,col:RED,a:P(g('k_xp2')-.1,.2)})});
 box(660,190,560,330,g('k_tg'),{lw:6},a=>{icon('phone',30,60,110,g('k_tg')+.1,.5);txt('Tin sai sự thật',160,110,{size:30});txt('gây hoang mang',160,148,{size:30});
  txt('MỨC CAO NHẤT',34,226,{size:20,col:GREY,ls:2});txt('Tới 50 triệu đồng',34,284,{size:46,col:RED,a:P(g('k_tg2')-.1,.2)})});
 source('Nguồn: VnExpress, VnEconomy, Thư viện Pháp luật, LuatVietnam. Chờ đối chiếu toàn văn.',1)}
function sL(t){const t0=g('s9');title(null,'CẦN LƯU Ý',t0);
 const it=[[g('k_l1'),'Cá nhân và tổ chức','có thể chịu mức phạt khác nhau'],[g('k_l2'),'Hành vi trước 01/7/2026','xử lý theo quy định cũ (NĐ 15/2020)',g('k_l2b')],[g('k_l3'),'Trường hợp nghiêm trọng','có thể bị xử lý hình sự']];
 it.forEach(([ti,a1,a2,t2],i)=>{const y=180+i*130;box(170,y,940,112,ti,i==2?{lw:6}:{},a=>{badge(i+1,52,56,ti+.15,24);txt(a1,110,48,{size:32});txt(a2,110,88,{size:26,w:600,col:GREY,a:t2?P(t2,.25):1})})});
 source('Nguồn: LuatVietnam, Thư viện Pháp luật (điều khoản chuyển tiếp, khoản 3 Điều 4). Chờ đối chiếu toàn văn.',1)}
function sE(t){vxTodo(g('s10'),[[g('k_e1'),'Kiểm tra SIM đã đúng thông tin chính chủ,','cập nhật khi đổi giấy tờ tùy thân'],[g('s11'),'Không cho mượn giấy tờ để đăng ký SIM,','không mua SIM đã kích hoạt sẵn'],[g('s12'),'Trước khi chia sẻ tin trên mạng:','kiểm tra nguồn chính thống']])}
function sF(t){vxDisclaimer(g('out'),'Nghị định 174/2026/NĐ-CP · ban hành 15/5/2026 · hiệu lực 01/7/2026','Đang có hiệu lực',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Nghị định 174/2026/NĐ-CP  ·  ban hành 15/5/2026  ·  hiệu lực 01/7/2026',
 images:{sim:'img/sim.jpg',sim2:'img/sim2.jpg',phone:'img/phone.jpg',code:'img/code.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sC],[()=>g('s4')-.15,sS],[()=>g('s6')-.15,sAI],[()=>g('s7')-.15,sW],[()=>g('s8')-.15,sN],[()=>g('s9')-.15,sL],[()=>g('s10')-.15,sE],[()=>g('out')-.15,sF]]});
