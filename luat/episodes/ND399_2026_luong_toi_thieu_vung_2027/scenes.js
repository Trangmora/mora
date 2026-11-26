// Tập: Lương tối thiểu vùng từ 1/1/2027 (Nghị định 399/2026/NĐ-CP). Nghiêm túc, một video một vấn đề.
const SRC1='Nguồn: Cổng TTĐT Chính phủ (Xây dựng chính sách), Thanh Niên, LuatVietnam (03/11/2026)';
const SRC2='Nguồn: Thanh Niên, Tiền Phong, VietnamPlus, LuatVietnam, MISA. Mức 2026: Nghị định 293/2025/NĐ-CP.';
function sA(t){
 photoCard('textile',70,170,400,380,.1,{rot:-.035});
 stamp('TỪ 01/01/2027',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Lương tối thiểu vùng',530,226,{size:52,a:P(.5,.2)});
 txt('tăng 310.000 – 390.000 đ/tháng',530,292,{size:40,col:RED,a:P(g('k_tang'),.2)});
 underline(530,310,tw('tăng 310.000 – 390.000 đ/tháng',40),g('k_tang')+.3,.4);
 box(530,362,640,190,g('k_cao'),{lw:6},a=>{txt('MỨC CAO NHẤT · VÙNG I',34,54,{size:24,col:GREY,ls:3});txt('5.700.000 đ',30,146,{size:84,col:RED,a:P(g('k_v1'),.2)})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('LƯƠNG TỐI THIỂU VÙNG 2027',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Lương tối thiểu','vùng là gì?'],['Mức mới','ở từng vùng'],['Bạn nên','làm gì?']],ph=['factory','calc','contract'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_nd')-.2,{lw:6},a=>{txt('NGHỊ ĐỊNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('399/2026',175,160,{size:64,col:RED,align:'center'});txt('/NĐ-CP',175,214,{size:36,align:'center'});txt('Chính phủ ban hành',175,272,{size:22,w:600,col:GREY,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_bh')-.3,.2);
 box(468,y,350,h,g('k_bh'),{},a=>{photo('contract',14,14,322,130);txt('NGÀY BAN HÀNH',175,184,{size:21,col:GREY,align:'center',ls:1});txt('02/11/2026',175,246,{size:46,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/01/2027',175,270,{size:50,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 txt('Thay thế Nghị định 293/2025/NĐ-CP',640,560,{size:24,w:600,col:INK,align:'center',a:P(g('k_tt'),.3)});
 source(SRC1,1)}
function sB(t){const t0=g('s2');title(null,'LƯƠNG TỐI THIỂU LÀ GÌ?',t0,{sub:'Điều 90, Điều 91 Bộ luật Lao động 2019'});
 box(60,190,540,320,g('k_dn')-.3,{lw:6},a=>{txt('ĐỊNH NGHĨA',34,50,{size:22,col:GREY,ls:3});txt('Mức thấp nhất',34,116,{size:46,col:RED});
  txt('trả cho người làm',34,166,{size:32});txt('công việc giản đơn nhất',34,206,{size:32});txt('trong điều kiện lao động bình thường',34,270,{size:23,w:600,col:GREY,a:P(g('k_dn2'),.25)})});
 arrow(610,350,672,350,g('k_bl')-.25,.22);
 box(680,190,540,320,g('k_bl'),{},a=>{photo('factory',20,20,500,130);txt('Lương theo công việc, chức danh',34,196,{size:27});
  txt('KHÔNG ĐƯỢC THẤP HƠN',34,246,{size:32,col:RED,a:P(g('k_bl2'),.2)});txt('mức lương tối thiểu',34,290,{size:32,a:P(g('k_bl2'),.2)})});
 source('Nguồn: Bộ luật Lao động 2019 (Điều 90 khoản 2, Điều 91 khoản 1).',1)}
const ROWS=[['I','5.310.000','5.700.000','+390.000','k_r1','k_r1b'],['II','4.730.000','5.080.000','+350.000','k_r2','k_r2b'],['III','4.140.000','4.450.000','+310.000','k_r3','k_r3b'],['IV','3.700.000','4.040.000','+340.000','k_r4','k_r4b']];
function sV(t){const t0=g('s3');title(null,'MỨC MỚI THEO 4 VÙNG',t0,{sub:'Lương tối thiểu tháng, đồng/tháng'});
 const X=[90,330,640,950],y0=200;
 const ha=P(g('k_4v'),.3);txt('VÙNG',X[0],y0,{size:20,col:GREY,ls:2,a:ha});txt('NĂM 2026',X[1],y0,{size:20,col:GREY,ls:2,a:ha});txt('TỪ 01/01/2027',X[2],y0,{size:20,col:RED,ls:2,a:ha});txt('TĂNG THÊM',X[3],y0,{size:20,col:GREY,ls:2,a:ha});
 ROWS.forEach((r,i)=>{const y=220+i*92,ta=g(r[4]),tb=g(r[5]);box(60,y,1160,80,ta-.1,i==0?{lw:6}:{},a=>{
  txt('Vùng '+r[0],30,52,{size:32});txt(r[1],270,52,{size:32,col:GREY});arrow(470,40,560,40,ta+.6,.2);
  txt(r[2],580,54,{size:40,col:RED,a:P(tb,.2)});txt(r[3],890,52,{size:30,a:P(tb+.3,.2)})})});
 source(SRC2,1)}
function sG(t){const t0=g('s5');title(null,'NGƯỜI LÀM THEO GIỜ',t0,{sub:'Lương tối thiểu giờ, đồng/giờ'});
 box(60,190,560,300,g('s5')+.5,{lw:6},a=>{txt('VÙNG I',34,52,{size:24,col:GREY,ls:3});txt('25.500',34,140,{size:44,col:GREY,a:P(g('k_g1'),.2)});arrow(205,124,265,124,g('k_g1b')-.3,.2);
  txt('27.400',285,140,{size:58,col:RED,a:P(g('k_g1b'),.2)});txt('đồng/giờ, từ 01/01/2027',34,220,{size:26,w:600});txt('Năm 2026: 25.500 đồng/giờ',34,260,{size:22,w:600,col:GREY})});
 box(660,190,560,300,g('k_g4')-.2,{},a=>{txt('MỨC MỚI CÁC VÙNG KHÁC',34,52,{size:24,col:GREY,ls:3});
  txt('Vùng II: 24.400',34,118,{size:34});txt('Vùng III: 21.400',34,172,{size:34});txt('Vùng IV: 19.400',34,226,{size:40,col:RED});txt('đồng/giờ',34,268,{size:22,w:600,col:GREY})});
 source('Nguồn: LuatVietnam, MISA, Thư viện Pháp luật (bảng mức lương tối thiểu giờ, Nghị định 399/2026/NĐ-CP).',1)}
function sD(t){const t0=g('s6');title(null,'BẠN THUỘC VÙNG NÀO?',t0);
 box(60,190,340,300,g('k_d1')-.3,{lw:6},a=>{icon('shop',100,30,140,g('k_d1')-.1,.6);txt('Nơi người sử dụng',170,222,{size:26,align:'center'});txt('lao động hoạt động',170,258,{size:26,align:'center'})});
 arrow(410,340,470,340,g('k_d2')-.3,.2);
 box(480,190,340,300,g('k_d2'),{},a=>{icon('paper',110,30,120,g('k_d2')+.1,.6);txt('Phụ lục nghị định:',170,206,{size:26,align:'center'});txt('danh mục xã, phường',170,244,{size:26,col:RED,align:'center'});txt('theo từng vùng',170,280,{size:22,w:600,col:GREY,align:'center'})});
 arrow(830,340,890,340,g('k_d3')-.3,.2);
 box(900,190,320,300,g('k_d3'),{col:GREY},a=>{txt('CHI NHÁNH',160,60,{size:22,col:GREY,align:'center',ls:3});txt('ở địa bàn khác',160,120,{size:28,align:'center'});txt('áp dụng mức',160,190,{size:28,align:'center'});txt('nơi chi nhánh',160,228,{size:28,col:RED,align:'center'});txt('hoạt động',160,264,{size:28,col:RED,align:'center'})});
 source('Nguồn: LuatVietnam, Báo Phú Thọ, phụ lục Nghị định 399/2026/NĐ-CP (Cổng TTĐT Chính phủ).',1)}
function sX(t){const t0=g('s7');title(null,'VÍ DỤ',t0,{sub:'Công việc giản đơn, toàn thời gian, tại một phường thuộc vùng I'});
 box(80,220,460,250,g('k_x0')+.3,{col:GREY},a=>{txt('NĂM 2026',34,56,{size:24,col:GREY,ls:3});txt('5.310.000 đ',34,146,{size:62});txt('lương thấp nhất / tháng',34,200,{size:24,w:600,col:GREY})});
 arrow(565,345,695,345,g('k_x2')-.3,.3);txt('+390.000 đ',630,312,{size:22,col:RED,align:'center',a:P(g('k_x2'),.2)});
 box(720,220,480,250,g('k_x2'),{lw:6},a=>{txt('TỪ THÁNG 1/2027',34,56,{size:24,col:RED,ls:3});txt('5.700.000 đ',34,146,{size:62,col:RED});txt('không được thấp hơn',34,200,{size:24,w:600,a:P(g('k_x3'),.2)})});
 source(SRC2,1)}
function sL(t){const t0=g('s8');title(null,'AI ĐƯỢC ÁP DỤNG?',t0);
 box(60,190,560,300,g('k_l1')-.2,{},a=>{photo('factory',20,20,520,130);txt('Người làm việc theo',34,206,{size:32});txt('hợp đồng lao động',34,250,{size:32,col:RED})});
 box(660,190,560,300,g('k_l2'),{lw:6},a=>{txt('ĐÂY LÀ MỨC SÀN',34,60,{size:28,col:RED,ls:2});
  txt('Lương đã cao hơn mức mới:',34,140,{size:28,a:P(g('k_l3'),.2)});txt('nghị định không buộc',34,196,{size:32,a:P(g('k_l3')+.8,.2)});txt('công ty phải tăng lương',34,240,{size:32,a:P(g('k_l3')+.8,.2)})});
 source('Nguồn: Nghị định 399/2026/NĐ-CP (phạm vi áp dụng, theo LuatVietnam); Điều 90, 91 Bộ luật Lao động 2019.',1)}
function sE(t){vxTodo(g('s9'),[[g('k_e1'),'Tra xem nơi bạn làm việc thuộc vùng nào','(phụ lục của Nghị định 399/2026/NĐ-CP)'],[g('s10'),'So lương trong hợp đồng với mức mới;','thấp hơn: đề nghị điều chỉnh từ tháng 1/2027'],[g('s11'),'Làm theo giờ: đối chiếu với','mức lương tối thiểu giờ của vùng mình']])}
function sF(t){vxDisclaimer(g('out'),'Nghị định 399/2026/NĐ-CP · ban hành 02/11/2026 · hiệu lực 01/01/2027','Thay thế Nghị định 293/2025/NĐ-CP',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Nghị định 399/2026/NĐ-CP  ·  ban hành 02/11/2026  ·  hiệu lực 01/01/2027',
 images:{textile:'img/textile.jpg',factory:'img/factory.jpg',calc:'img/calc.jpg',contract:'img/contract.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sV],[()=>g('s5')-.15,sG],[()=>g('s6')-.15,sD],[()=>g('s7')-.15,sX],[()=>g('s8')-.15,sL],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
