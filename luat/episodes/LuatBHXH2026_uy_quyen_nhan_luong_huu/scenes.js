// Tập: Bỏ giới hạn 12 tháng của giấy ủy quyền nhận lương hưu (Luật sửa đổi Luật BHXH, thông qua 21/11/2026). Nghiêm túc, một video một vấn đề.
const SRC1='Nguồn: Dân trí, LuatVietnam, VOV, Nhân Dân (21–24/11/2026)';
const SRC2='Nguồn: Dân trí, LuatVietnam, An ninh Thủ đô, CafeF (11/2026). Chờ đối chiếu văn bản luật chính thức.';
function sA(t){
 photoCard('oldhands',70,170,400,380,.1,{rot:-.035});
 stamp('TỪ 01/3/2027',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Giấy ủy quyền nhận lương hưu',530,226,{size:44,a:P(.5,.2)});
 txt('bỏ giới hạn 12 tháng',530,296,{size:54,col:RED,a:P(g('k_gh'),.2)});
 underline(530,314,tw('bỏ giới hạn 12 tháng',54),g('k_gh')+.3,.4);
 box(530,362,640,190,g('k_tt'),{lw:6},a=>{txt('THỜI HẠN ỦY QUYỀN',34,54,{size:24,col:GREY,ls:3});txt('Hai bên tự thỏa thuận',30,130,{size:46,col:RED});txt('có thể dài hơn 12 tháng',30,172,{size:26,w:600,a:P(g('k_tt')+1.5,.3)})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('ỦY QUYỀN NHẬN LƯƠNG HƯU',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Quy định','hiện nay'],['Điểm mới','từ 01/3/2027'],['Bạn nên','làm gì?']],ph=['sign','hands','atm'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_luat'),{lw:6},a=>{txt('VĂN BẢN',175,58,{size:21,col:GREY,align:'center',ls:1});txt('Luật sửa đổi,',175,130,{size:34,align:'center'});txt('bổ sung một số điều',175,172,{size:30,align:'center'});txt('của Luật',175,222,{size:30,align:'center'});txt('Bảo hiểm xã hội',175,262,{size:34,col:RED,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{photo('sign',14,14,322,130);txt('QUỐC HỘI THÔNG QUA',175,184,{size:21,col:GREY,align:'center',ls:1});txt('21/11/2026',175,246,{size:46,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/3/2027',175,270,{size:52,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,560,{size:20,w:600,col:GREY,align:'center',a:P(g('k_hl')+.8,.3)});
 source(SRC1,1)}
function chip(s,px,py,t0){const w=tw(s,26)+44;box(px,py,w,62,t0,{lw:3,r:31},a=>{txt(s,w/2,41,{size:26,align:'center'})});return w}
function sB(t){const t0=g('s2');title(null,'ỦY QUYỀN NHẬN LƯƠNG HƯU LÀ GÌ?',t0);
 box(60,180,460,270,g('k_a1')-.3,{lw:6},a=>{photo('oldhands',16,16,428,150);txt('Người hưởng lương hưu,',30,208,{size:28});txt('trợ cấp BHXH hằng tháng',30,246,{size:28})});
 arrow(530,315,740,315,g('k_a2')-.3,.3);txt('nhờ nhận thay',635,296,{size:24,col:RED,align:'center',a:P(g('k_a2'),.2)});
 box(750,180,470,270,g('k_a2'),{},a=>{photo('hands',16,16,438,150);txt('Người được ủy quyền',30,208,{size:28});txt('(thường là con cháu)',30,246,{size:26,w:600,col:GREY,a:P(g('k_a3'),.2)})});
 txt('KHI',60,516,{size:22,col:GREY,ls:3,a:P(g('k_a3')+.5,.2)});
 let px=130;px+=chip('Già yếu',px,478,g('k_a3')+.8)+18;px+=chip('Đau ốm',px,478,g('k_a3')+1.3)+18;chip('Ở xa',px,478,g('k_a3')+1.8);
 source(SRC2,1)}
function sH(t){const t0=g('s3');title(null,'HIỆN NAY VÀ TỪ 01/3/2027',t0);
 box(60,176,540,360,g('k_h1')-.3,{col:GREY},a=>{txt('HIỆN NAY',34,50,{size:22,col:GREY,ls:3});txt('Luật BHXH 2024, điểm d khoản 2 Điều 10',34,82,{size:18,w:600,col:GREY});
  txt('• Lập thành văn bản',34,136,{size:28});txt('• Hiệu lực tối đa',34,190,{size:28,a:P(g('k_h2'),.2)});txt('12 tháng',60,262,{size:64,col:RED,a:P(g('k_h2')+.8,.2)});
  txt('• Hết hạn: làm lại giấy mới',34,322,{size:28,a:P(g('k_h3'),.2)})});
 arrow(610,356,672,356,g('k_n1')-.3,.22);
 box(680,176,540,360,g('k_n1'),{lw:7},a=>{txt('TỪ 01/3/2027',34,50,{size:22,col:RED,ls:3});txt('Luật BHXH sửa đổi',34,82,{size:18,w:600,col:GREY});
  stamp('BỎ GIỚI HẠN 12 THÁNG',270,150,P(g('k_n1')+.2,.35),{size:28,rot:-.05});
  txt('Thời hạn do hai bên',34,236,{size:30,a:P(g('k_n2'),.2)});txt('tự thỏa thuận',34,276,{size:30,col:RED,a:P(g('k_n2'),.2)});txt('Có thể dài hơn 12 tháng',34,326,{size:26,w:600,a:P(g('k_n3'),.2)})});
 source('Nguồn: Luật BHXH số 41/2024/QH15; Dân trí, LuatVietnam, An ninh Thủ đô (11/2026).',1)}
function sV(t){const t0=g('s5');title(null,'KHÔNG PHẢI VÔ THỜI HẠN',t0);
 box(60,180,540,320,g('k_v2')-.2,{},a=>{icon('paper',30,30,110,g('k_v2'),.6);txt('Vẫn phải lập',160,80,{size:32});txt('thành văn bản',160,122,{size:32});txt('theo pháp luật dân sự',34,230,{size:28,col:RED});txt('(Bộ luật Dân sự 2015)',34,272,{size:22,w:600,col:GREY})});
 box(680,180,540,320,g('k_v3'),{lw:6},a=>{txt('KHÔNG THỎA THUẬN THỜI HẠN',34,52,{size:20,col:GREY,ls:2});txt('và pháp luật không quy định khác',34,86,{size:20,w:600,col:GREY});
  txt('Hiệu lực 1 năm',34,170,{size:52,col:RED,a:P(g('k_v4'),.2)});txt('kể từ ngày xác lập ủy quyền',34,220,{size:26,w:600,a:P(g('k_v4')+.5,.2)});txt('Điều 563 Bộ luật Dân sự 2015',34,280,{size:20,w:600,col:GREY,a:P(g('k_v4')+.5,.2)})});
 stamp('KHÔNG VÔ THỜI HẠN',640,560,P(g('k_v1')+.2,.35),{size:24,rot:-.03,col:GREY});
 source('Nguồn: Điều 562, 563 Bộ luật Dân sự 2015; Dân trí, CafeF (11/2026).',1)}
function sC(t){const t0=g('s6');title(null,'CÁC ĐIỂM KHÁC',t0,{sub:'Theo báo chí, chờ đối chiếu văn bản luật'});
 box(60,190,540,300,g('k_b1')-.4,{},a=>{icon('house',30,30,110,g('k_b1'),.6);txt('Quyền thay đổi',160,80,{size:30});txt('hình thức nhận,',160,118,{size:30});txt('nơi nhận',34,200,{size:34,col:RED});txt('lương hưu, trợ cấp hằng tháng',34,244,{size:26,w:600})});
 box(680,190,540,300,g('k_b2'),{col:GREY},a=>{photo('atm',20,20,500,120);txt('Chi trả qua tài khoản:',34,190,{size:28});txt('theo quy định của Chính phủ',34,230,{size:28})});
 stamp('CHỜ HƯỚNG DẪN',950,520,P(g('k_b3'),.35),{size:26,rot:-.06});
 source('Nguồn: LuatVietnam, An ninh Thủ đô, CafeBiz (11/2026).',1)}
function sD(t){const t0=g('s7');title(null,'ÁP DỤNG TỪ KHI NÀO?',t0);
 sketch([seg(110,300,1170,300,5)],t0+.3,.6,{lw:6});
 const pm=P(g('k_t1')-.2,.25);if(pm>0){x.save();x.globalAlpha*=pm;x.fillStyle=RED;x.beginPath();x.arc(640,300,13,0,6.2832);x.fill();x.restore();txt('01/3/2027',640,262,{size:50,col:RED,align:'center',a:pm})}
 box(100,350,500,190,g('k_t1'),{col:GREY},a=>{txt('ĐẾN HẾT 28/02/2027',34,50,{size:21,col:GREY,ls:2});txt('Vẫn giới hạn 12 tháng',34,104,{size:32});txt('Hết hạn trước ngày đó:',34,146,{size:24,w:600,a:P(g('k_t2'),.2)});txt('làm lại theo quy định hiện hành',34,176,{size:24,w:600,a:P(g('k_t2'),.2)})});
 box(680,350,500,190,g('k_t1')+1.2,{lw:6},a=>{txt('TỪ 01/3/2027',34,50,{size:21,col:RED,ls:2});txt('Hai bên tự thỏa thuận',34,104,{size:32});txt('thời hạn ủy quyền',34,146,{size:32})});
 source(SRC1+'. Luật có hiệu lực từ 01/3/2027.',1)}
function sE(t){vxTodo(g('s8'),[[g('k_e1'),'Kiểm tra thời hạn ghi trên','giấy ủy quyền đang dùng'],[g('s9'),'Từ 01/3/2027, làm giấy mới: ghi rõ thời hạn,','phạm vi ủy quyền, theo hướng dẫn của BHXH'],[g('s10'),'Cân nhắc nhận qua tài khoản ngân hàng','đứng tên chính mình']])}
function sF(t){vxDisclaimer(g('out'),'Luật sửa đổi, bổ sung Luật BHXH · thông qua 21/11/2026 · hiệu lực 01/3/2027','Số hiệu luật: chờ công bố chính thức',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật sửa đổi Luật Bảo hiểm xã hội  ·  thông qua 21/11/2026  ·  hiệu lực 01/3/2027',
 images:{oldhands:'img/oldhands.jpg',hands:'img/hands.jpg',atm:'img/atm.jpg',sign:'img/sign.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sH],[()=>g('s5')-.15,sV],[()=>g('s6')-.15,sC],[()=>g('s7')-.15,sD],[()=>g('s8')-.15,sE],[()=>g('out')-.15,sF]]});
