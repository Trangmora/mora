// Tập: Luật Hộ tịch (sửa đổi) 2026: đăng ký khai sinh, kết hôn không phụ thuộc nơi cư trú. Nghiêm túc, khoảng 2 phút 8 giây.
const SRC1='Nguồn: Cổng TTĐT Chính phủ (Xây dựng chính sách), Báo Chính phủ, VOH, Tạp chí Công Thương (23/4/2026)';
const SRC2='Nguồn: Xây dựng chính sách, Báo Xây dựng, Người Đưa Tin, Thư viện Pháp luật (bất kỳ xã nào); Soha, Báo Pháp luật (trong tỉnh)';
function sA(t){
 photoCard('baby',70,170,380,390,.1,{rot:-.035});
 stamp('TỪ 01/3/2027',1050,128,P(.35,.4),{size:30,rot:.05});
 txt('Khai sinh, kết hôn',500,236,{size:54,a:P(g('k_ks')-.1,.2)});txt('không phụ thuộc',500,306,{size:54,col:RED,a:P(g('k_ct')-.1,.2)});
 underline(500,324,tw('không phụ thuộc',54),g('k_ct')+.3,.4);
 box(500,372,660,186,g('k_ct')+.4,{lw:6},a=>{txt('LUẬT HỘ TỊCH (SỬA ĐỔI)',34,54,{size:24,col:GREY,ls:2});txt('nơi cư trú',30,144,{size:72,col:RED})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('ĐĂNG KÝ KHAI SINH, KẾT HÔN',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Luật mới','nói gì?'],['Điểm nào','chưa thống nhất?'],['Bạn nên','làm gì?']],ph=['gavel','rings','baby'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_luat')-.25,{lw:6},a=>{photo('gavel',14,14,322,120);txt('LUẬT',175,180,{size:22,col:GREY,align:'center',ls:3});txt('Hộ tịch',175,236,{size:50,col:RED,align:'center'});txt('(sửa đổi)',175,280,{size:28,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{txt('QUỐC HỘI THÔNG QUA',175,58,{size:21,col:GREY,align:'center',ls:1});icon('paper',125,78,100,g('k_qh')+.2,.5);txt('23/4/2026',175,236,{size:46,align:'center'});txt('488/492 đại biểu tán thành',175,286,{size:22,w:600,col:GREY,align:'center',a:P(g('k_phieu'),.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',125,78,100,g('k_hl')+.2,.5);txt('01/3/2027',175,236,{size:50,col:RED,align:'center'});txt('Thay thế Luật Hộ tịch 2014',175,286,{size:21,w:600,col:GREY,align:'center',a:P(g('k_tt'),.2)})});
 txt('Số hiệu: 03/2026/QH16 (theo Thư viện Pháp luật, chờ đối chiếu Công báo)',640,560,{size:19,w:600,col:GREY,align:'center',a:P(g('k_tt')+.6,.3)});
 source(SRC1,1)}
function chip(s,px,py,t0){const w=tw(s,28)+48;box(px,py,w,66,t0,{lw:3,r:33},a=>{txt(s,w/2,44,{size:28,align:'center'})});return w}
function sB(t){const t0=g('s2');title(null,'HỘ TỊCH LÀ GÌ?',t0);
 box(60,180,1160,120,t0+.3,{lw:6},a=>{txt('Những sự kiện gắn với nhân thân của mỗi người',34,74,{size:38})});
 let px=60;px+=chip('Được sinh ra',px,340,g('k_ht1'))+24;px+=chip('Kết hôn',px,340,g('k_ht2'))+24;chip('Qua đời',px,340,g('k_ht3'));
 box(60,450,1160,110,g('k_ht4'),{col:GREY},a=>{txt('ĐĂNG KÝ HỘ TỊCH',34,44,{size:21,col:GREY,ls:2});txt('Cơ quan nhà nước ghi nhận các sự kiện đó',34,88,{size:32})});
 source('Nguồn: Luật Hộ tịch 2014, Điều 2 (khái niệm hộ tịch, đăng ký hộ tịch).',1)}
function sH(t){const t0=g('s3');title(null,'HIỆN NAY: GẮN VỚI NƠI CƯ TRÚ',t0,{sub:'Luật Hộ tịch 2014, áp dụng đến hết 28/02/2027'});
 box(60,196,540,320,g('k_c1')-.2,{col:GREY},a=>{photo('baby',14,14,512,150);txt('KHAI SINH',30,206,{size:22,col:GREY,ls:3});txt('UBND xã nơi cư trú',30,252,{size:32});txt('của cha hoặc mẹ',30,292,{size:32})});
 box(680,196,540,320,g('k_c2'),{col:GREY},a=>{photo('rings',14,14,512,150);txt('KẾT HÔN',30,206,{size:22,col:GREY,ls:3});txt('UBND xã nơi cư trú',30,252,{size:32});txt('của một trong hai bên',30,292,{size:32})});
 source('Nguồn: Luật Hộ tịch 2014, Điều 13 và Điều 17 (văn bản hiện hành).',1)}
function sN(t){const t0=g('s4');title(null,'LUẬT MỚI: KHÔNG PHỤ THUỘC NƠI CƯ TRÚ',t0);
 box(140,190,1000,330,g('k_n1')-.2,{lw:7},a=>{icon('house',60,70,150,g('k_n1'),.5);txt('UBND CẤP XÃ CÓ THẨM QUYỀN',250,90,{size:22,col:GREY,ls:2});txt('Đăng ký khai sinh, kết hôn',250,150,{size:40});
  txt('không phụ thuộc nơi cư trú',250,214,{size:40,col:RED,a:P(g('k_n2'),.2)});txt('của người yêu cầu',250,262,{size:30,w:600,a:P(g('k_n2')+.5,.2)})});
 source(SRC1+'; Báo Xây dựng; Thư viện Pháp luật (Điều 8 theo báo chí)',1)}
function sX(t){const t0=g('s5');title(null,'ĐIỂM CHƯA THỐNG NHẤT',t0,{sub:'Phạm vi: bất kỳ xã nào, hay chỉ trong tỉnh?'});
 box(60,196,540,250,g('k_x1')-.2,{},a=>{txt('NHIỀU BÀI BÁO VIẾT',30,52,{size:21,col:GREY,ls:2});txt('"Bất kỳ xã nào"',30,128,{size:44});txt('Không nêu giới hạn trong tỉnh',30,184,{size:22,w:600,col:GREY})});
 box(680,196,540,250,g('k_x2'),{},a=>{txt('MỘT SỐ BÀI KHÁC VIẾT',30,52,{size:21,col:GREY,ls:2});txt('"Trên địa bàn tỉnh"',30,128,{size:44});txt('Có bài viết từ giai đoạn dự thảo',30,184,{size:22,w:600,col:GREY})});
 stamp('CHƯA THỐNG NHẤT',1060,120,P(g('k_x2')+1.4,.4),{size:28,rot:.05});
 box(240,474,800,90,g('k_x3'),{lw:6,col:GREEN},a=>{txt('Đăng ký ở tỉnh khác: hãy hỏi trước',400,58,{size:32,col:GREEN,align:'center'})});
 source(SRC2,1)}
function sU(t){const t0=g('s6');title(null,'NHỮNG ĐIỂM KHÁC',t0);
 box(60,180,540,350,g('s6')+.3,{lw:6},a=>{txt('CHỦ TỊCH UBND CẤP XÃ',30,58,{size:21,col:RED,ls:2});txt('Không được ủy quyền',30,130,{size:36,a:P(g('k_u1'),.2)});txt('cho người khác ký:',30,174,{size:36,a:P(g('k_u1'),.2)});
  txt('• Giấy khai sinh',30,240,{size:30,w:600,a:P(g('k_u1')+.6,.2)});txt('• Giấy chứng nhận kết hôn',30,284,{size:30,w:600,a:P(g('k_u2'),.2)})});
 box(680,180,540,350,g('k_v1')-.2,{},a=>{photo('rings',14,14,512,140);txt('ĐĂNG KÝ KẾT HÔN',30,198,{size:21,col:GREY,ls:2});txt('Hai bên cùng có mặt để ký',30,246,{size:32});txt('Điều kiện kết hôn: không đổi',30,300,{size:28,w:600,col:RED,a:P(g('k_v2'),.2)})});
 source('Nguồn: LuatVietnam, Tuổi Trẻ, Sức khỏe & Đời sống, UBND xã Diễn Châu (Nghệ An), Hưng Yên. Chờ đối chiếu văn bản gốc.',1)}
function dot(px,py,col,a){if(a<=0)return;x.save();x.globalAlpha*=a;x.fillStyle=col;x.beginPath();x.arc(px,py,13,0,6.2832);x.fill();x.restore()}
function sD(t){const t0=g('s8');title(null,'ÁP DỤNG TỪ KHI NÀO?',t0);
 sketch([seg(110,290,1170,290,5)],t0+.3,.6,{lw:6});
 const pm=P(g('k_t1')-.2,.25);dot(640,290,RED,pm);txt('01/3/2027',640,252,{size:50,col:RED,align:'center',a:pm});
 box(680,330,500,160,g('k_t1')+.4,{lw:6},a=>{txt('TỪ 01/3/2027',34,50,{size:21,col:RED,ls:2});txt('Luật Hộ tịch mới:',34,98,{size:32});txt('không phụ thuộc nơi cư trú',34,138,{size:28,w:600})});
 box(100,330,500,160,g('k_t2'),{col:GREY},a=>{txt('TRƯỚC 01/3/2027',34,50,{size:21,col:GREY,ls:2});txt('Luật cũ:',34,98,{size:32});txt('đến xã nơi cư trú',34,138,{size:28,w:600})});
 txt('Hồ sơ cụ thể: còn chờ nghị định hướng dẫn',640,548,{size:28,align:'center',a:P(g('k_t3'),.3)});
 source(SRC1,1)}
function sE(t){vxTodo(g('s9'),[[g('k_e1'),'Đăng ký trước 01/3/2027:','đến UBND xã nơi cư trú'],[g('s10'),'Từ 01/3/2027: chọn xã thuận tiện,','hỏi trước, nhất là khi ở khác tỉnh'],[g('s11'),'Đăng ký kết hôn: cả hai cùng đi,','mang giấy tờ tùy thân'],[g('s12'),'Theo dõi nghị định hướng dẫn','để biết hồ sơ cụ thể']])}
function sF(t){vxDisclaimer(g('out'),'Luật Hộ tịch (sửa đổi) · thông qua 23/4/2026 · hiệu lực 01/3/2027','Số hiệu: 03/2026/QH16 theo Thư viện Pháp luật, chờ đối chiếu Công báo',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật Hộ tịch (sửa đổi)  ·  thông qua 23/4/2026  ·  hiệu lực 01/3/2027',
 images:{baby:'img/baby.jpg',rings:'img/rings.jpg',gavel:'img/gavel.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sH],[()=>g('s4')-.15,sN],[()=>g('s5')-.15,sX],[()=>g('s6')-.15,sU],[()=>g('s8')-.15,sD],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
