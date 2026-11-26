// Tập: Thủ tục hải quan hàng bưu chính, chuyển phát nhanh quốc tế từ 16/11/2026 (Thông tư 142/2026/TT-BTC). Nghiêm túc, một video một vấn đề.
const SRC1='Nguồn: Thời báo Tài chính, LuatVietnam, Tạp chí Thuế Hải quan, ECUS (10–11/2026)';
const SRC2='Nguồn: LuatVietnam, Thời báo Tài chính, Tạp chí Thuế Hải quan, Nhân Dân (10–11/2026). Chờ đối chiếu văn bản gốc.';
function sA(t){
 photoCard('boxes',70,170,400,380,.1,{rot:-.035});
 stamp('TỪ 16/11/2026',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Hàng bưu chính,',530,220,{size:46,a:P(.5,.2)});txt('chuyển phát nhanh quốc tế',530,276,{size:40,a:P(.9,.2)});
 txt('Thủ tục hải quan thay đổi',530,334,{size:34,col:RED,a:P(g('k_doi'),.2)});underline(530,350,tw('Thủ tục hải quan thay đổi',34),g('k_doi')+.3,.4);
 box(530,380,640,170,g('k_dd'),{lw:6},a=>{txt('NGƯỜI NHẬN MỘT SỐ NHÓM HÀNG',34,50,{size:22,col:GREY,ls:2});txt('Định danh,',30,108,{size:40,col:RED});txt('xác thực điện tử',250,108,{size:40,col:RED})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('HẢI QUAN HÀNG CHUYỂN PHÁT',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Quy định','mới là gì?'],['Ai bị','ảnh hưởng?'],['Bạn nên','làm gì?']],ph=['cargo','phone','van'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_so')-.1,{lw:6},a=>{txt('THÔNG TƯ',175,58,{size:21,col:GREY,align:'center',ls:1});txt('142/2026',175,160,{size:64,col:RED,align:'center'});txt('/TT-BTC',175,214,{size:36,align:'center'});txt('Bộ Tài chính',175,272,{size:24,w:600,col:GREY,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_bh')-.3,.2);
 box(468,y,350,h,g('k_bh'),{},a=>{photo('sign',14,14,322,130);txt('NGÀY BAN HÀNH',175,184,{size:21,col:GREY,align:'center',ls:1});txt('29/9/2026',175,246,{size:48,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('16/11/2026',175,270,{size:50,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 stamp('ĐÃ ÁP DỤNG',640,570,P(g('k_ad'),.35),{size:28,rot:-.03});
 source(SRC1,1)}
function sS(t){const t0=g('s2');title(null,'SỬA ĐỔI HAI THÔNG TƯ CŨ',t0);
 box(60,200,540,280,g('k_c1')-.2,{},a=>{icon('paper',30,40,120,g('k_c1'),.6);txt('Thông tư',170,90,{size:30});txt('49/2015/TT-BTC',170,140,{size:38,col:RED});txt('Hàng gửi qua bưu chính',30,226,{size:28,w:600})});
 box(680,200,540,280,g('k_c2')-.2,{},a=>{icon('car',30,40,120,g('k_c2'),.6);txt('Thông tư',170,90,{size:30});txt('191/2015/TT-BTC',170,140,{size:38,col:RED});txt('Hàng chuyển phát nhanh quốc tế',30,226,{size:28,w:600})});
 source('Nguồn: LuatVietnam (bảng so sánh Thông tư 142/2026 với Thông tư 49/2015, 191/2015), Thời báo Tài chính.',1)}
function sQ(t){const t0=g('s3');title(null,'HÀNG ĐI QUA HẢI QUAN THẾ NÀO?',t0);
 box(60,190,300,280,t0+.5,{},a=>{photo('phone',14,14,272,160);txt('Bạn mua hàng',150,210,{size:26,align:'center'});txt('từ nước ngoài',150,246,{size:26,align:'center'})});
 arrow(370,330,440,330,g('k_q1')-.3,.2);
 box(450,190,360,280,g('k_q1'),{},a=>{photo('van',14,14,332,160);txt('Doanh nghiệp chuyển phát',180,210,{size:22,align:'center'});txt('thay mặt bạn khai hải quan',180,246,{size:22,w:600,align:'center'})});
 arrow(820,330,890,330,g('k_q2')-.3,.2);
 box(900,190,320,280,g('k_q2'),{lw:6},a=>{txt('PHÂN NHÓM HÀNG',160,56,{size:21,col:GREY,align:'center',ls:2});txt('Theo trị giá',160,130,{size:30,align:'center'});txt('và loại hàng',160,172,{size:30,align:'center'});txt('→ thủ tục phù hợp',160,236,{size:24,w:600,col:RED,align:'center'})});
 source(SRC2,1)}
function sN(t){const t0=g('s4');title(1,'ĐIỀU CHỈNH TIÊU CHÍ PHÂN NHÓM',t0,{sub:'Theo báo chí, chờ đối chiếu văn bản gốc'});
 box(240,190,800,110,g('k_n2'),{lw:6},a=>{txt('Nhóm làm thủ tục đơn giản chỉ khi',400,66,{size:32,align:'center'})});
 arrow(520,306,360,350,g('k_n3')-.3,.2);arrow(760,306,920,350,g('k_n4')-.3,.2);
 box(80,360,540,170,g('k_n3'),{},a=>{icon('coin',24,30,100,g('k_n3')+.1,.5);txt('Trị giá nằm trong',150,76,{size:30});txt('định mức miễn thuế',150,118,{size:30,col:RED})});
 box(660,360,540,170,g('k_n4'),{},a=>{icon('shield',24,30,100,g('k_n4')+.1,.5);txt('Không cần giấy phép,',150,76,{size:30});txt('kiểm tra chuyên ngành',150,118,{size:30,col:RED})});
 source('Nguồn: Tạp chí Thuế Hải quan, ECUS, bản tin pháp luật tháng 11/2026. Tiêu chí chi tiết: xem Thông tư 142/2026/TT-BTC.',1)}
function sD(t){const t0=g('s5');title(2,'ĐỊNH DANH, XÁC THỰC ĐIỆN TỬ',t0,{sub:'Áp dụng với một số nhóm hàng bưu chính, chuyển phát nhanh'});
 const st=[['Doanh nghiệp','chuyển phát thông báo',g('k_d2')],['Người nhận','phối hợp định danh',g('k_d3')],['Sau đó','khai hải quan',g('k_d3')+1.6]];
 box(240,180,800,100,g('k_d1'),{lw:6},a=>{icon('phone',24,10,80,g('k_d1')+.1,.5);txt('Bổ sung yêu cầu định danh,',120,46,{size:30});txt('xác thực điện tử',120,84,{size:30,col:RED})});
 st.forEach(([a1,a2,tt],i)=>{const px=60+i*400;if(i>0)arrow(px-50,410,px-6,410,tt-.3,.2);box(px,310,350,200,tt,i==1?{lw:6}:{},a=>{badge(i+1,44,44,tt+.1,22,i==1?RED:GREY);txt(a1,175,110,{size:32,align:'center'});txt(a2,175,154,{size:26,w:600,align:'center',col:i==1?RED:INK})})});
 source(SRC2,1)}
function sV(t){const t0=g('s6');title(null,'NỘP THAY THUẾ, PHÍ',t0,{sub:'Theo báo chí'});
 box(240,200,800,280,g('k_p1')-.4,{lw:6},a=>{photo('cargo',20,20,260,240);txt('Doanh nghiệp',310,90,{size:34});txt('chuyển phát nhanh',310,136,{size:34});txt('được nộp thay tiền thuế,',310,196,{size:26,w:600,col:RED});txt('phí hải quan cho chủ hàng',310,232,{size:26,w:600,col:RED})});
 stamp('CHỜ ĐỐI CHIẾU VĂN BẢN',640,540,P(g('k_p1')+2.2,.35),{size:24,rot:-.03,col:GREY});
 source('Nguồn: Thời báo Tài chính, kết quả tìm kiếm tổng hợp (11/2026). Chờ đối chiếu Thông tư 142/2026/TT-BTC.',1)}
function sL(t){const t0=g('s7');title(null,'CÒN CHỜ HƯỚNG DẪN TIẾP',t0);
 box(60,190,640,320,g('k_l1'),{lw:6},a=>{txt('LUẬT HẢI QUAN SỬA ĐỔI',30,50,{size:22,col:GREY,ls:2});txt('Số 11/2026/QH16',30,118,{size:44,col:RED});
  txt('Hiệu lực từ 01/3/2027',30,178,{size:32,a:P(g('k_l2'),.2)});txt('Giao Bộ Tài chính quy định thủ tục',30,240,{size:24,w:600,a:P(g('k_l2')+2,.2)});txt('hàng bưu chính, chuyển phát nhanh',30,274,{size:24,w:600,a:P(g('k_l2')+2,.2)})});
 box(760,190,460,320,g('k_l3'),{col:GREY},a=>{icon('bubble',30,30,110,g('k_l3'),.5);txt('Theo dõi thông báo',30,196,{size:28,a:P(g('k_l4'),.2)});txt('của cơ quan hải quan',30,236,{size:28,a:P(g('k_l4'),.2)});txt('và hãng chuyển phát',30,276,{size:28,a:P(g('k_l4'),.2)})});
 source('Nguồn: Thanh Niên, Đại biểu Nhân dân (11/2026).',1)}
function sE(t){vxTodo(g('s8'),[[g('k_e1'),'Đặt hàng nước ngoài: ghi đúng họ tên,','số điện thoại chính chủ của người nhận'],[g('s9'),'Hãng chuyển phát báo cần định danh:','phản hồi sớm để không chậm thông quan'],[g('s10'),'Giữ hóa đơn, chứng từ mua hàng','để chứng minh trị giá khi được yêu cầu']])}
function sF(t){vxDisclaimer(g('out'),'Thông tư 142/2026/TT-BTC · ban hành 29/9/2026 · hiệu lực 16/11/2026','Bộ Tài chính · đã áp dụng',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Thông tư 142/2026/TT-BTC  ·  ban hành 29/9/2026  ·  hiệu lực 16/11/2026 (đã áp dụng)',
 images:{boxes:'img/boxes.jpg',van:'img/van.jpg',cargo:'img/cargo.jpg',phone:'img/phone.jpg',sign:'img/sign.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sS],[()=>g('s3')-.15,sQ],[()=>g('s4')-.15,sN],[()=>g('s5')-.15,sD],[()=>g('s6')-.15,sV],[()=>g('s7')-.15,sL],[()=>g('s8')-.15,sE],[()=>g('out')-.15,sF]]});
