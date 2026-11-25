// Tập: Luật Xử lý vi phạm hành chính (sửa đổi) 2026: phục vụ cộng đồng thay phạt tiền đến 5 triệu đồng.
// Nghiêm túc, một video một vấn đề, khoảng 2 phút 05 giây, không nhạc.
const SRC0='Nguồn: Cổng TTĐT Chính phủ, Báo Chính phủ, VietnamPlus (20/11/2026)';
const SRC_L='Nguồn: VnExpress, Tiền Phong, Thanh Niên, LuatVietnam (20–21/11/2026). Chờ đối chiếu văn bản chính thức.';
function clock(cx,cy,r,t0){return sketch([circ(cx,cy,r,-1.6,4.9,3),seg(cx,cy,cx,cy-r*.62,5),seg(cx,cy,cx+r*.45,cy+r*.08,7)],t0,.5)}
function sA(t){
 photoCard('broom',80,170,380,390,.1,{rot:-.035});
 stamp('TỪ 01/01/2028',1050,128,P(.35,.4),{size:30,rot:.05});
 txt('Bị phạt hành chính',520,232,{size:54,a:P(g('op1')+1.3,.2)});txt('đến 5 triệu đồng',520,302,{size:54,col:RED,a:P(g('k_5tr')-.1,.2)});
 underline(520,320,tw('đến 5 triệu đồng',54),g('k_5tr')+.2,.4);
 box(520,368,660,196,g('k_cv'),{lw:6},a=>{txt('CÓ THỂ LÀM CÔNG VIỆC',34,52,{size:23,col:GREY,ls:3});txt('PHỤC VỤ CỘNG ĐỒNG',32,116,{size:50,col:RED});txt('thay cho việc nộp tiền',34,164,{size:28,w:600,a:P(g('k_thay'),.2)})});
 source(SRC_L,P(1,.4))}
function sM(t){const t0=g('op2');
 box(300,100,680,96,t0+.1,{lw:6},a=>{txt('PHỤC VỤ CỘNG ĐỒNG THAY PHẠT TIỀN',340,62,{size:32,align:'center'})});
 const bx=[60,465,870],lab=[['Ai được','áp dụng?'],['Phải làm','bao nhiêu giờ?'],['Điều gì còn','chờ hướng dẫn?']],ph=['plant','street','gavel'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC_L,1)}
