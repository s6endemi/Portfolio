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
