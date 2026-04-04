
export default function JourneySection() {
  return (
    <section className="w-full bg-[#111111] py-32 px-4 flex flex-col items-center text-center overflow-hidden border-t-2 border-b-2 border-white/5 my-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        {/* Giant Block Lettering */}
        <div className="flex flex-col w-full text-white font-black uppercase tracking-[-0.05em] leading-[0.8] mix-blend-plus-lighter text-6xl md:text-[8rem] lg:text-[10rem] mb-12">
          <span className="block hover:scale-[1.02] transition-transform duration-500 cursor-default">Whatever Stage</span>
          <span className="block hover:scale-[1.02] transition-transform duration-500 cursor-default mt-2 md:mt-4">Of Your Journey</span>
        </div>
        
        {/* Subtitle */}
        <div className="max-w-4xl mx-auto">
          <p className="text-white font-bold text-xl md:text-3xl lg:text-4xl tracking-tight leading-snug">
            From student life to shared living, explore spaces designed for every chapter.
          </p>
        </div>
      </div>
    </section>
  );
}
