/* Moonwood visual biome pass */
(()=>{'use strict';if(typeof g==='undefined'||typeof R==='undefined')return;
const palette={'#203f2c':'#4a6336','#376d42':'#71884d','#2e613b':'#5e7540','#264f34':'#526b39','#4d7f4a':'#87945a','#416f43':'#667d45','#397044':'#71884d'};const baseR=R;R=function(x,y,w,h,col){return baseR(x,y,w,h,palette[col]||col)};
const C={deep:'#163b2b',m:'#24563a',g:'#347347',l:'#568b50',lime:'#78a35c',s:'#0c241d',br:'#392b22',b:'#5b3b2b',b2:'#80563b',bl:'#a2724d',r:'#442f25',gold:'#d6ae3e',yellow:'#f0cf58',pink:'#d989ad',violet:'#a77bc1',white:'#e9e8d7'};
function B(x,y,w,h,c){baseR(x,y,w,h,c)}
function leaf(x,y,c,z=3){B(x,y,z,z,c);if(z>=3)B(x+z-1,y-1,2,1,c)}
function branch(x,y,dx,dy){const n=Math.max(Math.abs(dx),Math.abs(dy));for(let i=0;i<=n;i+=3){const q=i/Math.max(1,n);B(x+dx*q,y+dy*q,3,3,C.br);if(i%9===0)B(x+dx*q+1,y+dy*q-1,2,2,C.b2)}}
function foliage(cx,cy,rx,ry,seed,accent){
  /* No solid rectangle: build the crown from irregular pixel clusters. */
  const edge=Math.max(3,Math.floor(Math.min(rx,ry)/7));
  for(let yy=-ry;yy<=ry;yy+=4)for(let xx=-rx;xx<=rx;xx+=4){
    const nx=xx/rx,ny=yy/ry,dist=nx*nx+ny*ny;
    if(dist>1)continue;
    const n=rnd(seed+xx*1.7,seed+yy*2.3);
    const rag=rnd(seed+xx*4.1+7,seed+yy*1.9+11);
    if(dist>.78&&rag<.42)continue;
    if(n<.10)continue;
    const c=n>.87?C.l:n>.67?accent:C.m;
    const z=n>.82?4:3;
    leaf(cx+xx,cy+yy,c,z);
    if(n>.93&&dist<.72)leaf(cx+xx+4,cy+yy-2,C.l,3);
  }
  /* Dark underside made from separated clusters, never a box. */
  for(let xx=-rx+5;xx<rx;xx+=8){
    const yy=ry-Math.abs(xx/rx)*7;
    const n=rnd(seed+xx*5.3,seed+91);
    if(n>.28)B(cx+xx,cy+yy,5+(n*3|0),4,C.s);
  }
  /* A few sky gaps around the silhouette keep every crown organic. */
}
function trunk(t,s,x,y,wide){const w=wide*s,h=wide===13?50*s:56*s;B(x-w/2,y-h*.18,w,h,C.b);B(x-w*.28,y-h*.12,w*.35,h*.84,C.b2);B(x+w*.08,y-h*.1,w*.18,h*.78,C.bl);for(let i=0;i<5;i++){const xx=x-w*.34+rnd(t.x+i*13,t.y-i*7)*w*.7,yy=y-h*.12+rnd(t.y+i*9,t.x+i*5)*h*.78;B(xx,yy,Math.max(1,s),Math.max(4,5*s),C.r)}B(x-w*.9,y+31*s,w*.62,5*s,C.r);B(x+w*.28,y+31*s,w*.62,5*s,C.r)}
function detailedTree(t){const s=treeScale(t),x=t.x,y=t.y,n=t.info?.[0]||'';
if(n==='จามจุรี'){trunk(t,s,x,y,13);branch(x,y-8*s,-64*s,-28*s);branch(x,y-8*s,64*s,-28*s);branch(x-46*s,y-28*s,-27*s,-15*s);branch(x+46*s,y-28*s,27*s,-15*s);foliage(x,y-43*s,64*s,25*s,31,C.l);foliage(x-48*s,y-39*s,31*s,19*s,47,C.l);foliage(x+48*s,y-39*s,31*s,19*s,53,C.l);return}
if(n==='ราชพฤกษ์'){trunk(t,s,x,y,8);branch(x,y-18*s,-31*s,-35*s);branch(x,y-18*s,31*s,-35*s);foliage(x,y-55*s,45*s,26*s,61,C.l);for(const dx of [-28,-14,0,16,29]){const len=(20+rnd(t.x+dx,t.y)*15)*s;B(x+dx*s,y-25*s,3*s,Math.max(8,len),C.gold);for(let q=5;q<len;q+=7)B(x+dx*s-3*s,y-25*s+q,8*s,5*s,C.yellow)}return}
if(n==='ปีบ'){trunk(t,s,x,y,8);branch(x,y-35*s,-28*s,-32*s);branch(x,y-35*s,28*s,-32*s);branch(x-20*s,y-54*s,-13*s,-17*s);branch(x+20*s,y-54*s,13*s,-17*s);foliage(x,y-72*s,31*s,39*s,71,C.l);for(const dx of [-20,-9,8,19]){B(x+dx*s,y-53*s,4*s,9*s,C.white);B(x+dx*s-2*s,y-57*s,8*s,5*s,C.white)}return}
if(n==='อินทนิลน้ำ'||n==='ตะแบกนา'){trunk(t,s,x,y,9);branch(x,y-18*s,-34*s,-34*s);branch(x,y-18*s,34*s,-34*s);branch(x-25*s,y-42*s,-18*s,-15*s);branch(x+25*s,y-42*s,18*s,-15*s);foliage(x,y-54*s,45*s,31*s,83,C.l);const fc=n==='อินทนิลน้ำ'?C.violet:C.pink;for(let i=0;i<14;i++){const dx=(rnd(t.x+i*3,t.y)*70-35)*s,dy=(rnd(t.x+i*7,t.y+9)*38-28)*s;B(x+dx,y+dy,5*s,5*s,fc);B(x+dx-2*s,y+dy+2*s,9*s,3*s,fc)}return}
if(n==='มะขาม'){trunk(t,s,x,y,9);branch(x,y-15*s,-43*s,-24*s);branch(x,y-15*s,43*s,-24*s);branch(x-30*s,y-27*s,-25*s,-15*s);branch(x+30*s,y-27*s,25*s,-15*s);branch(x-48*s,y-39*s,-16*s,-10*s);branch(x+48*s,y-39*s,16*s,-10*s);foliage(x,y-48*s,53*s,23*s,101,C.l);foliage(x-35*s,y-43*s,25*s,16*s,107,C.g);foliage(x+35*s,y-43*s,25*s,16*s,113,C.g);return}
if(n==='ยางนา'||n==='ตะเคียนทอง'){trunk(t,s,x,y,n==='ตะเคียนทอง'?13:9);branch(x,y-28*s,-42*s,-43*s);branch(x,y-28*s,42*s,-43*s);branch(x-30*s,y-48*s,-26*s,-24*s);branch(x+30*s,y-48*s,26*s,-24*s);foliage(x,y-76*s,46*s,39*s,151,C.l);foliage(x-30*s,y-62*s,25*s,22*s,157,C.m);foliage(x+30*s,y-62*s,25*s,22*s,163,C.m);if(n==='ตะเคียนทอง'){B(x-2*s,y-19*s,3*s,17*s,C.gold);B(x+2*s,y-7*s,2*s,8*s,C.gold)}return}
if(n==='สัก'){trunk(t,s,x,y,8);branch(x,y-31*s,-42*s,-38*s);branch(x,y-31*s,42*s,-38*s);branch(x-30*s,y-55*s,-17*s,-18*s);branch(x+30*s,y-55*s,17*s,-18*s);foliage(x,y-66*s,48*s,34*s,181,C.l);for(const q of [[-29,-64],[-15,-78],[2,-70],[19,-82],[33,-61],[-38,-48],[30,-45]])leaf(x+q[0]*s,y+q[1]*s,C.lime,6*s);return}
if(n==='เต็ง'||n==='รัง'||n==='แดง'){trunk(t,s,x,y,9);branch(x,y-15*s,-39*s,-27*s);branch(x,y-15*s,39*s,-27*s);branch(x-29*s,y-35*s,-19*s,-13*s);branch(x+29*s,y-35*s,19*s,-13*s);foliage(x,y-47*s,(n==='แดง'?54:48)*s,25*s,197,C.l);foliage(x-28*s,y-42*s,24*s,17*s,203,C.m);foliage(x+28*s,y-42*s,24*s,17*s,211,C.m);return}
if(n==='พะยูง'||n==='ชิงชัน'||n==='ประดู่ป่า'){trunk(t,s,x,y,9);branch(x,y-17*s,-34*s,-31*s);branch(x,y-17*s,34*s,-31*s);branch(x-24*s,y-37*s,-18*s,-13*s);branch(x+24*s,y-37*s,18*s,-13*s);foliage(x,y-53*s,43*s,29*s,223,C.g);for(let i=0;i<18;i++){const dx=(rnd(t.x+i*3,t.y)*82-41)*s,dy=(rnd(t.y+i*7,t.x)*42-28)*s;leaf(x+dx,y-52*s+dy,i%5===0?C.l:C.m,3*s)}if(n==='ชิงชัน')for(let i=0;i<5;i++)B(x+(rnd(t.x+i,t.y)*60-30)*s,y-(55+rnd(i,t.x)*25)*s,4*s,4*s,C.violet);return}
if(n==='มะค่าโมง'||n==='มะค่าแต้'){trunk(t,s,x,y,13);branch(x,y-18*s,-43*s,-28*s);branch(x,y-18*s,43*s,-28*s);branch(x-31*s,y-38*s,-20*s,-13*s);branch(x+31*s,y-38*s,20*s,-13*s);foliage(x,y-53*s,51*s,27*s,251,C.l);foliage(x-31*s,y-46*s,25*s,17*s,257,C.m);foliage(x+31*s,y-46*s,25*s,17*s,263,C.m);return}
if(n==='หว้า'||n==='กันเกรา'||n==='พะยอม'){trunk(t,s,x,y,9);branch(x,y-20*s,-32*s,-34*s);branch(x,y-20*s,32*s,-34*s);branch(x-25*s,y-43*s,-17*s,-13*s);branch(x+25*s,y-43*s,17*s,-13*s);foliage(x,y-58*s,43*s,35*s,271,C.g);foliage(x-28*s,y-54*s,23*s,21*s,277,C.l);foliage(x+28*s,y-54*s,23*s,21*s,283,C.l);if(n==='หว้า')for(let i=0;i<6;i++)B(x+(rnd(i,t.x)*65-32)*s,y-(43+rnd(t.y,i)*25)*s,4*s,5*s,C.violet);return}
trunk(t,s,x,y,9);branch(x,y-17*s,-34*s,-31*s);branch(x,y-17*s,34*s,-31*s);branch(x-25*s,y-38*s,-17*s,-13*s);branch(x+25*s,y-38*s,17*s,-13*s);foliage(x,y-54*s,46*s,31*s,301,C.g);foliage(x-28*s,y-47*s,22*s,19*s,307,C.m);foliage(x+28*s,y-47*s,22*s,19*s,313,C.l)}
const oldTreeCanopy=treeCanopy;treeCanopy=function(t){detailedTree(t)};
const oldGrassland=grassland;grassland=function(){oldGrassland();for(let i=0;i<900;i++){const x=rnd(i,911)*W,y=rnd(i,919)*H;if(y>1400&&y<1710)continue;const q=rnd(i,923);if(q<.55)continue;const c=q>.88?'#9a9b5d':q>.72?'#7f8e50':'#687c47';B(x,y,2,5,c);if(q>.82)B(x+2,y-2,2,3,c)}};
window.moonwoodVisualPass={detailedTree:true,contrastingGround:true,organicCanopies:true,branchDetail:true};})();
