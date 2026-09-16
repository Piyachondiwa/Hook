/* Moonwood: robust ocean renderer. */
(()=>{'use strict';
if(typeof R==='undefined')return;
function noise(x,y){const n=Math.sin(x*12.9898+y*78.233+91827)*43758.5453;return n-Math.floor(n)}
function drawOcean(){
  const W=5400,H=2500;
  R(0,0,W,H,'#092f3d');
  for(let y=0;y<H;y+=24){
    for(let x=0;x<W;x+=36){
      const n=noise(x,y),c=n>.86?'#216d7a':n>.55?'#10495b':'#16566a';
      R(x+(n*9|0),y+(noise(x+7,y+3)*5|0),24,11,c);
      if(n>.83)R(x+8,y+7,9,2,'#5da5ad');
    }
  }
  for(let i=0;i<150;i++){
    const x=20+noise(i,41)*5360,y=35+noise(i,73)*2430,n=noise(i,97);
    if(n>.48)R(x,y,3+(n*4|0),2,'#5da5ad');
  }
}
window.drawOcean=drawOcean;
window.moonwoodOceanFix={active:true,width:5400,height:2500};
})();
