/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'text': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'background': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'primary': 'var(--accent-primary)',
        'secondary': 'var(--accent-secondary)',
        'glass': 'var(--glass-bg)',
        'glass-border': 'var(--glass-border)',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      width: {
        '128': '32rem',
        '160': '40rem',
      },
      height: {
        '128': '32rem',
        '160': '40rem',
        '200': '50rem',
      }
    },
  },
  plugins: [],
}

