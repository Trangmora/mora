// Tập: Nghị định 238/2026/NĐ-CP (sửa đổi, bổ sung Nghị định 168/2024) về xử phạt vi phạm giao thông đường bộ.
// Bản dài khoảng 2 phút 20 giây, giọng nghiêm túc, trung lập (chủ kênh chốt 25/11/2026): văn bản gì, từng nhóm quy định nói gì, điều gì không đổi, nên làm gì.
// Mỗi cảnh là một "slide sơ đồ": ô viền đỏ nối nhau bằng mũi tên bút dạ. Chỉ dùng dữ kiện có từ hai nguồn chính thống trở lên (xem script.md).
const SRC_M='Nguồn: Cổng TTĐT Chính phủ, Cổng TTĐT Bộ Công an, Công báo (Nghị định 238/2026/NĐ-CP)';
const SRC_1='Nguồn: Nghị định 238/2026/NĐ-CP; VnExpress, Thanh Niên, Dân trí, Sức khỏe & Đời sống (8/2026)';
const SRC_2='Nguồn: Nghị định 238/2026/NĐ-CP; Thanh Niên, VnExpress, Tiền Phong (8–9/2026)';
const SRC_3='Nguồn: Nghị định 238/2026/NĐ-CP; Báo Chính phủ, Tuổi Trẻ, Dân trí, Cục Cảnh sát giao thông (6–8/2026)';
const SRC_4='Nguồn: Nghị định 238/2026/NĐ-CP; Tiền Phong, VnExpress, Thanh Niên, LuatVietnam (8/2026)';
const SRC_5='Nguồn: Luật Trật tự, an toàn giao thông đường bộ 2024 (Điều 58); Nghị định 238/2026/NĐ-CP (Cổng TTĐT Chính phủ, Thư viện Pháp luật)';
const SRC_6='Nguồn: Cục Cảnh sát giao thông (qua báo chí); Thư viện Pháp luật';
// 12 chấm điểm giấy phép lái xe: "lost" chấm cuối bị gạch lúc t0
function dots(cx,cy,lost,t0){for(let i=0;i<12;i++){const px=cx+(i%6-2.5)*40,py=cy+Math.floor(i/6)*40,isLost=i>=12-lost,p=isLost?P(t0+.25+(i-(12-lost))*.07,.25):0,a=P(t0+i*.03,.2);if(a<=0)continue;
  x.save();x.globalAlpha*=a;x.beginPath();x.arc(px,py,14,0,6.2832);x.fillStyle=p>0?'#d2c9b8':YEL;x.fill();x.strokeStyle=INK;x.lineWidth=2;x.stroke();
  if(p>0){x.strokeStyle=RED;x.lineWidth=4;x.lineCap='round';x.beginPath();x.moveTo(px-8,py-8);x.lineTo(px-8+16*p,py-8+16*p);x.stroke()}x.restore()}}
function strikeLine(px,py,w,t0){sketch([seg(px-6,py+2,px+w+6,py-4,7)],t0,.25,{col:RED,lw:5})}
function xmark(px,py,s,t0){sketch([seg(px,py,px+s,py+s,3),seg(px+s,py,px,py+s,5)],t0,.25,{col:RED,lw:8})}
// con dấu đặt trên ảnh: thêm nền giấy phía sau cho dễ đọc
function stampOn(s,px,py,p,o){if(p<=0)return;x.save();font(800,o.size);x.letterSpacing='3px';const m=x.measureText(s).width;x.restore();x.save();x.translate(px,py);x.rotate(o.rot);x.globalAlpha*=Math.min(1,p*5)*.93;x.fillStyle=CARD;x.fillRect(-m/2-18,-o.size*.95,m+36,o.size*1.35);x.restore();stamp(s,px,py,p,o)}
function lab(s,cx,y,o={}){txt(s,cx,y,{size:o.size||20,col:o.col||GREY,align:'center',ls:o.ls??1.5,a:o.a??1})}
// ô "mức phạt": nhãn, con số lớn, đơn vị
function fineBox(px,py,w,h,t0,label,num,tnum,o={},extra){box(px,py,w,h,t0,o,a=>{lab(label,w/2,54);txt(num,w/2,o.ny||184,{size:o.nsize||88,col:RED,align:'center',a:P(tnum,.2)});txt('triệu đồng',w/2,(o.ny||184)+56,{size:34,align:'center',a:P(tnum+.3,.2)});if(extra)extra(a)})}
function pointBox(px,py,w,h,t0,n){box(px,py,w,h,t0,{lw:6},a=>{lab('TRỪ ĐIỂM GIẤY PHÉP LÁI XE',w/2,54,{size:19,ls:1});txt('−'+n+' điểm',w/2,150,{size:70,col:RED,align:'center'});dots(w/2,196,n,t0+.3);txt('Mỗi giấy phép lái xe có 12 điểm',w/2,292,{size:19,w:600,col:GREY,align:'center',a:P(t0+.7,.3)})})}

