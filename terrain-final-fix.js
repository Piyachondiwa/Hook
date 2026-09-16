/* Moonwood: grass texture pass. Adds readable pixel tufts without touching roads, fields, water, or structures. */
(()=>{'use strict';
if(typeof R==='undefined'||typeof world!=='function')return;
const previous=world;
const n=(x,y)=>{const v=Math.sin(x*12.9898+y*78.233+4217)*43758.5453;return v-Math.floor(v)};
const safe=(x,y)=>{
  if(y>=1035&&y<=1105)return false;
  if(y>=1190&&y<=1430)return false;
  if(y>=1540&&y<=1600)return false;
  const houses=[[3730,780,170,120],[3925,780,175,120],[4130,780,175,120],[4410,780,175,120],[4635,780,175,120],[3810,940,130,105],[4550,940,130,105],[4225,670,112,125]];
  for(const q of houses)if(x>=q[0]-12&&x<=q[0]+q[2]+12&&y>=q[1]-12&&y<=q[1]+q[3]+12)return false;
  return x>=3760&&x<=5010&&y>=720&&y<=1690;
};
world=function(){previous();for(let i=0;i<1450;i++){const x=3760+(i*53)%1245,y=720+(i*97)%960;if(!safe(x,y))continue;const v=n(i,77);if(v<.34)continue;const c=v>.78?'#9daf67':v>.55?'#789353':'#5d7c47';R(x,y,2+(i%3),2,c);if(v>.72)R(x+2,y-3,2,4,'#a8b674');if(v>.9)R(x-2,y+3,3,2,'#c1c27b')}};
window.moonwoodTerrainFix={active:true,grassTexture:true,cleanLanes:true,avoidsStructures:true};
})();
