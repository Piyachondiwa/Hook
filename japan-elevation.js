/* Moonwood: raised Japanese island terraces + extra pixel terrain detail. */
(()=>{'use strict';
if(typeof R==='undefined'||typeof p==='undefined'||typeof world!=='function')return;
const baseWorld=world;
const B=(x,y,w,h,c)=>R(x,y,w,h,c);
const C={cliff:'#424a42',cliff2:'#5b674f',soil:'#806643',grass:'#829657',grass2:'#a1ae6a',stone:'#77736b',stoneHi:'#c2bcac'};
function north(){B(3650,610,1400,44,C.cliff);B(3628,635,1444,42,C.cliff2);B(3650,652,1400,26,C.soil);B(3680,668,1340,10,C.grass);for(let i=0;i<135;i++){const x=3635+(i*53)%1430,y=618+(i*29)%92;B(x,y,3+(i%4),2,i%5?C.grass2:C.stoneHi)}for(let i=0;i<42;i++){const x=3660+(i*97)%1380;B(x,650+(i%4)*4,8,4,C.stone)}}
function south(){B(3650,1728,1400,48,C.cliff);B(3630,1750,1440,45,C.cliff2);B(3660,1760,1380,28,C.soil);B(3690,1772,1320,18,C.grass);for(let i=0;i<110;i++){const x=3640+(i*67)%1420,y=1732+(i*31)%64;B(x,y,3+(i%3),2,i%4?C.grass2:C.stoneHi)}}
function sides(){for(let i=0;i<28;i++){const y=700+i*36;B(3620,y,32,24,C.cliff2);B(5045,y+7,34,23,C.cliff)}}
world=function(){baseWorld();north();south();sides()};
window.moonwoodElevation={raised:true,northTerrace:{x1:3628,y1:610,x2:5072,y2:678},southTerrace:{x1:3630,y1:1728,x2:5070,y2:1780},pixelTerrain:true,highDetail:true};
})();