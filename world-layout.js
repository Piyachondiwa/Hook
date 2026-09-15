/* Moonwood: natural Thai island placement pass. Keeps playable clearings and ecological zones. */
(()=>{'use strict';
if(typeof trees==='undefined'||typeof rocks==='undefined'||typeof flowers==='undefined'||typeof grass==='undefined'||typeof rnd!=='function')return;
const W=3600,H=2200,hash=(x,y)=>rnd(x*1.731+y*7.193,x*3.17-y*1.91);
const blockedZone=(x,y,pad=0)=>{
 if(x<70+pad||x>W-70-pad||y<70+pad||y>H-70-pad)return true;
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
};
const wet=(x,y)=>y>1240&&y<1405||y>1695&&y<1775||x<260&&y>600&&y<1320;
const score=(x,y)=>{let s=.48;if(x<620||x>2980)s+=.25;if(y<380||y>1880)s+=.16;if((x<900&&y>1150)||(x>2700&&y>1150))s+=.12;if(x>1150&&x<2450&&y>650&&y<1320)s-=.25;if(y>1380&&y<1740)s-=.42;return s};
const chosen=[];
for(let gy=100;gy<H-100;gy+=76)for(let gx=100;gx<W-100;gx+=76){const x=gx+(hash(gx,gy)-.5)*50,y=gy+(hash(gx+41,gy-17)-.5)*50;if(blockedZone(x,y,58)||hash(x,y)>=score(x,y))continue;if(chosen.some(q=>Math.hypot(q.x-x,q.y-y)<118))continue;chosen.push({x,y})}
chosen.sort((a,b)=>score(b.x,b.y)-score(a.x,a.y));const picked=chosen.slice(0,150);while(trees.length<picked.length)trees.push({x:0,y:0,v:.82,type:0,info:null});while(trees.length>picked.length)trees.pop();
function speciesFor(x,y,i){const r=hash(x+i*11,y-i*7);if(wet(x,y)){const a=[1,10,12,17,19,22];return a[Math.floor(r*a.length)]}if(y<650){const a=[0,2,3,4,5,6,7,8,9,14,20];return a[Math.floor(r*a.length)]}if(x<850||x>2750){const a=[0,2,3,4,5,6,8,9,10,15,16,18,20,23];return a[Math.floor(r*a.length)]}const a=[0,1,3,6,9,10,11,15,16,18,19,21,22,23];return a[Math.floor(r*a.length)]}
for(let i=0;i<picked.length;i++){const q=picked[i],t=trees[i];t.x=q.x;t.y=q.y;t.v=.79+hash(q.x,q.y)*.17;if(typeof thaiSpecies!=='undefined'){t.type=speciesFor(t.x,t.y,i)%thaiSpecies.length;t.visualType=t.type;t.info=thaiSpecies[t.type]}}
const rs=[];for(let i=0;i<105;i++){for(let a=0;a<30;a++){const x=90+hash(i*31+a,17)*3420,y=90+hash(i*47+a,29)*2010;if(blockedZone(x,y,35))continue;if(hash(i+a,55)>(x<500||x>3100||y<450||y>1840?1:.32))continue;if(rs.some(q=>Math.hypot(q.x-x,q.y-y)<44))continue;rs.push({x,y,s:4+hash(i,88)*9});break}}rocks.splice(0,rocks.length,...rs);
const fs=[];for(let i=0;i<420;i++){const x=35+hash(i,201)*3530,y=35+hash(i,301)*1350;if(blockedZone(x,y,18))continue;if(hash(i,411)>.8&&score(x,y)<.45)continue;fs.push({x,y,t:i%8})}flowers.splice(0,flowers.length,...fs);
for(let i=0;i<grass.length;i++)if(blockedZone(grass[i].x,grass[i].y,4)&&hash(i,515)>.18){grass[i].x=0;grass[i].y=0}
window.moonwoodLayout={naturalized:true,thaiTreeCount:trees.length,rockCount:rocks.length,flowerCount:flowers.length,mainMap:{width:W,height:H,openCenter:true,forestBelts:true,wetlandBuffer:true}};
})();
