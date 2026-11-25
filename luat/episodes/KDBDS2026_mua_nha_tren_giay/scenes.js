// Tập: Luật Kinh doanh bất động sản (sửa đổi) 2026, góc "mua nhà trên giấy". Slide sơ đồ: ô viền đỏ nối nhau bằng mũi tên bút dạ.
const SRC1='Nguồn: LuatVietnam, Báo Xây dựng, Đại biểu Nhân dân, TTXVN (21/11/2026)';
const SRC2='Nguồn: VnExpress, Thanh Niên, Znews (21/11/2026). Chờ đối chiếu văn bản chính thức.';
const SRC3='Nguồn: VOV, VTV, Báo Chính phủ, Tiền Phong (11/2026). Chờ đối chiếu văn bản chính thức.';
function sA(t){
 photoCard('site',70,168,410,390,.15,{rot:-.03});
 stamp('TỪ 01/7/2027',1060,128,P(.5,.4),{size:30,rot:.05});
 txt('Tiền “giữ chỗ”',540,258,{size:60,a:P(1.2,.25)});txt('mua nhà trên giấy',540,330,{size:60,a:P(1.7,.25)});
 underline(540,348,tw('mua nhà trên giấy',60),2.1,.4);
 box(540,388,640,188,g('k_a1')-.05,{lw:6},a=>{txt('CHỦ ĐẦU TƯ',34,46,{size:21,col:GREY,ls:3});txt('KHÔNG ĐƯỢC THU',30,108,{size:58,col:RED,a:P(g('k_a2'),.2)});
  underline(30,119,tw('KHÔNG ĐƯỢC THU',58),g('k_a3')+1.2,.35);
  txt('khi bất động sản chưa đủ điều kiện kinh doanh',34,166,{size:22,w:600,a:P(g('k_a3'),.25)})});
 source(SRC2,P(1,.4))}
function sM(t){const t0=g('op2');
 box(230,92,820,92,t0+.1,{lw:6},a=>{txt('LUẬT KINH DOANH BẤT ĐỘNG SẢN (SỬA ĐỔI)',410,60,{size:33,align:'center'})});
 const bx=[60,465,870],lab=[['Khi nào','áp dụng?'],['Cấm thu tiền','“giữ chỗ”'],['Trả tiền','theo từng mốc']],ph=['contract','site','keys'];
 for(let i=0;i<3;i++){const ti=t0+.85+i*.5;arrow(640+(i-1)*150,188,bx[i]+175,258,ti,.2);
  box(bx[i],264,350,214,ti+.18,{},a=>{photo(ph[i],12,12,326,92);badge(i+1,38,140,ti+.25,20);txt(lab[i][0],68,148,{size:24});txt(lab[i][1],68,182,{size:24})})}
 stamp('MUA NHÀ TRÊN GIẤY',200,548,P(g('k_mua'),.4),{size:24,rot:-.06});
 const te=g('k_ba')-.3;arrow(640,482,640,502,te,.15);box(390,508,500,80,te+.12,{col:GREEN,lw:5},a=>{txt('BẠN NÊN LÀM GÌ?',250,53,{size:32,col:GREEN,align:'center'})});
 source(SRC1,1)}
function sB(t){const t0=g('s1');title(1,'KHI NÀO ÁP DỤNG?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_qh')-.1,{},a=>{photo('contract',14,14,322,140);txt('QUỐC HỘI THÔNG QUA',175,196,{size:21,col:GREY,align:'center',ls:1});txt('21/11/2026',175,254,{size:46,align:'center',a:P(g('k_ngay'),.2)});txt('Luật gồm 10 chương, 63 điều',175,296,{size:21,w:600,col:GREY,align:'center',a:P(g('k_ngay')+1.9,.25)})});
 arrow(408,y+h/2,460,y+h/2,g('k_phieu')-.3,.2);
 box(468,y,350,h,g('k_phieu'),{},a=>{txt('PHIẾU TÁN THÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('471',175,196,{size:120,align:'center'});txt('trên 479 đại biểu',175,250,{size:25,w:600,align:'center',a:P(g('k_phieu')+1.1,.2)});txt('tham gia biểu quyết',175,284,{size:25,w:600,align:'center',a:P(g('k_phieu')+1.1,.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.25,.5);txt('01/7/2027',175,270,{size:54,col:RED,align:'center',a:P(g('k_hl')+.45,.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl')+1.3,.3)});
 source(SRC1,1)}
