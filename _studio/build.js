'use strict';
// GAMMA brand-kit generator — the site's system: paper white + green pixel grid,
// ink borders + hard shadows, Press Start 2P / VT323 / Inter, pixel Γ mark.
// (Rule: the aesthetic is never the slogan — no "8-bit" in copy.)
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">`;

const BASE = `
:root{--bg:#f6fdf7;--panel:#fff;--ink:#0b2413;--sub:#47664f;--mut:#7d947f;--grn:#00c805;--dk:#008f04;--lime:#a3e635;--red:#ff4d68;
  --px:'Press Start 2P',monospace;--vt:'VT323',monospace}
*{margin:0;padding:0;box-sizing:border-box;border-radius:0}
html,body{font-family:'Inter',system-ui,sans-serif;color:var(--ink);background:var(--bg);overflow:hidden;-webkit-font-smoothing:antialiased}
.stage{position:relative;overflow:hidden;background:var(--bg);background-image:
  repeating-linear-gradient(0deg,rgba(0,200,5,.05) 0 2px,transparent 2px 48px),
  repeating-linear-gradient(90deg,rgba(0,200,5,.05) 0 2px,transparent 2px 48px)}
.px{font-family:var(--px);font-weight:400}
.vt{font-family:var(--vt)}
.card{background:var(--panel);border:4px solid var(--ink);box-shadow:12px 12px 0 var(--ink)}
`;

// pixel Γ mark — thick vertical bar + top arm, built from rects
function mark(size, fill) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 14 14" shape-rendering="crispEdges" style="image-rendering:pixelated" xmlns="http://www.w3.org/2000/svg"><g fill="${fill || '#00c805'}"><rect x="2" y="1" width="10" height="3"/><rect x="10" y="4" width="2" height="2"/><rect x="2" y="4" width="4" height="9"/></g><g fill="${fill ? 'none' : '#008f04'}"><rect x="2" y="11" width="4" height="2"/></g></svg>`;
}
function lockup(fontPx) {
  return `<div style="display:flex;align-items:center;justify-content:center;gap:${Math.round(fontPx * .34)}px">
    ${mark(Math.round(fontPx * 1.35))}<span class="px" style="font-size:${fontPx}px;letter-spacing:3px">GAMMA</span></div>`;
}
const chip = (t, green) => `<span class="px" style="display:inline-flex;align-items:center;font-size:22px;line-height:1.5;color:${green ? '#fff' : 'var(--ink)'};background:${green ? 'var(--grn)' : 'var(--panel)'};border:3px solid var(--ink);box-shadow:6px 6px 0 var(--ink);padding:16px 24px">${t}</span>`;

