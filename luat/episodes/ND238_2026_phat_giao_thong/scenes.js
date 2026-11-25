// Tập: Nghị định 238/2026/NĐ-CP (sửa đổi Nghị định 168/2024) về xử phạt vi phạm giao thông đường bộ.
// Giọng nghiêm túc, trung lập (chủ kênh chốt 25/11/2026): văn bản gì, thay đổi gì, ảnh hưởng ai, từ khi nào, nên làm gì.
// Mỗi cảnh là một "slide sơ đồ": ô viền đỏ nối nhau bằng mũi tên bút dạ. Chỉ dùng dữ kiện mức "đã xác minh" trong luat/research/2026-11_phat_giao_thong.md.
const SRC_A='Nguồn: Nghị định 238/2026/NĐ-CP; VnExpress, Thanh Niên, Dân trí (8/2026)';
const SRC_B='Nguồn: Nghị định 238/2026/NĐ-CP; Thanh Niên, VnExpress, Tiền Phong (8/2026)';
const SRC_C='Nguồn: Nghị định 238/2026/NĐ-CP; Báo Chính phủ, Tuổi Trẻ, Dân trí (6–8/2026)';
const SRC_M='Nguồn: Cổng TTĐT Chính phủ, Cổng TTĐT Bộ Công an, Công báo (Nghị định 238/2026/NĐ-CP)';
// 12 chấm điểm giấy phép lái xe: "lost" chấm cuối bị gạch lúc t0
function dots(cx,cy,lost,t0){for(let i=0;i<12;i++){const px=cx+(i%6-2.5)*40,py=cy+Math.floor(i/6)*40,isLost=i>=12-lost,p=isLost?P(t0+.25+(i-(12-lost))*.07,.25):0,a=P(t0,.2);if(a<=0)continue;
  x.save();x.globalAlpha*=a;x.beginPath();x.arc(px,py,14,0,6.2832);x.fillStyle=p>0?'#d2c9b8':YEL;x.fill();x.strokeStyle=INK;x.lineWidth=2;x.stroke();
  if(p>0){x.strokeStyle=RED;x.lineWidth=4;x.lineCap='round';x.beginPath();x.moveTo(px-8,py-8);x.lineTo(px-8+16*p,py-8+16*p);x.stroke()}x.restore()}}
function strikeLine(px,py,w,t0){sketch([seg(px-6,py+2,px+w+6,py-4,7)],t0,.25,{col:RED,lw:5})}
function sA(t){ // mở đầu: từ khi nào, ảnh hưởng ai, mức cao nhất
 photoCard('cam',80,170,380,390,.15,{rot:-.035});
 stamp('TỪ 15/8/2026',1060,128,P(1.5,.4),{size:30,rot:.05});
 txt('Phạt giao thông:',520,230,{size:58,a:P(.5,.25)});txt('thêm lỗi mới với ô tô',520,302,{size:58,a:P(g('k_lai'),.25)});
 underline(520,320,tw('thêm lỗi mới với ô tô',58),g('k_them'),.4);
 txt('Áp dụng với người điều khiển ô tô',520,372,{size:27,w:600,f:'LoraV',a:P(g('k_them')+.6,.3)});
 box(520,400,640,164,g('k_cao'),{lw:6},a=>{txt('MỨC CAO NHẤT TRONG CÁC LỖI MỚI',34,48,{size:21,col:GREY,ls:2});txt('26 TRIỆU ĐỒNG',34,130,{size:64,col:RED,a:P(g('k_26')-.25,.2)})});
 source(SRC_A,P(1,.4))}
