// Tập: Luật Nhà ở (sửa đổi) 2026, nhà ở xã hội: bán lại thế nào, ai được ưu tiên. Nghiêm túc, một video một vấn đề, khoảng 2 phút 23 giây.
const SRC1='Nguồn: Cổng TTĐT Chính phủ, Báo Xây dựng, LuatVietnam, VOV (21/11/2026)';
const SRC2='Nguồn: Báo Chính phủ, Tiền Phong, Znews, Thanh Niên, Dân trí (21/11/2026). Chờ đối chiếu văn bản chính thức.';
function sA(t){
 photoCard('block',80,170,380,390,.1,{rot:-.035});
 stamp('TỪ 01/7/2027',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Nhà ở xã hội',520,236,{size:58,a:P(g('op1')+1.5,.2)});txt('không còn bán lại tự do',520,306,{size:50,col:RED,a:P(g('k_khong')-.1,.2)});
 underline(520,324,tw('không còn bán lại tự do',50),g('k_khong')+.3,.4);
 box(520,372,640,186,g('k_ke')-.25,{lw:6},a=>{txt('KỂ CẢ SAU 5 NĂM',34,54,{size:24,col:GREY,ls:3});txt('Chỉ bán cho',34,112,{size:44});txt('đúng đối tượng',34,164,{size:44,col:RED})});
 source(SRC2,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('LUẬT NHÀ Ở (SỬA ĐỔI)',310,62,{size:36,align:'center'})});
 const bx=[60,465,870],lab=[['Bán lại','thế nào?'],['Ai được','ưu tiên mua?'],['Bạn nên','làm gì?']],ph=['facade','keys','block'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO? KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_ngay')-.4,{},a=>{photo('gavel',14,14,322,140);txt('QUỐC HỘI THÔNG QUA',175,196,{size:21,col:GREY,align:'center',ls:1});txt('21/11/2026',175,254,{size:46,align:'center',a:P(g('k_ngay'),.2)});txt('Kỳ họp thứ 2, Quốc hội khóa XVI',175,296,{size:19,w:600,col:GREY,align:'center',a:P(g('k_ngay')+.4,.25)})});
 arrow(408,y+h/2,460,y+h/2,g('k_phieu')-.3,.2);
 box(468,y,350,h,g('k_phieu'),{},a=>{txt('PHIẾU TÁN THÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('467',175,196,{size:120,align:'center'});txt('trên 485 đại biểu',175,250,{size:25,w:600,align:'center'});txt('tham gia biểu quyết',175,284,{size:25,w:600,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.25,.5);txt('01/7/2027',175,270,{size:54,col:RED,align:'center',a:P(g('k_hl')+.45,.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl')+.8,.3)});
 source(SRC1,1)}
function sB(t){const t0=g('s2');title(null,'NHÀ Ở XÃ HỘI LÀ GÌ?',t0,{sub:'Theo Luật Nhà ở 2023, Điều 2'});
 box(60,186,520,220,g('k_ht')-.3,{lw:6},a=>{txt('LÀ NHÀ Ở',34,48,{size:22,col:GREY,ls:3});txt('Có sự hỗ trợ',34,118,{size:52});txt('của Nhà nước',34,184,{size:52,col:RED})});
 arrow(590,296,690,296,g('k_danh')-.25,.22);
 box(700,186,520,220,g('k_danh'),{},a=>{txt('DÀNH CHO',34,48,{size:22,col:GREY,ls:3});txt('Người được hưởng',34,104,{size:36});txt('chính sách hỗ trợ',34,150,{size:36});txt('về nhà ở',34,196,{size:36})});
 arrow(640,412,640,440,g('k_vv')-.2,.18);
 box(310,446,660,90,g('k_vv'),{lw:6},a=>{txt('Vì vậy: việc bán lại bị giới hạn',330,58,{size:34,align:'center'})});
 source('Nguồn: Luật Nhà ở 2023 (Luật số 27/2023/QH15), Điều 2.',1)}
// Trục thời gian: từ ngày trả đủ tiền đến mốc đủ 5 năm
function axis(t0){sketch([seg(90,226,1176,226,7),seg(1160,216,1188,226,3),seg(1188,226,1160,236,5)],t0,.5,{lw:5});
 const a=P(t0+.3,.25);if(a>0){x.save();x.globalAlpha*=a;x.fillStyle=INK;x.beginPath();x.arc(110,226,9,0,6.2832);x.fill();x.fillStyle=RED;x.beginPath();x.arc(640,226,11,0,6.2832);x.fill();x.restore();
  txt('Ngày trả đủ tiền mua nhà',100,204,{size:19,w:600,a});txt('Đủ 5 năm',640,204,{size:24,col:RED,align:'center',a})}}
