// Tập: Luật sửa đổi Luật Trợ giúp pháp lý (Luật số 05/2026/QH16), góc "thêm ai được trợ giúp pháp lý miễn phí từ 01/01/2027". Nghiêm túc, khoảng 2 phút 8 giây.
const SRC1='Nguồn: Thư viện Pháp luật, LuatVietnam (văn bản hợp nhất), VOH, Cổng TTĐT xã Quỳnh Sơn (Nghệ An)';
const SRC2='Nguồn: Dân chủ & Pháp luật, VOH, Huỳnh Nam Law, Cổng TTĐT xã Quỳnh Sơn (Nghệ An), Sở Tư pháp Quảng Ngãi. Chờ đối chiếu văn bản chính thức.';
const SOHIEU='Luật số 05/2026/QH16';
function chip(s,px,py,t0,size=24,o={}){const w=tw(s,size)+40;box(px,py,w,58,t0,{lw:3,r:29,...o},a=>{txt(s,w/2,39,{size,align:'center'})});return w}
function sA(t){
 photoCard('books',70,170,400,380,.1,{rot:-.035});
 stamp('TỪ 01/01/2027',1050,128,P(.4,.4),{size:30,rot:.05});
 txt('LUẬT TRỢ GIÚP PHÁP LÝ (SỬA ĐỔI)',520,186,{size:22,col:GREY,ls:3,a:P(.4,.25)});
 txt('Thêm nhiều người được',520,248,{size:46,a:P(g('k_them'),.2)});
 txt('trợ giúp pháp lý miễn phí',520,306,{size:46,col:RED,a:P(g('k_mp')-.3,.2)});underline(520,322,tw('trợ giúp pháp lý miễn phí',46),g('k_mp')+.2,.4);
 box(520,360,680,84,g('k_dt'),{},a=>{txt('Người dân tộc thiểu số rất ít người',30,54,{size:30})});
 box(520,456,680,84,g('k_ld'),{},a=>{txt('Lao động thu nhập thấp bị buộc tội, bị hại',30,54,{size:28})});
 source(SRC2,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('TRỢ GIÚP PHÁP LÝ MIỄN PHÍ',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Trợ giúp pháp lý','là gì?'],['Ai được','hưởng thêm?'],['Bạn nên','làm gì?']],ph=['books','gavel','contract'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO? KHI NÀO?',t0,{sub:'Luật sửa đổi, bổ sung một số điều của Luật Trợ giúp pháp lý'});
 const y=186,h=330;
 box(50,y,350,h,t0+.3,{lw:6},a=>{txt('SỐ HIỆU',175,58,{size:21,col:GREY,align:'center',ls:1});icon('paper',115,78,120,t0+.5,.5);txt('05/2026/QH16',175,262,{size:38,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{photo('gavel',14,14,322,140);txt('QUỐC HỘI THÔNG QUA',175,196,{size:21,col:GREY,align:'center',ls:1});txt('23/4/2026',175,256,{size:48,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/01/2027',175,270,{size:50,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 source(SRC1,1)}
function sD(t){const t0=g('s2');title(null,'TRỢ GIÚP PHÁP LÝ LÀ GÌ?',t0);
 box(240,170,800,110,g('k_d1')-.2,{lw:6},a=>{txt('Dịch vụ pháp lý MIỄN PHÍ',400,52,{size:36,align:'center'});txt('do Nhà nước bảo đảm',400,90,{size:24,w:600,align:'center'})});
 const bx=[60,465,870],ic=['bubble','shield','paper'],lab=[['Tư vấn','pháp luật'],['Tham gia','tố tụng'],['Đại diện','ngoài tố tụng']],ts=[g('k_d2'),g('k_d3'),g('k_d4')];
 for(let i=0;i<3;i++){const ti=ts[i]-.2;arrow(640+(i-1)*160,286,bx[i]+175,336,ti,.2);box(bx[i],340,350,200,ti+.12,{},a=>{icon(ic[i],130,14,90,ti+.2,.5);txt(lab[i][0],175,140,{size:30,align:'center'});txt(lab[i][1],175,178,{size:30,align:'center'})})}
 source('Nguồn: Luật Trợ giúp pháp lý 2017 (Luật số 11/2017/QH14), Điều 2 và Điều 27.',1)}
function sH(t){const t0=g('s3');title(null,'HIỆN NAY AI ĐƯỢC TRỢ GIÚP?',t0,{sub:'Theo Luật Trợ giúp pháp lý năm 2017, Điều 7 (một số nhóm)'});
 txt('ĐƯỢC TRỢ GIÚP',80,214,{size:21,col:GREY,ls:2,a:P(g('k_h1')-.2,.2)});
 let px=80;px+=chip('Người có công',px,228,g('k_h1'))+12;px+=chip('Hộ nghèo',px,228,g('k_h2'))+12;px+=chip('Trẻ em',px,228,g('k_h3'))+12;
 chip('Dân tộc thiểu số ở vùng đặc biệt khó khăn',80,296,g('k_h4'));
 box(80,370,1120,170,g('k_h5'),{col:GREY},a=>{txt('NHÓM KHÁC: PHẢI CÓ KHÓ KHĂN VỀ TÀI CHÍNH',30,46,{size:21,col:GREY,ls:2});
  txt('Người cao tuổi · Người khuyết tật · Nạn nhân bạo lực gia đình · ...',30,100,{size:28});
  txt('Điều kiện: có khó khăn về tài chính',30,144,{size:26,col:RED,a:P(g('k_h6'),.2)})});
 source('Nguồn: Luật Trợ giúp pháp lý 2017 (Luật số 11/2017/QH14), Điều 7.',1)}
function sN(t){const t0=g('s4');title(null,'LUẬT MỚI: BỔ SUNG',t0,{sub:'Mở rộng diện người được trợ giúp pháp lý'});
 box(80,190,1120,150,g('k_n1'),{lw:6},a=>{badge(1,50,75,g('k_n1')+.1,26);txt('Người dân tộc thiểu số rất ít người',100,70,{size:36});txt('Không phụ thuộc nơi cư trú',100,116,{size:26,w:600,col:RED,a:P(g('k_n1b'),.2)})});
 box(80,370,1120,150,g('k_n2'),{lw:6},a=>{badge(2,50,75,g('k_n2')+.1,26);txt('Người lao động có thu nhập thấp',100,70,{size:36});txt('Khi là người bị buộc tội, hoặc là bị hại',100,116,{size:26,w:600,col:RED,a:P(g('k_n2b'),.2)})});
 source(SRC2,1)}
function sB(t){const t0=g('s6');title(null,'THEO BÁO CHÍ',t0,{sub:'Mới thấy ở một số bài viết, chưa đủ hai nguồn độc lập'});
 box(80,190,1120,120,g('k_b1')+.3,{col:GREY},a=>{txt('Mọi người thuộc hộ cận nghèo được trợ giúp',30,72,{size:32})});
 box(80,330,1120,120,g('k_b2'),{col:GREY},a=>{txt('Bỏ điều kiện khó khăn về tài chính với một số nhóm',30,72,{size:32})});
 stamp('CẦN ĐỐI CHIẾU VĂN BẢN',640,520,P(g('k_b3'),.35),{size:34,rot:-.05});
 source('Nguồn: một bài tổng hợp điểm mới (Cổng TTĐT cấp xã). Hiện nay: Luật 2017 chỉ trợ giúp người thuộc hộ cận nghèo khi là người bị buộc tội.',1)}
function sW(t){const t0=g('s7');title(null,'AI ĐƯỢC LỢI? TỪ KHI NÀO?',t0);
 box(240,180,800,110,g('k_w1')-.1,{},a=>{txt('Những người thuộc các nhóm trên',400,68,{size:34,align:'center'})});
 box(390,320,500,100,g('k_w2'),{lw:6},a=>{txt('TỪ 01/01/2027',250,66,{size:44,col:RED,align:'center'})});
 box(140,450,1000,90,g('k_w3'),{},a=>{txt('CÒN CHỜ',30,56,{size:19,col:RED,ls:2});txt('Hướng dẫn: mức thu nhập thấp, giấy tờ chứng minh',150,56,{size:24,w:600})});
 source(SRC1,1)}
function sE(t){vxTodo(g('s8'),[[g('k_e1'),'Liên hệ Trung tâm trợ giúp pháp lý','nhà nước ở tỉnh, thành phố nơi bạn sống'],[g('s9'),'Mang giấy tờ chứng minh thuộc diện','(căn cước, xác nhận hộ nghèo, cận nghèo)'],[g('s10'),'Bị buộc tội, là bị hại: hỏi cơ quan','tố tụng về quyền được trợ giúp'],[g('k_e2'),'Cảnh giác người "của Nhà nước" đòi tiền:','trợ giúp pháp lý là miễn phí']]);
 underline(300,172+80,tw('nhà nước ở tỉnh, thành phố nơi bạn sống',26),g('k_e1b'),.4,{col:GREEN});underline(300,172+3*108+80,tw('trợ giúp pháp lý là miễn phí',26),g('k_e2b'),.4,{col:GREEN})}
function sF(t){vxDisclaimer(g('out'),'Luật sửa đổi Luật Trợ giúp pháp lý · thông qua 23/4/2026 · hiệu lực 01/01/2027',SOHIEU,g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật số 05/2026/QH16 (sửa đổi Luật Trợ giúp pháp lý)  ·  thông qua 23/4/2026  ·  hiệu lực 01/01/2027',
 images:{books:'img/books.jpg',gavel:'img/gavel.jpg',contract:'img/contract.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sD],[()=>g('s3')-.15,sH],[()=>g('s4')-.15,sN],[()=>g('s6')-.15,sB],[()=>g('s7')-.15,sW],[()=>g('s8')-.15,sE],[()=>g('out')-.15,sF]]});