function sM(t){const t0=g('op2'),tb=g('k_ba'),ts=g('k_sua');
 box(360,92,560,92,t0+.1,{lw:6},a=>{txt('NGHỊ ĐỊNH 238/2026/NĐ-CP',280,60,{size:34,align:'center'})});
 box(950,106,290,64,t0+1.0,{lw:3},a=>{txt('Ban hành 26/6/2026',145,41,{size:20,align:'center'})});
 box(40,106,290,64,ts,{lw:3},a=>{txt('Sửa đổi Nghị định 168/2024',145,41,{size:19,align:'center'})});
 const bx=[60,465,870],lab=[['Làm camera khó','nhận diện biển số'],['Chuyển làn','trên cao tốc'],['Chở trẻ em','trên ô tô']],ph=['plate','highway','seat'],tc=[t0+2.2,ts+1.4,ts+2.6];
 for(let i=0;i<3;i++){const ti=tc[i];arrow(640+(i-1)*150,188,bx[i]+175,258,ti,.2);
  box(bx[i],264,350,214,ti+.18,{},a=>{photo(ph[i],12,12,326,92);badge(i+1,38,140,ti+.25,20);txt(lab[i][0],68,148,{size:24});txt(lab[i][1],68,182,{size:24})})}
 const te=tb+.35;arrow(640,482,640,502,te,.15);box(390,508,500,80,te+.12,{col:GREEN,lw:5},a=>{txt('BẠN NÊN LÀM GÌ?',250,53,{size:32,col:GREEN,align:'center'})});
 source(SRC_M,1)}
