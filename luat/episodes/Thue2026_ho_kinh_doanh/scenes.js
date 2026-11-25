// Tập: Luật sửa đổi 3 luật thuế (TNDN, sử dụng đất phi nông nghiệp, TNCN), góc hộ kinh doanh và doanh nghiệp nhỏ.
// Mỗi cảnh là một "slide sơ đồ": ô viền đỏ nối nhau bằng mũi tên bút dạ. Hàm riêng của tập viết ở đây, không sửa khung chung.
const SRC1='Nguồn: Cổng TTĐT Chính phủ, Báo Nhân Dân, Đại biểu Nhân dân, VOV (20/11/2026)';
const SRC2='Nguồn: Nhân Dân, Tuổi Trẻ, Thanh Niên, Dân trí (20–21/11/2026). Chờ đối chiếu văn bản chính thức.';
const SRC3='Nguồn: VOV, TTXVN, VietnamPlus, VnExpress, VTV (20/11/2026). Chờ đối chiếu văn bản chính thức.';
const TINT='#f1e2c4';
const cup=(px,py,s)=>[poly([[px+s*.28,py+s*.3],[px+s*.72,py+s*.3],[px+s*.64,py+s*.92],[px+s*.36,py+s*.92]],1,true),seg(px+s*.22,py+s*.3,px+s*.78,py+s*.3,2),seg(px+s*.56,py+s*.3,px+s*.66,py+s*.04,3),
 circ(px+s*.44,py+s*.8,s*.035,0,6.4,4),circ(px+s*.55,py+s*.75,s*.035,0,6.4,5),circ(px+s*.5,py+s*.86,s*.035,0,6.4,6)];
const parcel=(px,py,s)=>[...IC.phone(px-s*.2,py,s),poly([[px+s*.55,py+s*.5],[px+s*.98,py+s*.5],[px+s*.98,py+s*.9],[px+s*.55,py+s*.9]],7,true),seg(px+s*.765,py+s*.5,px+s*.765,py+s*.66,8)];
const grass=(px,py,s)=>{const o=[seg(px+s*.04,py+s*.8,px+s*.96,py+s*.8,1)];for(let i=0;i<5;i++){const bx=px+s*(.16+.17*i),by=py+s*.8,h=s*(.24+.1*R(i+9));o.push(seg(bx,by,bx-s*.06,by-h*.8,i*3+2),seg(bx,by,bx,by-h,i*3+3),seg(bx,by,bx+s*.06,by-h*.8,i*3+4))}return o};
// ảnh nếu có, không thì nền nhạt + biểu tượng bút dạ
function pic(key,ic,px,py,w,h,t0){if(IMG[key]){photo(key,px,py,w,h);return}x.save();x.fillStyle=TINT;rr(px,py,w,h,8);x.fill();x.restore();const s=Math.min(w,h)*.9;sketch(ic(px+(w-s)/2,py+(h-s)/2,s),t0,.5)}
function strikeS(px,py,w,t0){return sketch([seg(px-6,py+4,px+w+6,py-5,px+2)],t0,.25,{col:RED,lw:6})}

function sA(t){const bx=[60,470,880],lab=['Bán phở','Bán trà sữa','Bán hàng online'],ks=[.12,g('k_tra')-.05,g('k_onl')-.05],ics=[IC.shop,cup,parcel],keys=['pho','tra','online'];
 for(let i=0;i<3;i++)box(bx[i],110,340,258,ks[i],{},a=>{pic(keys[i],ics[i],14,14,312,176,ks[i]+.25);txt(lab[i],170,232,{size:30,align:'center'})});
 const tq=g('k_2027');for(let i=0;i<3;i++)arrow(bx[i]+170,372,bx[i]+170+(1-i)*60,398,tq-.15+i*.1,.15);
 box(160,404,960,172,tq+.1,{lw:6},a=>{txt('TỪ NĂM 2027',40,52,{size:24,col:GREY,ls:3});txt('CÁCH TÍNH THUẾ CÓ THỂ ĐỔI',36,134,{size:58,col:RED,a:P(g('k_cach')-.1,.2)})});
 source(SRC2,P(.6,.4))}
