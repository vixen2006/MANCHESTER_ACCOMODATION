import { useState, Suspense } from 'react';
import LondonHero from '../components/LondonPage/LondonHero';
import LondonAmenityFilter from '../components/LondonPage/LondonAmenityFilter';
import AccommodationGrid from '../components/ManchesterPage/AccommodationGrid';
import LifestyleBanner from '../components/ManchesterPage/LifestyleBanner';
import JourneySection from '../components/ManchesterPage/JourneySection';
import LondonInteractiveMapSection from '../components/LondonPage/LondonInteractiveMapSection';
import LondonAmenitiesGrid from '../components/LondonPage/LondonAmenitiesGrid';
import {
  LONDON_ACCOMMODATIONS,
  getLondonAccommodationsNearAmenity,
} from '../data/londonData';
import type { AmenityLocation } from '../data/manchesterData';

export default function LondonPage() {
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityLocation | null>(null);

  const filteredAccommodations = selectedAmenity
    ? getLondonAccommodationsNearAmenity(selectedAmenity, 10, 0)
    : LONDON_ACCOMMODATIONS.map((a) => ({ ...a, distanceToAmenity: undefined }));

  const gridTitle = selectedAmenity
    ? `Accommodations near ${selectedAmenity.name}`
    : 'Premium London Properties';

  return (
    <div className="london-page min-h-screen bg-[#0a0a0a] text-[#fdf8f0]">
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center bg-[#0a0a0a]">
            <div className="text-center">
              <div className="loading-spinner mb-4 border-amber-600" />
              <p className="text-amber-500/40 text-sm tracking-widest uppercase">Loading London</p>
            </div>
          </div>
        }
      >
        <LondonHero />
      </Suspense>

      <LondonAmenitiesGrid />

      <LondonInteractiveMapSection />

      <div id="amenity-filter">
        <LondonAmenityFilter onSelectAmenity={setSelectedAmenity} selectedAmenity={selectedAmenity} />
      </div>

      <LifestyleBanner />

      <AccommodationGrid
        accommodations={filteredAccommodations as any}
        title={gridTitle}
      />

      <JourneySection />

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-lg font-bold bg-gradient-to-r from-[#d97706] to-[#f59e0b] bg-clip-text text-transparent">
            London Premium Co-living
          </h3>
          <p className="text-text/30 text-sm mt-2">Find your perfect home in the heart of London</p>
          <div className="flex justify-center gap-6 mt-6">
            <span className="text-text/20 text-xs">🏠 {LONDON_ACCOMMODATIONS.length}+ Properties</span>
            <span className="text-text/20 text-xs">📍 Global Financial Hub</span>
            <span className="text-text/20 text-xs">⭐ Rated 9/10</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
