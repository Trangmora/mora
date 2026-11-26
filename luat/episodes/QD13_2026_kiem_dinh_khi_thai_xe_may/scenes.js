// Tập: Kiểm định khí thải xe máy từ 01/7/2027 ở Hà Nội và TP.HCM (Quyết định 13/2026/QĐ-TTg). Khoảng 2 phút 6 giây.
const SRC1='Nguồn: Báo Chính phủ, LuatVietnam, Thư viện Pháp luật, PLO, VnExpress, Dân trí (4/2026).';
const SRC2='Nguồn: Báo Chính phủ, Kinh tế Môi trường, LuatVietnam, Báo Xây dựng (4/2026).';
function sA(t){
 photoCard('traffic',70,170,400,400,.1,{rot:-.035});
 stamp('TỪ 01/7/2027',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Xe máy ở Hà Nội',520,226,{size:52,a:P(g('k_xm')-.1,.2)});txt('và TP. Hồ Chí Minh',520,290,{size:52,a:P(g('k_xm')+.6,.2)});
 box(520,330,660,140,g('k_kd'),{lw:6},a=>{txt('BẮT ĐẦU PHẢI',30,46,{size:22,col:GREY,ls:3});txt('Kiểm định khí thải',30,112,{size:56,col:RED})});
 box(520,490,660,86,g('k_khac'),{col:GREY},a=>{txt('Các địa phương khác: muộn hơn',30,56,{size:32})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('KIỂM ĐỊNH KHÍ THẢI XE MÁY',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Văn bản nào','quy định?'],['Lộ trình','ra sao?'],['Chủ xe nên','chuẩn bị gì?']],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{if(i==0)icon('paper',125,14,104,ti+.3,.4);else if(i==1)icon('calendar',125,14,104,ti+.3,.4);else photo('exhaust',12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_qd')+.2,{lw:6},a=>{txt('QUYẾT ĐỊNH CỦA THỦ TƯỚNG',175,58,{size:20,col:GREY,align:'center',ls:1});txt('13/2026',175,150,{size:64,col:RED,align:'center'});txt('/QĐ-TTg',175,196,{size:32,align:'center'});txt('Lộ trình áp dụng quy chuẩn',175,252,{size:21,w:600,align:'center'});txt('khí thải xe mô tô, xe gắn máy',175,282,{size:21,w:600,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_bh')-.3,.2);
 box(468,y,350,h,g('k_bh'),{},a=>{txt('BAN HÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('02/4/2026',175,118,{size:44,align:'center'});
  txt('CÓ HIỆU LỰC TỪ',175,190,{size:21,col:GREY,align:'center',ls:1,a:P(g('k_hl'),.2)});txt('16/5/2026',175,254,{size:54,col:RED,align:'center',a:P(g('k_hl')+.2,.2)});txt('Đang có hiệu lực',175,296,{size:22,w:600,col:GREEN,align:'center',a:P(g('k_hl')+.6,.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')+1.2,.2);
 box(886,y,350,h,g('k_hl')+1.4,{col:GREY},a=>{photo('traffic',14,14,322,150);txt('ÁP DỤNG CHO',175,214,{size:21,col:GREY,align:'center',ls:1});txt('Xe mô tô,',175,258,{size:32,align:'center'});txt('xe gắn máy',175,296,{size:32,align:'center'})});
 source(SRC1,1)}
function sB(t){const t0=g('s2');title(null,'KIỂM ĐỊNH KHÍ THẢI LÀ GÌ?',t0);
 box(60,180,540,390,g('k_dn')-.2,{lw:6},a=>{photo('exhaust',14,14,512,200);txt('ĐO KHÍ ĐỘC HẠI TỪ ỐNG XẢ',30,262,{size:22,col:RED,ls:2});txt('Khí CO',30,314,{size:34,a:P(g('k_co'),.2)});txt('Hydrocarbon (HC)',30,358,{size:34,a:P(g('k_co')+.7,.2)})});
 arrow(612,375,672,375,g('k_ss')-.25,.22);
 box(680,180,540,390,g('k_ss'),{},a=>{txt('SO VỚI MỨC GIỚI HẠN',30,54,{size:22,col:GREY,ls:2});icon('bars',30,90,140,g('k_ss')+.2,.5);
  check(220,120,60,g('k_ss')+.6);txt('Đạt',300,166,{size:40,col:GREEN,a:P(g('k_ss')+.6,.2)});txt('Vượt giới hạn: không đạt',30,300,{size:30,col:RED,a:P(g('k_ss')+1.2,.2)})});
 source('Giải thích bằng lời thường. Chỉ tiêu CO, HC: theo bảng quy chuẩn do Thư viện Pháp luật tóm tắt. Ảnh minh họa.',1)}
function pt(px,lab,big,sub,tp,tb,first){const p=P(tp,.25);if(p>0){x.save();x.globalAlpha*=p;x.fillStyle=first?RED:INK;x.beginPath();x.arc(px,330,14,0,6.2832);x.fill();x.restore();txt(big,px,300,{size:42,col:first?RED:INK,align:'center',a:p})}
 box(px-180,370,360,190,tb,first?{lw:7}:{},a=>{txt(lab,180,48,{size:20,col:GREY,align:'center',ls:2});txt(sub[0],180,104,{size:30,align:'center'});if(sub[1])txt(sub[1],180,144,{size:30,align:'center'})})}
function sL(t){const t0=g('s3');title(null,'LỘ TRÌNH KIỂM ĐỊNH',t0);
 box(260,150,760,100,g('k_hn')-.2,{col:GREY},a=>{txt('Hiện nay: xe máy chưa phải kiểm định khí thải định kỳ',380,62,{size:26,w:600,align:'center'})});
 sketch([seg(80,330,1200,330,5)],g('k_lt'),.7,{lw:6});
 pt(240,'MỐC 1',' 01/7/2027',['Hà Nội,','TP. Hồ Chí Minh'],g('k_c1'),g('k_c1b')-.2,true);
 pt(640,'MỐC 2','01/7/2028',['Các TP trực thuộc','Trung ương còn lại'],g('k_c2'),g('k_c2b')-.2,false);
 pt(1040,'MỐC 3','01/7/2030',['Các tỉnh','còn lại'],g('k_c3'),g('k_c3b')-.2,false);
 source(SRC2,1)}
function sK(t){const t0=g('s7');title(null,'XE PHẢI ĐẠT MỨC NÀO?',t0);
 box(60,180,540,200,g('k_muc')-.2,{},a=>{txt('MỨC KHÍ THẢI',30,52,{size:22,col:GREY,ls:3});txt('Tùy năm sản xuất',30,116,{size:38});txt('hoặc nhập khẩu',30,162,{size:38})});
 arrow(612,280,672,280,g('k_moi')-.25,.22);
 box(680,180,540,200,g('k_moi'),{},a=>{icon('bars',24,30,140,g('k_moi')+.1,.5);txt('Xe càng mới,',190,96,{size:36});txt('yêu cầu càng cao',190,146,{size:36,col:RED})});
 box(160,404,960,170,g('k_2028'),{lw:6},a=>{txt('THEO BÁO CHÍ · TỪ 01/01/2028 · HÀ NỘI, TP. HỒ CHÍ MINH',30,48,{size:20,col:GREY,ls:1});txt('Xe lưu thông phải đạt',30,118,{size:40});txt('từ Mức 2 trở lên',30+tw('Xe lưu thông phải đạt ',40),118,{size:40,col:RED,a:P(g('k_m2b'),.2)})});
 source('Nguồn: Thư viện Pháp luật, Dân trí, VnExpress (4/2026). Bảng mức theo năm sản xuất: các nguồn chưa thống nhất, nên không đưa lên hình.',1)}
function sT(t){const t0=g('s8');title(null,'THỦ TỤC KIỂM ĐỊNH',t0);
 box(60,180,620,330,g('k_tt')-.2,{lw:6},a=>{txt('THÔNG TƯ CỦA BỘ XÂY DỰNG',30,52,{size:22,col:GREY,ls:2});txt('30/2026/TT-BXD',30,120,{size:52,col:RED});txt('Trình tự, thủ tục kiểm định',30,180,{size:30,w:600});txt('xe cơ giới và khí thải xe máy',30,218,{size:30,w:600});
  txt('Hiệu lực: 01/7/2026',30,282,{size:34,a:P(g('k_tt2'),.2)})});
 arrow(692,345,752,345,g('k_cho')-.25,.22);
 box(760,180,460,330,g('k_cho'),{col:GREY},a=>{txt('Ở TỪNG ĐỊA PHƯƠNG',30,52,{size:22,col:GREY,ls:2});txt('Cách tổ chức',30,140,{size:40});txt('cụ thể: còn chờ',30,190,{size:40});txt('hướng dẫn',30,240,{size:40})});
 source('Nguồn: Thư viện Pháp luật (toàn văn TT 30/2026/TT-BXD), VnEconomy.',1)}
function sE(t){vxTodo(g('s9'),[[g('k_t1'),'Bảo dưỡng xe định kỳ: thay lọc gió,','kiểm tra chế hòa khí, phun xăng'],[g('s10'),'Xem giấy đăng ký xe','để biết xe sản xuất năm nào'],[g('s11'),'Ở tỉnh khác: ghi nhớ mốc','2028 hoặc 2030 của địa phương mình'],[g('s12'),'Chỉ đến cơ sở kiểm định chính thức,','cảnh giác dịch vụ "lo kiểm định"']])}
function sF(t){vxDisclaimer(g('out'),'Quyết định 13/2026/QĐ-TTg · ban hành 02/4/2026 · hiệu lực 16/5/2026','Mốc kiểm định: 01/7/2027 (Hà Nội, TP.HCM) · 2028 · 2030',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Quyết định 13/2026/QĐ-TTg  ·  ban hành 02/4/2026  ·  hiệu lực 16/5/2026',
 images:{traffic:'img/traffic.jpg',exhaust:'img/exhaust.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sL],[()=>g('s7')-.15,sK],[()=>g('s8')-.15,sT],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
