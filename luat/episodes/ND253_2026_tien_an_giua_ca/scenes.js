// Tập: Tiền ăn giữa ca đến 1,2 triệu đồng/tháng không tính thuế TNCN (Nghị định 253/2026/NĐ-CP, hiệu lực 01/7/2026). Nghiêm túc, một video một vấn đề.
const SRC1='Nguồn: LuatVietnam, Thư viện Pháp luật, MISA meInvoice (07/2026)';
const SRC2='Nguồn: LuatVietnam, Thư viện Pháp luật, MISA meInvoice, MAN (07/2026). Chờ đối chiếu toàn văn nghị định.';
function sA(t){
 photoCard('rice',70,170,400,380,.1,{rot:-.035});
 stamp('ĐÃ ÁP DỤNG TỪ 01/7/2026',990,128,P(.35,.4),{size:26,rot:.05});
 txt('Tiền ăn giữa ca, ăn trưa',530,226,{size:46,a:P(g('k_tien'),.2)});
 txt('đến 1.200.000 đ/tháng',530,296,{size:54,col:RED,a:P(g('k_12'),.2)});
 underline(530,314,tw('đến 1.200.000 đ/tháng',54),g('k_12')+.4,.4);
 box(530,362,640,190,g('k_ktt'),{lw:6},a=>{txt('THUẾ THU NHẬP CÁ NHÂN',34,54,{size:24,col:GREY,ls:3});txt('Không tính vào',30,124,{size:46,col:RED});txt('thu nhập chịu thuế',30,170,{size:34})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('TIỀN ĂN GIỮA CA VÀ THUẾ TNCN',310,62,{size:32,align:'center'})});
 const bx=[60,465,870],lab=[['Quy định','nói gì?'],['Phần vượt','tính thế nào?'],['Bạn nên','làm gì?']],ph=['canteen','calc','sign'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_nd')-.1,{lw:6},a=>{txt('NGHỊ ĐỊNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('253/2026',175,160,{size:64,col:RED,align:'center'});txt('/NĐ-CP',175,214,{size:36,align:'center'});txt('Hướng dẫn Luật Thuế TNCN',175,272,{size:21,w:600,col:GREY,align:'center',a:P(g('k_hd'),.2)})});
 arrow(408,y+h/2,460,y+h/2,g('k_bh')-.3,.2);
 box(468,y,350,h,g('k_bh'),{},a=>{photo('sign',14,14,322,130);txt('CHÍNH PHỦ BAN HÀNH',175,184,{size:21,col:GREY,align:'center',ls:1});txt('Tháng 6/2026',175,246,{size:44,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/7/2026',175,270,{size:54,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 txt('Quy định tiền ăn giữa ca: điểm g khoản 2 Điều 8 Nghị định 253/2026/NĐ-CP',640,560,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl')+1,.3)});
 source(SRC1+'. Ngày ký: các nguồn ghi 29/6 hoặc 30/6/2026.',1)}
function sB(t){const t0=g('s2');title(null,'TIỀN ĂN GIỮA CA LÀ GÌ?',t0);
 box(330,170,620,110,g('k_d1')-.3,{lw:6},a=>{txt('Khoản công ty chi cho bữa ăn',310,50,{size:30,align:'center'});txt('của người lao động trong ca làm việc',310,88,{size:26,w:600,align:'center'})});
 arrow(520,290,330,352,g('k_d2')-.3,.22);arrow(760,290,950,352,g('k_d3')-.3,.22);
 box(80,360,500,200,g('k_d2'),{},a=>{icon('coin',24,40,110,g('k_d2')+.1,.6);txt('Trả bằng tiền',160,90,{size:34});txt('cùng với lương',160,134,{size:30,w:600})});
 box(700,360,500,200,g('k_d3'),{},a=>{photo('canteen',20,20,180,160);txt('Công ty tự tổ',220,90,{size:32});txt('chức bữa ăn',220,134,{size:32})});
 source(SRC2,1)}
function sC(t){const t0=g('s3');title(null,'MỨC KHÔNG TÍNH THUẾ',t0,{sub:'Khi chi bằng tiền, cho mỗi người, mỗi tháng'});
 box(60,196,500,300,g('k_o1'),{col:GREY},a=>{txt('TRƯỚC ĐÂY',34,52,{size:22,col:GREY,ls:3});txt('Theo hướng dẫn cũ',34,90,{size:20,w:600,col:GREY});txt('730.000 đ',34,200,{size:64,col:GREY,a:P(g('k_o2'),.2)})});
 arrow(570,346,690,346,g('k_o3')-.2,.3);
 box(700,196,520,300,g('k_o3'),{lw:7},a=>{txt('TỪ 01/7/2026',34,52,{size:22,col:RED,ls:3});txt('Nghị định 253/2026/NĐ-CP',34,90,{size:20,w:600,col:GREY});txt('1.200.000 đ',34,200,{size:66,col:RED,a:P(g('k_o4'),.2)})});
 underline(734,412,tw('1.200.000 đ',66),g('k_o4')+.5,.4);
 source(SRC2,1)}
