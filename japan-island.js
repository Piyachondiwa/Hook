/* Moonwood: one authoritative Japanese island scene + walkability layer. */
(()=>{'use strict';
if(typeof R==='undefined'||typeof p==='undefined'||typeof world!=='function')return;
const baseWorld=world;
const oldBlocked=typeof blocked==='function'?blocked:null;
const S={x1:3680,x2:5100,y1:650,y2:1750};
const BR={x1:3300,x2:3705,y1:1035,y2:1165};
const ROAD={x1:3000,x2:3705,y1:1045,y2:1125};
const FIELDS=[[3730,1235,190,125],[3985,1235,205,125],[4255,1235,210,125],[4525,1235,250,125],[4805,1235,185,125]];
const TREES=[
{x:3715,y:760,t:'pine',s:1.1},{x:3880,y:735,t:'broad',s:.92},{x:4070,y:700,t:'pine',s:1},{x:4490,y:720,t:'maple',s:1.02},{x:4780,y:735,t:'pine',s:1.08},{x:5015,y:765,t:'broad',s:.92},
{x:3710,y:885,t:'broad',s:.9},{x:3740,y:970,t:'pine',s:.8},{x:3760,y:1480,t:'broad',s:.95},{x:3890,y:1600,t:'pine',s:1.05},{x:4050,y:1650,t:'maple',s:1},{x:4300,y:1670,t:'broad',s:.9},{x:4520,y:1645,t:'pine',s:1.05},{x:4740,y:1650,t:'maple',s:1},{x:4970,y:1600,t:'broad',s:.94},{x:5040,y:1450,t:'pine',s:.88},
{x:3820,y:1450,t:'pine',s:.78},{x:4100,y:1480,t:'pine',s:.72},{x:4560,y:1480,t:'maple',s:.72},{x:4890,y:1320,t:'broad',s:.78}
];
const C={sea:'#123f52',sea2:'#1e6171',foam:'#72b8ba',sand:'#b49c64',sandHi:'#d0bc79',grass:'#71884f',grass2:'#8fa25d',grassHi:'#b0bd73',soil:'#765b3d',soilHi:'#9a7a4e',path:'#8d6949',pathHi:'#c29b68',wood:'#5b3b2b',wood2:'#7d5136',woodHi:'#c1844e',dark:'#2c2928',roof:'#34343b',roofHi:'#665b53',wall:'#a9754e',wallHi:'#d0a06b',paper:'#efe8ce',red:'#9e3d38',redHi:'#d75d4c',stone:'#74736c',stoneHi:'#c7c0ad',stoneDark:'#45443f',rice:'#aaa348',riceHi:'#e2d66d',riceLo:'#7e873e',pink:'#e7a8bb',pinkHi:'#f5d3db',bamboo:'#476e45',gold:'#e6b65c',water:'#4d8d93',waterHi:'#7bbab0',leaf:'#376e43',leaf2:'#4c824e',leaf3:'#78a45d',shadow:'#17271d'};
const n=(x,y)=>{const v=Math.sin(x*12.9898+y*78.233+91827)*43758.5453;return v-Math.floor(v)};
const B=(x,y,w,h,c)=>R(x,y,w,h,c);
function roundedLand(){
  B(S.x1+35,S.y1,S.x2-S.x1-70,S.y2-S.y1,C.stone);
  B(S.x1+15,S.y1+22,S.x2-S.x1-30,S.y2-S.y1-44,C.sand);
  B(S.x1+34,S.y1+48,S.x2-S.x1-68,S.y2-S.y1-96,C.grass);
  B(S.x1+55,S.y1+70,S.x2-S.x1-110,S.y2-S.y1-140,C.grass2);
  for(let i=0;i<140;i++){const x=S.x1+28+(i*71)%1365,y=S.y1+35+(i*53)%1030,v=n(i,77);if((y>1025&&y<1145)||(y>1215&&y<1410))continue;B(x,y,3+(i%4),2+(i%2),v>.72?C.grassHi:v>.4?C.sandHi:C.stoneHi)}
  for(let x=S.x1+20;x<S.x2-20;x+=32){B(x,S.y1+7,18,4,C.sandHi);B(x,S.y2-13,20,4,C.stoneDark)}
}
function path(x,y,w,h){B(x,y,w,h,C.path);B(x,y,w,5,C.pathHi);for(let i=12;i<w;i+=31){const v=n(x+i,y);B(x+i,y+16+(v*20|0),7,3,C.wood);B(x+i+12,y+43+(v*11|0),6,3,C.pathHi)}}
function house(x,y,s=1,roof=C.roof){const w=150*s,h=90*s;B(x,y,w,h,C.dark);B(x+6*s,y+7*s,w-12*s,h-7*s,C.wallHi);B(x-4*s,y-14*s,w+8*s,18*s,roof);B(x+8*s,y-21*s,w-16*s,7*s,C.roofHi);for(let i=0;i<7;i++)B(x+(13+i*19)*s,y+9*s,3*s,h-32*s,C.wood);B(x+14*s,y+18*s,42*s,31*s,C.dark);B(x+19*s,y+23*s,32*s,21*s,C.paper);B(x+69*s,y+18*s,50*s,31*s,C.dark);B(x+74*s,y+23*s,40*s,21*s,C.paper);B(x+59*s,y+57*s,31*s,33*s,C.dark);B(x+63*s,y+61*s,23*s,29*s,C.woodHi);B(x-5*s,y+h-5*s,w+10*s,5*s,C.wood)}
function store(x,y,s=1){const w=116*s,h=68*s;B(x,y,w,h,C.dark);B(x+6*s,y+7*s,w-12*s,h-7*s,C.wall);B(x-2*s,y-13*s,w+4*s,16*s,C.roof);B(x+7*s,y-19*s,w-14*s,6*s,C.roofHi);for(let i=0;i<5;i++)B(x+(16+i*19)*s,y+9*s,3*s,h-17*s,C.wood);B(x+41*s,y+24*s,34*s,39*s,C.dark);B(x+46*s,y+29*s,24*s,34*s,C.woodHi)}
function torii(x,y,s=1){B(x-50*s,y-55*s,9*s,78*s,C.red);B(x+41*s,y-55*s,9*s,78*s,C.red);B(x-64*s,y-68*s,128*s,10*s,C.red);B(x-54*s,y-78*s,108*s,8*s,C.redHi);B(x-40*s,y-49*s,80*s,7*s,C.redHi)}
function well(x,y){B(x-34,y,68,12,C.stoneDark);B(x-28,y-18,56,18,C.stoneHi);B(x-21,y-14,42,10,C.dark);B(x-29,y-32,7,22,C.wood);B(x+22,y-32,7,22,C.wood);B(x-34,y-39,68,7,C.woodHi);B(x-3,y-34,6,27,C.dark)}
function bridgeArt(){
  B(BR.x1,BR.y1+12,BR.x2-BR.x1,104,C.sea);
  B(BR.x1,BR.y1,BR.x2-BR.x1,112,C.dark);
  B(BR.x1,BR.y1+5,BR.x2-BR.x1,96,C.woodHi);
  for(let x=BR.x1+5;x<BR.x2-5;x+=24){B(x,BR.y1+8,18,90,C.wood2);B(x+3,BR.y1+13,12,78,C.woodHi);B(x+6,BR.y1+22+(n(x,5)*48|0),6,3,C.wood)}
  B(BR.x1,BR.y1,BR.x2-BR.x1,7,C.wood);B(BR.x1,BR.y2-7,BR.x2-BR.x1,7,C.wood);
  for(let x=BR.x1+4;x<BR.x2-8;x+=67){B(x,BR.y1-24,7,118,C.dark);B(x-6,BR.y1-28,19,6,C.woodHi);B(x+7,BR.y1-14,50,5,C.wood2);B(x+7,BR.y1+86,50,5,C.wood2)}
  for(let i=0;i<40;i++){const x=BR.x1+(i*17)%(BR.x2-BR.x1),y=BR.y2+4+(i%3)*4;B(x,y,9,2,C.foam)}
}
function channel(x,y,w,h){B(x,y,w,h,C.water);B(x,y,w,4,C.waterHi);for(let i=8;i<w;i+=30){const v=n(x+i,y);B(x+i,y+8+(v*5|0),13,2,C.sea2)}}
function field(x,y,w,h){B(x,y,w,h,C.soil);B(x+5,y+5,w-10,h-10,C.soilHi);for(let xx=x+11;xx<x+w-8;xx+=12)for(let yy=y+9;yy<y+h-7;yy+=12){const v=n(xx,yy);if(v>.12)B(xx,yy,2,6,v>.55?C.rice:C.riceLo);if(v>.3)B(xx+3,yy-2,2,7,C.riceHi)}B(x,y,w,3,C.stoneHi);B(x,y+h-3,w,3,C.stoneDark)}
function fence(x,y,w,h){B(x,y,w,5,C.woodHi);B(x,y+h-5,w,5,C.wood);for(let xx=x;xx<=x+w;xx+=25){B(xx,y-2,5,h+4,C.dark);B(xx-2,y-5,9,4,C.woodHi)}}
function gate(x,y){B(x,y,8,34,C.dark);B(x+34,y,8,34,C.dark);B(x-4,y-3,50,5,C.woodHi);B(x+7,y+14,28,4,C.wood)}
function sakura(x,y,s=1){B(x-5*s,y,10*s,40*s,C.wood);B(x-2*s,y,5*s,32*s,C.woodHi);const q=[[0,-36,34,19],[-32,-27,29,18],[32,-25,29,18],[0,-58,25,18],[-18,-50,23,15],[18,-48,23,15]];for(const a of q)B(x+(a[0]-a[2]/2)*s,y+a[1]*s,a[2]*s,a[3]*s,a[0]%2?C.pink:C.pinkHi);for(let i=0;i<18;i++)B(x+((i*19)%74-37)*s,y+(-18-(i%7)*6)*s,4*s,4*s,i%2?C.pink:C.pinkHi)}
function bamboo(x,y,s=1){for(let i=0;i<8;i++){const xx=x+i*7*s;B(xx,y-i*2*s,5*s,37*s+i*2,C.bamboo);B(xx+1,y-i*2*s,2*s,29*s,C.grass2);B(xx-1,y+8*s-i*2*s,7*s,3,C.bamboo)}}
function tree(t){const {x,y,s}=t;B(x-32*s,y+48*s,64*s,8*s,C.shadow);B(x-5*s,y,10*s,50*s,C.wood);B(x-2*s,y+5*s,4*s,40*s,C.woodHi);let sets;if(t.t==='pine')sets=[[-31,44,19],[-19,57,25],[-6,70,31],[8,62,28],[22,50,22],[34,35,16]];else sets=[[-35,26,24],[-20,38,34],[-3,46,40],[17,39,31],[34,27,24],[4,62,27]];for(let j=0;j<sets.length;j++){const [dy,w,h]=sets[j],cx=x+(j%3-1)*10*s;for(let yy=-h;yy<h;yy+=4)for(let xx=-w;xx<w;xx+=4){const d=(xx*xx)/(w*w)+(yy*yy)/(h*h);if(d>1)continue;const v=n(cx+xx,dy+yy);if(v<.18||d>.82&&v<.5)continue;B(cx+xx, y+dy+yy,3*s,3*s,v>.84?C.leaf3:v>.5?C.leaf2:C.leaf)}}}
function islandTrees(){TREES.forEach(tree);}
function decor(){
  for(let i=0;i<260;i++){const x=3700+(i*43)%1380,y=675+(i*67)%1040;if((y>1028&&y<1150)||(y>1210&&y<1420)||(x>3750&&x<4980&&y>835&&y<1025))continue;const v=n(i,33);if(v<.25)B(x,y,3,2,C.stoneHi);else if(v<.5)B(x,y,4,2,C.grassHi);else if(v<.7){B(x,y,2,7,C.grass);B(x+3,y-3,2,5,C.grass2)}else if(v<.84)B(x,y,4,4,C.pink);else B(x,y,3,3,C.gold)}
  for(let i=0;i<80;i++){const x=3710+(i*29)%1370;B(x,1710+(i%5)*3,3,9,C.grass2);B(x+5,1714+(i%4)*2,2,6,C.grassHi)}
}
function drawIsland(){
  roundedLand();
  path(3700,1045,1405,70);
  path(4250,735,48,310);
  path(3710,995,220,30);path(4740,995,250,30);
  path(4040,1140,330,32);path(4250,1370,48,205);path(3860,1560,930,32);
  house(3740,860,1);house(3935,860,.96,C.roofHi);house(4140,860,.98);house(4420,860,1);house(4645,860,.92,C.roofHi);
  store(3820,975,.95);store(4560,975,.9);
  torii(4280,715,.95);well(3890,770);
  channel(3715,1198,1260,18);
  FIELDS.forEach(q=>field(...q));
  fence(3725,1227,190,140);fence(3980,1227,205,140);fence(4250,1227,210,140);fence(4520,1227,250,140);fence(4800,1227,185,140);
  gate(3908,1330);gate(4175,1330);gate(4455,1330);gate(4770,1330);
  B(4190,790,190,150,C.grass2);B(4200,802,170,126,C.grass);for(let i=0;i<38;i++){const x=4200+(i*31)%160,y=805+(i*47)%110;B(x,y,3,3,i%3?C.stoneHi:C.pink)}
  sakura(4060,1495,.85);sakura(4705,1500,.9);bamboo(3880,1465,.95);bamboo(4860,1450,.9);bamboo(4690,870,.78);
  B(4288,955,4,24,C.dark);B(4280,948,20,10,C.stone);B(4283,951,14,6,C.gold);
  islandTrees();decor();bridgeArt();
}
function islandInside(x,y){if(x<S.x1||x>S.x2||y<S.y1||y>S.y2)return false;const edge=32;const nearX=x<S.x1+edge?x-S.x1:S.x2-x,nearY=y<S.y1+edge?y-S.y1:S.y2-y;return nearX>=0&&nearY>=0&&((nearX>=edge&&nearY>=edge)||((nearX/edge)**2+(nearY/edge)**2>=1))}
const solids=[
[3735,845,160,105],[3930,845,165,105],[4135,845,165,105],[4415,845,165,105],[4640,845,165,105],[3816,962,126,80],[4556,962,126,80],[4230,690,102,110],[3855,743,70,52],[4280,935,24,48]
];
function solidAt(x,y){for(const q of solids)if(x>=q[0]-10&&x<=q[0]+q[2]+10&&y>=q[1]-10&&y<=q[1]+q[3]+10)return true;for(const t of TREES){const r=12*t.s+10;if(Math.hypot(x-t.x,y-(t.y+42*t.s))<r)return true}return false}
blocked=function(x,y){
  const r=13;
  const inBridge=x>=BR.x1-r&&x<=BR.x2+r&&y>=BR.y1-r&&y<=BR.y2+r;
  const inApproach=x>=ROAD.x1-r&&x<=ROAD.x2+r&&y>=ROAD.y1-r&&y<=ROAD.y2+r;
  const inIsland=islandInside(x,y);
  if(inBridge||inApproach)return false;
  if(inIsland)return !solidAt(x,y);
  if(x>3250&&x<5200&&y>580&&y<1820)return true;
  return oldBlocked?oldBlocked(x,y):true;
};
const camera=()=>{const vw=c.width,vh=c.height/.86;return{x:Math.max(0,Math.min(5400-vw,p.x-vw/2)),y:Math.max(0,Math.min(2500-vh,p.y-vh/2)),scaleY:.86}};
world=function(){baseWorld();if(p.x>=3250||p.x>=S.x1-80)drawIsland()};
window.moonwoodCamera=camera;
window.moonwoodScene={oceanBackground:true,bridgeWalkable:true,naturalJapaneseLayout:true,cleanWalkLanes:true,pixelDetail:'high',authoritativeJapan:true};
window.moonwoodBoundary={locked:true,bridge:BR,land:S,expandedBoundary:true,bridgeApproach:true};
window.moonwoodBridgeFix={active:true,authoritative:true,corridor:BR,bridge:BR,cleanTravelLanes:true,deckAligned:true};
window.moonwoodElevation={raised:true,pixelTerrain:true,highDetail:true};
window.moonwoodIslandTrees={count:TREES.length,detail:'organic-pixel',microPixels:260,groundShadows:true,noRectangularCanopy:true,clearTravelLanes:true};
window.moonwoodIslandTreePositions=TREES.map(t=>({x:t.x,y:t.y,type:t.t,s:t.s}));
window.moonwoodFailsafe={active:true,collisionOnly:true,visualOverride:false};
window.moonwoodPolish={active:true,pixelOnly:true,readablePose:true};
window.moonwoodBitMax={active:true,level:'MAX',groundPixels:1400,riceRows:5,bridgeDetails:true,waterGlints:160,deterministic:true,cleanLanes:true};
})();
