import type { KeyboardEvent, MouseEvent, TouchEvent } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useCallback } from 'react'

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

    // Single tap to activate on mobile
    triggerLaunch()
    onActivate?.()
  }


  const iconVariants: Variants = {
    idle: {
      scale: 1,
      rotate: 0,
      y: 0,
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: { type: 'spring' as const, stiffness: 360, damping: 20 },
    },
    launch: {
      scale: [1, 1.18, 0.94, 1.04, 1],
      rotate: [0, -6, 4, -1, 0],
      y: [0, -4, 0, -2, 0],
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
          backgroundColor: isActive ? '#FFD700' : '#4B0082',
          borderTopColor: isActive ? '#FFED4E' : '#6A0DAD',
          borderLeftColor: isActive ? '#FFED4E' : '#6A0DAD',
          borderRightColor: isActive ? '#D4AF37' : '#2E0854',
          borderBottomColor: isActive ? '#D4AF37' : '#2E0854',
          boxShadow: isActive
            ? '4px 4px 0 0 rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.5)'
            : '4px 4px 0 0 rgba(46, 8, 84, 0.8), 0 0 20px rgba(106, 13, 173, 0.6), 0 0 40px rgba(106, 13, 173, 0.3)'
        }}
        variants={iconVariants}
        initial="idle"
        animate={controls}
        whileHover="hover"
      >
        {/* Inner 3D highlight */}
        <div
          className="absolute inset-1 border-t border-l"
          style={{
            borderTopColor: isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.8)',
            borderLeftColor: isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.8)',
          }}
        />
        
        {imageSrc ? (
          <img src={imageSrc} alt="" className="h-12 w-12 object-contain pixel-perfect" />
        ) : (
          <span
            className="select-none"
            style={{
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
              textShadow: '0 1px 2px rgba(255,255,255,0.8)'
            }}
            aria-hidden
          >
            {icon ?? '📁'}
          </span>
        )}
      </motion.div>
      
      {/* Icon Label */}
      <span
        className="text-center text-xs font-bold tracking-wide px-2 py-1 rounded border-2 shadow-lg"
        style={{
          backgroundColor: isActive ? 'rgba(255, 215, 0, 0.95)' : 'rgba(75, 0, 130, 0.95)',
          borderColor: isActive ? '#FFD700' : '#6A0DAD',
          color: isActive ? '#000000' : '#FFD700',
          textShadow: isActive ? '0 1px 2px rgba(0,0,0,0.3)' : '0 0 8px rgba(255,215,0,0.8)',
          boxShadow: isActive
            ? '0 0 15px rgba(255, 215, 0, 0.4)'
            : '0 0 15px rgba(106, 13, 173, 0.6)'
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default DesktopIcon
