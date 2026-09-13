const thaiSpecies=[
['สัก','Teak','Tectona grandis','ไม้ต้นผลัดใบ','ไม้สักพบมากในป่าผลัดใบของไทย ใบใหญ่มากและต้นโตได้สูง เนื้อไม้ทนทานและมีคุณค่าทางเศรษฐกิจ'],
['ยางนา','Yang Na','Dipterocarpus alatus','ไม้ต้นเขตร้อน','ไม้ต้นขนาดใหญ่ที่พบในหลายพื้นที่ของไทย มีใบใหญ่และผลมีส่วนคล้ายปีก ชื่อท้องถิ่นมีหลายชื่อ'],
['พะยูง','Siamese Rosewood','Dalbergia cochinchinensis','ไม้ต้นผลัดใบ','พบเด่นในภาคตะวันออกและภาคตะวันออกเฉียงเหนือของไทย ขึ้นในป่าเบญจพรรณและป่าดิบแล้ง'],
['ประดู่ป่า','Burmese Padauk','Pterocarpus macrocarpus','ไม้ต้นผลัดใบ','ไม้ต้นขนาดใหญ่ของป่าเบญจพรรณและป่าเต็งรัง เนื้อไม้มีสีสวยและแข็งแรง'],
['แดง','Ironwood Tree','Xylia xylocarpa var. kerrii','ไม้ต้นผลัดใบ','ไม้ต้นผลัดใบสูงได้ราว 30 เมตร พบในป่าเต็งรังและป่าเบญจพรรณของไทย'],
['ชิงชัน','Tamalan','Dalbergia oliveri','ไม้ต้นผลัดใบ','ไม้ต้นเนื้อแข็งในกลุ่มประดู่ ใบประกอบและดอกมีสีม่วง พบในป่าผลัดใบของไทย'],
['มะค่าโมง','Afzelia','Afzelia xylocarpa','ไม้ต้นผลัดใบ','พบแทบทุกภาคของไทยยกเว้นภาคใต้ ขึ้นในป่าเต็งรัง ป่าเบญจพรรณ และป่าดิบแล้ง'],
['เต็ง','Tenasserim White Mahogany','Shorea obtusa','ไม้ต้นผลัดใบ','ไม้เด่นของป่าเต็งรัง สูงได้ถึงประมาณ 30 เมตร และมีชันสีขาวขุ่น'],
['รัง','Siamese Sal','Shorea siamensis','ไม้ต้นผลัดใบ','ไม้สำคัญของป่าเต็งรังและป่าผลัดใบ ทนสภาพแห้งแล้งได้ดีและมีเรือนยอดกว้าง'],
['พะยอม','White Meranti','Shorea roxburghii','ไม้ต้นเขตร้อน','ไม้ต้นในวงศ์ยาง มีดอกสีอ่อนและมีกลิ่นหอม พบในป่าผลัดใบและป่าดิบแล้งของไทย'],
['ตะเคียนทอง','Ironwood','Hopea odorata','ไม้ต้นเขียวชอุ่ม','ไม้ต้นสูงได้ถึงประมาณ 40 เมตร เปลือกแตกเป็นร่อง พบในป่าดิบและพื้นที่ชื้น'],
['ตะแบกนา','Thai Crape Myrtle','Lagerstroemia floribunda','ไม้ต้นผลัดใบ','พบในป่าผลัดใบ ป่าดิบ และพื้นที่ชื้นหลายแห่งของไทย มักปลูกเป็นไม้ประดับ'],
['อินทนิลน้ำ','Queen’s Crape Myrtle','Lagerstroemia speciosa','ไม้ต้นเขตร้อน','ไม้ต้นสูงได้ถึงประมาณ 30 เมตร ช่อดอกตั้งตรงยาว และพบตามพื้นที่ชื้นหรือริมแม่น้ำ'],
['ราชพฤกษ์','Golden Shower Tree','Cassia fistula','ไม้ต้นผลัดใบ','ต้นไม้ดอกสีเหลืองเป็นช่อยาว พบปลูกทั่วไปในประเทศไทย และเป็นไม้ที่มีความสำคัญทางวัฒนธรรม'],
['ปีบ','Indian Cork Tree','Millingtonia hortensis','ไม้ต้นผลัดใบ','ไม้ต้นสูงได้ถึงประมาณ 25 เมตร เปลือกเป็นคอร์ก ดอกสีขาวหอม และพบได้เกือบทุกภาคของไทยยกเว้นภาคใต้'],
['จามจุรี','Rain Tree','Albizia saman','ไม้ต้นทรงพุ่มกว้าง','เรือนยอดแผ่กว้างให้ร่มเงามาก นิยมปลูกตามถนนและพื้นที่เปิดโล่ง'],
['มะขาม','Tamarind','Tamarindus indica','ไม้ต้นผลัดใบ','ไม้ต้นที่ปลูกอย่างแพร่หลายในไทย ผลเป็นฝักและมีเนื้อรสเปรี้ยวหรือหวานตามพันธุ์'],
['หว้า','Java Plum','Syzygium cumini','ไม้ต้นเขตร้อน','ไม้ต้นเขียวชอุ่มที่พบในไทย ผลสุกมีสีม่วงเข้มหรือดำและเป็นอาหารของสัตว์หลายชนิด'],
['สะเดา','Siamese Neem','Azadirachta indica var. siamensis','ไม้ต้นผลัดใบ','ไม้ต้นที่พบในพื้นที่แห้งของไทย ใบประกอบมีรสขมและนิยมใช้เป็นอาหารและพืชพื้นบ้าน'],
['กันเกรา','Fragrant Gardenia Tree','Fagraea fragrans','ไม้ต้นเขตร้อน','ไม้ต้นที่พบในป่าหลายประเภทของไทย ดอกมีกลิ่นหอมและต้นมีทรงพุ่มสวย'],
['มะค่าแต้','Siamese Rosewood Bean','Sindora siamensis','ไม้ต้นผลัดใบ','ไม้ต้นขนาดใหญ่ เรือนยอดแผ่กว้าง พบตามป่าดิบแล้งและป่าเต็งรังในไทย'],
['ยมหิน','Chittagong Wood','Chukrasia tabularis','ไม้ต้นผลัดใบ','ไม้ต้นในวงศ์กระท้อน ใบประกอบขนาดใหญ่ พบในป่าดิบและป่าเบญจพรรณ'],
['มะหาด','Thai Artocarpus','Artocarpus thailandicus','ไม้ต้นเขตร้อน','ไม้ต้นพื้นถิ่นของไทยในสกุลเดียวกับขนุน พบในป่าธรรมชาติและให้ผลที่มีเนื้อกินได้'],
['มะเกลือ','Ebony Tree','Diospyros mollis','ไม้ต้นผลัดใบ','ไม้ต้นพื้นถิ่นของไทยในสกุล Diospyros ผลอ่อนมีสีเขียวและผลแก่เปลี่ยนเป็นสีเข้ม']
];
species.splice(0,species.length,...thaiSpecies);
trees.forEach(t=>{t.type=Math.floor(rnd(t.x+37,t.y+71)*species.length);t.visualType=t.type;t.info=species[t.type]});

