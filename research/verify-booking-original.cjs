// Development verification only. Uses Playwright already present on this computer.
// The delivered index.html needs no packages, server or build step.
const { chromium } = require('C:/Users/muham/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const assert = require('assert/strict');

(async () => {
  fs.mkdirSync('verification',{recursive:true});
  const browser = await chromium.launch({headless:true,executablePath:'C:/Users/muham/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe'});
  const context = await browser.newContext({timezoneId:'America/Los_Angeles'});
  const page = await context.newPage();
  const errors = [], requests = [], checks = [];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{ if(message.type()==='error') errors.push(message.text()); });
  page.on('request',request=>{if(/^https?:/.test(request.url()))requests.push(request.url());});
  const check = (name, detail = '') => { checks.push({name,result:'PASS',detail}); console.log('PASS '+name); };
  try {
    await page.goto(pathToFileURL(path.resolve('index.html')).href);
    await page.evaluate(()=>document.fonts.ready);
    await page.evaluate(()=>Promise.all([...document.images].filter(i=>i.getAttribute('src')).map(i=>{ i.loading='eager'; return i.decode(); })));
    for(const width of [375,768,1440]) {
      await page.setViewportSize({width,height:width===375?812:1000});
      await page.screenshot({path:`verification/desktop-${width}.png`,fullPage:true});
      await page.screenshot({path:`verification/first-screen-${width}.png`});
      if(width===1440) {
        await page.locator('#booking').screenshot({path:'verification/booking-desktop.png',style:'header,.skip{visibility:hidden!important}'});
        await page.locator('#gallery').screenshot({path:'verification/gallery-desktop.png',style:'header,.skip{visibility:hidden!important}'});
        await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
      }
      const metrics=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width && (r.right>innerWidth+1||r.left < -1) && getComputedStyle(e).position!=='fixed';}).map(e=>e.tagName+'.'+e.className)}));
      assert.ok(metrics.scroll<=width,JSON.stringify(metrics));
      check(`${width}px layout: no horizontal overflow`,JSON.stringify(metrics));
    }
    await page.setViewportSize({width:375,height:812});
    await page.locator('.menu-toggle').click();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
    assert.ok(await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement));
    await page.locator('.menu-toggle').click();
    await page.locator('#navigation a[href="#booking"]').click();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
    check('Mobile navigation, anchor navigation, Escape and focus');

    // Validate every required input in one submit; inline messages must appear.
    await page.locator('#confirm-button').click();
    for(const id of ['slot-error','name-error','phone-error']) assert.ok((await page.locator('#'+id).textContent()).length>0);
    const today=await page.locator('#date').getAttribute('min');
    const expectedToday=await page.evaluate(()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Colombo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()));
    assert.equal(today,expectedToday);
    await page.locator('#date').fill(today);
    await page.locator('#date').dispatchEvent('change');
    assert.ok(await page.evaluate(()=>[...document.querySelectorAll('#slots button')].every(button=>{
      const start=new Date(document.querySelector('#date').value+'T'+button.dataset.hour.padStart(2,'0')+':00:00+05:30');
      return start.getTime()>Date.now() || button.disabled;
    })));
    check('Elapsed same-day Colombo start times are disabled');
    await page.locator('#date').fill('2020-01-01');
    await page.locator('#date').dispatchEvent('change');
    assert.equal(await page.locator('#date').getAttribute('aria-invalid'),'true');
    assert.equal(await page.locator('#slots button:not(:disabled)').count(),0);
    check('Required-field and past-date validation; Colombo date despite US browser timezone');

    await page.locator('#date').fill('2027-02-04');
    await page.locator('#date').dispatchEvent('change');
    assert.ok(await page.locator('#slots button:disabled').count()>0);
    await page.locator('#slots button:disabled').first().evaluate(e=>e.click());
    assert.equal(await page.locator('#slots [aria-pressed="true"]').count(),0);
    await page.locator('#slots button:not(:disabled)').first().click();
    assert.equal(await page.locator('#slots [aria-pressed="true"]').count(),1);
    await page.locator('#sport').selectOption('Cricket');
    assert.equal(await page.locator('#slots [aria-pressed="true"]').count(),0);
    assert.equal(await page.locator('#summary-sport').textContent(),'Cricket');
    await page.locator('#venue').selectOption('Hemmathagama');
    assert.equal(await page.locator('#sport option').count(),1);
    assert.equal(await page.locator('#summary-sport').textContent(),'Futsal');
    assert.equal(await page.locator('#booking-contact').getAttribute('href'),'tel:+94777692625');
    await page.locator('#venue').selectOption('Paragahadeniya');
    assert.equal(await page.locator('#booking-contact').getAttribute('href'),'tel:+94771360369');
    check('Unavailable slots cannot be selected; sport/venue changes clear slot and update summary/contact');

    await page.locator('#slots button:not(:disabled)').first().click();
    await page.locator('#customer-name').fill('D');
    await page.locator('#phone').fill('123');
    await page.locator('#confirm-button').click();
    assert.equal(await page.locator('#phone').getAttribute('aria-invalid'),'true');
    assert.equal(await page.locator('#customer-name').getAttribute('aria-invalid'),'true');
    await page.locator('#customer-name').fill('Demo Player');
    await page.locator('#phone').fill('+94 77 123 4567');
    assert.equal(await page.locator('#phone').getAttribute('aria-invalid'),'false');
    assert.equal(await page.locator('#summary-name').textContent(),'Demo Player');
    assert.equal(await page.locator('.ticket').evaluate(e=>e.scrollLeft),0);
    await page.locator('#booking').screenshot({path:'verification/booking-mobile.png',style:'header,.skip{visibility:hidden!important}'});
    await page.locator('#confirm-button').click();
    await page.locator('#confirmation').waitFor({state:'visible'});
    assert.ok((await page.locator('#confirmation').textContent()).includes('No real reservation was submitted.'));
    assert.ok(await page.locator('#confirmation').evaluate(e=>e===document.activeElement));
    check('Invalid name/phone, international Sri Lankan phone, complete booking and focused simulated confirmation');
    await page.locator('#start-again').click();
    assert.equal(await page.locator('#customer-name').inputValue(),'');
    assert.equal(await page.locator('#phone').inputValue(),'');
    assert.equal(await page.locator('#venue').inputValue(),'Mawanella');
    assert.equal(await page.locator('#slots [aria-pressed="true"]').count(),0);
    assert.equal(await page.locator('#confirmation-summary').textContent(),'');
    check('Reset clears booking data, errors, confirmation and selection');

    // Reset during the simulated loading interval must cancel the pending confirmation.
    await page.locator('#date').fill('2027-02-04');
    await page.locator('#date').dispatchEvent('change');
    await page.locator('#slots button:not(:disabled)').first().click();
    await page.locator('#customer-name').fill('Test Player');
    await page.locator('#phone').fill('0771234567');
    await page.evaluate(()=>{document.querySelector('#confirm-button').click(); document.querySelector('#reset-demo').click();});
    await page.waitForTimeout(800);
    assert.ok(await page.locator('#confirmation').isHidden());
    check('Local Sri Lankan phone accepted; resetting during loading cancels confirmation');

    await page.locator('[data-sport="Badminton"]').click();
    assert.equal(await page.locator('#sport').inputValue(),'Badminton');
    check('Facility CTAs preselect the correct demo sport');
    await page.locator('.gallery-item').first().click();
    assert.ok(await page.locator('#lightbox').evaluate(e=>e.open));
    assert.ok(await page.locator('#gallery-close').evaluate(e=>e===document.activeElement));
    await page.keyboard.press('ArrowRight');
    assert.ok((await page.locator('#lightbox-caption').textContent()).startsWith('02'));
    await page.locator('#gallery-prev').click();
    await page.keyboard.press('ArrowLeft');
    assert.ok((await page.locator('#lightbox-caption').textContent()).startsWith('06'));
    await page.locator('#gallery-next').click();
    for(let i=0;i<6;i++) {
      await page.locator('#lightbox-image').evaluate(img=>img.decode());
      assert.ok(await page.locator('#lightbox-image').evaluate(img=>img.naturalWidth>0));
      await page.locator('#gallery-next').click();
    }
    await page.keyboard.press('Tab');
    assert.ok(await page.evaluate(()=>document.querySelector('#lightbox').contains(document.activeElement)));
    await page.screenshot({path:'verification/gallery-mobile.png'});
    await page.keyboard.press('Escape');
    assert.ok(await page.locator('.gallery-item').first().evaluate(e=>e===document.activeElement));
    await page.locator('.gallery-item').nth(1).click();
    await page.locator('#gallery-close').click();
    assert.ok(await page.locator('#lightbox').isHidden());
    check('Gallery: all 6 assets, next/previous wrap, arrow keys, Escape, close, modal focus and focus restoration');

    await page.locator('details summary').first().click();
    assert.ok(await page.locator('details').first().evaluate(e=>e.open));
    await page.locator('details summary').first().focus();
    await page.keyboard.press('Enter');
    assert.ok(!(await page.locator('details').first().evaluate(e=>e.open)));
    check('FAQ mouse and keyboard accordion');
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
    check('Reduced motion support');

    await context.setOffline(true);
    await page.reload();
    await page.evaluate(()=>document.fonts.ready);
    await page.evaluate(()=>Promise.all([...document.images].filter(i=>i.getAttribute('src')).map(i=>{i.loading='eager';return i.decode();})));
    assert.deepEqual(await page.evaluate(()=>[...document.images].filter(i=>i.getAttribute('src')&&!i.naturalWidth).map(i=>i.src)),[]);
    assert.equal(requests.length,0);
    assert.equal(await page.evaluate(()=>document.fonts.check('700 30px Barlow')&&document.fonts.check('500 15px Manrope')),true);
    check('file:// and offline reload work; all images/fonts local; zero HTTP requests');
    assert.deepEqual(errors,[]);
    check('No JavaScript or browser console errors');
    // Additional narrow and zoom-equivalent layout sanity checks.
    for(const width of [320,1920]) { await page.setViewportSize({width,height:1000}); assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)); }
    check('Additional 320px and 1920px overflow checks');
  } catch(error) {
    checks.push({name:'Verification failure',result:'FAIL',detail:error.stack});
    console.error(error);
    await page.screenshot({path:'verification/failure.png',fullPage:true});
    process.exitCode=1;
  } finally {
    fs.writeFileSync('verification/results.json',JSON.stringify({testedAt:new Date().toISOString(),checks,errors,requests},null,2));
    await browser.close();
  }
})();
