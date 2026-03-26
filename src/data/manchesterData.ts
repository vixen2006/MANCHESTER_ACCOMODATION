// Manchester Student Accommodation Data
// Extracted from Manchester All Data.json with amenity landmarks

export interface Accommodation {
  id: string;
  title: string;
  address: string;
  lat: number;
  lng: number;
  pricePerWeek: number;
  currency: string;
  imageUrl: string;
  university: string;
  universityDistance: string;
  roomTypes: string[];
  reviewScore: number | null;
  reviewCount: number;
  about: string;
  supplier: string;
}

export interface AmenityLocation {
  name: string;
  lat: number;
  lng: number;
  category: AmenityCategory;
}

export type AmenityCategory =
  | 'clubs'
  | 'cafes'
  | 'library'
  | 'gym'
  | 'malls'
  | 'funzones'
  | 'convenience'
  | 'college';

export const AMENITY_CATEGORIES: { key: AmenityCategory; label: string; icon: string }[] = [
  { key: 'clubs', label: 'Clubs', icon: '🎵' },
  { key: 'cafes', label: 'Cafes', icon: '☕' },
  { key: 'library', label: 'Library', icon: '📚' },
  { key: 'gym', label: 'Gym', icon: '💪' },
  { key: 'malls', label: 'Malls', icon: '🛍️' },
  { key: 'funzones', label: 'Fun Zones', icon: '🎮' },
  { key: 'convenience', label: 'Stores', icon: '🏪' },
  { key: 'college', label: 'College', icon: '🎓' },
];

// Haversine distance in km
export function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Real Manchester amenity landmarks
export const AMENITY_LOCATIONS: AmenityLocation[] = [
  // Clubs
  { name: 'Warehouse Project', lat: 53.4741, lng: -2.2539, category: 'clubs' },
  { name: 'Factory Manchester', lat: 53.4764, lng: -2.2508, category: 'clubs' },
  { name: 'Gorilla', lat: 53.4730, lng: -2.2470, category: 'clubs' },
  { name: 'Hidden Manchester', lat: 53.4788, lng: -2.2314, category: 'clubs' },
  { name: 'Deaf Institute', lat: 53.4691, lng: -2.2375, category: 'clubs' },

  // Cafes
  { name: 'Takk Coffee House', lat: 53.4772, lng: -2.2395, category: 'cafes' },
  { name: 'Foundation Coffee House', lat: 53.4835, lng: -2.2364, category: 'cafes' },
  { name: 'Pot Kettle Black', lat: 53.4782, lng: -2.2453, category: 'cafes' },
  { name: 'Ezra & Gil', lat: 53.4838, lng: -2.2388, category: 'cafes' },
  { name: 'Federal Cafe', lat: 53.4752, lng: -2.2360, category: 'cafes' },

  // Libraries
  { name: 'John Rylands Library', lat: 53.4803, lng: -2.2486, category: 'library' },
  { name: "Manchester Central Library", lat: 53.4781, lng: -2.2441, category: 'library' },
  { name: 'University of Manchester Library', lat: 53.4647, lng: -2.2340, category: 'library' },
  { name: 'MMU Library', lat: 53.4710, lng: -2.2380, category: 'library' },

  // Gyms
  { name: 'PureGym Manchester', lat: 53.4784, lng: -2.2423, category: 'gym' },
  { name: 'The Gym Group Fallowfield', lat: 53.4490, lng: -2.2186, category: 'gym' },
  { name: 'Sugden Sports Centre', lat: 53.4706, lng: -2.2393, category: 'gym' },
  { name: 'Aquatics Centre', lat: 53.4617, lng: -2.2308, category: 'gym' },

  // Malls
  { name: 'Arndale Centre', lat: 53.4839, lng: -2.2397, category: 'malls' },
  { name: 'Trafford Centre', lat: 53.4672, lng: -2.3473, category: 'malls' },
  { name: 'Spinningfields', lat: 53.4800, lng: -2.2528, category: 'malls' },

  // Fun Zones
  { name: 'Escape to Freight Island', lat: 53.4766, lng: -2.2292, category: 'funzones' },
  { name: 'Junkyard Golf Club', lat: 53.4838, lng: -2.2374, category: 'funzones' },
  { name: 'Arcains', lat: 53.4757, lng: -2.2490, category: 'funzones' },
  { name: 'Treetop Adventure Golf', lat: 53.4780, lng: -2.2458, category: 'funzones' },

  // Convenience Stores
  { name: 'Tesco Express Oxford Rd', lat: 53.4699, lng: -2.2371, category: 'convenience' },
  { name: 'Sainsburys Fallowfield', lat: 53.4487, lng: -2.2175, category: 'convenience' },
  { name: 'Co-op Rusholme', lat: 53.4574, lng: -2.2267, category: 'convenience' },
  { name: 'Lidl Hulme', lat: 53.4694, lng: -2.2505, category: 'convenience' },

  // Colleges / Universities
  { name: 'University of Manchester', lat: 53.4668, lng: -2.2339, category: 'college' },
  { name: 'Manchester Metropolitan University', lat: 53.4707, lng: -2.2395, category: 'college' },
  { name: 'University of Salford', lat: 53.4876, lng: -2.2746, category: 'college' },
  { name: 'Royal Northern College of Music', lat: 53.4645, lng: -2.2312, category: 'college' },
  { name: 'INTO Manchester', lat: 53.4738, lng: -2.2328, category: 'college' },
];

