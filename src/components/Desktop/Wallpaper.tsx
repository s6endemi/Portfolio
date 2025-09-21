type WallpaperVariant = 'nebula' | 'radiant'

type WallpaperProps = {
  variant?: WallpaperVariant
}

const gradientMap: Record<WallpaperVariant, string> = {
    nebula:
      'radial-gradient(circle at 20% 20%, rgba(0, 255, 65, 0.35), transparent 55%), radial-gradient(circle at 80% 30%, rgba(0, 170, 255, 0.3), transparent 60%), radial-gradient(circle at 50% 80%, rgba(255, 176, 0, 0.25), transparent 55%)',
    radiant:
      'radial-gradient(circle at 15% 10%, rgba(0, 255, 130, 0.4), transparent 45%), radial-gradient(circle at 85% 25%, rgba(0, 200, 255, 0.4), transparent 50%), radial-gradient(circle at 50% 80%, rgba(0, 0, 0, 0.35), transparent 55%)',
}

const Wallpaper = ({ variant = 'nebula' }: WallpaperProps) => {

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-pixel-black"
        style={{
          backgroundImage: `${gradientMap[variant]}, linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      <div className="absolute inset-0 animate-[scanlines_6s_linear_infinite] bg-[length:100%_6px] bg-[radial-gradient(circle,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.6)_100%)] opacity-10" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  )
}

export default Wallpaper
