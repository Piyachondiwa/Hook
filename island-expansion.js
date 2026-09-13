/* Moonwood destination island + stable camera.  Single scene owner. */
(()=>{'use strict';
if(typeof g==='undefined'||typeof c==='undefined'||typeof R==='undefined'||typeof p==='undefined'||typeof world!=='function')return;
const baseWorld=world;
const baseBlocked=typeof blocked==='function'?blocked:null;
const VIEW_Y=.86,SCENE_W=5000,SCENE_H=2300;
const island={x1:3820,x2:4800,y1:760,y2:1510};
const bridge={x1:3540,x2:3900,y1:1100,y2:1235};
const B=(x,y,w,h,col)=>R(x,y,w,h,col);
const C={water:'#245e73',water2:'#2d7184',waterHi:'#65a1a8',edge:'#77736b',land:'#8f8251',landHi:'#ad9b5d',soil:'#6d5e39',soilHi:'#907c43',path:'#9a744d',pathHi:'#b48b5a',wood:'#6b432d',woodHi:'#96613d',dark:'#352923',roof:'#343239',roofHi:'#554b49',wall:'#9b704b',wallHi:'#c99d68',paper:'#eee4c6',red:'#a33e35',redHi:'#d15c48',stone:'#8d887c',stoneHi:'#b1a897',rice:'#b7a34f',riceHi:'#d8c76b',riceLo:'#8f8c3f',pink:'#e6a5ba',pinkHi:'#f4cbd5',bamboo:'#486a43',gold:'#e2aa5c'};
function roof(x,y,w,h,col){B(x-8,y,w+16,h,col);B(x+8,y-7,w-16,7,C.roofHi);B(x+22,y-13,w-44,6,col);for(let q=x;q<x+w;q+=16)B(q,y+h-2,10,3,'#74666a')}
function house(x,y,s=1,col=C.roof){const w=132*s,h=78*s;B(x,y,w,h,C.dark);B(x+6*s,y+7*s,w-12*s,h-7*s,C.wallHi);roof(x-2*s,y-15*s,w+4*s,18*s,col);for(let i=0;i<7;i++)B(x+(12+i*17)*s,y+9*s,3*s,h-30*s,C.wood);B(x+14*s,y+19*s,40*s,30*s,C.dark);B(x+19*s,y+24*s,30*s,20*s,C.paper);B(x+34*s,y+24*s,3*s,20*s,C.wood);B(x+65*s,y+19*s,45*s,30*s,C.dark);B(x+70*s,y+24*s,35*s,20*s,C.paper);B(x+86*s,y+24*s,3*s,20*s,C.wood);B(x+52*s,y+52*s,28*s,26*s,C.dark);B(x+56*s,y+56*s,20*s,22*s,C.woodHi);B(x+58*s,y+59*s,7*s,19*s,C.wallHi);B(x-4*s,y-1*s,w+8*s,4*s,C.dark);B(x+2*s,y+h-5*s,w-4*s,5*s,C.wood)}
function torii(x,y,s=1){B(x-58*s,y-55*s,9*s,78*s,C.red);B(x+49*s,y-55*s,9*s,78*s,C.red);B(x-72*s,y-68*s,144*s,10*s,C.red);B(x-60*s,y-78*s,120*s,8*s,C.redHi);B(x-44*s,y-49*s,88*s,7*s,C.redHi);B(x-5*s,y-49*s,10*s,52*s,C.red)}
function lantern(x,y,s=1){B(x,y,4*s,22*s,C.dark);B(x-8*s,y-7*s,16*s,10*s,C.stone);B(x-5*s,y-13*s,10*s,7*s,C.stoneHi);B(x-4*s,y-5*s,8*s,7*s,C.gold);B(x-5*s,y+22*s,10*s,3*s,C.dark)}
function well(x,y){B(x-34,y,68,12,C.stone);B(x-28,y-18,56,18,C.stoneHi);B(x-22,y-14,44,10,C.dark);B(x-30,y-32,7,22,C.wood);B(x+23,y-32,7,22,C.wood);B(x-34,y-38,68,7,C.woodHi);B(x-3,y-34,6,27,C.dark)}
function rice(x,y,w,h){B(x,y,w,h,C.soil);B(x+5,y+5,w-10,h-10,C.soilHi);for(let xx=x+9;xx<x+w-8;xx+=10)for(let yy=y+9;yy<y+h-7;yy+=10){B(xx,yy,2,6,C.rice);B(xx+3,yy-2,2,7,C.riceHi);if((xx+yy)%3===0)B(xx+6,yy+1,2,5,C.riceLo)}}
function fence(x,y,w){for(let xx=x;xx<=x+w;xx+=28){B(xx,y,5,25,C.dark);B(xx-2,y-3,9,4,C.woodHi)}B(x,y+6,w,4,C.woodHi);B(x,y+18,w,4,C.wood)}
function sakura(x,y,s=1){B(x-5*s,y,10*s,38*s,C.wood);B(x-2*s,y,5*s,31*s,C.woodHi);const cl=[[0,-35,30,18],[-31,-26,28,18],[31,-25,28,18],[0,-55,23,17],[-18,-49,21,14],[20,-47,21,14]];for(const q of cl)B(x+(q[0]-q[2]/2)*s,y+q[1]*s,q[2]*s,q[3]*s,q[0]%2?C.pink:C.pinkHi);for(let i=0;i<10;i++)B(x+((i*19)%64-32)*s,y+(-18-(i%5)*7)*s,4*s,4*s,C.pink)}
function texture(){for(let i=0;i<360;i++){const x=3825+(i*79)%950,y=780+(i*53)%720,q=i%6;if(q<2)B(x,y,2,6,C.riceLo);else if(q===2)B(x,y,5,3,C.stoneHi);else if(q===3)B(x,y,4,4,C.pink);else B(x,y,3,3,C.landHi)}for(let i=0;i<42;i++){const x=3820+(i*97)%960,y=1475+(i%3)*5;B(x,y,10+(i%4)*3,4,C.stoneHi)}}
function drawIsland(){
 B(3600,720,1400,820,C.water);for(let i=0;i<180;i++){const x=3600+(i*67)%1400,y=735+(i*43)%790;B(x,y,4+(i%4)*2,2,i%4?C.water2:C.waterHi)}
 B(island.x1+22,island.y1+28,island.x2-island.x1-44,island.y2-island.y1-58,C.edge);B(island.x1,island.y1+18,island.x2-island.x1,30,C.landHi);B(island.x1+34,island.y1+50,island.x2-island.x1-68,island.y2-island.y1-98,C.land);B(island.x1+16,island.y2-34,island.x2-island.x1-32,28,C.edge);
 B(3860,1100,880,60,C.path);B(4200,850,64,560,C.pathHi);B(3860,1015,330,44,C.pathHi);B(4440,1190,280,44,C.pathHi);B(4580,900,190,40,C.pathHi);
 house(3890,900,1.05);house(4120,1040,.95,C.roofHi);house(4380,875,1);house(4540,1080,.9,C.roofHi);house(4650,930,.82);
 torii(4230,1000,1.05);well(4240,1190);well(4050,1280);
 rice(3870,1195,250,130);rice(4140,1240,220,120);rice(4430,1260,290,135);rice(4520,1005,210,88);rice(4300,800,190,78);
 fence(3865,1180,255);fence(4135,1230,225);fence(4425,1250,295);fence(4510,995,215);
 sakura(4000,1035,1.25);sakura(4410,1050,1.35);sakura(4730,1130,1.3);sakura(4255,1360,1.1);
 lantern(4000,1070);lantern(4225,1070);lantern(4400,1140);lantern(4600,1160);lantern(4740,1210);
 B(4008,1205,95,58,C.bamboo);B(4018,1215,75,43,C.wallHi);B(4045,1196,17,10,C.stone);B(4041,1190,28,6,C.stoneHi);
 texture();
 B(3720,1115,170,46,C.pathHi);
 B(bridge.x1,bridge.y1+2,bridge.x2-bridge.x1,100,C.dark);B(bridge.x1,bridge.y1,bridge.x2-bridge.x1,9,C.woodHi);B(bridge.x1,bridge.y2-9,bridge.x2-bridge.x1,9,C.wood);for(let x=bridge.x1+10;x<bridge.x2-8;x+=28){B(x,bridge.y1+10,20,78,C.woodHi);B(x+4,bridge.y1+17,12,62,C.wood);B(x+7,bridge.y1+20,7,4,'#c58b53')}
 lantern(3660,1088);lantern(3850,1088);
}
function camera(){const vh=c.height/VIEW_Y;return{x:Math.max(0,Math.min(SCENE_W-c.width,p.x-c.width/2)),y:Math.max(0,Math.min(SCENE_H-vh,p.y-vh/2)),scaleY:VIEW_Y}}
world=function(){baseWorld();drawIsland()};
if(baseBlocked)blocked=function(x,y){const r=15;if(x<r||y<r||x>SCENE_W-r||y>SCENE_H-r)return true;if(x<=3600+r)return baseBlocked(x,y);if(x>=bridge.x1&&x<=bridge.x2&&y>=bridge.y1-12&&y<=bridge.y2+12)return false;if(x>=3820&&x<=4800&&y>=760&&y<=1510){const solids=[[3890,900,145,85],[4120,1040,126,80],[4380,875,140,85],[4540,1080,124,75],[4650,930,112,72],[4200,1000,65,50],[4008,1205,95,58]];for(const q of solids)if(x>=q[0]-12&&x<=q[0]+q[2]+12&&y>=q[1]-12&&y<=q[1]+q[3]+12)return true;return false}return true};
draw=function(){g.clearRect(0,0,c.width,c.height);const q=camera();g.save();g.scale(1,VIEW_Y);g.translate(-q.x,-q.y);world();g.restore();if(typeof updateUI==='function')updateUI()};
window.moonwoodCamera=camera;window.moonwoodScene={camera:'elevated-3/4',singleSceneOwner:true,separateDestination:true,islandBounds:island,bridgeBounds:bridge,worldWidth:SCENE_W,worldHeight:SCENE_H};
})();