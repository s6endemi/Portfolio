import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSoundContext } from '../../contexts/SoundContext'

const SoundControls = () => {
  const {
    isMuted,
    toggleMute,
    masterVolume,
    setMasterVolume,
    isLoaded,
    currentMusic,
    stopMusic,
    playMusic
  } = useSoundContext()

  const [isExpanded, setIsExpanded] = useState(false)

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value) / 100
    setMasterVolume(volume)
  }

  const toggleMusicMode = () => {
    if (currentMusic === 'desktopMusic') {
      stopMusic()
    } else {
      playMusic('desktopMusic')
    }
  }

  if (!isLoaded) return null

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <motion.div
        className="bg-black/90 border-2 border-green-500/60 rounded-lg shadow-lg overflow-hidden"
        style={{
          fontFamily: 'Press Start 2P, monospace',
          backdropFilter: 'blur(8px)'
        }}
        initial={false}
        animate={{
          width: isExpanded ? 280 : 120,
          height: isExpanded ? 160 : 50
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Header Bar */}
        <div
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-green-500/10 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🔊</span>
            <span className="text-[10px] text-green-300">AUDIO</span>
          </div>
          <motion.span
            className="text-green-400 text-xs"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-3 pb-3 space-y-3"
            >
              {/* Volume Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] text-green-300">VOLUME</span>
                  <span className="text-[8px] text-green-400">{Math.round(masterVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={masterVolume * 100}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #00ff41 0%, #00ff41 ${masterVolume * 100}%, #374151 ${masterVolume * 100}%, #374151 100%)`
                  }}
                />
              </div>

              {/* Control Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={toggleMute}
                  className={`px-2 py-1 text-[8px] border rounded transition-all duration-200 ${
                    isMuted
                      ? 'bg-red-900/40 border-red-500 text-red-300 hover:bg-red-800/60'
                      : 'bg-green-900/40 border-green-500 text-green-300 hover:bg-green-800/60'
                  }`}
                  style={{ fontFamily: 'Press Start 2P, monospace' }}
                >
                  {isMuted ? '🔇 MUTED' : '🔊 AUDIO'}
                </button>

                <button
                  onClick={toggleMusicMode}
                  className={`px-2 py-1 text-[8px] border rounded transition-all duration-200 ${
                    currentMusic === 'desktopMusic'
                      ? 'bg-blue-900/40 border-blue-500 text-blue-300 hover:bg-blue-800/60'
                      : 'bg-gray-900/40 border-gray-500 text-gray-300 hover:bg-gray-800/60'
                  }`}
                  style={{ fontFamily: 'Press Start 2P, monospace' }}
                >
                  {currentMusic === 'desktopMusic' ? '🎵 ON' : '🎵 OFF'}
                </button>
              </div>

              {/* Music Status */}
              {currentMusic && (
                <div className="text-center">
                  <div className="text-[7px] text-cyan-400 animate-pulse">
                    ♪ {currentMusic === 'bootMusic' ? 'RETRO ADVENTURE' : 'JAZZ PIANO'} ♪
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 2px;
          background: #00ff41;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 255, 65, 0.6);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 2px;
          background: #00ff41;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(0, 255, 65, 0.6);
        }
      `}</style>
    </div>
  )
}

export default SoundControls