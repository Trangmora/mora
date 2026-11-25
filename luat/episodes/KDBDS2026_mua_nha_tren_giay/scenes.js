// Tập: Luật Kinh doanh bất động sản (sửa đổi) 2026, góc "mua nhà trên giấy" (bản dài khoảng 2 phút 17 giây, giọng nghiêm túc).
// Slide sơ đồ: ô viền đỏ nối nhau bằng mũi tên bút dạ. Không sửa khung dùng chung; hàm riêng của tập nằm trong file này.
const SRC1='Nguồn: LuatVietnam, Báo Xây dựng, Đại biểu Nhân dân, TTXVN (21/11/2026)';
const SRC2='Nguồn: VnExpress, Thanh Niên, Znews, Thời báo Tài chính (21/11/2026). Chờ đối chiếu văn bản chính thức.';
const SRC3='Nguồn: VOV, VTV, Báo Chính phủ, Tiền Phong (11/2026). Chờ đối chiếu văn bản chính thức.';
const SRC4='Nguồn: Luật Kinh doanh bất động sản 2023 (Luật 29/2023/QH15), Điều 3 và Điều 24';
// ---- mở đầu ----
function sA(t){
 photoCard('site',70,168,410,390,.15,{rot:-.03});
 stamp('TỪ 01/7/2027',1060,128,P(.5,.4),{size:30,rot:.05});
 txt('Tiền “giữ chỗ”',540,258,{size:60,a:P(1.2,.25)});txt('mua nhà trên giấy',540,330,{size:60,a:P(1.7,.25)});
 underline(540,348,tw('mua nhà trên giấy',60),2.1,.4);
 box(540,388,640,188,g('k_a1')-.05,{lw:6},a=>{txt('CHỦ ĐẦU TƯ',34,46,{size:21,col:GREY,ls:3});txt('KHÔNG ĐƯỢC THU',30,108,{size:58,col:RED,a:P(g('k_a2'),.2)});
  underline(30,119,tw('KHÔNG ĐƯỢC THU',58),g('k_a3')+1.2,.35);
  txt('khi bất động sản chưa đủ điều kiện kinh doanh',34,166,{size:22,w:600,a:P(g('k_a3'),.25)})});
 source(SRC2,P(1,.4))}
// ---- sơ đồ tổng quan ----
function sM(t){const t0=g('op2');
 box(230,92,820,92,t0+.1,{lw:6},a=>{txt('LUẬT KINH DOANH BẤT ĐỘNG SẢN (SỬA ĐỔI)',410,60,{size:33,align:'center'})});
 stamp('MUA NHÀ TRÊN GIẤY',200,548,P(t0+1.5,.4),{size:24,rot:-.06});
 const bx=[60,465,870],lab=[['Cấm thu tiền','“giữ chỗ”'],['Đặt cọc và các','mốc trả tiền'],['Ví dụ: căn nhà','giá 2 tỷ đồng']],ph=['site','contract','keys'];
 for(let i=0;i<3;i++){const ti=g('k_m1')-.4+i*.42;arrow(640+(i-1)*150,188,bx[i]+175,258,ti,.2);
  box(bx[i],264,350,214,ti+.18,{},a=>{photo(ph[i],12,12,326,92);badge(i+1,38,140,ti+.25,20);txt(lab[i][0],68,148,{size:24});txt(lab[i][1],68,182,{size:24})})}
 const te=g('k_m2');arrow(640,482,640,502,te,.15);box(390,508,500,80,te+.12,{col:GREEN,lw:5},a=>{txt('BẠN NÊN LÀM GÌ?',250,53,{size:32,col:GREEN,align:'center'})});
 source(SRC1,1)}
