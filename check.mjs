import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const pages=[];
function walk(d){
  for(const e of fs.readdirSync(d,{withFileTypes:true})){
    if(e.name==='.git'||e.name==='node_modules') continue;
    const p=path.join(d,e.name);
    if(e.isDirectory()) walk(p);
    else if(e.name.endsWith('.html')) pages.push(p);
  }
}
walk(root);
let fail=0;
for(const p of pages){
  const s=fs.readFileSync(p,'utf8');
  for(const m of s.matchAll(/(?:src|href)="(\/[^\"]+)"/g)){
    let u=m[1].split(/[?#]/)[0];
    if(u==='/'||u.startsWith('//')) continue;
    let local=path.join(root,u.replace(/^\//,''));
    if(u.endsWith('/')) local=path.join(local,'index.html');
    if(!fs.existsSync(local)){
      console.error('Missing',u,'in',path.relative(root,p)); fail++;
    }
  }
  if(s.includes('href="/assets/css/site.css')){
    console.error('Render-blocking external site CSS remains in',path.relative(root,p)); fail++;
  }
}
const required=[
  'assets/css/site.css','assets/js/site.js','assets/media/ruth-logo-motion-1080p.mp4',
  'images/ruth-rotich-logo.webp','images/ruth-rotich-logo-transparent.png','images/partner.webp',
  'insights/digital-credit-licensing/index.html','insights/registration-of-a-trust/index.html',
  'insights/foreign-companies/index.html','insights/criminal-sentencing/index.html'
];
for(const r of required){if(!fs.existsSync(path.join(root,r))){console.error('Missing required',r);fail++;}}
const insights=fs.readFileSync(path.join(root,'insights/index.html'),'utf8');
const cardCount=(insights.match(/class="social-card"/g)||[]).length;
const lightboxCount=(insights.match(/data-lightbox-src=/g)||[]).length;
if(cardCount!==5){console.error('Expected 5 public-education tiles, found',cardCount);fail++;}
if(lightboxCount!==5){console.error('Expected 5 expandable poster images, found',lightboxCount);fail++;}
if(insights.includes('/images/profile.webp')){console.error('Wakili Ruth profile tile still present');fail++;}
if(fail) process.exit(1);
console.log(`PASS: ${pages.length} HTML pages, local links, inline first-paint CSS, 5 lightbox posters and core assets verified.`);
