(() => {
  const HOLD_MS = 900;
  const CLOSE_DIST = 58;
  let holding = false;
  let started = 0;
  let open = false;
  let mirror = { x: 1800, y: 1160 };
  let originalMove = null;
  let initializedMove = false;

  const ui = document.getElementById('ui');
  if (!ui) return;

  const oldPrompt = () => document.querySelector('.treePrompt');
  const prompt = document.createElement('div');
  prompt.id = 'holdTreePrompt';
  prompt.hidden = true;
  prompt.innerHTML = '<span class="holdTreeName">???</span><small>E &nbsp; กดค้างเพื่อค้นหา</small>';
  ui.appendChild(prompt);

  const progressBox = document.createElement('div');
  progressBox.id = 'treeSearchProgress';
  progressBox.hidden = true;
  progressBox.innerHTML = '<div class="searchLabel"><span>กำลังค้นหาต้นไม้</span><b>0%</b></div><div class="searchTrack"><i></i></div>';
  ui.appendChild(progressBox);

  function hideOldPrompt() {
    const el = oldPrompt();
    if (el) el.hidden = true;
  }

  function treeFromGame() {
    return typeof window.closestTree === 'function' ? window.closestTree() : null;
  }

  function distanceToTree(t) {
    if (!t) return Infinity;
    const s = typeof window.treeScale === 'function' ? window.treeScale(t) : 1.5;
    return Math.hypot(mirror.x - t.x, mirror.y - (t.y + 42 * s));
  }

  function isClose(t) {
    return !!t && distanceToTree(t) <= CLOSE_DIST;
  }

  function updatePrompt() {
    hideOldPrompt();
    const t = treeFromGame();
    const close = isClose(t);
    prompt.hidden = open || holding || !close;
    if (close && t && !open && !holding) {
      prompt.innerHTML = `<span class="holdTreeName">${t.info?.[0] || '???'}</span><small>E &nbsp; กดค้างเพื่อค้นหา</small>`;
    }
  }

  function setProgress(value) {
    const pct = Math.max(0, Math.min(100, value));
    const label = progressBox.querySelector('.searchLabel b');
    const bar = progressBox.querySelector('.searchTrack i');
    if (label) label.textContent = `${Math.round(pct)}%`;
    if (bar) bar.style.width = `${pct}%`;
    progressBox.hidden = !holding;
  }

  function startSearch() {
    const t = treeFromGame();
    if (!isClose(t) || open) return;
    holding = true;
    started = performance.now();
    setProgress(0);
    prompt.hidden = true;
  }

  function cancelSearch() {
    holding = false;
    started = 0;
    setProgress(0);
    progressBox.hidden = true;
    updatePrompt();
  }

  function finishSearch() {
    const t = treeFromGame();
    if (!isClose(t)) {
      cancelSearch();
      return;
    }
    holding = false;
    progressBox.hidden = true;
    open = true;
    prompt.hidden = true;
    if (typeof window.showTreeDetails === 'function') window.showTreeDetails(t);
    else if (typeof window.treeInfo === 'function') window.treeInfo(t);
  }

  function tick(now) {
    hideOldPrompt();
    const t = treeFromGame();
    if (holding) {
      if (!isClose(t)) {
        cancelSearch();
      } else {
        const pct = ((now - started) / HOLD_MS) * 100;
        setProgress(pct);
        if (pct >= 100) finishSearch();
      }
    } else {
      updatePrompt();
    }
    requestAnimationFrame(tick);
  }

  addEventListener('keydown', ev => {
    if (ev.key.toLowerCase() !== 'e') return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    if (ev.repeat) return;

    if (open) {
      open = false;
      const box = document.getElementById('treeInfo');
      if (box) box.hidden = true;
      if (typeof window.closeTreeDetails === 'function') window.closeTreeDetails();
      updatePrompt();
      return;
    }
    startSearch();
  }, true);

  addEventListener('keyup', ev => {
    if (ev.key.toLowerCase() !== 'e') return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    if (holding) cancelSearch();
  }, true);

  addEventListener('blur', () => {
    if (holding) cancelSearch();
  });

  const waitForGame = setInterval(() => {
    if (typeof window.move === 'function' && !initializedMove) {
      originalMove = window.move;
      window.move = function(dx, dy) {
        originalMove(dx, dy);
        // The game spawns at this coordinate. Keep the interaction mirror in
        // sync with every accepted movement. Collision is handled by the game.
        mirror.x += dx;
        mirror.y += dy;
      };
      initializedMove = true;
      clearInterval(waitForGame);
    }
  }, 20);

  // Keep the legacy prompt permanently hidden even though game.js redraws it.
  setInterval(hideOldPrompt, 50);
  requestAnimationFrame(tick);
})();
