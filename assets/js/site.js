(() => {
  try { if ('scrollRestoration' in history) history.scrollRestoration='manual'; } catch(e){}
  if ((location.pathname==='/' || location.pathname.endsWith('/index.html')) && !location.hash) { requestAnimationFrame(()=>scrollTo(0,0)); setTimeout(()=>scrollTo(0,0),60); }
  const btn=document.querySelector('.menu-btn'), nav=document.querySelector('.mobile-nav');
  if(btn&&nav) btn.addEventListener('click',()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(o));});
  document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
  const rail=document.querySelector('.contact-rail'), toggle=document.querySelector('.rail-toggle'); if(rail&&toggle) toggle.addEventListener('click',()=>rail.classList.toggle('collapsed'));
  const form=document.querySelector('[data-mail-form]'); if(form) form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const subject=encodeURIComponent(`Website enquiry: ${d.get('matter')||'Legal matter'}`);const body=encodeURIComponent(`Name: ${d.get('name')||''}\nPhone: ${d.get('phone')||''}\nEmail: ${d.get('email')||''}\nMatter: ${d.get('matter')||''}\n\n${d.get('message')||''}`); location.href=`mailto:ruthrotichadvocates@outlook.com?subject=${subject}&body=${body}`;});

  const lightbox=document.querySelector('#image-lightbox');
  if(lightbox){
    const lbImg=lightbox.querySelector('img'), close=lightbox.querySelector('.lightbox-close');
    const shut=()=>{lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lbImg.src='';document.body.style.overflow='';};
    document.querySelectorAll('[data-lightbox-src]').forEach(el=>el.addEventListener('click',()=>{lbImg.src=el.dataset.lightboxSrc;lbImg.alt=el.dataset.lightboxAlt||'';lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';close.focus();}));
    close.addEventListener('click',shut); lightbox.addEventListener('click',e=>{if(e.target===lightbox)shut();}); document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lightbox.classList.contains('open'))shut();});
  }
})();
