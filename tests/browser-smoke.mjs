import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
page.on('console', message => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });

await page.goto('http://127.0.0.1:4173/index.html', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(1200);

const state = await page.evaluate(() => {
  const canvas = document.getElementById('game');
  const scene = window.moonwoodScene || {};
  let bridgeOpen = false;
  try { bridgeOpen = blocked(3700, 1160) === false; } catch {}
  return {
    canvasWidth: canvas?.width,
    canvasHeight: canvas?.height,
    scene,
    bridgeOpen,
    camera: typeof window.moonwoodCamera === 'function' ? window.moonwoodCamera() : null
  };
});

await page.screenshot({ path: 'test-results/moonwood-smoke.png', fullPage: false });
await browser.close();

if (errors.length) throw new Error(errors.join('\n'));
if (state.canvasWidth !== 640 || state.canvasHeight !== 360) throw new Error(`Unexpected canvas: ${state.canvasWidth}x${state.canvasHeight}`);
if (!state.scene.oceanBackground) throw new Error('Ocean background flag missing');
if (!state.scene.bridgeWalkable) throw new Error('Bridge walkable flag missing');
if (!state.bridgeOpen) throw new Error('Bridge collision is still blocked');
if (!state.camera || state.camera.scaleY !== 0.86) throw new Error('Camera projection is not active');
console.log('MOONWOOD BROWSER SMOKE PASS');
console.log(JSON.stringify(state, null, 2));
