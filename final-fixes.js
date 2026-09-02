(() => {
  // game.js uses classic-script global function declarations, so these wrappers can
  // safely call closestTree/showTreeDetails while the original private consts stay private.
  let inspectOpen=false;
  addEventListener('keydown',ev=>{
    if(ev.key.toLowerCase()!=='e'||ev.repeat)return;
    const state=window.moonwoodState?window.moonwoodState():null;
    if(!state||!state.nearTree)return;
    ev.preventDefault();ev.stopImmediatePropagation();
    if(inspectOpen){
      if(typeof window.closeTreeDetails==='function')window.closeTreeDetails();
      const box=document.getElementById('treeInfo');if(box)box.hidden=true;
      inspectOpen=false;return;
    }
    const t=typeof window.closestTree==='function'?window.closestTree():null;
    if(t&&typeof window.showTreeDetails==='function'){
      window.showTreeDetails(t);inspectOpen=true;
    }
  },true);
  // Strengthen trunk collision through the global blocked() function.
  if(typeof window.blocked==='function'){
    const originalBlocked=window.blocked;
    window.blocked=function(x,y){
      if(originalBlocked(x,y))return true;
      const t=typeof window.closestTree==='function'?window.closestTree():null;
      if(t&&typeof window.treeScale==='function'){
        const s=window.treeScale(t);
        const trunkY=t.y+34*s;
        if(Math.hypot(x-t.x,y-trunkY)<26*s)return true;
      }
      return false;
    };
  }
})();