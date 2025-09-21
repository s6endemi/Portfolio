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
      },
      colors: {
        'pixel-green': '#00ff41',
        'pixel-amber': '#ffb000',
        'pixel-cyan': '#00ffff',
        'pixel-black': '#000000',
        'pixel-gray': '#c0c0c0',
        'pixel-dark-gray': '#404040',
        'pixel-light-gray': '#e0e0e0',
      },
    },
  },
  plugins: [],
}

export default config
