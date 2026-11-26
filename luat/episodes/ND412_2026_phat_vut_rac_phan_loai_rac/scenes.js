// Tập: Mức phạt vứt rác sai chỗ, không phân loại rác theo Nghị định 412/2026/NĐ-CP (hiệu lực 14/11/2026). Khoảng 2 phút 6 giây.
const SRC1='Nguồn: Báo Nhân Dân, VnExpress, LuatVietnam, Thư viện Pháp luật, Báo Thanh Hóa (11/2026).';
const SRC_CC='Mức 1: LuatVietnam, An ninh Thủ đô, Tạp chí Môi trường. Mức 2, 3 (NĐ 412): theo báo chí, chưa đủ 2 nguồn. Mức cũ NĐ 45/2022: CafeF, VnExpress, Nhân Dân.';
function sA(t){
 photoCard('bags',70,170,400,400,.1,{rot:-.035});
 stamp('TỪ 14/11/2026',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Nghị định mới',520,226,{size:52,a:P(.5,.2)});txt('về xử phạt môi trường',520,290,{size:52,a:P(1.2,.2)});
 txt('đã có hiệu lực',520,354,{size:52,col:RED,a:P(g('k_hl')-.1,.2)});underline(520,372,tw('đã có hiệu lực',52),g('k_hl')+.2,.4);
 box(520,410,660,160,g('k_vut'),{lw:6},a=>{txt('VỨT RÁC SAI CHỖ Ở CHUNG CƯ, NƠI CÔNG CỘNG',30,48,{size:20,col:GREY,ls:2});txt('Phạt đến 1 triệu đồng',30,122,{size:54,col:RED,a:P(g('k_1tr'),.2)})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('PHẠT VỨT RÁC, PHÂN LOẠI RÁC',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Các mức phạt','chính với người dân'],['Mức nào','giữ như cũ?'],['Bạn nên','làm gì?']],ph=['litter','bags','bins'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_nd')+.2,{lw:6},a=>{txt('NGHỊ ĐỊNH CỦA CHÍNH PHỦ',175,58,{size:21,col:GREY,align:'center',ls:1});txt('412/2026',175,150,{size:62,col:RED,align:'center'});txt('/NĐ-CP',175,196,{size:32,align:'center'});txt('Xử phạt vi phạm hành chính',175,252,{size:21,w:600,align:'center'});txt('lĩnh vực bảo vệ môi trường',175,282,{size:21,w:600,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_bh')-.3,.2);
 box(468,y,350,h,g('k_bh'),{lw:6},a=>{txt('BAN HÀNH VÀ CÓ HIỆU LỰC',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,80,120,g('k_bh')+.2,.5);txt('14/11/2026',175,266,{size:50,col:RED,align:'center',a:P(g('k_bh')+.6,.2)});txt('Đang áp dụng',175,304,{size:20,w:600,col:GREY,align:'center',a:P(g('k_bh')+.9,.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_tt')-.3,.2);
 box(886,y,350,h,g('k_tt'),{col:GREY},a=>{txt('THAY THẾ',175,58,{size:21,col:GREY,align:'center',ls:1});txt('Nghị định',175,150,{size:36,align:'center'});txt('45/2022/NĐ-CP',175,200,{size:38,align:'center'});stamp('HẾT HIỆU LỰC',175,270,P(g('k_tt')+.5,.35),{size:22,rot:-.06,col:GREY})});
 source(SRC1,1)}
function sB(t){const t0=g('s2');title(null,'XỬ PHẠT HÀNH CHÍNH LÀ GÌ?',t0);
 box(60,200,520,280,g('k_hc')-.1,{lw:6},a=>{txt('VI PHẠM',34,56,{size:22,col:GREY,ls:3});txt('Chưa đến mức',34,140,{size:46});txt('tội phạm',34,200,{size:46,col:RED})});
 arrow(592,340,662,340,g('k_ht')-.3,.22);
 box(680,200,540,280,g('k_ht'),{},a=>{txt('HÌNH THỨC THƯỜNG GẶP',34,56,{size:22,col:GREY,ls:3});badge(1,58,124,g('k_ht')+.2,22);txt('Cảnh cáo',100,138,{size:42});badge(2,58,204,g('k_ht')+1,22);txt('Phạt tiền',100,218,{size:42,col:RED,a:P(g('k_ht')+1,.2)})});
 source('Theo Luật Xử lý vi phạm hành chính. Giải thích bằng lời thường.',1)}
function row(y,ph,lab,big,note,t0,tn,tb,o={}){box(60,y,1160,130,t0,o,a=>{photo(ph,10,10,190,110);txt(lab,226,40,{size:19,col:GREY,ls:2});txt(big,226,100,{size:42,col:RED,a:P(tb,.2)});if(note)txt(note,226+tw(big,42)+26,98,{size:18,w:600,col:GREY,a:P(tn,.25)})})}
function sC(t){const t0=g('s3');title(null,'BA MỨC PHẠT VỚI NGƯỜI DÂN',t0,{sub:'Mức áp dụng cho cá nhân'});
 row(176,'bags','CHUNG CƯ, KHU THƯƠNG MẠI, NƠI CÔNG CỘNG','500.000 – 1 triệu đồng','vứt rác, đổ nước thải sai nơi quy định',g('k_c1'),g('k_c1b'),g('k_c1c'),{lw:6});
 row(322,'litter','VỈA HÈ, LÒNG ĐƯỜNG, HỆ THỐNG THOÁT NƯỚC','1 – 2 triệu đồng','THEO BÁO CHÍ · bằng mức cũ',g('k_c2'),g('k_c2c'),g('k_c2b'),{});
 row(468,'bins','HỘ GIA ĐÌNH, CÁ NHÂN KHÔNG PHÂN LOẠI RÁC','500.000 – 1 triệu đồng','THEO BÁO CHÍ · giữ như NĐ 45/2022',g('k_c3'),g('k_c3c'),g('k_c3b'),{});
 source(SRC_CC,1)}
function sG(t){const t0=g('s6');title(null,'PHÂN LOẠI RÁC THẾ NÀO?',t0,{sub:'Luật Bảo vệ môi trường 2020: 3 nhóm rác sinh hoạt'});
 const it=[['Có thể','tái chế',g('k_g1')],['Chất thải','thực phẩm',g('k_g2')],['Rác','khác',g('k_g3')]];
 it.forEach(([a1,a2,ti],i)=>{const bx=60+i*395;box(bx,190,370,250,ti-.15,{lw:i==0?6:5},a=>{if(i==0)photo('bins',12,12,346,110);else icon(i==1?'coin':'paper',140,22,90,ti,.4);badge(i+1,40,160,ti,22);txt(a1,185,170,{size:34,align:'center'});txt(a2,185,216,{size:34,align:'center'})})});
 box(160,466,960,110,g('k_dp'),{col:GREY},a=>{txt('Cách đựng, giờ thu gom: do địa phương quy định',480,66,{size:30,align:'center'})});
 source('Nguồn: Luật Bảo vệ môi trường 2020 (Điều 75); VnExpress, Công nghiệp & Môi trường: bắt buộc phân loại từ 1/1/2025.',1)}
function sT(t){const t0=g('s7');title(null,'CÁ NHÂN VÀ TỔ CHỨC',t0);
 box(60,180,540,170,g('k_cn')-.2,{},a=>{txt('CÁ NHÂN',30,50,{size:22,col:GREY,ls:3});txt('Các mức vừa nêu',30,118,{size:40})});
 box(680,180,540,170,g('k_tc'),{lw:6},a=>{txt('TỔ CHỨC, CÙNG HÀNH VI',30,50,{size:22,col:GREY,ls:3});txt('Phạt gấp đôi',30,118,{size:52,col:RED})});
 arrow(610,265,670,265,g('k_tc')-.25,.2);
 box(60,380,1160,190,g('k_max'),{lw:6},a=>{txt('MỨC PHẠT TỐI ĐA CHO MỘT HÀNH VI (LĨNH VỰC MÔI TRƯỜNG)',30,48,{size:21,col:GREY,ls:2});
  txt('1 tỷ đồng',30,136,{size:62,col:RED,a:P(g('k_1ty'),.2)});txt('cá nhân',30+tw('1 tỷ đồng',62)+16,136,{size:30,a:P(g('k_1ty'),.2)});
  txt('2 tỷ đồng',620,136,{size:62,col:RED,a:P(g('k_2ty'),.2)});txt('tổ chức',620+tw('2 tỷ đồng',62)+16,136,{size:30,a:P(g('k_2ty'),.2)})});
 source('Nguồn: Báo Nhân Dân, VnExpress (11/2026); LuatVietnam, An ninh Thủ đô.',1)}
function sK(t){const t0=g('s8');title(null,'TÓM LẠI',t0);
 box(60,180,540,200,g('k_kl')-.2,{col:GREY},a=>{txt('VỚI NGƯỜI DÂN',30,50,{size:22,col:GREY,ls:3});txt('Điểm chính không phải',30,116,{size:36});txt('là tăng phạt',30,162,{size:36})});
 box(680,180,540,200,g('k_kl2'),{},a=>{txt('VĂN BẢN',30,50,{size:22,col:GREY,ls:3});txt('NĐ 412/2026 thay',30,116,{size:36});txt('NĐ 45/2022',30,162,{size:36})});
 box(260,410,760,160,g('k_kl3'),{lw:7},a=>{photo('litter',14,14,200,132);txt('Vứt rác sai chỗ',240,72,{size:40});txt('vẫn bị xử phạt',240,126,{size:40,col:RED})});
 source(SRC1,1)}
function sE(t){vxTodo(g('s9'),[[g('k_e1'),'Chia rác thành 3 nhóm,','dùng đúng loại túi địa phương quy định'],[g('s10'),'Ở chung cư: bỏ rác ở phòng rác,','nơi ban quản lý quy định'],[g('s11'),'Không đổ nước thải, dầu mỡ','ra hành lang, vỉa hè, cống'],[g('s12'),'Xem quy định phân loại rác','của tỉnh, thành phố nơi bạn sống']])}
function sF(t){vxDisclaimer(g('out'),'Nghị định 412/2026/NĐ-CP · ban hành và hiệu lực 14/11/2026 · thay NĐ 45/2022','',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Nghị định 412/2026/NĐ-CP  ·  ban hành 14/11/2026  ·  hiệu lực 14/11/2026',
 images:{bags:'img/bags.jpg',litter:'img/litter.jpg',bins:'img/bins.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sC],[()=>g('s6')-.15,sG],[()=>g('s7')-.15,sT],[()=>g('s8')-.15,sK],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
