// ======= CONFIG =======
const WHATSAPP_NUMBER = '+94710000000'; // ← put your real number here

// ======= HELPERS =======
function buildWaUrl(message = 'Hi! I would like to ask about your products.') {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g,'')}?text=${text}`;
}
function openWa(message) { window.open(buildWaUrl(message), '_blank'); }

// ======= BIND WHATSAPP BUTTONS =======
['whTop','whNav','whContact','whFab','whAbout'].forEach(id=>{
  const el = document.getElementById(id);
  if(el){
    el.addEventListener('click', (e)=>{
      e.preventDefault();
      openWa('Hello! I am contacting from your website. Can you help me?');
    });
  }
});

// ======= BOOTSTRAP VALIDATION =======
(() => {
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) { event.preventDefault(); event.stopPropagation(); }
      form.classList.add('was-validated');
    }, false);
  });
})();

// ======= NAV SHADOW ON SCROLL =======
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('shadow-sm', window.scrollY > 10);
});

// ======= YEAR =======
document.getElementById('year').textContent = new Date().getFullYear();

// ======= AOS INIT =======
AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true });

// ======= HERO IMAGE CROSSFADE =======
(function setupCrossfade(){
  const box   = document.querySelector('.hero-crossfade');
  if(!box) return;

  const slides = Array.from(box.querySelectorAll('.cf-slide'));
  const dots   = Array.from(box.querySelectorAll('.cf-dots button'));
  const INTERVAL = 4000; // ms
  let i = 0, timer;

  function show(n){
    slides.forEach((s, idx)=> s.classList.toggle('active', idx===n));
    dots.forEach((d,   idx)=> d.classList.toggle('active', idx===n));
    i = n;
  }
  function next(){ show((i+1) % slides.length); }
  function start(){ timer = setInterval(next, INTERVAL); }
  function stop(){ clearInterval(timer); }

  if (slides.length) { show(0); start(); }
  dots.forEach((d, idx)=> d.addEventListener('click', ()=>{ stop(); show(idx); start(); }));
  box.addEventListener('mouseenter', stop);
  box.addEventListener('mouseleave', start);
})();

