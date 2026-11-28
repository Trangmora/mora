// Tập: Nghị định 389/2026/NĐ-CP xử phạt vi phạm hành chính trong kinh doanh xổ số, hiệu lực 30/11/2026 (video lên kênh đúng ngày hiệu lực).
// Nghiêm túc, khoảng 2 phút 20 giây, không nhạc. Mỗi con số có ít nhất 2 nguồn, trong đó ít nhất 1 nguồn nhà nước (xem script.md).
// Mở đầu bằng sơ đồ ô (ảnh + ba con số) để khác tập ND168 mới nhất (mở bằng vxBig).
const SRC_G='Nguồn: Báo Điện tử Chính phủ (baochinhphu.vn), VTV, Báo Nhân Dân, VOV';
const SRC_B='Nguồn: VTV, VOV, Báo Nhân Dân; LuatVietnam';
const SRC_S='Nguồn: Báo Nhân Dân (video 30 triệu), LuatVietnam';
const SRC_V='Nguồn: Báo Điện tử Chính phủ, Báo Nhân Dân, VOV; Dân trí, LuatVietnam';
function sA(t){
 photoCard('glove',60,170,360,410,.1,{rot:-.03});
 stamp('TỪ HÔM NAY 30/11/2026',955,122,P(.3,.4),{size:30,rot:.04});
 txt('Xử phạt trong kinh doanh xổ số',470,232,{size:44,a:P(g('k_qd')-.1,.25)});
 txt('chính thức có hiệu lực',470,290,{size:44,col:RED,a:P(g('k_hl')-.1,.2)});
 underline(470,308,tw('chính thức có hiệu lực',44),g('k_hl')+.3,.4);
 const nums=[['15 triệu',g('k_n15')],['100 triệu',g('k_n100')],['200 triệu',g('k_n200')]];
 nums.forEach(([s,ti],i)=>box(470+i*252,360,236,120,ti-.1,{lw:i?5:4},a=>txt(s,118,76,{size:40,col:RED,align:'center'})));
 txt('Con số nào áp dụng với ai?',470,548,{size:38,a:P(g('k_ai'),.25)});
 const q='?';txt(q,1150,560,{size:90,col:RED,a:P(g('k_ai')+.4,.2)});
 source(SRC_G,P(1,.4))}
function sM(t){const t0=g('op2');
 box(390,100,500,92,t0+.05,{lw:6},a=>txt('NGHỊ ĐỊNH 389/2026/NĐ-CP',250,60,{size:32,align:'center'}));
 const lab=[['Văn bản','nào?'],['Người mua vé','bị phạt khi nào?'],['Hành vi bị','phạt nặng nhất'],['Bạn nên','làm gì?']],ts=[g('k_m1'),g('k_m2'),g('k_m3'),g('k_m4')],ph=['grid',null,'slip',null];
 for(let i=0;i<4;i++){const px=60+i*300,ti=ts[i]-.25,c=i==3?{col:GREEN}:{};arrow(640+(i-1.5)*120,196,px+130,262,ti,.2);
  box(px,268,260,270,ti+.18,c,a=>{if(ph[i])photo(ph[i],12,12,236,110);else icon(i==1?'coin':'shield',80,18,100,ti+.3,.5);
   badge(i+1,130,152,ti+.25,20,i==3?GREEN:RED);txt(lab[i][0],130,204,{size:25,align:'center'});txt(lab[i][1],130,240,{size:25,align:'center',col:i==3?GREEN:INK})})}
 source(SRC_G,1)}
function sP(t){const t0=g('s1');title(null,'NGHỊ ĐỊNH 389/2026/NĐ-CP',t0,{sub:'Xử phạt vi phạm hành chính trong lĩnh vực kinh doanh xổ số'});
 box(450,178,380,100,g('k_cp'),{lw:5},a=>{txt('CƠ QUAN BAN HÀNH',190,40,{size:20,col:GREY,align:'center',ls:3});txt('Chính phủ',190,82,{size:36,align:'center'})});
 txt('Lĩnh vực: kinh doanh xổ số',640,450,{size:28,align:'center',a:P(g('k_lv'),.25)});
 vxTimeline(t0+.6,[[g('k_bh'),'14/10/2026','Chính phủ ký|ban hành'],[g('k_hl2'),'30/11/2026','Có hiệu lực|(hôm nay)']]);
 source(SRC_G+'; Công báo (congbao.chinhphu.vn)',1)}
