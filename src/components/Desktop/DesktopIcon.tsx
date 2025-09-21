import clsx from 'clsx'
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
      className="w-20 flex flex-col items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-pixel-cyan"
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div
        className={clsx(
          'flex h-14 w-14 items-center justify-center border-2 border-black bg-pixel-gray text-2xl shadow-[4px_4px_0_0_#00000080] transition-colors duration-200',
          isActive && 'bg-pixel-light-gray border-pixel-cyan'
        )}
      >
        {imageSrc ? (
          <img src={imageSrc} alt="" className="h-10 w-10 object-contain" />
        ) : (
          <span className="select-none" aria-hidden>
            {icon ?? '📁'}
          </span>
        )}
      </div>
      <span
        className={clsx(
          'text-center text-xs uppercase tracking-wider text-pixel-green drop-shadow-[0_0_4px_#00ff41]',
          isActive && 'text-pixel-amber'
        )}
      >
        {label}
      </span>
    </div>
  )
}

export default DesktopIcon
