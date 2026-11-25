// Tập: Luật sửa đổi 3 luật thuế, MỘT vấn đề: hộ, cá nhân kinh doanh doanh thu trên 1 tỷ đến 10 tỷ đồng/năm được chọn cách tính thuế.
// Giọng nghiêm túc, không đùa (chủ kênh chốt 25/11/2026). Mỗi cảnh là một "slide sơ đồ". Hàm riêng của tập viết ở đây, không sửa khung chung.
const SRC1='Nguồn: Cổng TTĐT Chính phủ, Báo Nhân Dân, Đại biểu Nhân dân, VOV (20/11/2026)';
const SRC2='Nguồn: Nhân Dân, Tuổi Trẻ, Thanh Niên, Dân trí (20–21/11/2026). Chờ đối chiếu văn bản chính thức.';
// ô nhỏ nền trắng trong công thức
function chip(px,py,w,h,s,t0,o={}){box(px,py,w,h,t0,{lw:3,r:10,fill:'#fff',...o},()=>txt(s,w/2,h/2+9,{size:o.size||24,align:'center',col:o.tc||INK}))}
function op(s,px,py,t0){txt(s,px,py+4,{size:s==='='?38:46,col:INK,align:'center',a:P(t0,.2)})}
// ảnh nếu có, không thì biểu tượng bút dạ
function pic(key,name,px,py,w,h,t0){if(IMG[key]){photo(key,px,py,w,h);return}const s=Math.min(w,h);icon(name,px+(w-s)/2,py+(h-s)/2,s,t0,.5)}

function sA(t){photoCard('pho',70,150,360,360,.15,{rot:-.03});stamp('TỪ NĂM 2027',1075,112,P(.75,.4),{size:26,rot:.04});
 txt('Hộ kinh doanh',480,186,{size:56,a:P(g('k_ho')-.15,.25)});const s2='doanh thu đến 10 tỷ đồng/năm';txt(s2,480,250,{size:42,a:P(g('k_10')-.15,.25)});underline(480,266,tw(s2,42),g('k_10')+.25,.35);
 box(480,296,720,142,g('k_chon')-.05,{lw:6},a=>{txt('TỪ NĂM 2027',30,46,{size:22,col:GREY,ls:3});txt('ĐƯỢC CHỌN CÁCH TÍNH THUẾ',28,110,{size:42,col:RED})});
 const tl=g('op2')+.05;arrow(840,442,840,462,tl,.15);
 box(480,468,720,112,tl+.15,{},a=>{photo('gavel',10,10,150,92);const l0='ĐIỂM MỚI CỦA';txt(l0,180,42,{size:19,col:GREY,ls:2});txt('·  QUỐC HỘI VỪA THÔNG QUA',180+tw(l0,19,800,'BVP',2)+12,42,{size:19,col:RED,ls:2,a:P(g('k_qh'),.25)});txt('Luật sửa đổi 3 luật thuế',180,88,{size:36,a:P(g('k_luat')-.1,.2)})});
 source(SRC2,P(.6,.4))}
function sB(t){const t0=g('s1');title(1,'KHI NÀO ÁP DỤNG?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_tq')-.1,{},a=>{photo('gavel',14,14,322,140);txt('QUỐC HỘI THÔNG QUA',175,196,{size:21,col:GREY,align:'center',ls:1});txt('20/11/2026',175,254,{size:46,align:'center',a:P(g('k_ngay'),.2)});txt('Luật sửa đổi 3 luật thuế',175,296,{size:21,w:600,col:GREY,align:'center',a:P(g('k_ngay')+1.5,.25)})});
 arrow(408,y+h/2,460,y+h/2,g('k_phieu')-.3,.2);
 box(468,y,350,h,g('k_phieu'),{},a=>{txt('PHIẾU TÁN THÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('475',175,196,{size:120,align:'center'});txt('trên 477 đại biểu',175,250,{size:25,w:600,align:'center',a:P(g('k_477'),.2)});txt('tham gia biểu quyết',175,284,{size:25,w:600,align:'center',a:P(g('k_tt'),.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.25,.5);txt('01/01/2027',175,270,{size:52,col:RED,align:'center',a:P(g('k_hl2'),.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl2')+1.0,.3)});
 source(SRC1,1)}
