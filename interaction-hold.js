(() => {
  const HOLD_MS = 900;
  const INTERACT_RADIUS = 52;
  let holding = false;
  let started = 0;
  let open = false;
  let lastTree = null;

  const ui = document.getElementById('ui');
  if (!ui) return;

  const prompt = document.getElementById('holdTreePrompt') || document.createElement('div');
  prompt.id = 'holdTreePrompt';
  prompt.hidden = true;
  if (!prompt.parentNode) ui.appendChild(prompt);

  const progressBox = document.getElementById('treeSearchProgress') || document.createElement('div');
  progressBox.id = 'treeSearchProgress';
  progressBox.hidden = true;
  progressBox.innerHTML = '<div class="searchLabel"><span>กำลังค้นหาต้นไม้</span><b>0%</b></div><div class="searchTrack"><i></i></div>';
  if (!progressBox.parentNode) ui.appendChild(progressBox);

  function gameState() {
    return typeof window.moonwoodState === 'function' ? window.moonwoodState() : null;
  }

  function currentTree() {
    return typeof window.closestTree === 'function' ? window.closestTree() : null;
  }

  function getTreeDistance(t, s) {
    if (!t || !s) return Infinity;
    const scale = typeof window.treeScale === 'function' ? window.treeScale(t) : 1.5;
    return Math.hypot(s.x - t.x, s.y - (t.y + 42 * scale));
  }

  function canInteract(t) {
    const s = gameState();
    return !!t && !!s && getTreeDistance(t, s) <= INTERACT_RADIUS;
  }

  function hideLegacyPrompt() {
    document.querySelectorAll('.treePrompt').forEach(el => {
      el.hidden = true;
      el.style.display = 'none';
    });
  }

  function renderPrompt(t) {
    hideLegacyPrompt();
    const visible = !open && !holding && canInteract(t);
    prompt.hidden = !visible;
    if (visible) {
      const name = t?.info?.[0] || '???';
      prompt.innerHTML = `<span class="holdTreeName">${name}</span><small>E &nbsp; กดค้างเพื่อค้นหา</small>`;
    }
  }

  function setProgress(v) {
    const pct = Math.max(0, Math.min(100, v));
    const label = progressBox.querySelector('.searchLabel b');
    const bar = progressBox.querySelector('.searchTrack i');
    if (label) label.textContent = `${Math.round(pct)}%`;
    if (bar) bar.style.width = `${pct}%`;
    progressBox.hidden = !holding;
  }

  function cancelSearch() {
    holding = false;
    started = 0;
    lastTree = null;
    setProgress(0);
    progressBox.hidden = true;
  }

  function openTreeInfo(t) {
    const box = document.getElementById('treeInfo');
    if (!box || !t?.info || !canInteract(t)) return false;
    const s = t.info;
    box.innerHTML = `<h3>${s[0]}</h3><p class="latin">${s[1]} · <i>${s[2]}</i></p><p><b>ประเภท:</b> ${s[3]}</p><p class="fact">${s[4]}</p><div class="close">E &nbsp; กดค้างเพื่อปิด</div>`;
    box.hidden = false;
    open = true;
    try {
      if (typeof window.markTreeDiscovered === 'function') window.markTreeDiscovered(t);
    } catch (_) {}
    return true;
  }

  function finishSearch() {
    const t = currentTree();
    if (!canInteract(t)) {
      cancelSearch();
      renderPrompt(t);
      return;
    }
    cancelSearch();
    openTreeInfo(t);
    prompt.hidden = true;
  }

  function startSearch() {
    const t = currentTree();
    if (open || !canInteract(t)) return;
    holding = true;
    started = performance.now();
    lastTree = t;
    prompt.hidden = true;
    setProgress(0);
  }

  function closeInfo() {
    const box = document.getElementById('treeInfo');
    if (box) box.hidden = true;
    open = false;
    holding = false;
    started = 0;
    renderPrompt(currentTree());
  }

  function tick(now) {
    hideLegacyPrompt();
    const t = currentTree();

    if (holding) {
      if (t !== lastTree || !canInteract(t)) {
        cancelSearch();
        renderPrompt(t);
      } else {
        const pct = ((now - started) / HOLD_MS) * 100;
        setProgress(pct);
        if (pct >= 100) finishSearch();
      }
    } else if (!open) {
      renderPrompt(t);
    }

    requestAnimationFrame(tick);
  }

  addEventListener('keydown', ev => {
    if (ev.key.toLowerCase() !== 'e') return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    if (ev.repeat) return;

    if (open) {
      closeInfo();
      return;
    }

    startSearch();
  }, true);

  addEventListener('keyup', ev => {
    if (ev.key.toLowerCase() !== 'e') return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    if (holding) {
      cancelSearch();
      renderPrompt(currentTree());
    }
  }, true);

  addEventListener('blur', () => {
    if (holding) {
      cancelSearch();
      renderPrompt(currentTree());
    }
  });

  requestAnimationFrame(tick);
})();
