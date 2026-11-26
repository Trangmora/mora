// Tập: bảng mức phạt 7 lỗi giao thông phổ biến, so sánh xe máy và ô tô, theo Nghị định 168/2024/NĐ-CP (đã sửa đổi bởi Nghị định 238/2026/NĐ-CP).
// Nghiêm túc, khoảng 2 phút 38 giây, không nhạc. Mỗi con số có ít nhất 2 nguồn, trong đó ít nhất 1 nguồn nhà nước (xem script.md).
const SRC_M='Nguồn: Cổng TTĐT Chính phủ (vanban.chinhphu.vn, xaydungchinhsach.chinhphu.vn), Bộ Công an (mps.gov.vn)';
const SRC_A='Nguồn: Cổng TTĐT Chính phủ, Bộ Công an (mps.gov.vn); Thư viện Pháp luật. Điều 6, Điều 7 Nghị định 168/2024/NĐ-CP';
const SRC_B='Nguồn: VietnamPlus (TTXVN), Báo Nhân Dân, Cổng TTĐT Chính phủ, Công an tỉnh Khánh Hòa';
const SRC_C='Nguồn: VTV, VOV, Công an tỉnh Nghệ An; Thư viện Pháp luật';
const SRC_D='Nguồn: VOV, VTV, Cổng TTĐT Chính phủ; Dân trí, LuatVietnam';
const SRC_E='Nguồn: Cổng TTĐT Chính phủ, VTV, Cổng TTĐT tỉnh Ninh Bình, tỉnh Nghệ An';
const SRC_F='Nguồn: VOV, Cổng PBGDPL Lâm Đồng (mũ bảo hiểm); Công an tỉnh Gia Lai, Công an tỉnh Ninh Bình (dây an toàn)';
const SRC_G='Nguồn: Cổng TTĐT Chính phủ (toàn văn Nghị định 168/2024), cổng TTĐT tỉnh Cà Mau, VTV';
const SRC_H='Nguồn: Luật Trật tự, an toàn giao thông đường bộ 2024, Điều 58; Bộ Công an (mps.gov.vn); Công an tỉnh An Giang';
function lab(s,cx,y,o={}){txt(s,cx,y,{size:o.size||20,col:o.col||GREY,align:'center',ls:o.ls??1.5,a:o.a??1})}
// bảng: ảnh bên trái, 2 cột XE MÁY | Ô TÔ. rows: [[nhãn dòng 1, nhãn dòng 2, {v,u,p,t} xe máy, {v,u,p,t} ô tô, t_điểm]]
function tbl(t0,photoKey,rows,note,tn){
 photoCard(photoKey,50,200,290,330,t0+.1,{rot:-.025});
 const XL=370,XM=620,XO=930,W=290,rh=rows.length>1?140:250;
 box(XM,200,W,52,t0+.2,{lw:3},a=>txt('XE MÁY',W/2,36,{size:24,align:'center',ls:3}));
 box(XO,200,W,52,t0+.3,{lw:3},a=>txt('Ô TÔ',W/2,36,{size:24,align:'center',ls:3}));
 rows.forEach(([l1,l2,cm,co,tp],i)=>{const y=266+i*(rh+12);
  box(XL,y,W-50,rh,t0+.3+i*.2,{col:GREY,lw:3},a=>{txt(l1,(W-50)/2,rh/2-(l2?4:-8),{size:24,align:'center'});if(l2)txt(l2,(W-50)/2,rh/2+26,{size:20,w:600,col:GREY,align:'center'})});
  [[XM,cm],[XO,co]].forEach(([px,c])=>box(px,y,W,rh,c.t,{lw:5},a=>{const cy=rh>200?110:58;
   txt(c.v,W/2,cy,{size:c.s||54,col:RED,align:'center'});txt(c.u||'triệu đồng',W/2,cy+32,{size:22,w:600,align:'center'});
   if(c.p)txt(c.p,W/2,rh-16,{size:c.ps||26,col:c.pc||INK,align:'center',a:P(tp,.25)})}))});
 if(note)txt(note,640,598,{size:18,w:600,col:GREY,align:'center',a:P(tn,.3)})}
