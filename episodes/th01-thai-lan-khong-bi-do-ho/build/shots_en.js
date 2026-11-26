// Vì sao Thái Lan chưa từng bị thực dân đô hộ: danh sách cảnh
globalThis.SEAL='泰';
var HAS=k=>fs.existsSync('cf_'+k)&&fs.readdirSync('cf_'+k).length>10;
var CS=(k,s,c,extra)=>HAS(k)?Object.assign({clip:k,s,c},extra):Object.assign({k,s,o:{z0:c[0],z1:c[1],f0:[c[2],c[3]],f1:[c[4],c[5]]}},extra,extra&&extra.alt?{alt:[extra.alt[2],extra.alt[3],extra.alt[0],extra.alt[4],extra.alt[5]]}:{});
sh=[
 CS('t1',0,[1.0,1.15,.5,.5,.45,.48],{fadeIn:2.0,lab:[lab(5.5,9.5,P(['JULY 1893'],' · BANGKOK'))]}),
 {k:'t2',s:G('op2')-.3,o:{z0:1.25,z1:1.25,f0:[.3,.4],f1:[.7,.4]},tr:'cross',lab:[lab(.6,5,P(['SOUTHEAST ASIA'],' · LATE 19TH CENTURY'))]},
 {k:'t10',s:G('op3')-.3,o:{z0:1.05,z1:1.2,f0:[.5,.5],f1:[.5,.55]},tr:'cross',title:{at:E('op3')+0.1-(G('op3')-.3),k:'SIAM',l1:'THAILAND',l2:'WHY WAS IT NEVER COLONIZED?',font1:cap(50),font2:cap(26)}},
 CS('t4',G('s1')-.3,[1.0,1.12,.5,.5,.45,.55],{tr:'tear',alt:[1.6,1.75,.4,.6,.5,.7],lab:[lab(.6,4.6,P(['KING MONGKUT'],' · RAMA IV'))],lab2:[lab(.5,4.6,P(['27 YEARS'],' AS A MONK'))]}),
 {k:'t5',s:G('s2')-.3,o:{z0:1.03,z1:1.25,f0:[.5,.5],f1:[.62,.3]},tr:'cross',lab:[lab(.6,4.6,P(['1868'],' · TOTAL SOLAR ECLIPSE'))]},
 {k:'t6',s:G('s3')-.3,o:{z0:1.03,z1:1.15,f0:[.5,.5],f1:[.55,.55]},alt:[.55,.6,1.6,.6,.6],tr:'cross',lab:[lab(3.6,7.6,P(['1855'],' · TREATY WITH BRITAIN'))]},
 {k:'t7',s:G('s4')-.3,o:{z0:1.03,z1:1.2,f0:[.5,.5],f1:[.5,.42]},alt:[.5,.8,1.5,.5,.82],tr:'tear',lab:[lab(.6,4.6,P(['KING CHULALONGKORN'],' · RAMA V'))],lab2:[lab(.3,4,P(['NO MORE'],' CRAWLING'))]},
 CS('t8',G('s5')-.3,[1.0,1.12,.45,.5,.55,.55],{tr:'cross',lab:[lab(.6,4.6,P(['RAILWAYS'],' · POST OFFICES · SCHOOLS'))]}),
 {k:'t8',s:G('s6')-.3,o:{z0:1.6,z1:1.75,f0:[.7,.72],f1:[.72,.7]},tr:'cross',lab:[lab(.6,5,P(['A CIVILIZED NATION']))]},
 {k:'t10',s:G('s7')-.3,o:{z0:1.12,z1:1.12,f0:[.38,.55],f1:[.62,.55]},tr:'tear',lab:[lab(.6,5,[{t:'BRITAIN',hl:1},{t:' · SIAM · '},{t:'FRANCE',hl:1}])]},
 CS('t1',G('s8')-.3,[1.3,1.4,.45,.45,.55,.42],{tr:'cross',lab:[lab(.6,4.6,P(['1893'],' · THE PAKNAM CRISIS'))]}),
 {k:'t11',s:G('s9')-.3,o:{z0:1.03,z1:1.2,f0:[.5,.5],f1:[.32,.55]},tr:'cross'},
 CS('t12',G('s10')-.3,[1.0,1.13,.5,.5,.5,.5],{tr:'tear',lab:[lab(.6,5,P(['BAMBOO'],' DIPLOMACY'))]}),
 {k:'t6',s:G('s11')-.3,o:{z0:1.5,z1:1.62,f0:[.55,.62],f1:[.6,.6]},tr:'cross',lab:[lab(.6,5.4,P('LAND GIVEN UP TO ',['FRANCE AND BRITAIN']))]},
 {k:'t10',s:G('s11b')-.3,o:{z0:1.7,z1:1.85,f0:[.5,.6],f1:[.5,.62]},tr:'cross',lab:[lab(.4,3.4,P('KEEPING ',['THE HEARTLAND']))]},
 {k:'t14',s:G('s12')-.3,o:{z0:1.03,z1:1.15,f0:[.5,.5],f1:[.45,.6]},alt:[.38,.78,1.7,.4,.8],tr:'cross',lab:[lab(.6,4.6,P(['1896'],' · BRITAIN AND FRANCE AGREE'))],lab2:[lab(.5,4.5,P(['A BUFFER STATE']),560,28)]},
 {k:'t15',s:G('s13')-.3,o:{z0:1.03,z1:1.18,f0:[.5,.5],f1:[.55,.5]},alt:[.57,.5,1.7,.57,.46],tr:'cross',lab:[lab(.6,4.6,P(['1897'],' · JOURNEY TO EUROPE'))],lab2:[lab(.5,4.5,P(['TSAR'],' NICHOLAS II'))]},
 CS('t12',G('s14')-.3,[1.2,1.3,.5,.6,.5,.7],{tr:'tear',lab:[lab(.6,5,P('NEVER ',['COLONIZED']))]}),
 {k:'t10',s:G('s15')-.3,o:{z0:1.9,z1:2.0,f0:[.5,.58],f1:[.5,.56]},tr:'cross',lab:[lab(.6,5.4,P(['1939'],' · SIAM BECOMES THAILAND'))]},
 CS('t16',G('s16')-.3,[1.0,1.15,.45,.5,.4,.4],{tr:'cross',alt:[1.7,1.8,.37,.3,.37,.28],lab:[lab(.6,4.6,P(['KING CHULALONGKORN']),620,28)],lab2:[lab(.5,4.5,P(['23 OCTOBER'],' · NATIONAL HOLIDAY'),620,28)]}),
 CS('t12',G('endS')-.3,[1.1,1.0,.5,.5,.5,.5],{fadeOut:2.0,tr:'cross',title:{at:.6,k:'泰',l1:'WISE, OR TOO HIGH A PRICE?',l2:'TELL ME IN THE COMMENTS',font1:cap(30),font2:cap(28)}}),
];
