/* Moonwood atmosphere pass: lightweight pixel particles + village effects. */
(()=>{
'use strict';
if(typeof c==='undefined'||typeof g==='undefined'||typeof p==='undefined'||typeof W==='undefined')return;
const fx=document.createElement('canvas');fx.id='effects';fx.width=c.width;fx.height=c.height;fx.setAttribute('aria-hidden','true');
Object.assign(fx.style,{position:'absolute',inset:'0',width:'100%',height:'100%',pointerEvents:'none',imageRendering:'pixelated',zIndex:'2'});
const stage=document.getElementById('stage');if(!stage)return;stage.appendChild(fx);const x=fx.getContext('2d');x.imageSmoothingEnabled=false;
const particles=[];const N=46;for(let i=0;i<N;i++)particles.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*2,vy:-2-Math.random()*3,s:1+Math.random()*2,a:.12+Math.random()*.25,life:Math.random()*5});
const petals=[];for(let i=0;i<22;i++)petals.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:.4+Math.random()*.7,vy:.4+Math.random()*.9,phase:Math.random()*6.28});
function camera(){return window.moonwoodCamera?window.moonwoodCamera():{x:0,y:0}}
function worldToScreen(wx,wy){const q=camera();let sx=wx-q.x,sy=wy-q.y;sy=(sy-(c.height/2+10))*.86+(c.height/2+10);return{x:sx,y:sy}}
function px(X,Y,w,h,col,a=1){x.globalAlpha=a;x.fillStyle=col;x.fillRect(X|0,Y|0,Math.max(1,w|0),Math.max(1,h|0))}
function glow(sx,sy,r,col,a){x.globalAlpha=a;x.fillStyle=col;x.fillRect((sx-r)|0,(sy-r)|0,(r*2)|0,(r*2)|0)}
function frame(t){
 const dt=Math.min(.04,(t-(frame.last||t))/1000);frame.last=t;x.clearRect(0,0,fx.width,fx.height);
 for(const q of particles){q.x+=q.vx*dt*12;q.y+=q.vy*dt*8;q.life-=dt;if(q.y<-5||q.life<0){q.x=Math.random()*fx.width;q.y=fx.height+Math.random()*20;q.life=4+Math.random()*6}px(q.x,q.y,q.s,q.s,'#e8d99b',q.a)}
 for(let i=0;i<petals.length;i++){const q=petals[i];q.x+=q.vx*dt*14;q.y+=q.vy*dt*10;q.phase+=dt*2.2;if(q.x>fx.width+8||q.y>fx.height+8){q.x=-8;q.y=Math.random()*fx.height*.72}if(i%3!==0)px(q.x+Math.sin(q.phase)*2,q.y,3,2,'#efb8ca',.42);else px(q.x,q.y,2,2,'#f5d2dd',.52)}
 const sh=worldToScreen(412,460),pulse=.5+.5*Math.sin(t*.0025);if(sh.x>-40&&sh.x<fx.width+40&&sh.y>-40&&sh.y<fx.height+40){const r=18+pulse*8;x.globalAlpha=.08+pulse*.04;x.fillStyle='#8ee8d7';x.beginPath();x.arc(sh.x,sh.y,r,0,Math.PI*2).fill();px(sh.x-1,sh.y-1,3,3,'#d5fff4',.7);px(sh.x-8,sh.y-2,2,2,'#9df6eb',.45);px(sh.x+7,sh.y+5,2,2,'#9df6eb',.45)}
 const lamps=[[2600,1100],[2740,1100],[2895,1050],[3045,1050],[3150,1130],[3300,1200],[1950,1075],[2150,1075],[2350,1075]];for(let i=0;i<lamps.length;i++){const s=worldToScreen(lamps[i][0],lamps[i][1]),pulse=.5+.5*Math.sin(t*.003+i*.8);if(s.x>-20&&s.x<fx.width+20&&s.y>-20&&s.y<fx.height+20){glow(s.x,s.y-3,4,'#f2b85e',.035+.025*pulse);px(s.x-2,s.y-5,4,4,'#ffd47a',.22+.12*pulse);if(i<6&&pulse>.72)px(s.x+5,s.y-9,2,2,'#ffe6a3',.55)}}
 const q=camera();if(q.y<1750&&q.y+fx.height>880){for(let i=0;i<18;i++){const wx=2250+i*71+Math.sin(t*.001+i)*18,wy=1335+((i*43)%120),s=worldToScreen(wx,wy);if(s.x>-10&&s.x<fx.width+10&&s.y>-10&&s.y<fx.height+10)px(s.x,s.y,7+(i%3)*3,2,'#b6e3dc',.18+.12*Math.sin(t*.003+i))}}
 const grd=x.createRadialGradient(fx.width/2,fx.height/2,Math.min(fx.width,fx.height)*.28,fx.width/2,fx.height/2,Math.max(fx.width,fx.height)*.72);grd.addColorStop(0,'rgba(0,0,0,0)');grd.addColorStop(1,'rgba(5,9,12,.28)');x.fillStyle=grd;x.fillRect(0,0,fx.width,fx.height);
 requestAnimationFrame(frame)
}
window.moonwoodEffects={particles:true,shrineGlow:true,waterGlints:true,villageGlows:true,sakuraPetals:true,vignette:true};requestAnimationFrame(frame);
})();
