// Tập: Luật Đất đai (sửa đổi) 2026, góc "bảng giá đất mới và bồi thường khi thu hồi đất". Nghiêm túc, một vấn đề, khoảng 2 phút 11 giây.
const SRC1='Nguồn: Cổng TTĐT Chính phủ, VTV, VietnamPlus, VnExpress (21/11/2026)';
const SRC2='Nguồn: VnExpress, VTV, Dân trí, Znews, Thanh Niên (21–25/11/2026). Chờ đối chiếu văn bản chính thức.';
const SRC_BT='Nguồn: Báo Chính phủ, VnExpress, VOV, Dân trí (21–22/11/2026). Chờ đối chiếu văn bản chính thức.';
const SOHIEU='Luật số 47/2026/QH16 (theo VTV, TTXVN, VnEconomy; chờ đối chiếu Công báo)';
function mult(cx,cy,r,col,a,lw=5){if(a<=0)return;x.save();x.globalAlpha*=a;x.strokeStyle=col;x.lineWidth=lw;x.lineCap='round';x.beginPath();x.moveTo(cx-r,cy-r);x.lineTo(cx+r,cy+r);x.moveTo(cx+r,cy-r);x.lineTo(cx-r,cy+r);x.stroke();x.restore()}
function dot(px,py,r,col,a){if(a<=0)return;x.save();x.globalAlpha*=a;x.fillStyle=col;x.beginPath();x.arc(px,py,r,0,6.2832);x.fill();x.restore()}
function sA(t){
 photoCard('plots',80,170,380,390,.1,{rot:-.035});
 stamp('TỪ 01/01/2028',1050,128,P(g('k_tu'),.4),{size:30,rot:.05});
 txt('LUẬT ĐẤT ĐAI (SỬA ĐỔI)',520,190,{size:22,col:GREY,ls:3,a:P(.4,.25)});
 txt('Bỏ giá đất cụ thể',520,256,{size:58,a:P(g('k_bo')-.15,.2)});
 underline(520,274,tw('Bỏ giá đất cụ thể',58),g('k_bo')+.3,.4);
 box(520,318,680,244,g('k_tu'),{lw:6},a=>{txt('TỪ 01/01/2028, GIÁ ĐẤT ĐƯỢC TÍNH THEO',34,50,{size:22,col:GREY,ls:2});
  box(34,84,280,124,g('k_bang')-.15,{lw:3},b=>{txt('Bảng giá',140,56,{size:36,align:'center'});txt('đất mới',140,100,{size:36,align:'center'})});
  mult(340,146,15,RED,P(g('k_nhan'),.2),7);
  box(366,84,280,124,g('k_hs')-.15,{lw:3},b=>{txt('Hệ số',140,56,{size:36,col:RED,align:'center'});txt('điều chỉnh',140,100,{size:36,col:RED,align:'center'})})});
 source(SRC2,P(1,.4))}