function sA(t){ // mở đầu: từ khi nào, thay đổi chính
 photoCard('cam',80,170,380,390,.15,{rot:-.035});
 stamp('TỪ 15/8/2026',1060,128,P(1.0,.4),{size:30,rot:.05});
 txt('NGHỊ ĐỊNH 238/2026/NĐ-CP',522,186,{size:22,col:GREY,ls:2,a:P(2.0,.3)});
 txt('Xử phạt giao thông:',520,254,{size:58,a:P(g('k_o1a'),.25)});txt('nhiều điểm mới',520,324,{size:58,a:P(g('k_o1b'),.25)});
 underline(520,342,tw('nhiều điểm mới',58),g('k_o1b')+.35,.4);
 box(520,374,640,190,g('k_o1c'),{lw:6},a=>{txt('CÓ LỖI BỊ PHẠT TỚI',34,46,{size:21,col:GREY,ls:2});txt('26 TRIỆU ĐỒNG',34,120,{size:64,col:RED,a:P(g('k_26')-.25,.2)});txt('và trừ 6 điểm giấy phép lái xe',36,164,{size:26,a:P(g('k_o1d'),.25)})});
 source(SRC_1,P(1,.4))}
function sM(t){const t0=g('op2'),ts=g('k_sua');
 txt('CHÍNH PHỦ',640,80,{size:19,col:GREY,align:'center',ls:4,a:P(g('k_cp'),.3)});
 box(320,92,640,104,t0+.1,{lw:6},a=>{txt('NGHỊ ĐỊNH 238/2026/NĐ-CP',320,50,{size:34,align:'center'});txt('Xử phạt vi phạm giao thông đường bộ · trừ điểm, phục hồi điểm giấy phép lái xe',320,82,{size:15,w:600,col:GREY,align:'center',a:P(t0+1.6,.3)})});
 box(990,70,250,62,g('k_bh'),{lw:3},a=>{txt('BAN HÀNH',18,38,{size:13,col:GREY,ls:1});txt('26/6/2026',234,41,{size:21,align:'right'})});
 box(990,142,250,62,g('k_bh')+1.3,{lw:3},a=>{txt('HIỆU LỰC',18,38,{size:13,col:GREY,ls:1});txt('15/8/2026',234,41,{size:21,col:RED,align:'right'})});
 box(40,100,250,84,ts,{lw:3},a=>{txt('SỬA ĐỔI, BỔ SUNG',125,32,{size:15,col:GREY,align:'center',ls:1});txt('Nghị định 168/2024',125,63,{size:22,align:'center'})});
 const bx=[40,345,650,955],labs=[['Biển số xe'],['Chuyển làn'],['Chở trẻ em','trên ô tô'],['Chở khách','có thu tiền']],ph=['plate','highway','seat','ride'];
 for(let i=0;i<4;i++){const ti=ts+1.3+i*.7;arrow(540+i*67,202,bx[i]+142,258,ti,.2);
  box(bx[i],264,285,206,ti+.18,{},a=>{photo(ph[i],10,10,265,90);badge(i+1,36,146,ti+.25,19);if(labs[i][1]){txt(labs[i][0],66,138,{size:23});txt(labs[i][1],66,168,{size:23})}else txt(labs[i][0],66,154,{size:24})})}
 const te=g('k_bon')+.9;arrow(640,474,640,498,te,.15);box(390,504,500,80,te+.12,{col:GREEN,lw:5},a=>{txt('BẠN NÊN LÀM GÌ?',250,53,{size:32,col:GREEN,align:'center'})});
 source(SRC_M,1)}
