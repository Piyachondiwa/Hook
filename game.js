const c=document.getElementById('game'),g=c.getContext('2d');g.imageSmoothingEnabled=false;
const chapterEl=document.getElementById('chapter'),noticeEl=document.getElementById('notice'),dialogueEl=document.getElementById('dialogue'),treeInfoEl=document.getElementById('treeInfo');
const keys={};let time=0,chapter=0,dialogue=null,msgTimer=5,nearTree=null;
addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(k!=='e')keys[k]=true;if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(k))e.preventDefault()});
addEventListener('keyup',e=>{const k=e.key.toLowerCase();if(k!=='e')keys[k]=false});
c.width=640;c.height=360;
const W=5400,H=2500,p={x:1800,y:1160,s:175,dir:'down',frame:0,walking:false},seed=91827;
const species=[
  ['ต้นทองหลาง','Erythrina variegata','ไม้ยืนต้น พบได้ในพื้นที่ราบและริมน้ำ','ไทย • เอเชียตะวันออกเฉียงใต้'],
  ['ต้นอินทนิลน้ำ','Lagerstroemia speciosa','ไม้ยืนต้น ดอกสีม่วง ออกดอกช่วงร้อน','ไทย • เอเชียใต้'],
  ['ต้นตะแบก','Lagerstroemia floribunda','ไม้ยืนต้นผลัดใบ เปลือกมีลวดลาย','ไทย • อินโดจีน'],
  ['ต้นพะยอม','Shorea roxburghii','ไม้ป่าดิบแล้ง เนื้อไม้แข็ง ดอกมีกลิ่นหอม','ไทย • เอเชียใต้']
];
const solids=[[1320,1250,960,120],[2570,1290,180,105],[2780,1200,160,105]];
const trees=[];
for(let i=0;i<42;i++){const x=180+(i*317)%3180,y=220+(i*193)%1750,sc=0.7+((i%5)*0.08);trees.push({x,y,s:sc,type:species[i%species.length][0],info:species[i%species.length]})}
function R(x,y,w,h,c){g.fillStyle=c;g.fillRect(x,y,w,h)}
function noise(x,y){const n=Math.sin(x*12.9898+y*78.233+seed)*43758.5453;return n-Math.floor(n)}
function treeScale(t){return t.s||1}
function world(){
  if(typeof window.drawOcean==='function')window.drawOcean();else R(0,0,W,H,'#0b3b46');
  for(let y=0;y<H;y+=64){for(let x=0;x<W;x+=64){const n=noise(x,y);R(x,y,64,64,n>.5?'#4b7542':'#557e48');if(n>.7)R(x+12,y+14,5,5,'#6f9252')}}
  /* old-world road to the bridge */
  R(1290,1418,1035,94,'#916848');R(1480,1405,15,120,'#b28a5d');R(1810,1410,17,110,'#b28a5d');R(2140,1410,13,110,'#b28a5d');
  for(const q of solids){R(q[0],q[1],q[2],q[3],'#334535');R(q[0]+10,q[1]+10,q[2]-20,8,'#566a49')}
  for(const t of trees){const s=treeScale(t);R(t.x-12*s,t.y+39*s,24*s,9,'#293a28');R(t.x-7*s,t.y+24*s,14*s,24*s,'#5b402d');R(t.x-24*s,t.y,48*s,40*s,'#274b30');R(t.x-16*s,t.y-11*s,32*s,16*s,'#35633b');if(Math.floor(t.x)%3===0)R(t.x+17*s,t.y+8*s,6*s,4,'#7b9a55')}
  /* bridge */
  R(3285,1035,435,130,'#594033');for(let x=3300;x<3710;x+=28){R(x,1044,20,112,'#9b6944');R(x+2,1048,15,4,'#c78c58');R(x+4,1059,2,80,'#6a4733')}R(3276,1025,22,150,'#392b26');R(3707,1025,22,150,'#392b26');
  /* Japanese island base */
  R(3670,630,1440,1140,'#71855a');
  R(3670,630,1440,14,'#b9a969');R(3670,1756,1440,14,'#5b6646');
  R(3658,1018,1437,184,'#a27d58');
  R(3690,1108,1400,18,'#be9568');
  for(const fx of [3730,3985,4255,4525,4805]){R(fx,1235,190+(fx>3900?15:0),125,'#8d8e45');for(let x=fx+8;x<fx+185;x+=20)for(let y=1240;y<1350;y+=18){R(x,y,3,8,'#b9bc55');R(x+4,y-3,2,5,'#d2c969')}}
  for(let x=3725;x<4990;x+=62){R(x,1217,48,5,'#6a513a');R(x+4,1351,48,5,'#6a513a')}
  /* village structures */
  const houses=[[3730,845,170,105],[3925,845,175,105],[4130,845,175,105],[4410,845,175,105],[4635,845,175,105],[3810,962,130,82],[4550,962,130,82],[4225,690,112,110]];
  for(const q of houses){R(q[0],q[1],q[2],q[3],'#77513b');R(q[0]-8,q[1]-14,q[2]+16,18,'#5b3930');R(q[0]+22,q[1]+30,34,32,'#caa56b');R(q[0]+80,q[1]+60,26,28,'#394334')}
  /* shrine */
  R(4250,735,62,24,'#5c3d31');R(4260,703,42,32,'#b64f48');R(4270,680,22,25,'#d3b26d');
  /* Japanese trees and sakura-like accents */
  const island=window.moonwoodIslandTreePositions||[];for(const t of island){const s=t.s||1;R(t.x-10*s,t.y+35*s,20*s,8,'#3c4d32');R(t.x-6*s,t.y+18*s,12*s,20*s,'#5a4030');R(t.x-23*s,t.y,46*s,34*s,'#345c3b');if(t.type==='sakura')R(t.x-15*s,t.y+4*s,9*s,6,'#d89ba8');}
}
function bridgeOpen(x,y){return x>=1320&&x<=3720&&y>=1000&&y<=1195}
function blockedBase(x,y){const r=15;if(x<r||y<r||x>W-r||y>H-r)return true;for(const q of solids)if(x+r>=q[0]&&x-r<=q[0]+q[2]&&y+r>=q[1]&&y-r<=q[1]+q[3])return true;for(const t of trees){const s=treeScale(t);if(Math.hypot(x-t.x,y-(t.y+42*s))<15+12*s)return true}return false}
function blocked(x,y){return blockedBase(x,y)}
function move(dx,dy){const ox=p.x,oy=p.y;const nx=p.x+dx;if(!blocked(nx,p.y))p.x=nx;const ny=p.y+dy;if(!blocked(p.x,ny))p.y=ny;if(blocked(p.x,p.y)){p.x=ox;p.y=oy}}
function closestTree(){let best=null,d0=150;for(const t of trees){const d=Math.hypot(p.x-t.x,p.y-(t.y+42*treeScale(t)));if(d<d0){d0=d;best=t}}return best}
function hero(){
  const bob=p.walking?Math.sin(p.frame*Math.PI*.5)*3:0, x=p.x, y=p.y+bob, s=p.s/175;
  const skin='#d49a78',hair='#d8dde5',coat='#28354a',pants='#1e2738',boot='#402f2a';
  R(x-13*s,y+28*s,26*s,7*s,'#17222a');
  R(x-7*s,y+30*s,6*s,18*s,pants);R(x+1*s,y+30*s,6*s,18*s,pants);
  const leg=(p.walking?(p.frame%2?-4:4):0)*s;R(x-9*s+leg,y+45*s,8*s,11*s,boot);R(x+1*s-leg,y+45*s,8*s,11*s,boot);
  R(x-12*s,y+11*s,24*s,21*s,coat);R(x-15*s,y+13*s,5*s,18*s,skin);R(x+10*s,y+13*s,5*s,18*s,skin);
  R(x-9*s,y-2*s,18*s,15*s,skin);R(x-10*s,y-5*s,20*s,9*s,hair);R(x-7*s,y-10*s,14*s,8*s,hair);
  if(p.dir==='left')R(x-8*s,y+4*s,3*s,2*s,'#25303a');else if(p.dir==='right')R(x+5*s,y+4*s,3*s,2*s,'#25303a');else R(x-5*s,y+3*s,3*s,2*s,'#25303a');
  if(p.walking){const arm=(p.frame%2?-3:3)*s;R(x-16*s,y+14*s+arm,6*s,6*s,coat);R(x+10*s,y+14*s-arm,6*s,6*s,coat)}
}
function arrow(){R(p.x-4,p.y+58,8,3,'#e5c070');R(p.x+4,p.y+55,7,3,'#e5c070')}
function updateUI(){chapterEl.innerHTML='CHAPTER '+(chapter+1)+' <div class="type">HUMAN ADVENTURER</div>';noticeEl.style.display=msgTimer>0?'block':'none';if(msgTimer>0)noticeEl.textContent=chapter===0?'An ancient power sleeps beneath the shrine...':'The road beyond the river leads to the unknown...';dialogueEl.hidden=!dialogue;if(dialogue)dialogueEl.innerHTML=dialogue+'<span class="continue">SPACE &nbsp; CONTINUE</span>'}
function update(dt){time+=dt;msgTimer=Math.max(0,msgTimer-dt);nearTree=closestTree();if(dialogue){p.walking=false;if(keys[' ']){keys[' ']=false;if(chapter===0){chapter=1;dialogue='A voice whispers: “The Moon King has awakened.”'}else if(chapter===1){chapter=2;dialogue='Beyond the river lies a kingdom erased from every map.'}else dialogue=null}}else{let dx=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0),dy=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);p.walking=!!(dx||dy);if(dx||dy){const n=Math.hypot(dx,dy);dx/=n;dy/=n;move(dx*p.s*dt,dy*p.s*dt);p.dir=Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up';p.frame=(p.frame+dt*9)%4|0}else p.frame=0}}
function draw(){g.clearRect(0,0,c.width,c.height);const sx=Math.max(0,Math.min(W-c.width,p.x-c.width/2)),sy=Math.max(0,Math.min(H-c.height,p.y-c.height*.6));g.save();g.translate(-sx,-sy);world();hero();arrow();g.restore();updateUI()}
let last=performance.now();function loop(now){const dt=Math.min(.033,(now-last)/1000);last=now;draw();update(dt);requestAnimationFrame(loop)}
window.moonwoodTrees=trees;
window.moonwoodCamera=()=>({x:Math.max(0,Math.min(W-c.width,p.x-c.width/2)),y:Math.max(0,Math.min(H-c.height,p.y-c.height*.6)),scaleY:1});
window.moonwoodState=()=>({hp:100,maxHp:100,mana:100,maxMana:100,stamina:100,maxStamina:100,chapter,nearTree:!!nearTree,treeName:nearTree?.info?.[0]||'',treeOpen:false,walking:p.walking});
requestAnimationFrame(loop);