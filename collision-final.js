/* Moonwood: one final collision authority. Older collision wrappers are intentionally bypassed. */
(()=>{'use strict';
if(typeof p==='undefined')return;
const BR={x1:3285,x2:3720,y1:1035,y2:1165};
const APPROACH={x1:2850,x2:3735,y1:1040,y2:1160};
const LAND={x1:3670,x2:5110,y1:630,y2:1770};
const ROAD={x1:3655,x2:5095,y1:1008,y2:1202};
const HOUSES=[[3730,845,170,105],[3925,845,175,105],[4130,845,175,105],[4410,845,175,105],[4635,845,175,105],[3810,962,130,82],[4550,962,130,82],[4225,690,112,110]];
const FIELDS=[[3730,1235,190,125],[3985,1235,205,125],[4255,1235,210,125],[4525,1235,250,125],[4805,1235,185,125]];
const FENCES=[[3725,1217,190,5],[3980,1217,205,5],[4250,1217,210,5],[4520,1217,250,5],[4800,1217,185,5],[3725,1351,190,5],[3980,1351,205,5],[4250,1351,210,5],[4520,1351,250,5],[4800,1351,185,5]];
const OLD_SOLIDS=[[1320,1250,960,120],[2570,1290,180,105],[2780,1200,160,105]];
const inside=(q,x,y,p=0)=>x>=q[0]-p&&x<=q[0]+q[2]+p&&y>=q[1]-p&&y<=q[1]+q[3]+p;
const oldTrees=()=>window.moonwoodTrees||[];
window.blocked=function(x,y){
  const r=10;
  if(x<r||y<r||x>5400-r||y>2500-r)return true;
  if(inside(APPROACH,x,y,r)||inside(BR,x,y,r))return false;
  if(inside(LAND,x,y,0)){
    for(const q of HOUSES)if(inside(q,x,y,r))return true;
    for(const q of FIELDS)if(inside(q,x,y,2))return true;
    for(const q of FENCES)if(inside(q,x,y,2))return true;
    const islandTrees=window.moonwoodIslandTreePositions||[];
    for(const t of islandTrees){const s=t.s||1;if(Math.hypot(x-t.x,y-(t.y+42*s))<13*s+10)return true}
    return false;
  }
  if(x>=3250&&x<=5200&&y>=570&&y<=1830)return true;
  for(const q of OLD_SOLIDS)if(inside(q,x,y,r))return true;
  for(const t of oldTrees()){const s=t.s||1;if(Math.hypot(x-t.x,y-(t.y+42*s))<15+12*s)return true}
  return false;
};
window.moonwoodCollisionFinal={active:true,authoritative:true,singleLayer:true,noInvisibleWall:true,bridge:BR,approach:APPROACH,land:LAND,road:ROAD,fieldsBlocked:true,fencesBlocked:true,treesBlocked:true};
window.moonwoodBridgeFix={active:true,authoritative:true,corridor:APPROACH,bridge:BR,cleanTravelLanes:true,fieldCollisionAuthoritative:true,deckAligned:true};
window.moonwoodBoundary={locked:true,active:true,expandedBoundary:true};
})();