function sA(t){vxBig(.15,'Ô TÔ VƯỢT ĐÈN ĐỎ','20 triệu','đồng là mức phạt tối đa, kèm trừ 4 điểm giấy phép lái xe');
 box(390,530,500,64,g('k_xm'),{lw:4},a=>txt('Xe máy: tới 6 triệu đồng',250,44,{size:32,col:RED,align:'center'}));
 source(SRC_B,P(1,.4))}
function sM(t){const t0=g('op2');
 box(290,92,700,84,t0+.1,{lw:6},a=>txt('MỨC PHẠT 2026:  XE MÁY  ·  Ô TÔ',350,56,{size:36,align:'center'}));
 const L=[['Nồng độ cồn','beer'],['Vượt đèn đỏ','redlight'],['Dùng điện thoại','phone'],['Quá tốc độ','highway'],['Đi ngược chiều','oneway'],['Mũ bảo hiểm,|dây an toàn','helmet'],['Không có bằng lái','traffic']];
 L.forEach(([s,k],i)=>{const r=i<4?0:1,c=r?i-4:i,x0=r?215:70,px=x0+c*290,py=r?404:212,ti=g('k_m')+.15+i*.28;
  box(px,py,270,176,ti,{},a=>{photo(k,10,10,250,92);badge(i+1,34,136,ti+.1,20);const ls=s.split('|');ls.forEach((w,j)=>txt(w,64,(ls.length>1?128:146)+j*28,{size:ls.length>1?21:22}))})});
 source(SRC_M,1)}
function sV(t){const t0=g('s1');title(null,'VĂN BẢN NÀO?',t0,{sub:'Nghị định 168/2024/NĐ-CP của Chính phủ: xử phạt vi phạm giao thông đường bộ; trừ điểm, phục hồi điểm giấy phép lái xe'});
 vxTimeline(t0+.3,[[g('k_168'),'26/12/2024','Nghị định 168|ban hành'],[g('k_ad'),'01/01/2025','Bắt đầu|áp dụng'],[g('k_238'),'15/8/2026','Nghị định 238|sửa đổi']]);
 box(290,512,700,70,g('k_gn'),{lw:5},a=>txt('Nồng độ cồn, vượt đèn đỏ: giữ nguyên mức phạt',350,46,{size:28,col:RED,align:'center'}));
 source(SRC_M,1)}
function sA1(t){const t0=g('a1');title(1,'NỒNG ĐỘ CỒN',t0);
 tbl(t0,'beer',[['Mức thấp nhất','',{v:'2 – 3',p:'trừ 4 điểm',t:g('k_a_xm')},{v:'6 – 8',p:'trừ 4 điểm',t:g('k_a_ot')},g('k_a_pt')],
  ['Mức cao nhất','',{v:'8 – 10',p:'tước bằng 22–24 tháng',ps:20,pc:RED,t:g('k_a3_xm')},{v:'30 – 40',p:'tước bằng 22–24 tháng',ps:20,pc:RED,t:g('k_a3_ot')},g('k_a3_t')]],
  'Mức thấp nhất: chưa vượt 50 mg/100 ml máu hoặc 0,25 mg/1 lít khí thở. Mức cao nhất: vượt 80 mg/100 ml máu hoặc 0,4 mg/1 lít khí thở.',g('k_a_low'));
 source(SRC_A,1)}
function bigCol(px,t1,label,v,pts,lw){box(px,180,500,330,t1,{lw},a=>{lab(label,250,52,{size:26,col:lw>5?RED:GREY,ls:4});txt(v,250,180,{size:96,col:RED,align:'center'});txt('triệu đồng',250,226,{size:30,w:600,align:'center'});
 txt(pts[0],250,290,{size:34,align:'center',a:P(pts[1],.25)})})}
