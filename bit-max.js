/* Moonwood BIT MAX: deterministic high-density pixel finishing pass. */
(()=>{'use strict';
if(typeof R==='undefined'||typeof p==='undefined'||typeof hero!=='function')return;
const px=[];
for(let i=0;i<1500;i++){
  const x=3655+((i*97)%1390),y=655+((i*61)%1080);
  const n=(Math.sin(i*17.173)*43758.5453)%1;
  const f=n<0?n+1:n;
  if((y>1035&&y<1160)||(y>1208&&y<1405)||(x>3740&&x<4980&&y>835&&y<1015))continue;
  px.push({x,y,n:f});
}
const water=[];
for(let i=0;i<260;i++)water.push({x:(i*137)%5350+20,y:(i*71)%2450+20,n:(Math.sin(i*9.17)*.5+.5)});
function B(x,y,w,h,c){R(x|0,y|0,w|0,h|0,c)}
function detail(){
  /* island edge: stepped shoreline instead of a flat rectangle */
  for(let i=0;i<90;i++){
    const x=3660+(i*17)%1370;
    B(x,650+(i%3)*2,4+(i%4),2,'#c7b36d');
    B(x,1728+(i%4),5+(i%3),2,'#8d8357');
  }
  /* dense but sparse-enough ground pixels */
  for(const q of px){
    const c=q.n<.24?'#596f45':q.n<.43?'#7f9252':q.n<.61?'#a7aa62':q.n<.76?'#b98f58':q.n<.90?'#d39aaa':'#d8b05d';
    const s=q.n>.82?3:2;
    B(q.x,q.y,s,s,c);
    if(q.n>.91)B(q.x+3,q.y-2,2,2,'#e6c987');
  }
  /* rice texture, aligned to rows so it reads as farmland rather than noise */
  for(let f=0;f<5;f++){
    const fx=[3730,3990,4260,4530,4810][f],fw=[190,205,210,245,170][f];
    for(let x=fx+11;x<fx+fw-8;x+=18)for(let y=1236;y<1343;y+=18){
      const n=(Math.sin(x*12.1+y*4.7+f)*.5+.5);
      B(x,y,2,7,n>.45?'#c7c55b':'#8c9640');
      if(n>.72)B(x+3,y-2,2,5,'#e0d56e');
    }
  }
  /* path wear and stepping stones */
  for(let x=3705;x<4930;x+=37){
    const n=Math.sin(x*3.71)*.5+.5;
    B(x,1100+(n*25|0),7,3,n>.5?'#b58b5c':'#72523c');
  }
  for(let x=4254;x<4300;x+=11)B(x,742,4,4,'#b9a276');
  for(let y=1345;y<1560;y+=31)B(4260+(Math.sin(y)*8|0),y,5,3,'#b28c5f');
  /* bridge hardware and plank grain */
  for(let x=3390;x<3790;x+=23){B(x,1103,15,2,'#d39a5e');B(x+4,1112,2,52,'#4a3024');B(x+13,1116,2,48,'#875936')}
  for(let x=3400;x<3790;x+=74){B(x,1077,7,3,'#e0b06e');B(x+7,1250,7,3,'#4a3024')}
  /* tiny water glints outside the play lanes */
  for(const q of water){
    if(q.x>3300&&q.x<5100&&q.y>600&&q.y<1800)continue;
    if(q.n>.55){B(q.x,q.y,3+(q.n*4|0),2,'#5da5ad');if(q.n>.83)B(q.x+4,q.y-2,2,1,'#9bcfd0')}
  }
}
const originalHero=hero;
hero=function(){detail();originalHero()};
window.moonwoodBitMax={active:true,level:'MAX',groundPixels:1500,riceRows:5,bridgeDetails:true,waterGlints:260,deterministic:true,cleanLanes:true};
})();
