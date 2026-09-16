/* Moonwood render fix: provide the ocean renderer used by island-expansion.js. */
(()=>{'use strict';
if(typeof R==='undefined'||typeof rnd==='undefined')return;
const O={deep:'#092f3d',mid:'#10495b',water:'#16566a',light:'#216d7a',hi:'#5da5ad',foam:'#a9d6d2'};
function drawOcean(){
  const W=5400,H=2500;
  R(0,0,W,H,O.deep);
  for(let y=0;y<H;y+=24){
    for(let x=0;x<W;x+=36){
      const n=rnd(x,y),c=n>.86?O.light:n>.55?O.mid:O.water;
      R(x+(n*9|0),y+(rnd(x+7,y+3)*5|0),24,11,c);
      if(n>.83){R(x+8,y+7,9,2,O.hi)}
    }
  }
  for(let i=0;i<150;i++){
    const x=20+rnd(i,41)*5360,y=35+rnd(i,73)*2430,n=rnd(i,97);
    if(n>.48){R(x,y,3+(n*4|0),2,O.hi)}
  }
}
window.drawOcean=drawOcean;
window.moonwoodOceanFix={active:true,width:5400,height:2500};
})();
