/* Moonwood: raised Japanese island terraces + pixel terrain detail. */
(()=>{'use strict';
if(typeof g==='undefined'||typeof R==='undefined'||typeof p==='undefined'||typeof world!=='function')return;
const baseWorld=world,baseBlocked=typeof blocked==='function'?blocked:null;
const B=(x,y,w,h,c)=>R(x,y,w,h,c);
const C={cliff:'#454d43',cliff2:'#59624c',soil:'#806844',grass:'#7f9254',grass2:'#9ca866',stone:'#77746d',stoneHi:'#b8b2a4'};
function raisedNorth(){
  B(3840,675,900,54,C.cliff);B(3828,700,924,38,C.cliff2);B(3842,716,900,22,C.soil);B(3860,730,860,8,C.grass);
  for(let i=0;i<82;i++){const xx=3840+(i*71)%900,yy=686+(i*37)%47;B(xx,yy,3+(i%3),2,i%4?C.grass2:C.stoneHi)}
  for(let i=0;i<24;i++){const xx=3850+(i*113)%880;B(xx,720-(i%4)*3,7,4,C.stone)}
}
function raisedSouth(){
  B(3840,1508,900,62,C.cliff);B(3830,1530,920,44,C.cliff2);B(3850,1540,880,28,C.soil);B(3870,1548,840,22,C.grass);
  for(let i=0;i<70;i++){const xx=3840+(i*89)%900,yy=1520+(i*31)%45;B(xx,yy,3+(i%3),2,i%4?C.grass2:C.stoneHi)}
}
function raisedSides(){for(let i=0;i<18;i++){const y=770+i*40;B(3822,y,26,28,C.cliff2);B(4780,y+7,28,25,C.cliff)}}
world=function(){baseWorld();raisedNorth();raisedSouth();raisedSides()};
if(baseBlocked)blocked=function(x,y){if(x>=3830&&x<=4770&&y>=690&&y<735)return false;if(x>=3830&&x<=4770&&y>1510&&y<=1565)return false;if(x>=3820&&x<3850&&y>=760&&y<=1490)return false;if(x>4770&&x<=4830&&y>=760&&y<=1490)return false;return baseBlocked(x,y)};
window.moonwoodElevation={raised:true,northTerrace:{y1:675,y2:735},southTerrace:{y1:1510,y2:1565},pixelTerrain:true};
})();