function sM(t){const t0=g('op2'),tb=g('k_ba');
 box(340,92,600,92,t0+.1,{lw:6},a=>{txt('LUẬT SỬA ĐỔI 3 LUẬT THUẾ',300,60,{size:34,align:'center'})});
 const bx=[60,465,870],lab=[['Khi nào','áp dụng?'],['Hộ kinh doanh:','được chọn cách tính'],['Doanh nghiệp nhỏ:','miễn thuế 3 năm']],keys=['gavel','pho','shop'],ics=[IC.paper,IC.shop,IC.shop];
 for(let i=0;i<3;i++){const ti=t0+.55+i*.35;arrow(640+(i-1)*150,188,bx[i]+175,258,ti,.2);
  box(bx[i],264,350,214,ti+.18,{},a=>{pic(keys[i],ics[i],12,12,326,92,ti+.3);badge(i+1,38,140,ti+.25,20);txt(lab[i][0],68,148,{size:24});txt(lab[i][1],68,182,{size:24})})}
 const te=Math.max(tb+.2,t0+1.75);arrow(640,482,640,502,te,.15);box(390,508,500,80,te+.12,{col:GREEN,lw:5},a=>{txt('BẠN NÊN LÀM GÌ?',250,53,{size:32,col:GREEN,align:'center'})});
 source(SRC1,1)}
function sB(t){const t0=g('s1');title(1,'KHI NÀO ÁP DỤNG?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_tq')-.1,{},a=>{photo('gavel',14,14,322,140);txt('QUỐC HỘI THÔNG QUA',175,196,{size:21,col:GREY,align:'center',ls:1});txt('20/11/2026',175,254,{size:46,align:'center',a:P(g('k_ngay'),.2)});txt('Sửa 3 luật thuế trong 1 luật',175,296,{size:21,w:600,col:GREY,align:'center',a:P(g('k_ngay')+1.6,.25)})});
 arrow(408,y+h/2,460,y+h/2,g('k_phieu')-.3,.2);
 box(468,y,350,h,g('k_phieu'),{},a=>{txt('PHIẾU TÁN THÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});txt('475',175,196,{size:120,align:'center'});txt('trên 477 đại biểu',175,250,{size:25,w:600,align:'center',a:P(g('k_477'),.2)});txt('tham gia biểu quyết',175,284,{size:25,w:600,align:'center',a:P(g('k_tt'),.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',115,78,120,g('k_hl')+.25,.5);txt('01/01/2027',175,270,{size:52,col:RED,align:'center',a:P(g('k_hl2'),.2)})});
 txt('Số hiệu luật: chờ công bố chính thức',640,558,{size:19,w:600,col:GREY,align:'center',a:P(g('k_hl2')+1.1,.3)});
 source(SRC1,1)}
