// Renders public/og.png (1200x630) from inline HTML using Playwright's Chromium.
// Run with `npm run og` after changing the name, role or accent color.
import { chromium } from '@playwright/test';

const html = `<!doctype html><html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&display=block');
  body{margin:0;width:1200px;height:630px;background:#0b0f14;color:#e6edf3;font-family:'JetBrains Mono',monospace;
    display:flex;flex-direction:column;justify-content:center;padding:0 90px;box-sizing:border-box;
    background-image:radial-gradient(circle at 85% 50%,rgba(108,194,74,.16),transparent 40%)}
  .p{color:#6cc24a;font-size:30px;margin:0 0 36px}
  h1{font-size:84px;line-height:1.05;margin:0;letter-spacing:-.02em}
  h1 span{color:#8b949e}
  .cur{display:inline-block;width:.52em;height:.85em;background:#6cc24a;vertical-align:-.06em;margin-left:.12em}
  .f{margin-top:44px;font-size:28px;color:#8b949e}
  .glyph{position:absolute;right:90px;top:50%;transform:translateY(-50%);font-size:220px;font-weight:700;color:#6cc24a;opacity:.9}
</style></head><body>
  <div class="glyph">&lt;/&gt;</div>
  <p class="p">$ whoami</p>
  <h1>Santiago<br>Castrillón<span>.</span><span class="cur"></span></h1>
  <p class="f">Full-Stack Developer · Laravel · React · Node</p>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.screenshot({ path: 'public/og.png' });
await browser.close();
console.log('public/og.png written');
