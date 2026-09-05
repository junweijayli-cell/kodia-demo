const {chromium} = require('playwright-core');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.SCROLLCRAFT_CHROME});
  const results=[];
  const base=process.env.DEMO_URL || 'http://localhost:4500/';
  async function context(options={}){
    const c=await browser.newContext({viewport:{width:1440,height:900},...options});
    await c.addInitScript(()=>{
      Element.prototype.requestPointerLock=()=>Promise.reject(new Error('Disabled for QA'));
      Element.prototype.setPointerCapture=()=>{};Element.prototype.releasePointerCapture=()=>{};Document.prototype.exitPointerLock=()=>{};
    });return c;
  }
  try{
    const c=await context();const p=await c.newPage();const errors=[];
    p.on('pageerror',e=>errors.push(e.message));
    await p.goto(base);await p.waitForSelector('html.sc-ready');await p.evaluate(()=>document.fonts.ready);
    assert.equal(await p.locator('#outdoor-title').innerText(),'Life, better\noutside.');
    assert.equal(await p.locator('#home-collections .coll-card').count(),6);
    await p.locator('[data-material="teak"]').click();assert.match(await p.locator('#kd-material-img').getAttribute('src'),/teak/);
    await p.locator('[data-material="aluminium"]').click();assert.equal(await p.locator('[data-material="aluminium"]').getAttribute('aria-pressed'),'true');
    await p.locator('[data-rail="1"]').click();await p.waitForTimeout(600);assert.ok(await p.locator('#home-collections').evaluate(el=>el.scrollLeft)>100);
    results.push('Material selector and collection rail respond correctly.');
    await p.locator('#home-collections [data-open-collection="sofa-lounge"]').click();await p.waitForSelector('#screen-collection:not([hidden])');
    assert.ok(await p.locator('#browse-grid [data-open-product]').count()>0);
    await p.locator('#browse-search').fill('zzzz-no-such-model');await p.waitForTimeout(200);assert.equal(await p.locator('#browse-grid [data-open-product]').count(),0);
    await p.locator('#browse-search').fill('');await p.waitForTimeout(200);
    await p.locator('#browse-grid [data-open-product]').first().click();await p.waitForSelector('#screen-product:not([hidden])');
    const productName=await p.locator('#pd-title').innerText();assert.ok(productName.length>2);
    await p.locator('#pd-add').click();assert.equal(await p.locator('#sel-count').innerText(),'1');
    await p.reload();await p.waitForSelector('#screen-product:not([hidden])');assert.equal(await p.locator('#sel-count').innerText(),'1');
    await p.locator('#selection-btn').click();await p.waitForSelector('#drawer:not([hidden])');
    await p.locator('#drawer-quote').click();await p.waitForSelector('#screen-inquiry:not([hidden])');
    assert.ok((await p.locator('#wizard-summary').innerText()).length>0);
    await p.locator('#wizard-next').click();assert.equal(await p.locator('#wizard-done').isVisible(),false);
    results.push('Browse, no-result search, product details, saved selection, reload persistence, selection-to-quote attachment and required-field validation pass.');
    await p.goto(base+'#/home');await p.locator('#lang-toggle').click();assert.equal(await p.locator('html').getAttribute('lang'),'zh-CN');
    assert.match(await p.locator('#outdoor-title').innerText(),/美好生活/);
    await p.locator('#lang-toggle').click();assert.match(await p.locator('#outdoor-title').innerText(),/Life/);
    for(const route of ['signature','settings','projects','factory','materials','shipping','contact','collections']){
      await p.goto(base+'#/'+route);await p.waitForSelector('#screen-'+route+':not([hidden])');
      assert.ok((await p.locator('#screen-'+route).innerText()).length>20);
    }
    await p.goto(base+'#/p/not-a-real-id');await p.waitForSelector('#screen-collections:not([hidden])');
    assert.deepEqual(errors,[]);results.push('English/Chinese switching, all retained routes and invalid-product fallback pass without JavaScript errors.');
    await c.close();
    for(const viewport of [{width:390,height:844},{width:360,height:640}]){
      const cc=await context({viewport});const pp=await cc.newPage();await pp.goto(base);await pp.waitForSelector('html.sc-ready');
      assert.ok(await pp.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      await pp.locator('#menu-toggle').click();assert.equal(await pp.locator('#menu-toggle').getAttribute('aria-expanded'),'true');
      await pp.locator('#mobile-nav [data-go="collections"]').click();await pp.waitForSelector('#screen-collections:not([hidden])');
      assert.equal(await pp.locator('#menu-toggle').getAttribute('aria-expanded'),'false');
      assert.ok(await pp.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      await cc.close();
    }
    results.push('390px and 360px mobile layouts have no horizontal overflow; menu opens and navigation closes it.');
    const rc=await context({reducedMotion:'reduce',viewport:{width:360,height:640}});const rp=await rc.newPage();await rp.goto(base);await rp.waitForSelector('html.sc-ready');
    assert.equal(await rp.locator('.kd-terrace-stage').evaluate(el=>getComputedStyle(el).position),'relative');
    assert.equal(await rp.locator('.kd-object-label').evaluate(el=>getComputedStyle(el).opacity),'1');await rc.close();
    const nc=await context({javaScriptEnabled:false});const np=await nc.newPage();await np.goto(base);assert.ok(await np.locator('#screen-home').isVisible());assert.equal(await np.locator('#wizard-form').isVisible(),false);await nc.close();
    results.push('Reduced motion removes pinning and keeps the final label visible. No-JavaScript visitors receive a readable homepage; enquiry form stays inaccessible.');
    fs.mkdirSync('lab',{recursive:true});fs.writeFileSync('lab/functional-results.json',JSON.stringify({base,results},null,2));console.log(results.join('\n'));
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
