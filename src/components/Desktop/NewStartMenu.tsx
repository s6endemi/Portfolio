import { AnimatePresence, motion } from 'framer-motion'

interface MenuItem {
  id: string
  label: string
  icon: string
  description?: string
  onClick: () => void
}

interface NewStartMenuProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
}

const panelTransition = { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const }
const backdropTransition = { duration: 0.18 }

const NewStartMenu = ({ isOpen, onClose, menuItems }: NewStartMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="start-menu-backdrop"
            className="fixed inset-0 z-40"
            data-role="start-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            onClick={onClose}
            style={{ backgroundColor: '#2a1d14' }}
          />

          <motion.div
            key="start-menu"
            data-role="start-menu"
            className="absolute left-4 bottom-[4.5rem] z-50 w-80 overflow-hidden rounded-lg border-4 shadow-[8px_8px_0_0_rgba(139,111,71,0.6)]"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={panelTransition}
            onClick={(event) => event.stopPropagation()}
            style={{
              backgroundColor: '#f4f1e8',
              borderColor: '#8b6f47',
            }}
          >
            <div
              className="flex items-center justify-between border-b-4 px-5 py-4 font-pixel text-sm"
              style={{
                background: 'linear-gradient(135deg, #7ba7bc 0%, #a8b5a0 100%)',
                borderBottomColor: '#8b6f47',
                color: '#ffffff',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🏠</span>
                <span className="tracking-[0.2em] font-bold">START</span>
              </div>
              <span className="text-xs opacity-75 font-pixel-content">v1.0</span>
            </div>

            <div className="flex flex-col gap-1 p-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.onClick()
                    onClose()
                  }}
                  className="group flex w-full items-center gap-4 rounded-md border-2 border-transparent px-4 py-4 text-left transition-all duration-200 hover:-translate-y-[1px] hover:border-[#7ba7bc] hover:shadow-md"
                  style={{ color: '#5d4e37' }}
                >
                  <div 
                    className="flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-all group-hover:scale-110"
                    style={{
                      backgroundColor: '#ffffff',
                      borderColor: '#d0c4b0',
                      boxShadow: '2px 2px 0 0 rgba(139,111,71,0.3)'
                    }}
                  >
                    <span className="text-xl" aria-hidden>
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <span className="font-pixel-content text-base font-bold tracking-wide group-hover:text-[#7ba7bc] leading-tight">
                      {item.label}
                    </span>
                    <span
                      className="font-pixel-content text-sm leading-relaxed"
                      style={{ color: '#8a7968' }}
                    >
                      {item.description ?? 'Open window'}
                    </span>
                  </div>
                  <div className="text-xs opacity-50">
                    →
                  </div>
                </button>
              ))}
            </div>

            <div
              className="border-t-4 px-5 py-3 text-center font-pixel-content text-xs flex items-center justify-between"
              style={{
                backgroundColor: '#e8dcc0',
                borderTopColor: '#8b6f47',
                color: '#5d4e37',
              }}
            >
              <span className="flex items-center gap-1">
                <span>🎮</span>
                <span>Pixel Portfolio</span>
              </span>
              <span className="opacity-75">v1.0</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default NewStartMenu
