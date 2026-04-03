import React from 'react';

const includedItems = [
  { title: "All Bills Included", icon: "💎" },
  { title: "Gym & Wellness Studio", icon: "🧘" },
  { title: "Co-Working Spaces", icon: "💻" },
  { title: "Community Events", icon: "🎉" },
  { title: "Laundry", icon: "🧺" },
  { title: "24/7 Security", icon: "🛡️" },
  { title: "Fast Wi-Fi", icon: "📶" },
  { title: "Podcast Studio", icon: "🎙️" },
  { title: "In Room Comfort Cooling", icon: "❄️" },
  { title: "On Site Maintenance", icon: "🔧" },
  { title: "On Site Residents Team", icon: "👥" },
  { title: "Yoga Studio", icon: "🕉️" }
];

export default function WhatsIncludedGrid() {
  return (
    <section className="bg-bg-secondary py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-extrabold text-center mb-16 uppercase text-text tracking-tighter" style={{ lineHeight: '0.9' }}>
          WHAT'S<br/>INCLUDED?
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {includedItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-background rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-primary transition-all duration-300 border border-glass-border group cursor-pointer aspect-square"
            >
              <div className="text-5xl md:text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-extrabold text-sm md:text-lg text-text leading-tight">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
