import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import AccommodationCard from './AccommodationCard';
import type { Accommodation } from '../../data/manchesterData';

interface AccommodationGridProps {
  accommodations: (Accommodation & { distanceToAmenity?: number })[];
  title?: string;
}

export default function AccommodationGrid({ accommodations, title }: AccommodationGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current && accommodations.length > 0) {
      gsap.from(gridRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all',
      });
    }
  }, [accommodations]);

  return (
    <section className="relative py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
        )}

        {accommodations.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-30">🏠</div>
            <p className="text-text/40 text-lg">No accommodations found</p>
            <p className="text-text/25 text-sm mt-2">
              Try selecting a different amenity or location
            </p>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {accommodations.map((acc, index) => (
              <AccommodationCard key={acc.id} accommodation={acc} index={index} />
            ))}
          </div>
        )}

        {accommodations.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-text/30 text-sm">
              Showing <span className="text-[#ef4444] font-semibold">{accommodations.length}</span>{' '}
              accommodations
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
