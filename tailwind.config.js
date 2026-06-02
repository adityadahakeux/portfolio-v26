/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        bg:      { DEFAULT: '#FAF8F4', 2: '#F3F0EB', surface: '#EDEAE3' },
        ink:     { DEFAULT: '#1A1814', 2: '#2C2825' },
        t:       { 1: '#1A1814', 2: '#6B6760', 3: '#A8A39C', 4: '#4A463F' },
        gold:    { DEFAULT: '#B8965A' },
        arc:     { DEFAULT: '#1E2D5E' },
        trumac:  { DEFAULT: '#1A4ED8' },
        danger:  { DEFAULT: '#C4472A' },
        rule:    { DEFAULT: '#D8D4CE' },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'wipe':     'cubic-bezier(0.86, 0, 0.07, 1)',
      },
    },
  },
  plugins: [],
};
