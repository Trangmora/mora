// Tập: Giảm 30% thuế TNCN cho cá nhân, hộ kinh doanh doanh thu không quá 10 tỷ đồng năm 2026–2027 (Nghị quyết 43/2026/QH16, Nghị định 398/2026/NĐ-CP).
// Khác tập Thue2026_ho_kinh_doanh (chọn cách tính thuế): tập này nói về việc GIẢM 30% số thuế phải nộp và cách được hưởng.
const SRC1='Nguồn: VietnamPlus, VnExpress, LuatVietnam, Tạp chí Luật sư Việt Nam (08/2026)';
const SRC2='Nguồn: Báo Chính phủ, Thời báo Tài chính, Znews, LuatVietnam (10–11/2026), Nghị định 398/2026/NĐ-CP.';
function sA(t){
 photoCard('shop',70,170,400,380,.1,{rot:-.035});
 stamp('NĂM 2026 VÀ 2027',1040,128,P(.35,.4),{size:28,rot:.05});
 txt('Cá nhân, hộ kinh doanh',530,222,{size:46,a:P(g('k_ai'),.2)});
 txt('doanh thu không quá 10 tỷ/năm',530,286,{size:38,a:P(g('k_10'),.2)});
 underline(530,302,tw('doanh thu không quá 10 tỷ/năm',38),g('k_10')+.4,.4);
 box(530,350,640,200,g('k_30'),{lw:6},a=>{txt('SỐ THUẾ TNCN PHẢI NỘP',34,54,{size:24,col:GREY,ls:3});txt('GIẢM 30%',30,152,{size:92,col:RED})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('GIẢM 30% THUẾ TNCN',310,62,{size:36,align:'center'})});
 const bx=[60,465,870],lab=[['Ai được','giảm?'],['Giảm','bao nhiêu?'],['Làm sao để','được hưởng?']],ph=['market','calc','sign'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 txt('Khác với quy định chọn cách tính thuế (ngưỡng 10 tỷ) trong video trước',640,570,{size:20,w:600,col:GREY,align:'center',a:P(g('k_lu'),.3)});
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, KHI NÀO?',t0);
 const y=176,h=300;
 box(50,y,350,h,g('k_nq')-.1,{lw:6},a=>{txt('NGHỊ QUYẾT',175,58,{size:21,col:GREY,align:'center',ls:1});txt('43/2026',175,154,{size:66,col:RED,align:'center'});txt('/QH16',175,206,{size:36,align:'center'});txt('Quốc hội',175,258,{size:24,w:600,col:GREY,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{txt('QUỐC HỘI THÔNG QUA',175,58,{size:21,col:GREY,align:'center',ls:1});txt('24/8/2026',175,150,{size:50,align:'center'});txt('480/481 đại biểu',175,212,{size:26,w:600,align:'center',a:P(g('k_ph'),.2)});txt('tán thành',175,246,{size:26,w:600,align:'center',a:P(g('k_ph'),.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('HIỆU LỰC',175,58,{size:21,col:GREY,align:'center',ls:1});txt('Từ ngày thông qua',175,130,{size:30,align:'center'});txt('Kỳ tính thuế',175,200,{size:26,w:600,align:'center',a:P(g('k_ky'),.2)});txt('2026 và 2027',175,250,{size:42,col:RED,align:'center',a:P(g('k_ky'),.2)})});
 source(SRC1,1)}
function sN(t){const t0=g('s2');title(null,'VĂN BẢN HƯỚNG DẪN',t0);
 box(240,190,800,300,g('k_nd')-.3,{lw:6},a=>{icon('paper',40,60,150,g('k_nd'),.6);txt('NGHỊ ĐỊNH CỦA CHÍNH PHỦ',220,80,{size:22,col:GREY,ls:2});txt('398/2026/NĐ-CP',220,156,{size:58,col:RED});
  txt('Có hiệu lực từ 29/10/2026',220,226,{size:32,a:P(g('k_ndhl'),.2)});txt('Áp dụng cho kỳ tính thuế năm 2026 và 2027',220,268,{size:22,w:600,col:GREY,a:P(g('k_ndhl')+1.8,.3)})});
 source('Nguồn: Thư viện Pháp luật, LuatVietnam, MISA (10/2026).',1)}
function chip(s,px,py,t0,o={}){const w=tw(s,26)+44;box(px,py,w,62,t0,{lw:3,r:31,...o},a=>{txt(s,w/2,41,{size:26,align:'center'})});return w}
function sW(t){const t0=g('s3');title(null,'AI ĐƯỢC GIẢM?',t0);
 box(60,180,560,320,g('k_a1')-.2,{lw:6},a=>{photo('market',20,20,520,130);txt('Cá nhân cư trú',30,196,{size:32});txt('có thu nhập từ kinh doanh',30,236,{size:28,w:600});txt('kể cả hộ kinh doanh',30,280,{size:28,col:RED,a:P(g('k_a2'),.2)})});
 box(680,180,540,200,g('k_a3'),{lw:6},a=>{txt('DOANH THU HẰNG NĂM',30,52,{size:22,col:GREY,ls:2});txt('Không quá 10 tỷ',30,140,{size:56,col:RED})});
 box(680,400,540,120,g('k_a4'),{col:GREY},a=>{txt('Không phân biệt phương pháp tính thuế',30,54,{size:24,w:600});txt('(theo các bài hướng dẫn)',30,90,{size:20,w:600,col:GREY})});
 source(SRC2,1)}
function sG(t){const t0=g('s4');title(null,'GIẢM BAO NHIÊU?',t0,{sub:'Số thuế TNCN phải nộp đối với thu nhập từ kinh doanh'});
 const p1=ease(P(g('k_g1'),.6)),p2=P(g('k_g2'),.4);
 box(100,210,1080,150,g('k_g1')-.3,{},a=>{x.save();x.fillStyle='#e9e2d2';rr(30,40,1020,70,8);x.fill();x.fillStyle='#f6d6d0';rr(30+1020*.7,40,1020*.3*p1,70,8);x.fill();x.fillStyle='#d8e7d6';rr(30,40,1020*.7*p2,70,8);x.fill();x.restore();
  txt('Nộp 70%',30+357,88,{size:32,col:GREEN,align:'center',a:p2});txt('Giảm 30%',30+867,88,{size:32,col:RED,align:'center',a:p1})});
 stamp('CHỈ NỘP 70% SỐ THUẾ TÍNH ĐƯỢC',640,470,P(g('k_g2')+.3,.35),{size:32,rot:-.02,col:GREEN});
 source(SRC1,1)}
function sX(t){const t0=g('s5');title(null,'VÍ DỤ',t0,{sub:'Số thuế TNCN phải nộp của năm 2026: 20 triệu đồng'});
 box(80,200,340,260,g('k_x1'),{},a=>{photo('pho',14,14,312,140);txt('Thuế phải nộp',30,196,{size:24,w:600});txt('20 triệu đ',30,240,{size:44})});
 arrow(430,300,520,260,g('k_x2')-.3,.2);arrow(430,360,520,420,g('k_x3')-.3,.2);
 box(530,190,640,140,g('k_x2'),{lw:6},a=>{txt('Được giảm 30%:',30,60,{size:28});txt('6 triệu đ',30,116,{size:46,col:RED})});
 box(530,350,640,140,g('k_x3'),{col:GREEN,lw:6},a=>{txt('Chỉ còn nộp:',30,60,{size:28});txt('14 triệu đ',30,116,{size:46,col:GREEN})});
 source('Ví dụ minh họa: 20 triệu × 30% = 6 triệu đồng. '+SRC1+'.',1)}
function sH(t){const t0=g('s6');title(null,'LÀM SAO ĐỂ ĐƯỢC HƯỞNG?',t0,{sub:'Theo Nghị định 398/2026/NĐ-CP'});
 box(60,190,560,300,g('k_h1')-.2,{lw:6},a=>{badge(1,44,52,g('k_h1'),24);txt('Kê khai theo',84,62,{size:28});txt('MẪU SỐ 01',30,150,{size:62,col:RED});txt('nộp cùng hồ sơ khai thuế',30,220,{size:28,w:600,a:P(g('k_h2'),.2)});txt('(quý, 6 tháng hoặc năm)',30,258,{size:22,w:600,col:GREY,a:P(g('k_h2'),.2)})});
 box(680,190,540,300,g('k_h3'),{},a=>{badge(2,44,52,g('k_h3'),24);txt('Đã khai thuế, chưa khai giảm',84,62,{size:24});
  txt('→ Khai bổ sung',30,150,{size:34});txt('→ Hoặc xác định khi',30,210,{size:34,a:P(g('k_h4'),.2)});txt('quyết toán thuế năm',62,254,{size:34,a:P(g('k_h4'),.2)})});
 source(SRC2,1)}
function sV(t){const t0=g('s7');title(null,'NẾU DOANH THU VƯỢT 10 TỶ?',t0);
 box(60,190,540,300,g('k_v1')-.2,{},a=>{icon('bars',30,40,120,g('k_v1'),.6);txt('Doanh thu thực tế',170,90,{size:30});txt('> 10 tỷ đồng',170,140,{size:40,col:RED});txt('Không còn được giảm',30,240,{size:34})});
 arrow(610,340,672,340,g('k_v2')-.25,.22);
 box(680,190,540,300,g('k_v2'),{lw:6},a=>{txt('Khai điều chỉnh theo',30,70,{size:28});txt('MẪU SỐ 03',30,150,{size:58,col:RED});txt('và nộp lại số thuế',30,220,{size:28});txt('đã được giảm',30,258,{size:28})});
 source(SRC2,1)}
function sE(t){vxTodo(g('s8'),[[g('k_e1'),'Ghi chép doanh thu đầy đủ','để chứng minh không quá 10 tỷ đồng/năm'],[g('s9'),'Khi khai thuế: nộp kèm Mẫu số 01','để khai phần thuế được giảm'],[g('s10'),'Quyết toán năm 2026: kiểm tra đã được giảm;','chưa rõ thì hỏi cơ quan thuế quản lý']])}
function sF(t){vxDisclaimer(g('out'),'Nghị quyết 43/2026/QH16 · thông qua 24/8/2026 · hiệu lực từ ngày thông qua','Hướng dẫn: Nghị định 398/2026/NĐ-CP (hiệu lực 29/10/2026)',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Nghị quyết 43/2026/QH16  ·  thông qua 24/8/2026  ·  hiệu lực từ ngày thông qua, áp dụng năm 2026–2027',
 images:{shop:'img/shop.jpg',market:'img/market.jpg',pho:'img/pho.jpg',calc:'img/calc.jpg',sign:'img/sign.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sN],[()=>g('s3')-.15,sW],[()=>g('s4')-.15,sG],[()=>g('s5')-.15,sX],[()=>g('s6')-.15,sH],[()=>g('s7')-.15,sV],[()=>g('s8')-.15,sE],[()=>g('out')-.15,sF]]});
