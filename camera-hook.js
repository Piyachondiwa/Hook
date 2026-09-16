/* Moonwood camera hook: apply the expanded-scene camera and its 3/4 vertical projection. */
(()=>{'use strict';
if(typeof HTMLCanvasElement==='undefined')return;
const getContext=HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext=function(type,options){
  const ctx=getContext.call(this,type,options);
  if(type!=='2d'||!ctx||this.id!=='game'||ctx.__moonwoodCameraHook)return ctx;
  const translate=ctx.translate.bind(ctx),scale=ctx.scale.bind(ctx);
  ctx.translate=(x,y)=>{
    if(typeof window.moonwoodCamera==='function'){
      const cam=window.moonwoodCamera();
      translate(-cam.x,-cam.y);
      if(cam.scaleY&&cam.scaleY!==1)scale(1,cam.scaleY);
      return;
    }
    translate(x,y);
  };
  ctx.__moonwoodCameraHook=true;
  window.moonwoodCameraHook={active:true,scaleApplied:true};
  return ctx;
};
})();
