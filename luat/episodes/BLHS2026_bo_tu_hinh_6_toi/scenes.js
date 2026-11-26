// Tập: Bộ luật Hình sự (sửa đổi) 2026, góc "bỏ tử hình với 6 tội, trọng tâm ma túy và hiếp dâm người dưới 16 tuổi". Nghiêm túc, trung lập, khoảng 2 phút 14 giây.
const SRC1='Nguồn: Tiền Phong, CAND, Nhân Dân, Tạp chí Luật sư Việt Nam (20/11/2026)';
const SRC2='Nguồn: Tiền Phong, Công lý, SGGP, LSVN, VnExpress, CafeF (20–21/11/2026). Chờ đối chiếu văn bản chính thức.';
const SOHIEU='Số hiệu luật: chờ công bố chính thức';
function strike(px,py,w,p){if(p<=0)return;x.save();x.strokeStyle=RED;x.lineWidth=6;x.lineCap='round';x.beginPath();x.moveTo(px,py);x.lineTo(px+w*ease(p),py-6*ease(p));x.stroke();x.restore()}
function chip(s,px,py,t0,size=24,o={}){const w=tw(s,size)+40;box(px,py,w,58,t0,{lw:3,r:29,...o},a=>{txt(s,w/2,39,{size,align:'center'})});return w}
function sA(t){
 photoCard('gavel',70,170,400,380,.1,{rot:-.035});
 stamp('TỪ 01/3/2027',1060,128,P(.4,.4),{size:30,rot:.05});
 txt('BỘ LUẬT HÌNH SỰ (SỬA ĐỔI)',520,186,{size:22,col:GREY,ls:3,a:P(.4,.25)});
 box(520,210,680,76,g('k_mt')-.1,{},a=>{txt('Mua bán trái phép chất ma túy',30,50,{size:32})});
 box(520,298,680,76,g('k_hd')-.1,{},a=>{txt('Hiếp dâm người dưới 16 tuổi',30,50,{size:32})});
 box(520,400,330,140,g('k_kc'),{col:GREY},a=>{txt('TỬ HÌNH',165,64,{size:40,col:GREY,align:'center'});strike(40,54,250,P(g('k_kc')+.4,.35));txt('Không còn',165,112,{size:24,w:600,align:'center'})});
 arrow(858,470,890,470,g('k_ct')-.25,.2);
 box(898,400,302,140,g('k_ct'),{lw:6},a=>{txt('MỨC CAO NHẤT',151,52,{size:19,col:GREY,align:'center',ls:2});txt('Tù chung thân',151,104,{size:34,col:RED,align:'center'})});
 source(SRC2,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('BỎ TỬ HÌNH VỚI 6 TỘI',310,62,{size:36,align:'center'})});
 const bx=[60,465,870],lab=[['Luật','thay đổi gì?'],['Áp dụng','thế nào?'],['Vì sao không','là xử nhẹ?']],ph=['gavel','cuffs','prison'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO? KHI NÀO?',t0,{sub:'Bộ luật Hình sự (sửa đổi), 417 điều'});
 const y=186,h=330;
 box(50,y,350,h,g('k_qh')-.05,{},a=>{photo('gavel',14,14,322,140);txt('QUỐC HỘI THÔNG QUA',175,196,{size:21,col:GREY,align:'center',ls:1});txt('20/11/2026',175,254,{size:46,align:'center'});txt('Bộ luật Hình sự (sửa đổi)',175,296,{size:20,w:600,col:GREY,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_phieu')-.3,.2);
 box(468,y,350,h,g('k_phieu'),{},a=>{txt('PHIẾU TÁN THÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('463',175,196,{size:120,align:'center'});txt('trên 472 đại biểu',175,250,{size:25,w:600,align:'center'});txt('tham gia biểu quyết',175,284,{size:25,w:600,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/3/2027',175,270,{size:54,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 txt(SOHIEU,640,568,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl')+.7,.3)});
 source(SRC1,1)}
function sH(t){const t0=g('s2');title(null,'HIỆN NAY THẾ NÀO?',t0,{sub:'Theo Bộ luật Hình sự năm 2015 (sửa đổi, bổ sung)'});
 box(340,170,600,90,g('k_th'),{},a=>{txt('Tử hình: hình phạt nặng nhất',300,58,{size:32,align:'center'})});
 box(80,300,540,200,g('k_hn1')-.1,{col:GREY},a=>{txt('ĐIỀU 251',30,46,{size:20,col:GREY,ls:2});txt('Mua bán trái phép',30,100,{size:32});txt('chất ma túy',30,142,{size:32})});
 box(660,300,540,200,g('k_hn2')-.1,{col:GREY},a=>{txt('ĐIỀU 142',30,46,{size:20,col:GREY,ls:2});txt('Hiếp dâm người',30,100,{size:32});txt('dưới 16 tuổi',30,142,{size:32})});
 txt('Khung cao nhất hiện nay: TỬ HÌNH',640,560,{size:30,col:RED,align:'center',a:P(g('k_hn3'),.25)});
 source('Nguồn: Bộ luật Hình sự 2015 (sửa đổi, bổ sung 2017, 2025), Điều 142 và Điều 251.',1)}
function sS(t){const t0=g('s3');title(null,'BỎ TỬ HÌNH VỚI 6 TỘI',t0);
 txt('HAI TỘI THƯỜNG GẶP TRONG TIN TỨC',80,196,{size:21,col:GREY,ls:2,a:P(g('k_6a'),.2)});
 box(80,214,540,130,g('k_6b')-.1,{lw:6},a=>{txt('Mua bán trái phép',30,58,{size:32});txt('chất ma túy',30,100,{size:32})});
 box(660,214,540,130,g('k_6c')-.1,{lw:6},a=>{txt('Hiếp dâm người',30,58,{size:32});txt('dưới 16 tuổi',30,100,{size:32})});
 txt('BỐN TỘI CÒN LẠI (an ninh quốc gia; hòa bình, nhân loại)',80,404,{size:21,col:GREY,ls:1,a:P(g('k_6d'),.2)});
 let px=80;const tt=g('k_6d')+.4;px+=chip('Bạo loạn',px,424,tt,22,{col:GREY})+12;px+=chip('Khủng bố nhằm chống chính quyền nhân dân',px,424,tt+.15,22,{col:GREY})+12;
 px=80;px+=chip('Chống loài người',px,494,tt+.3,22,{col:GREY})+12;chip('Tội phạm chiến tranh',px,494,tt+.45,22,{col:GREY});
 source(SRC2,1)}
function sC(t){const t0=g('s4');title(null,'MỨC CAO NHẤT: TÙ CHUNG THÂN',t0);
 photoCard('prison',90,180,460,330,t0+.2,{rot:-.03});
 box(620,200,580,160,g('k_ct1')-.1,{lw:6},a=>{txt('VỚI 6 TỘI NÀY, MỨC CAO NHẤT',30,48,{size:20,col:GREY,ls:2});txt('Tù chung thân',30,118,{size:54,col:RED})});
 box(620,390,580,110,g('k_ct2'),{},a=>{txt('Tức là ở tù suốt đời',30,70,{size:34})});
 source('Nguồn: VnExpress, Thanh tra, Tiền Phong (20–21/11/2026). Chờ đối chiếu văn bản chính thức.',1)}
function sG(t){const t0=g('s5');title(null,'VẪN GIỮ TỬ HÌNH VỚI 4 TỘI',t0);
 const L=[['Phản bội Tổ quốc','k_g1'],['Giết người','k_g2'],['Khủng bố','k_g3'],['Sản xuất trái phép chất ma túy','k_g4']];
 L.forEach(([s,k],i)=>{const cx=i%2,cy=Math.floor(i/2);box(100+cx*560,190+cy*170,520,140,g(k)-.1,{},a=>{badge(i+1,46,70,g(k),24);txt(s,90,82,{size:s.length>20?26:34})})});
 source(SRC2,1)}
function sD(t){const t0=g('s6');title(null,'ÁP DỤNG THẾ NÀO?',t0);
 box(80,180,540,170,g('k_a1')-.1,{lw:6},a=>{icon('calendar',24,30,100,g('k_a1'),.5);txt('BỘ LUẬT ÁP DỤNG',140,56,{size:20,col:GREY,ls:2});txt('Hành vi phạm tội',140,104,{size:30});txt('từ 01/3/2027',140,144,{size:30,col:RED})});
 box(660,180,540,170,g('k_a2'),{},a=>{icon('paper',24,30,100,g('k_a2'),.5);txt('NGHỊ QUYẾT THI HÀNH',140,56,{size:20,col:GREY,ls:2});txt('Từ khi Bộ luật công bố,',140,104,{size:26,a:P(g('k_a2')+.6,.2)});txt('không tuyên tử hình',140,144,{size:26,col:RED,a:P(g('k_a3'),.2)})});
 box(80,390,1120,170,g('s7'),{col:GREY},a=>{photo('cuffs',14,14,220,142);txt('ÁN TỬ HÌNH ĐÃ TUYÊN, CHƯA THI HÀNH',260,48,{size:20,col:GREY,ls:2});
  txt('Không thi hành nữa',260,100,{size:34,a:P(g('k_b2'),.2)});txt('Chuyển sang tù chung thân (theo báo chí: Chánh án TAND tối cao quyết định)',260,142,{size:20,w:600,a:P(g('k_b3'),.25)})});
 source('Nguồn: LSVN, Báo Pháp luật, Thanh tra (20–21/11/2026). Chờ đối chiếu văn bản chính thức.',1)}
function sX(t){const t0=g('s8');title(null,'CẦN HIỂU ĐÚNG',t0);
 box(60,180,520,170,g('k_x1')-.1,{},a=>{txt('Bỏ tử hình',260,100,{size:48,align:'center'})});
 txt('≠',640,300,{size:96,col:RED,align:'center',a:P(g('k_x1')+.8,.2)});
 box(700,180,520,170,g('k_x1')+1,{lw:6},a=>{txt('Xử nhẹ',260,100,{size:48,col:RED,align:'center'})});
 box(160,400,960,150,g('k_x2'),{},a=>{txt('Tù chung thân vẫn là hình phạt rất nặng',480,62,{size:32,align:'center'});txt('Mua bán ma túy, xâm hại trẻ em: tội đặc biệt nghiêm trọng',480,112,{size:24,w:600,col:RED,align:'center',a:P(g('k_x3'),.2)})});
 source(SRC2,1)}
function sE(t){vxTodo(g('s9'),[[g('k_e1'),'Không nhận vận chuyển "hàng hộ",','không cất giữ đồ lạ cho người khác'],[g('s10'),'Phụ huynh cảnh giác xâm hại trẻ em;','báo công an hoặc gọi tổng đài 111'],[g('s11'),'Người thân bị điều tra, xét xử: hỏi luật sư','về quy định có lợi cho người phạm tội']]);
 underline(300,172+93+7,tw('không cất giữ đồ lạ cho người khác',30),g('k_e1b'),.4,{col:GREEN});underline(300,172+138+93+7,tw('báo công an hoặc gọi tổng đài 111',30),g('k_e2'),.4,{col:GREEN});underline(300,172+2*138+93+7,tw('về quy định có lợi cho người phạm tội',30),g('k_e3'),.4,{col:GREEN})}
function sF(t){vxDisclaimer(g('out'),'Bộ luật Hình sự (sửa đổi) · thông qua 20/11/2026 · hiệu lực 01/3/2027',SOHIEU,g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Bộ luật Hình sự (sửa đổi)  ·  thông qua 20/11/2026  ·  hiệu lực 01/3/2027',
 images:{gavel:'img/gavel.jpg',cuffs:'img/cuffs.jpg',prison:'img/prison.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sH],[()=>g('s3')-.15,sS],[()=>g('s4')-.15,sC],[()=>g('s5')-.15,sG],[()=>g('s6')-.15,sD],[()=>g('s8')-.15,sX],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
