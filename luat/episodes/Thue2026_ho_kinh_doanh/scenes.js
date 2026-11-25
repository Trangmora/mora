// Tập: Luật sửa đổi 3 luật thuế. MỘT vấn đề: hộ, cá nhân kinh doanh doanh thu trên 1 tỷ đến 10 tỷ đồng/năm được chọn cách tính thuế
// (ngưỡng nâng từ 3 tỷ lên 10 tỷ). Bản dài hơn 2 phút, giọng nghiêm túc, giải thích kỹ (chủ kênh chốt 25/11/2026).
// Mỗi cảnh là một "slide sơ đồ". Hàm riêng của tập viết ở đây, không sửa khung chung.
const SRC1='Nguồn: Cổng TTĐT Chính phủ, Báo Nhân Dân, Đại biểu Nhân dân, VOV (20/11/2026)';
const SRC2='Nguồn: Nhân Dân, Tuổi Trẻ, Thanh Niên, Dân trí (20–21/11/2026). Chờ đối chiếu văn bản chính thức.';
const SRCC='Nguồn: Nghị định 68/2026/NĐ-CP và Nghị định 141/2026/NĐ-CP (theo LuatVietnam, Thanh Niên, Cổng TTĐT Chính phủ). Chờ đối chiếu văn bản.';
const SRCW='Nguồn: Thanh Niên, Dân trí, Tiền Phong (21–24/11/2026). Nguyên tắc chung, không phải lời khuyên cho trường hợp cụ thể.';
const SRCT='Nguồn: Thanh Niên, Tiền Phong, Tuổi Trẻ (20–23/11/2026); Nghị định 68/2026/NĐ-CP. Chờ văn bản hướng dẫn.';
function chip(px,py,w,h,s,t0,o={}){box(px,py,w,h,t0,{lw:3,r:10,fill:'#fff',...o},()=>txt(s,w/2,h/2+9,{size:o.size||24,align:'center',col:o.tc||INK}))}
function op(s,px,py,t0){txt(s,px,py+4,{size:s==='='?38:46,col:INK,align:'center',a:P(t0,.2)})}
function pic(key,name,px,py,w,h,t0){if(IMG[key]){photo(key,px,py,w,h);return}const s=Math.min(w,h);icon(name,px+(w-s)/2,py+(h-s)/2,s,t0,.5)}
function strikeS(px,py,w,t0){return sketch([seg(px-6,py+4,px+w+6,py-5,px+2)],t0,.25,{col:RED,lw:6})}
function axis(AY,t0){sketch([seg(80,AY,1200,AY,1),seg(1184,AY-10,1200,AY,2),seg(1200,AY,1184,AY+10,3)],t0,.5);txt('DOANH THU / NĂM',1178,AY-14,{size:15,col:GREY,ls:2,align:'right',a:P(t0+.4,.3)})}
function tick(X,AY,s,t1,col=INK){sketch([seg(X,AY-13,X,AY+13,X)],t1,.12,{lw:5,hand:false});txt(s,X,AY+44,{size:28,align:'center',col,a:P(t1+.05,.2)})}
function brk(xa,xb,y,t0,col){sketch([seg(xa,y,xb,y,xa),seg(xa,y-9,xa,y+9,xa+1),seg(xb,y-9,xb,y+9,xb+1)],t0,.3,{col,lw:4})}
// các phần chữ nối tiếp nhau trên một dòng, mỗi phần hiện ở một mốc: parts=[[chữ, t0, màu?],...]
function seq(px,py,size,parts,o={}){let xx=px;for(const [s,t0,col] of parts){txt(s,xx,py,{size,col:col||INK,w:o.w||800,a:P(t0,.2)});xx+=tw(s,size,o.w||800)}}

function sA(t){photoCard('pho',70,140,360,340,.15,{rot:-.03});photoCard('shop',36,372,240,168,1.35,{rot:.045});stamp('TỪ NĂM 2027',1075,112,P(.75,.4),{size:26,rot:.04});
 txt('Hộ kinh doanh',480,186,{size:56,a:P(g('k_ho')-.15,.25)});const s2='doanh thu đến 10 tỷ đồng/năm';txt(s2,480,250,{size:42,a:P(g('k_10')-.15,.25)});underline(480,266,tw(s2,42),g('k_10')+.25,.35);
 box(480,296,720,142,g('k_chon')-.05,{lw:6},a=>{txt('TỪ NĂM 2027',30,46,{size:22,col:GREY,ls:3});txt('ĐƯỢC CHỌN CÁCH TÍNH THUẾ',28,110,{size:42,col:RED})});
 const tb=g('k_truoc0')-.1;box(480,462,720,116,tb,{},a=>{txt('NGƯỠNG DOANH THU ĐƯỢC CHỌN',30,40,{size:19,col:GREY,ls:2});const s0='3 tỷ đồng',w0=tw(s0,40);txt(s0,30,92,{size:40,col:GREY,a:P(g('k_3ty0')-.25,.2)});strikeS(30,78,w0,g('k_3ty0')+.2);
  txt('→   10 tỷ đồng / năm',30+w0+30,92,{size:40,col:RED,a:P(g('k_3ty0')+.4,.2)})});
 source(SRC2,P(.6,.4))}
