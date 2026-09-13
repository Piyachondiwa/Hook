/* Moonwood spawn cleanup: keep the starting area clear of decorative rocks. */
(()=>{
  'use strict';
  if(typeof rocks==='undefined') return;
  const sx=1800, sy=1160, clearRadius=230;
  for(let i=rocks.length-1;i>=0;i--){
    const q=rocks[i];
    if(Math.hypot(q.x-sx,q.y-sy)<clearRadius) rocks.splice(i,1);
  }
  window.moonwoodSpawnCleanup={rocksCleared:true,radius:clearRadius};
})();
