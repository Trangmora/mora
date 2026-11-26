// Tập: Học bạ số và kiểm tra định kỳ trên máy tính (Thông tư 89/2026/TT-BGDĐT). Nghiêm túc, khoảng 2 phút 6 giây.
const SRC1='Nguồn: Cổng TTĐT Chính phủ (Xây dựng chính sách), Tiền Phong, Dân trí, Báo Công Thương, LuatVietnam';
const SRC2='Nguồn: Tiền Phong, Báo Công Thương, Báo Xây dựng, Dân trí, Báo Đầu tư. Chờ đối chiếu văn bản gốc.';
function sA(t){
 photoCard('lab',70,170,420,380,.1,{rot:-.035});
 stamp('TỪ 01/12/2026',1060,128,P(.35,.4),{size:30,rot:.05});
 txt('Kiểm tra định kỳ',530,236,{size:54,a:P(g('k_th')-.1,.2)});txt('trên máy tính',530,306,{size:54,col:RED,a:P(g('k_mt')-.1,.2)});
 underline(530,324,tw('trên máy tính',54),g('k_mt')+.3,.4);
 box(530,372,640,186,g('k_hb'),{lw:6},a=>{txt('HỒ SƠ ĐÁNH GIÁ HỌC SINH',34,54,{size:24,col:GREY,ls:2});txt('+ Học bạ số',30,140,{size:66,col:RED})});
 source(SRC1,P(1,.4))}
function sM(t){const t0=g('op2');
 box(330,100,620,96,t0+.1,{lw:6},a=>{txt('THÔNG TƯ 89/2026',310,62,{size:36,align:'center'})});
 const bx=[60,465,870],lab=[['Quy định','nằm ở đâu?'],['Điều gì','thay đổi?'],['Phụ huynh','nên làm gì?']],ph=['note','lab','class'],ts=[g('k_m1'),g('k_m2'),g('k_m3')];
 for(let i=0;i<3;i++){const ti=ts[i]-.25;arrow(640+(i-1)*160,200,bx[i]+175,272,ti,.2);
  box(bx[i],278,350,250,ti+.18,i==2?{col:GREEN}:{},a=>{photo(ph[i],12,12,326,118);badge(i+1,40,176,ti+.25,22,i==2?GREEN:RED);txt(lab[i][0],76,170,{size:28});txt(lab[i][1],76,208,{size:28})})}
 source(SRC1,1)}
function sP(t){const t0=g('s1');title(null,'QUY ĐỊNH Ở ĐÂU?',t0);
 const y=176,h=330;
 box(50,y,350,h,g('k_tt')-.25,{lw:6},a=>{txt('THÔNG TƯ BỘ GD-ĐT',175,58,{size:20,col:GREY,align:'center',ls:1});txt('89/2026',175,160,{size:62,col:RED,align:'center'});txt('/TT-BGDĐT',175,206,{size:30,align:'center'})});
 arrow(408,y+h/2,460,y+h/2,g('k_bh')-.3,.2);
 box(468,y,350,h,g('k_bh'),{},a=>{txt('NGÀY BAN HÀNH',175,58,{size:21,col:GREY,align:'center',ls:1});icon('paper',125,80,100,g('k_bh')+.2,.5);txt('16/10/2026',175,250,{size:48,align:'center'})});
 arrow(826,y+h/2,878,y+h/2,g('k_hl')-.3,.2);
 box(886,y,350,h,g('k_hl'),{lw:6},a=>{txt('CÓ HIỆU LỰC TỪ',175,58,{size:21,col:GREY,align:'center',ls:1});icon('calendar',125,80,100,g('k_hl')+.2,.5);txt('01/12/2026',175,250,{size:48,col:RED,align:'center'})});
 txt('Sửa đổi quy định đánh giá học sinh tiểu học (TT 27/2020) và THCS, THPT (TT 22/2021)',640,560,{size:20,w:600,col:GREY,align:'center',a:P(g('k_sd'),.3)});
 source(SRC1+', THCS Sài Đồng (Hà Nội)',1)}
function sB(t){const t0=g('s2');title(null,'HIỂU CHO ĐÚNG',t0);
 box(60,180,540,330,g('k_dk')-.2,{},a=>{icon('paper',30,30,110,g('k_dk'),.5);txt('KIỂM TRA ĐỊNH KỲ',160,74,{size:22,col:GREY,ls:2});txt('Giữa kỳ, cuối kỳ',30,200,{size:40});txt('Đánh giá kết quả học tập',30,252,{size:28,w:600})});
 box(680,180,540,330,g('k_hb2'),{},a=>{photo('note',14,14,512,140);txt('HỌC BẠ',30,200,{size:22,col:GREY,ls:3});txt('Hồ sơ kết quả học tập,',30,246,{size:32});txt('rèn luyện qua từng năm',30,288,{size:32})});
 source('Nguồn: Thông tư 22/2021/TT-BGDĐT và Thông tư 27/2020/TT-BGDĐT (văn bản hiện hành). Diễn đạt bằng lời thường.',1)}
function sN(t){const t0=g('s3');title(null,'TRƯỚC VÀ SAU',t0);
 box(60,180,540,370,g('k_cu')-.2,{col:GREY},a=>{photo('class',14,14,512,170);txt('LÂU NAY',30,226,{size:22,col:GREY,ls:3});txt('Bài kiểm tra: chủ yếu trên giấy',30,274,{size:28});txt('Học bạ: sổ giấy',30,318,{size:28,a:P(g('k_cu2'),.2)})});
 box(680,180,540,370,g('k_n1'),{lw:7},a=>{photo('lab',14,14,512,170);txt('TỪ 01/12/2026',30,226,{size:22,col:RED,ls:3});txt('THCS, THPT được kiểm tra',30,274,{size:28});txt('định kỳ trên máy tính',30,314,{size:28,col:RED});txt('nếu đủ cơ sở vật chất, hạ tầng CNTT',30,352,{size:22,w:600,a:P(g('k_n2'),.2)})});
 stamp('KHÔNG BẮT BUỘC MỌI TRƯỜNG',1000,112,P(g('k_n3'),.4),{size:24,rot:.04,col:GREEN});
 source(SRC2,1)}
