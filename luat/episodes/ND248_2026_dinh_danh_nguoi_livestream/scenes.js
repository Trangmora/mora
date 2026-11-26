// Tập: Từ 1/1/2027, người bán và người livestream bán hàng phải xác thực điện tử danh tính (Nghị định 248/2026/NĐ-CP). Nghiêm túc, khoảng 2 phút 12 giây.
const SRC1='Nguồn: LuatVietnam, Sức khỏe & Đời sống, Thư viện Pháp luật, Znews, An ninh Thủ đô';
const SRC2='Nguồn: Luật Thương mại điện tử số 122/2025/QH15, Điều 23 và 24 (theo Thư viện Pháp luật, LSVN). Chờ đối chiếu văn bản gốc.';
const SRC3='Nguồn: VietnamPlus, Tạp chí Luật sư Việt Nam, VOV, Sở Công Thương Đồng Nai, Báo Công Thương';
function sA(t){
 photoCard('tripod',70,170,400,400,.1,{rot:-.035});
 stamp('TỪ 01/01/2027',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Người bán, người livestream',510,236,{size:46,a:P(g('k_ban')-.1,.2)});txt('phải xác thực danh tính',510,300,{size:46,col:RED,a:P(g('k_xt')-.1,.2)});
 underline(510,318,tw('phải xác thực danh tính',46),g('k_xt')+.3,.4);
 box(510,370,660,186,g('k_live')+.2,{lw:6},a=>{txt('TRÊN NỀN TẢNG THƯƠNG MẠI ĐIỆN TỬ',34,54,{size:22,col:GREY,ls:2});txt('Xác thực điện tử',30,140,{size:60,col:RED,a:P(g('k_xt')+.2,.2)})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('LIVESTREAM BÁN HÀNG',310,62,{size:36,align:'center'})});
 const bx=[40,345,650,955],lab=[['Quy định','nằm ở đâu?'],['Ai phải','xác thực?'],['Nền tảng','phải làm gì?'],['Bạn nên','làm gì?']],ts=[g('k_m1'),g('k_m2'),g('k_m3'),g('k_m4')];
 const ic=['paper','phone','shop','calendar'];
 for(let i=0;i<4;i++){const ti=ts[i]-.25;arrow(640+(i-1.5)*110,200,bx[i]+142,282,ti,.2);
  box(bx[i],288,285,230,ti+.18,i==3?{col:GREEN}:{},a=>{icon(ic[i],100,16,86,ti+.3,.45,i==3?{col:GREEN}:{});badge(i+1,36,150,ti+.25,22,i==3?GREEN:RED);txt(lab[i][0],70,150,{size:24});txt(lab[i][1],70,190,{size:24})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'QUY ĐỊNH Ở ĐÂU?',t0,{sub:'Nghị định hướng dẫn Luật Thương mại điện tử (Luật số 122/2025/QH15)'});
 const y=196,h=300;
 box(50,y,350,h,g('k_nd')-.25,{lw:6},a=>{txt('NGHỊ ĐỊNH CỦA CHÍNH PHỦ',175,58,{size:20,col:GREY,align:'center',ls:1});txt('248/2026',175,160,{size:56,col:RED,align:'center'});txt('/NĐ-CP',175,206,{size:30,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_bh')-.3,.2);
 box(468,y,350,h,g('k_bh'),{},a=>{txt('BAN HÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('30/6/2026',175,130,{size:46,align:'center'});
  txt('CÓ HIỆU LỰC TỪ',175,196,{size:21,col:GREY,align:'center',ls:1,a:P(g('k_hl'),.2)});txt('01/7/2026',175,262,{size:46,align:'center',a:P(g('k_hl')+.2,.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_rieng')-.3,.2);
 box(886,y,350,h,g('k_rieng'),{lw:6},a=>{txt('RIÊNG XÁC THỰC DANH TÍNH',175,58,{size:19,col:RED,align:'center',ls:1});txt('người bán, người livestream',175,96,{size:20,w:600,align:'center'});icon('calendar',125,112,100,g('k_rieng')+.3,.5);txt('01/01/2027',175,262,{size:46,col:RED,align:'center',a:P(g('k_2027'),.2)})});
 stamp('NGHỊ ĐỊNH ĐÃ ÁP DỤNG',400,560,P(g('k_hl')+.8,.4),{size:24,rot:-.05,col:GREEN});
 source(SRC1,1)}
function sB(t){const t0=g('s2');title(null,'HIỂU CHO ĐÚNG',t0);
 box(60,180,540,360,g('k_ls')-.2,{},a=>{photo('tripod',14,14,512,190);txt('LIVESTREAM BÁN HÀNG',30,250,{size:21,col:GREY,ls:2});txt('Phát video trực tiếp',30,296,{size:32});txt('để giới thiệu, bán sản phẩm',30,334,{size:28,w:600})});
 box(680,180,540,360,g('k_xt2'),{lw:6},a=>{icon('shield',200,24,140,g('k_xt2')+.2,.5);txt('XÁC THỰC ĐIỆN TỬ DANH TÍNH',30,214,{size:21,col:RED,ls:2});txt('Nền tảng kiểm tra',30,262,{size:32});txt('tài khoản bán hàng',30,302,{size:32});txt('thuộc về ai',30,342,{size:32,col:RED,a:P(g('k_ai'),.2)})});
 source(SRC1,1)}
function sL(t){const t0=g('s3');title(null,'LUẬT ĐANG ÁP DỤNG',t0,{sub:'Luật Thương mại điện tử, hiệu lực từ 01/7/2026'});
 box(60,190,540,340,g('k_d24')-.2,{lw:6},a=>{txt('ĐIỀU 24',30,56,{size:24,col:RED,ls:3});txt('Người livestream',30,116,{size:36});
  txt('Cung cấp thông tin',30,186,{size:30,w:600,a:P(g('k_d24b'),.2)});txt('cho nền tảng',30,226,{size:30,w:600,a:P(g('k_d24b'),.2)});txt('để xác thực danh tính',30,266,{size:30,col:RED,a:P(g('k_d24b')+.5,.2)})});
 box(680,190,540,340,g('k_d23'),{},a=>{txt('ĐIỀU 23',30,56,{size:24,col:RED,ls:3});txt('Người bán, trước buổi live',30,116,{size:32});
  txt('Đưa cho người livestream:',30,174,{size:24,w:600,col:GREY,a:P(g('k_d23a'),.2)});
  txt('• Giấy tờ chất lượng sản phẩm',30,222,{size:26,a:P(g('k_d23b'),.2)});txt('• Giấy tờ điều kiện kinh doanh',30,264,{size:26,a:P(g('k_d23c'),.2)});txt('(ngành nghề có điều kiện)',54,298,{size:22,w:600,col:GREY,a:P(g('k_d23c')+.4,.2)})});
 source(SRC2,1)}
function sN(t){const t0=g('s5');title(null,'NỀN TẢNG PHẢI LÀM GÌ?',t0,{sub:'Trách nhiệm thêm theo Nghị định 248/2026/NĐ-CP'});
 box(60,190,540,360,g('k_qc')-.2,{lw:6},a=>{icon('paper',30,24,100,g('k_qc'),.5);txt('CÔNG KHAI',150,64,{size:22,col:RED,ls:3});txt('Quy chế livestream',150,108,{size:32});
  const it=[['• Đối tượng','k_qc1'],['• Quy trình','k_qc2'],['• Hướng dẫn định danh','k_qc3']];it.forEach(([s,k],i)=>txt(s,40,196+i*48,{size:28,a:P(g(k),.2)}))});
 box(680,190,540,360,g('k_cb'),{},a=>{photo('tripod',14,14,512,150);txt('CÔNG CỤ CẢNH BÁO',30,206,{size:22,col:RED,ls:3});txt('Hàng hóa, dịch vụ có nguy cơ',30,252,{size:25,a:P(g('k_cb2'),.2)});txt('mất an toàn, gây hại cho sức khỏe,',30,290,{size:25,a:P(g('k_cb2')+.6,.2)});txt('tính mạng, tài sản',30,328,{size:25,col:RED,a:P(g('k_cb3'),.2)})});
 source(SRC3,1)}
function sW(t){const t0=g('s7');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 box(60,190,540,320,g('k_w1')-.2,{},a=>{photo('boxes',14,14,512,170);txt('Người bán, người livestream',30,236,{size:30});txt('trên nền tảng thương mại điện tử',30,276,{size:26,w:600})});
 arrow(612,350,668,350,g('k_w2')-.3,.22);
 box(680,190,540,320,g('k_w2'),{lw:6},a=>{txt('NGHĨA VỤ XÁC THỰC',30,56,{size:22,col:RED,ls:3});txt('Thuộc về',30,116,{size:34});txt('chủ nền tảng',30,162,{size:34,col:RED});txt('Cách làm cụ thể: theo quy chế',30,236,{size:24,w:600,a:P(g('k_w3'),.2)});txt('của từng nền tảng',30,270,{size:24,w:600,a:P(g('k_w3'),.2)})});
 source(SRC1,1)}
function sE(t){vxTodo(g('s8'),[[g('k_e1'),'Người livestream: hoàn tất định danh','trên nền tảng trước 01/01/2027'],[g('s9'),'Đòi người bán giấy tờ chất lượng sản phẩm;','không đủ giấy tờ thì không nhận'],[g('s10'),'Hàng có nguy cơ mất an toàn:','bật cảnh báo bằng công cụ của nền tảng'],[g('s11'),'Người mua: chụp lại lời giới thiệu','sản phẩm trong phiên live để khiếu nại']])}
function sF(t){vxDisclaimer(g('out'),'Nghị định 248/2026/NĐ-CP · ban hành 30/6/2026 · hiệu lực 01/7/2026','Xác thực danh tính người bán, người livestream: từ 01/01/2027',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Nghị định 248/2026/NĐ-CP  ·  ban hành 30/6/2026  ·  hiệu lực 01/7/2026 (xác thực danh tính từ 01/01/2027)',
 images:{tripod:'img/tripod.jpg',boxes:'img/boxes.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sL],[()=>g('s5')-.15,sN],[()=>g('s7')-.15,sW],[()=>g('s8')-.15,sE],[()=>g('out')-.15,sF]]});
