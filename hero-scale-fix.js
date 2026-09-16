/* Moonwood: readable player sprite scale, centered on the collision point. */
(()=>{'use strict';if(typeof hero!=='function'||typeof p==='undefined'||typeof g==='undefined')return;const prev=hero;hero=function(){g.save();g.translate(p.x,p.y);g.scale(1.10,1.10);g.translate(-p.x,-p.y);prev();g.restore()};window.moonwoodHeroScale={active:true,scale:1.1,centered:true};})();
