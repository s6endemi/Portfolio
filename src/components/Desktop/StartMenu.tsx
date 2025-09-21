export type StartMenuItem = {
  id: string
  label: string
  description: string
  shortcut?: string
  onSelect?: () => void
}

type StartMenuProps = {
  items: StartMenuItem[]
  isVisible: boolean
}

const StartMenu = ({ items, isVisible }: StartMenuProps) => {
  console.log('StartMenu render - isVisible:', isVisible, 'items:', items.length)
  
  if (!isVisible) {
    console.log('StartMenu not visible, returning null')
    return null
  }

  console.log('StartMenu rendering with items:', items)
  return (
    <div
      className="absolute bottom-14 left-3 flex w-72 border-4 rounded-lg overflow-hidden z-50"
      style={{
        backgroundColor: '#ffffff',
        borderColor: '#4a90e2',
        boxShadow: '6px 6px 0 0 rgba(74,144,226,0.3)'
      }}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div 
        className="flex w-8 items-end justify-center font-pixel text-xs uppercase tracking-[0.4em]"
        style={{
          background: 'linear-gradient(to bottom, #4a90e2, #7b68ee)',
          color: '#ffffff'
        }}
      >
        <span className="rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Menu
        </span>
      </div>
      <ul className="flex-1 py-3" style={{ backgroundColor: '#f8f9fa' }}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={item.onSelect}
              className="flex w-full items-center justify-between px-4 py-3 text-left font-pixel-content text-xs transition-colors duration-150 hover:bg-blue-100"
              style={{
                color: '#2c3e50'
              }}
            >
              <div className="flex flex-col">
                <span>{item.label}</span>
                <span className="text-[10px]" style={{ color: '#6c757d' }}>{item.description}</span>
              </div>
              {item.shortcut && <span className="text-[10px] text-pixel-dark-gray">{item.shortcut}</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StartMenu
