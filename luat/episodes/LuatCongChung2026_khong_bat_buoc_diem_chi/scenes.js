// Tập: Luật Công chứng sửa đổi 2026: công chứng viên không được tự yêu cầu vừa ký vừa điểm chỉ. Nghiêm túc, khoảng 2 phút 7 giây.
const SRC1='Nguồn: LuatVietnam, An ninh Thủ đô, Tạp chí Công Thương, Thanh Niên, VOH (23/4/2026)';
const SRC2='Nguồn: Thanh Niên, VOH, An ninh Thủ đô, Sở Tư pháp Thái Nguyên, Công Luận. Chờ đối chiếu văn bản gốc.';
// dấu vân tay vẽ tay: các vòng cung lồng nhau
function fp(cx,cy,r,t0,col=INK){const st=[];for(let i=0;i<6;i++){const rr=r*(.25+i*.15);st.push(circ(cx,cy+i*1.5,rr,-3.5+i*.1,0.4-i*.06,7+i))}return sketch(st,t0,.8,{lw:4,col})}
function sA(t){
 photoCard('sign',70,170,400,390,.1,{rot:-.035});
 stamp('TỪ 01/01/2027',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Đi công chứng:',510,236,{size:54,a:P(g('k_cc')-.1,.2)});txt('không bị buộc điểm chỉ',510,306,{size:50,col:RED,a:P(g('k_ky'),.2)});
 underline(510,324,tw('không bị buộc điểm chỉ',50),g('k_ky')+.4,.4);
 box(510,372,660,186,g('k_dc')-.2,{lw:6},a=>{txt('CÔNG CHỨNG VIÊN KHÔNG ĐƯỢC TỰ YÊU CẦU',34,54,{size:20,col:GREY,ls:1});txt('Vừa ký, vừa điểm chỉ',30,136,{size:46,col:RED});fp(590,112,40,g('k_dc'),RED)});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('LUẬT CÔNG CHỨNG (SỬA ĐỔI)',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Chữ ký và','điểm chỉ'],['Thay đổi khác','khi công chứng'],['Bạn nên','làm gì?']],ph=['sign','contract','keys'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_luat')-.25,{lw:6},a=>{txt('LUẬT SỬA ĐỔI, BỔ SUNG',175,58,{size:20,col:GREY,align:'center',ls:1});txt('Luật',175,140,{size:40,align:'center'});txt('Công chứng',175,196,{size:46,col:RED,align:'center'});txt('Số 04/2026/QH16',175,266,{size:24,w:600,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{txt('QUỐC HỘI THÔNG QUA',175,58,{size:21,col:GREY,align:'center',ls:1});icon('paper',125,80,100,g('k_qh')+.2,.5);txt('23/4/2026',175,236,{size:46,align:'center'});txt('489 đại biểu tán thành',175,286,{size:22,w:600,col:GREY,align:'center',a:P(g('k_phieu'),.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',125,80,100,g('k_hl')+.2,.5);txt('01/01/2027',175,250,{size:48,col:RED,align:'center'})});
 txt('Sửa đổi Luật Công chứng số 46/2024/QH15',640,560,{size:20,w:600,col:GREY,align:'center',a:P(g('k_hl')+.6,.3)});
 source(SRC1+'; số hiệu: LuatVietnam, Thư viện Pháp luật',1)}
function sB(t){const t0=g('s2');title(null,'HIỂU CHO ĐÚNG',t0);
 box(60,180,540,340,g('k_d1')-.2,{},a=>{photo('contract',14,14,512,160);txt('CÔNG CHỨNG',30,220,{size:22,col:GREY,ls:3});txt('Công chứng viên chứng nhận',30,266,{size:30});txt('hợp đồng, giao dịch đúng luật',30,306,{size:30})});
 box(680,180,540,340,g('k_d2'),{lw:6},a=>{fp(270,100,80,g('k_d2')+.1);txt('ĐIỂM CHỈ',30,220,{size:22,col:RED,ls:3});txt('In dấu vân tay lên văn bản,',30,266,{size:30});txt('bên cạnh hoặc thay chữ ký',30,306,{size:30})});
 source('Diễn đạt bằng lời thường theo Luật Công chứng 2024 (văn bản hiện hành).',1)}
function sC(t){const t0=g('s3');title(null,'TRƯỚC VÀ SAU',t0,{sub:'Việc vừa ký vừa điểm chỉ'});
 box(60,196,540,340,g('k_c1')-.2,{col:GREY},a=>{txt('HIỆN NAY · LUẬT CÔNG CHỨNG 2024',30,52,{size:20,col:GREY,ls:1});txt('Có thể vừa ký',30,120,{size:38});txt('vừa điểm chỉ trong',30,166,{size:38});txt('một số trường hợp',30,212,{size:38});
  txt('Trong đó có: khi công chứng viên',30,276,{size:24,w:600,col:RED,a:P(g('k_c2'),.2)});txt('thấy cần thiết',30,306,{size:24,w:600,col:RED,a:P(g('k_c2'),.2)})});
 box(680,196,540,340,g('k_n1'),{lw:7},a=>{txt('TỪ 01/01/2027',30,52,{size:20,col:RED,ls:2});txt('Công chứng viên',30,120,{size:38});txt('không được tự yêu cầu',30,166,{size:38,col:RED});
  txt('Điểm chỉ cùng chữ ký:',30,240,{size:28,a:P(g('k_n2'),.2)});txt('khi người yêu cầu đề nghị',30,282,{size:28,col:GREEN,a:P(g('k_n3'),.2)})});
 source('Nguồn: LuatVietnam, An ninh Thủ đô (khoản 14 Điều 1 luật sửa đổi; khoản 4 Điều 50 Luật Công chứng 2024). Chờ đối chiếu văn bản gốc.',1)}
function sT(t){const t0=g('s5');title(null,'GIAO DỊCH NÀO PHẢI CÔNG CHỨNG?',t0,{sub:'Thay đổi thứ hai'});
 box(60,190,540,220,g('k_t1')-.2,{col:GREY},a=>{txt('THAY VÌ',30,52,{size:22,col:GREY,ls:3});txt('Liệt kê từng',30,120,{size:38});txt('giao dịch',30,166,{size:38})});
 arrow(612,300,668,300,g('k_t2')-.3,.22);
 box(680,190,540,220,g('k_t2'),{lw:6},a=>{txt('LUẬT MỚI',30,52,{size:22,col:RED,ls:3});txt('Đặt tiêu chí chung',30,120,{size:38,col:RED});txt('Bộ Tư pháp đăng danh mục',30,170,{size:28,w:600,a:P(g('k_t3'),.2)})});
 box(60,434,1160,140,g('k_6a'),{lw:6},a=>{txt('Theo báo chí: bỏ ít nhất',34,62,{size:36});txt('6 loại giao dịch',34+tw('Theo báo chí: bỏ ít nhất ',36),62,{size:44,col:RED});txt('Danh sách cụ thể: chờ danh mục chính thức',34,110,{size:24,w:600,col:GREY,a:P(g('k_6b'),.2)})});
 source(SRC2,1)}
function sH(t){const t0=g('s7');title(null,'CÔNG CHỨNG Ở ĐÂU?',t0,{sub:'Thay đổi thứ ba'});
 box(60,190,540,340,g('k_h1')-.2,{lw:6},a=>{photo('contract',14,14,512,140);txt('KHÔNG THEO ĐỊA HẠT',30,196,{size:22,col:GREEN,ls:2,a:P(g('k_h2'),.2)});txt('• Hợp đồng ủy quyền',30,244,{size:28});txt('• Hợp đồng đặt cọc',30,282,{size:28});txt('• Giao dịch không trực tiếp về BĐS',30,320,{size:24,w:600})});
 box(680,190,540,340,g('k_h3'),{},a=>{photo('keys',14,14,512,140);txt('NHÀ ĐẤT',30,196,{size:22,col:RED,ls:3});txt('Vẫn công chứng tại tỉnh',30,244,{size:30});txt('nơi có bất động sản',30,284,{size:30,col:RED})});
 source(SRC2,1)}
function sW(t){const t0=g('s8');title(null,'ÁP DỤNG TỪ KHI NÀO?',t0);
 sketch([seg(110,290,1170,290,5)],t0+.3,.6,{lw:6});
 const pm=P(g('k_a1')+.3,.25);if(pm>0){x.save();x.globalAlpha*=pm;x.fillStyle=RED;x.beginPath();x.arc(640,290,13,0,6.2832);x.fill();x.restore()}txt('01/01/2027',640,252,{size:50,col:RED,align:'center',a:pm});
 box(680,330,500,170,g('k_a1')+.6,{lw:6},a=>{txt('TỪ 01/01/2027',34,50,{size:21,col:RED,ls:2});txt('Luật Công chứng',34,104,{size:34});txt('sửa đổi',34,146,{size:34})});
 box(100,330,500,170,g('k_a2'),{col:GREY},a=>{txt('TRƯỚC 01/01/2027',34,50,{size:21,col:GREY,ls:2});txt('Luật Công chứng',34,104,{size:34});txt('năm 2024',34,146,{size:34})});
 source(SRC1,1)}
function sE(t){vxTodo(g('s9'),[[g('k_e1'),'Bạn có thể chỉ ký. Muốn điểm chỉ thêm:','hãy chủ động đề nghị'],[g('s10'),'Tra danh mục giao dịch phải công chứng','do Bộ Tư pháp công bố'],[g('s11'),'Ủy quyền, đặt cọc: từ 2027 có thể chọn','văn phòng công chứng thuận tiện hơn'],[g('s12'),'Đọc kỹ toàn bộ hợp đồng trước khi ký','']])}
function sF(t){vxDisclaimer(g('out'),'Luật sửa đổi Luật Công chứng · thông qua 23/4/2026 · hiệu lực 01/01/2027','Số hiệu: 04/2026/QH16',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật sửa đổi Luật Công chứng (04/2026/QH16)  ·  thông qua 23/4/2026  ·  hiệu lực 01/01/2027',
 images:{sign:'img/sign.jpg',contract:'img/contract.jpg',keys:'img/keys.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sC],[()=>g('s5')-.15,sT],[()=>g('s7')-.15,sH],[()=>g('s8')-.15,sW],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
