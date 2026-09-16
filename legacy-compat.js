/* Moonwood: compatibility helpers for legacy visual passes. */
(()=>{'use strict';
if(typeof window.rnd!=='function')window.rnd=(x,y=0)=>{const n=Math.sin((x||0)*12.9898+(y||0)*78.233+91827)*43758.5453;return n-Math.floor(n)};
if(typeof window.treeCanopy!=='function')window.treeCanopy=()=>{};
if(typeof window.grassland!=='function')window.grassland=()=>{};
})();
