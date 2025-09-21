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
  if (!isVisible) {
    return null
  }

  return (
    <div
      className="absolute bottom-14 left-3 flex w-72 border-4 border-pixel-black bg-pixel-gray shadow-[6px_6px_0_0_#000000b3]"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div className="flex w-8 items-end justify-center bg-gradient-to-b from-pixel-cyan to-pixel-dark-gray font-pixel text-xs uppercase text-pixel-black tracking-[0.4em]">
        <span className="rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Pixel
        </span>
      </div>
      <ul className="flex-1 py-3">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={item.onSelect}
              className="flex w-full items-center justify-between px-4 py-3 text-left font-pixel text-xs uppercase text-pixel-black transition-colors duration-150 hover:bg-pixel-light-gray"
            >
              <div className="flex flex-col">
                <span>{item.label}</span>
                <span className="text-[10px] text-pixel-dark-gray">{item.description}</span>
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
