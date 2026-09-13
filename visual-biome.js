/* Moonwood visual biome pass */
(() => {
'use strict';
if(typeof g==='undefined'||typeof R==='undefined')return;
const palette={'#203f2c':'#4a6336','#376d42':'#71834a','#2e613b':'#5e7540','#264f34':'#526b39','#4d7f4a':'#87945a','#416f43':'#667d45','#397044':'#71884d'};
const baseR=R;
R=function(x,y,w,h,col){return baseR(x,y,w,h,palette[col]||col)};
const C={d:'#102d24',deep:'#163b2b',m:'#24563a',g:'#347347',l:'#568b50',lime:'#78a35c',s:'#0c241d',br:'#392b22',b:'#5b3b2b',b2:'#80563b',bl:'#a2724d',r:'#442f25',gold:'#d6ae3e',yellow:'#f0cf58',pink:'#d989ad',violet:'#a77bc1',white:'#e9e8d7'};
function B(x,y,w,h,c){baseR(x,y,w,h,c)}
function leaf(x,y,c,z=3){B(x,y,z,z,c);if(z>=3)B(x+z-1,y-1,2,1,c)}
function branch(x,y,dx,dy){const n=Math.max(Math.abs(dx),Math.abs(dy));for(let i=0;i<=n;i+=3){const q=i/Math.max(1,n);B(x+dx*q,y+dy*q,3,3,C.br)}}
function foliage(cx,cy,rx,ry,seed,accent){B(cx-rx,cy-ry,rx*2,ry*2,C.deep);for(let yy=-ry+4;yy<ry;yy+=5)for(let xx=-rx+4;xx<rx;xx+=5){if((xx/rx)**2+(yy/ry)**2>1)continue;const n=rnd(seed+xx*1.7,seed+yy*2.3);if(n<.15)continue;leaf(cx+xx,cy+yy,n>.86?C.l:n>.67?accent:C.m,n>.78?4:3)}for(let xx=-rx+5;xx<rx;xx+=9){const yy=ry-Math.abs(xx/rx)*8;if(yy>4)B(cx+xx,cy+yy,5,4,C.s)}}
function trunk(t,s,x,y,wide){const w=wide*s,h=wide===13?50*s:56*s;B(x-w/2,y-h*.18,w,h,C.b);B(x-w*.28,y-h*.12,w*.35,h*.84,C.b2);B(x+w*.08,y-h*.1,w*.18,h*.78,C.bl);for(let i=0;i<5;i++){const xx=x-w*.34+rnd(t.x+i*13,t.y-i*7)*w*.7,yy=y-h*.12+rnd(t.y+i*9,t.x+i*5)*h*.78;B(xx,yy,Math.max(1,s),Math.max(4,5*s),C.r)}B(x-w*.9,y+31*s,w*.62,5*s,C.r);B(x+w*.28,y+31*s,w*.62,5*s,C.r)}
