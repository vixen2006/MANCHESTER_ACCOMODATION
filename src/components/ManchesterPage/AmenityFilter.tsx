import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import {
  AMENITY_CATEGORIES,
  getAmenitiesByCategory,
  type AmenityCategory,
  type AmenityLocation,
} from '../../data/manchesterData';

interface AmenityFilterProps {
  onSelectAmenity: (amenity: AmenityLocation | null) => void;
  selectedAmenity: AmenityLocation | null;
}

export default function AmenityFilter({ onSelectAmenity, selectedAmenity }: AmenityFilterProps) {
  const [activeCategory, setActiveCategory] = useState<AmenityCategory | null>('college');
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    if (dropdownOpen && dropdownRef.current) {
      gsap.from(dropdownRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [dropdownOpen, activeCategory]);

  const handleCategoryClick = (cat: AmenityCategory) => {
    if (activeCategory === cat) {
      setActiveCategory(null);
      setDropdownOpen(false);
      onSelectAmenity(null);
    } else {
      setActiveCategory(cat);
      setDropdownOpen(true);
    }
  };

  const handleLocationClick = (loc: AmenityLocation) => {
    onSelectAmenity(loc);
    setDropdownOpen(false);
  };

  const locations = activeCategory ? getAmenitiesByCategory(activeCategory) : [];

  return (
    <section id="amenity-filter" className="relative py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">
              Find By Amenity
            </span>
          </h2>
          <p className="text-text/50 mt-3 text-sm md:text-base">
            Select a category to discover accommodations within 5–10 km
          </p>
        </div>

        {/* Category Buttons */}
        <div ref={buttonsRef} className="flex flex-wrap justify-center gap-3 md:gap-4">
          {AMENITY_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryClick(cat.key)}
              className={`glow-btn ${
                activeCategory === cat.key ? 'glow-btn-active' : 'glow-btn-outline'
              } px-5 py-3 md:px-7 md:py-4 rounded-xl text-sm md:text-base font-medium flex items-center gap-2 transition-all duration-300`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Dropdown Locations */}
        {dropdownOpen && activeCategory && (
          <div ref={dropdownRef} className="mt-8">
            <div className="max-w-3xl mx-auto glass-card rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-text/40 uppercase tracking-widest mb-4">
                {AMENITY_CATEGORIES.find((c) => c.key === activeCategory)?.icon}{' '}
                {AMENITY_CATEGORIES.find((c) => c.key === activeCategory)?.label} in Manchester
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {locations.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => handleLocationClick(loc)}
                    className={`text-left p-3 rounded-xl transition-all duration-300 ${
                      selectedAmenity?.name === loc.name
                        ? 'bg-[#dc2626]/30 border border-[#ef4444]/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                        : 'bg-white/5 border border-white/10 hover:border-[#ef4444]/30 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-sm font-medium text-text/80">{loc.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedAmenity && (
          <div className="mt-6 text-center">
            <p className="text-text/50 text-sm">
              Showing accommodations near{' '}
              <span className="text-[#ef4444] font-semibold">{selectedAmenity.name}</span>
            </p>
            <button
              onClick={() => {
                onSelectAmenity(null);
                setActiveCategory(null);
                setDropdownOpen(false);
              }}
              className="mt-2 text-xs text-text/30 underline hover:text-text/60 transition-colors"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
