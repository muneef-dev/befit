const { chromium } = require('C:/Users/muham/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch({headless:true, executablePath:'C:/Users/muham/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe'});
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  const results = [];
  for (const [name,url] of [['home','https://befit.lk/'],['sports','https://befit.lk/4249-2/'],['contact','https://befit.lk/contact/'],['about','https://befit.lk/about/'],['showroom','https://befit.lk/4279-2/']]) {
    try {
      await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
      await page.screenshot({path:`research/${name}-desktop.png`,fullPage:true});
      results.push({name,url,...await page.evaluate(()=>({title:document.title,text:document.body.innerText,images:[...document.images].map(i=>({src:i.currentSrc||i.src,alt:i.alt,width:i.naturalWidth})),links:[...document.querySelectorAll('a')].map(a=>({text:a.innerText,url:a.href})),colors:[...new Set([...document.querySelectorAll('h1,h2,header,a,button')].map(e=>getComputedStyle(e).color))]}))});
      if(name==='home'||name==='sports') { await page.setViewportSize({width:375,height:812}); await page.screenshot({path:`research/${name}-mobile.png`,fullPage:true}); results.push({name:name+'-mobile',...await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,buttons:[...document.querySelectorAll('button')].map(e=>({text:e.innerText,label:e.getAttribute('aria-label')}))}))}); await page.setViewportSize({width:1440,height:1000}); }
    } catch(e) {results.push({name,error:e.message});}
  }
  fs.writeFileSync('research/inspection.json',JSON.stringify(results,null,2));
  console.log(JSON.stringify(results.map(r=>({name:r.name,title:r.title,error:r.error,colors:r.colors,width:r.width,scrollWidth:r.scrollWidth,images:r.name==='sports'?r.images:undefined})),null,2));
  await browser.close();
})();
