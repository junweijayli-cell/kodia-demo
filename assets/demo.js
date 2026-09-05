/* KORDIA demo choreography. The shared Scrollcraft engine is unchanged. */
(() => {
  'use strict';
  const home = document.querySelector('#screen-home');
  const hero = document.querySelector('.kd-hero');
  const terrace = document.querySelector('.kd-terrace');
  const room = document.querySelector('.kd-room');
  const layers = document.querySelector('.kd-room-layers');
  const rail = document.querySelector('#home-collections');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = (v, lo=0, hi=1) => Math.min(hi, Math.max(lo, v));
  let engine, raf = 0, pointer = 0, easedPointer = 0;
  const tr = () => {
    const zh = document.documentElement.lang === 'zh-CN';
    document.querySelectorAll('[data-en][data-zh]').forEach(el => { el.textContent = zh ? el.dataset.zh : el.dataset.en; });
    requestAnimationFrame(() => { if (!home.hidden) { engine?.layout(); paint(); } });
  };
  new MutationObserver(tr).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  tr();
  Promise.all([...layers.querySelectorAll('img')].map(img => img.decode())).then(() => {
    room.classList.add('is-ready');
  }).catch(() => { /* A complete original poster remains visible if any plane fails. */ });

  function paint() {
    raf = 0;
    if (home.hidden || document.hidden) return;
    const mobile = innerWidth <= 640;
    const hr = hero.getBoundingClientRect();
    if (hr.bottom > 0 && hr.top < innerHeight) {
      const hp = clamp(-hr.top / hr.height);
      hero.querySelector('.kd-hero-world').style.setProperty('--hy', `${reduced.matches ? 0 : hp * (mobile ? 22 : 70)}px`);
      hero.querySelector('.kd-hero-inset').style.transform = reduced.matches ? 'none' : `translate3d(${easedPointer * -8}px,${hp * -44}px,0) rotate(5deg)`;
      hero.querySelector('.kd-hero-copy').style.transform = reduced.matches ? 'none' : `translateY(${hp * -24}px)`;
    }
    const r = terrace.getBoundingClientRect();
    if (r.bottom >= 0 && r.top <= innerHeight) {
      const p = reduced.matches ? 1 : clamp(-r.top / Math.max(1, r.height - innerHeight));
      const door = clamp(p / .70) * 105;
      const scale = 1 + p * (mobile ? .035 : .065);
      const front = 1 + p * (mobile ? .025 : .045);
      const label = reduced.matches ? 1 : clamp((p - .65) / .2);
      room.style.setProperty('--room-scale', scale.toFixed(4));
      room.style.setProperty('--front-scale', front.toFixed(4));
      room.style.setProperty('--door', `${door.toFixed(2)}%`);
      room.style.setProperty('--word-y', `${p * (mobile ? 32 : 90)}px`);
      terrace.style.setProperty('--title-opacity', String(reduced.matches ? 1 : 1 - clamp((p-.08)/.28)));
      terrace.style.setProperty('--label-opacity', String(label));
      terrace.style.setProperty('--label-y', `${(1-label)*20}px`);
      room.dataset.scVerifyState = `aperture:${door.toFixed(1)};scene:${scale.toFixed(3)};foreground:${front.toFixed(3)};label:${label.toFixed(2)}`;
      if (reduced.matches) room.dataset.scVerifyHold = 'true'; else delete room.dataset.scVerifyHold;
    }
    if (Math.abs(pointer - easedPointer) > .002) { easedPointer += (pointer-easedPointer)*.12; schedule(); }
  }
  function schedule() { if (!raf) raf=requestAnimationFrame(paint); }
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule, {passive:true});
  document.addEventListener('visibilitychange', schedule);
  hero.addEventListener('pointermove', e => { if (fine.matches && !reduced.matches) { pointer = (e.clientX / innerWidth - .5)*2; schedule(); } });
  hero.addEventListener('pointerleave', () => { pointer=0; schedule(); });
  function mount() {
    if (home.hidden) return;
    if (!engine) engine = window.ScrollCraft?.mount(home);
    else engine.layout();
    schedule();
  }
  addEventListener('hashchange', () => requestAnimationFrame(mount));
  new MutationObserver(() => requestAnimationFrame(mount)).observe(home, {attributes:true, attributeFilter:['hidden']});
  reduced.addEventListener('change', () => location.reload());
  mount();

  const mats = {
    rope: ['rope-weave', 'Close detail of woven outdoor rope'],
    teak: ['teak', 'Close detail of solid teak grain'],
    aluminium: ['aluminium', 'Close detail of a powder-coated aluminium frame']
  };
  document.querySelectorAll('[data-material]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-material]').forEach(b => { b.classList.toggle('is-active', b===button); b.setAttribute('aria-pressed', String(b===button)); });
    const [file, alt] = mats[button.dataset.material];
    const img = document.querySelector('#kd-material-img');
    img.src = `assets/images/material/${file}-880.webp`; img.alt = alt;
  }));
  function railState() {
    const max = rail.scrollWidth - rail.clientWidth;
    document.querySelector('[data-rail="-1"]').disabled = rail.scrollLeft <= 2;
    document.querySelector('[data-rail="1"]').disabled = rail.scrollLeft >= max - 2;
  }
  document.querySelectorAll('[data-rail]').forEach(b => b.addEventListener('click', () => {
    rail.scrollBy({left:Number(b.dataset.rail)*(rail.querySelector('.coll-card')?.getBoundingClientRect().width+28 || 380), behavior:reduced.matches?'instant':'smooth'});
  }));
  rail.addEventListener('scroll', railState, {passive:true});
  rail.addEventListener('keydown', e => {
    if(e.target===rail && ['ArrowLeft','ArrowRight'].includes(e.key)) { e.preventDefault(); rail.scrollBy({left:(e.key==='ArrowRight'?1:-1)*350, behavior:reduced.matches?'instant':'smooth'}); }
  });
  addEventListener('resize', railState, {passive:true});
  new ResizeObserver(railState).observe(rail);
  railState();
})();
