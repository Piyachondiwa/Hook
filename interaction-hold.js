(() => {
  const HOLD_MS = 900;
  const CLOSE_DIST = 58;
  let holding = false;
  let started = 0;
  let progress = 0;
  let open = false;
  let mirror = { x: 1800, y: 1160 };
  let originalMove = null;

  const ui = document.getElementById('ui');
  const prompt = document.createElement('div');
  prompt.id = 'holdTreePrompt';
  prompt.hidden = true;
  prompt.innerHTML = '<span class="holdTreeName">???</span><small>กด E ค้างเพื่อค้นหา</small>';
  ui?.appendChild(prompt);

  const progressBox = document.createElement('div');
  progressBox.id = 'treeSearchProgress';
  progressBox.hidden = true;
  progressBox.innerHTML = '<div class="searchLabel">กำลังค้นหา <b>0%</b></div><div class="searchTrack"><i></i></div>';
  ui?.appendChild(progressBox);

  function treeFromGame() {
    return typeof window.closestTree === 'function' ? window.closestTree() : null;
  }

  function distanceToTree(t) {
    if (!t) return Infinity;
    const s = typeof window.treeScale === 'function' ? window.treeScale(t) : 1.5;
    const tx = t.x;
    const ty = t.y + 42 * s;
    return Math.hypot(mirror.x - tx, mirror.y - ty);
  }

  function isClose(t) {
    return !!t && distanceToTree(t) <= CLOSE_DIST;
  }

  function updatePrompt() {
    if (!ui) return;
    const t = treeFromGame();
    const close = isClose(t);
    prompt.hidden = open || !close;
    if (close && t) {
      const name = t.info?.[0] || '???';
      prompt.innerHTML = `<span class="holdTreeName">${name}</span><small>กด E ค้างเพื่อค้นหา</small>`;
    }
    if (!close && holding) cancelSearch();
  }

  function setProgress(value) {
    progress = Math.max(0, Math.min(100, value));
    const b = progressBox.querySelector('.searchLabel b');
    const bar = progressBox.querySelector('.searchTrack i');
    if (b) b.textContent = `${Math.round(progress)}%`;
    if (bar) bar.style.width = `${progress}%`;
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
    progress = 100;
    open = true;
    prompt.hidden = true;
    if (typeof window.showTreeDetails === 'function') window.showTreeDetails(t);
    else if (typeof window.treeInfo === 'function') window.treeInfo(t);
  }

  function tick(now) {
    const t = treeFromGame();
    if (holding) {
      if (!isClose(t)) {
        cancelSearch();
      } else {
        const pct = ((now - started) / HOLD_MS) * 100;
        setProgress(pct);
        if (pct >= 100) finishSearch();
      }
    }
    if (!holding) updatePrompt();
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
    if (typeof window.move === 'function' && !originalMove) {
      originalMove = window.move;
      window.move = function(dx, dy) {
        const t = treeFromGame();
        const nx = mirror.x + dx;
        const ny = mirror.y + dy;
        const s = t && typeof window.treeScale === 'function' ? window.treeScale(t) : 1.5;
        const trunkX = t?.x ?? 0;
        const trunkY = t ? t.y + 42 * s : 0;
        const treeBlock = t && Math.hypot(nx - trunkX, ny - trunkY) < Math.max(24, 12 * s + 15);
        originalMove(dx, dy);
        if (!treeBlock) {
          mirror.x = nx;
          mirror.y = ny;
        }
      };
      clearInterval(waitForGame);
    }
  }, 20);

  setInterval(() => {
    if (typeof window.moonwoodState === 'function') {
      const s = window.moonwoodState();
      if (!s?.nearTree && !holding) prompt.hidden = true;
    }
  }, 100);

  requestAnimationFrame(tick);
})();
