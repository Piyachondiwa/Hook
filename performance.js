/* Moonwood performance + natural placement pass. */
(()=>{'use strict';
if(typeof c==='undefined'||typeof p==='undefined'||typeof W==='undefined'||typeof H==='undefined')return;
const oldBase=typeof treeBase==='function'?treeBase:null,oldCanopy=typeof treeCanopy==='function'?treeCanopy:null,oldGrass=typeof grassland==='function'?grassland:null;
function camera(){return typeof window.moonwoodCamera==='function'?window.moonwoodCamera():{x:Math.max(0,Math.min(W-c.width,p.x-c.width/2)),y:Math.max(0,Math.min(H-c.height,p.y-c.height/2)),scaleY:1}}
function visible(x,y,pad=40){const q=camera(),sy=q.scaleY||1,vh=c.height/sy;return x>q.x-pad&&x<q.x+c.width+pad&&y>q.y-pad&&y<q.y+vh+pad}
function visibleTree(t,pad=120){const s=typeof treeScale==='function'?treeScale(t):1.5;return visible(t.x,t.y,pad+100*s)}
if(oldBase)treeBase=t=>{if(visibleTree(t,120))oldBase(t)};
if(oldCanopy)treeCanopy=t=>{if(visibleTree(t,140))oldCanopy(t)};
if(oldGrass)grassland=function(){
 const q=camera(),sy=q.scaleY||1,vh=c.height/sy,step=12;
 const x0=Math.max(0,Math.floor((q.x-18)/step)*step),x1=Math.min(W,Math.ceil((q.x+c.width+18)/step)*step),y0=Math.max(0,Math.floor((q.y-18)/step)*step),y1=Math.min(H,Math.ceil((q.y+vh+18)/step)*step);
 R(0,0,W,H,'#203f2c');
 for(let y=y0;y<y1;y+=step)for(let x=x0;x<x1;x+=step){const n=rnd(x,y);R(x,y,12,12,n>.88?'#376d42':n>.52?'#2e613b':'#264f34');if(n>.82){R(x+2,y+7,2,3,'#4d7f4a');R(x+8,y+2,2,2,'#416f43')}}
 for(const qg of grass){if(qg.y>1400&&qg.y<1710)continue;if(visible(qg.x,qg.y,16)){const a=['#376d40','#467b47','#315f3a','#56834e'][qg.t];R(qg.x,qg.y,2,5,a);R(qg.x+3,qg.y-2,2,4,a);R(qg.x+6,qg.y+1,2,4,a)}}
 R(0,1415,W,15,'#397044');R(0,1430,W,260,'#24566d');R(0,1430,W,6,'#8cc7c7');
 const wx0=Math.max(0,Math.floor((q.x-20)/55)*55),wx1=Math.min(W,q.x+c.width+55);for(let x=wx0;x<wx1;x+=55){const n=rnd(x,4);R(x,1460+n*25,22,3,'#73acb5');R(x+28,1540+n*20,16,3,'#477f96')}
 R(0,1690,W,20,'#397044');path(0,1035,1480,72);path(2120,1035,1480,72);path(1760,0,72,820);path(1760,1170,72,1030);path(600,470,1080,58);path(2780,470,700,58);
 R(1380,840,840,245,'#5f5a54');for(let y=850;y<1080;y+=26)for(let x=1390;x<2210;x+=34){if(!visible(x,y,40))continue;const n=rnd(x,y);R(x,y,27,19,n>.5?'#79746b':'#514e4a');R(x+4,y+3,18,3,'#969087')}
};

/* ---------------------------------------------------------------
   NATURAL WORLD LAYOUT
   Rebuilds placement deterministically after Thai species are loaded.
   Forest belts frame the playable clearings, wetland species stay near
   water, paths remain readable, and structures get breathing room.
---------------------------------------------------------------- */
if(typeof trees!=='undefined'&&typeof rocks!=='undefined'&&typeof flowers!=='undefined'&&typeof grass!=='undefined'&&typeof rnd==='function'){
 const MW=3600,MH=2200;
 const hash=(x,y)=>rnd(x*1.731+y*7.193,x*3.17-y*1.91);
 function forbidden(x,y,pad=0){
  if(x<70+pad||x>MW-70-pad||y<70+pad||y>MH-70-pad)return true;
  if(y>1410-pad&&y<1710+pad)return true;
  if(y>1005-pad&&y<1115+pad)return true;
  if(x>1710-pad&&x<1835+pad)return true;
  if(x>580-pad&&x<1690+pad&&y>445-pad&&y<545+pad)return true;
  if(x>2750-pad&&x<3520+pad&&y>445-pad&&y<545+pad)return true;
  if(x>1360-pad&&x<2240+pad&&y>815-pad&&y<1110+pad)return true;
  const structures=[[820,694,210,126],[2450,634,210,126],[340,455,150,108]];
  for(const q of structures)if(x>=q[0]-pad&&x<=q[0]+q[2]+pad&&y>=q[1]-pad&&y<=q[1]+q[3]+pad)return true;
  const cliffs=[[2450,170,720,360],[2820,1780,560,260],[520,1750,600,250],[700,1780,380,160]];
  for(const q of cliffs)if(x>=q[0]-pad&&x<=q[0]+q[2]+pad&&y>=q[1]-pad&&y<=q[1]+q[3]+pad)return true;
  return false;
 }
 const wet=(x,y)=>(y>1240&&y<1405)||(y>1695&&y<1775)||(x<260&&y>600&&y<1320);
 const biomeScore=(x,y)=>{
  let s=.52;if(x<620||x>2980)s+=.24;if(y<380||y>1880)s+=.18;if((x<900&&y>1150)||(x>2700&&y>1150))s+=.16;if(x>1150&&x<2450&&y>650&&y<1320)s-=.30;if(y>1380&&y<1740)s-=.45;return s;
 };
 const candidates=[];
 for(let gy=100;gy<MH-100;gy+=72)for(let gx=100;gx<MW-100;gx+=72){
  const x=gx+(hash(gx,gy)-.5)*54,y=gy+(hash(gx+41,gy-17)-.5)*54;
  if(forbidden(x,y,58)||candidates.some(q=>Math.hypot(q.x-x,q.y-y)<118)||hash(x,y)>=biomeScore(x,y))continue;
  candidates.push({x,y});
 }
 candidates.sort((a,b)=>biomeScore(b.x,b.y)-biomeScore(a.x,a.y)||hash(b.x,b.y)-hash(a.x,a.y));
 const picked=candidates.slice(0,165);
 while(trees.length<picked.length)trees.push({x:0,y:0,v:.82,type:0,info:null});
 while(trees.length>picked.length)trees.pop();
 const chooseSpecies=(x,y,i)=>{
  const r=hash(x+i*11,y-i*7);
  if(wet(x,y)){const a=[1,10,12,17,19,22];return a[Math.floor(r*a.length)]}
  if(y<650){const a=[0,2,3,4,5,6,7,8,9,14,20];return a[Math.floor(r*a.length)]}
  if(x<850||x>2750){const a=[0,2,3,4,5,6,8,9,10,15,16,18,20,23];return a[Math.floor(r*a.length)]}
  const a=[0,1,3,6,9,10,11,15,16,18,19,21,22,23];return a[Math.floor(r*a.length)];
 };
 for(let i=0;i<picked.length;i++){const q=picked[i],t=trees[i];t.x=q.x;t.y=q.y;t.v=.79+hash(q.x,q.y)*.17;if(typeof thaiSpecies!=='undefined'){t.type=chooseSpecies(t.x,t.y,i)%thaiSpecies.length;t.visualType=t.type;t.info=thaiSpecies[t.type]}}
 const rockSpots=[];
 for(let i=0;i<115;i++)for(let a=0;a<30;a++){
  const x=90+hash(i*31+a,17)*3420,y=90+hash(i*47+a,29)*2010,edge=(x<500||x>3100||y<450||y>1840)?1:.35;
  if(forbidden(x,y,35)||hash(i+a,55)>edge||rockSpots.some(q=>Math.hypot(q.x-x,q.y-y)<42))continue;
  rockSpots.push({x,y,s:4+hash(i,88)*9});break;
 }
 rocks.splice(0,rocks.length,...rockSpots);
 const flowerSpots=[];
 for(let i=0;i<470;i++){const x=35+hash(i,201)*3530,y=35+hash(i,301)*1350;if(forbidden(x,y,18))continue;if(hash(i,411)>.82&&biomeScore(x,y)<.45)continue;flowerSpots.push({x,y,t:i%8})}
 flowers.splice(0,flowers.length,...flowerSpots);
 for(let i=0;i<grass.length;i++)if(grass[i].y>1400&&grass[i].y<1710){grass[i].x=0;grass[i].y=0}else if(forbidden(grass[i].x,grass[i].y,4)&&hash(i,515)>.18){grass[i].x=0;grass[i].y=0}
 window.moonwoodLayout={naturalized:true,thaiTreeCount:trees.length,rockCount:rocks.length,flowerCount:flowers.length,mainMap:{width:MW,height:MH,openCenter:true,forestBelts:true,wetlandBuffer:true}};
}
window.moonwoodPerformance={treeCulling:true,activeCamera:true,naturalLayout:true,noSceneOverride:true};
})();
