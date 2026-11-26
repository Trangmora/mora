// Tập: Sát hạch lái xe theo Thông tư 108/2026/TT-BCA: bỏ thi mô phỏng bắt buộc; nội dung mới từ 01/3/2027. Khoảng 2 phút 7 giây.
const SRC1='Nguồn: Báo Tin tức (TTXVN), LuatVietnam, Thư viện Pháp luật, VnExpress (6–7/2026).';
const SRC2='Nguồn: Thư viện Pháp luật (toàn văn), VnExpress, UBND phường Phước Bình (Đồng Nai), Thương hiệu & Công luận.';
function sA(t){
 photoCard('wheel',70,170,400,400,.1,{rot:-.035});
 stamp('ĐANG ÁP DỤNG',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Thi bằng lái xe',520,226,{size:52,a:P(.3,.2)});
 box(520,262,660,130,g('k_mp'),{lw:6},a=>{txt('TỪ 01/7/2026',30,44,{size:22,col:GREY,ls:3,a:P(g('k_tu7'),.2)});txt('Bỏ thi mô phỏng bắt buộc',30,104,{size:42,col:RED})});
 box(520,410,660,160,g('k_tu3'),{},a=>{txt('TỪ 01/3/2027',30,48,{size:22,col:RED,ls:3});txt('Nội dung sát hạch lý thuyết',30,100,{size:34,a:P(g('k_nd'),.2)});txt('và thực hành thay đổi',30,140,{size:34,a:P(g('k_nd')+.5,.2)})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('SÁT HẠCH LÁI XE MỚI',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Thông tư mới','thay đổi gì?'],['Mốc nào','áp dụng khi nào?'],['Người sắp thi','nên làm gì?']],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{if(i==1)icon('calendar',125,14,104,ti+.3,.4);else photo(i==0?'cones':'helmet',12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO, KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_tt')+.2,{lw:6},a=>{txt('THÔNG TƯ CỦA BỘ CÔNG AN',175,58,{size:20,col:GREY,align:'center',ls:1});txt('108/2026',175,150,{size:62,col:RED,align:'center'});txt('/TT-BCA',175,196,{size:32,align:'center'});txt('Sát hạch, cấp giấy phép lái xe;',175,252,{size:19,w:600,align:'center'});txt('giấy phép lái xe quốc tế',175,280,{size:19,w:600,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_bh')-.3,.2);
 box(468,y,350,h,g('k_bh'),{},a=>{txt('BAN HÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('29/6/2026',175,118,{size:44,align:'center'});
  txt('CÓ HIỆU LỰC TỪ',175,190,{size:21,col:GREY,align:'center',ls:1,a:P(g('k_hl'),.2)});txt('01/7/2026',175,254,{size:54,col:RED,align:'center',a:P(g('k_hl')+.2,.2)});txt('Đang áp dụng',175,296,{size:22,w:600,col:GREEN,align:'center',a:P(g('k_hl')+.6,.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_thay')-.3,.2);
 box(886,y,350,h,g('k_thay'),{col:GREY},a=>{txt('THAY THẾ',175,58,{size:21,col:GREY,align:'center',ls:1});txt('Thông tư',175,150,{size:36,align:'center'});txt('12/2025/TT-BCA',175,200,{size:36,align:'center'});stamp('HẾT HIỆU LỰC',175,270,P(g('k_thay')+.5,.35),{size:22,rot:-.06,col:GREY})});
 source(SRC1,1)}
function sB(t){const t0=g('s2');title(null,'SÁT HẠCH GỒM NHỮNG PHẦN NÀO?',t0);
 const it=[['Lý thuyết','trên máy tính',g('k_lt'),null,'paper'],['Thực hành','trong sân (sa hình)',g('k_sh2'),'cones',null],['Lái xe','trên đường (ô tô)',g('k_duong'),'wheel',null]];
 it.forEach(([a1,a2,ti,ph,ic],i)=>{const bx=60+i*395;if(i>0)arrow(bx-22,380,bx-2,380,ti-.25,.15);box(bx,200,370,350,ti-.1,{},a=>{if(ph)photo(ph,12,12,346,180);else icon(ic,128,40,120,ti,.5);badge(i+1,40,228,ti,22);txt(a1,185,250,{size:36,align:'center'});txt(a2,185,300,{size:28,w:600,align:'center'})})});
 source('Giải thích bằng lời thường. Ảnh minh họa.',1)}
function sC(t){const t0=g('s3');title(null,'ĐÃ THAY ĐỔI TỪ 01/7/2026',t0);
 box(60,170,1160,130,g('k_t1')-.1,{lw:6},a=>{badge(1,46,46,g('k_t1'),24);txt('Thi mô phỏng tình huống giao thông trên máy tính',90,56,{size:30});txt('Không còn là phần thi bắt buộc',90,108,{size:32,col:RED,a:P(g('k_t1b'),.2)})});
 box(60,314,1160,130,g('k_t2')-.1,{lw:6},a=>{badge(2,46,46,g('k_t2'),24);txt('Thi theo trình tự',90,56,{size:30});txt('Đạt phần trước, mới được thi phần sau',90,108,{size:32,col:RED,a:P(g('k_t2b'),.2)})});
 box(60,458,1160,140,g('k_t3')-.1,{lw:6},a=>{badge(3,46,46,g('k_t3'),24);txt('Đổi bằng lái, cấp bằng lái quốc tế',90,56,{size:30});txt('5 ngày',90,116,{size:40,col:GREY,a:P(g('k_t3b'),.2)});arrow(250,104,330,104,g('k_t3b')+.4,.2);txt('2,5 ngày',350,116,{size:44,col:RED,a:P(g('k_t3b')+.6,.2)})});
 source('Nguồn: VnExpress, Báo Tin tức, LSVN (mục 1–2); LuatVietnam, Công an Tây Ninh (mục 3).',1)}
function sD(t){const t0=g('s6');title(null,'CÁC MỐC TIẾP THEO',t0);
 sketch([seg(80,290,1200,290,5)],t0+.2,.6,{lw:6});
 const dot=(px,tt,lab,col)=>{const p=P(tt,.25);if(p>0){x.save();x.globalAlpha*=p;x.fillStyle=col;x.beginPath();x.arc(px,290,13,0,6.2832);x.fill();x.restore();txt(lab,px,252,{size:40,col,align:'center',a:p})}};
 dot(185,t0+.3,'01/7/2026',GREY);dot(560,g('k_m27')+.2,'01/3/2027',RED);dot(1015,g('k_m28b'),'01/01/2028',INK);
 box(330,330,460,260,g('k_m27b'),{lw:7},a=>{txt('NỘI DUNG SÁT HẠCH MỚI',30,48,{size:20,col:RED,ls:2});txt('Lý thuyết',30,100,{size:32});txt('Thực hành trong hình',30,144,{size:32,a:P(g('k_m27b')+1,.2)});txt('Thực hành trên đường',30,188,{size:32,a:P(g('k_m27b')+2,.2)});txt('áp dụng theo thông tư mới',30,232,{size:24,w:600,col:GREY,a:P(g('k_m27c'),.2)})});
 box(810,330,410,260,g('k_m28'),{},a=>{txt('BÀI SÁT HẠCH SỐ 2',30,48,{size:20,col:GREY,ls:2});txt('và Phụ lục I',30,96,{size:30});txt('Theo báo chí:',30,150,{size:22,w:600,col:GREY,a:P(g('k_m28c'),.2)});txt('mô tô hạng A1, A;',30,186,{size:26,w:600,a:P(g('k_m28c'),.2)});txt('thêm tình huống giả định',30,220,{size:26,w:600,a:P(g('k_m28c')+.8,.2)})});
 box(60,330,250,260,t0+.3,{col:GREY},a=>{txt('ĐÃ ÁP DỤNG',24,48,{size:18,col:GREY,ls:2});txt('Bỏ mô phỏng',24,104,{size:26});txt('bắt buộc,',24,140,{size:26});txt('thi theo',24,176,{size:26});txt('trình tự',24,212,{size:26})});
 source(SRC2,1)}
function sK(t){const t0=g('s8');title(null,'ĐANG THI DỞ THÌ SAO?',t0);
 box(60,190,540,330,g('k_kq')-.2,{},a=>{txt('THEO BÁO CHÍ',30,52,{size:22,col:GREY,ls:3});check(30,90,60,g('k_kq')+.8);txt('Đã đạt phần thi',110,130,{size:34});txt('trước 01/7/2026',110,176,{size:34});txt('Vẫn được công nhận',30,270,{size:38,col:GREEN,a:P(g('k_kq')+2,.2)})});
 arrow(612,355,672,355,g('k_kq2')-.25,.22);
 box(680,190,540,330,g('k_kq2'),{col:GREY},a=>{txt('CẦN ĐỐI CHIẾU PHỤ LỤC',30,52,{size:22,col:GREY,ls:2});txt('Số câu hỏi',30,140,{size:40});txt('và điểm đạt',30,190,{size:40});txt('của từng hạng',30,240,{size:40})});
 source('Nguồn: tóm tắt từ Thư viện Pháp luật, VnExpress. Số câu hỏi từng hạng: các nguồn chưa thống nhất, không đưa lên hình.',1)}
function sE(t){vxTodo(g('s9'),[[g('k_e1'),'Sắp thi: hỏi trung tâm bạn thi trước','hay sau 01/3/2027 để ôn đúng nội dung'],[g('s10'),'Đang thi dở: hỏi rõ phần nào','đã được công nhận'],[g('s11'),'Bằng lái sắp hết hạn:','đổi sớm'],[g('s12'),'Vẫn nên luyện xử lý tình huống','để lái xe an toàn']])}
function sF(t){vxDisclaimer(g('out'),'Thông tư 108/2026/TT-BCA · ban hành 29/6/2026 · hiệu lực 01/7/2026','Nội dung sát hạch mới: 01/3/2027 · bài số 2: 01/01/2028',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Thông tư 108/2026/TT-BCA  ·  ban hành 29/6/2026  ·  hiệu lực 01/7/2026',
 images:{wheel:'img/wheel.jpg',cones:'img/cones.jpg',helmet:'img/helmet.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sC],[()=>g('s6')-.15,sD],[()=>g('s8')-.15,sK],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
