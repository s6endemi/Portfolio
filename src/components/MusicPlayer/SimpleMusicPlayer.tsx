import { motion } from 'framer-motion'
import { useMusicContext } from '../../contexts/MusicContext'

const SimpleMusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    playlist,
    playTrack,
    togglePlayPause,
    playNextTrack,
    playPreviousTrack,
    setVolume,
    seekTo,
    formatTime,
    startAutoPlay
  } = useMusicContext()


  return (
    <div
      className="h-full overflow-hidden relative"
      style={{
        background: 'linear-gradient(180deg, #8B4513 0%, #CD853F 15%, #DEB887 50%, #F5DEB3 85%, #FFF8DC 100%)',
        imageRendering: 'pixelated'
      }}
    >
      {/* Pixel Art Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(139,69,19,0.8) 2px, transparent 2px),
            radial-gradient(circle at 80% 70%, rgba(160,82,45,0.6) 1px, transparent 1px),
            radial-gradient(circle at 60% 20%, rgba(210,180,140,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 60px 60px, 80px 80px'
        }}
      />

      {/* 8-bit Decorative Border */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="w-full h-full border-8"
          style={{
            borderImage: `
              repeating-linear-gradient(
                0deg,
                #8B4513 0px, #8B4513 4px,
                #CD853F 4px, #CD853F 8px,
                #DEB887 8px, #DEB887 12px,
                #F5DEB3 12px, #F5DEB3 16px
              ) 8
            `,
            borderImageSlice: 8
          }}
        />
      </div>

      <div className="relative z-10 p-6">
        {/* Pixel Art Header */}
        <div className="mb-12 text-center">
          {/* Café Sign */}
          <div
            className="inline-block p-8 mb-6 relative"
            style={{
              background: 'linear-gradient(45deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)',
              border: '4px solid #654321',
              borderRadius: '0',
              boxShadow: 'inset 0 0 0 2px #CD853F, 6px 6px 0 #5D4E37'
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `
                  repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 2px,
                    rgba(205,133,63,0.3) 2px,
                    rgba(205,133,63,0.3) 4px
                  )
                `
              }}
            />
            <h1
              className="relative z-10 text-3xl font-bold uppercase tracking-[0.3em]"
              style={{
                fontFamily: '"Press Start 2P", monospace',
                color: '#FFF8DC',
                textShadow: '2px 2px 0 #654321, 4px 4px 0 #5D4E37',
                fontSize: '20px',
                lineHeight: '1.4'
              }}
            >
              ☕ Pixel Café ☕
            </h1>
          </div>

          <div
            className="inline-block px-6 py-3"
            style={{
              background: '#654321',
              border: '2px solid #8B4513',
              color: '#DEB887',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '11px'
            }}
          >
            ♪ Lo-Fi Beats & Chill Vibes ♪
          </div>
        </div>

        {/* Pixel Art Start Screen */}
        {!currentTrack && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            {/* Jukebox Style Container */}
            <div
              className="relative p-10 mx-auto max-w-md"
              style={{
                background: 'linear-gradient(145deg, #8B4513 0%, #A0522D 25%, #CD853F 50%, #A0522D 75%, #8B4513 100%)',
                border: '6px solid #654321',
                borderRadius: '0',
                boxShadow: 'inset 0 0 0 3px #DEB887, 10px 10px 0 #5D4E37'
              }}
            >
              {/* Pixel Speaker Grille */}
              <div
                className="absolute top-4 left-4 right-4 h-8 opacity-60"
                style={{
                  background: `
                    repeating-linear-gradient(
                      90deg,
                      #654321 0px, #654321 2px,
                      transparent 2px, transparent 4px
                    )
                  `
                }}
              />

              {/* Main Display */}
              <div
                className="bg-black p-4 mb-6 relative"
                style={{
                  border: '4px solid #2D2D2D',
                  boxShadow: 'inset 4px 4px 0 #1a1a1a'
                }}
              >
                <div className="text-center">
                  <div
                    className="text-[16px] mb-2"
                    style={{
                      fontFamily: '"Press Start 2P", monospace',
                      color: '#00FF00',
                      textShadow: '0 0 10px #00FF00'
                    }}
                  >
                    JUKEBOX
                  </div>
                  <div
                    className="text-[10px] mb-4"
                    style={{
                      fontFamily: '"Press Start 2P", monospace',
                      color: '#FFFF00',
                      textShadow: '0 0 8px #FFFF00'
                    }}
                  >
                    READY TO PLAY
                  </div>

                  {/* Blinking Cursor */}
                  <div
                    className="inline-block w-2 h-3 animate-pulse"
                    style={{
                      background: '#00FF00',
                      boxShadow: '0 0 4px #00FF00'
                    }}
                  />
                </div>
              </div>

              {/* Big Red Button */}
              <button
                onClick={startAutoPlay}
                className="w-full relative group"
                style={{
                  background: 'linear-gradient(145deg, #FF0000 0%, #DC143C 50%, #B22222 100%)',
                  border: '4px solid #8B0000',
                  borderRadius: '0',
                  padding: '16px',
                  boxShadow: '4px 4px 0 #5D0000, inset 0 0 0 2px #FF6B6B'
                }}
              >
                <div
                  className="text-[14px] font-bold uppercase"
                  style={{
                    fontFamily: '"Press Start 2P", monospace',
                    color: '#FFFFFF',
                    textShadow: '2px 2px 0 #8B0000',
                    letterSpacing: '2px'
                  }}
                >
                  ► START MUSIC ◄
                </div>

                {/* Button Highlight Effect */}
                <div
                  className="absolute inset-2 opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)'
                  }}
                />
              </button>

              {/* Coin Slot Decoration */}
              <div
                className="mt-4 mx-auto w-16 h-3"
                style={{
                  background: '#2D2D2D',
                  border: '2px solid #1a1a1a',
                  borderRadius: '0'
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Now Playing Display */}
        {currentTrack && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            {/* Retro Boombox Style */}
            <div
              className="relative p-8 mx-auto max-w-lg"
              style={{
                background: 'linear-gradient(145deg, #2C2C2C 0%, #404040 25%, #565656 50%, #404040 75%, #2C2C2C 100%)',
                border: '6px solid #1a1a1a',
                borderRadius: '0',
                boxShadow: 'inset 0 0 0 3px #6a6a6a, 10px 10px 0 #0D0D0D'
              }}
            >
              {/* LCD Display */}
              <div
                className="bg-black p-4 mb-4 relative"
                style={{
                  border: '4px solid #0D4F0D',
                  boxShadow: 'inset 4px 4px 0 #062306, 0 0 20px rgba(0,255,0,0.3)'
                }}
              >
                {/* Scanlines Effect */}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
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

                <div className="text-center relative z-10">
                  <div
                    className="text-[12px] mb-4"
                    style={{
                      fontFamily: '"Press Start 2P", monospace',
                      color: '#00FF00',
                      textShadow: '0 0 10px #00FF00'
                    }}
                  >
                    ♪ NOW PLAYING ♪
                  </div>

                  <div
                    className="text-[14px] mb-3 px-2"
                    style={{
                      fontFamily: '"Press Start 2P", monospace',
                      color: '#FFFF00',
                      textShadow: '0 0 8px #FFFF00',
                      lineHeight: '1.6'
                    }}
                  >
                    {currentTrack.name.toUpperCase()}
                  </div>


                  {/* Status Indicator */}
                  <div className="flex items-center justify-center gap-3">
                    <div
                      className={`w-3 h-3 ${isPlaying ? 'animate-pulse' : ''}`}
                      style={{
                        background: isPlaying ? '#00FF00' : '#FF0000',
                        boxShadow: isPlaying ? '0 0 10px #00FF00' : '0 0 10px #FF0000'
                      }}
                    />
                    <div
                      className="text-[9px]"
                      style={{
                        fontFamily: '"Press Start 2P", monospace',
                        color: isPlaying ? '#00FF00' : '#FF0000',
                        textShadow: isPlaying ? '0 0 8px #00FF00' : '0 0 8px #FF0000'
                      }}
                    >
                      {isPlaying ? 'PLAYING' : 'PAUSED'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Vinyl Record Animation */}
              <div className="flex justify-center mb-4">
                <motion.div
                  className="relative"
                  animate={{
                    rotate: isPlaying ? 360 : 0
                  }}
                  transition={{
                    duration: 4,
                    repeat: isPlaying ? Infinity : 0,
                    ease: "linear"
                  }}
                >
                  <div
                    className="w-16 h-16 relative"
                    style={{
                      background: 'radial-gradient(circle, #1a1a1a 0%, #000000 70%, #333333 100%)',
                      border: '2px solid #444444'
                    }}
                  >
                    {/* Vinyl grooves */}
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="absolute rounded-full border border-gray-600/40"
                        style={{
                          width: `${80 - i * 15}%`,
                          height: `${80 - i * 15}%`,
                          top: `${10 + i * 7.5}%`,
                          left: `${10 + i * 7.5}%`,
                        }}
                      />
                    ))}

                    {/* Center label */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background: 'radial-gradient(circle, #8B4513 0%, #654321 100%)',
                        width: '30%',
                        height: '30%',
                        margin: 'auto',
                        top: '35%',
                        left: '35%'
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Game Controller Section */}
        <div className="mb-12">
          {/* Game Controller Controls */}
          <div
            className="relative p-8 mx-auto max-w-lg mb-8"
            style={{
              background: 'linear-gradient(145deg, #4A4A4A 0%, #5E5E5E 25%, #727272 50%, #5E5E5E 75%, #4A4A4A 100%)',
              border: '6px solid #2D2D2D',
              borderRadius: '0',
              boxShadow: 'inset 0 0 0 3px #8A8A8A, 10px 10px 0 #1A1A1A'
            }}
          >
            {/* Control Header */}
            <div
              className="text-center mb-8 p-3"
              style={{
                background: '#0D0D0D',
                border: '3px solid #333333'
              }}
            >
              <div
                className="text-[14px] mb-2"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  color: '#00FFFF',
                  textShadow: '0 0 10px #00FFFF'
                }}
              >
                ♪ CONTROLS ♪
              </div>
              <div
                className="text-[9px]"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  color: '#FFFF00',
                  textShadow: '0 0 6px #FFFF00'
                }}
              >
                PLAYER MODE
              </div>
            </div>

            {/* D-Pad Style Controls */}
            <div className="flex items-center justify-center gap-8 mb-8">
            {/* Previous Button */}
            <button
              onClick={playPreviousTrack}
              disabled={!currentTrack}
              className="relative group"
              style={{
                background: 'linear-gradient(145deg, #FF6B00 0%, #FF8500 50%, #FF6B00 100%)',
                border: '4px solid #CC5500',
                borderRadius: '0',
                width: '60px',
                height: '60px',
                boxShadow: '4px 4px 0 #AA4400, inset 0 0 0 2px #FFAA55'
              }}
            >
              <div
                className="text-[16px] font-bold"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  color: '#FFFFFF',
                  textShadow: '2px 2px 0 #AA4400'
                }}
              >
                ◄
              </div>
              <div
                className="absolute inset-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)'
                }}
              />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              disabled={!currentTrack}
              className="relative group"
              style={{
                background: isPlaying
                  ? 'linear-gradient(145deg, #FF0000 0%, #FF3333 50%, #FF0000 100%)'
                  : 'linear-gradient(145deg, #00AA00 0%, #00FF00 50%, #00AA00 100%)',
                border: `4px solid ${isPlaying ? '#CC0000' : '#008800'}`,
                borderRadius: '0',
                width: '80px',
                height: '80px',
                boxShadow: isPlaying
                  ? '4px 4px 0 #990000, inset 0 0 0 2px #FF6666'
                  : '4px 4px 0 #006600, inset 0 0 0 2px #66FF66'
              }}
            >
              <div
                className="text-[20px] font-bold"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  color: '#FFFFFF',
                  textShadow: isPlaying ? '2px 2px 0 #990000' : '2px 2px 0 #006600'
                }}
              >
                {isPlaying ? '■' : '►'}
              </div>
              <div
                className="absolute inset-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)'
                }}
              />
            </button>

            {/* Next Button */}
            <button
              onClick={playNextTrack}
              disabled={!currentTrack}
              className="relative group"
              style={{
                background: 'linear-gradient(145deg, #FF6B00 0%, #FF8500 50%, #FF6B00 100%)',
                border: '4px solid #CC5500',
                borderRadius: '0',
                width: '60px',
                height: '60px',
                boxShadow: '4px 4px 0 #AA4400, inset 0 0 0 2px #FFAA55'
              }}
            >
              <div
                className="text-[16px] font-bold"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  color: '#FFFFFF',
                  textShadow: '2px 2px 0 #AA4400'
                }}
              >
                ►
              </div>
              <div
                className="absolute inset-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)'
                }}
              />
            </button>
          </div>

          </div>

          {/* Progress & Volume Panel - Full Width */}
          <div
            className="relative p-10 w-full"
            style={{
              background: 'linear-gradient(145deg, #1A1A1A 0%, #2D2D2D 25%, #404040 50%, #2D2D2D 75%, #1A1A1A 100%)',
              border: '6px solid #0D0D0D',
              borderRadius: '0',
              boxShadow: 'inset 0 0 0 3px #565656, 10px 10px 0 #000000'
            }}
          >
            {/* Panel Header */}
            <div
              className="text-center mb-8 p-3"
              style={{
                background: '#0D0D0D',
                border: '3px solid #333333'
              }}
            >
              <div
                className="text-[14px] mb-2"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  color: '#FF00FF',
                  textShadow: '0 0 10px #FF00FF'
                }}
              >
                ♫ SETTINGS ♫
              </div>
              <div
                className="text-[9px]"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  color: '#00FFFF',
                  textShadow: '0 0 6px #00FFFF'
                }}
              >
                AUDIO CONTROL
              </div>
            </div>

            {/* Controls Layout - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Progress Bar */}
              {currentTrack && duration > 0 && (
                <div className="mb-6">
                  <div
                    className="flex justify-between text-[10px] mb-4"
                    style={{
                      fontFamily: '"Press Start 2P", monospace',
                      color: '#FFFF00',
                      textShadow: '0 0 4px #FFFF00'
                    }}
                  >
                    <span>⏱ {formatTime(currentTime)}</span>
                    <span>{formatTime(duration)} ⏱</span>
                  </div>

                  {/* 8-bit Progress Bar - Interactive */}
                  <div
                    className="relative w-full h-10 cursor-pointer"
                    style={{
                      background: '#2D2D2D',
                      border: '3px solid #1A1A1A',
                      borderRadius: '0'
                    }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const clickX = e.clientX - rect.left
                      const percentage = Math.max(0, Math.min(1, clickX / rect.width))
                      const seekTime = percentage * duration
                      seekTo(seekTime)
                    }}
                  >
                    {/* Progress fill */}
                    <div
                      className="h-full"
                      style={{
                        background: 'linear-gradient(90deg, #00FF00 0%, #FFFF00 50%, #FF0000 100%)',
                        width: `${(currentTime / duration) * 100}%`,
                        boxShadow: '0 0 10px rgba(0,255,0,0.8)'
                      }}
                    />
                    
                    {/* Neon slider handle */}
                    <div
                      className="absolute top-0 w-4 h-full transform -translate-x-2 transition-all duration-150 hover:scale-110"
                      style={{
                        left: `${(currentTime / duration) * 100}%`,
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #00FFFF 50%, #0080FF 100%)',
                        border: '2px solid #00FFFF',
                        borderRadius: '0',
                        boxShadow: '0 0 15px #00FFFF, inset 0 0 5px rgba(255,255,255,0.5)',
                        cursor: 'grab'
                      }}
                    >
                      {/* Inner glow */}
                      <div
                        className="w-full h-full opacity-60"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Volume Control */}
              <div className="mb-6">
                <div
                  className="flex items-center justify-between mb-4"
                  style={{
                    fontFamily: '"Press Start 2P", monospace',
                    color: '#00FFFF',
                    textShadow: '0 0 4px #00FFFF',
                    fontSize: '10px'
                  }}
                >
                  <span>🔊 VOLUME</span>
                  <span>{Math.round(volume * 100)}%</span>
                </div>

                {/* 8-bit Volume Bar */}
                <div
                  className="relative w-full h-10"
                  style={{
                    background: '#2D2D2D',
                    border: '3px solid #1A1A1A',
                    borderRadius: '0'
                  }}
                >
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={(e) => setVolume(parseFloat(e.target.value) / 100)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  
                  {/* Volume fill */}
                  <div
                    className="h-full"
                    style={{
                      background: 'linear-gradient(90deg, #0000FF 0%, #00FFFF 50%, #FFFFFF 100%)',
                      width: `${volume * 100}%`,
                      boxShadow: '0 0 10px rgba(0,255,255,0.8)'
                    }}
                  />
                  
                  {/* Neon volume slider handle */}
                  <div
                    className="absolute top-0 w-4 h-full transform -translate-x-2 transition-all duration-150 hover:scale-110 pointer-events-none"
                    style={{
                      left: `${volume * 100}%`,
                      background: 'linear-gradient(180deg, #FFFFFF 0%, #FF00FF 50%, #8000FF 100%)',
                      border: '2px solid #FF00FF',
                      borderRadius: '0',
                      boxShadow: '0 0 15px #FF00FF, inset 0 0 5px rgba(255,255,255,0.5)',
                    }}
                  >
                    {/* Inner glow */}
                    <div
                      className="w-full h-full opacity-60"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cassette Playlist */}
        <div
          className="relative p-8 mx-auto max-w-2xl"
          style={{
            background: 'linear-gradient(145deg, #1A1A1A 0%, #2D2D2D 25%, #404040 50%, #2D2D2D 75%, #1A1A1A 100%)',
            border: '6px solid #0D0D0D',
            borderRadius: '0',
            boxShadow: 'inset 0 0 0 3px #565656, 10px 10px 0 #000000'
          }}
        >
          {/* Cassette Player Header */}
          <div
            className="text-center mb-8 p-4"
            style={{
              background: '#0D0D0D',
              border: '3px solid #333333'
            }}
          >
            <div
              className="text-[16px] mb-3"
              style={{
                fontFamily: '"Press Start 2P", monospace',
                color: '#FF00FF',
                textShadow: '0 0 10px #FF00FF'
              }}
            >
              ♫ TAPE DECK ♫
            </div>
            <div
              className="text-[10px]"
              style={{
                fontFamily: '"Press Start 2P", monospace',
                color: '#00FFFF',
                textShadow: '0 0 6px #00FFFF'
              }}
            >
              PLAYLIST MODE • {playlist.length} TRACKS
            </div>
          </div>

          {/* Track List */}
          <div className="space-y-4">
            {playlist.map((track, index) => (
              <motion.div
                key={track.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => playTrack(track)}
                className="relative cursor-pointer group"
                style={{
                  background: currentTrack?.id === track.id
                    ? 'linear-gradient(90deg, #0D4F0D 0%, #1A661A 50%, #0D4F0D 100%)'
                    : 'linear-gradient(90deg, #2D2D2D 0%, #404040 50%, #2D2D2D 100%)',
                  border: `4px solid ${currentTrack?.id === track.id ? '#00FF00' : '#565656'}`,
                  borderRadius: '0',
                  padding: '16px',
                  boxShadow: currentTrack?.id === track.id
                    ? '0 0 20px rgba(0,255,0,0.5), 4px 4px 0 #1A1A1A'
                    : '4px 4px 0 #1A1A1A'
                }}
              >
                {/* Vinyl Record and Track Info */}
                <div className="flex items-center gap-6">
                  {/* Animated Vinyl Record */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className="relative"
                      animate={{
                        rotate: currentTrack?.id === track.id && isPlaying ? 360 : 0
                      }}
                      transition={{
                        duration: 3,
                        repeat: currentTrack?.id === track.id && isPlaying ? Infinity : 0,
                        ease: "linear"
                      }}
                    >
                      <div
                        className="w-14 h-14 relative"
                        style={{
                          background: 'radial-gradient(circle, #1a1a1a 0%, #000000 60%, #333333 100%)',
                          border: '2px solid #444444',
                          borderRadius: '50%'
                        }}
                      >
                        {/* Vinyl grooves */}
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="absolute rounded-full border border-gray-600/30"
                            style={{
                              width: `${85 - i * 20}%`,
                              height: `${85 - i * 20}%`,
                              top: `${7.5 + i * 10}%`,
                              left: `${7.5 + i * 10}%`,
                            }}
                          />
                        ))}

                        {/* Center label with track number */}
                        <div
                          className="absolute inset-0 flex items-center justify-center text-[8px] font-bold"
                          style={{
                            background: currentTrack?.id === track.id 
                              ? 'radial-gradient(circle, #00FF00 0%, #008800 100%)'
                              : 'radial-gradient(circle, #8B4513 0%, #654321 100%)',
                            width: '35%',
                            height: '35%',
                            margin: 'auto',
                            top: '32.5%',
                            left: '32.5%',
                            borderRadius: '50%',
                            fontFamily: '"Press Start 2P", monospace',
                            color: '#FFFFFF',
                            textShadow: '1px 1px 0 #000000'
                          }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className="text-[12px] mb-1 truncate"
                      style={{
                        fontFamily: '"Press Start 2P", monospace',
                        color: currentTrack?.id === track.id ? '#FFFF00' : '#FFFFFF',
                        textShadow: currentTrack?.id === track.id ? '0 0 8px #FFFF00' : 'none',
                        lineHeight: '1.4'
                      }}
                    >
                      {track.name.toUpperCase()}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="text-[9px] px-2 py-1"
                      style={{
                        fontFamily: '"Press Start 2P", monospace',
                        color: '#888888',
                        background: '#1A1A1A',
                        border: '1px solid #333333'
                      }}
                    >
                      {track.duration}
                    </div>
                    {currentTrack?.id === track.id && isPlaying && (
                      <div
                        className="w-3 h-3 animate-pulse"
                        style={{
                          background: '#00FF00',
                          boxShadow: '0 0 8px #00FF00'
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Hover effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)'
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Info Section - Full Width */}
        <div className="mt-20">
          <div
            className="w-full p-8 text-center"
            style={{
              background: 'linear-gradient(145deg, #2D2D2D 0%, #404040 25%, #565656 50%, #404040 75%, #2D2D2D 100%)',
              border: '6px solid #1A1A1A',
              borderRadius: '0',
              boxShadow: 'inset 0 0 0 3px #6A6A6A, 8px 8px 0 #0D0D0D'
            }}
          >
            {/* Retro Badge Design */}
            <div
              className="mb-4 p-3"
              style={{
                background: '#0D0D0D',
                border: '3px solid #333333',
                position: 'relative'
              }}
            >
              <div
                className="text-[12px] mb-3"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  color: '#00FFFF',
                  textShadow: '0 0 8px #00FFFF',
                  letterSpacing: '1px'
                }}
              >
                ♫ RETRO MUSIC SYSTEM ♫
              </div>
              
              {/* Decorative separator */}
              <div
                className="w-full h-1 mb-3"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #00FFFF 50%, transparent 100%)',
                  boxShadow: '0 0 4px #00FFFF'
                }}
              />
              
              <div
                className="text-[9px] mb-2"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  color: '#FFFF00',
                  textShadow: '0 0 6px #FFFF00',
                  lineHeight: '1.6'
                }}
              >
                PIXEL CAFÉ ENTERTAINMENT
              </div>
              <div
                className="text-[8px]"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  color: '#FF00FF',
                  textShadow: '0 0 4px #FF00FF'
                }}
              >
                EST. 2024 • LO-FI VIBES ONLY
              </div>
            </div>

            {/* Copyright notice */}
            <div
              className="text-[7px] opacity-70"
              style={{
                fontFamily: '"Press Start 2P", monospace',
                color: '#CCCCCC'
              }}
            >
              CRAFTED WITH ♥ FOR CHILL VIBES
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleMusicPlayer