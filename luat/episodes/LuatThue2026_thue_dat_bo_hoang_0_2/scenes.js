// Tập: Đất bỏ hoang chịu thuế 0,2% từ 1/7/2027 (Luật sửa đổi Luật Thuế TNDN, Thuế SDĐ phi nông nghiệp, Thuế TNCN; thông qua 20/11/2026).
const SRC1='Nguồn: VietnamPlus, VTV, Tiền Phong, CafeF, Thời báo Tài chính (20/11/2026)';
const SRC2='Nguồn: LSVN, Báo Quốc tế, VietnamPlus (20/11/2026). Chờ đối chiếu văn bản luật chính thức.';
function sA(t){
 photoCard('lot',70,170,400,380,.1,{rot:-.035});
 stamp('TỪ 01/7/2027',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Đất bỏ hoang',530,226,{size:56,a:P(.5,.2)});
 txt('chịu thuế sử dụng đất phi nông nghiệp',530,280,{size:28,w:600,a:P(1.5,.3)});
 box(530,330,300,220,g('k_ts'),{lw:6},a=>{txt('THUẾ SUẤT',24,50,{size:22,col:GREY,ls:3});txt('0,2%',24,160,{size:96,col:RED})});
 box(860,330,310,220,g('k_hm'),{lw:6},a=>{txt('HẠN MỨC',24,50,{size:22,col:GREY,ls:3});txt('Không',24,130,{size:54,col:RED});txt('áp dụng',24,184,{size:40})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('THUẾ 0,2% VỚI ĐẤT BỎ HOANG',310,62,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Luật','quy định gì?'],['Khác hiện nay','thế nào?'],['Bạn nên','làm gì?']],ph=['plots','calc','survey'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO?',t0);
 box(60,170,700,370,g('k_luat'),{lw:6},a=>{txt('LUẬT SỬA ĐỔI, BỔ SUNG MỘT SỐ ĐIỀU CỦA',34,56,{size:21,col:GREY,ls:1});
  [['Luật Thuế thu nhập doanh nghiệp',0],['Luật Thuế sử dụng đất phi nông nghiệp',1.6],['Luật Thuế thu nhập cá nhân',3.6]].forEach(([s,d],i)=>{badge(i+1,52,118+i*80,g('k_luat')+.4+d,20,i==1?RED:GREY);txt(s,90,128+i*80,{size:28,col:i==1?RED:INK,a:P(g('k_luat')+.4+d,.2)})});
  txt('(một luật sửa 3 luật thuế)',34,340,{size:20,w:600,col:GREY})});
 arrow(770,355,822,355,g('k_qh')-.3,.2);
 box(830,170,400,370,g('k_qh'),{},a=>{photo('plots',16,16,368,130);txt('QUỐC HỘI THÔNG QUA',200,192,{size:21,col:GREY,align:'center',ls:1});txt('20/11/2026',200,252,{size:48,align:'center'});
  txt('475/477 đại biểu tán thành',200,310,{size:22,w:600,align:'center',a:P(g('k_ph'),.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,572,{size:20,w:600,col:GREY,align:'center',a:P(g('k_ph')+.8,.3)});
 source(SRC2,1)}
function sD(t){const t0=g('s2');title(null,'HIỆU LỰC',t0);
 sketch([seg(110,320,1170,320,5)],t0+.2,.6,{lw:6});
 const dot=(px,lab,tt,col)=>{const pm=P(tt-.1,.25);if(pm>0){x.save();x.globalAlpha*=pm;x.fillStyle=col;x.beginPath();x.arc(px,320,13,0,6.2832);x.fill();x.restore();txt(lab,px,280,{size:46,col:col,align:'center',a:pm})}};
 dot(380,'01/01/2027',g('k_hl1'),INK);dot(900,'01/7/2027',g('k_hl2'),RED);
 box(160,370,440,170,g('k_hl1')+.3,{col:GREY},a=>{txt('HIỆU LỰC CHUNG',30,50,{size:21,col:GREY,ls:2});txt('Phần lớn quy định',30,106,{size:32});txt('của luật',30,146,{size:32})});
 box(680,370,440,170,g('k_hl2')+.3,{lw:6},a=>{txt('RIÊNG ĐẤT BỎ HOANG',30,50,{size:21,col:RED,ls:2});txt('Thuế suất 0,2%',30,110,{size:40,col:RED});txt('áp dụng từ ngày này',30,148,{size:26,w:600})});
 source(SRC1,1)}
function sB(t){const t0=g('s3');title(null,'THUẾ SỬ DỤNG ĐẤT PHI NÔNG NGHIỆP',t0,{sub:'Khoản thuế nộp hằng năm'});
 box(60,190,1160,120,g('k_d1')-.2,{},a=>{icon('house',30,14,92,g('k_d1'),.5);txt('Đất ở, đất phi nông nghiệp',150,56,{size:32});txt('Người nộp: người có quyền sử dụng đất',150,96,{size:24,w:600,a:P(g('k_d2'),.2)})});
 const cs=[['Diện tích','tính thuế',g('k_d3')],['Giá 1 m²','đất',g('k_d4')],['Thuế suất','(%)',g('k_d5')]];
 box(60,340,180,190,g('k_d3')-.1,{lw:6},a=>{txt('SỐ THUẾ',90,80,{size:24,col:RED,align:'center'});txt('=',90,140,{size:50,col:RED,align:'center'})});
 cs.forEach(([a1,a2,tt],i)=>{const px=290+i*320;if(i>0)txt('×',px-30,450,{size:50,col:RED,align:'center',a:P(tt,.2)});box(px,340,250,190,tt,i==2?{lw:6}:{},a=>{txt(a1,125,90,{size:32,align:'center'});txt(a2,125,134,{size:28,w:600,align:'center'})})});
 source('Nguồn: Luật Thuế sử dụng đất phi nông nghiệp 2010 (Điều 4, 5, 6, 7).',1)}
function sC(t){const t0=g('s4');title(null,'HIỆN NAY VÀ THEO LUẬT MỚI',t0,{sub:'Thuế suất thuế sử dụng đất phi nông nghiệp'});
 box(60,186,560,360,g('s4')+.4,{col:GREY},a=>{txt('HIỆN NAY · LUẬT 2010',30,50,{size:21,col:GREY,ls:2});
  txt('Đất ở trong hạn mức',30,116,{size:26,a:P(g('k_c1'),.2)});txt('0,03%',528,118,{size:36,align:'right',a:P(g('k_c1'),.2)});
  txt('Vượt hạn mức đến 3 lần',30,186,{size:26,a:P(g('k_c2'),.2)});txt('0,07%',528,188,{size:36,align:'right',a:P(g('k_c2'),.2)});
  txt('Vượt trên 3 lần',30,256,{size:26,a:P(g('k_c2')+.8,.2)});txt('0,15%',528,258,{size:36,align:'right',a:P(g('k_c2')+.8,.2)});
  txt('(Điều 7 Luật Thuế SDĐ phi nông nghiệp)',30,326,{size:19,w:600,col:GREY})});
 arrow(630,366,672,366,g('k_n1')-.3,.2);
 box(680,186,540,360,g('k_n1'),{lw:7},a=>{txt('TỪ 01/7/2027 · ĐẤT BỎ HOANG',30,50,{size:21,col:RED,ls:2});txt('0,2%',30,170,{size:110,col:RED});
  txt('Không áp dụng hạn mức:',30,234,{size:26,a:P(g('k_n2'),.2)});txt('toàn bộ diện tích',30,270,{size:26,a:P(g('k_n2'),.2)});txt('Gần 7 lần mức 0,03%',30,326,{size:28,col:RED,a:P(g('k_n3'),.2)})});
 source(SRC1+'. Mức hiện nay: Luật Thuế SDĐ phi nông nghiệp 2010.',1)}
function sX(t){const t0=g('s6');title(null,'VÍ DỤ MINH HỌA',t0,{sub:'Thửa đất 200 m², giá tính thuế 10 triệu đồng/m² (số giả định)'});
 box(80,200,340,300,g('k_x1'),{},a=>{photo('lot',14,14,312,150);txt('200 m²',30,214,{size:40});txt('× 10 triệu đ/m²',30,258,{size:26,w:600})});
 arrow(430,300,520,260,g('k_x2')-.3,.2);arrow(430,400,520,430,g('k_x3')-.3,.2);
 box(530,190,640,150,g('k_x2'),{col:GREY},a=>{txt('Thuế suất 0,03%',30,56,{size:26,col:GREY});txt('600.000 đ/năm',30,118,{size:46})});
 box(530,360,640,150,g('k_x3'),{lw:6},a=>{txt('Thuế suất 0,2% (đất bỏ hoang)',30,56,{size:26,col:RED});txt('4.000.000 đ/năm',30,118,{size:46,col:RED})});
 source('Ví dụ tự tính theo công thức hiện hành: 200 × 10.000.000 × 0,03% và × 0,2%. Giá tính thuế thực tế theo bảng giá đất.',1)}
function sW(t){const t0=g('s7');title(null,'THẾ NÀO LÀ ĐẤT BỎ HOANG?',t0);
 box(60,190,560,300,g('k_b1')-.2,{},a=>{photo('survey',20,20,520,130);txt('Xác định theo',30,196,{size:30});txt('pháp luật về đất đai',30,238,{size:30,col:RED})});
 box(680,190,540,300,g('k_b2'),{col:GREY},a=>{txt('CHƯA RÕ',30,56,{size:24,col:GREY,ls:3});txt('Đất để trống bao lâu',30,124,{size:32});txt('thì bị coi là bỏ hoang?',30,168,{size:32})});
 stamp('CHỜ HƯỚNG DẪN',950,450,P(g('k_b3'),.35),{size:30,rot:-.05});
 source('Nguồn: Thời báo Tài chính, An ninh Thủ đô (11/2026).',1)}
function sE(t){vxTodo(g('s8'),[[g('k_e1'),'Có đất để trống lâu năm: tính phương án','đưa vào sử dụng trước 01/7/2027'],[g('s9'),'Theo dõi hướng dẫn về tiêu chí đất bỏ hoang','của cơ quan quản lý đất đai nơi có đất'],[g('s10'),'Lưu giấy tờ chứng minh đất đang sử dụng','(hợp đồng cho thuê, hóa đơn điện nước)']])}
function sF(t){vxDisclaimer(g('out'),'Luật sửa đổi 3 luật thuế · thông qua 20/11/2026 · đất bỏ hoang: từ 01/7/2027','Số hiệu luật: chờ công bố chính thức',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật sửa đổi Luật Thuế TNDN, Thuế SDĐ phi nông nghiệp, Thuế TNCN  ·  thông qua 20/11/2026  ·  đất bỏ hoang: từ 01/7/2027',
 images:{lot:'img/lot.jpg',plots:'img/plots.jpg',survey:'img/survey.jpg',calc:'img/calc.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sD],[()=>g('s3')-.15,sB],[()=>g('s4')-.15,sC],[()=>g('s6')-.15,sX],[()=>g('s7')-.15,sW],[()=>g('s8')-.15,sE],[()=>g('out')-.15,sF]]});
