(function () {
  'use strict';

  var root = document.getElementById('foq-app');
  if (!root) return;

  var cfg = Object.assign(
    { assetsUrl: './assets/', whatsapp: '', phone: '', formspree: '', sound: true, advanceDelay: 650 },
    window.FOQ_CONFIG || {}
  );
  var projects = window.FOQ_PROJECTS || [];
  var imagesUrl = cfg.assetsUrl.replace(/\/?$/, '/') + 'images/';
  var waNumber = String(cfg.whatsapp).replace(/\D/g, '');
  var canHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;

  var FIELDS = ['project', 'unit', 'purpose'];
  var state = {
    step: 0,
    project: null,
    unit: null,
    purpose: null,
    picking: false,
    sound: cfg.sound !== false,
    phone: '',
    country: (window.FOQ_COUNTRY_TOP || ['EG'])[0],
    deck: [],
    open: [],
    matched: [],
    moves: 0,
    lock: false,
  };
  var timers = {};

  var DISCLAIMER =
    'هذه الصفحة تديرها <strong>Flair Agency</strong> — جهة تسويق عقاري مستقلة وليست المطوّر، وتعمل بموجب اتفاقية حق تسويق لمشروعات Ora. الأسعار والتوفر قابلة للتغيير.';

  var ICONS = {
    soundOn: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>',
    soundOff: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/></svg>',
    phone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    chevron: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    check: function (size, stroke) {
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + stroke + '" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    },
    whatsapp: '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.04.7C5.77.7.67 5.8.67 12.07c0 2 .52 3.96 1.52 5.68L.57 23.7l6.08-1.6a11.33 11.33 0 0 0 5.39 1.37h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.9-3.34-8.05z"/></svg>',
  };

  ICONS.whatsappSm = ICONS.whatsapp.replace('width="28" height="28"', 'width="22" height="22"');

  // ——— Helpers ———
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function $(selector) {
    return root.querySelector(selector);
  }

  function getProject(id) {
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].id === id) return projects[i];
    }
    return null;
  }

  function optionsFor(step) {
    var p = getProject(state.project);
    if (!p) return [];
    return step === 1 ? p.units : p.purposes;
  }

  function track(name) {
    if (typeof window.clarity === 'function') window.clarity('event', name);
  }

  function vibrate(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
  }

  // ——— Sound (Web Audio, no files) ———
  var audio = null;
  function tone(freq, at, len, vol) {
    if (!state.sound) return;
    at = at || 0;
    len = len || 0.5;
    vol = vol || 0.07;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === 'suspended') audio.resume();
      var t = audio.currentTime + at;
      var o = audio.createOscillator();
      var o2 = audio.createOscillator();
      var g = audio.createGain();
      var g2 = audio.createGain();
      o.type = 'sine';
      o2.type = 'sine';
      o.frequency.setValueAtTime(freq, t);
      o2.frequency.setValueAtTime(freq * 2, t);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + len);
      g2.gain.value = 0.25;
      o.connect(g);
      o2.connect(g2);
      g2.connect(g);
      g.connect(audio.destination);
      o.start(t);
      o2.start(t);
      o.stop(t + len + 0.05);
      o2.stop(t + len + 0.05);
    } catch (e) {}
  }

  function chord(at) {
    [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) {
      tone(f, (at || 0) + i * 0.11, 1.4, 0.06);
    });
  }

  // ——— Countries ———
  var countryNames = null;
  try {
    countryNames = new Intl.DisplayNames(['ar'], { type: 'region' });
  } catch (e) {}

  var countries = (window.FOQ_COUNTRIES || [['EG', '20']]).map(function (c) {
    var name = c[0];
    try {
      if (countryNames) name = countryNames.of(c[0]) || c[0];
    } catch (e) {}
    return { iso: c[0], dial: c[1], name: name };
  });
  var countryTop = window.FOQ_COUNTRY_TOP || ['EG'];

  function getCountry(iso) {
    for (var i = 0; i < countries.length; i++) {
      if (countries[i].iso === iso) return countries[i];
    }
    return countries[0];
  }

  function flag(iso) {
    return iso.replace(/./g, function (ch) {
      return String.fromCodePoint(127397 + ch.charCodeAt(0));
    });
  }

  function countryOptions() {
    function option(c) {
      return '<option value="' + c.iso + '"' + (c.iso === state.country ? ' selected' : '') + '>' +
        flag(c.iso) + ' ' + esc(c.name) + ' (+' + c.dial + ')</option>';
    }
    var top = countryTop.map(getCountry);
    var rest = countries
      .filter(function (c) { return countryTop.indexOf(c.iso) === -1; })
      .sort(function (a, b) { return a.name.localeCompare(b.name, 'ar'); });
    return (
      '<optgroup label="الأكثر استخدامًا">' + top.map(option).join('') + '</optgroup>' +
      '<optgroup label="كل الدول">' + rest.map(option).join('') + '</optgroup>'
    );
  }

  // ——— Phone ———
  function normalizeDigits(value) {
    return String(value || '')
      .replace(/[\u0660-\u0669]/g, function (d) { return String(d.charCodeAt(0) - 0x0660); })
      .replace(/[\u06F0-\u06F9]/g, function (d) { return String(d.charCodeAt(0) - 0x06f0); })
      .trim();
  }

  // Returns the number in +E.164 form, or null when it isn't a valid mobile number.
  function toIntl(value, iso) {
    var s = normalizeDigits(value);
    var typedIntl = /^(\+|00)/.test(s);
    var d = s.replace(/\D/g, '').replace(/^00/, '');

    if (typedIntl || (iso === 'EG' && /^20/.test(d))) {
      if (/^20/.test(d)) return /^201[0125]\d{8}$/.test(d) ? '+' + d : null;
      return d.length >= 8 && d.length <= 15 ? '+' + d : null;
    }
    if (iso === 'EG') {
      return /^0?1[0125]\d{8}$/.test(d) ? '+20' + d.replace(/^0/, '') : null;
    }
    var national = d.replace(/^0+/, '');
    var full = getCountry(iso).dial + national;
    return national.length >= 6 && full.length <= 15 ? '+' + full : null;
  }

  function ccDisplay() {
    var c = getCountry(state.country);
    return '<span class="foq-cc-flag">' + flag(c.iso) + '</span><span>+' + c.dial + '</span>' +
      '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
  }

  function phonePlaceholder() {
    return state.country === 'EG' ? '10 1234 5678' : 'رقم الموبايل';
  }

  function displayPhone(intl) {
    return /^\+20/.test(intl) ? '0' + intl.slice(3) : intl;
  }

  function waLink(extra) {
    var p = getProject(state.project);
    var lines = ['مرحبًا، عايز البروشور والأسعار'];
    if (p) lines.push('المشروع: ' + p.name);
    if (state.unit) lines.push('نوع الوحدة: ' + state.unit);
    if (state.purpose) lines.push('الغرض: ' + state.purpose);
    if (extra) lines = lines.concat(extra);
    return 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  // ——— Shell (rendered once) ———
  function renderShell() {
    var pips = '';
    for (var i = 0; i < 4; i++) pips += '<span class="foq-pip"><span class="foq-pip-fill"></span></span>';

    root.innerHTML =
      '<div class="foq-orbs" aria-hidden="true"><span class="foq-orb is-1"></span><span class="foq-orb is-2"></span></div>' +
      '<div class="foq-wrap">' +
      '<header class="foq-header">' +
      '<span class="foq-wordmark" dir="ltr">ORA</span>' +
      '<button type="button" class="foq-icon-btn" data-action="sound"></button>' +
      '<a class="foq-pill" href="tel:' + esc(cfg.phone) + '" data-action="call">' + ICONS.phone + '<span>اتصل بنا</span></a>' +
      '</header>' +
      '<div class="foq-progress" data-el="progress">' +
      '<div class="foq-progress-top"><span class="foq-step-label" data-el="step-label"></span>' +
      '<button type="button" class="foq-back" data-action="back">' + ICONS.chevron + '<span>رجوع</span></button></div>' +
      '<div class="foq-pips">' + pips + '</div>' +
      '</div>' +
      '<main class="foq-stage" data-el="stage"></main>' +
      '<p class="foq-disclaimer">' + DISCLAIMER + '</p>' +
      '</div>' +
      '<a class="foq-fab" href="#" target="_blank" rel="noopener" aria-label="تواصل معنا على واتساب" data-action="whatsapp">' +
      '<span class="foq-fab-ring" aria-hidden="true"></span>' + ICONS.whatsapp + '</a>';
  }

  function updateSoundButton() {
    var btn = $('[data-action="sound"]');
    btn.innerHTML = state.sound ? ICONS.soundOn : ICONS.soundOff;
    btn.setAttribute('aria-label', state.sound ? 'كتم الصوت' : 'تشغيل الصوت');
    btn.classList.toggle('is-on', state.sound);
  }

  function updateChrome() {
    var s = state.step;
    $('[data-el="progress"]').hidden = s >= 4;
    $('[data-el="step-label"]').textContent = s < 3 ? 'خطوة ' + (s + 1) + ' من 4' : 'آخر خطوة';
    $('[data-action="back"]').hidden = !(s > 0 && s < 4);
    var fills = root.querySelectorAll('.foq-pip-fill');
    for (var i = 0; i < fills.length; i++) {
      fills[i].style.width = s > i ? '100%' : s === 3 && i === 3 ? '50%' : '0%';
    }
    updateFab();
  }

  function updateFab() {
    $('[data-action="whatsapp"]').setAttribute('href', waLink());
  }

  // ——— Steps ———
  function renderProjects() {
    var cards = projects.map(function (p, i) {
      var on = state.project === p.id;
      return (
        '<div class="foq-world-cell" style="animation-delay:' + (0.1 + i * 0.07).toFixed(2) + 's">' +
        '<button type="button" class="foq-tile foq-world' + (on ? ' is-on' : '') + '" data-action="pick" data-value="' + esc(p.id) + '" aria-pressed="' + on + '">' +
        '<span class="foq-world-media"><img src="' + imagesUrl + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy" />' +
        '<span class="foq-pick-hint">اختار</span></span>' +
        '<span class="foq-world-body"><span class="foq-world-text">' +
        '<span class="foq-world-name" dir="ltr">' + esc(p.name) + '</span>' +
        '<span class="foq-world-place">' + esc(p.place) + '</span>' +
        '</span>' +
        '<span class="foq-radio" aria-hidden="true"><span class="foq-check-ring"></span>' + ICONS.check(12, 3.5) + '</span>' +
        '</span>' +
        '</button></div>'
      );
    }).join('');

    return (
      '<section class="foq-step">' +
      '<div class="foq-head">' +
      '<span class="foq-kicker">اختار مشروعك مع Ora</span>' +
      '<h1 class="foq-h1">اختار المشروع</h1>' +
      '<p class="foq-lead">اضغط على الكارت اللي يهمك عشان تعرف الأسعار وتاخد البروشور.</p>' +
      '</div>' +
      '<div class="foq-worlds">' + cards + '</div>' +
      '</section>'
    );
  }

  function renderOptions() {
    var step = state.step;
    var p = getProject(state.project);
    var chosen = state[FIELDS[step]];
    var crumb = step === 1 ? p.name : p.name + ' · ' + (state.unit || '');
    var opts = optionsFor(step).map(function (label, i) {
      var on = chosen === label;
      return (
        '<div class="foq-opt-cell' + (step === 1 ? ' is-unit' : '') + '" style="animation-delay:' + (0.1 + i * 0.07).toFixed(2) + 's">' +
        '<button type="button" class="foq-tile foq-opt' + (on ? ' is-on' : '') + '" data-action="pick" data-value="' + esc(label) + '" aria-pressed="' + on + '">' +
        '<span class="foq-opt-label">' + esc(label) + '</span>' +
        '<span class="foq-radio" aria-hidden="true"><span class="foq-check-ring"></span>' + ICONS.check(12, 3.5) + '</span>' +
        '</button></div>'
      );
    }).join('');

    var offer = '';
    if (step === 1 && p.priceFrom) {
      offer =
        '<div class="foq-offer">' +
        '<div class="foq-offer-item"><span class="foq-offer-k">يبدأ من</span>' +
        '<span class="foq-offer-v">' + esc(p.priceFrom) + ' <span class="foq-offer-cur">جنيه</span></span></div>' +
        '<div class="foq-offer-item"><span class="foq-offer-k">خطة الدفع</span>' +
        '<span class="foq-offer-v is-plan">' + (Array.isArray(p.plan) ? p.plan : [p.plan]).map(esc).join('<br>') + '</span></div>' +
        '</div>';
    }

    return (
      '<section class="foq-step">' +
      '<div class="foq-head">' +
      '<span class="foq-kicker is-crumb" dir="ltr">' + esc(crumb) + '</span>' +
      '<h2 class="foq-h2">' + (step === 1 ? 'بتدور على إيه؟' : 'بتشتري ليه؟') + '</h2>' +
      '</div>' +
      offer +
      '<div class="foq-opts">' + opts + '</div>' +
      '</section>'
    );
  }

  function renderForm() {
    var p = getProject(state.project);
    var summary = [
      { k: 'المشروع', v: p.name, step: 0 },
      { k: 'الوحدة', v: state.unit, step: 1 },
      { k: 'الغرض', v: state.purpose, step: 2 },
    ].map(function (s, i) {
      return (
        '<button type="button" class="foq-summary-item" data-action="edit" data-step="' + s.step + '" style="animation-delay:' + (0.15 + i * 0.07).toFixed(2) + 's">' +
        '<span class="foq-summary-k">' + esc(s.k) + '</span>' +
        '<span class="foq-summary-v">' + esc(s.v) + '</span>' +
        '</button>'
      );
    }).join('');

    return (
      '<section class="foq-step">' +
      '<div class="foq-head">' +
      '<span class="foq-kicker">آخر خطوة</span>' +
      '<h2 class="foq-h2">سيب رقمك ونبعتلك البروشور</h2>' +
      '<p class="foq-lead">حط رقمك — والبروشور والأسعار يوصلوك على واتساب.</p>' +
      '</div>' +
      '<div class="foq-summary">' + summary + '</div>' +
      '<form class="foq-form" novalidate data-form="lead">' +
      '<label class="foq-field"><span class="foq-field-label" data-el="phone-label">رقم الموبايل <span class="foq-req">*</span></span>' +
      '<span class="foq-phone" dir="ltr">' +
      '<span class="foq-cc"><span class="foq-cc-display" data-el="cc-display">' + ccDisplay() + '</span>' +
      '<select class="foq-cc-select" name="country" aria-label="كود الدولة">' + countryOptions() + '</select></span>' +
      '<input class="foq-input is-phone" type="tel" name="phone" inputmode="tel" autocomplete="tel-national" dir="ltr" placeholder="' + phonePlaceholder() + '" value="' + esc(state.phone) + '" /></span>' +
      '</label>' +
      '<button type="submit" class="foq-submit">' + ICONS.whatsappSm + '<span>احصل على البروشور</span></button>' +
      '<p class="foq-form-note">بإرسال الرقم توافق إن مستشار من Ora يتواصل معاك على واتساب أو تليفون.</p>' +
      '</form>' +
      '</section>'
    );
  }

  function renderCards() {
    return state.deck.map(function (c, i) {
      return (
        '<button type="button" class="foq-card" data-action="flip" data-id="' + c.id + '" aria-label="كارت مقلوب" style="animation-delay:' + (0.45 + i * 0.04).toFixed(2) + 's">' +
        '<span class="foq-card-inner">' +
        '<span class="foq-card-back"><span dir="ltr">ORA</span></span>' +
        '<span class="foq-card-face"><span class="foq-card-v" dir="ltr">' + esc(c.v) + '</span><span class="foq-card-place">' + esc(c.place) + '</span></span>' +
        '</span></button>'
      );
    }).join('');
  }

  function renderThanks() {
    var sparks = '';
    for (var i = 0; i < 12; i++) {
      sparks += '<span class="foq-spark" style="--a:' + i * 30 + 'deg;animation-delay:' + (0.25 + (i % 3) * 0.05).toFixed(2) + 's"></span>';
    }
    return (
      '<section class="foq-step is-thanks">' +
      '<div class="foq-thanks-head">' +
      '<span class="foq-burst" aria-hidden="true">' + sparks +
      '<span class="foq-burst-ring"></span>' +
      '<span class="foq-burst-dot"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path class="foq-draw" d="M20 6 9 17l-5-5"/></svg></span>' +
      '</span>' +
      '<div class="foq-thanks-text">' +
      '<span class="foq-kicker">شكرًا ليك</span>' +
      '<h2 class="foq-h2">وصلنا طلبك</h2>' +
      '<p class="foq-lead is-small">مستشار من Ora هيتواصل معاك قريب على <span dir="ltr">' + esc(displayPhone(state.intl || '')) + '</span>.</p>' +
      '</div></div>' +
      '<div class="foq-game">' +
      '<div class="foq-game-head"><div class="foq-game-title">' +
      '<span class="foq-game-h">لحد ما نكلمك… طابق المشاريع</span>' +
      '<span class="foq-game-sub">اقلب كارتين، ولو نفس المشروع يفضلوا مفتوحين.</span>' +
      '</div><span class="foq-moves" data-el="moves">0 محاولة</span></div>' +
      '<div class="foq-cards" data-el="cards">' + renderCards() + '</div>' +
      '<div data-el="win"></div>' +
      '</div>' +
      '</section>'
    );
  }

  function renderStage() {
    var html;
    if (state.step === 0) html = renderProjects();
    else if (state.step === 1 || state.step === 2) html = renderOptions();
    else if (state.step === 3) html = renderForm();
    else html = renderThanks();
    $('[data-el="stage"]').innerHTML = html;
  }

  // ——— Navigation (synced with the browser back button) ———
  function goTo(step, push) {
    clearTimeout(timers.advance);
    state.picking = false;
    root.classList.remove('is-picking');
    if (step > 0 && !getProject(state.project)) step = 0;
    state.step = step;
    if (push) history.pushState(Object.assign({}, history.state, { foq: step }), '');
    renderStage();
    updateChrome();
    if (root.getBoundingClientRect().top < 0) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function jumpBack(target) {
    var current = state.step;
    if (target >= current) return;
    if (history.state && history.state.foq === current) {
      history.go(target - current);
    } else {
      goTo(target, false);
    }
  }

  function back() {
    if (state.picking || state.step === 0 || state.step === 4) return;
    tone(392, 0, 0.3, 0.05);
    jumpBack(state.step - 1);
  }

  window.addEventListener('popstate', function (event) {
    var saved = event.state && event.state.foq;
    if (typeof saved !== 'number') return;
    goTo(saved, false);
  });

  // ——— Picking ———
  function pick(value) {
    var step = state.step;
    if (state.picking || step > 2) return;
    var field = FIELDS[step];

    tone([523.25, 659.25, 783.99][step], 0, 0.6, 0.08);
    tone([783.99, 987.77, 1174.66][step], 0.06, 0.5, 0.04);
    vibrate(8);

    if (step === 0 && value !== state.project) {
      state.unit = null;
      state.purpose = null;
    }
    state[field] = value;
    state.picking = true;
    root.classList.add('is-picking');

    var tiles = root.querySelectorAll('[data-action="pick"]');
    for (var i = 0; i < tiles.length; i++) {
      var on = tiles[i].getAttribute('data-value') === value;
      tiles[i].classList.toggle('is-on', on);
      tiles[i].classList.toggle('is-dim', !on);
      tiles[i].setAttribute('aria-pressed', on);
    }
    updateFab();

    track('select_' + field);
    if (step === 0 && typeof window.clarity === 'function') window.clarity('set', 'project', value);

    timers.advance = setTimeout(function () {
      goTo(step + 1, true);
    }, Number(cfg.advanceDelay) || 0);
  }

  // ——— Submit ———
  function sendLead(intlPhone) {
    if (!cfg.formspree || typeof fetch !== 'function') return;
    var p = getProject(state.project);
    var data = new FormData();
    data.append('phone', intlPhone);
    data.append('country', getCountry(state.country).name + ' (' + state.country + ')');
    data.append('project', p ? p.name : '');
    data.append('unit', state.unit || '');
    data.append('purpose', state.purpose || '');
    data.append('page', window.location.href);
    data.append('_subject', 'New Ora lead — ' + (p ? p.name : ''));
    var params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach(function (key) {
      if (params.get(key)) data.append(key, params.get(key));
    });
    fetch('https://formspree.io/f/' + cfg.formspree, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
      keepalive: true,
    }).catch(function () {});
  }

  function showPhoneError() {
    var box = $('.foq-phone');
    var label = $('[data-el="phone-label"]');
    tone(220, 0, 0.25, 0.06);
    vibrate([20, 40, 20]);
    label.textContent = 'اكتب رقم موبايل صحيح';
    label.classList.add('is-error');
    box.classList.remove('has-error');
    void box.offsetWidth;
    box.classList.add('has-error');
    $('input[name="phone"]').focus();
  }

  function clearPhoneError() {
    var box = $('.foq-phone');
    var label = $('[data-el="phone-label"]');
    if (!box.classList.contains('has-error')) return;
    box.classList.remove('has-error');
    label.innerHTML = 'رقم الموبايل <span class="foq-req">*</span>';
    label.classList.remove('is-error');
  }

  function handleSubmit() {
    var intl = toIntl(state.phone, state.country);
    if (!intl) return showPhoneError();
    state.intl = intl;

    var href = waLink(['رقمي: ' + displayPhone(intl)]);

    sendLead(intl);
    track('generate_lead');

    var win = window.open(href, '_blank');
    if (win) {
      win.opener = null;
    } else {
      setTimeout(function () { window.location.href = href; }, 1200);
    }

    chord();
    resetDeck();
    goTo(4, true);
  }

  // ——— Memory game ———
  function resetDeck() {
    var pairs = [['ZED', 'زايد والتجمع'], ['Solana', 'شرق وغرب'], ['Silver\u00adsands', 'الساحل'], ['ORA', 'Developers']];
    var deck = pairs.concat(pairs).map(function (pair, i) {
      return { id: i, v: pair[0], place: pair[1] };
    });
    for (var i = deck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = deck[i];
      deck[i] = deck[j];
      deck[j] = tmp;
    }
    state.deck = deck;
    state.open = [];
    state.matched = [];
    state.moves = 0;
    state.lock = false;
  }

  function cardById(id) {
    for (var i = 0; i < state.deck.length; i++) {
      if (state.deck[i].id === id) return state.deck[i];
    }
    return null;
  }

  function cardEl(id) {
    return $('.foq-card[data-id="' + id + '"]');
  }

  function setCardUp(id, up) {
    var el = cardEl(id);
    if (!el) return;
    el.classList.toggle('is-up', up);
    el.setAttribute('aria-label', up ? cardById(id).v : 'كارت مقلوب');
  }

  function flip(id) {
    if (state.lock || state.open.indexOf(id) > -1 || state.matched.indexOf(id) > -1) return;
    tone(880, 0, 0.18, 0.04);
    state.open.push(id);
    setCardUp(id, true);
    if (state.open.length < 2) return;

    var a = cardById(state.open[0]);
    var b = cardById(state.open[1]);
    var match = a.v === b.v;
    state.moves += 1;
    state.lock = true;
    $('[data-el="moves"]').textContent = state.moves + ' محاولة';

    timers.game = setTimeout(function () {
      if (match) {
        state.matched.push(a.id, b.id);
        cardEl(a.id).classList.add('is-matched');
        cardEl(b.id).classList.add('is-matched');
        tone(659.25, 0, 0.5, 0.06);
        tone(987.77, 0.08, 0.5, 0.04);
        if (state.matched.length === state.deck.length) {
          chord(0.3);
          track('game_won');
          $('[data-el="win"]').innerHTML =
            '<div class="foq-win"><span class="foq-win-label">برافو! خلصتها في ' + state.moves + ' محاولة</span>' +
            '<button type="button" class="foq-replay" data-action="replay">العب تاني</button></div>';
        }
      } else {
        tone(330, 0, 0.25, 0.04);
        setCardUp(a.id, false);
        setCardUp(b.id, false);
      }
      state.open = [];
      state.lock = false;
    }, match ? 350 : 800);
  }

  function replay() {
    clearTimeout(timers.game);
    tone(523.25, 0, 0.3, 0.05);
    resetDeck();
    $('[data-el="cards"]').innerHTML = renderCards();
    $('[data-el="moves"]').textContent = '0 محاولة';
    $('[data-el="win"]').innerHTML = '';
  }

  // ——— Events ———
  root.addEventListener('click', function (event) {
    var el = event.target.closest('[data-action]');
    if (!el || !root.contains(el)) return;
    var action = el.getAttribute('data-action');

    if (action === 'pick') {
      pick(el.getAttribute('data-value'));
    } else if (action === 'back') {
      back();
    } else if (action === 'edit') {
      jumpBack(Number(el.getAttribute('data-step')));
    } else if (action === 'sound') {
      state.sound = !state.sound;
      updateSoundButton();
      tone(659.25, 0, 0.3, 0.05);
    } else if (action === 'flip') {
      flip(Number(el.getAttribute('data-id')));
    } else if (action === 'replay') {
      replay();
    } else if (action === 'call') {
      track('click_call');
    } else if (action === 'whatsapp') {
      tone(1046.5, 0, 0.4, 0.06);
      track('click_whatsapp');
    }
  });

  root.addEventListener('mouseover', function (event) {
    if (!canHover) return;
    var el = event.target.closest('.foq-tile');
    if (!el || el.contains(event.relatedTarget)) return;
    tone(1318.5, 0, 0.08, 0.012);
  });

  root.addEventListener('input', function (event) {
    var name = event.target.name;
    if (name === 'phone') {
      state.phone = event.target.value;
      clearPhoneError();
    }
  });

  root.addEventListener('change', function (event) {
    if (event.target.name !== 'country') return;
    state.country = event.target.value;
    $('[data-el="cc-display"]').innerHTML = ccDisplay();
    $('input[name="phone"]').setAttribute('placeholder', phonePlaceholder());
    clearPhoneError();
    tone(880, 0, 0.18, 0.04);
    track('select_country');
    $('input[name="phone"]').focus();
  });

  root.addEventListener('submit', function (event) {
    if (!event.target.closest('[data-form="lead"]')) return;
    event.preventDefault();
    handleSubmit();
  });

  document.addEventListener('keydown', function (event) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
    if (event.key === 'Escape') return back();
    var n = parseInt(event.key, 10);
    if (state.step > 2 || !(n >= 1)) return;
    var list = state.step === 0 ? projects.map(function (p) { return p.id; }) : optionsFor(state.step);
    if (n <= list.length) pick(list[n - 1]);
  });

  // ——— Boot ———
  renderShell();
  updateSoundButton();
  history.replaceState(Object.assign({}, history.state, { foq: 0 }), '');
  renderStage();
  updateChrome();
})();
