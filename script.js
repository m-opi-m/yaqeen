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

// ── reveal-on-scroll ─────────────────────
(function reveal(){
  const items = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });
  items.forEach(el => io.observe(el));
})();