function sC(t){const t0=g('s2');title(2,'CẤM THU TIỀN “GIỮ CHỖ”',t0,{sub:'Áp dụng khi bất động sản chưa đủ điều kiện kinh doanh'});
 const y=186,h=330,tL=g('k_b1')-.45,tM=g('k_b2')-.05,tN=g('k_b4')-.05;
 box(50,y,330,h,tL,{},a=>{photo('site',14,14,302,160);txt('Bất động sản',165,216,{size:26,align:'center'});txt('CHƯA ĐỦ ĐIỀU KIỆN',165,258,{size:27,col:RED,align:'center',a:P(g('k_b1')+.7,.2)});txt('kinh doanh',165,294,{size:26,align:'center',a:P(g('k_b1')+.7,.2)})});
 arrow(388,y+h/2,442,y+h/2,tM-.25,.2);
 box(450,y,380,h,tM,{lw:6},a=>{txt('CHỦ ĐẦU TƯ',190,54,{size:21,col:GREY,align:'center',ls:2});txt('KHÔNG ĐƯỢC',190,128,{size:50,col:RED,align:'center'});txt('THU TIỀN',190,188,{size:50,col:RED,align:'center'});
  txt('của người mua',190,236,{size:25,w:600,align:'center',a:P(g('k_b2b'),.2)});txt('dưới bất kỳ hình thức nào',190,282,{size:23,w:600,align:'center',a:P(g('k_b3'),.2)})});
 arrow(838,y+h/2,892,y+h/2,tN-.25,.2);
 box(900,y,330,h,tN,{},a=>{txt('ĐIỂM MỚI',165,96,{size:46,col:RED,align:'center'});txt('so với luật hiện hành',165,150,{size:24,w:600,align:'center'});txt('(Luật Kinh doanh',165,214,{size:20,w:600,col:GREY,align:'center'});txt('bất động sản năm 2023)',165,242,{size:20,w:600,col:GREY,align:'center'})});
 source(SRC2,1)}
const BX=71,BW=1138,BY=446,BH=32;
function payBox(i,lab,big,t0,tBig,extra){const px=71+i*296;box(px,184,250,230,t0,{},a=>{txt(lab,125,42,{size:17,col:GREY,align:'center',ls:.5});txt(big,125,128,{size:64,col:RED,align:'center',a:P(tBig-.1,.2)});extra&&extra(a)});
 if(i<3)arrow(px+256,299,px+290,299,t0+.35,.15,{head:11})}
function sD(t){const t0=g('s3');title(3,'TRẢ TIỀN THEO TỪNG MỐC',t0,{sub:'Mua nhà ở hình thành trong tương lai (“nhà trên giấy”)'});
 // thanh tiến độ thanh toán
 const pb=P(t0+.8,.3);if(pb>0){x.save();x.globalAlpha*=pb;x.fillStyle='#e2d8c2';rr(BX,BY,BW,BH,16);x.fill();
  const st=[[g('k_c1a'),.05],[g('k_c2a'),.30],[g('k_c3a'),.70],[g('k_c4a'),.95]];let f=0,pv=0;for(const[tk,v]of st){f+=(v-pv)*ease((t-tk)/.5);pv=v}
  if(f>0){x.save();rr(BX,BY,BW,BH,16);x.clip();x.fillStyle=RED;x.fillRect(BX,BY,BW*f,BH);const pg=P(g('s5')+.1,.4);if(pg>0){x.globalAlpha*=pg;x.fillStyle=GREEN;x.fillRect(BX+BW*.95,BY,BW*.05,BH)}x.restore()}
  x.strokeStyle=INK;x.lineWidth=2.5;rr(BX,BY,BW,BH,16);x.stroke();
  for(const[tk,v]of st){txt(Math.round(v*100)+'%',BX+BW*v,BY+BH+26,{size:20,col:INK,align:v>.9?'right':'center',a:P(tk,.2)})}
  txt('Đã trả',BX,BY-10,{size:16,w:600,col:GREY});x.restore()}
 payBox(0,'ĐẶT CỌC','≤ 5%',g('k_c1')-.1,g('k_c1a'),a=>{txt('giá bán',125,162,{size:20,w:600,align:'center',a:P(g('k_c1a')+.3,.2)});txt('chỉ khi nhà đã đủ',125,192,{size:17,w:600,col:GREY,align:'center',a:P(g('k_c1b'),.2)});txt('điều kiện kinh doanh',125,214,{size:17,w:600,col:GREY,align:'center',a:P(g('k_c1b')+1.2,.2)})});
 payBox(1,'LẦN THANH TOÁN ĐẦU','≤ 30%',g('k_c2')-.1,g('k_c2a'),a=>{txt('giá trị hợp đồng',125,162,{size:20,w:600,align:'center',a:P(g('k_c2a')+.2,.2)});txt('đã gồm tiền cọc',125,196,{size:18,w:600,col:GREY,align:'center',a:P(g('k_c2b'),.2)})});
 payBox(2,'TRƯỚC KHI BÀN GIAO','≤ 70%',g('k_c3')-.1,g('k_c3a'),a=>{txt('giá trị hợp đồng',125,162,{size:20,w:600,align:'center',a:P(g('k_c3a')+.2,.2)})});
 payBox(3,'TRƯỚC KHI CÓ SỔ','≤ 95%',g('k_c4')-.1,g('k_c4a'),a=>{txt('giá trị hợp đồng',125,162,{size:20,w:600,align:'center',a:P(g('k_c4a')+.2,.2)})});
 const t5=g('s5'),t6=g('k_c5b');
 box(569,522,640,78,g('k_c5a')-.3,{col:GREEN,lw:5},a=>{check(26,20,40,g('k_c5a'),.22);txt('5% còn lại: trả sau khi được cấp sổ',92,50,{size:29,col:GREEN})});
 box(71,522,470,78,t6,{col:GREY,lw:3},a=>{txt('Các mốc này giữ từ Luật năm 2023',235,33,{size:22,align:'center'});txt('Điểm mới: cấm thu tiền “giữ chỗ”',235,63,{size:21,col:RED,align:'center',a:P(t6+1.5,.25)})});
 source(SRC3,1)}
