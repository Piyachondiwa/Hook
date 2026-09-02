const c=document.getElementById('game'),g=c.getContext('2d');
g.imageSmoothingEnabled=false;
const chapterEl=document.getElementById('chapter'),noticeEl=document.getElementById('notice'),dialogueEl=document.getElementById('dialogue');
const keys={};
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(e.key.toLowerCase()))e.preventDefault()});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
const W=3600,H=2200,T=12;
const p={x:1800,y:1080,s:170,dir:'down',frame:0,walking:false};
let chapter=0,msgTimer=5,dialogue=null,time=0;
const seed=91827;
const trees=[],flowers=[],rocks=[],grass=[],mushrooms=[],fireflies=[];
function rnd(x,y){const n=Math.sin(x*12.9898+y*78.233+seed)*43758.5453;return n-Math.floor(n)}
for(let y=40;y<H-40;y+=44)for(let x=40;x<W-40;x+=44){const r=rnd(x,y);if(r>.67&&Math.hypot(x-1800,y-1080)>260)trees.push({x:x+(rnd(x+2,y)*20-10),y:y+(rnd(x+5,y)*20-10),v:r});}
for(let i=1100;i--;){flowers.push({x:30+rnd(i,3)*3540,y:30+rnd(i,9)*2140,t:i%8});}
for(let i=160;i--;){rocks.push({x:20+rnd(i,15)*3560,y:20+rnd(i,22)*2160,s:5+rnd(i,28)*7});}
for(let i=2100;i--;){grass.push({x:rnd(i,61)*W,y:rnd(i,73)*H,t:i%4});}
for(let i=80;i--;){mushrooms.push({x:rnd(i,81)*W,y:rnd(i,91)*H,t:i%3});}
for(let i=90;i--;){fireflies.push({x:rnd(i,31)*W,y:rnd(i,47)*H,p:rnd(i,53)*6.28});}
function R(x,y,w,h,col){g.fillStyle=col;g.fillRect(Math.floor(x),Math.floor(y),Math.ceil(w),Math.ceil(h))}
function poly(points,col){g.fillStyle=col;g.beginPath();g.moveTo(points[0],points[1]);for(let i=2;i<points.length;i+=2)g.lineTo(points[i],points[i+1]);g.closePath();g.fill()}
function path(x,y,w,h){R(x,y,w,h,'#795d43');R(x,y,w,5,'#a1815a');for(let i=0;i<w;i+=31){const n=rnd(x+i,y);R(x+i+8,y+14+n*20,4,3,'#5e4937');R(x+i+20,y+38+n*16,6,3,'#916f4e')}}
function grassland(){
 R(0,0,W,H,'#214b34');
 for(let y=0;y<H;y+=T)for(let x=0;x<W;x+=T){const n=rnd(x,y);R(x,y,T,T,n>.82?'#315f3c':n>.45?'#2b5738':'#274f36');if(n>.88)R(x+2,y+7,2,4,'#447548');if(n>.95)R(x+8,y+3,2,3,'#3b6d42')}
 grass.forEach(q=>{if(q.y>990&&q.y<1245)return;const col=['#376a3e','#427544','#315f3a','#4a7944'][q.t];R(q.x,q.y,2,5,col);R(q.x+3,q.y-2,2,4,col);R(q.x+6,q.y+1,2,4,col)});
 R(0,1430,W,270,'#315f7b');R(0,1430,W,7,'#79b4c1');R(0,1440,W,4,'#477d94');
 for(let x=0;x<W;x+=70){const n=rnd(x,4);R(x,1480+n*30,25,3,'#6e9fae');R(x+30,1550+n*20,15,3,'#467b91')}
 R(0,1416,W,16,'#37673e');R(0,1690,W,18,'#37683f');
 path(0,1040,1480,66);path(2120,1040,1480,66);path(1760,0,68,820);path(1760,1180,68,1020);path(620,480,1050,54);path(2780,480,700,54);
 R(1390,850,820,230,'#655f58');for(let y=860;y<1070;y+=28)for(let x=1400;x<2200;x+=34){const n=rnd(x,y);R(x,y,27,20,n>.5?'#777168':'#5a554f');R(x+4,y+3,18,3,'#8b8377')}
}
function cliff(x,y,w,h){R(x,y,w,h,'#302928');R(x+6,y+6,w-12,h-6,'#4a3934');for(let yy=y+24;yy<y+h;yy+=18)for(let xx=x+12;xx<x+w-10;xx+=26){const n=rnd(xx,yy);R(xx,yy,10+n*9,4,n>.52?'#60473b':'#292728');if(n>.78)R(xx+2,yy+7,7,2,'#755640')}R(x,y,w,6,'#557641');R(x+5,y-3,w-10,4,'#72934a')}
function tree(q){const s=1+(q.v-.67)*2.1,x=q.x,y=q.y;R(x-20*s,y+25*s,40*s,7,'#173a29');R(x-7*s,y+9*s,14*s,33*s,'#3a2823');R(x-3*s,y+15*s,7*s,28*s,'#68432b');R(x-1*s,y+21*s,3*s,17*s,'#825535');R(x-29*s,y-15*s,58*s,37*s,'#123425');R(x-22*s,y-30*s,45*s,31*s,'#1b482f');R(x-10*s,y-42*s,25*s,22*s,'#2a633a');R(x-21*s,y-13*s,15*s,9*s,'#367447');R(x+7*s,y-23*s,14*s,10*s,'#397a48');R(x-9*s,y-34*s,9*s,7*s,'#4b8950');R(x+14*s,y-5*s,8*s,6*s,'#285e39');if(q.v>.83){R(x-5*s,y-46*s,9*s,5*s,'#639858');R(x+6*s,y-39*s,7*s,5*s,'#4e8b4d')}}
function flower(q){const cols=['#f2cf63','#e987a3','#b99bea','#91d1cf','#f3e6c5','#df9d68','#d9b1e4','#e8d17d'];const col=cols[q.t];R(q.x,q.y,2,6,'#4d8548');R(q.x-3,q.y-2,3,3,col);R(q.x+2,q.y-2,3,3,col);R(q.x-1,q.y-5,3,3,col);R(q.x-1,q.y,3,3,q.t%2?'#e8c65d':'#fff1b0')}
function rock(q){R(q.x-9,q.y-4,18,10,'#454c52');R(q.x-6,q.y-9,12,6,'#737b82');R(q.x-7,q.y+5,15,4,'#2c3339');R(q.x-3,q.y-6,4,2,'#9ba0a4')}
function mushroom(q){const cols=['#c96858','#d2b05a','#9d6ac0'];R(q.x,q.y,3,9,'#d8c19b');R(q.x-5,q.y-1,13,5,cols[q.t]);R(q.x-3,q.y-4,9,4,cols[q.t]);R(q.x-1,q.y-2,2,2,'#f3e7c6')}
function sign(x,y,flip=false){R(x,y,7,34,'#533625');if(!flip){R(x-5,y,62,25,'#805331');R(x-1,y+4,54,16,'#a46d3d');R(x+8,y+7,32,3,'#d19a58')}else{R(x-48,y,62,25,'#805331');R(x-44,y+4,54,16,'#a46d3d');R(x-36,y+7,32,3,'#d19a58')}}
function house(x,y,roof){R(x,y+34,210,126,'#5d4032');R(x+9,y+45,192,115,'#78503a');for(let i=0;i<10;i++){R(x-10+i*22,y+8-(i%2)*3,32,28,'#30292f');R(x+i*22,y+7-(i%2)*3,26,5,roof)}R(x+78,y+91,52,69,'#30252a');R(x+90,y+105,27,55,'#473039');R(x+20,y+70,42,32,'#90c8ca');R(x+148,y+70,42,32,'#90c8ca');R(x+27,y+77,26,5,'#d7eeee');R(x+155,y+77,26,5,'#d7eeee');R(x+69,y+31,72,8,'#8b6244')}
function shrine(){const x=340,y=430;R(x-28,y+108,200,20,'#494542');R(x,y+86,150,22,'#6c665e');R(x+16,y+25,118,70,'#777066');R(x+36,y+10,78,26,'#8b8374');R(x+51,y-9,48,19,'#6d675e');R(x+56,y+25,38,48,'#5bb5c5');R(x+63,y+31,24,30,'#b5f1ed');R(x+47,y-3,56,5,'#c5a65a');R(x+69,y-30,14,20,'#856b48');R(x+62,y-38,28,9,'#c5a75e');const pulse=2+Math.sin(time*3)*2.5;R(x+55-pulse,y+18-pulse,2+pulse,2,'#9df6eb');R(x+108,y+48,2,2+pulse,'#9df6eb')}
function bridge(){R(1320,1430,960,70,'#3e2d25');for(let i=0;i<32;i++){R(1330+i*30,1432,23,66,'#8e603c');R(1333+i*30,1440,17,4,'#c18a52')}R(1318,1424,964,8,'#5a4636')}
function lantern(x,y){R(x,y,4,18,'#523725');R(x-5,y-5,14,9,'#77512f');R(x-2,y-2,8,4,'#ffd36a')}
function hero(){const x=p.x,y=p.y,phase=p.frame,m=p.walking;const bob=m&&phase===1?2:0;const leg=m?(phase===0?4:phase===2?-4:0):0,arm=m?(phase===0?-3:phase===2?3:0):0;R(x-19,y+29,38,7,'#183b2a');R(x-13+leg,y+14+bob,10,16,'#2a2e3d');R(x+3-leg,y+14+bob,10,16,'#292d3b');R(x-16+leg,y+27+bob,13,5,'#151922');R(x+3-leg,y+27+bob,13,5,'#151922');R(x-12,y-6+bob,24,23,'#2e5c99');R(x-8,y-10+bob,16,7,'#5c82b8');R(x-9,y+8+bob,18,9,'#213e6e');R(x-10,y-25+bob,20,19,'#e7ba8e');R(x-11,y-28+bob,22,7,'#3a2928');R(x-8,y-33+bob,16,7,'#50342d');R(x-4,y-30+bob,4,3,'#694536');R(x-6,y-19+bob,3,3,'#1b2230');R(x+3,y-19+bob,3,3,'#1b2230');R(x-16+arm,y-4+bob,5,18,'#e7ba8e');R(x+11-arm,y-4+bob,5,18,'#e7ba8e');R(x-18+arm,y+12+bob,8,6,'#2e5c99');R(x+10-arm,y+12+bob,8,6,'#2e5c99');if(p.dir==='left')R(x-13,y-19+bob,3,3,'#e7ba8e');if(p.dir==='right')R(x+10,y-19+bob,3,3,'#e7ba8e')}
function directionArrow(){const x=p.x,y=p.y-54;g.save();g.fillStyle='#f1f5f8';g.globalAlpha=.95;g.beginPath();if(p.dir==='up'){g.moveTo(x,y-9);g.lineTo(x-7,y);g.lineTo(x-3,y);g.lineTo(x-3,y+9);g.lineTo(x+3,y+9);g.lineTo(x+3,y);g.lineTo(x+7,y)}if(p.dir==='down'){g.moveTo(x,y+9);g.lineTo(x-7,y);g.lineTo(x-3,y);g.lineTo(x-3,y-9);g.lineTo(x+3,y-9);g.lineTo(x+3,y);g.lineTo(x+7,y)}if(p.dir==='left'){g.moveTo(x-9,y);g.lineTo(x,y-7);g.lineTo(x,y-3);g.lineTo(x+9,y-3);g.lineTo(x+9,y+3);g.lineTo(x,y+3);g.lineTo(x,y+7)}if(p.dir==='right'){g.moveTo(x+9,y);g.lineTo(x,y-7);g.lineTo(x,y-3);g.lineTo(x-9,y-3);g.lineTo(x-9,y+3);g.lineTo(x,y+3);g.lineTo(x,y+7)}g.closePath();g.fill();g.restore()}
function particles(){for(const f of fireflies){const yy=f.y+Math.sin(time*1.4+f.p)*9;if(Math.sin(time*2+f.p)>.45)R(f.x,yy,2,2,'#d7df9a')}}
function world(){grassland();cliff(2450,180,720,360);cliff(2820,1780,560,260);cliff(520,1750,600,250);R(690,1780,390,170,'#292426');R(730,1810,310,140,'#17191c');poly([770,1810,1000,1810,960,1760,820,1760],'#2b2525');flowers.forEach(f=>{if(f.y<1400||f.y>1710)flower(f)});rocks.forEach(rock);mushrooms.forEach(mushroom);trees.sort((a,b)=>a.y-b.y).forEach(tree);house(820,660,'#70444c');house(2450,600,'#5b4557');shrine();bridge();sign(530,980);sign(3060,980,true);lantern(700,1010);lantern(1120,1010);lantern(2300,1010);lantern(2760,1010);lantern(1750,780);lantern(1840,780);particles();hero();directionArrow()}
function updateUI(){chapterEl.innerHTML='CHAPTER '+(chapter+1)+' <div class="type">HUMAN ADVENTURER</div>';if(msgTimer>0){noticeEl.textContent=chapter===0?'An ancient power sleeps beneath the shrine...':'The road beyond the river leads to the unknown...';noticeEl.style.display='block'}else noticeEl.style.display='none';if(dialogue){dialogueEl.innerHTML=dialogue+'<span class="continue">SPACE &nbsp; CONTINUE</span>';dialogueEl.hidden=false}else dialogueEl.hidden=true}
function draw(){g.clearRect(0,0,c.width,c.height);const sx=Math.max(0,Math.min(W-c.width,p.x-c.width/2)),sy=Math.max(0,Math.min(H-c.height,p.y-c.height/2));g.save();g.translate(-sx,-sy);world();g.restore();updateUI()}
function update(dt){time+=dt;msgTimer=Math.max(0,msgTimer-dt);if(dialogue){if(keys[' ']){keys[' ']=false;if(chapter===0){chapter=1;dialogue='A voice whispers: “The Moon King has awakened.”'}else if(chapter===1){chapter=2;dialogue='Beyond the river lies a kingdom erased from every map.'}else dialogue=null;}}else{let dx=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0),dy=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);p.walking=!!(dx||dy);if(dx||dy){const n=Math.hypot(dx,dy);p.x+=dx/n*p.s*dt;p.y+=dy/n*p.s*dt;p.dir=Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up';p.frame=(p.frame+dt*8)%4|0}else p.frame=0;p.x=Math.max(35,Math.min(W-35,p.x));p.y=Math.max(45,Math.min(H-45,p.y));if(Math.hypot(p.x-405,p.y-430)<115&&chapter===0){dialogue='A mysterious light shines from the ancient shrine.';msgTimer=0}}}
let last=performance.now();function loop(now){const dt=Math.min(.033,(now-last)/1000);last=now;update(dt);draw();requestAnimationFrame(loop)}requestAnimationFrame(loop);