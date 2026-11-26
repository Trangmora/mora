// Tập: Hạn 31/12/2026 liên kết tài khoản với VNeID theo Nghị định 320/2026/NĐ-CP. Nghiêm túc, một video một vấn đề, khoảng 2 phút 24 giây.
const SRC1='Nguồn: Báo Chính phủ (14/8/2026), Công an tỉnh Quảng Ngãi, Trường ĐH Cảnh sát nhân dân, LuatVietnam';
const SRC2='Nguồn: Công an tỉnh Quảng Ngãi, Báo Đà Nẵng, Genk, Báo Văn hóa (khoản 9, 10 Điều 40 NĐ 69/2024 được bổ sung). Chờ đối chiếu văn bản gốc.';
const SRC3='Nguồn: Công an tỉnh Quảng Ngãi, Trường ĐH Cảnh sát nhân dân, Công an tỉnh An Giang, An ninh Thủ đô';
function sA(t){
 photoCard('hold',80,170,360,400,.1,{rot:-.035});
 stamp('HẠN 31/12/2026',1040,128,P(g('k_han'),.4),{size:30,rot:.05});
 txt('Liên kết tài khoản',500,236,{size:54,a:P(.3,.2)});txt('với VNeID',500,306,{size:54,col:RED,a:P(g('k_vneid')-.2,.2)});
 underline(500,324,tw('với VNeID',54),g('k_vneid')+.2,.4);
 box(500,372,660,186,g('k_nhieu'),{lw:6},a=>{txt('TÀI KHOẢN GIAO DỊCH ĐIỆN TỬ',34,54,{size:24,col:GREY,ls:2});txt('Chậm nhất 31/12/2026',30,136,{size:50,col:RED,a:P(g('k_nhieu')+.3,.2)})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('NGHỊ ĐỊNH 320/2026 VỀ VNeID',310,62,{size:34,align:'center'})});
 const bx=[40,345,650,955],lab=[['Văn bản','nào?'],['Tài khoản nào','phải liên kết?'],['Khi nào','VNeID bị khóa?'],['Bạn nên','làm gì?']],ts=[g('k_m1'),g('k_m2'),g('k_m3'),g('k_m4')];
 const ic=['paper','phone','shield','calendar'];
 for(let i=0;i<4;i++){const ti=ts[i]-.25;arrow(640+(i-1.5)*110,200,bx[i]+142,282,ti,.2);
  box(bx[i],288,285,230,ti+.18,i==3?{col:GREEN}:{},a=>{icon(ic[i],100,16,86,ti+.3,.45,i==3?{col:GREEN}:{});badge(i+1,36,150,ti+.25,22,i==3?GREEN:RED);txt(lab[i][0],70,150,{size:24});txt(lab[i][1],70,190,{size:24})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'QUY ĐỊNH Ở ĐÂU?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_nd')-.25,{lw:6},a=>{txt('NGHỊ ĐỊNH CỦA CHÍNH PHỦ',175,58,{size:20,col:GREY,align:'center',ls:1});txt('320/2026',175,160,{size:56,col:RED,align:'center'});txt('/NĐ-CP',175,206,{size:30,align:'center'});
  txt('Sửa đổi Nghị định 69/2024/NĐ-CP',175,262,{size:18,w:600,align:'center',a:P(g('k_sd'),.25)});txt('về định danh và xác thực điện tử',175,288,{size:18,w:600,align:'center',a:P(g('k_sd'),.25)})});
 arrow(408,y+h/2,460,y+h/2,g('k_bh')-.3,.2);
 box(468,y,350,h,g('k_bh'),{},a=>{txt('NGÀY BAN HÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});icon('paper',115,82,120,g('k_bh')+.2,.5);txt('13/8/2026',175,270,{size:50,align:'center',a:P(g('k_bh')+.5,.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,82,120,g('k_hl')+.2,.5);txt('28/9/2026',175,270,{size:50,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 stamp('ĐÃ ÁP DỤNG',1060,540,P(g('k_hl')+1.2,.4),{size:30,rot:-.08,col:GREEN});
 source(SRC1,1)}
function sB(t){const t0=g('s2');title(null,'LIÊN KẾT VNeID LÀ GÌ?',t0);
 box(60,190,460,330,g('k_lk')-.2,{},a=>{photo('hold',14,14,432,190);txt('TÀI KHOẢN CỦA BẠN',30,250,{size:21,col:GREY,ls:2});txt('trên một ứng dụng',30,294,{size:34})});
 sketch([seg(540,330,740,330,3)],g('k_lk')+.6,.35,{lw:6,col:RED});sketch([seg(740,370,540,370,5)],g('k_lk')+.9,.35,{lw:6,col:RED});
 txt('gắn, xác thực',640,310,{size:22,w:600,col:RED,align:'center',a:P(g('k_lk')+.7,.2)});
 box(760,190,460,330,g('k_dd'),{lw:6},a=>{icon('shield',160,26,140,g('k_dd')+.2,.5);txt('TÀI KHOẢN ĐỊNH DANH',230,226,{size:21,col:GREY,align:'center',ls:2});txt('VNeID',230,290,{size:54,col:RED,align:'center'})});
 txt('Dùng để chứng minh bạn là ai khi giao dịch trên mạng',640,572,{size:22,w:600,col:GREY,align:'center',a:P(g('k_lk2'),.3)});
 source('Nguồn: Nghị định 69/2024/NĐ-CP về định danh và xác thực điện tử (văn bản hiện hành, đã được sửa đổi bởi NĐ 320/2026).',1)}
function chip(s,px,py,t0){const w=tw(s,28)+48;box(px,py,w,66,t0,{lw:3,r:33},a=>{txt(s,w/2,44,{size:28,align:'center'})});return w}
function sL(t){const t0=g('s3');title(null,'TÀI KHOẢN NÀO PHẢI LIÊN KẾT?',t0,{sub:'Tài khoản giao dịch điện tử trong một số lĩnh vực bắt buộc'});
 box(60,206,1160,130,g('k_ls'),{lw:6},a=>{txt('BẮT BUỘC',34,48,{size:21,col:RED,ls:3});txt('Liên kết, xác thực với tài khoản định danh điện tử',34,100,{size:36})});
 txt('VÍ DỤ CÁC LĨNH VỰC (THEO BÁO CHÍ)',60,398,{size:21,col:GREY,ls:2,a:P(g('k_vd'),.2)});
 let px=60;const L=[['Viễn thông','k_l1'],['Chứng khoán','k_l2'],['Thương mại điện tử','k_l3'],['Mạng xã hội','k_l4']];
 for(const [s,k] of L)px+=chip(s,px,424,g(k)-.1)+20;
 txt('Danh sách đầy đủ: xem khoản 9 Điều 40 Nghị định 69/2024 (được bổ sung bởi NĐ 320/2026)',60,550,{size:19,w:600,col:GREY,a:P(g('k_l4')+.6,.3)});
 source(SRC2,1)}
function dot(px,py,col,a){if(a<=0)return;x.save();x.globalAlpha*=a;x.fillStyle=col;x.beginPath();x.arc(px,py,13,0,6.2832);x.fill();x.restore()}
function sT(t){const t0=g('s4');title(null,'HẠN CHÓT LIÊN KẾT',t0,{sub:'Áp dụng cho tài khoản đã lập trước ngày 28/9/2026'});
 sketch([seg(90,300,1190,300,5)],t0+.3,.6,{lw:6});
 const pts=[[230,'28/9/2026','Nghị định có hiệu lực',g('k_t1'),INK],[640,'31/12/2026','Hạn chót: các lĩnh vực bắt buộc',g('k_t2'),RED],[1050,'30/6/2027','Hạn chót: lĩnh vực ngân hàng',g('k_t3'),BLUE]];
 for(const [px,d,lab,ti,col] of pts){const a=P(ti,.25);dot(px,300,col,a);txt(d,px,262,{size:40,col,align:'center',a});}
 box(70,350,330,150,g('k_t1')+.2,{col:GREY},a=>{txt('TỪ 28/9/2026',30,48,{size:20,col:GREY,ls:2});txt('Nghị định',30,94,{size:30});txt('có hiệu lực',30,130,{size:30})});
 box(475,350,330,150,g('k_t2'),{lw:6},a=>{txt('CHẬM NHẤT 31/12/2026',30,48,{size:20,col:RED,ls:1});txt('Viễn thông, chứng khoán,',30,94,{size:21});txt('thương mại điện tử...',30,128,{size:21})});
 box(880,350,330,150,g('k_t3'),{col:BLUE},a=>{txt('CHẬM NHẤT 30/6/2027',30,48,{size:20,col:BLUE,ls:1});txt('Ngân hàng',30,94,{size:30});txt('(muộn hơn 6 tháng)',30,130,{size:24,w:600,col:GREY,a:P(g('k_t4')-.6,.2)})});
 source(SRC2,1)}
function sK(t){const t0=g('s5');title(null,'KHI NÀO VNeID BỊ KHÓA?',t0,{sub:'Điểm mới thứ hai của Nghị định 320/2026'});
 box(60,190,520,320,g('k_k2')-.2,{},a=>{photo('sim',14,14,492,170);txt('SỐ ĐIỆN THOẠI ĐĂNG KÝ',30,226,{size:21,col:GREY,ls:2});txt('Đã thay đổi',30,268,{size:32});txt('và không còn chính chủ',30,304,{size:30,col:RED,a:P(g('k_k3'),.2)})});
 arrow(592,350,688,350,g('k_k3')+.6,.22);
 box(700,190,520,320,g('k_k3')+.9,{lw:7},a=>{txt('HỆ THỐNG',260,60,{size:22,col:GREY,align:'center',ls:3});txt('TỰ ĐỘNG KHÓA',260,140,{size:52,col:RED,align:'center'});txt('tài khoản VNeID',260,200,{size:38,align:'center'})});
 box(60,532,1160,70,g('k_k4'),{col:GREY,lw:3},a=>{txt('Chính chủ: thông tin thuê bao ở nhà mạng trùng với người đứng tên tài khoản',580,45,{size:24,w:600,align:'center'})});
 source(SRC3,1)}
function sH(t){const t0=g('s6');title(null,'CẦN HIỂU ĐÚNG',t0);
 box(60,180,540,170,g('k_h1')-.2,{lw:6},a=>{txt('BỊ KHÓA',34,50,{size:21,col:RED,ls:3});txt('Tài khoản định danh',34,112,{size:40})});
 box(680,180,540,170,g('k_h2'),{col:GREY},a=>{txt('KHÔNG BỊ KHÓA',34,50,{size:21,col:GREY,ls:3});txt('Số điện thoại',34,112,{size:40})});
 box(60,380,540,170,g('k_h3'),{col:GREY},a=>{txt('ĐỔI SỐ ĐIỆN THOẠI',34,50,{size:21,col:GREY,ls:3});txt('Chưa chắc bị khóa',34,112,{size:40})});
 box(680,380,540,170,g('k_h4'),{lw:6},a=>{txt('ĐIỀU QUYẾT ĐỊNH',34,50,{size:21,col:RED,ls:3});txt('Số đăng ký còn',34,104,{size:36});txt('chính chủ hay không?',34,146,{size:36,col:RED})});
 source(SRC3,1)}
function sG(t){const t0=g('s7');title(null,'KHÔNG PHẢI NỘP LẠI GIẤY TỜ',t0,{sub:'Điểm mới thứ ba'});
 box(60,200,520,320,g('k_g1')-.2,{},a=>{icon('phone',30,40,170,g('k_g1'),.5);txt('Giấy tờ đã',220,130,{size:34});txt('tích hợp',220,176,{size:34});txt('trên VNeID',220,222,{size:34,col:RED})});
 arrow(592,360,688,360,g('k_g2')-.3,.22);
 box(700,200,520,320,g('k_g2'),{lw:6},a=>{icon('paper',30,40,150,g('k_g2')+.2,.5);txt('Cơ quan giải quyết',200,110,{size:28});txt('thủ tục hành chính',200,150,{size:28});txt('không yêu cầu',200,214,{size:34,col:RED});txt('nộp lại',200,256,{size:34,col:RED})});
 source('Nguồn: Báo Chính phủ (14/8/2026), Sở KH&CN Lạng Sơn, Công an tỉnh Quảng Ngãi. Chờ đối chiếu văn bản gốc.',1)}
function sW(t){const t0=g('s8');title(null,'ĐIỀU CÒN CHỜ',t0);
 box(60,190,540,320,g('k_w1')-.2,{},a=>{icon('paper',30,30,110,g('k_w1'),.5);txt('LĨNH VỰC CHƯA LIỆT KÊ',30,188,{size:21,col:GREY,ls:2});txt('Các bộ ban hành',30,236,{size:34});txt('danh mục riêng',30,280,{size:34})});
 box(680,190,540,320,g('k_w2'),{col:GREY},a=>{txt('SỐ LĨNH VỰC BẮT BUỘC',30,54,{size:21,col:GREY,ls:2});txt('11 hay 12?',30,140,{size:60,col:RED});txt('Các báo đếm khác nhau,',30,206,{size:26,w:600});txt('chưa thống nhất',30,242,{size:26,w:600})});
 txt('Hãy theo thông báo chính thức của từng ứng dụng',640,566,{size:26,align:'center',a:P(g('k_w3'),.3)});
 source('Nguồn: Genk, CafeF, Soha (11 lĩnh vực); Báo Đà Nẵng (12 nhóm lĩnh vực); Thư viện Pháp luật.',1)}
function sE(t){vxTodo(g('s9'),[[g('k_e1'),'Kiểm tra số điện thoại đăng ký VNeID','có đúng tên bạn; đã đổi số thì cập nhật sớm'],[g('s10'),'Liên kết VNeID trên các ứng dụng đang dùng','trước ngày 31/12/2026'],[g('s11'),'Tài khoản ngân hàng: làm trên ứng dụng','chính thức của ngân hàng, trước 30/6/2027'],[g('s12'),'Không bấm link lạ, không đưa mã OTP','cho người tự xưng "hỗ trợ liên kết"']])}
function sF(t){vxDisclaimer(g('out'),'Nghị định 320/2026/NĐ-CP · ban hành 13/8/2026 · hiệu lực 28/9/2026','Sửa đổi Nghị định 69/2024/NĐ-CP về định danh và xác thực điện tử',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Nghị định 320/2026/NĐ-CP  ·  ban hành 13/8/2026  ·  hiệu lực 28/9/2026',
 images:{hold:'img/hold.jpg',sim:'img/sim.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sL],[()=>g('s4')-.15,sT],[()=>g('s5')-.15,sK],[()=>g('s6')-.15,sH],[()=>g('s7')-.15,sG],[()=>g('s8')-.15,sW],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
