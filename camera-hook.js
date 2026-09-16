/* Moonwood: stable camera. No global Y scaling, so terrain, collision and character stay aligned. */
(()=>{'use strict';
if(typeof HTMLCanvasElement==='undefined')return;
const getContext=HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext=function(type,options){
  const ctx=getContext.call(this,type,options);
  if(type!=='2d'||!ctx||this.id!=='game'||ctx.__moonwoodCameraHook)return ctx;
  const translate=ctx.translate.bind(ctx);
  ctx.translate=(x,y)=>{
    const cam=typeof window.moonwoodCamera==='function'?window.moonwoodCamera():null;
    if(!cam){translate(x,y);return}
    translate(-cam.x,-cam.y);
  };
  ctx.__moonwoodCameraHook=true;
  window.moonwoodCameraHook={active:true,scaleApplied:false,singleProjection:true,stable:true};
  return ctx;
};
})();
