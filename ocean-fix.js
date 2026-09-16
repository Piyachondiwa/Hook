/* Moonwood: natural layered pixel ocean. */
(()=>{'use strict';
if(typeof R==='undefined')return;
function noise(x,y){const n=Math.sin(x*12.9898+y*78.233+91827)*43758.5453;return n-Math.floor(n)}
function drawOcean(){
  const W=5400,H=2500;
  R(0,0,W,H,'#0b3443');
  /* Deep water bands give the sea depth without a checkerboard texture. */
  for(let y=0;y<H;y+=32){
    const band=noise(y,17);
    R(0,y,W,18,band>.5?'#104656':'#0e3d4d');
    for(let x=18;x<W;x+=76){
      const n=noise(x,y),len=n>.72?28:n>.38?20:13;
      const yy=y+5+(noise(x+4,y+8)*7|0);
      if(n>.18)R(x,yy,len,2,n>.82?'#4c9ba7':'#276879');
      if(n>.91)R(x+5,yy-2,10,2,'#78bbc0');
    }
  }
  /* Long broken wave lines read more naturally at game scale. */
  for(let row=0;row<42;row++){
    const y=20+row*59+(noise(row,4)*15|0);
    for(let i=0;i<8;i++){
      const x=noise(row*9+i,31)*5250;
      const w=18+noise(row*9+i,32)*38;
      R(x,y,w,2,row%4===0?'#5aa7ae':'#337a87');
      if(i%3===0)R(x+w-4,y+2,7,2,'#1d5665');
    }
  }
  /* Small foam flecks, sparse enough to keep the ocean readable. */
  for(let i=0;i<180;i++){
    const x=12+noise(i,41)*5370,y=15+noise(i,73)*2470,n=noise(i,97);
    if(n>.72)R(x,y,3+(n*6|0),2,'#8bc5c8');
  }
}
window.drawOcean=drawOcean;
window.moonwoodOceanFix={active:true,width:5400,height:2500,layered:true,organicWaves:true};
})();