function sH(t){const t0=g('s2');title(null,'THAY QUY ĐỊNH CŨ',t0);
 box(80,180,470,130,t0+.2,{col:GREY},a=>{txt('TRƯỚC ĐÂY',235,46,{size:22,col:GREY,align:'center',ls:3});txt('Quy định xử phạt cũ',235,96,{size:32,col:'#5a554d',align:'center'})});
 arrow(560,245,700,245,g('k_tt')+.8,.25);
 box(710,180,490,130,g('k_tt')+1,{lw:6},a=>{txt('TỪ 30/11/2026',245,46,{size:22,col:RED,align:'center',ls:3});txt('Nghị định 389/2026',245,96,{size:34,align:'center'})});
 txt('HÌNH THỨC XỬ PHẠT CHÍNH',640,382,{size:24,col:GREY,align:'center',ls:3,a:P(g('k_ht'),.2)});
 box(250,410,340,130,g('k_ht')+.3,{},a=>txt('Cảnh cáo',170,82,{size:44,align:'center'}));
 box(690,410,340,130,g('k_ht2'),{lw:6},a=>txt('Phạt tiền',170,82,{size:44,col:RED,align:'center'}));
 source(SRC_G,1)}
function sB(t){const t0=g('s3');vxBig(g('k_cn')-.3,'MỨC PHẠT TỐI ĐA VỚI CÁ NHÂN','100 triệu','');
 txt('Tổ chức: tối đa 200 triệu đồng',640,494,{size:36,align:'center',a:P(g('k_tc'),.25)});
 txt('Cùng một hành vi: mức phạt cá nhân bằng 1/2 tổ chức',640,552,{size:26,w:600,col:GREY,align:'center',a:P(g('k_nua'),.25)});
 source(SRC_G,1)}
function sQ(t){const t0=g('s4');vxQA(t0,'Người mua vé số có bị phạt không?',g('k_a'),'Không đủ điều kiện dự thưởng mà vẫn mua vé:',null);
 {const a1='Không đủ điều kiện dự thưởng mà vẫn mua vé:';if(P(g('k_mv'),.5)>0){hl(148,444,tw(a1,34),40,P(g('k_mv'),.5));txt(a1,150,472,{size:34})}}
 txt('cảnh cáo hoặc phạt 10–15 triệu đồng',150,526,{size:40,col:RED,a:P(g('k_a2'),.25)});
 txt('Khoản 1 Điều 11',1130,526,{size:22,w:600,col:GREY,align:'right',a:P(g('k_a2')+.6,.25)});
 source(SRC_B,1)}
function sD(t){const t0=g('s5');
 box(340,100,600,100,t0,{lw:6},a=>{txt('KHÔNG ĐỦ ĐIỀU KIỆN',300,46,{size:22,col:GREY,align:'center',ls:3});txt('tham gia dự thưởng xổ số',300,84,{size:32,align:'center'})});
 const it=[['Chưa đủ','18 tuổi',g('k_d1')],['Mất năng lực','hành vi dân sự',g('k_d2')],['Bị hạn chế năng lực','hành vi dân sự',g('k_d2')+.9]];
 it.forEach(([a1,a2,ti],i)=>{const px=70+i*390;arrow(640+(i-1)*150,204,px+175,266,ti-.25,.2);
  box(px,272,350,170,ti,i==0?{lw:6}:{},a=>{badge(i+1,40,44,ti+.1,22);txt(a1,175,96,{size:30,align:'center',col:i==0?RED:INK});txt(a2,175,136,{size:30,align:'center',col:i==0?RED:INK})})});
 const s='Đây là mức "15 triệu" trên nhiều bài báo';hl(640-tw(s,32)/2,508,tw(s,32),44,P(g('k_d3')+.4,.5));txt(s,640,542,{size:32,align:'center',a:P(g('k_d3'),.25)});
 source('Nguồn: VTV, VOV, Báo Nhân Dân; quy định về đối tượng tham gia dự thưởng xổ số',1)}
