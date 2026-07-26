export interface Community {
  id: string;
  name: string;
  tags: string[];
  description: string;
  image: string;
}

export const communities: Community[] = [
  {
    id: 'silver-bay',
    name: 'Silver Bay',
    tags: ['The Bay At Your Door', 'Lagoon-Front', 'Silversands'],
    description:
      'مجموعة حصرية على واجهة اللاجون مباشرة — وصول فوري للخليج، إطلالات مائية أوسع، وشواطئ رملية. كابانا غرفة نوم تبدأ من 15.6 مليون جنيه، ولودج غرفتين من 23.7 مليون.',
    image: './images/communities/silver-bay.jpg',
  },
  {
    id: 'silver-walk',
    name: 'Silver Walk',
    tags: ['Stroll Day & Night', 'Promenade', 'Silversands'],
    description:
      'وجهة مائية نابضة حول بروميناد حيّ — كافيهات، مطاعم، محلات وترفيه طوال اليوم والليل. شقق من غرفة حتى 3 غرف تبدأ من 8.9 مليون جنيه.',
    image: './images/communities/silver-walk.jpg',
  },
  {
    id: 'crystal-lagoon',
    name: 'Crystal Lagoon',
    tags: ['حتى 200م واجهة', 'عرض حتى 110م'],
    description:
      'واجهة لاجون كريستالي تصل إلى 200 متر، وعرض يصل إلى 110 متر، مع وصول مباشر لشواطئ اللاجون — قلب تجربة Silversands.',
    image: './images/communities/lagoon.jpg',
  },
  {
    id: 'waterfront-promenade',
    name: 'Waterfront Promenade',
    tags: ['Retail', 'Dining', 'Entertainment'],
    description:
      'بروميناد على الواجهة المائية يجمع المقاهي والمطاعم والتجزئة والترفيه — أجواء تبقى حيّة نهارًا وليلًا، مع إمكانات استثمار وتأجير قوية.',
    image: './images/communities/promenade.jpg',
  },
];