function page(w, h, css, inner) {
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${BASE}
  .stage{width:${w}px;height:${h}px}${css}</style></head>
  <body><div class="stage">${inner}</div></body></html>`;
}

const assets = {};

// 1) PFP 2000²
assets['gamma-pfp'] = page(2000, 2000, `
  .wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:80px}
  .tick{font-size:56px;color:var(--dk);letter-spacing:2px}
  .tag{font-family:'Inter';font-weight:600;font-size:44px;color:var(--sub)}`,
  `<div class="wrap">
     ${mark(720)}
     <span class="px" style="font-size:150px;letter-spacing:6px">GAMMA</span>
     <div style="text-align:center">
       <div class="px tick">$GAMMA</div>
       <div class="tag" style="margin-top:30px">perps on Robinhood Chain</div>
     </div>
   </div>`);

// 2) BANNER 3000×1000 — centered lockup
assets['gamma-banner'] = page(3000, 1000, `
  .wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:52px}
  .tag{font-family:'Inter';font-weight:600;font-size:40px;color:var(--sub);max-width:1900px;text-align:center}
  .tag b{color:var(--ink)}
  .row{display:flex;gap:22px}
  .dom{font-size:26px;color:var(--dk);letter-spacing:2px}`,
  `<div class="wrap">
     ${lockup(96)}
     <div class="tag">Long and short <b>tokenized stocks</b> and <b>Robinhood-native coins</b> — up to <b style="color:var(--grn)">25×</b> — on one perp DEX that can't go insolvent.</div>
     <div class="row">${chip('10 STOCK MARKETS', true)}${chip('CASHCAT + PONS')}${chip('REAL PYTH PRICES', true)}</div>
     <div class="px dom">gammaperpsrh.xyz · $GAMMA · @GammaPerps</div>
   </div>`);

// 3) KEYART 2400×1350 — the pitch
assets['gamma-keyart'] = page(2400, 1350, `
  .wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:48px;text-align:center}
  .h{font-size:76px;line-height:1.6;letter-spacing:2px}
  .h .g{color:var(--grn)}
  .sub{font-family:'Inter';font-weight:600;font-size:33px;color:var(--sub);max-width:1500px;line-height:1.6}
  .sub b{color:var(--ink)}
  .mkts{display:flex;gap:16px;flex-wrap:wrap;justify-content:center;max-width:1700px}
  .mk{font-family:var(--vt);font-size:34px;background:var(--panel);border:3px solid var(--ink);box-shadow:5px 5px 0 var(--ink);padding:10px 22px}
  .mk b{color:var(--dk);font-weight:400}
  .dom{font-size:26px;color:var(--dk);letter-spacing:2px}`,
  `<div class="wrap">
     ${lockup(64)}
     <div class="px h">Stocks. Memecoins.<br><span class="g">Leverage.</span></div>
     <div class="sub">Long TSLA at 10×. Short SPY at 25×. Ape CASHCAT. One terminal, real Pyth prices,
       and a <b>percolator-style risk engine</b> — you can never withdraw more than actually exists.</div>
     <div class="mkts">
       <span class="mk">SPY <b>25×</b></span><span class="mk">GLD <b>20×</b></span><span class="mk">AAPL <b>20×</b></span>
       <span class="mk">NVDA <b>15×</b></span><span class="mk">TSLA <b>10×</b></span><span class="mk">COIN <b>10×</b></span>
       <span class="mk">MSTR <b>10×</b></span><span class="mk">META <b>20×</b></span><span class="mk">GOOGL <b>20×</b></span>
       <span class="mk">HOOD <b>10×</b></span><span class="mk" style="border-color:var(--dk)">CASHCAT <b>20×</b></span>
       <span class="mk" style="border-color:var(--dk)">PONS <b>20×</b></span>
     </div>
     <div class="px dom">gammaperpsrh.xyz</div>
   </div>`);

// 4) ENGINE 2400×1350 — the three invariants
const inv = (n, t, d) => `<div class="card" style="flex:1;padding:44px 40px">
  <div class="vt" style="font-size:64px;color:var(--grn);line-height:1">${n}</div>
  <div class="px" style="font-size:21px;line-height:1.7;margin:22px 0 16px">${t}</div>
  <div style="font-family:'Inter';font-weight:500;font-size:23px;color:var(--sub);line-height:1.65">${d}</div></div>`;
assets['gamma-engine'] = page(2400, 1350, `
  .wrap{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 110px;gap:52px}
  .head{text-align:center}
  .eye{font-size:17px;color:var(--dk);letter-spacing:4px;margin-bottom:26px}
  .h{font-size:52px;line-height:1.6}
  .h .g{color:var(--grn)}
  .row{display:flex;gap:34px}
  .foot{font-family:var(--vt);font-size:30px;color:var(--mut);text-align:center;letter-spacing:1px}
  .foot b{color:var(--dk);font-weight:400}`,
  `<div class="wrap">
     <div class="head"><div class="px eye">▲ THE ENGINE ▲</div>
       <div class="px h">The perp DEX that <span class="g">can't go insolvent.</span></div></div>
     <div class="row">
       ${inv('01', 'BACKED EXITS · H', 'Profit is only paid from the real residual buffer. Deposits stand first in line — nobody withdraws more than actually exists.')}
       ${inv('02', 'QUEUE-FREE ADL', 'No victim queue. A liquidation socializes across the whole side in microscopic pro-rata slices, in O(1).')}
       ${inv('03', 'BOUNDED CRANKS', 'Repricing is capped per tick. An oracle wick physically cannot move open interest through unbudgeted loss.')}
     </div>
     <div class="foot">percolator risk engine · <b>471 formal proofs</b> · live on real Pyth prices · gammaperpsrh.xyz</div>
   </div>`);

// 5) MARKETS 2400×1350 — the two boards
assets['gamma-markets'] = page(2400, 1350, `
  .wrap{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 120px;gap:44px}
  .head{text-align:center}
  .eye{font-size:17px;color:var(--dk);letter-spacing:4px;margin-bottom:26px}
  .h{font-size:54px;line-height:1.6}
  .h .g{color:var(--grn)}
  .cols{display:grid;grid-template-columns:1.35fr 1fr;gap:36px}
  .bd{padding:40px 42px}
  .bt{font-size:19px;line-height:1.6;color:var(--dk);margin-bottom:26px}
  .tks{display:flex;gap:14px;flex-wrap:wrap}
  .tk{font-family:var(--vt);font-size:33px;background:var(--bg);border:3px solid var(--ink);padding:8px 20px}
  .note{font-family:'Inter';font-weight:500;font-size:21px;color:var(--sub);margin-top:26px;line-height:1.6}
  .note b{color:var(--ink)}
  .foot{font-family:var(--vt);font-size:29px;color:var(--mut);text-align:center;letter-spacing:1px}`,
  `<div class="wrap">
     <div class="head"><div class="px eye">▲ THE BOARDS ▲</div>
       <div class="px h">Wall Street <span class="g">meets the trenches.</span></div></div>
     <div class="cols">
       <div class="card bd"><div class="px bt">TOKENIZED STOCKS · PYTH</div>
         <div class="tks"><span class="tk">SPY</span><span class="tk">GLD</span><span class="tk">AAPL</span><span class="tk">NVDA</span><span class="tk">TSLA</span><span class="tk">COIN</span><span class="tk">MSTR</span><span class="tk">META</span><span class="tk">GOOGL</span><span class="tk">HOOD</span></div>
         <div class="note">Ten US equities marked to <b>real Pyth equity feeds</b> — up to <b>25×</b>, long or short, around the clock.</div></div>
       <div class="card bd"><div class="px bt" style="color:var(--ink)">ROBINHOOD NATIVES</div>
         <div class="tks"><span class="tk" style="font-size:40px">CASHCAT</span><span class="tk" style="font-size:40px">PONS</span></div>
         <div class="note">A <b>curated native board</b> — each coin pinned to its deepest on-chain pool, because a perp is only as honest as its price.</div></div>
     </div>
     <div class="foot">one terminal · real prices · solvent by construction · gammaperpsrh.xyz · $GAMMA</div>
   </div>`);

// 6) BONK LISTING 2400×1350 — announcement card
assets['gamma-bonk'] = page(2400, 1350, `
  .wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:52px;text-align:center}
  .eye{font-size:17px;color:var(--dk);letter-spacing:4px}
  .h{font-size:64px;line-height:1.65}
  .h .o{color:#ff9e2c}
  .h .g{color:var(--grn)}
  .sub{font-family:'Inter';font-weight:600;font-size:33px;color:var(--sub);max-width:1460px;line-height:1.65}
  .sub b{color:var(--ink)}
  .big{display:inline-flex;align-items:center;gap:26px;background:#ff9e2c;border:4px solid var(--ink);box-shadow:12px 12px 0 var(--ink);padding:30px 52px}
  .big .t{font-family:var(--px);font-size:34px;color:#fff;letter-spacing:2px}
  .big .l{font-family:var(--vt);font-size:38px;color:var(--ink)}
  .row{display:flex;gap:20px}
  .dom{font-size:24px;color:var(--dk);letter-spacing:2px}`,
  `<div class="wrap">
     <div class="px eye">▲ NEW LISTING ▲</div>
     <div class="px h"><span class="o">BONK</span> has joined Robinhood.<br>So it's <span class="g">live on GAMMA.</span></div>
     <div class="big"><span class="t">BONK-PERP</span><span class="l">LONG · SHORT · 10X</span></div>
     <div class="sub">Marked to its <b>real Pyth feed</b>, trading next to SPY, TSLA and the natives —
       on the perp DEX that can't go insolvent.</div>
     <div class="row">${chip('REAL PYTH PRICE', true)}${chip('UP TO 10X')}${chip('LIVE NOW', true)}</div>
     <div class="px dom">gammaperpsrh.xyz · $GAMMA · @GammaPerps</div>
   </div>`);

for (const [name, html] of Object.entries(assets)) {
  fs.writeFileSync(path.join(OUT, name + '.html'), html);
  console.log('wrote', name + '.html');
}
