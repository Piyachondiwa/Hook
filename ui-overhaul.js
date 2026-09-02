const uiRoot=document.getElementById('ui');
const status=document.querySelector('.status');
const chapter=document.getElementById('chapter');
status.innerHTML=`<div class="hudFrame"><div class="levelBadge"><small>LV</small><strong>1</strong></div><div class="heroStats"><div class="hudName">ADVENTURER</div><div class="resourceBar hp"><span>HP</span><div><i></i></div><em>100 / 100</em></div><div class="resourceBar mp"><span>MP</span><div><i></i></div><em>100 / 100</em></div><div class="resourceBar sp"><span>ST</span><div><i></i></div><em>100 / 100</em></div></div></div><div class="hudTitle">MOONWOOD</div>`;
const combatHud=document.createElement('div');combatHud.id='combatHud';combatHud.innerHTML=`<div class="resource hp"><span>HEALTH</span><div class="track"><i></i></div><em>100/100</em></div><div class="resource mp"><span>MANA</span><div class="track"><i></i></div><em>100/100</em></div><div class="resource sp"><span>STAMINA</span><div class="track"><i></i></div><em>100/100</em></div>`;combatHud.hidden=true;uiRoot.appendChild(combatHud);
const questBadge=document.createElement('div');questBadge.id='questBadge';questBadge.hidden=true;uiRoot.appendChild(questBadge);
const vals={hp:100,mp:100,sp:100};
function paintBar(cls,value,max){const row=status.querySelector('.resourceBar.'+cls);if(!row)return;const pct=Math.max(0,Math.min(100,value/max*100));row.querySelector('i').style.width=pct+'%';row.querySelector('em').textContent=Math.round(value)+' / '+Math.round(max)}
function refreshPolishedUI(){paintBar('hp',vals.hp,100);paintBar('mp',vals.mp,100);paintBar('sp',vals.sp,100)}
refreshPolishedUI();