import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
page.on('console', message => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });

await page.goto('http://127.0.0.1:4173/index.html', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(900);

const state = await page.evaluate(() => {
  const canvas = document.getElementById('game');
  const scene = window.moonwoodScene || {};
  const layout = window.moonwoodLayout || {};
  const check = (x,y) => { try { return blocked(x,y) === false; } catch { return false; } };
  return {
    canvasWidth: canvas?.width,
    canvasHeight: canvas?.height,
    scene,
    layout,
    bridgeApproachOpen: check(3525,1160),
    bridgeOpen: check(3600,1160),
    bridgeEdgeOpen: check(3890,1160),
    bridgeOutsideNorthBlocked: !check(3700,1070),
    bridgeOutsideSouthBlocked: !check(3700,1265),
    villageRoadOpen: check(4260,1100),
    houseBlocked: check(3950,920),
    riceBlocked: check(3980,1220),
    fenceBlocked: check(3990,1185),
    outsideWestBlocked: !check(3510,1000),
    outsideBridgeBlocked: !check(3700,1000),
    outsideEastBlocked: !check(5200,1000),
    outsideNorthBlocked: !check(4300,580),
    outsideSouthBlocked: !check(4300,1800),
    camera: typeof window.moonwoodCamera === 'function' ? window.moonwoodCamera() : null,
    boundary: window.moonwoodBoundary || null,
    failsafe: window.moonwoodFailsafe || null,
    elevation: window.moonwoodElevation || null
  };
});

await page.screenshot({ path: 'test-results/moonwood-main.png', fullPage: false });

// Move the real player onto the Japanese island and force a render pass.
const islandState = await page.evaluate(() => {
  if (!window.p || typeof window.world !== 'function') return { available:false };
  window.p.x = 4300;
  window.p.y = 1080;
  window.world();
  return {
    available:true,
    player:{x:window.p.x,y:window.p.y},
    camera:typeof window.moonwoodCamera === 'function' ? window.moonwoodCamera() : null,
    scene:window.moonwoodScene || null
  };
});
await page.waitForTimeout(100);
await page.screenshot({ path: 'test-results/moonwood-japan-island.png', fullPage: false });
await browser.close();

if (errors.length) throw new Error(errors.join('\n'));
if (state.canvasWidth !== 640 || state.canvasHeight !== 360) throw new Error(`Unexpected canvas: ${state.canvasWidth}x${state.canvasHeight}`);
if (!state.scene.oceanBackground) throw new Error('Ocean background flag missing');
if (!state.scene.bridgeWalkable) throw new Error('Bridge walkable flag missing');
if (!state.scene.naturalJapaneseLayout) throw new Error('Japanese layout flag missing');
if (!state.bridgeApproachOpen || !state.bridgeOpen || !state.bridgeEdgeOpen) throw new Error('Bridge entry/collision is blocked');
if (!state.bridgeOutsideNorthBlocked || !state.bridgeOutsideSouthBlocked) throw new Error('Player can leave the bridge footprint vertically');
if (!state.villageRoadOpen) throw new Error('Village road is blocked');
if (state.houseBlocked) throw new Error('Player can walk through a house');
if (state.riceBlocked) throw new Error('Player can walk through a rice field');
if (state.fenceBlocked) throw new Error('Player can walk through a fence');
if (!state.outsideWestBlocked || !state.outsideBridgeBlocked || !state.outsideEastBlocked || !state.outsideNorthBlocked || !state.outsideSouthBlocked) throw new Error('Player can leave the island/bridge boundary');
if (!state.boundary?.locked) throw new Error('Hard island boundary lock is not active');
if (!state.failsafe?.collisionOnly || state.failsafe?.visualOverride) throw new Error('Failsafe visual override is active');
if (!state.elevation?.raised) throw new Error('Japanese elevation layer is not active');
if (!state.layout.naturalized) throw new Error('Thai natural layout is not active');
if (!state.camera || state.camera.scaleY !== 0.86) throw new Error('Camera projection is not active');
if (!islandState.available || islandState.player.x !== 4300 || islandState.player.y !== 1080) throw new Error('Japanese island render probe could not be positioned');
console.log('MOONWOOD BROWSER SMOKE PASS');
console.log(JSON.stringify({state,islandState}, null, 2));