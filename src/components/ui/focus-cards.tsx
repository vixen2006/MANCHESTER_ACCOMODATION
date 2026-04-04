import { useState } from 'react';

type Card = {
  key: string;
  title: string;
  icon: string | JSX.Element;
  src: string;
};

interface FocusCardsProps {
  cards: Card[];
  activeCardKey: string | null;
  onCardClick: (key: string) => void;
}

export default function FocusCards({ cards, activeCardKey, onCardClick }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto w-full">
      {cards.map((card, index) => {
        const isActive = activeCardKey === card.key;
        return (
          <div
            key={card.key}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onCardClick(card.key)}
            className={`cursor-pointer rounded-[2rem] relative overflow-hidden h-64 md:h-80 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-end justify-start group
              ${
                hovered !== null && hovered !== index
                  ? "blur-[6px] scale-[0.96] opacity-40 brightness-75 grayscale-[50%]"
                  : hovered === index
                  ? "scale-[1.03] z-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/20"
                  : "border border-glass-border"
              }
              ${isActive ? "ring-4 ring-primary shadow-xl shadow-primary/30 blur-none scale-105 opacity-100 z-10 grayscale-0 brightness-110" : ""}
            `}
          >
            {/* Background Image */}
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${hovered === index || isActive ? 'scale-110' : 'scale-100'}`}
              style={{ backgroundImage: `url(${card.src})` }}
            />

            {/* Gradient Overlay for Text Readability */}
            <div className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent ${isActive ? 'opacity-80' : 'opacity-100'}`} />

            {/* Card Content */}
            <div className="relative z-20 w-full p-5 md:p-8 flex flex-col gap-3">
              <div 
                className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-2xl md:text-3xl transition-all duration-500 max-w-max bg-background/40 backdrop-blur-md border border-white/10 ${
                  hovered === index || isActive ? "-translate-y-2 shadow-lg scale-110 bg-primary text-white border-primary/50" : ""
                }`}
              >
                {card.icon}
              </div>
              <h3 className={`font-black tracking-wide transition-all duration-500 drop-shadow-lg ${hovered === index || isActive ? "text-primary text-xl md:text-2xl" : "text-white text-lg md:text-xl"}`}>
                {card.title}
              </h3>
            </div>
            
            {/* Active Highlight Outline */}
            {isActive && (
              <div className="absolute inset-0 bg-primary/10 pointer-events-none z-30 transition-opacity duration-300"></div>
            )}
          </div>
        )
      })}
    </div>
  );
}
