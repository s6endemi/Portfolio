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
        'absolute w-[380px] border-4 rounded-lg overflow-hidden',
        !isFocused && 'opacity-90'
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        backgroundColor: '#ffffff',
        borderColor: '#d0c4b0',
        boxShadow: '6px 6px 0 0 rgba(139,111,71,0.4)'
      }}
      onMouseDown={(event) => {
        event.stopPropagation()
        onFocus?.()
      }}
    >
      <div 
        className="window-header flex items-center justify-between border-b-4 px-3 py-2 font-pixel text-xs uppercase"
        style={{
          backgroundColor: '#7ba7bc',
          borderBottomColor: '#8b6f47',
          color: '#ffffff'
        }}
      >
        <div className="flex items-center gap-2">
          {icon && <span aria-hidden>{icon}</span>}
          {title}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center border-2 rounded hover:bg-red-400 transition-colors cursor-pointer"
          style={{
            backgroundColor: '#f4f1e8',
            borderColor: '#8b6f47',
            color: '#5d4e37'
          }}
          aria-label={`Close ${title}`}
        >
          ✕
        </button>
      </div>
      <div 
        className="max-h-[400px] overflow-y-auto p-4 font-pixel-content text-sm leading-relaxed"
        style={{
          backgroundColor: '#ffffff',
          color: '#2c3e50'
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default DesktopWindow
