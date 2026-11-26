// Tập: Cấm kinh doanh khí N2O làm "bóng cười" từ 01/01/2027 (Luật 24/2026/QH16 sửa đổi Luật Đầu tư). Khoảng 2 phút 9 giây.
const SRC1='Nguồn: Báo Đại biểu Nhân dân, Dân trí (24/8/2026), LuatVietnam, VTC News.';
const SRC2='Nguồn: LuatVietnam, Báo Văn hóa, Dân trí, Người Quan sát. Chờ đối chiếu văn bản luật.';
const SRC3='Nguồn: VTV, VTC News, Báo Quảng Ninh (8/2026).';
function n2o(px,py,size,o={}){txt('N₂O',px,py,{size,...o})}
function n2oW(size){return tw('N₂O',size)}
function sA(t){
 photoCard('balloons',70,170,400,400,.1,{rot:-.035});
 stamp('TỪ 01/01/2027',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Kinh doanh khí',520,226,{size:52,a:P(g('k_kd')-.1,.2)});n2o(520+tw('Kinh doanh khí ',52),226,52,{a:P(g('k_kd')+.2,.2)});
 txt('làm “bóng cười”',520,290,{size:52,a:P(g('k_kd')+.6,.2)});
 box(520,330,660,110,g('k_hit'),{col:GREY},a=>{txt('tức là để người hít vào',30,70,{size:36,w:600})});
 txt('BỊ CẤM',520,530,{size:84,col:RED,a:P(g('k_cam')-.1,.2)});txt('theo Luật Đầu tư',520+tw('BỊ CẤM',84)+24,530,{size:34,a:P(g('k_cam')+.3,.2)});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('CẤM KINH DOANH “BÓNG CƯỜI”',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Luật','cấm cái gì?'],['Trường hợp nào','vẫn được phép?'],['Bạn nên','làm gì?']],ph=['balloons','tanks','bar'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_luat')+.2,{lw:6},a=>{txt('LUẬT SỬA ĐỔI, BỔ SUNG',175,58,{size:21,col:GREY,align:'center',ls:1});txt('Luật Đầu tư',175,128,{size:40,align:'center'});txt('Số hiệu',175,196,{size:22,w:600,col:GREY,align:'center'});txt('24/2026/QH16',175,246,{size:40,col:RED,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{photo('bar',14,14,322,120);txt('QUỐC HỘI THÔNG QUA',175,176,{size:21,col:GREY,align:'center',ls:1});txt('24/8/2026',175,236,{size:48,align:'center'});txt('474/476 đại biểu biểu quyết',175,280,{size:21,w:600,col:GREY,align:'center',a:P(g('k_phieu'),.2)});txt('tán thành',175,306,{size:21,w:600,col:GREY,align:'center',a:P(g('k_phieu'),.2)})});
 box(886,y,350,h,g('k_tt')-.3,{col:GREY},a=>{txt('NỘI DUNG TẬP NÀY',175,58,{size:21,col:GREY,align:'center',ls:1});txt('Điều cấm',175,140,{size:36,align:'center'});txt('kinh doanh khí',175,186,{size:36,align:'center'});n2o(175-n2oW(40)/2,240,40,{col:RED})});
 stamp('ĐÃ THÔNG QUA',1061,470,P(g('k_tt')+.3,.35),{size:26,rot:-.06});
 source(SRC1,1)}
function sD(t){const t0=g('s2');title(null,'HIỆU LỰC: HAI MỐC',t0);
 sketch([seg(110,300,1170,300,5)],t0+.2,.6,{lw:6});
 const p1=P(g('k_rieng'),.25),p2=P(g('k_hl'),.25);
 if(p1>0){x.save();x.globalAlpha*=p1;x.fillStyle=RED;x.beginPath();x.arc(400,300,13,0,6.2832);x.fill();x.restore();txt('01/01/2027',400,262,{size:46,col:RED,align:'center',a:p1})}
 if(p2>0){x.save();x.globalAlpha*=p2;x.fillStyle=INK;x.beginPath();x.arc(880,300,13,0,6.2832);x.fill();x.restore();txt('01/3/2027',880,262,{size:46,align:'center',a:p2})}
 box(640,350,520,190,g('k_hl'),{col:GREY},a=>{txt('HIỆU LỰC CHUNG',30,50,{size:21,col:GREY,ls:2});txt('Các quy định khác',30,110,{size:36});txt('của luật',30,152,{size:36})});
 box(130,350,520,190,g('k_rieng'),{lw:7},a=>{txt('SỚM HƠN',30,50,{size:21,col:RED,ls:2});txt('Điều cấm kinh doanh',30,110,{size:36});txt('khí',30,152,{size:36});n2o(30+tw('khí ',36),152,36)});
 source(SRC2,1)}
function sB(t){const t0=g('s3');title(null,'BÓNG CƯỜI LÀ GÌ?',t0);
 box(60,180,540,390,g('k_bc')-.2,{lw:6},a=>{photo('balloons',14,14,512,190);txt('Bóng bay bơm khí',30,252,{size:32});n2o(30+tw('Bóng bay bơm khí ',32),252,32,{col:RED});txt('Còn gọi là “khí cười”',30,300,{size:28,w:600,a:P(g('k_kc'),.2)});txt('Hít vào để tạo cảm giác hưng phấn',30,346,{size:24,w:600,a:P(g('k_hit2'),.2)})});
 arrow(612,375,672,375,g('k_cp')-.25,.22);
 box(680,180,540,390,g('k_cp'),{},a=>{txt('THEO CHÍNH PHỦ',30,52,{size:21,col:GREY,ls:2});badge(1,50,118,g('k_cp')+.3,20);txt('Nhiều người nhập viện',86,128,{size:30});txt('vì ngộ độc khí này',86,166,{size:30});
  badge(2,50,246,g('k_mt'),20);txt('Thường gắn với',86,256,{size:30,a:P(g('k_mt'),.2)});txt('sử dụng ma túy',86,294,{size:30,col:RED,a:P(g('k_mt'),.2)})});
 source('Nguồn: Báo Đại biểu Nhân dân, Dân trí (tờ trình của Chính phủ, 8/2026). Ảnh minh họa.',1)}
function sH(t){const t0=g('s4');title(null,'HIỆN NAY VÀ TỪ 01/01/2027',t0);
 box(60,180,540,380,g('k_hn')-.2,{col:GREY},a=>{txt('HIỆN NAY',30,52,{size:22,col:GREY,ls:3});photo('tanks',30,76,480,130);txt('Hóa chất kinh doanh',30,256,{size:34});txt('có điều kiện',30,298,{size:34});txt('Chưa nằm trong ngành nghề cấm',30,348,{size:24,w:600,col:GREY,a:P(g('k_hn2'),.2)})});
 arrow(612,370,672,370,g('k_moi')-.25,.22);
 box(680,180,540,380,g('k_moi'),{lw:7},a=>{txt('LUẬT MỚI · TỪ 01/01/2027',30,52,{size:22,col:RED,ls:2});txt('Thêm vào danh mục',30,112,{size:32,a:P(g('k_dm'),.2)});txt('ngành nghề CẤM',30,154,{size:32,col:RED,a:P(g('k_dm'),.2)});txt('đầu tư kinh doanh:',30,196,{size:32,a:P(g('k_dm'),.2)});
  txt('Kinh doanh khí',30,262,{size:34,a:P(g('k_hh'),.2)});n2o(30+tw('Kinh doanh khí ',34),262,34,{col:RED,a:P(g('k_hh'),.2)});txt('để dùng cho người',30,306,{size:34,a:P(g('k_hh')+.6,.2)});txt('qua đường hô hấp',30,350,{size:34,a:P(g('k_hh')+1.2,.2)})});
 source('Nguồn: LuatVietnam (điểm m khoản 1 Điều 6 Luật Đầu tư), Báo Văn hóa, Dân trí, Người Quan sát. Hiện nay: theo báo chí.',1)}
function chip(s,px,py,t0,o={}){const sz=o.size||28,w=tw(s,sz)+46;box(px,py,w,64,t0,{lw:3,r:32,col:o.col||GREEN},a=>{txt(s,w/2,43,{size:sz,align:'center'})});return w}
function sE6(t){const t0=g('s6');title(null,'LỆNH CẤM KHÔNG TUYỆT ĐỐI',t0,{sub:'Vẫn được kinh doanh cho các mục đích sau'});
 box(60,190,300,330,t0+.4,{col:GREEN},a=>{photo('tanks',14,14,272,180);txt('Khí',70,250,{size:32});n2o(70+tw('Khí ',32),250,32);txt('hợp pháp',150,292,{size:30,align:'center',col:GREEN})});
 arrow(372,355,420,355,g('k_e1')-.2,.2);
 let px=440;px+=chip('Y tế',px,200,g('k_e1'))+16;chip('Công nghệ thực phẩm',px,200,g('k_e2'));
 px=440;px+=chip('Kiểm nghiệm',px,290,g('k_e3'))+16;chip('Nghiên cứu khoa học',px,290,g('k_e4'));
 chip('Mục đích khác theo quy định của Chính phủ',440,380,g('k_e5'));
 txt('Ngoài các mục đích này: dùng để hít là bị cấm kinh doanh',440,500,{size:22,w:600,col:RED,a:P(g('k_e5')+1.2,.3)});
 source(SRC3,1)}
function sC(t){const t0=g('s7');title(null,'HỢP ĐỒNG CŨ VÀ MỨC PHẠT',t0);
 box(60,190,540,330,g('k_hd')-.2,{},a=>{txt('THEO LUATVIETNAM',30,52,{size:21,col:GREY,ls:2});icon('paper',30,74,110,g('k_hd'),.5);txt('Hợp đồng đã ký',170,118,{size:32});txt('kinh doanh khí để hít',170,160,{size:26,w:600});
  txt('Chấm dứt hiệu lực',30,248,{size:38,col:RED,a:P(g('k_hd2'),.2)});txt('từ 01/01/2027',30,296,{size:38,col:RED,a:P(g('k_hd2'),.2)})});
 box(680,190,540,330,g('k_xp'),{col:GREY},a=>{txt('MỨC XỬ PHẠT CỤ THỂ',30,52,{size:21,col:GREY,ls:2});txt('Còn chờ',30,150,{size:52});txt('văn bản hướng dẫn',30,214,{size:40})});
 source('Nguồn: LuatVietnam, "Chính thức cấm kinh doanh khí N₂O để sử dụng làm bóng cười từ 01/01/2027" (1 nguồn cho ý hợp đồng).',1)}
function sW(t){const t0=g('s8');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 box(60,180,540,380,g('k_a1')-.2,{lw:6},a=>{photo('bar',14,14,512,200);txt('Quán bar, quán nhậu,',30,268,{size:32});txt('cửa hàng đang bán',30,310,{size:32});txt('bóng cười',30,352,{size:32,col:RED})});
 box(680,180,540,380,g('k_a2'),{},a=>{photo('tanks',14,14,512,200);txt('Doanh nghiệp dùng khí',30,268,{size:30});n2o(30+tw('Doanh nghiệp dùng khí ',30),268,30);txt('cho thực phẩm, y tế:',30,310,{size:30});txt('theo dõi quy định Chính phủ',30,352,{size:28,w:600,col:GREY})});
 source(SRC2,1)}
function sE(t){vxTodo(g('s9'),[[g('k_t1'),'Chủ quán, cửa hàng: dừng bán, quảng cáo','bóng cười trước 01/01/2027'],[g('s10'),'Phụ huynh, nhà trường:','cảnh báo học sinh về tác hại khí cười'],[g('s11'),'Thấy nơi bán bóng cười:','báo công an xã, phường'],[g('s12'),'Doanh nghiệp dùng khí N₂O hợp pháp:','theo dõi nghị định hướng dẫn']])}
function sF(t){vxDisclaimer(g('out'),'Luật 24/2026/QH16 (sửa đổi Luật Đầu tư) · thông qua 24/8/2026','Cấm kinh doanh N₂O từ 01/01/2027 · hiệu lực chung 01/3/2027',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật 24/2026/QH16 sửa đổi Luật Đầu tư  ·  thông qua 24/8/2026  ·  cấm N₂O từ 01/01/2027',
 images:{balloons:'img/balloons.jpg',bar:'img/bar.jpg',tanks:'img/tanks.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sD],[()=>g('s3')-.15,sB],[()=>g('s4')-.15,sH],[()=>g('s6')-.15,sE6],[()=>g('s7')-.15,sC],[()=>g('s8')-.15,sW],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
