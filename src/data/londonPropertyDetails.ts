import type { PropertyDetails } from './manchesterData';

const premiumAmenities = [
  { icon: '🏋️', label: 'Fully Equipped Gym' },
  { icon: '🏊', label: '20th Floor Swimming Pool' },
  { icon: '🏌️', label: 'Golf Simulator' },
  { icon: '🎬', label: 'Cinema Room' },
  { icon: '☕', label: 'Another Brother Cafe' },
  { icon: '📚', label: 'Co-Working Spaces' },
  { icon: '🥘', label: 'Communal Kitchen' },
  { icon: '🏢', label: '24/7 On Site Team' },
  { icon: '📶', label: 'Superfast Wi-Fi' },
  { icon: '🚲', label: 'Bike Storage' },
  { icon: '🚗', label: 'Parking Available*' },
  { icon: '📦', label: 'Parcel Collection' },
];

const standardAmenities = [
  { icon: '🏋️', label: 'Gym Access' },
  { icon: '📚', label: 'Study Areas' },
  { icon: '🛋️', label: 'Common Room' },
  { icon: '🧺', label: 'Laundry Facilities' },
  { icon: '📶', label: 'WiFi Included' },
  { icon: '🔒', label: 'Secure Entry & CCTV' },
];

const standardBills = [
  'Electricity', 'Water', 'Gas', 'High-Speed WiFi', 'Contents Insurance',
];

const arkBills = [
  'Electricity', 'Water', 'Gas', 'Superfast WiFi', 'Gym & Pool Access', 'Co-working Access', 'Communal Kitchen Use', 'Events Programme',
];