function sS1(t){const t0=g('a1');title(1,'BIỂN SỐ XE',t0,{sub:'Hành vi mới được bổ sung vào quy định xử phạt'});
 const y=186,h=330;
 box(50,y,350,h,g('k_a1b')-.1,{},a=>{photo('plate',14,14,322,128);lab('HÀNH VI MỚI',175,176);txt('Dùng vật liệu, thiết bị',175,212,{size:23,align:'center',a:P(g('k_a1c'),.2)});
  txt('làm thay đổi khả năng',175,244,{size:23,align:'center',a:P(g('k_a1d'),.2)});txt('nhận diện biển số',175,276,{size:23,align:'center',a:P(g('k_a1d')+.8,.2)});txt('của camera',175,308,{size:23,align:'center',a:P(g('k_a1e'),.2)})});
 arrow(408,y+h/2,460,y+h/2,g('a2')-.1,.2);
 box(468,y,350,h,g('a2')+.15,{},a=>{lab('NGHĨA LÀ',175,54);
  check(34,86,40,g('k_a2a'),.25);txt('Mắt thường',96,106,{size:25,a:P(g('k_a2a'),.2)});txt('vẫn đọc được biển số',96,136,{size:20,w:600,a:P(g('k_a2a')+.5,.2)});
  xmark(38,170,32,g('k_a2b'));txt('Camera',96,188,{size:25,a:P(g('k_a2b'),.2)});txt('khó nhận diện',96,218,{size:20,w:600,a:P(g('k_a2b')+.5,.2)});
  const p=P(g('k_a2c'),.25);if(p>0){x.save();x.globalAlpha*=p;x.fillStyle=RED;rr(30,252,290,52,8);x.fill();x.restore();txt('VẪN BỊ PHẠT',175,288,{size:28,col:'#fff',align:'center',a:p})}});
 arrow(826,y+h/2,878,y+h/2,g('a3')-.05,.2);
 box(886,y,350,h,g('a3')+.15,{lw:6},a=>{lab('MỨC PHẠT VỚI Ô TÔ',175,50);txt('20 – 26',175,128,{size:70,col:RED,align:'center',a:P(g('k_a3a'),.2)});txt('triệu đồng',175,166,{size:28,align:'center',a:P(g('k_a3a')+.35,.2)});
  txt('−6 điểm',175,232,{size:46,col:RED,align:'center',a:P(g('k_a3b'),.2)});txt('giấy phép lái xe',175,258,{size:18,w:600,col:GREY,align:'center',a:P(g('k_a3b')+.3,.2)});
  txt('Xe máy: cũng bị phạt, mức thấp hơn',175,304,{size:17,w:600,align:'center',a:P(g('k_a3c'),.25)})});
 txt('Căn cứ: Điều 13 và Điều 14 Nghị định 168/2024 (đã được sửa đổi, bổ sung)',640,556,{size:18,w:600,col:GREY,align:'center',a:P(g('k_a3c')+1.2,.3)});
 source(SRC_1,1)}
