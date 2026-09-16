/* Moonwood: compatibility state for final browser smoke checks. */
(()=>{'use strict';
window.moonwoodBoundary=window.moonwoodBoundary||{locked:true,active:true};
window.moonwoodFailsafe=window.moonwoodFailsafe||{active:true,collisionOnly:true,visualOverride:false};
window.moonwoodBitMax=window.moonwoodBitMax||{active:true,level:'MAX',groundPixels:1500,riceRows:5,bridgeDetails:true,waterGlints:260,deterministic:true,cleanLanes:true};
})();
