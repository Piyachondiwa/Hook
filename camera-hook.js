/* Moonwood: stable world camera with a single 3/4 projection transform. */
(()=>{'use strict';
if(typeof HTMLCanvasElement==='undefined')return;
const getContext=HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext=function(type,options){
  const ctx=getContext.call(this,type,options);
  if(type!=='2d'||!ctx||this.id!=='game'||ctx.__moonwoodCameraHook)return ctx;
  const translate=ctx.translate.bind(ctx),scale=ctx.scale.bind(ctx);
  ctx.translate=(x,y)=>{
    const cam=typeof window.moonwoodCamera==='function'?window.moonwoodCamera():null;
    if(!cam){translate(x,y);return;}
    translate(-cam.x,-cam.y);
    if(cam.scaleY&&cam.scaleY!==1)scale(1,cam.scaleY);
  };
  ctx.__moonwoodCameraHook=true;
  window.moonwoodCameraHook={active:true,scaleApplied:true,singleProjection:true};
  return ctx;
};
})();
