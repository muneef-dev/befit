const {chromium}=require('C:/Users/muham/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');
const fs=require('fs'), assert=require('assert/strict'), path=require('path');
(async()=>{
 const out='verification/catalogue';fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true,executablePath:'C:/Users/muham/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe'});
 const context=await browser.newContext(),page=await context.newPage();
 const checks=[],errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
 const pass=name=>{checks.push({name,result:'PASS'});console.log('PASS '+name);};
 const ready=async()=>{await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>Promise.all([...document.images].filter(i=>i.getAttribute('src')).map(i=>{i.loading='eager';return i.decode();})));};
 try{
  await page.goto(require('url').pathToFileURL(path.resolve('index.html')).href);await ready();
  for(const width of [375,768,1440]){
   await page.setViewportSize({width,height:width===375?812:1000});await page.screenshot({path:`${out}/page-${width}.png`,fullPage:true});await page.screenshot({path:`${out}/hero-${width}.png`});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));pass(`${width}px responsive layout without overflow`);
  }
  await page.locator('#products').screenshot({path:`${out}/products-desktop.png`,style:'header,.skip{visibility:hidden!important}'});
  assert.equal(await page.locator('#booking,#booking-form,input[type="date"],.slot').count(),0);assert.ok(!(await page.locator('body').innerText()).includes('INTERACTIVE BOOKING DEMO'));
  assert.deepEqual(await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.querySelector(a.getAttribute('href'))).map(a=>a.getAttribute('href'))),[]);pass('Booking removed; all internal links resolve');
  for(const [category,count] of Object.entries({'All':6,'Fitness':3,'Team sports':1,'Footwear':1,'Accessories':1})){
   await page.locator(`[data-filter="${category}"]`).click();assert.equal(await page.locator('.product-card:visible').count(),count);assert.equal(await page.locator(`[data-filter="${category}"]`).getAttribute('aria-pressed'),'true');
  }pass('Category filters and selected states');
  await page.locator('[data-filter="All"]').click();await page.locator('#product-search').fill('  MEDICINE  ');assert.equal(await page.locator('.product-card:visible').count(),1);
  await page.locator('[data-filter="Footwear"]').click();assert.ok(await page.locator('#product-empty').isVisible());await page.locator('#reset-products').click();assert.equal(await page.locator('.product-card:visible').count(),6);
  await page.locator('#product-search').fill('<img src=x onerror=alert(1)>');assert.ok(await page.locator('#product-empty').isVisible());await page.locator('#clear-search').click();assert.ok(await page.locator('#product-search').evaluate(e=>e===document.activeElement));pass('Search, combined filtering, empty state, reset and clear focus');
  for(let i=0;i<6;i++){
   const opener=page.locator(`.product-open[data-product="${i}"]`);await opener.click();assert.ok(await page.locator('#product-dialog').evaluate(e=>e.open));assert.ok(await page.locator('#product-close').evaluate(e=>e===document.activeElement));
   await page.locator('#product-detail-image').evaluate(e=>e.decode());assert.ok((await page.locator('#product-source').getAttribute('href')).startsWith('https://befit.lk/product/'));assert.equal(await page.locator('#product-dialog a[href^="tel:"]').count(),2);
   if(i===0){assert.equal(await page.locator('#product-fact-value').innerText(),'1.5kg');await page.screenshot({path:`${out}/product-detail-desktop.png`});await page.locator('#product-source').focus();await page.keyboard.press('Tab');assert.ok(await page.locator('#product-close').evaluate(e=>e===document.activeElement));await page.keyboard.press('Shift+Tab');assert.ok(await page.locator('#product-source').evaluate(e=>e===document.activeElement));}
   await page.keyboard.press('Escape');assert.ok(await opener.evaluate(e=>e===document.activeElement));
  }pass('All six product details/images/links, Escape and modal focus cycling/restoration');
  await page.setViewportSize({width:375,height:812});await page.locator('.menu-toggle').click();await page.locator('#navigation a[href="#products"]').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');await page.locator('.menu-toggle').click();await page.keyboard.press('Escape');assert.ok(await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement));pass('Mobile menu navigation, Escape and focus');
  await page.locator('#products').screenshot({path:`${out}/products-mobile.png`,style:'header,.skip{visibility:hidden!important}'});await page.locator('.product-open').first().click();await page.screenshot({path:`${out}/product-detail-mobile.png`});assert.ok(await page.locator('#product-dialog').evaluate(e=>e.scrollWidth<=e.clientWidth));await page.locator('#product-close').click();pass('Mobile product details fit and close');
  await page.locator('.gallery-item').first().click();await page.keyboard.press('ArrowRight');assert.ok((await page.locator('#lightbox-caption').innerText()).startsWith('02'));await page.locator('#gallery-prev').click();await page.keyboard.press('ArrowLeft');assert.ok((await page.locator('#lightbox-caption').innerText()).startsWith('06'));await page.locator('#gallery-next').click();await page.keyboard.press('Escape');assert.ok(await page.locator('.gallery-item').first().evaluate(e=>e===document.activeElement));pass('Gallery buttons, arrow keys and focus preserved');
  await page.locator('details summary').first().click();assert.ok(await page.locator('details').first().evaluate(e=>e.open));await page.keyboard.press('Enter');assert.ok(!(await page.locator('details').first().evaluate(e=>e.open)));pass('Updated FAQ pointer and keyboard controls');
  assert.equal(await page.locator('#showrooms a[href="tel:+94771699991"]').count(),1);assert.equal(await page.locator('#showrooms a[href="tel:+94770707010"]').count(),1);pass('Verified showroom contacts separate from venue contacts');
  await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');await context.setOffline(true);await page.reload();await ready();await page.locator('.product-open').first().click();assert.ok(await page.locator('#product-dialog').evaluate(e=>e.open));await page.keyboard.press('Escape');assert.equal(requests.length,0);assert.deepEqual(errors,[]);pass('Offline file and product details; local assets; reduced motion; zero network/console errors');
  for(const width of [320,1920]){await page.setViewportSize({width,height:1000});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}pass('Additional 320px and 1920px overflow checks');
 }catch(error){checks.push({name:'Verification failure',result:'FAIL',detail:error.stack});console.error(error);process.exitCode=1;await page.screenshot({path:`${out}/failure.png`,fullPage:true});}
 finally{fs.writeFileSync(`${out}/results.json`,JSON.stringify({testedAt:new Date().toISOString(),checks,errors,requests},null,2));await browser.close();}
})();
