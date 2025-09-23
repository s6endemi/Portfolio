import { useCallback, useEffect, useRef, useState } from 'react'
import { Howl, Howler } from 'howler'

interface SoundConfig {
  src: string
  volume?: number
  loop?: boolean
  sprite?: { [key: string]: [number, number] }
}

interface SoundEffect {
  name: string
  config: SoundConfig
  howl?: Howl
}

// Sound effect definitions
const SOUND_EFFECTS: SoundEffect[] = [
  {
    name: 'boot',
    config: {
      src: '/sounds/boot.mp3',
      volume: 0.7,
      loop: false
    }
  },
  {
    name: 'click',
    config: {
      src: '/sounds/click.mp3',
      volume: 0.5,
      loop: false
    }
  },
  {
    name: 'open',
    config: {
      src: '/sounds/open.mp3',
      volume: 0.6,
      loop: false
    }
  },
  {
    name: 'close',
    config: {
      src: '/sounds/close.mp3',
      volume: 0.6,
      loop: false
    }
  },
  {
    name: 'type',
    config: {
      src: '/sounds/type.mp3',
      volume: 0.3,
      loop: false
    }
  },
  {
    name: 'error',
    config: {
      src: '/sounds/error.mp3',
      volume: 0.8,
      loop: false
    }
  },
  {
    name: 'success',
    config: {
      src: '/sounds/success.mp3',
      volume: 0.7,
      loop: false
    }
  },
  {
    name: 'bootMusic',
    config: {
      src: '/sounds/retro-adventure.mp3',
      volume: 0.4,
      loop: true
    }
  },
  {
    name: 'desktopMusic',
    config: {
      src: '/sounds/jazz-piano.mp3',
      volume: 0.3,
      loop: true
    }
  }
]

interface UseSoundReturn {
  playSound: (soundName: string) => void
  stopSound: (soundName: string) => void
  playMusic: (musicName: 'bootMusic' | 'desktopMusic') => void
  stopMusic: () => void
  setVolume: (soundName: string, volume: number) => void
  setMasterVolume: (volume: number) => void
  isMuted: boolean
  toggleMute: () => void
  masterVolume: number
  isLoaded: boolean
  currentMusic: string | null
}

export const useSound = (): UseSoundReturn => {
  const [sounds, setSounds] = useState<Map<string, Howl>>(new Map())
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [masterVolume, setMasterVolumeState] = useState(0.8)
  const [currentMusic, setCurrentMusic] = useState<string | null>(null)
  const currentMusicRef = useRef<Howl | null>(null)

  // Initialize sound effects
  useEffect(() => {
    const loadSounds = async () => {
      const soundMap = new Map<string, Howl>()

      // Load all sound effects
      const loadPromises = SOUND_EFFECTS.map(effect => {
        return new Promise<void>((resolve) => {
          const howl = new Howl({
            ...effect.config,
            onload: () => {
              soundMap.set(effect.name, howl)
              resolve()
            },
            onloaderror: (_, error) => {
              console.warn(`Failed to load sound: ${effect.name}`, error)
              // Still resolve to not block other sounds
              resolve()
            }
          })
        })
      })

      try {
        await Promise.allSettled(loadPromises)
        setSounds(soundMap)
        setIsLoaded(true)
        console.log(`🔊 Sound system loaded: ${soundMap.size}/${SOUND_EFFECTS.length} sounds`)
      } catch (error) {
        console.warn('Some sounds failed to load:', error)
        setIsLoaded(true)
      }
    }

    loadSounds()

    // Cleanup
    return () => {
      sounds.forEach(howl => {
        howl.unload()
      })
      if (currentMusicRef.current) {
        currentMusicRef.current.stop()
        currentMusicRef.current.unload()
      }
    }
  }, [])

  // Apply master volume and mute state
  useEffect(() => {
    if (isMuted) {
      Howler.volume(0)
    } else {
      Howler.volume(masterVolume)
    }
  }, [isMuted, masterVolume])

  const playSound = useCallback((soundName: string) => {
    if (!isLoaded || isMuted) return

    const howl = sounds.get(soundName)
    if (howl) {
      // Stop previous instance if it's still playing (for rapid clicks)
      howl.stop()
      howl.play()
    } else {
      console.warn(`Sound not found: ${soundName}`)
    }
  }, [sounds, isLoaded, isMuted])

  const stopSound = useCallback((soundName: string) => {
    const howl = sounds.get(soundName)
    if (howl) {
      howl.stop()
    }
  }, [sounds])

  const playMusic = useCallback((musicName: 'bootMusic' | 'desktopMusic') => {
    if (!isLoaded) return

    // Stop current music if playing
    if (currentMusicRef.current) {
      currentMusicRef.current.fade(currentMusicRef.current.volume(), 0, 500)
      setTimeout(() => {
        if (currentMusicRef.current) {
          currentMusicRef.current.stop()
        }
      }, 500)
    }

    // Start new music
    const musicHowl = sounds.get(musicName)
    if (musicHowl) {
      currentMusicRef.current = musicHowl
      setCurrentMusic(musicName)

      // Get original volume from config
      const originalVolume = SOUND_EFFECTS.find(effect => effect.name === musicName)?.config.volume || 0.3

      // Fade in the music
      musicHowl.volume(0)
      musicHowl.play()
      musicHowl.fade(0, originalVolume, 1000)
    }
  }, [sounds, isLoaded])

  const stopMusic = useCallback(() => {
    if (currentMusicRef.current) {
      currentMusicRef.current.fade(currentMusicRef.current.volume(), 0, 1000)
      setTimeout(() => {
        if (currentMusicRef.current) {
          currentMusicRef.current.stop()
          currentMusicRef.current = null
          setCurrentMusic(null)
        }
      }, 1000)
    }
  }, [])

  const setVolume = useCallback((soundName: string, volume: number) => {
    const howl = sounds.get(soundName)
    if (howl) {
      howl.volume(Math.max(0, Math.min(1, volume)))
    }
  }, [sounds])

  const setMasterVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume))
    setMasterVolumeState(clampedVolume)
    if (!isMuted) {
      Howler.volume(clampedVolume)
    }
  }, [isMuted])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  return {
    playSound,
    stopSound,
    playMusic,
    stopMusic,
    setVolume,
    setMasterVolume,
    isMuted,
    toggleMute,
    masterVolume,
    isLoaded,
    currentMusic
  }
}