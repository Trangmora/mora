// Tập: Tội danh mới về tài sản mã hóa (Điều 190 Bộ luật Hình sự sửa đổi 2026). Nghiêm túc, một video một vấn đề, khoảng 2 phút 08 giây.
const SRC1='Nguồn: Báo Nhân Dân, Cổng TTĐT Bộ Công an, Cổng TTĐT Chính phủ (20/11/2026)';
const SRC2='Nguồn: Tuổi Trẻ (23/11/2026), Tin nhanh chứng khoán, VOH. Chờ đối chiếu văn bản chính thức.';
function sA(t){
 photoCard('coins',80,170,380,390,.1,{rot:-.035});
 txt('Tài sản mã hóa:',520,226,{size:58,a:P(.5,.2)});txt('có tội danh riêng',520,298,{size:58,col:RED,a:P(g('k_rieng')-.1,.2)});
 underline(520,316,tw('có tội danh riêng',58),g('k_rieng')+.2,.4);
 txt('Lần đầu tiên trong Bộ luật Hình sự Việt Nam',520,358,{size:22,w:600,col:GREY,a:P(g('k_rieng')+.6,.25)});
 box(520,384,640,180,g('k_muc'),{lw:6},a=>{txt('PHẠT TIỀN VỚI CÁ NHÂN CÓ THỂ TỚI',34,52,{size:23,col:GREY,ls:2});txt('10 TỶ ĐỒNG',30,142,{size:88,col:RED,a:P(g('k_10')-.1,.2)})});
 source(SRC2,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('TỘI DANH VỀ TÀI SẢN MÃ HÓA',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Hành vi nào','bị xử lý?'],['Mức phạt','ra sao?'],['Người đầu tư','cần lưu ý gì?']],ph=['chart','gavel','coins'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'QUY ĐỊNH Ở ĐÂU?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_190')-.25,{lw:6},a=>{txt('ĐIỀU LUẬT',175,58,{size:21,col:GREY,align:'center',ls:1});txt('Điều 190',175,170,{size:74,col:RED,align:'center'});txt('Bộ luật Hình sự',175,232,{size:26,w:600,align:'center'});txt('(sửa đổi)',175,266,{size:26,w:600,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{photo('gavel',14,14,322,130);txt('QUỐC HỘI THÔNG QUA',175,184,{size:21,col:GREY,align:'center',ls:1});txt('20/11/2026',175,240,{size:46,align:'center'});txt('463/472 phiếu tán thành',175,286,{size:22,w:600,col:GREY,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/3/2027',175,270,{size:54,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl')+.7,.3)});
 source(SRC1,1)}
function sW(t){const t0=g('s2');title(null,'TÀI SẢN MÃ HÓA LÀ GÌ?',t0);
 box(60,170,560,180,g('k_w1')-.15,{lw:6},a=>{txt('LÀ',34,46,{size:22,col:GREY,ls:3});txt('Một loại tài sản số',34,100,{size:38});txt('dùng công nghệ mã hóa để xác thực',34,144,{size:25,w:600,col:RED,a:P(g('k_w2'),.2)})});
 box(660,170,560,180,g('k_w3')-.1,{},a=>{photo('coins',14,14,200,152);txt('VÍ DỤ QUEN THUỘC',236,56,{size:21,col:GREY,ls:2});txt('Bitcoin',236,122,{size:54})});
 arrow(340,354,340,392,g('k_p1')-.3,.18);
 box(60,398,1160,150,g('k_p1')-.1,{},a=>{txt('BỐI CẢNH',34,44,{size:22,col:GREY,ls:3});txt('Từ 9/2025: thí điểm thị trường tài sản mã hóa',34,90,{size:30});txt('Nghị quyết 05/2025/NQ-CP',34,126,{size:20,w:600,col:GREY,a:P(g('k_p2'),.2)});
  const s2='Tổ chức cung cấp dịch vụ: phải được Bộ Tài chính cấp phép';txt(s2,1126,126,{size:22,col:RED,align:'right',a:P(g('k_p3'),.2)})});
 source('Nguồn: Nghị quyết 05/2025/NQ-CP (9/9/2025); Nghị định 284/2026/NĐ-CP. Chờ đối chiếu văn bản.',1)}
function sH(t){const t0=g('s4');title(null,'MỨC THẤP: XỬ PHẠT HÀNH CHÍNH',t0,{sub:'Nghị định 284/2026/NĐ-CP · hiệu lực từ 01/9/2026'});
 box(60,196,540,340,g('k_a2')-.2,{col:GREY},a=>{txt('MỨC PHẠT TỐI ĐA',34,50,{size:22,col:GREY,ls:3});txt('Cá nhân',34,112,{size:26,w:600});txt('100 triệu đồng',34,170,{size:52,col:RED});
  txt('Tổ chức',34,232,{size:26,w:600,a:P(g('k_a3'),.2)});txt('200 triệu đồng',34,290,{size:52,col:RED,a:P(g('k_a3'),.2)})});
 arrow(610,366,672,366,g('k_a4')-.25,.22);
 box(680,196,540,340,g('k_a4'),{lw:6},a=>{txt('NHÀ ĐẦU TƯ TRONG NƯỚC',34,50,{size:22,col:RED,ls:3});txt('Giao dịch không qua tổ chức',34,104,{size:28});txt('được Bộ Tài chính cấp phép',34,142,{size:28});
  txt('Phạt tiền',34,208,{size:24,w:600,a:P(g('k_a5'),.2)});txt('30–50 triệu đồng',34,270,{size:54,col:RED,a:P(g('k_a5')+.1,.2)})});
 source('Nguồn: Nghị định 284/2026/NĐ-CP (theo VnEconomy, LuatVietnam, Tạp chí Luật sư Việt Nam). Chờ đối chiếu văn bản.',1)}
function sB(t){const t0=g('s5');title(null,'MỨC NẶNG: XỬ LÝ HÌNH SỰ',t0,{sub:'Điều 190 Bộ luật Hình sự (sửa đổi): bốn nhóm hành vi'});
 box(50,196,270,250,t0+.3,{lw:6},a=>{photo('chart',14,14,242,140);txt('Tài sản',135,192,{size:27,align:'center'});txt('mã hóa',135,226,{size:27,align:'center'})});
 const it=[[g('k_h1'),'Chào bán, phát hành trái quy định'],[g('k_h2'),'Cung cấp dịch vụ trái phép'],[g('k_h3'),'Dùng thông tin nội bộ để mua bán'],[g('k_h4'),'Thao túng thị trường']];
 it.forEach(([ti,s],i)=>{const y=176+i*84;arrow(328,322,392,y+37,ti-.2,.18);box(400,y,830,74,ti-.05,{},a=>{badge(i+1,42,37,ti,18);txt(s,78,48,{size:29})})});
 box(50,512,1180,74,g('s6'),{lw:6,fill:'#fff3e0'},a=>{txt('NGƯỠNG HÌNH SỰ (theo báo chí)',28,46,{size:19,col:GREY,ls:1});const s1='Thu lợi bất chính từ 500 triệu đồng,';txt(s1,396,47,{size:21,col:RED,a:P(g('k_n500'),.2)});txt('hoặc gây thiệt hại từ 1 tỷ đồng',396+tw(s1,21)+12,47,{size:21,col:RED,a:P(g('k_n1'),.2)})});
 source(SRC2,1)}
function sC(t){const t0=g('s7');title(null,'MỨC PHẠT HÌNH SỰ',t0,{sub:'Điều 190 Bộ luật Hình sự (sửa đổi)'});
 const y=186,h=376;
 box(60,y,540,h,t0+.15,{},a=>{txt('MỨC CƠ BẢN',270,50,{size:22,col:GREY,align:'center',ls:2});txt('Phạt tiền',270,100,{size:24,w:600,align:'center',a:P(g('k_c1a'),.2)});txt('2 – 5 tỷ đồng',270,166,{size:60,col:RED,align:'center',a:P(g('k_c1a')+.1,.2)});
  txt('hoặc phạt tù',270,226,{size:24,w:600,align:'center',a:P(g('k_c1b'),.2)});txt('6 tháng – 3 năm',270,286,{size:48,align:'center',a:P(g('k_c1b')+.15,.2)})});
 arrow(608,y+h/2,672,y+h/2,g('s8')-.15,.2);
 box(680,y,540,h,g('s8'),{lw:7},a=>{txt('MỨC NẶNG HƠN',270,50,{size:22,col:RED,align:'center',ls:2});txt('Phạt tiền',270,92,{size:22,w:600,align:'center',a:P(g('k_c2a'),.2)});txt('5 – 10 tỷ đồng',270,150,{size:56,col:RED,align:'center',a:P(g('k_c2a')+.1,.2)});
  txt('hoặc phạt tù',270,192,{size:22,w:600,align:'center',a:P(g('k_c2b'),.2)});txt('3 – 7 năm',270,242,{size:46,align:'center',a:P(g('k_c2b')+.15,.2)});
  const pc=P(g('k_c2c'),.25);if(pc>0){x.save();x.globalAlpha*=pc;x.fillStyle='#d9cfbd';x.fillRect(40,262,460,2);x.restore()}
  txt('• Phạm tội có tổ chức',44,294,{size:20,w:600,a:P(g('k_c2c')+.2,.2)});txt('• Có tính chất chuyên nghiệp',44,322,{size:20,w:600,a:P(g('k_c2d'),.2)});txt('• Thu lợi bất chính từ 2 tỷ đồng trở lên',44,350,{size:20,w:600,a:P(g('k_c2e'),.2)})});
 source(SRC2,1)}
function sD(t){const t0=g('s9');title(null,'LƯU Ý',t0);
 box(60,210,540,270,g('k_l1')-.2,{lw:6},a=>{txt('ĐIỀU 190 XỬ LÝ',34,54,{size:22,col:GREY,ls:3});txt('Hành vi',34,140,{size:58});txt('trái phép',34,214,{size:58,col:RED})});
 box(680,210,540,270,g('k_l2'),{col:GREEN,lw:5},a=>{check(34,30,46,g('k_l2')+.25,.25);txt('ĐÚNG QUY ĐỊNH',100,58,{size:22,col:GREEN,ls:3});txt('Mua bán đúng quy định:',34,140,{size:36});txt('không bị xử lý',34,192,{size:36});txt('theo điều này',34,238,{size:36})});
 source(SRC2,1)}
function sE(t){vxTodo(g('s10'),[[g('k_e1'),'Chỉ giao dịch qua tổ chức','được Bộ Tài chính cấp phép'],[g('s11'),'Thận trọng với lời mời góp vốn phát hành','đồng tiền mới, cam kết lợi nhuận cao'],[g('s12'),'Lưu chứng từ giao dịch. Nghi bị lừa:','trình báo cơ quan công an']])}
function sF(t){vxDisclaimer(g('out'),'Bộ luật Hình sự (sửa đổi) · thông qua 20/11/2026 · hiệu lực 01/3/2027','Số hiệu luật: chờ công bố chính thức',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Bộ luật Hình sự (sửa đổi), Điều 190  ·  thông qua 20/11/2026  ·  hiệu lực 01/3/2027',
 images:{coins:'img/coins.jpg',gavel:'img/gavel.jpg',chart:'img/chart.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sW],[()=>g('s4')-.15,sH],[()=>g('s5')-.15,sB],[()=>g('s7')-.15,sC],[()=>g('s9')-.15,sD],[()=>g('s10')-.15,sE],[()=>g('out')-.15,sF]]});
