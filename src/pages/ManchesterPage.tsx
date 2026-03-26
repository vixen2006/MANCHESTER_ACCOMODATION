import { useState, Suspense } from 'react';
import ManchesterHero from '../components/ManchesterPage/ManchesterHero';
import AmenityFilter from '../components/ManchesterPage/AmenityFilter';
import AccommodationGrid from '../components/ManchesterPage/AccommodationGrid';
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

      <AmenityFilter onSelectAmenity={setSelectedAmenity} selectedAmenity={selectedAmenity} />

      <AccommodationGrid
        accommodations={filteredAccommodations as any}
        title={gridTitle}
      />

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-lg font-bold bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">
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
