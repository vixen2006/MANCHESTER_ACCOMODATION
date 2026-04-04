import { useState, Suspense } from 'react';
import ManchesterHero from '../components/ManchesterPage/ManchesterHero';
import AmenityFilter from '../components/ManchesterPage/AmenityFilter';
import AccommodationGrid from '../components/ManchesterPage/AccommodationGrid';
import LifestyleBanner from '../components/ManchesterPage/LifestyleBanner';
import JourneySection from '../components/ManchesterPage/JourneySection';
import InteractiveMapSection from '../components/ManchesterPage/InteractiveMapSection';
import AmenitiesGrid from '../components/common/AmenitiesGrid';
import {
  ACCOMMODATIONS,
  getAccommodationsNearAmenity,
  type AmenityLocation,
} from '../data/manchesterData';

export default function ManchesterPage() {
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityLocation | null>(null);

  const filteredAccommodations = selectedAmenity
    ? getAccommodationsNearAmenity(selectedAmenity, 10, 0)
    : ACCOMMODATIONS.map((a) => ({ ...a, distanceToAmenity: undefined }));

  const gridTitle = selectedAmenity
    ? `Accommodations near ${selectedAmenity.name}`
    : 'All Accommodations';

  return (
    <div className="manchester-page min-h-screen bg-[#0a0a0a] text-[#e7ebf3]">
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center bg-[#0a0a0a]">
            <div className="text-center">
              <div className="loading-spinner mb-4" />
              <p className="text-text/40 text-sm tracking-widest uppercase">Loading Manchester</p>
            </div>
          </div>
        }
      >
        <ManchesterHero />
      </Suspense>

      <AmenitiesGrid />

      <AmenityFilter onSelectAmenity={setSelectedAmenity} selectedAmenity={selectedAmenity} />

      <LifestyleBanner />

      <AccommodationGrid
        accommodations={filteredAccommodations as any}
        title={gridTitle}
      />

      <JourneySection />

      <InteractiveMapSection />

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-glass-border">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-lg font-bold bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent">
            Manchester Student Accommodation
          </h3>
          <p className="text-text/30 text-sm mt-2">Find your perfect student home in Manchester</p>
          <div className="flex justify-center gap-6 mt-6">
            <span className="text-text/20 text-xs">🏠 20+ Properties</span>
            <span className="text-text/20 text-xs">📍 8 Amenity Categories</span>
            <span className="text-text/20 text-xs">⭐ Rated 8/10</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
