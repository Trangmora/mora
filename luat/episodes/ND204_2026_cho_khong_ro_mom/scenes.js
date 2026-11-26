// Tập: Dắt chó không rọ mõm bị phạt 1–2 triệu đồng theo Nghị định 204/2026/NĐ-CP (hiệu lực 01/8/2026, đang áp dụng). Khoảng 2 phút 7 giây.
const SRC1='Nguồn: LuatVietnam, Thư viện Pháp luật, An ninh Thủ đô, Báo Pháp luật Việt Nam, Công an Cà Mau (2026).';
const SRC2='Nguồn: Thư viện Pháp luật, LuatVietnam, UBND phường Luận Thành (Thanh Hóa), Công an Cà Mau.';
function sA(t){
 photoCard('muzzle',70,170,400,400,.1,{rot:-.035});
 stamp('ĐANG ÁP DỤNG',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Dắt chó ra nơi công cộng',520,226,{size:46,a:P(.4,.2)});
 txt('không đeo rọ mõm',520,290,{size:52,col:RED,a:P(g('k_ro')-.1,.2)});underline(520,308,tw('không đeo rọ mõm',52),g('k_ro')+.3,.4);
 box(520,340,660,140,g('k_phat'),{lw:6},a=>{txt('CÓ THỂ BỊ PHẠT',30,46,{size:22,col:GREY,ls:3});txt('1 – 2 triệu đồng',30,116,{size:62,col:RED})});
 box(520,500,660,80,g('k_ad'),{col:GREY},a=>{txt('Áp dụng từ 01/8/2026',30,54,{size:32})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('CHÓ KHÔNG RỌ MÕM BỊ PHẠT',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Hành vi nào','bị phạt?'],['Mức phạt','so với trước?'],['Chủ nuôi chó','nên làm gì?']],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{if(i==1)icon('coin',125,14,104,ti+.3,.4);else photo(i==0?'muzzle':'walk',12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_nd')+.2,{lw:6},a=>{txt('NGHỊ ĐỊNH CỦA CHÍNH PHỦ',175,58,{size:21,col:GREY,align:'center',ls:1});txt('204/2026',175,150,{size:62,col:RED,align:'center'});txt('/NĐ-CP',175,196,{size:32,align:'center'});txt('Xử phạt vi phạm hành chính',175,252,{size:21,w:600,align:'center'});txt('trong lĩnh vực thú y',175,282,{size:21,w:600,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_bh')-.3,.2);
 box(468,y,350,h,g('k_bh'),{},a=>{txt('BAN HÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('11/6/2026',175,118,{size:44,align:'center'});
  txt('CÓ HIỆU LỰC TỪ',175,186,{size:21,col:GREY,align:'center',ls:1,a:P(g('k_hl'),.2)});txt('01/8/2026',175,250,{size:54,col:RED,align:'center',a:P(g('k_hl')+.2,.2)});txt('Đang áp dụng',175,294,{size:22,w:600,col:GREEN,align:'center',a:P(g('k_hl')+.6,.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_tt')-.3,.2);
 box(886,y,350,h,g('k_tt'),{col:GREY},a=>{txt('THAY THẾ',175,58,{size:21,col:GREY,align:'center',ls:1});txt('Nghị định',175,150,{size:36,align:'center'});txt('90/2017/NĐ-CP',175,200,{size:38,align:'center'});stamp('HẾT HIỆU LỰC',175,270,P(g('k_tt')+.5,.35),{size:22,rot:-.06,col:GREY})});
 source(SRC2,1)}
function sB(t){const t0=g('s2');title(null,'HIỂU BẰNG LỜI THƯỜNG',t0);
 box(60,180,540,390,g('k_rm')-.2,{lw:6},a=>{photo('muzzle',14,14,512,200);txt('RỌ MÕM',30,262,{size:24,col:RED,ls:3});txt('Dụng cụ đeo quanh miệng chó,',30,306,{size:28,w:600});txt('để chó không cắn được người',30,344,{size:28,w:600})});
 arrow(612,375,672,375,g('k_cc')-.25,.22);
 box(680,180,540,390,g('k_cc'),{},a=>{photo('walk',14,14,512,200);txt('NƠI CÔNG CỘNG',30,262,{size:24,col:RED,ls:3});txt('Nơi nhiều người qua lại',30,306,{size:28,w:600});txt('Đường phố, công viên, chợ',30,344,{size:28,w:600,a:P(g('k_vd'),.2)})});
 source('Giải thích bằng lời thường, không trích nguyên văn văn bản. Ảnh minh họa.',1)}
function sC(t){const t0=g('s3');title(null,'MỨC PHẠT MỚI VỚI CÁ NHÂN',t0,{sub:'Khoản 2 Điều 8 Nghị định 204/2026/NĐ-CP'});
 box(60,190,520,380,g('k_12')-.2,{lw:7},a=>{txt('PHẠT TIỀN',30,54,{size:22,col:GREY,ls:3});txt('1 – 2',30,170,{size:110,col:RED});txt('triệu đồng',30,240,{size:52});
  txt('Đưa chó ra nơi công cộng mà:',30,318,{size:24,w:600,a:P(g('k_h1')-.6,.2)})});
 const it=[['Không đeo rọ mõm',g('k_h1')],['Không xích giữ',g('k_h2')],['Không có người dắt',g('k_h3')]];
 it.forEach(([s,ti],i)=>{arrow(590,380,640,250+i*120,ti-.2,.2);box(650,200+i*120,570,100,ti,i==0?{lw:6}:{},a=>{badge(i+1,46,50,ti+.1,22);txt(s,90,64,{size:36})})});
 source(SRC1,1)}
function sV(t){const t0=g('s4');title(null,'CÙNG MỨC: KHÔNG TIÊM PHÒNG DẠI',t0,{sub:'Cũng tại khoản 2 Điều 8'});
 box(60,190,1160,330,g('k_vx')-.2,{lw:6},a=>{icon('shield',40,40,200,g('k_vx'),.6);txt('Không tiêm phòng vắc-xin dại',290,110,{size:44});txt('cho động vật thuộc diện bắt buộc tiêm phòng',290,160,{size:30,w:600});txt('(như chó, mèo)',290,204,{size:30,w:600,col:GREY});
  txt('1 – 2 triệu đồng',290,290,{size:62,col:RED,a:P(g('k_vx2'),.2)})});
 source('Nguồn: LuatVietnam, Thư viện Pháp luật, Báo Cần Thơ (2026).',1)}
function sO(t){const t0=g('s5');title(null,'SO VỚI TRƯỚC ĐÂY',t0,{sub:'Không rọ mõm, không xích chó ở nơi công cộng (mức cá nhân)'});
 box(60,190,520,300,g('k_cu')-.2,{col:GREY},a=>{txt('NGHỊ ĐỊNH 90/2017',30,54,{size:22,col:GREY,ls:2});txt('600.000 –',30,150,{size:58,col:GREY,a:P(g('k_cu2'),.2)});txt('800.000 đồng',30,220,{size:58,col:GREY,a:P(g('k_cu2'),.2)})});
 arrow(592,340,662,340,g('k_cu2')+.6,.22);
 box(680,190,540,300,g('k_cu2')+.8,{lw:7},a=>{txt('NGHỊ ĐỊNH 204/2026 · TỪ 01/8/2026',30,54,{size:21,col:RED,ls:1});txt('1 – 2',30,150,{size:72,col:RED});txt('triệu đồng',30,220,{size:58,col:RED})});
 box(330,512,620,80,g('k_x'),{},a=>{txt('Mức tối đa: gấp 2,5 lần mức cũ',310,54,{size:32,align:'center'})});
 source('Mức cũ: khoản 2 Điều 7 NĐ 90/2017/NĐ-CP (Thư viện Pháp luật, Hà Nội Online). Mức mới: LuatVietnam, Thư viện Pháp luật, An ninh Thủ đô.',1)}
function sT(t){const t0=g('s6');title(null,'TỔ CHỨC VI PHẠM',t0);
 box(60,200,520,260,g('k_tc')-.2,{},a=>{txt('CÁ NHÂN',30,54,{size:22,col:GREY,ls:3});txt('1 – 2 triệu',30,160,{size:62})});
 arrow(592,330,662,330,g('k_tc')+.3,.22);
 box(680,200,540,260,g('k_tc2'),{lw:7},a=>{txt('TỔ CHỨC · GẤP ĐÔI',30,54,{size:22,col:RED,ls:3});txt('2 – 4 triệu',30,160,{size:62,col:RED})});
 source('Nguồn: Điều 5 NĐ 204/2026/NĐ-CP (theo Thư viện Pháp luật, LuatVietnam).',1)}
function sX(t){const t0=g('s7');title(null,'VÍ DỤ',t0);
 box(60,180,500,390,g('k_vd1')-.2,{},a=>{photo('walk',14,14,472,240);txt('Anh A dắt chó đi dạo công viên',30,300,{size:26,w:600});txt('Có xích  ✓',30,346,{size:28,col:GREEN,a:P(g('k_vd2'),.2)});txt('Không rọ mõm  ✗',220,346,{size:28,col:RED,a:P(g('k_vd2')+.8,.2)})});
 arrow(572,375,632,375,g('k_vd3')-.25,.22);
 box(640,180,580,190,g('k_vd3'),{lw:7},a=>{txt('CÓ THỂ BỊ PHẠT',30,54,{size:22,col:GREY,ls:3});txt('1 – 2 triệu đồng',30,136,{size:58,col:RED})});
 box(640,390,580,180,g('k_vd4'),{col:GREY},a=>{txt('NGUYÊN TẮC CHUNG',30,50,{size:21,col:GREY,ls:2});txt('Nhiều hành vi vi phạm:',30,104,{size:30});txt('mỗi hành vi bị xử phạt riêng',30,146,{size:30})});
 source('Ví dụ minh họa. Nguyên tắc: Luật Xử lý vi phạm hành chính.',1)}
function sD(t){const t0=g('s8');title(null,'ÁP DỤNG TỪ KHI NÀO?',t0);
 sketch([seg(110,300,1170,300,5)],t0+.2,.6,{lw:6});
 const pm=P(g('k_hl3')-.2,.25);if(pm>0){x.save();x.globalAlpha*=pm;x.fillStyle=RED;x.beginPath();x.arc(500,300,13,0,6.2832);x.fill();x.restore();txt('01/8/2026',500,262,{size:46,col:RED,align:'center',a:pm})}
 const pn=P(g('k_hl2'),.25);if(pn>0){x.save();x.globalAlpha*=pn;x.fillStyle=INK;x.beginPath();x.arc(980,300,11,0,6.2832);x.fill();x.restore();txt('Hôm nay',980,262,{size:34,align:'center',a:pn})}
 stamp('ĐANG CÓ HIỆU LỰC',980,190,P(g('k_hl2')+.3,.35),{size:26,rot:.04,col:GREEN});
 box(500,350,680,180,g('k_hl3'),{lw:6},a=>{txt('HÀNH VI TỪ 01/8/2026',30,50,{size:21,col:RED,ls:2});txt('Xử phạt theo mức mới',30,112,{size:40});txt('Nghị định 204/2026/NĐ-CP',30,154,{size:26,w:600,col:GREY})});
 source(SRC2,1)}
function sE(t){vxTodo(g('s9'),[[g('k_t1'),'Đưa chó ra đường: đeo rọ mõm, dây xích,','luôn có người dắt'],[g('s10'),'Tiêm phòng dại cho chó, mèo đầy đủ,','giữ giấy chứng nhận tiêm phòng'],[g('s11'),'Không thả rông chó','ra ngõ, ra đường'],[g('s12'),'Bị chó cắn: đến cơ sở y tế ngay,','báo chính quyền địa phương']])}
function sF(t){vxDisclaimer(g('out'),'Nghị định 204/2026/NĐ-CP · ban hành 11/6/2026 · hiệu lực 01/8/2026','Đang áp dụng · thay thế Nghị định 90/2017/NĐ-CP',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Nghị định 204/2026/NĐ-CP  ·  ban hành 11/6/2026  ·  hiệu lực 01/8/2026',
 images:{muzzle:'img/muzzle.jpg',walk:'img/walk.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sC],[()=>g('s4')-.15,sV],[()=>g('s5')-.15,sO],[()=>g('s6')-.15,sT],[()=>g('s7')-.15,sX],[()=>g('s8')-.15,sD],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
