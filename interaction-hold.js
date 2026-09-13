(() => {
  const HOLD_MS = 900;
  const CLOSE_DIST = 58;
  let holding = false;
  let started = 0;
  let open = false;

  const ui = document.getElementById('ui');
  if (!ui) return;

  const prompt = document.getElementById('holdTreePrompt') || document.createElement('div');
  prompt.id = 'holdTreePrompt';
  if (!prompt.parentNode) ui.appendChild(prompt);

  const progressBox = document.getElementById('treeSearchProgress') || document.createElement('div');
  progressBox.id = 'treeSearchProgress';
  if (!progressBox.parentNode) ui.appendChild(progressBox);
  progressBox.innerHTML = '<div class="searchLabel"><span>กำลังค้นหาต้นไม้</span><b>0%</b></div><div class="searchTrack"><i></i></div>';

  function state() {
    return typeof window.moonwoodState === 'function' ? window.moonwoodState() : null;
  }

  function currentTree() {
    return typeof window.closestTree === 'function' ? window.closestTree() : null;
  }

  function distanceTo(t, s) {
    if (!t || !s) return Infinity;
    const scale = typeof window.treeScale === 'function' ? window.treeScale(t) : 1.5;
    return Math.hypot(s.x - t.x, s.y - (t.y + 42 * scale));
  }

  function isClose(t) {
    return distanceTo(t, state()) <= CLOSE_DIST;
  }

  function hideLegacy() {
    document.querySelectorAll('.treePrompt').forEach(el => {
      el.hidden = true;
      el.style.display = 'none';
    });
  }

  function promptFor(t) {
    hideLegacy();
    const visible = !open && !holding && isClose(t);
    prompt.hidden = !visible;
    if (visible) {
      prompt.innerHTML = `<span class="holdTreeName">${t?.info?.[0] || '???'}</span><small>E &nbsp; กดค้างเพื่อค้นหา</small>`;
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

  function clearSearch() {
    holding = false;
    started = 0;
    setProgress(0);
    progressBox.hidden = true;
  }

  function startSearch() {
    const t = currentTree();
    if (open || !isClose(t)) return;
    holding = true;
    started = performance.now();
    prompt.hidden = true;
    setProgress(0);
  }

  function finishSearch() {
    const t = currentTree();
    if (!isClose(t)) {
      clearSearch();
      promptFor(t);
      return;
    }
    clearSearch();
    open = true;
    prompt.hidden = true;
    const box = document.getElementById('treeInfo');
    if (!box || !t.info) {
      open = false;
      promptFor(t);
      return;
    }
    box.innerHTML = `<h3>${t.info[0]}</h3><p class="latin">${t.info[1]} · <i>${t.info[2]}</i></p><p><b>ประเภท:</b> ${t.info[3]}</p><p class="fact">${t.info[4]}</p><div class="close">E &nbsp; ปิดข้อมูล</div>`;
    box.hidden = false;
  }

  function tick(now) {
    hideLegacy();
    const t = currentTree();
    if (holding) {
      if (!isClose(t)) {
        clearSearch();
        promptFor(t);
      } else {
        const pct = ((now - started) / HOLD_MS) * 100;
        setProgress(pct);
        if (pct >= 100) finishSearch();
      }
    } else if (!open) {
      promptFor(t);
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
      promptFor(currentTree());
      return;
    }
    startSearch();
  }, true);

  addEventListener('keyup', ev => {
    if (ev.key.toLowerCase() !== 'e') return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    if (holding) {
      clearSearch();
      promptFor(currentTree());
    }
  }, true);

  addEventListener('blur', () => {
    if (holding) {
      clearSearch();
      promptFor(currentTree());
    }
  });

  requestAnimationFrame(tick);
})();
