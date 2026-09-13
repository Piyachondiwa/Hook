/* Moonwood natural layout pass: believable ecology + readable gameplay spaces. */
(()=>{'use strict';
if(typeof trees==='undefined'||typeof rocks==='undefined'||typeof flowers==='undefined'||typeof grass==='undefined'||typeof rnd!=='function')return;
const W=3600,H=2200;
const hash=(x,y)=>rnd(x*1.731+y*7.193,x*3.17-y*1.91);
const d2=(x,y,q)=>Math.hypot(x-q[0],y-q[1]);
function forbidden(x,y,pad=0){
  if(x<70+pad||x>W-70-pad||y<70+pad||y>H-70-pad)return true;
  // River/wet edge. Keep the river open and let only wetland trees approach it.
  if(y>1410-pad&&y<1710+pad)return true;
  // Main roads and plaza.
  if(y>1005-pad&&y<1115+pad)return true;
  if(x>1710-pad&&x<1835+pad)return true;
  if(x>580-pad&&x<1690+pad&&y>445-pad&&y<545+pad)return true;
  if(x>2750-pad&&x<3520+pad&&y>445-pad&&y<545+pad)return true;
  if(x>1360-pad&&x<2240+pad&&y>815-pad&&y<1110+pad)return true;
  // Existing buildings / shrine footprints.
  const structures=[[820,694,210,126],[2450,634,210,126],[340,455,150,108]];
  for(const q of structures)if(x>=q[0]-pad&&x<=q[0]+q[2]+pad&&y>=q[1]-pad&&y<=q[1]+q[3]+pad)return true;
  // Cliffs and the dark rock outcrops.
  const cliffs=[[2450,170,720,360],[2820,1780,560,260],[520,1750,600,250],[700,1780,380,160]];
  for(const q of cliffs)if(x>=q[0]-pad&&x<=q[0]+q[2]+pad&&y>=q[1]-pad&&y<=q[1]+q[3]+pad)return true;
  return false;
}
function wet(x,y){return y>1240&&y<1405||y>1695&&y<1775||x<260&&y>600&&y<1320}
function biomeScore(x,y){
  let s=.52;
  // Forest belts around the edges, open meadow through the centre.
  if(x<620||x>2980)s+=.24;
  if(y<380||y>1880)s+=.18;
  if((x<900&&y>1150)||(x>2700&&y>1150))s+=.16;
  if(x>1150&&x<2450&&y>650&&y<1320)s-=.30;
  if(y>1380&&y<1740)s-=.45;
  return s;
}
function validTree(x,y,chosen){
  if(forbidden(x,y,58))return false;
  if(chosen.some(q=>Math.hypot(q.x-x,q.y-y)<118))return false;
  return hash(x,y)<biomeScore(x,y);
}
const candidates=[];
for(let gy=100;gy<H-100;gy+=72)for(let gx=100;gx<W-100;gx+=72){
  const x=gx+(hash(gx,gy)-.5)*54,y=gy+(hash(gx+41,gy-17)-.5)*54;
  if(!validTree(x,y,candidates))continue;
  candidates.push({x,y});
}
// Keep a healthy tree count without turning every playable clearing into a wall of leaves.
candidates.sort((a,b)=>biomeScore(b.x,b.y)-biomeScore(a.x,a.y)||hash(b.x,b.y)-hash(a.x,a.y));
const picked=candidates.slice(0,165);
while(trees.length<picked.length)trees.push({x:0,y:0,v:.82,type:0,info:null});
while(trees.length>picked.length)trees.pop();
function chooseSpecies(x,y,i){
  const r=hash(x+i*11,y-i*7);
  if(wet(x,y)){const wetTypes=[1,10,12,17,19,22];return wetTypes[Math.floor(r*wetTypes.length)]}
  if(y<650){const upland=[0,2,3,4,5,6,7,8,9,14,20];return upland[Math.floor(r*upland.length)]}
  if(x<850||x>2750){const woodland=[0,2,3,4,5,6,8,9,10,15,16,18,20,23];return woodland[Math.floor(r*woodland.length)]}
  const mixed=[0,1,3,6,9,10,11,15,16,18,19,21,22,23];return mixed[Math.floor(r*mixed.length)]
}
// Species data is installed by thai-trees.js before this file.
for(let i=0;i<picked.length;i++){
  const q=picked[i],t=trees[i];t.x=q.x;t.y=q.y;t.v=.79+hash(q.x,q.y)*.17;
  if(typeof thaiSpecies!=='undefined'){t.type=chooseSpecies(t.x,t.y,i)%thaiSpecies.length;t.visualType=t.type;t.info=thaiSpecies[t.type]}
}
// Rocks: small clusters near forest edges and cliffs, never in roads or farm lanes.
const rockSpots=[];
for(let i=0;i<115;i++){
  let best=null;
  for(let a=0;a<30;a++){
    const x=90+hash(i*31+a,17)*3420,y=90+hash(i*47+a,29)*2010;
    if(forbidden(x,y,35))continue;
    const edge=(x<500||x>3100||y<450||y>1840)?1:.35;
    if(hash(i+a,55)>edge)continue;
    if(rockSpots.some(q=>Math.hypot(q.x-x,q.y-y)<42))continue;
    best={x,y,s:4+hash(i,88)*9};break;
  }
  if(best)rockSpots.push(best);
}
rocks.splice(0,rocks.length,...rockSpots);
// Flowers: denser in clearings, sparse beneath forest belts and absent from roads.
const flowerSpots=[];
for(let i=0;i<470;i++){
  const x=35+hash(i,201)*3530,y=35+hash(i,301)*1350;
  if(forbidden(x,y,18))continue;
  if(hash(i,411)>.82&&biomeScore(x,y)<.45)continue;
  flowerSpots.push({x,y,t:i%8});
}
flowers.splice(0,flowers.length,...flowerSpots);
// Ground grass gets a few open patches rather than a uniform noise carpet.
for(let i=0;i<grass.length;i++){
  let x=grass[i].x,y=grass[i].y;
  if(y>1400&&y<1710){grass[i].x=0;grass[i].y=0;continue}
  if(forbidden(x,y,4)&&hash(i,515)>.18){grass[i].x=0;grass[i].y=0}
}
window.moonwoodLayout={naturalized:true,thaiTreeCount:trees.length,rockCount:rocks.length,flowerCount:flowers.length,mainMap:{width:W,height:H,openCenter:true,forestBelts:true,wetlandBuffer:true}};
})();
