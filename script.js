// ── twinkling star field ─────────────────────
(function makeStars(){
  const field = document.getElementById('stars');
  if(!field) return;
  const count = window.innerWidth < 640 ? 18 : 34;
  for(let i=0;i<count;i++){
    const s = document.createElement('span');
    s.className = 'star';
    s.style.left = Math.random()*100 + '%';
    s.style.top = Math.random()*100 + '%';
    s.style.animationDelay = (Math.random()*4) + 's';
    s.style.animationDuration = (3 + Math.random()*3) + 's';
    field.appendChild(s);
  }
})();

// ── mobile sticky download bar ─────────────────────
(function mobileBar(){
  const bar = document.getElementById('mobileBar');
  const hero = document.querySelector('.hero');
  const downloadSection = document.getElementById('download');
  if(!bar || !hero || !downloadSection) return;

  let pastHero = false, inDownloadSection = false;

  function sync(){
    bar.classList.toggle('show', pastHero && !inDownloadSection);
  }

  if('IntersectionObserver' in window){
    new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{ pastHero = !entry.isIntersecting; });
      sync();
    }, { rootMargin:'-10% 0px 0px 0px' }).observe(hero);

    new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{ inDownloadSection = entry.isIntersecting; });
      sync();
    }, { threshold:0.2 }).observe(downloadSection);
  }
})();

// ── reveal-on-scroll ─────────────────────
(function reveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;

  function revealAll(){
    items.forEach(el => el.classList.add('in'));
  }

  try{
    if(!('IntersectionObserver' in window)){
      revealAll();
      return;
    }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.1, rootMargin:'0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));

    // safety net: if anything is still hidden after a short while
    // (slow network, timing quirks, observer edge-cases on mobile),
    // reveal it anyway so content never stays permanently invisible.
    window.addEventListener('load', ()=> setTimeout(revealAll, 1200));
  }catch(err){
    // if anything above throws, never let content stay hidden
    revealAll();
  }
})();
