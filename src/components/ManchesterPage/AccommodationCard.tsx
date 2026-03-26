import { useRef, useState } from 'react';
import type { Accommodation } from '../../data/manchesterData';

interface AccommodationCardProps {
  accommodation: Accommodation & { distanceToAmenity?: number };
  index: number;
}

export default function AccommodationCard({ accommodation, index }: AccommodationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const stars = accommodation.reviewScore
    ? '★'.repeat(Math.round(accommodation.reviewScore)) + '☆'.repeat(5 - Math.round(accommodation.reviewScore))
    : null;

  return (
    <div
      ref={cardRef}
      className="accommodation-card"
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <img
          src={accommodation.imageUrl}
          alt={accommodation.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1015] via-transparent to-transparent" />

        {/* Price badge */}
        <div className="absolute top-3 right-3 glass-badge px-3 py-1.5 rounded-full">
          <span className="text-sm font-bold text-[#ef4444]">
            £{accommodation.pricePerWeek}
          </span>
          <span className="text-xs text-text/50">/week</span>
        </div>

        {/* Distance badge */}
        {accommodation.distanceToAmenity !== undefined && (
          <div className="absolute top-3 left-3 glass-badge px-3 py-1.5 rounded-full">
            <span className="text-xs font-semibold text-[#dc2626]">
              {accommodation.distanceToAmenity.toFixed(1)} km
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-text/90 truncate">{accommodation.title}</h3>
        <p className="text-xs text-text/40 mt-1 truncate">{accommodation.address}</p>

        {/* University */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs">🎓</span>
          <span className="text-xs text-text/60 truncate">{accommodation.university}</span>
          <span className="text-xs text-[#ef4444]">({accommodation.universityDistance})</span>
        </div>

        {/* Room types */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {accommodation.roomTypes.map((type) => (
            <span
              key={type}
              className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-[#dc2626]/15 text-[#ef4444] border border-[#ef4444]/20"
            >
              {type}
            </span>
          ))}
        </div>

        {/* Reviews */}
        {stars && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-yellow-400">{stars}</span>
            <span className="text-xs text-text/40">({accommodation.reviewCount})</span>
          </div>
        )}

        {/* About */}
        <p className="text-xs text-text/40 mt-3 line-clamp-2">{accommodation.about}</p>

        {/* CTA */}
        <button className="glow-btn glow-btn-primary w-full mt-4 py-2.5 rounded-xl text-sm font-semibold">
          View Details
        </button>
      </div>
    </div>
  );
}
