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
    name: 'Silver Walk — 1 Bedroom',
    area: '68 sqm',
    image: './images/listings/listing-1.jpg',
    tagline: 'Silver Walk | Waterfront Promenade | Silversands North Coast',
    downpayment: '5% Down + 5% Contract',
    installment: 'Equal installments over 8 years',
    delivery: 'Fully Finished + ACs',
    finishing: 'Fully Finished + ACs',
    priceRange: 'Starting from 8.9M EGP',
  },
  {
    id: '2',
    name: 'Silver Walk — 2 Bedroom',
    area: '95 sqm',
    image: './images/listings/listing-2.jpg',
    tagline: 'Silver Walk | Waterfront Promenade | Silversands North Coast',
    downpayment: '5% Down + 5% Contract',
    installment: 'Equal installments over 8 years',
    delivery: 'Fully Finished + ACs',
    finishing: 'Fully Finished + ACs',
    priceRange: 'Starting from 13.2M EGP',
  },
  {
    id: '3',
    name: 'Silver Walk — 3 Bedroom',
    area: '134 sqm',
    image: './images/listings/listing-3.jpg',
    tagline: 'Silver Walk | Waterfront Promenade | Silversands North Coast',
    downpayment: '5% Down + 5% Contract',
    installment: 'Equal installments over 8 years',
    delivery: 'Fully Finished + ACs',
    finishing: 'Fully Finished + ACs',
    priceRange: 'Starting from 22.97M EGP',
  },
  {
    id: '4',
    name: 'Silver Bay — 1 Bedroom Cabana',
    area: '51 sqm',
    image: './images/listings/listing-4.jpg',
    tagline: 'Silver Bay | Lagoon-Front | The Bay At Your Door',
    downpayment: '5% Down + 5% Contract',
    installment: 'Equal installments over 8 years',
    delivery: 'Fully Finished + ACs',
    finishing: 'Fully Finished + ACs',
    priceRange: 'Starting from 15.6M EGP',
  },
  {
    id: '5',
    name: 'Silver Bay — 2 Bedroom Lodge',
    area: '102 sqm',
    image: './images/listings/listing-5.jpg',
    tagline: 'Silver Bay | Lagoon-Front | Wider Water Views',
    downpayment: '5% Down + 5% Contract',
    installment: 'Equal installments over 8 years',
    delivery: 'Fully Finished + ACs',
    finishing: 'Fully Finished + ACs',
    priceRange: 'Starting from 23.7M EGP',
  },
];
