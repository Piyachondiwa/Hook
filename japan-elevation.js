/* Moonwood: Japanese island elevation with organic pixel cliffs. */
(()=>{'use strict';
if(typeof R==='undefined'||typeof p==='undefined'||typeof world!=='function')return;
const baseWorld=world;
const B=(x,y,w,h,c)=>R(x,y,w,h,c);
const C={cliff:'#424a42',cliff2:'#5b674f',soil:'#806643',grass:'#829657',grass2:'#a1ae6a',stone:'#77736b',stoneHi:'#c2bcac',shadow:'#303830'};
function north(){
  B(3650,610,1400,16,C.shadow);B(3628,626,1444,20,C.cliff2);B(3650,642,1400,14,C.soil);B(3680,654,1340,9,C.grass);
  for(let i=0;i<135;i++){const x=3635+(i*53)%1430,y=618+(i*29)%63;B(x,y,3+(i%4),2,i%5?C.grass2:C.stoneHi)}
  for(let i=0;i<42;i++){const x=3660+(i*97)%1380;B(x,646+(i%4)*4,8,3,C.stone)}
}
function south(){
  B(3650,1768,1400,12,C.shadow);B(3630,1750,1440,18,C.cliff2);B(3660,1763,1380,13,C.soil);B(3690,1773,1320,8,C.grass);
  for(let i=0;i<110;i++){const x=3640+(i*67)%1420,y=1745+(i*31)%34;B(x,y,3+(i%3),2,i%4?C.grass2:C.stoneHi)}
}
function sides(){
  /* Thin, broken cliff lips. The old 32x24 repeating blocks looked like concrete steps. */
  for(let i=0;i<42;i++){
    const y=675+i*25;
    const n=Math.sin(i*19.17)*.5+.5;
    const h=10+(n*9|0),w=8+(n*9|0);
    B(3628,y,w,h,i%4?C.cliff2:C.cliff);
    B(3636,y+h-3,Math.max(5,w-4),3,i%3?C.grass:C.grass2);
    B(5042-w,y+4,w,h,i%4?C.cliff:C.cliff2);
    B(5042-w,y+4,Math.max(5,w-4),3,i%3?C.grass2:C.grass);
    if(i%5===0){B(3640,y+h+3,6,3,C.stoneHi);B(5035-w,y+h+3,6,3,C.stone)}
  }
}
world=function(){baseWorld();north();south();sides()};
window.moonwoodElevation={raised:true,organicCliffs:true,northTerrace:{x1:3628,y1:610,x2:5072,y2:678},southTerrace:{x1:3630,y1:1745,x2:5070,y2:1780},pixelTerrain:true,highDetail:true,noRepeatingCliffBlocks:true};
})();