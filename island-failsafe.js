/* Moonwood island failsafe: keep the expanded terrain visible and safely walkable. */
(()=>{'use strict';
if(typeof g==='undefined'||typeof R!=='function'||typeof p==='undefined')return;
const B=(x,y,w,h,c)=>R(x,y,w,h,c);
const C={grass:'#71834a',grass2:'#809553',soil:'#6b5939',soilHi:'#927844',stone:'#77746d',stoneHi:'#b8b2a4',water:'#1e6478',waterHi:'#63adb8'};
const X={x1:3500,x2:5150,y1:620,y2:1780};
const prevWorld=typeof world==='function'?world:null;
const prevBlocked=typeof blocked==='function'?blocked:null;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function safeTerrain(){
  B(3620,620,1390,32,C.stone);B(3580,652,1470,34,C.soilHi);B(3550,686,1530,42,C.grass);
  B(3500,780,150,700,C.stone);B(3530,800,120,660,C.grass2);
  B(4800,780,350,700,C.stone);B(4760,810,390,650,C.grass);
  B(3570,1510,1490,34,C.stone);B(3560,1544,1510,38,C.soilHi);B(3590,1582,1450,112,C.grass);
  for(let i=0;i<120;i++){
    const x=3520+(i*97)%1580,y=650+(i*53)%1080;
    B(x,y,3+(i%4),2,i%3?C.grass2:C.stoneHi);
  }
}
if(prevWorld)world=function(){prevWorld();safeTerrain()};
if(prevBlocked)blocked=function(x,y){
  if(x<0||y<0||x>5400||y>2500)return true;
  if(x>=3500&&x<=5150&&y>=620&&y<=1780){
    if((x>=3690&&x<=3715&&y>=1130&&y<=1265))return false;
    if(x<3650||x>4800||y<760||y>1510)return false;
  }
  return prevBlocked(x,y);
};
window.moonwoodFailsafe={active:true,bounds:X};
})();