
const amenities = [
  {
    title: "STYLISH STUDIO APARTMENTS",
    bgClass: "bg-primary",
    isSolid: true
  },
  {
    title: "INSPIRATIONAL HUB SPACES",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "WEEKDAY BREAKFAST",
    image: "https://images.unsplash.com/photo-1533089859736-229e0ab2ea05?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "24/7 GYM",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "REGULAR HOUSEKEEPING",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "24/7 CCTV & SECURE ACCESS",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "PARCEL COLLECTION",
    image: "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "ONSITE TEAM",
    image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "BOOKABLE STUDY ROOMS",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "EXCLUSIVE WEEKLY EVENTS",
    image: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "HEADLINER EVENTS",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "VIP BRAND EXPERIENCES",
    image: "https://images.unsplash.com/photo-1576020799627-0cb4f86ce8b1?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "SURPRISE GIFTS",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "CITY CENTRE LOCATIONS",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "FREE-TO-USE BIKES",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "VITA STUDENT ALUMNI",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
  }
];

export default function AmenitiesGrid() {
  return (
    <section className="bg-black py-20 border-y border-glass-border">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-glass-border">
          {amenities.map((item, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden group aspect-[4/3] md:aspect-video flex items-center justify-center p-6 text-center border-r border-b border-glass-border
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
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-primary/80 transition-colors duration-500" />
                </>
              )}
              
              {/* Solid Background Hover Effect (for the first tile) */}
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
