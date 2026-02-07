import clsx from 'clsx'
import { motion } from 'framer-motion'

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
      className="flex h-14 w-full items-center border-t-4 px-2 sm:px-3"
      style={{
        background: 'linear-gradient(180deg, #efe3c8 0%, #e8dcc0 40%, #e0d4b4 100%)',
        borderTopColor: '#8b6f47',
        backdropFilter: 'blur(8px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(8px) saturate(1.2)',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.1), 0 -1px 3px rgba(0,0,0,0.06)',
      }}
      onMouseDown={(event) => event.stopPropagation()}
      onTouchStart={(event) => event.stopPropagation()}
    >
      <motion.button
        type="button"
        data-role="start-button"
        onClick={onToggleStart}
        onMouseDown={(event) => event.stopPropagation()}
        onTouchStart={(event) => event.stopPropagation()}
        className={clsx(
          'mr-2 sm:mr-4 flex items-center gap-1 sm:gap-2 border-2 px-2 sm:px-4 py-2 font-pixel text-xs sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.2em]',
          isStartOpen && 'translate-x-[1px] translate-y-[1px]'
        )}
        style={{
          backgroundColor: isStartOpen ? '#7ba7bc' : '#f4f1e8',
          borderColor: '#8b6f47',
          color: isStartOpen ? '#ffffff' : '#5d4e37',
          boxShadow: isStartOpen
            ? 'inset 2px 2px 4px rgba(0,0,0,0.15)'
            : '2px 2px 0 0 rgba(139,111,71,0.6), 0 1px 3px rgba(139,111,71,0.1)',
        }}
        whileHover={{
          boxShadow: isStartOpen
            ? 'inset 2px 2px 4px rgba(0,0,0,0.15)'
            : '2px 2px 0 0 rgba(139,111,71,0.6), 0 0 12px rgba(123,167,188,0.25)',
        }}
        whileTap={{ scale: 0.97, y: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <span className="text-lg" aria-hidden>
          🪟
        </span>
        Start
      </motion.button>

      <div className="flex flex-1 items-center gap-1 sm:gap-2 overflow-hidden">
        {apps.map((app) => (
          <motion.button
            key={app.id}
            type="button"
            onClick={app.onClick}
            className="flex min-w-[80px] sm:min-w-[120px] items-center gap-1 sm:gap-2 truncate border-2 px-2 sm:px-3 py-2 text-left font-pixel-content text-[10px] sm:text-xs"
            style={{
              backgroundColor: app.isActive ? '#7ba7bc' : '#f4f1e8',
              borderColor: app.isActive ? '#5a8a9f' : '#8b6f47',
              color: app.isActive ? '#ffffff' : '#5d4e37',
              boxShadow: app.isActive
                ? 'inset 2px 2px 4px rgba(0,0,0,0.12), inset 0 0 6px rgba(90,138,159,0.15)'
                : '2px 2px 0 0 rgba(139,111,71,0.6)',
            }}
            whileHover={app.isActive ? {} : {
              backgroundColor: '#f0ead8',
              boxShadow: '2px 2px 0 0 rgba(139,111,71,0.6), 0 0 10px rgba(123,167,188,0.2)',
            }}
            whileTap={{ scale: 0.97, y: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <span className="text-base" aria-hidden>
              {app.icon}
            </span>
            <span className="truncate uppercase">{app.label}</span>
          </motion.button>
        ))}
      </div>

      <div
        className="ml-4 flex min-w-[130px] justify-end border-2 px-3 py-2 font-pixel-content text-xs"
        style={{
          backgroundColor: '#f4f1e8',
          borderColor: '#c4b5a0',
          color: '#5d4e37',
          boxShadow: 'inset 1px 1px 3px rgba(139,111,71,0.1), 0 0 8px rgba(123,167,188,0.08)',
        }}
      >
        {timeLabel}
      </div>
    </div>
  )
}

export default Taskbar
