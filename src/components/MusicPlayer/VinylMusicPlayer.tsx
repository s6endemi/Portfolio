import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSoundContext } from '../../contexts/SoundContext'

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

const VinylMusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.6)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [autoStartTimer, setAutoStartTimer] = useState(10)
  const [autoStartActive, setAutoStartActive] = useState(true)

  const audioRef = useRef<HTMLAudioElement>(null)
  const { playSound } = useSoundContext()

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
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      playNextTrack()
    }

    const handleLoadStart = () => {
      // Loading started
    }

    const handleCanPlay = () => {
      // Can play
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
    }
  }, [currentTrack])

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const playTrack = (track: Track) => {
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
  }

  const togglePlayPause = () => {
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
  }

  const playNextTrack = () => {
    if (!currentTrack) return

    const currentIndex = PLAYLIST.findIndex(track => track.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % PLAYLIST.length
    playTrack(PLAYLIST[nextIndex])
  }

  const playPreviousTrack = () => {
    if (!currentTrack) return

    const currentIndex = PLAYLIST.findIndex(track => track.id === currentTrack.id)
    const prevIndex = currentIndex === 0 ? PLAYLIST.length - 1 : currentIndex - 1
    playTrack(PLAYLIST[prevIndex])
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (audio && duration) {
      const seekTime = (parseFloat(e.target.value) / 100) * duration
      audio.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  return (
    <div className="h-full p-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <audio ref={audioRef} preload="metadata" />

      {/* Gemütlicher Header */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-4xl">🎼</span>
          <h2 className="font-pixel text-[18px] uppercase tracking-[0.4em] text-amber-900">
            Lo-Fi Café
          </h2>
          <span className="text-4xl">☕</span>
        </div>
        <p className="text-[12px] text-amber-700">
          Gemütliche Musik für entspannte Stunden
        </p>
      </div>

      {/* Auto-start countdown */}
      {autoStartActive && autoStartTimer > 0 && !currentTrack && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-200/90 border-2 border-amber-500 rounded-lg p-4 mb-6 text-center"
        >
          <p className="text-[12px] font-pixel text-amber-900 mb-2">
            🎶 Musik startet in {autoStartTimer}s
          </p>
          <button
            onClick={() => setAutoStartActive(false)}
            className="px-3 py-1 bg-amber-800 text-amber-100 text-[10px] font-pixel rounded hover:bg-amber-700 transition-colors"
          >
            Abbrechen
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {/* Now Playing */}
        {currentTrack && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 border-2 border-amber-300 rounded-lg p-4 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-2xl">💿</span>
              <h3 className="font-pixel text-[14px] uppercase tracking-[0.3em] text-amber-900">
                Gerade spielt
              </h3>
              <span className="text-2xl">☕</span>
            </div>
            <h4 className="text-[16px] font-semibold text-amber-900 mb-1">
              {currentTrack.name}
            </h4>
            <p className="text-[12px] text-amber-700 mb-3">
              {currentTrack.artist}
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
              <span className="text-[11px] text-amber-700 font-pixel uppercase">
                {isPlaying ? '♪ Läuft' : '⏸ Pausiert'}
              </span>
            </div>
          </motion.div>
        )}

        {/* Simple Controls */}
        <div className="bg-white/90 border-2 border-amber-300 rounded-lg p-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={playPreviousTrack}
              disabled={!currentTrack}
              className="p-4 bg-amber-600 text-white rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              <span className="text-xl">⏮️</span>
            </button>

            <button
              onClick={togglePlayPause}
              disabled={!currentTrack}
              className="p-5 bg-green-600 text-white rounded-lg hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              <span className="text-2xl">
                {isPlaying ? '⏸️' : '▶️'}
              </span>
            </button>

            <button
              onClick={playNextTrack}
              disabled={!currentTrack}
              className="p-4 bg-amber-600 text-white rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              <span className="text-xl">⏭️</span>
            </button>
          </div>

          {/* Progress */}
          {currentTrack && duration > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-[10px] text-amber-700 mb-2 font-pixel">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSeek}
                className="w-full h-3 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #d97706 0%, #d97706 ${(currentTime / duration) * 100}%, #fbbf24 ${(currentTime / duration) * 100}%, #fbbf24 100%)`
                }}
              />
            </div>
          )}

          {/* Volume */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-pixel text-amber-900 uppercase">🔊 Lautstärke</span>
              <span className="text-[12px] text-amber-700 font-pixel">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={(e) => setVolume(parseFloat(e.target.value) / 100)}
              className="w-full h-3 bg-amber-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #d97706 0%, #d97706 ${volume * 100}%, #fbbf24 ${volume * 100}%, #fbbf24 100%)`
              }}
            />
          </div>
        </div>

        {/* Simple Playlist */}
        <div className="bg-white/90 border-2 border-amber-300 rounded-lg p-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-2xl">🎵</span>
            <h3 className="font-pixel text-[14px] uppercase tracking-[0.3em] text-amber-900">
              Playlist
            </h3>
            <span className="text-2xl">🎼</span>
          </div>

          <div className="space-y-3">
            {PLAYLIST.map((track, index) => (
              <motion.div
                key={track.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => playTrack(track)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  currentTrack?.id === track.id
                    ? 'bg-amber-200 border-amber-500 shadow-md'
                    : 'bg-amber-50 border-amber-200 hover:bg-amber-100 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-pixel text-amber-800 w-8 text-center">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="text-[13px] font-semibold text-amber-900">
                        {track.name}
                      </h4>
                      <p className="text-[11px] text-amber-700">
                        {track.artist}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-amber-600 font-pixel">
                      {track.duration}
                    </span>
                    {currentTrack?.id === track.id && isPlaying && (
                      <span className="text-green-600 animate-pulse text-lg">♪</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VinylMusicPlayer