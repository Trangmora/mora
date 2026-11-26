// Tập: Cấm bán thuốc lá qua mạng, qua máy bán hàng tự động, cấm trưng bày (Luật sửa đổi Luật PCTH thuốc lá, hiệu lực 01/7/2027). Khoảng 2 phút 10 giây.
const SRC1='Nguồn: LuatVietnam, LSVN, Sức khỏe & Đời sống (11/2026); Dân trí, Báo Đại biểu Nhân dân (21/11/2026).';
const SRC_TB='Nguồn: An ninh Thủ đô, VnExpress, Báo Nhân Dân, VOH (11/2026). Chờ đối chiếu văn bản luật chính thức.';
function sA(t){
 photoCard('shop',70,170,400,400,.1,{rot:-.035});
 stamp('TỪ 01/7/2027',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Cấm bán thuốc lá',520,226,{size:56,col:RED,a:P(g('k_mang')-.2,.2)});
 const it=[['Qua mạng',g('k_mang')+.4],['Qua sàn thương mại điện tử',g('k_san')],['Qua máy bán hàng tự động',g('k_may')]];
 it.forEach(([s,ti],i)=>{box(520,256+i*84,660,70,ti,{lw:4},a=>{txt(s,30,48,{size:32})})});
 box(520,516,660,70,g('k_tb'),{lw:6},a=>{txt('Không được trưng bày thuốc lá',30,48,{size:32,col:RED})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('BÁN THUỐC LÁ TỪ 01/7/2027',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Luật mới','cấm những gì?'],['Điều gì đã','bị cấm từ trước?'],['Người bán, mua','nên làm gì?']],ph=['shop','vending','display'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_luat')+.2,{lw:6},a=>{txt('VĂN BẢN',175,58,{size:21,col:GREY,align:'center',ls:1});txt('Luật sửa đổi,',175,128,{size:32,align:'center'});txt('bổ sung một số điều',175,170,{size:28,w:600,align:'center'});txt('của Luật Phòng, chống',175,214,{size:28,w:600,align:'center'});txt('tác hại của thuốc lá',175,252,{size:28,w:600,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{photo('shop',14,14,322,130);txt('QUỐC HỘI THÔNG QUA',175,184,{size:21,col:GREY,align:'center',ls:1});txt('21/11/2026',175,244,{size:46,align:'center'});txt('Kỳ họp thứ 2, Quốc hội khóa XVI',175,290,{size:19,w:600,col:GREY,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/7/2027',175,268,{size:54,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl')+1,.3)});
 source(SRC1,1)}
function sB(t){const t0=g('s2');title(null,'HIỂU BẰNG LỜI THƯỜNG',t0);
 box(60,180,540,390,g('k_dt')-.2,{lw:6},a=>{photo('shop',14,14,512,190);txt('MÔI TRƯỜNG ĐIỆN TỬ',30,250,{size:24,col:RED,ls:2});txt('Mua bán qua mạng:',30,294,{size:28,w:600});txt('sàn thương mại điện tử, mạng xã hội,',30,332,{size:24,w:600,a:P(g('k_dt2'),.2)});txt('trang web, ứng dụng',30,364,{size:24,w:600,a:P(g('k_dt2')+.8,.2)})});
 arrow(612,375,672,375,g('k_tb2')-.25,.22);
 box(680,180,540,390,g('k_tb2'),{},a=>{photo('display',14,14,512,190);txt('TRƯNG BÀY',30,250,{size:24,col:RED,ls:2});txt('Đặt sản phẩm, bao bì, hình ảnh',30,294,{size:28,w:600});txt('ở nơi người mua nhìn thấy',30,332,{size:28,w:600})});
 source('Giải thích bằng lời thường. Ảnh minh họa (đã làm mờ nhãn hiệu).',1)}
function sH(t){const t0=g('s3');title(null,'ĐÃ BỊ CẤM TỪ TRƯỚC',t0,{sub:'Điều 9 Luật Phòng, chống tác hại của thuốc lá 2012 (số 09/2012/QH13)'});
 box(60,200,540,330,g('k_18')-.2,{col:GREY},a=>{txt('ĐANG ÁP DỤNG',30,52,{size:22,col:GREY,ls:3});txt('Bán thuốc lá cho người',30,138,{size:36});txt('chưa đủ 18 tuổi',30,188,{size:44,col:RED});stamp('CẤM',420,270,P(g('k_18')+.6,.35),{size:34,rot:-.08})});
 box(680,200,540,330,g('k_may2'),{col:GREY},a=>{photo('vending',14,14,512,170);txt('Bán thuốc lá bằng máy',30,236,{size:32});txt('bán thuốc lá tự động',30,278,{size:32});stamp('CẤM',440,300,P(g('k_may2')+.8,.35),{size:30,rot:-.08})});
 source('Nguồn: Luật 09/2012/QH13, Điều 9 (Thư viện Pháp luật, Sở Y tế Đắk Nông, Cổng TTĐT Bộ KH&CN). Ảnh máy bán nước: minh họa.',1)}
function sC(t){const t0=g('s4');title(null,'LUẬT MỚI BỔ SUNG',t0);
 box(60,180,1160,200,g('k_b1')-.2,{lw:7},a=>{photo('shop',14,14,240,172);txt('CẤM BÁN THUỐC LÁ',290,52,{size:24,col:RED,ls:3});txt('Trên môi trường điện tử',290,112,{size:44});txt('kể cả sàn thương mại điện tử',290,160,{size:30,w:600,a:P(g('k_b1b'),.2)})});
 box(60,400,1160,180,g('k_ng'),{col:GREY},a=>{txt('NGOẠI LỆ (THEO VIETNAMPLUS)',30,50,{size:22,col:GREY,ls:2});txt('Giao dịch giữa các tổ chức, cá nhân',30,108,{size:36});txt('kinh doanh thuốc lá hợp pháp với nhau',30,152,{size:36})});
 source('Nguồn: LuatVietnam, LSVN, Sức khỏe & Đời sống (cấm bán trên môi trường điện tử); VietnamPlus (ngoại lệ, 1 nguồn).',1)}
function sV(t){const t0=g('s5');title(null,'MÁY BÁN HÀNG TỰ ĐỘNG',t0);
 box(160,190,960,330,g('k_may3')-.2,{lw:6},a=>{photo('vending',14,14,330,302);txt('Cấm bán thuốc lá',380,110,{size:42});txt('qua máy bán hàng tự động',380,162,{size:34});txt('Đã cấm từ Luật 2012,',380,240,{size:28,w:600,col:GREY,a:P(g('k_may3')+1.6,.2)});txt('luật sửa đổi tiếp tục quy định',380,278,{size:28,w:600,col:GREY,a:P(g('k_may3')+2.2,.2)})});
 source('Nguồn: LuatVietnam, LSVN, Sức khỏe & Đời sống (11/2026); Luật 09/2012/QH13, Điều 9.',1)}
function sT(t){const t0=g('s6');title(null,'CẤM TRƯNG BÀY THUỐC LÁ',t0);
 box(60,180,540,330,g('k_tb3')-.2,{lw:6},a=>{photo('display',14,14,512,170);txt('Thuốc lá, bao bì,',30,236,{size:32});txt('hình ảnh, nhãn hiệu',30,278,{size:32})});
 const it=[['Tại điểm bán',g('k_tb3b')],['Trên môi trường điện tử',g('k_tb3b')+1.6]];
 it.forEach(([s,ti],i)=>{arrow(612,345,672,240+i*110,ti-.2,.2);box(680,190+i*110,540,90,ti,{},a=>{txt(s,30,58,{size:34})})});
 box(680,410,540,100,g('k_tb3c'),{col:GREY},a=>{txt('Trừ trường hợp Chính phủ cho phép',30,62,{size:28,w:600})});
 txt('Chi tiết khác nhau giữa các bài báo: cần đọc văn bản gốc',640,560,{size:22,w:600,col:GREY,align:'center',a:P(g('k_tb3d'),.3)});
 source(SRC_TB,1)}
function sX(t){const t0=g('s6b');title(null,'VÍ DỤ',t0);
 box(60,180,540,390,g('k_vd')-.2,{},a=>{photo('shop',14,14,512,220);txt('Tài khoản mạng xã hội',30,282,{size:30});txt('đăng bán thuốc lá điếu,',30,322,{size:30});txt('giao tận nhà',30,362,{size:30})});
 arrow(612,375,672,375,g('k_vd2')-.25,.22);
 box(680,180,540,390,g('k_vd2'),{lw:7},a=>{txt('TỪ 01/7/2027',30,56,{size:24,col:RED,ls:3});txt('Bán thuốc lá trên',30,140,{size:38});txt('môi trường điện tử',30,190,{size:38});stamp('BỊ CẤM',270,300,P(g('k_vd2')+1.5,.35),{size:44,rot:-.06})});
 source('Ví dụ minh họa.',1)}
function sW(t){const t0=g('s7');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 const bx=[60,465,870],ts=[g('k_a1'),g('k_a2'),g('k_a3')],lab=[['Người bán','hàng online'],['Tiệm tạp hóa,','đại lý thuốc lá'],['Người quen mua','thuốc lá qua mạng']],ic=['phone','shop','bubble'];
 for(let i=0;i<3;i++){const ti=ts[i]-.2;box(bx[i],180,350,270,ti,{},a=>{icon(ic[i],115,20,120,ti+.15,.5);badge(i+1,175,176,ti+.2,20);txt(lab[i][0],175,224,{size:30,align:'center'});txt(lab[i][1],175,260,{size:28,w:600,align:'center'})})}
 box(260,470,760,100,g('k_xp'),{col:GREY},a=>{txt('Mức xử phạt theo luật mới: chờ Chính phủ hướng dẫn',380,62,{size:26,w:600,align:'center'})});
 source(SRC1,1)}
function sE(t){vxTodo(g('s8'),[[g('k_e1'),'Bán trên sàn, mạng xã hội: gỡ sản phẩm','thuốc lá trước 01/7/2027'],[g('s9'),'Cửa hàng, đại lý:','rà lại cách trưng bày thuốc lá'],[g('s10'),'Không bán thuốc lá cho người','chưa đủ 18 tuổi (đã cấm từ trước)'],[g('s11'),'Thấy rao bán thuốc lá trên mạng:','phản ánh với sàn, cơ quan chức năng']])}
function sF(t){vxDisclaimer(g('out'),'Luật sửa đổi Luật PCTH thuốc lá · thông qua 21/11/2026 · hiệu lực 01/7/2027','Số hiệu luật: chờ công bố chính thức',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật sửa đổi Luật Phòng, chống tác hại của thuốc lá  ·  thông qua 21/11/2026  ·  hiệu lực 01/7/2027',
 images:{shop:'img/shop.jpg',display:'img/display.jpg',vending:'img/vending.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sH],[()=>g('s4')-.15,sC],[()=>g('s5')-.15,sV],[()=>g('s6')-.15,sT],[()=>g('s6b')-.15,sX],[()=>g('s7')-.15,sW],[()=>g('s8')-.15,sE],[()=>g('out')-.15,sF]]});
