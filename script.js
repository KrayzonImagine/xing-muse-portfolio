const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.topbar nav');
const topbar=document.querySelector('.topbar');
menu?.addEventListener('click',()=>{
  const opened=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(opened));
});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const glow=document.querySelector('.cursor-glow');
const finePointer=window.matchMedia('(pointer:fine)').matches;
if(finePointer){
  window.addEventListener('pointermove',e=>{
    if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}
    const temple=document.querySelector('.temple');
    if(temple){const shift=(e.clientY/window.innerHeight-.5)*-14;temple.style.setProperty('--temple-shift',shift+'px')}
  },{passive:true});
}
const revealTargets=document.querySelectorAll('.section-index,.intro-grid,.section-head,.work-card,.statement-symbol,.statement p,.about-grid,.steps>div,.contact h2,.contact-link');
revealTargets.forEach(el=>el.classList.add('reveal'));
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
    });
  },{threshold:.12,rootMargin:'0px 0px -35px 0px'});
  revealTargets.forEach(el=>observer.observe(el));
}else{revealTargets.forEach(el=>el.classList.add('is-visible'))}
const updateHeader=()=>topbar?.classList.toggle('scrolled',window.scrollY>40);
window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
const dialog=document.querySelector('.project-dialog');
const closeDialog=()=>dialog?.close();
document.querySelectorAll('[data-project]').forEach(card=>{
  card.addEventListener('click',e=>{
    e.preventDefault();
    if(!dialog)return;
    const title=card.querySelector('.work-meta h3')?.textContent||'Selected Project';
    const category=card.querySelector('.work-meta span')?.textContent||'PROJECT';
    dialog.querySelector('#dialog-title').textContent=title;
    dialog.querySelector('.dialog-category').textContent=category;
    dialog.showModal();
  });
});
dialog?.querySelector('.dialog-close')?.addEventListener('click',closeDialog);
dialog?.addEventListener('click',e=>{if(e.target===dialog)closeDialog()});
