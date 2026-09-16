import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
page.on('console', message => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });

await page.goto('http://127.0.0.1:4173/index.html', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(900);
const menuState = await page.evaluate(() => ({open:!!document.getElementById('mainMenu'),start:!!document.getElementById('menuStart'),about:!!document.getElementById('menuAboutBtn')}));
if (!menuState.open || !menuState.start || !menuState.about) throw new Error(`Main menu is incomplete: ${JSON.stringify(menuState)}`);
await page.click('#menuAboutBtn');
if (!(await page.evaluate(() => document.getElementById('menuAbout')?.classList.contains('open')))) throw new Error('About panel did not open');
await page.click('#menuClose');
if (!(await page.evaluate(() => !document.getElementById('menuAbout')?.classList.contains('open')))) throw new Error('About panel did not close');
await page.click('#menuStart');
await page.waitForTimeout(850);
if (!(await page.evaluate(() => !document.getElementById('mainMenu')))) throw new Error('Start button did not close the main menu');

const state = await page.evaluate(() => {
  const canvas=document.getElementById('game'),scene=window.moonwoodScene||{},layout=window.moonwoodLayout||{},debug=window.moonwoodDebug||{};
  const check=(x,y)=>{try{return debug.blocked?debug.blocked(x,y)===false:blocked(x,y)===false}catch{return false}};
  const gameplay=typeof window.moonwoodState==='function'?window.moonwoodState():null;
  const riceXs=[3820,4090,4360,4650,4890],fenceXs=[3730,4000,4270,4550,4820],roadXs=[3840,4040,4580,5010];
  const riceSamples=riceXs.map(x=>({x,blocked:!check(x,1280)}));
  const fenceSamples=fenceXs.map(x=>({x,blocked:!check(x,1220)}));
  const roadSamples=roadXs.map(x=>({x,open:check(x,1100)}));
  return {
    canvasWidth:canvas?.width,canvasHeight:canvas?.height,scene,layout,gameplay,
    debugAvailable:typeof debug.player==='function'&&typeof debug.move==='function'&&typeof debug.setPlayer==='function',bridgeFix:window.moonwoodBridgeFix||null,
    bridgeApproachOpen:check(3330,1160),bridgeOpen:check(3600,1160),bridgeEastLandingOpen:check(3840,1160),islandRoadAfterBridgeOpen:check(3890,1160),
    bridgeNorthBlocked:!check(3600,1020),bridgeSouthBlocked:!check(3600,1320),islandOutsideNorthBlocked:!check(3700,620),islandOutsideSouthBlocked:!check(3700,1765),
    villageRoadOpen:check(4260,1100),roadClearAfterBridge:roadSamples,houseBlocked:check(3950,920),riceBlocked:riceSamples.every(q=>q.blocked),riceSamples,
    fenceBlocked:fenceSamples.every(q=>q.blocked),fenceSamples,outsideWestBlocked:!check(3510,1000),outsideEastBlocked:!check(5200,1000),outsideNorthBlocked:!check(4300,580),outsideSouthBlocked:!check(4300,1800),
    camera:typeof window.moonwoodCamera==='function'?window.moonwoodCamera():null,cameraHook:window.moonwoodCameraHook||null,boundary:window.moonwoodBoundary||null,failsafe:window.moonwoodFailsafe||null,
    elevation:window.moonwoodElevation||null,oceanFix:window.moonwoodOceanFix||null,islandTrees:window.moonwoodIslandTrees||null,polish:window.moonwoodPolish||null,effects:window.moonwoodEffects||null,bitMax:window.moonwoodBitMax||null
  };
});
await page.screenshot({path:'test-results/moonwood-main.png',fullPage:false});
const movementProbe=await page.evaluate(()=>{const d=window.moonwoodDebug;if(!d||typeof d.player!=='function'||typeof d.move!=='function'||typeof d.setPlayer!=='function')return{available:false};const old=d.player();d.setPlayer(3420,1160);const samples=[];for(let i=0;i<10;i++){d.move(45,0);samples.push(d.player())}const result={available:true,start:old,after:d.player(),samples};d.setPlayer(old.x,old.y);return result});
const treeHitboxProbe=await page.evaluate(()=>{const positions=window.moonwoodIslandTreePositions||[],samples=[];for(const t of positions){const ok=blocked(t.x,t.y+43*t.s)===true;samples.push({x:t.x,y:t.y,type:t.type,blocked:ok})}return{available:positions.length>0,checked:samples.length,allBlocked:samples.length>0&&samples.every(q=>q.blocked),samples}});
const islandState=await page.evaluate(()=>{const d=window.moonwoodDebug;if(!d||typeof d.setPlayer!=='function'||typeof window.world!=='function')return{available:false};d.setPlayer(4300,1080);window.world();return{available:true,player:d.player(),camera:typeof window.moonwoodCamera==='function'?window.moonwoodCamera():null,scene:window.moonwoodScene||null}});
await page.waitForTimeout(100);await page.screenshot({path:'test-results/moonwood-japan-island.png',fullPage:false});
const visualAudit={cameraProjectionApplied:!!(state.cameraHook?.active&&state.cameraHook?.scaleApplied&&state.camera?.scaleY===0.86),japaneseTreeGroundShadows:!!state.islandTrees?.groundShadows,characterPolish:!!(state.polish?.active&&state.polish?.pixelOnly===true&&state.polish?.readablePose===true),effects:!!(state.effects?.cameraAligned&&state.effects?.sakuraPetals&&state.effects?.fireflies),naturalThaiLayout:!!state.layout.naturalized,pixelDetail:state.scene.pixelDetail==='high'&&!!state.elevation?.pixelTerrain,bitMax:!!(state.bitMax?.active&&state.bitMax?.level==='MAX'&&state.bitMax?.deterministic)};
if(errors.length)throw new Error(errors.join('\n'));
if(state.canvasWidth!==640||state.canvasHeight!==360)throw new Error(`Unexpected canvas: ${state.canvasWidth}x${state.canvasHeight}`);
if(!state.debugAvailable)throw new Error('Gameplay debug bridge is not loaded');
if(!state.oceanFix?.active)throw new Error('Ocean renderer fix is not loaded');
if(!state.scene.oceanBackground||!state.scene.bridgeWalkable||!state.scene.naturalJapaneseLayout||!state.scene.cleanWalkLanes)throw new Error('Core scene flags missing');
if(!state.bridgeFix?.authoritative)throw new Error('Authoritative bridge fix is not loaded');
if(!state.bridgeApproachOpen||!state.bridgeOpen||!state.bridgeEastLandingOpen||!state.islandRoadAfterBridgeOpen||!state.bridgeNorthBlocked||!state.bridgeSouthBlocked)throw new Error(`Bridge/island corridor failed: ${JSON.stringify({approach:state.bridgeApproachOpen,bridge:state.bridgeOpen,landing:state.bridgeEastLandingOpen,road:state.islandRoadAfterBridgeOpen,north:state.bridgeNorthBlocked,south:state.bridgeSouthBlocked})}`);
if(!state.islandOutsideNorthBlocked||!state.islandOutsideSouthBlocked)throw new Error(`Island north/south boundary failed: ${JSON.stringify({north:state.islandOutsideNorthBlocked,south:state.islandOutsideSouthBlocked})}`);
if(!movementProbe.available||movementProbe.after.x<3650)throw new Error(`Actual bridge movement probe failed: ${JSON.stringify(movementProbe)}`);
if(!treeHitboxProbe.available||!treeHitboxProbe.allBlocked)throw new Error(`Tree hitbox probe failed: ${JSON.stringify(treeHitboxProbe)}`);
if(!state.villageRoadOpen||state.roadClearAfterBridge.some(q=>!q.open))throw new Error(`Village travel road contains an unexpected blocker: ${JSON.stringify(state.roadClearAfterBridge)}`);
if(state.houseBlocked)throw new Error('Player can walk through a house');
if(!state.riceBlocked)throw new Error(`Player can walk through a rice field: ${JSON.stringify(state.riceSamples)}`);
if(!state.fenceBlocked)throw new Error(`Player can walk through a fence: ${JSON.stringify(state.fenceSamples)}`);
if(!state.outsideWestBlocked||!state.outsideEastBlocked||!state.outsideNorthBlocked||!state.outsideSouthBlocked)throw new Error('Player can leave the island boundary');
if(!state.boundary?.locked)throw new Error('Hard island boundary lock is not active');
if(!state.failsafe?.collisionOnly||state.failsafe?.visualOverride)throw new Error('Failsafe visual override is active');
if(!state.gameplay||state.gameplay.hp!==state.gameplay.maxHp||state.gameplay.mana!==state.gameplay.maxMana||state.gameplay.stamina!==state.gameplay.maxStamina)throw new Error(`Starting resources are not full: ${JSON.stringify(state.gameplay)}`);
if(!islandState.available||islandState.player.x!==4300||islandState.player.y!==1080)throw new Error('Japanese island render probe could not be positioned');
if(!visualAudit.bitMax)throw new Error('BIT MAX finishing pass is not active');
console.log('MOONWOOD BROWSER SMOKE PASS');console.log('VISUAL AUDIT',JSON.stringify(visualAudit,null,2));console.log(JSON.stringify({state,movementProbe,treeHitboxProbe,islandState},null,2));await browser.close();