// ---- văn bản nào, khi nào ----
function sB(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, KHI NÀO?',t0);
 const y=176,h=318;
 box(50,y,350,h,t0+.3,{},a=>{photo('contract',14,14,322,130);txt('QUỐC HỘI THÔNG QUA',175,186,{size:21,col:GREY,align:'center',ls:1});txt('21/11/2026',175,244,{size:46,align:'center',a:P(g('k_ngay'),.2)});txt('Luật gồm 10 chương, 63 điều',175,286,{size:21,w:600,col:GREY,align:'center',a:P(g('k_ngay')+1.9,.25)})});
 arrow(408,y+h/2,460,y+h/2,g('k_phieu')-.3,.2);
 box(468,y,350,h,g('k_phieu'),{},a=>{txt('PHIẾU TÁN THÀNH',175,56,{size:21,col:GREY,align:'center',ls:1});txt('471',175,190,{size:120,align:'center'});txt('trên 479 đại biểu',175,242,{size:25,w:600,align:'center',a:P(g('k_phieu')+1.1,.2)});txt('tham gia biểu quyết',175,276,{size:25,w:600,align:'center',a:P(g('k_phieu')+1.1,.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,56,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,74,120,g('k_hl')+.25,.5);txt('01/7/2027',175,264,{size:54,col:RED,align:'center',a:P(g('k_hl2'),.2)})});
 box(50,512,1186,80,g('k_cu'),{col:GREY,lw:3},a=>{txt('Từ nay đến hết 30/6/2027: Luật Kinh doanh bất động sản năm 2023 vẫn áp dụng',593,34,{size:23,align:'center'});txt('Số hiệu luật mới: chờ công bố chính thức',593,62,{size:18,w:600,col:GREY,align:'center',a:P(g('k_cu')+1.3,.3)})});
 source(SRC1,1)}
// ---- nhà trên giấy là gì ----
function sC(t){const t0=g('s2');title(null,'“NHÀ TRÊN GIẤY” LÀ GÌ?',t0,{sub:'Tên trong luật: nhà ở hình thành trong tương lai'});
 photoCard('scaffold',64,200,380,330,t0+.3,{rot:-.02});
 box(500,186,730,112,g('k_n1')-.1,{},a=>{txt('Nhà đang xây,',28,48,{size:32});txt('chưa nghiệm thu đưa vào sử dụng',28,88,{size:27,a:P(g('k_n2'),.2)})});
 box(500,322,330,104,g('k_n3')-.1,{},a=>{txt('Trả tiền trước',165,64,{size:34,align:'center'})});
 arrow(838,374,892,374,g('k_n4')-.25,.2);
 box(900,322,330,104,g('k_n4'),{},a=>{txt('Nhận nhà sau',165,64,{size:34,align:'center'})});
 arrow(665,430,665,452,g('k_n5')-.3,.15);
 box(500,458,730,112,g('k_n5')-.05,{lw:6},a=>{txt('RỦI RO',28,42,{size:21,col:RED,ls:3});txt('nằm ở khoản tiền trả trước',28,86,{size:32})});
 source(SRC4,1)}
// ---- tiền giữ chỗ là gì ----
function sD(t){const t0=g('s3');title(null,'TIỀN “GIỮ CHỖ” LÀ GÌ?',t0);
 const y=160,h=250;
 box(50,y,350,h,g('k_g3')-.1,{lw:6},a=>{photo('site',14,14,322,120);txt('Dự án',175,178,{size:28,align:'center'});txt('CHƯA MỞ BÁN',175,218,{size:30,col:RED,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_g3')+.2,.2);
 box(468,y,350,h,g('k_g1')-.1,{},a=>{photo('contract',14,14,322,120);txt('Người mua',175,178,{size:28,align:'center'});txt('đưa tiền trước',175,218,{size:30,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_g2')-.3,.2);
 box(886,y,350,h,g('k_g2')-.05,{},a=>{photo('keys',14,14,322,120);txt('Để được ưu tiên',175,178,{size:28,align:'center'});txt('chọn căn',175,218,{size:30,align:'center'})});
 const t4=g('k_g4');txt('Còn được gọi là:',60,506,{size:27,a:P(t4,.25)});
 box(330,452,270,92,t4+.3,{},a=>{txt('“giữ chỗ”',135,60,{size:34,align:'center'})});
 box(630,452,270,92,g('k_g5'),{},a=>{txt('“đặt chỗ”',135,60,{size:34,align:'center'})});
 box(930,452,270,92,g('k_g6'),{},a=>{txt('“booking”',135,60,{size:34,align:'center'})});
 source('Nguồn: Znews, Thanh Niên, VnExpress (21/11/2026). Cách gọi thường gặp trên thị trường.',1)}
// ---- luật mới quy định gì ----
function sE(t){const t0=g('s4');title(null,'LUẬT MỚI: CẤM THU TIỀN “GIỮ CHỖ”',t0,{sub:'Áp dụng khi bất động sản chưa đủ điều kiện kinh doanh'});
 const y=186,h=330,tL=g('k_b1')-.3,tM=g('k_b2')-.05,tN=g('k_b4')-.05;
 box(50,y,330,h,tL,{},a=>{photo('site',14,14,302,160);txt('Bất động sản',165,216,{size:26,align:'center'});txt('CHƯA ĐỦ ĐIỀU KIỆN',165,258,{size:27,col:RED,align:'center',a:P(g('k_b1')+.7,.2)});txt('kinh doanh',165,294,{size:26,align:'center',a:P(g('k_b1')+.7,.2)})});
 arrow(388,y+h/2,442,y+h/2,tM-.25,.2);
 box(450,y,380,h,tM,{lw:6},a=>{txt('CHỦ ĐẦU TƯ',190,54,{size:21,col:GREY,align:'center',ls:2});txt('KHÔNG ĐƯỢC',190,128,{size:50,col:RED,align:'center'});txt('THU TIỀN',190,188,{size:50,col:RED,align:'center'});
  txt('của người mua',190,236,{size:25,w:600,align:'center',a:P(g('k_b2b'),.2)});txt('dưới bất kỳ hình thức nào',190,282,{size:23,w:600,align:'center',a:P(g('k_b3'),.2)})});
 arrow(838,y+h/2,892,y+h/2,tN-.25,.2);
 box(900,y,330,h,tN,{},a=>{txt('ĐIỂM MỚI',165,96,{size:46,col:RED,align:'center'});txt('so với luật hiện hành',165,150,{size:24,w:600,align:'center'});txt('(Luật Kinh doanh',165,214,{size:20,w:600,col:GREY,align:'center'});txt('bất động sản năm 2023)',165,242,{size:20,w:600,col:GREY,align:'center'})});
 source(SRC2,1)}
// ---- thế nào là đủ điều kiện kinh doanh ----
function sF(t){const t0=g('s5');title(null,'THẾ NÀO LÀ “ĐỦ ĐIỀU KIỆN KINH DOANH”?',t0,{size:40,sub:'Theo luật hiện hành: Luật Kinh doanh bất động sản 2023, Điều 24'});
 stamp('LUẬT HIỆN HÀNH',1085,150,P(g('k_d1'),.4),{size:22,rot:.05});
 const t2=g('k_d2')-.1,t3=g('k_d3')-.1,t4=g('k_d4')-.05;
 box(120,192,1040,100,t2,{},a=>{check(32,26,48,t2+.3,.25);txt('Dự án có đủ giấy tờ pháp lý',112,63,{size:32})});
 box(120,310,1040,124,t3,{},a=>{check(32,38,48,t3+.3,.25);txt('Chủ đầu tư thông báo cho cơ quan quản lý cấp tỉnh',112,54,{size:30});txt('trước khi bán',112,96,{size:30,a:P(g('k_d3b'),.2)})});
 box(120,452,1040,112,t4,{col:GREY,lw:3},a=>{txt('Điều kiện chi tiết của luật mới:',520,46,{size:27,align:'center'});txt('chờ văn bản chính thức',520,86,{size:28,col:RED,align:'center',a:P(t4+1.1,.25)})});
 source(SRC4+'; Nghị định 96/2024/NĐ-CP',1)}
// ---- đặt cọc và các mốc trả tiền (dùng chung cho cảnh ví dụ) ----
const BX=71,BW=1138,BY=446,BH=32;
function pbox(i,lab,t0,fn){box(71+i*296,184,250,230,t0,{},a=>{txt(lab,125,42,{size:17,col:GREY,align:'center',ls:.5});fn(a)})}
function parrow(i,t0){const px=71+i*296;arrow(px+256,299,px+290,299,t0,.15,{head:11})}
function payBar(t,tShow,st,tGreen){const pb=P(tShow,.3);if(pb<=0)return;x.save();x.globalAlpha*=pb;x.fillStyle='#e2d8c2';rr(BX,BY,BW,BH,16);x.fill();
 let f=0,pv=0;for(const[tk,v]of st){f+=(v-pv)*ease((t-tk)/.5);pv=v}
 if(f>0){x.save();rr(BX,BY,BW,BH,16);x.clip();x.fillStyle=RED;x.fillRect(BX,BY,BW*f,BH);const pg=P(tGreen,.4);if(pg>0){x.globalAlpha*=pg;x.fillStyle=GREEN;x.fillRect(BX+BW*.95,BY,BW*.05,BH)}x.restore()}
 x.strokeStyle=INK;x.lineWidth=2.5;rr(BX,BY,BW,BH,16);x.stroke();
 for(const[tk,v,lab]of st){txt(lab,BX+BW*v,BY+BH+26,{size:20,col:INK,align:v>.9?'right':'center',a:P(tk,.2)})}
 txt('Đã trả',BX,BY-10,{size:16,w:600,col:GREY});x.restore()}
function sG(t){const t0=g('s6'),t7=g('s7');title(null,'ĐẶT CỌC VÀ CÁC MỐC TRẢ TIỀN',t0,{sub:'Mua nhà ở hình thành trong tương lai (“nhà trên giấy”)'});
 const c1=g('k_c1')-.1,gT=g('k_c4a')+1.1;
 payBar(t,t7,[[Math.max(g('k_c1a'),t7+.3),.05,'5%'],[g('k_c2a'),.30,'30%'],[g('k_c3a'),.70,'70%'],[g('k_c4a'),.95,'95%']],gT);
 pbox(0,'ĐẶT CỌC',c1,a=>{txt('≤ 5%',125,128,{size:64,col:RED,align:'center',a:P(g('k_c1a')-.1,.2)});txt('giá bán',125,162,{size:20,w:600,align:'center',a:P(g('k_c1a')+.3,.2)});
  txt('chỉ khi nhà đã đủ',125,192,{size:17,w:600,col:GREY,align:'center',a:P(c1+.5,.2)});txt('điều kiện kinh doanh',125,214,{size:17,w:600,col:GREY,align:'center',a:P(c1+.5,.2)})});
 parrow(0,g('k_c1b')+.2);txt('Tiền cọc được tính vào lần thanh toán đầu',71,474,{size:22,w:600,a:P(g('k_c1b'),.3)*(1-P(t7-.2,.2))});
 pbox(1,'LẦN THANH TOÁN ĐẦU',g('k_c2')-.1,a=>{txt('≤ 30%',125,128,{size:64,col:RED,align:'center',a:P(g('k_c2a')-.1,.2)});txt('giá trị hợp đồng',125,162,{size:20,w:600,align:'center',a:P(g('k_c2a')+.2,.2)});txt('đã gồm tiền cọc',125,196,{size:18,w:600,col:GREY,align:'center',a:P(g('k_c2b'),.2)})});
 parrow(1,g('k_c3')-.4);
 pbox(2,'TRƯỚC KHI BÀN GIAO',g('k_c3')-.1,a=>{txt('≤ 70%',125,128,{size:64,col:RED,align:'center',a:P(g('k_c3a')-.1,.2)});txt('giá trị hợp đồng',125,162,{size:20,w:600,align:'center',a:P(g('k_c3a')+.2,.2)})});
 parrow(2,g('k_c4')-.4);
 pbox(3,'TRƯỚC KHI CÓ SỔ',g('k_c4')-.1,a=>{txt('≤ 95%',125,128,{size:64,col:RED,align:'center',a:P(g('k_c4a')-.1,.2)});txt('giá trị hợp đồng',125,162,{size:20,w:600,align:'center',a:P(g('k_c4a')+.2,.2)})});
 box(569,522,640,78,gT,{col:GREEN,lw:5},a=>{check(26,20,40,gT+.3,.22);txt('5% còn lại: trả sau khi được cấp sổ',92,50,{size:29,col:GREEN})});
 const t6=g('k_c5');box(71,522,470,78,t6,{col:GREY,lw:3},a=>{txt('Các mốc này giữ từ Luật năm 2023',235,33,{size:22,align:'center'});txt('Điểm mới: cấm thu tiền “giữ chỗ”',235,63,{size:21,col:RED,align:'center',a:P(t6+1.2,.25)})});
 source(SRC3,1)}
function sH(t){const t0=g('s8');title(null,'VÍ DỤ: CĂN NHÀ GIÁ 2 TỶ ĐỒNG',t0,{sub:'Ví dụ minh họa, giả sử giá bán và giá trị hợp đồng đều là 2 tỷ đồng'});
 stamp('VÍ DỤ',1120,120,P(t0+.4,.4),{size:30,rot:.06});
 payBar(t,g('k_v0'),[[g('k_v1a'),.05,'100 triệu'],[g('k_v2a'),.30,'600 triệu'],[g('k_v3a'),.70,'1,4 tỷ'],[g('k_v4a'),.95,'1,9 tỷ']],g('k_v5'));
 const amt=(s,tk,pct,extra,te)=>a=>{txt('tối đa',125,80,{size:18,w:600,col:GREY,align:'center'});txt(s,125,134,{size:42,col:RED,align:'center',a:P(tk-.1,.2)});txt(pct+' của 2 tỷ đồng',125,170,{size:19,w:600,align:'center',a:P(tk+.3,.2)});if(extra)txt(extra,125,202,{size:18,w:600,col:GREY,align:'center',a:P(te,.2)})};
 pbox(0,'ĐẶT CỌC',g('k_v1')-.1,amt('100 triệu',g('k_v1a'),'5%'));parrow(0,g('k_v2')-.4);
 pbox(1,'LẦN THANH TOÁN ĐẦU',g('k_v2')-.1,amt('600 triệu',g('k_v2a'),'30%','đã gồm cọc',g('k_v2b')));parrow(1,g('k_v3')-.4);
 pbox(2,'TRƯỚC KHI BÀN GIAO',g('k_v3')-.1,amt('1,4 tỷ',g('k_v3a'),'70%'));parrow(2,g('k_v4')-.4);
 pbox(3,'TRƯỚC KHI CÓ SỔ',g('k_v4')-.1,amt('1,9 tỷ',g('k_v4a'),'95%'));
 const t5=g('k_v5');box(569,522,640,78,t5,{col:GREEN,lw:5},a=>{check(26,20,40,t5+.3,.22);txt('100 triệu cuối: trả khi được cấp sổ',92,50,{size:29,col:GREEN})});
 source('Ví dụ tự tính từ các mức 5%, 30%, 70%, 95%. '+SRC3,1)}
// ---- ai bị ảnh hưởng ----
function sI(t){const t0=g('s9');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 const y=186,h=320,it=[[g('k_w1')-.5,'keys','Người mua','nhà trên giấy'],[g('k_w2')-.1,'site','Chủ đầu tư','dự án'],[g('k_w3')-.1,'contract','Sàn giao dịch,','môi giới']];
 it.forEach(([ti,ph,a1,a2],i)=>{box(50+i*418,y,350,h,ti,i===0?{lw:6}:{},a=>{photo(ph,14,14,322,170);txt(a1,175,236,{size:30,align:'center'});txt(a2,175,278,{size:30,align:'center'})})});
 source(SRC2,1)}
// ---- bạn nên làm gì ----
function sJ(t){const t0=g('s10');const s='BẠN NÊN LÀM GÌ?',m=tw(s,48);txt(s,640,122,{size:48,col:GREEN,align:'center',a:P(t0,.2)});underline(640-m/2,136,m,t0+.25,.35,{col:GREEN});
 const it=[[g('k_e1'),g('k_e1b'),'Không chuyển tiền “giữ chỗ”','khi dự án chưa đủ điều kiện kinh doanh'],[g('s11'),g('k_e2b'),'Yêu cầu xem giấy tờ chứng minh','dự án đã đủ điều kiện bán'],[g('s12'),g('k_e3b'),'Đối chiếu từng đợt thanh toán','với các mốc trong luật'],[g('s13'),g('k_e4b'),'Giữ lại 5% cuối','cho tới khi được cấp sổ']];
 it.forEach(([ti,tj,a1,a2],i)=>{const y=168+i*108;box(170,y,940,96,ti,{col:GREEN},a=>{check(36,24,48,ti+.25,.25);badge(i+1,-2,48,ti+.1,19,GREEN);txt(a1,130,40,{size:27});txt(a2,130,74,{size:27,a:P(tj,.2)})})});
 source('Gợi ý chung, không thay cho tư vấn pháp lý.',1)}
function sK(t){const t0=g('out');box(240,140,800,380,t0,{lw:6},a=>{txt('LƯU Ý',400,70,{size:30,col:RED,align:'center',ls:4});
 txt('Nội dung chỉ mang tính thông tin,',400,138,{size:36,w:600,f:'LoraV',align:'center'});txt('không phải tư vấn pháp lý.',400,186,{size:36,w:600,f:'LoraV',align:'center'});
 txt('Luật Kinh doanh bất động sản (sửa đổi) · thông qua 21/11/2026 · hiệu lực 01/7/2027',400,250,{size:18,w:600,align:'center'});txt('Số hiệu luật: chờ công bố chính thức',400,280,{size:19,w:600,col:GREY,align:'center'});
 txt('Kiểm tra văn bản gốc: vbpl.vn · thuvienphapluat.vn',400,330,{size:22,w:600,col:BLUE,align:'center',a:P(g('k_src'),.3)})});
 source(SRC1+'  ·  Ảnh minh họa: Unsplash',1)}
defineEpisode({header:'Luật Kinh doanh bất động sản (sửa đổi)  ·  thông qua 21/11/2026  ·  hiệu lực 01/7/2027',
 images:{site:'img/site.jpg',keys:'img/keys.jpg',contract:'img/contract.jpg',scaffold:'img/scaffold.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sB],[()=>g('s2')-.15,sC],[()=>g('s3')-.15,sD],[()=>g('s4')-.15,sE],[()=>g('s5')-.15,sF],[()=>g('s6')-.15,sG],[()=>g('s8')-.15,sH],[()=>g('s9')-.15,sI],[()=>g('s10')-.15,sJ],[()=>g('out')-.15,sK]]});
