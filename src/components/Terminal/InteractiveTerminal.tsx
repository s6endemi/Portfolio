import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TerminalLine {
  id: string
  type: 'system' | 'user' | 'output' | 'error' | 'help' | 'music' | 'games' | 'matrix'
  text: string
  timestamp: Date
  isTyping?: boolean
}

interface Command {
  name: string
  description: string
  action: (args: string[]) => Promise<string | string[]>
  aliases?: string[]
}

const InteractiveTerminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isBooting, setIsBooting] = useState(true)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Boot sequence
  useEffect(() => {
    const bootSequence = [
      { text: '████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     ', delay: 100 },
      { text: '╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     ', delay: 150 },
      { text: '   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     ', delay: 200 },
      { text: '   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     ', delay: 250 },
      { text: '   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗', delay: 300 },
      { text: '   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝', delay: 350 },
      { text: '', delay: 500 },
      { text: '🎮 PIXEL PORTFOLIO TERMINAL v2.1.337', delay: 600 },
      { text: '📡 Connecting to neural network...', delay: 800 },
      { text: '✅ Connection established!', delay: 1000 },
      { text: '🧠 Loading AI personality matrix...', delay: 1200 },
      { text: '✅ Personality loaded: [CREATIVE_DEVELOPER]', delay: 1400 },
      { text: '🎯 Initializing interactive shell...', delay: 1600 },
      { text: '✅ Ready for commands!', delay: 1800 },
      { text: '', delay: 2000 },
      { text: '💡 Type "help" to see available commands', delay: 2200 },
      { text: '🎵 Type "music" for background vibes', delay: 2400 },
      { text: '🎮 Type "games" to unlock mini arcade', delay: 2600 },
      { text: '', delay: 2800 },
    ]

    let timeoutIds: number[] = []

    bootSequence.forEach((item, index) => {
      const timeoutId = setTimeout(() => {
        setLines(prev => [...prev, {
          id: `boot-${index}`,
          type: 'system',
          text: item.text,
          timestamp: new Date(),
          isTyping: true
        }])

        if (index === bootSequence.length - 1) {
          setTimeout(() => {
            setIsBooting(false)
            inputRef.current?.focus()
          }, 500)
        }
      }, item.delay)

      timeoutIds.push(timeoutId)
    })

    return () => {
      timeoutIds.forEach(clearTimeout)
    }
  }, [])

  // Commands system
  const commands: Command[] = [
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
        '💡 More projects coming soon!'
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
        '██████████░░ Pixel Art           [ADVANCED]'
      ]
    },
    {
      name: 'contact',
      description: 'Contact information',
      action: async () => [
        '📧 CONTACT EREN - PIXEL DEVELOPER',
        '',
        '📨 Email: eren.pixel@retro.dev',
        '💬 Discord: pixeleren#1337',
        '🐦 Twitter: @pixeleren',
        '💼 LinkedIn: /in/eren-pixel-dev',
        '🐙 GitHub: github.com/pixeleren',
        '',
        '⚡ Response time: Usually within 24h',
        '💡 Mention "pixel terminal" for priority!'
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
          '😄 What\'s a programmer\'s favorite hangout place?\n   Foo Bar! 🍺'
        ]
        return [jokes[Math.floor(Math.random() * jokes.length)]]
      }
    },
    {
      name: 'clear',
      aliases: ['cls'],
      description: 'Clear terminal',
      action: async () => {
        setLines([])
        return []
      }
    }
  ]

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  // Process command
  const processCommand = async (input: string) => {
    const trimmedInput = input.trim()
    if (!trimmedInput) return

    // Add user input to history
    setLines(prev => [...prev, {
      id: `user-${Date.now()}`,
      type: 'user',
      text: `eren@portfolio:~$ ${trimmedInput}`,
      timestamp: new Date()
    }])

    setCommandHistory(prev => [...prev, trimmedInput])
    setHistoryIndex(-1)
    setIsProcessing(true)

    // Find command
    const [commandName, ...args] = trimmedInput.toLowerCase().split(' ')
    const command = commands.find(cmd => 
      cmd.name === commandName || cmd.aliases?.includes(commandName)
    )

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200))

    if (command) {
      try {
        const result = await command.action(args)
        const outputLines = Array.isArray(result) ? result : [result]
        
        // Determine command type for neon colors
        let commandType: TerminalLine['type'] = 'output'
        if (commandName === 'help') commandType = 'help'
        else if (commandName === 'music') commandType = 'music'
        else if (commandName === 'games') commandType = 'games'
        else if (commandName === 'matrix') commandType = 'matrix'
        
        outputLines.forEach((line, index) => {
          setTimeout(() => {
            setLines(prev => [...prev, {
              id: `output-${Date.now()}-${index}`,
              type: commandType,
              text: line,
              timestamp: new Date(),
              isTyping: true
            }])
          }, index * 50)
        })
      } catch (error) {
        setLines(prev => [...prev, {
          id: `error-${Date.now()}`,
          type: 'error',
          text: `❌ Error executing command: ${commandName}`,
          timestamp: new Date()
        }])
      }
    } else {
      setLines(prev => [...prev, {
        id: `error-${Date.now()}`,
        type: 'error',
        text: `❌ Command not found: ${commandName}. Type "help" for available commands.`,
        timestamp: new Date()
      }])
    }

    setIsProcessing(false)
  }

  // Handle input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(currentInput)
      setCurrentInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentInput('')
        } else {
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      }
    }
  }

  return (
    <div className="flex flex-col relative overflow-hidden" style={{ height: '580px' }}>
      {/* Terminal Header */}
      <div 
        className="flex items-center justify-between px-4 py-2 border-b-2 font-pixel text-xs"
        style={{
          background: 'linear-gradient(90deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)',
          borderBottomColor: '#1a252f',
          color: '#00ff41'
        }}
      >
        <div className="flex items-center gap-2">
          <span className="animate-pulse">●</span>
          <span>TERMINAL.EXE</span>
        </div>
        <div className="flex items-center gap-2 text-xs opacity-75">
          <span>PID: 1337</span>
          <span>|</span>
          <span>MEM: 42MB</span>
        </div>
      </div>

      {/* Terminal Content - Scrollable */}
      <div 
        ref={terminalRef}
        className="flex-1 p-6 font-mono text-base overflow-y-auto terminal-scroll"
        style={{
          backgroundColor: '#0d1117',
          color: '#ffffff',
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.02) 50%, transparent 50%),
            linear-gradient(90deg, rgba(0, 255, 65, 0.005) 50%, transparent 50%)
          `,
          backgroundSize: '100% 3px, 3px 100%',
          lineHeight: '1.6'
        }}
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence>
          {lines.map((line, index) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`mb-1 ${
                line.type === 'system' ? 'text-cyan-400' :
                line.type === 'user' ? 'text-green-300' :
                line.type === 'error' ? 'text-red-400' :
                line.type === 'help' ? 'text-yellow-300' :
                line.type === 'music' ? 'text-purple-300' :
                line.type === 'games' ? 'text-pink-300' :
                line.type === 'matrix' ? 'text-green-400' :
                'text-green-200'
              }`}
              style={{
                fontFamily: 'Courier New, monospace',
                fontSize: '14px',
                lineHeight: '1.6',
                textShadow: 
                  line.type === 'system' ? '0 0 8px currentColor, 0 0 15px currentColor' :
                  line.type === 'user' ? '0 0 8px #86efac, 0 0 15px #86efac' :
                  line.type === 'help' ? '0 0 8px #fbbf24, 0 0 15px #fbbf24' :
                  line.type === 'music' ? '0 0 8px #c084fc, 0 0 15px #c084fc' :
                  line.type === 'games' ? '0 0 8px #f472b6, 0 0 15px #f472b6' :
                  line.type === 'matrix' ? '0 0 8px #22c55e, 0 0 15px #22c55e' :
                  '0 0 6px #bbf7d0, 0 0 12px #bbf7d0',
                letterSpacing: '0.5px'
              }}
            >
              {line.isTyping ? (
                <TypewriterText text={line.text} speed={30} />
              ) : (
                line.text
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Boot Progress */}
        {isBooting && (
          <div className="mt-6 p-4">
            <div className="flex items-center gap-3 text-cyan-400">
              <span className="animate-spin text-lg">⚡</span>
              <span style={{ textShadow: '0 0 8px #22d3ee' }}>Booting terminal...</span>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Input Area - ALWAYS visible */}
      <div 
        className="border-t-2 p-4 bg-black/90"
        style={{
          borderTopColor: '#00ff41',
          backdropFilter: 'blur(5px)'
        }}
      >
        <div className="flex items-center p-3 rounded border border-green-800/50 bg-black/40">
          <span 
            className="text-cyan-300 mr-3 font-bold"
            style={{
              textShadow: '0 0 8px #22d3ee, 0 0 15px #22d3ee',
              fontSize: '15px'
            }}
          >
            eren@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing || isBooting}
            className="flex-1 bg-transparent border-none outline-none font-mono"
            style={{
              fontSize: '15px',
              fontFamily: 'Courier New, monospace',
              letterSpacing: '0.8px',
              color: '#e6fffa',
              textShadow: '0 0 8px #86efac, 0 0 15px #86efac'
            }}
            placeholder={
              isBooting ? "🚀 Booting..." : 
              isProcessing ? "⚡ Processing..." : 
              "Type command + Enter..."
            }
          />
          <span 
            className="animate-pulse ml-2"
            style={{
              fontSize: '18px',
              color: '#e6fffa',
              textShadow: '0 0 10px #86efac, 0 0 20px #86efac'
            }}
          >
            █
          </span>
        </div>
      </div>

      {/* Scanlines Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.1) 2px, rgba(0, 255, 65, 0.1) 4px)',
          animation: 'scan 0.1s linear infinite'
        }}
      />

      {/* CRT Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, transparent 40%, rgba(0, 255, 65, 0.1) 100%)',
          animation: 'glow 2s ease-in-out infinite alternate'
        }}
      />
    </div>
  )
}

// Typewriter component
const TypewriterText = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return <span>{displayText}</span>
}

export default InteractiveTerminal