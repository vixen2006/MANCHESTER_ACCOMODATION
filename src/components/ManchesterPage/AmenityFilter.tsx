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
      gsap.fromTo(dropdownRef.current, 
        { y: -20, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }
      );
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
    <section id="amenity-filter" className="relative py-20 md:py-28 px-4 overflow-hidden">
      {/* Funky Background elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#ffcc4a]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            <span className="text-text">Discover Your </span>
            <span className="bg-gradient-to-r from-primary to-[#ffcc4a] bg-clip-text text-transparent">Lifestyle</span>
          </h2>
          <p className="text-text-secondary mt-3 text-base md:text-xl max-w-2xl mx-auto font-medium">
            Tap a category below to explore premium spots and find accommodations right on their doorstep.
          </p>
        </div>

        {/* Funky Category Grid */}
        <div ref={buttonsRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {AMENITY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => handleCategoryClick(cat.key)}
                className={`group relative overflow-hidden flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl transition-all duration-500 transform ${
                  isActive 
                    ? 'scale-[1.02] -translate-y-2 border-primary shadow-[0_15px_40px_var(--glow-shadow)]' 
                    : 'hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:border-primary/40 glass-card border-glass-border'
                }`}
              >
                {/* Active state animated background */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/30 blur-[20px] rounded-full"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6 ${
                    isActive ? 'bg-primary text-white shadow-lg shadow-primary/40' : 'bg-background/50 backdrop-blur-md shadow-sm border border-glass-border drop-shadow-sm'
                  }`}>
                    {cat.icon}
                  </div>
                  <span className={`font-bold tracking-wide transition-colors duration-300 text-sm md:text-base ${
                    isActive ? 'text-primary' : 'text-text group-hover:text-primary/80'
                  }`}>
                    {cat.label}
                  </span>
                </div>

                {/* Subtle border handling (non-active) */}
                {!isActive && (
                   <div className="absolute inset-0 rounded-3xl border border-white/10 dark:border-white/5 pointer-events-none group-hover:border-primary/20 transition-colors duration-500"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Dropdown Locations */}
        {dropdownOpen && activeCategory && (
          <div ref={dropdownRef} className="mt-12 relative z-20">
            <div className="max-w-4xl mx-auto glass-card rounded-[2.5rem] p-8 md:p-12 border border-glass-border shadow-2xl relative overflow-hidden backdrop-blur-2xl bg-glass">
               {/* Background Glow inside dropdown */}
               <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
               <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ffcc4a]/5 blur-[80px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 relative z-10 gap-4">
                <h3 className="text-sm md:text-base font-black text-primary uppercase tracking-[0.2em] flex items-center gap-3">
                  <span className="text-2xl bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl">
                    {AMENITY_CATEGORIES.find((c) => c.key === activeCategory)?.icon}
                  </span>
                  {AMENITY_CATEGORIES.find((c) => c.key === activeCategory)?.label} Destinations
                </h3>
                <span className="text-xs font-bold text-text-secondary bg-background/50 px-4 py-2 rounded-full border border-glass-border">
                  {locations.length} Locations Found
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 relative z-10">
                {locations.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => handleLocationClick(loc)}
                    className={`text-left p-5 rounded-2xl transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${
                      selectedAmenity?.name === loc.name
                        ? 'bg-primary border border-primary shadow-[0_0_20px_rgba(37,99,235,0.3)] text-white hover:-translate-y-1 transform'
                        : 'bg-background/60 hover:bg-background border border-glass-border hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transform'
                    }`}
                  >
                    <span className={`text-sm md:text-base font-bold relative z-10 transition-colors ${selectedAmenity?.name === loc.name ? 'text-white' : 'text-text group-hover:text-primary'}`}>
                      {loc.name}
                    </span>
                    <span className={`text-base relative z-10 transition-all duration-300 ${selectedAmenity?.name === loc.name ? 'opacity-100 scale-110' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:text-primary'}`}>
                      ✦
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedAmenity && !dropdownOpen && (
          <div className="mt-12 text-center relative z-20">
            <div className="bg-primary/5 border border-primary/20 backdrop-blur-md rounded-full px-8 py-4 inline-flex items-center gap-6 shadow-xl shadow-primary/5 mx-auto">
              <p className="text-text-secondary text-sm md:text-base font-medium">
                Filtering by accommodations near <span className="text-primary font-black ml-1 text-lg">{selectedAmenity.name}</span>
              </p>
              <div className="w-px h-6 bg-primary/20"></div>
              <button
                onClick={() => {
                  onSelectAmenity(null);
                  setActiveCategory(null);
                  setDropdownOpen(false);
                }}
                className="text-xs font-black text-text-secondary hover:text-[#ffcc4a] transition-colors uppercase tracking-widest flex items-center gap-2"
              >
                Clear <span className="text-lg leading-none mt-[-2px]">×</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
