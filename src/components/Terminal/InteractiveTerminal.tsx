import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { commands } from './commands'
import TypewriterText from './TypewriterText'
import { useSoundContext } from '../../contexts/SoundContext'

interface TerminalLine {
  id: string
  type: 'system' | 'user' | 'output' | 'error' | 'help' | 'music' | 'games' | 'matrix'
  text: string
  timestamp: Date
  isTyping?: boolean
}

const InteractiveTerminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isBooting, setIsBooting] = useState(true)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 768)
  const [showScrollButtons, setShowScrollButtons] = useState(false)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const { playSound } = useSoundContext()

  // Track screen size for dynamic font sizing
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Boot sequence
  useEffect(() => {
    const isMobile = window.innerWidth < 768

    const desktopBootSequence = [
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

    const mobileBootSequence = [
      { text: '██████╗ ██╗██╗  ██╗███████╗██╗', delay: 100 },
      { text: '██╔══██╗██║╚██╗██╔╝██╔════╝██║', delay: 200 },
      { text: '██████╔╝██║ ╚███╔╝ █████╗  ██║', delay: 300 },
      { text: '██╔═══╝ ██║ ██╔██╗ ██╔══╝  ██║', delay: 400 },
      { text: '██║     ██║██╔╝ ██╗███████╗███████╗', delay: 500 },
      { text: '╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝', delay: 600 },
      { text: '', delay: 700 },
      { text: '🎮 PORTFOLIO TERMINAL v2.1', delay: 800 },
      { text: '📡 Connecting...', delay: 1000 },
      { text: '✅ Connected!', delay: 1200 },
      { text: '🧠 Loading AI...', delay: 1400 },
      { text: '✅ AI Ready: [DEVELOPER]', delay: 1600 },
      { text: '🎯 Starting shell...', delay: 1800 },
      { text: '✅ Ready!', delay: 2000 },
      { text: '', delay: 2200 },
      { text: '💡 Type "help" for commands', delay: 2400 },
      { text: '🎵 Type "music" for vibes', delay: 2600 },
      { text: '🎮 Type "games" for arcade', delay: 2800 },
      { text: '', delay: 3000 },
    ]

    const bootSequence = isMobile ? mobileBootSequence : desktopBootSequence

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

  // Clear terminal function
  const clearTerminal = () => {
    setLines([])
  }

  // Check if scrolling is needed and update scroll buttons
  const checkScrollable = () => {
    if (terminalRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = terminalRef.current
      const isScrollable = scrollHeight > clientHeight
      const isAtTop = scrollTop <= 10
      const isAtBottom = scrollTop >= scrollHeight - clientHeight - 10

      setShowScrollButtons(isScrollable && screenWidth < 768) // Only show on mobile when scrollable
      setCanScrollUp(isScrollable && !isAtTop)
      setCanScrollDown(isScrollable && !isAtBottom)
    }
  }

  // Auto-scroll to bottom and auto-focus after boot
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      checkScrollable()
    }
  }, [lines])

  // Check scrollable state on screen resize
  useEffect(() => {
    checkScrollable()
  }, [screenWidth])

  // Smooth scroll functions
  const scrollToTop = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  const scrollUp = () => {
    if (terminalRef.current) {
      const scrollAmount = terminalRef.current.clientHeight * 0.7
      terminalRef.current.scrollBy({
        top: -scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const scrollDown = () => {
    if (terminalRef.current) {
      const scrollAmount = terminalRef.current.clientHeight * 0.7
      terminalRef.current.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Auto-focus input after boot with preventDefault to avoid scrolling
  useEffect(() => {
    if (!isBooting && inputRef.current) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus({ preventScroll: true })
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isBooting])

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
        // Handle clear command specially
        if (commandName === 'clear' || commandName === 'cls') {
          clearTerminal()
          setIsProcessing(false)
          return
        }

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
        playSound('error')
      }
    } else {
      setLines(prev => [...prev, {
        id: `error-${Date.now()}`,
        type: 'error',
        text: `❌ Command not found: ${commandName}. Type "help" for available commands.`,
        timestamp: new Date()
      }])
      playSound('error')
    }

    setIsProcessing(false)
  }

  // Handle input and keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(currentInput)
      setCurrentInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (e.ctrlKey || e.metaKey) {
        // Ctrl/Cmd + Arrow Up = scroll up
        scrollUp()
      } else if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (e.ctrlKey || e.metaKey) {
        // Ctrl/Cmd + Arrow Down = scroll down
        scrollDown()
      } else if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentInput('')
        } else {
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      }
    } else if (e.key === 'Home' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      scrollToTop()
    } else if (e.key === 'End' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      scrollToBottom()
    } else if (e.key === 'PageUp') {
      e.preventDefault()
      scrollUp()
    } else if (e.key === 'PageDown') {
      e.preventDefault()
      scrollDown()
    }
  }

  return (
    <div className="flex flex-col h-full relative bg-black touch-manipulation" style={{ height: '100%', maxHeight: '100%' }}>

      {/* Terminal Content - Flexible Layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div
          ref={terminalRef}
          className="flex-1 p-3 sm:p-6 font-mono text-sm sm:text-base overflow-y-auto terminal-scroll touch-optimized"
          style={{
            backgroundColor: '#0d1117',
            color: '#ffffff',
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.015) 50%, transparent 50%),
              linear-gradient(90deg, rgba(0, 255, 65, 0.003) 50%, transparent 50%)
            `,
            backgroundSize: '100% 2px, 2px 100%',
            lineHeight: '1.6',
            maxHeight: '100%'
          }}
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
          onTouchStart={() => inputRef.current?.focus({ preventScroll: true })}
          onScroll={checkScrollable}
        >
        <AnimatePresence>
          {lines.map((line, index) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`mb-2 ${
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
                fontSize: screenWidth < 768 ? '12px' : '14px',
                lineHeight: '1.6',
                textShadow:
                  line.type === 'system' ? '0 0 6px currentColor, 0 0 12px currentColor' :
                  line.type === 'user' ? '0 0 6px #86efac, 0 0 12px #86efac' :
                  line.type === 'help' ? '0 0 6px #fbbf24, 0 0 12px #fbbf24' :
                  line.type === 'music' ? '0 0 6px #c084fc, 0 0 12px #c084fc' :
                  line.type === 'games' ? '0 0 6px #f472b6, 0 0 12px #f472b6' :
                  line.type === 'matrix' ? '0 0 6px #22c55e, 0 0 12px #22c55e' :
                  '0 0 4px #bbf7d0, 0 0 8px #bbf7d0',
                letterSpacing: screenWidth < 768 ? '0.3px' : '0.5px'
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
            <div className="mt-4 sm:mt-6 p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 text-cyan-400">
                <span className="animate-spin text-base sm:text-lg">⚡</span>
                <span
                  className="text-sm sm:text-base"
                  style={{ textShadow: '0 0 8px #22d3ee' }}
                >
                  Booting terminal...
                </span>
              </div>
            </div>
          )}
        </div>

      {/* Mobile Scroll Controls */}
      {showScrollButtons && (
        <div className="flex justify-center items-center gap-2 py-2 px-4 bg-black/80 border-t border-green-700/30">
          <button
            onClick={scrollToTop}
            disabled={!canScrollUp}
            className={`px-3 py-2 text-xs font-mono rounded border transition-all duration-200 scroll-button ${
              canScrollUp
                ? 'bg-green-900/40 border-green-600 text-green-300 hover:bg-green-800/60 hover:text-green-100'
                : 'bg-gray-800/40 border-gray-600 text-gray-500 cursor-not-allowed'
            }`}
            style={{
              textShadow: canScrollUp ? '0 0 4px currentColor' : 'none'
            }}
          >
            ⇈ TOP
          </button>

          <button
            onClick={scrollUp}
            disabled={!canScrollUp}
            className={`px-3 py-2 text-xs font-mono rounded border transition-all duration-200 scroll-button ${
              canScrollUp
                ? 'bg-green-900/40 border-green-600 text-green-300 hover:bg-green-800/60 hover:text-green-100'
                : 'bg-gray-800/40 border-gray-600 text-gray-500 cursor-not-allowed'
            }`}
            style={{
              textShadow: canScrollUp ? '0 0 4px currentColor' : 'none'
            }}
          >
            ↑ UP
          </button>

          <button
            onClick={scrollDown}
            disabled={!canScrollDown}
            className={`px-3 py-2 text-xs font-mono rounded border transition-all duration-200 scroll-button ${
              canScrollDown
                ? 'bg-green-900/40 border-green-600 text-green-300 hover:bg-green-800/60 hover:text-green-100'
                : 'bg-gray-800/40 border-gray-600 text-gray-500 cursor-not-allowed'
            }`}
            style={{
              textShadow: canScrollDown ? '0 0 4px currentColor' : 'none'
            }}
          >
            ↓ DOWN
          </button>

          <button
            onClick={scrollToBottom}
            disabled={!canScrollDown}
            className={`px-3 py-2 text-xs font-mono rounded border transition-all duration-200 scroll-button ${
              canScrollDown
                ? 'bg-green-900/40 border-green-600 text-green-300 hover:bg-green-800/60 hover:text-green-100'
                : 'bg-gray-800/40 border-gray-600 text-gray-500 cursor-not-allowed'
            }`}
            style={{
              textShadow: canScrollDown ? '0 0 4px currentColor' : 'none'
            }}
          >
            ⇊ BOTTOM
          </button>
        </div>
      )}

      {/* Input Area - Mobile Responsive */}
      <div
        className="border-t-2 p-2 sm:p-3 bg-black/95 shrink-0"
        style={{
          borderTopColor: '#00ff41',
          minHeight: screenWidth < 768 ? '60px' : '70px'
        }}
      >
        <div className="flex items-center p-2 sm:p-3 rounded-lg border border-green-700/40 bg-black/50 backdrop-blur-sm">
            <span
              className="text-cyan-300 mr-2 sm:mr-3 font-bold whitespace-nowrap text-xs sm:text-base"
              style={{
                textShadow: '0 0 6px #22d3ee, 0 0 12px #22d3ee',
                fontSize: screenWidth < 768 ? '12px' : '16px'
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
              onInput={() => playSound('type')}
              onFocus={(e) => e.preventDefault()}
              disabled={isProcessing || isBooting}
              className="flex-1 bg-transparent border-none outline-none font-mono touch-manipulation"
              style={{
                fontSize: screenWidth < 768 ? '14px' : '16px',
                fontFamily: 'Courier New, monospace',
                letterSpacing: screenWidth < 768 ? '0.3px' : '0.5px',
                color: '#e6fffa',
                textShadow: '0 0 6px #86efac, 0 0 12px #86efac'
              }}
              placeholder={
                isBooting ? "🚀 Booting..." :
                isProcessing ? "⚡ Processing..." :
                screenWidth < 768 ? "Type command..." : "Type command + Enter..."
              }
            />
            <span
              className="animate-pulse ml-1 sm:ml-2"
              style={{
                fontSize: screenWidth < 768 ? '14px' : '18px',
                color: '#e6fffa',
                textShadow: '0 0 10px #86efac, 0 0 20px #86efac'
              }}
            >
              █
            </span>
          </div>
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


export default InteractiveTerminal