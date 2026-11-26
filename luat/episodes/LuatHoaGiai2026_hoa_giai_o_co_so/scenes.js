// Tập: Luật Hòa giải ở cơ sở 2026 (Luật số 16/2026/QH16), góc "mâu thuẫn hàng xóm: hòa giải, trực tuyến, tòa án công nhận". Nghiêm túc, khoảng 2 phút 12 giây.
const SRC1='Nguồn: LuatVietnam, Tạp chí Tòa án, Tạp chí Luật sư Việt Nam, Báo Quảng Ninh (24–25/8/2026)';
const SRC2='Nguồn: Tạp chí Tòa án, Dân chủ & Pháp luật, Hà Nội Mới, LuatVietnam, Báo Hải Phòng. Chờ đối chiếu văn bản chính thức.';
const SOHIEU='Luật số 16/2026/QH16';
function chip(s,px,py,t0,size=24,o={}){const w=tw(s,size)+40;box(px,py,w,58,t0,{lw:3,r:29,...o},a=>{txt(s,w/2,39,{size,align:'center'})});return w}
function sA(t){
 photoCard('alley',70,170,400,380,.1,{rot:-.035});
 stamp('TỪ 01/3/2027',1060,128,P(g('k_tu'),.4),{size:30,rot:.05});
 txt('LUẬT HÒA GIẢI Ở CƠ SỞ 2026',520,186,{size:22,col:GREY,ls:3,a:P(.4,.25)});
 txt('Mâu thuẫn với hàng xóm?',520,246,{size:46,a:P(.5,.2)});
 let px=520;px+=chip('Lối đi',px,270,g('k_lo'))+12;px+=chip('Tiếng ồn',px,270,g('k_on'))+12;chip('Nước thải',px,270,g('k_nt'));
 box(520,350,680,190,g('k_hg'),{lw:6},a=>{txt('Hòa giải ở tổ dân phố',30,58,{size:34});txt('Kể cả trực tuyến',30,106,{size:28,w:600,a:P(g('k_tt'),.2)});txt('Đề nghị tòa án công nhận kết quả',30,154,{size:28,col:RED,a:P(g('k_ta'),.2)})});
 source(SRC2,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('HÒA GIẢI Ở CƠ SỞ',310,62,{size:36,align:'center'})});
 const bx=[60,465,870],lab=[['Hòa giải ở cơ sở','là gì?'],['Luật mới','thay đổi gì?'],['Bạn nên','làm gì?']],ph=['alley','gavel','phone'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO? KHI NÀO?',t0,{sub:'Luật Hòa giải ở cơ sở 2026 · 5 chương, 35 điều · thay thế luật năm 2013'});
 const y=186,h=330;
 box(50,y,350,h,t0+.3,{lw:6},a=>{txt('SỐ HIỆU',175,58,{size:21,col:GREY,align:'center',ls:1});icon('paper',115,78,120,t0+.5,.5);txt('16/2026/QH16',175,262,{size:38,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{photo('gavel',14,14,322,110);txt('THÔNG QUA 24/8/2026',175,160,{size:24,align:'center'});txt('471',175,250,{size:90,align:'center',a:P(g('k_phieu'),.2)});txt('trên 472 phiếu tán thành',175,292,{size:22,w:600,align:'center',a:P(g('k_phieu'),.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/3/2027',175,270,{size:54,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 source(SRC1,1)}
function sD(t){const t0=g('s2');title(null,'HÒA GIẢI Ở CƠ SỞ LÀ GÌ?',t0);
 photoCard('alley',70,180,380,300,t0+.2,{rot:-.03});
 box(500,180,700,180,g('k_d1')-.2,{lw:6},a=>{txt('HÒA GIẢI VIÊN Ở THÔN, TỔ DÂN PHỐ',30,48,{size:20,col:GREY,ls:2});txt('Giúp các bên tự nguyện thỏa thuận',30,104,{size:30,a:P(g('k_d2'),.2)});txt('giải quyết mâu thuẫn, tranh chấp nhỏ',30,146,{size:30,a:P(g('k_d2')+.8,.2)})});
 txt('VÍ DỤ',500,428,{size:21,col:GREY,ls:3,a:P(g('k_d3'),.2)});
 let px=600;px+=chip('Lối đi',px,392,g('k_d3')+.4)+12;px+=chip('Tiếng ồn, nước thải',px,392,g('k_d4'))+12;
 chip('Mâu thuẫn trong gia đình',600,464,g('k_d5'));
 source('Diễn giải bằng lời thường. Căn cứ: Luật Hòa giải ở cơ sở 2013 (Luật số 35/2013/QH13), Điều 2, Điều 3.',1)}
function sH(t){const t0=g('s3');title(null,'HIỆN NAY THẾ NÀO?',t0,{sub:'Theo Luật Hòa giải ở cơ sở năm 2013'});
 box(100,190,1080,130,g('k_h1')-.3,{col:GREY},a=>{icon('bubble',24,18,96,g('k_h1'),.5);txt('Hòa giải chủ yếu tiến hành trực tiếp',150,76,{size:34})});
 box(100,350,1080,150,g('k_h2'),{col:GREY},a=>{icon('paper',24,26,96,g('k_h2'),.5);txt('Chưa ghi nhận trực tiếp quyền đề nghị',150,66,{size:32});txt('tòa án công nhận kết quả hòa giải thành',150,110,{size:32})});
 source('Nguồn: Tạp chí Tòa án, LuatVietnam (so sánh với luật năm 2013). Thủ tục công nhận hiện có ở Bộ luật Tố tụng dân sự 2015, Chương XXXIII.',1)}
function sN(t){const t0=g('s4');title(null,'ĐIỂM MỚI 1: HÒA GIẢI TRỰC TUYẾN',t0);
 const L=[['Trực tiếp','bubble',t0+.6],['Trực tuyến','phone',g('k_n1a')],['Kết hợp','calendar',g('k_n1b')]];
 L.forEach(([s,ic,ti],i)=>{box(100+i*370,190,320,220,ti-.1,i==1?{lw:6}:{},a=>{icon(ic,110,20,100,ti,.5);txt(s,160,180,{size:36,col:i==1?RED:INK,align:'center'})})});
 box(240,450,800,90,g('k_n1c'),{},a=>{txt('Lần đầu có cơ sở pháp lý cho hòa giải trực tuyến',400,56,{size:28,align:'center'})});
 source(SRC2,1)}
function sT(t){const t0=g('s5');title(null,'ĐIỂM MỚI 2: TÒA ÁN CÔNG NHẬN',t0);
 box(60,200,330,150,g('k_n2'),{col:GREEN},a=>{txt('Hòa giải thành',165,70,{size:32,align:'center'});check(130,88,44,g('k_n2')+.3)});
 arrow(398,275,452,275,g('k_n2a')-.3,.2);
 box(460,200,360,150,g('k_n2a'),{lw:6},a=>{icon('shield',20,30,90,g('k_n2a')+.1,.5);txt('Đề nghị',120,70,{size:30});txt('tòa án công nhận',120,110,{size:26,w:600})});
 arrow(828,275,882,275,g('k_n2b')-.3,.2);
 box(890,200,330,150,g('k_n2b'),{},a=>{txt('Có giá trị pháp lý',165,64,{size:28,align:'center'});txt('Bảo đảm thi hành',165,110,{size:28,col:RED,align:'center',a:P(g('k_n2c'),.2)})});
 txt('Thủ tục: theo pháp luật tố tụng dân sự · một hoặc các bên đều có thể đề nghị',640,420,{size:24,w:600,align:'center',a:P(g('k_n2a')+1.2,.25)});
 source('Nguồn: Tạp chí Tòa án, LuatVietnam (2026). Chờ đối chiếu văn bản chính thức.',1)}
function sO(t){const t0=g('s6');title(null,'NGOÀI RA',t0);
 box(140,190,1000,110,g('k_o1')-.2,{},a=>{txt('Mở rộng đối tượng áp dụng · thay thế toàn bộ luật năm 2013',500,66,{size:28,align:'center'})});
 box(140,340,1000,110,g('k_o2'),{lw:6},a=>{txt('CÒN CHỜ',30,66,{size:20,col:RED,ls:2});txt('Hướng dẫn về hòa giải viên, kinh phí cho hoạt động hòa giải',150,66,{size:26,w:600})});
 source(SRC2,1)}
function sW(t){const t0=g('s7');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 const bx=[100,690],ic=['house','bubble'],lab=[['Người dân có mâu thuẫn','với hàng xóm, trong gia đình'],['Tổ hòa giải ở thôn,','tổ dân phố']],ts=[g('k_w1'),g('k_w2')];
 for(let i=0;i<2;i++){box(bx[i],180,490,220,ts[i]-.1,{},a=>{icon(ic[i],200,16,90,ts[i],.5);txt(lab[i][0],245,150,{size:26,align:'center'});txt(lab[i][1],245,186,{size:26,align:'center'})})}
 box(390,440,500,100,g('k_w3')-.1,{lw:6},a=>{txt('TỪ 01/3/2027',250,66,{size:44,col:RED,align:'center'})});
 source(SRC1,1)}
function sE(t){vxTodo(g('s8'),[[g('k_e1'),'Tranh chấp nhỏ: đề nghị tổ hòa giải','ở thôn, tổ dân phố trước khi khởi kiện'],[g('s9'),'Hòa giải thành: lập văn bản, cân nhắc','đề nghị tòa án công nhận'],[g('s10'),'Ở xa: có thể đề nghị hòa giải trực tuyến','từ 01/3/2027']]);
 underline(300,172+93+7,tw('ở thôn, tổ dân phố trước khi khởi kiện',30),g('k_e1b'),.4,{col:GREEN});underline(300,172+138+93+7,tw('đề nghị tòa án công nhận',30),g('k_e2b'),.4,{col:GREEN});underline(300,172+2*138+93+7,tw('từ 01/3/2027',30),g('k_e3b'),.4,{col:GREEN})}
function sF(t){vxDisclaimer(g('out'),'Luật Hòa giải ở cơ sở 2026 · thông qua 24/8/2026 · hiệu lực 01/3/2027',SOHIEU,g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật Hòa giải ở cơ sở 2026 (16/2026/QH16)  ·  thông qua 24/8/2026  ·  hiệu lực 01/3/2027',
 images:{alley:'img/alley.jpg',gavel:'img/gavel.jpg',phone:'img/phone.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sD],[()=>g('s3')-.15,sH],[()=>g('s4')-.15,sN],[()=>g('s5')-.15,sT],[()=>g('s6')-.15,sO],[()=>g('s7')-.15,sW],[()=>g('s8')-.15,sE],[()=>g('out')-.15,sF]]});
