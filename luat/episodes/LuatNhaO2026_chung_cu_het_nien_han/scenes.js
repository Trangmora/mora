// Tập: Luật Nhà ở (sửa đổi) 2026, góc "chung cư hết niên hạn, chủ căn hộ có mất nhà không". Nghiêm túc, một vấn đề, khoảng 2 phút 8 giây.
const SRC1='Nguồn: Báo Xây dựng, VOV, LuatVietnam, Nhân Dân (21–22/11/2026)';
const SRC2='Nguồn: Tiền Phong, Vietstock, Đời sống & Pháp luật, Báo Pháp luật, VTV (22–24/11/2026). Chờ đối chiếu văn bản chính thức.';
const SOHIEU='Số hiệu luật: chờ công bố chính thức';
function neq(cx,cy,a,size=80){txt('≠',cx,cy,{size,col:RED,align:'center',a})}
function strike(px,py,w,p){if(p<=0)return;x.save();x.strokeStyle=RED;x.lineWidth=6;x.lineCap='round';x.beginPath();x.moveTo(px,py);x.lineTo(px+w*ease(p),py-6*ease(p));x.stroke();x.restore()}
function sA(t){
 photoCard('old',70,170,400,380,.1,{rot:-.035});
 txt('LUẬT NHÀ Ở (SỬA ĐỔI)',520,190,{size:22,col:GREY,ls:3,a:P(.4,.25)});
 txt('Chung cư hết niên hạn,',520,252,{size:50,a:P(.5,.2)});
 txt('chủ căn hộ có mất nhà?',520,314,{size:50,col:RED,a:P(g('k_q'),.2)});
 box(520,356,690,190,g('k_het')-.1,{lw:6},a=>{txt('Hết thời hạn sử dụng',34,64,{size:34});txt('KHÔNG CÓ NGHĨA LÀ',34,108,{size:20,col:GREY,ls:3,a:P(g('k_ko'),.2)});txt('Tự động mất quyền sở hữu',34,160,{size:38,col:RED,a:P(g('k_ko')+.4,.2)})});
 source(SRC2,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('CHUNG CƯ HẾT NIÊN HẠN',310,62,{size:36,align:'center'})});
 const bx=[60,465,870],lab=[['Niên hạn','là gì?'],['Hết niên hạn','xử lý thế nào?'],['Bạn nên','làm gì?']],ph=['block','old','keys'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO? KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_qh')-.05,{},a=>{photo('gavel',14,14,322,140);txt('QUỐC HỘI THÔNG QUA',175,196,{size:21,col:GREY,align:'center',ls:1});txt('21/11/2026',175,254,{size:46,align:'center',a:P(g('k_ngay'),.2)});txt('Luật Nhà ở (sửa đổi)',175,296,{size:21,w:600,col:GREY,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_phieu')-.3,.2);
 box(468,y,350,h,g('k_phieu'),{},a=>{txt('PHIẾU TÁN THÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('467',175,196,{size:120,align:'center'});txt('trên 485 đại biểu',175,250,{size:25,w:600,align:'center'});txt('tham gia biểu quyết',175,284,{size:25,w:600,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/7/2027',175,270,{size:54,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 txt(SOHIEU,640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl')+.7,.3)});
 source(SRC1,1)}
function sT(t){const t0=g('s2');title(null,'HAI KHÁI NIỆM KHÁC NHAU',t0);
 box(60,180,520,330,g('k_a1')-.2,{lw:6},a=>{photo('old',14,14,492,120);txt('THỜI HẠN SỬ DỤNG (NIÊN HẠN)',26,176,{size:20,col:RED,ls:2});txt('Tuổi thọ của tòa nhà',26,224,{size:34,a:P(g('k_a2'),.2)});
  txt('Theo hồ sơ thiết kế',26,268,{size:24,w:600,a:P(g('k_a3'),.2)});txt('và pháp luật về xây dựng',26,302,{size:24,w:600,a:P(g('k_a3')+.6,.2)})});
 neq(640,370,P(g('k_a4')-.2,.2),96);
 box(700,180,520,330,g('k_a4'),{lw:6},a=>{photo('keys',14,14,492,120);txt('QUYỀN SỞ HỮU',26,176,{size:20,col:RED,ls:2});txt('Quyền của bạn',26,224,{size:34,a:P(g('k_a5'),.2)});txt('với căn hộ',26,268,{size:34,a:P(g('k_a5'),.2)})});
 source('Diễn giải bằng lời thường. '+SRC2,1)}
function sH(t){const t0=g('s3');title(null,'HIỆN NAY THẾ NÀO?',t0,{sub:'Theo Luật Nhà ở năm 2023'});
 box(100,190,700,330,g('s3')+.3,{col:GREY},a=>{icon('paper',24,24,100,g('k_h1'),.5);txt('LUẬT NHÀ Ở 2023',150,62,{size:21,col:GREY,ls:2});
  txt('Chỉ quy định thời hạn sử dụng',150,120,{size:30,a:P(g('k_h1'),.2)});txt('nhà chung cư',150,160,{size:30,a:P(g('k_h1'),.2)});
  txt('Tính từ khi nghiệm thu,',30,236,{size:28,w:600,a:P(g('k_h2'),.2)});txt('đưa vào sử dụng',30,276,{size:28,w:600,a:P(g('k_h2')+.4,.2)})});
 stamp('KHÔNG GHI',1010,300,P(g('k_h3'),.35),{size:44,rot:-.08});stamp('THỜI HẠN SỞ HỮU',1010,380,P(g('k_h3')+.5,.35),{size:30,rot:-.08});
 source('Nguồn: Luật Nhà ở 2023 (Luật số 27/2023/QH15), Điều 58.',1)}
function sD(t){const t0=g('s4');title(null,'TỪNG CÓ ĐỀ XUẤT KHÁC',t0,{sub:'Trong quá trình soạn thảo, không phải nội dung luật'});
 box(100,190,1080,130,g('k_d1')-.1,{col:GREY},a=>{txt('DỰ THẢO TỪNG ĐỀ XUẤT',30,46,{size:21,col:GREY,ls:2});const s='Chấm dứt sở hữu khi hết niên hạn và bị phá dỡ';txt(s,30,98,{size:32});strike(24,88,tw(s,32)+14,P(g('k_d3')+.4,.4))});
 box(100,350,440,110,g('k_d2'),{},a=>{txt('Gây nhiều lo lắng',220,68,{size:32,align:'center'})});
 arrow(560,405,640,405,g('k_d3')-.3,.2);
 box(650,340,530,140,g('k_d3'),{col:GREEN,lw:6},a=>{txt('LUẬT ĐƯỢC THÔNG QUA',30,46,{size:21,col:GREEN,ls:2});txt('Không theo hướng này',30,104,{size:36})});
 source('Nguồn: VnExpress (đề xuất ở dự thảo); Vietnamnet, Tiền Phong, Đời sống & Pháp luật. Chờ đối chiếu văn bản chính thức.',1)}
function sN(t){const t0=g('s5');title(null,'LUẬT MỚI LÀM RÕ',t0);
 box(80,180,450,150,g('k_n1')-.2,{},a=>{txt('Tuổi thọ',225,66,{size:40,align:'center'});txt('công trình',225,116,{size:40,align:'center'})});
 txt('TÁCH KHỎI',640,268,{size:26,col:RED,align:'center',ls:3,a:P(g('k_n2'),.2)});
 box(750,180,450,150,g('k_n2')+.2,{},a=>{txt('Quyền',225,66,{size:40,align:'center'});txt('tài sản',225,116,{size:40,align:'center'})});
 box(140,380,1000,160,g('k_n3'),{lw:6},a=>{txt('Hết thời hạn sử dụng',500,66,{size:36,align:'center'});txt('KHÔNG PHẢI thời điểm quyền sở hữu chấm dứt',500,122,{size:30,col:RED,align:'center',a:P(g('k_n4'),.2)})});
 source(SRC2,1)}
function sK(t){const t0=g('s6');title(null,'HẾT NIÊN HẠN: XỬ LÝ THẾ NÀO?',t0);
 box(60,180,330,140,t0+.2,{},a=>{icon('calendar',20,24,90,t0+.3,.5);txt('Hết thời hạn',120,70,{size:26});txt('sử dụng',120,106,{size:26})});
 arrow(398,250,452,250,g('k_k1')-.3,.2);
 box(460,180,360,140,g('k_k1'),{lw:6},a=>{icon('shield',20,24,90,g('k_k1')+.1,.5);txt('Kiểm định',120,70,{size:28});txt('chất lượng',120,106,{size:28})});
 arrow(830,220,900,200,g('k_k2')-.2,.2);
 box(905,160,330,130,g('k_k2'),{col:GREEN},a=>{txt('VẪN AN TOÀN',24,42,{size:20,col:GREEN,ls:2});txt('Tiếp tục',24,84,{size:30,a:P(g('k_k3'),.2)});txt('được sử dụng',24,118,{size:30,a:P(g('k_k3'),.2)})});
 arrow(830,290,900,350,g('k_p1')-.2,.2);
 box(905,320,330,150,g('k_p1'),{},a=>{txt('KHÔNG AN TOÀN',24,42,{size:20,col:RED,ls:2});txt('Có thể phải phá dỡ,',24,84,{size:24,a:P(g('k_p2'),.2)});txt('cải tạo, xây lại',24,118,{size:24,a:P(g('k_p2')+.6,.2)})});
 arrow(900,420,620,420,g('k_p3')-.3,.25);
 box(240,370,370,110,g('k_p3'),{lw:6},a=>{icon('coin',16,14,80,g('k_p3')+.2,.5);txt('Bồi thường,',110,48,{size:28});txt('tái định cư',110,86,{size:28})});
 box(140,510,1000,70,g('k_p4'),{},a=>{txt('CÒN CHỜ',30,45,{size:19,col:RED,ls:2});txt('Văn bản hướng dẫn chi tiết cách xử lý',150,45,{size:22,w:600})});
 source(SRC2+' Bồi thường, tái định cư: Luật Nhà ở 2023, Chương V.',1)}
function sW(t){const t0=g('s8');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 box(100,180,500,230,g('k_w1')-.1,{},a=>{photo('old',14,14,472,120);txt('Chủ căn hộ',250,176,{size:30,align:'center'});txt('ở chung cư cũ',250,212,{size:30,align:'center'})});
 box(680,180,500,230,g('k_w2')-.1,{},a=>{photo('keys',14,14,472,120);txt('Người đang tính',250,176,{size:30,align:'center'});txt('mua căn hộ',250,212,{size:30,align:'center'})});
 box(390,450,500,100,g('k_w3')-.1,{lw:6},a=>{txt('TỪ 01/7/2027',250,66,{size:44,col:RED,align:'center'})});
 source(SRC1,1)}
function sE(t){vxTodo(g('s9'),[[g('k_e1'),'Đừng hoảng: niên hạn tòa nhà','khác với quyền sở hữu của bạn'],[g('s10'),'Giữ kỹ giấy chứng nhận','và hợp đồng mua bán căn hộ'],[g('s11'),'Dự hội nghị nhà chung cư,','giám sát việc dùng kinh phí bảo trì'],[g('s12'),'Mua căn hộ cũ: hỏi năm xây dựng,','kết quả kiểm định gần nhất']]);
 underline(300,172+80,tw('khác với quyền sở hữu của bạn',26),g('k_e1b'),.4,{col:GREEN});underline(300,172+3*108+80,tw('kết quả kiểm định gần nhất',26),g('k_e4b')+1,.4,{col:GREEN})}
function sF(t){vxDisclaimer(g('out'),'Luật Nhà ở (sửa đổi) · thông qua 21/11/2026 · hiệu lực 01/7/2027',SOHIEU,g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật Nhà ở (sửa đổi)  ·  thông qua 21/11/2026  ·  hiệu lực 01/7/2027',
 images:{old:'img/old.jpg',block:'img/block.jpg',keys:'img/keys.jpg',gavel:'img/gavel.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sT],[()=>g('s3')-.15,sH],[()=>g('s4')-.15,sD],[()=>g('s5')-.15,sN],[()=>g('s6')-.15,sK],[()=>g('s8')-.15,sW],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