export const LONDON_PROPERTY_DETAILS: Record<string, PropertyDetails> = {
  'ARK-CW': {
    description: 'A haven of community and creativity in vibrant East London, just a few minutes walk from Canary Wharf. ARK Canary Wharf is London’s largest co-living space, designed for both short stays and long-term living. Featuring a stunning 20th-floor pool with city views, a state-of-the-art gym, golf simulator, and a variety of co-working spaces, it offers a lifestyle beyond just accommodation.',
    totalBeds: 705,
    yearBuilt: '2022',
    galleryImages: [
      'https://images.unsplash.com/photo-1543393399-add3ef060b2d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80&w=1200',
    ],
    roomTypes: [
      { name: 'Cosy Studio', size: '12 sqm', pricePerWeek: 346, amenities: ['Double Bed', 'Kitchenette', 'Private Bathroom', 'Smart TV'], image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80&w=800' },
      { name: 'Classic Studio', size: '16 sqm', pricePerWeek: 461, amenities: ['Double Bed', 'Full Kitchenette', 'Private Bathroom', 'Desk & Chair', 'Smart TV'], image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800' },
      { name: 'Premium Studio', size: '20 sqm', pricePerWeek: 520, amenities: ['Double Bed', 'Full Kitchenette', 'Private Bathroom', 'Living Area', 'Views'], image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800' },
    ],
    amenities: premiumAmenities,
    billsIncluded: arkBills,
    transportLinks: [
      { name: 'Canary Wharf Station', distance: '0.6 mi', type: 'train', time: '12 min walk' },
      { name: 'Heron Quays DLR', distance: '0.4 mi', type: 'train', time: '8 min walk' },
    ],
    nearbyAttractions: [
      { name: 'Museum of London Docklands', category: 'Culture', distance: '0.8 mi' },
    ],
    faqs: [],
    reviews: [],
    specialOffers: [],
  },
  'ARK-WEM': {
    description: 'A premium co-living space in Wembley, London. Designed for modern urbanites, ARK Wembley offers a seamless blend of private living and vibrant community spaces, including a wellness studio and rooftop terrace.',
    totalBeds: 500,
    yearBuilt: '2023',
    galleryImages: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    ],
    roomTypes: [
      { name: 'Classic Studio', size: '20 sqm', pricePerWeek: 392, amenities: ['Double Bed', 'Kitchenette', 'Private Bathroom', 'Smart TV'], image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800' },
      { name: 'Premium Studio', size: '28 sqm', pricePerWeek: 472, amenities: ['Double Bed', 'Large Ensuite', 'Full Kitchenette', 'Living Area'], image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' },
    ],
    amenities: [
      { icon: '🏋️', label: 'Gym & Wellness Studio' },
      { icon: '🌇', label: 'Rooftop Terrace' },
      { icon: '📚', label: 'Co-working Spaces' },
      { icon: '🎬', label: 'Media Room' },
      { icon: '🥘', label: 'Communal Kitchen' },
      { icon: '🏢', label: '24/7 On Site Team' },
    ],
    billsIncluded: arkBills,
    transportLinks: [
      { name: 'Wembley Park Station', distance: '0.5 mi', type: 'train', time: '10 min walk' },
      { name: 'Wembley Stadium Station', distance: '0.2 mi', type: 'train', time: '4 min walk' },
    ],
    nearbyAttractions: [
      { name: 'Wembley Stadium', category: 'Leisure', distance: '0.3 mi' },
      { name: 'London Designer Outlet', category: 'Shopping', distance: '0.4 mi' },
    ],
    faqs: [],
    reviews: [],
    specialOffers: [],
  },
  'IQ-VEGA': {
    description: 'Modern student living in Vauxhall, iQ Vega Residence offers high-standard studios and en-suites with breath-taking views from its 20th-floor Sky Lounge. Perfect for students at KCL, UCL, and LCC.',
    totalBeds: 350,
    yearBuilt: '2022',
    galleryImages: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200'],
    roomTypes: [
      { name: 'Bronze En Suite', size: '13 sqm', pricePerWeek: 453, amenities: ['Small Double Bed', 'Private Bathroom', 'Shared Kitchen'], image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800' },
      { name: 'Bronze Studio', size: '18 sqm', pricePerWeek: 508, amenities: ['Double Bed', 'Private Kitchen', 'Private Bathroom'], image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800' },
    ],
    amenities: [
      { icon: '☁️', label: 'Sky Lounge (20th Floor)' },
      { icon: '🏋️', label: 'On-site Gym' },
      { icon: '🎬', label: 'Cinema Room' },
      { icon: '🎮', label: 'Games Room' },
      { icon: '📚', label: 'Study Spaces' },
    ],
    billsIncluded: standardBills,
    transportLinks: [
      { name: 'Vauxhall Station', distance: '0.2 mi', type: 'train', time: '4 min walk' },
    ],
    nearbyAttractions: [
      { name: 'The Oval', category: 'Leisure', distance: '0.6 mi' },
    ],
    faqs: [],
    reviews: [],
    specialOffers: [],
  },
  'IQ-PARIS': {
    description: 'Located in the heart of Southwark, iQ Paris Gardens provides luxury student accommodation with a stunning rooftop terrace offering views of St Paul\'s and the Shard.',
    totalBeds: 280,
    yearBuilt: '2021',
    galleryImages: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200'],
    roomTypes: [
      { name: 'Bronze En Suite', size: '14 sqm', pricePerWeek: 415, amenities: ['Double Bed', 'Private Bathroom', 'Shared Kitchen'], image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800' },
      { name: 'Silver Studio', size: '20 sqm', pricePerWeek: 515, amenities: ['Double Bed', 'Private Kitchen', 'Private Bathroom'], image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800' },
    ],
    amenities: [
      { icon: '🌇', label: 'Rooftop Terrace' },
      { icon: '🏋️', label: 'Gym' },
      { icon: '🎬', label: 'Cinema' },
      { icon: '🛋️', label: 'Social Hub' },
    ],
    billsIncluded: standardBills,
    transportLinks: [
      { name: 'Southwark Station', distance: '0.3 mi', type: 'train', time: '6 min walk' },
      { name: 'Waterloo Station', distance: '0.6 mi', type: 'train', time: '12 min walk' },
    ],
    nearbyAttractions: [
      { name: 'Tate Modern', category: 'Culture', distance: '0.5 mi' },
    ],
    faqs: [],
    reviews: [],
    specialOffers: [],
  },
  'AL-STA': {
    description: 'Station Court offers affordable student living in Tottenham with a great community atmosphere. Well-connected to central London and local universities.',
    totalBeds: 200,
    yearBuilt: '2020',
    galleryImages: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200'],
    roomTypes: [
      { name: 'Standard En Suite', size: '12 sqm', pricePerWeek: 210, amenities: ['Single Bed', 'Private Bathroom', 'Shared Kitchen'], image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800' },
    ],
    amenities: standardAmenities,
    billsIncluded: standardBills,
    transportLinks: [
      { name: 'Seven Sisters Station', distance: '0.4 mi', type: 'train', time: '8 min walk' },
    ],
    nearbyAttractions: [
      { name: 'Tottenham Hotspur Stadium', category: 'Leisure', distance: '1.2 mi' },
    ],
    faqs: [],
    reviews: [],
    specialOffers: [],
  },
  'AL-LC-1': {
    description: 'Chapter Aldgate offers modern, high-standard student living in one of London\'s most vibrant areas. Close to the City of London and multiple university campuses, it provides a perfect base for focused study and urban exploration.',
    totalBeds: 250,
    yearBuilt: '2021',
    galleryImages: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200'],
    roomTypes: [
      { name: 'Studio', size: '18 sqm', pricePerWeek: 285, amenities: ['Double Bed', 'Kitchenette', 'Private Bathroom'], image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800' },
    ],
    amenities: standardAmenities,
    billsIncluded: standardBills,
    transportLinks: [
      { name: 'Aldgate East Station', distance: '0.2 mi', type: 'train', time: '4 min walk' },
    ],
    nearbyAttractions: [
      { name: 'Spitalfields Market', category: 'Shopping', distance: '0.5 mi' },
    ],
    faqs: [],
    reviews: [],
    specialOffers: [],
  },
};
