// Lịch sử Myanmar qua các thời đại: danh sách cảnh
globalThis.SEAL='緬';
var HAS=k=>fs.existsSync('cf_'+k)&&fs.readdirSync('cf_'+k).length>10;
// cảnh có clip thì dùng clip, không thì dùng ảnh tĩnh với chuyển động máy quay
var CS=(k,s,c,extra)=>HAS(k)?Object.assign({clip:k,s,c},extra):Object.assign({k,s,o:{z0:c[0],z1:c[1],f0:[c[2],c[3]],f1:[c[4],c[5]],fadeIn:extra&&extra.fadeIn,fadeOut:extra&&extra.fadeOut}},extra,extra&&extra.alt?{alt:[extra.alt[2],extra.alt[3],extra.alt[0],extra.alt[4],extra.alt[5]]}:{});
sh=[
 CS('m1',0,[1.0,1.15,.5,.5,.45,.5],{fadeIn:2.0,lab:[lab(5.2,9.6,P(['MYANMAR'],' · FORMERLY BURMA'))]}),
 {k:'m2',s:G('op2')-.3,o:{z0:1.03,z1:1.18,f0:[.5,.5],f1:[.5,.6]},tr:'cross',lab:[lab(.6,4.8,P('THE WORLD’S ',['LONGEST CIVIL WAR']))]},
 CS('m1',G('op3')-.3,[1.3,1.42,.3,.5,.25,.5],{tr:'cross',title:{at:E('op3')+0.1-(G('op3')-.3),k:'緬甸',l1:'MYANMAR',l2:'A THOUSAND YEARS OF HISTORY',font1:cap(54),font2:cap(26)}}),
 CS('m3',G('s1')-.3,[1.0,1.12,.5,.5,.55,.45],{tr:'tear',lab:[lab(.6,4.6,P(['1044'],' · KING ANAWRAHTA'))]}),
 {k:'m1',s:G('s2')-.3,o:{z0:1.5,z1:1.7,f0:[.3,.6],f1:[.6,.55]},tr:'cross',lab:[lab(.6,5,P(['OVER 10,000'],' TEMPLES AT BAGAN'))]},
 {k:'m5',s:G('s3')-.3,o:{z0:1.03,z1:1.2,f0:[.5,.5],f1:[.5,.4]},tr:'cross',lab:[lab(.6,4.6,P(['1287'],' · THE MONGOLS'))]},
 {k:'m6',s:G('s4')-.3,o:{z0:1.03,z1:1.15,f0:[.5,.5],f1:[.45,.45]},alt:[.36,.4,1.8,.36,.36],tr:'tear',lab:[lab(.6,4.6,P(['TAUNGOO DYNASTY'],' · 16TH CENTURY'))],lab2:[lab(.5,5,P(['KING BAYINNAUNG']))]},
 {k:'m7',s:G('s5')-.3,o:{z0:1.03,z1:1.18,f0:[.5,.5],f1:[.5,.4]},alt:[.3,.75,1.6,.4,.75],tr:'cross',lab:[lab(.6,4.6,P(['KONBAUNG DYNASTY'],' · 1752–1885'))],lab2:[lab(.5,4.4,P(['1767'],' · AYUTTHAYA FALLS'))]},
 CS('m8',G('s7')-.3,[1.0,1.12,.5,.5,.45,.45],{tr:'tear',lab:[lab(.6,3.6,P(['THE BRITISH EMPIRE']))]}),
 {k:'m9',s:G('s7b')-.2,o:{z0:1.03,z1:1.2,f0:[.5,.5],f1:[.5,.55]},tr:'cross',lab:[lab(.4,4,P(['1885'],' · THE LAST KING EXILED'))]},
 {k:'m10',s:G('s8')-.3,o:{z0:1.03,z1:1.15,f0:[.5,.5],f1:[.6,.6]},tr:'cross',lab:[lab(.5,3.4,P(['WORLD’S NO. 1'],' RICE EXPORTER'))]},
 {k:'m11',s:G('s9')-.3,o:{z0:1.12,z1:1.12,f0:[.36,.55],f1:[.64,.55]},alt:[.78,.6,1.6,.8,.6],tr:'cross',lab:[lab(.6,4.6,P(['DIVIDE AND RULE']))],lab2:[lab(.5,4.2,P(['SHAN · KAREN · KACHIN']))]},
 {k:'m11',s:G('s10')-.3,o:{z0:1.5,z1:1.6,f0:[.25,.6],f1:[.3,.6]},tr:'cross',lab:[lab(.6,5.4,[{t:'2/3',hl:1},{t:' BURMAN · '},{t:'100+',hl:1},{t:' OTHER ETHNIC GROUPS'}])]},
 {k:'m12',s:G('s11')-.3,o:{z0:1.03,z1:1.15,f0:[.5,.5],f1:[.5,.58]},alt:[.5,.62,1.7,.5,.66],tr:'tear',lab:[lab(.6,4.6,P(['1947'],' · THE PANGLONG AGREEMENT'))],lab2:[lab(.5,4.4,P(['AUNG SAN']))]},
 {k:'m13',s:G('s12')-.3,o:{z0:1.03,z1:1.2,f0:[.5,.5],f1:[.4,.6]},tr:'cross',lab:[lab(.6,3.8,P(['JULY 1947'],' · AGED 32'))]},
 {k:'m13',s:G('s13')-.3,o:{z0:1.5,z1:1.7,f0:[.3,.45],f1:[.36,.6]},alt:[.5,.68,1.9,.52,.7],tr:'cross',lab:[lab(.6,4.4,P(['1948'],' · INDEPENDENCE'))],lab2:[lab(.4,4,P(['A PROMISE'],' NEVER KEPT'))]},
 {k:'m14',s:G('s14')-.3,o:{z0:1.03,z1:1.2,f0:[.5,.5],f1:[.3,.36]},alt:[.5,.72,1.8,.5,.74],tr:'tear',lab:[lab(.6,4.6,P(['1962'],' · GENERAL NE WIN'))],lab2:[lab(.5,4.6,P(['CLOSED'],' TO THE WORLD'))]},
 {k:'m15',s:G('s16')-.3,o:{z0:1.03,z1:1.2,f0:[.5,.5],f1:[.7,.62]},tr:'cross',lab:[lab(.5,4.2,P('ONE OF ',['ASIA’S POOREST COUNTRIES']))]},
 CS('m16',G('s17')-.3,[1.0,1.12,.5,.5,.4,.45],{tr:'tear',alt:[1.6,1.75,.36,.4,.36,.36],lab:[lab(.6,4.6,P(['1988'],' · THE PEOPLE RISE'))],lab2:[lab(.4,3.6,P(['AUNG SAN SUU KYI']),600,28)]}),
 {k:'m17',s:G('s18')-.3,o:{z0:1.03,z1:1.2,f0:[.5,.5],f1:[.3,.45]},alt:[.86,.6,2.2,.88,.58],tr:'cross',lab:[lab(.6,4.2,P(['15 YEARS'],' UNDER HOUSE ARREST'))],lab2:[lab(.4,3.6,P(['2015'],' · ELECTION VICTORY'))]},
 CS('m18',G('s19')-.3,[1.0,1.12,.5,.5,.5,.4],{tr:'tear',lab:[lab(.6,4.6,P(['FEB 2021'],' · THE COUP'))]}),
 {k:'m19',s:G('s20')-.3,o:{z0:1.03,z1:1.18,f0:[.5,.5],f1:[.55,.6]},tr:'cross',lab:[lab(.6,4.8,P(['MILLIONS'],' FLEE THEIR HOMES'))]},
 {k:'m20',s:G('s21')-.3,o:{z0:1.03,z1:1.15,f0:[.5,.5],f1:[.5,.42]},alt:[.5,.5,1.8,.5,.46],tr:'cross',lab:[lab(.6,4.8,P(['APRIL 2026'],' · A NEW PRESIDENT SWORN IN'))],lab2:[lab(.4,4.4,P(['THE FIGHTING'],' GOES ON'))]},
 {k:'m1',s:G('s22')-.3,o:{z0:1.7,z1:1.5,f0:[.25,.6],f1:[.3,.55]},tr:'tear',lab:[lab(.6,4,P(['THREE KNOTS']))]},
 {k:'m11',s:G('s22b')-.2,o:{z0:1.25,z1:1.35,f0:[.72,.55],f1:[.78,.55]},tr:'cross',lab:[lab(.3,3,P(['1'],' · MANY PEOPLES'))]},
 {k:'m12',s:G('s22c')-.2,o:{z0:1.5,z1:1.65,f0:[.5,.62],f1:[.5,.66]},tr:'cross',lab:[lab(.3,3.2,P(['2'],' · A BROKEN PROMISE'))]},
 {k:'m14',s:G('s22d')-.2,o:{z0:1.4,z1:1.55,f0:[.28,.36],f1:[.24,.33]},tr:'cross',lab:[lab(.3,3.6,P(['3'],' · THE ARMY'))]},
 CS('m21',G('endS')-.3,[1.0,1.12,.5,.5,.55,.45],{fadeOut:2.0,tr:'cross',title:{at:3.6,k:'和',l1:'WHICH PATH TO PEACE?',l2:'TELL ME IN THE COMMENTS',font1:cap(38),font2:cap(26)}}),
];
