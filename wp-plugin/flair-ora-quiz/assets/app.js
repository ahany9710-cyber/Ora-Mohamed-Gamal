(function () {
  'use strict';

  var root = document.getElementById('foq-app');
  if (!root) return;

  var cfg = Object.assign(
    { assetsUrl: './assets/', whatsapp: '', phone: '', formspree: '', conversion: '' },
    window.FOQ_CONFIG || {}
  );
  var projects = window.FOQ_PROJECTS || [];
  var imagesUrl = cfg.assetsUrl.replace(/\/?$/, '/') + 'images/';

  var state = { step: 1, lang: null, projectId: null, submitting: false, done: false, waUrl: '', error: '' };

  var T = {
    ar: {
      back: 'رجوع',
      pickTitle: 'اختار المشروع اللي يهمك',
      pickSub: '5 مشروعات من Ora — دوسة واحدة وتوصل للتفاصيل',
      priceOnRequest: 'الأسعار على واتساب',
      startsFrom: 'تبدأ من',
      million: 'مليون ج.م',
      lastStep: 'خطوة أخيرة',
      formTitle: function (name) {
        return 'سيب رقمك وفريق مبيعات Ora المعتمد هيبعتلك بروشور وأسعار <strong>' + name + '</strong> على واتساب';
      },
      phoneLabel: 'رقم موبايلك (واتساب)',
      phonePlaceholder: '01X XXXX XXXX',
      cta: 'ابعتلي البروشور والأسعار على واتساب',
      call: 'أو كلّم سيلز Ora مباشرة',
      trust: ['رد خلال دقائق', 'بدون أي التزام', 'بروشور وأسعار محدّثة'],
      errEmpty: 'اكتب رقم موبايلك',
      errInvalid: 'الرقم مش صحيح — اكتبه كده: 01XXXXXXXXX',
      sending: 'جاري الإرسال...',
      doneTitle: 'تمام! بنحوّلك لواتساب دلوقتي',
      doneSub: 'لو واتساب ما فتحش لوحده، دوس على الزرار',
      openWa: 'افتح واتساب',
      location: 'الموقع',
      units: 'الوحدات',
      price: 'الأسعار',
      priceRange: function (from, to) {
        return 'من ' + from + ' إلى ' + to + ' مليون ج.م';
      },
      changeProject: 'غيّر المشروع',
      disclaimer:
        'هذه الصفحة تديرها <strong>Flair Agency</strong> — جهة تسويق عقاري مستقلة وليست المطوّر، وتعمل بموجب اتفاقية حق تسويق لمشروعات Ora. الأسعار والتوفر قابلة للتغيير.',
      waMessage: function (name, phone) {
        return 'مرحبًا، أنا مهتم بمشروع ' + name + ' من Ora.\nرقمي: ' + phone + '\nمن فضلك ابعتلي البروشور والأسعار.';
      },
      barCall: 'اتصل بنا',
      barWa: 'واتساب',
      barWaMessage: function (name) {
        return name
          ? 'مرحبًا، أنا مهتم بمشروع ' + name + ' من Ora. من فضلك ابعتلي البروشور والأسعار.'
          : 'مرحبًا، أنا مهتم بمشروعات Ora. من فضلك ابعتلي التفاصيل والأسعار.';
      },
    },
    en: {
      back: 'Back',
      pickTitle: 'Pick the project you love',
      pickSub: '5 Ora destinations — one tap to the details',
      priceOnRequest: 'Prices on WhatsApp',
      startsFrom: 'From EGP',
      million: 'M',
      lastStep: 'Last step',
      formTitle: function (name) {
        return 'Leave your number and Ora\'s authorized sales team will send you the <strong>' + name + '</strong> brochure & prices on WhatsApp';
      },
      phoneLabel: 'Your mobile number (WhatsApp)',
      phonePlaceholder: '01X XXXX XXXX',
      cta: 'Send me the brochure & prices on WhatsApp',
      call: 'Or call Ora sales directly',
      trust: ['Reply within minutes', 'No commitment', 'Latest brochure & prices'],
      errEmpty: 'Please enter your mobile number',
      errInvalid: 'Invalid number — use this format: 01XXXXXXXXX',
      sending: 'Sending...',
      doneTitle: 'Done! Taking you to WhatsApp',
      doneSub: 'If WhatsApp doesn\'t open automatically, tap the button',
      openWa: 'Open WhatsApp',
      location: 'Location',
      units: 'Unit types',
      price: 'Prices',
      priceRange: function (from, to) {
        return 'EGP ' + from + 'M – ' + to + 'M';
      },
      changeProject: 'Change project',
      disclaimer:
        'This page is operated by <strong>Flair Agency</strong>, an independent real estate marketing agency — not the developer — under a marketing rights agreement for Ora projects. Prices and availability are subject to change.',
      waMessage: function (name, phone) {
        return 'Hi, I\'m interested in ' + name + ' by Ora.\nMy number: ' + phone + '\nPlease send me the brochure and prices.';
      },
      barCall: 'Call us',
      barWa: 'WhatsApp',
      barWaMessage: function (name) {
        return name
          ? 'Hi, I\'m interested in ' + name + ' by Ora. Please send me the brochure and prices.'
          : 'Hi, I\'m interested in Ora projects. Please send me the details and prices.';
      },
    },
  };

  var ICONS = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z"/></svg>',
  };

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function t() {
    return T[state.lang || 'ar'];
  }

  function getProject(id) {
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].id === id) return projects[i];
    }
    return null;
  }

  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    if (typeof window.clarity === 'function') window.clarity('event', name);
  }

  // ——— Phone parsing (accepts Arabic-Indic digits, spaces, +20 / 0020 prefixes) ———
  function normalizeDigits(value) {
    return value
      .replace(/[\u0660-\u0669]/g, function (d) { return String(d.charCodeAt(0) - 0x0660); })
      .replace(/[\u06F0-\u06F9]/g, function (d) { return String(d.charCodeAt(0) - 0x06f0); });
  }

  function parsePhone(raw) {
    var s = normalizeDigits(raw || '').replace(/[\s\-().]/g, '');
    if (s.indexOf('00') === 0) s = '+' + s.slice(2);
    if (/^01[0125]\d{8}$/.test(s)) return '+20' + s.slice(1);
    if (/^\+?201[0125]\d{8}$/.test(s)) return '+' + s.replace(/^\+/, '');
    if (/^\+(?!20)\d{8,15}$/.test(s)) return s;
    return null;
  }

  // ——— Rendering ———
  function renderTopbar() {
    var dots = '';
    for (var i = 1; i <= 3; i++) {
      var cls = i === state.step ? ' is-active' : i < state.step ? ' is-done' : '';
      dots += '<span class="foq-progress-dot' + cls + '"></span>';
    }
    return (
      '<div class="foq-topbar">' +
      '<img class="foq-ora-logo" src="' + imagesUrl + 'ora-logo.png" alt="Ora Developers" />' +
      '<div class="foq-progress" aria-label="' + state.step + ' / 3">' + dots + '</div>' +
      '<button type="button" class="foq-back" data-action="back"' + (state.step === 1 ? ' hidden' : '') + '>' +
      ICONS.back + '<span>' + esc(t().back) + '</span></button>' +
      '</div>'
    );
  }

  function renderHook() {
    return (
      '<div class="foq-hook">' +
      '<span class="foq-eyebrow">Ora Developers</span>' +
      '<h1 class="foq-hook-line" dir="rtl">عنوانك الجاي مع Ora — في 3 خطوات بس</h1>' +
      '<p class="foq-hook-line is-en" dir="ltr">Your next Ora address — in just 3 taps</p>' +
      '<p class="foq-hook-sub">اختار لغتك · Choose your language</p>' +
      '<div class="foq-lang-grid">' +
      '<button type="button" class="foq-lang-btn" data-action="lang" data-lang="ar" dir="rtl">' +
      '<span class="foq-lang-name">العربية</span><span class="foq-lang-hint">يلا نبدأ</span></button>' +
      '<button type="button" class="foq-lang-btn" data-action="lang" data-lang="en" dir="ltr">' +
      '<span class="foq-lang-name">English</span><span class="foq-lang-hint">Let\'s start</span></button>' +
      '</div></div>'
    );
  }

  function priceChip(p) {
    if (p.priceFrom == null) return '<span class="foq-chip">' + esc(t().priceOnRequest) + '</span>';
    var label = state.lang === 'en'
      ? t().startsFrom + ' ' + p.priceFrom + t().million
      : t().startsFrom + ' ' + p.priceFrom + ' ' + t().million;
    return '<span class="foq-chip is-price">' + esc(label) + '</span>';
  }

  function renderProjects() {
    var cards = projects.map(function (p) {
      var c = p[state.lang];
      return (
        '<button type="button" class="foq-project" data-action="project" data-id="' + esc(p.id) + '">' +
        '<img class="foq-project-bg" src="' + imagesUrl + esc(p.image) + '" alt="" loading="lazy" />' +
        (p.logo ? '<img class="foq-project-logo' + (p.logoColor ? ' is-color' : '') + '" src="' + imagesUrl + esc(p.logo) + '" alt="" />' : '') +
        (p.badge ? '<span class="foq-badge">' + esc(p.badge[state.lang]) + '</span>' : '') +
        '<span class="foq-project-name">' + esc(c.name) + '</span>' +
        '<span class="foq-project-meta">' +
        '<span class="foq-chip">' + ICONS.pin + esc(c.location) + '</span>' +
        priceChip(p) +
        '</span>' +
        '<span class="foq-project-go" aria-hidden="true">' + ICONS.arrow + '</span>' +
        '</button>'
      );
    }).join('');

    return (
      '<div>' +
      '<h2 class="foq-title">' + esc(t().pickTitle) + '</h2>' +
      '<p class="foq-sub">' + esc(t().pickSub) + '</p>' +
      '<div class="foq-projects">' + cards + '</div>' +
      '</div>'
    );
  }

  function renderFormCard(p) {
    var c = p[state.lang];
    var L = t();

    if (state.done) {
      return (
        '<div class="foq-card foq-form-card"><div class="foq-done" role="status">' +
        '<div class="foq-done-icon">' + ICONS.check + '</div>' +
        '<p class="foq-done-title">' + esc(L.doneTitle) + '</p>' +
        '<p class="foq-done-sub">' + esc(L.doneSub) + '</p>' +
        '<a class="foq-cta" href="' + esc(state.waUrl) + '" target="_blank" rel="noopener">' + ICONS.whatsapp + '<span>' + esc(L.openWa) + '</span></a>' +
        '</div></div>'
      );
    }

    var trust = L.trust.map(function (item) {
      return '<span>' + ICONS.check + esc(item) + '</span>';
    }).join('');

    return (
      '<form class="foq-card foq-form-card" novalidate data-form="lead">' +
      '<span class="foq-step-label">' + esc(L.lastStep) + '</span>' +
      '<h2 class="foq-form-title">' + L.formTitle(esc(c.name)) + '</h2>' +
      '<div class="foq-field">' +
      '<label class="foq-label" for="foq-phone">' + esc(L.phoneLabel) + '</label>' +
      '<input class="foq-input' + (state.error ? ' has-error' : '') + '" id="foq-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" placeholder="' + esc(L.phonePlaceholder) + '" aria-describedby="foq-phone-error" />' +
      '<p class="foq-error" id="foq-phone-error" role="alert">' + esc(state.error) + '</p>' +
      '</div>' +
      '<button type="submit" class="foq-cta"' + (state.submitting ? ' disabled' : '') + '>' +
      (state.submitting ? '<span class="foq-spinner"></span><span>' + esc(L.sending) + '</span>' : ICONS.whatsapp + '<span>' + esc(L.cta) + '</span>') +
      '</button>' +
      '<a class="foq-call" href="tel:' + esc(cfg.phone) + '" data-action="call">' + ICONS.phone + '<span>' + esc(L.call) + '</span></a>' +
      '<div class="foq-trust">' + trust + '</div>' +
      '</form>'
    );
  }

  function renderInfoCard(p) {
    var c = p[state.lang];
    var L = t();
    var price = p.priceFrom == null ? L.priceOnRequest : L.priceRange(p.priceFrom, p.priceTo);

    return (
      '<article class="foq-card">' +
      '<div class="foq-info-media">' +
      '<img class="foq-info-img" src="' + imagesUrl + esc(p.image) + '" alt="' + esc(c.name) + '" />' +
      (p.logo ? '<img class="foq-info-logo' + (p.logoColor ? ' is-color' : '') + '" src="' + imagesUrl + esc(p.logo) + '" alt="" />' : '') +
      '</div>' +
      '<div class="foq-info-body">' +
      '<h3 class="foq-info-name">' + esc(c.name) + '</h3>' +
      '<p class="foq-info-desc">' + esc(c.description) + '</p>' +
      '<div class="foq-info-rows">' +
      '<div class="foq-info-row">' + ICONS.pin + '<span><span class="foq-info-row-label">' + esc(L.location) + '</span><span class="foq-info-row-value">' + esc(c.location) + '</span></span></div>' +
      '<div class="foq-info-row">' + ICONS.home + '<span><span class="foq-info-row-label">' + esc(L.units) + '</span><span class="foq-info-row-value">' + esc(c.units) + '</span></span></div>' +
      '<div class="foq-info-row is-price">' + ICONS.tag + '<span><span class="foq-info-row-label">' + esc(L.price) + '</span><span class="foq-info-row-value">' + esc(price) + '</span></span></div>' +
      '</div>' +
      '<button type="button" class="foq-change" data-action="back">' + esc(L.changeProject) + '</button>' +
      '</div>' +
      '</article>'
    );
  }

  function renderFinal() {
    var p = getProject(state.projectId);
    if (!p) return renderProjects();
    return '<div class="foq-final">' + renderFormCard(p) + renderInfoCard(p) + '</div>';
  }

  function renderContactBar() {
    var L = t();
    var p = state.step === 3 ? getProject(state.projectId) : null;
    var waHref = 'https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(L.barWaMessage(p ? p[state.lang || 'ar'].name : ''));
    return (
      '<div class="foq-contact-bar">' +
      '<a class="foq-contact-btn is-call" href="tel:' + esc(cfg.phone) + '" data-action="call">' + ICONS.phone + '<span>' + esc(L.barCall) + '</span></a>' +
      '<a class="foq-contact-btn is-wa" href="' + esc(waHref) + '" target="_blank" rel="noopener" data-action="whatsapp">' + ICONS.whatsapp + '<span>' + esc(L.barWa) + '</span></a>' +
      '</div>'
    );
  }

  function renderStep() {
    if (state.step === 1) return renderHook();
    if (state.step === 2) return renderProjects();
    return renderFinal();
  }

  function render(direction) {
    var lang = state.lang || 'ar';
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    root.setAttribute('lang', lang);

    root.innerHTML =
      '<div class="foq-shell">' +
      renderTopbar() +
      '<div class="foq-stage"><div class="foq-step' + (direction ? ' is-entering' + (direction === 'back' ? ' is-back' : '') : '') + '">' +
      renderStep() +
      '</div></div>' +
      renderContactBar() +
      '<p class="foq-disclaimer">' + (state.lang ? t().disclaimer : T.ar.disclaimer) + '</p>' +
      '</div>';

    if (direction) {
      var stepEl = root.querySelector('.foq-step');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          stepEl.classList.remove('is-entering', 'is-back');
        });
      });
      if (root.getBoundingClientRect().top < 0) {
        root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // ——— Navigation (synced with browser back button) ———
  function snapshot() {
    return { step: state.step, lang: state.lang, projectId: state.projectId };
  }

  function goTo(step, direction) {
    state.step = step;
    state.error = '';
    state.done = false;
    state.submitting = false;
    if (direction === 'forward') history.pushState({ foq: snapshot() }, '');
    render(direction);
  }

  window.addEventListener('popstate', function (event) {
    var saved = event.state && event.state.foq;
    if (!saved) return;
    var goingBack = saved.step < state.step;
    state.lang = saved.lang;
    state.projectId = saved.projectId;
    goTo(saved.step, goingBack ? 'back' : 'pop');
  });

  // ——— Submit ———
  function sendLead(p, phone) {
    if (!cfg.formspree || typeof fetch !== 'function') return Promise.resolve();

    var data = new FormData();
    data.append('phone', phone);
    data.append('project', p.en.name);
    data.append('language', state.lang);
    data.append('page', window.location.href);
    data.append('_subject', 'New Ora lead — ' + p.en.name);
    var params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach(function (key) {
      if (params.get(key)) data.append(key, params.get(key));
    });

    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = setTimeout(function () {
      if (controller) controller.abort();
    }, 4000);

    return fetch('https://formspree.io/f/' + cfg.formspree, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
      signal: controller ? controller.signal : undefined,
    })
      .catch(function () {})
      .then(function () {
        clearTimeout(timer);
      });
  }

  function handleSubmit(form) {
    if (state.submitting) return;
    var p = getProject(state.projectId);
    var input = form.querySelector('#foq-phone');
    var raw = input.value.trim();
    var L = t();

    if (!raw) return showError(form, L.errEmpty);
    var phone = parsePhone(raw);
    if (!phone) return showError(form, L.errInvalid);

    state.submitting = true;
    state.error = '';
    var button = form.querySelector('.foq-cta');
    button.disabled = true;
    button.innerHTML = '<span class="foq-spinner"></span><span>' + esc(L.sending) + '</span>';

    state.waUrl = 'https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(L.waMessage(p[state.lang].name, phone));

    sendLead(p, phone).then(function () {
      track('generate_lead', { project: p.id, language: state.lang });
      if (cfg.conversion && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { send_to: cfg.conversion });
      }
      state.submitting = false;
      state.done = true;
      render();
      setTimeout(function () {
        window.location.href = state.waUrl;
      }, 900);
    });
  }

  function showError(form, message) {
    state.error = message;
    var input = form.querySelector('#foq-phone');
    input.classList.add('has-error');
    form.querySelector('#foq-phone-error').textContent = message;
    input.focus();
  }

  // ——— Events ———
  root.addEventListener('click', function (event) {
    var el = event.target.closest('[data-action]');
    if (!el || !root.contains(el)) return;
    var action = el.getAttribute('data-action');

    if (action === 'lang') {
      state.lang = el.getAttribute('data-lang');
      track('select_language', { language: state.lang });
      goTo(2, 'forward');
    } else if (action === 'project') {
      state.projectId = el.getAttribute('data-id');
      track('select_project', { project: state.projectId });
      if (typeof window.clarity === 'function') window.clarity('set', 'project', state.projectId);
      goTo(3, 'forward');
    } else if (action === 'back') {
      if (history.state && history.state.foq && history.state.foq.step > 1) {
        history.back();
      } else {
        goTo(Math.max(1, state.step - 1), 'back');
      }
    } else if (action === 'call') {
      track('click_call', { project: state.projectId, step: state.step });
    } else if (action === 'whatsapp') {
      track('click_whatsapp', { project: state.projectId, step: state.step });
    }
  });

  root.addEventListener('submit', function (event) {
    var form = event.target.closest('[data-form="lead"]');
    if (!form) return;
    event.preventDefault();
    handleSubmit(form);
  });

  root.addEventListener('input', function (event) {
    if (event.target.id !== 'foq-phone' || !state.error) return;
    state.error = '';
    event.target.classList.remove('has-error');
    var err = root.querySelector('#foq-phone-error');
    if (err) err.textContent = '';
  });

  history.replaceState(Object.assign({}, history.state, { foq: snapshot() }), '');
  render();
})();
