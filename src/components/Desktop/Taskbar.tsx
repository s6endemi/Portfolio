import clsx from 'clsx'

export type TaskbarApp = {
  id: string
  label: string
  icon: string
  isActive: boolean
  onClick?: () => void
}

type TaskbarProps = {
  timeLabel: string
  isStartOpen: boolean
  onToggleStart: () => void
  apps: TaskbarApp[]
}

const Taskbar = ({ timeLabel, isStartOpen, onToggleStart, apps }: TaskbarProps) => {
  return (
    <div
      data-role="taskbar"
      className="flex h-14 w-full items-center border-t-4 px-2 sm:px-3 shadow-[0_-4px_8px_rgba(0,0,0,0.1)]"
      style={{
        backgroundColor: '#e8dcc0',
        borderTopColor: '#8b6f47'
      }}
      onMouseDown={(event) => event.stopPropagation()}
      onTouchStart={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        data-role="start-button"
        onClick={onToggleStart}
        onMouseDown={(event) => event.stopPropagation()}
        onTouchStart={(event) => event.stopPropagation()}
        className={clsx(
          'mr-2 sm:mr-4 flex items-center gap-1 sm:gap-2 border-2 px-2 sm:px-4 py-2 font-pixel text-xs sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-transform duration-150',
          isStartOpen && 'translate-x-[1px] translate-y-[1px] shadow-none'
        )}
        style={{
          backgroundColor: isStartOpen ? '#7ba7bc' : '#f4f1e8',
          borderColor: '#8b6f47',
          color: isStartOpen ? '#ffffff' : '#5d4e37',
          boxShadow: isStartOpen ? 'none' : '2px 2px 0 0 rgba(139,111,71,0.6)'
        }}
      >
        <span className="text-lg" aria-hidden>
          🪟
        </span>
        Start
      </button>

      <div className="flex flex-1 items-center gap-1 sm:gap-2 overflow-hidden">
        {apps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={app.onClick}
            className={clsx(
              'flex min-w-[80px] sm:min-w-[120px] items-center gap-1 sm:gap-2 truncate border-2 px-2 sm:px-3 py-2 text-left font-pixel-content text-[10px] sm:text-xs transition-colors duration-150',
              app.isActive ? '' : 'hover:bg-blue-50'
            )}
            style={{
              backgroundColor: app.isActive ? '#7ba7bc' : '#f4f1e8',
              borderColor: app.isActive ? '#5a8a9f' : '#8b6f47',
              color: app.isActive ? '#ffffff' : '#5d4e37',
              boxShadow: app.isActive
                ? '1px 1px 0 0 rgba(90,138,159,0.8)'
                : '2px 2px 0 0 rgba(139,111,71,0.6)'
            }}
          >
            <span className="text-base" aria-hidden>
              {app.icon}
            </span>
            <span className="truncate uppercase">{app.label}</span>
          </button>
        ))}
      </div>

      <div className="ml-4 flex min-w-[130px] justify-end border-2 border-pixel-border bg-pixel-white px-3 py-2 font-pixel-content text-xs text-pixel-text shadow-[2px_2px_0_0_rgba(173,181,189,0.6)]">
        {timeLabel}
      </div>
    </div>
  )
}

export default Taskbar
