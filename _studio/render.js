'use strict';
// GAMMA brand-kit rasterizer. ABSOLUTE file:// URL + ABSOLUTE --screenshot path
// (relative paths → Chrome error page / "Access is denied" on this box).
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const OUT = path.join(__dirname, 'out');
const DESKTOP = 'C:/Users/efrai/OneDrive/Desktop';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const SIZES = {
  'gamma-pfp': [2000, 2000],
  'gamma-banner': [3000, 1000],
  'gamma-keyart': [2400, 1350],
  'gamma-engine': [2400, 1350],
  'gamma-markets': [2400, 1350],
  'gamma-bonk': [2400, 1350],
};

const only = process.argv[2];
for (const name of Object.keys(SIZES).filter((n) => !only || n === only)) {
  const htmlPath = path.join(OUT, name + '.html');
  if (!fs.existsSync(htmlPath)) { console.log('SKIP (no html):', name); continue; }
  const [w, h] = SIZES[name];
  const png = path.join(DESKTOP, name + '.png');
  const r = spawnSync(CHROME, [
    '--headless=new', '--no-sandbox', '--hide-scrollbars',
    '--force-device-scale-factor=1', '--default-background-color=00000000',
    '--user-data-dir=' + path.join(os.tmpdir(), 'gmk_' + name + '_' + Date.now()),
    '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
    '--window-size=' + w + ',' + h, '--virtual-time-budget=4000',
    '--screenshot=' + png, 'file:///' + htmlPath.replace(/\\/g, '/'),
  ], { stdio: 'ignore', timeout: 60000 });
  const sz = fs.existsSync(png) ? fs.statSync(png).size : 0;
  console.log((r.status === 0 ? 'OK  ' : 'ERR ') + name + '  ' + w + 'x' + h + '  ' + sz + ' bytes -> ' + png);
}
