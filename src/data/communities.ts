export interface Community {
  id: string;
  name: string;
  tags: string[];
  description: string;
  image: string;
}

export const communities: Community[] = [
  {
    id: 'marina-zone',
    name: 'Marina Zone',
    tags: ['IL Monte Galala', 'البحر الأحمر', 'Al Ain Al Sokhna'],
    description: 'منطقة مارينا فاخرة مع إطلالات مباشرة على البحر الأحمر. وحدات سكنية راقية مصممة لتوفير أسلوب حياة بحري استثنائي مع مرافق عالمية المستوى.',
    image: './images/communities/mountain-view-1.1.webp?v=2',
  },
  {
    id: 'residential-zone',
    name: 'Residential Zone',
    tags: ['4942 فدان', 'استلام 2030', 'Tatweer Misr'],
    description: 'مجتمع سكني متكامل على مساحة 4942 فدان. تصميم عصري يجمع بين الخصوصية والراحة مع مناظر طبيعية خلابة في العين السخنة.',
    image: './images/communities/hyde-park.webp?v=2',
  },
  {
    id: 'amenities-zone',
    name: 'Amenities Zone',
    tags: ['مرافق فاخرة', 'المنطقة الترفيهية'],
    description: 'منطقة ترفيهية متكاملة تشمل المسابح والحدائق ومراكز اللياقة البدنية والمناطق الترفيهية لجميع أفراد العائلة.',
    image: './images/communities/crista.webp?v=2',
  },
  {
    id: 'beach-zone',
    name: 'Beach Zone',
    tags: ['شاطئ خاص', 'البحر الأحمر'],
    description: 'شاطئ خاص بطول ساحلي مميز على البحر الأحمر. استمتع بحياة شاطئية راقية في قلب IL Monte Galala - Marina Towers.',
    image: './images/communities/aliva.webp?v=2',
  },
];
