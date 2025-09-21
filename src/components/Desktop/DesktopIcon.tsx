import type { KeyboardEvent, MouseEvent } from 'react'

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
  const handleDoubleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
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
      onActivate?.()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className="w-24 flex flex-col items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-pixel-primary cursor-pointer group"
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* 3D Pixel Icon */}
      <div
        className="relative flex h-20 w-20 items-center justify-center text-4xl transition-all duration-200 group-hover:scale-105 border-t-4 border-l-4 border-r-4 border-b-4"
        style={{
          backgroundColor: isActive ? '#7ba7bc' : '#e8dcc0',
          borderTopColor: isActive ? '#d4a574' : '#f4f1e8',
          borderLeftColor: isActive ? '#d4a574' : '#f4f1e8', 
          borderRightColor: '#8b6f47',
          borderBottomColor: '#8b6f47',
          boxShadow: '4px 4px 0 0 rgba(139,111,71,0.4)'
        }}
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
      </div>
      
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
