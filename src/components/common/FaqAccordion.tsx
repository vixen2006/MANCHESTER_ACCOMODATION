import React, { useState } from 'react';

const faqs = [
  { q: "Are pets allowed?", a: "Unfortunately, pets are not permitted in the accommodation. The only exception is registered assistance animals." },
  { q: "Are there accessible rooms available?", a: "Yes, we have a limited number of fully accessible rooms. Please contact our team directly to discuss your specific requirements." },
  { q: "Does my studio come fully furnished?", a: "Absolutely! All studios and en-suites come fully furnished with beds, wardrobes, desks, and chairs. Studios also include fully equipped kitchenettes." },
  { q: "Do I have to pay council tax?", a: "Full-time students are exempt from paying council tax. You will need to provide a council tax exemption certificate from your university." },
  { q: "How do I book?", a: "You can book directly through our website by clicking the 'Book Now' button and completing the online tenancy agreement." },
  { q: "Is there air conditioning?", a: "Yes, our new buildings feature in-room comfort cooling to keep you comfortable year-round." },
  { q: "What can I expect?", a: "Expect an incredible community, state-of-the-art facilities, and a dedicated team ensuring you have the best student experience possible." },
  { q: "What facilities are there?", a: "Facilities include on-site gyms, study spaces, communal lounges, high-speed Wi-Fi, and 24/7 security." },
  { q: "What size are the rooms?", a: "Room sizes vary by type, generally ranging from 12 sqm for a classic en-suite up to 30+ sqm for a premium studio." },
  { q: "Where is the nearest station?", a: "Our accommodations are strategically located within a 5-10 minute walk of major bus, train, or tram stations." }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-bg-secondary py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-black text-center mb-12 uppercase text-text tracking-tighter">
          FAQ
        </h2>
        
        <div className="border-t border-glass-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-glass-border">
                <button 
                  onClick={() => toggle(index)}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-text group-hover:text-primary transition-colors pr-8">
                    {faq.q}
                  </h3>
                  <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <span 
                      className="absolute w-5 h-[2px] bg-text transition-transform duration-300"
                    />
                    <span 
                      className={`absolute w-5 h-[2px] bg-text transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-90'}`}
                    />
                  </div>
                </button>
                <div 
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '200px' : '0', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pb-6 text-text-secondary text-lg leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
