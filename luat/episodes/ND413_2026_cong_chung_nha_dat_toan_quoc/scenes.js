// Tập: Công chứng nhà đất ở tỉnh khác: lộ trình đến 31/12/2028 (Nghị định 413/2026/NĐ-CP). Nghiêm túc, khoảng 2 phút 7 giây.
const SRC1='Nguồn: Báo Chính phủ, VnEconomy, Công Luận, VTV, Soha, Công dân & Khuyến học, Thư viện Pháp luật';
const SRC2='Nguồn: Gia đình & Xã hội (Sức khỏe & Đời sống), Đời sống & Pháp luật, VnEconomy. Chờ đối chiếu văn bản gốc.';
function sA(t){
 photoCard('houses',70,170,400,390,.1,{rot:-.035});
 stamp('TỪ 31/12/2028',1060,128,P(g('k_nd'),.4),{size:30,rot:.05});
 txt('Nhà đất ở tỉnh này,',510,236,{size:50,a:P(g('k_q'),.2)});txt('công chứng ở tỉnh khác?',510,302,{size:50,col:RED,a:P(g('k_tk'),.2)});
 underline(510,320,tw('công chứng ở tỉnh khác?',50),g('k_tk')+.5,.4);
 box(510,370,660,186,g('k_tq'),{lw:6},a=>{txt('CÔNG CHỨNG GIAO DỊCH BẤT ĐỘNG SẢN',34,54,{size:22,col:GREY,ls:1});txt('Trên toàn quốc',30,140,{size:66,col:RED})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('NGHỊ ĐỊNH 413/2026',310,62,{size:36,align:'center'})});
 const bx=[40,345,650,955],lab=[['Văn bản','nào?'],['Lộ trình','ra sao?'],['Điều kiện','là gì?'],['Bạn nên','làm gì?']],ts=[g('k_m1'),g('k_m2'),g('k_m3'),g('k_m4')];
 const ic=['paper','calendar','bars','house'];
 for(let i=0;i<4;i++){const ti=ts[i]-.25;arrow(640+(i-1.5)*110,200,bx[i]+142,282,ti,.2);
  box(bx[i],288,285,230,ti+.18,i==3?{col:GREEN}:{},a=>{icon(ic[i],100,16,86,ti+.3,.45,i==3?{col:GREEN}:{});badge(i+1,36,150,ti+.25,22,i==3?GREEN:RED);txt(lab[i][0],70,150,{size:26});txt(lab[i][1],70,190,{size:26})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_413')-.25,{lw:6},a=>{txt('NGHỊ ĐỊNH CỦA CHÍNH PHỦ',175,58,{size:20,col:GREY,align:'center',ls:1});txt('413/2026',175,160,{size:56,col:RED,align:'center'});txt('/NĐ-CP',175,206,{size:30,align:'center'});
  txt('Sửa đổi Nghị định 104/2025/NĐ-CP',175,262,{size:18,w:600,align:'center',a:P(g('k_104'),.25)});txt('hướng dẫn Luật Công chứng',175,288,{size:18,w:600,align:'center',a:P(g('k_104'),.25)})});
 arrow(408,y+h/2,460,y+h/2,g('k_ky')-.3,.2);
 box(468,y,350,h,g('k_ky'),{},a=>{txt('NGÀY KÝ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('paper',125,80,100,g('k_ky')+.2,.5);txt('16/11/2026',175,250,{size:48,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',125,80,100,g('k_hl')+.2,.5);txt('01/01/2027',175,250,{size:48,col:RED,align:'center'});
  txt('Điều 4–7: từ 16/11/2026 (theo báo chí)',175,294,{size:17,w:600,col:GREY,align:'center',a:P(g('k_bc'),.2)})});
 source(SRC1,1)}
function sB(t){const t0=g('s2');title(null,'HIỂU CHO ĐÚNG',t0);
 box(60,180,540,340,g('k_d1')-.2,{},a=>{photo('contract',14,14,512,160);txt('CÔNG CHỨNG HỢP ĐỒNG NHÀ ĐẤT',30,220,{size:20,col:GREY,ls:1});txt('Công chứng viên chứng nhận',30,266,{size:30});txt('hợp đồng đúng pháp luật',30,306,{size:30})});
 box(680,180,540,340,g('k_d2'),{lw:6},a=>{photo('plots',14,14,512,160);txt('ĐỊA HẠT',30,220,{size:22,col:RED,ls:3});txt('Phạm vi địa lý mà',30,266,{size:30});txt('công chứng viên được làm việc',30,306,{size:30})});
 source('Diễn đạt bằng lời thường theo Luật Công chứng (văn bản hiện hành).',1)}
function sH(t){const t0=g('s3');title(null,'HIỆN NAY: TRONG PHẠM VI TỈNH',t0);
 box(140,190,1000,300,g('k_h1')-.2,{lw:6},a=>{icon('house',50,70,150,g('k_h1'),.5);txt('GIAO DỊCH BẤT ĐỘNG SẢN',240,70,{size:22,col:GREY,ls:2});txt('Chỉ công chứng trong phạm vi',240,130,{size:36});txt('tỉnh, thành phố nơi tổ chức',240,178,{size:36});txt('hành nghề công chứng đặt trụ sở',240,226,{size:36,col:RED})});
 txt('Luật Công chứng sửa đổi 2026: vẫn giữ nguyên tắc này',640,548,{size:26,align:'center',a:P(g('k_h2'),.3)});
 source('Nguồn: Luật Công chứng 2024; Hà Nội Online, An ninh Thủ đô, Thanh Niên (về luật sửa đổi 2026).',1)}
function dot(px,py,col,a){if(a<=0)return;x.save();x.globalAlpha*=a;x.fillStyle=col;x.beginPath();x.arc(px,py,13,0,6.2832);x.fill();x.restore()}
function sL(t){const t0=g('s4');title(null,'LỘ TRÌNH: ĐIỀU 42a',t0,{sub:'Bổ sung vào Nghị định 104/2025/NĐ-CP'});
 sketch([seg(90,300,1190,300,5)],t0+.3,.6,{lw:6});
 const pts=[[230,'01/01/2027','Nghị định có hiệu lực',g('k_42'),INK],[900,'31/12/2028','Công chứng BĐS toàn quốc',g('k_28'),RED]];
 for(const [px,d,lab,ti,col] of pts){const a=P(ti,.25);dot(px,300,col,a);txt(d,px,262,{size:42,col,align:'center',a})}
 box(70,350,420,170,g('k_42')+.3,{col:GREY},a=>{txt('ĐẾN HẾT 2028',30,50,{size:21,col:GREY,ls:2});txt('Nhà đất: công chứng',30,100,{size:30});txt('tại tỉnh có bất động sản',30,140,{size:28,w:600})});
 box(620,350,600,170,g('k_28')+.3,{lw:7},a=>{txt('TỪ 31/12/2028',30,50,{size:21,col:RED,ls:2});txt('Tất cả giao dịch về bất động sản',30,100,{size:30});txt('trên phạm vi toàn quốc',30,142,{size:32,col:RED,a:P(g('k_tq2'),.2)})});
 source(SRC1,1)}
function sK(t){const t0=g('s5');title(null,'ĐIỀU KIỆN',t0,{sub:'Các cơ sở dữ liệu liên quan phải được công bố và vận hành'});
 const L=[['Công chứng','k_dk1'],['Đất đai','k_dk2'],['Nhà ở','k_dk3']];
 L.forEach(([s,k],i)=>box(60+i*390,200,360,150,g(k)-.1,{},a=>{icon('bars',24,28,90,g(k),.5);txt(s,130,90,{size:30})}));
 box(160,390,960,160,g('k_lui'),{lw:6},a=>{txt('NẾU ĐẾN 31/12/2028 CHƯA VẬN HÀNH',40,52,{size:22,col:RED,ls:2});txt('Việc mở rộng chờ đến khi',40,104,{size:34});txt('các cơ sở dữ liệu hoạt động',40,142,{size:34,col:RED})});
 source(SRC2,1)}
function sT(t){const t0=g('s6');title(null,'CÔNG CHỨNG NGOÀI TRỤ SỞ',t0,{sub:'Điểm mới thứ hai'});
 box(60,190,540,330,g('k_ts1')-.2,{},a=>{photo('keys',14,14,512,170);txt('KHI CÁC BÊN THỐNG NHẤT',30,226,{size:21,col:GREY,ls:2,a:P(g('k_ts2'),.2)});txt('công chứng cùng lúc với:',30,272,{size:30,a:P(g('k_ts2'),.2)})});
 box(680,190,540,330,g('k_ts3'),{lw:6},a=>{['• Bàn giao tài sản','• Bàn giao giấy tờ','• Thanh toán tiền'].forEach((s,i)=>txt(s,40,90+i*80,{size:40,col:i==2?RED:INK,a:P(i==2?g('k_ts4'):g('k_ts3')+i*.4,.2)}))});
 source('Nguồn: LuatVietnam ("Bổ sung trường hợp được công chứng ngoài trụ sở"), Dân trí. Chờ đối chiếu văn bản gốc.',1)}
function sW(t){const t0=g('s7');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 box(60,190,540,320,g('k_a1')-.2,{},a=>{photo('plots',14,14,512,170);txt('Người mua bán, tặng cho,',30,232,{size:30});txt('thế chấp nhà đất',30,274,{size:30})});
 box(680,190,540,320,g('k_a2'),{lw:6},a=>{icon('calendar',30,40,110,g('k_a2'),.5);txt('Từ nay đến cuối 2028',170,90,{size:30});txt('vẫn công chứng',170,140,{size:32,col:RED});txt('tại tỉnh có nhà đất',170,186,{size:32,col:RED})});
 source(SRC1,1)}
function sE(t){vxTodo(g('s8'),[[g('k_e1'),'Đến hết 2028: công chứng tại tổ chức','công chứng ở tỉnh có nhà đất'],[g('s9'),'Muốn ký cùng lúc giao tiền, giấy tờ:','đề nghị công chứng ngoài trụ sở'],[g('s10'),'Thanh toán qua ngân hàng,','ghi rõ nội dung chuyển khoản'],[g('s11'),'Kiểm tra pháp lý nhà đất','trước khi đặt cọc']])}
function sF(t){vxDisclaimer(g('out'),'Nghị định 413/2026/NĐ-CP · ký 16/11/2026 · hiệu lực 01/01/2027','Sửa đổi Nghị định 104/2025/NĐ-CP hướng dẫn Luật Công chứng',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Nghị định 413/2026/NĐ-CP  ·  ký 16/11/2026  ·  hiệu lực 01/01/2027',
 images:{houses:'img/houses.jpg',plots:'img/plots.jpg',keys:'img/keys.jpg',contract:'img/contract.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sH],[()=>g('s4')-.15,sL],[()=>g('s5')-.15,sK],[()=>g('s6')-.15,sT],[()=>g('s7')-.15,sW],[()=>g('s8')-.15,sE],[()=>g('out')-.15,sF]]});
