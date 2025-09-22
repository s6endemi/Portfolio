interface Command {
  name: string
  description: string
  action: (args: string[]) => Promise<string | string[]>
  aliases?: string[]
}

export const commands: Command[] = [
  {
    name: 'help',
    description: 'Show available commands',
    action: async () => [
      '🎯 AVAILABLE COMMANDS:',
      '',
      '📋 PORTFOLIO:',
      '  about      - Personal information & bio',
      '  projects   - View my latest projects',
      '  skills     - Technical skills & expertise',
      '  contact    - Get in touch with me',
      '',
      '🎮 SPECIAL COMMANDS:',
      '  help       - Show this help menu',
      '  music      - Toggle background music',
      '  games      - Mini arcade games',
      '  matrix     - Enter the matrix...',
      '  joke       - Random programming joke',
      '',
      '🛠️ UTILITIES:',
      '  clear      - Clear terminal screen',
      '',
      '💡 TIP: Use ↑/↓ arrows for command history!'
    ]
  },
  {
    name: 'about',
    description: 'Personal information',
    action: async () => [
      '👤 ABOUT EREN - PIXEL PORTFOLIO CREATOR',
      '',
      '🎯 Full Stack Developer & Digital Artist',
      '📍 Location: Germany',
      '💼 Experience: Building the future, one pixel at a time',
      '',
      '🚀 SPECIALTIES:',
      '  • React/TypeScript ecosystem',
      '  • Creative UI/UX design',
      '  • Interactive web experiences',
      '  • Retro & pixel art aesthetics',
      '',
      '☕ Coffee consumed: 9,001+ cups',
      '🐛 Bugs fixed: ∞ (still counting)',
      '🎮 Favorite game: Building portfolios that don\'t suck',
      '',
      '💡 "Code is poetry, pixels are art, users are everything."'
    ]
  },
  {
    name: 'music',
    description: 'Toggle background music',
    action: async () => [
      '🎵 PIXEL MUSIC PLAYER',
      '',
      '🎧 RETRO SYNTHWAVE PLAYLIST:',
      '   ♪ Neon Dreams - Cyber City',
      '   ♪ Pixel Beats - 8-Bit Paradise',
      '   ♪ Terminal Vibes - Code & Coffee',
      '   ♪ Retro Future - Digital Sunset',
      '',
      '🔊 Music Status: ▶️  PLAYING',
      '🎚️  Volume: ████████░░ 80%',
      '',
      '💡 Type "music stop" to pause',
      '💡 Type "music volume [1-10]" to adjust'
    ]
  },
  {
    name: 'games',
    description: 'Mini arcade games',
    action: async () => [
      '🎮 PIXEL ARCADE - GAMES MENU',
      '',
      '🐍 SNAKE CLASSIC',
      '   Command: snake',
      '   Controls: WASD or Arrow Keys',
      '   Goal: Beat the developer\'s high score!',
      '',
      '🏓 RETRO PONG',
      '   Command: pong',
      '   Controls: Mouse or W/S keys',
      '   Mode: vs AI or vs Friend',
      '',
      '🧩 PIXEL TETRIS',
      '   Command: tetris',
      '   Controls: Arrow keys + Space',
      '   Challenge: Clear 10 lines!',
      '',
      '💡 Games open in new windows!'
    ]
  },
  {
    name: 'projects',
    description: 'View portfolio projects',
    action: async () => [
      '💼 EREN\'S PROJECT ARCHIVE',
      '',
      '🚀 VIGOR PROTOCOL',
      '   Tech: SvelteKit, Solana, AI Terminal',
      '   Desc: Ultra-modern crypto platform',
      '   Status: ✅ LIVE & DEPLOYED',
      '',
      '🎮 PIXEL PORTFOLIO (THIS ONE!)',
      '   Tech: React, TypeScript, Framer Motion',
      '   Desc: Interactive retro desktop experience',
      '   Status: 🔧 IN DEVELOPMENT',
      '',
      '🌐 NEURAL DASHBOARD',
      '   Tech: Next.js, Three.js, WebGL',
      '   Desc: AI-powered data visualization',
      '   Status: 🚧 COMING SOON',
      '',
      '💡 More projects in the pipeline!'
    ]
  },
  {
    name: 'skills',
    description: 'Technical skills',
    action: async () => [
      '🛠️ TECHNICAL SKILL MATRIX',
      '',
      '💻 FRONTEND MASTERY:',
      '████████████ React/TypeScript     [EXPERT]',
      '██████████░░ Vue.js              [ADVANCED]',
      '████████░░░░ Svelte/SvelteKit    [INTERMEDIATE]',
      '██████████░░ HTML5/CSS3          [EXPERT]',
      '████████████ Tailwind CSS       [EXPERT]',
      '',
      '⚙️ BACKEND POWER:',
      '██████████░░ Node.js/Express     [ADVANCED]',
      '████████░░░░ Python/FastAPI      [INTERMEDIATE]',
      '██████████░░ PostgreSQL/MongoDB  [ADVANCED]',
      '',
      '🎨 CREATIVE TOOLS:',
      '████████████ Framer Motion       [EXPERT]',
      '██████████░░ Three.js            [ADVANCED]',
      '██████████░░ Pixel Art           [ADVANCED]',
      '',
      '☁️ CLOUD & DEVOPS:',
      '██████████░░ Docker/K8s          [ADVANCED]',
      '████████░░░░ AWS/Vercel          [INTERMEDIATE]'
    ]
  },
  {
    name: 'contact',
    description: 'Contact information',
    action: async () => [
      '🤝 CONTACT EREN - AI ENGINEER & FOUNDER',
      '',
      '📧 Email: erendemir10022@gmail.com',
      '💼 LinkedIn: linkedin.com/in/eren-demir-4ba56a350',
      '🐙 GitHub: github.com/s6endemi',
      '🏥 Startup: www.previa.health',
      '',
      '📍 Location: Cologne/Bonn, Germany',
      '☕ Working from: Random cafés worldwide',
      '',
      '🚀 Currently building: Previa Health (€300k pre-seed)',
      '🔬 Focus: Computer Vision + Preventive Healthcare',
      '',
      '🤝 Open for:',
      '  • Co-founder discussions (technical role)',
      '  • Research collaborations',
      '  • Healthcare AI consulting',
      '  • Academic partnerships',
      '',
      '⚡ Response time: 24-48h (faster for healthcare/AI)',
      '💡 Mention "preventive AI" for priority!'
    ]
  },
  {
    name: 'matrix',
    description: 'Enter the matrix',
    action: async () => [
      '🌧️ ENTERING THE MATRIX...',
      '',
      '01001000 01100101 01101100 01101100 01101111',
      '01010111 01101111 01110010 01101100 01100100',
      '',
      '🔴 RED PILL TAKEN',
      '🕳️ FALLING DOWN THE RABBIT HOLE...',
      '',
      '💊 Welcome to the real world, Neo.',
      '🤖 The Matrix has you...',
      '🔢 There is no spoon.',
      '',
      '💡 Type "exit" to return to reality'
    ]
  },
  {
    name: 'joke',
    description: 'Programming joke',
    action: async () => {
      const jokes = [
        '🤣 Why do programmers prefer dark mode?\n   Because light attracts bugs! 🐛',
        '😂 How many programmers does it take to change a light bulb?\n   None. That\'s a hardware problem! 💡',
        '🤓 Why don\'t programmers like nature?\n   It has too many bugs! 🦗',
        '😄 What\'s a programmer\'s favorite hangout place?\n   Foo Bar! 🍺',
        '🤖 Why do Java developers wear glasses?\n   Because they can\'t C#! 👓',
        '🔥 How do you comfort a JavaScript bug?\n   You console it! 🐞'
      ]
      return [jokes[Math.floor(Math.random() * jokes.length)]]
    }
  },
  {
    name: 'clear',
    aliases: ['cls'],
    description: 'Clear terminal',
    action: async () => []
  },
  {
    name: 'documents',
    aliases: ['docs', 'files'],
    description: 'List available documents',
    action: async () => [
      '📁 AVAILABLE DOCUMENTS',
      '',
      '📄 ErenDemir.pdf',
      '   • Complete professional resume & CV',
      '   • View: /files/ErenDemir.pdf',
      '   • Download available',
      '',
      '🐕 Corgis.png',
      '   • Personal photo collection',
      '   • View: /files/Corgis.png',
      '   • High resolution image',
      '',
      '🎨 PixelMe.jpg',
      '   • Custom pixel art portrait',
      '   • Used in portfolio interface',
      '   • View: /PixelMe.jpg',
      '',
      '💡 Access via Start Menu → Documents',
      '📂 All files safe to download'
    ]
  }
]