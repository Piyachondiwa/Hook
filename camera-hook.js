/* Moonwood camera hook: redirect the original fixed camera to the expanded scene camera. */
(()=>{'use strict';
if(typeof HTMLCanvasElement==='undefined')return;
const getContext=HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext=function(type,options){
  const ctx=getContext.call(this,type,options);
  if(type!=='2d'||!ctx||this.id!=='game'||ctx.__moonwoodCameraHook)return ctx;
  const translate=ctx.translate.bind(ctx);
  ctx.translate=(x,y)=>{
    if(typeof window.moonwoodCamera==='function'){
      const cam=window.moonwoodCamera();
      return translate(-cam.x,-cam.y);
    }
    return translate(x,y);
  };
  ctx.__moonwoodCameraHook=true;
  return ctx;
};
})();
