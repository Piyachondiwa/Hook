/* Moonwood performance pass: cull off-screen trees and limit expensive detail work to the camera view. */
(()=>{'use strict';
if(typeof c==='undefined'||typeof g==='undefined'||typeof p==='undefined'||typeof W==='undefined')return;
const oldBase=typeof treeBase==='function'?treeBase:null;
const oldCanopy=typeof treeCanopy==='function'?treeCanopy:null;
function visibleTree(t,pad=140){const camX=Math.max(0,Math.min(W-c.width,p.x-c.width/2));const camY=Math.max(0,Math.min(H-c.height,p.y-c.height/2));const s=typeof treeScale==='function'?treeScale(t):1.5;return t.x+90*s>camX-pad&&t.x-90*s<camX+c.width+pad&&t.y+95*s>camY-pad&&t.y-115*s<camY+c.height+pad}
if(oldBase)treeBase=function(t){if(visibleTree(t,120))oldBase(t)};
if(oldCanopy)treeCanopy=function(t){if(visibleTree(t,140))oldCanopy(t)};
window.moonwoodPerformance={treeCulling:true};
})();
