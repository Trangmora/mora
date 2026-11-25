// Tập: Tội danh mới về tài sản mã hóa (Điều 190 Bộ luật Hình sự sửa đổi 2026). Giọng nghiêm túc, một video một vấn đề.
const SRC1='Nguồn: Báo Nhân Dân, Cổng TTĐT Bộ Công an, Cổng TTĐT Chính phủ (20/11/2026)';
const SRC2='Nguồn: Tuổi Trẻ (23/11/2026), Tin nhanh chứng khoán, VOH. Chờ đối chiếu văn bản chính thức.';
function sA(t){
 photoCard('coins',80,170,380,390,.1,{rot:-.035});
 txt('Tài sản mã hóa:',520,226,{size:58,a:P(.5,.2)});txt('có tội danh riêng',520,298,{size:58,col:RED,a:P(g('k_rieng')-.1,.2)});
 underline(520,316,tw('có tội danh riêng',58),g('k_rieng')+.2,.4);
 txt('Lần đầu tiên trong Bộ luật Hình sự Việt Nam',520,358,{size:22,w:600,col:GREY,a:P(g('k_rieng')+.6,.25)});
 box(520,384,640,180,g('k_muc'),{lw:6},a=>{txt('PHẠT TIỀN VỚI CÁ NHÂN CÓ THỂ TỚI',34,52,{size:23,col:GREY,ls:2});txt('10 TỶ ĐỒNG',30,142,{size:88,col:RED,a:P(g('k_10')-.1,.2)})});
 source(SRC2,P(1,.4))}
function sP(t){const t0=g('op2');title(null,'QUY ĐỊNH Ở ĐÂU?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_190')-.25,{lw:6},a=>{txt('ĐIỀU LUẬT',175,58,{size:21,col:GREY,align:'center',ls:1});txt('Điều 190',175,170,{size:74,col:RED,align:'center'});txt('Bộ luật Hình sự',175,232,{size:26,w:600,align:'center'});txt('(sửa đổi)',175,266,{size:26,w:600,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{photo('gavel',14,14,322,130);txt('QUỐC HỘI THÔNG QUA',175,184,{size:21,col:GREY,align:'center',ls:1});txt('20/11/2026',175,240,{size:46,align:'center'});txt('463/472 phiếu tán thành',175,286,{size:22,w:600,col:GREY,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/3/2027',175,270,{size:54,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl')+.7,.3)});
 source(SRC1,1)}
function sB(t){const t0=g('s1');title(null,'HÀNH VI NÀO BỊ XỬ LÝ?',t0,{sub:'Điều 190 Bộ luật Hình sự (sửa đổi)'});
 box(50,214,270,270,t0+.3,{lw:6},a=>{photo('chart',14,14,242,150);txt('Tài sản',135,206,{size:28,align:'center'});txt('mã hóa',135,242,{size:28,align:'center'})});
 const it=[[g('k_h1'),'Chào bán, phát hành trái quy định'],[g('k_h2'),'Cung cấp dịch vụ trái phép'],[g('k_h3'),'Dùng thông tin nội bộ để mua bán'],[g('k_h4'),'Thao túng thị trường']];
 it.forEach(([ti,s],i)=>{const y=176+i*100;arrow(328,348,392,y+44,ti-.2,.18);box(400,y,830,88,ti-.05,{},a=>{badge(i+1,46,44,ti,20);txt(s,84,56,{size:32})})});
 source(SRC2,1)}
function sC(t){const t0=g('s2');title(null,'MỨC PHẠT',t0,{sub:'Điều 190 Bộ luật Hình sự (sửa đổi)'});
 const y=186,h=376;
 box(60,y,540,h,t0+.15,{},a=>{txt('MỨC CƠ BẢN',270,50,{size:22,col:GREY,align:'center',ls:2});txt('Phạt tiền',270,100,{size:24,w:600,align:'center',a:P(g('k_m1a'),.2)});txt('2 – 5 tỷ đồng',270,166,{size:60,col:RED,align:'center',a:P(g('k_m1a')+.1,.2)});
  txt('hoặc phạt tù',270,226,{size:24,w:600,align:'center',a:P(g('k_m1b'),.2)});txt('6 tháng – 3 năm',270,286,{size:48,align:'center',a:P(g('k_m1b')+.15,.2)})});
 arrow(608,y+h/2,672,y+h/2,g('s3')-.15,.2);
 box(680,y,540,h,g('s3'),{lw:7},a=>{txt('MỨC NẶNG HƠN',270,50,{size:22,col:RED,align:'center',ls:2});txt('Phạt tiền',270,92,{size:22,w:600,align:'center',a:P(g('k_m2a'),.2)});txt('5 – 10 tỷ đồng',270,150,{size:56,col:RED,align:'center',a:P(g('k_m2a')+.1,.2)});
  txt('hoặc phạt tù',270,192,{size:22,w:600,align:'center',a:P(g('k_m2b'),.2)});txt('3 – 7 năm',270,242,{size:46,align:'center',a:P(g('k_m2b')+.15,.2)});
  const pc=P(g('k_m2c'),.25);if(pc>0){x.save();x.globalAlpha*=pc;x.fillStyle='#d9cfbd';x.fillRect(40,262,460,2);x.restore()}
  txt('• Phạm tội có tổ chức',44,294,{size:20,w:600,a:P(g('k_m2c')+.2,.2)});txt('• Có tính chất chuyên nghiệp',44,322,{size:20,w:600,a:P(g('k_m2d'),.2)});txt('• Thu lợi bất chính từ 2 tỷ đồng trở lên',44,350,{size:20,w:600,a:P(g('k_m2e'),.2)})});
 source(SRC2,1)}
function sD(t){const t0=g('s4');title(null,'LƯU Ý',t0);
 box(60,210,540,270,g('k_n1')-.2,{lw:6},a=>{txt('ĐIỀU 190 XỬ LÝ',34,54,{size:22,col:GREY,ls:3});txt('Hành vi',34,140,{size:58});txt('trái phép',34,214,{size:58,col:RED})});
 box(680,210,540,270,g('k_n2'),{col:GREEN,lw:5},a=>{check(34,30,46,g('k_n2')+.25,.25);txt('ĐÚNG QUY ĐỊNH',100,58,{size:22,col:GREEN,ls:3});txt('Mua bán đúng quy định:',34,140,{size:36});txt('không bị xử lý',34,192,{size:36});txt('theo điều này',34,238,{size:36})});
 source(SRC2,1)}
function sE(t){vxTodo(g('s5'),[[g('k_e1'),'Chỉ giao dịch qua tổ chức','được cấp phép tại Việt Nam'],[g('s6'),'Thận trọng với lời mời góp vốn phát hành','đồng tiền mới, cam kết lợi nhuận cao'],[g('s7'),'Lưu chứng từ giao dịch. Nghi bị lừa:','trình báo cơ quan công an']])}
function sF(t){vxDisclaimer(g('out'),'Bộ luật Hình sự (sửa đổi) · thông qua 20/11/2026 · hiệu lực 01/3/2027','Số hiệu luật: chờ công bố chính thức',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Bộ luật Hình sự (sửa đổi), Điều 190  ·  thông qua 20/11/2026  ·  hiệu lực 01/3/2027',
 images:{coins:'img/coins.jpg',gavel:'img/gavel.jpg',chart:'img/chart.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sP],[()=>g('s1')-.15,sB],[()=>g('s2')-.15,sC],[()=>g('s4')-.15,sD],[()=>g('s5')-.15,sE],[()=>g('out')-.15,sF]]});