function sV(t){const t0=g('s4');title(null,'CHI VƯỢT MỨC THÌ SAO?',t0);
 box(60,190,1160,120,g('k_v1'),{},a=>{txt('Tiền ăn công ty chi',30,72,{size:30});
  const p=ease(P(g('k_v2'),.6));x.save();x.fillStyle='#e7efe4';rr(340,30,520*p,60,8);x.fill();x.fillStyle='#f6d6d0';rr(860,30,240*P(g('k_v2')+.6,.4),60,8);x.fill();x.restore();
  txt('trong mức 1,2 triệu',600,70,{size:24,col:GREEN,align:'center',a:P(g('k_v2'),.3)});txt('phần vượt',980,70,{size:24,col:RED,align:'center',a:P(g('k_v2')+.6,.3)})});
 box(60,350,540,170,g('k_v3'),{col:GREEN,lw:6},a=>{txt('PHẦN TRONG MỨC 1,2 TRIỆU',30,50,{size:20,col:GREEN,ls:2});txt('Không tính thuế',30,120,{size:44,col:GREEN})});
 box(680,350,540,170,g('k_v2')+.4,{lw:6},a=>{txt('PHẦN VƯỢT',30,50,{size:20,col:RED,ls:2});txt('Cộng vào thu nhập',30,108,{size:36,col:RED});txt('chịu thuế',30,148,{size:36,col:RED})});
 source(SRC2,1)}
function sX(t){const t0=g('s5');title(null,'VÍ DỤ',t0,{sub:'Tiền ăn trưa trả bằng tiền: 1.800.000 đồng/tháng'});
 box(80,200,340,260,g('k_x1')+.2,{},a=>{photo('rice',14,14,312,140);txt('Tiền ăn trưa',30,196,{size:26,w:600});txt('1.800.000 đ',30,240,{size:40})});
 arrow(430,300,520,250,g('k_x2')-.3,.2);arrow(430,360,520,420,g('k_x3')-.3,.2);
 box(530,180,640,150,g('k_x2'),{col:GREEN,lw:6},a=>{txt('1.200.000 đ',30,80,{size:50,col:GREEN});txt('không tính thuế',360,78,{size:28})});
 box(530,350,640,150,g('k_x3'),{lw:6},a=>{txt('600.000 đ',30,80,{size:50,col:RED});txt('cộng vào thu nhập',330,66,{size:26});txt('chịu thuế tháng đó',330,104,{size:26})});
 source('Ví dụ minh họa tính theo mức 1.200.000 đồng/người/tháng. '+SRC1+'.',1)}
function sT(t){const t0=g('s6');title(null,'CÔNG TY TỰ TỔ CHỨC BỮA ĂN',t0,{sub:'Theo các bài hướng dẫn, chờ đối chiếu văn bản gốc'});
 let px=60;[['Tự nấu ăn',0],['Mua suất ăn',.5],['Cấp phiếu ăn',1]].forEach(([s,d],i)=>{box(60+i*390,196,360,180,g('k_t1')+d,{},a=>{txt(s,180,110,{size:36,align:'center'})})});
 box(120,410,780,130,g('k_t2'),{lw:6,col:GREEN},a=>{txt('Không tính vào thu nhập chịu thuế',390,62,{size:34,col:GREEN,align:'center'});txt('của người lao động',390,104,{size:26,w:600,align:'center'})});
 stamp('ĐỐI CHIẾU VĂN BẢN GỐC',1085,482,P(g('k_t3'),.35),{size:18,rot:-.05,col:GREY});
 source('Nguồn: Luật Quang Huy, einvoice.vn, Netviet (bài hướng dẫn, không phải văn bản). Cần đối chiếu Nghị định 253/2026/NĐ-CP.',1)}
function sW(t){const t0=g('s7');title(null,'AI LIÊN QUAN, TỪ KHI NÀO?',t0);
 box(60,190,540,250,g('k_a1')-.2,{},a=>{photo('canteen',20,20,500,120);txt('Người làm công ăn lương',30,186,{size:28});txt('có nhận tiền ăn giữa ca',30,222,{size:26,w:600})});
 box(680,190,540,250,g('k_a2'),{},a=>{icon('paper',30,30,110,g('k_a2')+.1,.6);txt('Doanh nghiệp',170,80,{size:32});txt('khi khấu trừ thuế TNCN',170,120,{size:26,w:600})});
 stamp('ĐÃ ÁP DỤNG TỪ 01/7/2026',640,520,P(g('k_a3'),.35),{size:30,rot:-.03});
 source(SRC1,1)}
function sE(t){vxTodo(g('s8'),[[g('k_e1'),'Xem phiếu lương: tiền ăn trả bằng tiền','hay bằng bữa ăn'],[g('s9'),'Tiền ăn trên 1,2 triệu đồng/tháng: kiểm tra','công ty có chỉ tính thuế phần vượt'],[g('s10'),'Quyết toán thuế năm 2026: đối chiếu số liệu,','chênh lệch thì hỏi bộ phận kế toán']])}
function sF(t){vxDisclaimer(g('out'),'Nghị định 253/2026/NĐ-CP · ban hành tháng 6/2026 · hiệu lực 01/7/2026','Hướng dẫn Luật Thuế thu nhập cá nhân',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Nghị định 253/2026/NĐ-CP  ·  ban hành tháng 6/2026  ·  hiệu lực 01/7/2026 (đã áp dụng)',
 images:{rice:'img/rice.jpg',canteen:'img/canteen.jpg',calc:'img/calc.jpg',sign:'img/sign.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sC],[()=>g('s4')-.15,sV],[()=>g('s5')-.15,sX],[()=>g('s6')-.15,sT],[()=>g('s7')-.15,sW],[()=>g('s8')-.15,sE],[()=>g('out')-.15,sF]]});
