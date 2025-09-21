import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import DesktopIcon from './DesktopIcon'
import Taskbar from './Taskbar'
import type { TaskbarApp } from './Taskbar'
import StartMenu from './StartMenu'
import type { StartMenuItem } from './StartMenu'
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
      <div className="space-y-4 text-left">
        <p>
          Welcome to the retro desktop! I craft playful, interactive experiences that blend art,
          storytelling, and engineered polish. This world is built as an homage to the machines that
          started it all.
        </p>
        <ul className="list-disc space-y-2 pl-5">
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
      <div className="space-y-3 text-left">
        <p>Featured builds loaded straight from the archives:</p>
        <ul className="space-y-2 border-l-4 border-pixel-amber pl-3">
          <li>
            <strong>Retro OS Portfolio</strong> – A draggable window system with a living terminal and
            secret commands.
          </li>
          <li>
            <strong>Arcade Mini Games</strong> – Pixel-perfect Pong, Snake, and Tetris built in React.
          </li>
          <li>
            <strong>Synthwave Dashboard</strong> – Framer Motion + Web Audio for reactive soundscapes.
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

const DESKTOP_SHORTCUTS: DesktopShortcut[] = [
  { id: 'about', label: 'About Me', icon: '👤', description: 'Meet the pixel hero' },
  { id: 'projects', label: 'Projects', icon: '💼', description: 'Interactive builds & case studies' },
  { id: 'terminal', label: 'Terminal', icon: '💻', description: 'Hack the portfolio' },
  { id: 'resume', label: 'Resume', icon: '📄', description: 'Experience & skills hologram' },
  { id: 'contact', label: 'Contact', icon: '📧', description: 'Transmission channels' },
  { id: 'games', label: 'Games', icon: '🎮', description: 'Easter eggs & arcade fun' },
]

const START_MENU_BLUEPRINT = DESKTOP_SHORTCUTS.map(({ id, label, description }) => ({
  id,
  label,
  description,
}))

const Desktop = () => {
  const [time, setTime] = useState(new Date())
  const [selectedShortcut, setSelectedShortcut] = useState<WindowId | null>(null)
  const [isStartOpen, setIsStartOpen] = useState(false)
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

  const startMenuItems: StartMenuItem[] = START_MENU_BLUEPRINT.map((item) => ({
    ...item,
    onSelect: () => openWindow(item.id),
  }))

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-pixel-black font-pixel text-pixel-green"
      onMouseDown={handleDesktopMouseDown}
    >
      <Wallpaper />

      <div className="relative z-10 flex h-full flex-col">
        <div className="relative flex-1">
          <div className="absolute inset-0 p-6">
            <div className="flex h-full w-full">
              <div className="flex w-56 flex-col gap-6">
                {DESKTOP_SHORTCUTS.map((shortcut) => (
                  <DesktopIcon
                    key={shortcut.id}
                    icon={shortcut.icon}
                    label={shortcut.label}
                    isActive={selectedShortcut === shortcut.id}
                    onSelect={() => handleShortcutSelect(shortcut.id)}
                    onActivate={() => handleShortcutActivate(shortcut.id)}
                  />
                ))}
              </div>
            </div>

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

        <Taskbar
          timeLabel={timeLabel}
          isStartOpen={isStartOpen}
          onToggleStart={() => setIsStartOpen((value) => !value)}
          apps={taskbarApps}
        />

        <StartMenu items={startMenuItems} isVisible={isStartOpen} />
      </div>
    </div>
  )
}

export default Desktop
