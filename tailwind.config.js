/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          dark: '#0D1B2A',   // Main background
          mid: '#1A2E42',    // Cards, sidebars
          light: '#243B55',  // Hover states, borders
        },
        gold: {
          primary: '#C9A84C', // CTAs, active states, headings
          light: '#E8C97A',   // Highlights
        },
        white: {
          DEFAULT: '#FFFFFF',
          muted: '#CBD5E1',
        },
        success: '#22C55E',
        error: '#EF4444',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(201, 168, 76, 0.15)',
        'gold-glow-intense': '0 0 25px rgba(201, 168, 76, 0.3)',
      }
    },
  },
  plugins: [],
}
