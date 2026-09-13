(() => {
  'use strict';

  const canvas = document.getElementById('game');
  const ui = document.getElementById('ui');
  const info = document.getElementById('treeInfo');
  if (!canvas || !ui || !info) return;

  let hovered = null;
  let open = false;
  let lastMouse = { x: 0, y: 0 };

  const hoverCard = document.createElement('div');
  hoverCard.id = 'treeHoverCard';
  hoverCard.innerHTML = '<div class="name"></div><div class="hint">คลิกเพื่อดูข้อมูล</div>';
  ui.appendChild(hoverCard);

  function getTrees() {
    return Array.isArray(window.moonwoodTrees) ? window.moonwoodTrees : [];
  }

  function getCamera() {
    const s = typeof window.moonwoodCamera === 'function' ? window.moonwoodCamera() : null;
    return s || { x: 0, y: 0 };
  }

  function screenToWorld(ev) {
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    const screenX = (ev.clientX - rect.left) * sx;
    const screenY = (ev.clientY - rect.top) * sy;
    const cam = getCamera();
    const centerY = canvas.height / 2 + 10;
    const x = screenX + cam.x;
    const y = cam.y + ((screenY - centerY) / .86) + centerY;
    return { x, y, screenX: ev.clientX, screenY: ev.clientY };
  }

  function insideTree(t, x, y) {
    if (!t) return false;
    const scale = typeof window.treeScale === 'function' ? window.treeScale(t) : 1.5;
    const dx = x - t.x;
    const dy = y - (t.y - 24 * scale);
    const rx = 54 * scale;
    const ry = 70 * scale;
    return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
  }

  function pickTree(x, y) {
    const hits = getTrees().filter(t => insideTree(t, x, y));
    if (!hits.length) return null;
    hits.sort((a, b) => b.y - a.y);
    return hits[0];
  }

  function moveCard(ev, tree) {
    const rect = ui.getBoundingClientRect();
    hoverCard.style.left = `${ev.clientX - rect.left}px`;
    hoverCard.style.top = `${ev.clientY - rect.top}px`;
    hoverCard.querySelector('.name').textContent = tree?.info?.[0] || 'ต้นไม้';
  }

  function setHover(tree, ev) {
    hovered = tree;
    if (tree && !open) {
      hoverCard.style.display = 'block';
      moveCard(ev, tree);
      canvas.style.cursor = 'pointer';
    } else {
      hoverCard.style.display = 'none';
      canvas.style.cursor = open ? 'default' : 'crosshair';
    }
  }

  function openInfo(tree) {
    if (!tree?.info) return;
    const [name, latin, scientific, type, history] = tree.info;
    info.classList.add('mouseInfo');
    info.innerHTML = `<h3>${name}</h3><p class="latin">${latin} · <i>${scientific}</i></p><p><b>ประเภท:</b> ${type}</p><p class="fact"><b>ประวัติ / ที่มา:</b> ${history}</p><div class="close">คลิกพื้นที่ว่างเพื่อปิด</div>`;
    info.hidden = false;
    info.style.display = 'block';
    open = true;
    hoverCard.style.display = 'none';
    canvas.style.cursor = 'default';
  }

  function closeInfo() {
    open = false;
    info.hidden = true;
    info.style.display = 'none';
    info.classList.remove('mouseInfo');
    hovered = null;
    canvas.style.cursor = 'crosshair';
  }

  canvas.addEventListener('mousemove', ev => {
    lastMouse = screenToWorld(ev);
    if (open) return;
    const tree = pickTree(lastMouse.x, lastMouse.y);
    setHover(tree, ev);
  });

  canvas.addEventListener('mouseleave', () => {
    if (!open) {
      hovered = null;
      hoverCard.style.display = 'none';
      canvas.style.cursor = 'crosshair';
    }
  });

  canvas.addEventListener('click', ev => {
    if (open) {
      closeInfo();
      return;
    }
    const pos = screenToWorld(ev);
    const tree = pickTree(pos.x, pos.y);
    if (tree) openInfo(tree);
  });

  info.addEventListener('click', ev => ev.stopPropagation());
  info.hidden = true;
  info.style.display = 'none';
  canvas.style.cursor = 'crosshair';

  window.moonwoodMouseTree = { closeInfo };
})();