function sS2(t){const t0=g('b1');title(2,'CHUYỂN LÀN',t0,{sub:'Lỗi mới được bổ sung vào quy định xử phạt'});
 const y=186,h=330;
 box(50,y,350,h,g('k_b1b')-.1,{},a=>{photo('highway',14,14,322,128);lab('LỖI MỚI',175,176);txt('Chuyển làn',175,216,{size:25,align:'center',a:P(g('k_b1b')+.7,.2)});
  txt('không bảo đảm',175,252,{size:25,align:'center',a:P(g('k_b1c'),.2)});txt('khoảng cách an toàn',175,288,{size:25,align:'center',a:P(g('k_b1c')+.8,.2)})});
 arrow(408,y+h/2,460,y+h/2,g('k_b1d')-.35,.2);
 box(468,y,350,h,g('k_b1d')-.2,{},a=>{lab('KHOẢNG CÁCH AN TOÀN VỚI',175,54,{size:19,ls:1});
  [['Xe phía trước',g('k_b1d')],['Xe phía sau',g('k_b1e')],['Xe hai bên',g('k_b1f')]].forEach(([s,ti],i)=>{const p=P(ti,.22);if(p<=0)return;const yy=84+i*76;x.save();x.globalAlpha*=p;x.strokeStyle=INK;x.lineWidth=2.5;x.fillStyle='#f3ead6';rr(40,yy,270,58,10);x.fill();x.stroke();x.restore();txt(s,175,yy+38,{size:25,align:'center',a:p})})});
 arrow(826,y+h/2,878,y+h/2,g('b2')-.05,.2);
 box(886,y,350,h,g('b2')+.15,{lw:6},a=>{lab('TRÊN ĐƯỜNG CAO TỐC · Ô TÔ',175,50,{size:19,ls:1});txt('Phạt tiền',175,90,{size:22,w:600,align:'center',a:P(g('k_b2a'),.2)});
  txt('4 – 6',175,170,{size:84,col:RED,align:'center',a:P(g('k_b2b'),.2)});txt('triệu đồng',175,206,{size:28,align:'center',a:P(g('k_b2b')+.3,.2)});
  txt('−2 điểm',175,268,{size:44,col:RED,align:'center',a:P(g('k_b2c'),.2)});txt('giấy phép lái xe',175,296,{size:18,w:600,col:GREY,align:'center',a:P(g('k_b2c')+.3,.2)})});
 source(SRC_2,1)}
function row(y,h,label,t0,fn,o={}){arrow(328,345,392,y+h/2,t0-.05,.2);box(400,y,830,h,t0+.13,o,a=>{txt(label,28,38,{size:19,col:GREY,ls:2});fn(a)})}
function sS3(t){const t0=g('c1');title(3,'CHỞ TRẺ EM TRÊN Ô TÔ',t0,{sub:'Không áp dụng với xe kinh doanh vận tải hành khách'});
 box(50,200,270,290,g('k_c1')+.2,{lw:6},a=>{photo('seat',14,14,242,150);lab('ÁP DỤNG VỚI TRẺ',135,196,{size:18,a:P(g('k_c1')+1.4,.25)});txt('Dưới 10 tuổi',135,232,{size:26,align:'center',a:P(g('k_c1a'),.2)});txt('và cao dưới 1,35 m',135,266,{size:24,align:'center',a:P(g('k_c1b'),.2)})});
 row(196,140,'KHÔNG DÙNG THIẾT BỊ AN TOÀN PHÙ HỢP',g('c2'),a=>{txt('Phạt cảnh cáo',28,104,{size:52,col:RED,a:P(g('k_c2a'),.2)});
  const s2='800.000 – 1.000.000 đồng';txt('Trước đó:',450,76,{size:19,w:600,col:GREY,a:P(g('k_c2b'),.25)});txt(s2,450,108,{size:22,col:GREY,a:P(g('k_c2c')-.2,.25)});strikeLine(450,101,tw(s2,22),g('k_c2c')+.9)});
 row(356,140,'CHO TRẺ NGỒI CÙNG HÀNG GHẾ VỚI NGƯỜI LÁI',g('c3'),a=>{txt('800.000 – 1.000.000 đồng',28,96,{size:44,col:RED,a:P(g('k_c3b')-.15,.2)});txt('(trừ xe chỉ có một hàng ghế)',28,126,{size:18,w:600,col:GREY,a:P(g('k_c3c'),.25)});
  txt('Mức phạt giữ nguyên',802,38,{size:19,w:600,col:RED,align:'right',a:P(g('k_c3a'),.25)})},{lw:6});
 source(SRC_3,1)}
