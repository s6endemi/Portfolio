import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PIXEL_FONT = '"Press Start 2P", "IBM Plex Mono", monospace'

interface FallingCoin {
  id: number
  x: number
  type: '💰' | '💎' | '🪙' | '👑'
  speed: number
  value: number
}

const CoinRain = () => {
  const [coins, setCoins] = useState<FallingCoin[]>([])
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [gameRunning, setGameRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [showExplosion, setShowExplosion] = useState<{ x: number; y: number; value: number } | null>(null)

  const COIN_TYPES: Array<{ emoji: '💰' | '💎' | '🪙' | '👑'; value: number; chance: number }> = [
    { emoji: '💰', value: 10, chance: 0.5 },
    { emoji: '🪙', value: 5, chance: 0.3 },
    { emoji: '💎', value: 50, chance: 0.15 },
    { emoji: '👑', value: 100, chance: 0.05 }
  ]

  const spawnCoin = useCallback(() => {
    const rand = Math.random()
    let selectedType = COIN_TYPES[0]
    let cumulativeChance = 0

    for (const type of COIN_TYPES) {
      cumulativeChance += type.chance
      if (rand <= cumulativeChance) {
        selectedType = type
        break
      }
    }

    const newCoin: FallingCoin = {
      id: Date.now() + Math.random(),
      x: Math.random() * 90 + 5, // 5% to 95% to avoid edges
      type: selectedType.emoji,
      speed: 3 + Math.random() * 2,
      value: selectedType.value
    }

    setCoins(prev => [...prev, newCoin])
  }, [])

  useEffect(() => {
    if (!gameRunning) return

    const spawnInterval = setInterval(() => {
      spawnCoin()
    }, 800)

    return () => clearInterval(spawnInterval)
  }, [gameRunning, spawnCoin])

  useEffect(() => {
    if (!gameRunning) return

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [gameRunning])

  useEffect(() => {
    if (!gameRunning) return

    const fallInterval = setInterval(() => {
      setCoins(prev => prev.filter(coin => {
        // Remove coins that reached bottom
        return true // We'll handle removal on click
      }))
    }, 50)

    return () => clearInterval(fallInterval)
  }, [gameRunning])

  const handleCoinClick = (coin: FallingCoin, e: React.MouseEvent) => {
    e.stopPropagation()

    // Remove coin
    setCoins(prev => prev.filter(c => c.id !== coin.id))

    // Update score with combo multiplier
    const multiplier = 1 + (combo * 0.1)
    const points = Math.floor(coin.value * multiplier)
    setScore(prev => prev + points)
    setCombo(prev => prev + 1)

    // Show explosion
    setShowExplosion({ x: e.clientX, y: e.clientY, value: points })
    setTimeout(() => setShowExplosion(null), 500)
  }

  const startGame = () => {
    setGameRunning(true)
    setScore(0)
    setCombo(0)
    setTimeLeft(30)
    setCoins([])
  }

  const resetCombo = () => {
    setCombo(0)
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #1a0a0a 0%, #000000 100%)'
      }}
      onClick={resetCombo}
    >
      {/* Background Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: '2px',
            height: '2px',
            background: i % 2 === 0 ? '#FFD700' : '#FF6347',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 4px ${i % 2 === 0 ? '#FFD700' : '#FF6347'}`
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Title */}
      <motion.div
        className="absolute top-4 left-1/2 z-20"
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
            letterSpacing: '0.2em'
          }}
        >
          💰 COIN RAIN 💰
        </div>
      </motion.div>

      {/* Score & Timer */}
      <div className="absolute top-16 left-0 right-0 flex justify-between px-8 z-20">
        <motion.div
          style={{
            fontFamily: PIXEL_FONT,
            fontSize: '16px',
            color: '#FFD700',
            textShadow: '0 0 10px #FFD700'
          }}
          animate={{ scale: score > 0 ? [1, 1.1, 1] : 1 }}
        >
          SCORE: {score}
        </motion.div>

        {gameRunning && (
          <motion.div
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: '16px',
              color: timeLeft < 10 ? '#FF6347' : '#FFD700',
              textShadow: `0 0 10px ${timeLeft < 10 ? '#FF6347' : '#FFD700'}`
            }}
            animate={timeLeft < 10 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            TIME: {timeLeft}s
          </motion.div>
        )}
      </div>

      {/* Combo Counter */}
      <AnimatePresence>
        {combo > 0 && gameRunning && (
          <motion.div
            className="absolute top-28 left-1/2 z-20"
            style={{
              transform: 'translateX(-50%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div
              style={{
                fontFamily: PIXEL_FONT,
                fontSize: '14px',
                color: '#FF6347',
                textShadow: '0 0 20px #FF6347',
                letterSpacing: '0.1em'
              }}
            >
              COMBO x{combo}!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Falling Coins */}
      <AnimatePresence>
        {coins.map(coin => (
          <motion.div
            key={coin.id}
            className="absolute cursor-pointer select-none"
            style={{
              left: `${coin.x}%`,
              fontSize: '40px',
              zIndex: 10,
              textShadow: '0 0 10px #FFD700'
            }}
            initial={{ y: -60 }}
            animate={{ y: window.innerHeight + 60 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: coin.speed,
              ease: 'linear'
            }}
            onClick={(e) => handleCoinClick(coin, e)}
            whileHover={{ scale: 1.3, rotate: 360 }}
            whileTap={{ scale: 0.8 }}
          >
            {coin.type}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Click Explosion */}
      <AnimatePresence>
        {showExplosion && (
          <motion.div
            className="absolute pointer-events-none z-30"
            style={{
              left: showExplosion.x,
              top: showExplosion.y,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                fontFamily: PIXEL_FONT,
                fontSize: '24px',
                color: '#FFD700',
                textShadow: '0 0 20px #FFD700',
                whiteSpace: 'nowrap'
              }}
            >
              +{showExplosion.value}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start/End Game Screen */}
      {!gameRunning && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-30"
          style={{
            background: 'rgba(0, 0, 0, 0.9)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            {timeLeft === 0 ? (
              <>
                <motion.div
                  style={{
                    fontFamily: PIXEL_FONT,
                    fontSize: '32px',
                    color: '#FF6347',
                    textShadow: '0 0 20px #FF6347',
                    marginBottom: '20px'
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    textShadow: [
                      '0 0 20px #FF6347',
                      '0 0 40px #FF6347',
                      '0 0 20px #FF6347'
                    ]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  GAME OVER!
                </motion.div>
                <div
                  style={{
                    fontFamily: PIXEL_FONT,
                    fontSize: '24px',
                    color: '#FFD700',
                    textShadow: '0 0 20px #FFD700',
                    marginBottom: '30px'
                  }}
                >
                  FINAL SCORE: {score}
                </div>
              </>
            ) : (
              <motion.div
                style={{
                  fontFamily: PIXEL_FONT,
                  fontSize: '18px',
                  color: '#FFD700',
                  textShadow: '0 0 20px #FFD700',
                  marginBottom: '30px',
                  maxWidth: '400px',
                  lineHeight: '1.8'
                }}
              >
                CLICK COINS BEFORE<br/>THEY FALL!<br/>
                <span style={{ fontSize: '12px', color: '#FF6347' }}>
                  💰=10 🪙=5 💎=50 👑=100
                </span>
              </motion.div>
            )}

            <motion.button
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(145deg, #FFD700 0%, #FF6347 100%)',
                border: '4px solid #000',
                fontFamily: PIXEL_FONT,
                fontSize: '16px',
                color: '#000',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)',
                letterSpacing: '0.1em'
              }}
              onClick={startGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 215, 0, 0.6)',
                  '0 0 40px rgba(255, 99, 71, 0.8)',
                  '0 0 20px rgba(255, 215, 0, 0.6)'
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity
                }
              }}
            >
              {timeLeft === 0 ? 'PLAY AGAIN!' : 'START GAME!'}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      {gameRunning && (
        <motion.div
          className="absolute bottom-8 left-1/2 z-20"
          style={{
            transform: 'translateX(-50%)'
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: '10px',
              color: '#888',
              letterSpacing: '0.1em',
              textAlign: 'center'
            }}
          >
            CLICK ANYWHERE TO RESET COMBO
          </div>
        </motion.div>
      )}

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

export default CoinRain
