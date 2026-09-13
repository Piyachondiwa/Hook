/* Moonwood: ocean, bridge and Japanese destination island. Single owner for the extended world/camera. */
(()=>{'use strict';
if(typeof g==='undefined'||typeof c==='undefined'||typeof R==='undefined'||typeof p==='undefined'||typeof world!=='function')return;
const baseWorld=world;
const baseBlocked=typeof blocked==='function'?blocked:null;
const VIEW_Y=.86,SCENE_W=5000,SCENE_H=2300;
const island={x1:3820,x2:4800,y1:760,y2:1510};
const bridge={x1:3540,x2:3910,y1:1100,y2:1235};
const B=(x,y,w,h,col)=>R(x,y,w,h,col);
const C={
 sea:'#164f68',sea2:'#1c6278',sea3:'#2a788b',seaHi:'#62a7b0',seaDeep:'#103c51',foam:'#8dc5c8',
 edge:'#77736b',land:'#8f8251',landHi:'#ad9b59',soil:'#6d5e39',soilHi:'#907c43',
 path:'#9a744d',pathHi:'#b48b5a',wood:'#67412d',woodHi:'#96613d',woodLight:'#bd8050',dark:'#302725',
 roof:'#343239',roofHi:'#554b49',wall:'#9b704b',wallHi:'#c99d68',paper:'#eee4c6',
 red:'#a33e35',redHi:'#d15c48',stone:'#77736b',stoneHi:'#b1a897',stoneDark:'#45433e',
 rice:'#b7a34f',riceHi:'#d8c76b',riceLo:'#8f8c3f',pink:'#e6a5ba',pinkHi:'#f4cbd5',
 bamboo:'#486a43',gold:'#e2aa5c'
};
function roof(x,y,w,h,col){B(x-8,y,w+16,h,col);B(x+8,y-7,w-16,7,C.roofHi);B(x+22,y-13,w-44,6,col);for(let q=x;q<x+w;q+=15)B(q,y+h-2,10,3,C.stone)}
function house(x,y,s=1,col=C.roof){const w=132*s,h=78*s;B(x,y,w,h,C.dark);B(x+6*s,y+7*s,w-12*s,h-7*s,C.wallHi);roof(x-2*s,y-15*s,w+4*s,18*s,col);for(let i=0;i<7;i++)B(x+(12+i*17)*s,y+9*s,3*s,h-30*s,C.wood);B(x+14*s,y+19*s,40*s,30*s,C.dark);B(x+19*s,y+24*s,30*s,20*s,C.paper);B(x+34*s,y+24*s,3*s,20*s,C.wood);B(x+65*s,y+19*s,45*s,30*s,C.dark);B(x+70*s,y+24*s,35*s,20*s,C.paper);B(x+86*s,y+24*s,3*s,20*s,C.wood);B(x+52*s,y+52*s,28*s,26*s,C.dark);B(x+56*s,y+56*s,20*s,22*s,C.woodHi);B(x+58*s,y+59*s,7*s,19*s,C.wallHi);B(x-4*s,y-1*s,w+8*s,4*s,C.dark);B(x+2*s,y+h-5*s,w-4*s,5*s,C.wood)}
function torii(x,y,s=1){B(x-58*s,y-55*s,9*s,78*s,C.red);B(x+49*s,y-55*s,9*s,78*s,C.red);B(x-72*s,y-68*s,144*s,10*s,C.red);B(x-60*s,y-78*s,120*s,8*s,C.redHi);B(x-44*s,y-49*s,88*s,7*s,C.redHi);B(x-5*s,y-49*s,10*s,52*s,C.red)}
function lantern(x,y,s=1){B(x,y,4*s,22*s,C.dark);B(x-8*s,y-7*s,16*s,10*s,C.stone);B(x-5*s,y-13*s,10*s,7*s,C.stoneHi);B(x-4*s,y-5*s,8*s,7*s,C.gold);B(x-5*s,y+22*s,10*s,3*s,C.dark)}
function well(x,y){B(x-34,y,68,12,C.stoneDark);B(x-28,y-18,56,18,C.stoneHi);B(x-22,y-14,44,10,C.dark);B(x-30,y-32,7,22,C.wood);B(x+23,y-32,7,22,C.wood);B(x-34,y-38,68,7,C.woodLight);B(x-3,y-34,6,27,C.dark);B(x-19,y-3,38,5,C.stone)}
function rice(x,y,w,h){B(x,y,w,h,C.soil);B(x+5,y+5,w-10,h-10,C.soilHi);for(let xx=x+9;xx<x+w-8;xx+=9)for(let yy=y+9;yy<y+h-7;yy+=10){const n=rnd(xx,yy);B(xx,yy,2,5,n>.35?C.rice:C.riceLo);if(n>.2)B(xx+3,yy-2,2,7,C.riceHi);if(n>.72)B(xx+6,yy+2,2,4,C.riceLo)}B(x,y,w,3,C.stoneHi);B(x,y+h-3,w,3,C.stoneDark)}
function fence(x,y,w){for(let xx=x;xx<=x+w;xx+=28){B(xx,y,5,25,C.dark);B(xx-2,y-3,9,4,C.woodLight)}B(x,y+6,w,4,C.woodHi);B(x,y+18,w,4,C.wood)}
function sakura(x,y,s=1){B(x-5*s,y,10*s,38*s,C.wood);B(x-2*s,y,5*s,31*s,C.woodHi);const cl=[[0,-35,30,18],[-31,-26,28,18],[31,-25,28,18],[0,-55,23,17],[-18,-49,21,14],[20,-47,21,14]];for(const q of cl)B(x+(q[0]-q[2]/2)*s,y+q[1]*s,q[2]*s,q[3]*s,q[0]%2?C.pink:C.pinkHi);for(let i=0;i<12;i++)B(x+((i*23)%70-35)*s,y+(-18-(i%6)*7)*s,4*s,4*s,i%2?C.pink:C.pinkHi)}
function bamboo(x,y){for(let i=0;i<7;i++){const xx=x+i*7;B(xx,y-i*2,5,34+i*2,C.bamboo);B(xx+1,y-i*2,2,28+i*2,C.landHi);B(xx-1,y+8-i*2,7,3,C.bamboo)}}
function drawOcean(){
 B(0,0,SCENE_W,SCENE_H,C.seaDeep);B(0,0,SCENE_W,SCENE_H,C.sea);
 for(let y=0;y<SCENE_H;y+=42){const shift=((y/42|0)%2)*37;for(let x=-40+shift;x<SCENE_W;x+=118){const n=rnd(x+19,y+7);B(x,y+12+(n*8|0),38+(n*22|0),3,n>.52?C.sea2:C.seaDeep);if(n>.68)B(x+9,y+17+(n*8|0),18,2,C.sea3)}}
 for(let i=0;i<620;i++){const x=rnd(i*17,31)*SCENE_W,y=rnd(i*23,71)*SCENE_H,n=rnd(i*41,91);if(n>.82)B(x,y,2+(i%4),2,n>.94?C.foam:C.seaHi);else if(n<.08)B(x+4,y+3,7+(i%5)*2,2,C.seaDeep)}
}
function shoreline(){
 B(island.x1+22,island.y1+28,island.x2-island.x1-44,island.y2-island.y1-58,C.edge);B(island.x1,island.y1+18,island.x2-island.x1,30,C.landHi);B(island.x1+34,island.y1+50,island.x2-island.x1-68,island.y2-island.y1-98,C.land);B(island.x1+16,island.y2-34,island.x2-island.x1-32,28,C.stone);B(island.x1+35,island.y2-9,island.x2-island.x1-70,12,C.stoneDark);
 for(let i=0;i<110;i++){const x=island.x1+12+(i*83)%965,y=island.y1+12+(i*47)%725,n=rnd(i,77);if(n>.5)B(x,y,5+(i%5)*2,3,n>.82?C.stoneHi:C.landHi)}
}
function drawBridge(){
 // Walkable connector from the old land edge into the destination island.
 B(bridge.x1,bridge.y1+10,bridge.x2-bridge.x1,108,C.seaDeep);B(bridge.x1,bridge.y1+3,bridge.x2-bridge.x1,101,C.dark);
 B(bridge.x1,bridge.y1,bridge.x2-bridge.x1,9,C.woodLight);B(bridge.x1,bridge.y2-9,bridge.x2-bridge.x1,9,C.wood);
 for(let xx=bridge.x1+8;xx<bridge.x2-8;xx+=27){const n=rnd(xx,bridge.y1);B(xx,bridge.y1+9,20,82,C.woodLight);B(xx+3,bridge.y1+14,14,70,C.wood);B(xx+5,bridge.y1+22+(n*28|0),9,4,C.woodLight);B(xx+13,bridge.y1+50+(n*18|0),4,3,C.dark)}
 for(let xx=bridge.x1+4;xx<=bridge.x2-4;xx+=78){B(xx,bridge.y1-28,8,128,C.dark);B(xx-7,bridge.y1-31,22,7,C.woodLight);B(xx+8,bridge.y1-14,58,5,C.woodHi);B(xx+8,bridge.y1+82,58,5,C.wood)}
 for(let xx=bridge.x1+18;xx<bridge.x2-12;xx+=36){B(xx,bridge.y1-6,18,3,C.woodLight);B(xx+8,bridge.y1+99,18,3,C.wood)}
 for(let i=0;i<30;i++){const x=bridge.x1+(i%15)*25,y=bridge.y1+108+(i%3)*4;B(x,y,10+(i%4)*3,2,C.foam)}
 lantern(3650,1088,.85);lantern(3845,1088,.85);
}
function drawIsland(){
 shoreline();B(3860,1100,880,60,C.path);B(4200,850,64,560,C.pathHi);B(3860,1015,330,44,C.pathHi);B(4440,1190,280,44,C.pathHi);B(4580,900,190,40,C.pathHi);
 house(3890,900,1.05);house(4120,1040,.95,C.roofHi);house(4380,875,1);house(4540,1080,.9,C.roofHi);house(4650,930,.82);
 torii(4230,1000,1.05);well(4240,1190);well(4050,1280);
 rice(3870,1195,250,130);rice(4140,1240,220,120);rice(4430,1260,290,135);rice(4520,1005,210,88);rice(4300,800,190,78);
 fence(3865,1180,255);fence(4135,1230,225);fence(4425,1250,295);fence(4510,995,215);
 sakura(4000,1035,1.25);sakura(4410,1050,1.35);sakura(4730,1130,1.3);sakura(4255,1360,1.1);
 lantern(4000,1070);lantern(4225,1070);lantern(4400,1140);lantern(4600,1160);lantern(4740,1210);bamboo(4010,1195);bamboo(4700,1260);
 for(let i=0;i<420;i++){const x=3850+(i*79)%920,y=785+(i*53)%675,n=rnd(i*7,99);if(n<.25)B(x,y,3,3,C.stoneHi);else if(n<.48)B(x,y,4,2,C.landHi);else if(n<.67)B(x,y,3,5,C.riceLo);else if(n<.84)B(x,y,4,3,C.pink);else B(x,y,2,2,C.gold)}
}
function camera(){const vh=c.height/VIEW_Y;return{x:Math.max(0,Math.min(SCENE_W-c.width,p.x-c.width/2)),y:Math.max(0,Math.min(SCENE_H-vh,p.y-vh/2)),scaleY:VIEW_Y}}
world=function(){drawOcean();baseWorld();drawBridge();drawIsland();if(p.x>3600&&typeof hero==='function')hero();if(p.x>3600&&typeof arrow==='function')arrow()};
if(baseBlocked)blocked=function(x,y){const r=15;if(x<r||y<r||x>SCENE_W-r||y>SCENE_H-r)return true;if(x>=bridge.x1&&x<=bridge.x2&&y>=bridge.y1-35&&y<=bridge.y2+30)return false;if(x<=3600+r)return baseBlocked(x,y);if(x>=island.x1&&x<=island.x2&&y>=island.y1&&y<=island.y2){const solids=[[3890,900,145,85],[4120,1040,126,80],[4380,875,140,85],[4540,1080,124,75],[4650,930,112,72],[4200,1000,65,50],[4010,1205,95,58]];for(const q of solids)if(x>=q[0]-12&&x<=q[0]+q[2]+12&&y>=q[1]-12&&y<=q[1]+q[3]+12)return true;return false}return true};
draw=function(){g.clearRect(0,0,c.width,c.height);const q=camera();g.save();g.scale(1,VIEW_Y);g.translate(-q.x,-q.y);world();g.restore();if(typeof updateUI==='function')updateUI()};
window.moonwoodCamera=camera;window.moonwoodScene={camera:'elevated-3/4',singleSceneOwner:true,oceanBackground:true,bridgeWalkable:true,separateDestination:true,islandBounds:island,bridgeBounds:bridge,worldWidth:SCENE_W,worldHeight:SCENE_H};
})();