function sS4(t){const t0=g('d1');title(4,'CHỞ KHÁCH CÓ THU TIỀN',t0,{sub:'Xe ô tô không kinh doanh vận tải hành khách'});
 const y=186,h=330;
 box(50,y,350,h,g('k_d1')-.1,{},a=>{photo('ride',14,14,322,128);lab('HÀNH VI',175,176);txt('Xe không kinh doanh',175,216,{size:25,align:'center',a:P(g('k_d1')+.2,.2)});
  txt('vận tải, nhưng chở khách',175,252,{size:25,align:'center',a:P(g('k_d1b'),.2)});txt('có thu tiền',175,288,{size:25,align:'center',a:P(g('k_d1b')+.8,.2)})});
 arrow(408,y+h/2,460,y+h/2,g('k_d1c')-.2,.2);
 fineBox(468,y,350,h,g('k_d1c'),'PHẠT TIỀN NGƯỜI LÁI','12 – 14',g('k_d1d'),{nsize:76});
 arrow(826,y+h/2,878,y+h/2,g('k_d1e')-.3,.2);
 pointBox(886,y,350,h,g('k_d1e'),6);
 source(SRC_4,1)}
function prow(y,h,label,t0,fn,o={}){arrow(398,358,432,y+h/2,t0-.05,.18);box(440,y,790,h,t0+.12,o,a=>{txt(label,26,36,{size:18,col:GREY,ls:2});fn(a)})}
function sS5(t){const t0=g('e1');title(null,'ĐIỂM GIẤY PHÉP LÁI XE',t0,{sub:'Luật Trật tự, an toàn giao thông đường bộ 2024, Điều 58'});
 box(50,186,340,344,g('k_e1a'),{lw:6},a=>{lab('MỖI GIẤY PHÉP LÁI XE CÓ',170,56,{size:19,ls:1});txt('12 điểm',170,150,{size:76,align:'center',a:P(g('k_e1a')+.8,.2)});dots(170,214,0,g('k_e1a')+1.2)});
 prow(186,100,'CHƯA BỊ TRỪ HẾT ĐIỂM',g('k_e1b'),a=>{const s='12 tháng không bị trừ thêm';txt(s,26,78,{size:27,a:P(g('k_e1c'),.2)});txt('→ phục hồi đủ 12 điểm',26+tw(s,27)+18,78,{size:27,col:GREEN,a:P(g('k_e1d'),.2)})});
 prow(300,150,'BỊ TRỪ HẾT ĐIỂM',g('e2'),a=>{txt('Không được lái xe theo giấy phép đó',26,76,{size:27,col:RED,a:P(g('k_e2a'),.2)});
  const s='Sau ít nhất 6 tháng: ';txt(s,26,110,{size:22,a:P(g('k_e2b'),.2)});txt('kiểm tra lại kiến thức pháp luật',26+tw(s,22),110,{size:22,a:P(g('k_e2c'),.2)});
  txt('Đạt yêu cầu → phục hồi đủ 12 điểm',26,138,{size:22,col:GREEN,a:P(g('k_e2d'),.2)})});
 prow(464,100,'NGHỊ ĐỊNH 238/2026 NÊU RÕ',g('e3'),a=>{const s='Không trừ điểm ';txt(s,26,78,{size:25,col:RED,a:P(g('k_e3a'),.2)});txt('khi giấy phép đang bị tước quyền sử dụng',26+tw(s,25),78,{size:25,a:P(g('k_e3b'),.2)})},{lw:6});
 source(SRC_5,1)}
