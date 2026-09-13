// Deprecated compatibility shim. Tree interaction lives in interaction-stable.js.
(() => {
  document.querySelectorAll('.treePrompt').forEach(el => {
    el.hidden = true;
    el.style.display = 'none';
  });
})();
