/* Moonwood authoritative walkability: bridge, fields, fences, and clean travel lanes. */
(()=>{'use strict';
if(typeof p==='undefined'||typeof blocked!=='function')return;
const previousBlocked=blocked;
/* Keep the playable lane aligned to the bridge deck, not the rice plots below it. */
const CORRIDOR={x1:3290,x2:3885,y1:1050,y2:1215};
const BRIDGE={x1:3320,x2:3845,y1:1050,y2:1215};
const FIELDS=[
  [3730,1225,190,126],[3990,1225,205,126],[4260,1225,210,126],[4530,1225,245,126],[4810,1225,170,126]
];
const FENCES=[
  [3725,1217,200,6],[3725,1351,200,6],[3725,1217,6,140],[3919,1217,6,105],
  [3985,1217,215,6],[3985,1351,215,6],[3985,1217,6,140],[4194,1217,6,105],
  [4255,1217,220,6],[4255,1351,220,6],[4255,1217,6,140],[4469,1217,6,105],
  [4525,1217,255,6],[4525,1351,255,6],[4525,1217,6,140],[4774,1217,6,105],
  [4805,1217,180,6],[4805,1351,180,6],[4805,1217,6,140],[4979,1217,6,105]
];
const inside=(q,x,y)=>x>=q[0]&&x<=q[0]+q[2]&&y>=q[1]&&y<=q[1]+q[3];
const inRect=(q,x,y,r=0)=>x>=q[0]-r&&x<=q[0]+q[2]+r&&y>=q[1]-r&&y<=q[1]+q[3]+r;
blocked=function(x,y){
  /* Rice and fencing remain solid. Their upper edge is separated from the bridge deck. */
  for(const q of FIELDS)if(inside(q,x,y))return true;
  for(const q of FENCES)if(inside(q,x,y))return true;
  /* Wider than the visible deck horizontally, but deliberately tight vertically. */
  if(inRect([BRIDGE.x1,BRIDGE.y1,BRIDGE.x2-BRIDGE.x1,BRIDGE.y2-BRIDGE.y1],x,y,12))return false;
  if(inside(CORRIDOR,x,y))return false;
  return previousBlocked(x,y);
};
window.moonwoodBridgeFix={active:true,authoritative:true,corridor:{...CORRIDOR},bridge:{...BRIDGE},fields:FIELDS.map(q=>({x:q[0],y:q[1],w:q[2],h:q[3]})),fences:FENCES.length,cleanTravelLanes:true,fieldCollisionAuthoritative:true,deckAligned:true};
})();
