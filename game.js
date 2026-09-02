const c=document.getElementById('game'),g=c.getContext('2d');
g.imageSmoothingEnabled=false;
const chapterEl=document.getElementById('chapter'),noticeEl=document.getElementById('notice'),dialogueEl=document.getElementById('dialogue');
const keys={};
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(e.key.toLowerCase()))e.preventDefault()});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
const W=2400,H=1500;
const p={x:1190,y:760,s:150,dir:'down',frame:0,walking:false};
let chapter=0,msgTimer=5,dialogue=null,time=0;
const seed=7319;
const trees=[],flowers=[],rocks=[],fireflies=[],grassTufts=[];
function rnd(x,y){const n=Math.sin(x*12.9898+y*78.233+seed)*43758.5453;return n-Math.floor(n)}
for(let y=50;y<H-50;y+=42)for(let x=50;x<W-50;x+=42){const r=rnd(x,y);if(r>.64&&Math.hypot(x-1190,y-760)>210)trees.push({x:x+(rnd(x+2,y)*18-9),y:y+(rnd(x+5,y)*18-9),v:r});}
for(let i=0;i<620;i++)flowers.push({x:30+rnd(i,3)*2340,y:30+rnd(i,9)*1440,t:i%7});
for(let i=0;i<110;i++)rocks.push({x:20+rnd(i,15)*2360,y:20+rnd(i,22)*1460,s:5+rnd(i,28)*6});
for(let i=0;i<1200;i++)grassTufts.push({x:rnd(i,61)*W,y:rnd(i,73)*H,t:i%3});
for(let i=0;i<70;i++)fireflies.push({x:rnd(i,31)*W,y:rnd(i,47)*H,p:rnd(i,53)*6.28});
function R(x,y,w,h,col){g.fillStyle=col;g.fillRect(Math.floor(x),Math.floor(y),Math.ceil(w),Math.ceil(h))}
function tile(x,y,col){R(x*12,y*12,12,12,col)}
function pathRect(x,y,w,h){R(x,y,w,h,'#806448');R(x,y,w,3,'#a17e55');for(let i=0;i<Math.floor(w/30);i++){R(x+12+i*31,y+12+(i%3)*8,4,2,'#684e39');R(x+24+i*29,y+31+(i%2)*7,3,2,'#9a7951')}}
function drawGrass(){
 R(0,0,W,H,'#244b34');
 for(let y=0;y<H;y+=12)for(let x=0;x<W;x+=12){let n=rnd(x,y);tile(x/12,y/12,n>.80?'#32633d':n>.42?'#2b5838':'#285137');if(n>.86)R(x+2,y+8,2,3,'#477b48');if(n>.94)R(x+7,y+3,2,2,'#396c41');}
 grassTufts.forEach(q=>{if(q.y<990||q.y>1185){const col=q.t===0?'#3f7043':q.t===1?'#477a46':'#35663d';R(q.x,q.y,2,5,col);R(q.x+3,q.y-2,2,4,col);R(q.x+6,q.y+1,2,4,col)}});
 R(0,1000,W,175,'#44728e');R(0,1000,W,5,'#86bec9');R(0,1007,W,3,'#2f596e');
 for(let x=0;x<W;x+=48){R(x,1022+(x%4)*9,18,2,'#6d9baa');R(x+24,1090+(x%3)*8,11,2,'#3d6679')}
 R(0,988,W,12,'#3d7043');R(0,1175,W,12,'#396b40');
 pathRect(0,720,1030,58);pathRect(1280,720,1120,58);pathRect(1140,0,58,650);pathRect(1140,820,58,680);
 R(360,430,760,34,'#70685a');for(let x=370;x<1120;x+=34){R(x,436,25,21,'#8a8170');R(x+5,439,17,3,'#aaa08b');R(x+4,458,15,3,'#625b51')}
}
function cliff(x,y,w,h){
 R(x,y,w,h,'#342c2a');R(x+5,y+5,w-10,h-5,'#51403a');R(x+10,y+10,w-20,8,'#7d5d45');
 for(let yy=y+25;yy<y+h;yy+=18)for(let xx=x+12;xx<x+w-8;xx+=24){let n=rnd(xx,yy);R(xx,yy,12+n*7,4,n>.5?'#624b3e':'#2c2828');if(n>.72)R(xx+2,yy+7,6,2,'#7a5b43');}
 R(x,y,w,5,'#5c7842');R(x+4,y-3,w-8,4,'#76964c');
}
function tree(q){
 const s=1+(q.v-.64)*1.8,x=q.x,y=q.y;
 R(x-5*s,y+12*s,10*s,24*s,'#3b2924');R(x-2*s,y+16*s,5*s,19*s,'#68422b');R(x-1*s,y+20*s,3*s,11*s,'#805535');
 R(x-25*s,y-14*s,50*s,35*s,'#153828');R(x-19*s,y-28*s,38*s,29*s,'#1d4b31');R(x-8*s,y-39*s,20*s,20*s,'#2b653c');
 R(x-18*s,y-13*s,13*s,8*s,'#367447');R(x+7*s,y-21*s,12*s,9*s,'#3a7b4a');R(x-8*s,y-32*s,8*s,6*s,'#4d8b51');
 R(x-27*s,y+2*s,7*s,4*s,'#102f23');R(x+15*s,y-2*s,7*s,4*s,'#112f23');
 if(q.v>.82)R(x-4*s,y-44*s,8*s,5*s,'#5a9655');
}
function flower(q){const cols=['#f0c85a','#e98aa4','#bda1ed','#9bd6d1','#f5e6c1','#d99c65','#e6b7d8'];const col=cols[q.t];R(q.x,q.y,2,5,'#4d8a48');R(q.x-3,q.y-2,3,3,col);R(q.x+2,q.y-2,3,3,col);R(q.x-1,q.y-5,3,3,col);R(q.x-1,q.y,3,3,'#e6c66b')}
function rock(q){R(q.x-8,q.y-4,16,9,'#48505a');R(q.x-5,q.y-8,11,5,'#707984');R(q.x-7,q.y+5,14,3,'#303840');R(q.x-3,q.y-6,4,2,'#9098a0')}
function sign(x,y,text='→'){R(x,y,8,35,'#563725');R(x-4,y,58,24,'#8a5b36');R(x-1,y+4,50,16,'#a87040');R(x+6,y+6,34,2,'#d09a5e');R(x+12,y+10,4,2,'#7a492f');}
function house(x,y){
 R(x,y+25,190,105,'#604333');R(x+8,y+35,174,95,'#79513a');
 for(let i=0;i<9;i++){R(x-7+i*22,y+5-i%2*2,30,25,'#392b31');R(x+i*22,y+4-i%2*2,24,5,'#71444a')}
 R(x+72,y+70,46,60,'#30262a');R(x+83,y+82,24,48,'#44313a');R(x+20,y+58,36,28,'#91c5c6');R(x+132,y+58,36,28,'#91c5c6');
 R(x+27,y+64,20,5,'#d7eeee');R(x+139,y+64,20,5,'#d7eeee');R(x+63,y+20,64,8,'#8d6445');
}
function shrine(){
 const x=330,y=330;R(x-20,y+100,190,18,'#504944');R(x,y+80,150,20,'#6f675d');R(x+16,y+20,118,70,'#777064');
 R(x+36,y+8,78,25,'#8b8374');R(x+51,y-10,48,18,'#6e685d');R(x+57,y+22,36,46,'#71bfd0');R(x+63,y+28,24,28,'#b3f0ed');R(x+46,y-3,58,5,'#c9a85a');
 R(x+70,y-30,12,20,'#8d7148');R(x+64,y-38,24,9,'#c7a75a');
 const pulse=2+Math.sin(time*3)*2;R(x+55-pulse,y+18-pulse,2+pulse,2,'#8ff5e9');R(x+108,y+48,2,2+pulse,'#8ff5e9');
}
function bridge(){R(1010,1005,390,62,'#493326');for(let i=0;i<13;i++){R(1018+i*30,1007,22,58,'#9a6840');R(1021+i*30,1015,16,4,'#c08b55');}R(1008,1000,394,7,'#5f4935')}
function hero(){
 const moving=p.walking,phase=p.frame,x=p.x,y=p.y;
 const bob=moving?(phase===1?1:0):0;
 const legA=moving&&phase===0?3:moving&&phase===2?-3:0;
 const legB=-legA;
 const armA=moving&&phase===0?-2:moving&&phase===2?2:0;
 const armB=-armA;
 R(x-12,y+27,24,5,'#172b20');
 R(x-12+legA,y+14+bob,9,13,'#292c3b');R(x+3+legB,y+14+bob,9,13,'#292c3b');R(x-14+legA,y+25+bob,12,4,'#171a25');R(x+3+legB,y+25+bob,12,4,'#171a25');
 R(x-11,y-3+bob,22,21,'#315e9a');R(x-7,y-8+bob,14,8,'#5e83b9');R(x-9,y+8+bob,18,9,'#243f70');
 R(x-9,y-20+bob,18,17,'#e6b98e');R(x-10,y-23+bob,20,7,'#3a2929');R(x-7,y-27+bob,15,7,'#51332b');R(x-5,y-25+bob,4,3,'#694333');
 R(x-6,y-14+bob,3,3,'#1b2230');R(x+3,y-14+bob,3,3,'#1b2230');R(x-15+armA,y-2+bob,4,17,'#e6b98e');R(x+11+armB,y-2+bob,4,17,'#e6b98e');
 R(x-17+armA,y+13+bob,7,5,'#315e9a');R(x+10+armB,y+13+bob,7,5,'#315e9a');
 if(p.dir==='right'){R(x+15,y+1+bob,6,4,'#d7b45e');R(x+20,y+bob,3,17,'#a87c40')}
 if(p.dir==='left'){R(x-21,y+1+bob,6,4,'#d7b45e');R(x-23,y+bob,3,17,'#a87c40')}
}
function directionArrow(){
 const x=p.x,y=p.y-43;
 g.save();
 g.globalAlpha=.9;
 if(p.dir==='up')g.fillStyle='#d8e4ef';
 else if(p.dir==='down')g.fillStyle='#d8e4ef';
 else g.fillStyle='#d8e4ef';
 g.beginPath();
 if(p.dir==='up'){g.moveTo(x,y-8);g.lineTo(x-6,y);g.lineTo(x-2,y);g.lineTo(x-2,y+9);g.lineTo(x+2,y+9);g.lineTo(x+2,y);g.lineTo(x+6,y);}
 if(p.dir==='down'){g.moveTo(x,y+8);g.lineTo(x-6,y);g.lineTo(x-2,y);g.lineTo(x-2,y-9);g.lineTo(x+2,y-9);g.lineTo(x+2,y);g.lineTo(x+6,y);}
 if(p.dir==='left'){g.moveTo(x-8,y);g.lineTo(x,y-6);g.lineTo(x,y-2);g.lineTo(x+9,y-2);g.lineTo(x+9,y+2);g.lineTo(x,y+2);g.lineTo(x,y+6);}
 if(p.dir==='right'){g.moveTo(x+8,y);g.lineTo(x,y-6);g.lineTo(x,y-2);g.lineTo(x-9,y-2);g.lineTo(x-9,y+2);g.lineTo(x,y+2);g.lineTo(x,y+6);}
 g.closePath();g.fill();
 g.globalAlpha=.25;g.fillStyle='#ffffff';g.fillRect(x-1,y-1,2,2);g.restore();
}
function particles(){for(const f of fireflies){const yy=f.y+Math.sin(time*1.4+f.p)*8;if(Math.sin(time*2+f.p)>.35)R(f.x,yy,2,2,'#d8dc87')}}
function world(){
 drawGrass();cliff(1540,180,510,250);cliff(1670,1230,440,180);R(720,1210,300,140,'#30282a');R(760,1235,220,115,'#181c20');R(835,1260,70,90,'#392b24');
 flowers.forEach(f=>{if(f.y<1000||f.y>1180)flower(f)});rocks.forEach(rock);trees.sort((a,b)=>a.y-b.y).forEach(tree);
 house(760,545);house(1460,470);shrine();bridge();sign(520,650);sign(1820,650);
 [[740,700],[950,700],[1280,700],[1450,700],[1380,980]].forEach(([x,y])=>{R(x,y,4,18,'#4a3326');R(x-4,y-3,12,7,'#7c5934');R(x-2,y-1,8,4,'#ffd66a')});
 particles();hero();directionArrow();
}
function updateUI(){chapterEl.innerHTML='CHAPTER '+(chapter+1)+' <div class="type">HUMAN ADVENTURER</div>';if(msgTimer>0){noticeEl.textContent=chapter===0?'An ancient power sleeps beneath the shrine...':'The road beyond the river leads to the unknown...';noticeEl.style.display='block'}else noticeEl.style.display='none';if(dialogue){dialogueEl.innerHTML=dialogue+'<span class="continue">SPACE &nbsp; CONTINUE</span>';dialogueEl.hidden=false}else dialogueEl.hidden=true}
function draw(){g.clearRect(0,0,c.width,c.height);const sx=Math.max(0,Math.min(W-c.width,p.x-c.width/2)),sy=Math.max(0,Math.min(H-c.height,p.y-c.height/2));g.save();g.translate(-sx,-sy);world();g.restore();updateUI()}
function update(dt){
 time+=dt;msgTimer=Math.max(0,msgTimer-dt);
 if(dialogue){if(keys[' ']){keys[' ']=false;if(chapter===0){chapter=1;dialogue='A voice whispers: “The Moon King has awakened.”'}else if(chapter===1){chapter=2;dialogue='Beyond the river lies a kingdom erased from every map.'}else dialogue=null;}}
 else{
  let dx=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0),dy=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);
  p.walking=!!(dx||dy);
  if(dx||dy){const n=Math.hypot(dx,dy);p.x+=dx/n*p.s*dt;p.y+=dy/n*p.s*dt;p.dir=Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up';p.frame=(p.frame+dt*7)%4|0}
  else p.frame=0;
  p.x=Math.max(30,Math.min(W-30,p.x));p.y=Math.max(40,Math.min(H-40,p.y));
  if(Math.hypot(p.x-405,p.y-320)<105&&chapter===0){dialogue='A mysterious light shines from the ancient shrine.';msgTimer=0}
 }
}
let last=performance.now();function loop(now){const dt=Math.min(.033,(now-last)/1000);last=now;update(dt);draw();requestAnimationFrame(loop)}requestAnimationFrame(loop);