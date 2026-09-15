/* Moonwood: expand the Japanese island without disturbing its village core. */
(()=>{'use strict';
if(typeof g==='undefined'||typeof c==='undefined'||typeof R==='undefined'||typeof p==='undefined'||typeof world!=='function')return;
const baseWorld=world, baseBlocked=typeof blocked==='function'?blocked:null;
const B=(x,y,w,h,col)=>R(x,y,w,h,col);
const C={grass:'#71834a',grass2:'#809553',soil:'#6b5939',soilHi:'#927844',stone:'#77746d',stoneHi:'#b8b2a4',stoneDark:'#45433f',sand:'#a9965b',sandHi:'#c0ac68',water:'#1e6478',waterHi:'#63adb8',wood:'#63402c'};
const EX={x1:3500,x2:5150,y1:620,y2:1780};
function terrain(){
  // North terrace: a broader raised headland around the shrine.
  B(3620,620,1390,46,C.stoneDark);B(3590,648,1450,38,C.stone);B(3570,676,1490,42,C.soil);B(3550,705,1530,54,C.grass);
  // West and east shoulders widen the island substantially.
  B(3500,760,120,760,C.stoneDark);B(3520,770,120,720,C.soil);B(3550,790,115,680,C.grass);
  B(4800,760,350,760,C.stoneDark);B(4780,780,370,720,C.soil);B(4760,800,390,680,C.grass);
  // Southern agricultural terrace.
  B(3570,1510,1490,48,C.stoneDark);B(3550,1538,1530,46,C.stone);B(3570,1565,1490,58,C.soil);B(3590,1600,1450,120,C.grass);
  // Pixel terrain breakup prevents the expansion from looking like one giant rectangle.
  for(let i=0;i<230;i++){
    const x=3520+(i*73)%1570,y=650+(i*47)%1080,n=rnd(i*13,71);
    if(x>3780&&x<4830&&y>760&&y<1515)continue;
    if(n<.34)B(x,y,4+(i%4),3,C.grass2);else if(n<.55)B(x,y,5,3,C.stoneHi);else if(n<.73)B(x,y,7,3,C.soilHi);else B(x,y,3,2,C.sandHi);
  }
  // Low shoreline accents on the new outer edge.
  for(let i=0;i<85;i++){
    const x=3510+(i*97)%1620;B(x,735+(i%3)*3,12,3,C.sandHi);B(x,1718+(i%4)*4,15,3,C.stoneHi);
  }
  // Small drainage channel along the southern terrace.
  B(3610,1740,1430,18,C.soil);B(3615,1744,1420,10,C.water);B(3615,1744,1420,3,C.waterHi);
}
function camera(){const vh=c.height/.86;return{x:Math.max(0,Math.min(5400-c.width,p.x-c.width/2)),y:Math.max(0,Math.min(2500-vh,p.y-vh/2)),scaleY:.86}}
function inExpansion(x,y){return (x>=3500&&x<=5150&&y>=620&&y<=1780)}
function expandedBlocked(x,y){
  if(x<15||y<15||x>5400-15||y>2500-15)return true;
  // Expanded terraces are walkable. Keep the original island's detailed collision for its core.
  if(inExpansion(x,y)&&!(x>=3650&&x<=4800&&y>=760&&y<=1510))return false;
  return baseBlocked?baseBlocked(x,y):false;
}
world=function(){baseWorld();terrain();};
if(baseBlocked)blocked=expandedBlocked;
window.moonwoodCamera=camera;
window.moonwoodIslandExpansion={expanded:true,x1:EX.x1,x2:EX.x2,y1:EX.y1,y2:EX.y2,playable:true,area:(EX.x2-EX.x1)*(EX.y2-EX.y1)};
})();