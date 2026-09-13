/* Moonwood performance pass: active camera culling without rewriting the base world. */
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
window.moonwoodPerformance={treeCulling:true,activeCamera:true,noSceneOverride:true};
})();