function sC(t){const t0=g('s3');title(null,'HIỆN NAY: LUẬT NHÀ Ở 2023',t0,{sub:'Hai giai đoạn, tính từ ngày trả đủ tiền mua nhà'});
 axis(t0+.4);
 box(90,262,510,290,g('k_tr')-.2,{},a=>{txt('TRONG 5 NĂM',30,46,{size:22,col:GREY,ls:3});txt('Chỉ được bán lại cho:',30,92,{size:25,w:600,a:P(g('k_tr1'),.2)});
  txt('• Chủ đầu tư dự án',30,134,{size:28,a:P(g('k_tr1')+.5,.2)});txt('• Người thuộc diện được mua',30,176,{size:28,a:P(g('k_tr2'),.2)});txt('   nhà ở xã hội',30,212,{size:28,a:P(g('k_tr2'),.2)});
  txt('Giá không cao hơn giá mua ban đầu',30,260,{size:25,col:RED,a:P(g('k_tr3'),.2)})});
 box(680,262,510,290,g('k_sau')-.2,{},a=>{txt('SAU 5 NĂM',30,46,{size:22,col:GREY,ls:3});txt('Nếu đã được cấp giấy chứng nhận:',30,92,{size:23,w:600,a:P(g('k_sau')+.6,.2)});
  txt('Được bán theo',30,164,{size:44,a:P(g('k_sau2'),.2)});txt('cơ chế thị trường',30,222,{size:44,a:P(g('k_sau2')+.2,.2)})});
 source('Nguồn: Luật Nhà ở 2023, Điều 89 (theo Thư viện Pháp luật, LuatVietnam, Báo Chính phủ).',1)}
function sN(t){const t0=g('s4');title(null,'LUẬT MỚI: TỪ 01/7/2027',t0,{sub:'Thay đổi ở giai đoạn sau 5 năm'});
 axis(t0+.2);
 box(90,262,510,150,t0+.5,{col:GREY},a=>{txt('TRONG 5 NĂM',30,44,{size:22,col:GREY,ls:3});txt('Chỉ bán cho chủ đầu tư hoặc người thuộc diện',30,84,{size:19,w:600,col:GREY});txt('được mua · giá không cao hơn giá mua ban đầu',30,110,{size:19,w:600,col:GREY});
  const pk=P(g('k_g0'),.25);if(pk>0){x.save();x.globalAlpha*=pk;x.fillStyle=INK;rr(330,20,156,36,6);x.fill();x.restore();txt('GIỮ NHƯ CŨ',408,45,{size:18,col:'#fff',align:'center',ls:2,a:pk})}});
 box(680,262,510,312,g('k_n1')-.25,{lw:7},a=>{txt('SAU 5 NĂM',30,46,{size:22,col:RED,ls:3});txt('Chỉ được bán lại cho',30,88,{size:25,w:600,a:P(g('k_n2'),.2)});
  txt('người thuộc diện được mua',30,128,{size:31,col:RED,a:P(g('k_n2')+.5,.2)});txt('nhà ở xã hội',30,166,{size:31,col:RED,a:P(g('k_n2')+.5,.2)});
  const s0='Bán theo cơ chế thị trường';txt(s0,30,202,{size:20,w:600,col:GREY,a:P(g('k_n3'),.2)});sketch([seg(26,196,34+tw(s0,20,600),192,9)],g('k_n3')+.3,.3,{col:RED,lw:4});
  txt('• Giá bán: hai bên thỏa thuận',30,240,{size:20,w:600,a:P(g('k_g1'),.2)});txt('• Không phải nộp tiền sử dụng đất',30,266,{size:20,w:600,a:P(g('k_g2'),.2)});txt('• Phải nộp thuế thu nhập',30,292,{size:20,w:600,a:P(g('k_g3'),.2)})});
 box(90,430,510,132,g('s6'),{lw:6},a=>{txt('BÁN SAI QUY ĐỊNH',30,42,{size:21,col:RED,ls:3});txt('Hợp đồng bị vô hiệu',30,82,{size:29,a:P(g('k_vh'),.2)});txt('Phải bàn giao lại nhà',30,118,{size:29,a:P(g('k_bg'),.2)})});
 source(SRC2,1)}
