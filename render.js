(function (root) {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = u => /^(https?:\/\/|\.\/|\/)/.test(u || '') ? u : '';
  const fonts = { serif: 'Georgia,"Times New Roman",serif', mono: 'ui-monospace,Menlo,Consolas,monospace' };

  const L = {
    en: {
      workedAt:'Where I have worked', explore:'Explore the site', skDomain:'Domain', skSkills:'Skills', home:'Home', about:'About', skills:'Skills', projects:'Projects', services:'Services', certs:'Certificates', contact:'Contact',
      hello:"Hello, I'm", open:'Open to junior data analyst roles & freelance projects',
      h1a:'Turn Your Data Into', h1b:'Clear Decisions',
      viewWork:'View My Work', hireMe:'Hire Me', cv:'Download CV', brandRole:'DATA ANALYST', viewOnGh:'View on GitHub',
      statProjects:'data analysis projects', statCerts:'certificates', statCore:'core tools', statLearning:'currently learning',
      whoIAm:'Who I Am', journey:'My Professional Journey', journeySub:'Work, teaching, training and education in one timeline.',
      kind_work:'Work', kind_teaching:'Teaching', kind_training:'Training', kind_education:'Education', kind_course:'Course',
      skillsSub:'The toolkit behind my projects, grouped by area.',
      lvl_core:'Core strength', lvl_working:'Working knowledge', lvl_learning:'Still learning',
      projectsSub:'Real dashboard projects. Open a case study for the problem, the work and the results.',
      all:'All', caseStudy:'View Case Study', close:'Close', prob:'The problem', did:'What I did', res:'Results', toolsLabel:'Tools',
      servicesSub:'What I can do for your business data.', needHelp:'Need help with your business data?', getInTouch:'Get in touch',
      certsSub:'Certificates earned. Tap an image to enlarge it.',
      contactSub:'Two easy ways to start:', intentHire:'Looking to hire a Data Analyst?', intentHireSub:'Junior roles, internships and graduate programs.',
      intentClient:'Need help with your business data?', intentClientSub:'Dashboards, cleaning, analysis and reporting.',
      subjectHire:'Hiring inquiry', subjectClient:'Project inquiry',
      formTitle:'Send a message', formName:'Your name', formMsg:'Your message', formSend:'Send via WhatsApp', formAlt:'or send an email',
      zoom:'Open image', dashof:'Dashboard: ', foot:'Data Analyst Portfolio', backTop:'Back to top', lang:'العربية', menu:'Menu', closeMenu:'Close menu',
      chEmail:'Email', chCopy:'Copy address', waPreset:'Hello Mohamed, I saw your portfolio and would like to talk.', mailSubject:'Portfolio contact', chCopied:'Address copied', chManual:'Copy manually:', chLinkedin:'LinkedIn', chWhatsapp:'WhatsApp'
    },
    ar: {
      workedAt:'أماكن عملت بها', explore:'استكشف الموقع', skDomain:'المجال', skSkills:'المهارات', home:'الرئيسية', about:'من أنا؟', skills:'المهارات', projects:'المشاريع', services:'الخدمات', certs:'الشهادات', contact:'التواصل',
      hello:'أهلًا، أنا', open:'متاح لوظائف تحليل البيانات ومشاريع الفريلانس',
      h1a:'حوّل بياناتك إلى', h1b:'قرارات واضحة',
      viewWork:'شاهد أعمالي', hireMe:'وظّفني', cv:'تحميل السيرة الذاتية', brandRole:'محلل بيانات', viewOnGh:'عرض على GitHub',
      statProjects:'مشاريع تحليل بيانات', statCerts:'شهادات', statCore:'الأدوات الأساسية', statLearning:'أتعلمها حاليًا',
      whoIAm:'من أنا', journey:'رحلتي المهنية', journeySub:'العمل والتدريس والتدريب والتعليم في خط زمني واحد.',
      kind_work:'عمل', kind_teaching:'تدريس', kind_training:'تدريب', kind_education:'تعليم', kind_course:'كورس',
      skillsSub:'الأدوات التي أستخدمها في مشاريعي، مجمّعة حسب المجال.',
      lvl_core:'نقطة قوة', lvl_working:'معرفة عملية', lvl_learning:'أتعلمه حاليًا',
      projectsSub:'مشاريع داشبورد حقيقية. افتح دراسة الحالة لتشوف المشكلة والشغل والنتائج.',
      all:'الكل', caseStudy:'عرض دراسة الحالة', close:'إغلاق', prob:'المشكلة', did:'اللي عملته', res:'النتائج', toolsLabel:'الأدوات',
      servicesSub:'اللي أقدر أقدمه لبيانات عملك.', needHelp:'محتاج مساعدة في بيانات عملك؟', getInTouch:'تواصل معايا',
      certsSub:'الشهادات التي حصلت عليها. اضغط على الصورة لتكبيرها.',
      contactSub:'أسهل طريقتين للبداية:', intentHire:'بتدور على محلل بيانات؟', intentHireSub:'وظائف مبتدئ وتدريب وبرامج خريجين.',
      intentClient:'محتاج مساعدة في بيانات عملك؟', intentClientSub:'داشبوردات وتنظيف وتحليل وتقارير.',
      subjectHire:'استفسار توظيف', subjectClient:'استفسار مشروع',
      formTitle:'أرسل رسالة', formName:'اسمك', formMsg:'رسالتك', formSend:'إرسال عبر واتساب', formAlt:'أو أرسل بريدًا إلكترونيًا',
      zoom:'تكبير الصورة', dashof:'داشبورد: ', foot:'بورتفوليو تحليل البيانات', backTop:'العودة للأعلى', lang:'English', menu:'القائمة', closeMenu:'إغلاق القائمة',
      chEmail:'البريد', chCopy:'نسخ العنوان', waPreset:'مرحبًا محمد، شفت البورتفوليو بتاعك وحابب أتواصل معاك.', mailSubject:'تواصل من البورتفوليو', chCopied:'تم نسخ العنوان', chManual:'انسخه يدويًا:', chLinkedin:'لينكدإن', chWhatsapp:'واتساب'
    }
  };

  const ICONS = {
    t_home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg>',
    t_about: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>',
    t_skills: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 6l4 4L8 20H4v-4z"/><path d="M13 7l4 4"/></svg>',
    t_projects: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    t_services: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>',
    t_contact: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    t_certs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 21l5-3 5 3-1.5-7"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg>',
    dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3" width="8" height="10" rx="1.5"/><rect x="13" y="3" width="8" height="6" rx="1.5"/><rect x="13" y="11" width="8" height="10" rx="1.5"/><rect x="3" y="15" width="8" height="6" rx="1.5"/></svg>',
    clean: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>',
    report: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l2-5.4A8.5 8.5 0 1 1 21 11.5z"/><path d="M9 9.5c.5 2.5 3 5 5.5 5.5l1-1.5-2-1.5-1 .5c-.8-.5-1.5-1.2-2-2l.5-1-1.5-2z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5m0 2a2.5 2.5 0 0 1 5 0v3"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>'
  };
  const ic = (n, cls) => `<span class="icn ${cls || ''}" aria-hidden="true">${ICONS[n] || ''}</span>`;

  root.PORTFOLIO_LABELS = L;
  root.renderPortfolio = function (d, resolveImage, lang) {
    lang = lang === 'ar' ? 'ar' : 'en';
    const tr = (o, k) => (lang === 'ar' && o && o[k + '_ar']) ? o[k + '_ar'] : (o ? o[k] : '');
    const trs = (o, k) => (lang === 'ar' && o && o[k + '_ar'] && o[k + '_ar'].length) ? o[k + '_ar'] : (o ? o[k] : []);
    const t = d.theme || {}, p = d.profile || {};
    const lbl = k => esc(L[lang][k] || L.en[k] || k);
    const pn = tr(p, 'name'), pt = tr(p, 'title');
    const firstName = esc(pn.split(' ').slice(0, 2).join(' '));
    const vars = {};
    if (t.accent) vars['--accent'] = t.accent;
    if (t.background) vars['--bg'] = t.background;
    if (t.text) vars['--text'] = t.text;
    if (t.card) vars['--card'] = t.card;
    if (fonts[t.font]) vars['--font'] = fonts[t.font];
    const img = resolveImage || (x => x);

    const projects = (d.projects || []).filter(x => x.visible !== false);
    const toolsOf = x => String(x.tools || '').split(',').map(s => s.trim()).filter(Boolean);
    const allTools = []; projects.forEach(x => toolsOf(x).forEach(s => { if (allTools.indexOf(s) < 0) allTools.push(s); }));
    const filterTools = ['Microsoft Excel', 'Power BI'].filter(f => projects.some(x => toolsOf(x).indexOf(f) >= 0));
    const certs = d.certificates || [];
    const wa = String(p.whatsapp || p.phone || '').replace(/[^0-9]/g, '');

    const lst = a => (a && a.length) ? '<ul>' + a.map(s => `<li>${esc(typeof s === 'string' ? s : s.step || s.item || s)}</li>`).join('') + '</ul>' : '';
    const slugOf = (x, i) => x.slug || ('project-' + (i + 1));

    /* ---------- header / hero ---------- */
    const navLinks = [['#top','home'],['#about','about'],['#skills','skills'],['#projects','projects'],['#services','services'],['#certificates','certs'],['#contact','contact']]
      .map(([h, k]) => `<a href="${h}">${lbl(k)}</a>`).join('');

    const stats = `<div class="stats">
      <div class="stat"><b>${projects.length}</b><span>${lbl('statProjects')}</span></div>
      <div class="stat"><b>${certs.length}</b><span>${lbl('statCerts')}</span></div>
      <div class="stat grow"><b><bdi dir="ltr">Microsoft Excel · Power BI</bdi></b><span>${lbl('statCore')}</span></div>
      <div class="stat"><b><bdi dir="ltr">SQL · Python</bdi></b><span>${lbl('statLearning')}</span></div>
    </div>`;

    const photoSrc = p.photo ? img(p.photo) : '';
    const idcard = `<aside class="idcard reveal">
      ${photoSrc ? `<div class="idphoto"><img src="${esc(photoSrc)}" alt="${esc(pn)}" loading="eager"></div>` : ''}
      <div class="idbody">
        <h2>${esc(pn)}</h2>
        <p class="idrole">${esc(pt)}</p>
        <p class="idloc">${ic('pin')}${esc(tr(p, 'location'))}</p>
      </div>
    </aside>`;

    const tileDefs = [['#about','about','t_about'],['#skills','skills','t_skills'],['#services','services','t_services'],['#projects','projects','t_projects'],['#contact','contact','t_contact'],['#certificates','certs','t_certs']];
    const other = lang === 'ar' ? 'en' : 'ar';
    const tile = (h, k, i, cls) => `<a class="tile ${cls || ''}" href="${h}">${ic(i)}<b>${lbl(k)}</b><small>${esc(L[other][k])}</small></a>`;
    const tilesSec = `<section class="tiles reveal" id="structure" aria-label="${lbl('explore')}">
      ${tile('#top', 'home', 't_home', 'tile-home')}
      <div class="tgrid">${tileDefs.map(t => tile(t[0], t[1], t[2])).join('')}</div>
    </section>`;

    const hero = `<header class="hero" id="top">
      <div class="hero-in reveal">
        <p class="badge"><i></i>${lbl('open')}</p>
        <p class="hello">${lbl('hello')} ${firstName}</p>
        <h1>${lbl('h1a')} <em>${lbl('h1b')}</em></h1>
        <p class="role">${esc(pt)}</p>
        <p class="lead">${esc(tr(p, 'summary'))}</p>
        <div class="cta">
          <a class="btn primary" href="#projects">${lbl('viewWork')} ${ic('arrow')}</a>
          <a class="btn ghost" href="#contact" data-intent="${lbl('subjectHire')}">${lbl('hireMe')}</a>
          ${safeUrl(p.cv) ? `<a class="btn ghost" href="${esc(p.cv)}" target="_blank" rel="noopener">${lbl('cv')} ${ic('download')}</a>` : ''}
          ${safeUrl(p.github) ? `<a class="btn ghost" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub ${ic('github')}</a>` : ''}
        </div>
        <div class="hchannels">
          ${p.email ? `<a class="chan" href="mailto:${esc(p.email)}?subject=${encodeURIComponent(lbl('mailSubject'))}">${ic('mail')}<span>${esc(p.email)}</span></a><button type="button" class="chan copybtn" data-copy="${esc(p.email)}">${lbl('chCopy')}</button>` : ''}
          ${safeUrl(p.linkedin) ? `<a class="chan" href="${esc(p.linkedin)}" target="_blank" rel="noopener">${ic('linkedin')}<span>${lbl('chLinkedin')}</span></a>` : ''}
          ${wa ? `<a class="chan" href="https://wa.me/${esc(wa)}?text=${encodeURIComponent(lbl('waPreset'))}" target="_blank" rel="noopener">${ic('whatsapp')}<span>${lbl('chWhatsapp')}</span></a>` : ''}
          ${safeUrl(p.github) ? `<a class="chan" href="${esc(p.github)}" target="_blank" rel="noopener">${ic('github')}<span>GitHub</span></a>` : ''}
          <p class="copyhint" data-copyhint aria-live="polite" hidden></p>
        </div>
        ${stats}
      </div>
      ${idcard}
    </header>`;

    /* ---------- about ---------- */
    const about = d.about || {};
    const journeyItems = (d.experience || []).concat(d.courses || []);
    const journey = journeyItems.map(e => `<div class="titem">
        <span class="tdot"></span>
        <div class="tcard">
          <span class="kind k-${esc(e.kind || 'work')}">${lbl('kind_' + (e.kind || 'work'))}</span>
          <strong>${esc(tr(e, 'role'))}</strong>
          ${tr(e, 'period') ? `<span class="tperiod">${esc(tr(e, 'period'))}</span>` : ''}
          <span class="tdetail">${esc(tr(e, 'detail'))}</span>
        </div>
      </div>`).join('');
    const employers = [['Vodafone Egypt','فودافون مصر'],['Al Waleed Real Estate','الوليد للعقارات']];
    const worked = `<div class="worked reveal"><h3>${lbl('workedAt')}</h3><div class="wrow">${employers.map(x => `<span>${esc(lang === 'ar' ? x[1] : x[0])}</span>`).join('')}</div></div>`;
    const aboutSec = `<section class="section" id="about">
      <div class="sh reveal"><p class="kicker">01</p><h2>${lbl('about')}</h2><p class="sub">${lbl('journeySub')}</p></div>
      <div class="about-grid">
        <div class="bio reveal">
          <h3>${lbl('whoIAm')}</h3>
          <ul class="biolist">${trs(about, 'points').map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          <div class="pills tagrow">${allTools.map(s => `<span>${esc(s)}</span>`).join('')}</div>
        </div>
        <div class="journey reveal">
          ${worked}
          <h3>${lbl('journey')}</h3>
          <div class="timeline">${journey}</div>
        </div>
      </div>
    </section>`;

    /* ---------- skills ---------- */
    const skillRows = (d.skills || []).map(g => `<tr class="reveal">
        <th scope="row">${esc(tr(g, 'group'))}</th>
        <td>${(g.items || []).map(it => `<span class="sk"><strong>${esc(tr(it, 'name'))}</strong><span class="lvl lv-${esc(it.level || 'working')}">${lbl('lvl_' + (it.level || 'working'))}</span>${tr(it, 'detail') ? `<em>${esc(tr(it, 'detail'))}</em>` : ''}</span>`).join('')}</td>
      </tr>`).join('');
    const skillsSec = `<section class="section" id="skills">
      <div class="sh reveal"><p class="kicker">02</p><h2>${lbl('skills')}</h2><p class="sub">${lbl('skillsSub')}</p></div>
      <table class="stable"><thead><tr><th>${lbl('skDomain')}</th><th>${lbl('skSkills')}</th></tr></thead><tbody>${skillRows}</tbody></table>
    </section>`;

    /* ---------- projects ---------- */
    const num = i => String(i + 1).padStart(2, '0');
    const cards = projects.map((x, i) => {
      const src = x.image ? img(x.image) : '';
      const tl = toolsOf(x);
      const slug = slugOf(x, i);
      const teaser = (trs(x, 'problem') || [])[0] || (trs(x, 'steps') || [])[0] || '';
      return `<article class="pcard reveal" data-tools="${esc(tl.join('|'))}">
        ${src ? `<button class="shot" type="button" data-zoom="${esc(src)}" aria-label="${lbl('zoom')}"><img src="${esc(src)}" alt="${lbl('dashof')}${esc(tr(x, 'title'))}" loading="lazy"></button>` : '<div class="shot empty"></div>'}
        <div class="pbody">
          <p class="kicker"><bdi dir="ltr">${num(i)}</bdi></p>
          <h3>${esc(tr(x, 'title'))}</h3>
          <div class="pills">${tl.map(s => `<span>${esc(s)}</span>`).join('')}</div>
          ${teaser ? `<p class="teaser">${esc(teaser)}</p>` : ''}
          <div class="pactions">
            <button class="btn casebtn" type="button" data-case="p-${esc(slug)}">${lbl('caseStudy')} ${ic('arrow')}</button>
            ${safeUrl(x.link) ? `<a class="ghlink" href="${esc(x.link)}" target="_blank" rel="noopener">${ic('github')}${lbl('viewOnGh')}</a>` : ''}
          </div>
        </div>
      </article>`;
    }).join('');

    const modals = projects.map((x, i) => {
      const src = x.image ? img(x.image) : '';
      const tl = toolsOf(x);
      const slug = slugOf(x, i);
      return `<div class="modal" id="p-${esc(slug)}" hidden role="dialog" aria-modal="true" aria-label="${esc(tr(x, 'title'))}">
        <div class="modal-card">
          <button class="modal-x" type="button" data-close aria-label="${lbl('close')}">&times;</button>
          <p class="kicker"><bdi dir="ltr">${num(i)} / ${esc(tl[0] || '')}</bdi></p>
          <h3>${esc(tr(x, 'title'))}</h3>
          <div class="pills">${tl.map(s => `<span>${esc(s)}</span>`).join('')}</div>
          ${src ? `<button class="shot mshot" type="button" data-zoom="${esc(src)}" aria-label="${lbl('zoom')}"><img src="${esc(src)}" alt="${lbl('dashof')}${esc(tr(x, 'title'))}" loading="lazy"></button>` : ''}
          ${lst(trs(x, 'problem')) ? `<div class="blk"><p class="dl">${lbl('prob')}</p>${lst(trs(x, 'problem'))}</div>` : ''}
          <div class="blk"><p class="dl">${lbl('did')}</p>${lst(trs(x, 'steps'))}</div>
          ${lst(trs(x, 'results')) ? `<div class="blk res"><p class="dl">${lbl('res')}</p>${lst(trs(x, 'results'))}</div>` : ''}
          ${safeUrl(x.link) ? `<p><a class="ghlink" href="${esc(x.link)}" target="_blank" rel="noopener">${ic('github')}${lbl('viewOnGh')}</a></p>` : ''}
        </div>
      </div>`;
    }).join('');

    const projectsSec = `<section class="section" id="projects">
      <div class="sh reveal"><p class="kicker">03</p><h2>${lbl('projects')}</h2><p class="sub">${lbl('projectsSub')}</p></div>
      <div class="chips reveal"><button type="button" class="chip on" data-filter="">${lbl('all')}</button>${filterTools.map(f => `<button type="button" class="chip" data-filter="${esc(f)}">${esc(f)}</button>`).join('')}</div>
      <div class="pgrid">${cards}</div>
    </section>`;

    /* ---------- services ---------- */
    const svcCards = (d.services || []).map(s => `<div class="svc reveal">
        ${ic(s.icon || 'chart', 'svc-ic')}
        <h3>${esc(tr(s, 'title'))}</h3>
        <p>${esc(tr(s, 'desc'))}</p>
      </div>`).join('');
    const servicesSec = `<section class="section" id="services">
      <div class="sh reveal"><p class="kicker">04</p><h2>${lbl('services')}</h2><p class="sub">${lbl('servicesSub')}</p></div>
      <div class="svcgrid">${svcCards}</div>
      <div class="svc-cta reveal"><p>${lbl('needHelp')}</p><a class="btn primary" href="#contact">${lbl('getInTouch')} ${ic('arrow')}</a></div>
    </section>`;

    /* ---------- certificates ---------- */
    const certCards = certs.map(c => {
      const src = c.image ? img(c.image) : '';
      return `<article class="ccard reveal">
        ${src ? `<button class="cshot" type="button" data-zoom="${esc(src)}" aria-label="${lbl('zoom')}"><img src="${esc(src)}" alt="${esc(tr(c, 'title'))}" loading="lazy"></button>` : ''}
        <h3>${esc(tr(c, 'title'))}</h3>
        <p class="iss">${esc(tr(c, 'issuer'))}</p>
        <p>${esc(tr(c, 'detail'))}</p>
      </article>`;
    }).join('');
    const certsSec = `<section class="section" id="certificates">
      <div class="sh reveal"><p class="kicker">05</p><h2>${lbl('certs')}</h2><p class="sub">${lbl('certsSub')}</p></div>
      <div class="cgrid">${certCards}</div>
    </section>`;

    /* ---------- contact ---------- */
    const hasContact = p.show_contact && (p.email || wa || safeUrl(p.linkedin) || safeUrl(p.github));
    const channels = hasContact ? `<div class="channels">
      ${p.email ? `<a class="chan" href="mailto:${esc(p.email)}?subject=${encodeURIComponent(lbl('mailSubject'))}">${ic('mail')}<span>${esc(p.email)}</span></a><button type="button" class="chan copybtn" data-copy="${esc(p.email)}">${lbl('chCopy')}</button>` : ''}
      ${safeUrl(p.linkedin) ? `<a class="chan" href="${esc(p.linkedin)}" target="_blank" rel="noopener">${ic('linkedin')}<span>LinkedIn</span></a>` : ''}
      ${wa ? `<a class="chan" href="https://wa.me/${esc(wa)}?text=${encodeURIComponent(lbl('waPreset'))}" target="_blank" rel="noopener">${ic('whatsapp')}<span>WhatsApp</span></a>` : ''}
      ${safeUrl(p.github) ? `<a class="chan" href="${esc(p.github)}" target="_blank" rel="noopener">${ic('github')}<span>GitHub</span></a>` : ''}
      <p class="copyhint" data-copyhint aria-live="polite" hidden></p>
    </div>` : '';
    const contactSec = hasContact ? `<section class="section" id="contact">
      <div class="sh reveal"><p class="kicker">06</p><h2>${lbl('contact')}</h2><p class="sub">${lbl('contactSub')}</p></div>
      <div class="intents reveal">
        <button class="intent" type="button" data-intent="${lbl('subjectHire')}"><strong>${lbl('intentHire')}</strong><span>${lbl('intentHireSub')}</span>${ic('arrow')}</button>
        <button class="intent" type="button" data-intent="${lbl('subjectClient')}"><strong>${lbl('intentClient')}</strong><span>${lbl('intentClientSub')}</span>${ic('arrow')}</button>
      </div>
      ${channels}
      <form class="cform reveal" id="cform">
        <h3>${lbl('formTitle')}</h3>
        <input type="text" name="name" placeholder="${lbl('formName')}" autocomplete="name">
        <textarea name="message" rows="4" placeholder="${lbl('formMsg')}" required></textarea>
        <div class="formrow">
          ${wa ? `<button class="btn primary" type="submit">${lbl('formSend')} ${ic('whatsapp')}</button>` : ''}
          ${p.email ? `<button class="btn ghost" type="button" data-mail>${lbl('formAlt')} ${ic('mail')}</button>` : ''}
        </div>
      </form>
    </section>` : '';

    /* ---------- footer / chrome ---------- */
    const foot = `<footer class="foot">
      <span>${esc(pn)} · ${lbl('foot')}</span>
      <span class="footr">
        ${safeUrl(p.github) ? `<a class="textlink" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub</a>` : ''}
        <a class="textlink" href="#top">${lbl('backTop')}</a>
        <button type="button" class="langbtn" data-lang="${lang === 'ar' ? 'en' : 'ar'}">${lbl('lang')}</button>
      </span>
    </footer>`;

    const dock = `<nav class="dock">
      <a href="#top">${lbl('home')}</a><a href="#projects">${lbl('projects')}</a><a href="#services">${lbl('services')}</a><a href="#contact">${lbl('contact')}</a><button type="button" data-menu>${lbl('menu')}</button>
    </nav>`;

    const mmenu = `<div class="mmenu" hidden>
        <button class="mmenu-x" type="button" data-menu-close aria-label="${lbl('closeMenu')}">&times;</button>
        <div class="mmenu-links">${navLinks}</div>
      </div>`;

    const html = `<nav class="nav">
        <a class="brand" href="#top"><b>${firstName}</b><span>${lbl('brandRole')}</span></a>
        <div class="links">${navLinks}</div>
        <div class="navside">
          ${safeUrl(p.cv) ? `<a class="navcv" href="${esc(p.cv)}" target="_blank" rel="noopener">${lbl('cv')}</a>` : ''}
          <button type="button" class="langbtn" data-lang="${lang === 'ar' ? 'en' : 'ar'}">${lbl('lang')}</button>
          <button type="button" class="menubtn" data-menu>${lbl('menu')}</button>
        </div>
      </nav>
      <nav class="navchips" aria-label="sections">${navLinks}</nav>
      ${hero}${tilesSec}${aboutSec}${skillsSec}${projectsSec}${servicesSec}${certsSec}${contactSec}${foot}${dock}${mmenu}${modals}
      <div class="lightbox" hidden><img alt=""></div>`;

    return { vars, lang, html, title: (pn || 'Portfolio') + (pt ? ' · ' + pt : '') };
  };
})(window);
