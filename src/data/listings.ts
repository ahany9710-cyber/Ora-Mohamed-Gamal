export interface Listing {
  id: string;
  name: string;
  area: string;
  tagline: string;
  downpayment: string;
  installment: string;
  delivery: string;
  finishing: string;
  priceRange: string;
  image?: string;
}

export const listings: Listing[] = [
  {
    id: '1',
    name: 'Studios',
    area: 'From 60 sqm',
    image: './images/listings/listing-1.png?v=2',
    tagline: 'IL Monte Galala - Marina Towers | Al Ain Al Sokhna, Red Sea',
    downpayment: '-',
    installment: 'Up to 10 years installments',
    delivery: 'Completion 2030',
    finishing: 'Full finishing',
    priceRange: '8,000,000 EGP',
  },
  {
    id: '2',
    name: 'One Bedroom',
    area: 'From 95 sqm',
    image: './images/listings/listing-2.png?v=2',
    tagline: 'IL Monte Galala - Marina Towers | Al Ain Al Sokhna, Red Sea',
    downpayment: '-',
    installment: 'Up to 10 years installments',
    delivery: 'Completion 2030',
    finishing: 'Full finishing',
    priceRange: '13,200,000 EGP',
  },
  {
    id: '3',
    name: 'Two Bedrooms',
    area: 'From 120 sqm',
    image: './images/listings/listing-3.png?v=2',
    tagline: 'IL Monte Galala - Marina Towers | Al Ain Al Sokhna, Red Sea',
    downpayment: '-',
    installment: 'Up to 10 years installments',
    delivery: 'Completion 2030',
    finishing: 'Full finishing',
    priceRange: '15,100,000 EGP',
  },
  {
    id: '4',
    name: 'Executive Units',
    area: 'One Bedroom (120 sqm)',
    image: './images/listings/listing-4.png?v=2',
    tagline: 'IL Monte Galala - Marina Towers | Al Ain Al Sokhna, Red Sea',
    downpayment: '-',
    installment: 'Up to 10 years installments',
    delivery: 'Completion 2030',
    finishing: 'Full finishing',
    priceRange: '18,800,000 EGP',
  },
  {
    id: '5',
    name: 'Penthouse',
    area: '415 sqm',
    image: './images/listings/listing-5.png?v=2',
    tagline: 'IL Monte Galala - Marina Towers | Al Ain Al Sokhna, Red Sea',
    downpayment: '-',
    installment: 'Up to 10 years installments',
    delivery: 'Completion 2030',
    finishing: 'Full finishing',
    priceRange: '75,700,000 EGP',
  },
];
