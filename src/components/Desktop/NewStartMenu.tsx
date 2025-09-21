import { useState, useEffect } from 'react'

interface MenuItem {
  id: string
  label: string
  icon: string
  onClick: () => void
}

interface NewStartMenuProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
}

const NewStartMenu = ({ isOpen, onClose, menuItems }: NewStartMenuProps) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setIsAnimating(true)
    } else {
      setIsAnimating(false)
      // Delay hiding to allow close animation
      setTimeout(() => setIsVisible(false), 300)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
        style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
      />
      
      {/* Start Menu */}
      <div
        className={`absolute bottom-16 left-4 z-50 w-80 border-4 rounded-lg overflow-hidden transition-all duration-300 ${
          isAnimating 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-2'
        }`}
        style={{
          backgroundColor: '#f4f1e8',
          borderColor: '#8b6f47',
          boxShadow: '8px 8px 0 0 rgba(139,111,71,0.6)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Menu Header */}
        <div 
          className="px-4 py-3 border-b-4 font-pixel text-sm"
          style={{
            backgroundColor: '#7ba7bc',
            borderBottomColor: '#8b6f47',
            color: '#ffffff'
          }}
        >
          🏠 DESKTOP MENU
        </div>

        {/* Menu Items */}
        <div className="p-2">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick()
                onClose()
              }}
              className={`w-full flex items-center gap-4 p-3 rounded transition-all duration-200 hover:scale-105 font-pixel-content text-sm ${
                index % 2 === 0 ? 'hover:bg-blue-50' : 'hover:bg-green-50'
              }`}
              style={{
                color: '#5d4e37',
                animationDelay: `${index * 50}ms`
              }}
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{item.label}</div>
                <div className="text-xs opacity-75">Click to open</div>
              </div>
            </button>
          ))}
        </div>

        {/* Menu Footer */}
        <div 
          className="px-4 py-2 border-t-4 font-pixel-content text-xs text-center"
          style={{
            backgroundColor: '#e8dcc0',
            borderTopColor: '#8b6f47',
            color: '#5d4e37'
          }}
        >
          Pixel Portfolio v1.0
        </div>
      </div>
    </>
  )
}

export default NewStartMenu
