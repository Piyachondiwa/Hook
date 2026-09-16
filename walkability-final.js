/* Moonwood: single walkability authority. Open travel space first, block only real solids and world edges. */
(()=>{'use strict';
if(typeof blocked!=='function'||typeof p==='undefined')return;
const previous=blocked;
const BR={x1:3285,x2:3720,y1:1035,y2:1165};
const LAND={x1:3670,x2:5110,y1:630,y2:1770};
const APPROACH={x1:2850,x2:3735,y1:1015,y2:1185};
const ROAD={x1:3655,x2:5095,y1:1018,y2:1192};
const FIELDS=[[3730,1235,190,125],[3985,1235,205,125],[4255,1235,210,125],[4525,1235,250,125],[4805,1235,185,125]];
const HOUSES=[[3730,845,170,105],[3925,845,175,105],[4130,845,175,105],[4410,845,175,105],[4635,845,175,105],[3810,962,130,82],[4550,962,130,82],[4225,690,112,110]];
const FENCES=[[3725,1217,190,5],[3980,1217,205,5],[4250,1217,210,5],[4520,1217,250,5],[4800,1217,185,5],[3725,1351,190,5],[3980,1351,205,5],[4250,1351,210,5],[4520,1351,250,5],[4800,1351,185,5]];
const rect=(q,x,y,pad=0)=>x>=q[0]-pad&&x<=q[0]+q[2]+pad&&y>=q[1]-pad&&y<=q[1]+q[3]+pad;
const insideLand=(x,y)=>x>=LAND.x1&&x<=LAND.x2&&y>=LAND.y1&&y<=LAND.y2;
const treePositions=window.moonwoodIslandTreePositions||[];
blocked=function(x,y){
  const r=10;
  /* Travel corridor is authoritative. Legacy blockers are ignored here. */
  if(rect([APPROACH.x1,APPROACH.y1,APPROACH.x2-APPROACH.x1,APPROACH.y2-APPROACH.y1],x,y,r))return false;
  if(rect([ROAD.x1,ROAD.y1,ROAD.x2-ROAD.x1,ROAD.y2-ROAD.y1],x,y,r))return false;
  if(insideLand(x,y)){
    for(const q of HOUSES)if(rect(q,x,y,r))return true;
    for(const q of FIELDS)if(rect(q,x,y,2))return true;
    for(const q of FENCES)if(rect(q,x,y,2))return true;
    for(const t of treePositions){const s=t.s||1;const rr=13*s+10;if(Math.hypot(x-t.x,y-(t.y+42*s))<rr)return true}
    return false;
  }
  /* Bridge deck remains open even where legacy world collision disagrees. */
  if(rect([BR.x1,BR.y1,BR.x2-BR.x1,BR.y2-BR.y1],x,y,r))return false;
  /* Only the actual expanded island perimeter is sealed. */
  if(x>=3250&&x<=5200&&y>=570&&y<=1830)return true;
  return previous(x,y);
};
window.moonwoodWalkability={active:true,authoritative:true,bridge:BR,land:LAND,approach:APPROACH,road:ROAD,roadOpen:true,fieldsBlocked:true,fencesBlocked:true,treeTrunksBlocked:true,noInvisibleWall:true};
})();
