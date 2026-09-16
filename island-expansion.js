/* Moonwood: expanded Japanese rural island with dense pixel-detail scene. */
(()=>{'use strict';
if(typeof g==='undefined'||typeof c==='undefined'||typeof R==='undefined'||typeof p==='undefined'||typeof world!=='function')return;
const baseWorld=world,baseBlocked=typeof blocked==='function'?blocked:null;
const VIEW_Y=.86,SCENE_W=5400,SCENE_H=2500;
const island={x1:3650,x2:5050,y1:650,y2:1735};
const bridge={x1:3380,x2:3795,y1:1090,y2:1245};
const B=(x,y,w,h,col)=>R(x,y,w,h,col);
const C={sea:'#164f68',sea2:'#1f6479',sea3:'#2b7d8c',seaHi:'#67b2bd',seaDeep:'#0d3749',foam:'#b6dddd',sand:'#aa985f',sandHi:'#c9b56f',grass:'#6f844b',grass2:'#8ea05a',grassHi:'#a9b86d',soil:'#6a5637',soilHi:'#947849',path:'#8f6948',pathHi:'#c09a67',wood:'#5b3a29',wood2:'#7d5135',woodHi:'#bd8050',dark:'#2b2423',roof:'#303039',roofHi:'#655953',wall:'#a8754e',wallHi:'#d0a06b',paper:'#eee6c8',red:'#9e3b35',redHi:'#d45a49',stone:'#74746e',stoneHi:'#c1bcae',stoneDark:'#45443f',rice:'#a9a34b',riceHi:'#e0d56e',riceLo:'#7e873d',pink:'#e7a7ba',pinkHi:'#f5d1da',bamboo:'#426842',gold:'#e3b058',water:'#4b8791',waterHi:'#77b7ae'};
function roof(x,y,w,h,col){B(x-8,y,w+16,h,col);B(x+8,y-7,w-16,7,C.roofHi);B(x+24,y-14,w-48,7,col);for(let q=x;q<x+w;q+=13)B(q,y+h-2,9,3,C.stone)}
function house(x,y,s=1,col=C.roof){const w=150*s,h=90*s;B(x,y,w,h,C.dark);B(x+6*s,y+7*s,w-12*s,h-7*s,C.wallHi);roof(x-2*s,y-15*s,w+4*s,18*s,col);for(let i=0;i<8;i++)B(x+(12+i*18)*s,y+9*s,3*s,h-31*s,C.wood);B(x+14*s,y+18*s,43*s,32*s,C.dark);B(x+19*s,y+23*s,33*s,22*s,C.paper);B(x+35*s,y+23*s,3*s,22*s,C.wood);B(x+69*s,y+18*s,50*s,32*s,C.dark);B(x+74*s,y+23*s,40*s,22*s,C.paper);B(x+91*s,y+23*s,3*s,22*s,C.wood);B(x+59*s,y+57*s,31*s,33*s,C.dark);B(x+63*s,y+61*s,23*s,29*s,C.woodHi);B(x+65*s,y+64*s,8*s,26*s,C.wallHi);B(x-4*s,y-1*s,w+8*s,4*s,C.dark);B(x+2*s,y+h-5*s,w-4*s,5*s,C.wood)}
function storehouse(x,y,s=1){const w=118*s,h=70*s;B(x,y,w,h,C.dark);B(x+6*s,y+7*s,w-12*s,h-7*s,C.wall);roof(x-2*s,y-13*s,w+4*s,16*s,C.roof);for(let i=0;i<5;i++)B(x+(16+i*19)*s,y+10*s,3*s,h-18*s,C.wood);B(x+42*s,y+25*s,34*s,40*s,C.dark);B(x+47*s,y+30*s,24*s,35*s,C.woodHi)}
function torii(x,y,s=1){B(x-50*s,y-55*s,9*s,78*s,C.red);B(x+41*s,y-55*s,9*s,78*s,C.red);B(x-64*s,y-68*s,128*s,10*s,C.red);B(x-54*s,y-78*s,108*s,8*s,C.redHi);B(x-40*s,y-49*s,80*s,7*s,C.redHi);B(x-5*s,y-49*s,10*s,52*s,C.red)}
function lantern(x,y,s=1){B(x,y,4*s,22*s,C.dark);B(x-8*s,y-7*s,16*s,10*s,C.stone);B(x-5*s,y-13*s,10*s,7*s,C.stoneHi);B(x-4*s,y-5*s,8*s,7*s,C.gold);B(x-5*s,y+22*s,10*s,3*s,C.dark)}
function well(x,y){B(x-34,y,68,12,C.stoneDark);B(x-28,y-18,56,18,C.stoneHi);B(x-21,y-14,42,10,C.dark);B(x-29,y-32,7,22,C.wood);B(x+22,y-32,7,22,C.wood);B(x-34,y-39,68,7,C.woodHi);B(x-3,y-34,6,27,C.dark);B(x-18,y-3,36,5,C.stone)}
function bridgeArt(){B(bridge.x1,bridge.y1+13,bridge.x2-bridge.x1,110,C.seaDeep);B(bridge.x1,bridge.y1+4,bridge.x2-bridge.x1,102,C.dark);B(bridge.x1,bridge.y1,bridge.x2-bridge.x1,9,C.woodHi);B(bridge.x1,bridge.y2-9,bridge.x2-bridge.x1,9,C.wood);for(let xx=bridge.x1+7;xx<bridge.x2-7;xx+=25){const n=rnd(xx,bridge.y1);B(xx,bridge.y1+9,19,82,C.woodHi);B(xx+3,bridge.y1+14,13,70,C.wood);B(xx+5,bridge.y1+22+(n*27|0),8,4,C.woodHi)}for(let xx=bridge.x1+3;xx<=bridge.x2-4;xx+=75){B(xx,bridge.y1-30,8,132,C.dark);B(xx-7,bridge.y1-33,22,7,C.woodHi);B(xx+8,bridge.y1-16,56,5,C.wood2);B(xx+8,bridge.y1+82,56,5,C.wood)}for(let i=0;i<34;i++){const x=bridge.x1+(i%17)*24,y=bridge.y1+110+(i%3)*5;B(x,y,11,2,C.foam)}}
function waterChannel(x,y,w,h){B(x,y,w,h,C.water);B(x,y,w,4,C.waterHi);for(let i=0;i<w;i+=28){const n=rnd(x+i,y);B(x+i+5,y+16+n*18,12,2,C.sea3);B(x+i+16,y+34+n*12,9,2,C.seaHi)}}
function path(x,y,w,h){B(x,y,w,h,C.path);B(x,y,w,5,C.pathHi);for(let i=0;i<w;i+=30){const n=rnd(x+i,y);B(x+i+6,y+13+n*19,6,3,C.wood);B(x+i+20,y+39+n*12,7,3,C.pathHi)}}
function field(x,y,w,h){B(x,y,w,h,C.soil);B(x+5,y+5,w-10,h-10,C.soilHi);for(let xx=x+10;xx<x+w-8;xx+=12)for(let yy=y+9;yy<y+h-7;yy+=12){const n=rnd(xx,yy);if(n>.15)B(xx,yy,2,6,n>.56?C.rice:C.riceLo);if(n>.32)B(xx+3,yy-2,2,7,C.riceHi)}B(x,y,w,3,C.stoneHi);B(x,y+h-3,w,3,C.stoneDark)}
function fence(x,y,w,h){B(x,y,w,5,C.woodHi);B(x,y+h-5,w,5,C.wood);for(let xx=x;xx<=x+w;xx+=25){B(xx,y-2,5,h+4,C.dark);B(xx-2,y-5,9,4,C.woodHi)}}
function gate(x,y){B(x,y,8,34,C.dark);B(x+34,y,8,34,C.dark);B(x-4,y-3,50,5,C.woodHi);B(x+7,y+14,28,4,C.wood)}
function sakura(x,y,s=1){B(x-5*s,y,10*s,40*s,C.wood);B(x-2*s,y,5*s,32*s,C.woodHi);const cl=[[0,-36,34,19],[-34,-28,31,19],[34,-25,31,18],[0,-58,25,18],[-19,-50,23,15],[19,-48,23,15]];for(const q of cl)B(x+(q[0]-q[2]/2)*s,y+q[1]*s,q[2]*s,q[3]*s,q[0]%2?C.pink:C.pinkHi);for(let i=0;i<16;i++)B(x+((i*19)%74-37)*s,y+(-20-(i%7)*6)*s,4*s,4*s,i%2?C.pink:C.pinkHi)}
function bamboo(x,y,s=1){for(let i=0;i<9;i++){const xx=x+i*7*s;B(xx,y-i*2*s,5*s,37*s+i*2,C.bamboo);B(xx+1,y-i*2*s,2*s,29*s,C.grass2);B(xx-1,y+8*s-i*2*s,7*s,3,C.bamboo)}}
function dock(x,y,w=90){B(x,y,w,16,C.wood);for(let xx=x+5;xx<x+w;xx+=18)B(xx,y+3,11,10,C.woodHi);for(let xx=x;xx<x+w;xx+=30)B(xx,y+16,7,26,C.dark);B(x+w-4,y+17,4,25,C.wood)}
function boat(x,y,s=1){B(x,y,72*s,9*s,C.dark);B(x+7*s,y+6*s,58*s,7*s,C.wood);B(x+23*s,y-12*s,3*s,15*s,C.wood);B(x+26*s,y-9*s,22*s,12*s,C.paper);B(x+48*s,y-7*s,3*s,10*s,C.wood)}
function islandGround(){
 B(island.x1+26,island.y1+28,island.x2-island.x1-52,island.y2-island.y1-56,C.stone);
 B(island.x1+6,island.y1+14,island.x2-island.x1-12,34,C.sandHi);
 B(island.x1+34,island.y1+48,island.x2-island.x1-68,island.y2-island.y1-94,C.grass);
 B(island.x1+14,island.y2-38,island.x2-island.x1-28,31,C.stone);
 B(island.x1+38,island.y2-8,island.x2-island.x1-76,12,C.stoneDark);
 for(let i=0;i<150;i++){const x=island.x1+18+(i*79)%1360,y=island.y1+20+(i*53)%1030,n=rnd(i*5,77);B(x,y,4+(i%5),2+(i%2),n>.72?C.stoneHi:n>.42?C.sandHi:C.grassHi)}
}
function drawIsland(){
 islandGround();
 // Main street and branching farm lanes.
 path(3695,1075,1240,70);
 path(4250,735,48,345);
 path(3710,1008,225,32);path(4725,1008,260,32);path(4040,1140,330,34);
 path(4250,1340,48,230);path(3860,1560,930,34);
 // Dense village core with breathing room.
 house(3735,860,1.00);
 house(3935,860,.96,C.roofHi);
 house(4140,860,.98);
 house(4420,860,1.00);
 house(4640,860,.92,C.roofHi);
 storehouse(3820,975,.95);storehouse(4560,975,.9);
 torii(4280,715,.95);
 well(3885,1165);well(4780,1165);
 // Agricultural belt, water channels and gates.
 waterChannel(3715,1215,220,150);waterChannel(3970,1215,240,150);waterChannel(4240,1215,245,150);waterChannel(4510,1215,275,150);
 field(3730,1225,190,126);field(3990,1225,205,126);field(4260,1225,210,126);field(4530,1225,245,126);field(4810,1225,170,126);
 fence(3725,1217,200,140);fence(3985,1217,215,140);fence(4255,1217,220,140);fence(4525,1217,255,140);fence(4805,1217,180,140);
 gate(3912,1325);gate(4180,1325);gate(4460,1325);gate(4775,1325);
 // Pond and shrine garden.
 waterChannel(4680,690,245,120);torii(4290,705,.65);
 B(4188,790,200,150,C.grass2);B(4200,802,176,126,C.grass);for(let i=0;i<34;i++){const x=4200+(i*31)%165,y=805+(i*47)%112;B(x,y,3,3,i%3?C.stoneHi:C.pink)}
 // Sakura, bamboo, lanterns, boats and docks.
 sakura(3840,1070,1.0);sakura(4110,1060,.95);sakura(4475,1055,1.0);sakura(4870,1055,.95);sakura(4050,1500,.85);sakura(4710,1510,.9);
 bamboo(3880,1465,.95);bamboo(4860,1450,.9);bamboo(4690,870,.78);
 lantern(3830,1065);lantern(4040,1065);lantern(4460,1065);lantern(4870,1065);lantern(4290,960);lantern(4290,1280);
 dock(4860,820,120);dock(4900,1505,95);boat(4960,835,.85);boat(4950,1525,.72);
 // More edge life: rocks, grass clumps, stepping stones, shrubs and tiny pixel accents.
 for(let i=0;i<360;i++){const x=3670+(i*47)%1360,y=670+(i*83)%1030,n=rnd(i*11,31);if((y>1060&&y<1155)||(y>1200&&y<1390)||(x>3720&&x<5000&&y>850&&y<1030))continue;if(n<.25)B(x,y,4,3,C.stoneHi);else if(n<.48)B(x,y,5,3,C.sandHi);else if(n<.69){B(x,y,3,7,C.grassHi);B(x+3,y-3,2,5,C.grass2)}else if(n<.84)B(x,y,4,4,C.pink);else if(n<.94)B(x,y,3,3,C.gold);else B(x,y,2,6,C.bamboo)}
 // Shoreline reeds and rocks.
 for(let i=0;i<90;i++){const x=island.x1+25+(i*31)%1360;B(x,island.y2-35+(i%5)*3,3,10,C.grass2);B(x+5,island.y2-30+(i%4)*2,2,7,C.grassHi)}
}
function camera(){const vh=c.height/VIEW_Y;return{x:Math.max(0,Math.min(SCENE_W-c.width,p.x-c.width/2)),y:Math.max(0,Math.min(SCENE_H-vh,p.y-vh/2)),scaleY:VIEW_Y}}
const solids=[
 [3730,845,165,105,'house'],[3930,845,160,105,'house'],[4135,845,160,105,'house'],[4415,845,165,105,'house'],[4635,845,160,105,'house'],
 [3816,962,126,78,'storehouse'],[4556,962,126,78,'storehouse'],[4230,690,102,110,'torii'],[3850,1138,70,50,'well'],[4745,1138,70,50,'well'],
 [3725,1217,200,6,'fence'],[3725,1351,200,6,'fence'],[3725,1217,6,140,'fence'],[3919,1217,6,105,'fence'],
 [3985,1217,215,6,'fence'],[3985,1351,215,6,'fence'],[3985,1217,6,140,'fence'],[4194,1217,6,105,'fence'],
 [4255,1217,220,6,'fence'],[4255,1351,220,6,'fence'],[4255,1217,6,140,'fence'],[4469,1217,6,105,'fence'],
 [4525,1217,255,6,'fence'],[4525,1351,255,6,'fence'],[4525,1217,6,140,'fence'],[4774,1217,6,105,'fence'],
 [4805,1217,180,6,'fence'],[4805,1351,180,6,'fence'],[4805,1217,6,140,'fence'],[4979,1217,6,105,'fence'],
 [3830,1035,30,62,'sakura'],[4100,1025,30,60,'sakura'],[4460,1020,30,62,'sakura'],[4855,1022,30,60,'sakura'],
 [4030,1470,38,48,'sakura'],[4690,1480,38,48,'sakura'],[3850,1455,75,55,'bamboo'],[4830,1440,75,55,'bamboo'],[4660,855,58,45,'bamboo']
];
function circleRect(cx,cy,r,q){const nx=Math.max(q[0],Math.min(cx,q[0]+q[2])),ny=Math.max(q[1],Math.min(cy,q[1]+q[3]));return (cx-nx)**2+(cy-ny)**2<r*r}
function onBridge(x,y){return x>=bridge.x1-12&&x<=bridge.x2+12&&y>=bridge.y1-36&&y<=bridge.y2+36}
world=function(){drawOcean();baseWorld();bridgeArt();drawIsland();if(p.x>3250&&typeof hero==='function')hero();if(p.x>3250&&typeof arrow==='function')arrow()};
if(baseBlocked)blocked=function(x,y){const r=15;if(x<r||y<r||x>SCENE_W-r||y>SCENE_H-r)return true;if(onBridge(x,y))return false;if(x<island.x1+r)return baseBlocked(x,y);if(x>island.x2-r||y<island.y1+r||y>island.y2-r)return true;for(const q of solids)if(circleRect(x,y,r,q))return true;return false};
window.moonwoodCamera=camera;
window.moonwoodScene={oceanBackground:true,bridgeWalkable:true,naturalJapaneseLayout:true,expandedIsland:true,islandBounds:{...island},bridgeBounds:{...bridge},pixelDetail:'high',decorations:360,treesAdded:6,farmland:true,shrineGarden:true,docks:true};
window.moonwoodIsland={expanded:true,bounds:{...island},bridge:{...bridge},detailLevel:'high'};
})();