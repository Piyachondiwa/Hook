/* Moonwood atmosphere pass: lightweight pixel particles + lighting effects. */
(()=>{
'use strict';
if(typeof c==='undefined'||typeof g==='undefined'||typeof p==='undefined'||typeof W==='undefined')return;
const fx=document.createElement('canvas');fx.id='effects';fx.width=c.width;fx.height=c.height;fx.setAttribute('aria-hidden','true');
Object.assign(fx.style,{position:'absolute',inset:'0',width:'100%',height:'100%',pointerEvents:'none',imageRendering:'pixelated',zIndex:'2'});
const stage=document.getElementById('stage');if(!stage)return;stage.appendChild(fx);const x=fx.getContext('2d');x.imageSmoothingEnabled=false;
const particles=[];const N=46;
for(let i=0;i<N;i++)particles.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*2,vy:-2-Math.random()*3,s:1+Math.random()*2,a:.12+Math.random()*.25,life:Math.random()*5});
function camera(){return window.moonwoodCamera?window.moonwoodCamera():{x:0,y:0}}
function worldToScreen(wx,wy){const q=camera();return{x:wx-q.x,y:wy-q.y}}
function px(X,Y,w,h,col,a=1){x.globalAlpha=a;x.fillStyle=col;x.fillRect(X|0,Y|0,w|0,h|0)}
function frame(t){
 const dt=Math.min(.04,(t-(frame.last||t))/1000);frame.last=t;x.clearRect(0,0,fx.width,fx.height);
 /* Floating dust / pollen, sparse enough to stay cheap. */
 for(const q of particles){q.x+=q.vx*dt*12;q.y+=q.vy*dt*8;q.life-=dt;if(q.y<-5||q.life<0){q.x=Math.random()*fx.width;q.y=fx.height+Math.random()*20;q.life=4+Math.random()*6}px(q.x,q.y,q.s,q.s,'#e8d99b',q.a)}
 /* Shrine glow follows its fixed world position. */
 const sh=worldToScreen(412,460),pulse=0.5+0.5*Math.sin(t*.0025);
 if(sh.x>-40&&sh.x<fx.width+40&&sh.y>-40&&sh.y<fx.height+40){
   const r=18+pulse*8;x.globalAlpha=.08+pulse*.04;x.fillStyle='#8ee8d7';x.beginPath();x.arc(sh.x,sh.y,r,0,Math.PI*2);x.fill();
   px(sh.x-1,sh.y-1,3,3,'#d5fff4',.7);px(sh.x-8,sh.y-2,2,2,'#9df6eb',.45);px(sh.x+7,sh.y+5,2,2,'#9df6eb',.45);
 }
 /* Water glints: only a few animated pixel strokes. */
 const q=camera();if(q.y<1700&&q.y+fx.height>1430){for(let i=0;i<13;i++){const wx=35+i*287+Math.sin(t*.001+i)*18,wy=1465+((i*47)%190);const s=worldToScreen(wx,wy);if(s.x>-10&&s.x<fx.width+10&&s.y>-10&&s.y<fx.height+10){px(s.x,s.y,7+(i%3)*3,2,'#b6e3dc',.22+.12*Math.sin(t*.003+i))}}}
 /* Soft pixel-vignette keeps the scene focused without blur. */
 const grd=x.createRadialGradient(fx.width/2,fx.height/2,Math.min(fx.width,fx.height)*.28,fx.width/2,fx.height/2,Math.max(fx.width,fx.height)*.72);grd.addColorStop(0,'rgba(0,0,0,0)');grd.addColorStop(1,'rgba(5,9,12,.28)');x.fillStyle=grd;x.fillRect(0,0,fx.width,fx.height);
 requestAnimationFrame(frame)
}
window.moonwoodEffects={particles:true,shrineGlow:true,waterGlints:true,vignette:true};requestAnimationFrame(frame);
})();
