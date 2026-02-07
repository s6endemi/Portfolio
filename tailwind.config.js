/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['Press Start 2P', 'monospace'],
        'pixel-content': ['Courier New', 'monospace'],
        'pixel-ui': ['Arial', 'sans-serif'],
      },
      boxShadow: {
        'pixel-sm': '2px 2px 0 0 rgba(139,111,71,0.25), 0 1px 3px rgba(139,111,71,0.12)',
        'pixel-md': '4px 4px 0 0 rgba(139,111,71,0.3), 0 4px 8px rgba(139,111,71,0.15)',
        'pixel-lg': '6px 6px 0 0 rgba(139,111,71,0.35), 0 8px 24px rgba(139,111,71,0.18)',
        'pixel-glow': '4px 4px 0 0 rgba(139,111,71,0.3), 0 0 20px rgba(123,167,188,0.2)',
      },
      keyframes: {
        'subtle-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        'subtle-pulse': 'subtle-pulse 3s ease-in-out infinite',
      },
      colors: {
        // Cozy & Warm Palette - Gemütlich & Sonnig
        'cozy-cream': '#faf7f0',         // Warmes Creme (Background)
        'cozy-beige': '#e8dcc0',         // Sanftes Beige (Icons)
        'cozy-brown': '#8b6f47',         // Warmes Braun (Borders)
        'cozy-sage': '#a8b5a0',          // Sanftes Salbeigrün
        'cozy-blue': '#7ba7bc',          // Gemütliches Blau
        'cozy-coral': '#d4a574',         // Warmes Koralle
        'cozy-lavender': '#b5a7d6',      // Sanftes Lavendel
        'cozy-text': '#5d4e37',          // Warmes Braun für Text
        'cozy-text-light': '#8a7968',    // Helles Braun für Secondary Text
        'cozy-shadow': '#c4b5a0',        // Weiche Schatten
        'cozy-border': '#d0c4b0',        // Sanfte Borders
        'cozy-highlight': '#f4f1e8',     // Highlight Hintergrund
      },
    },
  },
  plugins: [],
}

export default config
