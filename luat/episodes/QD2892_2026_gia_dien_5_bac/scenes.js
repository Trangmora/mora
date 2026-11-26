// Tập: Giá điện sinh hoạt còn 5 bậc từ 1/11/2026 (Quyết định 2892/QĐ-BCT). Nghiêm túc, một video một vấn đề.
const SRC1='Nguồn: CAND, CafeF, VTC News, Báo Gia Lai (11/2026). Giá chưa gồm thuế GTGT.';
const SRC2='Nguồn: Quyết định 1279/QĐ-BCT (biểu cũ); CafeF, Báo Gia Lai, VTC News, LuatVietnam (biểu mới). Giá chưa gồm thuế GTGT.';
function sA(t){
 photoCard('meters',70,170,400,380,.1,{rot:-.035});
 stamp('TỪ 01/11/2026',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Giá điện sinh hoạt',530,222,{size:50,a:P(.5,.2)});
 txt('6 bậc → 5 bậc',530,296,{size:62,col:RED,a:P(g('k_rut'),.2)});
 underline(530,314,tw('6 bậc → 5 bậc',62),g('k_rut')+.4,.4);
 box(530,362,310,190,g('k_thap'),{lw:5},a=>{txt('BẬC THẤP NHẤT',24,46,{size:20,col:GREY,ls:2});txt('1.984',24,104,{size:28,col:GREY});arrow(112,95,140,95,g('k_thap')+.3,.15,{head:9,lw:4});txt('1.901',152,104,{size:40});txt('GIẢM',24,160,{size:30,col:GREEN})});
 box(860,362,310,190,g('k_cao'),{lw:5},a=>{txt('BẬC CAO NHẤT',24,46,{size:20,col:GREY,ls:2});txt('3.460',24,104,{size:28,col:GREY});arrow(112,95,140,95,g('k_cao')+.3,.15,{head:9,lw:4});txt('3.844',152,104,{size:40,col:RED});txt('TĂNG',24,160,{size:30,col:RED})});
 source(SRC1+' Đơn vị: đồng/kWh.',P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('GIÁ ĐIỆN SINH HOẠT 5 BẬC',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Biểu giá mới','thế nào?'],['Nhà bạn trả','ít hay nhiều hơn?'],['Bạn nên','làm gì?']],ph=['meter','calc','pylon'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_qd')-.1,{lw:6},a=>{txt('QUYẾT ĐỊNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('2892',175,160,{size:80,col:RED,align:'center'});txt('/QĐ-BCT',175,214,{size:36,align:'center'});txt('Bộ Công Thương',175,272,{size:24,w:600,col:GREY,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_bh')-.3,.2);
 box(468,y,350,h,g('k_bh'),{},a=>{photo('pylon',14,14,322,130);txt('NGÀY BAN HÀNH',175,184,{size:21,col:GREY,align:'center',ls:1});txt('31/10/2026',175,246,{size:46,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('ÁP DỤNG TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/11/2026',175,270,{size:50,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 txt('Cơ cấu biểu giá 5 bậc theo Quyết định 14/2025/QĐ-TTg',640,560,{size:20,w:600,col:GREY,align:'center',a:P(g('k_hl')+1,.3)});
 source(SRC1,1)}
function sB(t){const t0=g('s2');title(null,'GIÁ BẬC THANG LÀ GÌ?',t0);
 const hs=[70,110,150,190,230];
 for(let i=0;i<5;i++){const ti=t0+.5+i*.35;box(90+i*130,470-hs[i],118,hs[i],ti,{fill:i==4?'#f6d6d0':CARD},a=>{txt('Bậc '+(i+1),59,32,{size:22,align:'center'})})}
 arrow(90,510,760,510,t0+2.3,.4);txt('Điện năng dùng trong tháng',425,548,{size:22,w:600,col:GREY,align:'center',a:P(t0+2.4,.3)});
 box(820,190,400,140,g('k_b1')-.1,{lw:6},a=>{txt('Mỗi bậc chỉ tính',30,58,{size:30});txt('cho phần điện năng trong bậc đó',30,100,{size:20,w:600})});
 box(820,350,400,140,g('k_b2'),{},a=>{txt('Dùng càng nhiều,',30,58,{size:30});txt('phần dùng thêm càng đắt',30,100,{size:26,col:RED})});
 source('Minh họa nguyên tắc tính giá bậc thang (không theo tỷ lệ).',1)}
const OLD=[['1','0 – 50','1.984'],['2','51 – 100','2.050'],['3','101 – 200','2.380'],['4','201 – 300','2.998'],['5','301 – 400','3.350'],['6','từ 401','3.460']];
const NEW=[['1','0 – 100','1.901','k_n1'],['2','101 – 200','2.289','k_n2'],['3','201 – 400','2.894','k_n3'],['4','401 – 700','3.456','k_n4'],['5','từ 701','3.844','k_n5']];
function sT(t){const t0=g('s3');title(null,'BIỂU CŨ VÀ BIỂU MỚI',t0,{sub:'Đồng/kWh, chưa gồm thuế GTGT'});
 box(60,186,520,410,g('k_c0')+.2,{col:GREY},a=>{txt('BIỂU CŨ · 6 BẬC',30,46,{size:22,col:GREY,ls:2});txt('Quyết định 1279/QĐ-BCT',30,74,{size:18,w:600,col:GREY});
  OLD.forEach((r,i)=>{const y=126+i*48,hi=(i==0&&NOW>=g('k_c1'))||(i==5&&NOW>=g('k_c6'));const al=P(g('k_c1')-.2+i*.15,.2);
   txt('Bậc '+r[0],30,y,{size:26,a:al,col:hi?RED:INK});txt(r[1]+' kWh',150,y,{size:24,w:600,a:al});txt(r[2],470,y,{size:28,align:'right',a:al,col:hi?RED:INK})})});
 arrow(590,390,652,390,g('k_n0')-.3,.22);
 box(660,186,560,410,g('k_n0'),{lw:7},a=>{txt('BIỂU MỚI · 5 BẬC',30,46,{size:22,col:RED,ls:2});txt('Quyết định 2892/QĐ-BCT · từ 01/11/2026',30,74,{size:18,w:600,col:GREY});
  NEW.forEach((r,i)=>{const y=132+i*58,al=P(g(r[3]),.2);txt('Bậc '+r[0],30,y,{size:30,a:al});txt(r[1]+' kWh',160,y,{size:26,w:600,a:al});txt(r[2],520,y,{size:34,col:RED,align:'right',a:al})})});
 source(SRC2,1)}
function sQ(t){const t0=g('s6');title(null,'GIÁ BÌNH QUÂN',t0);
 box(140,190,440,320,g('k_bq')-.3,{lw:6},a=>{txt('GIẢM',220,70,{size:26,col:GREY,align:'center',ls:3});txt('2%',220,210,{size:130,col:RED,align:'center'})});
 arrow(590,350,690,350,g('k_bq2')-.2,.22);
 box(700,190,440,320,g('k_bq2'),{},a=>{photo('pylon',16,16,408,120);txt('Giá bán lẻ bình quân',30,190,{size:26});txt('2.159,9 đ/kWh',30,248,{size:46,col:RED});txt('Trước đó: 2.204,1 đ/kWh (chưa VAT)',30,290,{size:20,w:600,col:GREY})});
 source('Nguồn: CafeF, Báo Gia Lai, Cổng TTĐT tỉnh Quảng Ninh (giá bình quân cũ, Quyết định 1279/QĐ-BCT).',1)}
function sX(t){const t0=g('s7');title(null,'VÍ DỤ: NHÀ DÙNG 150 kWh/THÁNG',t0,{sub:'Tính theo biểu giá, chưa gồm thuế GTGT'});
 box(60,196,540,290,g('k_x1')-.2,{col:GREY},a=>{txt('BIỂU CŨ',30,50,{size:22,col:GREY,ls:3});txt('50 × 1.984 + 50 × 2.050',30,104,{size:24,w:600});txt('+ 50 × 2.380',30,138,{size:24,w:600});txt('320.700 đ',30,230,{size:62})});
 arrow(610,340,672,340,g('k_x2')-.25,.22);
 box(680,196,540,290,g('k_x2'),{lw:6},a=>{txt('BIỂU MỚI',30,50,{size:22,col:RED,ls:3});txt('100 × 1.901 + 50 × 2.289',30,104,{size:24,w:600});txt('304.550 đ',30,230,{size:62,col:RED})});
 stamp('ÍT HƠN 16.150 Đ',640,548,P(g('k_x3'),.35),{size:30,rot:-.03,col:GREEN});
 source('Tính từ biểu giá Quyết định 1279/QĐ-BCT và Quyết định 2892/QĐ-BCT. Hóa đơn thực tế còn cộng thuế GTGT.',1)}
function sH(t){const t0=g('s8');title(null,'AI TRẢ ÍT HƠN, AI TRẢ NHIỀU HƠN?',t0,{sub:'Theo Tập đoàn Điện lực Việt Nam (EVN)'});
 box(60,196,540,300,g('k_e0')-.2,{col:GREEN,lw:6},a=>{txt('DÙNG DƯỚI 900 kWh/THÁNG',30,52,{size:22,col:GREEN,ls:2});txt('Hơn 98%',30,150,{size:72,col:GREEN});txt('số hộ được giảm tiền điện',30,206,{size:28})});
 box(680,196,540,300,g('k_e1'),{lw:6},a=>{txt('DÙNG TRÊN 1.000 kWh/THÁNG',30,52,{size:22,col:RED,ls:2});txt('Trả nhiều hơn',30,140,{size:52,col:RED});
  txt('vì bậc cao nhất: 3.460 → 3.844 đ/kWh',30,200,{size:24,w:600,a:P(g('k_e2'),.2)});txt('Ví dụ 1.000 kWh: 3.150.500 → 3.187.800 đ',30,250,{size:21,w:600,col:GREY,a:P(g('k_e2')+.5,.2)})});
 source('Nguồn: EVN, theo CAND, Báo Gia Lai, BNews (11/2026). Ví dụ 1.000 kWh: tính từ biểu giá, chưa gồm thuế GTGT.',1)}
function sE(t){vxTodo(g('s9'),[[g('k_t1'),'So hóa đơn tháng 11 với tháng 10','(số ngày mỗi kỳ hóa đơn có thể khác nhau)'],[g('s10'),'Dùng nhiều điện (điều hòa, sạc xe điện):','theo dõi chỉ số trên ứng dụng ngành điện'],[g('s11'),'Thuê trọ: đối chiếu cách chủ nhà','tính tiền điện với biểu giá mới']])}
function sF(t){vxDisclaimer(g('out'),'Quyết định 2892/QĐ-BCT · ban hành 31/10/2026 · áp dụng từ 01/11/2026','Bộ Công Thương',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Quyết định 2892/QĐ-BCT  ·  ban hành 31/10/2026  ·  áp dụng từ 01/11/2026',
 images:{meters:'img/meters.jpg',meter:'img/meter.jpg',pylon:'img/pylon.jpg',calc:'img/calc.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sT],[()=>g('s6')-.15,sQ],[()=>g('s7')-.15,sX],[()=>g('s8')-.15,sH],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
