import clsx from 'clsx'
import { motion, useDragControls } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react'

type DesktopWindowProps = PropsWithChildren<{
  title: string
  icon?: string
  position?: { x: number; y: number }
  isFocused?: boolean
  onClose?: () => void
  onFocus?: () => void
  origin?: { x: number; y: number }
  onDragEnd?: (position: { x: number; y: number }) => void
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
  children,
}: DesktopWindowProps) => {
  const dragControls = useDragControls()
  const [showParticles, setShowParticles] = useState(false)

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
      x: position.x,
      y: position.y,
      scale: 1,
      opacity: 1,
      rotate: 0,
      skewX: 0,
      borderRadius: '12px',
    }),
    [position.x, position.y]
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

    const maxX = Math.max(16, window.innerWidth - 436)
    const maxY = Math.max(48, window.innerHeight - 156)

    return {
      x: Math.min(Math.max(16, x), maxX),
      y: Math.min(Math.max(48, y), maxY),
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
        className={clsx(
          'absolute w-[420px] overflow-hidden rounded-lg border-4 shadow-[6px_6px_0_0_rgba(139,111,71,0.35)]'
        )}
        style={{
          backgroundColor: '#fffdfa',
          borderColor: '#d0c4b0',
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
            background: isFocused
              ? 'linear-gradient(90deg, #7ba7bc 0%, #9fbec8 100%)'
              : 'linear-gradient(90deg, #a7c2cd 0%, #c1d8df 100%)',
            borderBottomColor: '#8b6f47',
            color: '#ffffff',
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
          <button
            type="button"
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded border-2 font-pixel text-xs"
            style={{
              backgroundColor: '#f4f1e8',
              borderColor: '#8b6f47',
              color: '#5d4e37',
            }}
            aria-label={`Close ${title}`}
          >
            ✕
          </button>
        </div>

        <div
          className="scrollbar-thin space-y-6 overflow-y-auto bg-white/96 p-5 font-pixel-content text-sm"
          style={{
            color: '#3b2f1d',
            backgroundImage:
              'linear-gradient(180deg, rgba(248,240,223,0.6) 0%, rgba(255,255,255,0.75) 55%, rgba(249,237,218,0.85) 100%)',
          }}
        >
          {children}
        </div>
      </motion.div>
    </>
  )
}

export default DesktopWindow
