import type { KeyboardEvent, MouseEvent, TouchEvent } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

export type DesktopIconProps = {
  icon?: string
  imageSrc?: string
  label: string
  isActive?: boolean
  onActivate?: () => void
  onSelect?: () => void
}

const DesktopIcon = ({
  icon,
  imageSrc,
  label,
  isActive = false,
  onActivate,
  onSelect,
}: DesktopIconProps) => {
  const controls = useAnimationControls()
  const [tapCount, setTapCount] = useState(0)
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const triggerLaunch = useCallback(() => {
    controls.stop()
    controls
      .start('launch')
      .then(() => controls.start('idle'))
      .catch(() => controls.start('idle'))
  }, [controls])

  const handleDoubleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    triggerLaunch()
    onActivate?.()
  }
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onSelect?.()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      event.stopPropagation()
      triggerLaunch()
      onActivate?.()
    }
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    // Clear any existing timeout
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current)
    }

    const newTapCount = tapCount + 1
    setTapCount(newTapCount)

    if (newTapCount === 1) {
      // First tap - select the icon
      onSelect?.()

      // Set timeout to reset tap count if no second tap
      tapTimeoutRef.current = setTimeout(() => {
        setTapCount(0)
      }, 300)
    } else if (newTapCount === 2) {
      // Double tap - activate the icon
      setTapCount(0)
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current)
      }
      triggerLaunch()
      onActivate?.()
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current)
      }
    }
  }, [])

  const iconVariants: Variants = {
    idle: {
      scale: 1,
      rotate: 0,
      boxShadow: '4px 4px 0 0 rgba(139,111,71,0.4)',
    },
    hover: {
      scale: 1.05,
      transition: { type: 'spring' as const, stiffness: 360, damping: 20 },
    },
    launch: {
      scale: [1, 1.18, 0.94, 1.04, 1],
      rotate: [0, -6, 4, -1, 0],
      transition: {
        duration: 0.45,
        ease: [0.17, 0.84, 0.44, 1],
        times: [0, 0.3, 0.55, 0.75, 1],
      },
    },
  }

  return (
    <div
      role="button"
      tabIndex={0}
      data-role="desktop-icon"
      className="w-20 sm:w-24 flex flex-col items-center gap-2 sm:gap-3 outline-none focus-visible:ring-2 focus-visible:ring-pixel-primary cursor-pointer group touch-manipulation"
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
    >
      {/* 3D Pixel Icon with Pulse Animation */}
      <motion.div
        className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center text-3xl sm:text-4xl border-t-4 border-l-4 border-r-4 border-b-4"
        style={{
          backgroundColor: isActive ? '#7ba7bc' : '#e8dcc0',
          borderTopColor: isActive ? '#d4a574' : '#f4f1e8',
          borderLeftColor: isActive ? '#d4a574' : '#f4f1e8', 
          borderRightColor: '#8b6f47',
          borderBottomColor: '#8b6f47',
          boxShadow: '4px 4px 0 0 rgba(139,111,71,0.4)'
        }}
        variants={iconVariants}
        initial="idle"
        animate={controls}
        whileHover="hover"
      >
        {/* Inner 3D highlight */}
        <div className="absolute inset-1 border-t border-l border-pixel-light opacity-50" />
        
        {imageSrc ? (
          <img src={imageSrc} alt="" className="h-12 w-12 object-contain pixel-perfect" />
        ) : (
          <span className="select-none filter drop-shadow-sm" aria-hidden>
            {icon ?? '📁'}
          </span>
        )}
      </motion.div>
      
      {/* Icon Label */}
      <span
        className="text-center text-xs font-bold tracking-wide px-2 py-1 rounded border shadow-sm"
        style={{
          backgroundColor: isActive ? 'rgba(123, 167, 188, 0.2)' : 'rgba(244, 241, 232, 0.9)',
          borderColor: isActive ? '#7ba7bc' : '#d0c4b0',
          color: isActive ? '#7ba7bc' : '#5d4e37'
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default DesktopIcon
