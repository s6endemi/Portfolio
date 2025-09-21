import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import DesktopIcon from './DesktopIcon'
import Taskbar from './Taskbar'
import type { TaskbarApp } from './Taskbar'
import NewStartMenu from './NewStartMenu'
import DesktopWindow from './DesktopWindow'
import Wallpaper from './Wallpaper'

type WindowId = 'about' | 'projects' | 'terminal' | 'resume' | 'contact' | 'games'

type WindowConfig = {
  title: string
  icon: string
  position: { x: number; y: number }
  content: ReactNode
}

const WINDOW_CONFIG: Record<WindowId, WindowConfig> = {
  about: {
    title: 'ABOUT_ME.EXE',
    icon: '👤',
    position: { x: 220, y: 140 },
     content: (
       <div className="space-y-4 text-left font-pixel-content text-sm leading-relaxed">
         <p className="text-pixel-text">
           Welcome to the retro desktop! I craft playful, interactive experiences that blend art,
           storytelling, and engineered polish. This world is built as an homage to the machines that
           started it all.
         </p>
         <ul className="list-disc space-y-2 pl-5 text-pixel-text-light">
           <li>🛠️ Full-stack focus with React, TypeScript, and creative tooling.</li>
           <li>🎨 Pixel-perfect attention to detail, from UX motion to CRT glow.</li>
           <li>🕹️ Passion for gamified portfolios, narrative UIs, and delightful surprises.</li>
         </ul>
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
    position: { x: 360, y: 320 },
    content: (
      <div className="space-y-3 text-left">
        <p>Boot the in-browser command line to unlock Easter eggs:</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Type <code>help</code> for available commands.</li>
          <li>Run <code>konami</code> to toggle cheat mode visuals.</li>
          <li>Summon mini apps with <code>projects</code>, <code>music</code>, or <code>snake</code>.</li>
        </ol>
        <p className="text-pixel-amber">Stay tuned – a fully interactive terminal is loading soon.</p>
      </div>
    ),
  },
  resume: {
    title: 'RESUME.PDF',
    icon: '📄',
    position: { x: 140, y: 360 },
    content: (
      <div className="space-y-3 text-left">
        <p>Key stats at a glance:</p>
        <ul className="space-y-2 pl-5">
          <li>💼 6+ years in front-end & creative coding.</li>
          <li>🚀 Shipped production apps for startups and agencies.</li>
          <li>🤝 Lead multidisciplinary teams across design & dev.</li>
        </ul>
        <p>Download the full PDF directly from the Start menu.</p>
      </div>
    ),
  },
  contact: {
    title: 'CONTACT.ME',
    icon: '📧',
    position: { x: 620, y: 80 },
    content: (
      <div className="space-y-3 text-left">
        <p>Ping me through your favorite retro protocol:</p>
        <ul className="space-y-2 pl-5">
          <li>📨 Email: eren.pixel@retro.dev</li>
          <li>💬 Discord: pixeleren</li>
          <li>🐦 X/Twitter: @pixeleren</li>
        </ul>
        <p>Bonus: a terminal command will soon enable on-site chat.</p>
      </div>
    ),
  },
  games: {
    title: 'GAMES.EXE',
    icon: '🎮',
    position: { x: 420, y: 120 },
    content: (
      <div className="space-y-3 text-left">
        <p>Mini-games packing that arcade nostalgia:</p>
        <ul className="space-y-2 pl-5">
          <li>🐍 <strong>Snake</strong> – Keyboard-driven, terminal launchable.</li>
          <li>🏓 <strong>Pong</strong> – Two-player fun with CRT scanlines.</li>
          <li>🧩 <strong>Tetris</strong> – Pixel bricks & juicy sound effects.</li>
        </ul>
        <p className="text-pixel-cyan">Collect Easter eggs to unlock more cartridges.</p>
      </div>
    ),
  },
}

type DesktopShortcut = {
  id: WindowId
  label: string
  icon: string
  description: string
}

const DESKTOP_SHORTCUTS: (DesktopShortcut & { position: { x: number; y: number } })[] = [
  { id: 'about', label: 'About Me', icon: '👤', description: 'Meet the pixel hero', position: { x: 80, y: 120 } },
  { id: 'projects', label: 'Projects', icon: '💼', description: 'Interactive builds & case studies', position: { x: 200, y: 80 } },
  { id: 'terminal', label: 'Terminal', icon: '💻', description: 'Hack the portfolio', position: { x: 120, y: 250 } },
  { id: 'resume', label: 'Resume', icon: '📄', description: 'Experience & skills hologram', position: { x: 60, y: 380 } },
  { id: 'contact', label: 'Contact', icon: '📧', description: 'Transmission channels', position: { x: 180, y: 320 } },
  { id: 'games', label: 'Games', icon: '🎮', description: 'Easter eggs & arcade fun', position: { x: 1100, y: 150 } },
]

const START_MENU_ITEMS = DESKTOP_SHORTCUTS.map(({ id, label, icon }) => ({
  id,
  label,
  icon,
  onClick: () => {} // Will be set in component
}))

const Desktop = () => {
  const [time, setTime] = useState(new Date())
  const [selectedShortcut, setSelectedShortcut] = useState<WindowId | null>(null)
  const [isStartOpen, setIsStartOpen] = useState(false)
  
  // Debug function
  const handleStartToggle = () => {
    console.log('Start button clicked! Current state:', isStartOpen)
    setIsStartOpen(!isStartOpen)
  }
  const [openWindows, setOpenWindows] = useState<WindowId[]>(['about'])

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
  }

  const openWindow = (id: WindowId) => {
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
  }

  const handleShortcutActivate = (id: WindowId) => {
    openWindow(id)
  }

  const handleShortcutSelect = (id: WindowId) => {
    setSelectedShortcut(id)
    setIsStartOpen(false)
  }

  const handleDesktopMouseDown = () => {
    setSelectedShortcut(null)
    setIsStartOpen(false)
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
    onClick: () => openWindow(item.id as WindowId),
  }))

  return (
    <div
      className="relative h-screen w-screen overflow-hidden font-pixel"
      style={{ 
        backgroundColor: '#faf7f0',
        color: '#5d4e37',
        backgroundImage: 'url(/wallpapers/cozy-pixel.svg)',
        backgroundSize: '400px 300px',
        backgroundRepeat: 'repeat'
      }}
      onMouseDown={handleDesktopMouseDown}
    >
      <Wallpaper />

      <div className="relative z-10 flex h-full flex-col">
         <div className="relative flex-1">
           <div className="absolute inset-0">
             {/* Desktop Icons - Absolute positioned */}
             {DESKTOP_SHORTCUTS.map((shortcut) => (
               <div
                 key={shortcut.id}
                 className="absolute"
                 style={{ 
                   left: `${shortcut.position.x}px`, 
                   top: `${shortcut.position.y}px` 
                 }}
               >
                 <DesktopIcon
                   icon={shortcut.icon}
                   label={shortcut.label}
                   isActive={selectedShortcut === shortcut.id}
                   onSelect={() => handleShortcutSelect(shortcut.id)}
                   onActivate={() => handleShortcutActivate(shortcut.id)}
                 />
               </div>
             ))}

            {openWindows.map((id) => {
              const config = WINDOW_CONFIG[id]
              const isFocused = openWindows[openWindows.length - 1] === id
              return (
                <DesktopWindow
                  key={id}
                  title={config.title}
                  icon={config.icon}
                  position={config.position}
                  isFocused={isFocused}
                  onClose={() => closeWindow(id)}
                  onFocus={() => focusWindow(id)}
                >
                  {config.content}
                </DesktopWindow>
              )
            })}
          </div>
        </div>

        <div className="relative">
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
