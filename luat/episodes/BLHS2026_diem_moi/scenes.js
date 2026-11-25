// Tập: Bộ luật Hình sự (sửa đổi) 2026. Mỗi cảnh là một "slide sơ đồ": các ô viền đỏ nối nhau bằng mũi tên bút dạ.
const SRC1='Nguồn: Báo Nhân Dân, Cổng TTĐT Bộ Công an, Cổng TTĐT Chính phủ (20/11/2026)';
const SRC2='Nguồn: Tuổi Trẻ, VOH (23/11/2026), Tạp chí Luật sư Việt Nam. Chờ đối chiếu văn bản chính thức.';
function sA(t){ // mở đầu: câu đùa "gõ phím 3 giây, đi tù 3 năm", rồi tiêu đề
 photoCard('phone',80,170,380,390,.1,{rot:-.035});bubble(360,96,170,.45,'#@!');
 const t1=g('op1');const gag=1-P(t1-.25,.2);
 if(gag>0){x.save();x.globalAlpha*=gag;
  box(540,150,560,150,g('k_go'),{},a=>{txt('GÕ PHÍM',34,58,{size:26,col:GREY,ls:3});txt('3 giây',34,124,{size:64});txt('nhanh',526,124,{size:34,w:600,f:'LoraV',col:GREY,align:'right'})});
  arrow(820,306,820,350,g('k_ditu')-.2,.18);
  box(540,356,560,170,g('k_ditu'),{lw:7},a=>{txt('ĐI TÙ',34,60,{size:26,col:RED,ls:3});txt('tới 3 năm',34,138,{size:76,col:RED});txt('lâu',526,138,{size:34,w:600,f:'LoraV',col:GREY,align:'right'})});
  x.restore()}
 stamp('TỪ 01/3/2027',1060,128,P(t1,.4),{size:30,rot:.05});
 txt('Lăng mạ, làm nhục',520,250,{size:60,a:P(g('k_lang')-.1,.2)});txt('người khác trên mạng',520,324,{size:60,a:P(g('k_nguoi')-.1,.2)});
 underline(520,342,tw('người khác trên mạng',60),g('k_mang'),.4);
 box(520,388,640,170,g('k_tu')+.1,{lw:6},a=>{txt('CÓ THỂ BỊ PHẠT',34,52,{size:24,col:GREY,ls:3});txt('TÙ TỚI 3 NĂM',30,138,{size:84,col:RED})});
 source(SRC2,P(1,.4))}
