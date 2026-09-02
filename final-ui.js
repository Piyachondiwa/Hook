(() => {
  const ui=document.getElementById('ui');
  const status=document.querySelector('.status');
  const treeInfo=document.getElementById('treeInfo');
  if(!ui||!status||!treeInfo)return;
  status.innerHTML=`<div class="finalHud"><div class="finalLevel"><small>LV</small><b>1</b></div><div class="finalBars"><div class="finalName">ADVENTURER</div><div class="fbar hp"><span>HP</span><i></i><em>100 / 100</em></div><div class="fbar mp"><span>MP</span><i></i><em>100 / 100</em></div><div class="fbar st"><span>ST</span><i></i><em>100 / 100</em></div></div></div><div class="finalTitle">MOONWOOD</div>`;
  status.style.cssText='position:absolute!important;z-index:100!important;top:28px!important;left:28px!important;width:430px!important;padding:11px 15px 12px!important;box-sizing:border-box!important;background:linear-gradient(145deg,rgba(7,13,19,.98),rgba(25,32,38,.96))!important;border:1px solid rgba(225,196,119,.78)!important;border-radius:10px!important;box-shadow:0 10px 32px rgba(0,0,0,.5),inset 0 1px rgba(255,255,255,.08)!important';
  document.querySelectorAll('.chapter,#questBadge,#combatHud').forEach(x=>x.style.display='none');
  let open=false;
  addEventListener('keydown',ev=>{
    if(ev.key.toLowerCase()!=='e'||ev.repeat)return;
    const s=window.moonwoodState?window.moonwoodState():null;
    if(!s||!s.nearTree)return;
    ev.preventDefault();ev.stopImmediatePropagation();
    if(open){treeInfo.hidden=true;open=false;return}
    const t=typeof window.closestTree==='function'?window.closestTree():null;
    if(t&&typeof window.showTreeDetails==='function'){window.showTreeDetails(t);open=true;return}
    const name=s.treeName||'ต้นไม้ที่ไม่ทราบชนิด';
    treeInfo.innerHTML=`<h3>${name}</h3><p class="latin">ข้อมูลภาคสนาม</p><p><b>สถานะ:</b> พบต้นไม้ในพื้นที่สำรวจ</p><p class="fact">ยังไม่มีข้อมูลรายละเอียดของต้นนี้ในสมุดบันทึก</p><div class="close">E &nbsp; ปิดข้อมูล</div>`;
    treeInfo.hidden=false;open=true;
  },true);
  setInterval(()=>{
    const s=window.moonwoodState?window.moonwoodState():null;
    if(!s)return;
    status.querySelector('.hp i').style.width='100%';status.querySelector('.mp i').style.width='100%';status.querySelector('.st i').style.width='100%';
    status.querySelector('.hp em').textContent='100 / 100';status.querySelector('.mp em').textContent='100 / 100';status.querySelector('.st em').textContent='100 / 100';
    if(!s.nearTree&&!open)treeInfo.hidden=true;
  },100);
})();