function sS1(t){const t0=g('s1');title(1,'LÀM CAMERA KHÓ NHẬN DIỆN BIỂN SỐ',t0,{sub:'Hành vi mới được bổ sung · mức dưới đây áp dụng với ô tô'});
 const y=186,h=330;
 box(50,y,350,h,g('k_a1')-.15,{},a=>{photo('plate',14,14,322,140);txt('HÀNH VI',175,192,{size:21,col:GREY,align:'center',ls:2});txt('Dùng vật liệu, thiết bị',175,232,{size:25,align:'center',a:P(g('k_a1')+.2,.2)});
  txt('làm camera khó',175,268,{size:25,align:'center',a:P(g('k_a1b'),.2)});txt('nhận diện biển số',175,302,{size:25,align:'center',a:P(g('k_a1b')+.6,.2)})});
 arrow(408,y+h/2,460,y+h/2,g('k_a2'),.2);
 box(468,y,350,h,g('k_a2')+.2,{},a=>{txt('Ô TÔ · PHẠT TIỀN',175,58,{size:21,col:GREY,align:'center',ls:1});txt('20 – 26',175,184,{size:74,col:RED,align:'center',a:P(g('k_a3')+.2,.2)});txt('triệu đồng',175,252,{size:38,align:'center',a:P(g('k_a3')+.5,.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_a4')-.3,.2);
 box(886,y,350,h,g('k_a4'),{lw:6},a=>{txt('TRỪ ĐIỂM GIẤY PHÉP LÁI XE',175,58,{size:19,col:GREY,align:'center',ls:1});txt('−6 điểm',175,150,{size:70,col:RED,align:'center'});dots(175,196,6,g('k_a4')+.3);txt('Mỗi giấy phép lái xe có 12 điểm',175,292,{size:19,w:600,col:GREY,align:'center',a:P(g('k_a4')+.6,.3)})});
 source(SRC_A,1)}
function sS2(t){const t0=g('s2');title(2,'CHUYỂN LÀN TRÊN CAO TỐC',t0,{sub:'Không bảo đảm khoảng cách an toàn với xe phía trước, phía sau, bên cạnh'});
 const y=186,h=330;
 box(50,y,350,h,g('k_b1')-.15,{},a=>{photo('highway',14,14,322,140);txt('HÀNH VI',175,192,{size:21,col:GREY,align:'center',ls:2});txt('Chuyển làn khi chưa',175,232,{size:25,align:'center',a:P(g('k_b1')+.3,.2)});txt('bảo đảm khoảng cách',175,268,{size:25,align:'center',a:P(g('k_b1b'),.2)});txt('an toàn với xe khác',175,302,{size:25,align:'center',a:P(g('k_b1b')+.9,.2)})});
 arrow(408,y+h/2,460,y+h/2,g('k_b2')-.3,.2);
 box(468,y,350,h,g('k_b2')-.05,{},a=>{txt('PHẠT TIỀN',175,58,{size:21,col:GREY,align:'center',ls:1});txt('4 – 6',175,190,{size:100,col:RED,align:'center'});txt('triệu đồng',175,252,{size:38,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_b3')-.3,.2);
 box(886,y,350,h,g('k_b3'),{lw:6},a=>{txt('TRỪ ĐIỂM GIẤY PHÉP LÁI XE',175,58,{size:19,col:GREY,align:'center',ls:1});txt('−2 điểm',175,150,{size:70,col:RED,align:'center'});dots(175,196,2,g('k_b3')+.3);txt('Mỗi giấy phép lái xe có 12 điểm',175,292,{size:19,w:600,col:GREY,align:'center',a:P(g('k_b3')+.6,.3)})});
 source(SRC_B,1)}
function row(y,lab,t0,fn,o={}){arrow(328,345,392,y+70,t0-.05,.2);box(400,y,830,140,t0+.13,o,a=>{txt(lab,28,38,{size:19,col:GREY,ls:2});fn(a)})}
function sS3(t){const t0=g('s3');title(3,'CHỞ TRẺ EM TRÊN Ô TÔ',t0,{sub:'Trẻ dưới 10 tuổi và cao dưới 1,35 m (trừ xe kinh doanh vận tải hành khách)'});
 box(50,200,270,290,t0+.35,{lw:6},a=>{photo('seat',14,14,242,160);txt('Dưới 10 tuổi',135,216,{size:26,align:'center',a:P(g('k_c0a'),.2)});txt('cao dưới 1,35 m',135,254,{size:26,align:'center',a:P(g('k_c0b'),.2)})});
 row(196,'KHÔNG CÓ THIẾT BỊ AN TOÀN PHÙ HỢP',g('k_c2'),a=>{txt('Phạt cảnh cáo',28,104,{size:52,col:RED,a:P(g('k_c3'),.2)});
  const s1='Trước 15/8/2026:',s2='800.000 – 1.000.000 đồng';txt(s1,450,76,{size:19,w:600,col:GREY,a:P(g('k_c3b'),.25)});txt(s2,450,108,{size:22,col:GREY,a:P(g('k_c3b'),.25)});strikeLine(450,101,tw(s2,22),g('k_c3b')+.5)});
 row(356,'CHO TRẺ NGỒI CÙNG HÀNG GHẾ VỚI NGƯỜI LÁI',g('s4')+.1,a=>{txt('800.000 – 1.000.000 đồng',28,96,{size:44,col:RED,a:P(g('k_c6')-.1,.2)});txt('(trừ xe chỉ có một hàng ghế)',28,126,{size:18,w:600,col:GREY,a:P(g('k_c4b'),.25)});
  txt('Mức phạt giữ nguyên',802,38,{size:19,w:600,col:RED,align:'right',a:P(g('k_c5'),.25)})},{lw:6});
 source(SRC_C,1)}
function sS4(t){const t0=g('s5');title(null,'NỒNG ĐỘ CỒN, VƯỢT ĐÈN ĐỎ',t0,{hand:false});
 photoCard('beer',150,172,430,270,t0+.15,{rot:-.02});txt('Nồng độ cồn',365,498,{size:32,align:'center',a:P(t0+.3,.25)});
 photoCard('redlight',700,172,430,270,t0+.4,{rot:.02});txt('Vượt đèn đỏ',915,498,{size:32,align:'center',a:P(t0+.55,.25)});
 stamp('KHÔNG ĐỔI',365,310,P(g('k_d1')-.5,.4),{size:52,rot:-.1});stamp('KHÔNG ĐỔI',915,310,P(g('k_d1')-.3,.4),{size:52,rot:.08});
 txt('Nghị định 238 không thay đổi mức phạt với hai lỗi này.',640,560,{size:26,w:600,f:'LoraV',align:'center',a:P(g('k_d1'),.3)});
 source('Nguồn: Cục Cảnh sát giao thông (qua báo chí); Thư viện Pháp luật',1)}
function sE(t){const t0=g('s6');const m=tw('BẠN NÊN LÀM GÌ?',46);txt('BẠN NÊN LÀM GÌ?',640,112,{size:46,col:GREEN,align:'center',a:P(t0,.2)});underline(640-m/2,126,m,t0+.25,.35,{col:GREEN});
 // mỗi mục: [lúc hiện ô, [[lúc hiện, chữ]...] dòng 1, [lúc hiện, chữ] dòng 2]
 const it=[[g('k_e1'),[[g('k_e1'),'Giữ biển số '],[g('k_e1a'),'sạch và rõ:']],[g('k_e1b'),'không che, không dán']],
  [g('s7'),[[g('s7'),'Trên cao tốc: '],[g('k_e2a'),'bật xi nhan, quan sát gương,']],[g('k_e2b'),'đủ khoảng cách rồi mới chuyển làn']],
  [g('s8'),[[g('s8'),'Trẻ nhỏ ngồi '],[g('k_e3a'),'hàng ghế sau,']],[g('k_e3b'),'với ghế an toàn phù hợp']],
  [g('s9'),[[g('s9'),'Tra cứu phạt nguội '],[g('k_e4a'),'trên trang chính thức']],[g('k_e4b'),'của Cục CSGT: csgt.vn · ứng dụng VNeTraffic']]];
 it.forEach(([ti,l1,l2],i)=>{const y=150+i*110;box(170,y,940,98,ti,{col:GREEN},a=>{check(34,26,46,ti+.25,.25);let px=120;l1.forEach(([tt,s])=>{txt(s,px,42,{size:26,a:P(tt,.2)});px+=tw(s,26)});txt(l2[1],120,78,{size:26,a:P(l2[0],.2)})})});
 source('Gợi ý chung, không thay cho tư vấn pháp lý.',1)}
function sF(t){const t0=g('out');box(240,140,800,380,t0,{lw:6},a=>{txt('LƯU Ý',400,70,{size:30,col:RED,align:'center',ls:4});
 txt('Nội dung chỉ mang tính thông tin,',400,138,{size:36,w:600,f:'LoraV',align:'center'});txt('không phải tư vấn pháp lý.',400,186,{size:36,w:600,f:'LoraV',align:'center'});
 txt('Nghị định 238/2026/NĐ-CP · ban hành 26/6/2026 · hiệu lực 15/8/2026',400,250,{size:19,w:600,align:'center'});txt('Sửa đổi, bổ sung Nghị định 168/2024/NĐ-CP',400,280,{size:19,w:600,col:GREY,align:'center'});
 txt('Kiểm tra văn bản gốc: congbao.chinhphu.vn · thuvienphapluat.vn',400,330,{size:22,w:600,col:BLUE,align:'center',a:P(g('k_src'),.3)})});
 source(SRC_M+'  ·  Ảnh minh họa: Unsplash',1)}
defineEpisode({header:'Nghị định 238/2026/NĐ-CP  ·  ban hành 26/6/2026  ·  hiệu lực 15/8/2026',
 images:{cam:'img/cam.jpg',plate:'img/plate.jpg',highway:'img/highway.jpg',seat:'img/seat.jpg',beer:'img/beer.jpg',redlight:'img/redlight.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sS1],[()=>g('s2')-.15,sS2],[()=>g('s3')-.15,sS3],[()=>g('s5')-.15,sS4],[()=>g('s6')-.15,sE],[()=>g('out')-.15,sF]]});