function sP(t){const t0=g('s1');title(null,'VĂN BẢN NÀO? KHI NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_qh')-.05,{},a=>{photo('gavel',14,14,322,140);txt('QUỐC HỘI THÔNG QUA',175,196,{size:21,col:GREY,align:'center',ls:1});txt('21/11/2026',175,254,{size:46,align:'center',a:P(g('k_ngay'),.2)});txt('Luật Đất đai (sửa đổi)',175,296,{size:21,w:600,col:GREY,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_phieu')-.3,.2);
 box(468,y,350,h,g('k_phieu'),{},a=>{txt('PHIẾU TÁN THÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('466',175,196,{size:120,align:'center'});txt('trên 479 đại biểu',175,250,{size:25,w:600,align:'center'});txt('tham gia biểu quyết',175,284,{size:25,w:600,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.2,.5);txt('01/7/2027',175,270,{size:54,col:RED,align:'center',a:P(g('k_hl')+.4,.2)})});
 txt(SOHIEU,640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl')+.7,.3)});
 source(SRC1,1)}
function sB(t){const t0=g('s2');title(null,'HIỆN NAY: HAI LOẠI GIÁ ĐẤT',t0,{sub:'Theo Luật Đất đai năm 2024'});
 box(440,170,400,66,g('k_2loai')-.2,{lw:6},a=>{txt('Giá đất',200,45,{size:32,align:'center'})});
 arrow(560,240,400,292,g('k_bg')-.3,.2);
 box(80,298,520,250,g('k_bg')-.1,{},a=>{photo('houses',14,14,180,222);txt('BẢNG GIÁ ĐẤT',214,52,{size:23,col:RED,ls:2});txt('Do tỉnh ban hành',214,112,{size:30,a:P(g('k_bg')+.5,.2)});txt('Áp dụng chung cho',214,168,{size:24,w:600,a:P(g('k_bg2'),.2)});txt('từng khu vực, vị trí',214,200,{size:24,w:600,a:P(g('k_bg2'),.2)})});
 arrow(720,240,880,292,g('k_ct')-.3,.2);
 box(680,298,520,250,g('k_ct')-.1,{},a=>{photo('survey',14,14,180,222);txt('GIÁ ĐẤT CỤ THỂ',214,52,{size:23,col:RED,ls:2});txt('Xác định riêng',214,124,{size:28,a:P(g('k_ct2'),.2)});txt('cho từng trường hợp',214,162,{size:28,a:P(g('k_ct2'),.2)})});
 source('Nguồn: Luật Đất đai 2024 (Luật số 31/2024/QH15), Điều 159 và Điều 160.',1)}
function row(y,lab,t0,fn,o={}){arrow(328,340,392,y+60,t0-.05,.2);box(400,y,830,124,t0+.13,o,a=>{txt(lab,28,36,{size:19,col:GREY,ls:2});fn(a)})}
function chip(s,px,py,t0,size=21){const w=tw(s,size)+36;box(px,py,w,54,t0,{lw:3,r:27},a=>{txt(s,w/2,36,{size,align:'center'})});return w}
function sC(t){const t0=g('s3');title(null,'LUẬT MỚI: BA THAY ĐỔI',t0,{sub:'Luật Đất đai (sửa đổi) 2026'});
 box(50,196,270,290,t0+.3,{lw:6},a=>{photo('plots',14,14,242,160);txt('Giá đất',135,220,{size:28,align:'center'});txt('theo luật mới',135,256,{size:28,align:'center'})});
 row(180,'MỘT · BỎ GIÁ ĐẤT CỤ THỂ',g('k_c1'),a=>{let px=28;const S=30,parts=[['Giá đất  =',INK,g('k_c1a')],['Bảng giá đất',INK,g('k_c1a')+.5],['×',RED,g('k_c1b')],['Hệ số điều chỉnh',RED,g('k_c1b')+.5]];
  parts.forEach(([s,c,ti],i)=>{if(i==2){mult(px+9,70,8,RED,P(ti,.2),4);px+=18+16;return}const w=tw(s,S);if(i==3)hl(px-4,52,w+10,36,P(g('k_h0'),.4));txt(s,px,80,{size:S,col:c,a:P(ti,.2)});px+=w+16});
  txt('Hệ số: tỷ lệ tăng hoặc giảm giá đất theo khu vực, vị trí, hạ tầng, quy hoạch',28,110,{size:18,w:600,a:P(g('k_h1'),.25)})});
 row(316,'HAI · AI QUYẾT ĐỊNH, BAO LÂU MỘT LẦN',g('k_c2'),a=>{txt('HĐND cấp tỉnh quyết định',28,84,{size:32});txt('3 năm một lần',802,86,{size:38,col:RED,align:'right',a:P(g('k_c2a'),.2)});
  txt('Hiện nay: bảng giá được điều chỉnh hằng năm',28,112,{size:17,w:600,col:GREY,a:P(g('k_c2b'),.25)})},{lw:6});
 row(452,'BA · DÙNG ĐỂ TÍNH',g('k_c3'),a=>{let px=28;px+=chip('Khoản thu từ đất',px,52,g('k_c3a'))+12;px+=chip('Giá khởi điểm đấu giá',px,52,g('k_c3b'))+12;chip('Tiền bồi thường',px,52,g('k_c3c'))});
 source(SRC2,1)}
function sT(t){const t0=g('s7');title(null,'BỒI THƯỜNG KHI THU HỒI ĐẤT',t0,{sub:'Thứ tự các hình thức bồi thường về đất theo luật mới'});
 photoCard('digger',64,206,236,300,t0+.3,{rot:-.03});
 const X=360,Wd=870,Hh=100,ys=[176,316,456];
 box(X,ys[0],Wd,Hh,g('k_b1')-.1,{lw:6},a=>{badge(1,52,50,g('k_b1'),24);txt('Đất cùng mục đích sử dụng',100,62,{size:34})});
 arrow(420,ys[0]+Hh+6,420,ys[1]-6,g('k_b2')-.1,.18);txt('Nếu không có',446,ys[1]-13,{size:19,w:600,col:GREY,a:P(g('k_b2'),.2)});
 box(X,ys[1],Wd,Hh,g('k_b2')+.4,{},a=>{badge(2,52,50,g('k_b2')+.5,24);txt('Đất khác mục đích, hoặc nhà ở',100,48,{size:30,a:P(g('k_b2a'),.2)});txt('Khi địa phương còn quỹ đất, quỹ nhà ở và người dân có nhu cầu',100,80,{size:17,w:600,col:GREY})});
 arrow(420,ys[1]+Hh+6,420,ys[2]-6,g('k_b3')-.1,.18);txt('Nếu vẫn không có',446,ys[2]-13,{size:19,w:600,col:GREY,a:P(g('k_b3'),.2)});
 box(X,ys[2],Wd,Hh,g('k_b3a')-.2,{},a=>{badge(3,52,50,g('k_b3a')-.1,24);txt('Bồi thường bằng tiền',100,62,{size:34});icon('coin',760,14,72,g('k_b3a')+.2,.5)});
 txt('Thu hồi đất ở, nhà ở: có quy định riêng',795,592,{size:20,w:600,align:'center',a:P(g('k_b4'),.25)});
 source(SRC_BT,1)}
function sW(t){const t0=g('s8');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 box(330,160,620,84,t0+.25,{lw:6},a=>{const a1='Bảng giá đất',a2='Hệ số điều chỉnh',w1=tw(a1,30),w2=tw(a2,30),st=310-(w1+w2+56)/2;txt(a1,st,54,{size:30});mult(st+w1+28,44,9,RED,1,4);txt(a2,st+w1+56,54,{size:30})});
 const bx=[60,465,870],ic=['paper','house','coin'],lab=[['Người nộp tiền sử dụng đất,','tiền thuê đất'],['Người có đất','bị thu hồi'],['Người tham gia','đấu giá đất']],ts=[g('k_w1'),g('k_w2'),g('k_w3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.2;arrow(640+(i-1)*160,248,bx[i]+175,318,ti,.2);box(bx[i],324,350,210,ti+.15,{},a=>{icon(ic[i],137,14,76,ti+.3,.5);txt(lab[i][0],175,140,{size:i==0?21:26,align:'center'});txt(lab[i][1],175,176,{size:i==0?21:26,align:'center'})})}
 source(SRC2,1)}
function sD(t){const t0=g('s9');title(null,'ÁP DỤNG TỪ KHI NÀO?',t0);
 sketch([seg(110,300,1170,300,5)],t0+.3,.6,{lw:6});
 const p1=P(t0+.9,.25);dot(380,300,11,INK,p1);txt('01/7/2027',380,262,{size:34,align:'center',a:p1});txt('Luật có hiệu lực',380,338,{size:20,w:600,col:GREY,align:'center',a:p1});
 const p2=P(g('k_t1')-.2,.25);dot(900,300,13,RED,p2);txt('01/01/2028',900,260,{size:46,col:RED,align:'center',a:p2});
 box(700,328,400,96,g('k_t1'),{lw:6},a=>{txt('Áp dụng bảng giá đất',200,42,{size:25,align:'center'});txt('và hệ số điều chỉnh mới',200,76,{size:25,align:'center'})});
 box(120,374,520,96,g('k_t2'),{col:GREY},a=>{txt('ĐẾN HẾT 31/12/2027',26,38,{size:19,col:GREY,ls:2});txt('Giá đất tính theo quy định hiện hành',26,74,{size:22})});
 box(140,492,1000,76,g('s10'),{},a=>{txt('CÒN CHỜ',30,47,{size:19,col:RED,ls:2});txt('Chính phủ và từng tỉnh quy định cách xây dựng bảng giá, hệ số',150,47,{size:22,w:600})});
 source('Nguồn: VietnamPlus, VTV, Znews (11/2026). Quy định hiện hành: Luật Đất đai 2024 và Nghị quyết 254/2025/QH15.',1)}
function sE(t){vxTodo(g('s11'),[[g('k_e1'),'Theo dõi bảng giá đất và hệ số điều chỉnh','mà tỉnh mình công bố'],[g('s12'),'Sắp nộp tiền sử dụng đất: hỏi cơ quan thuế,','cơ quan đất đai về mức giá áp dụng'],[g('s13'),'Đất trong diện thu hồi: hỏi rõ phương án','bồi thường, giữ đủ giấy tờ về đất']])}
function sF(t){vxDisclaimer(g('out'),'Luật Đất đai (sửa đổi) · thông qua 21/11/2026 · hiệu lực 01/7/2027',SOHIEU,g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật Đất đai (sửa đổi)  ·  thông qua 21/11/2026  ·  hiệu lực 01/7/2027',
 images:{plots:'img/plots.jpg',houses:'img/houses.jpg',survey:'img/survey.jpg',digger:'img/digger.jpg',gavel:'img/gavel.jpg'},
 scenes:[[0,sA],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sC],[()=>g('s7')-.15,sT],[()=>g('s8')-.15,sW],[()=>g('s9')-.15,sD],[()=>g('s11')-.15,sE],[()=>g('out')-.15,sF]]});
