/* Moonwood island failsafe: collision-only guard. Visual terrain must never be painted over the scene. */
(()=>{'use strict';
if(typeof p==='undefined')return;
/*
  The previous failsafe painted large fallback rectangles across x=3500..5150.
  That layer sat on top of the Japanese island and created the giant gray/green
  vertical seam visible during camera movement. Rendering is now owned by
  island-expansion.js + japan-elevation.js. The final collision guard lives in
  island-collision-lock.js, which is loaded after this file.
*/
window.moonwoodFailsafe={active:true,collisionOnly:true,visualOverride:false};
})();