function sP(t){const t0=g('s1');title(null,'QUY ĐỊNH Ở ĐÂU?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_luat')-.25,{lw:6},a=>{txt('VĂN BẢN',175,58,{size:21,col:GREY,align:'center',ls:1});txt('Luật Xử lý',175,136,{size:38,align:'center'});txt('vi phạm',175,184,{size:38,align:'center'});txt('hành chính',175,232,{size:38,align:'center'});txt('(sửa đổi)',175,278,{size:28,w:600,col:RED,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{photo('gavel',14,14,322,130);txt('QUỐC HỘI THÔNG QUA',175,184,{size:21,col:GREY,align:'center',ls:1});txt('20/11/2026',175,240,{size:46,align:'center'});txt('460/464 phiếu tán thành',175,286,{size:22,w:600,col:GREY,align:'center',a:P(g('k_phieu'),.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_131')-.3,.2);
 box(886,y,350,h,g('k_131'),{},a=>{txt('LUẬT GỒM',175,58,{size:21,col:GREY,align:'center',ls:1});txt('131',175,196,{size:120,align:'center'});txt('điều',175,250,{size:30,w:600,align:'center'})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_131')+.5,.3)});
 source(SRC0,1)}
function sH(t){const t0=g('s2');title(null,'HIỆN NAY: BỊ PHẠT TIỀN THÌ SAO?',t0,{sub:'Theo Luật Xử lý vi phạm hành chính hiện hành, Điều 78'});
 const y=196,h=320;
 box(50,y,350,h,g('k_h1')-.2,{col:GREY},a=>{txt('BƯỚC 1',175,54,{size:21,col:GREY,align:'center',ls:2});icon('paper',115,66,120,g('k_h1'),.5);txt('Nhận quyết định',175,236,{size:30,align:'center'});txt('xử phạt',175,276,{size:30,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_h2')-.5,.2);
 box(468,y,350,h,g('k_h2')-.3,{},a=>{txt('THỜI HẠN NỘP TIỀN',175,54,{size:21,col:GREY,align:'center',ls:2});txt('10 ngày',175,168,{size:76,align:'center'});txt('kể từ ngày nhận',175,228,{size:24,w:600,align:'center'});txt('quyết định xử phạt',175,262,{size:24,w:600,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_h3')-.3,.2);
 box(886,y,350,h,g('k_h3'),{lw:6},a=>{txt('NỘP CHẬM',175,54,{size:21,col:RED,align:'center',ls:2});txt('+0,05%',175,168,{size:70,col:RED,align:'center',a:P(g('k_h4')-.1,.2)});txt('mỗi ngày, trên số tiền',175,228,{size:24,w:600,align:'center',a:P(g('k_h4')-.1,.2)});txt('chưa nộp',175,262,{size:24,w:600,align:'center',a:P(g('k_h4')+.9,.2)})});
 source('Nguồn: Điều 78 Luật Xử lý vi phạm hành chính hiện hành (theo LuatVietnam, Thư viện Pháp luật, Tạp chí Luật sư Việt Nam).',1)}
function sN(t){const t0=g('s3');title(null,'LUẬT MỚI: THÊM MỘT LỰA CHỌN',t0);
 box(60,216,420,270,t0+.3,{col:GREY},a=>{txt('HÌNH THỨC XỬ PHẠT',210,56,{size:21,col:GREY,align:'center',ls:2});txt('Phạt tiền',210,160,{size:62,align:'center'});txt('đến 5 triệu đồng',210,212,{size:26,w:600,col:GREY,align:'center'})});
 arrow(492,351,588,351,g('k_n4')-.2,.25);txt('thay bằng',540,332,{size:19,w:600,col:RED,align:'center',a:P(g('k_n4'),.25)});
 box(600,176,620,350,g('k_n2')-.25,{lw:6},a=>{photo('plant',14,14,592,160);txt('Thực hiện công việc',310,228,{size:38,align:'center'});txt('phục vụ cộng đồng',310,278,{size:38,col:RED,align:'center'});txt('(thường gọi: lao động công ích)',310,320,{size:22,w:600,col:GREY,align:'center',a:P(g('k_n3'),.25)})});
 source(SRC_L,1)}
function row(y,n,t0,fn,o={}){arrow(328,340,392,y+55,t0-.05,.2);box(400,y,830,110,t0+.13,o,a=>{badge(n,50,55,t0+.2,24);fn(a)})}
function sC(t){const t0=g('s4');title(null,'BA ĐIỀU KIỆN',t0,{sub:'Để được làm công việc phục vụ cộng đồng thay cho nộp tiền phạt'});
 box(50,206,270,270,t0+.3,{lw:6},a=>{photo('broom',14,14,242,140);txt('Được áp dụng',135,200,{size:28,align:'center'});txt('khi',135,236,{size:28,align:'center'})});
 row(176,1,g('k_d1'),a=>{txt('Người vi phạm là',96,67,{size:34});txt('cá nhân',96+tw('Người vi phạm là',34)+12,67,{size:34,col:RED})});
 row(302,2,g('k_d2'),a=>{txt('Mức phạt tiền',96,67,{size:34});txt('từ 5 triệu đồng trở xuống',96+tw('Mức phạt tiền',34)+12,67,{size:34,col:RED})},{lw:6});
 row(428,3,g('k_d3'),a=>{txt('Đã',96,67,{size:34});const w=tw('Đã',34)+12;txt('nhận lỗi',96+w,67,{size:34,col:RED});const w2=w+tw('nhận lỗi',34)+12;txt('và',96+w2,67,{size:34});const w3=w2+tw('và',34)+12;txt('tự nguyện đề nghị',96+w3,67,{size:34,col:RED})});
 source(SRC_L,1)}
function sG(t){const t0=g('s5');title(null,'GIỚI HẠN THỜI GIAN LÀM VIỆC',t0);
 const y=186,h=320,xs=[50,468,886],lab=['MỖI NGÀY','MỖI TUẦN','TỔNG CỘNG'],big=['4 giờ','5 ngày','40 giờ'],ts=[g('k_g1'),g('k_g2'),g('k_g3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.15;box(xs[i],y,350,h,ti,i==2?{lw:7}:{},a=>{txt(lab[i],175,54,{size:22,col:i==2?RED:GREY,align:'center',ls:2});
  if(i==0)clock(175,112,34,ti+.2);else if(i==1)icon('calendar',135,72,80,ti+.2,.45);else{clock(140,112,30,ti+.2);clock(214,112,30,ti+.45)}
  txt('không quá',175,196,{size:26,w:600,align:'center'});txt(big[i],175,278,{size:84,col:i==2?RED:INK,align:'center'})})}
 source(SRC_L,1)}
function sK(t){const t0=g('s6');title(null,'NẾU KHÔNG THỰC HIỆN?',t0);
 const y=206,h=280;
 box(50,y,350,h,g('k_k1')-.3,{col:GREY},a=>{txt('NGƯỜI VI PHẠM',175,54,{size:21,col:GREY,align:'center',ls:2});txt('Không thực hiện',175,140,{size:32,align:'center'});txt('công việc',175,182,{size:32,align:'center'});txt('được giao',175,224,{size:32,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_k2')-.3,.2);
 box(468,y,350,h,g('k_k2'),{},a=>{txt('NGƯỜI CÓ THẨM QUYỀN',175,54,{size:21,col:GREY,align:'center',ls:2});txt('Có thể',175,140,{size:32,align:'center'});txt('chấm dứt',175,182,{size:32,col:RED,align:'center'});txt('biện pháp này',175,224,{size:32,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_k3')-.3,.2);
 box(886,y,350,h,g('k_k3'),{lw:6},a=>{txt('KẾT QUẢ',175,54,{size:21,col:RED,align:'center',ls:2});txt('Chuyển lại sang',175,140,{size:30,align:'center'});txt('PHẠT TIỀN',175,208,{size:54,col:RED,align:'center'})});
 source('Nguồn: báo chí dẫn giải trình của cơ quan soạn thảo tại Quốc hội (11/2026). Chờ đối chiếu văn bản chính thức.',1)}
function sW(t){const t0=g('s7');title(null,'CÒN CHỜ CHÍNH PHỦ QUY ĐỊNH',t0);
 box(300,170,680,96,g('k_w0')-.4,{lw:6},a=>{txt('Luật giao Chính phủ quy định chi tiết',340,61,{size:31,align:'center'})});
 const bx=[60,465,870],lab=[['Làm','công việc gì?'],['Làm','ở đâu?'],['Quy đổi tiền phạt','ra giờ thế nào?']],ts=[g('k_w1'),g('k_w2'),g('k_w3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.2;arrow(640+(i-1)*160,270,bx[i]+175,342,ti,.2);box(bx[i],348,350,180,ti+.15,{col:GREY},a=>{txt('HIỆN CHƯA RÕ',175,44,{size:19,col:GREY,align:'center',ls:2});txt(lab[i][0],175,104,{size:34,align:'center'});txt(lab[i][1],175,148,{size:34,align:'center'})})}
 source(SRC_L,1)}
function sX(t){const t0=g('s8');title(null,'ĐIỂM MỚI KHÁC: MỨC PHẠT TIỀN TỐI ĐA',t0,{sub:'Chỉ áp dụng trong một số lĩnh vực'});
 const mk=(px,ti,lab,a1,a2,lw)=>box(px,196,540,320,ti,{lw},a=>{txt(lab,270,54,{size:22,col:GREY,align:'center',ls:3});txt('Hiện nay: '+a1,270,112,{size:32,w:600,col:GREY,align:'center'});arrow(270,128,270,172,ti+.35,.18);txt(a2,270,258,{size:76,col:RED,align:'center',a:P(ti+.5,.2)})});
 mk(60,g('k_x1')-.2,'CÁ NHÂN','1 tỷ đồng','1,5 tỷ đồng',4);mk(680,g('k_x2')-.1,'TỔ CHỨC','2 tỷ đồng','3 tỷ đồng',6);
 source('Nguồn: Báo Nhân Dân, Dân trí, An ninh Thủ đô (20/11/2026). Mức hiện nay theo VOV, Dân trí, Thanh Niên.',1)}
function sD(t){const t0=g('s9');title(null,'ÁP DỤNG TỪ KHI NÀO?',t0);
 stamp('CHƯA ÁP DỤNG NGAY',1010,112,P(g('k_t0'),.4),{size:28,rot:.04});
 sketch([seg(110,300,1170,300,5)],t0+.3,.6,{lw:6});
 const pm=P(g('k_t1')+.6,.25);if(pm>0){x.save();x.globalAlpha*=pm;x.fillStyle=RED;x.beginPath();x.arc(640,300,13,0,6.2832);x.fill();x.restore();txt('01/01/2028',640,262,{size:50,col:RED,align:'center',a:pm})}
 box(680,346,500,170,g('k_t1')+.8,{lw:6},a=>{txt('TỪ 01/01/2028',34,50,{size:21,col:RED,ls:2});txt('Luật mới',34,104,{size:36});txt('có hiệu lực',34,146,{size:36})});
 box(100,346,500,170,g('k_t2'),{col:GREY},a=>{txt('TỪ NAY ĐẾN HẾT NĂM 2027',34,50,{size:21,col:GREY,ls:2});txt('Nộp tiền phạt theo',34,104,{size:36});txt('quy định hiện hành',34,146,{size:36})});
 txt('Riêng nội dung tại khoản 1 Điều 131 của Luật có thời điểm áp dụng khác.',640,560,{size:18,w:600,col:GREY,align:'center',a:P(g('k_t2')+1.2,.3)});
 source('Nguồn: Cổng TTĐT Chính phủ, Báo Chính phủ, Thanh Niên (20/11/2026).',1)}
function sE(t){vxTodo(g('s10'),[[g('k_e1'),'Bị phạt từ nay đến hết 2027: nộp tiền đúng hạn','để không bị tính thêm tiền chậm nộp'],[g('s11'),'Từ 2028, bị phạt đến 5 triệu đồng và muốn phục vụ','cộng đồng: nhận lỗi, chủ động đề nghị'],[g('s12'),'Theo dõi nghị định hướng dẫn của Chính phủ','để biết thủ tục cụ thể']])}
function sF(t){vxDisclaimer(g('out'),'Luật Xử lý vi phạm hành chính (sửa đổi) · hiệu lực 01/01/2028','Thông qua 20/11/2026 · Số hiệu luật: chờ công bố chính thức',g('k_src'),SRC0+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật Xử lý vi phạm hành chính (sửa đổi)  ·  thông qua 20/11/2026  ·  hiệu lực 01/01/2028',
 images:{broom:'img/broom.jpg',plant:'img/plant.jpg',street:'img/street.jpg',gavel:'img/gavel.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sH],[()=>g('s3')-.15,sN],[()=>g('s4')-.15,sC],[()=>g('s5')-.15,sG],[()=>g('s6')-.15,sK],[()=>g('s7')-.15,sW],[()=>g('s8')-.15,sX],[()=>g('s9')-.15,sD],[()=>g('s10')-.15,sE],[()=>g('out')-.15,sF]]});