function sU(t){const t0=g('s7');title(null,'AI ĐƯỢC ƯU TIÊN MUA?',t0,{sub:'Một số nhóm được ưu tiên theo Luật Nhà ở (sửa đổi)'});
 box(50,180,250,246,t0+.3,{lw:6},a=>{photo('keys',14,14,222,140);txt('Ưu tiên mua,',125,196,{size:26,align:'center'});txt('thuê mua',125,228,{size:26,align:'center'})});
 const it=[[g('k_u1'),'Người có công với cách mạng'],[g('k_u2'),'Thân nhân liệt sĩ'],[g('k_u3'),'Người khuyết tật']];
 it.forEach(([ti,s],i)=>{const y=176+i*74;arrow(308,300,372,y+31,ti-.2,.18);box(380,y,850,62,ti-.05,{},a=>{badge(i+1,40,31,ti,18);txt(s,76,42,{size:28})})});
 const t4=g('k_u4');arrow(308,300,372,444,t4-.2,.18);
 box(380,398,850,92,t4-.05,{lw:6},a=>{badge(4,40,46,t4,18);txt('Người có từ 2 con đẻ trở lên,',76,40,{size:28});txt('trong đó có con sinh từ 01/7/2026',76,76,{size:28,col:RED,a:P(g('k_u4b'),.2)});txt('Đã có từ Luật Dân số 2025',830,76,{size:16,w:600,col:GREY,align:'right',a:P(g('k_u4b')+.6,.25)})});
 box(50,504,1180,94,g('s8'),{col:GREY,lw:4},a=>{txt('ĐƯỢC ƯU TIÊN KHÔNG CÓ NGHĨA LÀ ĐƯƠNG NHIÊN ĐƯỢC MUA',30,36,{size:19,col:RED,ls:2});
  txt('Điều kiện về nhà ở:',30,74,{size:25,w:600,a:P(g('k_dk'),.2)});txt('chưa có nhà thuộc sở hữu của mình tại tỉnh, thành phố nơi có dự án',30+tw('Điều kiện về nhà ở:',25,600)+12,74,{size:25,a:P(g('k_dk2'),.2)})});
 source('Nguồn: VOV, Tiền Phong, Đại biểu Nhân dân (21/11/2026); Thư viện Pháp luật. Chờ đối chiếu văn bản chính thức.',1)}
function sW(t){const t0=g('s9');title(null,'ĐIỂM CÒN CHỜ VĂN BẢN CHÍNH THỨC',t0);
 box(60,190,520,230,g('k_w1')-.25,{},a=>{txt('TRƯỜNG HỢP',34,50,{size:22,col:GREY,ls:3});txt('Hợp đồng mua',34,122,{size:44});txt('ký trước 01/7/2027',34,182,{size:44,col:RED})});
 arrow(590,305,690,305,g('k_w2')-.25,.22);
 box(700,190,520,230,g('k_w2'),{lw:6},a=>{txt('CÂU HỎI',34,50,{size:22,col:GREY,ls:3});txt('Khi bán lại,',34,122,{size:44});txt('áp dụng luật nào?',34,182,{size:44})});
 box(200,452,880,120,g('k_w3')-.15,{col:GREY,lw:4},a=>{txt('DỰ THẢO TỪNG NÊU',30,38,{size:20,col:GREY,ls:3});txt('Tiếp tục áp dụng Luật Nhà ở 2023',30,78,{size:32});txt('Bản được thông qua: chờ văn bản chính thức',30,106,{size:18,w:600,col:RED,a:P(g('k_w3')+1.2,.3)})});
 source('Nguồn: Tiền Phong, Dân trí, CafeF (10–11/2026, viết về dự thảo). Nội dung bản được thông qua: chưa xác nhận được.',1)}
function sE(t){vxTodo(g('s10'),[[g('k_e1'),'Định mua nhà ở xã hội: tính là nhà để ở lâu dài,','vì việc bán lại bị giới hạn'],[g('s11'),'Đang có nhà ở xã hội: xem lại ngày ký hợp đồng','và ngày trả đủ tiền'],[g('s12'),'Mua lại nhà ở xã hội của người khác:','kiểm tra mình có thuộc diện được mua không'],[g('s13'),'Theo dõi văn bản hướng dẫn,','hỏi cơ quan quản lý nhà ở tại địa phương']])}
function sF(t){vxDisclaimer(g('out'),'Luật Nhà ở (sửa đổi) · thông qua 21/11/2026 · hiệu lực 01/7/2027','Số hiệu luật: chờ công bố chính thức',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật Nhà ở (sửa đổi)  ·  thông qua 21/11/2026  ·  hiệu lực 01/7/2027',
 images:{block:'img/block.jpg',facade:'img/facade.jpg',keys:'img/keys.jpg',gavel:'img/gavel.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sC],[()=>g('s4')-.15,sN],[()=>g('s7')-.15,sU],[()=>g('s9')-.15,sW],[()=>g('s10')-.15,sE],[()=>g('out')-.15,sF]]});
