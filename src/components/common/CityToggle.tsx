import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CityToggle() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-black/40 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex gap-1 shadow-2xl">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `relative px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
            isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
          }`
        }
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <motion.div
                layoutId="activeCity"
                className="absolute inset-0 bg-blue-600 rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">Manchester</span>
          </>
        )}
      </NavLink>

      <NavLink
        to="/london"
        className={({ isActive }) =>
          `relative px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
            isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
          }`
        }
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <motion.div
                layoutId="activeCity"
                className="absolute inset-0 bg-amber-600 rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">London</span>
          </>
        )}
      </NavLink>
    </div>
  );
}
