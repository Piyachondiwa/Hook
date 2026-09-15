/* Moonwood: believable Japanese island layout + solid collision. One scene owner. */
(()=>{'use strict';
if(typeof g==='undefined'||typeof c==='undefined'||typeof R==='undefined'||typeof p==='undefined'||typeof world!=='function')return;
const baseWorld=world;
const baseBlocked=typeof blocked==='function'?blocked:null;
const VIEW_Y=.86,SCENE_W=5000,SCENE_H=2300;
const island={x1:3820,x2:4800,y1:760,y2:1510};
const bridge={x1:3540,x2:3910,y1:1100,y2:1235};
const B=(x,y,w,h,col)=>R(x,y,w,h,col);
const C={sea:'#164f68',sea2:'#1e6478',sea3:'#2b7c8d',seaHi:'#63adb8',seaDeep:'#103b4e',foam:'#a4d6d5',sand:'#a9965b',sandHi:'#c0ac68',grass:'#71834a',grass2:'#809553',soil:'#6b5939',soilHi:'#927844',path:'#96704b',pathHi:'#b58a5b',wood:'#63402c',wood2:'#875737',woodHi:'#bd8050',dark:'#302725',roof:'#343239',roofHi:'#5b514c',wall:'#a87950',wallHi:'#c89a66',paper:'#eee4c6',red:'#a33e35',redHi:'#d25d4b',stone:'#77746d',stoneHi:'#b8b2a4',stoneDark:'#45433f',rice:'#a9a04b',riceHi:'#d7c969',riceLo:'#7e813c',pink:'#e7a6ba',pinkHi:'#f4cbd6',bamboo:'#466a43',gold:'#e2ad5d'};
function roof(x,y,w,h,col){B(x-8,y,w+16,h,col);B(x+8,y-7,w-16,7,C.roofHi);B(x+22,y-13,w-44,6,col);for(let q=x;q<x+w;q+=15)B(q,y+h-2,10,3,C.stone)}
function house(x,y,s=1,col=C.roof){const w=132*s,h=78*s;B(x,y,w,h,C.dark);B(x+6*s,y+7*s,w-12*s,h-7*s,C.wallHi);roof(x-2*s,y-15*s,w+4*s,18*s,col);for(let i=0;i<7;i++)B(x+(12+i*17)*s,y+9*s,3*s,h-30*s,C.wood);B(x+14*s,y+19*s,40*s,30*s,C.dark);B(x+19*s,y+24*s,30*s,20*s,C.paper);B(x+34*s,y+24*s,3*s,20*s,C.wood);B(x+65*s,y+19*s,45*s,30*s,C.dark);B(x+70*s,y+24*s,35*s,20*s,C.paper);B(x+86*s,y+24*s,3*s,20*s,C.wood);B(x+52*s,y+52*s,28*s,26*s,C.dark);B(x+56*s,y+56*s,20*s,22*s,C.woodHi);B(x+58*s,y+59*s,7*s,19*s,C.wallHi);B(x-4*s,y-1*s,w+8*s,4*s,C.dark);B(x+2*s,y+h-5*s,w-4*s,5*s,C.wood)}
function torii(x,y,s=1){B(x-58*s,y-55*s,9*s,78*s,C.red);B(x+49*s,y-55*s,9*s,78*s,C.red);B(x-72*s,y-68*s,144*s,10*s,C.red);B(x-60*s,y-78*s,120*s,8*s,C.redHi);B(x-44*s,y-49*s,88*s,7*s,C.redHi);B(x-5*s,y-49*s,10*s,52*s,C.red)}
function lantern(x,y,s=1){B(x,y,4*s,22*s,C.dark);B(x-8*s,y-7*s,16*s,10*s,C.stone);B(x-5*s,y-13*s,10*s,7*s,C.stoneHi);B(x-4*s,y-5*s,8*s,7*s,C.gold);B(x-5*s,y+22*s,10*s,3*s,C.dark)}
function well(x,y){B(x-34,y,68,12,C.stoneDark);B(x-28,y-18,56,18,C.stoneHi);B(x-22,y-14,44,10,C.dark);B(x-30,y-32,7,22,C.wood);B(x+23,y-32,7,22,C.wood);B(x-34,y-38,68,7,C.woodHi);B(x-3,y-34,6,27,C.dark);B(x-19,y-3,38,5,C.stone)}
function rice(x,y,w,h){B(x,y,w,h,C.soil);B(x+5,y+5,w-10,h-10,C.soilHi);for(let xx=x+10;xx<x+w-8;xx+=11)for(let yy=y+9;yy<y+h-7;yy+=11){const n=rnd(xx,yy);if(n>.2)B(xx,yy,2,6,n>.55?C.rice:C.riceLo);if(n>.35)B(xx+3,yy-2,2,7,C.riceHi)}B(x,y,w,3,C.stoneHi);B(x,y+h-3,w,3,C.stoneDark)}
function fence(x,y,w,h=5){for(let xx=x;xx<=x+w;xx+=28){B(xx,y-2,5,25,C.dark);B(xx-2,y-5,9,4,C.woodHi)}B(x,y+5,w,h,C.woodHi);B(x,y+17,w,h,C.wood)}
function sakura(x,y,s=1){B(x-5*s,y,10*s,38*s,C.wood);B(x-2*s,y,5*s,31*s,C.woodHi);const cl=[[0,-35,30,18],[-31,-26,28,18],[31,-25,28,18],[0,-55,23,17],[-18,-49,21,14],[20,-47,21,14]];for(const q of cl)B(x+(q[0]-q[2]/2)*s,y+q[1]*s,q[2]*s,q[3]*s,q[0]%2?C.pink:C.pinkHi);for(let i=0;i<12;i++)B(x+((i*23)%70-35)*s,y+(-18-(i%6)*7)*s,4*s,4*s,i%2?C.pink:C.pinkHi)}
function bamboo(x,y){for(let i=0;i<7;i++){const xx=x+i*7;B(xx,y-i*2,5,34+i*2,C.bamboo);B(xx+1,y-i*2,2,28+i*2,C.grass2);B(xx-1,y+8-i*2,7,3,C.bamboo)}}
function drawOcean(){B(0,0,SCENE_W,SCENE_H,C.seaDeep);B(0,0,SCENE_W,SCENE_H,C.sea);for(let y=0;y<SCENE_H;y+=42){const shift=((y/42|0)%2)*37;for(let x=-40+shift;x<SCENE_W;x+=118){const n=rnd(x+19,y+7);B(x,y+12+(n*8|0),38+(n*22|0),3,n>.52?C.sea2:C.seaDeep);if(n>.68)B(x+9,y+17+(n*8|0),18,2,C.sea3)}}for(let i=0;i<520;i++){const x=rnd(i*17,31)*SCENE_W,y=rnd(i*23,71)*SCENE_H,n=rnd(i*41,91);if(n>.82)B(x,y,2+(i%4),2,n>.94?C.foam:C.seaHi)}}
function shoreline(){B(island.x1+22,island.y1+28,island.x2-island.x1-44,island.y2-island.y1-58,C.stone);B(island.x1,island.y1+18,island.x2-island.x1,30,C.sandHi);B(island.x1+34,island.y1+50,island.x2-island.x1-68,island.y2-island.y1-98,C.grass);B(island.x1+16,island.y2-34,island.x2-island.x1-32,28,C.stone);B(island.x1+35,island.y2-9,island.x2-island.x1-70,12,C.stoneDark);for(let i=0;i<90;i++){const x=island.x1+18+(i*83)%940,y=island.y1+18+(i*47)%700,n=rnd(i,77);B(x,y,5+(i%5)*2,3,n>.7?C.stoneHi:C.sandHi)}}
function drawBridge(){B(bridge.x1,bridge.y1+10,bridge.x2-bridge.x1,108,C.seaDeep);B(bridge.x1,bridge.y1+3,bridge.x2-bridge.x1,101,C.dark);B(bridge.x1,bridge.y1,bridge.x2-bridge.x1,9,C.woodHi);B(bridge.x1,bridge.y2-9,bridge.x2-bridge.x1,9,C.wood);for(let xx=bridge.x1+8;xx<bridge.x2-8;xx+=27){const n=rnd(xx,bridge.y1);B(xx,bridge.y1+9,20,82,C.woodHi);B(xx+3,bridge.y1+14,14,70,C.wood);B(xx+5,bridge.y1+22+(n*28|0),9,4,C.woodHi)}for(let xx=bridge.x1+4;xx<=bridge.x2-4;xx+=78){B(xx,bridge.y1-28,8,128,C.dark);B(xx-7,bridge.y1-31,22,7,C.woodHi);B(xx+8,bridge.y1-14,58,5,C.wood2);B(xx+8,bridge.y1+82,58,5,C.wood)}for(let i=0;i<28;i++){const x=bridge.x1+(i%14)*26,y=bridge.y1+108+(i%3)*4;B(x,y,12,2,C.foam)}}
function path(x,y,w,h){B(x,y,w,h,C.path);B(x,y,w,5,C.pathHi);for(let i=0;i<w;i+=30){const n=rnd(x+i,y);B(x+i+6,y+16+n*18,5,3,C.wood);B(x+i+20,y+42+n*12,7,3,C.pathHi)}}
function drawIsland(){
 shoreline();
 // Main village road and two smaller lanes form a readable settlement loop.
 path(3855,1088,875,64);path(4190,830,52,650);path(3860,1010,330,38);path(4430,1210,300,38);path(4550,890,175,38);
 // Buildings grouped around roads, with clear courtyards and no random overlaps.
 house(3890,885,1.0);house(4120,1015,.92,C.roofHi);house(4370,865,1.0);house(4535,1080,.9,C.roofHi);house(4640,915,.82);
 torii(4230,1010,1.05);well(4240,1180);well(4050,1275);
 // Rice terraces occupy the quieter southern/eastern side.
 rice(3868,1188,245,128);rice(4140,1235,220,118);rice(4430,1255,292,132);rice(4525,1002,205,84);rice(4300,800,188,76);
 fence(3865,1175,248);fence(4137,1222,225);fence(4425,1242,296);fence(4515,992,212);
 sakura(3990,1035,1.22);sakura(4410,1050,1.28);sakura(4730,1125,1.18);sakura(4255,1365,1.05);
 lantern(3995,1065);lantern(4225,1072);lantern(4400,1145);lantern(4600,1165);lantern(4740,1205);bamboo(4010,1195);bamboo(4700,1260);
 // Small decorative ground details are kept out of roads, buildings and rice plots.
 for(let i=0;i<230;i++){const x=3848+(i*79)%930,y=780+(i*53)%710,n=rnd(i*7,99);if((y>1080&&y<1165)||(x>3880&&x<4020&&y>875&&y<980)||(x>4100&&x<4270&&y>1000&&y<1110))continue;if(n<.34)B(x,y,3,3,C.stoneHi);else if(n<.57)B(x,y,4,2,C.sandHi);else if(n<.76)B(x,y,3,4,C.riceLo);else if(n<.9)B(x,y,4,3,C.pink);else B(x,y,2,2,C.gold)}
}
function camera(){const vh=c.height/VIEW_Y;return{x:Math.max(0,Math.min(SCENE_W-c.width,p.x-c.width/2)),y:Math.max(0,Math.min(SCENE_H-vh,p.y-vh/2)),scaleY:VIEW_Y}}
const solidRects=[
 [3880,868,164,112,'house'],[4110,998,148,112,'house'],[4360,848,160,112,'house'],[4525,1063,132,104,'house'],[4630,898,120,98,'house'],
 [4190,970,80,86,'torii'],[4202,1160,76,48,'well'],[4012,1248,76,48,'well'],
 [3860,1170,260,154,'rice'],[4132,1217,236,142,'rice'],[4420,1237,312,156,'rice'],[4515,987,225,106,'rice'],[4290,785,210,98,'rice'],
 [3860,1170,260,28,'fence'],[4130,1218,235,28,'fence'],[4418,1238,312,28,'fence'],[4510,987,230,28,'fence'],
 [3978,995,34,58,'sakura'],[4398,1012,34,58,'sakura'],[4718,1090,34,58,'sakura'],[4240,1335,34,58,'sakura'],
 [4000,1185,62,45,'bamboo'],[4690,1248,62,45,'bamboo']
];
function circleRect(cx,cy,r,q){const nx=Math.max(q[0],Math.min(cx,q[0]+q[2])),ny=Math.max(q[1],Math.min(cy,q[1]+q[3]));return (cx-nx)**2+(cy-ny)**2<r*r}
function onBridge(x,y){return x>=bridge.x1-12&&x<=bridge.x2+12&&y>=bridge.y1-38&&y<=bridge.y2+38}
world=function(){drawOcean();baseWorld();drawBridge();drawIsland();if(p.x>3600&&typeof hero==='function')hero();if(p.x>3600&&typeof arrow==='function')arrow()};
if(baseBlocked)blocked=function(x,y){const r=15;if(x<r||y<r||x>SCENE_W-r||y>SCENE_H-r)return true;if(onBridge(x,y))return false;if(x<3820+r)return baseBlocked(x,y);if(x<island.x1||x>island.x2||y<island.y1||y>island.y2)return true;for(const q of solidRects)if(circleRect(x,y,r,q))return true;return false};
draw=function(){g.clearRect(0,0,c.width,c.height);const q=camera();g.save();g.scale(1,VIEW_Y);g.translate(-q.x,-q.y);world();g.restore();if(typeof updateUI==='function')updateUI()};
window.moonwoodCamera=camera;window.moonwoodScene={camera:'elevated-3/4',singleSceneOwner:true,oceanBackground:true,bridgeWalkable:true,naturalJapaneseLayout:true,islandBounds:island,bridgeBounds:bridge,worldWidth:SCENE_W,worldHeight:SCENE_H};
})();
