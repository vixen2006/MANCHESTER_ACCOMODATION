
export default function LifestyleBanner() {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden my-16 bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070" 
          className="w-full h-full object-cover object-center opacity-70 scale-105 hover:scale-100 transition-transform duration-[10s]" 
          alt="Student Lifestyle"
        />
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full">
        <h2 className="text-white font-black uppercase text-5xl md:text-7xl lg:text-[7rem] leading-[0.85] tracking-tighter drop-shadow-2xl">
          <span className="block mb-2">Book a Place</span>
          <span className="block">To Become</span>
        </h2>
        
        {/* Tilted 'YOURSELF' */}
        <div className="mt-4 md:mt-8 origin-center -rotate-6 transform hover:rotate-0 transition-transform duration-500 cursor-default">
          <span className="text-white font-black uppercase text-6xl md:text-8xl lg:text-[9rem] leading-none tracking-tighter drop-shadow-2xl">
            Yourself
          </span>
        </div>
        
        <button className="mt-12 bg-white text-black px-10 py-4 rounded-full text-sm font-bold tracking-widest hover:scale-105 transition-transform duration-300 shadow-xl uppercase">
          Book Now
        </button>
      </div>
    </section>
  );
}
