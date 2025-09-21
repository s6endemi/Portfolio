type WallpaperVariant = 'nebula' | 'radiant'

type WallpaperProps = {
  variant?: WallpaperVariant
}

const gradientMap: Record<WallpaperVariant, string> = {
    nebula:
      'radial-gradient(circle at 20% 20%, rgba(74, 144, 226, 0.08), transparent 70%), radial-gradient(circle at 80% 30%, rgba(123, 104, 238, 0.06), transparent 75%), radial-gradient(circle at 50% 80%, rgba(255, 107, 107, 0.05), transparent 70%)',
    radiant:
      'radial-gradient(circle at 15% 10%, rgba(81, 207, 102, 0.1), transparent 60%), radial-gradient(circle at 85% 25%, rgba(255, 212, 59, 0.08), transparent 65%), radial-gradient(circle at 50% 80%, rgba(74, 144, 226, 0.06), transparent 70%)',
}

const Wallpaper = ({ variant = 'nebula' }: WallpaperProps) => {

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#f0f8ff',
          backgroundImage: `${gradientMap[variant]}, linear-gradient(rgba(74,144,226,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,144,226,0.08) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 32px 32px, 32px 32px',
        }}
      />

      <div className="absolute inset-0 animate-[scanlines_6s_linear_infinite] bg-[length:100%_6px] bg-[radial-gradient(circle,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.6)_100%)] opacity-10" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  )
}

export default Wallpaper
