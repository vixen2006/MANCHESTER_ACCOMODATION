import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full glass-badge hover:bg-white/10 transition-colors flex items-center justify-center gap-2 z-50 fixed bottom-6 right-6 shadow-xl"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <span className="text-xl leading-none">🌙</span>
      ) : (
        <span className="text-xl leading-none">☀️</span>
      )}
    </button>
  );
}
