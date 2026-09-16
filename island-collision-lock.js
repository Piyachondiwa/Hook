/* Moonwood: collision lock aligned to the expanded Japanese island. */
(()=>{'use strict';
if(typeof p==='undefined'||typeof world!=='function')return;
const previousBlocked=typeof blocked==='function'?blocked:null;
const BR={x1:3340,x2:3835,y1:1050,y2:1285};
const LAND={x1:3625,x2:5075,y1:635,y2:1750};
function bridgeOpen(x,y){return x>=BR.x1&&x<=BR.x2&&y>=BR.y1&&y<=BR.y2}
function islandOpen(x,y){
  if(x>=LAND.x1&&x<=LAND.x2&&y>=LAND.y1&&y<=LAND.y2)return true;
  return false;
}
const old=previousBlocked;
blocked=function(x,y){
  const r=15;
  if(x<r||y<r||x>5400-r||y>2500-r)return true;
  if(bridgeOpen(x,y))return false;
  if(x>=3300&&x<=5150&&y>=600&&y<=1785){
    if(!islandOpen(x,y))return true;
    return old?old(x,y):false;
  }
  return old?old(x,y):true;
};
window.moonwoodBoundary={locked:true,bridge:{...BR},land:{...LAND},expandedBoundary:true,bridgeApproach:true};
})();