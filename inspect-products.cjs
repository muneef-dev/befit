const { chromium } = require('C:/Users/muham/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch({headless:true,executablePath:'C:/Users/muham/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe'});
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  try {
    await page.goto('https://befit.lk/shop/',{waitUntil:'domcontentloaded',timeout:45000});
    await page.screenshot({path:'research/shop-desktop.png',fullPage:true});
    const shop = await page.evaluate(()=>({title:document.title,text:document.body.innerText,products:[...document.querySelectorAll('li.product')].map(e=>({name:e.querySelector('h2')?.textContent,url:e.querySelector('a')?.href,image:e.querySelector('img')?.currentSrc}))}));
    console.log(JSON.stringify(shop.products));
    await page.setViewportSize({width:375,height:812});
    await page.screenshot({path:'research/shop-mobile.png',fullPage:true});
    const products=[];
    for(const index of [0,3,8,10,11,14]) {
      const item=shop.products[index]; if(!item) continue;
      await page.goto(item.url,{waitUntil:'domcontentloaded',timeout:45000});
      const product=await page.evaluate(()=>({name:document.querySelector('h1')?.innerText,url:location.href,text:document.querySelector('.product')?.innerText||document.body.innerText,images:[...document.querySelectorAll('.woocommerce-product-gallery img')].map(i=>({src:i.getAttribute('data-large_image')||i.currentSrc,alt:i.alt})),sku:document.querySelector('.sku')?.innerText,categories:[...document.querySelectorAll('.posted_in a')].map(a=>a.innerText),price:document.querySelector('.summary .price')?.innerText,links:[...document.querySelectorAll('.summary a')].map(a=>({text:a.innerText,url:a.href}))}));
      if(index===0){await page.screenshot({path:'research/medicine-ball-mobile.png',fullPage:true});await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'research/medicine-ball-desktop.png',fullPage:true});}
      products.push(product);
      const src=product.images[0]?.src||item.image;
      try { if(src){const r=await page.request.get(src,{maxRetries:2,timeout:20000});if(r.ok()){const name=`product-${index}.${new URL(src).pathname.split('.').pop()}`;fs.writeFileSync('assets/'+name,await r.body());product.localImage='assets/'+name;product.imageSource=src;}} } catch(error) { console.log('Image unavailable: '+item.name); }
      fs.writeFileSync('research/products-inspection.json',JSON.stringify({shop,products},null,2)); console.log(product.name + ' | ' + product.localImage);
    }
    fs.writeFileSync('research/products-inspection.json',JSON.stringify({shop,products},null,2));
  } finally {await browser.close();}
})();
