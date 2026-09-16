/* Moonwood: final camera coordinates. Forward framing without global canvas scaling. */
(()=>{'use strict';
if(typeof p==='undefined'||typeof c==='undefined')return;
window.moonwoodCamera=()=>({x:Math.max(0,Math.min(5400-c.width,p.x-c.width/2)),y:Math.max(0,Math.min(2500-c.height,p.y-c.height*.60)),scaleY:1});
window.moonwoodCameraStable={active:true,forwardFrame:true,globalScale:false};
})();
