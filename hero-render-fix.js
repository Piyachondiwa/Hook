/* Moonwood: restore the player draw pass that the minimal game loop dropped. */
(()=>{'use strict';
if(typeof HTMLCanvasElement==='undefined')return;
const getContext=HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext=function(type,options){
  const ctx=getContext.call(this,type,options);
  if(type!=='2d'||!ctx||this.id!=='game'||ctx.__moonwoodHeroFix)return ctx;
  const clear=ctx.clearRect.bind(ctx),save=ctx.save.bind(ctx),restore=ctx.restore.bind(ctx),translate=ctx.translate.bind(ctx);
  ctx.clearRect=(x,y,w,h)=>{ctx.__moonwoodHeroDrawn=false;return clear(x,y,w,h)};
  ctx.restore=()=>{
    restore();
    if(ctx.__moonwoodHeroDrawn)return;
    const cam=typeof window.moonwoodCamera==='function'?window.moonwoodCamera():null;
    if(!cam||typeof window.hero!=='function')return;
    save();
    translate(-cam.x,-cam.y);
    window.hero();
    if(typeof window.arrow==='function')window.arrow();
    restore();
    ctx.__moonwoodHeroDrawn=true;
  };
  ctx.__moonwoodHeroFix=true;
  window.moonwoodRenderFix={active:true,heroRestored:true,walkingPoseRestored:true};
  return ctx;
};
})();
