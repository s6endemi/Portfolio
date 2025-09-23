import { createContext, useContext, ReactNode, useState, useRef, useEffect, useCallback } from 'react'
import { useSoundContext } from './SoundContext'

interface Track {
  id: string
  name: string
  file: string
  duration?: string
  artist?: string
}

// Your actual lo-fi jazz tracks
const PLAYLIST: Track[] = [
  {
    id: 'bittersweet-brew',
    name: 'Bittersweet Brew',
    file: '/sounds/music/bittersweet-brew-chill-lo-fi-cafe-beat-340597.mp3',
    artist: 'Café Lounge',
    duration: '5:40'
  },
  {
    id: 'coverless-book',
    name: 'Coverless Book',
    file: '/sounds/music/coverless-book-lofi-186307.mp3',
    artist: 'Study Sessions',
    duration: '3:07'
  },
  {
    id: 'lofi-piano-chill',
    name: 'Piano Chill',
    file: '/sounds/music/lofi-piano-chill-386799.mp3',
    artist: 'Evening Vibes',
    duration: '6:26'
  },
  {
    id: 'lofi-postcard',
    name: 'Lo-Fi Postcard',
    file: '/sounds/music/lofi-chill-beat-lo-fi-postcard-366049.mp3',
    artist: 'Chill Beats',
    duration: '6:06'
  }
]

interface MusicContextType {
  // State
  currentTrack: Track | null
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  isLoading: boolean
  playlist: Track[]

  // Actions
  playTrack: (track: Track) => void
  togglePlayPause: () => void
  playNextTrack: () => void
  playPreviousTrack: () => void
  setVolume: (volume: number) => void
  seekTo: (time: number) => void
  formatTime: (time: number) => string
  startAutoPlay: () => void
}

const MusicContext = createContext<MusicContextType | null>(null)

interface MusicProviderProps {
  children: ReactNode
}

export const MusicProvider = ({ children }: MusicProviderProps) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.6)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [autoStartTimer, setAutoStartTimer] = useState(10)
  const [autoStartActive, setAutoStartActive] = useState(true)

  const audioRef = useRef<HTMLAudioElement>(null)
  const { playSound } = useSoundContext()

  // Create persistent audio element
  useEffect(() => {
    const audio = document.createElement('audio')
    audio.preload = 'metadata'
    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  // Auto-start timer
  useEffect(() => {
    if (autoStartActive && autoStartTimer > 0 && !currentTrack) {
      const timer = setTimeout(() => {
        setAutoStartTimer(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (autoStartTimer === 0 && !currentTrack && autoStartActive) {
      // Auto-start first track
      playTrack(PLAYLIST[0])
      setAutoStartActive(false)
    }
  }, [autoStartTimer, currentTrack, autoStartActive])

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      playNextTrack()
    }

    const handleLoadStart = () => {
      setIsLoading(true)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
    }

    const handleError = () => {
      setIsLoading(false)
      playSound('error')
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
    }
  }, [currentTrack])

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const playTrack = useCallback((track: Track) => {
    setCurrentTrack(track)
    setAutoStartActive(false)
    playSound('click')

    if (audioRef.current) {
      audioRef.current.src = track.file
      audioRef.current.load()
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(error => {
        console.warn('Could not play track:', error)
        playSound('error')
      })
    }
  }, [playSound])

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !currentTrack) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(error => {
        console.warn('Could not play:', error)
        playSound('error')
      })
    }
    playSound('click')
  }, [isPlaying, currentTrack, playSound])

  const playNextTrack = useCallback(() => {
    if (!currentTrack) return

    const currentIndex = PLAYLIST.findIndex(track => track.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % PLAYLIST.length
    playTrack(PLAYLIST[nextIndex])
  }, [currentTrack, playTrack])

  const playPreviousTrack = useCallback(() => {
    if (!currentTrack) return

    const currentIndex = PLAYLIST.findIndex(track => track.id === currentTrack.id)
    const prevIndex = currentIndex === 0 ? PLAYLIST.length - 1 : currentIndex - 1
    playTrack(PLAYLIST[prevIndex])
  }, [currentTrack, playTrack])

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    setVolumeState(clampedVolume)
  }, [])

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }, [])

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current
    if (audio && duration > 0) {
      const clampedTime = Math.max(0, Math.min(time, duration))
      audio.currentTime = clampedTime
      setCurrentTime(clampedTime)
    }
  }, [duration])

  const startAutoPlay = useCallback(() => {
    if (!currentTrack && PLAYLIST.length > 0) {
      playTrack(PLAYLIST[0])
    }
  }, [currentTrack, playTrack])

  const contextValue: MusicContextType = {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    isLoading,
    playlist: PLAYLIST,
    playTrack,
    togglePlayPause,
    playNextTrack,
    playPreviousTrack,
    setVolume,
    seekTo,
    formatTime,
    startAutoPlay
  }

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  )
}

export const useMusicContext = (): MusicContextType => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider')
  }
  return context
}