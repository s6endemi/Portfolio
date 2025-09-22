import clsx from 'clsx'
import { motion, useDragControls } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react'

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  return screenSize
}

type DesktopWindowProps = PropsWithChildren<{
  title: string
  icon?: string
  position?: { x: number; y: number }
  isFocused?: boolean
  onClose?: () => void
  onFocus?: () => void
  origin?: { x: number; y: number }
  onDragEnd?: (position: { x: number; y: number }) => void
  isMaximized?: boolean
  onToggleMaximize?: () => void
}>

const DesktopWindow = ({
  title,
  icon,
  position = { x: 180, y: 120 },
  isFocused = false,
  onClose,
  onFocus,
  origin,
  onDragEnd,
  isMaximized = false,
  onToggleMaximize,
  children,
}: DesktopWindowProps) => {
  const dragControls = useDragControls()
  const [showParticles, setShowParticles] = useState(false)
  const screenSize = useScreenSize()

  const getResponsiveWindowProps = () => {
    const isMobile = screenSize.width < 768
    const isTablet = screenSize.width < 1024
    const isTerminal = title === 'TERMINAL.EXE'

    // Determine sizes based on maximized state
    const getMinimizedSize = () => {
      const maxSize = getMaximizedSize()
      return {
        width: isMobile ? Math.min(screenSize.width - 40, 420) : maxSize.width,
        height: isMobile ? 350 : Math.round(typeof maxSize.height === 'number' ? maxSize.height * 0.7 : 400)
      }
    }

    const getMaximizedSize = () => {
      if (isMobile) {
        return {
          width: Math.min(screenSize.width - 20, 520),
          height: isTerminal ? Math.min(screenSize.height - 140, 500) : Math.min(screenSize.height - 100, 600)
        }
      } else if (isTablet) {
        return {
          width: isTerminal ? Math.min(screenSize.width - 80, 700) : 520,
          height: isTerminal ? Math.min(screenSize.height - 120, 550) : Math.min(screenSize.height - 100, 650)
        }
      } else {
        return {
          width: isTerminal ? 900 : 620,
          height: isTerminal ? 650 : Math.min(screenSize.height - 100, 750)
        }
      }
    }

    const size = isMaximized ? getMaximizedSize() : getMinimizedSize()

    if (isMobile) {
      return {
        ...size,
        position: {
          x: Math.max(10, (screenSize.width - size.width) / 2),
          y: 20 // Closer to top, accounting for fixed taskbar at bottom
        }
      }
    } else if (isTablet) {
      return {
        ...size,
        position: {
          x: Math.max(40, Math.min(position.x, screenSize.width - size.width - 40)),
          y: Math.max(60, Math.min(position.y, screenSize.height - 200))
        }
      }
    } else {
      return {
        ...size,
        position
      }
    }
  }

  const responsiveProps = getResponsiveWindowProps()

  useEffect(() => {
    if (!origin) {
      return
    }

    setShowParticles(true)
    const timer = window.setTimeout(() => setShowParticles(false), 480)
    return () => window.clearTimeout(timer)
  }, [origin])

  const startingPoint = origin ?? { x: position.x + 32, y: position.y + 32 }
  const launchScale = origin ? 0.62 : 0.85
  const launchSkew = origin ? 7 : -4
  const launchRotate = origin ? -9 : 6

  const initial = {
    x: startingPoint.x,
    y: startingPoint.y,
    scale: launchScale,
    opacity: 0,
    rotate: launchRotate,
    skewX: launchSkew,
    borderRadius: '32px',
  }

  const enterKeyframes = useMemo(
    () => ({
      x: responsiveProps.position.x,
      y: responsiveProps.position.y,
      scale: 1,
      opacity: 1,
      rotate: 0,
      skewX: 0,
      borderRadius: '12px',
    }),
    [responsiveProps.position.x, responsiveProps.position.y]
  )

  const particleOffsets = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, index) => {
        const angle = (index / 8) * Math.PI * 2
        const distance = 48 + (index % 3) * 14
        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        }
      }),
    []
  )

  const clampPosition = ({ x, y }: { x: number; y: number }) => {
    if (typeof window === 'undefined') {
      return { x, y }
    }

    const windowWidth = responsiveProps.width
    const isMobile = screenSize.width < 768

    const maxX = Math.max(16, window.innerWidth - windowWidth - 20)
    // Account for fixed taskbar (72px) + padding on mobile
    const taskbarHeight = isMobile ? 72 : 0
    const maxY = Math.max(20, window.innerHeight - taskbarHeight - 100)

    return {
      x: Math.min(Math.max(10, x), maxX),
      y: Math.min(Math.max(20, y), maxY),
    }
  }

  return (
    <>
      {showParticles && origin && (
        <div
          className="absolute pointer-events-none z-40"
          style={{ left: origin.x + 44, top: origin.y + 44 }}
        >
          {particleOffsets.map(({ x, y }, index) => (
            <motion.span
              key={index}
              className="absolute h-2 w-2 rounded-full"
              style={{ backgroundColor: ['#7ba7bc', '#a8b5a0', '#d4a574', '#b5a7d6'][index % 4] }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{ x, y, scale: 1, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.2, 0.9, 0.3, 1] }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="absolute overflow-hidden rounded-lg border-4 shadow-[6px_6px_0_0_rgba(139,111,71,0.35)]"
        style={{
          backgroundColor: '#fffdfa',
          borderColor: '#d0c4b0',
          width: `${responsiveProps.width}px`,
          height: `${responsiveProps.height}px`,
        }}
        initial={initial}
        animate={enterKeyframes}
        exit={{ opacity: 0, scale: 0.9, y: position.y + 16 }}
        transition={{
          default: { type: 'spring', stiffness: 360, damping: 32 },
          scale: { type: 'spring', stiffness: 420, damping: 30 },
          rotate: { duration: 0.45, ease: 'easeOut' },
          skewX: { duration: 0.4, ease: 'easeOut' },
          borderRadius: { duration: 0.4, ease: 'easeOut' },
          opacity: { duration: 0.3, ease: 'easeOut' },
        }}
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
        onMouseDown={(event) => {
          event.stopPropagation()
          onFocus?.()
        }}
        onDragEnd={(_, info) => {
          const nextPosition = clampPosition({
            x: position.x + info.offset.x,
            y: position.y + info.offset.y,
          })
          onDragEnd?.(nextPosition)
        }}
      >
        <div
          className="flex items-center justify-between border-b-4 px-4 py-3 font-pixel text-xs uppercase tracking-[0.2em]"
          style={{
            background: title === 'TERMINAL.EXE'
              ? (isFocused 
                  ? 'linear-gradient(90deg, #2c3e50 0%, #34495e 100%)'
                  : 'linear-gradient(90deg, #34495e 0%, #3f566b 100%)')
              : (isFocused 
                  ? 'linear-gradient(90deg, #7ba7bc 0%, #9fbec8 100%)'
                  : 'linear-gradient(90deg, #a7c2cd 0%, #c1d8df 100%)'),
            borderBottomColor: title === 'TERMINAL.EXE' ? '#1a252f' : '#8b6f47',
            color: title === 'TERMINAL.EXE' ? '#00ff41' : '#ffffff',
            cursor: 'grab',
          }}
          onPointerDown={(event) => {
            event.stopPropagation()
            dragControls.start(event)
            onFocus?.()
          }}
        >
          <div className="flex items-center gap-2">
            {icon && <span aria-hidden>{icon}</span>}
            <span>{title}</span>
          </div>
          <div className="flex items-center gap-2">
            {onToggleMaximize && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleMaximize()
                }}
                className="flex h-6 w-6 items-center justify-center rounded border-2 font-pixel text-xs transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: '#f4f1e8',
                  borderColor: '#8b6f47',
                  color: '#5d4e37',
                }}
                aria-label={isMaximized ? `Minimize ${title}` : `Maximize ${title}`}
                title={isMaximized ? 'Minimize' : 'Maximize'}
              >
                {isMaximized ? '⤢' : '⤡'}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex h-6 w-6 items-center justify-center rounded border-2 font-pixel text-xs transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: '#f4f1e8',
                borderColor: '#8b6f47',
                color: '#5d4e37',
              }}
              aria-label={`Close ${title}`}
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

         <div
           className={clsx(
             'scrollbar-thin overflow-y-auto font-pixel-content',
             title === 'TERMINAL.EXE'
               ? 'h-full p-0'
               : 'space-y-6 bg-white/96 p-5 text-sm'
           )}
           style={{
             color: title === 'TERMINAL.EXE' ? '#00ff41' : '#3b2f1d',
             backgroundColor: title === 'TERMINAL.EXE' ? '#000000' : '#ffffff',
             backgroundImage: title === 'TERMINAL.EXE'
               ? 'none'
               : 'linear-gradient(180deg, rgba(248,240,223,0.6) 0%, rgba(255,255,255,0.75) 55%, rgba(249,237,218,0.85) 100%)',
             height: title === 'TERMINAL.EXE' ? '100%' : 'calc(100% - 60px)',
           }}
         >
          {children}
        </div>
      </motion.div>
    </>
  )
}

export default DesktopWindow
