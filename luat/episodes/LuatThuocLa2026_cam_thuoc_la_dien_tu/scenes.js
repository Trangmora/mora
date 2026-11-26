// Tập: Cấm thuốc lá điện tử, thuốc lá nung nóng trong Luật sửa đổi Luật Phòng, chống tác hại của thuốc lá (thông qua 21/11/2026, hiệu lực 01/7/2027). Khoảng 2 phút 9 giây.
const SRC1='Nguồn: Báo Dân trí (21/11/2026), Báo Đại biểu Nhân dân, Cổng Xây dựng chính sách (Chính phủ), VnExpress.';
const SRC_BAN='Nguồn: VnExpress, Đại Đoàn Kết, VietTimes, Báo Công an TP.HCM (11/2026). Chờ đối chiếu văn bản luật chính thức.';
const SRC_NOW='Nguồn: NQ 173/2024/QH15 (Thư viện Pháp luật, Báo Nhân Dân); NĐ 90/2026/NĐ-CP (VnExpress, LuatVietnam, Sức khỏe & Đời sống).';
function sA(t){
 photoCard('mod',70,170,400,400,.1,{rot:-.035});
 stamp('TỪ 01/7/2027',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Thuốc lá điện tử,',520,226,{size:52,a:P(.6,.2)});txt('thuốc lá nung nóng',520,290,{size:52,a:P(1.0,.2)});
 txt('bị cấm trong luật',520,354,{size:52,col:RED,a:P(g('k_cam')-.1,.2)});underline(520,372,tw('bị cấm trong luật',52),g('k_cam')+.2,.4);
 box(520,410,660,160,g('k_ca'),{lw:6},a=>{txt('CẤM CẢ',34,50,{size:24,col:GREY,ls:3});txt('Sản xuất · Buôn bán ·',30,116,{size:44});txt('Sử dụng',30+tw('Sản xuất · Buôn bán · ',44)+4,116,{size:44,col:RED,a:P(g('k_dung'),.2)})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('THUỐC LÁ ĐIỆN TỬ, NUNG NÓNG',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Luật','cấm những gì?'],['Hiện nay','bị phạt ra sao?'],['Bạn nên','làm gì?']],ph=['nosmoke','pod','mod'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_luat')+.2,{lw:6},a=>{txt('VĂN BẢN',175,58,{size:21,col:GREY,align:'center',ls:1});txt('Luật sửa đổi,',175,128,{size:32,align:'center'});txt('bổ sung một số điều',175,170,{size:28,w:600,align:'center'});txt('của Luật Phòng, chống',175,214,{size:28,w:600,align:'center'});txt('tác hại của thuốc lá',175,252,{size:28,w:600,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{photo('nosmoke',14,14,322,130);txt('QUỐC HỘI THÔNG QUA',175,184,{size:21,col:GREY,align:'center',ls:1});txt('21/11/2026',175,244,{size:46,align:'center'});txt('Kỳ họp thứ 2, Quốc hội khóa XVI',175,290,{size:19,w:600,col:GREY,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/7/2027',175,262,{size:54,col:RED,align:'center',a:P(g('k_hl')+.4,.2)});txt('trừ một số quy định áp dụng riêng',175,300,{size:17,w:600,col:GREY,align:'center',a:P(g('k_rieng'),.25)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl')+1,.3)});
 source(SRC1,1)}
function sB(t){const t0=g('s2');title(null,'HIỂU BẰNG LỜI THƯỜNG',t0,{sub:'Hai loại sản phẩm chính bị cấm'});
 box(60,186,550,390,g('k_dt')-.2,{lw:6},a=>{photo('pod',14,14,522,190);txt('THUỐC LÁ ĐIỆN TỬ',30,248,{size:24,col:RED,ls:2});txt('Làm nóng dung dịch có nicotine',30,292,{size:25,w:600});txt('→ tạo ra hơi để hít vào',30,326,{size:25,w:600});txt('Thường gọi: vape, pod',30,368,{size:27,a:P(g('k_vape'),.2)})});
 arrow(620,380,662,380,g('k_nn')-.3,.2);
 box(670,186,550,390,g('k_nn'),{},a=>{photo('mod',14,14,522,190);txt('THUỐC LÁ NUNG NÓNG',30,248,{size:24,col:RED,ls:2});txt('Làm nóng lá thuốc',30,292,{size:25,w:600});txt('không đốt cháy',30,338,{size:34,a:P(g('k_kd'),.2)});underline(30,354,tw('không đốt cháy',34),g('k_kd')+.2,.3)});
 source('Giải thích bằng lời thường, không phải định nghĩa trong luật. Định nghĩa đầy đủ: xem văn bản gốc. Ảnh minh họa.',1)}
function sH(t){const t0=g('s3');title(null,'HIỆN NAY: ĐÃ BỊ CẤM, ĐÃ BỊ PHẠT',t0);
 box(60,180,520,330,g('k_nq')-.2,{col:GREY},a=>{txt('NGHỊ QUYẾT CỦA QUỐC HỘI',30,50,{size:21,col:GREY,ls:2});txt('173/2024/QH15',30,112,{size:46});
  txt('Cấm thuốc lá điện tử,',30,170,{size:27,w:600});txt('thuốc lá nung nóng',30,206,{size:27,w:600});txt('Áp dụng từ năm 2025',30,280,{size:36,col:RED,a:P(g('k_2025'),.2)})});
 arrow(592,345,652,345,g('k_nd')-.25,.22);
 box(660,180,560,330,g('k_nd'),{lw:7},a=>{txt('NGHỊ ĐỊNH 90/2026/NĐ-CP · TỪ 15/5/2026',30,50,{size:20,col:GREY,ls:1});txt('Người sử dụng',30,112,{size:40});
  txt('3–5 triệu đồng',30,206,{size:66,col:RED,a:P(g('k_phat')+.6,.2)});txt('phạt tiền (Điều 26, theo báo chí)',30,250,{size:20,w:600,col:GREY,a:P(g('k_phat')+1,.25)})});
 source(SRC_NOW,1)}
function chip(s,px,py,t0,o={}){const sz=o.size||28,w=tw(s,sz)+46;box(px,py,w,64,t0,{lw:o.lw||3,r:32,col:o.col},a=>{txt(s,w/2,43,{size:sz,align:'center',col:o.tc||INK})});return w}
function sC(t){const t0=g('s4');title(null,'LUẬT MỚI NGHIÊM CẤM',t0,{sub:'Đưa lệnh cấm vào Luật Phòng, chống tác hại của thuốc lá'});
 box(60,196,300,330,t0+.4,{lw:6},a=>{photo('nosmoke',14,14,272,190);txt('Thuốc lá điện tử,',150,250,{size:26,align:'center'});txt('thuốc lá nung nóng',150,288,{size:26,align:'center'})});
 arrow(372,360,420,360,g('k_hv')-.2,.2);
 const r1=[['Sản xuất',g('k_h1')],['Kinh doanh',g('k_h2')],['Mua bán',g('k_h3')],['Tàng trữ',g('k_h4')]],r2=[['Vận chuyển',g('k_h5')],['Xuất khẩu',g('k_h6')],['Nhập khẩu',g('k_h6')+.7]];
 let px=440;r1.forEach(([s,ti])=>{px+=chip(s,px,214,ti-.1)+16});px=440;r2.forEach(([s,ti])=>{px+=chip(s,px,310,ti-.1)+16});
 chip('SỬ DỤNG',440,412,g('k_h7')+.2,{size:40,lw:6,tc:RED});
 txt('← người dùng cũng vi phạm',440+tw('SỬ DỤNG',40)+70,454,{size:24,w:600,col:RED,a:P(g('k_h7')+.6,.25)});
 source(SRC_BAN,1)}
function sD(t){const t0=g('s5');title(null,'DANH MỤC BỊ CẤM',t0);
 const it=[['Thuốc lá','điện tử',g('k_d1')],['Thuốc lá','nung nóng',g('k_d2')],['Túi ngậm','nicotine',g('k_d3')],['Shisha','',g('k_d4')]];
 it.forEach(([a1,a2,ti],i)=>{const bx=60+i*295;box(bx,180,275,210,ti-.15,i<2?{lw:6}:{},a=>{badge(i+1,40,44,ti,22);txt(a1,137,112,{size:34,align:'center'});if(a2)txt(a2,137,156,{size:34,align:'center'})})});
 box(160,420,960,140,g('k_tb'),{col:GREY},a=>{txt('THEO BÁO CHÍ',30,44,{size:20,col:GREY,ls:2});txt('Cấm cả thiết bị và nguyên liệu chuyên dùng',30,92,{size:30});txt('cho các sản phẩm này',30,126,{size:24,w:600,col:GREY})});
 source(SRC_BAN,1)}
function sV(t){const t0=g('s6');title(null,'NGƯỜI DÙNG CŨNG VI PHẠM',t0);
 box(60,180,540,170,g('k_ban')-.2,{col:GREY},a=>{icon('shop',24,30,110,g('k_ban'),.5);txt('Người bán',170,80,{size:40});txt('vi phạm',170,128,{size:32,col:GREY})});
 box(680,180,540,170,g('k_nd2'),{lw:7},a=>{photo('pod',20,20,140,130);txt('Người dùng',190,80,{size:40});txt('cũng vi phạm',190,128,{size:32,col:RED})});
 box(60,380,540,190,g('k_cho'),{col:GREY},a=>{txt('MỨC PHẠT THEO LUẬT MỚI',30,48,{size:20,col:GREY,ls:2});txt('Chờ Chính phủ',30,110,{size:42});txt('hướng dẫn',30,160,{size:42})});
 box(680,380,540,190,g('k_hn'),{lw:6},a=>{txt('HIỆN NAY ĐANG ÁP DỤNG',30,48,{size:20,col:RED,ls:2});txt('3–5 triệu đồng',30,122,{size:56,col:RED});txt('Nghị định 90/2026/NĐ-CP',30,164,{size:22,w:600,col:GREY})});
 source(SRC_NOW,1)}
function sW(t){const t0=g('s7');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 const bx=[60,465,870],ts=[g('k_a1'),g('k_a2'),g('k_a3')],lab=[['Người đang dùng','vape, pod'],['Cửa hàng,','người bán trên mạng'],['Gia đình có con','đang tuổi đi học']],ic=[null,'shop','house'];
 for(let i=0;i<3;i++){const ti=ts[i]-.2;box(bx[i],190,350,340,ti,{},a=>{if(i==0)photo('pod',14,14,322,170);else icon(ic[i],105,24,140,ti+.15,.5);badge(i+1,175,214,ti+.2,20);txt(lab[i][0],175,272,{size:30,align:'center'});txt(lab[i][1],175,310,{size:28,w:600,align:'center'})})}
 source(SRC1,1)}
function sE(t){vxTodo(g('s8'),[[g('k_e1'),'Đang dùng thuốc lá điện tử: dừng ngay,','vì hiện nay đã có thể bị phạt'],[g('s9'),'Không mua thiết bị, tinh dầu qua mạng,','không giữ hộ người khác'],[g('s10'),'Phụ huynh: nói chuyện với con','về tác hại và lệnh cấm'],[g('s11'),'Cần hỗ trợ cai nghiện thuốc lá:','hỏi cơ sở y tế gần nhà']])}
function sF(t){vxDisclaimer(g('out'),'Luật sửa đổi Luật PCTH thuốc lá · thông qua 21/11/2026 · hiệu lực 01/7/2027','Số hiệu luật: chờ công bố chính thức',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật sửa đổi Luật Phòng, chống tác hại của thuốc lá  ·  thông qua 21/11/2026  ·  hiệu lực 01/7/2027',
 images:{mod:'img/mod.jpg',pod:'img/pod.jpg',nosmoke:'img/nosmoke.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sH],[()=>g('s4')-.15,sC],[()=>g('s5')-.15,sD],[()=>g('s6')-.15,sV],[()=>g('s7')-.15,sW],[()=>g('s8')-.15,sE],[()=>g('out')-.15,sF]]});
