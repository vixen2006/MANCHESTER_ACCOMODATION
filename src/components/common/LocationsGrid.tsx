import React from 'react';

const locations = [
  {
    name: "CANNING TOWN",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "TOTTENHAM HALE",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  }
];

export default function LocationsGrid() {
  return (
    <section className="bg-[#b9d233] py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-black text-center mb-16 uppercase text-[#222222] tracking-tighter" style={{ lineHeight: '0.9' }}>
          MORE<br/>LOCATIONS.<br/>MORE CHOICE.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((loc, index) => (
            <div 
              key={index} 
              className="border border-[#222222]/20 rounded-2xl p-6 group cursor-pointer hover:bg-black/5 transition-colors"
            >
              <div className="rounded-xl overflow-hidden aspect-[16/9] mb-8">
                <img 
                  src={loc.image} 
                  alt={loc.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-center text-[#222222] uppercase tracking-tight">
                {loc.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
