import clsx from 'clsx'
import type { PropsWithChildren } from 'react'

type DesktopWindowProps = PropsWithChildren<{
  title: string
  icon?: string
  position?: { x: number; y: number }
  isFocused?: boolean
  onClose?: () => void
  onFocus?: () => void
}>

const DesktopWindow = ({
  title,
  icon,
  position = { x: 180, y: 120 },
  isFocused = false,
  onClose,
  onFocus,
  children,
}: DesktopWindowProps) => {
  return (
    <div
      className={clsx(
        'absolute w-[380px] border-4 border-pixel-black bg-pixel-gray shadow-[8px_8px_0_0_#000000b3] transition-transform duration-150',
        !isFocused && 'opacity-90'
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={(event) => {
        event.stopPropagation()
        onFocus?.()
      }}
    >
      <div className="flex items-center justify-between border-b-4 border-pixel-black bg-pixel-dark-gray px-3 py-2 font-pixel text-xs uppercase text-pixel-light-gray">
        <div className="flex items-center gap-2">
          {icon && <span aria-hidden>{icon}</span>}
          {title}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center border-2 border-pixel-black bg-pixel-light-gray text-pixel-black"
          aria-label={`Close ${title}`}
        >
          ✕
        </button>
      </div>
      <div className="max-h-[400px] overflow-y-auto bg-pixel-light-gray p-4 font-pixel text-xs leading-relaxed text-pixel-black">
        {children}
      </div>
    </div>
  )
}

export default DesktopWindow
