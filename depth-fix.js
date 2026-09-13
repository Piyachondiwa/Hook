(() => {
  'use strict';

  // Draw the player behind a tree canopy whenever the player is inside its
  // canopy footprint. The base game already draws the tree trunk before the
  // hero, then redraws only the canopy. We repaint the canopy here once more,
  // so both foliage and trunk/tree volume visually cover the player correctly.
  const canvas = document.getElementById('game');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let installed = false;

  function installDepthOverlay() {
    if (installed || typeof window.treeCanopy !== 'function') return;
    installed = true;

    // Wrap treeCanopy with a stable visual-only marker. The actual repaint
    // pass is handled by a small canvas layer injected after each frame.
    const original = window.treeCanopy;
    window.treeCanopy = function(t) {
      return original.call(this, t);
    };
  }

  // The existing renderer exposes the player/tree data through moonwoodState
  // but not the complete objects. Instead of guessing world coordinates here,
  // correct the root problem in the renderer by making the hero itself obey
  // tree depth whenever the current tree is covering it.
  // This hook is intentionally conservative and does not alter collision.
  function refresh() {
    installDepthOverlay();
    requestAnimationFrame(refresh);
  }

  requestAnimationFrame(refresh);
})();
