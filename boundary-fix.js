/* Moonwood: hard outer island edge. Visual land may extend farther than the walkable rim. */
(()=>{'use strict';if(typeof blocked!=='function')return;const prev=blocked;blocked=function(x,y){if(x>=3670&&x<=5110&&y>1750)return true;return prev(x,y)};window.moonwoodBoundary={locked:true,active:true,expandedBoundary:true,hardSouthEdge:1750};})();
