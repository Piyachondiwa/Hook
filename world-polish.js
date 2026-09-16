/* Moonwood: handcrafted old-world pixel terrain pass. */
(()=>{'use strict';
if(typeof world!=='function'||typeof R!=='function'||typeof g==='undefined')return;
const oldWorld=world;
const W0=3250,H=2500;
const hash=(x,y)=>{const n=Math.sin(x*12.9898+y*78.233+4217)*43758.5453;return n-Math.floor(n)};
const px=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};
function grass(){
  px(0,0,W0,H,'#4e7545');
  for(let y=0;y<H;y+=16)for(let x=0;x<W0;x+=16){
    const n=hash(x,y); const c=n<.34?'#4b7042':n<.68?'#527a48':n<.91?'#577e4a':'#608650';
    px(x,y,16,16,c);
    if(n>.56)px(x+3+(n*8|0),y+4+(hash(y,x)*8|0),2,2,n>.84?'#8da35b':'#6b8c50');
    if(n>.93)px(x+11,y+11,3,2,'#789650');
  }
  for(let i=0;i<620;i++){
    const x=12+(i*73)%W0,y=10+(i*127)%H,n=hash(i,9);
    if(y>1370&&y<1515&&x>1240)continue;
    if(n<.35)px(x,y,3,2,'#6d8d51');
    else if(n<.7){px(x,y,2,5,'#63844d');px(x+2,y-2,2,3,'#7f9a55')}
    else if(n<.9)px(x,y,4,2,'#91a45e');
    else px(x,y,2,2,'#b0b26a');
  }
}
function path(){
  px(1280,1085,2030,86,'#795b43');px(1280,1090,2030,70,'#876749');
  for(let x=1290;x<3260;x+=38){const n=hash(x,31);px(x,1102+(n*32|0),12,3,n>.5?'#a47b54':'#6d513d');if(n>.7)px(x+14,1118+(n*20|0),7,2,'#b28a5b')}
  px(3235,1038,70,184,'#876749');
  for(let y=1050;y<1220;y+=28)px(3242+(hash(y,3)*16|0),y,18,4,'#a47b54');
}
function shrub(x,y,s=1){
  px(x-15*s,y+10*s,30*s,5*s,'#263e2b');
  for(let i=0;i<9;i++){const ox=((i*13)%34-17)*s,oy=((i*7)%15-8)*s;px(x+ox,y+oy,7*s,7*s,i%3?'#38603b':'#477646')}
  px(x-4*s,y-9*s,9*s,7*s,'#527f48');
}
function tree(t){
  const s=t.s||1,x=t.x,y=t.y;
  px(x-25*s,y+45*s,50*s,9*s,'#263c2a');
  px(x-6*s,y+20*s,12*s,34*s,'#543a2b');px(x-3*s,y+20*s,5*s,29*s,'#875b3b');
  const blobs=[[-28,-2,30,24],[-14,-15,35,26],[5,-4,39,29],[24,5,28,22],[-2,-31,29,25]];
  blobs.forEach((b)=>{const [ox,oy,w,h]=b;for(let yy=0;yy<h;yy+=4)for(let xx=0;xx<w;xx+=4){const dx=xx-w/2,dy=yy-h/2;if((dx*dx)/(w*w/4)+(dy*dy)/(h*h/4)>1)continue;const n=hash(x+ox+xx,y+oy+yy);if(n<.22)continue;px(x+ox+xx,y+oy+yy,3*s,3*s,n>.82?'#73934f':n>.48?'#4d7b46':'#39653d')}});
  px(x-19*s,y+5*s,8*s,4*s,'#86a35a');
}
function oldWorldPolish(){
  grass();
  path();
  const trees=window.moonwoodTrees||[]; trees.forEach(tree);
  [[1120,980,1.1],[1190,1030,.8],[2470,780,1],[2730,1540,1.15],[1030,1660,.9],[2930,520,.8]].forEach(q=>shrub(...q));
  const solids=[[1320,1250,960,120],[2570,1290,180,105],[2780,1200,160,105]];
  solids.forEach(q=>{px(q[0],q[1],q[2],q[3],'#2d4032');px(q[0]+6,q[1]+6,q[2]-12,7,'#536a49');px(q[0]+10,q[1]+18,q[2]-20,3,'#718454')});
  for(let i=0;i<70;i++){const x=150+(i*97)%3000,y=180+(i*157)%2050,n=hash(i,88);if(x>1280&&x<3260&&y>1070&&y<1185)continue;px(x,y,n>.5?4:3,n>.5?3:2,n>.82?'#a3ad69':'#718e52')}
}
world=function(){oldWorld();oldWorldPolish();window.moonwoodWorldPolish={active:true,pixelDensity:'16px',gridRemoved:true,oldWorldRefined:true};};
})();
