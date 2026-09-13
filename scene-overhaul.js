/* Moonwood map expansion: stable 3/4 camera + a genuinely separate island. */
(()=>{
'use strict';
if(typeof g==='undefined'||typeof c==='undefined'||typeof R==='undefined'||typeof world!=='function'||typeof p==='undefined')return;

const oldWorld=world;
const oldBlocked=typeof blocked==='function'?blocked:null;
const VIEW_Y=.86;
const SCENE_W=4600;
const SCENE_H=2200;
const bridge={x1:3540,x2:3905,y1:1118,y2:1218};
const island={x1:3850,x2:4470,y1:880,y2:1370};
const C={
 water:'#245e73',water2:'#2d7184',water3:'#4a93a0',bank:'#8c8050',bank2:'#b09b5d',
 wood:'#6b432d',wood2:'#96613d',dark:'#3a2924',roof:'#34323a',roof2:'#514a4b',
 wall:'#9a704c',wall2:'#c79b67',paper:'#e8dfc2',red:'#a33f35',red2:'#cf5b46',
 stone:'#77736b',stone2:'#9b9587',rice:'#b7a34f',rice2:'#d0bd65',sakura:'#e7a7b9',
 sakura2:'#f2c3d0',bamboo:'#496b42',path:'#9a744d',path2:'#b08a5a',lantern:'#e0a85a'
};
const B=(x,y,w,h,col)=>R(x,y,w,h,col);
const rect=(x,y,w,h)=>({x,y,w,h});

function house(x,y,s=1,roof=C.roof){
 B(x,y,112*s,72*s,C.wall); B(x+7*s,y+10*s,98*s,62*s,C.wall2);
 B(x-8*s,y-8*s,128*s,12*s,roof); B(x+5*s,y-17*s,102*s,10*s,C.roof2); B(x+17*s,y-24*s,78*s,9*s,roof);
 for(let i=0;i<7;i++)B(x+(i*16-4)*s,y-7*s,2*s,10*s,C.dark);
 B(x+13*s,y+19*s,32*s,27*s,C.dark); B(x+17*s,y+23*s,24*s,19*s,C.paper);
 B(x+53*s,y+19*s,42*s,27*s,C.dark); B(x+57*s,y+23*s,34*s,19*s,C.paper);
 B(x+5*s,y+49*s,101*s,5*s,C.dark); B(x+47*s,y+50*s,14*s,22*s,C.dark); B(x+50*s,y+54*s,8*s,18*s,C.wood2);
 B(x-2*s,y-5*s,116*s,4*s,C.wood);
}
function torii(x,y,s=1){
 B(x-55*s,y-56*s,8*s,72*s,C.red); B(x+47*s,y-56*s,8*s,72*s,C.red);
 B(x-68*s,y-67*s,136*s,9*s,C.red); B(x-57*s,y-77*s,114*s,8*s,C.red2);
 B(x-42*s,y-49*s,84*s,7*s,C.red2); B(x-5*s,y-49*s,10*s,48*s,C.red);
}
function lantern(x,y,s=1){
 B(x,y,4*s,22*s,C.dark); B(x-8*s,y-7*s,16*s,10*s,C.stone);
 B(x-5*s,y-13*s,10*s,7*s,C.stone2); B(x-4*s,y-5*s,8*s,7*s,C.lantern); B(x-5*s,y+22*s,10*s,3*s,C.dark);
}
function ricePatch(x,y,w,h){
 B(x,y,w,h,'#6f633d'); B(x+5,y+5,w-10,h-10,'#8d7b42');
 for(let xx=x+10;xx<x+w-8;xx+=12)for(let yy=y+10;yy<y+h-6;yy+=12){B(xx,yy,2,6,C.rice);B(xx+3,yy-2,2,7,C.rice2);B(xx+6,yy+1,2,5,C.rice)}
}
function fence(x,y,w){for(let xx=x;xx<=x+w;xx+=30){B(xx,y,5,24,C.dark);B(xx-2,y-3,9,4,C.wood2)}B(x,y+5,w,4,C.wood2);B(x,y+17,w,4,C.wood)}
function sakuraTree(x,y,s=1){
 B(x-4*s,y,8*s,32*s,C.wood);B(x-2*s,y,4*s,27*s,C.wood2);
 const cl=[[0,-34,25,17],[-27,-25,23,16],[27,-24,23,16],[0,-52,19,14]];
 cl.forEach((q,i)=>{B(x+(q[0]-q[2]/2)*s,y+q[1]*s,q[2]*s,q[3]*s,i%2?C.sakura:C.sakura2)});
 B(x-34*s,y-15*s,8*s,5*s,C.sakura);B(x+26*s,y-11*s,8*s,5*s,C.sakura2);
}
function newIslandScene(){
 // The extension begins at x=3600, exactly where the original map ends.
 B(3600,760,1000,720,C.water);
 for(let i=0;i<120;i++){const xx=3600+(i*73)%1000,yy=780+(i*47)%680;B(xx,yy,5+(i%4)*2,2,i%3?C.water2:C.water3)}
 // This island is entirely outside the original map, so the old terrain is not painted over.
 B(island.x1+18,island.y1+24,island.x2-island.x1-36,island.y2-island.y1-24,C.bank);
 B(island.x1,island.y1+18,island.x2-island.x1,28,C.bank2);
 B(island.x1+8,island.y2-30,island.x2-island.x1-16,30,C.stone);
 B(island.x1+22,island.y2-4,island.x2-island.x1-44,18,C.dark);
 B(3880,1110,560,54,C.path);B(4100,920,58,430,C.path2);B(3890,1018,235,44,C.path2);B(4270,1190,160,40,C.path2);
 house(3890,930,1.05);house(4090,1060,.88,C.roof2);house(4270,940,.92,C.roof);house(4340,1125,.72,C.roof2);
 torii(4170,1005,1);B(4122,1028,96,34,C.stone);B(4132,1021,76,8,C.stone2);
 ricePatch(3895,1190,180,105);ricePatch(4280,1000,150,82);fence(3880,1178,200);fence(4270,990,165);
 sakuraTree(4000,1035,1.2);sakuraTree(4380,1080,1.25);sakuraTree(4160,1270,1);
 lantern(3990,1070);lantern(4215,1070);lantern(4320,1160);lantern(4410,1200);
 B(4010,1200,92,58,C.bamboo);B(4020,1210,72,43,C.wall2);B(4045,1193,17,10,C.stone);B(4040,1188,27,6,C.stone2);
 for(let i=0;i<22;i++){const xx=3880+(i*91)%560,yy=900+(i*61)%450;B(xx,yy,3+(i%2),3,i%3?C.sakura:C.sakura2)}
 // A single connector crosses the boundary. The bridge is the only intentional overlap with the edge.
 B(bridge.x1,bridge.y1+4,bridge.x2-bridge.x1,96,C.dark);B(bridge.x1,bridge.y1,bridge.x2-bridge.x1,10,C.wood2);B(bridge.x1,bridge.y2-10,bridge.x2-bridge.x1,10,C.wood);
 for(let xx=bridge.x1+10;xx<bridge.x2-8;xx+=28){B(xx,bridge.y1+10,20,78,C.wood2);B(xx+4,bridge.y1+17,12,60,C.wood);B(xx+7,bridge.y1+20,7,4,'#c58b53')}
 for(const xx of [3580,3710,3840,3970]){B(xx,bridge.y1-25,8,121,C.dark);B(xx-8,bridge.y1-28,24,7,C.wood2)}
 lantern(3660,1090);lantern(3830,1090);
}
function camera(){
 const viewH=c.height/VIEW_Y;
 return {x:Math.max(0,Math.min(SCENE_W-c.width,p.x-c.width/2)),y:Math.max(0,Math.min(SCENE_H-viewH,p.y-viewH/2)),scaleY:VIEW_Y};
}
world=function(){oldWorld();newIslandScene();if(p.x>3600&&typeof hero==='function')hero();if(p.x>3600&&typeof arrow==='function')arrow();};
const newSolids=[rect(3890,964,118,72),rect(4090,1092,98,64),rect(4270,972,105,68),rect(4340,1150,82,52),rect(4140,1000,60,45),rect(4010,1200,92,58)];
function inRect(x,y,q,r=15){return x>=q.x-r&&x<=q.x+q.w+r&&y>=q.y-r&&y<=q.y+q.h+r}
function insideIsland(x,y){return x>=island.x1&&x<=island.x2&&y>=island.y1&&y<=island.y2}
function insideBridge(x,y){return x>=bridge.x1&&x<=bridge.x2&&y>=bridge.y1-12&&y<=bridge.y2+12}
if(oldBlocked)blocked=function(x,y){const r=15;if(x<r||y<r||x>SCENE_W-r||y>SCENE_H-r)return true;if(insideBridge(x,y))return false;if(x<=3600+r)return oldBlocked(x,y);if(!insideIsland(x,y))return true;for(const q of newSolids)if(inRect(x,y,q,r))return true;return false;};
// Correct camera projection: scale the world first, then translate by the active world camera.
draw=function(){g.clearRect(0,0,c.width,c.height);const q=camera();g.save();g.scale(1,VIEW_Y);g.translate(-q.x,-q.y);world();g.restore();updateUI();};
window.moonwoodCamera=camera;
window.moonwoodScene={camera:'stable-elevated-3/4',cameraScaleY:VIEW_Y,separateIsland:true,islandBounds:island,bridgeBounds:bridge,oldMapUntouched:true,virtualWorldWidth:SCENE_W};
})();