function sM(t){const t0=g('op2'),tb=g('k_ba');
 box(360,92,560,92,t0+.1,{lw:6},a=>{txt('BỘ LUẬT HÌNH SỰ (SỬA ĐỔI)',280,60,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Khi nào','áp dụng?'],['Làm nhục người khác:','phạt nặng hơn'],['Tài sản mã hóa:','tội danh mới']],ph=['gavel','phone','coins'];
 for(let i=0;i<3;i++){const ti=t0+.75+i*.4;arrow(640+(i-1)*150,188,bx[i]+175,258,ti,.2);
  box(bx[i],264,350,214,ti+.18,{},a=>{photo(ph[i],12,12,326,92);badge(i+1,38,140,ti+.25,20);txt(lab[i][0],68,148,{size:24});txt(lab[i][1],68,182,{size:24})})}
 const te=tb+.35;arrow(640,482,640,502,te,.15);box(390,508,500,80,te+.12,{col:GREEN,lw:5},a=>{txt('BẠN NÊN LÀM GÌ?',250,53,{size:32,col:GREEN,align:'center'})});
 source(SRC1,1)}
function sB(t){const t0=g('s1');title(1,'KHI NÀO ÁP DỤNG?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_qh')-.1,{},a=>{photo('gavel',14,14,322,140);txt('QUỐC HỘI THÔNG QUA',175,196,{size:21,col:GREY,align:'center',ls:1});txt('20/11/2026',175,254,{size:46,align:'center',a:P(g('k_ngay'),.2)});txt('Bộ luật gồm 417 điều',175,296,{size:21,w:600,col:GREY,align:'center',a:P(g('k_ngay')+.4,.25)})});
 arrow(408,y+h/2,460,y+h/2,g('k_phieu')-.3,.2);
 box(468,y,350,h,g('k_phieu'),{},a=>{txt('PHIẾU TÁN THÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('463',175,196,{size:120,align:'center'});txt('trên 472 đại biểu',175,250,{size:25,w:600,align:'center'});txt('tham gia biểu quyết',175,284,{size:25,w:600,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.25,.5);txt('01/3/2027',175,270,{size:54,col:RED,align:'center',a:P(g('k_hl')+.45,.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl')+.8,.3)});
 source(SRC1,1)}
function row(y,lab,t0,fn,o={}){arrow(328,340,392,y+60,t0-.05,.2);box(400,y,830,120,t0+.13,o,a=>{txt(lab,28,36,{size:19,col:GREY,ls:2});fn(a)})}
function sC(t){const t0=g('s2');title(2,'TỘI LÀM NHỤC NGƯỜI KHÁC',t0,{sub:'Điều 138 Bộ luật mới (hiện nay: Điều 155)'});
 box(50,196,270,290,t0+.45,{lw:6},a=>{photo('phone',14,14,242,160);txt('Làm nhục',135,220,{size:28,align:'center'});txt('người khác',135,256,{size:28,align:'center'})});
 row(184,'KHUNG CƠ BẢN',g('k_c1'),a=>{const w1=tw('Phạt tiền 20–60 triệu đồng',30);txt('Phạt tiền 20–60 triệu đồng',28,80,{size:30,a:P(g('k_c1a'),.2)});txt('hoặc tù 3 tháng – 2 năm',28+w1+16,80,{size:28,col:RED,a:P(g('k_c1b'),.2)});
  txt('Hiện nay: phạt tiền 10–30 triệu đồng, chưa có án tù',28,108,{size:18,w:600,col:GREY,a:P(g('k_c1c'),.25)})});
 row(318,'DÙNG KHÔNG GIAN MẠNG',g('k_c2'),a=>{txt('Tù 1 – 3 năm',28,94,{size:50,col:RED,a:P(g('k_c2a')-.1,.2)});txt('Hiện nay: 3 tháng – 2 năm',400,90,{size:20,w:600,col:GREY,a:P(g('k_c2a')+.4,.25)})},{lw:6});
 row(452,'KHUNG NẶNG NHẤT',g('k_c3'),a=>{txt('Tù 3 – 7 năm',28,94,{size:50,col:RED,a:P(g('k_c3a')-.1,.2)});txt('Hiện nay: 2 – 5 năm',400,90,{size:20,w:600,col:GREY,a:P(g('k_c3a')+.4,.25)});photo('cuffs',680,12,136,96)});
 txt('1 bình luận → mấy năm tù?',185,522,{size:21,w:600,align:'center',a:P(g('k_c4'),.2)});stamp('KHÔNG ĐÁNG!',185,572,P(g('k_c4b'),.35),{size:28,rot:-.07});
 source(SRC2+' Mức hiện nay: Điều 155 Bộ luật Hình sự 2015.',1)}
function sD(t){const t0=g('s4');title(3,'TÀI SẢN MÃ HÓA: TỘI DANH MỚI',t0,{sub:'Điều 190 · lần đầu có tội danh riêng trong Bộ luật Hình sự'});
 const y=186,h=330;
 box(50,y,350,h,t0+.5,{},a=>{photo('coins',14,14,322,140);txt('HÀNH VI',175,196,{size:21,col:GREY,align:'center',ls:2});txt('• Phát hành trái phép',34,244,{size:25,a:P(g('k_d1'),.2)});txt('• Thao túng thị trường',34,288,{size:25,a:P(g('k_d2'),.2)})});
 arrow(408,y+h/2,460,y+h/2,g('k_d3')-.3,.2);
 box(468,y,350,h,g('k_d3')-.05,{},a=>{txt('KHUNG CƠ BẢN',175,54,{size:21,col:GREY,align:'center',ls:2});txt('Phạt tiền',175,106,{size:24,w:600,align:'center'});txt('2 – 5 tỷ đồng',175,168,{size:50,col:RED,align:'center'});
  txt('hoặc tù',175,224,{size:24,w:600,align:'center',a:P(g('k_d4'),.2)});txt('6 tháng – 3 năm',175,276,{size:40,align:'center',a:P(g('k_d4')+.15,.2)})});
 arrow(826,y+h/2,878,y+h/2,g('s5')-.2,.2);
 box(886,y,350,h,g('s5'),{lw:7},a=>{txt('NẶNG NHẤT',175,54,{size:21,col:RED,align:'center',ls:2});txt('Phạt tiền tới',175,106,{size:24,w:600,align:'center'});txt('10 tỷ đồng',175,168,{size:54,col:RED,align:'center',a:P(g('k_d5a')-.15,.2)});
  txt('hoặc tù tới',175,224,{size:24,w:600,align:'center',a:P(g('k_d5b'),.2)});txt('7 năm',175,278,{size:46,align:'center',a:P(g('k_d5b')+.2,.2)})});
 txt('Khung nặng: phạm tội có tổ chức, hoặc thu lợi bất chính từ 2 tỷ đồng trở lên',640,566,{size:18,w:600,col:GREY,align:'center',a:P(g('s5')+.5,.3)});
 source(SRC2,1)}
function sE(t){const t0=g('s6');const m=tw('BẠN NÊN LÀM GÌ?',48);txt('BẠN NÊN LÀM GÌ?',640,122,{size:48,col:GREEN,align:'center',a:P(t0,.2)});underline(640-m/2,136,m,t0+.25,.35,{col:GREEN});
 const it=[[g('k_e1'),'Tức thì tức, nhưng góp ý về sự việc,','không lăng mạ cá nhân'],[g('s7'),'Bị xúc phạm: đừng chửi lại,','lưu bằng chứng, báo cơ quan công an'],[g('s8'),'Tài sản mã hóa: chỉ giao dịch','qua tổ chức được cấp phép']];
 it.forEach(([ti,a1,a2],i)=>{const y=172+i*138;box(170,y,940,122,ti,{col:GREEN},a=>{check(36,36,54,ti+.25,.25);txt(a1,130,54,{size:30});txt(a2,130,94,{size:30})})});
 stamp('LÃI GẤP 10? LƯỚT!',962,172+2*138+64,P(g('k_s8b')+.2,.35),{size:24,rot:-.06});
 source('Gợi ý chung, không thay cho tư vấn pháp lý.',1)}
function sF(t){const t0=g('out');box(240,140,800,380,t0,{lw:6},a=>{txt('LƯU Ý',400,70,{size:30,col:RED,align:'center',ls:4});
 txt('Nội dung chỉ mang tính thông tin,',400,138,{size:36,w:600,f:'LoraV',align:'center'});txt('không phải tư vấn pháp lý.',400,186,{size:36,w:600,f:'LoraV',align:'center'});
 txt('Bộ luật Hình sự (sửa đổi) · thông qua 20/11/2026 · hiệu lực 01/3/2027',400,250,{size:19,w:600,align:'center'});txt('Số hiệu luật: chờ công bố chính thức',400,280,{size:19,w:600,col:GREY,align:'center'});
 txt('Kiểm tra văn bản gốc: vbpl.vn · thuvienphapluat.vn',400,330,{size:22,w:600,col:BLUE,align:'center',a:P(g('k_src'),.3)})});
 source(SRC1+'  ·  Ảnh minh họa: Unsplash',1)}
defineEpisode({header:'Bộ luật Hình sự (sửa đổi)  ·  thông qua 20/11/2026  ·  hiệu lực 01/3/2027',
 images:{phone:'img/phone.jpg',gavel:'img/gavel.jpg',coins:'img/coins.jpg',cuffs:'img/cuffs.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sB],[()=>g('s2')-.15,sC],[()=>g('s4')-.15,sD],[()=>g('s6')-.15,sE],[()=>g('out')-.15,sF]]});
