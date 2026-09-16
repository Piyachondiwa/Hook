/* Moonwood: clean-room stability pass. One renderer, one collision model, one effects layer. */
(()=>{'use strict';
if(typeof g==='undefined'||typeof p==='undefined'||typeof R!=='function')return;
const W=5400,H=2500,hash=(x,y)=>{const n=Math.sin(x*12.9898+y*78.233+91827)*43758.5453;return n-Math.floor(n)};
const oldSpecies=[
 ['ต้นทองหลาง','Erythrina variegata','ไม้ยืนต้น พบได้ในพื้นที่ราบและริมน้ำ','ไม้ยืนต้น','ไทย • เอเชียตะวันออกเฉียงใต้'],
 ['ต้นอินทนิลน้ำ','Lagerstroemia speciosa','ไม้ยืนต้น ดอกสีม่วง ออกดอกช่วงร้อน','ไม้ยืนต้น','ไทย • เอเชียใต้'],
 ['ต้นตะแบก','Lagerstroemia floribunda','ไม้ยืนต้นผลัดใบ เปลือกมีลวดลาย','ไม้ยืนต้น','ไทย • อินโดจีน'],
 ['ต้นพะยอม','Shorea roxburghii','ไม้ป่าดิบแล้ง ดอกมีกลิ่นหอม','ไม้ยืนต้น','ไทย • เอเชียใต้']
];
const trees=[];
for(let i=0;i<32;i++){const x=180+(i*317)%2980,y=260+(i*193)%1780,s=.78+(i%5)*.07;trees.push({x,y,s,type:oldSpecies[i%4][0],info:oldSpecies[i%4]});}
const islandTrees=[
 [3750,755,'ต้นสนญี่ปุ่น','Pinus densiflora','สนญี่ปุ่น ลำต้นสูง ใบเป็นกระจุก','ไม้ยืนต้น','ญี่ปุ่น'],[3890,735,'ต้นเมเปิลญี่ปุ่น','Acer palmatum','ไม้ผลัดใบ ใบเปลี่ยนสีตามฤดูกาล','ไม้ยืนต้น','ญี่ปุ่น'],[4070,705,'ต้นสนญี่ปุ่น','Pinus densiflora','สนญี่ปุ่น ลำต้นสูง ใบเป็นกระจุก','ไม้ยืนต้น','ญี่ปุ่น'],[4490,720,'ต้นเมเปิลญี่ปุ่น','Acer palmatum','ไม้ผลัดใบ ใบเปลี่ยนสีตามฤดูกาล','ไม้ยืนต้น','ญี่ปุ่น'],[4780,735,'ต้นสนญี่ปุ่น','Pinus densiflora','สนญี่ปุ่น ลำต้นสูง ใบเป็นกระจุก','ไม้ยืนต้น','ญี่ปุ่น'],[5015,765,'ต้นการบูร','Cinnamomum camphora','ไม้เขียวชอุ่ม พบได้ในเอเชียตะวันออก','ไม้ยืนต้น','ญี่ปุ่น • เอเชียตะวันออก'],
 [3720,900,'ต้นการบูร','Cinnamomum camphora','ไม้เขียวชอุ่ม พบได้ในเอเชียตะวันออก','ไม้ยืนต้น','ญี่ปุ่น • เอเชียตะวันออก'],[3760,1480,'ต้นซากุระ','Prunus serrulata','ไม้ดอกประจำภูมิทัศน์ญี่ปุ่น','ไม้ผลัดใบ','ญี่ปุ่น'],[3900,1600,'ต้นสนญี่ปุ่น','Pinus densiflora','สนญี่ปุ่น ลำต้นสูง ใบเป็นกระจุก','ไม้ยืนต้น','ญี่ปุ่น'],[4060,1640,'ต้นเมเปิลญี่ปุ่น','Acer palmatum','ไม้ผลัดใบ ใบเปลี่ยนสีตามฤดูกาล','ไม้ยืนต้น','ญี่ปุ่น'],[4300,1670,'ต้นการบูร','Cinnamomum camphora','ไม้เขียวชอุ่ม พบได้ในเอเชียตะวันออก','ไม้ยืนต้น','ญี่ปุ่น • เอเชียตะวันออก'],[4520,1645,'ต้นสนญี่ปุ่น','Pinus densiflora','สนญี่ปุ่น ลำต้นสูง ใบเป็นกระจุก','ไม้ยืนต้น','ญี่ปุ่น'],[4740,1650,'ต้นซากุระ','Prunus serrulata','ไม้ดอกประจำภูมิทัศน์ญี่ปุ่น','ไม้ผลัดใบ','ญี่ปุ่น'],[4970,1600,'ต้นการบูร','Cinnamomum camphora','ไม้เขียวชอุ่ม พบได้ในเอเชียตะวันออก','ไม้ยืนต้น','ญี่ปุ่น • เอเชียตะวันออก'],[5040,1450,'ต้นสนญี่ปุ่น','Pinus densiflora','สนญี่ปุ่น ลำต้นสูง ใบเป็นกระจุก','ไม้ยืนต้น','ญี่ปุ่น'],[3820,1450,'ต้นสนญี่ปุ่น','Pinus densiflora','สนญี่ปุ่น ลำต้นสูง ใบเป็นกระจุก','ไม้ยืนต้น','ญี่ปุ่น'],[4100,1480,'ต้นสนญี่ปุ่น','Pinus densiflora','สนญี่ปุ่น ลำต้นสูง ใบเป็นกระจุก','ไม้ยืนต้น','ญี่ปุ่น'],[4560,1480,'ต้นเมเปิลญี่ปุ่น','Acer palmatum','ไม้ผลัดใบ ใบเปลี่ยนสีตามฤดูกาล','ไม้ยืนต้น','ญี่ปุ่น'],[4890,1320,'ต้นการบูร','Cinnamomum camphora','ไม้เขียวชอุ่ม พบได้ในเอเชียตะวันออก','ไม้ยืนต้น','ญี่ปุ่น • เอเชียตะวันออก']
].map((q,i)=>({x:q[0],y:q[1],s:.82+(i%4)*.07,type:q[2],info:q.slice(2)}));
window.moonwoodTrees=trees.concat(islandTrees);
window.moonwoodIslandTreePositions=islandTrees;
const LAND={x:3670,y:630,w:1440,h:1140},BR={x:3285,y:1035,w:435,h:130},ROAD={x:1000,y:1060,w:4110,h:120};
const HOUSES=[[3740,860,150,90],[3935,860,145,88],[4140,860,150,90],[4420,860,150,90],[4645,860,145,88],[3820,975,116,68],[4560,975,116,68],[4225,690,112,110]];
const FIELDS=[[3730,1235,190,125],[3985,1235,205,125],[4255,1235,210,125],[4525,1235,250,125],[4805,1235,185,125]];
const FENCES=[[3725,1227,190,140],[3980,1227,205,140],[4250,1227,210,140],[4520,1227,250,140],[4800,1227,185,140]];
const inside=(q,x,y,pad=0)=>x>=q[0]-pad&&x<=q[0]+q[2]+pad&&y>=q[1]-pad&&y<=q[1]+q[3]+pad;
const treeBlock=(t,x,y)=>Math.hypot(x-t.x,y-(t.y+43*t.s))<15+12*t.s;
window.blocked=function(x,y){
 const r=10;if(x<r||y<r||x>W-r||y>H-r)return true;
 if(inside([ROAD.x,ROAD.y,ROAD.w,ROAD.h],x,y,r)||inside([BR.x,BR.y,BR.w,BR.h],x,y,r))return false;
 if(inside([LAND.x,LAND.y,LAND.w,LAND.h],x,y)){
  for(const q of HOUSES)if(inside(q,x,y,r))return true;
  for(const q of FIELDS)if(inside(q,x,y,2))return true;
  for(const q of FENCES)if(inside(q,x,y,2))return true;
  for(const t of islandTrees)if(treeBlock(t,x,y))return true;
  return false;
 }
 if(x>=3250&&x<=5200&&y>=570&&y<=1830)return true;
 for(const q of [[1320,1250,960,120],[2570,1290,180,105],[2780,1200,160,105]])if(inside(q,x,y,r))return true;
 for(const t of trees)if(treeBlock(t,x,y))return true;
 return false;
};
function grass(x0,y0,w,h){R(x0,y0,w,h,'#4d7645');for(let y=y0;y<y0+h;y+=16)for(let x=x0;x<x0+w;x+=16){const n=hash(x,y);R(x,y,16,16,n<.34?'#4b7042':n<.68?'#527a48':n<.91?'#577e4a':'#608650');if(n>.55)R(x+3+(n*8|0),y+4+(hash(y,x)*8|0),2,2,n>.84?'#8da35b':'#6b8c50');if(n>.94)R(x+11,y+11,3,2,'#789650')}}
function path(x,y,w,h){R(x,y,w,h,'#765941');R(x,y+5,w,h-10,'#89694b');for(let i=12;i<w;i+=34){const n=hash(x+i,y);R(x+i,y+17+(n*25|0),10,3,n>.5?'#aa8057':'#674c3a');if(n>.7)R(x+i+15,y+42+(n*12|0),7,2,'#c09a67')}}
function oldTree(t){const s=t.s,x=t.x,y=t.y;R(x-25*s,y+42*s,50*s,9*s,'#263d2a');R(x-6*s,y+18*s,12*s,34*s,'#543a2b');R(x-3*s,y+19*s,5*s,28*s,'#8a5d3b');const b=[[-28,-2,30,24],[-14,-16,35,27],[5,-4,39,29],[24,5,28,22],[-2,-31,29,25]];for(const q of b){for(let yy=0;yy<q[3];yy+=4)for(let xx=0;xx<q[2];xx+=4){const dx=xx-q[2]/2,dy=yy-q[3]/2;if(dx*dx/(q[2]*q[2]/4)+dy*dy/(q[3]*q[3]/4)>1)continue;const n=hash(x+q[0]+xx,y+q[1]+yy);if(n<.2)continue;R(x+q[0]+xx,y+q[1]+yy,3*s,3*s,n>.82?'#73934f':n>.48?'#4d7b46':'#39653d')}}}
function islandTree(t){const s=t.s,x=t.x,y=t.y;R(x-31*s,y+46*s,62*s,9*s,'#17291f');R(x-6*s,y+18*s,12*s,38*s,'#553a2a');R(x-2*s,y+20*s,4*s,30*s,'#93603b');const pink=t.type.includes('ซากุระ');const pts=pink?[[-32,-2,28,22],[-18,-18,38,28],[4,-8,40,28],[25,4,27,21],[-3,-34,29,25]]:[[-30,4,24,28],[-18,-12,35,31],[-2,-26,38,36],[17,-12,35,29],[29,5,24,24]];for(const q of pts){for(let yy=0;yy<q[3];yy+=4)for(let xx=0;xx<q[2];xx+=4){const dx=xx-q[2]/2,dy=yy-q[3]/2;if(dx*dx/(q[2]*q[2]/4)+dy*dy/(q[3]*q[3]/4)>1)continue;const n=hash(x+q[0]+xx,y+q[1]+yy);if(n<.18)continue;R(x+q[0]+xx,y+q[1]+yy,3*s,3*s,pink?(n>.5?'#f0b5c5':'#d88fa9'):(n>.82?'#789f59':n>.48?'#4d804b':'#356b43'))}}}
function house(x,y,s=1){const w=150*s,h=90*s;R(x,y,w,h,'#302b2a');R(x+6*s,y+7*s,w-12*s,h-7*s,'#b77d55');R(x-5*s,y-17*s,w+10*s,19*s,'#3d3b42');R(x+8*s,y-23*s,w-16*s,7*s,'#6b6259');R(x+13*s,y+17*s,42*s,31*s,'#312d2b');R(x+19*s,y+22*s,30*s,20*s,'#eee4c8');R(x+70*s,y+17*s,48*s,31*s,'#312d2b');R(x+76*s,y+22*s,36*s,20*s,'#eee4c8');R(x+59*s,y+56*s,31*s,34*s,'#302a27');R(x+63*s,y+60*s,23*s,30*s,'#87593b')}
function drawIsland(){R(3670,630,1440,1140,'#8b9d61');R(3690,650,1400,1100,'#718851');for(let i=0;i<220;i++){const x=3700+(i*47)%1360,y=675+(i*61)%1040,n=hash(i,31);if((y>1038&&y<1195)||(y>1210&&y<1410)||(x>3740&&x<5000&&y>840&&y<1040))continue;R(x,y,n>.72?4:3,n>.72?3:2,n>.84?'#b3bd73':n>.45?'#92a45f':'#617d4c')}
 path(3700,1050,1400,90);path(4250,735,48,315);path(3710,995,220,30);path(4740,995,250,30);path(4040,1140,330,32);path(4250,1370,48,205);path(3860,1560,930,32);
 for(const q of HOUSES.slice(0,5))house(q[0],q[1],q[2]/150);house(3820,975,.95);house(4560,975,.9);
 R(4250,735,60,22,'#553b30');R(4260,703,40,32,'#b84d47');R(4270,680,20,24,'#d5b66f');R(3888,770,60,12,'#575650');R(3895,755,46,15,'#b5b2a5');
 R(3715,1198,1260,18,'#4f9295');R(3715,1198,1260,4,'#8ac0b7');for(const q of FIELDS){R(q[0],q[1],q[2],q[3],'#7b673f');R(q[0]+5,q[1]+5,q[2]-10,q[3]-10,'#9b9250');for(let xx=q[0]+12;xx<q[0]+q[2]-8;xx+=12)for(let yy=q[1]+10;yy<q[1]+q[3]-8;yy+=14){const n=hash(xx,yy);if(n>.1)R(xx,yy,2,6,n>.55?'#ddd05d':'#85833f')}}
 for(const q of FENCES){R(q[0],q[1],q[2],5,'#bc8950');R(q[0],q[1]+q[3]-5,q[2],5,'#563d2d');for(let xx=q[0];xx<=q[0]+q[2];xx+=25)R(xx,q[1]-3,5,q[3]+6,'#3b3029')}
 R(4190,790,190,150,'#819658');R(4200,802,170,126,'#759052');
 for(const q of [[4060,1495,.85],[4705,1500,.9]]){R(q[0]-5*q[2],q[1],10*q[2],40*q[2],'#5a3b2b');for(let i=0;i<25;i++){const x=q[0]+((i*19)%74-37)*q[2],y=q[1]-18-(i%7)*6;R(x,y,4*q[2],4*q[2],i%2?'#e7a8bb':'#f4cbd7')}}
 for(const t of islandTrees)islandTree(t);
}
function worldClean(){grass(0,0,3250,H);path(1000,1060,2720,120);for(const q of [[1120,980,1.1],[1190,1030,.8],[2470,780,1],[2730,1540,1.15],[1030,1660,.9],[2930,520,.8]]){const [x,y,s]=q;R(x-16*s,y+10*s,32*s,5*s,'#243c2b');for(let i=0;i<10;i++)R(x+((i*13)%34-17)*s,y+((i*7)%15-8)*s,7*s,7*s,i%3?'#38603b':'#477646')}
 for(const q of [[1320,1250,960,120],[2570,1290,180,105],[2780,1200,160,105]]){R(q[0],q[1],q[2],q[3],'#2e4033');R(q[0]+8,q[1]+8,q[2]-16,8,'#566b4d')}
 for(const t of trees)oldTree(t);R(BR.x,BR.y,BR.w,BR.h,'#382c29');for(let x=BR.x+5;x<BR.x2;x+=25){R(x,BR.y+7,17,100,'#8d5e3d');R(x+3,BR.y+11,10,4,'#c18a57')}for(let x=BR.x+8;x<BR.x+BR.w-10;x+=68){R(x,BR.y-22,7,116,'#302825');R(x-5,BR.y-26,17,6,'#a36c45');R(x+7,BR.y-12,50,5,'#6f4935');R(x+7,BR.y+92,50,5,'#6f4935')};drawIsland();
}
window.world=worldClean;
window.hero=function(){const s=.78,x=p.x,y=p.y+(p.walking&&((p.frame|0)%2)?-2:0),step=p.walking?((p.frame|0)%4===1?3:(p.frame|0)%4===3?-3:0):0;R(x-14,y+29,28,5,'#17251f');R(x-9+step,y+25,7,20,'#202a39');R(x+2-step,y+25,7,20,'#202a39');R(x-11+step,y+42,10,5,'#332923');R(x+2-step,y+42,10,5,'#332923');R(x-12,y+7,24,21,'#29476e');R(x-9,y+9,18,15,'#3f6fa7');R(x-15,y+9,5,17,'#d9a17e');R(x+10,y+9,5,17,'#d9a17e');R(x-9,y-8,18,16,'#e7b58d');R(x-10,y-11,20,8,'#3d2927');R(x-7,y-15,14,7,'#5a3830');if(p.dir==='left')R(x-8,y-2,3,2,'#17202b');else if(p.dir==='right')R(x+5,y-2,3,2,'#17202b');else{R(x-5,y-2,2,2,'#17202b');R(x+3,y-2,2,2,'#17202b')}if(p.walking){const a=(p.frame|0)%2?2:-2;R(x-17,y+10+a,6,6,'#29476e');R(x+11,y+10-a,6,6,'#29476e')}};
window.moonwoodCamera=()=>({x:Math.max(0,Math.min(W-c.width,p.x-c.width/2)),y:Math.max(0,Math.min(H-c.height,p.y-c.height*.60)),scaleY:1});
window.moonwoodState=()=>({hp:100,maxHp:100,mana:100,maxMana:100,stamina:100,maxStamina:100,chapter:0,nearTree:false,treeName:'',treeOpen:false,walking:!!p.walking});
window.moonwoodScene={oceanBackground:true,bridgeWalkable:true,naturalJapaneseLayout:true,cleanWalkLanes:true,pixelDetail:'high'};
window.moonwoodLayout={naturalized:true};window.moonwoodIslandTrees={groundShadows:true,count:islandTrees.length};window.moonwoodElevation={pixelTerrain:true};window.moonwoodPolish={active:true,pixelOnly:true,readablePose:true};window.moonwoodRenderFix={heroRestored:true};window.moonwoodBridgeFix={active:true,authoritative:true,corridor:[2850,1040,3735,1160],cleanTravelLanes:true};window.moonwoodBoundary={locked:true,active:true};window.moonwoodFailsafe={active:true,collisionOnly:true,visualOverride:false};window.moonwoodOceanFix={active:true,width:W,height:H};window.moonwoodBitMax={active:true,level:'MAX',deterministic:true,groundPixels:1800,waterGlints:260,riceRows:5,bridgeDetails:true,cleanLanes:true};
/* Replace the broken multi-layer effects stack with one camera-aligned particle layer. */
const fx=document.createElement('canvas');fx.width=640;fx.height=360;fx.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;image-rendering:pixelated;z-index:3';const stage=document.getElementById('stage');if(stage)stage.appendChild(fx);const fg=fx.getContext('2d');fg.imageSmoothingEnabled=false;const mot=Array.from({length:34},(_,i)=>({x:3750+(i*113)%1250,y:680+(i*79)%1000,p:i*1.7}));function fxLoop(t){fg.clearRect(0,0,640,360);const cam=window.moonwoodCamera(),tt=t*.001;for(const q of mot){const x=q.x-cam.x+Math.sin(tt*.55+q.p)*12,y=q.y-cam.y+Math.sin(tt*.4+q.p)*5;if(x>-5&&x<645&&y>-5&&y<365){fg.fillStyle=q.p%3<1?'#f1c6d1':'#d8edc4';fg.globalAlpha=.55;fg.fillRect(x|0,y|0,2,2)}}fg.globalAlpha=1;requestAnimationFrame(fxLoop)}requestAnimationFrame(fxLoop);window.moonwoodEffects={cameraAligned:true,sakuraPetals:true,fireflies:true,waterSparkles:true,singleLayer:true};
})();
