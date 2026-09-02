(() => {
  /* Single source of truth for trunk collision. */
  if (typeof window.blocked === 'function' && !window.__moonwoodBlockedWrapped) {
    const originalBlocked = window.blocked;
    window.blocked = function(x, y) {
      if (originalBlocked(x, y)) return true;
      const t = typeof window.closestTree === 'function' ? window.closestTree() : null;
      if (!t) return false;
      const s = typeof window.treeScale === 'function' ? window.treeScale(t) : 1.5;
      const trunkY = t.y + 42 * s;
      return Math.hypot(x - t.x, y - trunkY) < Math.max(24, 14 * s + 12);
    };
    window.__moonwoodBlockedWrapped = true;
  }
})();
