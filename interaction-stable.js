(() => {
  'use strict';

  const HOLD_MS = 900;
  const INTERACT_RADIUS = 54;
  const ui = document.getElementById('ui');
  const info = document.getElementById('treeInfo');
  if (!ui || !info) return;

  let mode = 'idle';
  let startedAt = 0;
  let lockedTree = null;

  const hideLegacy = () => document.querySelectorAll('.treePrompt').forEach(el => {
    el.hidden = true;
    el.style.display = 'none';
  });

  const prompt = document.getElementById('holdTreePrompt') || (() => {
    const el = document.createElement('div');
    el.id = 'holdTreePrompt';
    ui.appendChild(el);
    return el;
  })();

  const progress = document.getElementById('treeSearchProgress') || (() => {
    const el = document.createElement('div');
    el.id = 'treeSearchProgress';
    el.innerHTML = '<div class="searchLabel"><span>กำลังค้นหาต้นไม้</span><b>0%</b></div><div class="searchTrack"><i></i></div>';
    ui.appendChild(el);
    return el;
  })();

  function state() {
    try { return typeof window.moonwoodState === 'function' ? window.moonwoodState() : null; }
    catch (_) { return null; }
  }

  function currentTree() {
    try { return typeof window.closestTree === 'function' ? window.closestTree() : null; }
    catch (_) { return null; }
  }

  function distanceToTree(t, s) {
    if (!t || !s) return Infinity;
    const scale = typeof window.treeScale === 'function' ? window.treeScale(t) : 1.5;
    return Math.hypot(s.x - t.x, s.y - (t.y + 42 * scale));
  }

  function canInteract(t) {
    const s = state();
    return !!t && !!s && distanceToTree(t, s) <= INTERACT_RADIUS;
  }

  function setPrompt(t) {
    hideLegacy();
    const visible = mode === 'idle' && !state()?.treeOpen && canInteract(t);
    prompt.hidden = !visible;
    if (visible) {
      const name = t?.info?.[0] || '???';
      prompt.innerHTML = `<span class="holdTreeName">${name}</span><small>E &nbsp; กดค้างเพื่อค้นหา</small>`;
    }
  }

  function setProgress(value) {
    const pct = Math.max(0, Math.min(100, value));
    const label = progress.querySelector('.searchLabel b');
    const bar = progress.querySelector('.searchTrack i');
    if (label) label.textContent = `${Math.round(pct)}%`;
    if (bar) bar.style.width = `${pct}%`;
    progress.hidden = mode !== 'holding';
  }

  function stopHold() {
    mode = 'idle';
    startedAt = 0;
    lockedTree = null;
    setProgress(0);
  }

  function openInfo(t) {
    if (!canInteract(t) || !t?.info) return;
    const s = t.info;
    info.innerHTML = `<h3>${s[0]}</h3><p class="latin">${s[1]} · <i>${s[2]}</i></p><p><b>ประเภท:</b> ${s[3]}</p><p class="fact">${s[4]}</p><div class="close">E &nbsp; ปิดข้อมูล</div>`;
    info.hidden = false;
    mode = 'open';
    prompt.hidden = true;
    progress.hidden = true;
  }

  function beginHold() {
    const t = currentTree();
    if (mode !== 'idle' || !canInteract(t)) return;
    mode = 'holding';
    lockedTree = t;
    startedAt = performance.now();
    prompt.hidden = true;
    setProgress(0);
  }

  function closeInfo() {
    info.hidden = true;
    mode = 'idle';
    startedAt = 0;
    lockedTree = null;
    setProgress(0);
    setPrompt(currentTree());
  }

  function tick(now) {
    hideLegacy();
    const t = currentTree();

    if (mode === 'holding') {
      if (t !== lockedTree || !canInteract(lockedTree)) {
        stopHold();
        setPrompt(t);
      } else {
        const pct = ((now - startedAt) / HOLD_MS) * 100;
        setProgress(pct);
        if (pct >= 100) {
          mode = 'open';
          lockedTree = null;
          startedAt = 0;
          setProgress(100);
          openInfo(t);
        }
      }
    } else if (mode === 'idle') {
      setPrompt(t);
      progress.hidden = true;
    } else {
      prompt.hidden = true;
      progress.hidden = true;
    }

    requestAnimationFrame(tick);
  }

  addEventListener('keydown', ev => {
    if (ev.key.toLowerCase() !== 'e') return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    if (ev.repeat) return;
    if (mode === 'open') closeInfo();
    else beginHold();
  }, true);

  addEventListener('keyup', ev => {
    if (ev.key.toLowerCase() !== 'e') return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    if (mode === 'holding') {
      stopHold();
      setPrompt(currentTree());
    }
  }, true);

  addEventListener('blur', () => {
    if (mode === 'holding') stopHold();
    if (mode === 'idle') setPrompt(currentTree());
  });

  info.hidden = true;
  prompt.hidden = true;
  progress.hidden = true;
  requestAnimationFrame(tick);
})();
