import React, { useRef, useState } from 'react';

const carouselImages = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80"
];

export default function ImageCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth * 0.6;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-[#f4a8eb] py-24 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-4 mb-16 text-center">
        <h2 className="text-6xl md:text-9xl font-black text-[#111111] uppercase tracking-tighter leading-none">
          STUDENT LIVING,<br/>MADE SIMPLE
        </h2>
      </div>

      <div className="relative w-full">
        {/* Navigation Arrows */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center backdrop-blur-sm transition-all"
        >
          <span className="text-xl md:text-2xl text-[#111111]">←</span>
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center backdrop-blur-sm transition-all"
        >
          <span className="text-xl md:text-2xl text-[#111111]">→</span>
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-[10vw] pb-8 pt-4 items-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {carouselImages.map((img, index) => (
            <div 
              key={index}
              className="snap-center shrink-0 w-[70vw] md:w-[45vw] lg:w-[35vw] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105"
            >
              <div className="aspect-[4/3] relative">
                <img 
                  src={img} 
                  alt="Student Lifestyle" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