/* ------------------------------------------------------------------
   HIGH DETAIL SPECIES TREE RENDERER
   Designed for the 640x360 pixel-art viewport. Each species gets its
   own silhouette, branch pattern, foliage texture, bark and seasonal
   accents instead of five recycled tree shapes.
------------------------------------------------------------------- */
const treePalette={
  deep:'#102d21', dark:'#17452c', mid:'#28623a', light:'#4d8649', hi:'#78a95b', bark:'#4a3024', bark2:'#6f4730', barkHi:'#95613e'
};
function px(x,y,w,h,c){R(x,y,w,h,c)}
function leaf(x,y,c,w=5,h=4){px(x,y,w,h,c);px(x+1,y-2,Math.max(2,w-2),2,c)}
function branch(x,y,dx,dy,c,w=3){
  const n=Math.max(Math.abs(dx),Math.abs(dy),1),sx=dx/n,sy=dy/n;
  for(let i=0;i<n;i+=3)px(x+dx*(i/n),y+dy*(i/n),w,w,c);
}
function foliageCluster(x,y,rx,ry,cols,seedOffset=0){
  const steps=Math.max(9,Math.floor((rx+ry)/7));
  px(x-rx*.72,y-ry*.35,rx*1.45,ry*.9,cols[0]);
  for(let i=0;i<steps;i++){
    const a=rnd(x+i*17+seedOffset,y+i*31+seedOffset)*6.283;
    const rr=.35+.55*rnd(x+i*29+seedOffset,y-i*13+seedOffset);
    const lx=x+Math.cos(a)*rx*rr,ly=y+Math.sin(a)*ry*rr;
    const c=cols[i%cols.length];
    leaf(lx,ly,c,4+Math.floor(rnd(i+seedOffset,9)*6),3+Math.floor(rnd(i+seedOffset,17)*4));
  }
}
function barkTrunk(t,s,width=16,height=54,style=0){
  const x=t.x,y=t.y;
  px(x-width*s/2,y-2*s,width*s,height*s,style===1?'#3f2b22':'#4b3023');
  px(x-width*s*.22,y+4*s,width*s*.24,height*s*.72,style===2?'#765039':'#71472f');
  px(x+width*s*.08,y+7*s,width*s*.16,height*s*.64,style===1?'#5b3b2b':'#91603d');
  if(style===1){for(let i=0;i<7;i++)px(x-width*s*.42+(i%2)*width*s*.5,y+8*s+i*5*s,3*s,2*s,'#2e2521')}
  if(style===2){for(let i=0;i<5;i++)px(x-width*s*.35,y+10*s+i*7*s,5*s,2*s,'#a06c45')}
  px(x-width*s*.8,y+height*s*.72,12*s,5*s,'#3b281f');px(x+width*s*.15,y+height*s*.72,14*s,5*s,'#3b281f');
}
function canopyBase(t,s,rx,ry,cols){
  foliageCluster(t.x,t.y-30*s,rx*s,ry*s,cols,Math.floor(t.v*999));
  foliageCluster(t.x-rx*.45*s,t.y-15*s,rx*.62*s,ry*.65*s,cols,17);
  foliageCluster(t.x+rx*.42*s,t.y-13*s,rx*.64*s,ry*.62*s,cols,31);
}
function detailedTreeBase(t){
  const s=treeScale(t), name=t.info?.[0]||'';
  treeShadow(t);
  if(name==='ตะเคียนทอง'){
    barkTrunk(t,s,21,56,1);
    px(t.x-17*s,t.y+39*s,9*s,8*s,'#3a2922');px(t.x+8*s,t.y+40*s,10*s,8*s,'#3a2922');
    px(t.x-8*s,t.y+9*s,3*s,32*s,'#9a6540');px(t.x+5*s,t.y+3*s,3*s,36*s,'#2f2925');
    for(let i=0;i<8;i++)px(t.x-9*s+(i%3)*6*s,t.y+5*s+i*6*s,4*s,2*s,i%2?'#5d3b2c':'#754b32');
  }else if(name==='จามจุรี'){
    barkTrunk(t,s,19,48,2);px(t.x-25*s,t.y+39*s,28*s,7*s,'#493126');px(t.x+2*s,t.y+39*s,27*s,7*s,'#493126');
    branch(t.x,t.y+10*s,-42*s,-27*s,'#54382a',3*s);branch(t.x,t.y+10*s,42*s,-27*s,'#54382a',3*s);
  }else if(name==='ราชพฤกษ์'){
    barkTrunk(t,s,13,51,0);px(t.x-10*s,t.y+42*s,9*s,5*s,'#4a3023');px(t.x+2*s,t.y+43*s,12*s,5*s,'#4a3023');
  }else if(name==='ปีบ'){
    barkTrunk(t,s,13,57,1);for(let i=0;i<6;i++)px(t.x-5*s+(i%2)*6*s,t.y+5*s+i*7*s,2*s,5*s,'#9b6946');
  }else if(name==='มะเกลือ'){
    barkTrunk(t,s,17,53,1);for(let i=0;i<6;i++)px(t.x-7*s+(i%3)*5*s,t.y+7*s+i*6*s,3*s,2*s,'#2e2723');
  }else{
    barkTrunk(t,s,15,53,0);
  }
}
function detailedTreeCanopy(t){
  const s=treeScale(t),x=t.x,y=t.y,name=t.info?.[0]||'';
  const C=treePalette;
  if(name==='สัก'){
    branch(x,y-8*s,-30*s,-30*s,C.bark2,3*s);branch(x,y-8*s,31*s,-31*s,C.bark2,3*s);
    branch(x-4*s,y-22*s,-35*s,-5*s,C.bark2,2*s);branch(x+4*s,y-22*s,36*s,-6*s,C.bark2,2*s);
    foliageCluster(x,y-48*s,40*s,31*s,['#1b4f30','#2b6939','#4d8248','#679657'],7);
    foliageCluster(x-25*s,y-35*s,22*s,18*s,['#245c35','#3c7742','#6b9956'],11);
    foliageCluster(x+26*s,y-34*s,23*s,18*s,['#245c35','#3c7742','#6b9956'],19);
    for(let i=0;i<14;i++)leaf(x-34*s+rnd(i,2)*68*s,y-56*s+rnd(i,3)*30*s,i%3?'#4f8248':'#739e5b',7*s,4*s);
  }else if(name==='ยางนา'){
    branch(x,y-8*s,-25*s,-39*s,C.bark2,3*s);branch(x,y-8*s,26*s,-40*s,C.bark2,3*s);
    foliageCluster(x,y-57*s,34*s,45*s,['#123b28','#1b5130','#2d6a3a','#4b8147'],3);
    foliageCluster(x-20*s,y-42*s,20*s,26*s,['#19492c','#2b6337','#56894d'],9);
    foliageCluster(x+21*s,y-43*s,20*s,27*s,['#19492c','#2b6337','#56894d'],13);
    for(let i=0;i<9;i++)leaf(x-24*s+i*6*s,y-76*s+rnd(i,7)*22*s,'#5a8c4d',5*s,7*s);
  }else if(name==='พะยูง'){
    branch(x,y-10*s,-32*s,-25*s,C.bark2,2*s);branch(x,y-10*s,34*s,-24*s,C.bark2,2*s);
    foliageCluster(x,y-45*s,40*s,28*s,['#143c28','#205630','#34733e','#5a8b4e'],23);
    for(let i=0;i<18;i++)leaf(x-35*s+rnd(i,4)*70*s,y-61*s+rnd(i,6)*29*s,i%4?'#3d7642':'#679454',3*s,3*s);
  }else if(name==='ประดู่ป่า'){
    branch(x,y-9*s,-36*s,-31*s,C.bark2,3*s);branch(x,y-9*s,37*s,-31*s,C.bark2,3*s);
    foliageCluster(x,y-48*s,44*s,29*s,['#16442a','#276138','#3f7942','#659450'],29);
    foliageCluster(x-27*s,y-28*s,24*s,16*s,['#235a34','#4b8248','#729a58'],33);
    foliageCluster(x+29*s,y-29*s,24*s,16*s,['#235a34','#4b8248','#729a58'],37);
    if(rnd(x,y)>.35)for(let i=0;i<7;i++)leaf(x-29*s+i*9*s,y-61*s+rnd(i,5)*18*s,'#6c9653',5*s,5*s);
  }else if(name==='แดง'){
    branch(x,y-8*s,-38*s,-27*s,C.bark2,3*s);branch(x,y-8*s,39*s,-27*s,C.bark2,3*s);
    foliageCluster(x,y-42*s,50*s,23*s,['#183f29','#275c35','#3f7541','#5e8b4e'],41);
    foliageCluster(x-32*s,y-29*s,25*s,14*s,['#245732','#4b8047','#6a9652'],47);
    foliageCluster(x+33*s,y-30*s,26*s,14*s,['#245732','#4b8047','#6a9652'],53);
  }else if(name==='ชิงชัน'){
    branch(x,y-8*s,-35*s,-30*s,C.bark2,2*s);branch(x,y-8*s,35*s,-30*s,C.bark2,2*s);
    foliageCluster(x,y-47*s,38*s,26*s,['#183f29','#285d36','#497e46','#6a9654'],61);
    for(let i=0;i<16;i++)leaf(x-31*s+rnd(i,8)*62*s,y-60*s+rnd(i,12)*27*s,i%5?'#4b8247':'#739c59',4*s,3*s);
    if(rnd(x+4,y)>.7)for(let i=0;i<3;i++)px(x-17*s+i*16*s,y-28*s,4*s,4*s,'#9a75b5');
  }else if(name==='มะค่าโมง'){
    branch(x,y-8*s,-40*s,-29*s,C.bark2,3*s);branch(x,y-8*s,41*s,-29*s,C.bark2,3*s);
    foliageCluster(x,y-46*s,48*s,29*s,['#153e29','#245d35','#3f7742','#6a9554'],71);
    foliageCluster(x-34*s,y-29*s,24*s,17*s,['#245832','#4e8249','#70985b'],73);
    foliageCluster(x+34*s,y-29*s,24*s,17*s,['#245832','#4e8249','#70985b'],79);
  }else if(name==='เต็ง'||name==='รัง'){
    branch(x,y-8*s,-39*s,-22*s,C.bark2,3*s);branch(x,y-8*s,39*s,-22*s,C.bark2,3*s);
    foliageCluster(x,y-40*s,48*s,24*s,name==='เต็ง'?['#183e29','#285d35','#557d43','#718c4c']:['#163e27','#2a5e34','#4c7b42','#759050'],83);
    foliageCluster(x-34*s,y-27*s,26*s,15*s,['#214f30','#497842','#728d50'],89);
    foliageCluster(x+35*s,y-27*s,27*s,15*s,['#214f30','#497842','#728d50'],97);
  }else if(name==='พะยอม'){
    branch(x,y-8*s,-31*s,-31*s,C.bark2,2*s);branch(x,y-8*s,32*s,-31*s,C.bark2,2*s);
    foliageCluster(x,y-49*s,39*s,31*s,['#16432a','#275f36','#4a8248','#759a5b'],101);
    for(let i=0;i<6;i++)px(x-28*s+i*11*s,y-69*s+rnd(i,3)*22*s,4*s,3*s,'#e1dfbd');
  }else if(name==='ตะเคียนทอง'){
    branch(x,y-4*s,-46*s,-31*s,C.bark2,4*s);branch(x,y-4*s,47*s,-31*s,C.bark2,4*s);
    branch(x-2*s,y-18*s,-30*s,-29*s,C.bark2,2*s);branch(x+2*s,y-18*s,30*s,-29*s,C.bark2,2*s);
    foliageCluster(x,y-48*s,47*s,34*s,['#0f3323','#17492b','#24643a','#3e7a43','#5b914e'],113);
    foliageCluster(x-31*s,y-28*s,27*s,21*s,['#17452a','#2c6939','#50884a'],127);
    foliageCluster(x+32*s,y-29*s,28*s,21*s,['#17452a','#2c6939','#50884a'],139);
    for(let i=0;i<12;i++)leaf(x-38*s+rnd(i,2)*76*s,y-64*s+rnd(i,5)*33*s,i%4?'#397744':'#679656',5*s,5*s);
    if(rnd(x,y)>.45)for(let i=0;i<4;i++)px(x-25*s+i*16*s,y-30*s+rnd(i,8)*10*s,3*s,3*s,'#e4d7a1');
  }else if(name==='ตะแบกนา'||name==='อินทนิลน้ำ'){
    branch(x,y-7*s,-32*s,-34*s,C.bark2,3*s);branch(x,y-7*s,34*s,-34*s,C.bark2,3*s);
    foliageCluster(x,y-49*s,40*s,36*s,['#17452b','#2b6638','#4b8147','#6e9656'],151);
    foliageCluster(x-27*s,y-29*s,24*s,18*s,['#255b34','#4a8046','#6d9655'],157);
    foliageCluster(x+28*s,y-29*s,24*s,18*s,['#255b34','#4a8046','#6d9655'],163);
    const flower=name==='อินทนิลน้ำ'?'#b38bd0':'#b875a0';
    for(let i=0;i<10;i++)px(x-32*s+rnd(i,21)*64*s,y-61*s+rnd(i,25)*29*s,5*s,4*s,flower);
    for(let i=0;i<5;i++)px(x-22*s+i*11*s,y-70*s+rnd(i,26)*13*s,3*s,3*s,'#d7b5e2');
  }else if(name==='ราชพฤกษ์'){
    branch(x,y-9*s,-42*s,-30*s,C.bark2,3*s);branch(x,y-9*s,42*s,-30*s,C.bark2,3*s);
    foliageCluster(x,y-48*s,43*s,25*s,['#1b4a2c','#2b6537','#4d8245','#6e9854'],173);
    for(let side=-1;side<=1;side+=2)for(let i=0;i<5;i++){
      const xx=x+side*(18+i*5)*s, yy=y-26*s-i*6*s;
      px(xx,yy,4*s,10*s,'#d8ad35');px(xx+2*s,yy+8*s,4*s,10*s,'#edc74c');px(xx-2*s,yy+15*s,4*s,9*s,'#c99928');
    }
  }else if(name==='ปีบ'){
    branch(x,y-10*s,-27*s,-38*s,C.bark2,2*s);branch(x,y-10*s,28*s,-38*s,C.bark2,2*s);
    foliageCluster(x,y-54*s,31*s,38*s,['#17442a','#2a6437','#4e8448','#71985a'],181);
    foliageCluster(x-20*s,y-42*s,18*s,21*s,['#255b34','#4d8248','#789a5d'],187);
    foliageCluster(x+21*s,y-42*s,18*s,21*s,['#255b34','#4d8248','#789a5d'],193);
    for(let i=0;i<8;i++){px(x-25*s+rnd(i,31)*50*s,y-69*s+rnd(i,37)*27*s,3*s,8*s,'#eee7d2');px(x-22*s+rnd(i,33)*44*s,y-74*s+rnd(i,39)*25*s,3*s,5*s,'#fff8e7')}
  }else if(name==='จามจุรี'){
    branch(x,y-8*s,-68*s,-29*s,C.bark2,4*s);branch(x,y-8*s,69*s,-29*s,C.bark2,4*s);
    branch(x-20*s,y-22*s,-48*s,-2*s,C.bark2,3*s);branch(x+20*s,y-22*s,48*s,-2*s,C.bark2,3*s);
    foliageCluster(x,y-49*s,69*s,30*s,['#103823','#194d2c','#2b6337','#4a8046','#679451'],211);
    foliageCluster(x-49*s,y-34*s,33*s,17*s,['#17462a','#2c6538','#56864b'],223);
    foliageCluster(x+49*s,y-34*s,33*s,17*s,['#17462a','#2c6538','#56864b'],227);
    for(let i=0;i<18;i++)leaf(x-60*s+rnd(i,41)*120*s,y-62*s+rnd(i,43)*28*s,i%3?'#3f7743':'#709857',4*s,3*s);
  }else if(name==='มะขาม'){
    branch(x,y-7*s,-40*s,-29*s,C.bark2,3*s);branch(x,y-7*s,40*s,-29*s,C.bark2,3*s);
    foliageCluster(x,y-45*s,45*s,28*s,['#17442a','#285e35','#4a7e45','#719255'],239);
    for(let i=0;i<24;i++)leaf(x-37*s+rnd(i,51)*74*s,y-64*s+rnd(i,53)*31*s,i%2?'#557f47':'#759354',3*s,2*s);
    for(let i=0;i<5;i++)px(x-28*s+i*14*s,y-20*s+rnd(i,58)*8*s,8*s,2*s,'#6f4c31');
  }else if(name==='หว้า'){
    branch(x,y-8*s,-35*s,-31*s,C.bark2,3*s);branch(x,y-8*s,36*s,-31*s,C.bark2,3*s);
    foliageCluster(x,y-48*s,43*s,34*s,['#123c28','#1c522f','#2f6b3a','#4e8348'],251);
    foliageCluster(x-29*s,y-31*s,24*s,20*s,['#194a2c','#39743f','#5a8d50'],257);
    foliageCluster(x+29*s,y-31*s,24*s,20*s,['#194a2c','#39743f','#5a8d50'],263);
    for(let i=0;i<7;i++)px(x-31*s+rnd(i,67)*62*s,y-31*s+rnd(i,71)*27*s,4*s,4*s,'#5e2c55');
  }else if(name==='สะเดา'){
    branch(x,y-8*s,-36*s,-28*s,C.bark2,3*s);branch(x,y-8*s,37*s,-28*s,C.bark2,3*s);
    foliageCluster(x,y-47*s,39*s,27*s,['#174229','#285f34','#477c42','#6b914e'],271);
    for(let i=0;i<20;i++)leaf(x-34*s+rnd(i,73)*68*s,y-60*s+rnd(i,79)*29*s,i%2?'#568247':'#789858',4*s,3*s);
  }else if(name==='กันเกรา'){
    branch(x,y-7*s,-31*s,-31*s,C.bark2,3*s);branch(x,y-7*s,31*s,-31*s,C.bark2,3*s);
    foliageCluster(x,y-50*s,40*s,34*s,['#17442a','#2b6337','#4e8249','#73995a'],281);
    for(let i=0;i<8;i++)px(x-28*s+rnd(i,83)*56*s,y-68*s+rnd(i,89)*31*s,4*s,4*s,'#f2e3b1');
  }else if(name==='มะค่าแต้'){
    branch(x,y-8*s,-43*s,-27*s,C.bark2,4*s);branch(x,y-8*s,43*s,-27*s,C.bark2,4*s);
    foliageCluster(x,y-43*s,51*s,26*s,['#153e28','#245b34','#487b43','#668e50'],293);
    foliageCluster(x-36*s,y-29*s,27*s,16*s,['#1e5130','#477c44','#6e9557'],299);
    foliageCluster(x+36*s,y-29*s,27*s,16*s,['#1e5130','#477c44','#6e9557'],307);
  }else if(name==='ยมหิน'){
    branch(x,y-8*s,-32*s,-35*s,C.bark2,3*s);branch(x,y-8*s,33*s,-35*s,C.bark2,3*s);
    foliageCluster(x,y-52*s,39*s,35*s,['#16432a','#2b6538','#4f8449','#759a5b'],313);
    for(let i=0;i<13;i++)leaf(x-30*s+rnd(i,97)*60*s,y-70*s+rnd(i,101)*35*s,i%3?'#4c8146':'#719657',6*s,4*s);
  }else if(name==='มะหาด'){
    branch(x,y-8*s,-40*s,-27*s,C.bark2,3*s);branch(x,y-8*s,41*s,-27*s,C.bark2,3*s);
    foliageCluster(x,y-46*s,49*s,31*s,['#123b27','#1e552f','#39723e','#629151'],327);
    foliageCluster(x-33*s,y-30*s,27*s,18*s,['#1b4d2d','#477d44','#719653'],331);
    foliageCluster(x+33*s,y-30*s,27*s,18*s,['#1b4d2d','#477d44','#719653'],337);
    if(rnd(x,y)>.3)for(let i=0;i<4;i++)px(x-24*s+i*16*s,y-26*s+rnd(i,103)*9*s,5*s,5*s,'#b48a49');
  }else if(name==='มะเกลือ'){
    branch(x,y-8*s,-34*s,-30*s,C.bark2,3*s);branch(x,y-8*s,35*s,-30*s,C.bark2,3*s);
    foliageCluster(x,y-46*s,40*s,29*s,['#143d28','#245b33','#3f7540','#608b4e'],347);
    for(let i=0;i<14;i++)leaf(x-31*s+rnd(i,107)*62*s,y-62*s+rnd(i,109)*29*s,i%3?'#4d7d45':'#6d9055',5*s,4*s);
    for(let i=0;i<3;i++)px(x-17*s+i*15*s,y-20*s+rnd(i,113)*8*s,6*s,6*s,'#4c2730');
  }else{
    canopyBase(t,s,40,28,['#163e28','#285f35','#4a8147','#70985a']);
  }
}

// Replace the original low-detail global renderer with the species renderer.
treeBase=detailedTreeBase;
treeCanopy=detailedTreeCanopy;