function sE(t){const t0=g('s6');const m=tw('BẠN NÊN LÀM GÌ?',48);txt('BẠN NÊN LÀM GÌ?',640,122,{size:48,col:GREEN,align:'center',a:P(t0,.2)});underline(640-m/2,136,m,t0+.25,.35,{col:GREEN});
 const it=[[g('k_e1'),g('k_e1b'),'Không chuyển tiền “giữ chỗ”','khi dự án chưa đủ điều kiện kinh doanh'],[g('s7'),g('k_e2b'),'Yêu cầu xem giấy tờ chứng minh','dự án đã đủ điều kiện bán'],[g('s8'),g('k_e3b'),'Đặt cọc không quá 5%,','giữ lại 5% cuối ']];
 it.forEach(([ti,tj,a1,a2],i)=>{const y=172+i*138;box(170,y,940,122,ti,{col:GREEN},a=>{check(36,36,54,ti+.25,.25);txt(a1,130,54,{size:30});txt(a2,130,94,{size:30,a:P(tj,.2)});
  if(i===2)txt('tới khi được cấp sổ',130+tw(a2,30),94,{size:30,a:P(g('k_e3c'),.2)})})});
 source('Gợi ý chung, không thay cho tư vấn pháp lý.',1)}
function sF(t){const t0=g('out');box(240,140,800,380,t0,{lw:6},a=>{txt('LƯU Ý',400,70,{size:30,col:RED,align:'center',ls:4});
 txt('Nội dung chỉ mang tính thông tin,',400,138,{size:36,w:600,f:'LoraV',align:'center'});txt('không phải tư vấn pháp lý.',400,186,{size:36,w:600,f:'LoraV',align:'center'});
 txt('Luật Kinh doanh bất động sản (sửa đổi) · thông qua 21/11/2026 · hiệu lực 01/7/2027',400,250,{size:18,w:600,align:'center'});txt('Số hiệu luật: chờ công bố chính thức',400,280,{size:19,w:600,col:GREY,align:'center'});
 txt('Kiểm tra văn bản gốc: vbpl.vn · thuvienphapluat.vn',400,330,{size:22,w:600,col:BLUE,align:'center',a:P(g('k_src'),.3)})});
 source(SRC1+'  ·  Ảnh minh họa: Unsplash',1)}
defineEpisode({header:'Luật Kinh doanh bất động sản (sửa đổi)  ·  thông qua 21/11/2026  ·  hiệu lực 01/7/2027',
 images:{site:'img/site.jpg',keys:'img/keys.jpg',contract:'img/contract.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sB],[()=>g('s2')-.15,sC],[()=>g('s3')-.15,sD],[()=>g('s6')-.15,sE],[()=>g('out')-.15,sF]]});
