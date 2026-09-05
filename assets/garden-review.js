/* Native scrolling, one curved handoff, contained section images. */
(() => {
  'use strict';
  const home = document.querySelector('#screen-home');
  const hero = home.querySelector('.kr-hero');
  const photo = home.querySelector('.kr-garden-photo');
  const copy = home.querySelector('.kr-hero-copy');
  const curve = home.querySelector('.kr-curve');
  const programme = home.querySelector('.kr-programme');
  const materials = [...home.querySelectorAll('.kr-material-frame img')];
  const pool = home.querySelector('.kr-pool-frame');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = v => Math.max(0, Math.min(1, v));
  const ease = v => { v = clamp(v); return v * v * (3 - 2 * v); };
  let frame = 0;
  function paint() {
    frame = 0;
    if (home.hidden || document.hidden) return;
    if (reduced.matches) {
      [photo, copy, curve, pool.querySelector('img'), ...materials].forEach(el => { el.style.transform = 'none'; el.style.clipPath = 'none'; });
      return;
    }
    const r = hero.getBoundingClientRect();
    const header = document.querySelector('.site-header').getBoundingClientRect().height;
    const progress = ease((header - r.top) / Math.max(1, r.height * .85));
    photo.style.transform = `scale(${1 + progress * .055})`;
    copy.style.transform = `translateY(${-progress * (innerWidth < 700 ? 12 : 30)}px)`;
    const opening = ease((innerHeight - programme.getBoundingClientRect().top) / (innerHeight * .8));
    curve.style.transform = `scaleY(${1 - opening * .94})`;
    materials.forEach((img, i) => {
      const r = img.parentElement.getBoundingClientRect();
      const entry = ease((innerHeight - r.top - 24 - i * 16) / Math.min(300, innerHeight * .38));
      img.style.transform = `scale(${1 + (1 - entry) * .035})`;
      img.style.clipPath = `inset(${(1 - entry) * 15}% 0 0 0)`;
    });
    const pr = pool.getBoundingClientRect();
    const pp = clamp((innerHeight - pr.top) / (innerHeight + pr.height));
    pool.querySelector('img').style.transform = `translateY(${-pp * pr.height * .10}px)`;
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(paint); }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  addEventListener('hashchange', schedule);
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', schedule);
  new MutationObserver(schedule).observe(home, { attributes: true, attributeFilter: ['hidden'] });
  const translate = () => {
    const zh = document.documentElement.lang.startsWith('zh');
    home.querySelectorAll('[data-en][data-zh]').forEach(el => { el.textContent = zh ? el.dataset.zh : el.dataset.en; });
    schedule();
  };
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  document.fonts.ready.then(() => {
    home.dataset.fontStatus = JSON.stringify([...document.fonts].filter(f => ['Urbanist', 'Stardom'].includes(f.family)).map(f => ({ family: f.family, status: f.status })));
    schedule();
  });
  translate();
})();
