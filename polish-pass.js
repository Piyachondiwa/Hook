/* Moonwood final art polish: cleaner character silhouette, contact shadows, and readable pixel posing. */
(()=>{'use strict';
if(typeof R==='undefined'||typeof p==='undefined')return;

if(typeof treeShadow==='function'&&typeof treeScale==='function'){
  treeShadow=function(t){
    const s=treeScale(t),x=t.x,y=t.y,w=70*s,h=11*s;
    R(x-w*.50,y+33*s,w*.76,h,'#13291f');
    R(x-w*.38,y+39*s,w*.74,h*.58,'#10241c');
    R(x-w*.20,y+44*s,w*.48,h*.34,'#0b1d17');
  };
}

function heroPolished(){
  const x=p.x,y=p.y,walk=!!p.walking,f=p.frame|0,dir=p.dir||'down';
  const bob=walk&&(f===1||f===3)?-1:0;
  const step=walk?(f===0?2:f===2?-2:0):0;
  const arm=walk?(f===0?2:f===2?-2:0):0;

  /* grounded contact shadow */
  R(x-12,y+24,24,4,'#10251d');
  R(x-8,y+28,16,2,'#0c1b16');

  /* boots + legs, offset as a readable two-step pose */
  R(x-9+step,y+9+bob,7,15,'#222b39');
  R(x+2-step,y+9+bob,7,15,'#222b39');
  R(x-10+step,y+22+bob,9,4,'#0f151c');
  R(x+2-step,y+22+bob,9,4,'#0f151c');
  R(x-8+step,y+20+bob,6,2,'#38445a');
  R(x+2-step,y+20+bob,6,2,'#38445a');

  /* tunic outline and body */
  R(x-10,y-7+bob,20,20,'#15243a');
  R(x-8,y-5+bob,16,18,'#315f9c');
  R(x-6,y-3+bob,12,7,'#6e93bd');
  R(x-7,y+4+bob,14,8,'#233f6e');
  R(x-5,y+8+bob,10,3,'#1b335b');

  /* arms. Keep hands near torso so the sprite reads 3/4 rather than T-posing. */
  R(x-12+arm,y-4+bob,4,13,'#1a2940');
  R(x+8-arm,y-4+bob,4,13,'#1a2940');
  R(x-11+arm,y-2+bob,3,11,'#e7ba8e');
  R(x+8-arm,y-2+bob,3,11,'#e7ba8e');
  R(x-11+arm,y+8+bob,5,4,'#315f9c');
  R(x+7-arm,y+8+bob,5,4,'#315f9c');

  /* neck + head */
  R(x-4,y-11+bob,8,7,'#c99270');
  R(x-8,y-23+bob,16,15,'#e7ba8e');
  R(x-9,y-24+bob,18,6,'#342726');
  R(x-7,y-28+bob,14,6,'#51332d');
  R(x-5,y-25+bob,12,3,'#6a4032');

  if(dir==='up'){
    /* back of head: hair dominates, no floating facial pixels */
    R(x-8,y-21+bob,16,13,'#55352e');
    R(x-6,y-22+bob,12,4,'#6a4032');
    R(x-6,y-14+bob,12,5,'#422b28');
  }else if(dir==='left'){
    R(x-8,y-17+bob,5,2,'#17202b');
    R(x-5,y-17+bob,3,2,'#17202b');
    R(x-9,y-14+bob,3,5,'#c98f6d');
  }else if(dir==='right'){
    R(x+3,y-17+bob,3,2,'#17202b');
    R(x+5,y-14+bob,3,5,'#c98f6d');
  }else{
    R(x-5,y-17+bob,2,2,'#17202b');
    R(x+3,y-17+bob,2,2,'#17202b');
    R(x-4,y-13+bob,8,2,'#d89a76');
  }

  /* rim pixels separate hair from the dark canopy without anti-aliasing. */
  R(x-8,y-24+bob,16,2,'#2a2021');
  R(x-7,y-28+bob,14,2,'#3f2928');
}

if(typeof hero==='function')hero=heroPolished;
window.moonwoodPolish={active:true,hero:'polished-3q',contactShadows:true,pixelOnly:true,readablePose:true};
})();
