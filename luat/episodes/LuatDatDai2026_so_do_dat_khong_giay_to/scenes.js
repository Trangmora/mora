// Tập: Luật Đất đai (sửa đổi) 2026, góc "cấp sổ đỏ cho đất không giấy tờ, mua bán giấy tay". Nghiêm túc, một vấn đề, khoảng 2 phút 23 giây.
const SRC1='Nguồn: Cổng TTĐT Chính phủ, VTV, VietnamPlus, VnExpress (21/11/2026)';
const SRC2='Nguồn: CAND, VOH, Vietstock, Dân trí, Thanh Niên, Báo Hải Phòng (21–26/11/2026). Chờ đối chiếu văn bản chính thức.';
const SOHIEU='Luật số 47/2026/QH16 (theo VTV, TTXVN, VnEconomy; chờ đối chiếu Công báo)';
function sA(t){
 photoCard('farm',70,170,400,380,.1,{rot:-.035});
 stamp('TỪ 01/7/2027',1060,128,P(g('k_tu'),.4),{size:30,rot:.05});
 txt('LUẬT ĐẤT ĐAI (SỬA ĐỔI)',520,190,{size:22,col:GREY,ls:3,a:P(.4,.25)});
 txt('Đất không giấy tờ,',520,252,{size:50,a:P(.5,.2)});
 txt('mua bán giấy tay',520,314,{size:50,a:P(g('k_gt'),.2)});
 box(520,352,680,190,g('k_xx'),{lw:6},a=>{txt('VẪN CÓ THỂ ĐƯỢC',34,52,{size:22,col:GREY,ls:3});txt('xem xét cấp sổ đỏ',34,128,{size:56,col:RED});underline(34,144,tw('xem xét cấp sổ đỏ',56),g('k_xx')+.5,.4)});
 source(SRC2,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('CẤP SỔ ĐỎ LẦN ĐẦU',310,62,{size:36,align:'center'})});
 const bx=[60,465,870],lab=[['Trường hợp','nào được xem xét?'],['Điều kiện','ra sao?'],['Bạn nên','chuẩn bị gì?']],ph=['farm','survey','write'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO? KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_qh')-.05,{},a=>{photo('gavel',14,14,322,140);txt('QUỐC HỘI THÔNG QUA',175,196,{size:21,col:GREY,align:'center',ls:1});txt('21/11/2026',175,254,{size:46,align:'center',a:P(g('k_ngay'),.2)});txt('Luật Đất đai (sửa đổi)',175,296,{size:21,w:600,col:GREY,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_phieu')-.3,.2);
 box(468,y,350,h,g('k_phieu'),{},a=>{txt('PHIẾU TÁN THÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('466',175,196,{size:120,align:'center'});txt('trên 479 đại biểu',175,250,{size:25,w:600,align:'center'});txt('tham gia biểu quyết',175,284,{size:25,w:600,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/7/2027',175,270,{size:54,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 txt(SOHIEU,640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl')+.7,.3)});
 source(SRC1,1)}
function sB(t){const t0=g('s2');title(null,'SỔ ĐỎ, CẤP LẦN ĐẦU LÀ GÌ?',t0);
 box(60,170,560,170,g('k_sd'),{lw:6},a=>{txt('SỔ ĐỎ',30,46,{size:22,col:RED,ls:3});txt('Giấy chứng nhận',30,100,{size:36,a:P(g('k_gcn'),.2)});txt('quyền sử dụng đất',30,146,{size:36,a:P(g('k_gcn'),.2)})});
 arrow(628,255,672,255,g('k_ld')-.3,.2);
 box(680,170,540,170,g('k_ld'),{},a=>{txt('CẤP LẦN ĐẦU',30,46,{size:22,col:RED,ls:3});txt('Thửa đất chưa từng',30,100,{size:32,a:P(g('k_ld2'),.2)});txt('được cấp giấy này',30,144,{size:32,a:P(g('k_ld2'),.2)})});
 box(60,372,1160,180,g('k_hn'),{col:GREY},a=>{photo('plots',14,14,250,152);txt('HIỆN NAY · LUẬT ĐẤT ĐAI 2024',290,48,{size:21,col:GREY,ls:2});
  txt('Đã có quy định xem xét cấp sổ cho đất',290,98,{size:30,a:P(g('k_hn')+.8,.2)});txt('không có giấy tờ,',290,140,{size:30,a:P(g('k_hn2'),.2)});txt('dùng từ trước 01/7/2014',290+tw('không có giấy tờ, ',30)+6,140,{size:30,col:RED,a:P(g('k_hn3'),.2)})});
 source('Nguồn: Luật Đất đai 2024 (Luật số 31/2024/QH15), Điều 138.',1)}
function row(y,lab,t0,fn,o={}){arrow(328,340,392,y+60,t0-.05,.2);box(400,y,830,124,t0+.13,o,a=>{txt(lab,28,36,{size:19,col:GREY,ls:2});fn(a)})}
function sC(t){const t0=g('s3');title(null,'LUẬT MỚI: BA TRƯỜNG HỢP',t0,{sub:'Có thể được xem xét cấp sổ, nếu đủ điều kiện'});
 box(50,196,270,290,t0+.3,{lw:6},a=>{photo(t>=g('k_c2b')&&t<g('k_c3')?'write':'farm',14,14,242,160);txt('Cấp sổ',135,220,{size:28,align:'center'});txt('lần đầu',135,256,{size:28,align:'center'})});
 row(180,'MỘT · ĐẤT KHÔNG CÓ GIẤY TỜ',g('k_c1'),a=>{txt('Sử dụng từ trước',28,84,{size:32});txt('01/7/2014',28+tw('Sử dụng từ trước ',32)+4,84,{size:36,col:RED,a:P(g('k_c1a'),.2)});
  txt('Đáp ứng điều kiện luật định',28,112,{size:18,w:600,a:P(g('k_c1b'),.25)});txt('·  Không thuộc trường hợp bị loại trừ',28+tw('Đáp ứng điều kiện luật định',18,600)+10,112,{size:18,w:600,a:P(g('k_c1c'),.25)});check(756,40,44,g('k_c1d'))});
 row(316,'HAI · NHẬN CHUYỂN NHƯỢNG, CHƯA SANG TÊN',g('k_c2'),a=>{txt('Nhận chuyển nhượng trước',28,84,{size:32});txt('01/8/2024',28+tw('Nhận chuyển nhượng trước ',32)+4,84,{size:36,col:RED,a:P(g('k_c2a'),.2)});
  txt('Ví dụ: mua bán bằng giấy viết tay',28,112,{size:18,w:600,a:P(g('k_c2b'),.25)});txt('·  Chưa làm thủ tục sang tên',28+tw('Ví dụ: mua bán bằng giấy viết tay',18,600)+10,112,{size:18,w:600,a:P(g('k_c2c'),.25)});check(756,40,44,g('k_c2d'))},{lw:6});
 row(452,'BA · ĐẤT CÓ NGUỒN GỐC LẤN, CHIẾM',g('k_c3'),a=>{txt('Lấn, chiếm trước',28,84,{size:32});txt('01/7/2014',28+tw('Lấn, chiếm trước ',32)+4,84,{size:36,col:RED,a:P(g('k_c3a'),.2)});
  txt('Điều kiện: phù hợp quy hoạch tại thời điểm cấp sổ',28,112,{size:18,w:600,a:P(g('k_c3b'),.25)});check(756,40,44,g('k_c3b')+1.2)});
 source(SRC2,1)}
function sN(t){const t0=g('s6');title(null,'GHI NỢ TIỀN SỬ DỤNG ĐẤT',t0);
 box(140,180,1000,330,t0+.2,{lw:6},a=>{icon('coin',60,60,190,g('k_n2')-.2,.6);
  txt('AI',300,90,{size:21,col:GREY,ls:3});txt('Hộ gia đình, cá nhân',300,140,{size:36,a:P(g('k_n1'),.2)});txt('được cấp sổ lần đầu',300,186,{size:36,a:P(g('k_n1')+.6,.2)});
  txt('Có thể được ghi nợ',300,250,{size:40,col:RED,a:P(g('k_n2'),.2)});txt('tiền sử dụng đất, nếu có nhu cầu',300,294,{size:28,w:600,a:P(g('k_n3')-.4,.2)})});
 source('Nguồn: VOH (21/11/2026), Báo Hải Phòng (11/2026). Mức, thời hạn ghi nợ: chờ văn bản hướng dẫn.',1)}
function chip(s,px,py,t0,size=26){const w=tw(s,size)+44;box(px,py,w,62,t0,{lw:3,r:31},a=>{txt(s,w/2,41,{size,align:'center'})});return w}
function sX(t){const t0=g('s7');title(null,'CẦN HIỂU ĐÚNG',t0);
 box(60,170,520,200,g('k_x1')-.2,{},a=>{txt('ĐƯỢC',260,64,{size:24,col:GREY,align:'center',ls:3});txt('Xem xét cấp sổ',260,140,{size:46,align:'center'})});
 txt('≠',640,296,{size:90,col:RED,align:'center',a:P(g('k_x2'),.2)});
 box(700,170,520,200,g('k_x2')+.3,{lw:6},a=>{txt('KHÔNG CÓ NGHĨA LÀ',260,64,{size:24,col:GREY,align:'center',ls:3});txt('Chắc chắn được cấp',260,140,{size:44,col:RED,align:'center'})});
 txt('KHÔNG ĐƯỢC CẤP SỔ KHI ĐẤT (theo báo chí):',60,436,{size:22,col:GREY,ls:2,a:P(g('k_x3'),.2)});
 let px=60;px+=chip('Đang có tranh chấp',px,462,g('k_x4'))+18;px+=chip('Đang bị kê biên',px,462,g('k_x5'))+18;chip('Bị cưỡng chế',px,462,g('k_x6'));
 source('Nguồn: Tiền Phong, Vietstock (26/11/2026). Danh sách đầy đủ: chờ đối chiếu văn bản luật.',1)}
function dot(px,py,r,col,a){if(a<=0)return;x.save();x.globalAlpha*=a;x.fillStyle=col;x.beginPath();x.arc(px,py,r,0,6.2832);x.fill();x.restore()}
function sW(t){const t0=g('s8');title(null,'AI ĐƯỢC LỢI? TỪ KHI NÀO?',t0);
 box(60,170,560,150,g('k_w1')-.1,{},a=>{icon('house',22,30,90,g('k_w1'),.5);txt('Người dùng đất lâu năm',130,66,{size:28});txt('không có giấy tờ',130,108,{size:28})});
 box(660,170,560,150,g('k_w2')-.1,{},a=>{icon('paper',22,30,90,g('k_w2'),.5);txt('Người mua đất',130,66,{size:28});txt('bằng giấy tay',130,108,{size:28})});
 sketch([seg(110,398,1170,398,5)],g('k_w3')-.3,.5,{lw:6});
 const p1=P(g('k_w3'),.25);dot(640,398,13,RED,p1);txt('01/7/2027',640,380-6,{size:40,col:RED,align:'center',a:p1});txt('Áp dụng quy định mới',640,440,{size:22,w:600,align:'center',a:p1});
 box(140,478,1000,80,g('k_w4'),{},a=>{txt('CÒN CHỜ',30,50,{size:19,col:RED,ls:2});hl(146,30,tw('Văn bản hướng dẫn hồ sơ, thủ tục, cách tính tiền sử dụng đất',22,600)+8,30,P(g('k_w5'),.5));txt('Văn bản hướng dẫn hồ sơ, thủ tục, cách tính tiền sử dụng đất',150,50,{size:22,w:600})});
 source(SRC2,1)}
function sE(t){vxTodo(g('s9'),[[g('k_e1'),'Gom giấy tờ chứng minh thời điểm dùng đất','(biên lai thuế, giấy tay, xác nhận tổ dân phố)'],[g('s10'),'Mua bằng giấy tay: giữ bản gốc,','giữ liên lạc với bên bán'],[g('s11'),'Từ 01/7/2027: hỏi văn phòng đăng ký đất đai,','UBND xã. Không đưa tiền "chạy sổ"']]);underline(300,278,tw('(biên lai thuế, giấy tay, xác nhận tổ dân phố)',30),g('k_e2'),.4,{col:GREEN});underline(300+tw('UBND xã. ',30),554,tw('Không đưa tiền "chạy sổ"',30),g('k_e3'),.4,{col:GREEN});}
function sF(t){vxDisclaimer(g('out'),'Luật Đất đai (sửa đổi) · thông qua 21/11/2026 · hiệu lực 01/7/2027',SOHIEU,g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật Đất đai (sửa đổi)  ·  thông qua 21/11/2026  ·  hiệu lực 01/7/2027',
 images:{farm:'img/farm.jpg',plots:'img/plots.jpg',survey:'img/survey.jpg',write:'img/write.jpg',gavel:'img/gavel.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sC],[()=>g('s6')-.15,sN],[()=>g('s7')-.15,sX],[()=>g('s8')-.15,sW],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
