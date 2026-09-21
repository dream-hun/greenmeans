import {chromium} from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true});
const routes=JSON.parse(fs.readFileSync('src/routes.json','utf8'));
const errors=[];
const consoleErrors=[];
fs.mkdirSync('artifacts',{recursive:true});
const context=await browser.newContext({reducedMotion:'reduce'});
const page=await context.newPage();
page.on('pageerror',error=>consoleErrors.push(error.message));
for(const width of [1440,1024,390]) {
  await page.setViewportSize({width,height:1000});
  for(const {route} of routes) {
    await page.goto(`http://localhost:5173${route==='/'?'/':route+'/'}`,{waitUntil:'load'});
    await page.evaluate(async()=>{
      document.querySelectorAll('img').forEach(img=>img.loading='eager');
      await document.fonts.ready;
      await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));
    });
    const issues=await page.evaluate(()=>({
      overflow:document.documentElement.scrollWidth>innerWidth+1,
      broken:[...document.images].filter(img=>!img.complete||!img.naturalWidth).map(img=>img.getAttribute('src')),
      heading:document.querySelector('h1')?.textContent,
    }));
    if(issues.overflow||issues.broken.length||!issues.heading)errors.push({route,width,...issues});
    if(width!==1024 && ['/','/about','/service','/contact','/pricing','/project','/impact','/project/greenshift'].includes(route)) {
      await page.screenshot({path:`artifacts/${route==='/'?'home':route.slice(1).replaceAll('/','-')}-${width}.png`,fullPage:true});
    }
  }
}
console.log('Responsive page checks:', JSON.stringify(errors));
await page.goto('http://localhost:5173/');
await page.getByRole('button',{name:'Open menu'}).click();
if(!await page.locator('#mobile-menu').isVisible())errors.push('Mobile menu did not open');
await page.keyboard.press('Escape');
if(await page.locator('#mobile-menu').isVisible())errors.push('Mobile menu did not close');
const faqs=page.locator('.faq-item');
await faqs.nth(0).locator('summary').click();
await page.waitForTimeout(50);
if(!await faqs.nth(0).getAttribute('open').then(x=>x!==null))errors.push('FAQ did not open');
await faqs.nth(1).locator('summary').click();
await page.waitForTimeout(50);
if(await faqs.nth(0).getAttribute('open')!==null)errors.push('FAQ did not close when another opened');
await page.goto('http://localhost:5173/pricing/');
await page.getByRole('button',{name:'Yearly',exact:true}).click();
if(await page.locator('[data-monthly]').first().textContent()!=='$450')errors.push('Yearly pricing failed');
await page.getByRole('button',{name:'Monthly',exact:true}).click();
if(await page.locator('[data-monthly]').first().textContent()!=='$499')errors.push('Monthly pricing failed');
await page.goto('http://localhost:5173/service/');
await page.getByRole('button',{name:'Next service'}).click();
if(await page.locator('[data-slide-number]').textContent()!=='/02')errors.push('Service slider failed');
await page.goto('http://localhost:5173/contact/');
await page.getByRole('button',{name:'Send',exact:true}).click();
if(await page.locator('form[data-form=contact]').evaluate(f=>f.checkValidity()))errors.push('Required fields did not validate');
await page.getByRole('textbox',{name:'First Name',exact:true}).fill('Test');
await page.getByRole('textbox',{name:'Last Name',exact:true}).fill('Visitor');
await page.getByRole('textbox',{name:'Country',exact:true}).fill('Rwanda');
await page.getByRole('textbox',{name:'Phone Number',exact:true}).fill('+250700000000');
await page.getByRole('textbox',{name:'Email Address',exact:true}).fill('test@example.com');
await page.getByRole('combobox',{name:'Types of Services'}).selectOption({index:1});
await page.getByRole('textbox',{name:'Message',exact:true}).fill('Local preview test.');
const download=page.waitForEvent('download');
await page.getByRole('button',{name:'Send',exact:true}).click();
await download;
if(!await page.locator('.contact-form .form-status').textContent().then(t=>t.includes('does not send')))errors.push('Static form status unclear');
await page.goto('http://localhost:5173/impact/');
await page.getByRole('combobox',{name:'Select Your Industry'}).selectOption('Manufacturing');
await page.getByRole('spinbutton',{name:'Number of Employees'}).fill('100');
await page.getByRole('spinbutton',{name:'Annual Energy Spend'}).fill('100000');
await page.getByRole('textbox',{name:'Current Energy Source'}).fill('Grid');
await page.getByRole('button',{name:'Results',exact:true}).click();
if(!await page.locator('output').textContent().then(t=>t.includes('$30,000–$60,000')))errors.push('Calculator failed');
await page.goto('http://localhost:5173/impact/');
await page.getByRole('button',{name:'Play video'}).click();
if(!await page.locator('[data-video] video').evaluate(v=>v.controls)||await page.getByRole('button',{name:'Play video'}).isVisible())errors.push('Video play button failed');
const motion=await browser.newPage({viewport:{width:1440,height:1000}});
// Instant scrolling keeps hover and scroll checks deterministic; the site itself scrolls smoothly.
await motion.addInitScript(()=>addEventListener('DOMContentLoaded',()=>{document.documentElement.style.scrollBehavior='auto';}));
motion.on('pageerror',error=>consoleErrors.push(error.message));
await motion.goto('http://localhost:5173/about/');
const counter=motion.locator('[data-count]').first();
if(await counter.textContent()!=='1.2M+')errors.push('Counter did not start from its start value');
await counter.scrollIntoViewIfNeeded();
await motion.waitForTimeout(2000);
if(await counter.textContent()!=='2.5M+')errors.push('Counter did not reach its end value');
await motion.locator('.timeline-bar').first().scrollIntoViewIfNeeded();
await motion.waitForTimeout(1500);
if(!await motion.locator('.timeline-bar>div').first().evaluate(b=>b.getBoundingClientRect().height>0))errors.push('Timeline bar did not grow');
if(await motion.locator('.ticker.is-running').count()!==1)errors.push('Values ticker is not running');
const flip=motion.locator('.logo-flip').first();
await flip.scrollIntoViewIfNeeded();
await motion.waitForTimeout(1200);
await flip.hover();
await motion.waitForTimeout(1200);
if(await flip.locator('.logo-flip-inner').evaluate(e=>getComputedStyle(e).transform)==='none')errors.push('Partner logo did not flip on hover');
await motion.setViewportSize({width:390,height:844});
for(const route of ['/','/about/','/service/','/contact/']) {
  await motion.goto(`http://localhost:5173${route}`);
  if(await motion.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))errors.push(`Appear start states overflow at 390px on ${route}`);
}
await motion.setViewportSize({width:1440,height:1000});
await motion.goto('http://localhost:5173/');
await motion.waitForTimeout(1600);
if(await motion.locator('.hero-copy h1').evaluate(e=>getComputedStyle(e).opacity)!=='1')errors.push('Hero title did not appear on load');
if(await motion.locator('[data-count="81"]').textContent()!=='81%')errors.push('Hero counter did not finish');
const heroButton=motion.locator('.hero-copy .btn').first();
await heroButton.hover();
await motion.waitForTimeout(600);
if(await heroButton.locator('.roll>span').nth(1).evaluate(e=>getComputedStyle(e).transform)!=='none')errors.push('Button label did not roll on hover');
await motion.mouse.move(0,0);
const track=motion.locator('.service-rail .ticker-track');
if(await track.evaluate(t=>t.children.length)!==8)errors.push('Service ticker items were not duplicated');
const tickerOffset=()=>track.evaluate(t=>new DOMMatrix(getComputedStyle(t).transform).m41);
const offsetBefore=await tickerOffset();
await motion.waitForTimeout(400);
if(await tickerOffset()===offsetBefore)errors.push('Service ticker is not moving');
const revealText=motion.locator('[data-scroll-reveal]');
const lit=()=>revealText.evaluate(p=>[...p.querySelectorAll('[aria-hidden] span span')].filter(s=>s.style.opacity==='1').length);
const litBefore=await lit();
await revealText.evaluate(p=>scrollTo({top:p.getBoundingClientRect().top+scrollY-innerHeight*0.3,behavior:'instant'}));
await motion.waitForTimeout(300);
const litAfter=await lit(),characters=await revealText.evaluate(p=>p.querySelectorAll('[aria-hidden] span span').length);
if(!(litBefore<litAfter&&litAfter===characters))errors.push(`Text reveal did not progress (${litBefore} to ${litAfter} of ${characters})`);
if(!await revealText.evaluate(p=>p.querySelector('.sr-only')?.textContent.startsWith('Expert sustainability')))errors.push('Text reveal lost its readable sentence');
const card=motion.locator('.choose-card').first();
if(await card.evaluate(e=>e.classList.contains('is-visible')))errors.push('Below-the-fold card revealed before scrolling');
await card.scrollIntoViewIfNeeded();
await motion.waitForTimeout(1600);
if(await card.evaluate(e=>getComputedStyle(e).opacity)!=='1')errors.push('Card did not reveal in view');
const headerState=()=>motion.locator('[data-header]').evaluate(h=>`${h.classList.contains('is-scrolled')},${h.classList.contains('is-hidden')}`);
await motion.mouse.move(700,500);
await motion.mouse.wheel(0,600);
await motion.waitForTimeout(600);
if(await headerState()!=='true,false')errors.push('Header did not frost and stay visible on scroll down');
await motion.goto('http://localhost:5173/service/');
if(await motion.locator('.ticker.is-running').count()!==1)errors.push('Gallery ticker is not running');
await motion.goto('http://localhost:5173/service/carbon-footprint-analysis/');
if(await motion.locator('aside').evaluate(e=>getComputedStyle(e).position)!=='sticky')errors.push('Service form is not sticky');
await page.goto('http://localhost:5173/');
if(await page.evaluate(()=>document.querySelectorAll('[data-appear]:not(.is-visible)').length||document.querySelectorAll('.ticker.is-running').length))errors.push('Reduced motion still hides or animates content');
await browser.close();
console.log(JSON.stringify({pages:routes.length,viewports:[1440,1024,390],errors,consoleErrors},null,2));
if(errors.length||consoleErrors.length)process.exitCode=1;
