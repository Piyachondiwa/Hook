(() => {
  const ui = document.getElementById('ui');
  if (!ui) return;

  // The old interaction code in game.js still creates a legacy prompt.
  // Hide it permanently so only interaction-stable.js owns E/tree UI.
  const hideLegacyPrompt = () => {
    document.querySelectorAll('.treePrompt').forEach(el => {
      el.hidden = true;
      el.style.display = 'none';
    });
  };

  // Remove duplicate overlays from previous versions.
  const removeDuplicateHoldUI = () => {
    const prompts = [...document.querySelectorAll('#holdTreePrompt')];
    prompts.slice(1).forEach(el => el.remove());
    const bars = [...document.querySelectorAll('#treeSearchProgress')];
    bars.slice(1).forEach(el => el.remove());
  };

  hideLegacyPrompt();
  removeDuplicateHoldUI();

  // Keep gameplay keys from scrolling the page, without touching form fields.
  addEventListener('keydown', ev => {
    const tag = ev.target?.tagName;
    const editable = tag === 'INPUT' || tag === 'TEXTAREA' || ev.target?.isContentEditable;
    if (!editable && ['w','a','s','d','e','arrowup','arrowdown','arrowleft','arrowright',' '].includes(ev.key.toLowerCase())) {
      ev.preventDefault();
    }
  }, false);

  window.moonwoodRuntimeState = () => {
    try {
      return typeof window.moonwoodState === 'function' ? window.moonwoodState() : null;
    } catch (_) {
      return null;
    }
  };

  requestAnimationFrame(() => {
    hideLegacyPrompt();
    removeDuplicateHoldUI();
  });
})();
