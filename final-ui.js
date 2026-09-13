(() => {
  const ui = document.getElementById('ui');
  const status = document.querySelector('.status');
  if (!ui || !status) return;

  // HUD only. Tree interaction is handled exclusively by interaction-hold.js.
  status.innerHTML = `<div class="hudFrame"><div class="levelBadge"><small>LV</small><strong>1</strong></div><div class="heroStats"><div class="hudName">ADVENTURER</div><div class="resourceBar hp"><span>HP</span><div><i></i></div><em>100 / 100</em></div><div class="resourceBar mp"><span>MP</span><div><i></i></div><em>100 / 100</em></div><div class="resourceBar sp"><span>ST</span><div><i></i></div><em>100 / 100</em></div></div></div><div class="hudTitle">MOONWOOD</div>`;

  document.querySelectorAll('.chapter,#questBadge,#combatHud').forEach(el => {
    el.style.display = 'none';
  });

  const fill = (cls) => {
    const row = status.querySelector('.resourceBar.' + cls);
    if (row) row.querySelector('i').style.width = '100%';
  };
  fill('hp');
  fill('mp');
  fill('sp');
})();
