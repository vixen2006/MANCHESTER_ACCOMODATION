import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import FocusCards from '../ui/focus-cards';
import {
  AMENITY_CATEGORIES,
  type AmenityCategory,
  type AmenityLocation,
} from '../../data/manchesterData';
import { getLondonAmenitiesByCategory } from '../../data/londonData';

interface AmenityFilterProps {
  onSelectAmenity: (amenity: AmenityLocation | null) => void;
  selectedAmenity: AmenityLocation | null;
}

const CATEGORY_IMAGES: Record<string, string> = {
  college: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800",
  shopping: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
  gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
  nightlife: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=800",
  transport: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800",
  hospital: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800",
  food: "https://images.unsplash.com/photo-1533089859736-229e0ab2ea05?auto=format&fit=crop&q=80&w=800",
  park: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=800",
  clubs: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=800",
  cafes: "/london-images/london-cafe.png",
  library: "/london-images/london-library.png",
  malls: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
  funzones: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
  convenience: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=800"
};

export default function LondonAmenityFilter({ onSelectAmenity, selectedAmenity }: AmenityFilterProps) {
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

  const locations = activeCategory ? getLondonAmenitiesByCategory(activeCategory) : [];
  // Wait, I need a function that just gets amenities by city/category.
  // I'll check how getAmenitiesByCategory is implemented in manchesterData.
  
  return (
    <section id="amenity-filter" className="relative py-20 md:py-28 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-400/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            <span className="text-text">London </span>
            <span className="bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">Living</span>
          </h2>
          <p className="text-text-secondary mt-3 text-base md:text-xl max-w-2xl mx-auto font-medium">
            Explore premium student locations across London and find your perfect spot.
          </p>
        </div>

        <div ref={buttonsRef} className="w-full">
          <FocusCards 
            cards={AMENITY_CATEGORIES.map(cat => ({
              key: cat.key,
              title: cat.label,
              icon: cat.icon,
              src: CATEGORY_IMAGES[cat.key] || CATEGORY_IMAGES.college,
            }))} 
            activeCardKey={activeCategory} 
            onCardClick={(key) => handleCategoryClick(key as AmenityCategory)} 
          />
        </div>

        {dropdownOpen && activeCategory && (
          <div ref={dropdownRef} className="mt-12 relative z-20">
            <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 relative z-10 gap-4">
                <h3 className="text-sm md:text-base font-black text-amber-500 uppercase tracking-[0.2em] flex items-center gap-3">
                  <span className="text-2xl bg-amber-500/10 w-10 h-10 flex items-center justify-center rounded-xl">
                    {AMENITY_CATEGORIES.find((c) => c.key === activeCategory)?.icon}
                  </span>
                  {AMENITY_CATEGORIES.find((c) => c.key === activeCategory)?.label} Destinations
                </h3>
                <span className="text-xs font-bold text-white/30 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                  {locations.length} Locations Found
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 relative z-10">
                {locations.length > 0 ? (
                  locations.map((loc) => (
                    <button
                      key={loc.name}
                      onClick={() => handleLocationClick(loc)}
                      className={`text-left p-5 rounded-2xl transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${
                        selectedAmenity?.name === loc.name
                          ? 'bg-amber-600 border border-amber-500 shadow-[0_0_20px_rgba(217,119,6,0.3)] text-white hover:-translate-y-1 transform'
                          : 'bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/50 hover:shadow-lg hover:-translate-y-1 transform'
                      }`}
                    >
                      <span className={`text-sm md:text-base font-bold relative z-10 transition-colors ${selectedAmenity?.name === loc.name ? 'text-white' : 'text-gray-300 group-hover:text-amber-500'}`}>
                        {loc.name}
                      </span>
                      <span className={`text-base relative z-10 transition-all duration-300 ${selectedAmenity?.name === loc.name ? 'opacity-100 scale-110' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:text-amber-500'}`}>
                        ✦
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-center text-white/40 italic py-10 col-span-full">
                    Discovering hotspots in London...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedAmenity && !dropdownOpen && (
          <div className="mt-12 text-center relative z-20">
            <div className="bg-amber-600/5 border border-amber-500/20 backdrop-blur-md rounded-full px-8 py-4 inline-flex items-center gap-6 shadow-xl shadow-amber-500/5 mx-auto">
              <p className="text-text-secondary text-sm md:text-base font-medium">
                Filtering by accommodations near <span className="text-amber-500 font-black ml-1 text-lg">{selectedAmenity.name}</span>
              </p>
              <div className="w-px h-6 bg-amber-500/20"></div>
              <button
                onClick={() => {
                  onSelectAmenity(null);
                  setActiveCategory(null);
                  setDropdownOpen(false);
                }}
                className="text-xs font-black text-text-secondary hover:text-amber-400 transition-colors uppercase tracking-widest flex items-center gap-2"
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
