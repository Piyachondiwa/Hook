/* Moonwood: dense Japanese island tree layer and micro-detail pass. */
(()=>{'use strict';
if(typeof R==='undefined'||typeof p==='undefined'||typeof world!=='function')return;
const baseWorld=world;
const trees=[
{x:3715,y:760,t:'pine',s:1.10},{x:3870,y:735,t:'broad',s:.92},{x:4040,y:705,t:'pine',s:1.0},{x:4470,y:710,t:'maple',s:1.02},{x:4790,y:735,t:'pine',s:1.08},{x:4990,y:760,t:'broad',s:.9},
{x:3690,y:875,t:'broad',s:.95},{x:3720,y:970,t:'pine',s:.82},{x:3750,y:1450,t:'broad',s:.95},{x:3830,y:1570,t:'pine',s:1.08},{x:3980,y:1640,t:'maple',s:1.0},{x:4200,y:1670,t:'broad',s:.9},{x:4440,y:1650,t:'pine',s:1.06},{x:4680,y:1655,t:'maple',s:1.02},{x:4930,y:1600,t:'broad',s:.94},{x:5030,y:1450,t:'pine',s:.88},
{x:3790,y:1340,t:'pine',s:.85},{x:4030,y:1080,t:'maple',s:.72},{x:4580,y:1070,t:'broad',s:.76},{x:5010,y:1090,t:'pine',s:.82},{x:4090,y:1480,t:'pine',s:.72},{x:4550,y:1480,t:'maple',s:.72},{x:4880,y:1320,t:'broad',s:.78},
{x:3890,y:790,t:'pine',s:.7},{x:4670,y:790,t:'broad',s:.72},{x:4320,y:690,t:'maple',s:.76},{x:4870,y:690,t:'pine',s:.7}
];
const D={deep:'#173827',leaf:'#285b3a',mid:'#41794a',light:'#709b59',lime:'#9faf68',trunk:'#4e3525',trunkHi:'#8a5b39',stone:'#70746c',stoneHi:'#bdb9a9',grass:'#8fa361',grass2:'#617e4b',pink:'#e5a6b9',pink2:'#f3cbd6',gold:'#e2ad5d',wood:'#6a432c',water:'#4e8990'};
function B(x,y,w,h,c){R(x,y,w,h,c)}
function pine(x,y,s){B(x-5*s,y+12*s,10*s,48*s,D.trunk);B(x-3*s,y+15*s,4*s,40*s,D.trunkHi);const rows=[[-32,16,40],[-24,8,54],[-13,0,64],[0,-16,56],[12,-28,43]];for(let i=0;i<rows.length;i++){const q=rows[i],yy=y+q[1]*s,w=q[2]*s;B(x-w/2,yy,w,14*s,i%2?D.leaf:D.deep);B(x-w*.32,yy-7*s,w*.64,8*s,D.mid);B(x-7*s,yy-4*s,12*s,4*s,D.light)}B(x-13*s,y+49*s,9*s,4*s,D.trunk);B(x+5*s,y+46*s,12*s,4*s,D.trunk)}
function broad(x,y,s){B(x-6*s,y+18*s,12*s,45*s,D.trunk);B(x-3*s,y+20*s,5*s,38*s,D.trunkHi);const blobs=[[-31,-13,54,28],[-17,-31,60,31],[8,-22,62,30],[27,-4,50,28],[0,-51,42,26]];for(let i=0;i<blobs.length;i++){const q=blobs[i];B(x+(q[0]-q[2]/2)*s,y+q[1]*s,q[2]*s,q[3]*s,i%3===0?D.deep:D.leaf);B(x+(q[0]-q[2]/2+7)*s,y+(q[1]-5)*s,q[2]*s*.58,q[3]*s*.42,i%2?D.mid:D.light)}for(let i=0;i<9;i++)B(x+((i*17)%56-28)*s,y+(-12-(i%5)*7)*s,4*s,3*s,i%2?D.lime:D.light)}
function maple(x,y,s){B(x-6*s,y+16*s,12*s,45*s,D.trunk);B(x-3*s,y+18*s,5*s,38*s,D.trunkHi);const cols=[D.pink,D.pink2,D.light,D.mid];const blobs=[[-28,-17,48,28],[-3,-38,52,30],[27,-14,45,27],[0,-55,34,23]];blobs.forEach((q,i)=>{B(x+(q[0]-q[2]/2)*s,y+q[1]*s,q[2]*s,q[3]*s,cols[i]);B(x+(q[0]-q[2]/2+9)*s,y+(q[1]-4)*s,q[2]*s*.5,q[3]*s*.42,cols[(i+1)%cols.length])});for(let i=0;i<10;i++)B(x+((i*19)%60-30)*s,y+(-8-(i%6)*8)*s,3*s,3*s,i%2?D.pink:D.pink2)}
function tree(t){if(t.t==='pine')pine(t.x,t.y,t.s);else if(t.t==='maple')maple(t.x,t.y,t.s);else broad(t.x,t.y,t.s)}
function microDetails(){for(let i=0;i<520;i++){const x=3670+(i*37)%1365,y=665+(i*71)%1055,n=Math.sin(i*12.17)*.5+.5;if((y>1038&&y<1152)||(y>1208&&y<1402)||((x>3760&&x<4970)&&(y>840&&y<1015)))continue;if(n<.27)B(x,y,3,2,D.stoneHi);else if(n<.43)B(x,y,5,2,D.grass);else if(n<.58){B(x,y,2,7,D.grass2);B(x+3,y-3,2,5,D.grass)}else if(n<.71)B(x,y,4,4,D.pink);else if(n<.82)B(x,y,3,3,D.gold);else if(n<.91)B(x,y,3,2,D.wood);else B(x,y,2,4,D.leaf)}for(let i=0;i<34;i++){const x=3840+(i%9)*42,y=1510+(i%4)*12;B(x,y,18,5,i%2?D.stone:D.stoneHi);B(x+3,y+2,8,2,D.stoneHi)}for(let i=0;i<70;i++){const x=4690+(i*17)%300,y=700+(i*23)%95;B(x,y,8+(i%5),2,D.water)}}
function drawTrees(){trees.forEach(tree);microDetails();for(const t of trees){const dx=p.x-t.x,dy=p.y-t.y-10*t.s,rx=46*t.s,ry=58*t.s;if(dx*dx/(rx*rx)+dy*dy/(ry*ry)<1){if(t.t==='pine'){B(t.x-28*t.s,t.y-30*t.s,56*t.s,32*t.s,D.leaf);B(t.x-18*t.s,t.y-48*t.s,36*t.s,22*t.s,D.mid);B(t.x-9*t.s,t.y-60*t.s,18*t.s,16*t.s,D.light)}else if(t.t==='maple'){B(t.x-34*t.s,t.y-35*t.s,68*t.s,34*t.s,D.pink);B(t.x-20*t.s,t.y-55*t.s,40*t.s,24*t.s,D.pink2)}else{B(t.x-45*t.s,t.y-29*t.s,90*t.s,36*t.s,D.leaf);B(t.x-25*t.s,t.y-50*t.s,50*t.s,25*t.s,D.mid)}}}}
world=function(){baseWorld();if(p.x>3500)drawTrees()};
const oldBlocked=typeof blocked==='function'?blocked:null;
blocked=function(x,y){if(oldBlocked&&oldBlocked(x,y))return true;if(x>3650&&x<5050&&y>650&&y<1735){for(const t of trees){const trunkR=12*t.s;if(Math.hypot(x-t.x,y-(t.y+43*t.s))<15+trunkR)return true}}return false};
window.moonwoodIslandTrees={count:trees.length,detail:'very-high',microPixels:520};
})();
