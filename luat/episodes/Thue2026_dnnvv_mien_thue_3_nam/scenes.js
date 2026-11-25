// Tập: Doanh nghiệp nhỏ và vừa mới thành lập được miễn thuế thu nhập doanh nghiệp 3 năm (luật sửa đổi 3 luật thuế, 20/11/2026).
// Nghiêm túc, một video một vấn đề, khoảng 2 phút 24 giây. Không nhạc nền.
const SRC_A='Nguồn: Cổng TTĐT Chính phủ, Nhân Dân, VOV, Hà Nội Mới (20–21/11/2026). Chờ đối chiếu văn bản chính thức.';
const SRC_T='Nguồn: Luật Thuế thu nhập doanh nghiệp 2025 (Luật 67/2025/QH15), Điều 10 (quy định hiện hành).';
const SRC_W='Nguồn: Luật Hỗ trợ doanh nghiệp nhỏ và vừa 2017, Điều 4; Báo Chính phủ, Công Thương, Thanh Niên (11/2026). Chờ đối chiếu văn bản.';
const SRC_Q='Nguồn: Nghị quyết 198/2025/QH15 (khoản 4 Điều 10); Nghị định 20/2026/NĐ-CP (Điều 7), theo Thư viện Pháp luật, Cổng TTĐT Chính phủ.';
const SRC_X='Nguồn: TTXVN, Đại biểu Nhân dân, VnExpress. Danh sách chính thức: chờ nghị định của Chính phủ.';
const SRC_H='Nguồn: Dân trí (12/11/2026), Cổng TTĐT tỉnh Hà Tĩnh. Phát biểu trước khi luật được thông qua.';
function sA(t){
 photoCard('open',80,170,380,390,.1,{rot:-.035});
 txt('Doanh nghiệp nhỏ và vừa',520,214,{size:50,a:P(.45,.2)});txt('mới thành lập',520,274,{size:50,a:P(g('k_mt')-.1,.2)});
 underline(520,292,tw('mới thành lập',50),g('k_mt')+.25,.4);
 box(520,318,640,190,g('k_mien0')-.1,{lw:6},a=>{txt('THUẾ THU NHẬP DOANH NGHIỆP',34,42,{size:23,col:GREY,ls:2});txt('MIỄN 3 NĂM',30,162,{size:84,col:RED,a:P(g('k_3n0')-.3,.2)})});
 box(520,524,640,62,g('k_2027'),{col:GREY,lw:3},a=>{txt('Từ 2027: ghi vào Luật Thuế thu nhập doanh nghiệp',320,41,{size:23,w:600,align:'center'})});
 source(SRC_A,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('MIỄN THUẾ 3 NĂM',310,64,{size:38,align:'center'})});
 const bx=[60,465,870],lab=[['Ai','được miễn?'],['Miễn','từ khi nào?'],['Khi nào','không được miễn?']],ph=['open','sign','calc'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC_A,1)}
