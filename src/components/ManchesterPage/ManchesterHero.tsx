import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ParallaxGalleryScene from './ParallaxGalleryScene';

export default function ManchesterHero() {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
      })
        .from(
          ratingRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 1.2,
            ease: 'back.out(1.7)',
          },
          '-=0.8'
        )
        .from(
          subtitleRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1,
          },
          '-=0.6'
        )
        .from(
          taglineRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* 3D Background */}
      <ParallaxGalleryScene className="z-0" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1015] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[#0a1015]/40 z-5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <div ref={titleRef}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-wider">
            <span className="bg-gradient-to-r from-[#dc2626] via-[#ef4444] to-[#dc2626] bg-clip-text text-transparent">
              Manchester
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-text/70 mt-2 font-light tracking-wide">
            Student Accommodation
          </p>
        </div>

        <div ref={ratingRef} className="mt-8 inline-flex items-center gap-4">
          <div className="rating-badge">
            <span className="text-5xl md:text-7xl font-black bg-gradient-to-b from-[#ef4444] to-[#dc2626] bg-clip-text text-transparent">
              8
            </span>
            <span className="text-2xl md:text-3xl font-bold text-text/50">/10</span>
          </div>
        </div>

        <div ref={subtitleRef} className="mt-4">
          <p className="text-base sm:text-lg md:text-xl text-text/60 font-medium">
            Ranked <span className="text-[#ef4444] font-bold">8 out of 10</span> by individuals
          </p>
        </div>

        <div ref={taglineRef} className="mt-8">
          <p className="text-sm md:text-base text-text/40 max-w-xl mx-auto">
            Discover premium student living across Manchester — find your perfect home near clubs, cafes, libraries and more.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                document.getElementById('amenity-filter')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glow-btn glow-btn-primary px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-widest"
            >
              Explore Now
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="scroll-indicator">
          <div className="scroll-dot" />
        </div>
      </div>
    </section>
  );
}
