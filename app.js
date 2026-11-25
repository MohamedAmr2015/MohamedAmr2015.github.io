(async function () {
  const el = document.getElementById('app');
  let d, lang = 'en', filter = '', intentSubject = '';
  const qs = new URLSearchParams(location.search);
  const qLang = qs.get('lang');
  if (qLang === 'ar' || qLang === 'en') lang = qLang;
  else { try { const s = localStorage.getItem('lang'); if (s === 'ar' || s === 'en') lang = s; } catch (e) {} }

  try { d = await (await fetch('content/site.json', { cache: 'no-cache' })).json(); }
  catch (e) { el.textContent = 'Could not load the site content.'; return; }

  let observer = null;
  function bindReveal() {
    if (!('IntersectionObserver' in window)) { el.querySelectorAll('.reveal').forEach(n => n.classList.add('in')); return; }
    if (observer) observer.disconnect();
    observer = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); observer.unobserve(en.target); } });
    }, { threshold: .08, rootMargin: '0px 0px -30px 0px' });
    el.querySelectorAll('.reveal').forEach(n => observer.observe(n));
  }

  function applyFilter() {
    el.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c.dataset.filter === filter));
    el.querySelectorAll('.pcard').forEach(c => { c.hidden = !!filter && c.dataset.tools.split('|').indexOf(filter) < 0; });
  }

  function openCase(id, updateHash) {
    const m = el.querySelector('#' + CSS.escape(id));
    if (!m || !m.classList.contains('modal')) return;
    m.hidden = false; document.body.classList.add('noscroll');
    if (updateHash !== false) { try { history.replaceState(null, '', '#' + id); } catch (e) {} }
    const x = m.querySelector('.modal-x'); if (x) x.focus();
  }
  function closeCases() {
    let any = false;
    el.querySelectorAll('.modal').forEach(m => { if (!m.hidden) { m.hidden = true; any = true; } });
    if (any) { document.body.classList.remove('noscroll'); try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} }
    return any;
  }

  function draw(keepScroll) {
    const y = window.scrollY;
    const out = window.renderPortfolio(d, null, lang);
    for (const k in out.vars) document.documentElement.style.setProperty(k, out.vars[k]);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = out.title;
    el.innerHTML = out.html;
    applyFilter(); bindReveal();
    if (location.hash.indexOf('#p-') === 0) openCase(location.hash.slice(1), false);
    if (keepScroll) window.scrollTo(0, y);
  }

  function composeMessage() {
    const f = el.querySelector('#cform'); if (!f) return null;
    const name = (f.name.value || '').trim();
    const msg = (f.message.value || '').trim();
    if (!msg) { f.message.focus(); return null; }
    let text = '';
    if (intentSubject) text += '[' + intentSubject + ']\n';
    if (name) text += (lang === 'ar' ? 'الاسم: ' : 'Name: ') + name + '\n';
    text += msg;
    return text;
  }

  draw(false);

  el.addEventListener('click', e => {
    const t = e.target.closest('[data-lang],[data-filter],[data-zoom],[data-case],[data-close],[data-intent],[data-mail],[data-menu],[data-menu-close],.lightbox,.modal,.mmenu a');
    if (!t) return;
    if (t.matches('[data-lang]')) {
      lang = t.dataset.lang; try { localStorage.setItem('lang', lang); } catch (x) {}
      closeCases(); draw(true);
    } else if (t.matches('[data-menu]')) {
      const m = el.querySelector('.mmenu'); if (m) m.hidden = false;
    } else if (t.matches('[data-menu-close]') || t.matches('.mmenu a')) {
      const m = el.querySelector('.mmenu'); if (m) m.hidden = true;
    } else if (t.matches('[data-filter]')) {
      filter = t.dataset.filter; applyFilter();
    } else if (t.matches('[data-zoom]')) {
      const lb = el.querySelector('.lightbox');
      lb.querySelector('img').src = t.dataset.zoom; lb.hidden = false;
    } else if (t.matches('[data-case]')) {
      openCase(t.dataset.case);
    } else if (t.matches('[data-close]')) {
      closeCases();
    } else if (t.matches('.lightbox')) {
      t.hidden = true;
    } else if (t.matches('.modal')) {
      if (e.target === t) closeCases();
    } else if (t.matches('[data-intent]')) {
      intentSubject = t.dataset.intent;
      const f = el.querySelector('#cform');
      if (f) { f.scrollIntoView({ behavior: 'smooth', block: 'center' }); const m = f.querySelector('textarea'); if (m) setTimeout(() => m.focus(), 450); }
    } else if (t.matches('[data-mail]')) {
      const text = composeMessage(); if (!text) return;
      const email = (d.profile || {}).email || '';
      location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(intentSubject || (lang === 'ar' ? 'تواصل من البورتفوليو' : 'Portfolio contact')) + '&body=' + encodeURIComponent(text);
    }
  });

  el.addEventListener('submit', e => {
    const f = e.target.closest('#cform'); if (!f) return;
    e.preventDefault();
    const text = composeMessage(); if (!text) return;
    const wa = String((d.profile || {}).whatsapp || (d.profile || {}).phone || '').replace(/[^0-9]/g, '');
    if (wa) window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const lb = el.querySelector('.lightbox'); if (lb && !lb.hidden) { lb.hidden = true; return; }
      closeCases();
    }
  });

  window.addEventListener('hashchange', () => {
    if (location.hash.indexOf('#p-') === 0) openCase(location.hash.slice(1), false);
    else closeCases();
  });
})();

// Copy-address buttons: copy, or show the address selected for manual copy.
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-copy]');
  if (!b) return;
  e.preventDefault();
  var addr = b.getAttribute('data-copy') || '';
  var hint = b.parentElement.querySelector('[data-copyhint]');
  var ar = document.documentElement.lang === 'ar';
  function say(msg, manual) {
    if (!hint) return;
    hint.hidden = false; hint.textContent = msg;
    if (manual) {
      var sp = document.createElement('span'); sp.className = 'copyaddr'; sp.textContent = ' ' + addr; hint.appendChild(sp);
      var r = document.createRange(); r.selectNodeContents(sp); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    }
  }
  var ok = (ar ? 'تم نسخ العنوان' : 'Address copied') + ': ' + addr, manual = ar ? 'انسخه يدويًا:' : 'Copy manually:';
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(addr).then(function () { say(ok); }, function () { say(manual, true); });
  else say(manual, true);
});
