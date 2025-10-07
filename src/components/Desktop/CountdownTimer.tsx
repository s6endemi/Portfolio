import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const PIXEL_FONT = '"Press Start 2P", "IBM Plex Mono", monospace'

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(37 * 60) // 37 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const formatTime = (num: number) => String(num).padStart(2, '0')

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full w-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      style={{
        background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
      }}
    >
      {/* Container - Compact */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center px-4 py-4 gap-4"
        style={{
          boxShadow: 'inset 0 0 40px rgba(255, 215, 0, 0.3)',
        }}
      >
        {/* Chinese Text - Top */}
        <motion.div
          className="text-center"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <span
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: 'clamp(24px, 5vw, 36px)',
              background: 'linear-gradient(90deg, #FFD700 0%, #FF6347 50%, #FFD700 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'rainbow 3s linear infinite',
              letterSpacing: '0.3em',
              textShadow: '0 0 40px rgba(255, 215, 0, 0.5)'
            }}
          >
            福降临
          </span>
        </motion.div>

        {/* Countdown Display - HUGE */}
        <div className="flex items-center gap-6 justify-center">
          {/* Minutes */}
          <div className="flex gap-1">
            {formatTime(minutes).split('').map((digit, idx) => (
              <motion.div
                key={`min-${idx}`}
                className="relative"
                animate={{
                  textShadow: [
                    '0 0 10px #FFD700, 0 0 20px #FFD700',
                    '0 0 20px #FF6347, 0 0 40px #FF6347',
                    '0 0 10px #FFD700, 0 0 20px #FFD700'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <span
                  style={{
                    fontFamily: PIXEL_FONT,
                    fontSize: 'clamp(60px, 12vw, 120px)',
                    color: '#FFD700',
                    textShadow: '0 0 30px #FFD700, 0 0 60px #FF6347, 0 0 90px #FFD700'
                  }}
                >
                  {digit}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Separator - HUGE */}
          <motion.span
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: 'clamp(60px, 12vw, 120px)',
              color: '#FF6347',
              textShadow: '0 0 30px #FF6347, 0 0 60px #FF6347'
            }}
            animate={{
              opacity: [1, 0.3, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            :
          </motion.span>

          {/* Seconds */}
          <div className="flex gap-1">
            {formatTime(seconds).split('').map((digit, idx) => (
              <motion.div
                key={`sec-${idx}`}
                className="relative"
                animate={{
                  textShadow: [
                    '0 0 10px #FF6347, 0 0 20px #FF6347',
                    '0 0 20px #FFD700, 0 0 40px #FFD700',
                    '0 0 10px #FF6347, 0 0 20px #FF6347'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
              >
                <span
                  style={{
                    fontFamily: PIXEL_FONT,
                    fontSize: 'clamp(60px, 12vw, 120px)',
                    color: '#FF6347',
                    textShadow: '0 0 30px #FF6347, 0 0 60px #FFD700, 0 0 90px #FF6347'
                  }}
                >
                  {digit}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chinese Subtitle - Bottom */}
        <motion.div
          className="text-center"
          animate={{
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <span
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: 'clamp(16px, 3.5vw, 28px)',
              background: 'linear-gradient(90deg, #FF6347 0%, #FFD700 50%, #FF6347 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'rainbow 3s linear infinite',
              letterSpacing: '0.4em'
            }}
          >
            招財進寶
          </span>
        </motion.div>

        {/* Scanlines - Full Window */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 215, 0, 0.1) 2px, rgba(255, 215, 0, 0.1) 4px)'
          }}
        />
      </div>

      {/* Floating particles - More & Bigger */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: i % 2 === 0 ? '#FFD700' : '#FF6347',
              boxShadow: `0 0 20px ${i % 2 === 0 ? '#FFD700' : '#FF6347'}`,
              left: `${10 + i * 12}%`,
              top: `${20 + (i * 10) % 60}%`
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default CountdownTimer
