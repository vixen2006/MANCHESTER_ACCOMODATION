import { Accommodation, AmenityLocation, AmenityCategory, haversineDistance } from './manchesterData';

export const LONDON_AMENITY_LOCATIONS: AmenityLocation[] = [
  // Clubs
  { name: 'Printworks London', lat: 51.4975, lng: -0.0436, category: 'clubs' },
  { name: 'Fabric London', lat: 51.5196, lng: -0.1024, category: 'clubs' },
  { name: 'Ministry of Sound', lat: 51.4978, lng: -0.0994, category: 'clubs' },
  { name: 'XOYO', lat: 51.5262, lng: -0.0864, category: 'clubs' },
  { name: 'Studio 338', lat: 51.4913, lng: 0.0006, category: 'clubs' },

  // Cafes
  { name: 'Monmouth Coffee', lat: 51.5134, lng: -0.1264, category: 'cafes' },
  { name: 'The Breakfast Club', lat: 51.5242, lng: -0.0764, category: 'cafes' },
  { name: 'Ozone Coffee Roasters', lat: 51.5262, lng: -0.0874, category: 'cafes' },
  { name: 'Dishoom Shoreditch', lat: 51.5244, lng: -0.0768, category: 'cafes' },
  { name: 'Origin Coffee', lat: 51.5232, lng: -0.0760, category: 'cafes' },

  // Libraries
  { name: 'British Library', lat: 51.5299, lng: -0.1276, category: 'library' },
  { name: 'Senate House Library', lat: 51.5212, lng: -0.1298, category: 'library' },
  { name: 'Barbican Library', lat: 51.5202, lng: -0.0924, category: 'library' },
  { name: 'Idea Store Canary Wharf', lat: 51.5052, lng: -0.0178, category: 'library' },

  // Gyms
  { name: 'Gymbox Canary Wharf', lat: 51.5034, lng: -0.0194, category: 'gym' },
  { name: 'PureGym London Tower Hill', lat: 51.5078, lng: -0.0764, category: 'gym' },
  { name: 'The Gym Group Stratford', lat: 51.5422, lng: -0.0074, category: 'gym' },
  { name: 'Third Space Canary Wharf', lat: 51.5042, lng: -0.0182, category: 'gym' },

  // Malls
  { name: 'Westfield Stratford City', lat: 51.5432, lng: -0.0064, category: 'malls' },
  { name: 'Westfield London (White City)', lat: 51.5068, lng: -0.2212, category: 'malls' },
  { name: 'Canary Wharf Shopping Centre', lat: 51.5048, lng: -0.0192, category: 'malls' },
  { name: 'Icon Outlet at The O2', lat: 51.5032, lng: 0.0032, category: 'malls' },

  // Fun Zones
  { name: 'O2 Arena', lat: 51.5030, lng: 0.0030, category: 'funzones' },
  { name: 'Electronic Theatre Shoreditch', lat: 51.5234, lng: -0.0772, category: 'funzones' },
  { name: 'Junkyard Golf Shoreditch', lat: 51.5222, lng: -0.0714, category: 'funzones' },
  { name: 'Sky Garden', lat: 51.5111, lng: -0.0835, category: 'funzones' },

  // Convenience Stores
  { name: 'Waitrose Canary Wharf', lat: 51.5062, lng: -0.0198, category: 'convenience' },
  { name: 'M&S Food Stratford City', lat: 51.5438, lng: -0.0068, category: 'convenience' },
  { name: 'Tesco Express Greenwich', lat: 51.4812, lng: -0.0084, category: 'convenience' },
  { name: 'Sainsburys Local Shoreditch', lat: 51.5230, lng: -0.0770, category: 'convenience' },

  // Colleges / Universities
  { name: 'UCL (University College London)', lat: 51.5246, lng: -0.1340, category: 'college' },
  { name: 'King\'s College London', lat: 51.5115, lng: -0.1160, category: 'college' },
  { name: 'Queen Mary University', lat: 51.5231, lng: -0.0402, category: 'college' },
  { name: 'LSE (London School of Economics)', lat: 51.5144, lng: -0.1165, category: 'college' },
];

import { LONDON_PROPERTY_DETAILS } from './londonPropertyDetails';

// Default details fallback
const defaultDetails = {
  description: '',
  totalBeds: 150,
  yearBuilt: '2020',
  galleryImages: [],
  roomTypes: [],
  amenities: [
    { icon: '📚', label: 'Study Room' },
    { icon: '🛋️', label: 'Common Room' },
    { icon: '🧺', label: 'Laundry Room' },
    { icon: '📶', label: 'WiFi Included' },
    { icon: '🔒', label: 'Secure Entry' },
  ],
  billsIncluded: ['Electricity', 'Water', 'Gas', 'WiFi', 'Contents Insurance'],
  transportLinks: [],
  nearbyAttractions: [],
  faqs: [],
  reviews: [],
  specialOffers: [],
};

// Helper to attach details
function withDetails(acc: Omit<Accommodation, 'details'>): Accommodation {
  const details = (LONDON_PROPERTY_DETAILS as any)[acc.id];
  return {
    ...acc,
    details: details
      ? { ...details, description: details.description || acc.about }
      : { ...defaultDetails, description: acc.about } as any,
  };
}

import { EXTRACTED_LONDON_ACCOMMODATIONS_RAW } from './londonAccommodations';

export const LONDON_ACCOMMODATIONS: Accommodation[] = EXTRACTED_LONDON_ACCOMMODATIONS_RAW.map(acc => withDetails(acc));


export function getLondonAmenitiesByCategory(category: AmenityCategory): AmenityLocation[] {
  return LONDON_AMENITY_LOCATIONS.filter((a) => a.category === category);
}

export function getLondonAccommodationsNearAmenity(
  amenity: AmenityLocation,
  maxDistanceKm: number = 10,
  minDistanceKm: number = 0
) {
  return LONDON_ACCOMMODATIONS
    .map((acc) => ({
      ...acc,
      distanceToAmenity: haversineDistance(acc.lat, acc.lng, amenity.lat, amenity.lng),
    }))
    .filter((acc) => acc.distanceToAmenity >= minDistanceKm && acc.distanceToAmenity <= maxDistanceKm)
    .sort((a, b) => a.distanceToAmenity - b.distanceToAmenity);
}