function sP(t){const t0=g('s1');title(null,'QUY ĐỊNH Ở ĐÂU?',t0);
 const y=176,h=330;
 box(50,y,350,h,t0+.15,{lw:6},a=>{txt('VĂN BẢN',175,58,{size:21,col:GREY,align:'center',ls:1});txt('Luật sửa đổi',175,138,{size:42,align:'center'});txt('3 luật thuế',175,194,{size:42,col:RED,align:'center'});
  txt('Bổ sung khoản 14b, Điều 4',175,252,{size:19,w:600,col:GREY,align:'center'});txt('Luật Thuế thu nhập doanh nghiệp',175,280,{size:19,w:600,col:GREY,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{photo('gavel',14,14,322,130);txt('QUỐC HỘI THÔNG QUA',175,184,{size:21,col:GREY,align:'center',ls:1});txt('20/11/2026',175,240,{size:46,align:'center'});txt('475/477 phiếu tán thành',175,286,{size:22,w:600,col:GREY,align:'center',a:P(g('k_phieu'),.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/01/2027',175,270,{size:50,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl')+.8,.3)});
 source(SRC_A,1)}
function fbox(s,px,py,w,t0,o={}){box(px,py,w,84,t0,o,a=>{txt(s,w/2,54,{size:28,align:'center',col:o.tc||INK})})}
function rate(px,pct,l1,l2,t0,o={}){box(px,340,370,180,t0,o,a=>{txt(pct,34,96,{size:78,col:RED});txt(l1,34,134,{size:21,w:600});if(l2)txt(l2,34,160,{size:21,w:600})})}
function sT(t){const t0=g('s2');title(null,'THUẾ THU NHẬP DOANH NGHIỆP LÀ GÌ?',t0,{sub:'Thuế tính trên phần lãi của doanh nghiệp'});
 fbox('Doanh thu',60,184,260,g('k_dt')-.1);txt('−',345,244,{size:50,align:'center',a:P(g('k_dt')+.5,.2)});
 fbox('Chi phí được trừ',370,184,320,g('k_cp')-.1);txt('=',715,242,{size:46,align:'center',a:P(g('k_cp')+.7,.2)});
 fbox('Phần lãi (thu nhập tính thuế)',740,184,480,g('k_cp')+.8,{lw:6,tc:RED});
 txt('THUẾ SUẤT HIỆN NAY',60,320,{size:20,col:GREY,ls:2,a:P(g('k_20')-1.2,.25)});
 rate(60,'20%','Thuế suất phổ thông',null,g('k_20')-.3,{lw:6});
 rate(455,'15%','Doanh thu đến','3 tỷ đồng/năm',g('k_dnn'));
 rate(850,'17%','Doanh thu trên 3 tỷ','đến 50 tỷ đồng/năm',g('k_dnn')+.6);
 source(SRC_T,1)}
function crow(y,l1,l2,val,t0,col){const a=P(t0,.22);if(a<=0)return;if(l2){txt(l1,34,y-14,{size:21,w:600,a});txt(l2,34,y+12,{size:21,w:600,a})}else txt(l1,34,y,{size:21,w:600,a});txt(val,506,y+4,{size:40,col:col||INK,align:'right',a})}
function sW(t){const t0=g('s3');title(null,'AI LÀ DOANH NGHIỆP NHỎ VÀ VỪA?',t0);
 box(60,170,540,380,t0+.5,{col:GREY},a=>{txt('LUẬT HIỆN HÀNH',34,48,{size:22,col:GREY,ls:2});txt('Luật Hỗ trợ doanh nghiệp nhỏ và vừa 2017, Điều 4',34,76,{size:17,w:600,col:GREY});
  crow(146,'Lao động tham gia','bảo hiểm xã hội','≤ 200 người',g('k_200')-.2);
  txt('và một trong hai điều kiện:',34,206,{size:18,w:600,col:GREY,a:P(g('k_100')-.3,.25)});
  crow(256,'Tổng nguồn vốn',null,'≤ 100 tỷ đồng',g('k_100'));crow(326,'hoặc doanh thu','một năm','≤ 300 tỷ đồng',g('k_300d'))});
 arrow(608,360,672,360,g('k_ptr')+.3,.2);
 box(680,170,540,380,g('k_ptr')+.5,{lw:6},a=>{txt('LUẬT MỚI',34,48,{size:22,col:RED,ls:2});txt('Luật Phát triển doanh nghiệp nhỏ và vừa (20/11/2026)',34,76,{size:17,w:600,col:GREY});
  crow(146,'Lao động',null,'≤ 300 người',g('k_300')-.1,RED);
  txt('và một trong hai điều kiện:',34,206,{size:18,w:600,col:GREY,a:P(g('k_150')-.3,.25)});
  crow(256,'Tổng nguồn vốn',null,'≤ 150 tỷ đồng',g('k_150'),RED);crow(322,'hoặc doanh thu','một năm','≤ 400 tỷ đồng',g('k_400'),RED);
  txt('Dùng cho chính sách thuế từ kỳ tính thuế 2027',34,366,{size:18,w:600,a:P(g('k_ky'),.25)})});
 source(SRC_W,1)}
function yblock(px,lab,s,t0,col){box(px,356,190,110,t0,{col},a=>{txt(lab,95,40,{size:20,col:GREY,align:'center',ls:2});txt(s,95,84,{size:30,col,align:'center'})})}
function sQ(t){const t0=g('s5');title(null,'LUẬT QUY ĐỊNH GÌ?',t0);
 box(60,150,1160,130,g('k_mien')-.5,{lw:6},a=>{txt('Doanh nghiệp nhỏ và vừa được miễn thuế thu nhập doanh nghiệp',34,50,{size:28});
  const w1=tw('trong 3 năm',40);txt('trong 3 năm',34,104,{size:40,col:RED,a:P(g('k_3n'),.2)});txt('kể từ khi được cấp giấy chứng nhận đăng ký doanh nghiệp lần đầu',34+w1+18,101,{size:23,w:600,a:P(g('k_ke'),.2)})});
 box(60,310,300,238,g('k_ke')+.4,{},a=>{photo('sign',12,12,276,124);txt('Ngày được cấp',150,172,{size:21,align:'center'});txt('giấy chứng nhận',150,198,{size:21,align:'center'});txt('đăng ký lần đầu',150,224,{size:21,align:'center'})});
 const tb=g('k_ke')+1.0;arrow(368,410,412,410,tb-.2,.18);
 for(let i=0;i<3;i++)yblock(420+i*200,'NĂM '+(i+1),'Miễn thuế',tb+i*.22,GREEN);
 yblock(1020,'NĂM 4','Nộp thuế',tb+.9,GREY);
 txt('Tính liên tục từ năm đầu tiên được cấp giấy chứng nhận',420,338,{size:20,w:600,a:P(g('k_lt'),.25)});
 sketch([seg(424,478,1006,478,7)],g('k_lt')+.2,.5,{col:GREEN,lw:6});
 box(420,492,800,56,g('k_198')-.2,{col:GREY,lw:3},a=>{txt('Có từ 2025: Nghị quyết 198/2025/QH15  ·  Hướng dẫn: Nghị định 20/2026/NĐ-CP',400,36,{size:19,w:600,align:'center'})});
 source(SRC_Q,1)}
function sX(t){const t0=g('s7');title(null,'TRƯỜNG HỢP NÀO KHÔNG ĐƯỢC MIỄN?',t0,{sub:'Chính phủ sẽ quy định chi tiết. Dưới đây là thông tin đã công bố.'});
 box(50,214,270,270,t0+.4,{lw:6},a=>{txt('KHÔNG',135,104,{size:46,col:RED,align:'center'});txt('ĐƯỢC MIỄN',135,156,{size:38,col:RED,align:'center'});txt('thuế 3 năm',135,204,{size:24,w:600,align:'center'})});
 box(50,496,270,76,g('k_cpq'),{col:GREY,lw:3},a=>{txt('Chi tiết: chờ nghị định',135,32,{size:19,w:600,align:'center'});txt('của Chính phủ',135,58,{size:19,w:600,align:'center'})});
 const tb=g('k_tt');const it=[[g('k_sn')-.4,'Thành lập do sáp nhập, hợp nhất',null],[g('k_chia')-.1,'Thành lập do chia, tách',null],[g('k_cd'),'Thành lập do chuyển đổi',null],[g('k_gt')+.2,'Lập mới sau khi giải thể doanh nghiệp cũ','của cùng chủ sở hữu']];
 it.forEach(([ti,s,s2],i)=>{const y=176+i*100,tf=tb+i*.4;arrow(328,348,392,y+44,tf-.15,.18);box(400,y,830,88,tf,{},a=>{badge(i+1,46,44,tf+.05,20);const al=P(ti,.2);if(s2){txt(s,84,40,{size:28,a:al});txt(s2,84,70,{size:21,w:600,a:al})}else txt(s,84,56,{size:32,a:al})})});
 source(SRC_X,1)}
function sH(t){const t0=g('s8');title(null,'HỘ KINH DOANH CHUYỂN LÊN DOANH NGHIỆP?',t0);
 box(60,180,300,240,t0+.3,{},a=>{photo('shop',12,12,276,150);txt('Hộ kinh doanh',150,208,{size:28,align:'center'})});
 arrow(368,300,432,300,t0+.8,.2);
 box(440,180,300,240,t0+1.0,{},a=>{icon('paper',90,18,124,t0+1.2,.5,{hand:false});txt('Doanh nghiệp',150,208,{size:28,align:'center'})});
 arrow(748,300,792,300,g('k_bt')-.2,.18);
 box(800,180,420,240,g('k_bt'),{lw:6},a=>{txt('BỘ TRƯỞNG BỘ TÀI CHÍNH',34,46,{size:20,col:GREY,ls:1});txt('phát biểu tại Quốc hội, 12/11/2026',34,74,{size:18,w:600,col:GREY});
  txt('Trường hợp này',34,136,{size:28,a:P(g('k_m3n')-.9,.2)});txt('được miễn thuế 3 năm',34,188,{size:31,col:RED,a:P(g('k_m3n'),.2)})});
 box(60,450,1160,96,g('k_cho'),{col:GREY},a=>{txt('Cách áp dụng cụ thể: chờ nghị định hướng dẫn',580,60,{size:32,align:'center'})});
 source(SRC_H,1)}
function sN(t){const t0=g('s9');title(null,'LƯU Ý',t0);
 box(60,180,560,320,t0+.4,{lw:6},a=>{txt('MIỄN THUẾ THU NHẬP DOANH NGHIỆP',34,52,{size:20,col:GREY,ls:1});txt('Không có nghĩa là',34,132,{size:34,a:P(g('k_kh'),.2)});txt('miễn các loại thuế khác',34,192,{size:40,col:RED,a:P(g('k_kh')+.6,.2)});
  txt('Ví dụ: thuế giá trị gia tăng vẫn áp dụng theo quy định',34,252,{size:18,w:600,col:GREY,a:P(g('k_kh')+1.1,.25)})});
 box(660,180,560,320,g('k_kk'),{},a=>{photo('calc',14,14,532,160);txt('Vẫn phải kê khai thuế đầy đủ',280,236,{size:32,align:'center'});txt('trong thời gian được miễn',280,276,{size:22,w:600,col:GREY,align:'center'})});
 source('Lưu ý chung về nghĩa vụ thuế. Chi tiết: hỏi cơ quan thuế quản lý doanh nghiệp.',1)}
function sE(t){vxTodo(g('e1'),[[g('k_e1'),'Kiểm tra doanh nghiệp của bạn','có thuộc nhóm nhỏ và vừa hay không'],[g('e2'),'Xem ngày cấp giấy chứng nhận đăng ký','doanh nghiệp lần đầu để tính 3 năm'],[g('e3'),'Vẫn kê khai, quyết toán thuế đúng hạn;','giữ đủ hóa đơn, chứng từ'],[g('e4'),'Theo dõi nghị định hướng dẫn;','hỏi cơ quan thuế quản lý doanh nghiệp']])}
function sF(t){vxDisclaimer(g('out'),'Luật sửa đổi 3 luật thuế · thông qua 20/11/2026 · hiệu lực 01/01/2027','Số hiệu luật: chờ công bố chính thức',g('k_src'),SRC_A+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật sửa đổi 3 luật thuế  ·  thông qua 20/11/2026  ·  hiệu lực 01/01/2027',
 images:{open:'img/open.jpg',sign:'img/sign.jpg',calc:'img/calc.jpg',gavel:'img/gavel.jpg',shop:'img/shop.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sT],[()=>g('s3')-.15,sW],[()=>g('s5')-.15,sQ],[()=>g('s7')-.15,sX],[()=>g('s8')-.15,sH],[()=>g('s9')-.15,sN],[()=>g('e1')-.15,sE],[()=>g('out')-.15,sF]]});