function rowC(y,h,lab,t0,fn,o={}){arrow(322,350,382,y+h/2,t0-.05,.2);box(390,y,840,h,t0+.13,o,a=>{txt(lab,28,36,{size:19,col:GREY,ls:2});fn(a)})}
function sC(t){const t0=g('s2');title(2,'HỘ KINH DOANH: ĐƯỢC CHỌN CÁCH TÍNH THUẾ',t0,{size:38,y:112,sub:'Áp dụng từ kỳ tính thuế năm 2027'});
 box(50,206,264,290,g('k_ho')-.1,{lw:6},a=>{photo('pho',14,14,236,160);txt('Hộ, cá nhân',132,218,{size:27,align:'center'});txt('kinh doanh',132,254,{size:27,align:'center'})});
 rowC(178,196,'DOANH THU TRÊN 1 TỶ ĐẾN 10 TỶ ĐỒNG / NĂM',g('k_1ty'),a=>{hl(26,54,tw('Được chọn',32)+6,38,P(g('k_nho'),.3));txt('Được chọn 1 trong 2 cách tính thuế',28,84,{size:32,a:P(g('k_chon'),.2)});
  box(28,106,384,68,g('k_c1'),{lw:3,r:10,fill:'#fff'},b=>{badge(1,36,34,g('k_c1')+.1,17);txt('Tỷ lệ % trên doanh thu',64,43,{size:25})});
  box(428,106,384,68,g('k_c2'),{lw:3,r:10,fill:'#fff'},b=>{badge(2,36,34,g('k_c2')+.1,17);txt('Theo thu nhập',64,43,{size:25})})},{lw:6});
 rowC(388,96,'TRƯỚC ĐÂY',g('s3')+.1,a=>{const s0='Ngưỡng được chọn:  ',w0=tw(s0,30),w1=tw('3 tỷ đồng',30);txt(s0,28,78,{size:30});txt('3 tỷ đồng',28+w0,78,{size:30,col:GREY,a:P(g('k_3ty')-.2,.2)});strikeS(28+w0,66,w1,g('k_3ty')+.5);
  txt('→  10 tỷ đồng',28+w0+w1+22,78,{size:30,col:RED,a:P(g('k_3ty')+.7,.2)})});
 stamp('CHỌN ≠ MIỄN',182,552,P(g('k_kmien'),.4),{size:28,rot:-.07});
 rowC(498,96,'DOANH THU ĐẾN 1 TỶ ĐỒNG / NĂM',g('k_d1ty')-.3,a=>{txt('Không phải nộp thuế',28,78,{size:32,col:GREEN,a:P(g('k_knop'),.2)});txt('Đã có từ trước (Nghị định 141/2026),',478,58,{size:17,w:600,col:GREY,a:P(g('k_qd'),.25)});txt('không thuộc luật mới',478,80,{size:17,w:600,col:GREY,a:P(g('k_qd'),.25)})},{col:GREEN});
 source(SRC2,1)}
// mảnh đất trống: nền nhạt, vạch đất, cỏ; lúc tg cỏ mọc cao thêm (nét xanh)
function land(px,py,w,h,t0,tg){if(IMG.land){photo('land',px,py,w,h);return}x.save();x.fillStyle=TINT;rr(px,py,w,h,8);x.fill();x.restore();
 const gy=py+h-20,st=[seg(px+16,gy,px+w-16,gy,1)],st2=[];
 for(let i=0;i<9;i++){const bx=px+34+i*(w-68)/8,hh=16+14*R(i+3);st.push(seg(bx,gy,bx-6,gy-hh*.8,i*3+2),seg(bx,gy,bx,gy-hh,i*3+3),seg(bx,gy,bx+6,gy-hh*.8,i*3+4));
  const h2=44+26*R(i+11);st2.push(seg(bx+9,gy,bx+4,gy-h2*.8,i*3+40),seg(bx+9,gy,bx+10,gy-h2,i*3+41),seg(bx+9,gy,bx+17,gy-h2*.75,i*3+42))}
 sketch(st,t0,.5);sketch(st2,tg,.7,{col:GREEN,lw:4})}
function sD(t){const t0=g('s4');title(3,'DOANH NGHIỆP NHỎ VÀ VỪA: MIỄN THUẾ 3 NĂM',t0,{size:38,y:112});
 const y=160,h=350;
 box(50,y,340,h,g('k_dn')-.1,{},a=>{pic('shop',IC.shop,14,14,312,150,g('k_dn')+.15);txt('AI ĐƯỢC HƯỞNG?',170,206,{size:21,col:GREY,align:'center',ls:2});txt('Doanh nghiệp',170,256,{size:32,align:'center'});txt('nhỏ và vừa',170,296,{size:32,align:'center'})});
 arrow(398,y+h/2,442,y+h/2,g('k_mien')-.25,.2);
 box(450,y,380,h,g('k_mien'),{lw:6},a=>{txt('MIỄN THUẾ THU NHẬP',190,44,{size:19,col:GREY,align:'center',ls:1});txt('DOANH NGHIỆP',190,70,{size:19,col:GREY,align:'center',ls:1});txt('3 NĂM',190,176,{size:96,col:RED,align:'center',a:P(g('k_3nam')-.15,.2)});
  txt('tính từ khi được cấp',190,232,{size:23,w:600,align:'center',a:P(g('k_giay'),.2)});txt('giấy chứng nhận đăng ký',190,264,{size:23,w:600,align:'center',a:P(g('k_gcn'),.2)});txt('doanh nghiệp lần đầu',190,296,{size:23,w:600,align:'center',a:P(g('k_dk')+.3,.2)})});
 const td=g('s5')-.05;
 box(890,y,340,h,td,{},a=>{txt('THÊM: ĐẤT BỎ HOANG',170,46,{size:21,col:RED,align:'center',ls:2});land(14,62,312,112,td+.3,g('k_co'));txt('Thuế suất',170,208,{size:22,w:600,align:'center'});txt('0,2%',170,280,{size:76,col:RED,align:'center',a:P(g('k_02')-.1,.2)});
  const dw=tw('từ 01/7/2027',26);txt('từ 01/7/2027',170,320,{size:26,align:'center',a:P(g('k_17'),.2)});underline(170-dw/2,328,dw,g('k_17')+1.1,.3)});
 stamp('CỎ MỌC CŨNG TỐN TIỀN',1060,552,P(g('k_ton'),.4),{size:21,rot:-.06});
 source(SRC3,1)}
