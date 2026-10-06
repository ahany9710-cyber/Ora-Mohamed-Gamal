/**
 * Project data — edit this file only to update names, prices, locations and images.
 *
 * priceFrom / priceTo: numbers in millions of EGP (e.g. 8.9 = 8,900,000 EGP).
 * Leave them as null to show "prices on WhatsApp" instead of a range.
 * image / logo: file names inside assets/images/.
 * logoColor: true keeps the logo's original colors (otherwise it is shown in white over the photo).
 * badge (optional): small tag shown on the project card, e.g. { ar: 'أحدث إطلاق', en: 'New launch' }.
 */
window.FOQ_PROJECTS = [
  {
    id: 'solana-east',
    image: 'solana-east.jpg',
    logo: 'logo-solana.png',
    priceFrom: null,
    priceTo: null,
    ar: {
      name: 'سولانا إيست',
      location: 'القاهرة الجديدة',
      units: 'شقق · تاون هاوس · فيلات',
      description: 'مجتمع سكني متكامل من Ora في شرق القاهرة، بتصميم عصري ومساحات خضراء واسعة.',
    },
    en: {
      name: 'Solana East',
      location: 'New Cairo',
      units: 'Apartments · Townhouses · Villas',
      description: 'An integrated Ora community in East Cairo with contemporary design and generous green spaces.',
    },
  },
  {
    id: 'zed-east',
    image: 'zed-east.jpg',
    logo: 'logo-zed-east.png',
    logoColor: true,
    priceFrom: null,
    priceTo: null,
    ar: {
      name: 'زيد إيست',
      location: 'القاهرة الجديدة',
      units: 'شقق · توين هاوس · فيلات',
      description: 'ZED East — مجتمع متكامل بأسلوب حياة عصري، خدمات ومساحات خضراء في قلب القاهرة الجديدة.',
    },
    en: {
      name: 'ZED East',
      location: 'New Cairo',
      units: 'Apartments · Twin Houses · Villas',
      description: 'ZED East — a modern, fully integrated community with services and green spaces in the heart of New Cairo.',
    },
  },
  {
    id: 'zed-west',
    image: 'zed-west.jpg',
    logo: 'logo-zed-west.png',
    logoColor: true,
    priceFrom: null,
    priceTo: null,
    ar: {
      name: 'زيد ويست',
      location: 'الشيخ زايد',
      units: 'شقق · وحدات فندقية · مكاتب',
      description: 'ZED الشيخ زايد — أيقونة Ora في غرب القاهرة، أبراج سكنية ونادي ومساحات خضراء ضخمة.',
    },
    en: {
      name: 'ZED West',
      location: 'Sheikh Zayed',
      units: 'Apartments · Serviced Units · Offices',
      description: 'ZED Sheikh Zayed — Ora\'s landmark in West Cairo with residential towers, a club and vast green spaces.',
    },
  },
  {
    id: 'solana-west',
    image: 'solana-west.jpg',
    logo: 'logo-solana.png',
    priceFrom: null,
    priceTo: null,
    ar: {
      name: 'سولانا ويست',
      location: 'الشيخ زايد',
      units: 'شقق · تاون هاوس · فيلات',
      description: 'Solana by Ora في الشيخ زايد — مجتمع هادئ بتصميم معماري مميز وخدمات متكاملة.',
    },
    en: {
      name: 'Solana West',
      location: 'Sheikh Zayed',
      units: 'Apartments · Townhouses · Villas',
      description: 'Solana by Ora in Sheikh Zayed — a calm community with distinctive architecture and integrated services.',
    },
  },
  {
    id: 'silversands',
    image: 'silversands.jpg',
    logo: 'logo-silversands.png',
    priceFrom: 8.9,
    priceTo: 23.7,
    badge: { ar: 'أحدث إطلاق', en: 'New launch' },
    ar: {
      name: 'سيلفرساندس الساحل الشمالي',
      location: 'الساحل الشمالي — دقائق من ألماظة باي',
      units: 'كابانا · لودج · شقق من غرفة لـ 3 غرف',
      description: 'أحدث إطلاق: Silver Walk و Silver Bay — لاجون كريستالي، بروميناد نابض، وحدات كاملة التشطيب بالتكييفات. 5% مقدم وتقسيط على 8 سنوات.',
    },
    en: {
      name: 'Silversands North Coast',
      location: 'North Coast — minutes from Almaza Bay',
      units: 'Cabanas · Lodges · 1–3 Bedroom Apartments',
      description: 'Latest release: Silver Walk & Silver Bay — crystal lagoon, lively promenade, fully finished units with ACs. 5% down payment, 8-year installments.',
    },
  },
];
