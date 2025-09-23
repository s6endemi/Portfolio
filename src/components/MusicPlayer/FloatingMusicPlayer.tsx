import { motion, AnimatePresence } from 'framer-motion'
import { useMusicContext } from '../../contexts/MusicContext'

interface FloatingMusicPlayerProps {
  isVisible: boolean // When music is playing but music window is closed
}

const FloatingMusicPlayer = ({ isVisible }: FloatingMusicPlayerProps) => {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    playNextTrack,
    playPreviousTrack
  } = useMusicContext()

  if (!currentTrack) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-20 right-4 z-[99999]"
          style={{
            width: '280px',
            maxWidth: '280px'
          }}
        >
          {/* Main Container - Retro Boombox Style */}
          <div
            className="relative p-4"
            style={{
              background: 'linear-gradient(145deg, #2C2C2C 0%, #404040 25%, #565656 50%, #404040 75%, #2C2C2C 100%)',
              border: '4px solid #1A1A1A',
              borderRadius: '0',
              boxShadow: 'inset 0 0 0 2px #6A6A6A, 6px 6px 0 #0D0D0D, 0 0 20px rgba(0,0,0,0.5)'
            }}
          >
            {/* Retro Header with LED Display */}
            <div
              className="mb-3 p-2 relative"
              style={{
                background: '#000000',
                border: '2px solid #333333',
                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.8)'
              }}
            >
              {/* Scanlines Effect */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: `
                    repeating-linear-gradient(
                      0deg,
                      transparent 0px,
                      transparent 1px,
                      rgba(0,255,0,0.1) 1px,
                      rgba(0,255,0,0.1) 2px
                    )
                  `
                }}
              />

              <div className="relative z-10 text-center">
                <div
                  className="text-[8px] mb-1"
                  style={{
                    fontFamily: '"Press Start 2P", monospace',
                    color: '#00FF00',
                    textShadow: '0 0 8px #00FF00'
                  }}
                >
                  ♪ NOW PLAYING ♪
                </div>
                <div
                  className="text-[9px] truncate px-1"
                  style={{
                    fontFamily: '"Press Start 2P", monospace',
                    color: '#FFFF00',
                    textShadow: '0 0 6px #FFFF00',
                    lineHeight: '1.4'
                  }}
                >
                  {currentTrack.name.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex items-center gap-3">
              {/* Spinning Vinyl Record */}
              <div className="flex-shrink-0">
                <motion.div
                  className="relative"
                  animate={{
                    rotate: isPlaying ? 360 : 0
                  }}
                  transition={{
                    duration: 3,
                    repeat: isPlaying ? Infinity : 0,
                    ease: "linear"
                  }}
                >
                  <div
                    className="w-12 h-12 relative"
                    style={{
                      background: 'radial-gradient(circle, #1a1a1a 0%, #000000 70%, #333333 100%)',
                      border: '2px solid #444444',
                      borderRadius: '50%'
                    }}
                  >
                    {/* Vinyl grooves */}
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="absolute rounded-full border border-gray-600/40"
                        style={{
                          width: `${80 - i * 20}%`,
                          height: `${80 - i * 20}%`,
                          top: `${10 + i * 10}%`,
                          left: `${10 + i * 10}%`,
                        }}
                      />
                    ))}

                    {/* Center label */}
                    <div
                      className="absolute inset-0 flex items-center justify-center text-[6px] font-bold"
                      style={{
                        background: isPlaying
                          ? 'radial-gradient(circle, #00FF00 0%, #008800 100%)'
                          : 'radial-gradient(circle, #8B4513 0%, #654321 100%)',
                        width: '30%',
                        height: '30%',
                        margin: 'auto',
                        top: '35%',
                        left: '35%',
                        borderRadius: '50%',
                        fontFamily: '"Press Start 2P", monospace',
                        color: '#FFFFFF',
                        textShadow: '1px 1px 0 #000000'
                      }}
                    >
                      ♪
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Controls Section */}
              <div className="flex-1 min-w-0">
                {/* Control Buttons */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  {/* Previous Button */}
                  <button
                    onClick={playPreviousTrack}
                    className="relative group"
                    style={{
                      background: 'linear-gradient(145deg, #FF6B00 0%, #FF8500 50%, #FF6B00 100%)',
                      border: '2px solid #CC5500',
                      borderRadius: '0',
                      width: '32px',
                      height: '32px',
                      boxShadow: '2px 2px 0 #AA4400, inset 0 0 0 1px #FFAA55'
                    }}
                  >
                    <div
                      className="text-[10px] font-bold"
                      style={{
                        fontFamily: '"Press Start 2P", monospace',
                        color: '#FFFFFF',
                        textShadow: '1px 1px 0 #AA4400'
                      }}
                    >
                      ◄
                    </div>
                  </button>

                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlayPause}
                    className="relative group"
                    style={{
                      background: isPlaying
                        ? 'linear-gradient(145deg, #FF0000 0%, #FF3333 50%, #FF0000 100%)'
                        : 'linear-gradient(145deg, #00AA00 0%, #00FF00 50%, #00AA00 100%)',
                      border: `2px solid ${isPlaying ? '#CC0000' : '#008800'}`,
                      borderRadius: '0',
                      width: '40px',
                      height: '40px',
                      boxShadow: isPlaying
                        ? '2px 2px 0 #990000, inset 0 0 0 1px #FF6666'
                        : '2px 2px 0 #006600, inset 0 0 0 1px #66FF66'
                    }}
                  >
                    <div
                      className="text-[12px] font-bold"
                      style={{
                        fontFamily: '"Press Start 2P", monospace',
                        color: '#FFFFFF',
                        textShadow: isPlaying ? '1px 1px 0 #990000' : '1px 1px 0 #006600'
                      }}
                    >
                      {isPlaying ? '■' : '►'}
                    </div>
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={playNextTrack}
                    className="relative group"
                    style={{
                      background: 'linear-gradient(145deg, #FF6B00 0%, #FF8500 50%, #FF6B00 100%)',
                      border: '2px solid #CC5500',
                      borderRadius: '0',
                      width: '32px',
                      height: '32px',
                      boxShadow: '2px 2px 0 #AA4400, inset 0 0 0 1px #FFAA55'
                    }}
                  >
                    <div
                      className="text-[10px] font-bold"
                      style={{
                        fontFamily: '"Press Start 2P", monospace',
                        color: '#FFFFFF',
                        textShadow: '1px 1px 0 #AA4400'
                      }}
                    >
                      ►
                    </div>
                  </button>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center justify-center gap-2">
                  <div
                    className={`w-2 h-2 ${isPlaying ? 'animate-pulse' : ''}`}
                    style={{
                      background: isPlaying ? '#00FF00' : '#FF0000',
                      boxShadow: isPlaying ? '0 0 6px #00FF00' : '0 0 6px #FF0000'
                    }}
                  />
                  <div
                    className="text-[7px]"
                    style={{
                      fontFamily: '"Press Start 2P", monospace',
                      color: isPlaying ? '#00FF00' : '#FF0000',
                      textShadow: isPlaying ? '0 0 4px #00FF00' : '0 0 4px #FF0000'
                    }}
                  >
                    {isPlaying ? 'PLAYING' : 'PAUSED'}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Speaker Grilles */}
            <div className="flex justify-between mt-2 opacity-60">
              <div
                className="w-8 h-3"
                style={{
                  background: `
                    repeating-linear-gradient(
                      90deg,
                      #333333 0px, #333333 1px,
                      transparent 1px, transparent 2px
                    )
                  `
                }}
              />
              <div
                className="w-8 h-3"
                style={{
                  background: `
                    repeating-linear-gradient(
                      90deg,
                      #333333 0px, #333333 1px,
                      transparent 1px, transparent 2px
                    )
                  `
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingMusicPlayer