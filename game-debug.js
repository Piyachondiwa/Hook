/* Moonwood debug bridge for automated browser regression tests. */
(()=>{'use strict';
if(typeof p==='undefined'||typeof move!=='function')return;
window.moonwoodDebug={
  player:()=>({x:p.x,y:p.y,walking:p.walking,dir:p.dir}),
  move:(dx,dy)=>move(dx,dy),
  blocked:(x,y)=>blocked(x,y),
  setPlayer:(x,y)=>{p.x=x;p.y=y;p.walking=false}
};
})();
