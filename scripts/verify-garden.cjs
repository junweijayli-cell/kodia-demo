const { chromium } = require('playwright-core');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const base = process.env.DEMO_URL || 'http://127.0.0.1:4500/';
const out = process.env.QA_OUTPUT || 'lab/garden-review';
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.SCROLLCRAFT_CHROME });
  const results = [];
  async function context(options = {}) {
    const c = await browser.newContext({ viewport: { width: 1440, height: 1000 }, ...options });
    await c.addInitScript(() => {
      Element.prototype.requestPointerLock = () => Promise.reject(new Error('Disabled for QA'));
      Element.prototype.setPointerCapture = () => {};
      Element.prototype.releasePointerCapture = () => {};
      Document.prototype.exitPointerLock = () => {};
    });
    return c;
  }
  async function ready(p) {
    await p.waitForSelector('#screen-home:not([hidden])');
    await p.evaluate(() => document.fonts.ready);
    await p.locator('#intro').waitFor({state:'hidden'});
  }
  async function shoot(p, name, y) {
    await p.evaluate(y => scrollTo(0, y), y);
    await p.waitForTimeout(180);
    await p.evaluate(() => Promise.all(document.getAnimations().filter(a => a.effect?.getTiming().iterations !== Infinity).map(a => a.finished.catch(() => {}))));
    await p.evaluate(async () => {
      const visible = [...document.images].filter(i => { const r = i.getBoundingClientRect(); return r.width && r.height && r.bottom > 0 && r.top < innerHeight; });
      await Promise.all(visible.map(i => i.decode().catch(() => {})));
    });
    await p.screenshot({ path: path.join(out, name + '.png') });
  }
  try {
    for (const [name, viewport] of [['desktop',{width:1440,height:1000}],['tablet',{width:768,height:1024}],['phone',{width:390,height:844}],['compact',{width:320,height:740}]]) {
      const c = await context({viewport}); const p = await c.newPage(); const errors = [];
      p.on('pageerror', e => errors.push(e.message));
      await p.goto(base); await ready(p);
      assert.equal(await p.locator('#home-collections .coll-card').count(), 6);
      assert.equal(await p.locator('#home-settings .set-card').count(), 6);
      assert.equal(await p.locator('#home-projects-grid article').count(), 3);
      assert.equal(await p.locator('#home-settings .set-card-image img').count(), 6);
      assert.equal(await p.locator('#home-settings [data-kr-panel="image"]').count(), 6);
      assert.match(await p.locator('#home-settings [data-open-setting="poolside-resort"] img').getAttribute('src'), /proj-resort-pool/);
      assert.equal(await p.locator('.kr-garden-photo').getAttribute('src'), 'assets/images/demo/garden.webp');
      await shoot(p, name+'-00-hero', 0);
      const h = await p.locator('.kr-hero').evaluate(el => el.offsetHeight);
      await shoot(p, name+'-01-transition', h*.52);
      const sections = ['.kr-programme','.kr-why','.kr-materials','.kr-settings','.kr-projects','.kr-catalog','.kr-inquiry','.site-footer'];
      for (let i=0;i<sections.length;i++) {
        const y = await p.locator(sections[i]).evaluate(el => el.getBoundingClientRect().top+scrollY-100);
        await shoot(p, name+'-'+String(i+2).padStart(2,'0')+'-'+sections[i].slice(1), y);
      }
      const check = await p.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        broken: [...document.querySelectorAll('#screen-home img')].filter(i => getComputedStyle(i).display !== 'none' && i.complete && !i.naturalWidth).map(i=>i.getAttribute('src')),
        fonts: {urbanist:document.fonts.check('400 16px Urbanist'),stardom:document.fonts.check('400 64px Stardom')},
        textOverflow: [...document.querySelectorAll('#screen-home h1,#screen-home h2,#screen-home h3,#screen-home p,#screen-home figcaption')].filter(n=>{if(n.closest('.kr-horizontal .kr-collections'))return false;const r=n.getBoundingClientRect();return r.width && (r.left < -1 || r.right > innerWidth+1)}).map(n=>n.textContent)
      }));
      fs.writeFileSync(path.join(out,name+'-layout.json'),JSON.stringify(check,null,2));
      assert.equal(check.overflow,false,name+' overflow'); assert.deepEqual(check.textOverflow,[],name+' text overflow'); assert.deepEqual(check.broken,[]); assert.ok(check.fonts.urbanist&&check.fonts.stardom); assert.deepEqual(errors,[]);
      if(await p.locator('.kr-horizontal').count()) {
        const range=await p.locator('.kr-programme').evaluate(el=>({start:el.getBoundingClientRect().top+scrollY-document.querySelector('.site-header').offsetHeight,travel:el.offsetHeight-el.querySelector('.kr-programme-stage').offsetHeight}));
        for(const progress of [0,.5,1]) await shoot(p,name+'-collections-'+progress,range.start+range.travel*progress);
        const end=await p.locator('.kr-collection-window').evaluate(el=>({x:el.scrollLeft,max:el.scrollWidth-el.clientWidth}));
        assert.ok(Math.abs(end.x-end.max)<3,'All six collections are reachable');
        await p.locator('.kr-motion-toggle').click();assert.equal(await p.locator('.kr-horizontal').count(),0);
        await p.locator('.kr-motion-toggle').click();
      }
      if(viewport.width<1180){await p.locator('#menu-toggle').click();assert.equal(await p.locator('#menu-toggle').getAttribute('aria-expanded'),'true');await p.locator('#mobile-nav [data-go="collections"]').click();await p.waitForSelector('#screen-collections:not([hidden])');assert.equal(await p.locator('#menu-toggle').getAttribute('aria-expanded'),'false');}
      results.push(name+': fonts, images, full content, no horizontal text overflow, section screenshots and navigation pass.');
      await c.close();
    }
    const c = await context(); const p = await c.newPage(); const errors=[]; p.on('pageerror',e=>errors.push(e.message));
    await p.goto(base); await ready(p);
    await p.locator('#home-settings [data-open-setting]').first().click(); await p.waitForSelector('#screen-collection:not([hidden])'); assert.ok(await p.locator('#browse-grid [data-open-product]').count()>0); assert.equal(await p.locator('#browse-title').innerText(),'Sun & Leisure'); assert.equal(await p.locator('#browse-total').innerText(),'74');
    await p.goto(base+'#/home');await ready(p);await p.locator('#home-collections [data-open-collection="sofa-lounge"]').click();await p.waitForSelector('#screen-collection:not([hidden])');
    await p.locator('#browse-search').fill('zzzz-no-such-model');await p.waitForTimeout(250);assert.equal(await p.locator('#browse-grid [data-open-product]').count(),0);await p.locator('#browse-search').fill('');await p.waitForTimeout(250);
    await p.locator('#browse-grid [data-open-product]').first().click();await p.waitForSelector('#screen-product:not([hidden])');await p.locator('#pd-add').click();assert.equal(await p.locator('#sel-count').innerText(),'1');await p.reload();await p.waitForSelector('#screen-product:not([hidden])');assert.equal(await p.locator('#sel-count').innerText(),'1');
    await p.locator('#selection-btn').click();await p.locator('#drawer-quote').click();await p.waitForSelector('#screen-inquiry:not([hidden])');assert.ok((await p.locator('#wizard-summary').innerText()).length>0);await p.locator('#wizard-next').click();assert.equal(await p.locator('#wizard-done').isVisible(),false);
    await p.goto(base+'#/home');await ready(p);await p.locator('#lang-toggle').click();assert.equal(await p.locator('html').getAttribute('lang'),'zh-CN');assert.match(await p.locator('#garden-title').innerText(),/户外生活/);await shoot(p,'chinese-desktop',0);await p.locator('#lang-toggle').click();assert.match(await p.locator('#garden-title').innerText(),/Built for/);
    for(const route of ['signature','settings','projects','factory','materials','shipping','contact','collections']){await p.goto(base+'#/'+route);await p.waitForSelector('#screen-'+route+':not([hidden])');assert.ok((await p.locator('#screen-'+route).innerText()).length>20);}
    await p.goto(base+'#/p/not-a-real-id');await p.waitForSelector('#screen-collections:not([hidden])');assert.deepEqual(errors,[]);await c.close();
    results.push('Settings filters, collections, search, products, persisted selection, quote attachment, empty-form validation, both languages and retained routes pass. No external enquiry submitted.');
    const rc=await context({reducedMotion:'reduce',viewport:{width:390,height:844}});const rp=await rc.newPage();await rp.goto(base);await ready(rp);assert.equal(await rp.locator('.kr-hero-stage').evaluate(el=>getComputedStyle(el).position),'relative');await shoot(rp,'reduced-hero',0);await rp.locator('.kr-materials').scrollIntoViewIfNeeded();assert.equal(await rp.locator('.kr-material-frame img').first().evaluate(el=>getComputedStyle(el).transform),'none');await rp.screenshot({path:path.join(out,'reduced-materials.png')});await rc.close();
    const nc=await context({javaScriptEnabled:false});const np=await nc.newPage();await np.goto(base);assert.ok(await np.locator('#screen-home').isVisible());assert.equal(await np.locator('#wizard-form').isVisible(),false);await nc.close();results.push('Reduced motion removes pinning and movement. No-JavaScript homepage stays readable and enquiry form stays inaccessible.');
    fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,results},null,2));console.log(results.join('\n'));
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exit(1)});
