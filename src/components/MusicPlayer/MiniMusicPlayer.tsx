import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusicContext } from '../../contexts/MusicContext'

const MiniMusicPlayer = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    playPreviousTrack,
    playNextTrack,
    volume,
    setVolume,
    currentTime,
    duration,
    formatTime
  } = useMusicContext()

  if (!currentTrack) return null

  return (
    <div className="fixed bottom-16 left-4 z-50">
      <motion.div
        className="bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-400 rounded-lg shadow-lg overflow-hidden"
        style={{
          fontFamily: 'Press Start 2P, monospace',
          backdropFilter: 'blur(8px)'
        }}
        initial={false}
        animate={{
          width: isExpanded ? 320 : 200,
          height: isExpanded ? 180 : 60
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Compact Header */}
        <div
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-amber-200/50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            {/* Vinyl Animation */}
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-900 to-black border border-gray-600 relative"
              animate={{
                rotate: isPlaying ? 360 : 0
              }}
              transition={{
                duration: 4,
                repeat: isPlaying ? Infinity : 0,
                ease: "linear"
              }}
            >
              <div className="absolute inset-1 rounded-full border border-gray-500/30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              </div>
            </motion.div>

            <div className="min-w-0 flex-1">
              <p className="text-[8px] text-amber-900 truncate font-pixel">
                {currentTrack.name}
              </p>
              <p className="text-[7px] text-amber-700 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Compact Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                togglePlayPause()
              }}
              className="p-1 bg-amber-600 text-white rounded hover:bg-amber-500 transition-colors"
            >
              <span className="text-[10px]">
                {isPlaying ? '⏸' : '▶'}
              </span>
            </button>

            <motion.span
              className="text-amber-600 text-[8px]"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▼
            </motion.span>
          </div>
        </div>

        {/* Expanded Controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-3 pb-3 space-y-3"
            >
              {/* Transport Controls */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={playPreviousTrack}
                  className="p-2 bg-amber-600 text-white rounded hover:bg-amber-500 transition-colors"
                >
                  <span className="text-[10px]">⏮</span>
                </button>

                <button
                  onClick={togglePlayPause}
                  className="p-3 bg-green-600 text-white rounded hover:bg-green-500 transition-colors"
                >
                  <span className="text-[12px]">
                    {isPlaying ? '⏸️' : '▶️'}
                  </span>
                </button>

                <button
                  onClick={playNextTrack}
                  className="p-2 bg-amber-600 text-white rounded hover:bg-amber-500 transition-colors"
                >
                  <span className="text-[10px]">⏭</span>
                </button>
              </div>

              {/* Progress Bar */}
              {duration > 0 && (
                <div>
                  <div className="flex justify-between text-[7px] text-amber-700 mb-1 font-pixel">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <div
                    className="w-full h-1.5 bg-amber-200 rounded"
                    style={{
                      background: `linear-gradient(to right, #d97706 0%, #d97706 ${(currentTime / duration) * 100}%, #fbbf24 ${(currentTime / duration) * 100}%, #fbbf24 100%)`
                    }}
                  />
                </div>
              )}

              {/* Volume Control */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[7px] text-amber-800 font-pixel">🔊</span>
                  <span className="text-[7px] text-amber-700 font-pixel">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume * 100}
                  onChange={(e) => setVolume(parseFloat(e.target.value) / 100)}
                  className="w-full h-1.5 bg-amber-200 rounded appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #d97706 0%, #d97706 ${volume * 100}%, #fbbf24 ${volume * 100}%, #fbbf24 100%)`
                  }}
                />
              </div>

              {/* Status */}
              <div className="text-center">
                <div className="text-[6px] text-amber-600 animate-pulse font-pixel">
                  ♪ {isPlaying ? 'PLAYING' : 'PAUSED'} ♪
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 1px;
          background: #d97706;
          cursor: pointer;
          box-shadow: 0 0 4px rgba(217, 119, 6, 0.6);
        }

        input[type="range"]::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 1px;
          background: #d97706;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 4px rgba(217, 119, 6, 0.6);
        }
      `}</style>
    </div>
  )
}

export default MiniMusicPlayer