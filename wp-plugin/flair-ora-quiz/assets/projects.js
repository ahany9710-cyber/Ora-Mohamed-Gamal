/**
 * Project data — edit this file only to update names, places, images and the quiz options.
 *
 * name: shown in Latin letters on the card and sent in the WhatsApp message / lead.
 * place: Arabic location line under the name.
 * image: file name inside assets/images/.
 * units / purposes: the options shown in steps 2 and 3 for this project.
 * priceFrom / plan: shown on the unit step. City projects follow the availability list;
 * Silversands follows its last published start price and payment plan.
 */
(function () {
  var cityUnits = ['شقة', 'دوبلكس', 'تاون هاوس', 'فيلا'];
  var cityPurposes = ['سكن', 'استثمار'];

  window.FOQ_PROJECTS = [
    {
      id: 'solana-east',
      name: 'Solana East',
      place: 'القاهرة الجديدة',
      image: 'solana-east.jpg',
      units: cityUnits,
      purposes: cityPurposes,
      priceFrom: '13.5 مليون',
      plan: ['5% مقدم', '5% بعد 3 شهور', 'تقسيط على 8 سنين'],
      launch: ['طرح أول سعر', 'شقق فندقية'],
    },
    {
      id: 'zed-east',
      name: 'ZED East',
      place: 'القاهرة الجديدة',
      image: 'zed-east.jpg',
      units: cityUnits,
      purposes: cityPurposes,
      priceFrom: '8.9 مليون',
      plan: ['0% مقدم', 'تقسيط على 10 سنين'],
    },
    {
      id: 'zed-west',
      name: 'ZED West',
      place: 'الشيخ زايد',
      image: 'zed-west.jpg',
      units: cityUnits,
      purposes: cityPurposes,
      priceFrom: '10 مليون',
      plan: ['0% مقدم', 'تقسيط على 10 سنين'],
    },
    {
      id: 'solana-west',
      name: 'Solana West',
      place: 'نيو زايد',
      image: 'solana-west.jpg',
      units: cityUnits,
      purposes: cityPurposes,
      priceFrom: '11 مليون',
      plan: ['0% مقدم', 'تقسيط على 10 سنين'],
    },
    {
      id: 'silversands',
      name: 'Silversands',
      place: 'الساحل الشمالي',
      image: 'silversands.jpg',
      units: ['شاليه', 'تاون هاوس', 'توين هاوس', 'فيلا'],
      purposes: ['مصيف للعيلة', 'استثمار'],
      priceFrom: '8.9 مليون',
      plan: ['5% مقدم', '5% عند التعاقد', 'تقسيط على 8 سنين'],
    },
  ];
})();
