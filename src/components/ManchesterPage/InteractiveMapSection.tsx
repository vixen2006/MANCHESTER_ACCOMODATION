export default function InteractiveMapSection() {
  return (
    <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ffcc4a]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          <span className="text-text">Explore </span>
          <span className="bg-gradient-to-r from-primary to-[#ffcc4a] bg-clip-text text-transparent">Manchester</span>
          <span className="text-text"> in 3D</span>
        </h2>
        <p className="text-text-secondary text-base md:text-xl max-w-3xl mx-auto font-medium">
          Fly through the city and discover premium student accommodations right from our high-performance interactive 3D map.
        </p>
      </div>

      {/* Map Container */}
      <div className="w-full h-[60vh] min-h-[500px] md:h-[800px] relative rounded-[2.5rem] overflow-hidden glass-card p-2 md:p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] z-20 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.2)]">
        <div className="w-full h-full rounded-[2rem] overflow-hidden relative group">
          {/* Iframe for external Vercel App */}
          <iframe
            src="https://acolyte-living-interactive-map.vercel.app/"
            title="Manchester 3D Interactive Map"
            className="w-full h-full border-none outline-none z-10 relative"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          ></iframe>
          
          {/* Optional overlay that vanishes on hover to encourage interaction */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700 z-20"></div>
        </div>
      </div>
    </section>
  );
}
