/* Moonwood bridge hitbox fix: one authoritative walk corridor with sealed water-side edges. */
(()=>{'use strict';
if(typeof p==='undefined'||typeof blocked!=='function')return;
const previousBlocked=blocked;
const CORRIDOR={x1:3290,x2:3885,y1:1035,y2:1305};
const BRIDGE={x1:3320,x2:3845,y1:1035,y2:1305};
const inside=(q,x,y)=>x>=q.x1&&x<=q.x2&&y>=q.y1&&y<=q.y2;
blocked=function(x,y){
  if(inside(CORRIDOR,x,y))return false;
  if(x>=3365&&x<=3865&&(y<CORRIDOR.y1||y>CORRIDOR.y2))return true;
  return previousBlocked(x,y);
};
window.moonwoodBridgeFix={active:true,authoritative:true,corridor:{...CORRIDOR},bridge:{...BRIDGE},northBarrier:CORRIDOR.y1,southBarrier:CORRIDOR.y2,sealedSides:true};
})();