function sC(t){const t0=g('s2');title(2,'AI ĐƯỢC CHỌN?',t0,{sub:'Xét theo doanh thu một năm của hộ, cá nhân kinh doanh'});
 const AY=392,X1=330,X3=610,X10=1070;
 // trục doanh thu
 sketch([seg(80,AY,1200,AY,1),seg(1184,AY-10,1200,AY,2),seg(1200,AY,1184,AY+10,3)],t0+.45,.5);txt('DOANH THU / NĂM',80,AY+38,{size:16,col:GREY,ls:2,a:P(t0+.8,.3)});
 const tick=(X,s,t1,col=INK)=>{sketch([seg(X,AY-13,X,AY+13,X)],t1,.12,{lw:5,pen:false,hand:false});txt(s,X,AY+44,{size:28,align:'center',col,a:P(t1+.05,.2)})};
 tick(X1,'1 tỷ',g('k_1ty'));tick(X10,'10 tỷ',g('k_10ty'),RED);tick(X3,'3 tỷ',g('k_3ty')-.15,GREY);
 // nhóm được chọn
 box(340,186,720,170,g('k_hca')-.1,{lw:6},a=>{txt('DOANH THU TRÊN 1 TỶ ĐẾN 10 TỶ ĐỒNG / NĂM',28,40,{size:19,col:GREY,ls:2,a:P(g('k_1ty'),.25)});txt('ĐƯỢC CHỌN CÁCH TÍNH THUẾ',28,98,{size:42,col:RED});txt('Hộ và cá nhân kinh doanh',28,140,{size:25,w:600,a:P(g('k_hca')+1.0,.2)})});
 sketch([seg(346,360,X1+2,AY-16,5)],g('k_1ty')+.15,.15,{col:RED,lw:4,hand:false});sketch([seg(1054,360,X10-2,AY-16,6)],g('k_10ty')+.15,.15,{col:RED,lw:4,hand:false});
 // trước đây và luật mới
 const tp=g('k_truoc');sketch([seg(X1+4,470,X3-4,470,7),seg(X1+4,460,X1+4,480,8),seg(X3-4,460,X3-4,480,9)],tp,.3,{col:GREY,lw:4});txt('Trước đây: chỉ đến 3 tỷ đồng',(X1+X3)/2,508,{size:22,col:GREY,align:'center',a:P(tp+.3,.25)});
 const tn=g('k_3ty')+.7;sketch([seg(X3+4,470,X10-4,470,10),seg(X10-4,460,X10-4,480,11)],tn,.3,{col:RED,lw:4});txt('Luật mới: nâng lên 10 tỷ đồng',(X3+X10)/2,508,{size:24,col:RED,align:'center',a:P(tn+.3,.25)});
 // nhóm đến 1 tỷ (quy định đã có)
 const ta=g('k_d1')-.25;box(80,186,236,170,ta,{col:GREEN},a=>{txt('ĐẾN 1 TỶ ĐỒNG / NĂM',118,38,{size:16,col:GREY,align:'center',ls:1});txt('Không phải',118,88,{size:29,col:GREEN,align:'center',a:P(g('k_knop'),.2)});txt('nộp thuế',118,124,{size:29,col:GREEN,align:'center',a:P(g('k_knop'),.2)});txt('Nghị định 141/2026',118,154,{size:16,w:600,col:GREY,align:'center',a:P(g('k_nd')+1.0,.25)})});
 sketch([seg(84,470,X1-4,470,12),seg(X1-4,460,X1-4,480,13)],ta+.3,.25,{col:GREEN,lw:4});
 const n1='Ngưỡng 1 tỷ đồng là quy định đã có (Nghị định 141/2026), ';txt(n1,80,556,{size:17,w:600,col:GREY,a:P(g('k_nd'),.3)});txt('không thuộc luật mới.',80+tw(n1,17,600),556,{size:17,w:600,col:GREY,a:P(g('k_nd')+2.1,.3)});
 source(SRC2+' Ngưỡng 1 tỷ: Nghị định 141/2026/NĐ-CP.',1)}
function sD(t){const t0=g('s3');title(3,'HAI CÁCH TÍNH THUẾ',t0);
 const y=166,h=310,t1=g('k_c1')-.1,t2=g('s4')-.05;
 box(60,y,530,h,t1,{},a=>{badge(1,46,46,t1+.1,22);txt('THEO TỶ LỆ % TRÊN DOANH THU',82,55,{size:24,a:P(g('k_c1a')-.1,.2)});
  const tf=g('k_c1a')+.9;chip(28,96,176,60,'Doanh thu',tf);op('×',224,137,tf+.3);chip(244,96,140,60,'Tỷ lệ %',tf+.4);op('=',404,137,tf+.7);chip(424,96,88,60,'Thuế',tf+.8,{tc:RED});
  txt('•  Thuế tính thẳng trên doanh thu',28,216,{size:24,a:P(g('k_c1b')+.3,.2)});txt('•  Không trừ chi phí',28,262,{size:24,col:RED,a:P(g('k_c1c'),.2)})});
 txt('HOẶC',640,y+h/2+8,{size:20,col:GREY,align:'center',ls:2,a:P(t2,.25)});
 box(690,y,530,h,t2+.05,{},a=>{badge(2,46,46,t2+.15,22);txt('THEO THU NHẬP',82,55,{size:24,a:P(g('k_c2a')-.1,.2)});
  const tf=g('k_c2b')-.15;chip(28,96,150,60,'Doanh thu',tf);op('−',195,137,tf+.1);chip(212,96,124,60,'Chi phí',tf+.15);op('=',353,137,tf+.25);chip(370,96,142,60,'Thu nhập',tf+.3,{tc:RED});
  txt('•  Lấy doanh thu trừ chi phí',28,216,{size:24,a:P(g('k_c2b')+.5,.2)});txt('•  Cần sổ sách, hóa đơn, chứng từ',28,262,{size:24,col:RED,a:P(g('k_c2c'),.2)})});
 txt('Tỷ lệ % và thuế suất cụ thể: xem văn bản luật và nghị định hướng dẫn.',640,524,{size:19,w:600,col:GREY,align:'center',a:P(g('k_c2c')+1.3,.3)});
 source(SRC2,1)}
