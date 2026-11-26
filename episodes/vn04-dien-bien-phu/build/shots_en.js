// Điện Biên Phủ: danh sách cảnh
globalThis.SEAL='越';
var HAS=k=>fs.existsSync('cf_'+k)&&fs.readdirSync('cf_'+k).length>10;
// cảnh có clip thì dùng clip, không thì dùng ảnh tĩnh với chuyển động máy quay
var CS=(k,s,c,extra)=>HAS(k)?Object.assign({clip:k,s,c},extra):Object.assign({k,s,o:{z0:c[0],z1:c[1],f0:[c[2],c[3]],f1:[c[4],c[5]]}},extra,extra&&extra.alt?{alt:[extra.alt[2],extra.alt[3],extra.alt[0],extra.alt[4],extra.alt[5]]}:{});
sh=[
 CS('d1',0,[1.0,1.15,.5,.5,.5,.55],{fadeIn:2.0,alt:[1.3,1.4,.45,.6,.55,.65],lab:[lab(5.4,8.6,P(['1954'],' · NORTHWEST VIETNAM'))]}),
 {k:'d3',s:G('op2')-.3,o:{z0:1.03,z1:1.2,f0:[.5,.5],f1:[.42,.48]},tr:'cross',lab:[lab(.6,4.6,P('“NOT EVEN ',['THREE ROUNDS”']))]},
 {k:'d2',s:G('op3')-.3,o:{z0:1.05,z1:1.2,f0:[.5,.5],f1:[.52,.42]},tr:'cross',title:{at:E('op3')+0.1-(G('op3')-.3),k:'奠邊府',l1:'ĐIỆN BIÊN PHỦ',l2:'VIETNAM · 56 DAYS · 1954',font1:cap(54),font2:cap(26)}},
 CS('d1',G('s1')-.3,[1.16,1.02,.5,.5,.5,.5],{tr:'tear',alt:[1.4,1.5,.3,.6,.4,.7],lab:[lab(.6,4.6,P(['NOV 1953'],' · FRENCH PARATROOPERS'))],lab2:[lab(.5,4.5,P(['GENERAL NAVARRE']))]}),
 {k:'d2',s:G('s2')-.3,o:{z0:1.4,z1:1.6,f0:[.4,.55],f1:[.6,.5]},tr:'cross',lab:[lab(.6,4,P('THE PLAN: ',['LURE AND CRUSH']))]},
 {k:'d1',s:G('s3')-.3,o:{z0:1.5,z1:1.7,f0:[.75,.35],f1:[.8,.3]},tr:'cross',lab:[lab(.6,5,P(['HUNDREDS OF KM'],' OF JUNGLE'))]},
 CS('d6',G('s4')-.3,[1.0,1.12,.5,.5,.55,.55],{tr:'tear',alt:[1.6,1.75,.72,.75,.76,.78],lab:[lab(1.5,6,P(['260,000'],' PORTERS'))],lab2:[lab(.5,5,P(['20,000'],' BICYCLES · 200–300 KG EACH'))]}),
 CS('d8',G('s5')-.3,[1.0,1.15,.5,.5,.6,.45],{tr:'cross',lab:[lab(.6,5,P(['2-TON GUNS'],' · HAULED BY HAND'))]}),
 {k:'d9',s:G('s6')-.3,o:{z0:1.03,z1:1.18,f0:[.5,.5],f1:[.55,.5]},alt:[.55,.42,1.8,.55,.4],tr:'tear',lab:[lab(.6,4.6,P(['JAN 1954'],' · READY FOR A QUICK STRIKE'))],lab2:[lab(.5,4.6,P(['GENERAL VÕ NGUYÊN GIÁP']),520,28)]},
 {k:'d9',s:G('s7')-.3,o:{z0:1.7,z1:1.85,f0:[.4,.62],f1:[.5,.6]},tr:'cross',lab:[lab(.6,6,P('A SLOW, ',['STEADY SIEGE']))]},
 CS('d8',G('s8')-.3,[1.3,1.2,.7,.45,.5,.5],{tr:'cross',lab:[lab(.6,4.6,P(['HAUL THE GUNS BACK']))]}),
 {k:'d11',s:G('s9')-.3,o:{z0:1.03,z1:1.15,f0:[.5,.5],f1:[.45,.6],flash:[.9,1.2]},alt:[.6,.45,1.6,.66,.45],tr:'tear',lab:[lab(.6,4.6,P(['13 MARCH 1954'],' · THE GUNS OPEN FIRE'))]},
 CS('d12',G('s10')-.3,[1.0,1.12,.5,.55,.5,.5],{tr:'cross',alt:[1.5,1.6,.5,.4,.5,.36],lab:[lab(.6,4.6,P(['HUNDREDS OF KM'],' OF TRENCHES'))]}),
 CS('d14',G('s11')-.3,[1.0,1.13,.5,.5,.5,.5],{tr:'cross',lab:[lab(.5,4,P(['THE MONSOON']))]}),
 {k:'d15',s:G('s12')-.3,o:{z0:1.03,z1:1.15,f0:[.5,.45],f1:[.5,.5]},alt:[.45,.7,1.7,.5,.7],tr:'tear',lab:[lab(.6,4.6,P(['HILL A1']))],lab2:[lab(.5,4.6,P(['NEARLY 1 TON'],' OF EXPLOSIVES'))]},
 {k:'d15',s:G('s13')-.3,o:{z0:1.5,z1:1.7,f0:[.5,.35],f1:[.5,.3],flash:[1.3,1.6]},tr:'cross',lab:[lab(.4,3,P(['NIGHT OF 6 MAY 1954']))]},
 {k:'d17',s:G('s14')-.3,o:{z0:1.03,z1:1.2,f0:[.5,.5],f1:[.5,.38]},tr:'cross',lab:[lab(.6,5,P(['7 MAY 1954'],' · VICTORY'))]},
 {k:'d18',s:G('s14b')-.3,o:{z0:1.15,z1:1.15,f0:[.6,.6],f1:[.42,.6]},tr:'cross',lab:[lab(.5,4.6,P(['OVER 10,000'],' FRENCH TROOPS SURRENDER'))]},
 {k:'d19',s:G('s15')-.3,o:{z0:1.03,z1:1.15,f0:[.5,.5],f1:[.5,.55]},alt:[.5,.7,1.6,.55,.72],tr:'tear',lab:[lab(.6,4.6,P(['8 MAY 1954'],' · GENEVA CONFERENCE'))],lab2:[lab(.5,4.6,P(['JULY 1954'],' · THE ACCORDS'))]},
 {k:'d17',s:G('s16')-.3,o:{z0:1.7,z1:1.6,f0:[.52,.3],f1:[.5,.32]},alt:[.5,.5,1.05,.5,.5],tr:'cross',lab:[lab(.6,5.4,P(['A FIRST'],' IN COLONIAL HISTORY'))]},
 CS('d20',G('s17')-.3,[1.0,1.12,.5,.5,.5,.6],{tr:'tear',lab:[lab(.6,5.4,P(['HILL A1'],' · THE COMMAND BUNKER · TODAY'))]}),
 CS('d20',G('endS')-.3,[1.2,1.05,.5,.6,.5,.5],{fadeOut:2.0,tr:'cross',title:{at:.6,k:'奠邊府',l1:'HAVE YOU BEEN THERE?',l2:'TELL ME IN THE COMMENTS',font1:cap(34),font2:cap(28)}}),
];
