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
      className="flex h-14 w-full items-center border-t-4 border-pixel-black bg-pixel-gray px-3"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={onToggleStart}
        className={clsx(
          'mr-4 flex items-center gap-2 border-2 border-pixel-black bg-pixel-light-gray px-4 py-2 font-pixel text-sm uppercase tracking-[0.2em] text-pixel-black shadow-[4px_4px_0_0_#00000080] transition-transform duration-150',
          isStartOpen && 'translate-x-[2px] translate-y-[2px] shadow-none'
        )}
      >
        <span className="text-lg" aria-hidden>
          🪟
        </span>
        Start
      </button>

      <div className="flex flex-1 items-center gap-2 overflow-hidden">
        {apps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={app.onClick}
            className={clsx(
              'flex min-w-[120px] items-center gap-2 truncate border-2 border-pixel-black bg-pixel-dark-gray px-3 py-2 text-left font-pixel text-xs text-pixel-light-gray shadow-[4px_4px_0_0_#00000080] transition-colors duration-150',
              app.isActive && 'bg-pixel-light-gray text-pixel-black'
            )}
          >
            <span className="text-base" aria-hidden>
              {app.icon}
            </span>
            <span className="truncate uppercase">{app.label}</span>
          </button>
        ))}
      </div>

      <div className="ml-4 flex min-w-[130px] justify-end border-2 border-pixel-black bg-pixel-dark-gray px-3 py-2 font-pixel text-xs text-pixel-green shadow-[4px_4px_0_0_#00000080]">
        {timeLabel}
      </div>
    </div>
  )
}

export default Taskbar
