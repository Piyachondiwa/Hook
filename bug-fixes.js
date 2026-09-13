(() => {
  const ui = document.getElementById('ui');
  if (!ui) return;

  // Remove every legacy tree prompt and legacy E interaction state.
  const hideLegacy = () => {
    document.querySelectorAll('.treePrompt').forEach(el => {
      el.hidden = true;
      el.style.display = 'none';
    });
  };
  hideLegacy();
  setInterval(hideLegacy, 100);

  // Keep the player from entering the visible trunk area.
  // game.js already has trunk collision; this only supplies a small safety margin.
  if (typeof window.blocked === 'function' && !window.__moonwoodCollisionPatched) {
    const baseBlocked = window.blocked;
    window.blocked = function (x, y) {
      if (baseBlocked(x, y)) return true;
      const tree = typeof window.closestTree === 'function' ? window.closestTree() : null;
      if (!tree) return false;
      const scale = typeof window.treeScale === 'function' ? window.treeScale(tree) : 1.5;
      const trunkY = tree.y + 42 * scale;
      return Math.hypot(x - tree.x, y - trunkY) < Math.max(24, 12 * scale + 10);
    };
    window.__moonwoodCollisionPatched = true;
  }
})();
