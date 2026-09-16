/* Moonwood bridge hitbox fix: one authoritative walk corridor. */
(()=>{'use strict';
if(typeof p==='undefined'||typeof blocked!=='function')return;
const previousBlocked=blocked;
const CORRIDOR={x1:3290,x2:3885,y1:1005,y2:1330};
const BRIDGE={x1:3320,x2:3845,y1:1035,y2:1305};
function inside(q,x,y){return x>=q.x1&&x<=q.x2&&y>=q.y1&&y<=q.y2}
blocked=function(x,y){
  if(inside(CORRIDOR,x,y))return false;
  return previousBlocked(x,y);
};
window.moonwoodBridgeFix={active:true,authoritative:true,corridor:{...CORRIDOR},bridge:{...BRIDGE}};
})();