function sB(t){const t0=g('b1');title(2,'VƯỢT ĐÈN ĐỎ',t0);
 bigCol(90,g('k_b_xm'),'XE MÁY','4 – 6',['trừ 4 điểm',g('k_b_pt')],4);
 txt('so với',640,352,{size:24,w:600,col:GREY,align:'center',a:P(g('k_b_ot')-.2,.2)});
 bigCol(690,g('k_b_ot'),'Ô TÔ','18 – 20',['trừ 4 điểm',g('k_b_pt')],7);
 txt('Nghị định 238/2026 giữ nguyên mức phạt lỗi này',640,560,{size:20,w:600,col:GREY,align:'center',a:P(g('k_b_pt')+.6,.3)});
 source(SRC_B,1)}
function sC(t){const t0=g('c1');title(3,'DÙNG ĐIỆN THOẠI KHI LÁI XE',t0,{sub:'Dùng tay cầm và sử dụng điện thoại khi xe đang chạy'});
 tbl(t0,'phone',[['Cầm điện thoại','khi đang lái',{v:'0,8 – 1',s:66,p:'trừ 4 điểm',t:g('k_c_xm')},{v:'4 – 6',s:66,p:'trừ 4 điểm',t:g('k_c_ot')},g('k_c_pt')]]);
 source(SRC_C,1)}
function sD(t){const t0=g('d1');title(4,'CHẠY QUÁ TỐC ĐỘ',t0,{sub:'Mức phạt cao nhất của mỗi khung, đơn vị: triệu đồng'});
 vxBars(t0+.3,[[g('k_d1'),'Xe máy, quá trên 20 km/h',8,'6 – 8 triệu · trừ 4 điểm'],[g('k_d2'),'Ô tô, quá 20 – 35 km/h',8,'6 – 8 triệu · trừ 4 điểm'],[g('k_d3'),'Ô tô, quá trên 35 km/h',14,'12 – 14 triệu · trừ 6 điểm',true]],20);
 source(SRC_D,1)}
function sE(t){const t0=g('e1');title(5,'ĐI NGƯỢC CHIỀU',t0,{sub:'Của đường một chiều, hoặc đường có biển "Cấm đi ngược chiều"'});
 tbl(t0,'oneway',[['Đi ngược chiều','(không gây tai nạn)',{v:'4 – 6',s:66,p:'trừ 2 điểm',t:g('k_e_xm')},{v:'18 – 20',s:66,p:'trừ 4 điểm',t:g('k_e_ot')},g('k_e_ot')+.4]]);
 source(SRC_E,1)}
function stampOn(s,px,py,p,o){if(p<=0)return;x.save();font(800,o.size);x.letterSpacing='3px';const m=x.measureText(s).width;x.restore();x.save();x.translate(px,py);x.rotate(o.rot);x.globalAlpha*=Math.min(1,p*5)*.93;x.fillStyle=CARD;x.fillRect(-m/2-18,-o.size*.95,m+36,o.size*1.35);x.restore();stamp(s,px,py,p,o)}
function sF(t){const t0=g('f1');title(6,'MŨ BẢO HIỂM, DÂY AN TOÀN',t0);
 photoCard('helmet',110,166,470,250,g('k_f_xm')-.3,{rot:-.02});txt('Xe máy: không đội mũ bảo hiểm',345,462,{size:26,align:'center',a:P(g('k_f_xm'),.25)});
 txt('400.000 – 600.000 đồng',345,516,{size:40,col:RED,align:'center',a:P(g('k_f_xm')+1.6,.25)});
 photoCard('wheel',700,166,470,250,g('k_f_ot')-.3,{rot:.02});txt('Ô tô: người lái không thắt dây an toàn',935,462,{size:24,align:'center',a:P(g('k_f_ot'),.25)});
 txt('800.000 – 1.000.000 đồng',935,516,{size:40,col:RED,align:'center',a:P(g('k_f_ot')+1.6,.25)});
 stampOn('KHÔNG TRỪ ĐIỂM',640,300,P(g('k_f_pt'),.4),{size:44,rot:-.06});
 source(SRC_F,1)}
