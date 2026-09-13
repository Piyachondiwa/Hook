(() => {
  const ui = document.getElementById('ui');
  if (!ui) return;

  // Kill every legacy prompt created by game.js.
  const hideLegacyPrompt = () => {
    document.querySelectorAll('.treePrompt').forEach(el => {
      el.hidden = true;
      el.style.display = 'none';
    });
  };

  // Disable the old one-tap E path. The hold interaction is the only tree action.
  const patchLegacyPromptUpdater = () => {
    if (typeof window.updateTreePrompt === 'function' && !window.__moonwoodPromptPatched) {
      window.updateTreePrompt = () => hideLegacyPrompt();
      window.__moonwoodPromptPatched = true;
    }
  };

  // Remove stale overlay elements from any previous script version.
  const removeDuplicateHoldUI = () => {
    const prompts = [...document.querySelectorAll('#holdTreePrompt')];
    prompts.slice(1).forEach(el => el.remove());
    const bars = [...document.querySelectorAll('#treeSearchProgress')];
    bars.slice(1).forEach(el => el.remove());
  };

  hideLegacyPrompt();
  patchLegacyPromptUpdater();
  removeDuplicateHoldUI();

  // Keep the game canvas and UI state sane when scripts initialize in different orders.
  const safeState = () => {
    try { return typeof window.moonwoodState === 'function' ? window.moonwoodState() : null; }
    catch (_) { return null; }
  };

  // Prevent keyboard scroll/interference for gameplay keys without stealing editable input focus.
  addEventListener('keydown', ev => {
    const tag = ev.target?.tagName;
    const editable = tag === 'INPUT' || tag === 'TEXTAREA' || ev.target?.isContentEditable;
    if (!editable && ['w','a','s','d','e','arrowup','arrowdown','arrowleft','arrowright',' '].includes(ev.key.toLowerCase())) {
      ev.preventDefault();
    }
  }, true);

  // Expose a stable read-only snapshot for future UI layers.
  window.moonwoodRuntimeState = safeState;

  requestAnimationFrame(() => {
    hideLegacyPrompt();
    patchLegacyPromptUpdater();
    removeDuplicateHoldUI();
  });
})();
