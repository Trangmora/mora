// Tập: Người tiêu dùng được chọn từng mục đích dùng dữ liệu (Luật sửa đổi 4 luật, trong đó có Luật Bảo vệ quyền lợi người tiêu dùng). Nghiêm túc, khoảng 2 phút 10 giây.
const SRC1='Nguồn: VOV, VietnamPlus, Báo Nhân Dân, Báo Công Thương, VnEconomy (13/11/2026)';
const SRC2='Nguồn: VOV ("Luật Bảo vệ quyền lợi người tiêu dùng vừa sửa đổi: Người dân có thêm quyền gì?"), Báo Pháp luật Việt Nam. Chờ đối chiếu văn bản gốc.';
function sA(t){
 photoCard('check',70,170,400,390,.1,{rot:-.035});
 stamp('TỪ 01/7/2027',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Người tiêu dùng được',510,236,{size:50,a:P(g('k_dn'),.2)});txt('chọn từng mục đích',510,302,{size:50,col:RED,a:P(g('k_chon')-.1,.2)});
 underline(510,320,tw('chọn từng mục đích',50),g('k_chon')+.4,.4);
 box(510,370,660,186,g('k_chung')-.3,{lw:6},a=>{txt('THU THẬP, SỬ DỤNG THÔNG TIN',34,54,{size:22,col:GREY,ls:2});txt('Không chỉ một lần',30,118,{size:44});txt('"đồng ý chung"',30,166,{size:44,col:RED,a:P(g('k_chung')+.3,.2)})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('QUYỀN DỮ LIỆU NGƯỜI TIÊU DÙNG',310,62,{size:32,align:'center'})});
 const bx=[40,345,650,955],lab=[['Luật','nào?'],['Hiện nay','ra sao?'],['Điểm mới','là gì?'],['Bạn nên','làm gì?']],ts=[g('k_m1'),g('k_m2'),g('k_m3'),g('k_m4')];
 const ic=['paper','shop','phone','calendar'];
 for(let i=0;i<4;i++){const ti=ts[i]-.25;arrow(640+(i-1.5)*110,200,bx[i]+142,282,ti,.2);
  box(bx[i],288,285,230,ti+.18,i==3?{col:GREEN}:{},a=>{icon(ic[i],100,16,86,ti+.3,.45,i==3?{col:GREEN}:{});badge(i+1,36,150,ti+.25,22,i==3?GREEN:RED);txt(lab[i][0],70,150,{size:26});txt(lab[i][1],70,190,{size:26})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'LUẬT NÀO?',t0);
 const y=176,h=330;
 box(50,y,350,h,t0+.3,{lw:6},a=>{txt('LUẬT SỬA ĐỔI 4 LUẬT',175,58,{size:20,col:GREY,align:'center',ls:1});['Thương mại','Cạnh tranh','Quản lý ngoại thương'].forEach((s,i)=>txt(s,175,112+i*40,{size:24,w:600,align:'center'}));txt('Bảo vệ quyền lợi',175,240,{size:28,col:RED,align:'center',a:P(g('k_l4'),.2)});txt('người tiêu dùng',175,276,{size:28,col:RED,align:'center',a:P(g('k_l4'),.2)})});
 arrow(408,y+h/2,460,y+h/2,g('k_qh')-.3,.2);
 box(468,y,350,h,g('k_qh'),{},a=>{txt('QUỐC HỘI THÔNG QUA',175,58,{size:21,col:GREY,align:'center',ls:1});icon('paper',125,80,100,g('k_qh')+.2,.5);txt('13/11/2026',175,236,{size:46,align:'center'});txt('458 đại biểu tán thành',175,286,{size:22,w:600,col:GREY,align:'center',a:P(g('k_phieu'),.2)})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC CHUNG TỪ',175,58,{size:20,col:GREY,align:'center',ls:1});icon('calendar',125,80,100,g('k_hl')+.2,.5);txt('01/7/2027',175,250,{size:50,col:RED,align:'center'})});
 txt('Số hiệu luật: chờ công bố chính thức',640,560,{size:20,w:600,col:GREY,align:'center',a:P(g('k_hl')+.6,.3)});
 source(SRC1+'; ngày hiệu lực: VOV, Báo Pháp luật Việt Nam, Báo Quảng Ninh',1)}
function chip(s,px,py,t0,col){const w=tw(s,26)+44;box(px,py,w,62,t0,{lw:3,r:31,col},a=>{txt(s,w/2,41,{size:26,align:'center'})});return w}
function sB(t){const t0=g('s2');title(null,'THÔNG TIN NGƯỜI TIÊU DÙNG',t0);
 box(60,170,540,370,g('k_tt')-.2,{},a=>{photo('laptop',14,14,512,160);txt('BẠN CUNG CẤP KHI MUA HÀNG',30,216,{size:20,col:GREY,ls:1});
  ['Họ tên','Số điện thoại','Địa chỉ'].forEach((s,i)=>txt('• '+s,30,262+i*36,{size:28,a:P(g(['k_v1','k_v2','k_v3'][i]),.2)}))});
 txt('DOANH NGHIỆP DÙNG CHO',700,214,{size:21,col:GREY,ls:2,a:P(g('k_md'),.2)});
 const M=[['Giao hàng','k_md1'],['Chăm sóc khách hàng','k_md2'],['Quảng cáo','k_md3']];M.forEach(([s,k],i)=>chip(s,700,244+i*88,g(k)-.1));
 source('Ví dụ minh họa.',1)}
function sH(t){const t0=g('s3');title(null,'HIỆN NAY',t0,{sub:'Luật Bảo vệ quyền lợi người tiêu dùng 2023 (Luật 19/2023/QH15), Điều 17'});
 box(60,200,540,320,g('k_h1')-.2,{col:GREY},a=>{icon('paper',30,30,100,g('k_h1'),.5);txt('PHẢI LÀM',150,72,{size:22,col:GREY,ls:3});txt('Thông báo mục đích,',30,190,{size:32});txt('phạm vi thu thập',30,232,{size:32});txt('và được đồng ý',30,274,{size:32,col:RED})});
 box(680,200,540,320,g('k_h2'),{col:GREY},a=>{icon('shield',30,30,100,g('k_h2'),.5);txt('BỊ CẤM',150,72,{size:22,col:RED,ls:3});txt('Buộc đồng ý thu thập',30,190,{size:32});txt('thông tin làm điều kiện',30,232,{size:32});txt('giao kết hợp đồng',30,274,{size:32,col:RED})});
 source('Nguồn: Luật Bảo vệ quyền lợi người tiêu dùng số 19/2023/QH15 (văn bản hiện hành, theo Thư viện Pháp luật).',1)}
function sN(t){const t0=g('s4');title(null,'ĐIỂM MỚI: KHOẢN 2 ĐIỀU 17',t0);
 box(60,180,1160,150,g('k_n2')-.2,{lw:6},a=>{txt('Doanh nghiệp phải có cách thức rõ ràng để người tiêu dùng',34,62,{size:32});txt('chọn riêng từng mục đích, phạm vi',34,112,{size:38,col:RED,a:P(g('k_n3'),.2)})});
 const L=[['Giao hàng',true],['Chăm sóc khách hàng',true],['Quảng cáo',false]];
 L.forEach(([s,ok],i)=>box(60+i*390,370,360,130,g('k_n4')+i*.35,{col:ok?GREEN:RED,lw:4},a=>{txt(s,30,58,{size:28});txt(ok?'Đồng ý':'Không đồng ý',30,100,{size:26,w:600,col:ok?GREEN:RED})}));
 txt('Minh họa: mỗi mục đích một lựa chọn riêng',640,550,{size:20,w:600,col:GREY,align:'center',a:P(g('k_n4')+1,.3)});
 source(SRC2,1)}
function sV(t){const t0=g('s5');title(null,'VÍ DỤ',t0);
 box(60,180,540,300,g('k_e1a')-.2,{},a=>{icon('phone',30,40,150,g('k_e1a'),.5);txt('Số điện thoại',190,90,{size:32});txt('✓ Giao hàng',190,150,{size:32,col:GREEN});txt('✗ Quảng cáo',190,204,{size:32,col:RED,a:P(g('k_e1b'),.2)})});
 box(680,180,540,300,g('k_e1c'),{lw:6},a=>{txt('THEO BÁO CHÍ',30,56,{size:22,col:GREY,ls:3});txt('Không còn gộp chung',30,120,{size:34});txt('điều khoản để buộc bấm',30,164,{size:34});txt('"Đồng ý tất cả"',30,220,{size:40,col:RED})});
 source('Ví dụ minh họa. Nguồn: Báo Pháp luật Việt Nam ("Kỳ 1: Chặn đứng tình trạng đánh đổi dữ liệu để mua sắm trực tuyến"), VOV.',1)}
function sW(t){const t0=g('s6');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 box(60,180,540,320,g('k_a1')-.2,{},a=>{photo('boxes',14,14,512,160);txt('Tổ chức, cá nhân kinh doanh',30,216,{size:28});txt('Sàn TMĐT, ứng dụng, cửa hàng',30,258,{size:26,w:600})});
 box(680,180,540,150,g('k_a2'),{col:GREY},a=>{txt('TRƯỚC 01/7/2027',30,50,{size:21,col:GREY,ls:2});txt('Áp dụng luật hiện hành',30,104,{size:32})});
 box(680,350,540,150,g('k_a3'),{lw:6},a=>{txt('SỐ HIỆU LUẬT',30,50,{size:21,col:RED,ls:2});txt('Chờ công bố chính thức',30,104,{size:32})});
 source(SRC1,1)}
function sE(t){vxTodo(g('s7'),[[g('k_e1'),'Đọc kỹ màn hình xin đồng ý,','đừng bấm "đồng ý tất cả" theo thói quen'],[g('s8'),'Từ chối mục đích bạn không muốn:','quảng cáo, chia sẻ cho bên thứ ba'],[g('s9'),'Bị buộc đồng ý mới được mua hàng:','lưu bằng chứng, phản ánh cơ quan quản lý'],[g('s10'),'Doanh nghiệp: tách riêng từng mục đích','trong mẫu xin đồng ý trước 01/7/2027']])}
function sF(t){vxDisclaimer(g('out'),'Luật sửa đổi Luật Thương mại, Cạnh tranh, Quản lý ngoại thương, Bảo vệ QLNTD','Thông qua 13/11/2026 · hiệu lực 01/7/2027 · Số hiệu: chờ công bố chính thức',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Luật sửa đổi 4 luật (có Luật Bảo vệ quyền lợi người tiêu dùng)  ·  thông qua 13/11/2026  ·  hiệu lực 01/7/2027',
 images:{check:'img/check.jpg',laptop:'img/laptop.jpg',boxes:'img/boxes.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sH],[()=>g('s4')-.15,sN],[()=>g('s5')-.15,sV],[()=>g('s6')-.15,sW],[()=>g('s7')-.15,sE],[()=>g('out')-.15,sF]]});