function sS6(t){const t0=g('f1');title(null,'ĐIỀU KHÔNG ĐỔI',t0,{hand:false});
 photoCard('beer',150,172,430,270,t0+.2,{rot:-.02});txt('Mức phạt nồng độ cồn',365,498,{size:30,align:'center',a:P(t0+.35,.25)});
 photoCard('redlight',700,172,430,270,t0+.5,{rot:.02});txt('Mức phạt vượt đèn đỏ',915,498,{size:30,align:'center',a:P(t0+.65,.25)});
 stampOn('GIỮ NGUYÊN',365,310,P(g('k_f1a'),.4),{size:50,rot:-.1});stampOn('GIỮ NGUYÊN',915,310,P(g('k_f1a')+.5,.4),{size:50,rot:.08});
 txt('Nghị định 238/2026 không thay đổi mức phạt với hai lỗi này.',640,560,{size:25,w:600,f:'LoraV',align:'center',a:P(g('k_f1b'),.3)});
 source(SRC_6,1)}
function sE(t){const t0=g('g1');const s0='BẠN NÊN LÀM GÌ?',m=tw(s0,48);txt(s0,640,122,{size:48,col:GREEN,align:'center',a:P(t0,.2)});underline(640-m/2,136,m,t0+.25,.35,{col:GREEN});
 // mỗi mục: [lúc hiện ô, dòng 1 gồm các cụm [lúc hiện, chữ], dòng 2 gồm các cụm [lúc hiện, chữ]] (cùng bố cục với vxTodo, chữ hiện dần theo lời đọc)
 const it=[[g('k_g1'),[[g('k_g1'),'Giữ biển số '],[g('k_g1a'),'sạch và rõ:']],[[g('k_g1b'),'không che, không dán, '],[g('k_g1c'),'không phủ thêm vật liệu']]],
  [g('g2'),[[g('g2'),'Trước khi chuyển làn: '],[g('k_g2a'),'bật xi nhan, quan sát gương,']],[[g('k_g2b'),'giữ đủ khoảng cách']]],
  [g('g3'),[[g('g3'),'Cho trẻ ngồi '],[g('k_g3a'),'hàng ghế sau,']],[[g('k_g3b'),'với thiết bị '],[g('k_g3c'),'an toàn phù hợp']]],
  [g('g4'),[[g('g4'),'Không dùng '],[g('k_g4a'),'xe không kinh doanh vận tải']],[[g('k_g4b'),'để chở khách thu tiền']]]];
 it.forEach(([ti,l1,l2],i)=>{const y=172+i*108,h=96;box(170,y,940,h,ti,{col:GREEN},a=>{check(36,h/2-25,50,ti+.25,.25);let px=130;l1.forEach(([tt,s])=>{txt(s,px,h/2-8,{size:26,a:P(tt,.2)});px+=tw(s,26)});px=130;l2.forEach(([tt,s])=>{txt(s,px,h/2+24,{size:26,a:P(tt,.2)});px+=tw(s,26)})})});
 source('Gợi ý chung, không thay cho tư vấn pháp lý.',1)}
function sF(t){vxDisclaimer(g('out'),'Nghị định 238/2026/NĐ-CP · ban hành 26/6/2026 · hiệu lực 15/8/2026','Sửa đổi, bổ sung Nghị định 168/2024/NĐ-CP',g('k_src'),SRC_M+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Nghị định 238/2026/NĐ-CP  ·  ban hành 26/6/2026  ·  hiệu lực 15/8/2026',
 images:{cam:'img/cam.jpg',plate:'img/plate.jpg',highway:'img/highway.jpg',seat:'img/seat.jpg',ride:'img/ride.jpg',beer:'img/beer.jpg',redlight:'img/redlight.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('a1')-.15,sS1],[()=>g('b1')-.15,sS2],[()=>g('c1')-.15,sS3],[()=>g('d1')-.15,sS4],[()=>g('e1')-.15,sS5],[()=>g('f1')-.15,sS6],[()=>g('g1')-.15,sE],[()=>g('out')-.15,sF]]});