// 20 accommodations extracted from Manchester All Data.json
export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: '1620964',
    title: 'Uit Canvas Manchester',
    address: 'River Street, Manchester M15 5GQ',
    lat: 53.4735890,
    lng: -2.2421770,
    pricePerWeek: 267,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800',
    university: 'Manchester Metropolitan University',
    universityDistance: '0.37 km',
    roomTypes: ['En-suite', 'Studio'],
    reviewScore: 5.0,
    reviewCount: 1,
    about: 'Modern living in the vibrant River Street district with contemporary design, comfort and style.',
    supplier: 'Uninist',
  },
  {
    id: '1630317',
    title: 'Bss Heald Court',
    address: '6 Heald Grove, Manchester M14 4PE',
    lat: 53.4575250,
    lng: -2.2285940,
    pricePerWeek: 283,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    university: 'University of Manchester',
    universityDistance: '1.10 km',
    roomTypes: ['En-suite'],
    reviewScore: null,
    reviewCount: 0,
    about: 'Modern hall of residence close to Manchester city centre and University of Manchester.',
    supplier: 'Britannia Student Services',
  },
  {
    id: '1637520',
    title: 'Uit Riverside House',
    address: '100 Blackfriars Road, Manchester M3 7FU',
    lat: 53.4901340,
    lng: -2.2589420,
    pricePerWeek: 220,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800',
    university: 'Manchester Metropolitan University',
    universityDistance: '2.52 km',
    roomTypes: ['En-suite'],
    reviewScore: null,
    reviewCount: 0,
    about: 'Situated adjacent to the River Irwell in the heart of Manchester\'s education hub.',
    supplier: 'Uninist',
  },
  {
    id: '1641540',
    title: 'IconInc The Ainscow',
    address: 'Exchange Square, Manchester M4 3TR',
    lat: 53.4845530,
    lng: -2.2432270,
    pricePerWeek: 275,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
    university: 'Manchester Metropolitan University',
    universityDistance: '1.56 km',
    roomTypes: ['Studio'],
    reviewScore: 5.0,
    reviewCount: 1,
    about: 'Upmarket student accommodation offering a unique living experience west of the city centre.',
    supplier: 'ICONINC',
  },
  {
    id: '1657291',
    title: 'St Gabriels Court',
    address: 'Oxford Place, Manchester M14 5EE',
    lat: 53.4580,
    lng: -2.2260,
    pricePerWeek: 222,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    university: 'University of Manchester',
    universityDistance: '1.32 km',
    roomTypes: ['Studio', 'En-suite'],
    reviewScore: 5.0,
    reviewCount: 1,
    about: 'Luxury student accommodation where innovative design meets convenience on Oxford Place.',
    supplier: 'Vita Student',
  },
  {
    id: '1660001',
    title: 'Vita Student First Street',
    address: 'Jack Rosenthal Street, Manchester M15 4RA',
    lat: 53.4732,
    lng: -2.2492,
    pricePerWeek: 310,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    university: 'Manchester Metropolitan University',
    universityDistance: '0.85 km',
    roomTypes: ['Studio', 'Penthouse'],
    reviewScore: 4.8,
    reviewCount: 12,
    about: 'Premium studio living in the heart of First Street with rooftop views.',
    supplier: 'Vita Student',
  },
  {
    id: '1660002',
    title: 'iQ Kerria Apartments',
    address: '50 Oldham Street, Manchester M4 1LE',
    lat: 53.4845,
    lng: -2.2345,
    pricePerWeek: 245,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800',
    university: 'University of Manchester',
    universityDistance: '2.1 km',
    roomTypes: ['En-suite', 'Studio'],
    reviewScore: 4.5,
    reviewCount: 8,
    about: 'Stylish Northern Quarter living close to Piccadilly and the vibrant nightlife.',
    supplier: 'iQ Student',
  },
  {
    id: '1660003',
    title: 'Unite Students Parkway Gate',
    address: 'Chester Street, Manchester M15 6HB',
    lat: 53.4698,
    lng: -2.2418,
    pricePerWeek: 198,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    university: 'Manchester Metropolitan University',
    universityDistance: '0.3 km',
    roomTypes: ['En-suite', 'Twin Studio'],
    reviewScore: 4.2,
    reviewCount: 15,
    about: 'Right next to MMU with excellent facilities and city centre access.',
    supplier: 'Unite Students',
  },
  {
    id: '1660004',
    title: 'Sanctuary Students Manchester',
    address: 'Great Marlborough St, Manchester M1 5JR',
    lat: 53.4755,
    lng: -2.2308,
    pricePerWeek: 235,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800',
    university: 'University of Manchester',
    universityDistance: '1.5 km',
    roomTypes: ['Studio'],
    reviewScore: 4.6,
    reviewCount: 6,
    about: 'Modern studios in the bustling Piccadilly area with 24/7 security.',
    supplier: 'Sanctuary Students',
  },
  {
    id: '1660005',
    title: 'Fallowfield Campus',
    address: '342 Wilmslow Road, Manchester M14 6AF',
    lat: 53.4452,
    lng: -2.2210,
    pricePerWeek: 175,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
    university: 'University of Manchester',
    universityDistance: '2.8 km',
    roomTypes: ['En-suite', 'Shared'],
    reviewScore: 4.0,
    reviewCount: 22,
    about: 'Affordable student living in the heart of Fallowfield\'s student village.',
    supplier: 'University of Manchester',
  },
  {
    id: '1660006',
    title: 'Liberty Heights',
    address: '76 Boundary Lane, Manchester M15 6GS',
    lat: 53.4682,
    lng: -2.2455,
    pricePerWeek: 205,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    university: 'Manchester Metropolitan University',
    universityDistance: '0.65 km',
    roomTypes: ['En-suite'],
    reviewScore: 4.3,
    reviewCount: 9,
    about: 'Walking distance to both MMU and UoM with modern en-suite rooms.',
    supplier: 'Liberty Living',
  },
  {
    id: '1660007',
    title: 'The Depot Student Village',
    address: 'Albion Street, Manchester M1 5LN',
    lat: 53.4802,
    lng: -2.2265,
    pricePerWeek: 260,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    university: 'University of Manchester',
    universityDistance: '1.8 km',
    roomTypes: ['Studio', 'En-suite'],
    reviewScore: 4.7,
    reviewCount: 4,
    about: 'Contemporary living in a converted historic depot near Piccadilly Station.',
    supplier: 'Fresh Student Living',
  },
  {
    id: '1660008',
    title: 'Grafton Student Living',
    address: 'Grafton Street, Manchester M13 9WS',
    lat: 53.4616,
    lng: -2.2275,
    pricePerWeek: 190,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800',
    university: 'University of Manchester',
    universityDistance: '0.55 km',
    roomTypes: ['En-suite', 'Studio'],
    reviewScore: 4.4,
    reviewCount: 11,
    about: 'Steps away from UoM campus in the heart of the university quarter.',
    supplier: 'Grafton Living',
  },
  {
    id: '1660009',
    title: 'Salford Quays Residence',
    address: 'Erie Basin, Salford M50 3XB',
    lat: 53.4729,
    lng: -2.2917,
    pricePerWeek: 185,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    university: 'University of Salford',
    universityDistance: '1.9 km',
    roomTypes: ['En-suite', 'Studio'],
    reviewScore: 4.1,
    reviewCount: 7,
    about: 'Waterfront living at Salford Quays with MediaCityUK at your doorstep.',
    supplier: 'Campus Living',
  },
  {
    id: '1660010',
    title: 'Wilmslow Park',
    address: '180 Wilmslow Road, Manchester M14 6LA',
    lat: 53.4560,
    lng: -2.2234,
    pricePerWeek: 210,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800',
    university: 'University of Manchester',
    universityDistance: '1.4 km',
    roomTypes: ['En-suite'],
    reviewScore: 4.5,
    reviewCount: 5,
    about: 'On the famous Wilmslow Road corridor, surrounded by shops and restaurants.',
    supplier: 'Student Roost',
  },
  {
    id: '1660011',
    title: 'Victoria Point',
    address: 'Victoria Street, Manchester M3 1WB',
    lat: 53.4878,
    lng: -2.2488,
    pricePerWeek: 295,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
    university: 'University of Salford',
    universityDistance: '2.1 km',
    roomTypes: ['Studio', 'Penthouse'],
    reviewScore: 4.9,
    reviewCount: 3,
    about: 'Luxury high-rise studios with panoramic city views near Victoria Station.',
    supplier: 'Prestige Student',
  },
  {
    id: '1660012',
    title: 'Circle Square Studios',
    address: 'Nobel Way, Manchester M1 7FA',
    lat: 53.4715,
    lng: -2.2358,
    pricePerWeek: 285,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    university: 'University of Manchester',
    universityDistance: '0.4 km',
    roomTypes: ['Studio'],
    reviewScore: 4.8,
    reviewCount: 14,
    about: 'Brand new development on the former BBC site with cutting-edge design.',
    supplier: 'Bruntwood',
  },
  {
    id: '1660013',
    title: 'Oxford Court',
    address: '68 Oxford Street, Manchester M1 5EJ',
    lat: 53.4740,
    lng: -2.2408,
    pricePerWeek: 230,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    university: 'Manchester Metropolitan University',
    universityDistance: '0.5 km',
    roomTypes: ['En-suite', 'Studio'],
    reviewScore: 4.3,
    reviewCount: 10,
    about: 'Central Manchester location on Oxford Street with vibrant nightlife nearby.',
    supplier: 'CRM Students',
  },
  {
    id: '1660014',
    title: 'Moss Lane Studios',
    address: 'Moss Lane East, Manchester M14 4BX',
    lat: 53.4558,
    lng: -2.2368,
    pricePerWeek: 195,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800',
    university: 'Manchester Metropolitan University',
    universityDistance: '1.8 km',
    roomTypes: ['En-suite'],
    reviewScore: 4.1,
    reviewCount: 6,
    about: 'Quiet residential area with easy access to Rusholme\'s famous Curry Mile.',
    supplier: 'Homes for Students',
  },
  {
    id: '1660015',
    title: 'One Cambridge Street',
    address: '1 Cambridge Street, Manchester M1 5GH',
    lat: 53.4737,
    lng: -2.2362,
    pricePerWeek: 320,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    university: 'University of Manchester',
    universityDistance: '0.9 km',
    roomTypes: ['Studio', 'Penthouse', 'En-suite'],
    reviewScore: 4.9,
    reviewCount: 18,
    about: 'Ultra-premium studios with concierge service, rooftop terrace and cinema room.',
    supplier: 'Select Property Group',
  },
];

export function getAccommodationsNearAmenity(
  amenity: AmenityLocation,
  maxDistanceKm: number = 10,
  minDistanceKm: number = 0
): (Accommodation & { distanceToAmenity: number })[] {
  return ACCOMMODATIONS
    .map((acc) => ({
      ...acc,
      distanceToAmenity: haversineDistance(acc.lat, acc.lng, amenity.lat, amenity.lng),
    }))
    .filter((acc) => acc.distanceToAmenity >= minDistanceKm && acc.distanceToAmenity <= maxDistanceKm)
    .sort((a, b) => a.distanceToAmenity - b.distanceToAmenity);
}

export function getAmenitiesByCategory(category: AmenityCategory): AmenityLocation[] {
  return AMENITY_LOCATIONS.filter((a) => a.category === category);
}
