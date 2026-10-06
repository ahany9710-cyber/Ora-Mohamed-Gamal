/**
 * Project data — edit this file only to update names, places, images and the quiz options.
 *
 * name: shown in Latin letters on the card and sent in the WhatsApp message / lead.
 * place: Arabic location line under the name.
 * image: file name inside assets/images/.
 * units / purposes: the options shown in steps 2 and 3 for this project.
 */
(function () {
  var cityUnits = ['شقة', 'دوبلكس', 'تاون هاوس', 'فيلا'];
  var cityPurposes = ['سكن', 'استثمار'];

  window.FOQ_PROJECTS = [
    { id: 'solana-east', name: 'Solana East', place: 'القاهرة الجديدة', image: 'solana-east.jpg', units: cityUnits, purposes: cityPurposes },
    { id: 'zed-east', name: 'ZED East', place: 'القاهرة الجديدة', image: 'zed-east.jpg', units: cityUnits, purposes: cityPurposes },
    { id: 'zed-west', name: 'ZED West', place: 'الشيخ زايد', image: 'zed-west.jpg', units: cityUnits, purposes: cityPurposes },
    { id: 'solana-west', name: 'Solana West', place: 'نيو زايد', image: 'solana-west.jpg', units: cityUnits, purposes: cityPurposes },
    {
      id: 'silversands',
      name: 'Silversands',
      place: 'الساحل الشمالي',
      image: 'silversands.jpg',
      units: ['شاليه', 'تاون هاوس', 'توين هاوس', 'فيلا'],
      purposes: ['مصيف للعيلة', 'استثمار'],
    },
  ];
})();
