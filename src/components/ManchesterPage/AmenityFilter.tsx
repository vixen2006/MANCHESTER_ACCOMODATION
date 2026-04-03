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
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            <span className="text-text">
              Find By <span className="text-primary tracking-tight">Amenity</span>
            </span>
          </h2>
          <p className="text-text-secondary mt-3 text-sm md:text-lg max-w-2xl mx-auto">
            Select a category below to discover premium accommodations within close proximity to your favorite lifestyle spots.
          </p>
        </div>

        {/* Category Buttons */}
        <div ref={buttonsRef} className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {AMENITY_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryClick(cat.key)}
              className={`px-5 py-3 md:px-6 md:py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
                activeCategory === cat.key 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105 border border-primary' 
                  : 'glass-card text-text border border-glass-border hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Dropdown Locations */}
        {dropdownOpen && activeCategory && (
          <div ref={dropdownRef} className="mt-8 relative z-20">
            <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 border border-glass-border shadow-2xl relative overflow-hidden">
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="text-xl">{AMENITY_CATEGORIES.find((c) => c.key === activeCategory)?.icon}</span>
                {AMENITY_CATEGORIES.find((c) => c.key === activeCategory)?.label} Locations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
                {locations.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => handleLocationClick(loc)}
                    className={`text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                      selectedAmenity?.name === loc.name
                        ? 'bg-primary/10 border border-primary/50 shadow-[0_0_15px_rgba(37,99,235,0.15)] ring-1 ring-primary'
                        : 'bg-background/40 border border-glass-border hover:border-primary/40 hover:bg-primary/5'
                    }`}
                  >
                    <span className={`text-sm font-semibold transition-colors ${selectedAmenity?.name === loc.name ? 'text-primary' : 'text-text group-hover:text-primary/80'}`}>{loc.name}</span>
                    <span className={`text-xs opacity-0 transition-opacity ${selectedAmenity?.name === loc.name ? 'opacity-100 text-primary' : 'group-hover:opacity-50'}`}>✓</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedAmenity && (
          <div className="mt-8 text-center bg-primary/5 border border-primary/20 rounded-full px-6 py-3 inline-flex items-center gap-4 mx-auto w-auto absolute left-1/2 -translate-x-1/2">
            <p className="text-text-secondary text-sm font-medium">
              Showing spots near <span className="text-primary font-bold">{selectedAmenity.name}</span>
            </p>
            <div className="w-px h-4 bg-primary/30"></div>
            <button
              onClick={() => {
                onSelectAmenity(null);
                setActiveCategory(null);
                setDropdownOpen(false);
              }}
              className="text-xs font-bold text-text-secondary hover:text-primary transition-colors uppercase tracking-wider"
            >
              Clear Filter ✕
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
