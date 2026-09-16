/* Moonwood: final hard boundary for expanded Japanese island. */
(()=>{'use strict';
if(typeof p==='undefined'||typeof world!=='function')return;
const previousBlocked=typeof blocked==='function'?blocked:null;
// Collision is expanded by the player's ~15px radius so the player can actually reach the visible bridge edge.
// The art remains unchanged; this is only the walkable footprint.
const BR={x1:3520,x2:3930,y1:1085,y2:1250};
const CORE={x1:3820,x2:4800,y1:760,y2:1510};
function bridgeOpen(x,y){return x>=BR.x1&&x<=BR.x2&&y>=BR.y1&&y<=BR.y2}
function landOpen(x,y){
  if(x>=CORE.x1&&x<=CORE.x2&&y>=CORE.y1&&y<=CORE.y2)return true;
  if(x>=3550&&x<=5080&&y>=705&&y<=759)return true;
  if(x>=3550&&x<=3675&&y>=790&&y<=1470)return true;
  if(x>=4740&&x<=5160&&y>=800&&y<=1480)return true;
  if(x>=3590&&x<=5040&&y>=1600&&y<=1720)return true;
  return false;
}
const old=previousBlocked;
blocked=function(x,y){
  const r=15;
  if(x<r||y<r||x>5400-r||y>2500-r)return true;
  if(bridgeOpen(x,y))return false;
  if(x>=3500&&x<=5200&&y>=620&&y<=1780){
    if(!landOpen(x,y))return true;
    return old?old(x,y):false;
  }
  return old?old(x,y):true;
};
window.moonwoodBoundary={locked:true,bridge:{...BR},land:{...CORE},expandedBoundary:true};
})();