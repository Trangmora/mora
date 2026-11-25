// Tập: Tội làm nhục người khác theo Bộ luật Hình sự (sửa đổi) 2026. Nghiêm túc, một video một vấn đề, khoảng 2 phút 12 giây.
const SRC1='Nguồn: Báo Nhân Dân, Cổng TTĐT Bộ Công an, Cổng TTĐT Chính phủ (20/11/2026)';
const SRC2='Nguồn: Tuổi Trẻ, VOH (23/11/2026), Tạp chí Luật sư Việt Nam. Chờ đối chiếu văn bản chính thức.';
function sA(t){
 photoCard('phone',80,170,380,390,.1,{rot:-.035});
 stamp('TỪ 01/3/2027',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Tội làm nhục người khác',520,236,{size:54,a:P(g('op1')+1.6,.2)});txt('bị xử lý nặng hơn',520,306,{size:54,col:RED,a:P(g('k_nang')-.1,.2)});
 underline(520,324,tw('bị xử lý nặng hơn',54),g('k_nang')+.2,.4);
 box(520,372,640,186,g('k_mang'),{lw:6},a=>{txt('NẾU THỰC HIỆN TRÊN MẠNG',34,54,{size:24,col:GREY,ls:3});txt('TÙ TỚI 3 NĂM',30,146,{size:84,col:RED,a:P(g('k_tu'),.2)})});
 source(SRC2,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('TỘI LÀM NHỤC NGƯỜI KHÁC',310,62,{size:36,align:'center'})});
 const bx=[60,465,870],lab=[['Luật','quy định gì?'],['Mức phạt','thay đổi thế nào?'],['Bạn nên','làm gì?']],ph=['gavel','cuffs','phone'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'QUY ĐỊNH Ở ĐÂU?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_138')-.25,{lw:6},a=>{txt('ĐIỀU LUẬT',175,58,{size:21,col:GREY,align:'center',ls:1});txt('Điều 138',175,170,{size:74,col:RED,align:'center'});txt('Bộ luật Hình sự',175,232,{size:26,w:600,align:'center'});txt('(sửa đổi)',175,266,{size:26,w:600,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{photo('gavel',14,14,322,130);txt('QUỐC HỘI THÔNG QUA',175,184,{size:21,col:GREY,align:'center',ls:1});txt('20/11/2026',175,240,{size:46,align:'center'});txt('463/472 phiếu tán thành',175,286,{size:22,w:600,col:GREY,align:'center',a:P(g('k_phieu'),.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_phieu')+.9,.2);
 box(886,y,350,h,g('k_phieu')+1.1,{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_phieu')+1.3,.5);txt('01/3/2027',175,270,{size:54,col:RED,align:'center',a:P(g('k_phieu')+1.5,.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_phieu')+1.8,.3)});
 source(SRC1+'. Số điều: Tuổi Trẻ, bảng đối chiếu điều luật.',1)}
function chip(s,px,py,t0){const w=tw(s,26)+44;box(px,py,w,62,t0,{lw:3,r:31},a=>{txt(s,w/2,41,{size:26,align:'center'})});return w}
function sB(t){const t0=g('s2');title(null,'LÀM NHỤC NGƯỜI KHÁC LÀ GÌ?',t0,{sub:'Điều 138 Bộ luật mới (hiện nay: Điều 155)'});
 box(60,186,520,220,g('k_xp')-.3,{lw:6},a=>{txt('HÀNH VI',34,48,{size:22,col:GREY,ls:3});txt('Xúc phạm',34,118,{size:54});txt('nghiêm trọng',34,184,{size:54,col:RED})});
 arrow(590,296,690,296,g('k_np')-.25,.22);
 box(700,186,520,220,g('k_np'),{},a=>{txt('XÂM PHẠM ĐẾN',34,48,{size:22,col:GREY,ls:3});txt('Nhân phẩm, danh dự',34,116,{size:42});txt('của người khác',34,174,{size:42})});
 txt('VÍ DỤ',60,470,{size:22,col:GREY,ls:3,a:P(g('k_vd'),.2)});
 let px=160;px+=chip('Lăng mạ, chửi bới',px,432,g('k_vd')+.3)+18;px+=chip('Bêu xấu trước đám đông',px,432,g('k_vd2'))+18;chip('Bêu xấu trên mạng xã hội',px,432,g('k_vd3'));
 source(SRC2+' Định nghĩa: Điều 155 Bộ luật Hình sự 2015.',1)}
function sH(t){const t0=g('s3');title(null,'HÀNH CHÍNH HAY HÌNH SỰ?',t0,{sub:'Không phải mọi lời xúc phạm đều là tội phạm'});
 box(60,196,540,340,g('k_hc')-.2,{col:GREY},a=>{txt('MỨC NHẸ HƠN',34,50,{size:22,col:GREY,ls:3});txt('Xử phạt hành chính',34,104,{size:40});
  txt('Cá nhân đăng thông tin xúc phạm danh dự,',34,152,{size:21,w:600,a:P(g('k_hc2'),.25)});txt('nhân phẩm người khác trên mạng xã hội:',34,180,{size:21,w:600,a:P(g('k_hc2'),.25)});
  txt('10–15 triệu đồng',34,252,{size:56,col:RED,a:P(g('k_hc3')-.1,.2)});txt('Nghị định 174/2026/NĐ-CP · từ 01/7/2026',34,300,{size:19,w:600,col:GREY,a:P(g('k_hc3')+.4,.25)})});
 arrow(610,366,672,366,g('k_hs')-.25,.22);
 box(680,196,540,340,g('k_hs'),{lw:7},a=>{txt('XÚC PHẠM NGHIÊM TRỌNG',34,50,{size:22,col:RED,ls:3});txt('Xử lý hình sự',34,104,{size:40});photo('cuffs',34,132,200,130);txt('Tội làm nhục',258,176,{size:30});txt('người khác',258,214,{size:30});txt('Điều 138 Bộ luật Hình sự (sửa đổi)',34,300,{size:19,w:600,col:GREY})});
 source('Nguồn: Nghị định 174/2026/NĐ-CP (theo Thư viện Pháp luật, LuatVietnam, Thanh Niên, Tuổi Trẻ). Chờ đối chiếu văn bản.',1)}
function row(y,lab,t0,fn,o={}){arrow(328,340,392,y+60,t0-.05,.2);box(400,y,830,124,t0+.13,o,a=>{txt(lab,28,36,{size:19,col:GREY,ls:2});fn(a)})}
function sC(t){const t0=g('s4');title(null,'BA MỨC XỬ LÝ HÌNH SỰ',t0,{sub:'Điều 138 Bộ luật Hình sự (sửa đổi) · so với Điều 155 hiện nay'});
 box(50,196,270,290,t0+.3,{lw:6},a=>{photo('phone',14,14,242,160);txt('Làm nhục',135,220,{size:28,align:'center'});txt('người khác',135,256,{size:28,align:'center'})});
 row(180,'MỨC CƠ BẢN',g('k_c1'),a=>{const w1=tw('Phạt tiền 20–60 triệu đồng',30);txt('Phạt tiền 20–60 triệu đồng',28,78,{size:30,a:P(g('k_c1a'),.2)});txt('hoặc tù 3 tháng – 2 năm',28+w1+16,78,{size:28,col:RED,a:P(g('k_c1b'),.2)});
  const s1='Hoặc cảnh cáo, cải tạo không giam giữ đến 3 năm';txt(s1,28,108,{size:17,w:600,a:P(g('k_c1x'),.25)});txt('·  Hiện nay: 10–30 triệu, chưa có án tù',28+tw(s1,17,600)+10,108,{size:17,w:600,col:GREY,a:P(g('k_c1c'),.25)})});
 row(316,'MỨC THỨ HAI',g('k_c2'),a=>{txt('Tù 1 – 3 năm',28,86,{size:46,col:RED,a:P(g('k_c2a'),.2)});txt('Hiện nay: 3 tháng – 2 năm',28,112,{size:16,w:600,col:GREY,a:P(g('k_c2e'),.25)});
  txt('• Từ 2 lần trở lên,',380,50,{size:20,w:600,a:P(g('k_c2b')+.3,.2)});txt('với từ 2 người trở lên',380+tw('• Từ 2 lần trở lên,',20,600)+8,50,{size:20,w:600,a:P(g('k_c2b2'),.2)});txt('• Lợi dụng chức vụ, quyền hạn',380,80,{size:20,w:600,a:P(g('k_c2c'),.2)});txt('• Sử dụng không gian mạng',380,110,{size:20,w:600,col:RED,a:P(g('k_c2d'),.2)})},{lw:6});
 row(452,'MỨC NẶNG NHẤT',g('k_c3'),a=>{txt('Tù 3 – 7 năm',28,86,{size:46,col:RED,a:P(g('k_c3a'),.2)});txt('Hiện nay: 2 – 5 năm',28,112,{size:16,w:600,col:GREY,a:P(g('k_c3c'),.25)});
  txt('Khi gây hậu quả đặc biệt nghiêm trọng',380,64,{size:20,w:600,a:P(g('k_c3b'),.2)});txt('cho sức khỏe, tính mạng nạn nhân',380,94,{size:20,w:600,a:P(g('k_c3b')+.8,.2)})});
 source(SRC2+' Mức hiện nay: Điều 155 Bộ luật Hình sự 2015.',1)}
function sV(t){const t0=g('s7');title(null,'NGOÀI HÌNH SỰ: TRÁCH NHIỆM DÂN SỰ',t0);
 box(330,170,620,96,g('k_v0')-.2,{lw:6},a=>{txt('Người bị xúc phạm có quyền yêu cầu',310,60,{size:30,align:'center'})});
 const bx=[60,465,870],lab=[['Xin lỗi','công khai'],['Cải chính','công khai'],['Bồi thường','thiệt hại']],ts=[g('k_v1'),g('k_v2'),g('k_v3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.2;arrow(640+(i-1)*160,270,bx[i]+175,342,ti,.2);box(bx[i],348,350,170,ti+.15,{},a=>{badge(i+1,44,48,ti+.2,22);txt(lab[i][0],175,96,{size:38,align:'center'});txt(lab[i][1],175,142,{size:38,align:'center'})})}
 source('Nguồn: Bộ luật Dân sự 2015, Điều 34 và Điều 592.',1)}
function sD(t){const t0=g('s8');title(null,'ÁP DỤNG TỪ KHI NÀO?',t0);
 sketch([seg(110,300,1170,300,5)],t0+.3,.6,{lw:6});
 const pm=P(g('k_t1')-.2,.25);if(pm>0){x.save();x.globalAlpha*=pm;x.fillStyle=RED;x.beginPath();x.arc(640,300,13,0,6.2832);x.fill();x.restore();txt('01/3/2027',640,262,{size:50,col:RED,align:'center',a:pm})}
 box(680,350,500,170,g('k_t1'),{lw:6},a=>{txt('HÀNH VI TỪ 01/3/2027',34,50,{size:21,col:RED,ls:2});txt('Áp dụng',34,104,{size:36});txt('Bộ luật mới',34,146,{size:36})});
 box(100,350,500,170,g('k_t2'),{col:GREY},a=>{txt('HÀNH VI TRƯỚC 01/3/2027',34,50,{size:21,col:GREY,ls:2});txt('Xử lý theo',34,104,{size:36});txt('Bộ luật hiện hành',34,146,{size:36})});
 source('Nguồn: Báo Nhân Dân (20/11/2026): Bộ luật áp dụng với hành vi phạm tội thực hiện từ 0 giờ ngày 01/3/2027.',1)}
function sE(t){vxTodo(g('s9'),[[g('k_e1'),'Góp ý, phê bình: nói về sự việc,','không xúc phạm cá nhân'],[g('s10'),'Bị xúc phạm: lưu lại bằng chứng','(ảnh chụp màn hình, đường dẫn, thời gian)'],[g('s11'),'Báo cho nền tảng mạng xã hội,','trình báo cơ quan công an']])}
function sF(t){vxDisclaimer(g('out'),'Bộ luật Hình sự (sửa đổi) · thông qua 20/11/2026 · hiệu lực 01/3/2027','Số hiệu luật: chờ công bố chính thức',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Bộ luật Hình sự (sửa đổi), Điều 138  ·  thông qua 20/11/2026  ·  hiệu lực 01/3/2027',
 images:{phone:'img/phone.jpg',gavel:'img/gavel.jpg',cuffs:'img/cuffs.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sH],[()=>g('s4')-.15,sC],[()=>g('s7')-.15,sV],[()=>g('s8')-.15,sD],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
