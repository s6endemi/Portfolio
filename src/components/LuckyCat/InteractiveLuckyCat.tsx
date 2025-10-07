import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PIXEL_FONT = '"Press Start 2P", "IBM Plex Mono", monospace'

const FORTUNES = [
  { text: '大吉 - GREAT FORTUNE AWAITS', color: '#FFD700', emoji: '💰' },
  { text: '財運亨通 - WEALTH FLOWS TO YOU', color: '#FF6347', emoji: '💎' },
  { text: '招財進寶 - ATTRACT WEALTH', color: '#FFD700', emoji: '🎰' },
  { text: '金玉滿堂 - GOLD & JADE FILL YOUR HALLS', color: '#FF6347', emoji: '👑' },
  { text: '財源廣進 - MONEY COMES FROM ALL SIDES', color: '#FFD700', emoji: '🚀' },
  { text: '恭喜發財 - CONGRATULATIONS & PROSPERITY', color: '#FF6347', emoji: '🎉' },
  { text: '一本萬利 - SMALL INVESTMENT, HUGE RETURNS', color: '#FFD700', emoji: '📈' },
  { text: '富貴吉祥 - WEALTH & GOOD LUCK', color: '#FF6347', emoji: '🍀' },
]

const InteractiveLuckyCat = () => {
  const [clicks, setClicks] = useState(0)
  const [fortune, setFortune] = useState<typeof FORTUNES[0] | null>(null)
  const [showExplosion, setShowExplosion] = useState(false)
  const [coins, setCoins] = useState<{ id: number; x: number; y: number }[]>([])

  const handleCatClick = () => {
    // Increment clicks
    const newClicks = clicks + 1
    setClicks(newClicks)

    // Show fortune every 5 clicks
    if (newClicks % 5 === 0) {
      const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)]
      setFortune(randomFortune)
      setShowExplosion(true)

      // Generate coins
      const newCoins = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100
      }))
      setCoins(newCoins)

      setTimeout(() => {
        setShowExplosion(false)
        setCoins([])
      }, 2000)

      setTimeout(() => {
        setFortune(null)
      }, 4000)
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #8B4513 0%, #CD853F 25%, #DEB887 50%, #F5DEB3 75%, #FFF8DC 100%)',
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(139,69,19,0.8) 2px, transparent 2px),
            radial-gradient(circle at 80% 70%, rgba(160,82,45,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 60px 60px'
        }}
      />

      {/* Click Counter */}
      <motion.div
        className="absolute top-4 right-4 px-4 py-2 z-10"
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          border: '2px solid #FFD700',
          fontFamily: PIXEL_FONT,
          fontSize: '12px',
          color: '#FFD700',
          textShadow: '0 0 10px #FFD700'
        }}
        animate={{ scale: clicks > 0 ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        CLICKS: {clicks}
      </motion.div>

      {/* Instruction */}
      {clicks === 0 && (
        <motion.div
          className="absolute top-1/4 left-1/2 z-10"
          style={{
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: '14px',
              color: '#8B4513',
              textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
              whiteSpace: 'nowrap'
            }}
          >
            👇 CLICK THE CAT 👇
          </div>
        </motion.div>
      )}

      {/* Main Lucky Cat - CENTERED & BIGGER */}
      <div
        className="absolute left-1/2"
        style={{
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5
        }}
      >
        <motion.div
          className="cursor-pointer select-none"
          onClick={handleCatClick}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
          style={{
            position: 'relative'
          }}
        >
        {/* Glow Effect */}
        <motion.div
          className="absolute blur-3xl"
          style={{
            width: '300px',
            height: '300px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            background: [
              'radial-gradient(circle, #FFD700 0%, transparent 70%)',
              'radial-gradient(circle, #FF6347 0%, transparent 70%)',
              'radial-gradient(circle, #FFD700 0%, transparent 70%)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Cat - BIGGER */}
        <motion.div
          className="relative"
          style={{
            fontSize: '180px',
            lineHeight: '1'
          }}
          animate={{
            rotate: [-5, 5, -5],
          }}
          transition={{
            rotate: {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
        >
          <div
            style={{
              textShadow: '0 0 30px #FFD700, 0 0 60px #FF6347',
              filter: showExplosion ? 'brightness(2)' : 'brightness(1)'
            }}
          >
            🐱
          </div>
        </motion.div>

        {/* Paw Wave */}
        <motion.div
          className="absolute"
          style={{
            fontSize: '60px',
            top: '20%',
            right: '-40px'
          }}
          animate={{
            rotate: [0, 20, 0, 20, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          👋
        </motion.div>
        </motion.div>
      </div>

      {/* Progress to Fortune */}
      {clicks > 0 && clicks % 5 !== 0 && (
        <motion.div
          className="absolute left-1/2 z-10"
          style={{
            bottom: '100px',
            transform: 'translateX(-50%)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <div
              style={{
                fontFamily: PIXEL_FONT,
                fontSize: '10px',
                color: '#8B4513',
                marginBottom: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              FORTUNE IN {5 - (clicks % 5)} CLICKS
            </div>
            <div className="flex gap-2 justify-center">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '20px',
                    height: '20px',
                    background: i < (clicks % 5) ? '#FFD700' : '#8B4513',
                    border: '2px solid #654321',
                    boxShadow: i < (clicks % 5) ? '0 0 10px #FFD700' : 'none'
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Fortune Display */}
      <AnimatePresence>
        {fortune && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
            }}
          >
            <motion.div
              className="text-center p-8"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity
              }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 360]
                }}
                transition={{
                  scale: { duration: 1, repeat: Infinity },
                  rotate: { duration: 2, repeat: Infinity }
                }}
              >
                {fortune.emoji}
              </motion.div>
              <div
                style={{
                  fontFamily: PIXEL_FONT,
                  fontSize: 'clamp(14px, 3vw, 24px)',
                  color: fortune.color,
                  textShadow: `0 0 20px ${fortune.color}, 0 0 40px ${fortune.color}`,
                  letterSpacing: '0.1em',
                  lineHeight: '1.6'
                }}
              >
                {fortune.text}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coin Explosion */}
      <AnimatePresence>
        {coins.map((coin) => (
          <motion.div
            key={coin.id}
            className="absolute text-3xl"
            initial={{
              x: '50%',
              y: '50%',
              scale: 0,
              rotate: 0
            }}
            animate={{
              x: `${coin.x}%`,
              y: `${coin.y}%`,
              scale: [0, 1.5, 1],
              rotate: 720,
              opacity: [1, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: 'easeOut'
            }}
            style={{
              textShadow: '0 0 10px #FFD700'
            }}
          >
            💰
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Coins Background */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-30"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i * 15) % 60}%`
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3
          }}
        >
          💰
        </motion.div>
      ))}

      {/* Bottom Text */}
      <motion.div
        className="absolute left-1/2 z-10"
        style={{
          bottom: '30px',
          transform: 'translateX(-50%)'
        }}
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        <div className="text-center">
          <div
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: '10px',
              color: '#8B4513',
              letterSpacing: '0.2em',
              whiteSpace: 'nowrap'
            }}
          >
            每點擊5次獲得財富
          </div>
          <div
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: '8px',
              color: '#8B4513',
              letterSpacing: '0.1em',
              marginTop: '4px'
            }}
          >
            CLICK 5 TIMES FOR FORTUNE
          </div>
        </div>
      </motion.div>

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 69, 19, 0.3) 2px, rgba(139, 69, 19, 0.3) 4px)'
        }}
      />
    </div>
  )
}

export default InteractiveLuckyCat