function sG(t){const t0=g('g1');vxQA(t0,'Lái xe mà không có giấy phép lái xe bị phạt bao nhiêu?',g('k_g_xm'),'Xe máy đến 125 cm³: 2 – 4 triệu đồng',null);
 txt('Ô tô: 18 – 20 triệu đồng',150,520,{size:34,col:RED,a:P(g('k_g_ot'),.25)});
 txt('Lỗi số 7',1130,138,{size:20,w:600,col:GREY,align:'right',a:P(t0,.3)});
 source(SRC_G,1)}
function dots(cx,cy,t0){for(let i=0;i<12;i++){const px=cx+(i%6-2.5)*40,py=cy+Math.floor(i/6)*40,a=P(t0+i*.04,.2);if(a<=0)continue;x.save();x.globalAlpha*=a;x.beginPath();x.arc(px,py,14,0,6.2832);x.fillStyle=YEL;x.fill();x.strokeStyle=INK;x.lineWidth=2;x.stroke();x.restore()}}
function sH(t){const t0=g('h1');title(null,'ĐIỂM GIẤY PHÉP LÁI XE',t0,{sub:'Luật Trật tự, an toàn giao thông đường bộ 2024, Điều 58'});
 box(60,190,360,330,g('k_h12')-.3,{lw:6},a=>{lab('MỖI GIẤY PHÉP LÁI XE CÓ',180,56,{size:19,ls:1});txt('12 điểm',180,150,{size:76,align:'center'});dots(180,214,g('k_h12'))});
 arrow(430,355,500,355,g('k_h_r')-.3,.2);
 box(510,190,710,330,g('k_h_r'),{col:GREEN,lw:5},a=>{lab('NẾU CHƯA BỊ TRỪ HẾT ĐIỂM',355,56,{size:20});txt('12 tháng',355,150,{size:64,align:'center'});txt('không bị trừ thêm điểm',355,200,{size:28,w:600,align:'center'});
  txt('→ phục hồi đủ 12 điểm',355,276,{size:38,col:GREEN,align:'center',a:P(g('k_h_ok'),.25)})});
 source(SRC_H,1)}
function sT(t){vxTodo(g('t1'),[[g('k_t1b'),'Tra cứu phạt nguội: ứng dụng VNeTraffic','(Bộ Công an) hoặc Cổng dịch vụ công'],[g('t2'),'Xem điểm giấy phép lái xe:','ứng dụng VNeID, mục Ví giấy tờ'],[g('t3'),'Nộp phạt trực tuyến','trên Cổng dịch vụ công'],[g('t4'),'Không bấm đường link lạ','trong tin nhắn báo phạt nguội']],'Nguồn: Bộ Công an (mps.gov.vn, dichvucong.bocongan.gov.vn), Báo Nhân Dân, VTV, Công an tỉnh Quảng Bình. Gợi ý chung.')}
function sZ(t){vxDisclaimer(g('out'),'Nghị định 168/2024/NĐ-CP · ban hành 26/12/2024 · hiệu lực 01/01/2025','Sửa đổi, bổ sung bởi Nghị định 238/2026/NĐ-CP (hiệu lực 15/8/2026)',g('k_src'),SRC_M+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Nghị định 168/2024/NĐ-CP (sửa đổi bởi Nghị định 238/2026)  ·  ban hành 26/12/2024  ·  hiệu lực 01/01/2025',
 images:{beer:'img/beer.jpg',redlight:'img/redlight.jpg',phone:'img/phone.jpg',highway:'img/highway.jpg',oneway:'img/oneway.jpg',helmet:'img/helmet.jpg',wheel:'img/wheel.jpg',traffic:'img/traffic.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sV],[()=>g('a1')-.15,sA1],[()=>g('b1')-.15,sB],[()=>g('c1')-.15,sC],[()=>g('d1')-.15,sD],[()=>g('e1')-.15,sE],[()=>g('f1')-.15,sF],[()=>g('g1')-.15,sG],[()=>g('h1')-.15,sH],[()=>g('t1')-.15,sT],[()=>g('out')-.15,sZ]]});
