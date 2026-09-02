(() => {
  // Runtime safety layer: keeps the player from occupying a tree trunk.
  function keepPlayerOutOfTrunks(){
    if(typeof p==='undefined'||typeof trees==='undefined')return;
    for(const t of trees){
      const s=typeof treeScale==='function'?treeScale(t):1.5;
      const dx=p.x-t.x;
      const trunkY=t.y+25*s;
      const dy=p.y-trunkY;
      const rx=13*s+10;
      const ry=25*s+10;
      if(Math.abs(dx)<rx&&Math.abs(dy)<ry){
        const nx=dx/(rx||1),ny=dy/(ry||1),d=Math.hypot(nx,ny)||1;
        const push=Math.max(0,1-d)*12+2;
        p.x+=nx/d*push;p.y+=ny/d*push;
      }
    }
    p.x=Math.max(20,Math.min(W-20,p.x));p.y=Math.max(20,Math.min(H-20,p.y));
  }
  setInterval(keepPlayerOutOfTrunks,20);

  // Reliable E interaction. It does not depend on the original tree-info handler.
  let inspectOpen=false,inspectTree=null;
  function nearestTree(){
    if(typeof p==='undefined'||typeof trees==='undefined')return null;
    let best=null,bd=Infinity;
    for(const t of trees){
      const d=Math.hypot(p.x-t.x,p.y-(t.y+18));
      if(d<118&&d<bd){best=t;bd=d}
    }
    return best;
  }
  function showTree(t){
    if(!t||typeof treeInfoEl==='undefined')return;
    const s=t.info||[];
    inspectOpen=true;inspectTree=t;
    treeInfoEl.innerHTML=`<h3>${s[0]||'Unknown tree'}</h3><p class="latin">${s[1]||''} · <i>${s[2]||''}</i></p><p><b>ประเภท:</b> ${s[3]||'ไม้ต้น'}</p><p class="fact">${s[4]||'ยังไม่มีข้อมูลภาคสนาม'}</p><div class="close">E &nbsp; CLOSE</div>`;
    treeInfoEl.hidden=false;
    try{if(typeof discoveredTrees!=='undefined')discoveredTrees.add(s[0])}catch(_){ }
  }
  function closeTree(){inspectOpen=false;inspectTree=null;if(typeof treeInfoEl!=='undefined')treeInfoEl.hidden=true}
  addEventListener('keydown',ev=>{
    if(ev.key.toLowerCase()!=='e'||ev.repeat)return;
    if(inspectOpen){closeTree();return}
    const t=nearestTree();if(t)showTree(t);
  },true);
  setInterval(()=>{
    if(inspectOpen&&inspectTree){
      if(typeof treeDetailsOpen!=='undefined')treeDetailsOpen=true;
      if(typeof treeInfoEl!=='undefined')treeInfoEl.hidden=false;
    }
  },40);

  // Draw foliage after the character so a character standing beneath a canopy is actually hidden.
  // Camera follows the player in the base game, so mirror that transform for the overlay pass.
  function canopyOverlay(){
    if(typeof g==='undefined'||typeof p==='undefined'||typeof trees==='undefined'||typeof treeCanopy!=='function')return;
    const vw=c.width,vh=c.height;
    const camX=Math.max(0,Math.min(W-vw,p.x-vw/2));
    const camY=Math.max(0,Math.min(H-vh,p.y-vh/2));
    g.save();g.setTransform(1,0,0,1,-camX,-camY);
    for(const t of trees){
      const s=typeof treeScale==='function'?treeScale(t):1.5;
      if(t.x+70*s<camX||t.x-70*s>camX+vw||t.y-95*s>camY+vh||t.y+35*s<camY)continue;
      const near=Math.abs(t.x-p.x)<80*s&&p.y<t.y+35*s&&p.y>t.y-80*s;
      if(near)treeCanopy(t);
    }
    g.restore();
  }
  function overlayLoop(){requestAnimationFrame(()=>{canopyOverlay();overlayLoop()})}
  overlayLoop();
})();