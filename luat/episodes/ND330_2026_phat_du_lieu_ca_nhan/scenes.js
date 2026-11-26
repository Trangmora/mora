// Tập: Vi phạm dữ liệu cá nhân bị phạt tới 3 tỷ đồng (Nghị định 330/2026/NĐ-CP, đã áp dụng từ 19/8/2026). Nghiêm túc, khoảng 2 phút 3 giây.
const SRC1='Nguồn: Cổng TTĐT Chính phủ (Xây dựng chính sách, Báo Chính phủ), LuatVietnam, Công an tỉnh Tuyên Quang, Công an tỉnh Cà Mau';
const SRC2='Nguồn: LuatVietnam, Báo Chính phủ, Thư viện Pháp luật, lexdata.vn; Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15, Điều 8';
function sA(t){
 photoCard('lock',70,170,400,390,.1,{rot:-.035});
 stamp('ĐANG ÁP DỤNG',1060,128,P(.35,.4),{size:30,rot:.05,col:GREEN});
 txt('Vi phạm dữ liệu cá nhân',510,236,{size:50,a:P(.3,.2)});
 box(510,272,660,140,g('k_3ty')-.1,{lw:6},a=>{txt('TỔ CHỨC: TỐI ĐA',34,46,{size:22,col:GREY,ls:2});txt('3 tỷ đồng',30,112,{size:62,col:RED})});
 box(510,432,660,140,g('k_mb'),{},a=>{txt('MUA, BÁN DỮ LIỆU TRÁI PHÉP',34,46,{size:22,col:GREY,ls:2});txt('tới 10 lần khoản thu',30,112,{size:50,col:RED,a:P(g('k_10'),.2)})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('NGHỊ ĐỊNH 330/2026',310,62,{size:36,align:'center'})});
 const bx=[40,345,650,955],lab=[['Văn bản','nào?'],['Phạt','ai?'],['Phạt','bao nhiêu?'],['Bạn nên','làm gì?']],ts=[g('k_m1'),g('k_m2'),g('k_m3'),g('k_m4')];
 const ic=['paper','shop','coin','calendar'];
 for(let i=0;i<4;i++){const ti=ts[i]-.25;arrow(640+(i-1.5)*110,200,bx[i]+142,282,ti,.2);
  box(bx[i],288,285,230,ti+.18,i==3?{col:GREEN}:{},a=>{icon(ic[i],100,16,86,ti+.3,.45,i==3?{col:GREEN}:{});badge(i+1,36,150,ti+.25,22,i==3?GREEN:RED);txt(lab[i][0],70,150,{size:26});txt(lab[i][1],70,190,{size:26})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_nd')-.25,{lw:6},a=>{txt('NGHỊ ĐỊNH CỦA CHÍNH PHỦ',175,58,{size:20,col:GREY,align:'center',ls:1});txt('330/2026',175,160,{size:56,col:RED,align:'center'});txt('/NĐ-CP',175,206,{size:30,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_lv')-.3,.2);
 box(468,y,350,h,g('k_lv'),{},a=>{txt('XỬ PHẠT HÀNH CHÍNH',175,58,{size:21,col:GREY,align:'center',ls:1});icon('shield',125,80,100,g('k_lv')+.2,.5);txt('An ninh mạng',175,236,{size:32,align:'center'});txt('Bảo vệ dữ liệu cá nhân',175,280,{size:28,col:RED,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',125,80,100,g('k_hl')+.2,.5);txt('19/8/2026',175,250,{size:50,col:RED,align:'center'})});
 stamp('ĐÃ ÁP DỤNG',1060,540,P(g('k_ad'),.4),{size:30,rot:-.08,col:GREEN});
 txt('Ngày ban hành: theo báo chí cũng là 19/8/2026 (chờ đối chiếu Công báo)',60,556,{size:19,w:600,col:GREY,a:P(g('k_ad')+.8,.3)});
 source(SRC1,1)}
function chip(s,px,py,t0){const w=tw(s,28)+48;box(px,py,w,66,t0,{lw:3,r:33},a=>{txt(s,w/2,44,{size:28,align:'center'})});return w}
function sB(t){const t0=g('s2');title(null,'DỮ LIỆU CÁ NHÂN LÀ GÌ?',t0);
 box(60,180,1160,150,g('k_dl1')-.2,{lw:6},a=>{txt('Thông tin gắn với một người cụ thể,',34,66,{size:38});txt('hoặc giúp xác định một người cụ thể',34,120,{size:38,col:RED,a:P(g('k_dl2'),.2)})});
 txt('VÍ DỤ',60,400,{size:22,col:GREY,ls:3,a:P(g('k_vd'),.2)});
 let px=170;px+=chip('Họ tên',px,362,g('k_v1'))+20;px+=chip('Số điện thoại',px,362,g('k_v2'))+20;px+=chip('Số định danh',px,362,g('k_v3'))+20;chip('Địa chỉ nhà',px,362,g('k_v4'));
 photoCard('server',880,454,300,120,g('k_v4')+.4,{rot:.02});
 source('Nguồn: Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15, Điều 2 (khái niệm). Ví dụ minh họa.',1)}
function sL(t){const t0=g('s3');title(null,'LUẬT VÀ NGHỊ ĐỊNH',t0);
 box(60,190,540,320,g('k_l1')-.2,{},a=>{icon('paper',30,30,100,g('k_l1'),.5);txt('LUẬT BẢO VỆ DỮ LIỆU CÁ NHÂN',150,62,{size:19,col:GREY,ls:1});txt('Số 91/2025/QH15',150,106,{size:30});
  txt('Hiệu lực: 01/01/2026',30,190,{size:30,a:P(g('k_l2'),.2)});txt('Đặt ra mức phạt tối đa',30,250,{size:30,col:RED,a:P(g('k_l3'),.2)})});
 arrow(612,350,668,350,g('k_l4')-.3,.22);
 box(680,190,540,320,g('k_l4'),{lw:6},a=>{icon('paper',30,30,100,g('k_l4'),.5);txt('NGHỊ ĐỊNH 330/2026/NĐ-CP',150,62,{size:19,col:GREY,ls:1});txt('Hiệu lực: 19/8/2026',150,106,{size:30});
  txt('Mức phạt cụ thể',30,190,{size:30});txt('cho từng hành vi',30,250,{size:30,col:RED})});
 source('Nguồn: Xây dựng chính sách (Cổng TTĐT Chính phủ), Thư viện Pháp luật; Báo Chính phủ (22/8/2026)',1)}
function sC(t){const t0=g('s4');title(null,'PHẠT BAO NHIÊU?',t0,{sub:'Mức phạt tiền tối đa, lĩnh vực bảo vệ dữ liệu cá nhân'});
 box(60,196,540,200,g('k_p1')-.3,{lw:7},a=>{txt('TỔ CHỨC',30,52,{size:22,col:GREY,ls:3});txt('3 tỷ đồng',30,144,{size:72,col:RED})});
 box(680,196,540,200,g('k_p2'),{},a=>{txt('CÁ NHÂN: MỘT NỬA',30,52,{size:22,col:GREY,ls:3});txt('1,5 tỷ đồng',30,144,{size:72,col:RED,a:P(g('k_p3'),.2)})});
 box(60,420,1160,150,g('s5'),{lw:6},a=>{txt('MUA, BÁN TRÁI PHÉP DỮ LIỆU CÁ NHÂN',30,50,{size:22,col:RED,ls:2});txt('Phạt theo khoản thu có được:',30,108,{size:34,a:P(g('k_b2'),.2)});txt('2 – 10 lần',600,112,{size:56,col:RED,a:P(g('k_b3'),.2)})});
 source(SRC2,1)}
function sX(t){const t0=g('s6');title(null,'CHUYỂN DỮ LIỆU RA NƯỚC NGOÀI',t0,{sub:'Theo Luật Bảo vệ dữ liệu cá nhân (Điều 8)'});
 box(60,196,540,330,g('k_x1')-.2,{},a=>{photo('server',14,14,512,170);txt('TỔ CHỨC VI PHẠM QUY ĐỊNH',30,232,{size:21,col:GREY,ls:2});txt('chuyển dữ liệu cá nhân',30,276,{size:32});txt('ra nước ngoài',30,314,{size:32})});
 arrow(612,360,668,360,g('k_x2')-.3,.22);
 box(680,196,540,330,g('k_x2'),{lw:7},a=>{txt('PHẠT TỚI',30,60,{size:22,col:GREY,ls:3});txt('5%',30,190,{size:110,col:RED});txt('doanh thu năm trước liền kề',30,262,{size:30})});
 source('Nguồn: Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15, Điều 8 (theo Thư viện Pháp luật, Xây dựng chính sách). Bản dự thảo từng ghi 1%–5%.',1)}
function sK(t){const t0=g('s7');title(null,'NGOÀI TIỀN PHẠT',t0);
 box(60,200,540,280,g('k_k1')-.2,{lw:6},a=>{icon('paper',30,40,120,g('k_k1'),.5);txt('Buộc xóa',180,110,{size:40,col:RED});txt('dữ liệu đã xử lý',180,160,{size:30});txt('trái phép',180,200,{size:30})});
 box(680,200,540,280,g('k_k2'),{lw:6},a=>{icon('coin',30,40,120,g('k_k2'),.5);txt('Nộp lại',180,110,{size:40,col:RED});txt('khoản thu',180,160,{size:30});txt('bất hợp pháp',180,200,{size:30})});
 source('Nguồn: lexdata.vn, Báo Chính phủ, LuatVietnam (biện pháp khắc phục hậu quả). Chờ đối chiếu văn bản gốc.',1)}
function sW(t){const t0=g('s8');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 box(60,190,1160,120,g('k_a1')-.2,{lw:6},a=>{txt('Doanh nghiệp, tổ chức, cá nhân có thu thập, xử lý',34,58,{size:34});txt('dữ liệu của người khác',34,100,{size:34,col:RED})});
 box(60,340,560,220,g('k_a2'),{},a=>{icon('shop',30,40,140,g('k_a2'),.5);txt('Cửa hàng lưu',200,110,{size:32});txt('danh sách khách',200,154,{size:32})});
 box(660,340,560,220,g('k_a3'),{},a=>{photo('hold',14,14,180,192);txt('Người bán',220,110,{size:32});txt('hàng online',220,154,{size:32})});
 source('Ví dụ minh họa. Đối tượng áp dụng: theo Luật Bảo vệ dữ liệu cá nhân và Nghị định 330/2026/NĐ-CP.',1)}
function sE(t){vxTodo(g('s9'),[[g('k_e1'),'Không mua, bán, chia sẻ danh sách khách hàng,','số điện thoại của người khác'],[g('s10'),'Kinh doanh: chỉ thu thập khi khách đồng ý,','dùng đúng mục đích đã nói'],[g('s11'),'Hạn chế gửi số định danh, ảnh giấy tờ','khi không thật cần thiết'],[g('s12'),'Dữ liệu bị lộ, bị bán: lưu bằng chứng,','báo cơ quan công an']])}
function sF(t){vxDisclaimer(g('out'),'Nghị định 330/2026/NĐ-CP · hiệu lực 19/8/2026 (đang áp dụng)','Ngày ban hành: theo báo chí 19/8/2026, chờ đối chiếu Công báo',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Nghị định 330/2026/NĐ-CP  ·  xử phạt an ninh mạng, bảo vệ dữ liệu cá nhân  ·  hiệu lực 19/8/2026',
 images:{lock:'img/lock.jpg',server:'img/server.jpg',hold:'img/hold.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sL],[()=>g('s4')-.15,sC],[()=>g('s6')-.15,sX],[()=>g('s7')-.15,sK],[()=>g('s8')-.15,sW],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