function sS(t){const t0=g('s6');title(null,'PHÍA NGƯỜI BÁN VÉ',t0);
 photoCard('fan',60,180,330,360,t0+.2,{rot:-.03});
 box(430,180,790,120,t0+.6,{lw:6},a=>{txt('Bán vé cho người không đủ điều kiện',395,58,{size:32,align:'center'});txt('ví dụ người dưới 18 tuổi',395,98,{size:26,col:GREY,align:'center',a:P(g('k_b1'),.25)})});
 arrow(620,304,620,350,g('k_btc')-.25,.2);arrow(1030,304,1030,350,g('k_bcn')-.25,.2);
 box(430,356,380,180,g('k_btc'),{},a=>{txt('TỔ CHỨC',190,46,{size:22,col:GREY,align:'center',ls:3});txt('20–30 triệu',190,124,{size:52,col:RED,align:'center'})});
 box(840,356,380,180,g('k_bcn'),{lw:6},a=>{txt('CÁ NHÂN',190,46,{size:22,col:GREY,align:'center',ls:3});txt('10–15 triệu',190,124,{size:52,col:RED,align:'center'})});
 source(SRC_S+'. Cá nhân bằng 1/2 tổ chức.',1)}
function sV(t){const t0=g('s7');title(null,'NẶNG NHẤT: CHÍNH TỜ VÉ',t0,{sub:'Mức phạt với cá nhân'});
 photoCard('slip',60,200,340,340,t0+.3,{rot:-.03});
 arrow(410,300,470,280,g('k_v1')-.25,.2);
 box(480,200,740,150,g('k_v1'),{},a=>{txt('CẠO SỬA, TẨY XÓA VÉ',30,46,{size:22,col:GREY,ls:3});txt('để dự thưởng, lĩnh thưởng',30,88,{size:22});txt('60–100 triệu',710,124,{size:46,col:RED,align:'right',a:P(g('k_v1b'),.2)})});
 arrow(410,440,470,460,g('k_v2')-.25,.2);
 box(480,390,740,150,g('k_v2'),{lw:6},a=>{txt('LÀM GIẢ VÉ XỔ SỐ',30,46,{size:22,col:GREY,ls:3});txt('dưới mọi hình thức',30,88,{size:22});txt('80–100 triệu',710,124,{size:46,col:RED,align:'right',a:P(g('k_v2b'),.2)})});
 source(SRC_V,1)}
function sT(t){const t0=g('s8');title(null,'TÓM LẠI: CON SỐ NÀO, CHO AI?',t0);
 vxBars(t0+.3,[[t0+.4,'Mua vé sai đối tượng',15,'tối đa 15 triệu'],[g('k_t1')-1.6,'Bán cho người dưới 18',15,'cá nhân: tối đa 15 triệu'],[g('k_t1'),'Cạo sửa, làm giả vé',100,'cá nhân: tối đa 100 triệu',true],[g('k_t2'),'Tổ chức (mức trần)',200,'200 triệu',true]],200);
 txt('Ví dụ: kinh doanh xổ số không có giấy chứng nhận đủ điều kiện',640,580,{size:24,w:600,col:GREY,align:'center',a:P(g('k_t3'),.25)});
 source(SRC_G+'; Đời sống & Pháp luật',1)}
function sE(t){vxTodo(g('s9'),[[g('k_e1'),'Nếu bạn bán vé số:','không bán cho người dưới 18 tuổi'],[g('s10'),'Không cạo sửa, tẩy xóa trên vé,','dù chỉ một con số'],[g('s11'),'Vé trúng thưởng: giữ nguyên vẹn,','lĩnh ở công ty xổ số hoặc nơi được chỉ định']])}
function sF(t){vxDisclaimer(g('out'),'Nghị định 389/2026/NĐ-CP · ban hành 14/10/2026 · hiệu lực 30/11/2026','Xử phạt vi phạm hành chính trong lĩnh vực kinh doanh xổ số',g('k_src'),SRC_G+'  ·  Ảnh minh họa: Unsplash')}
defineEpisode({header:'Nghị định 389/2026/NĐ-CP  ·  ban hành 14/10/2026  ·  hiệu lực 30/11/2026',
 images:{glove:'img/glove.jpg',grid:'img/grid.jpg',slip:'img/slip.jpg',fan:'img/fan.jpg'},
 scenes:[[0,sA],[()=>g('op2')-.15,sM],[()=>g('s1')-.15,sP],[()=>g('s2')-.15,sH],[()=>g('s3')-.15,sB],[()=>g('s4')-.15,sQ],[()=>g('s5')-.15,sD],[()=>g('s6')-.15,sS],[()=>g('s7')-.15,sV],[()=>g('s8')-.15,sT],[()=>g('s9')-.15,sE],[()=>g('out')-.15,sF]]});
