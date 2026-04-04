import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-[100] p-3 rounded-2xl glow-btn-outline group transition-all duration-500 overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {theme === 'light' ? (
          <span className="text-xl leading-none group-hover:rotate-12 transition-transform duration-300">🌙</span>
        ) : (
          <span className="text-xl leading-none group-hover:rotate-[30deg] transition-transform duration-300">☀️</span>
        )}
        <span className="text-xs font-black uppercase tracking-widest hidden md:inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </span>
      </div>
      
      {/* Hover background effect */}
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  );
}
