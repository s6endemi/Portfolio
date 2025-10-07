import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PIXEL_FONT = '"Press Start 2P", "IBM Plex Mono", monospace'

const FORTUNES = [
  { id: 1, text: '大吉', subtext: 'GREAT FORTUNE', color: '#FFD700', emoji: '👑' },
  { id: 2, text: '財富', subtext: 'WEALTH', color: '#FF6347', emoji: '💰' },
  { id: 3, text: '幸運', subtext: 'LUCKY', color: '#FFD700', emoji: '🍀' },
  { id: 4, text: '成功', subtext: 'SUCCESS', color: '#FF6347', emoji: '🚀' },
  { id: 5, text: '繁榮', subtext: 'PROSPERITY', color: '#FFD700', emoji: '💎' },
  { id: 6, text: '財運', subtext: 'MONEY LUCK', color: '#FF6347', emoji: '🎰' },
  { id: 7, text: '吉祥', subtext: 'AUSPICIOUS', color: '#FFD700', emoji: '✨' },
  { id: 8, text: '富貴', subtext: 'RICHES', color: '#FF6347', emoji: '👛' }
]

const FortuneWheel = () => {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [selectedFortune, setSelectedFortune] = useState<typeof FORTUNES[0] | null>(null)
  const [spins, setSpins] = useState(0)
  const [showFireworks, setShowFireworks] = useState(false)

  const spinWheel = () => {
    if (spinning) return

    setSpinning(true)
    setSelectedFortune(null)
    setSpins(prev => prev + 1)

    // Random fortune
    const randomIndex = Math.floor(Math.random() * FORTUNES.length)
    const fortune = FORTUNES[randomIndex]

    // Calculate rotation (multiple full spins + landing position)
    const segmentAngle = 360 / FORTUNES.length
    const targetRotation = 360 * 5 + (randomIndex * segmentAngle) + (segmentAngle / 2)

    setRotation(prev => prev + targetRotation)

    // Show fortune after spin
    setTimeout(() => {
      setSelectedFortune(fortune)
      setSpinning(false)
      setShowFireworks(true)

      setTimeout(() => {
        setShowFireworks(false)
      }, 2000)
    }, 4000)
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #1a0a0a 0%, #000000 100%)'
      }}
    >
      {/* Background Stars */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: '3px',
            height: '3px',
            background: i % 2 === 0 ? '#FFD700' : '#FF6347',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 6px ${i % 2 === 0 ? '#FFD700' : '#FF6347'}`
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Spin Counter */}
      <motion.div
        className="absolute top-4 right-4 px-4 py-2 z-20"
        style={{
          background: 'rgba(0, 0, 0, 0.9)',
          border: '3px solid #FFD700',
          fontFamily: PIXEL_FONT,
          fontSize: '11px',
          color: '#FFD700',
          textShadow: '0 0 10px #FFD700',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
        }}
        animate={{ scale: spins > 0 ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        SPINS: {spins}
      </motion.div>

      {/* Title */}
      <motion.div
        className="absolute top-8 left-1/2 z-20"
        style={{
          transform: 'translateX(-50%)'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div
          style={{
            fontFamily: PIXEL_FONT,
            fontSize: '20px',
            background: 'linear-gradient(90deg, #FFD700 0%, #FF6347 50%, #FFD700 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'rainbow 3s linear infinite',
            textShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
            letterSpacing: '0.2em'
          }}
        >
          命運之輪
        </div>
        <div
          style={{
            fontFamily: PIXEL_FONT,
            fontSize: '10px',
            color: '#FFD700',
            textAlign: 'center',
            marginTop: '8px',
            letterSpacing: '0.1em'
          }}
        >
          WHEEL OF FORTUNE
        </div>
      </motion.div>

      {/* Main Wheel Container */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >

        {/* Wheel */}
        <div className="relative">
          {/* Outer Glow Ring */}
          <motion.div
            className="absolute"
            style={{
              width: '320px',
              height: '320px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, transparent 60%, rgba(255, 215, 0, 0.3) 80%, transparent 100%)',
              filter: 'blur(20px)'
            }}
            animate={{
              opacity: spinning ? [0.5, 1, 0.5] : 0.3,
              scale: spinning ? [1, 1.2, 1] : 1
            }}
            transition={{
              duration: 0.5,
              repeat: spinning ? Infinity : 0
            }}
          />

          {/* Wheel Base */}
          <motion.div
            className="relative"
            style={{
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              border: '8px solid #000',
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.6), inset 0 0 30px rgba(0, 0, 0, 0.8)'
            }}
            animate={{
              rotate: rotation
            }}
            transition={{
              duration: spinning ? 4 : 0,
              ease: spinning ? [0.17, 0.67, 0.25, 1] : 'linear'
            }}
          >
            {/* Wheel Segments */}
            {FORTUNES.map((fortune, index) => {
              const angle = (360 / FORTUNES.length) * index
              const radius = 100

              return (
                <div
                  key={fortune.id}
                  className="absolute"
                  style={{
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    transform: `rotate(${angle}deg)`
                  }}
                >
                  {/* Segment Background */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '0',
                      height: '0',
                      top: '50%',
                      left: '50%',
                      borderLeft: `${radius}px solid transparent`,
                      borderRight: `${radius}px solid transparent`,
                      borderTop: `${radius}px solid ${fortune.color}`,
                      transform: `translateX(-50%) translateY(-${radius}px) rotate(${360 / FORTUNES.length / 2}deg)`,
                      transformOrigin: 'bottom center',
                      opacity: 0.9
                    }}
                  />

                  {/* Fortune Text */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '30px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontFamily: PIXEL_FONT,
                      fontSize: '14px',
                      color: '#000',
                      fontWeight: 'bold',
                      textShadow: `0 0 4px ${fortune.color}`,
                      textAlign: 'center',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {fortune.emoji}
                  </div>
                </div>
              )
            })}

            {/* Center Circle */}
            <div
              className="absolute"
              style={{
                width: '80px',
                height: '80px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #FFD700 0%, #FF6347 100%)',
                border: '4px solid #000',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  fontFamily: PIXEL_FONT,
                  fontSize: '12px',
                  color: '#000',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                運
              </div>
            </div>
          </motion.div>

          {/* Pointer Arrow */}
          <div
            className="absolute z-10"
            style={{
              top: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',
              borderTop: '40px solid #FFD700',
              filter: 'drop-shadow(0 0 10px #FFD700)',
            }}
          />
        </div>
      </div>

      {/* Spin Button */}
      <motion.button
        className="absolute left-1/2 z-20"
        style={{
          bottom: '60px',
          transform: 'translateX(-50%)',
          padding: '16px 32px',
          background: spinning
            ? 'linear-gradient(145deg, #666 0%, #444 100%)'
            : 'linear-gradient(145deg, #FFD700 0%, #FF6347 100%)',
          border: '4px solid #000',
          borderRadius: '0',
          fontFamily: PIXEL_FONT,
          fontSize: '16px',
          color: spinning ? '#999' : '#000',
          fontWeight: 'bold',
          cursor: spinning ? 'not-allowed' : 'pointer',
          boxShadow: spinning
            ? 'none'
            : '0 0 30px rgba(255, 215, 0, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)',
          letterSpacing: '0.1em'
        }}
        onClick={spinWheel}
        disabled={spinning}
        whileHover={!spinning ? { scale: 1.05 } : {}}
        whileTap={!spinning ? { scale: 0.95 } : {}}
        animate={!spinning ? {
          boxShadow: [
            '0 0 20px rgba(255, 215, 0, 0.6)',
            '0 0 40px rgba(255, 99, 71, 0.8)',
            '0 0 20px rgba(255, 215, 0, 0.6)'
          ]
        } : {}}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity
          }
        }}
      >
        {spinning ? 'SPINNING...' : 'SPIN!'}
      </motion.button>

      {/* Result Display */}
      <AnimatePresence>
        {selectedFortune && !spinning && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
            >
              {/* Fortune Emoji */}
              <motion.div
                className="text-9xl mb-6"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity
                }}
              >
                {selectedFortune.emoji}
              </motion.div>

              {/* Chinese Text */}
              <motion.div
                style={{
                  fontFamily: PIXEL_FONT,
                  fontSize: '48px',
                  color: selectedFortune.color,
                  textShadow: `0 0 20px ${selectedFortune.color}, 0 0 40px ${selectedFortune.color}`,
                  marginBottom: '16px'
                }}
                animate={{
                  textShadow: [
                    `0 0 20px ${selectedFortune.color}`,
                    `0 0 40px ${selectedFortune.color}, 0 0 60px ${selectedFortune.color}`,
                    `0 0 20px ${selectedFortune.color}`
                  ]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
              >
                {selectedFortune.text}
              </motion.div>

              {/* English Text */}
              <div
                style={{
                  fontFamily: PIXEL_FONT,
                  fontSize: '20px',
                  color: '#FFD700',
                  letterSpacing: '0.2em'
                }}
              >
                {selectedFortune.subtext}
              </div>

              {/* Click to Continue */}
              <motion.div
                className="mt-12"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                onClick={() => setSelectedFortune(null)}
                style={{
                  fontFamily: PIXEL_FONT,
                  fontSize: '12px',
                  color: '#888',
                  cursor: 'pointer',
                  letterSpacing: '0.1em'
                }}
              >
                CLICK TO CONTINUE
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fireworks */}
      <AnimatePresence>
        {showFireworks && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                initial={{
                  x: '50%',
                  y: '50%',
                  scale: 0,
                  opacity: 1
                }}
                animate={{
                  x: `${50 + Math.cos((i / 12) * Math.PI * 2) * 40}%`,
                  y: `${50 + Math.sin((i / 12) * Math.PI * 2) * 40}%`,
                  scale: [0, 1.5, 0],
                  opacity: [1, 1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  ease: 'easeOut'
                }}
                style={{
                  zIndex: 25
                }}
              >
                {i % 2 === 0 ? '💰' : '✨'}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 z-40"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 215, 0, 0.1) 2px, rgba(255, 215, 0, 0.1) 4px)'
        }}
      />
    </div>
  )
}

export default FortuneWheel