function sT(t){const t0=g('s5');title(4,'TỪ KHI NÀO? LƯU Ý GÌ?',t0);
 const y=176,h=320,tk=g('k_ky')-.35,tu=g('k_luuy')-.1;
 box(90,y,520,h,tk,{},a=>{txt('ÁP DỤNG TỪ',260,54,{size:21,col:GREY,align:'center',ls:2});pic('ledger','calendar',40,70,440,120,tk+.2);txt('Kỳ tính thuế',260,236,{size:30,w:600,align:'center',a:P(g('k_ky'),.2)});txt('năm 2027',260,290,{size:50,col:RED,align:'center',a:P(g('k_ky')+.5,.2)})});
 box(670,y,520,h,tu,{lw:6},a=>{txt('LƯU Ý',260,54,{size:22,col:RED,align:'center',ls:3});txt('Đây là quyền chọn',260,128,{size:36,align:'center',a:P(g('k_quyen')-.1,.2)});txt('cách tính thuế,',260,174,{size:36,align:'center',a:P(g('k_quyen')+.3,.2)});
  const s='không phải miễn thuế',m=tw(s,36);txt(s,260,244,{size:36,col:RED,align:'center',a:P(g('k_km')-.1,.2)});underline(260-m/2,258,m,g('k_km')+.4,.3)});
 source(SRC2,1)}
function sE(t){const t0=g('e1');const m=tw('BẠN NÊN LÀM GÌ?',48);txt('BẠN NÊN LÀM GÌ?',640,122,{size:48,col:GREEN,align:'center',a:P(t0,.2)});underline(640-m/2,136,m,t0+.25,.35,{col:GREEN});
 const rowE=(i,ti,fn)=>{const y=172+i*138;box(170,y,940,122,ti,{col:GREEN},a=>{check(36,36,54,ti+.25,.25);fn()})};
 rowE(0,g('k_e1'),()=>{txt('Cộng doanh thu cả năm,',130,54,{size:30});txt('để biết mình thuộc nhóm nào',130,94,{size:30,a:P(g('k_e1b'),.2)})});
 rowE(1,g('e2'),()=>{txt('Tính thử cả hai cách,',130,54,{size:30});txt('rồi chọn cách phù hợp',130,94,{size:30,a:P(g('k_e2b'),.2)})});
 rowE(2,g('e3'),()=>{const a1='Giữ đủ hóa đơn, ',b1='Theo dõi nghị định, ',c1='hỏi cơ quan thuế ';txt(a1,130,54,{size:30});txt('chứng từ',130+tw(a1,30),54,{size:30,a:P(g('k_ct'),.2)});
  txt(b1,130,94,{size:30,a:P(g('k_e3b'),.2)});txt(c1,130+tw(b1,30),94,{size:30,a:P(g('k_e3c'),.2)});txt('nơi đăng ký',130+tw(b1+c1,30),94,{size:30,a:P(g('k_e3c')+1.1,.2)})});
 source('Gợi ý chung, không thay cho tư vấn pháp lý.',1)}
function sF(t){const t0=g('out');box(240,140,800,380,t0,{lw:6},a=>{txt('LƯU Ý',400,70,{size:30,col:RED,align:'center',ls:4});
 txt('Nội dung chỉ mang tính thông tin,',400,138,{size:36,w:600,f:'LoraV',align:'center'});txt('không phải tư vấn pháp lý.',400,186,{size:36,w:600,f:'LoraV',align:'center',a:P(g('k_kp')-.1,.2)});
 const p2=P(g('k_kp')+.9,.3);txt('Luật sửa đổi 3 luật thuế · thông qua 20/11/2026 · hiệu lực 01/01/2027',400,250,{size:19,w:600,align:'center',a:p2});txt('Số hiệu luật: chờ công bố chính thức',400,280,{size:19,w:600,col:GREY,align:'center',a:p2});
 txt('Kiểm tra văn bản gốc: vbpl.vn · thuvienphapluat.vn',400,330,{size:22,w:600,col:BLUE,align:'center',a:P(g('k_src'),.3)})});
 source(SRC1+'  ·  Ảnh minh họa: Unsplash',1)}
defineEpisode({header:'Luật sửa đổi 3 luật thuế  ·  thông qua 20/11/2026  ·  hiệu lực 01/01/2027',
 images:{pho:'img/pho.jpg',gavel:'img/gavel.jpg'},
 scenes:[[0,sA],[()=>g('s1')-.15,sB],[()=>g('s2')-.15,sC],[()=>g('s3')-.15,sD],[()=>g('s5')-.15,sT],[()=>g('e1')-.15,sE],[()=>g('out')-.15,sF]]});
