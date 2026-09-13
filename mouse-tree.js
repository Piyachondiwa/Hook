(()=>{'use strict';
const canvas=document.getElementById('game'),ui=document.getElementById('ui'),info=document.getElementById('treeInfo');if(!canvas||!ui||!info)return;
let open=false;
const hoverCard=document.createElement('div');hoverCard.id='treeHoverCard';hoverCard.innerHTML='<div class="name"></div><div class="hint">คลิกเพื่อดูข้อมูล</div>';ui.appendChild(hoverCard);
function trees(){return Array.isArray(window.moonwoodTrees)?window.moonwoodTrees:[]}
function cam(){return typeof window.moonwoodCamera==='function'?window.moonwoodCamera():{x:0,y:0,scaleY:1}}
function screenToWorld(ev){const r=canvas.getBoundingClientRect(),sx=canvas.width/r.width,sy=canvas.height/r.height,px=(ev.clientX-r.left)*sx,py=(ev.clientY-r.top)*sy,q=cam(),scale=q.scaleY||1;return{x:px+q.x,y:py/scale+q.y}}
function insideTree(t,x,y){const s=typeof treeScale==='function'?treeScale(t):1.5,dx=x-t.x,dy=y-(t.y-24*s),rx=54*s,ry=70*s;return dx*dx/(rx*rx)+dy*dy/(ry*ry)<=1}
function pick(x,y){const hits=trees().filter(t=>insideTree(t,x,y));hits.sort((a,b)=>b.y-a.y);return hits[0]||null}
function card(ev,t){const r=ui.getBoundingClientRect();hoverCard.style.left=(ev.clientX-r.left)+'px';hoverCard.style.top=(ev.clientY-r.top)+'px';hoverCard.querySelector('.name').textContent=t?.info?.[0]||'ต้นไม้'}
function hover(ev){if(open)return;const t=pick(...Object.values(screenToWorld(ev)));if(t){hoverCard.style.display='block';card(ev,t);canvas.style.cursor='pointer'}else{hoverCard.style.display='none';canvas.style.cursor='default'}}
function close(){open=false;info.hidden=true;info.style.display='none';info.classList.remove('mouseInfo');hoverCard.style.display='none';canvas.style.cursor='default'}
function openInfo(t){if(!t?.info)return;const [name,latin,scientific,type,history]=t.info;info.classList.add('mouseInfo');info.innerHTML='<h3>'+name+'</h3><p class="latin">'+latin+' · <i>'+scientific+'</i></p><p><b>ประเภท:</b> '+type+'</p><p class="fact"><b>ประวัติ / ที่มา:</b> '+history+'</p><div class="close">คลิกพื้นที่ว่างเพื่อปิด</div>';info.hidden=false;info.style.display='block';open=true;hoverCard.style.display='none';canvas.style.cursor='default'}
canvas.addEventListener('mousemove',hover);canvas.addEventListener('mouseleave',()=>{if(!open)hoverCard.style.display='none'});canvas.addEventListener('click',ev=>{if(open){close();return}const q=screenToWorld(ev),t=pick(q.x,q.y);if(t)openInfo(t)});info.addEventListener('click',ev=>ev.stopPropagation());info.hidden=true;info.style.display='none';canvas.style.cursor='default';window.moonwoodMouseTree={closeInfo:close};
})();