function sE(t){const t0=g('s6');const m=tw('BẠN NÊN LÀM GÌ?',48);txt('BẠN NÊN LÀM GÌ?',640,122,{size:48,col:GREEN,align:'center',a:P(t0,.2)});underline(640-m/2,136,m,t0+.25,.35,{col:GREEN});
 const rowE=(i,ti,fn)=>{const y=172+i*138;box(170,y,940,122,ti,{col:GREEN},a=>{check(36,36,54,ti+.25,.25);fn()})};
 rowE(0,g('k_e1'),()=>{txt('Cộng doanh thu cả năm,',130,54,{size:30});txt('xem mình thuộc nhóm nào',130,94,{size:30,a:P(g('k_e1b'),.2)})});
 rowE(1,g('s7'),()=>{txt('Tính thử cả hai cách,',130,54,{size:30});txt('chọn cách có lợi hơn',130,94,{size:30,a:P(g('k_e2b'),.2)})});
 rowE(2,g('s8'),()=>{const a1='Giữ đủ hóa đơn, ',b1='Chờ nghị định hướng dẫn, ';txt(a1,130,54,{size:30});txt('chứng từ',130+tw(a1,30),54,{size:30,a:P(g('k_ct'),.2)});
  txt(b1,130,94,{size:30,a:P(g('k_e3b'),.2)});txt('hỏi cơ quan thuế',130+tw(b1,30),94,{size:30,a:P(g('k_e3c'),.2)})});
 source('Gợi ý chung, không thay cho tư vấn pháp lý.',1)}
function sF(t){const t0=g('out');box(240,140,800,380,t0,{lw:6},a=>{txt('LƯU Ý',400,70,{size:30,col:RED,align:'center',ls:4});
 txt('Nội dung chỉ mang tính thông tin,',400,138,{size:36,w:600,f:'LoraV',align:'center'});txt('không phải tư vấn pháp lý.',400,186,{size:36,w:600,f:'LoraV',align:'center',a:P(g('k_kp')-.1,.2)});
 const p2=P(g('k_kp')+.9,.3);txt('Luật sửa đổi 3 luật thuế · thông qua 20/11/2026 · hiệu lực 01/01/2027',400,250,{size:19,w:600,align:'center',a:p2});txt('Số hiệu luật: chờ công bố chính thức',400,280,{size:19,w:600,col:GREY,align:'center',a:p2});
 txt('Kiểm tra văn bản gốc: vbpl.vn · thuvienphapluat.vn',400,330,{size:22,w:600,col:BLUE,align:'center',a:P(g('k_src'),.3)})});
 source(SRC1+'  ·  Ảnh minh họa: Unsplash',1)}
defineEpisode({header:'Luật sửa đổi 3 luật thuế  ·  thông qua 20/11/2026  ·  hiệu lực 01/01/2027',
 images:{pho:'img/pho.jpg',gavel:'img/gavel.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sB],[()=>g('s2')-.15,sC],[()=>g('s4')-.15,sD],[()=>g('s6')-.15,sE],[()=>g('out')-.15,sF]]});