function sB(t){const t0=g('s1');title(1,'VĂN BẢN NÀO? KHI NÀO?',t0);
 const y=176,h=330,ta=g('k_luat')-.3;
 box(50,y,350,h,ta,{},a=>{photo('gavel',14,14,322,128);txt('VĂN BẢN',175,182,{size:21,col:GREY,align:'center',ls:2});txt('Luật sửa đổi',175,226,{size:32,align:'center',a:P(g('k_luat'),.2)});txt('3 luật thuế',175,266,{size:32,align:'center',a:P(g('k_luat')+.3,.2)});
  txt('Thuế TNDN · Thuế TNCN ·',175,294,{size:15,w:600,col:GREY,align:'center',a:P(g('k_luat')+.7,.25)});txt('Thuế sử dụng đất phi nông nghiệp',175,314,{size:15,w:600,col:GREY,align:'center',a:P(g('k_luat')+.7,.25)})});
 arrow(408,y+h/2,460,y+h/2,g('k_tq')-.3,.2);
 box(468,y,350,h,g('k_tq'),{},a=>{txt('QUỐC HỘI THÔNG QUA',175,50,{size:21,col:GREY,align:'center',ls:1});txt('20/11/2026',175,106,{size:46,align:'center',a:P(g('k_ngay'),.2)});txt('Kỳ họp thứ 2, Quốc hội khóa XVI',175,138,{size:17,w:600,col:GREY,align:'center',a:P(g('k_ngay')+1.5,.25)});
  txt('475',175,238,{size:96,align:'center',a:P(g('k_phieu'),.2)});txt('trên 477 đại biểu',175,276,{size:23,w:600,align:'center',a:P(g('k_477'),.2)});txt('biểu quyết tán thành',175,306,{size:23,w:600,align:'center',a:P(g('k_tt'),.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.25,.5);txt('01/01/2027',175,270,{size:52,col:RED,align:'center',a:P(g('k_hl2'),.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl2')+1.2,.3)});
 source(SRC1,1)}
function grp(n,px,w,t0,tl,rev,o,fn){box(px,196,w,214,t0,o,a=>{badge(n,36,36,t0+.1,19);txt('NHÓM '+n,64,44,{size:20,col:GREY,ls:2,a:P(tl,.2)});txt(rev,22,84,{size:23,a:P(tl+.45,.2)});fn(a)})}
function sC(t){const t0=g('c0');title(2,'HIỆN NAY: 3 NHÓM THEO DOANH THU',t0,{size:40,sub:'Quy định đang áp dụng năm 2026, xét về cách tính thuế của hộ, cá nhân kinh doanh'});
 const AY=446,X1=440,X3=820,tn=g('k_3nhom');axis(AY,g('k_ve'));
 grp(1,80,340,tn,g('c1')+.1,'Doanh thu đến 1 tỷ đồng',{col:GREEN},a=>{txt('Không phải nộp thuế',22,134,{size:29,col:GREEN,a:P(g('k_g1b'),.2)});txt('Nghị định 141/2026/NĐ-CP',22,166,{size:17,w:600,col:GREY,a:P(g('k_g1c'),.25)});txt('(áp dụng từ 01/01/2026)',22,190,{size:17,w:600,col:GREY,a:P(g('k_g1c')+1.6,.25)})});
 grp(2,460,340,tn+.3,g('c2')+.1,'Trên 1 tỷ đến 3 tỷ đồng',{},a=>{txt('Được chọn',22,124,{size:29,a:P(g('k_g2b'),.2)});txt('1 trong 2 cách tính thuế',22,156,{size:25,a:P(g('k_g2b')+.5,.2)});txt('(theo tỷ lệ % trên doanh thu,',22,182,{size:15,w:600,col:GREY,a:P(g('k_g2b')+1.1,.25)});txt('hoặc theo thu nhập)',22,201,{size:15,w:600,col:GREY,a:P(g('k_g2b')+1.1,.25)})});
 grp(3,840,360,tn+.6,g('c3')+.1,'Trên 3 tỷ đồng',{lw:6},a=>{txt('Bắt buộc tính thuế',22,128,{size:29,col:RED,a:P(g('k_g3b'),.2)});txt('theo thu nhập',22,162,{size:29,col:RED,a:P(g('k_g3b')+.5,.2)});txt('= doanh thu trừ chi phí',22,192,{size:21,w:600,a:P(g('k_g3c'),.25)})});
 tick(X1,AY,'1 tỷ',g('k_g1a')+.4);brk(84,X1-5,AY+62,g('k_g1a')+1.1,GREEN);
 tick(X3,AY,'3 tỷ',g('k_g2t'));brk(X1+5,X3-5,AY+62,g('k_g2t')+.6,INK);
 brk(X3+5,1190,AY+62,g('k_g3a')+1.0,RED);
 const s='Ngưỡng được chọn cách tính thuế hiện nay: 3 tỷ đồng / năm',m=tw(s,24);hl(640-m/2-4,538,m+8,34,P(g('k_g3c')+1.6,.4));txt(s,640,564,{size:24,align:'center',a:P(g('k_g3c')+1.4,.25)});
 source(SRCC,1)}
function sN(t){const t0=g('n1');title(3,'LUẬT MỚI THAY ĐỔI GÌ?',t0);
 const AY=440,X1=300,X3=560,X10=1040;axis(AY,t0+.2);tick(X1,AY,'1 tỷ',t0+.55);tick(X3,AY,'3 tỷ',t0+.7,GREY);
 box(80,196,210,200,t0+.35,{col:GREEN},a=>{txt('ĐẾN 1 TỶ ĐỒNG',105,40,{size:16,col:GREY,align:'center',ls:1});txt('Không phải',105,100,{size:26,col:GREEN,align:'center'});txt('nộp thuế',105,134,{size:26,col:GREEN,align:'center'})});
 box(310,196,240,200,t0+.5,{},a=>{txt('TRÊN 1 TỶ – 3 TỶ',120,40,{size:16,col:GREY,align:'center',ls:1});txt('Được chọn',120,100,{size:26,align:'center'});txt('cách tính thuế',120,134,{size:26,align:'center'});txt('(như hiện nay)',120,166,{size:16,w:600,col:GREY,align:'center'})});
 const tg=g('k_nguong');txt('Ngưỡng được chọn',X3,AY+78,{size:19,w:600,col:GREY,align:'center',a:P(tg,.25)});
 brk(X1+5,X3-5,AY+100,g('k_tu3'),GREY);txt('Trước đây: đến 3 tỷ đồng',(X1+X3)/2,AY+134,{size:20,col:GREY,align:'center',a:P(g('k_tu3')+.3,.25)});
 const tl=g('k_len10');tick(X10,AY,'10 tỷ',tl,RED);brk(X3+5,X10-5,AY+100,tl+.3,RED);txt('Luật mới: nâng lên 10 tỷ đồng',(X3+X10)/2,AY+134,{size:24,col:RED,align:'center',a:P(tl+.6,.25)});
 const tb=g('k_nghia');box(570,196,460,200,tb,{lw:6},a=>{x.save();x.globalAlpha*=P(tb+.3,.2);x.fillStyle=RED;rr(360,18,78,32,6);x.fill();x.restore();txt('MỚI',399,41,{size:18,col:'#fff',align:'center',ls:2,a:P(tb+.3,.2)});
  seq(26,42,17,[['TRÊN 3 TỶ ',g('k_tren3'),GREY],['ĐẾN 10 TỶ ĐỒNG / NĂM',g('k_den10'),GREY]]);txt('Cũng được chọn',26,108,{size:36,col:RED,a:P(g('k_cung'),.2)});txt('cách tính thuế',26,152,{size:36,col:RED,a:P(g('k_cung')+.4,.2)})});
 source(SRC2,1)}
function sM(t){const t0=g('m1');title(4,'HAI CÁCH TÍNH KHÁC NHAU THẾ NÀO?',t0,{size:40});
 const y=160,h=350,t1=g('k_c1')-.1,t2=g('m2')-.05;
 box(60,y,530,h,t1,{},a=>{badge(1,46,46,t1+.1,22);seq(82,55,24,[['THEO TỶ LỆ % ',g('k_c1a')-.1],['TRÊN DOANH THU',g('k_c1a')+.95]]);
  const tf=g('k_c1b');chip(28,100,176,60,'Doanh thu',tf);op('×',224,141,g('k_c1n')-.1);chip(244,100,140,60,'Tỷ lệ %',g('k_c1n'));op('=',404,141,g('k_c1n')+.5);chip(424,100,88,60,'Thuế',g('k_c1n')+.6,{tc:RED});
  txt('•  Tỷ lệ tùy ngành nghề',28,222,{size:24,a:P(g('k_c1t'),.2)});txt('•  Không phải chứng minh chi phí',28,268,{size:24,col:RED,a:P(g('k_c1c'),.2)})});
 txt('HOẶC',640,y+h/2+8,{size:20,col:GREY,align:'center',ls:2,a:P(t2,.25)});
 box(690,y,530,h,t2+.05,{},a=>{badge(2,46,46,t2+.15,22);txt('THEO THU NHẬP',82,55,{size:24,a:P(g('k_c2a')-.1,.2)});
  const tf=g('k_c2b');chip(28,92,150,54,'Doanh thu',tf);op('−',195,130,tf+.5);chip(212,92,124,54,'Chi phí',tf+.55);op('=',353,130,tf+1.0);chip(370,92,142,54,'Thu nhập',tf+1.05);
  const tg=g('k_c2n');chip(28,160,142,54,'Thu nhập',tg);op('×',191,198,tg+.35);chip(212,160,140,54,'Thuế suất',tg+.4);op('=',372,198,tg+.75);chip(392,160,120,54,'Thuế',tg+.8,{tc:RED});
  txt('Muốn được trừ chi phí, cần:',28,264,{size:22,w:600,a:P(g('k_c2m'),.2)});txt('•  Hóa đơn, chứng từ, sổ sách đầy đủ',28,304,{size:24,col:RED,a:P(g('k_c2c'),.2)})});
 txt('Tỷ lệ % và thuế suất cụ thể: xem văn bản luật và nghị định hướng dẫn.',640,548,{size:19,w:600,col:GREY,align:'center',a:P(g('k_c2c')+1.4,.3)});
 source(SRC2,1)}
function sW(t){const t0=g('w1');title(5,'CÁCH NÀO CÓ LỢI HƠN?',t0);txt('Tùy từng hộ. Dưới đây là nguyên tắc chung.',128,164,{size:21,w:600,col:GREY,a:P(g('k_tuy'),.3)});
 const r1=g('k_w1'),r2=g('k_w2');
 box(80,190,520,150,r1,{},a=>{txt('NẾU',28,42,{size:19,col:GREY,ls:3});txt('Khó chứng minh chi phí',28,98,{size:29});photo('market',388,18,116,114)});
 arrow(608,265,672,265,g('k_w1b')-.2,.2);
 box(680,190,520,150,g('k_w1b'),{lw:6},a=>{txt('CÓ THỂ HỢP VỚI',28,42,{size:19,col:GREY,ls:3});badge(1,48,90,g('k_w1b')+.1,21);txt('Tính theo tỷ lệ % trên doanh thu',82,100,{size:26})});
 box(80,366,520,170,r2,{},a=>{txt('NẾU',28,42,{size:19,col:GREY,ls:3});seq(28,98,27,[['Chi phí cao, ',r2+.05],['lãi mỏng,',g('k_w2m')]]);txt('và đủ hóa đơn, chứng từ',28,136,{size:27,a:P(g('k_w2d'),.2)});photo('shop',388,26,116,118)});
 arrow(608,451,672,451,g('k_w2b')-.2,.2);
 box(680,366,520,170,g('k_w2b'),{lw:6},a=>{txt('NÊN CÂN NHẮC',28,42,{size:19,col:GREY,ls:3});badge(2,48,98,g('k_w2b')+.1,21);txt('Tính theo thu nhập',82,108,{size:26});txt('(doanh thu trừ chi phí)',82,140,{size:19,w:600,col:GREY,a:P(g('k_w2b')+.8,.25)})});
 source(SRCW,1)}
function sT(t){const t0=g('t1');title(6,'TỪ KHI NÀO? CÒN CHỜ GÌ?',t0);
 const y=170,h=360,tk=t0+.2,tu=g('t2');
 box(70,y,400,h,tk,{},a=>{txt('ÁP DỤNG TỪ',200,54,{size:21,col:GREY,align:'center',ls:2});pic('ledger','calendar',40,74,320,130,tk+.2);txt('Kỳ tính thuế',200,258,{size:30,w:600,align:'center',a:P(g('k_ky'),.2)});txt('năm 2027',200,314,{size:52,col:RED,align:'center',a:P(g('k_ky')+.5,.2)})});
 box(510,y,700,h,tu,{lw:6},a=>{txt('CÒN CHỜ HƯỚNG DẪN',30,46,{size:22,col:RED,ls:3});
  txt('HIỆN NAY',30,82,{size:17,col:GREY,ls:2,a:P(g('k_hn'),.2)});txt('Hộ chọn tính thuế theo thu nhập',30,116,{size:27,a:P(g('k_hn')+.65,.2)});txt('phải giữ ổn định 2 năm liên tục',30,150,{size:27,a:P(g('k_on'),.2)});txt('(Nghị định 68/2026/NĐ-CP)',30,176,{size:18,w:600,col:GREY,a:P(g('k_nd68'),.25)});
  const tq=g('k_nd68')+1.3;sketch([seg(30,196,670,196,3)],tq,.3,{col:'#c9bfa9',lw:3,hand:false});txt('CÂU HỎI CÒN MỞ',30,226,{size:17,col:GREY,ls:2,a:P(tq+.2,.2)});
  txt('Các hộ này có được đổi cách tính',30,260,{size:27,a:P(g('k_doi'),.2)});seq(30,294,27,[['ngay trong năm 2027 ',g('k_doi2')],['hay không?',g('k_doi2')+1.6]]);
  txt('→  Chưa rõ, chờ hướng dẫn',30,336,{size:26,col:RED,a:P(g('k_chuaro'),.2)})});
 source(SRCT,1)}
function sE(t){const t0=g('e1');const m=tw('BẠN NÊN LÀM GÌ?',48);txt('BẠN NÊN LÀM GÌ?',640,122,{size:48,col:GREEN,align:'center',a:P(t0,.2)});underline(640-m/2,136,m,t0+.25,.35,{col:GREEN});
 const rowE=(i,ti,fn)=>{const y=168+i*108;box(170,y,940,96,ti,{col:GREEN},a=>{check(36,23,50,ti+.25,.25);fn()})};
 rowE(0,g('k_e1'),()=>{txt('Cộng doanh thu cả năm,',130,40,{size:26});txt('để biết mình thuộc nhóm nào',130,72,{size:26,a:P(g('k_e1b'),.2)})});
 rowE(1,g('e2'),()=>{txt('Tính thử cả hai cách,',130,40,{size:26});txt('trên số liệu thật của mình',130,72,{size:26,a:P(g('k_e2b'),.2)})});
 rowE(2,g('e3'),()=>{txt('Dù chọn cách nào,',130,40,{size:26});seq(130,72,26,[['vẫn giữ đủ ',g('k_e3b')],['hóa đơn, ',g('k_e3h')],['chứng từ, ',g('k_e3c')],['sổ sách',g('k_e3s')]])});
 rowE(3,g('e4'),()=>{txt('Theo dõi nghị định hướng dẫn,',130,40,{size:26});txt('hỏi cơ quan thuế nơi bạn đăng ký',130,72,{size:26,a:P(g('k_e4b'),.2)})});
 source('Gợi ý chung, không thay cho tư vấn pháp lý.',1)}
function sF(t){const t0=g('out');box(240,140,800,380,t0,{lw:6},a=>{txt('LƯU Ý',400,70,{size:30,col:RED,align:'center',ls:4});
 txt('Nội dung chỉ mang tính thông tin,',400,138,{size:36,w:600,f:'LoraV',align:'center'});txt('không phải tư vấn pháp lý.',400,186,{size:36,w:600,f:'LoraV',align:'center',a:P(g('k_kp')-.1,.2)});
 const p2=P(g('k_kp')+.7,.3);txt('Luật sửa đổi 3 luật thuế · thông qua 20/11/2026 · hiệu lực 01/01/2027',400,250,{size:19,w:600,align:'center',a:p2});txt('Số hiệu luật: chờ công bố chính thức',400,280,{size:19,w:600,col:GREY,align:'center',a:p2});
 txt('Kiểm tra văn bản gốc: vbpl.vn · thuvienphapluat.vn',400,330,{size:22,w:600,col:BLUE,align:'center',a:P(g('k_src'),.3)})});
 source(SRC1+'  ·  Ảnh minh họa: Unsplash',1)}
defineEpisode({header:'Luật sửa đổi 3 luật thuế  ·  thông qua 20/11/2026  ·  hiệu lực 01/01/2027',
 images:{pho:'img/pho.jpg',gavel:'img/gavel.jpg',shop:'img/shop.jpg',market:'img/market.jpg'},
 scenes:[[0,sA],[()=>g('s1')-.15,sB],[()=>g('c0')-.15,sC],[()=>g('n1')-.15,sN],[()=>g('m1')-.15,sM],[()=>g('w1')-.15,sW],[()=>g('t1')-.15,sT],[()=>g('e1')-.15,sE],[()=>g('out')-.15,sF]]});
