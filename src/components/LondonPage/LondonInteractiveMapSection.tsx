export default function LondonInteractiveMapSection() {
  return (
    <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          <span className="text-text">Tour </span>
          <span className="bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">London</span>
          <span className="text-text"> in 3D</span>
        </h2>
        <p className="text-text-secondary text-base md:text-xl max-w-3xl mx-auto font-medium">
          Experience London's skyline and locate Ark Canary Wharf and other premium co-living spots on our 3D interactive map.
        </p>
      </div>

      {/* Map Container */}
      <div className="w-full h-[60vh] min-h-[500px] md:h-[800px] relative rounded-[2.5rem] overflow-hidden bg-black/20 backdrop-blur-2xl p-2 md:p-3 border border-white/5 shadow-2xl z-20 hover:shadow-amber-900/10 transition-all duration-500">
        <div className="w-full h-full rounded-[2rem] overflow-hidden relative group">
          <iframe
            src="https://acolyte-living-interactive-map.vercel.app/"
            title="London 3D Interactive Map"
            className="w-full h-full border-none outline-none z-10 relative"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
