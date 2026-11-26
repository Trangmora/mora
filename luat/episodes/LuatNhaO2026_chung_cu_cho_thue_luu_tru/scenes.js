// Tập: Luật Nhà ở (sửa đổi) 2026, góc "căn hộ chung cư được cho thuê lưu trú". Nghiêm túc, một vấn đề, khoảng 2 phút 11 giây.
const SRC1='Nguồn: Báo Xây dựng, VOV, Tuổi Trẻ, Nhân Dân (21–22/11/2026)';
const SRC2='Nguồn: Tuổi Trẻ, Nhân Dân, VOH, CafeF, VTV (22–24/11/2026). Chờ đối chiếu văn bản chính thức.';
const SOHIEU='Số hiệu luật: chờ công bố chính thức';
function chip(s,px,py,t0,size=26){const w=tw(s,size)+44;box(px,py,w,62,t0,{lw:3,r:31},a=>{txt(s,w/2,41,{size,align:'center'})});return w}
function strike(px,py,w,p){if(p<=0)return;x.save();x.strokeStyle=RED;x.lineWidth=6;x.lineCap='round';x.beginPath();x.moveTo(px,py);x.lineTo(px+w*ease(p),py-4*ease(p));x.stroke();x.restore()}
function sA(t){
 photoCard('room',70,170,400,380,.1,{rot:-.035});
 stamp('TỪ 01/7/2027',1060,128,P(.4,.4),{size:30,rot:.05});
 txt('LUẬT NHÀ Ở (SỬA ĐỔI)',520,190,{size:22,col:GREY,ls:3,a:P(.4,.25)});
 txt('Căn hộ chung cư',520,256,{size:56,a:P(g('k_ch'),.2)});
 txt('được cho thuê lưu trú',520,322,{size:50,col:RED,a:P(g('k_lt'),.2)});underline(520,338,tw('được cho thuê lưu trú',50),g('k_lt')+.4,.4);
 box(520,380,660,150,g('k_vn'),{lw:6},a=>{txt('KỂ CẢ',34,50,{size:22,col:GREY,ls:3});txt('Khách ở vài ngày',34,112,{size:46})});
 source(SRC2,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('CHO THUÊ CĂN HỘ LƯU TRÚ',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Luật','nói gì?'],['Chủ căn hộ','cần điều kiện gì?'],['Bạn nên','làm gì?']],ph=['block','keys','room'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
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
function sD(t){const t0=g('s2');title(null,'CHO THUÊ LƯU TRÚ LÀ GÌ?',t0);
 photoCard('room',80,180,380,330,t0+.2,{rot:-.03});
 box(520,190,680,170,g('k_d1')-.1,{lw:6},a=>{txt('CHO KHÁCH THUÊ CĂN HỘ',34,50,{size:22,col:GREY,ls:2});txt('Để ở tạm thời',34,122,{size:50,col:RED})});
 txt('VÍ DỤ',520,430,{size:22,col:GREY,ls:3,a:P(g('k_d2'),.2)});
 let px=620;px+=chip('Khách du lịch',px,392,g('k_d2')+.3)+18;chip('Khách đi công tác',px,392,g('k_d3'));
 source('Diễn giải bằng lời thường, không phải nguyên văn luật. '+SRC2,1)}
function sH(t){const t0=g('s3');title(null,'HIỆN NAY THẾ NÀO?',t0,{sub:'Theo Luật Nhà ở năm 2023'});
 box(60,190,560,330,g('k_h1')-.2,{col:GREY},a=>{photo('block',14,14,532,130);txt('LUẬT NHÀ Ở 2023 CẤM',30,192,{size:21,col:GREY,ls:2});
  txt('Dùng căn hộ chung cư vào',30,240,{size:30,a:P(g('k_h2'),.2)});txt('mục đích không phải để ở',30,282,{size:30,col:RED,a:P(g('k_h2')+.8,.2)})});
 arrow(630,355,690,355,g('k_h3')-.25,.2);
 box(700,190,520,150,g('k_h3'),{},a=>{txt('CHƯA PHÂN BIỆT RÕ',30,48,{size:21,col:GREY,ls:2});txt('với cho thuê lưu trú',30,108,{size:34})});
 box(700,370,520,150,g('k_h4'),{lw:6},a=>{txt('HỆ QUẢ',30,48,{size:21,col:RED,ls:2});txt('Cho thuê ngắn ngày',30,96,{size:30});txt('gây nhiều tranh cãi',30,134,{size:30})});
 source('Nguồn: Luật Nhà ở 2023 (Luật số 27/2023/QH15), Điều 3; Tuổi Trẻ (22/11/2026).',1)}
function sN(t){const t0=g('s4');title(null,'LUẬT MỚI: THÊM NGOẠI LỆ',t0);
 box(330,170,620,110,g('k_n1')-.2,{col:GREY},a=>{txt('VẪN GIỮ ĐIỀU CẤM',310,42,{size:21,col:GREY,align:'center',ls:2});txt('Dùng căn hộ sai mục đích',310,88,{size:34,align:'center'})});
 txt('NGOẠI LỆ',640,334,{size:26,col:RED,align:'center',ls:4,a:P(g('k_n2'),.2)});
 arrow(560,346,360,392,g('k_n3')-.25,.2);arrow(720,346,920,392,g('k_n4')-.25,.2);
 box(100,398,520,130,g('k_n3'),{col:GREEN},a=>{icon('house',26,22,86,g('k_n3')+.1,.4);txt('Cho thuê để ở',140,80,{size:36})});
 box(660,398,520,130,g('k_n4'),{col:GREEN,lw:6},a=>{icon('calendar',26,22,86,g('k_n4')+.1,.4);txt('Cho thuê lưu trú',140,80,{size:36})});
 txt('Không bị coi là dùng căn hộ sai mục đích',640,576,{size:26,align:'center',a:P(g('k_n5'),.25)});
 source(SRC2,1)}
function sB(t){const t0=g('s5');title(null,'BỎ CỤM TỪ "NGẮN HẠN"',t0);
 box(240,170,800,120,g('k_b1')-.2,{lw:6},a=>{const s1='Cho thuê lưu trú',s2='ngắn hạn',w1=tw(s1,46),w2=tw(s2,46),st=400-(w1+w2+12)/2;txt(s1,st,78,{size:46});txt(s2,st+w1+12,78,{size:46,col:GREY});strike(st+w1+6,64,w2+12,P(g('k_b1')+.6,.35))});
 txt('ÁP DỤNG CHO KHÁCH Ở',640,356,{size:22,col:GREY,align:'center',ls:3,a:P(g('k_b2'),.2)});
 sketch([seg(130,450,1150,450,5)],g('k_b2')+.2,.5,{lw:5});
 const pts=[[230,'Qua đêm','k_b3'],[500,'Vài ngày','k_b4'],[780,'Một tuần','k_b5'],[1050,'Lâu hơn','k_b6']];
 pts.forEach(([px,s,k])=>{const p=P(g(k),.25);if(p>0){x.save();x.globalAlpha*=p;x.fillStyle=RED;x.beginPath();x.arc(px,450,12,0,6.2832);x.fill();x.restore()}txt(s,px,510,{size:34,align:'center',a:p})});
 source('Nguồn: VOH, Nhịp sống kinh doanh, Báo Phụ nữ Việt Nam (22–24/11/2026). Chờ đối chiếu văn bản chính thức.',1)}
function row(y,lab,t0,fn,o={}){box(160,y,960,118,t0,o,a=>{txt(lab,30,36,{size:19,col:GREY,ls:2});fn(a)})}
function sK(t){const t0=g('s6');title(null,'ĐIỀU KIỆN VÀ NGHĨA VỤ',t0);
 row(170,'ĐIỀU KIỆN TRONG LUẬT NHÀ Ở MỚI',g('k_k1')-.2,a=>{icon('shield',840,14,90,g('k_k2'),.5);txt('An ninh, trật tự',30,84,{size:34,col:RED,a:P(g('k_k2'),.2)});txt('theo Quy chế quản lý, sử dụng nhà chung cư',30+tw('An ninh, trật tự',34)+24,84,{size:22,w:600,a:P(g('k_k3'),.2)})},{lw:6});
 row(310,'LUẬT CƯ TRÚ (HIỆN HÀNH)',g('k_l1'),a=>{icon('paper',840,14,90,g('k_l2'),.5);txt('Thông báo lưu trú',30,84,{size:34,a:P(g('k_l2'),.2)});txt('với công an khi có khách',30+tw('Thông báo lưu trú',34)+20,84,{size:22,w:600,a:P(g('k_l2')+.5,.2)})});
 row(450,'THUẾ',g('k_l3'),a=>{icon('coin',840,14,90,g('k_l4'),.5);txt('Kê khai thuế',30,84,{size:34,a:P(g('k_l4'),.2)});txt('với thu nhập từ cho thuê',30+tw('Kê khai thuế',34)+20,84,{size:22,w:600,a:P(g('k_l4')+.4,.2)})});
 source('Nguồn: CafeF, Vietbao, index.vn (23–24/11/2026); Luật Cư trú 2020, Điều 30. Chờ đối chiếu văn bản chính thức.',1)}
function sC(t){const t0=g('s8');title(null,'ĐIỀU CÒN CHỜ HƯỚNG DẪN',t0);
 box(100,180,1080,130,g('k_c1')-.1,{},a=>{icon('paper',30,20,90,g('k_c1'),.5);txt('Quy chế quản lý, sử dụng nhà chung cư mới',150,62,{size:32});txt('sẽ nêu điều kiện cụ thể',150,104,{size:26,w:600,col:GREY})});
 box(100,350,780,150,g('k_c2'),{lw:6},a=>{txt('CÂU HỎI CHƯA CÓ LỜI ĐÁP',30,46,{size:21,col:GREY,ls:2});txt('Cho thuê có cần ban quản trị',30,96,{size:30});txt('hoặc cư dân đồng ý?',30,134,{size:30})});
 stamp('CHƯA RÕ',1030,430,P(g('k_c3')+.6,.35),{size:44,rot:-.1});
 source('Chưa thấy nguồn nào nêu rõ điểm này (tra cứu 26/11/2026).',1)}
function sW(t){const t0=g('s9');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 const bx=[60,465,870],ic=['house','shield','bubble'],lab=[['Chủ căn hộ','muốn cho thuê'],['Ban quản trị','nhà chung cư'],['Cư dân sống','cùng tòa nhà']],ts=[g('k_w1'),g('k_w2'),g('k_w3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.2;box(bx[i],180,350,230,ti,{},a=>{icon(ic[i],130,18,90,ti+.2,.5);txt(lab[i][0],175,156,{size:30,align:'center'});txt(lab[i][1],175,196,{size:30,align:'center'})})}
 box(390,450,500,100,g('k_w4')-.1,{lw:6},a=>{txt('TỪ 01/7/2027',250,66,{size:44,col:RED,align:'center'})});
 source(SRC2,1)}
function sE(t){vxTodo(g('s10'),[[g('k_e1'),'Định cho thuê: đọc nội quy tòa nhà,','theo dõi quy chế mới'],[g('s11'),'Chuẩn bị thông báo lưu trú cho khách,','kê khai thuế cho thuê tài sản'],[g('s12'),'Ký hợp đồng rõ ràng: trách nhiệm của khách','về an toàn, phòng cháy'],[g('k_e2'),'Cư dân: khách thuê gây mất trật tự,','phản ánh ban quản trị, công an phường']]);underline(300,172+80,tw('theo dõi quy chế mới',26),g('k_e1b'),.4,{col:GREEN});underline(300,172+3*108+80,tw('phản ánh ban quản trị, công an phường',26),g('k_e2b'),.4,{col:GREEN})}
function sF(t){vxDisclaimer(g('out'),'Luật Nhà ở (sửa đổi) · thông qua 21/11/2026 · hiệu lực 01/7/2027',SOHIEU,g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật Nhà ở (sửa đổi)  ·  thông qua 21/11/2026  ·  hiệu lực 01/7/2027',
 images:{room:'img/room.jpg',block:'img/block.jpg',keys:'img/keys.jpg',gavel:'img/gavel.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sD],[()=>g('s3')-.15,sH],[()=>g('s4')-.15,sN],[()=>g('s5')-.15,sB],[()=>g('s6')-.15,sK],[()=>g('s8')-.15,sC],[()=>g('s9')-.15,sW],[()=>g('s10')-.15,sE],[()=>g('out')-.15,sF]]});
