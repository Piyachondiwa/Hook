(() => {
  const ui = document.getElementById('ui');
  const status = document.querySelector('.status');
  const treeInfo = document.getElementById('treeInfo');
  if (!ui || !status || !treeInfo) return;

  // Pure HUD setup. Tree interaction lives only in interaction-hold.js.
  status.innerHTML = `<div class="hudFrame"><div class="levelBadge"><small>LV</small><strong>1</strong></div><div class="heroStats"><div class="hudName">ADVENTURER</div><div class="resourceBar hp"><span>HP</span><div><i></i></div><em>100 / 100</em></div><div class="resourceBar mp"><span>MP</span><div><i></i></div><em>100 / 100</em></div><div class="resourceBar sp"><span>ST</span><div><i></i></div><em>100 / 100</em></div></div></div><div class="hudTitle">MOONWOOD</div>`;

  document.querySelectorAll('.chapter,#questBadge,#combatHud').forEach(el => {
    el.style.display = 'none';
  });

  const vals = { hp: 100, mp: 100, sp: 100 };

  function paintBar(cls, value, max) {
    const row = status.querySelector('.resourceBar.' + cls);
    if (!row) return;
    const safeMax = Math.max(1, Number(max) || 1);
    const safeValue = Math.max(0, Math.min(safeMax, Number(value) || 0));
    const pct = (safeValue / safeMax) * 100;
    const fill = row.querySelector('i');
    const text = row.querySelector('em');
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = Math.round(safeValue) + ' / ' + Math.round(safeMax);
  }

  function refresh() {
    paintBar('hp', vals.hp, 100);
    paintBar('mp', vals.mp, 100);
    paintBar('sp', vals.sp, 100);
  }

  refresh();

  // Keep legacy E UI fully suppressed. No keyboard handlers here.
  const legacyPrompt = document.querySelector('.treePrompt');
  if (legacyPrompt) {
    legacyPrompt.hidden = true;
    legacyPrompt.style.display = 'none';
  }
  treeInfo.hidden = true;
})();
