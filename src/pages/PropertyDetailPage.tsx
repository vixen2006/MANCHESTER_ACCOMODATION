import { useParams, useNavigate } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import CityScene from '../components/ManchesterPage/CityScene';
import WhatsIncludedGrid from '../components/common/WhatsIncludedGrid';
import FaqAccordion from '../components/common/FaqAccordion';
import { ACCOMMODATIONS } from '../data/manchesterData';
import type { RoomType } from '../data/manchesterData';
import { LONDON_ACCOMMODATIONS } from '../data/londonData';

const SECTION_IDS = ['overview', 'rooms', 'amenities', 'gallery', 'location', 'reviews', 'faqs'] as const;
const SECTION_LABELS: Record<string, string> = {
  overview: 'Overview',
  rooms: 'Rooms',
  amenities: 'Amenities',
  gallery: 'Gallery',
  location: 'Location',
  reviews: 'Reviews',
  faqs: 'FAQs',
};

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const manchesterAcc = ACCOMMODATIONS.find((a) => a.id === id);
  const londonAcc = LONDON_ACCOMMODATIONS.find((a) => a.id === id);
  const accommodation = manchesterAcc ?? londonAcc;
  const isLondon = !manchesterAcc && !!londonAcc;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Intersection observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    for (const sectionId of SECTION_IDS) {
      const el = sectionRefs.current[sectionId];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [accommodation]);

  if (!accommodation) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text/80 mb-4">Property Not Found</h1>
          <button onClick={() => navigate('/')} className="glow-btn glow-btn-primary px-6 py-3 rounded-xl">
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const { details } = accommodation;

  const scrollToSection = (sectionId: string) => {
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const stars = (score: number) => '★'.repeat(Math.round(score)) + '☆'.repeat(5 - Math.round(score));

  return (
    <div className="property-detail-page min-h-screen bg-background text-text transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={accommodation.imageUrl}
          alt={accommodation.title}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(isLondon ? '/london' : '/')}
          className="absolute top-6 left-6 z-20 glass-badge px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <span className="text-lg">&#8592;</span>
          <span className="text-sm font-medium">{isLondon ? 'Back to London' : 'Back'}</span>
        </button>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10 transition-transform duration-500 hover:translate-y-[-10px]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="glass-badge px-3 py-1 rounded-full text-xs font-semibold text-primary">
                {accommodation.supplier}
              </span>
              {accommodation.reviewScore && (
                <span className="glass-badge px-3 py-1 rounded-full text-xs text-yellow-500">
                  {stars(accommodation.reviewScore)} ({accommodation.reviewCount})
                </span>
              )}
              <span className="glass-badge px-3 py-1 rounded-full text-xs text-text-secondary">
                {details.totalBeds} beds
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-2 text-text">{accommodation.title}</h1>
            <p className="text-text-secondary text-sm md:text-lg mb-4">{accommodation.address}</p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-glass border border-glass-border rounded-full px-4 py-1.5 backdrop-blur-md">
                <span className="text-lg">🎓</span>
                <span className="text-sm font-medium">{accommodation.university}</span>
                <span className="text-xs text-primary font-bold">({accommodation.universityDistance})</span>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-black text-primary">£{accommodation.pricePerWeek}</span>
                <span className="text-text-secondary text-sm font-medium mb-1">/week</span>
              </div>
            </div>

            {/* Special Offers */}
            {details.specialOffers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {details.specialOffers.map((offer, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                    {offer}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-40 bg-bg-secondary/80 backdrop-blur-lg border-b border-glass-border">
        <div className="max-w-6xl mx-auto flex items-center gap-6 overflow-x-auto scrollbar-hide px-4 py-4">
          {SECTION_IDS.map((sectionId) => (
            <button
              key={sectionId}
              onClick={() => scrollToSection(sectionId)}
              className={`text-sm font-semibold transition-all ${activeSection === sectionId ? 'text-primary border-b-2 border-primary pb-1' : 'text-text-secondary hover:text-text'}`}
            >
              {SECTION_LABELS[sectionId]}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Acolyte-Inspired Signature Details */}
        <section className="mb-12 glass-card p-6 rounded-2xl flex flex-wrap gap-8 justify-between items-center shadow-lg border border-primary/20 bg-primary/5">
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary uppercase tracking-wider font-bold mb-1">Total Beds</span>
            <span className="text-2xl font-black text-text text-primary">350+</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary uppercase tracking-wider font-bold mb-1">Room Types</span>
            <span className="text-2xl font-black text-text text-primary">9</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary uppercase tracking-wider font-bold mb-1">Year Built</span>
            <span className="text-2xl font-black text-text text-primary">2023</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary uppercase tracking-wider font-bold mb-1">Tenancy</span>
            <span className="text-2xl font-black text-text text-primary">44 / 51 wks</span>
          </div>
        </section>

        {/* Ark Living Inspired Neighbourhood Section */}
        <section className="mb-20 relative p-8 rounded-3xl overflow-hidden glass-card shadow-2xl">
          <CityScene className="opacity-20 pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-text">An All New<br/><span className="text-primary">Neighbourhood</span></h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">Coffee before work. Groceries on the way home. Built around everyday convenience. Independent cafés, local shops, gyms, and places to eat all within a few minutes’ walk.</p>
              <p className="text-text font-medium border-l-4 border-primary pl-4 py-1">Everything you need, right on your door step. A two minute walk to all your favourite high street shops.</p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl border border-glass-border">
                <img src={accommodation.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent flex items-end p-8">
                  <span className="text-2xl font-bold text-text">Make Yourself at Home.</span>
                </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" ref={(el) => { sectionRefs.current['overview'] = el; }} className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-text border-b border-glass-border pb-4">Top Universities on your Doorstep*</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl hover:border-primary transition-all duration-300">
              <h4 className="font-bold text-lg mb-4">{accommodation.university}</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary flex items-center gap-2">🚶 Walk</span>
                  <span className="font-semibold text-text">{accommodation.universityDistance}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary flex items-center gap-2">🚲 Cycle</span>
                  <span className="font-semibold text-text">5 mins</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary flex items-center gap-2">🚌 Bus/Tube</span>
                  <span className="font-semibold text-text">15 mins</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-2xl border border-glass-border">
              <h4 className="font-bold text-lg mb-4 mt-2 text-text/50">Other Universities</h4>
              <p className="text-text-secondary text-sm">Quick connections to major university campuses across the city via the comprehensive transport network.</p>
            </div>
          </div>
          <p className="text-xs text-text-secondary mt-4 mb-12">*Journey times are approximate and may vary.</p>


          {/* What's included (Ark Inspired) */}
          <div className="mt-12 rounded-3xl overflow-hidden shadow-sm">
            <WhatsIncludedGrid />
          </div>
        </section>

        {/* Room Types Section */}
        <section id="rooms" ref={(el) => { sectionRefs.current['rooms'] = el; }} className="mb-20">
          <div className="flex flex-wrap items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-text mb-2">Room Types</h2>
              <p className="text-text-secondary text-sm">Filter by room type to find exactly what you need.</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button className="glass-badge px-4 py-2 rounded-full text-xs font-semibold text-primary">All Rooms</button>
              <button className="glass-badge px-4 py-2 rounded-full text-xs font-semibold text-text-secondary opacity-50 hover:opacity-100">Ensuites</button>
              <button className="glass-badge px-4 py-2 rounded-full text-xs font-semibold text-text-secondary opacity-50 hover:opacity-100">Studios</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {details.roomTypes.map((room, i) => (
              <div
                key={i}
                className={`glass-card rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 ${selectedRoom?.name === room.name ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''}`}
                onClick={() => setSelectedRoom(selectedRoom?.name === room.name ? null : room)}
              >
                <div className="relative h-60 overflow-hidden bg-bg-secondary">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-glass-border">
                    <span className="text-sm font-black text-text">£{room.pricePerWeek}</span><span className="text-xs text-text-secondary">/wk</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary text-white text-xs px-2 py-1 flex items-center gap-1 font-bold rounded-lg opacity-90"><span className="text-sm">📐</span> Floor Plan available</div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-1 text-text">{room.name}</h4>
                  <p className="text-sm text-text-secondary mb-4">Tenancy length (2025 / 2026)</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs font-medium px-3 py-1 rounded-md bg-background border border-glass-border text-text">Size: {room.size}</span>
                    {room.amenities.slice(0,2).map((amenity, j) => (
                      <span key={j} className="text-xs font-medium px-3 py-1 rounded-md bg-background border border-glass-border text-text">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 mb-6 p-4 rounded-xl bg-background/50 border border-glass-border">
                    <h5 className="text-xs uppercase font-bold text-text-secondary mb-3">In-Room Features:</h5>
                    <ul className="text-sm text-text grid grid-cols-2 gap-2">
                      <li className="flex items-center gap-2"><span className="text-primary">✓</span> Double Bed</li>
                      <li className="flex items-center gap-2"><span className="text-primary">✓</span> Study Desk</li>
                      <li className="flex items-center gap-2"><span className="text-primary">✓</span> Wardrobe</li>
                      <li className="flex items-center gap-2"><span className="text-primary">✓</span> Full Mirror</li>
                      <li className="flex items-center gap-2"><span className="text-primary">✓</span> Smart TV</li>
                      <li className="flex items-center gap-2"><span className="text-primary">✓</span> En-suite</li>
                    </ul>
                  </div>
                  <button className="glow-btn glow-btn-primary w-full py-3 rounded-xl text-sm font-bold tracking-wide">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Acolyte-Inspired Fees & Payments Box */}
        <section className="mb-20">
          <div className="glass-card rounded-3xl p-8 md:p-12 border-l-4 border-l-primary relative overflow-hidden bg-gradient-to-br from-primary/10 to-transparent">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text">Fees & Payments</h2>
              <p className="text-text-secondary mb-8 max-w-2xl">Your weekly rent is fully all-inclusive. No hidden fees or unexpected utility bills. Everything you need is covered in one simple payment.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-4">
                {[
                  "Water", "Electricity", "Gas & Heating", "High-Speed WiFi", "Contents Insurance", "Trash Removal", "Air Conditioning", "Sewerage"
                ].map((bill, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-semibold text-text">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-xs">✓</div>
                    {bill}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute right-0 top-0 text-9xl opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4">£</div>
          </div>
        </section>

        {/* Acolyte-Inspired Premium Community Amenities */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-2 text-text border-b border-glass-border pb-4">Premium Community Amenities</h2>
          <p className="text-text-secondary text-sm mb-8 mt-2">Exclusive lifestyle facilities included for all residents.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🍿", label: "Cinema Room" },
              { icon: "🎳", label: "Bowling Alley" },
              { icon: "🏋️", label: "Fitness Center" },
              { icon: "🎤", label: "Karaoke Room" },
              { icon: "🎱", label: "Pool Tables & Games" },
              { icon: "📅", label: "Social Calendar" },
              { icon: "☕", label: "Coffee Lounge" },
              { icon: "📚", label: "Study Pods" },
            ].map((amenity, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all cursor-pointer shadow-sm">
                <span className="text-4xl mb-3">{amenity.icon}</span>
                <span className="font-bold text-sm text-text">{amenity.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Amenities Section */}
        <section id="amenities" ref={(el) => { sectionRefs.current['amenities'] = el; }} className="mb-16">
          <h2 className="detail-section-title">Amenities & Facilities</h2>
          <p className="text-text/40 text-sm mb-8">Everything you need for the perfect student experience</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {details.amenities.map((amenity, i) => (
              <div key={i} className="detail-amenity-card">
                <span className="text-2xl mb-2">{amenity.icon}</span>
                <span className="text-xs font-medium text-text/70">{amenity.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" ref={(el) => { sectionRefs.current['gallery'] = el; }} className="mb-16">
          <h2 className="detail-section-title">Gallery</h2>

          {details.galleryImages.length > 0 && (
            <div>
              {/* Main image */}
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-4">
                <img
                  src={details.galleryImages[galleryIndex]}
                  alt={`${accommodation.title} - Photo ${galleryIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />

                {/* Nav arrows */}
                <button
                  onClick={() => setGalleryIndex((prev) => (prev - 1 + details.galleryImages.length) % details.galleryImages.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 glass-badge w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors"
                >
                  &#8592;
                </button>
                <button
                  onClick={() => setGalleryIndex((prev) => (prev + 1) % details.galleryImages.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 glass-badge w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors"
                >
                  &#8594;
                </button>

                {/* Counter */}
                <div className="absolute bottom-4 right-4 glass-badge px-3 py-1.5 rounded-full text-xs">
                  {galleryIndex + 1} / {details.galleryImages.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {details.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      i === galleryIndex ? 'border-[#ef4444] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Location Section */}
        <section id="location" ref={(el) => { sectionRefs.current['location'] = el; }} className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-text border-b border-glass-border pb-4">Location & Transport</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Transport Links */}
            <div>
              <h3 className="text-sm font-semibold text-text/60 uppercase tracking-wider mb-4">Getting Around</h3>
              <div className="space-y-3">
                {details.transportLinks.map((link, i) => (
                  <div key={i} className="detail-transport-card">
                    <div className="detail-transport-icon">
                      {link.type === 'train' && '🚆'}
                      {link.type === 'tram' && '🚊'}
                      {link.type === 'bus' && '🚌'}
                      {link.type === 'walk' && '🚶'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{link.name}</h4>
                      <p className="text-xs text-text/40">{link.time}</p>
                    </div>
                    <span className="text-xs text-[#ef4444] font-semibold">{link.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Attractions */}
            <div>
              <h3 className="text-sm font-semibold text-text/60 uppercase tracking-wider mb-4">What's Nearby</h3>
              <div className="space-y-3">
                {details.nearbyAttractions.map((place, i) => (
                  <div key={i} className="detail-transport-card">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{place.name}</h4>
                      <p className="text-xs text-text/40">{place.category}</p>
                    </div>
                    <span className="text-xs text-text/50">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" ref={(el) => { sectionRefs.current['reviews'] = el; }} className="mb-16">
          <h2 className="detail-section-title">What Residents Say</h2>

          {details.reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {details.reviews.map((review, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl flex flex-col hover:border-primary/30 transition-colors">
                  <div className="text-5xl font-serif text-primary/30 mb-2 leading-none">"</div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 font-medium italic">"{review.text}"</p>
                  <div className="mt-auto border-t border-glass-border pt-4">
                    <div className="text-xs text-yellow-500 mb-2">{stars(review.rating)}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-text">{review.name}</span>
                      <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">Resident</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text/30 text-sm">No reviews yet.</p>
          )}
        </section>

        {/* FAQ Section */}
        <section id="faqs" ref={(el) => { sectionRefs.current['faqs'] = el; }} className="mb-16">
          <div className="rounded-3xl overflow-hidden shadow-sm">
            <FaqAccordion />
          </div>
        </section>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-bg-secondary/90 backdrop-blur-xl border-t border-glass-border z-50 py-4 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-text">{accommodation.title}</h3>
            <span className="text-primary font-black text-sm">From £{Math.min(...details.roomTypes.map(r => r.pricePerWeek))}/week</span>
          </div>
          <div className="flex gap-3">
            <button className="glow-btn glow-btn-outline px-5 py-2.5 rounded-xl text-sm font-semibold">
              Enquire
            </button>
            <button className="glow-btn glow-btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-glass-border bg-bg-secondary mt-12 pb-24">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            {isLondon ? 'London' : 'Manchester'} Student Accommodation
          </h3>
          <p className="text-text-secondary text-sm">Find your perfect student home in {isLondon ? 'London' : 'Manchester'}.</p>
        </div>
      </footer>
    </div>
  );
}
