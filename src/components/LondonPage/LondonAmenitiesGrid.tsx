
const amenities = [
  {
    title: "ICONIC CO-LIVING STUDIOS",
    bgClass: "bg-amber-600",
    isSolid: true
  },
  {
    title: "20TH FLOOR ROOFTOP POOL",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "STATE-OF-THE-ART GYM",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "ANOTHER BROTHER CAFE",
    image: "/london-images/london-cafe.png"
  },
  {
    title: "GOLF SIMULATOR",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c9903e7?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "CINEMA ROOM",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "CREATIVE HUB SPACES",
    image: "/london-images/london-library.png"
  },
  {
    title: "COMMUNAL KITCHENS",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800"
  }
];

export default function LondonAmenitiesGrid() {
  return (
    <section className="bg-black py-20 border-y border-white/5">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-white/5">
          {amenities.map((item, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden group aspect-[4/3] md:aspect-video flex items-center justify-center p-6 text-center border-r border-b border-white/5
                ${item.isSolid ? item.bgClass : 'bg-black'}
              `}
            >
              {/* Background Image */}
              {!item.isSolid && item.image && (
                <>
                  <div 
                    className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-110 opacity-60"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-amber-600/80 transition-colors duration-500" />
                </>
              )}
              
              {/* Solid Background Hover Effect */}
              {item.isSolid && (
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              )}

              {/* Text Content */}
              <h3 className={`relative z-10 font-bold uppercase tracking-widest text-sm md:text-base leading-snug
                ${item.isSolid ? 'text-white' : 'text-gray-100 group-hover:text-white'}
                transition-colors duration-300 drop-shadow-md`}
                style={{ maxWidth: '80%' }}
              >
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
