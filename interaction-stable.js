(() => {
  'use strict';

  const HOLD_MS = 850;
  const INTERACT_RADIUS = 58;
  const ui = document.getElementById('ui');
  const info = document.getElementById('treeInfo');
  if (!ui || !info) return;

  let mode = 'idle';
  let eDown = false;
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
    return !!t && !!state() && distanceToTree(t, state()) <= INTERACT_RADIUS;
  }

  function setPrompt(t) {
    hideLegacy();
    const visible = mode === 'idle' && !info.open && canInteract(t);
    prompt.hidden = !visible;
    if (visible) {
      const name = t?.info?.[0] || '???';
      prompt.innerHTML = `<span class="holdTreeName">${name}</span><small>E &nbsp; กดค้างเพื่อค้นหา</small>`;
    }
  }

  function setProgress(value, visible = true) {
    const pct = Math.max(0, Math.min(100, value));
    const label = progress.querySelector('.searchLabel b');
    const bar = progress.querySelector('.searchTrack i');
    if (label) label.textContent = `${Math.round(pct)}%`;
    if (bar) bar.style.width = `${pct}%`;
    progress.hidden = !visible;
  }

  function cancelHold() {
    mode = 'idle';
    startedAt = 0;
    lockedTree = null;
    setProgress(0, false);
  }

  function openInfo(t) {
    if (!canInteract(t) || !t?.info) return false;
    const s = t.info;
    info.innerHTML = `<h3>${s[0]}</h3><p class="latin">${s[1]} · <i>${s[2]}</i></p><p><b>ประเภท:</b> ${s[3]}</p><p class="fact">${s[4]}</p><div class="close">E &nbsp; กด E เพื่อปิด</div>`;
    info.hidden = false;
    info.open = true;
    mode = 'open';
    prompt.hidden = true;
    setProgress(100, false);
    return true;
  }

  function closeInfo() {
    info.hidden = true;
    info.open = false;
    mode = 'idle';
    startedAt = 0;
    lockedTree = null;
    setProgress(0, false);
    setPrompt(currentTree());
  }

  function beginHold() {
    if (mode !== 'idle') return;
    const t = currentTree();
    if (!canInteract(t)) return;
    mode = 'holding';
    lockedTree = t;
    startedAt = performance.now();
    prompt.hidden = true;
    setProgress(0, true);
  }

  function tick(now) {
    hideLegacy();
    const t = currentTree();

    if (mode === 'holding') {
      if (!eDown || t !== lockedTree || !canInteract(lockedTree)) {
        cancelHold();
        setPrompt(t);
      } else {
        const pct = ((now - startedAt) / HOLD_MS) * 100;
        setProgress(pct, true);
        if (pct >= 100) {
          cancelHold();
          openInfo(lockedTree);
        }
      }
    } else if (mode === 'idle') {
      setPrompt(t);
      setProgress(0, false);
    } else {
      prompt.hidden = true;
      setProgress(0, false);
    }

    requestAnimationFrame(tick);
  }

  addEventListener('keydown', ev => {
    if (ev.key.toLowerCase() !== 'e') return;
    ev.preventDefault();
    if (ev.repeat) return;
    eDown = true;
    if (mode === 'open') closeInfo();
    else beginHold();
  }, true);

  addEventListener('keyup', ev => {
    if (ev.key.toLowerCase() !== 'e') return;
    ev.preventDefault();
    eDown = false;
    if (mode === 'holding') {
      cancelHold();
      setPrompt(currentTree());
    }
  }, true);

  addEventListener('blur', () => {
    eDown = false;
    if (mode === 'holding') cancelHold();
    if (mode === 'idle') setPrompt(currentTree());
  });

  info.hidden = true;
  info.open = false;
  prompt.hidden = true;
  progress.hidden = true;
  requestAnimationFrame(tick);
})();