function sV(t){const t0=g('s5');title(null,'BÀI LÀM TRÊN MÁY CÓ GIÁ TRỊ KHÔNG?',t0);
 box(60,190,540,300,g('k_g1')-.2,{},a=>{icon('phone',30,40,150,g('k_g1'),.5);txt('Bài làm và kết quả',190,120,{size:32});txt('trên máy tính',190,166,{size:32,col:RED});txt('= bài làm trên giấy',190,226,{size:32})});
 box(680,190,540,300,g('k_g2'),{lw:6},a=>{txt('ĐIỀU KIỆN',30,56,{size:22,col:RED,ls:3});['• Toàn vẹn','• Xác thực','• Bảo mật'].forEach((s,i)=>txt(s,30,124+i*56,{size:36,a:P(g('k_g2')+i*.5,.2)}))});
 source(SRC2,1)}
function sS(t){const t0=g('s6');title(null,'HỌC BẠ SỐ',t0,{sub:'Một thành phần của hồ sơ đánh giá học sinh'});
 box(60,196,1160,110,g('k_s1')-.2,{lw:6},a=>{txt('Học bạ số: chính thức có trong hồ sơ đánh giá',34,70,{size:38})});
 txt('Ở TIỂU HỌC',60,368,{size:22,col:GREY,ls:3,a:P(g('k_s2'),.2)});
 box(60,390,500,170,g('k_s2')+.3,{},a=>{badge(1,44,48,g('k_s2')+.4,22);txt('Giáo viên môn học',80,58,{size:30});txt('ký số kết quả môn mình dạy',30,118,{size:26,w:600})});
 arrow(572,475,648,475,g('k_s3')-.3,.22);
 box(660,390,560,170,g('k_s3'),{lw:6},a=>{badge(2,44,48,g('k_s3')+.1,22);txt('Giáo viên chủ nhiệm',80,58,{size:30});txt('ký số học bạ của lớp',30,118,{size:26,w:600,col:RED})});
 source('Nguồn: Tiền Phong, Báo Thanh Hóa, Báo Xây dựng, Trung tâm Phục vụ hành chính công Nghệ An. Chờ đối chiếu văn bản gốc.',1)}
function sD(t){const t0=g('s7');title(null,'ĐỀ KIỂM TRA CHUNG CỦA SỞ',t0);
 box(60,190,540,330,g('k_d1')-.2,{lw:6},a=>{icon('paper',30,30,110,g('k_d1'),.5);txt('SỞ GD-ĐT',160,72,{size:22,col:GREY,ls:3});txt('Xây dựng đề',30,200,{size:40});txt('kiểm tra định kỳ chung',30,250,{size:32});txt('một số môn tính điểm',30,292,{size:28,w:600})});
 const L=['Lớp 5','Lớp 9','Lớp 12'];L.forEach((s,i)=>box(680,190+i*114,540,96,g('k_d2')+i*.4,{},a=>{txt(s,270,64,{size:44,col:RED,align:'center'})}));
 source('Nguồn: Báo Tin tức (TTXVN), Cổng TTĐT Chính phủ (Xây dựng chính sách), LuatVietnam.',1)}
function sW(t){const t0=g('s8');title(null,'AI BỊ ẢNH HƯỞNG?',t0);
 box(60,190,540,320,g('k_a1')-.2,{},a=>{photo('class',14,14,512,170);txt('Học sinh tiểu học, THCS, THPT',30,232,{size:28});txt('và phụ huynh',30,274,{size:28})});
 box(680,190,540,320,g('k_a2'),{lw:6},a=>{icon('bars',30,40,120,g('k_a2'),.5);txt('Kiểm tra trên máy:',180,100,{size:30});txt('tùy điều kiện',180,144,{size:30,col:RED});txt('từng trường',180,186,{size:30,col:RED});txt('Mỗi nơi triển khai khác nhau',30,260,{size:24,w:600})});
 source(SRC2,1)}
function sE(t){vxTodo(g('s9'),[[g('k_e1'),'Hỏi trường: kỳ này có kiểm tra','trên máy tính không, môn nào'],[g('s10'),'Cho con làm quen thao tác máy tính:','gõ phím, chọn đáp án, nộp bài'],[g('s11'),'Kiểm tra kỹ thông tin của con','khi trường công bố học bạ số'],[g('s12'),'Lớp 5, 9, 12: theo dõi thông báo','của Sở về đề kiểm tra chung']])}
function sF(t){vxDisclaimer(g('out'),'Thông tư 89/2026/TT-BGDĐT · ban hành 16/10/2026 · hiệu lực 01/12/2026','Sửa đổi quy định đánh giá học sinh tiểu học, THCS và THPT',g('k_src'),SRC1+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Thông tư 89/2026/TT-BGDĐT  ·  ban hành 16/10/2026  ·  hiệu lực 01/12/2026',
 images:{lab:'img/lab.jpg',class:'img/class.jpg',note:'img/note.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sB],[()=>g('s3')-.15,sN],[()=>g('s5')-.15,sV],[()=>g('s6')-.15,sS],[()=>g('s7')-.15,sD],[()=>g('s8')-.15,sW],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
