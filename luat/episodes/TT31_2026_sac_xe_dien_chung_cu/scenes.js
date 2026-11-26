// Tập: Khu sạc xe điện trong chung cư từ 15/12/2026 (Thông tư 31/2026/TT-BXD, Sửa đổi 01:2026 QCVN 04:2021/BXD). Khoảng 2 phút 13 giây.
const SRC1='Nguồn: LuatVietnam, Thư viện Pháp luật, VnExpress, Báo Xây dựng (6/2026).';
const SRC2='Nguồn: VnExpress, LuatVietnam, Tạp chí Kinh tế Tài chính, Thư viện Pháp luật.';
function sA(t){
 photoCard('charge',70,170,400,400,.1,{rot:-.035});
 stamp('TỪ 15/12/2026',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Khu sạc xe điện',520,226,{size:52,a:P(g('k_ks')-.1,.2)});txt('trong chung cư',520,290,{size:52,a:P(g('k_ks')+.6,.2)});
 box(520,326,660,92,g('k_rieng'),{lw:6},a=>{txt('Phải là khu vực riêng',30,62,{size:40,col:RED})});
 box(520,432,660,92,g('k_cc'),{lw:6},a=>{txt('Có chữa cháy tự động',30,62,{size:40,col:RED})});
 txt('Áp dụng cả chung cư đang sử dụng',520,570,{size:30,w:600,a:P(g('k_cu'),.2)});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('SẠC XE ĐIỆN Ở CHUNG CƯ',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Quy chuẩn mới','yêu cầu gì?'],['Chung cư cũ','phải làm gì?'],['Cư dân','nên làm gì?']],ph=['pipes','apt','charge'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_tt')+.2,{lw:6},a=>{txt('THÔNG TƯ CỦA BỘ XÂY DỰNG',175,58,{size:20,col:GREY,align:'center',ls:1});txt('31/2026',175,150,{size:64,col:RED,align:'center'});txt('/TT-BXD',175,196,{size:32,align:'center'});
  txt('Sửa đổi 01:2026',175,250,{size:22,w:600,align:'center',a:P(g('k_qc'),.2)});txt('QCVN 04:2021/BXD (nhà chung cư)',175,280,{size:19,w:600,align:'center',a:P(g('k_qc'),.2)})});
 arrow(408,y+h/2,460,y+h/2,g('k_ky')-.3,.2);
 box(468,y,350,h,g('k_ky'),{},a=>{txt('KÝ BAN HÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('15/6/2026',175,124,{size:44,align:'center'});txt('(theo LuatVietnam)',175,156,{size:18,w:600,col:GREY,align:'center'});
  txt('CÓ HIỆU LỰC TỪ',175,214,{size:21,col:GREY,align:'center',ls:1,a:P(g('k_hl'),.2)});txt('15/12/2026',175,276,{size:52,col:RED,align:'center',a:P(g('k_hl')+.2,.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')+1.4,.2);
 box(886,y,350,h,g('k_hl')+1.6,{col:GREY},a=>{photo('apt',14,14,322,170);txt('ÁP DỤNG CHO',175,232,{size:21,col:GREY,align:'center',ls:1});txt('Chung cư xây mới',175,272,{size:27,align:'center'});txt('và hiện hữu',175,306,{size:27,align:'center'})});
 source(SRC1+' Ngày ký: một số nguồn ghi khác (khoảng 25/6/2026).',1)}
function sB(t){const t0=g('s2');title(null,'HIỂU BẰNG LỜI THƯỜNG',t0);
 box(60,190,540,360,g('k_qcd')-.2,{},a=>{txt('QUY CHUẨN',30,54,{size:24,col:RED,ls:3});icon('paper',30,80,110,g('k_qcd'),.5);txt('Yêu cầu kỹ thuật',160,130,{size:34});txt('BẮT BUỘC',160,176,{size:34,col:RED});txt('khi thiết kế, xây dựng,',30,262,{size:28,w:600});txt('sử dụng công trình',30,300,{size:28,w:600})});
 arrow(612,370,672,370,g('k_kc')-.25,.22);
 box(680,190,540,360,g('k_kc'),{lw:6},a=>{txt('KHOANG CHÁY',30,54,{size:24,col:RED,ls:3});
  x.save();x.strokeStyle=INK;x.lineWidth=4;x.strokeRect(40,90,200,150);x.strokeStyle=RED;x.lineWidth=8;x.beginPath();x.moveTo(140,90);x.lineTo(140,240);x.stroke();x.restore();
  txt('Khu vực',266,140,{size:30});txt('ngăn riêng',266,180,{size:30});txt('Nếu có cháy, lửa',266,226,{size:26,w:600,a:P(g('k_lan'),.2)});txt('không lan sang khu khác',30,300,{size:30,col:RED,a:P(g('k_lan')+.6,.2)})});
 source('Giải thích bằng lời thường.',1)}
function sH(t){const t0=g('s3');title(null,'HIỆN NAY',t0);
 box(60,190,540,330,g('k_hn')-.2,{col:GREY},a=>{txt('QCVN 04:2021/BXD (BẢN GỐC)',30,54,{size:22,col:GREY,ls:2});txt('Chưa có yêu cầu riêng',30,140,{size:38});txt('về khu sạc xe điện',30,190,{size:38})});
 arrow(612,355,672,355,g('k_bc')-.25,.22);
 box(680,190,540,330,g('k_bc'),{col:GREY},a=>{txt('THEO BÁO CHÍ',30,54,{size:22,col:GREY,ls:3});txt('Nhiều tòa nhà tự đặt',30,140,{size:38});txt('quy định riêng,',30,190,{size:38});txt('có nơi cấm sạc',30,240,{size:38,col:RED})});
 source('Nguồn: LuatVietnam, VnExpress (6/2026).',1)}
function sY(t){const t0=g('s4');title(null,'BA YÊU CẦU CHÍNH',t0,{sub:'Sửa đổi 01:2026 QCVN 04:2021/BXD'});
 box(60,170,1160,150,g('k_y1')-.1,{lw:6},a=>{badge(1,46,46,g('k_y1'),24);txt('Khu sạc ô tô điện, xe máy điện, xe đạp điện: khoang cháy riêng',90,56,{size:28});
  txt('Ngăn bằng tường ngăn cháy loại 1',90,110,{size:26,w:600,a:P(g('k_y1b'),.2)});txt('hoặc khoảng trống tối thiểu 6 m',90+tw('Ngăn bằng tường ngăn cháy loại 1 ',26,600)+10,110,{size:26,col:RED,a:P(g('k_y1c'),.2)})});
 box(60,334,1160,100,g('k_y2')-.1,{lw:6},a=>{badge(2,46,50,g('k_y2'),24);txt('Có hệ thống chữa cháy tự động',90,62,{size:36,a:P(g('k_y2b')-.2,.2)});photo('pipes',820,10,326,80)});
 box(60,448,1160,150,g('k_y3')-.1,{lw:6},a=>{badge(3,46,46,g('k_y3'),24);txt('Áp dụng cả chung cư xây mới và chung cư hiện hữu',90,56,{size:28});
  txt('Chung cư đang sử dụng: rà soát khu để xe, sạc, đổi pin trong',90,108,{size:24,w:600,a:P(g('k_y3b'),.2)});txt('6 tháng',90+tw('Chung cư đang sử dụng: rà soát khu để xe, sạc, đổi pin trong ',24,600)+6,108,{size:28,col:RED,a:P(g('k_y3c'),.2)});
  txt('→ hạn: khoảng giữa 6/2027',1130,56,{size:22,w:600,col:RED,align:'right',a:P(g('k_y3d'),.2)})});
 source(SRC2,1)}
function sN(t){const t0=g('s7');title(null,'CHI TIẾT KHÁC: CẦN ĐỐI CHIẾU',t0);
 box(160,190,960,300,g('k_ns')-.2,{col:GREY},a=>{txt('THEO MỘT SỐ NGUỒN (CHƯA ĐỦ 2 NGUỒN)',30,54,{size:22,col:GREY,ls:2});badge(1,50,124,g('k_ns')+.3,20);txt('Giới hạn số chỗ sạc trong mỗi khu',90,136,{size:32});badge(2,50,200,g('k_ns')+1.4,20);txt('Giới hạn công suất trụ sạc ở tầng hầm',90,212,{size:32,a:P(g('k_ns')+1.4,.2)})});
 stamp('KIỂM TRA VĂN BẢN GỐC',640,548,P(g('k_ns2'),.35),{size:28,rot:-.03});
 source('Nguồn: Thư viện Pháp luật, VOV (mỗi chi tiết 1 nguồn). Không đưa con số lên hình.',1)}
function sW(t){const t0=g('s8');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 box(60,180,540,380,g('k_a1')-.2,{},a=>{photo('apt',14,14,512,200);txt('Chủ đầu tư,',30,272,{size:32});txt('ban quản trị,',30,314,{size:32});txt('ban quản lý tòa nhà',30,356,{size:32})});
 box(680,180,540,380,g('k_a2'),{},a=>{photo('charge',14,14,512,200);txt('Cư dân dùng',30,272,{size:32});txt('ô tô điện,',30,314,{size:32});txt('xe máy điện',30,356,{size:32})});
 source(SRC1,1)}
function sE(t){vxTodo(g('s9'),[[g('k_t1'),'Không sạc xe điện trong căn hộ, hành lang;','dùng khu sạc được bố trí'],[g('s10'),'Hỏi ban quản trị kế hoạch rà soát khu sạc','(trước khoảng giữa năm 2027)'],[g('s11'),'Dùng bộ sạc chính hãng; không sạc qua đêm','khi không có người trông'],[g('s12'),'Tòa nhà cấm sạc hoàn toàn: đề nghị','đưa ra hội nghị nhà chung cư']])}
function sF(t){vxDisclaimer(g('out'),'Thông tư 31/2026/TT-BXD · ký 15/6/2026 · hiệu lực 15/12/2026','Sửa đổi 01:2026 QCVN 04:2021/BXD về nhà chung cư',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Thông tư 31/2026/TT-BXD  ·  ký 15/6/2026  ·  hiệu lực 15/12/2026',
 images:{charge:'img/charge.jpg',apt:'img/apt.jpg',pipes:'img/pipes.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sH],[()=>g('s4')-.15,sY],[()=>g('s7')-.15,sN],[()=>g('s8')-.15,sW],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
