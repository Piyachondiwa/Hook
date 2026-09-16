/* Moonwood: organic Japanese island tree layer, pixel-only. */
(()=>{'use strict';
if(typeof R==='undefined'||typeof p==='undefined'||typeof world!=='function')return;
const baseWorld=world;
const trees=[
{x:3715,y:760,t:'pine',s:1.10},{x:3870,y:735,t:'broad',s:.92},{x:4040,y:705,t:'pine',s:1.0},{x:4470,y:710,t:'maple',s:1.02},{x:4790,y:735,t:'pine',s:1.08},{x:4990,y:760,t:'broad',s:.9},
{x:3690,y:875,t:'broad',s:.95},{x:3720,y:970,t:'pine',s:.82},{x:3750,y:1450,t:'broad',s:.95},{x:3830,y:1570,t:'pine',s:1.08},{x:3980,y:1640,t:'maple',s:1.0},{x:4200,y:1670,t:'broad',s:.9},{x:4440,y:1650,t:'pine',s:1.06},{x:4680,y:1655,t:'maple',s:1.02},{x:4930,y:1600,t:'broad',s:.94},{x:5030,y:1450,t:'pine',s:.88},
{x:3790,y:1340,t:'pine',s:.85},{x:4030,y:1080,t:'maple',s:.72},{x:4580,y:1070,t:'broad',s:.76},{x:5010,y:1090,t:'pine',s:.82},{x:4090,y:1480,t:'pine',s:.72},{x:4550,y:1480,t:'maple',s:.72},{x:4880,y:1320,t:'broad',s:.78},
{x:3890,y:790,t:'pine',s:.7},{x:4670,y:790,t:'broad',s:.72},{x:4320,y:690,t:'maple',s:.76},{x:4870,y:690,t:'pine',s:.7}
];
const D={deep:'#173827',leaf:'#285b3a',mid:'#41794a',light:'#709b59',lime:'#9faf68',trunk:'#4e3525',trunkHi:'#8a5b39',pink:'#e5a6b9',pink2:'#f3cbd6',gold:'#e2ad5d',water:'#4e8990',shadow:'#15251d'};
function B(x,y,w,h,c){R(x,y,w,h,c)}
function pxCluster(cx,cy,rx,ry,seed,colors,step=4){
  for(let y=-ry;y<=ry;y+=step)for(let x=-rx;x<=rx;x+=step){
    const d=(x*x)/(rx*rx)+(y*y)/(ry*ry);if(d>1)continue;
    const n=Math.sin((x+seed)*12.9898+(y-seed)*78.233)*43758.5453;const f=n-Math.floor(n);
    const edge=d>.72;if(edge&&f<.42)continue;if(f<.10)continue;
    const c=f>.86?colors[2]:f>.58?colors[1]:colors[0];
    const z=f>.82?4:3;B(cx+x,cy+y,z,z,c);
    if(f>.92)B(cx+x+3,cy+y-2,2,2,colors[2]);
  }
}
function groundShadow(t){const s=t.s,x=t.x,y=t.y;B(x-31*s,y+54*s,62*s,7*s,D.shadow);B(x-20*s,y+60*s,40*s,4*s,'#10241c')}
function trunk(x,y,s,w=8){B(x-w*s/2,y+5*s,w*s,50*s,D.trunk);B(x-w*.22*s,y+8*s,w*.32*s,41*s,D.trunkHi);B(x+w*.10*s,y+10*s,w*.16*s,34*s,'#a06a43');B(x-w*.78*s,y+47*s,w*.55*s,4*s,D.trunk);B(x+w*.22*s,y+48*s,w*.58*s,4*s,D.trunk)}
function pine(t){const {x,y,s}=t;trunk(x,y,s,9);const rows=[[-33,18,46],[-24,7,59],[-12,-5,69],[2,-19,59],[15,-33,46],[24,-45,29]];for(let i=0;i<rows.length;i++){const [yy,off,w]=rows[i];pxCluster(x,y+yy*s,w*s/2,10*s,100+i*19,[i%2?D.leaf:D.deep,D.mid,D.light],3)}B(x-2*s,y-51*s,4*s,8*s,D.deep)}
function broad(t){const {x,y,s}=t;trunk(x,y,s,11);pxCluster(x,y-36*s,48*s,27*s,210,[D.deep,D.leaf,D.light],4);pxCluster(x-30*s,y-33*s,25*s,19*s,240,[D.leaf,D.mid,D.light],4);pxCluster(x+30*s,y-34*s,27*s,20*s,270,[D.leaf,D.mid,D.lime],4);}
function maple(t){const {x,y,s}=t;trunk(x,y,s,10);pxCluster(x,y-39*s,43*s,28*s,330,[D.leaf,D.pink,D.pink2],4);pxCluster(x-28*s,y-34*s,25*s,17*s,360,[D.pink,D.pink2,D.light],4);pxCluster(x+29*s,y-34*s,25*s,18*s,390,[D.pink,D.pink2,D.light],4)}
function tree(t){groundShadow(t);if(t.t==='pine')pine(t);else if(t.t==='maple')maple(t);else broad(t)}
function microDetails(){for(let i=0;i<520;i++){const x=3670+(i*37)%1365,y=665+(i*71)%1055,n=Math.sin(i*12.17)*.5+.5;if((y>1038&&y<1152)||(y>1208&&y<1402)||((x>3760&&x<4970)&&(y>840&&y<1015)))continue;if(n<.27)B(x,y,3,2,'#bdb9a9');else if(n<.43)B(x,y,5,2,'#8fa361');else if(n<.58){B(x,y,2,7,'#617e4b');B(x+3,y-3,2,5,'#8fa361')}else if(n<.71)B(x,y,4,4,D.pink);else if(n<.82)B(x,y,3,3,D.gold);else if(n<.91)B(x,y,3,2,D.trunk);else B(x,y,2,4,D.leaf)}}
function canopyOverlay(t){const dx=p.x-t.x,dy=p.y-t.y-10*t.s,rx=48*t.s,ry=58*t.s;if(dx*dx/(rx*rx)+dy*dy/(ry*ry)>=1)return;const col=t.t==='maple'?[D.pink,D.pink2,D.light]:t.t==='pine'?[D.deep,D.mid,D.light]:[D.leaf,D.mid,D.light];pxCluster(t.x,t.y-31*t.s,rx*.72,ry*.48,700+t.x,col,4);pxCluster(t.x,t.y-50*t.s,rx*.42,ry*.30,800+t.y,col,4)}
function drawTrees(){trees.forEach(tree);microDetails();trees.forEach(canopyOverlay)}
world=function(){baseWorld();if(p.x>3500)drawTrees()};
const oldBlocked=typeof blocked==='function'?blocked:null;
blocked=function(x,y){if(oldBlocked&&oldBlocked(x,y))return true;if(x>3650&&x<5050&&y>650&&y<1735){for(const t of trees){const trunkR=12*t.s;if(Math.hypot(x-t.x,y-(t.y+43*t.s))<15+trunkR)return true}}return false};
window.moonwoodIslandTrees={count:trees.length,detail:'organic-pixel',microPixels:520,groundShadows:true,noRectangularCanopy:true};
window.moonwoodIslandTreePositions=trees.map(t=>({x:t.x,y:t.y,type:t.t,s:t.s}));
})();