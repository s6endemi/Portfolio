import { useEffect, useMemo, useState } from 'react'
import type { ReactNode, MouseEvent as ReactMouseEvent } from 'react'
import { AnimatePresence } from 'framer-motion'
import DesktopIcon from './DesktopIcon'
import Taskbar from './Taskbar'
import type { TaskbarApp } from './Taskbar'
import NewStartMenu from './NewStartMenu'
import DesktopWindow from './DesktopWindow'
import Wallpaper from './Wallpaper'
import InteractiveTerminal from '../Terminal/InteractiveTerminal'

type WindowId = 'about' | 'projects' | 'terminal' | 'resume' | 'contact' | 'games'

type WindowConfig = {
  title: string
  icon: string
  position: { x: number; y: number }
  content: ReactNode
  size?: { width: number; height: number }
}

type WindowOriginMap = Partial<Record<WindowId, { x: number; y: number }>>
type WindowPositionMap = Partial<Record<WindowId, { x: number; y: number }>>

const WINDOW_CONFIG: Record<WindowId, WindowConfig> = {
  about: {
    title: 'ABOUT_ME.EXE',
    icon: '👤',
    position: { x: 220, y: 140 },
    content: (
      <div className="space-y-6 text-left font-pixel-content text-[14px] leading-[1.8] tracking-[0.01em] text-[#433222]">
        <section className="rounded-lg border-2 border-[#d0c4b0] bg-white/95 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src="/PixelMe.jpg"
                alt="Pixel art portrait of Eren"
                className="block rounded-lg border-2 border-[#d0c4b0] bg-[#faf3e5] shadow-[3px_3px_0_0_rgba(139,111,71,0.3)] object-cover"
                style={{
                  imageRendering: 'pixelated',
                  width: '192px',
                  height: '192px',
                  maxWidth: '192px',
                  maxHeight: '192px',
                  minWidth: '192px',
                  minHeight: '192px'
                }}
                loading="lazy"
              />
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full border border-[#16a34a] bg-[#22c55e] shadow-[1px_1px_0_0_rgba(139,111,71,0.4)]"></div>
            </div>
            <div className="space-y-3 text-center">
              <p>
                Hey there! I'm Eren, an AI engineer and founder who believes code can prevent suffering before it starts.
                Currently building the future of preventive healthcare through computer vision and multimodal AI.
              </p>
              <p className="text-[13px] opacity-90">
                When I'm not training neural networks, you'll find me improvising on piano, or working from random cafés
                around the world. From athlete to tech builder - I approach startups like sports: discipline, teamwork,
                and knowing when to pivot.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 rounded-lg border-2 border-[#d0c4b0] bg-[#faf3e5]/85 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.15)] md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">
              Core Focus
            </h3>
            <ul className="space-y-2 text-[12px] leading-relaxed">
              <li>🔬 Computer Vision & ML for healthcare innovation</li>
              <li>🧠 Building AI that discovers patterns humans can't see</li>
              <li>⚡ Turning academic research into real-world impact</li>
              <li>🌍 Remote-first lifestyle with global perspective</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">
              Snapshot Stats
            </h3>
            <div className="grid gap-2 text-[12px]">
              <div className="rounded-md border border-[#d0c4b0] bg-white/90 px-3 py-2 shadow-[2px_2px_0_0_rgba(139,111,71,0.18)]">
                <span className="block text-[10px] uppercase tracking-[0.3em] text-[#9b7a52]">Years in AI</span>
                <span className="text-[14px] font-semibold">4+</span>
              </div>
              <div className="rounded-md border border-[#d0c4b0] bg-white/90 px-3 py-2 shadow-[2px_2px_0_0_rgba(139,111,71,0.18)]">
                <span className="block text-[10px] uppercase tracking-[0.3em] text-[#9b7a52]">Funding Raised</span>
                <span className="text-[14px] font-semibold">€300k</span>
              </div>
              <div className="rounded-md border border-[#d0c4b0] bg-white/90 px-3 py-2 shadow-[2px_2px_0_0_rgba(139,111,71,0.18)]">
                <span className="block text-[10px] uppercase tracking-[0.3em] text-[#9b7a52]">Current Mood</span>
                <span className="text-[14px] font-semibold">Caffeinated & Optimistic</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3 rounded-lg border-2 border-[#d0c4b0] bg-white/95 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
          <h3 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">
            Currently Exploring
          </h3>
          <ul className="space-y-2 text-[12px]">
            <li>🎯 Multimodal health intelligence (movement + voice + face)</li>
            <li>📐 Position-invariant pose estimation algorithms</li>
            <li>🦄 Building Munich's next unicorn (relocating 2025 hopefully)</li>
            <li>🧬 The intersection of longevity and prevention</li>
          </ul>
        </section>
      </div>
    ),
  },
  projects: {
    title: 'PROJECTS.EXE',
    icon: '💼',
    position: { x: 540, y: 180 },
     content: (
       <div className="space-y-4 text-left font-pixel-content text-sm leading-relaxed">
         <p className="text-pixel-text">Featured builds loaded straight from the archives:</p>
         <ul className="space-y-3 border-l-4 border-pixel-warning pl-4 text-pixel-text-light">
           <li>
             <strong className="text-pixel-primary">Retro OS Portfolio</strong> – A draggable window system with a living terminal and
             secret commands.
           </li>
           <li>
             <strong className="text-pixel-secondary">Arcade Mini Games</strong> – Pixel-perfect Pong, Snake, and Tetris built in React.
           </li>
           <li>
             <strong className="text-pixel-accent">Synthwave Dashboard</strong> – Framer Motion + Web Audio for reactive soundscapes.
           </li>
         </ul>
       </div>
     ),
  },
  terminal: {
    title: 'TERMINAL.EXE',
    icon: '💻',
    position: { x: 300, y: 80 },
    content: <InteractiveTerminal />,
  },
  resume: {
    title: 'RESUME.PDF',
    icon: '📄',
    position: { x: 140, y: 360 },
    content: (
      <div className="space-y-6 text-left font-pixel-content text-[14px] leading-[1.8] tracking-[0.01em] text-[#3f2f1f]">
        <section className="rounded-lg border-2 border-[#d0c4b0] bg-white p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-pixel text-[12px] uppercase tracking-[0.35em] text-[#7c6544]">
                Current Role
              </h3>
              <p className="text-[13px] font-semibold">Senior Frontend & Creative Developer @ Pixel Studio</p>
            </div>
            <span className="rounded-md border border-[#d0c4b0] bg-[#faf3e5] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#886746]">
              2021 → Now
            </span>
          </div>
          <ul className="mt-3 space-y-2 text-[12px]">
            <li>• Lead design-to-code delivery for immersive marketing experiences</li>
            <li>• Prototype motion systems and audio feedback with Framer Motion + Howler</li>
            <li>• Partner with designers to develop cohesive design systems & tooling</li>
          </ul>
        </section>

        <section className="grid gap-4 rounded-lg border-2 border-[#d0c4b0] bg-[#faf7f0]/90 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)] md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">
              Skill Stack
            </h3>
            <div className="flex flex-wrap gap-2 text-[11px]">
              {['React 18', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Node & Express', 'Design Systems', 'WebGL Basics', 'Creative Coding'].map((chip) => (
                <span
                  key={chip}
                  className="rounded border border-[#d0c4b0] bg-white/90 px-2 py-1 shadow-[2px_2px_0_0_rgba(139,111,71,0.18)]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">
              Highlights
            </h3>
            <ul className="space-y-2 text-[12px]">
              <li>• Mentored designers learning React & motion fundamentals</li>
              <li>• Built tooling to speed up asset pipelines by 35%</li>
              <li>• Speaker at meetups on nostalgic UI and playful UX</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg border-2 border-[#d0c4b0] bg-white/95 p-4 text-[12px] shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
          <p>
            Full PDF resume available via the Start → Documents link. Let me know if you prefer a
            tailored version for a specific role—happy to curate a focused case-study set.
          </p>
        </section>
      </div>
    ),
  },
  contact: {
    title: 'CONTACT.ME',
    icon: '📧',
    position: { x: 620, y: 80 },
    content: (
      <div className="space-y-6 text-left font-pixel-content text-[14px] leading-[1.8] tracking-[0.01em] text-[#3a2b17]">
        <section className="rounded-lg border-2 border-[#d0c4b0] bg-white/95 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.18)]">
          <h3 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">
            Let’s Talk
          </h3>
          <p className="mt-2">
            Whether you want to jam on a pixel-perfect interface, remix a design system, or spin up
            a creative coding collab—drop a line!
          </p>
        </section>

        <section className="space-y-3 rounded-lg border-2 border-[#d0c4b0] bg-[#faf7f0]/90 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.18)]">
          <div className="flex items-center gap-3">
            <span className="text-xl">📨</span>
            <div>
              <h4 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">Email</h4>
              <a
                href="mailto:eren.pixel@retro.dev"
                className="text-[#54768a] underline-offset-2 hover:underline"
              >
                eren.pixel@retro.dev
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">💬</span>
            <div>
              <h4 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">Discord</h4>
              <p className="text-[12px]">pixeleren</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">🐦</span>
            <div>
              <h4 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">X / Twitter</h4>
              <a
                href="https://x.com/pixeleren"
                target="_blank"
                rel="noreferrer"
                className="text-[#54768a] underline-offset-2 hover:underline"
              >
                @pixeleren
              </a>
            </div>
          </div>
        </section>

        <section className="rounded-lg border-2 border-[#d0c4b0] bg-white/95 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.18)]">
          <h3 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">
            Office Hours
          </h3>
          <p className="mt-2 text-[12px]">
            Weekdays 09:00–17:00 CET — calling from Cologne, Germany. Terminal command
            <code className="ml-1 rounded bg-[#f0e5d4] px-1 py-0.5">call eren</code> will soon trigger a playful
            audio handshake.
          </p>
        </section>
      </div>
    ),
  },
  games: {
    title: 'GAMES.EXE',
    icon: '🎮',
    position: { x: 420, y: 120 },
    content: (
      <div className="h-full p-6" style={{
        background: 'linear-gradient(180deg, rgba(248,240,223,0.95) 0%, rgba(255,255,255,0.9) 55%, rgba(249,237,218,0.95) 100%)',
      }}>
        {/* Retro Header */}
        <div className="mb-6 text-center relative">
          <div className="inline-block relative">
            <h2 className="font-pixel text-[18px] uppercase tracking-[0.4em] text-[#5d4e37] mb-2 relative z-10">
              ◊ PIXEL ARCADE ◊
            </h2>
            <div className="absolute inset-0 bg-[#d4a574]/20 blur-md rounded-lg"></div>
          </div>
          <p className="text-[11px] text-[#8b6f47] font-pixel-content">
            › SELECT YOUR RETRO ADVENTURE ‹
          </p>
        </div>

        {/* 3-Column Games Grid */}
        <div className="grid grid-cols-3 gap-4 h-[260px]">
          {/* Snake Game */}
          <div
            onClick={() => window.open('https://playsnake.org/', '_blank')}
            className="group relative overflow-hidden rounded-lg border-2 border-[#d0c4b0] bg-white/90 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)] hover:shadow-[6px_6px_0_0_rgba(139,111,71,0.4)] transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            {/* Pixel Art Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(45deg, #22c55e 25%, transparent 25%),
                linear-gradient(-45deg, #22c55e 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #22c55e 75%),
                linear-gradient(-45deg, transparent 75%, #22c55e 75%)
              `,
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
            }}></div>

            <div className="relative h-full p-4 flex flex-col justify-between">
              <div className="text-center">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">🐍</div>
                <h3 className="font-pixel text-[12px] uppercase tracking-[0.2em] text-[#5d4e37] mb-2">
                  SNAKE
                </h3>
                <p className="text-[9px] text-[#8b6f47] font-pixel-content leading-relaxed">
                  Classic serpent navigation with pixel-perfect controls
                </p>
              </div>


              <div className="text-center">
                <div className="text-[8px] text-[#a7886f] font-pixel mb-2">⌨️ ARROW KEYS</div>
                <div className="inline-block px-2 py-1 bg-[#22c55e]/20 border border-[#22c55e]/40 rounded text-[9px] font-pixel text-[#5d4e37] group-hover:bg-[#22c55e]/30 transition-colors duration-200">
                  ▶ PLAY
                </div>
              </div>
            </div>
          </div>

          {/* Pong Game */}
          <div
            onClick={() => window.open('https://ponggame.org/', '_blank')}
            className="group relative overflow-hidden rounded-lg border-2 border-[#d0c4b0] bg-white/90 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)] hover:shadow-[6px_6px_0_0_rgba(139,111,71,0.4)] transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            {/* Pixel Art Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(45deg, #3b82f6 25%, transparent 25%),
                linear-gradient(-45deg, #3b82f6 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #3b82f6 75%),
                linear-gradient(-45deg, transparent 75%, #3b82f6 75%)
              `,
              backgroundSize: '6px 6px',
              backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px'
            }}></div>

            <div className="relative h-full p-4 flex flex-col justify-between">
              <div className="text-center">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">🏓</div>
                <h3 className="font-pixel text-[12px] uppercase tracking-[0.2em] text-[#5d4e37] mb-2">
                  PONG
                </h3>
                <p className="text-[9px] text-[#8b6f47] font-pixel-content leading-relaxed">
                  Retro table tennis with authentic CRT feel
                </p>
              </div>

              <div className="text-center">
                <div className="text-[8px] text-[#a7886f] font-pixel mb-2">🖱️ MOUSE</div>
                <div className="inline-block px-2 py-1 bg-[#3b82f6]/20 border border-[#3b82f6]/40 rounded text-[9px] font-pixel text-[#5d4e37] group-hover:bg-[#3b82f6]/30 transition-colors duration-200">
                  ▶ PLAY
                </div>
              </div>
            </div>
          </div>

          {/* Tetris Game */}
          <div
            onClick={() => window.open('https://tetris.com/play-tetris/', '_blank')}
            className="group relative overflow-hidden rounded-lg border-2 border-[#d0c4b0] bg-white/90 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)] hover:shadow-[6px_6px_0_0_rgba(139,111,71,0.4)] transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            {/* Pixel Art Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(45deg, #ec4899 25%, transparent 25%),
                linear-gradient(-45deg, #ec4899 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #ec4899 75%),
                linear-gradient(-45deg, transparent 75%, #ec4899 75%)
              `,
              backgroundSize: '10px 10px',
              backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
            }}></div>

            <div className="relative h-full p-4 flex flex-col justify-between">
              <div className="text-center">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">🧩</div>
                <h3 className="font-pixel text-[12px] uppercase tracking-[0.2em] text-[#5d4e37] mb-2">
                  TETRIS
                </h3>
                <p className="text-[9px] text-[#8b6f47] font-pixel-content leading-relaxed">
                  Stack blocks and clear lines in this puzzle classic
                </p>
              </div>

              <div className="text-center">
                <div className="text-[8px] text-[#a7886f] font-pixel mb-2">⌨️ ROTATIONS</div>
                <div className="inline-block px-2 py-1 bg-[#ec4899]/20 border border-[#ec4899]/40 rounded text-[9px] font-pixel text-[#5d4e37] group-hover:bg-[#ec4899]/30 transition-colors duration-200">
                  ▶ PLAY
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Retro Footer */}
        <div className="mt-6 text-center relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[#d4a574]">◆</span>
            <span className="text-[9px] text-[#8b6f47] font-pixel uppercase tracking-[0.2em]">ARCADE STATUS: ONLINE</span>
            <span className="text-[#d4a574]">◆</span>
          </div>
          <p className="text-[8px] text-[#a7886f] font-pixel-content opacity-75">
            › GAMES OPEN IN NEW TABS • NO DOWNLOADS REQUIRED ‹
          </p>
        </div>
      </div>
    ),
  },
}

type DesktopShortcut = {
  id: WindowId
  label: string
  icon: string
  description: string
  position: { x: number; y: number }
}

const DESKTOP_SHORTCUTS: DesktopShortcut[] = [
  {
    id: 'about',
    label: 'ABOUT ME',
    icon: '👤',
    description: 'Personal info and background',
    position: { x: 80, y: 120 }
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    icon: '💼',
    description: 'Portfolio and work samples',
    position: { x: 80, y: 240 }
  },
  {
    id: 'terminal',
    label: 'TERMINAL',
    icon: '💻',
    description: 'Interactive command line',
    position: { x: 80, y: 360 }
  },
  {
    id: 'resume',
    label: 'RESUME',
    icon: '📄',
    description: 'Professional experience',
    position: { x: 1200, y: 120 }
  },
  {
    id: 'contact',
    label: 'CONTACT',
    icon: '📧',
    description: 'Get in touch',
    position: { x: 1200, y: 240 }
  },
  {
    id: 'games',
    label: 'GAMES',
    icon: '🎮',
    description: 'Retro arcade games',
    position: { x: 1200, y: 360 }
  }
]

// Responsive icon positioning function
const getResponsiveIconPosition = (shortcut: DesktopShortcut, screenWidth: number, allShortcuts: DesktopShortcut[]) => {
  const isMobile = screenWidth < 768
  const isTablet = screenWidth < 1024
  const isRightSide = shortcut.position.x > 600 // Original right-side icons

  if (isMobile) {
    // Mobile: Single column centered
    const leftSideIcons = allShortcuts.filter(s => s.position.x <= 600)
    const rightSideIcons = allShortcuts.filter(s => s.position.x > 600)
    const allIcons = [...leftSideIcons, ...rightSideIcons]
    const index = allIcons.findIndex(s => s.id === shortcut.id)

    return {
      x: Math.max(20, (screenWidth - 80) / 2), // Adjusted for smaller mobile icons
      y: 60 + (index * 100) // Reduced spacing for mobile
    }
  } else if (isTablet) {
    // Tablet: Two columns, closer to edges
    const sideIcons = isRightSide
      ? allShortcuts.filter(s => s.position.x > 600)
      : allShortcuts.filter(s => s.position.x <= 600)
    const index = sideIcons.findIndex(s => s.id === shortcut.id)

    return {
      x: isRightSide ? Math.max(screenWidth - 150, screenWidth - 200) : 40,
      y: 80 + (index * 120)
    }
  } else {
    // Desktop: Original positions, but make sure they fit on screen
    return {
      x: Math.min(shortcut.position.x, screenWidth - 120),
      y: shortcut.position.y
    }
  }
}

const START_MENU_ITEMS = DESKTOP_SHORTCUTS.map(({ id, label, icon, description }) => ({
  id,
  label,
  icon,
  description,
  onClick: () => {}, // Will be set in component
}))

const ICON_DIMENSIONS = {
  width: 96,
  height: 96,
}

const WINDOW_DIMENSIONS = {
  width: 420,
  height: 340,
}

const START_MENU_ORIGIN = { x: 96, y: 440 }

const Desktop = () => {
  const [time, setTime] = useState(new Date())
  const [selectedShortcut, setSelectedShortcut] = useState<WindowId | null>(null)
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [windowOrigins, setWindowOrigins] = useState<WindowOriginMap>({})
  const [windowPositions, setWindowPositions] = useState<WindowPositionMap>(() => ({
    about: WINDOW_CONFIG.about.position,
  }))
  const [openWindows, setOpenWindows] = useState<WindowId[]>(['about'])
  const [maximizedWindows, setMaximizedWindows] = useState<Set<WindowId>>(new Set())
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })

  // Handle responsive screen size changes
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  const handleStartToggle = () => {
    setIsStartOpen((previous) => !previous)
  }

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const timeLabel = useMemo(
    () =>
      time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    [time]
  )

  const focusWindow = (id: WindowId) => {
    setOpenWindows((previous) => {
      if (previous[previous.length - 1] === id) {
        return previous
      }
      const withoutId = previous.filter((windowId) => windowId !== id)
      return [...withoutId, id]
    })

    // On mobile, scroll to bring window into view
    const isMobile = screenSize.width < 768
    if (isMobile && windowPositions[id]) {
      const windowY = windowPositions[id].y
      const scrollContainer = document.querySelector('.desktop-scroll')
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: Math.max(0, windowY - 50),
          behavior: 'smooth'
        })
      }
    }
  }

  const openWindow = (id: WindowId, origin?: { x: number; y: number }) => {
    const alreadyOpen = openWindows.includes(id)
    const isMobile = screenSize.width < 768

    if (origin && !alreadyOpen) {
      setWindowOrigins((previous) => ({
        ...previous,
        [id]: origin,
      }))

      if (typeof window !== 'undefined') {
        window.setTimeout(() => {
          setWindowOrigins((previous) => {
            const { [id]: _removed, ...rest } = previous
            return rest
          })
        }, 360)
      }
    }

    if (!alreadyOpen && !windowPositions[id]) {
      // On mobile, center windows and position them higher
      const mobilePosition = isMobile
        ? { x: Math.max(10, (screenSize.width - 520) / 2), y: 20 }
        : WINDOW_CONFIG[id].position

      setWindowPositions((previous) => ({
        ...previous,
        [id]: mobilePosition,
      }))
    }

    setIsStartOpen(false)
    setOpenWindows((previous) => {
      if (previous.includes(id)) {
        return [...previous.filter((windowId) => windowId !== id), id]
      }
      return [...previous, id]
    })
  }

  const closeWindow = (id: WindowId) => {
    setOpenWindows((previous) => previous.filter((windowId) => windowId !== id))
    setWindowOrigins((previous) => {
      const { [id]: _removed, ...rest } = previous
      return rest
    })
    setMaximizedWindows((previous) => {
      const newSet = new Set(previous)
      newSet.delete(id)
      return newSet
    })
  }

  const toggleWindowMaximize = (id: WindowId) => {
    setMaximizedWindows((previous) => {
      const newSet = new Set(previous)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleShortcutActivate = (shortcut: (typeof DESKTOP_SHORTCUTS)[number]) => {
    const origin = {
      x: Math.max(
        0,
        shortcut.position.x + ICON_DIMENSIONS.width / 2 - WINDOW_DIMENSIONS.width / 2,
      ),
      y: Math.max(
        0,
        shortcut.position.y + ICON_DIMENSIONS.height / 2 - WINDOW_DIMENSIONS.height / 2,
      ),
    }
    openWindow(shortcut.id, origin)
  }

  const handleShortcutSelect = (id: WindowId) => {
    setSelectedShortcut(id)
    setIsStartOpen(false)
  }

  const handleDesktopMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    const interactedWithTaskbar = target.closest('[data-role="taskbar"]') !== null
    const interactedWithStartMenu = target.closest('[data-role="start-menu"]') !== null
    const interactedWithIcon = target.closest('[data-role="desktop-icon"]') !== null

    if (!interactedWithTaskbar && !interactedWithStartMenu) {
      setIsStartOpen(false)
    }

    if (!interactedWithIcon) {
      setSelectedShortcut(null)
    }
  }

  const handleWindowDragEnd = (id: WindowId, nextPosition: { x: number; y: number }) => {
    setWindowPositions((previous) => ({
      ...previous,
      [id]: nextPosition,
    }))
    focusWindow(id)
  }

  const taskbarApps: TaskbarApp[] = openWindows.map((id) => {
    const config = WINDOW_CONFIG[id]
    const isActive = openWindows[openWindows.length - 1] === id
    return {
      id,
      label: config.title,
      icon: config.icon,
      isActive,
      onClick: () => focusWindow(id),
    }
  })

  const startMenuItems = START_MENU_ITEMS.map((item) => ({
    ...item,
    onClick: () => openWindow(item.id as WindowId, START_MENU_ORIGIN),
  }))

  return (
    <div
      className="relative h-screen w-screen font-pixel touch-manipulation desktop-scroll"
      style={{
        backgroundColor: '#faf7f0',
        color: '#5d4e37',
        backgroundImage: 'url(/wallpapers/cozy-pixel.svg)',
        backgroundSize: 'clamp(200px, 50vw, 400px) clamp(150px, 37.5vw, 300px)',
        backgroundRepeat: 'repeat',
        // Enable mobile scrolling while keeping desktop experience
        overflow: screenSize.width < 768 ? 'auto' : 'hidden',
        // Add smooth scrolling for mobile
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch'
      }}
      onMouseDown={handleDesktopMouseDown}
      onTouchStart={handleDesktopMouseDown}
    >
      <Wallpaper />

      <div
        className="relative z-10 flex flex-col"
        style={{
          // On mobile, allow content to be taller than screen to enable scrolling
          minHeight: screenSize.width < 768 ? 'calc(100vh + 400px)' : '100vh',
          height: screenSize.width < 768 ? 'auto' : '100vh'
        }}
      >
         <div
           className="relative"
           style={{
             flex: screenSize.width < 768 ? 'none' : '1',
             minHeight: screenSize.width < 768 ? 'calc(100vh + 350px)' : 'auto',
             // Add padding bottom on mobile to account for fixed taskbar
             paddingBottom: screenSize.width < 768 ? '80px' : '0'
           }}
         >
           <div className="absolute inset-0">
             {/* Desktop Icons - Responsive positioned */}
             {DESKTOP_SHORTCUTS.map((shortcut) => {
               const responsivePosition = getResponsiveIconPosition(shortcut, screenSize.width, DESKTOP_SHORTCUTS)

               return (
                 <div
                   key={shortcut.id}
                   className="absolute transition-all duration-300 ease-out"
                   style={{
                     left: `${responsivePosition.x}px`,
                     top: `${responsivePosition.y}px`
                   }}
                 >
                   <DesktopIcon
                     icon={shortcut.icon}
                     label={shortcut.label}
                     isActive={selectedShortcut === shortcut.id}
                     onSelect={() => handleShortcutSelect(shortcut.id)}
                     onActivate={() => handleShortcutActivate(shortcut)}
                   />
                 </div>
               )
             })}

            <AnimatePresence>
              {openWindows.map((id) => {
                const config = WINDOW_CONFIG[id]
                const isFocused = openWindows[openWindows.length - 1] === id
                const currentPosition = windowPositions[id] ?? config.position
                const isMaximizable = ['about', 'resume'].includes(id) // Only About Me and Resume can be maximized
                const isMaximized = isMaximizable ? maximizedWindows.has(id) : true // Non-maximizable windows are always "maximized"

                return (
                  <DesktopWindow
                    key={id}
                    title={config.title}
                    icon={config.icon}
                    position={currentPosition}
                    isFocused={isFocused}
                    onClose={() => closeWindow(id)}
                    onFocus={() => focusWindow(id)}
                    origin={windowOrigins[id]}
                    onDragEnd={(next) => handleWindowDragEnd(id, next)}
                    isMaximized={isMaximized}
                    onToggleMaximize={isMaximizable ? () => toggleWindowMaximize(id) : undefined}
                  >
                    {config.content}
                  </DesktopWindow>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        <div
          className="relative"
          style={{
            // On mobile, make taskbar fixed at bottom of screen
            position: screenSize.width < 768 ? 'fixed' : 'relative',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50
          }}
        >
          <Taskbar
            timeLabel={timeLabel}
            isStartOpen={isStartOpen}
            onToggleStart={handleStartToggle}
            apps={taskbarApps}
          />
          <NewStartMenu 
            isOpen={isStartOpen}
            onClose={() => setIsStartOpen(false)}
            menuItems={startMenuItems}
          />
        </div>
      </div>
    </div>
  )
}

export default Desktop
