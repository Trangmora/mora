// Tập: Bộ luật Tố tụng hình sự (sửa đổi) 2026, góc "thủ tục riêng khi bị can, bị cáo tự nguyện nhận tội; tố tụng điện tử". Nghiêm túc, trung lập, khoảng 2 phút 20 giây.
const SRC1='Nguồn: VOV, CAND, Tạp chí Luật sư Việt Nam, VietnamPlus (21/11/2026)';
const SRC2='Nguồn: Công lý, Người Đưa Tin, Báo Quảng Ninh, Bảo vệ Pháp luật, Công Thương (21–25/11/2026). Chờ đối chiếu văn bản chính thức.';
const SOHIEU='Số hiệu luật: chờ công bố chính thức';
function sA(t){
 photoCard('gavel',70,170,400,380,.1,{rot:-.035});
 stamp('TỪ 01/3/2027',1060,128,P(.4,.4),{size:30,rot:.05});
 txt('BỘ LUẬT TỐ TỤNG HÌNH SỰ (SỬA ĐỔI)',520,186,{size:22,col:GREY,ls:3,a:P(.4,.25)});
 box(520,210,680,200,g('k_nt')-.2,{lw:6},a=>{txt('BỊ CAN, BỊ CÁO',30,46,{size:20,col:GREY,ls:2});txt('Tự nguyện nhận tội',30,100,{size:38});txt('+ chấp nhận hình phạt được đề nghị',30,146,{size:26,w:600,a:P(g('k_cn'),.2)});txt('Có thủ tục riêng',30,184,{size:28,col:RED,a:P(g('k_tr'),.2)})});
 box(520,430,680,110,g('k_dt'),{},a=>{icon('phone',24,14,80,g('k_dt')+.1,.5);txt('Tố tụng điện tử, trực tuyến',120,66,{size:32})});
 source(SRC2,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('THỦ TỤC NHẬN TỘI',310,62,{size:36,align:'center'})});
 const bx=[60,465,870],lab=[['Thủ tục nhận tội','là gì?'],['Cần những','bảo đảm nào?'],['Bạn nên','làm gì?']],ph=['gavel','books','cuffs'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO? KHI NÀO?',t0,{sub:'Bộ luật Tố tụng hình sự (sửa đổi), 527 điều'});
 const y=186,h=330;
 box(50,y,350,h,g('k_qh')-.05,{},a=>{photo('gavel',14,14,322,140);txt('QUỐC HỘI THÔNG QUA',175,196,{size:21,col:GREY,align:'center',ls:1});txt('21/11/2026',175,254,{size:46,align:'center'});txt('Sáng 21/11',175,296,{size:20,w:600,col:GREY,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_phieu')-.3,.2);
 box(468,y,350,h,g('k_phieu'),{},a=>{txt('PHIẾU TÁN THÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('478',175,196,{size:120,align:'center'});txt('trên 479 đại biểu',175,250,{size:25,w:600,align:'center'});txt('tham gia biểu quyết',175,284,{size:25,w:600,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/3/2027',175,270,{size:54,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 txt(SOHIEU,640,568,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl')+.7,.3)});
 source(SRC1,1)}
function sD(t){const t0=g('s2');title(null,'MỘT VÀI KHÁI NIỆM',t0);
 box(100,180,1080,110,g('k_d1')-.2,{lw:6},a=>{txt('TỐ TỤNG HÌNH SỰ',30,44,{size:20,col:RED,ls:2});const L=['Điều tra','Truy tố','Xét xử'];let px=330;L.forEach((s,i)=>{txt(s,px,74,{size:34,a:P(g('k_d1')+.3+i*.5,.2)});px+=tw(s,34)+(i<2?60:0);if(i<2)txt('→',px-44,74,{size:30,col:RED,a:P(g('k_d1')+.5+i*.5,.2)})})});
 box(100,330,520,170,g('k_d2'),{},a=>{txt('BỊ CAN',30,48,{size:22,col:GREY,ls:2});txt('Người đã bị khởi tố',30,110,{size:34})});
 box(660,330,520,170,g('k_d3'),{},a=>{txt('BỊ CÁO',30,48,{size:22,col:GREY,ls:2});txt('Người đã bị đưa ra xét xử',30,110,{size:32})});
 source('Diễn giải bằng lời thường. Căn cứ: Bộ luật Tố tụng hình sự 2015, Điều 60, Điều 61.',1)}
function sH(t){const t0=g('s3');title(null,'HIỆN NAY THẾ NÀO?',t0);
 box(100,180,1080,150,g('k_h1')-.2,{col:GREY},a=>{txt('BỘ LUẬT HÌNH SỰ (HIỆN HÀNH)',30,46,{size:20,col:GREY,ls:2});txt('Thành khẩn khai báo, ăn năn hối cải:',30,96,{size:30});txt('có thể được giảm nhẹ trách nhiệm hình sự',30,134,{size:26,w:600,a:P(g('k_h2'),.2)})});
 box(100,360,1080,150,g('k_h3'),{col:GREY,lw:6},a=>{txt('BỘ LUẬT TỐ TỤNG HÌNH SỰ 2015',30,46,{size:20,col:GREY,ls:2});txt('Chưa có thủ tục riêng cho người tự nguyện',30,96,{size:30});txt('nhận tội và chấp nhận mức hình phạt được đề nghị',30,134,{size:26,w:600})});
 source('Căn cứ: Bộ luật Hình sự 2015, Điều 51 (tình tiết giảm nhẹ); Bộ luật Tố tụng hình sự 2015.',1)}
function sN(t){const t0=g('s4');title(null,'ĐIỂM MỚI 1: THỦ TỤC NHẬN TỘI',t0);
 const L=[['Điều tra',g('k_n1a')],['Truy tố',g('k_n1b')],['Xét xử',g('k_n1c')]];
 L.forEach(([s,ti],i)=>{box(100+i*370,180,320,100,ti-.1,{},a=>{txt(s,160,64,{size:34,align:'center'})});if(i<2)arrow(100+i*370+326,230,100+(i+1)*370-6,230,L[i+1][1]-.3,.2)});
 box(100,330,1080,190,g('k_n2')-.1,{lw:6},a=>{icon('paper',30,40,110,g('k_n2'),.5);txt('Bị can, bị cáo',170,66,{size:30});txt('Tự nguyện nhận tội',170,112,{size:36,col:RED});txt('Đồng ý mức hình phạt cơ quan tố tụng đề nghị',170,156,{size:26,w:600,a:P(g('k_n2b'),.2)})});
 source(SRC2,1)}
function sB(t){const t0=g('s5');title(null,'NHỮNG BẢO ĐẢM CẦN CÓ',t0,{sub:'Theo báo chí đưa tin phần giải trình tại Quốc hội'});
 const L=[['Thực chất,','tự nguyện','k_b1'],['Không','ép buộc','k_b2'],['Không hạn chế','quyền bào chữa','k_b3']];
 L.forEach(([s1,s2,k],i)=>{box(80+i*380,200,350,110,g(k)-.1,{},a=>{check(20,30,44,g(k)+.1);txt(s1,84,48,{size:26});txt(s2,84,84,{size:26})})});
 box(80,350,1110,160,g('k_b4')-.1,{lw:6},a=>{txt('CƠ QUAN TỐ TỤNG PHẢI',30,46,{size:20,col:GREY,ls:2});txt('Giải thích quyền, nghĩa vụ, hậu quả pháp lý cho bị can',30,96,{size:28});txt('Vẫn kiểm tra đầy đủ chứng cứ buộc tội',30,136,{size:28,col:RED,a:P(g('k_b5'),.2)})});
 source('Nguồn: Công Thương, CAND (21/11/2026), Người Đưa Tin. Điều kiện cụ thể: chờ đối chiếu văn bản luật.',1)}
function sT(t){const t0=g('s6');title(null,'ĐIỂM MỚI 2: TỐ TỤNG ĐIỆN TỬ',t0);
 photoCard('phone',80,190,380,300,t0+.2,{rot:-.03});
 box(520,190,680,110,g('k_t1')-.1,{lw:6},a=>{txt('Mở rộng tố tụng điện tử, trực tuyến',30,68,{size:32})});
 box(520,320,680,90,g('k_t2'),{},a=>{txt('Có nguyên tắc riêng về tố tụng điện tử',30,58,{size:28})});
 box(520,430,680,90,g('k_t3'),{},a=>{txt('Văn bản, một số hoạt động tố tụng: điện tử',30,58,{size:26})});
 source('Nguồn: Báo Quảng Ninh, Công lý, Người Đưa Tin (21–25/11/2026). Chờ đối chiếu văn bản chính thức.',1)}
function sW(t){const t0=g('s7');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 const L=[['Người bị buộc tội','k_w1','shield'],['Người bị hại','k_w2','bubble'],['Gia đình họ','k_w3','house'],['Luật sư','k_w4','paper']];
 L.forEach(([s,k,ic],i)=>{box(60+i*295,180,270,170,g(k)-.1,{},a=>{icon(ic,95,14,80,g(k),.5);txt(s,135,140,{size:24,align:'center'})})});
 box(390,380,500,90,g('k_w5')-.1,{lw:6},a=>{txt('TỪ 01/3/2027',250,62,{size:42,col:RED,align:'center'})});
 box(140,494,1000,70,g('k_w6'),{},a=>{txt('CÒN CHỜ',30,45,{size:19,col:RED,ls:2});txt('Điều kiện cụ thể của thủ tục nhận tội: đối chiếu văn bản luật',150,45,{size:22,w:600})});
 source(SRC1,1)}
function sE(t){vxTodo(g('s8'),[[g('k_e1'),'Người thân bị khởi tố: hỏi luật sư','về thủ tục nhận tội, cả lợi và hại'],[g('s9'),'Không ký nhận tội dưới sức ép;','luôn có quyền có người bào chữa'],[g('s10'),'Thu nhập thấp: có thể đề nghị','trợ giúp pháp lý miễn phí']]);
 underline(300,172+93+7,tw('về thủ tục nhận tội, cả lợi và hại',30),g('k_e1b'),.4,{col:GREEN});underline(300,172+138+93+7,tw('luôn có quyền có người bào chữa',30),g('k_e2b'),.4,{col:GREEN});underline(300,172+2*138+93+7,tw('trợ giúp pháp lý miễn phí',30),g('k_e3b'),.4,{col:GREEN})}
function sF(t){vxDisclaimer(g('out'),'Bộ luật Tố tụng hình sự (sửa đổi) · thông qua 21/11/2026 · hiệu lực 01/3/2027',SOHIEU,g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Bộ luật Tố tụng hình sự (sửa đổi)  ·  thông qua 21/11/2026  ·  hiệu lực 01/3/2027',
 images:{gavel:'img/gavel.jpg',books:'img/books.jpg',cuffs:'img/cuffs.jpg',phone:'img/phone.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sD],[()=>g('s3')-.15,sH],[()=>g('s4')-.15,sN],[()=>g('s5')-.15,sB],[()=>g('s6')-.15,sT],[()=>g('s7')-.15,sW],[()=>g('s8')-.15,sE],[()=>g('out')-.15,sF]]});
